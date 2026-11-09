import { describe, expect, it } from 'vitest';
import { filledCloze, normalizeQuote, validateExplanations } from './explanations';
import { SIMULATED_PAPERS } from './simulated';
import type { ClozeTask, ReadingPaper } from './types';

const base = (): ReadingPaper => structuredClone(SIMULATED_PAPERS[0]);
const stripped = (): ReadingPaper => {
  const p = base();
  for (const q of p.lf1.questions) delete q.why;
  for (const task of p.lf2.tasks) {
    if (task.kind === 'insert') {
      delete task.why;
      delete task.whyNotExtra;
    } else for (const q of task.kind === 'mc' ? task.questions : task.gaps) {
      delete q.why;
      delete q.whyNot;
    }
  }
  return p;
};

describe('validateExplanations', () => {
  it('reports every missing explanation only when they are required', () => {
    const p = stripped();
    expect(validateExplanations(p, false)).toEqual([]);
    const problems = validateExplanations(p);
    expect(problems.some((m) => m.includes('LF1 q1: no explanation'))).toBe(true);
    expect(problems.some((m) => m.includes('no explanation for the wrong options'))).toBe(true);
  });

  it('checks quotes against the text and wrong-option letters against the key', () => {
    const p = stripped();
    const q = p.lf1.questions[0];
    q.why = { da: 'x', en: 'y', quote: 'ord der slet ikke står i teksten nogen steder' };
    const mc = p.lf2.tasks.find((x) => x.kind === 'mc')!;
    if (mc.kind !== 'mc') throw new Error();
    mc.questions[0].whyNot = { [mc.questions[0].correct]: { da: 'x', en: 'y' } };
    const problems = validateExplanations(p, false);
    expect(problems.some((m) => m.includes('LF1 q1: quote'))).toBe(true);
    expect(problems.some((m) => m.includes(`${mc.label} q1: wrong-option explanations are for [${mc.questions[0].correct}]`))).toBe(true);
  });

  it('reads a cloze text with the right words in its gaps', () => {
    const cloze = base().lf2.tasks.find((x): x is ClozeTask => x.kind === 'cloze')!;
    const word = cloze.gaps[0].options[cloze.gaps[0].correct.charCodeAt(0) - 65];
    expect(normalizeQuote(filledCloze(cloze))).toContain(normalizeQuote(word));
    expect(normalizeQuote('“Hej” – sagde   han…')).toBe('"hej" - sagde han...');
  });
});
