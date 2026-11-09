import { describe, expect, it } from 'vitest';
import { analyseAnswer, toFeedbackTask } from './analyse';
import type { PracticeTask, TaskTypeGuide, TemplateSlot } from '../content/writing/types';

const w = (n: number, word = 'ord') => Array.from({ length: n }, () => word).join(' ');

const slot = (key: string, bullet?: TemplateSlot['bullet']): TemplateSlot => ({
  key, title: key, purpose: '', words: [20, 60], bullet, starters: [],
});

const guide = (type: TaskTypeGuide['type'], template: TemplateSlot[]): TaskTypeGuide => ({
  type, name: type, danish: type, summary: '', time: '', targetWords: [200, 250],
  officialBullets: [], tips: [], template, phrases: [], pitfalls: [],
});

const d2: PracticeTask = {
  id: 'fx-d2a', type: 'd2a-diagram', title: 'Fixture', origin: 'simulated', intro: 'Intro',
  minWords: 200,
  bullets: [
    { key: 'describe', danish: 'Beskriv hovedtræk', english: 'describe the main trends' },
    { key: 'causes', danish: 'Forklar årsager', english: 'explain possible causes' },
    { key: 'evaluate', danish: 'Vurder', english: 'give your own evaluation', share: 0.5 },
  ],
};
const d2Guide = guide('d2a-diagram', [
  slot('intro'), slot('trends', 'describe'), slot('why', 'causes'), slot('opinion', 'evaluate'), slot('end'),
]);

const d1: PracticeTask = {
  id: 'fx-d1', type: 'd1-email', title: 'Fixture', origin: 'simulated', intro: 'Svar Anna',
  mail: {
    from: 'Anna', paragraphs: [],
    underlined: ['Hvad laver du i weekenden?', 'Hvordan går det med din nye lejlighed?'],
  },
  bullets: [
    { key: 'thanks', danish: 'Tak for mailen', english: 'thank her for the mail' },
    { key: 'underlined', danish: 'Svar på spørgsmålene', english: 'answer the underlined questions' },
    { key: 'proposal', danish: 'Kom med et forslag', english: 'make a proposal' },
  ],
};
const d1Guide = guide('d1-email', []);

const goodMail = `Hej Anna\n\nTak for din mail. I weekenden skal jeg på tur. ${w(120)} Min lejlighed er dejlig.\n\nKærlig hilsen\nSushant`;

describe('length', () => {
  it('flags D2 under the minimum', () => {
    const r = analyseAnswer(d2, w(150), undefined, d2Guide);
    expect(r.wordCount).toBe(150);
    expect(r.notes.join()).toMatch(/at least 200 words/);
  });

  it('flags D2 far over target', () => {
    const r = analyseAnswer(d2, w(340), undefined, d2Guide);
    expect(r.notes.join()).toMatch(/200–250 words/);
  });

  it('is silent for D2 in the sweet spot', () => {
    expect(analyseAnswer(d2, w(230), undefined, d2Guide).notes).toEqual([]);
  });

  it('flags a thin D1 e-mail', () => {
    const r = analyseAnswer(d1, `Hej Anna. Weekenden og lejligheden er fine. ${w(40)} Knus`, undefined, d1Guide);
    expect(r.notes.join()).toMatch(/too thin/);
  });
});

describe('template mode', () => {
  const full = { intro: w(20), trends: w(40), why: w(40), opinion: w(110), end: w(15) };

  it('is silent when every bullet is covered and evaluation is half', () => {
    expect(analyseAnswer(d2, w(225), full, d2Guide).notes).toEqual([]);
  });

  it('flags an empty or thin bullet slot with its English gloss', () => {
    const r = analyseAnswer(d2, w(225), { ...full, why: w(5) }, d2Guide);
    expect(r.notes).toContain("You haven't answered bullet: explain possible causes");
  });

  it('flags an evaluation that is far below half', () => {
    const r = analyseAnswer(d2, w(225), { ...full, trends: w(80), why: w(80), opinion: w(30) }, d2Guide);
    const note = r.notes.find((n) => n.includes('evaluation point'));
    expect(note).toMatch(/about half the answer — yours is 13%/);
  });

  it('falls back to slot key = bullet key when the guide has no template', () => {
    const r = analyseAnswer(d2, w(225), { describe: w(60), causes: w(0), evaluate: w(100) }, guide('d2a-diagram', []));
    expect(r.notes).toContain("You haven't answered bullet: explain possible causes");
  });
});

describe('D1 e-mail', () => {
  it('is silent on a complete e-mail', () => {
    expect(analyseAnswer(d1, goodMail, undefined, d1Guide).notes).toEqual([]);
  });

  it('hints at an underlined question that seems unanswered', () => {
    const r = analyseAnswer(d1, goodMail.replace('Min lejlighed er dejlig.', ''), undefined, d1Guide);
    expect(r.notes).toEqual([
      'You may not have answered: “Hvordan går det med din nye lejlighed?” — check that your e-mail responds to it.',
    ]);
  });

  it('accepts an inflected form via the 5-letter stem', () => {
    const text = goodMail.replace('Min lejlighed er dejlig.', 'Lejligheden er dejlig.');
    expect(analyseAnswer(d1, text, undefined, d1Guide).notes).toEqual([]);
  });

  it('notes a missing greeting', () => {
    const r = analyseAnswer(d1, goodMail.replace('Hej Anna', 'Anna'), undefined, d1Guide);
    expect(r.notes.join()).toMatch(/greeting/);
  });

  it('notes a missing closing', () => {
    const r = analyseAnswer(d1, goodMail.replace('Kærlig hilsen', ''), undefined, d1Guide);
    expect(r.notes.join()).toMatch(/closing/);
  });
});

describe('toFeedbackTask', () => {
  it('passes the bullets as focus and the minimum', () => {
    const t = toFeedbackTask(d2);
    expect(t.kind).toBe('essay');
    expect(t.focus).toEqual(['Beskriv hovedtræk', 'Forklar årsager', 'Vurder']);
    expect(t.minWords).toBe(200);
    const l = toFeedbackTask(d1);
    expect(l).toMatchObject({ kind: 'letter', register: 'uformel' });
  });
});
