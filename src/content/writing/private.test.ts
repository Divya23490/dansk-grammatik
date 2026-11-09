/**
 * Writing content is well-formed.
 *
 * The validators are always unit-tested with small inline fixtures. Private
 * items (official tasks and learner samples) live in content-private/writing/
 * (kept out of git); they are checked whenever that folder is present, i.e. on
 * the machine that transcribes and uploads them. Each file holds one
 * WritingItem and is named `${id}.json`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { SIM_WRITING_TASKS } from './index';
import type { LearnerSample, PracticeTask, WritingItem } from './types';
import { validateLearnerSample, validatePracticeTask, validateWritingItem } from './validate';

// ── Private items ───────────────────────────────────────────────────────────

const DIR = path.join(__dirname, '../../../content-private/writing');

interface Loaded {
  file: string;
  item?: WritingItem;
  parseError?: string;
}

function load(): Loaded[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((file) => {
      try {
        return { file, item: JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8')) as WritingItem };
      } catch (e) {
        return { file, parseError: e instanceof Error ? e.message : String(e) };
      }
    });
}

const loaded = load();
const items = loaded.flatMap((l) => (l.item ? [l.item] : []));
const taskIds = new Set<string>([
  ...SIM_WRITING_TASKS.map((t) => t.id),
  ...items.filter((i) => i.kind === 'official-task').map((i) => i.id),
]);
const only = process.env.WRITING;

describe.skipIf(!fs.existsSync(DIR))('private writing items (content-private/writing)', () => {
  it('have unique ids matching their file names', () => {
    const problems: string[] = [];
    const seen = new Set<string>();
    for (const l of loaded) {
      if (!l.item) continue;
      if (`${l.item.id}.json` !== l.file) problems.push(`${l.file}: id is "${l.item.id}"`);
      if (seen.has(l.item.id)) problems.push(`${l.file}: duplicate id "${l.item.id}"`);
      seen.add(l.item.id);
    }
    expect(problems).toEqual([]);
  });

  for (const l of loaded.filter((x) => !only || x.file === `${only}.json`)) {
    it(`${l.file} is well-formed`, () => {
      const errors = l.parseError ? [`invalid JSON: ${l.parseError}`] : validateWritingItem(l.item!, taskIds);
      expect(errors.map((e) => `${l.file}: ${e}`)).toEqual([]);
    });
  }
});

// ── Validator unit tests ────────────────────────────────────────────────────

const d1 = (over: Partial<PracticeTask> = {}): PracticeTask => ({
  id: 'pd3-2019-summer-d1',
  type: 'd1-email',
  title: 'Flyrejser',
  origin: 'official',
  session: 'PD3 Sommer 2019',
  intro: 'Du har fået en mail fra din ven.',
  mail: {
    from: 'Mette',
    paragraphs: ['Hej! Hvordan går det? Hvad laver du i weekenden?', 'Kan du komme til min fest?'],
    underlined: ['Hvad laver du i weekenden?', 'Kan du komme til min fest?'],
  },
  bullets: [
    { key: 'thanks', danish: 'Tak for mailen', english: 'Thank them' },
    { key: 'underlined', danish: 'Svar på spørgsmålene', english: 'Answer the questions' },
    { key: 'proposal', danish: 'Kom med et forslag', english: 'Make a proposal' },
  ],
  ...over,
});

const d2aBullets = [
  { key: 'describe' as const, danish: 'Beskriv', english: 'Describe' },
  { key: 'causes' as const, danish: 'Forklar', english: 'Causes' },
  { key: 'evaluate' as const, danish: 'Vurder', english: 'Evaluate', share: 0.5 },
];

const d2a = (over: Partial<PracticeTask> = {}): PracticeTask => ({
  id: 'pd3-2020-winter-d2a',
  type: 'd2a-diagram',
  title: 'Cykler',
  origin: 'official',
  session: 'PD3 Vinter 2020',
  intro: 'Se på diagrammet.',
  table: { caption: 'Andel', columns: ['År', 'Procent'], rows: [['2010', '20'], ['2020', '30']] },
  bullets: d2aBullets,
  minWords: 200,
  ...over,
});

const d2b = (over: Partial<PracticeTask> = {}): PracticeTask => ({
  id: 'wsim-d2b-1',
  type: 'd2b-list',
  title: 'Sundhed',
  origin: 'simulated',
  intro: 'Her er seks forslag.',
  list: ['a', 'b', 'c', 'd', 'e', 'f'],
  bullets: [
    { key: 'experience', danish: 'Fortæl', english: 'Experience' },
    { key: 'viewpoints', danish: 'Kommenter', english: 'Viewpoints' },
    { key: 'evaluate', danish: 'Vurder', english: 'Evaluate' },
  ],
  ...over,
});

const sample = (over: Partial<LearnerSample> = {}): LearnerSample => ({
  id: 'learner-a-2019-summer-d1',
  taskId: 'pd3-2019-summer-d1',
  band: '7',
  text: 'Hej Mette! Tak for din mail. Jeg kan godt komme.',
  summary: 'Answers everything, a few slips.',
  criteria: [{ criterion: 'task', comment: 'All bullets covered.' }],
  annotations: [{ quote: 'Tak for din mail', kind: 'good', note: 'Good opener.' }],
  origin: 'learner',
  author: 'Learner A',
  ...over,
});

describe('validatePracticeTask', () => {
  it('accepts well-formed tasks of every type', () => {
    expect(validatePracticeTask(d1())).toEqual([]);
    expect(validatePracticeTask(d2a())).toEqual([]);
    expect(validatePracticeTask(d2b())).toEqual([]);
  });

  it('checks official ids, their type suffix and session', () => {
    expect(validatePracticeTask(d1({ id: 'pd3-19-summer-d1' })).join()).toMatch(/does not match/);
    expect(validatePracticeTask(d1({ id: 'pd3-2019-summer-d2a' })).join()).toMatch(/ends in d2a/);
    expect(validatePracticeTask(d1({ session: 'PD3 Vinter 2019' })).join()).toMatch(/sommer/);
    expect(validatePracticeTask(d1({ session: undefined })).join()).toMatch(/session/);
  });

  it('checks bullet keys against the task type', () => {
    expect(validatePracticeTask(d1({ bullets: d2aBullets })).join()).toMatch(/bullet keys/);
  });

  it('d1: underlined questions are verbatim, at least two', () => {
    const mail = d1().mail!;
    expect(validatePracticeTask(d1({ mail: { ...mail, underlined: ['Hvad laver du?', mail.underlined[1]] } })).join()).toMatch(
      /not a verbatim substring/,
    );
    expect(validatePracticeTask(d1({ mail: { ...mail, underlined: [mail.underlined[0]] } })).join()).toMatch(/at least 2/);
    expect(validatePracticeTask(d1({ mail: undefined })).join()).toMatch(/no mail/);
  });

  it('d2a: table rows match the columns', () => {
    const table = d2a().table!;
    expect(validatePracticeTask(d2a({ table: { ...table, rows: [['2010', '20', 'x']] } })).join()).toMatch(/3 cells/);
    expect(validatePracticeTask(d2a({ table: undefined })).join()).toMatch(/no table/);
  });

  it('d2b: exactly six list items', () => {
    expect(validatePracticeTask(d2b({ list: ['a', 'b'] })).join()).toMatch(/expected 6/);
    expect(validatePracticeTask(d2b({ id: 'wsim-d1-1' })).join()).toMatch(/says d1/);
  });
});

describe('validateLearnerSample', () => {
  const known = new Set(['pd3-2019-summer-d1']);

  it('accepts a sample whose task is known', () => {
    expect(validateLearnerSample(sample(), known)).toEqual([]);
  });

  it('needs a resolvable task: known id or embedded', () => {
    expect(validateLearnerSample(sample(), new Set()).join()).toMatch(/matches no known task/);
    const task = d2b({ id: 'course-2023-d2b', origin: 'simulated' });
    expect(validateLearnerSample(sample({ taskId: task.id, task }), new Set())).toEqual([]);
    expect(validateLearnerSample(sample({ taskId: 'other', task }), new Set()).join()).toMatch(/differs from taskId/);
  });

  it('checks id, author and annotation quotes', () => {
    expect(validateLearnerSample(sample({ id: 'Learner_A' }), known).join()).toMatch(/does not match/);
    expect(validateLearnerSample(sample({ author: ' ' }), known).join()).toMatch(/author is empty/);
    expect(validateLearnerSample(sample({ annotations: [{ quote: 'Farvel', kind: 'error', note: 'x' }] }), known).join()).toMatch(
      /not a verbatim substring/,
    );
  });
});

describe('validateWritingItem', () => {
  it('dispatches on kind and checks the id matches', () => {
    expect(validateWritingItem({ id: 'pd3-2019-summer-d1', kind: 'official-task', content: d1() })).toEqual([]);
    expect(validateWritingItem({ id: 'pd3-2019-winter-d1', kind: 'official-task', content: d1() }).join()).toMatch(/differs/);
    expect(validateWritingItem({ id: 'wsim-d2b-1', kind: 'official-task', content: d2b() }).join()).toMatch(/origin/);
    const s = sample();
    expect(validateWritingItem({ id: s.id, kind: 'learner-sample', content: s }, new Set(['pd3-2019-summer-d1']))).toEqual([]);
  });
});
