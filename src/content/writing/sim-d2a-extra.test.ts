import { describe, expect, it } from 'vitest';
import { countWords } from './index';
import { TASK_TYPE_GUIDES } from './guides';
import { GRADED_D2A, SIM_TASKS_D2A } from './sim-d2a';
import { GRADED_D2A_EXTRA, SIM_TASKS_D2A_EXTRA } from './sim-d2a-extra';
import { BULLETS_BY_TYPE } from './types';

describe('extra simulated 2A tasks', () => {
  it('has three d2a tasks with the expected ids', () => {
    expect(SIM_TASKS_D2A_EXTRA.map((t) => t.id)).toEqual(['wsim-d2a-4', 'wsim-d2a-5', 'wsim-d2a-6']);
    for (const t of SIM_TASKS_D2A_EXTRA) {
      expect(t.type).toBe('d2a-diagram');
      expect(t.origin).toBe('simulated');
      expect(t.minWords).toBe(200);
      expect(t.intro.length, t.id).toBeGreaterThan(0);
    }
  });

  it('uses the d2a bullet keys, with the evaluation at 50 %', () => {
    for (const t of SIM_TASKS_D2A_EXTRA) {
      expect(t.bullets.map((b) => b.key), t.id).toEqual(BULLETS_BY_TYPE['d2a-diagram']);
      const evaluate = t.bullets.find((b) => b.key === 'evaluate');
      expect(evaluate?.share, t.id).toBe(0.5);
      expect(evaluate?.danish, t.id).toContain('ca. 50 % af den samlede besvarelse');
    }
    // One "fordele og ulemper" and one "Vurdér, om" bullet at least.
    const evals = SIM_TASKS_D2A_EXTRA.map((t) => t.bullets.find((b) => b.key === 'evaluate')?.danish ?? '');
    expect(evals.some((d) => d.startsWith('Vurdér fordele og ulemper ved'))).toBe(true);
    expect(evals.some((d) => d.startsWith('Vurdér, om '))).toBe(true);
  });

  it('has well-formed tables that admit the numbers are invented', () => {
    for (const t of SIM_TASKS_D2A_EXTRA) {
      const table = t.table;
      expect(table, t.id).toBeDefined();
      if (!table) continue;
      expect(table.source).toBe('Kilde: fiktive tal til øvebrug');
      expect(table.note).toMatch(/opfundet/);
      expect(table.rows.length).toBeGreaterThan(0);
      for (const row of table.rows) expect(row.length, `${t.id}: ${row.join(' | ')}`).toBe(table.columns.length);
    }
  });

  it('fills every d2a template slot with a hint and 2–4 starters', () => {
    const keys = TASK_TYPE_GUIDES['d2a-diagram'].template.map((s) => s.key).sort();
    for (const t of SIM_TASKS_D2A_EXTRA) {
      expect(Object.keys(t.slots ?? {}).sort(), t.id).toEqual(keys);
      for (const k of keys) {
        const slot = t.slots![k];
        expect(slot.hint.length, `${t.id}.${k}`).toBeGreaterThan(0);
        expect(slot.starters.length, `${t.id}.${k}`).toBeGreaterThanOrEqual(2);
        expect(slot.starters.length, `${t.id}.${k}`).toBeLessThanOrEqual(4);
      }
    }
  });

  it('has task tips and a word bank', () => {
    for (const t of SIM_TASKS_D2A_EXTRA) {
      expect(t.tips?.length ?? 0, t.id).toBeGreaterThanOrEqual(3);
      expect(t.tips?.length ?? 0, t.id).toBeLessThanOrEqual(5);
      expect(t.words?.length ?? 0, t.id).toBeGreaterThanOrEqual(10);
      expect(t.words?.length ?? 0, t.id).toBeLessThanOrEqual(15);
    }
  });
});

describe('extra illustrative 2A grade ladders', () => {
  it('has unique ids that do not clash with the first 2A set', () => {
    const ids = [...SIM_TASKS_D2A_EXTRA, ...GRADED_D2A_EXTRA].map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    const existing = new Set([...SIM_TASKS_D2A, ...GRADED_D2A].map((x) => x.id));
    for (const id of ids) expect(existing.has(id), id).toBe(false);
  });

  it('gives each task a full 12/7/4/02 ladder with the expected ids', () => {
    const taskIds = new Set(SIM_TASKS_D2A_EXTRA.map((t) => t.id));
    for (const a of GRADED_D2A_EXTRA) {
      expect(taskIds.has(a.taskId), a.id).toBe(true);
      expect(a.origin).toBe('illustrative');
      expect(a.id).toBe(`wgr-d2a-${a.taskId.split('-').pop()}-${a.band}`);
    }
    for (const t of SIM_TASKS_D2A_EXTRA) {
      expect(GRADED_D2A_EXTRA.filter((a) => a.taskId === t.id).map((a) => a.band), t.id).toEqual(['12', '7', '4', '02']);
    }
  });

  it('comments on all three criteria in order', () => {
    for (const a of GRADED_D2A_EXTRA) {
      expect(a.criteria.map((c) => c.criterion), a.id).toEqual(['task', 'pragmatic', 'linguistic']);
    }
  });

  it('quotes every annotation verbatim, with a fix for each error', () => {
    for (const a of GRADED_D2A_EXTRA) {
      expect(a.annotations.length, a.id).toBeGreaterThanOrEqual(4);
      expect(a.annotations.length, a.id).toBeLessThanOrEqual(8);
      for (const n of a.annotations) {
        expect(a.text.includes(n.quote), `${a.id}: "${n.quote}"`).toBe(true);
        if (n.kind === 'error') expect(n.fix, `${a.id}: "${n.quote}"`).toBeTruthy();
      }
    }
  });

  it('keeps the band-12 and band-7 answers at the 200-word minimum', () => {
    for (const a of GRADED_D2A_EXTRA.filter((x) => x.band === '12' || x.band === '7')) {
      expect(countWords(a.text), a.id).toBeGreaterThanOrEqual(200);
    }
  });
});
