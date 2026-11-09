/**
 * Pure helpers for the private writing items (no storage, no network), kept
 * apart from store.ts so they can be unit-tested without React Native.
 */

import type { LearnerSample, PracticeTask, WritingItem, WritingTaskType } from '../content/writing/types';

/** A `writing_items` row as fetched and cached. */
export interface WritingRow {
  id: string;
  kind: WritingItem['kind'];
  content: PracticeTask | LearnerSample;
  updated_at: string;
}

const OFFICIAL = /^pd3-(\d{4})-(summer|winter)-(d1|d2a|d2b)$/;
const PART_ORDER: Record<string, number> = { d1: 0, d2a: 1, d2b: 2 };

/**
 * Sort rank of an official task id: newer sessions first (winter after summer
 * within a year), then d1 → d2a → d2b within a session. Unknown ids sort last.
 */
function rank(id: string): [number, number] {
  const m = OFFICIAL.exec(id);
  if (!m) return [Number.NEGATIVE_INFINITY, 0];
  return [Number(m[1]) * 2 + (m[2] === 'winter' ? 1 : 0), PART_ORDER[m[3]]];
}

export function sortOfficialTasks(tasks: PracticeTask[]): PracticeTask[] {
  return [...tasks].sort((a, b) => {
    const [sa, pa] = rank(a.id);
    const [sb, pb] = rank(b.id);
    if (sa !== sb) return sb - sa;
    if (pa !== pb) return pa - pb;
    return a.id.localeCompare(b.id);
  });
}

/** Split fetched rows into official tasks (newest first) and learner samples. */
export function splitRows(rows: WritingRow[]): { tasks: PracticeTask[]; samples: LearnerSample[] } {
  const tasks = rows.filter((r) => r.kind === 'official-task').map((r) => r.content as PracticeTask);
  const samples = rows
    .filter((r) => r.kind === 'learner-sample')
    .map((r) => r.content as LearnerSample)
    .sort((a, b) => a.id.localeCompare(b.id));
  return { tasks: sortOfficialTasks(tasks), samples };
}

/** A task by id: an official task, or one carried inside a learner sample. */
export function findTaskInRows(rows: WritingRow[], id: string): PracticeTask | null {
  for (const r of rows) {
    if (r.kind === 'official-task' && r.id === id) return r.content as PracticeTask;
  }
  for (const r of rows) {
    const task = r.kind === 'learner-sample' ? (r.content as LearnerSample).task : undefined;
    if (task?.id === id) return task;
  }
  return null;
}

export const tasksOfType = (tasks: PracticeTask[], type: WritingTaskType) => tasks.filter((t) => t.type === type);

/** Samples whose task (embedded, or linked by id among `tasks`) is of this type. */
export function samplesForType(samples: LearnerSample[], tasks: PracticeTask[], type: WritingTaskType): LearnerSample[] {
  const byId = new Map(tasks.map((t) => [t.id, t]));
  return samples.filter((s) => (s.task ?? byId.get(s.taskId))?.type === type);
}
