import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { isDrillDomainKey } from '../drills/registry';
import { FORECAST_SECTIONS, FORECASTS, WORD_BANKS, type PhraseGroup } from './guesses2026';
import { WRITING_TASK_TYPES } from './writing';

const all = FORECAST_SECTIONS.flatMap((s) => FORECASTS[s.key]);

/** Does an in-app path resolve to a screen? Only the shapes this page links to. */
function routeExists(path: string): boolean {
  const [, a, b] = path.split('/');
  if (a === 'drill') return isDrillDomainKey(b);
  if (a === 'writing' && b) return (WRITING_TASK_TYPES as readonly string[]).includes(b);
  const app = join(__dirname, '../../app');
  return existsSync(join(app, `${path}.tsx`)) || existsSync(join(app, path, 'index.tsx'));
}

describe('November 2026 guesses', () => {
  it('covers every task of every section', () => {
    expect(FORECASTS.reading.map((x) => x.key)).toEqual(['lf1', 'lf2a', 'lf2b', 'lf3']);
    expect(FORECASTS.writing.map((x) => x.key)).toEqual(['d1', 'd2a', 'd2b']);
    expect(FORECASTS.speaking.map((x) => x.key)).toEqual(['oral1', 'oral2']);
  });

  it('gives each task its evidence, forecast and tips', () => {
    for (const task of all) {
      expect(task.seen.length, task.key).toBeGreaterThan(0);
      expect(task.pattern.trim(), task.key).not.toBe('');
      expect(task.likely.length, task.key).toBeGreaterThan(0);
      expect(task.tips.length, task.key).toBeGreaterThanOrEqual(4);
    }
  });

  it('has a cheat sheet for every writing and speaking task', () => {
    for (const task of [...FORECASTS.writing, ...FORECASTS.speaking]) expect(task.cheatSheet?.length, task.key).toBeGreaterThan(0);
  });

  it('pairs every Danish phrase with an English one', () => {
    const groups: PhraseGroup[] = [...all.flatMap((x) => x.cheatSheet ?? []), ...WORD_BANKS];
    for (const g of groups)
      for (const p of g.items) {
        expect(p.da.trim(), g.title).not.toBe('');
        expect(p.en.trim(), `${g.title}: ${p.da}`).not.toBe('');
      }
  });

  it('gives every reading and writing task both word lists, each word with English', () => {
    for (const task of [...FORECASTS.reading, ...FORECASTS.writing]) {
      expect(task.words?.likely.groups.length, task.key).toBeGreaterThan(0);
      expect(task.words?.revise.groups.length, task.key).toBeGreaterThan(0);
      const groups = [...task.words!.likely.groups, ...task.words!.revise.groups];
      const seen = new Set<string>();
      for (const g of groups)
        for (const w of g.items) {
          expect(w.da.trim(), g.title).not.toBe('');
          expect(w.en.trim(), `${task.key} ${g.title}: ${w.da}`).not.toBe('');
          // Within one group a word appears once (keys in the list must be unique).
          expect(seen.has(g.title + w.da), `${task.key} ${g.title}: ${w.da} twice`).toBe(false);
          seen.add(g.title + w.da);
        }
    }
  });

  it('gives the gap-fill the three word kinds it tests', () => {
    const titles = FORECASTS.reading.find((x) => x.key === 'lf3')!.words!.likely.groups.map((g) => g.title.toLowerCase()).join(' | ');
    for (const kind of ['connectors', 'preposition', 'verbs']) expect(titles).toContain(kind);
  });

  it('links only to screens that exist', () => {
    for (const task of all) for (const l of task.links ?? []) expect(routeExists(l.path), l.path).toBe(true);
  });
});
