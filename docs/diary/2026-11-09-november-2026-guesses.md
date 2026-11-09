# Diary: November 2026 guesses for PD3

The user asked for a forecast of the November–December 2026 PD3 sitting, task by task, from the last four years of papers. This session built a new "November 2026 guesses" page on branch `november-2026-guesses`. For each task it gives tips, likely topics and question types. Writing tasks also get cheat sheets. Reading and writing tasks got word lists in a second step.

## Step 1: The forecast page

**Author:** main

### Prompt Context

**Verbatim prompt:** Analyze the last 4 years papers, and for each of the task, come up with a: 1. List of tips and tricks to ensure highest scores 2. Most likely topics and/or areas and/or question types 3. For writing related tasks, cheat sheet with templates/sentences that can help in all topics, and any related words/phrases. This should be placed in a new page/section under 2026 November guesses. Wherever possible, add explanations in english so it's easy to read.
**Interpretation:** No "2026 November guesses" section existed (I grepped every branch), so I created one: a PD3 row on the Exam tab, opening `/exam/guesses`. It covers every task: reading 1, 2A, 2B and 3; writing 1, 2A and 2B; oral 1 and 2.
**Inferred intent:** Focus the last weeks of preparation on what is most likely to be asked.

### What I did
- **Window.** Nothing after May–June 2024 is public, so "the last four years" means:
  - reading: 7 papers, May 2021 to May 2024;
  - writing: 2021 summer and winter, 2022 summer and 2024 summer, plus winter 2020 for 2A and 2B, because SIRI's public 2022 paper is the only one from 2022;
  - oral: the full 2024 summer set, the 2023 titles, and 2019–2020 for the question pattern.

  The page header says all this.
- **Analysis.** Scripts in the scratchpad read `content-private/exams` and `content-private/writing` and counted:
  - reading 1 themes: all 7 are a Danish place or heritage theme;
  - reading 1 question words, 2021–24: "Hvad" 35%, "ud over" traps 10 of 105;
  - 2A and 2B themes since the November 2022 format change: work in 4 of 4;
  - gap-fill word kinds over 56 gaps: connectors 30%, word + preposition 23%, verbs 21%, nouns 16%, adjectives and adverbs 9%;
  - writing bullet shapes;
  - oral topics: a work topic in 7 of 7 sittings, "Hvorfor tror du" then "fordele og ulemper" in all 14 topics with full questions.
- **Content.** `/src/content/guesses2026.ts` holds typed forecasts. Each task has what came up, the pattern, the likely topics, question types, tips, a cheat sheet and links. There is also a topic word bank.
- **Screen.** `/app/exam/guesses.tsx` has a Reading / Writing / Speaking switch, then a switch for the task. It is registered in `/app/_layout.tsx` and linked from `/app/(tabs)/exam.tsx`.
- **Exam guide.** The line in `/src/content/examGuides.ts` that said the app "does not guess" at unpublished papers now points to the new page.
- **Tests.** `/src/content/guesses2026.test.ts` checks that every task is covered, every phrase has English, and every link resolves to a real screen.

### Why
Each forecast shows the count it rests on, so the learner can judge how far to trust it.

### What worked
The private papers are structured JSON, so every count came from a script rather than from reading.

### What didn't work
- **Browser check.** The Chrome extension was not connected: `Browser extension is not connected. Please ensure the Claude browser extension is installed and running`. A curl to `/exam/guesses` returning 200 proves nothing, because the app is a single-page app and every route returns 200.
- **Self-review.** It caught claims that did not hold:
  - "every 2A paper asks the most decisive cause in Q1" was true for only 3 of 4;
  - "12 oral topics" should have been 14;
  - the LF1 summary said "6 of 6" next to a list of 7;
  - Ribe and the Wadden Sea were called unused, but both appear inside the Viking and small-island papers;
  - a V2 note was applied to fordi, da and selvom, which take subject-first order;
  - "spelling slips are tolerated" in LF1 has no source in the code.

  All of these were fixed or removed.

### What I learned
The gap-fill is the most predictable part of the paper: the same few connectors and noun + preposition pairs come back again and again.

### What was tricky
Keeping private material out of the public bundle. The page holds only theme titles, counts and my own sentences. No official mail text, chart value or passage was copied.

### What warrants review
- No native speaker has checked the Danish sentences.
- The page has not been seen in a browser by me.
- The forecasts are judgement calls from four years of data; the page labels them as forecasts.

### Future work
Add the 2024 winter and 2025 papers if SIRI ever publishes them, and re-run the counts.

## Step 2: Word lists for the gap-fill and the other tasks

**Author:** main

### Prompt Context

**Verbatim prompt:** For Læseforståelse 3, give me the 2 lists: 1. Most probable connectors, fixed prepositions, verbs that can show up in the 2026 Nov test. 2. A bigger, more exhaustive list for connectors, prepositions and verbs that can help to revise. Make sure both above are in the same place under Nov 2026 guesses page, and have explanations in english. Once this is done, do similar for other Reading/writing tasks as much as possible.
**Interpretation:** Two word lists per task, shown together under the task, with English for every word. The gap-fill comes first, then reading 1, 2A and 2B and writing 1, 2A and 2B.
**Inferred intent:** A ranked list to learn first, and a full list to revise from.

### What I did
- **Gap-fill counts.** I counted all 544 gap-fill options across all 17 papers, recording how often each word was offered and how often it was the answer:
  - "nemlig" was right 6 of 7 times, "samtidig" 5 of 5, "som nævnt" 4 of 6;
  - "alligevel" was right 1 of 15;
  - "omvendt", "tværtimod", "ligeledes" and "til gengæld" were offered 31 times and never right.

  The likely list is ranked on these counts. The revision list groups connectors by function, prepositions by preposition, and verbs by meaning.
- **Other reading tasks.** I counted the 2A question phrases ("i overensstemmelse med" 17, "ifølge teksten" 15), how the 28 missing 2B paragraphs open, and how people are quoted ("siger" 95, "mener" 67).
- **Writing tasks.** The lists use the exact task-sheet wording, verb + preposition pairs, chart words and position words.
- **Code.** The lists live in `/src/content/guesses2026Words.ts` (`WordLists`) and are attached as `words` on each task. The screen renders the likely list open and the revision groups folded. Tests check that both lists exist for every reading and writing task, that every word has English, and that the gap-fill covers connectors, prepositions and verbs.

### Why
Counting options as well as answers shows which words the exam likes to use as distractors. That is as useful to know as which words are the answer.

### What worked
The counts ran straight off the transcribed papers.

### What didn't work
Several counts I first wrote by hand were off by one or more when re-checked against the script output. For example, "årsag/grund til" is offered 12 times, not 9, and "forklaring på" 5 times, not 4. All were corrected before shipping.

### What I learned
Distractor connectors are very stable from paper to paper. Knowing they are seldom right is a real advantage, as long as the learner still checks the logic.

### What was tricky
Phrasing the "usually wrong" list so that it does not become a rule to apply blindly.

### What warrants review
- No native speaker has checked the Danish glosses.
- The UI was checked only by the typecheck, the tests and the web build, not in a browser.

### Future work
A drill built from the likely gap-fill words.
