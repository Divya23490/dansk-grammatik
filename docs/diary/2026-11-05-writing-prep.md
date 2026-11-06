# Diary: PD3 writing prep (tips, templates, graded examples, past tasks, review prompt)

This session built a writing-prep area for the PD3 written exam (*skriftlig fremstilling*). It is organised by the only three task types the exam has set from 2013 to 2024: the Delprøve 1 e-mail to a friend, the 2A diagram task and the 2B viewpoint-list task. Each type gets English tips, a paragraph template, an illustrative ladder of graded answers, practice tasks and a phrase bank with pitfalls. Past official tasks and the learner's own texts are served privately from Supabase. Most of the build was spread across parallel subagents (content per type, UI, private pipeline, transcription, learner samples, offline checks). The main session wrote the shared contract, integrated the pieces, reviewed them and fixed what came back. It was done on branch `writing-prep`.

## Step 1: Survey the reference material and plan

**Author:** main

### Prompt Context

**Verbatim prompt:** I now want to improve the writing test/mock/preparation part. I have put some reference data and samples in a folder called more-reference-data in this folder. What I have in mind for writing: 1. Task wise tips with some explanation in english 2. Showing various graded responses so I can gauge my level 3. A template for each of sample/possible task type, so I can practice the basics 4. Any other tips, again organised by tasks, and with english explanations where appropriate. 5. A way to check my written response, but this can be phase 2. Come up with a plan here. Ask if in doubt.
**Interpretation:** Map the existing writing code and the reference folder (`more data for reference/`), then propose a plan organised by task type.
**Inferred intent:** A study tool that shows how the writing exam is graded and gives the learner a structure to practise with.

### What I did
One Explore agent mapped the app's writing code: `/app/write.tsx`, `/src/content/writingTasks.ts`, `/src/feedback/*`, and the reading-paper pipeline as a pattern to copy. One general agent extracted all 80 reference files to text in the scratchpad and surveyed them. I searched the web for official graded answers and the *bedømmelsesvejledning*, asked the user four scoping questions, and wrote the plan.

### Why
The material decided what was possible. In particular, the user asked for graded responses and the folder turned out to have none.

### What worked
The survey settled the facts. There are only three task types; the evaluation bullet must be about 50 % of the answer from 2018 V on; the official criteria are task fulfilment, pragmatic and linguistic; the grade is holistic with Delprøve 2 weighted more. The user chose: write an illustrative ladder and also link the official example; show their own e-mails privately; cover the three exam types only; start with about 6 past sessions.

### What didn't work
There are no official graded answers in the folder (the censor booklets only have reading keys and the writing score sheet). Online there is one official passing answer (`260921-pd3-besvarelse-002.pdf`) and no public *bedømmelsesvejledning*. Text extraction loses the underlining in every Delprøve 1 mail.

### What I learned
`pd3_2013.docx` and `PD3_Ervin_Stil_Fuldt_Dokument.pdf` in the folder are mislabelled and partly off-task, so they were not used as models.

### What was tricky
Deciding how to present grades honestly: answers are labelled "illustrative, not an official grade", and every band is shown as approximate (`~7`).

### What warrants review
The plan is at `~/.claude/plans/i-now-want-to-wise-harp.md`.

### Future work
None for this step.

## Step 2: Build in parallel against a shared contract

**Author:** main

### Prompt Context

**Verbatim prompt:** Yes, build it and use as much parallelization with sub-agents as possible.
**Interpretation:** Implement the plan, fanning the work out to subagents.
**Inferred intent:** Get the whole feature built quickly.

