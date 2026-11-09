import { describe, expect, it } from 'vitest';

import { GRADED_ANSWERS, SIM_WRITING_TASKS, TASK_TYPE_GUIDES, countWords } from './index';
import { GRADED_D2B_EXTRA, SIM_TASKS_D2B_EXTRA } from './sim-d2b-extra';
import { BULLETS_BY_TYPE } from './types';

const TEMPLATE_KEYS = TASK_TYPE_GUIDES['d2b-list'].template.map((s) => s.key);
const BANDS = ['12', '7', '4', '02'] as const;

describe('extra simulated 2B tasks', () => {
  it('has tasks 4–6 in order', () => {
    expect(SIM_TASKS_D2B_EXTRA.map((t) => t.id)).toEqual(['wsim-d2b-4', 'wsim-d2b-5', 'wsim-d2b-6']);
  });

  it.each(SIM_TASKS_D2B_EXTRA)('$id is a well-formed d2b-list task', (task) => {
    expect(task.type).toBe('d2b-list');
    expect(task.origin).toBe('simulated');
    expect(task.list).toHaveLength(6);
    expect(task.minWords).toBe(200);
    expect(task.bullets.map((b) => b.key)).toEqual(BULLETS_BY_TYPE['d2b-list']);
    const evaluate = task.bullets.find((b) => b.key === 'evaluate')!;
    expect(evaluate.share).toBe(0.5);
    expect(evaluate.danish).toContain('(Besvarelsen af dette punkt skal udgøre ca. 50 % af den samlede besvarelse).');
    expect(task.bullets.filter((b) => b.key !== 'evaluate').every((b) => b.share === undefined)).toBe(true);
  });

  it.each(SIM_TASKS_D2B_EXTRA)('$id has topic help for exactly the template slots, plus tips and words', (task) => {
    expect(Object.keys(task.slots ?? {}).sort()).toEqual([...TEMPLATE_KEYS].sort());
    for (const k of TEMPLATE_KEYS) {
      const slot = task.slots![k];
      expect(slot.hint.length, `${task.id}.${k}`).toBeGreaterThan(0);
      expect(slot.starters.length, `${task.id}.${k}`).toBeGreaterThanOrEqual(2);
      expect(slot.starters.length, `${task.id}.${k}`).toBeLessThanOrEqual(4);
    }
    expect(task.tips?.length).toBeGreaterThanOrEqual(3);
    expect(task.tips?.length).toBeLessThanOrEqual(5);
    expect(task.words?.length).toBeGreaterThanOrEqual(10);
    expect(task.words?.length).toBeLessThanOrEqual(15);
  });

  it('varies the evaluate bullet: pros and cons, a yes/no question, and whose responsibility', () => {
    const evals = SIM_TASKS_D2B_EXTRA.map((t) => t.bullets.find((b) => b.key === 'evaluate')!.danish);
    expect(evals[0]).toMatch(/^Vurdér fordele og ulemper ved /);
    expect(evals[1]).toMatch(/^Vurdér, om /);
    expect(evals[2]).toMatch(/ansvar/);
  });
});

describe('extra graded 2B ladders', () => {
  it('gives each task a full 12/7/4/02 ladder with the expected ids', () => {
    for (const [i, task] of SIM_TASKS_D2B_EXTRA.entries()) {
      const n = i + 4;
      const ladder = GRADED_D2B_EXTRA.filter((a) => a.taskId === task.id);
      expect(ladder.map((a) => a.band)).toEqual([...BANDS]);
      expect(ladder.map((a) => a.id)).toEqual(BANDS.map((b) => `wgr-d2b-${n}-${b}`));
    }
    expect(GRADED_D2B_EXTRA).toHaveLength(12);
  });

  it('keeps ids unique, here and across all writing content', () => {
    const own = [...SIM_TASKS_D2B_EXTRA, ...GRADED_D2B_EXTRA].map((x) => x.id);
    expect(new Set(own).size).toBe(own.length);
    const all = [...SIM_WRITING_TASKS, ...GRADED_ANSWERS].map((x) => x.id);
    for (const id of own) expect(all.filter((x) => x === id), id).toHaveLength(1);
  });

  it.each(GRADED_D2B_EXTRA)('$id quotes its own text in every annotation', (a) => {
    expect(a.origin).toBe('illustrative');
    expect(a.criteria.map((c) => c.criterion)).toEqual(['task', 'pragmatic', 'linguistic']);
    expect(a.annotations.length).toBeGreaterThanOrEqual(4);
    expect(a.annotations.length).toBeLessThanOrEqual(8);
    for (const n of a.annotations) {
      expect(a.text, n.quote).toContain(n.quote);
      if (n.kind === 'error') expect(n.fix, n.quote).toBeTruthy();
    }
  });

  it.each(GRADED_D2B_EXTRA.filter((a) => a.band === '12' || a.band === '7'))(
    '$id (band $band) has at least 200 words',
    (a) => {
      expect(countWords(a.text)).toBeGreaterThanOrEqual(200);
    },
  );
});
