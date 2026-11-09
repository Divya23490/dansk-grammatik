import { describe, expect, it } from 'vitest';
import { RULES } from '../../grammar/rules';
import { GRADED_D1, SIM_TASKS_D1 } from './sim-d1';
import { BULLETS_BY_TYPE } from './types';

describe('sim-d1 tasks', () => {
  it('has three d1 tasks with unique ids', () => {
    expect(SIM_TASKS_D1.map((t) => t.id)).toEqual(['wsim-d1-1', 'wsim-d1-2', 'wsim-d1-3']);
    for (const t of SIM_TASKS_D1) {
      expect(t.type).toBe('d1-email');
      expect(t.origin).toBe('simulated');
      expect(t.minWords).toBeUndefined();
    }
  });

  it('underlined parts are verbatim substrings of the mail', () => {
    for (const t of SIM_TASKS_D1) {
      expect(t.mail).toBeDefined();
      const body = t.mail!.paragraphs.join('\n');
      expect(t.mail!.underlined.length).toBeGreaterThanOrEqual(3);
      for (const u of t.mail!.underlined) expect(body, `${t.id}: ${u}`).toContain(u);
    }
  });

  it('bullet keys match the d1 contract', () => {
    for (const t of SIM_TASKS_D1) {
      expect(t.bullets.map((b) => b.key)).toEqual(BULLETS_BY_TYPE['d1-email']);
    }
  });
});

describe('sim-d1 graded ladder', () => {
  it('has four bands for every task with unique ids', () => {
    const ids = SIM_TASKS_D1.flatMap((t) => ['12', '7', '4', '02'].map((b) => `wgr-${t.id.slice(5)}-${b}`));
    expect(GRADED_D1.map((g) => g.id)).toEqual(ids);
    for (const t of SIM_TASKS_D1) {
      expect(GRADED_D1.filter((g) => g.taskId === t.id).map((g) => g.band)).toEqual(['12', '7', '4', '02']);
    }
    for (const g of GRADED_D1) {
      expect(g.id.startsWith(`wgr-${g.taskId.slice(5)}-`)).toBe(true);
      expect(g.origin).toBe('illustrative');
      expect(g.criteria.map((c) => c.criterion)).toEqual(['task', 'pragmatic', 'linguistic']);
    }
  });

  it('gives every task 3-5 tips and 10-15 words', () => {
    for (const t of SIM_TASKS_D1) {
      expect(t.tips?.length, t.id).toBeGreaterThanOrEqual(3);
      expect(t.tips?.length, t.id).toBeLessThanOrEqual(5);
      expect(t.words?.length, t.id).toBeGreaterThanOrEqual(10);
      expect(t.words?.length, t.id).toBeLessThanOrEqual(15);
    }
  });

  it('every annotation quote is in its text and errors carry a fix', () => {
    for (const g of GRADED_D1) {
      expect(g.annotations.length).toBeGreaterThanOrEqual(4);
      expect(g.annotations.length).toBeLessThanOrEqual(8);
      for (const a of g.annotations) {
        expect(g.text, `${g.id}: ${a.quote}`).toContain(a.quote);
        if (a.kind === 'error') expect(a.fix, `${g.id}: ${a.quote}`).toBeTruthy();
        if (a.ruleId) expect(RULES[a.ruleId]).toBeDefined();
      }
    }
  });
});