### What I did
I wrote the contract first: `/src/content/writing/types.ts`. It defines `PracticeTask`, `GradedAnswer`, `LearnerSample`, `TaskTypeGuide`, `BULLETS_BY_TYPE`, `CRITERIA` and `WritingItem`. I also wrote compiling stubs for every file the agents would fill, plus the signatures of `/src/writing/store.ts` and `/src/writing/analyse.ts`, so each agent could work against fixed interfaces. Then I launched 10 agents at once:
- guides: `/src/content/writing/guides.ts` and `official.ts`
- one agent per type for the simulated tasks and the 12/7/4/02 ladder: `sim-d1.ts`, `sim-d2a.ts`, `sim-d2b.ts`
- UI: `/app/writing/*` and `/src/ui/writing/*`
- private pipeline: migration `0004_writing.sql`, `validate.ts`, `scripts/upload-writing.mjs`, `store.ts`
- two agents transcribing the 2019 S, 2019 V, 2020 V, 2021 S, 2021 V and 2024 S papers, reading each PDF page visually to recover the underlining and the chart values
- learner samples
- offline checks

Meanwhile I added the writing ids to the content lock, wrote `/src/content/writing/content.test.ts`, and pointed the PD3 guide's route at `/writing`.

### Why
Disjoint files plus a fixed contract let ten agents run at the same time without conflicts.

### What worked
All agents finished without conflicting edits. Typecheck was clean, and 795 tests passed straight after integration.

### What didn't work
The pipeline agent found a real bug in the existing `/scripts/upload-exam-papers.mjs`: it compares jsonb with the key order lost, so every run re-uploads every reading paper. The writing upload script compares a key-sorted serialisation instead. The reading script was left alone because it was out of scope.

### What I learned
A plain-English report from an agent can misgender the user. One report called the user "he". Critiques shown to the user address them as "you".

### What was tricky
Stubs had to compile and keep their signatures while other agents depended on them.

### What warrants review
Danish written by the agents (answers, starters, phrases) has not been checked by a native speaker.

### Future work
Fix the re-upload behaviour in `upload-exam-papers.mjs`.

## Step 3: Review fixes before upload

**Author:** main

### Prompt Context

**Verbatim prompt:** (follow-up from the advisor review; no new user prompt)
**Interpretation:** Close privacy and data gaps before anything goes to Supabase.
**Inferred intent:** Make the learner's private texts actually private.

### What I did
- **Privacy:** the migration originally let every signed-in user read every row. I added an `owner` column. Official tasks are readable by any signed-in user; learner samples only by their owner, set at upload from `WRITING_SAMPLES_OWNER` in `.env.local`.
- **Cache:** `store.ts` cached all rows under one device-wide key, so a second account on the same device would have seen the first one's samples. The cache is now keyed by user id.
- **Matches:** Email 1 and Email 2, first treated as unmatched, are the official 2022 Vinter and 2022 Sommer D1 papers. They were re-embedded as official tasks.
- **Duplicate topic:** `wsim-d2b-3` "Hjemmearbejde" duplicated an official 2020 V topic and was replaced with "Et samfund uden kontanter".
- **Small fixes:** I removed a loosely fitting `relative-clause` rule link and wired `switchWritingUser` into `/src/auth/session.ts`.

### Why
The repo is public and the app has more than one user. The user's own texts and classmates' texts must not be readable by other accounts, even from a device cache.

### What worked
The user ran `0004_writing.sql` in the SQL editor. `npm run writing:upload` uploaded 28 items. A second run reported `28 writing items: 0 uploaded, 28 unchanged.` A query with the publishable key and no session returned `signed-out rows: 0`.

### What didn't work
Nothing failed in this step.

### What I learned
The survey missed the 2022 match only because the reference folder had no 2022 papers. `data-from-past-tests-pdf/` did.

### What was tricky
Ownership needed a user id at upload time. The script looks the e-mail up through the admin API using the secret key.

### What warrants review
The owner-only policy for learner samples is untested with a second signed-in account. Only the signed-out case was checked.

### Future work
None.

## Step 4: Desktop Examples layout

**Author:** main

### Prompt Context

