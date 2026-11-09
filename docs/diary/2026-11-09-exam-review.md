# Diary: Review completed reading papers with the text, the key and DA/EN explanations

The result screen for a handed-in reading paper used to list Læseforståelse 2 answers as bare letters ("2A · 3: B / Right answer: C"). To see what a letter meant, the learner had to go back into the paper. This session made three changes, on branch `exam-review`:

- a read-only review screen, laid out like the exam desk;
- richer result rows;
- a Danish and English explanation for every item of all 23 reading papers (6 simulated, 17 official): why the key is right and why each wrong option is wrong.

## Step 1: Review screen and richer results

**Author:** main

### Prompt Context

**Verbatim prompt:** Also, could you update the completed exams flow in such a way that I can see my answers, along with the actual exam questions and correct answers? Right now one has to go back and forth to check the correct and attempted/wrong answers.
**Interpretation:** Show the questions, the learner's answers and the key together, next to the text.
**Inferred intent:** Review a finished attempt in one place.

### What I did
- **Review helper.** Added `/src/exam/review.ts`. `reviewItems()` builds one review item per question from `scorePart`, so the learner's own LF1 marking counts. Each item carries the prompt and the words its given and correct letters stand for.
- **Review screen.** Added `/app/exam/[paperId]/review.tsx`, read-only, built on `ReadingLayout`:
  - it reuses the item components in their revealed state;
  - cloze gaps in the text show ~~your word~~ → the right word;
  - 2B gaps show the paragraph you placed and the right one;
  - the task tabs show per-task scores;
  - LF1 can be self-marked here too;
  - `?task=` and `?item=` open it on a given question.
- **Item components.** In `/src/ui/exam/items.tsx`, a wrong pick turns warning-coloured once the key is shown (this applies to practice checks too). `Lf1Item` takes an `ok` override, so it follows the learner's own marking. Unanswered items say "No answer."
- **Result screen.** `/app/exam/[paperId]/result.tsx` gained a "Review with the text" button. Its rows now show the question and option text, plus a "See it in the text ›" link that opens the review on that question.

### Why
Most of the back-and-forth was caused by LF2 letters that the learner had to decode.

### What worked
The runner's practice-checked state already locked inputs and showed the key, so the review is mostly plumbing. I didn't touch `[part].tsx`.

### What didn't work
The Chrome extension was not connected: `Browser extension is not connected. Please ensure the Claude browser extension is installed and running`. A headless browser cannot get past sign-in without credentials, so the user checked the screen in their own browser.

### What I learned
Static expo-router routes (`review`, `result`) take precedence over the `[part]` segment.

### What was tricky
Getting LF1 right and wrong from the learner's self-marking instead of from the matcher (`Lf1Item` used to call `matchesKey` itself).

### What warrants review
Wrong picks are now warning-coloured in practice-mode checks as well as in the review.

### Future work
None.

## Step 2: Answer explanations for all 23 papers

**Author:** main

### Prompt Context

**Verbatim prompt:** In the new review screen, could you also add some explanations for the incorrect and correct answers? Basically explaining why the choices are incorrect or correct, in english as well as danish text.
**Interpretation:** Every item needs a reason for the key and for each distractor, in DA and EN. The user chose pre-written explanations (not live AI) for all 23 papers.
**Inferred intent:** Learn from mistakes without a teacher.

### What I did
- **Contract.** In `/src/content/exams/types.ts`:
  - `Explained {da, en}`;
  - `Why` (adds an optional `quote`);
  - `WhyNot` (per letter);
  - `why` / `whyNot` on LF1, MC and cloze items;
  - `why[]` / `whyNotExtra` on 2B.
- **Validator.** `/src/content/exams/explanations.ts` checks four things:
  - every item has an explanation in both languages;
  - `whyNot` covers exactly the unaccepted letters;
  - quotes are at most 40 words;
  - each quote is found in the text, with cloze texts read with their right words filled in.

  `papers.test.ts` runs it for every paper.
- **Writing.** 12 agents wrote sidecars, one owner per paper, in the scratchpad. A merge script added only the new fields to each paper JSON, and the agents re-validated after merging.
- **Verification.** 8 fresh agents, none of them authors of the papers they checked, re-read all 1,510 explanations against the texts and fixed 80 (about 5%):
  - about 12 misstated the text, e.g. crediting a discount to the wrong thing, "alene" invented, a "doesn't say" that the text does say;
  - most of the rest were vague ("giver ingen mening her" with no reason);
  - a few were wrong grammar claims or DA/EN mismatches.
- **UI.** `/src/ui/exam/Explanation.tsx` shows the panel under each item in the review:
  - "Du valgte X · why not" first;
  - then the quote and why the key is right;
  - then the other options in a fold-out;
  - a misplaced 2B paragraph says which gap it belongs in.

  A DA + EN / Dansk / English switch sits in the top bar.
- **Upload.** The user ran `npm run exam:upload`: `17 papers: 17 uploaded, 0 unchanged.`

### Why
Pre-written explanations work offline, cost nothing to run, and can be checked by tests. The user chose them over live AI.

### What worked
- The quote check caught real misquotes during writing ("sig" for "mig", "det er" for "er det").
- Stripping the explanation fields from each simulated paper gives a file identical to HEAD, so no shipped content changed.

### What didn't work
- **Typecheck.** After the merge, `tsc` failed in `/src/content/exams/simulated/index.ts`: `Conversion of type '…' to type 'ReadingPaper[]' may be a mistake … Type '(string | number)[]' is not comparable to type '[minPoints: number, grade: string]'`. The fix was to cast via `unknown`; `papers.test.ts` validates the shape.
- **Shared scratch folder.** Parallel agents worked in one folder. One ran `rm why/*.lf1.json why/*.lf2.json` and deleted another agent's chunk file, which that agent then rewrote. A helper `dump.mjs` was also overwritten. The verification pass used one folder per agent.
- **False report.** One verification agent reported shortening a pd3-2023-summer quote after a failed run. Neither happened: the quote was unchanged and its tests passed.
- **Stale cache.** After the upload, the user saw no explanations on pd3-2022-winter. A read-only query confirmed the server copy had them (`has why: true`). `loadPaper` had trusted the cached paper index, which a page opened straight from a link never refreshes. It now asks for that paper's `updated_at` before using a cached copy (`/src/exam/papers.ts`).

### What I learned
A deterministic quote check catches misquotes but not misreadings. The independent verification pass found the misreadings, at about 1 in 125 explanations.

### What was tricky
- 2B wrong picks are explained by where the paragraph really belongs.
- Forcensur rulings (`alsoCorrect`, `freePoint`) shrink or empty `whyNot`.

### What warrants review
- No native speaker has read the Danish in the explanations.
- Open content questions for the user:
  - sim-1 cloze gap 2: "ellers" may be a second right answer. Accepting it would rescore past attempts, so it was left.
  - pd3-2020-winter cloze gap 7 reads "mangel på på arbejdskraft", likely a transcription slip.
- Debatable official keys, kept and explained: 2018 W 2A Q2 and Q6, 2016 W 2A Q5, 2022 W 2A Q2, 2024 S LF1 Q9.
- Checked in the browser by the user: the review screen and, after the cache fix, the explanations on an official paper. Phone width was not checked; the top bar stacks four rows there.

### Future work
A native-speaker read of the explanations, and a decision on the two content questions above.
