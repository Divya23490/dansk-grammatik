# Diary: Graded examples per task, and tips and a word bank for every practice task

This work follows writing prep (merged in `1cbfdf9`). Writing prep gave each task type (D1 e-mail, 2A diagram, 2B list) one illustrative 12/7/4/02 ladder, and only for the first simulated task. This branch, `writing-examples`, does four things:

- doubles the simulated tasks to six per type;
- gives every simulated task its own full ladder, 3–5 tips and a 10–15-word bank;
- lets private official tasks carry graded examples too;
- makes the Examples tab show the examples for one chosen task at a time.

The building happened in an earlier session that left its work uncommitted on the branch. The session recorded here reviewed it, ran it locally, cleaned it up and shipped it. Step 1 is reconstructed from the diff, not from that session's transcript.

## Step 1: Build the per-task examples (earlier session, reconstructed)

**Author:** main

### Prompt Context

**Verbatim prompt:** Not available. The earlier session's prompt was not part of this session.
**Interpretation:** From the diff: add per-task graded examples, tips and word banks, and make the Examples tab work per task.
**Inferred intent:** Let the learner compare their answer with graded answers to the same task, rather than with a ladder written for a different topic.

### What I did
- **Content contract:** `/src/content/writing/types.ts` gained three optional `PracticeTask` fields:
  - `tips` (`Tip[]`);
  - `words` (`Phrase[]`);
  - `examples` (`GradedAnswer[]`), for private official tasks, whose examples travel inside the task JSON.
- **Validation:** `/src/content/writing/validate.ts` checks the new fields. Each `examples` entry must be a valid graded answer with the task's id and origin `illustrative`, and ids must be unique.
- **Existing tasks:** `/src/content/writing/sim-d1.ts`, `sim-d2a.ts` and `sim-d2b.ts` gained tips and words for tasks 1–3, plus ladders for tasks 2 and 3. The only existing line removed was a doc comment, so no shipped task text changed.
- **New tasks:** `sim-d1-extra.ts`, `sim-d2a-extra.ts` and `sim-d2b-extra.ts` add `wsim-*-4..6`, each with a ladder, tips, words and topic slots. All the 2A figures are invented and say so in `source` and `note`. Each file has its own test file.
- **Wiring and locks:** `/src/content/writing/index.ts` registers the new tasks and adds `gradedForTask`. `/src/content/content-ids.lock.json` locks the 9 new task ids and 60 new answer ids.
- **Grouping helper:** `/src/writing/exampleGroups.ts` groups simulated tasks, official tasks and learner samples by task, with each ladder sorted 12 → 02. A sample that carries its own task gets a group of its own. It is tested in `exampleGroups.test.ts`.
- **UI:**
  - `/src/ui/writing/TaskPicker.tsx` shows the tasks as chips, in "Practice tasks" and "Past papers" groups.
  - The Examples tab in `/app/writing/[type].tsx` shows one task's group at a time and takes a `?task=` parameter.
  - `/src/ui/writing/ExamplesSplit.tsx` now takes a single group.
  - `/src/ui/writing/TaskExtras.tsx`, under the practice editor, adds expandable "Tips for this task" and "Word bank" chips, plus a link to that task's graded examples.
- **Private content:** the 18 official task files in `content-private/writing/` (gitignored) were given `tips` and `examples` on 2026-11-06. They reach the app only through `npm run writing:upload`.

### Why
A learner compares far better against answers to the same prompt. The task-level tips and word banks put the help next to the editor, where it is used.

### What worked
The `examples` field keeps private graded answers out of the public bundle and out of the id lock. Public ladders stay in the `GRADED_*` arrays, so their ids are locked.

### What didn't work
Nothing is recorded as failing. The earlier session's history is not available.

### What I learned
Nothing beyond the design above.

### What was tricky
Official tasks are private, so their examples cannot live in public, locked arrays. Hence the two paths in `gradedForTask`: the examples a task carries, or else the public ladder.

### What warrants review
- The Danish in the nine new tasks and 60 new answers has only been checked by tests (quotes in the text, word counts, bullet keys, slot keys). No native-speaker read has been done.
- The band boundaries are illustrative.

### Future work
A human proofread of the new Danish content.

## Step 2: Run locally, review, clean up and ship

**Author:** main

### Prompt Context

**Verbatim prompt:** Run the project locally and summarize any WIP changes for me / Okay. Clean up and ship it.
**Interpretation:** Start the dev server, review and summarise the uncommitted work, remove leftovers, then run `/ship`.
**Inferred intent:** Get the finished WIP onto production.

### What I did
- **Ran it locally:** started `npx expo start --web --port 8081`. `/writing/d1` returned HTTP 200 and the web bundle compiled (1655 modules).
- **Read the diff:** read all of it and skimmed the new content files.
- **Cleaned up:** removed three imports from `/app/writing/[type].tsx` that the new Examples tab no longer used (`findSimTask`, `gradedForType`, `BAND_ORDER`).
- **Verified:** `npm run typecheck` was clean, `npm test` passed 869 tests (6 e2e skipped), and `npm run build:web` exported successfully.

### Why
These are the `/ship` gates.

### What worked
Everything passed on the first run.

### What didn't work
A wait loop with an unquoted URL failed under zsh, printing `(eval):1: no matches found: http://localhost:8081/writing/d1?tab=examples` for each try, because `?` is a glob character. The final quoted `curl` worked.

### What I learned
Quote URLs that contain `?` in zsh.

### What was tricky
Nothing.

### What warrants review
The UI was **not** checked in a browser. The sign-in gate blocks automated checks, so the task picker, the `?task=` deep link from `TaskExtras` and the split view are covered only by the typecheck, the unit tests and a successful bundle. The private official tasks' examples and tips will not appear until `npm run writing:upload` is run; this session did not run it.

### Future work
- Run `npm run writing:upload`.
- Click through `/writing/d1?tab=examples` and a practice task while signed in.
