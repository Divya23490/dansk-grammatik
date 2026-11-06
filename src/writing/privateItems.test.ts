import { describe, expect, it } from 'vitest';
import type { LearnerSample, PracticeTask } from '../content/writing/types';
import { findTaskInRows, samplesForType, sortOfficialTasks, splitRows, type WritingRow } from './privateItems';

const task = (id: string, type: PracticeTask['type'] = 'd1-email'): PracticeTask => ({
  id,
  type,
  title: id,
  origin: 'official',
  intro: '',
  bullets: [],
});

const sample = (id: string, taskId: string, embedded?: PracticeTask): LearnerSample => ({
  id,
  taskId,
  band: '7',
  text: 'x',
  summary: 'x',
  criteria: [],
  annotations: [],
  origin: 'learner',
  author: 'Learner A',
  task: embedded,
});

describe('sortOfficialTasks', () => {
  it('puts the newest session first, winter after summer, parts in order', () => {
    const ids = [
      'pd3-2019-summer-d2b',
      'pd3-2021-summer-d1',
      'pd3-2019-winter-d1',
      'pd3-2024-summer-d2a',
      'pd3-2019-summer-d1',
      'pd3-2024-summer-d1',
      'odd-id',
    ];
    expect(sortOfficialTasks(ids.map((i) => task(i))).map((t) => t.id)).toEqual([
      'pd3-2024-summer-d1',
      'pd3-2024-summer-d2a',
      'pd3-2021-summer-d1',
      'pd3-2019-winter-d1',
      'pd3-2019-summer-d1',
      'pd3-2019-summer-d2b',
      'odd-id',
    ]);
  });
});

describe('rows', () => {
  const embedded = task('course-2023-d2b', 'd2b-list');
  const rows: WritingRow[] = [
    { id: 'pd3-2019-summer-d1', kind: 'official-task', content: task('pd3-2019-summer-d1'), updated_at: '' },
    { id: 'pd3-2020-winter-d2a', kind: 'official-task', content: task('pd3-2020-winter-d2a', 'd2a-diagram'), updated_at: '' },
    { id: 'learner-b', kind: 'learner-sample', content: sample('learner-b', embedded.id, embedded), updated_at: '' },
    { id: 'learner-a', kind: 'learner-sample', content: sample('learner-a', 'pd3-2019-summer-d1'), updated_at: '' },
  ];

  it('splits tasks (newest first) from samples', () => {
    const { tasks, samples } = splitRows(rows);
    expect(tasks.map((t) => t.id)).toEqual(['pd3-2020-winter-d2a', 'pd3-2019-summer-d1']);
    expect(samples.map((s) => s.id)).toEqual(['learner-a', 'learner-b']);
  });

  it('finds samples by the type of their linked or embedded task', () => {
    const { tasks, samples } = splitRows(rows);
    expect(samplesForType(samples, tasks, 'd1-email').map((s) => s.id)).toEqual(['learner-a']);
    expect(samplesForType(samples, tasks, 'd2b-list').map((s) => s.id)).toEqual(['learner-b']);
    expect(samplesForType(samples, tasks, 'd2a-diagram')).toEqual([]);
  });

  it('finds official and embedded tasks by id', () => {
    expect(findTaskInRows(rows, 'pd3-2019-summer-d1')?.id).toBe('pd3-2019-summer-d1');
    expect(findTaskInRows(rows, 'course-2023-d2b')?.type).toBe('d2b-list');
    expect(findTaskInRows(rows, 'nope')).toBeNull();
  });
});