**Verbatim prompt:** In the example scored responses in practice tab, clicking on a phrase/sentence shows some explanation. But that can be hard to scroll and read. Can we have it as a fixed sidepanel? — then — The note is at the top of the page, so if I am scrolling, the note basically is out of the viewport. Can we make it a fixed sidepanel with all the notes on the side? So basically turn that tab into a 2 column layout for the desktop, and use the fixed sidepanel for notes, or any other relevant information. The main goal is to minimize scrolling when viewing this on desktop.
**Interpretation:** Keep the explanation in view next to the answer on desktop.
**Inferred intent:** Read an annotated answer without scrolling back and forth.

### What I did
The first attempt was a panel with `position: 'fixed'` (`NotePanel.tsx`). The user reported that it stayed at the top of the page instead of following the viewport. I replaced it with `/src/ui/writing/ExamplesSplit.tsx`, used when the window is at least 1000 px wide. The left column has the answer picker, a collapsible task and the annotated text. The right panel has the verdict, the teacher's comment, every note in full and the criteria. Both columns are their own `ScrollView`, sized to the window from `measureInWindow`. Selecting a highlight scrolls the panel to its note. `AnnotatedText` became controlled, and `NoteList`, `CriteriaList` and `TeacherComment` were split out for reuse. The phone layout stays an accordion with the notes listed under the text.

### Why
Independently scrolling columns don't depend on CSS fixed or sticky positioning. That positioning breaks inside react-native-web's scroll containers and navigator views.

### What worked
The user confirmed the split view ("That's cool.").

### What didn't work
`position: 'fixed'` on react-native-web placed the panel relative to the page content, not the viewport. The browser extension wasn't connected (`Browser extension is not connected…`), so I couldn't check it myself before the user did.

### What I learned
On this app's web build, fixed positioning isn't reliable. Prefer layouts built from bounded `ScrollView`s.

### What was tricky
Sizing the columns so the page itself barely scrolls: the height comes from the split's top edge in the window.

### What warrants review
How the columns look on short windows: the minimum height is 460 px.

### Future work
The same split could suit the Template and Phrases tabs.

## Step 5: "Copy for AI review" and topic-specific templates

**Author:** main

### Prompt Context

**Verbatim prompt:** For the email practice replies, how can I get a eval or check? — Let's do the copy button. — In the practice tab with templates section, the templates actually don't change with different topics. Could you update those to actually match the selected topics?
**Interpretation:** Give the learner a real evaluation path now without an API key, and make template mode specific to each task.
**Inferred intent:** Useful feedback on practice answers, and scaffolding that fits the actual question.

### What I did
- **Review prompt:** `/src/writing/reviewPrompt.ts` builds a censor-style prompt with the official criteria, per-type checks (each underlined question; 50 % evaluation share), a corrections table, the top three improvements and a corrected version, followed by the full task and the answer. The editor copies it with `navigator.clipboard`, falls back to `Share`, and offers "Open Claude". It has 3 tests.
- **Topic templates:** I added `PracticeTask.slots` (per template slot: an English `hint` and topic starters), `templateForTask()` in `/src/content/writing/index.ts`, editor support (a "For this topic:" hint, topic starters first in the accent colour), validator checks, and a content test requiring full slots on every simulated task. Three agents wrote slots for all 9 simulated and 18 official tasks. The 18 changed official items were re-uploaded: `28 writing items: 18 uploaded, 10 unchanged.`

### Why
The full AI review (an edge function plus an API key) is still phase 2. The copy button gives the same quality of feedback today at no cost.

### What worked
`npm test`: 809 passed, 6 skipped. Typecheck is clean, and the web export succeeded.

### What didn't work
Nothing failed in this step.

### What I learned
In some 2B papers the evaluation asks "whose responsibility", not pros and cons. The generic "for/against" slot titles don't fit, so the hints explain how to use those slots.

### What was tricky
D1 mails with four underlined questions across three answer slots. The hints say which two to answer together.

### What warrants review
The copy button and the topic hints were not clicked through by me in a browser; only tests and the typecheck cover them. "Hej Mikkel" is a placeholder name in the 2024 S greeting starter.

### Future work
Phase 2: an in-app AI review through a Supabase `coach` function, reusing `reviewPrompt.ts`. Transcribe the remaining past sessions.
