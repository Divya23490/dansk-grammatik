import { describe, expect, it } from 'vitest';

import { countWords } from './index';
import { GRADED_D2B, SIM_TASKS_D2B } from './sim-d2b';
import { BULLETS_BY_TYPE } from './types';

describe('simulated 2B tasks', () => {
  it('has three tasks with unique ids', () => {
    expect(SIM_TASKS_D2B.map((t) => t.id)).toEqual(['wsim-d2b-1', 'wsim-d2b-2', 'wsim-d2b-3']);
  });

  it.each(SIM_TASKS_D2B)('$id is a well-formed d2b-list task', (task) => {
    expect(task.type).toBe('d2b-list');
    expect(task.origin).toBe('simulated');
    expect(task.list).toHaveLength(6);
    expect(task.bullets.map((b) => b.key)).toEqual(BULLETS_BY_TYPE['d2b-list']);
    expect(task.bullets.find((b) => b.key === 'evaluate')?.share).toBe(0.5);
    expect(task.minWords).toBe(200);
  });
});

describe('graded 2B ladder', () => {
  it('has unique ids, all illustrative and pointing at a sim task', () => {
    const ids = GRADED_D2B.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    const taskIds = new Set(SIM_TASKS_D2B.map((t) => t.id));
    for (const a of GRADED_D2B) {
      expect(a.origin).toBe('illustrative');
      expect(taskIds.has(a.taskId)).toBe(true);
    }
  });

  it.each(SIM_TASKS_D2B)('$id has a full 12/7/4/02 ladder', (task) => {
    expect(GRADED_D2B.filter((a) => a.taskId === task.id).map((a) => a.band)).toEqual(['12', '7', '4', '02']);
  });

  it.each(GRADED_D2B)('$id annotations quote the text exactly', (a) => {
    expect(a.annotations.length).toBeGreaterThanOrEqual(4);
    for (const n of a.annotations) {
      expect(a.text, n.quote).toContain(n.quote);
      if (n.kind === 'error') expect(n.fix).toBeTruthy();
    }
    expect(a.criteria.map((c) => c.criterion)).toEqual(['task', 'pragmatic', 'linguistic']);
  });

  it('band 12 and band 7 meet the 200-word minimum', () => {
    for (const band of ['12', '7'] as const) {
      for (const a of GRADED_D2B.filter((g) => g.band === band)) {
        expect(countWords(a.text), a.id).toBeGreaterThanOrEqual(200);
      }
    }
  });
});
