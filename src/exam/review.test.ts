import { describe, expect, it } from 'vitest';
import { SIMULATED_PAPERS } from '../content/exams/simulated';
import type { Attempt } from './attemptStore';
import { lf2ItemId, partMax } from './grade';
import { reviewItems, taskScores } from './review';

const paper = SIMULATED_PAPERS.find((p) => p.format === 'current')!;

const attempt = (part: Attempt['part'], answers: Attempt['answers'], selfMarks: Attempt['selfMarks'] = {}): Attempt => ({
  id: 'a',
  paperId: paper.id,
  part,
  mode: 'exam',
  answers,
  selfMarks,
  points: 0,
  max: 0,
  durationMs: 0,
  finishedAt: 0,
  updatedAt: 0,
});

const wrongLetter = (right: string, letters: string[]) => letters.find((l) => l !== right)!;

describe('reviewItems', () => {
  it('gives LF1 items their prompt and honours self-marking', () => {
    const [q1, q2] = paper.lf1.questions;
    const items = reviewItems(paper, attempt('lf1', { q1: 'noget helt andet', q2: '' }, { q1: true }));
    expect(items).toHaveLength(paper.lf1.questions.length);
    expect(items[0]).toMatchObject({ id: 'q1', task: -1, n: q1.n, prompt: q1.prompt, correct: true, selfMarked: true });
    expect(items[1]).toMatchObject({ id: 'q2', prompt: q2.prompt, given: '', key: q2.key });
    expect(items[1].correct).toBe(!!q2.freePoint);
  });

  it('spells out the letters of every LF2 task kind, and leaves unanswered items blank', () => {
    const answers: Attempt['answers'] = {};
    paper.lf2.tasks.forEach((task, ti) => {
      if (task.kind === 'mc') answers[lf2ItemId(ti, 1)] = task.questions[0].correct;
      if (task.kind === 'cloze') answers[lf2ItemId(ti, 1)] = wrongLetter(task.gaps[0].correct, ['A', 'B', 'C', 'D']);
      if (task.kind === 'insert')
        answers[lf2ItemId(ti, 1)] = wrongLetter(task.correct[0], task.inserts.map((x) => x.letter));
    });
    const items = reviewItems(paper, attempt('lf2', answers));
    const first = (ti: number) => items.find((it) => it.id === lf2ItemId(ti, 1))!;

    paper.lf2.tasks.forEach((task, ti) => {
      const it = first(ti);
      expect(it.task).toBe(ti);
      expect(it.n).toBe(1);
      if (task.kind === 'mc') {
        const q = task.questions[0];
        expect(it).toMatchObject({ prompt: q.prompt, correct: true });
        expect(it.givenText).toBe(it.keyText);
        expect(it.keyText).toBe(q.options[q.correct.charCodeAt(0) - 65]);
      }
      if (task.kind === 'cloze') {
        const g = task.gaps[0];
        expect(it.correct).toBe(!!g.alsoCorrect?.includes(it.given));
        expect(it.givenText).toBe(g.options[it.given.charCodeAt(0) - 65]);
        expect(it.keyText).toBe(g.options[g.correct.charCodeAt(0) - 65]);
      }
      if (task.kind === 'insert') {
        expect(it.correct).toBe(false);
        expect(it.givenText).toBe(task.inserts.find((x) => x.letter === it.given)!.text);
        expect(it.keyText).toBe(task.inserts.find((x) => x.letter === task.correct[0])!.text);
      }
      const blank = items.find((x) => x.id === lf2ItemId(ti, 2))!;
      expect(blank).toMatchObject({ given: '', correct: false, points: 0 });
      expect(blank.givenText).toBeUndefined();
      expect(blank.keyText).toBeTruthy();
    });

    const scores = taskScores(items);
    expect(Object.keys(scores)).toHaveLength(paper.lf2.tasks.length);
    expect(Object.values(scores).reduce((s, x) => s + x.max, 0)).toBe(partMax(paper, 'lf2'));
  });
});

describe('reviewItems explanations', () => {
  const withWhy = () => {
    const p = structuredClone(paper);
    p.lf2.tasks.forEach((task) => {
      if (task.kind === 'insert') {
        task.why = task.correct.map((_, i) => ({ da: `hul ${i + 1}`, en: `gap ${i + 1}` }));
        const extras = task.inserts.map((x) => x.letter).filter((l) => !task.correct.includes(l));
        task.whyNotExtra = Object.fromEntries(extras.map((l) => [l, { da: `ekstra ${l}`, en: `extra ${l}` }]));
      } else {
        const list = task.kind === 'mc' ? task.questions : task.gaps;
        for (const q of list) {
          q.why = { da: 'fordi', en: 'because', quote: 'x' };
          q.whyNot = Object.fromEntries(
            q.options.map((_, j) => String.fromCharCode(65 + j)).filter((l) => l !== q.correct).map((l) => [l, { da: `ikke ${l}`, en: `not ${l}` }]),
          );
        }
      }
    });
    return p;
  };

  it('marks the wrong option the learner picked, and lists the others', () => {
    const p = withWhy();
    const ti = p.lf2.tasks.findIndex((x) => x.kind === 'mc');
    const q = (p.lf2.tasks[ti] as Extract<(typeof p.lf2.tasks)[number], { kind: 'mc' }>).questions[0];
    const wrong = wrongLetter(q.correct, ['A', 'B', 'C']);
    const it = reviewItems(p, { ...attempt('lf2', { [lf2ItemId(ti, 1)]: wrong }), paperId: p.id }).find((x) => x.id === lf2ItemId(ti, 1))!;
    expect(it.why?.en).toBe('because');
    expect(it.whyNot?.map((w) => w.letter)).toEqual(['A', 'B', 'C'].filter((l) => l !== q.correct));
    expect(it.whyNot?.filter((w) => w.picked).map((w) => w.letter)).toEqual([wrong]);
  });

  it('explains a misplaced 2B paragraph by where it belongs, or why it is an extra', () => {
    const p = withWhy();
    const ti = p.lf2.tasks.findIndex((x) => x.kind === 'insert');
    if (ti < 0) return;
    const task = p.lf2.tasks[ti] as Extract<(typeof p.lf2.tasks)[number], { kind: 'insert' }>;
    const extra = task.inserts.map((x) => x.letter).find((l) => !task.correct.includes(l))!;
    const items = reviewItems(p, attempt('lf2', { [lf2ItemId(ti, 1)]: task.correct[1], [lf2ItemId(ti, 2)]: extra }));
    const one = items.find((x) => x.id === lf2ItemId(ti, 1))!;
    const two = items.find((x) => x.id === lf2ItemId(ti, 2))!;
    expect(one.why?.en).toBe('gap 1');
    expect(one.whyNot).toMatchObject([{ letter: task.correct[1], belongsIn: 2, en: 'gap 2', picked: true }]);
    expect(two.whyNot).toMatchObject([{ letter: extra, en: `extra ${extra}`, picked: true }]);
    expect(two.whyNot?.[0].belongsIn).toBeUndefined();
  });
});
