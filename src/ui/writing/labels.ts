import type { WritingTaskType } from '../../content/writing/types';

export const TYPE_SHORT: Record<WritingTaskType, string> = {
  'd1-email': 'Delprøve 1',
  'd2a-diagram': 'Delprøve 2A',
  'd2b-list': 'Delprøve 2B',
};

/** Exam-hall minutes for the timer: D1 45 min; D2 gets the rest of the 2½ hours. */
export const TYPE_MINUTES: Record<WritingTaskType, number> = {
  'd1-email': 45,
  'd2a-diagram': 90,
  'd2b-list': 90,
};

export const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
