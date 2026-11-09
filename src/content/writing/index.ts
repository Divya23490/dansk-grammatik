import { GRADED_D1, SIM_TASKS_D1 } from './sim-d1';
import { GRADED_D2A, SIM_TASKS_D2A } from './sim-d2a';
import { GRADED_D2B, SIM_TASKS_D2B } from './sim-d2b';
import { GRADED_D1_EXTRA, SIM_TASKS_D1_EXTRA } from './sim-d1-extra';
import { GRADED_D2A_EXTRA, SIM_TASKS_D2A_EXTRA } from './sim-d2a-extra';
import { GRADED_D2B_EXTRA, SIM_TASKS_D2B_EXTRA } from './sim-d2b-extra';
import { TASK_TYPE_GUIDES } from './guides';
import type { GradedAnswer, Phrase, PracticeTask, TemplateSlot, WritingTaskType } from './types';

export * from './types';
export { TASK_TYPE_GUIDES } from './guides';
export { OFFICIAL_EXAMPLES } from './official';

/** Simulated practice tasks (public, original), in display order. */
export const SIM_WRITING_TASKS: PracticeTask[] = [
  ...SIM_TASKS_D1,
  ...SIM_TASKS_D1_EXTRA,
  ...SIM_TASKS_D2A,
  ...SIM_TASKS_D2A_EXTRA,
  ...SIM_TASKS_D2B,
  ...SIM_TASKS_D2B_EXTRA,
];

/** Illustrative graded answers (public, written for the app). */
export const GRADED_ANSWERS: GradedAnswer[] = [
  ...GRADED_D1,
  ...GRADED_D1_EXTRA,
  ...GRADED_D2A,
  ...GRADED_D2A_EXTRA,
  ...GRADED_D2B,
  ...GRADED_D2B_EXTRA,
];

export const simTasksOfType = (type: WritingTaskType) => SIM_WRITING_TASKS.filter((t) => t.type === type);

export const gradedForType = (type: WritingTaskType) => {
  const ids = new Set(simTasksOfType(type).map((t) => t.id));
  return GRADED_ANSWERS.filter((a) => ids.has(a.taskId));
};

/** Graded answers to one task: the public ladder for a simulated task, or the examples a private task carries. */
export const gradedForTask = (task: PracticeTask): GradedAnswer[] =>
  task.examples?.length ? task.examples : GRADED_ANSWERS.filter((a) => a.taskId === task.id);

export const findSimTask = (id: string) => SIM_WRITING_TASKS.find((t) => t.id === id);

/** Word count the same way everywhere (exam counts words, not characters). */
export const countWords = (text: string) => (text.trim().match(/\S+/g) ?? []).length;

export interface TaskTemplateSlot extends TemplateSlot {
  /** What to write here for this topic, when the task has it. */
  hint?: string;
  /** Starters fitted to this topic (shown first). */
  topicStarters: Phrase[];
}

/** The type's template, with the task's topic-specific hints and starters merged in. */
export function templateForTask(task: PracticeTask): TaskTemplateSlot[] {
  return TASK_TYPE_GUIDES[task.type].template.map((slot) => {
    const own = task.slots?.[slot.key];
    return { ...slot, hint: own?.hint, topicStarters: own?.starters ?? [] };
  });
}
