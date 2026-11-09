/**
 * A handed-in attempt, item by item, with everything needed to review it
 * without going back to the paper: the question, what was answered and what
 * the key says, both as letters and as the words those letters stand for.
 */

import type { Explained, ReadingPaper, Why, WhyNot } from '../content/exams/types';
import type { Attempt } from './attemptStore';
import { scorePart, type ItemResult } from './grade';

export interface ReviewItem extends ItemResult {
  /** Index of the Læseforståelse 2 task; -1 in Læseforståelse 1. */
  task: number;
  /** Question or gap number within its task. */
  n: number;
  /** The question asked (LF1 and multiple choice); cloze and insert items have none. */
  prompt?: string;
  /** What the given letter stands for: the option, word or paragraph. */
  givenText?: string;
  /** What the right letter stands for. */
  keyText?: string;
  /** Why the right answer is right. */
  why?: Why;
  /** Why each other option is wrong, in option order; `picked` marks the learner's choice. */
  whyNot?: WrongOption[];
}

export interface WrongOption extends Explained {
  letter: string;
  /** The option, word or paragraph the letter stands for. */
  text?: string;
  picked: boolean;
  /** 2B: the gap this paragraph really belongs in, when it belongs in another one. */
  belongsIn?: number;
}

const wrongOptions = (options: string[], whyNot: WhyNot | undefined, given: string): WrongOption[] =>
  options.flatMap((text, i) => {
    const letter = String.fromCharCode(65 + i);
    const e = whyNot?.[letter];
    return e ? [{ letter, text, da: e.da, en: e.en, picked: letter === given }] : [];
  });

const letterIndex = (letter: string) => (letter ? letter.charCodeAt(0) - 65 : -1);
const pick = (options: string[], letter: string) => options[letterIndex(letter)];

/**
 * Every item of the attempt in paper order. Right or wrong comes from
 * `scorePart`, so the learner's own LF1 marking counts here too.
 */
export function reviewItems(paper: ReadingPaper, attempt: Attempt): ReviewItem[] {
  const score = scorePart(paper, attempt.part, attempt.answers, attempt.selfMarks);

  if (attempt.part === 'lf1') {
    return score.items.map((item) => {
      const q = paper.lf1.questions.find((x) => `q${x.n}` === item.id);
      return { ...item, task: -1, n: q?.n ?? 0, prompt: q?.prompt, why: q?.why };
    });
  }

  return score.items.map((item) => {
    const [ti, n] = item.id.split(':').map(Number);
    const task = paper.lf2.tasks[ti];
    const base = { ...item, task: ti, n };
    switch (task.kind) {
      case 'mc': {
        const q = task.questions[n - 1];
        return {
          ...base,
          prompt: q.prompt,
          givenText: pick(q.options, item.given),
          keyText: pick(q.options, q.correct),
          why: q.why,
          whyNot: wrongOptions(q.options, q.whyNot, item.given),
        };
      }
      case 'cloze': {
        const g = task.gaps[n - 1];
        return {
          ...base,
          givenText: pick(g.options, item.given),
          keyText: pick(g.options, g.correct),
          why: g.why,
          whyNot: wrongOptions(g.options, g.whyNot, item.given),
        };
      }
      case 'insert': {
        const text = (letter: string) => task.inserts.find((x) => x.letter === letter)?.text;
        // A paragraph put in the wrong gap is explained by where it really goes,
        // or, if it goes nowhere, by why it is an extra.
        const whyNot: WrongOption[] = [];
        if (item.given && !item.correct) {
          const home = task.correct.indexOf(item.given);
          const extra = task.whyNotExtra?.[item.given];
          const reason = home >= 0 ? task.why?.[home] : extra;
          if (reason)
            whyNot.push({
              letter: item.given,
              text: text(item.given),
              da: reason.da,
              en: reason.en,
              picked: true,
              belongsIn: home >= 0 ? home + 1 : undefined,
            });
        }
        return { ...base, givenText: text(item.given), keyText: text(task.correct[n - 1]), why: task.why?.[n - 1], whyNot };
      }
    }
  });
}

/** Points per Læseforståelse 2 task, for the task switcher. */
export function taskScores(items: ReviewItem[]): Record<number, { points: number; max: number }> {
  const out: Record<number, { points: number; max: number }> = {};
  for (const it of items) {
    const s = (out[it.task] ??= { points: 0, max: 0 });
    s.points += it.points;
    s.max += it.max;
  }
  return out;
}
