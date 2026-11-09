import { describe, expect, it } from 'vitest';
import {
  BULLETS_BY_TYPE,
  GRADED_ANSWERS,
  OFFICIAL_EXAMPLES,
  SIM_WRITING_TASKS,
  TASK_TYPE_GUIDES,
  WRITING_TASK_TYPES,
  countWords,
  gradedForType,
  simTasksOfType,
} from '.';
import { RULES } from '../../grammar/rules';

describe('writing prep content', () => {
  it.each(WRITING_TASK_TYPES)('%s has a full guide', (type) => {
    const g = TASK_TYPE_GUIDES[type];
    expect(g.type).toBe(type);
    expect(g.summary.length).toBeGreaterThan(0);
    expect(g.officialBullets.map((b) => b.key)).toEqual(BULLETS_BY_TYPE[type]);
    expect(g.tips.flatMap((t) => t.tips).length).toBeGreaterThanOrEqual(8);
    expect(g.template.length).toBeGreaterThanOrEqual(4);
    expect(g.phrases.length).toBeGreaterThanOrEqual(4);
    expect(g.pitfalls.length).toBeGreaterThanOrEqual(6);
    for (const slot of g.template) {
      expect(slot.starters.length, slot.key).toBeGreaterThanOrEqual(2);
      expect(slot.words[0]).toBeLessThanOrEqual(slot.words[1]);
    }
    // Every bullet is answered by at least one template slot.
    for (const key of BULLETS_BY_TYPE[type]) {
      expect(g.template.some((s) => s.bullet === key), `${type}: no slot for ${key}`).toBe(true);
    }
  });

  it('gives the evaluation point about half of the D2 template budget', () => {
    for (const type of ['d2a-diagram', 'd2b-list'] as const) {
      const slots = TASK_TYPE_GUIDES[type].template;
      const mid = (s: (typeof slots)[number]) => (s.words[0] + s.words[1]) / 2;
      const total = slots.reduce((n, s) => n + mid(s), 0);
      const evaluate = slots.filter((s) => s.bullet === 'evaluate').reduce((n, s) => n + mid(s), 0);
      expect(evaluate / total, type).toBeGreaterThan(0.38);
    }
  });

  it('keeps ids unique across guides, tasks and examples', () => {
    const pitfalls = WRITING_TASK_TYPES.flatMap((t) => TASK_TYPE_GUIDES[t].pitfalls.map((p) => p.id));
    expect(new Set(pitfalls).size).toBe(pitfalls.length);
    const all = [...SIM_WRITING_TASKS, ...GRADED_ANSWERS, ...OFFICIAL_EXAMPLES].map((x) => x.id);
    expect(new Set(all).size).toBe(all.length);
  });

  it('only links rules that exist', () => {
    const ruleIds = [
      ...WRITING_TASK_TYPES.flatMap((t) => TASK_TYPE_GUIDES[t].pitfalls.map((p) => p.ruleId)),
      ...GRADED_ANSWERS.flatMap((a) => a.annotations.map((n) => n.ruleId)),
    ].filter(Boolean) as string[];
    for (const id of ruleIds) expect(RULES, id).toHaveProperty(id);
  });

  it.each(WRITING_TASK_TYPES)('%s has simulated tasks and a 12→02 ladder', (type) => {
    const tasks = simTasksOfType(type);
    expect(tasks.length).toBeGreaterThanOrEqual(6);
    for (const t of tasks) {
      expect(t.origin).toBe('simulated');
      expect(t.session).toBeUndefined();
      expect(t.bullets.map((b) => b.key)).toEqual(BULLETS_BY_TYPE[type]);
    }
    const ladder = gradedForType(type);
    expect(ladder.length).toBeGreaterThanOrEqual(4);
    for (const a of ladder) {
      expect(a.origin).toBe('illustrative');
      expect(a.criteria.map((c) => c.criterion).sort()).toEqual(['linguistic', 'pragmatic', 'task']);
      for (const n of a.annotations) expect(a.text, `${a.id}: “${n.quote}”`).toContain(n.quote);
    }
  });

  it('gives every simulated task topic help for every template slot', () => {
    for (const task of SIM_WRITING_TASKS) {
      const keys = TASK_TYPE_GUIDES[task.type].template.map((sl) => sl.key);
      expect(Object.keys(task.slots ?? {}).sort(), task.id).toEqual([...keys].sort());
      for (const k of keys) expect(task.slots![k].starters.length, `${task.id}.${k}`).toBeGreaterThanOrEqual(2);
    }
  });

  it('gives every simulated task a full ladder, tips and a word bank', () => {
    for (const task of SIM_WRITING_TASKS) {
      const bands = GRADED_ANSWERS.filter((a) => a.taskId === task.id).map((a) => a.band);
      expect(bands.sort(), task.id).toEqual(['02', '12', '4', '7']);
      expect(task.tips?.length ?? 0, `${task.id} tips`).toBeGreaterThanOrEqual(3);
      expect(task.words?.length ?? 0, `${task.id} words`).toBeGreaterThanOrEqual(10);
    }
  });

  it('keeps the top D2 answers near the target length', () => {
    for (const a of GRADED_ANSWERS.filter((x) => x.band === '12' && !x.taskId.startsWith('wsim-d1'))) {
      const n = countWords(a.text);
      expect(n, a.id).toBeGreaterThanOrEqual(200);
      expect(n, a.id).toBeLessThanOrEqual(300);
    }
  });

  it('links official examples instead of copying them', () => {
    expect(OFFICIAL_EXAMPLES.length).toBeGreaterThan(0);
    for (const e of OFFICIAL_EXAMPLES) expect(e.url).toMatch(/^https:\/\//);
  });
});
