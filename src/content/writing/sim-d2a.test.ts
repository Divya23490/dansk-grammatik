import { describe, expect, it } from 'vitest';
import { countWords } from './index';
import { GRADED_D2A, SIM_TASKS_D2A } from './sim-d2a';
import { BULLETS_BY_TYPE } from './types';

describe('simulated 2A tasks', () => {
  it('has three d2a tasks with the expected ids', () => {
    expect(SIM_TASKS_D2A.map((t) => t.id)).toEqual(['wsim-d2a-1', 'wsim-d2a-2', 'wsim-d2a-3']);
    for (const t of SIM_TASKS_D2A) {
      expect(t.type).toBe('d2a-diagram');
      expect(t.origin).toBe('simulated');
      expect(t.minWords).toBe(200);
    }
  });

  it('uses the official bullet keys, with the evaluation at 50 %', () => {
    for (const t of SIM_TASKS_D2A) {
      expect(t.bullets.map((b) => b.key), t.id).toEqual(BULLETS_BY_TYPE['d2a-diagram']);
      for (const b of t.bullets) expect(b.english.length, `${t.id} ${b.key}`).toBeGreaterThan(0);
      expect(t.bullets.find((b) => b.key === 'evaluate')?.share).toBe(0.5);
    }
  });

  it('has well-formed tables that admit the numbers are invented', () => {
    for (const t of SIM_TASKS_D2A) {
      const table = t.table;
      expect(table, t.id).toBeDefined();
      if (!table) continue;
      expect(table.rows.length).toBeGreaterThan(0);
      for (const row of table.rows) expect(row.length, `${t.id}: ${row.join(' | ')}`).toBe(table.columns.length);
      expect(`${table.source} ${table.note}`).toMatch(/fiktive|opfundet/);
    }
  });
});

describe('illustrative 2A grade ladder', () => {
  it('has unique ids and points at a real task', () => {
    const ids = GRADED_D2A.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    const taskIds = new Set(SIM_TASKS_D2A.map((t) => t.id));
    for (const a of GRADED_D2A) {
      expect(taskIds.has(a.taskId), a.id).toBe(true);
      expect(a.origin).toBe('illustrative');
    }
    for (const t of SIM_TASKS_D2A) {
      const ladder = GRADED_D2A.filter((a) => a.taskId === t.id);
      expect(ladder.map((a) => a.band).sort(), t.id).toEqual(['02', '12', '4', '7']);
      for (const a of ladder) expect(a.id).toBe(`wgr-${t.id.replace('wsim-', '')}-${a.band}`);
    }
  });

  it('comments on all three criteria', () => {
    for (const a of GRADED_D2A) {
      expect(a.criteria.map((c) => c.criterion).sort(), a.id).toEqual(['linguistic', 'pragmatic', 'task']);
    }
  });

  it('quotes every annotation verbatim, with a fix for each error', () => {
    for (const a of GRADED_D2A) {
      expect(a.annotations.length, a.id).toBeGreaterThanOrEqual(4);
      expect(a.annotations.length, a.id).toBeLessThanOrEqual(8);
      for (const n of a.annotations) {
        expect(a.text.includes(n.quote), `${a.id}: "${n.quote}"`).toBe(true);
        if (n.kind === 'error') expect(n.fix, `${a.id}: "${n.quote}"`).toBeTruthy();
      }
    }
  });

  it('keeps the passing-level answers at the 200-word minimum', () => {
    for (const a of GRADED_D2A.filter((x) => x.band === '12' || x.band === '7')) {
      expect(countWords(a.text), a.id).toBeGreaterThanOrEqual(200);
    }
  });
});
