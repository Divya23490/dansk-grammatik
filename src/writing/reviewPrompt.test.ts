import { describe, expect, it } from 'vitest';
import { SIM_WRITING_TASKS, TASK_TYPE_GUIDES } from '../content/writing';
import { buildReviewPrompt } from './reviewPrompt';

const of = (type: string) => SIM_WRITING_TASKS.find((t) => t.type === type)!;

describe('buildReviewPrompt', () => {
  it('carries a D1 task with every underlined question and the answer', () => {
    const task = of('d1-email');
    const p = buildReviewPrompt(task, 'Hej Lars,\n\nTak for din mail.', TASK_TYPE_GUIDES[task.type]);
    for (const u of task.mail!.underlined) expect(p).toContain(u);
    for (const b of task.bullets) expect(p).toContain(b.danish);
    expect(p).toContain('MY ANSWER (6 words');
    expect(p.trimEnd().endsWith('Tak for din mail.')).toBe(true);
    expect(p).toContain('underlined question');
  });

  it('puts the 2A table and the 50 % evaluation share in the prompt', () => {
    const task = of('d2a-diagram');
    const p = buildReviewPrompt(task, 'Diagrammet viser …');
    expect(p).toContain(task.table!.columns.join(' | '));
    expect(p).toContain('about 50 % of the answer');
    expect(p).toContain('at least 200 words');
  });

  it('lists the six 2B viewpoints', () => {
    const task = of('d2b-list');
    const p = buildReviewPrompt(task, 'Jeg mener …');
    task.list!.forEach((l, i) => expect(p).toContain(`${i + 1}. ${l}`));
  });
});
