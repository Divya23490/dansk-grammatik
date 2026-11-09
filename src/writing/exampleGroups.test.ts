import { describe, expect, it } from 'vitest';
import type { GradedAnswer, LearnerSample, PracticeTask } from '../content/writing';
import { exampleGroups } from './exampleGroups';

const task = (id: string, examples?: GradedAnswer[]): PracticeTask => ({
  id,
  type: 'd1-email',
  title: id,
  origin: 'official',
  intro: 'x',
  bullets: [],
  examples,
});
const answer = (taskId: string, band: GradedAnswer['band']): GradedAnswer => ({
  id: `${taskId}-${band}`,
  taskId,
  band,
  text: 't',
  summary: 's',
  criteria: [],
  annotations: [],
  origin: 'illustrative',
});
const sample = (id: string, taskId: string, embedded?: PracticeTask): LearnerSample => ({
  ...answer(taskId, '4'),
  id,
  origin: 'learner',
  author: 'My answer',
  task: embedded,
});

describe('exampleGroups', () => {
  it('sorts each ladder 12 → 02 and attaches samples to their task', () => {
    const t1 = task('pd3-2019-summer-d1', [answer('pd3-2019-summer-d1', '4'), answer('pd3-2019-summer-d1', '12')]);
    const groups = exampleGroups([], [t1], [sample('learner-email-8', t1.id)]);
    expect(groups).toHaveLength(1);
    expect(groups[0].ladder.map((a) => a.band)).toEqual(['12', '4']);
    expect(groups[0].samples.map((s) => s.id)).toEqual(['learner-email-8']);
  });

  it('adds a group for a sample that carries its own task, and drops empty tasks', () => {
    const own = task('pd3-2018-winter-d1');
    const groups = exampleGroups([], [task('pd3-2020-winter-d1')], [sample('learner-email-7', own.id, own)]);
    expect(groups.map((g) => g.task.id)).toEqual(['pd3-2018-winter-d1']);
  });
});
