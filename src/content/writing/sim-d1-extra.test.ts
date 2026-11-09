import { describe, expect, it } from 'vitest';
import { RULES } from '../../grammar/rules';
import { TASK_TYPE_GUIDES } from './guides';
import { GRADED_D1_EXTRA, SIM_TASKS_D1_EXTRA } from './sim-d1-extra';
import { BULLETS_BY_TYPE } from './types';

const TASK_IDS = ['wsim-d1-4', 'wsim-d1-5', 'wsim-d1-6'];
const BANDS = ['12', '7', '4', '02'] as const;

describe('sim-d1 extra tasks', () => {
  it('has three simulated d1 tasks with the expected ids', () => {
    expect(SIM_TASKS_D1_EXTRA.map((t) => t.id)).toEqual(TASK_IDS);
    for (const t of SIM_TASKS_D1_EXTRA) {
      expect(t.type).toBe('d1-email');
      expect(t.origin).toBe('simulated');
      expect(t.session).toBeUndefined();
    }
  });

  it('underlined questions are verbatim substrings of the mail', () => {
    for (const t of SIM_TASKS_D1_EXTRA) {
      expect(t.mail).toBeDefined();
      const paras = t.mail!.paragraphs;
      expect(paras.length).toBeGreaterThanOrEqual(3);
      expect(paras.length).toBeLessThanOrEqual(4);
      expect(t.mail!.underlined.length).toBeGreaterThanOrEqual(3);
      expect(t.mail!.underlined.length).toBeLessThanOrEqual(4);
      for (const u of t.mail!.underlined) {
        expect(paras.some((p) => p.includes(u)), `${t.id}: ${u}`).toBe(true);
      }
    }
  });

  it('bullet keys match the d1 contract', () => {
    for (const t of SIM_TASKS_D1_EXTRA) {
      expect(t.bullets.map((b) => b.key)).toEqual(BULLETS_BY_TYPE['d1-email']);
    }
  });

  it('has a slot guide for exactly the d1 template keys', () => {
    const keys = TASK_TYPE_GUIDES['d1-email'].template.map((s) => s.key).sort();
    for (const t of SIM_TASKS_D1_EXTRA) {
      expect(Object.keys(t.slots ?? {}).sort(), t.id).toEqual(keys);
      for (const [key, slot] of Object.entries(t.slots!)) {
        expect(slot.hint.length, `${t.id}/${key}`).toBeGreaterThan(0);
        expect(slot.starters.length, `${t.id}/${key}`).toBeGreaterThanOrEqual(2);
        expect(slot.starters.length, `${t.id}/${key}`).toBeLessThanOrEqual(4);
      }
    }
  });

  it('has 3–5 tips and 10–15 words per task', () => {
    for (const t of SIM_TASKS_D1_EXTRA) {
      expect(t.tips?.length ?? 0, t.id).toBeGreaterThanOrEqual(3);
      expect(t.tips?.length ?? 0, t.id).toBeLessThanOrEqual(5);
      expect(t.words?.length ?? 0, t.id).toBeGreaterThanOrEqual(10);
      expect(t.words?.length ?? 0, t.id).toBeLessThanOrEqual(15);
    }
  });
});

describe('sim-d1 extra graded ladders', () => {
  it('has a 12/7/4/02 ladder per task with unique ids', () => {
    const expected = TASK_IDS.flatMap((id) => BANDS.map((b) => `wgr-d1-${id.slice(-1)}-${b}`));
    const ids = GRADED_D1_EXTRA.map((g) => g.id);
    expect(ids).toEqual(expected);
    expect(new Set(ids).size).toBe(ids.length);
    for (const g of GRADED_D1_EXTRA) {
      expect(g.taskId).toBe(`wsim-d1-${g.id.split('-')[2]}`);
      expect(g.id.endsWith(`-${g.band}`)).toBe(true);
      expect(g.origin).toBe('illustrative');
      expect(g.criteria.map((c) => c.criterion)).toEqual(['task', 'pragmatic', 'linguistic']);
    }
  });

  it('every annotation quote is in its text and errors carry a fix', () => {
    for (const g of GRADED_D1_EXTRA) {
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
