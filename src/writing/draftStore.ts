/**
 * Writing-prep drafts and saved attempts, per practice task. Local only.
 *
 * A task's draft keeps both the free text and the template slots, so switching
 * mode never throws either away. Saved attempts are snapshots the learner chose
 * to keep (newest first, capped). The store is per user on this device (the
 * key carries the user id) but is not synced to the account.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TemplateSlot, WritingTaskType } from '../content/writing/types';
import { countWords } from '../content/writing';
import { persistOptions } from '../profile/persistOptions';

export type DraftMode = 'free' | 'template';

export interface WritingDraft {
  mode: DraftMode;
  /** Free-mode text. */
  text: string;
  /** Template-mode text, slot key → text. */
  slots: Record<string, string>;
  updatedAt: number;
}

export interface SavedAttempt {
  savedAt: number;
  text: string;
  wordCount: number;
  mode?: DraftMode;
}

export interface TaskRecord {
  type: WritingTaskType;
  draft?: WritingDraft;
  attempts: SavedAttempt[];
}

interface DraftState {
  userId: string | null;
  tasks: Record<string, TaskRecord>;
  hydrated: boolean;
}

export const MAX_ATTEMPTS = 20;

export const writingKey = (userId: string | null) => (userId ? `skema-writing-${userId}` : 'skema-writing-signed-out');

export const useWritingDrafts = create<DraftState>()(
  persist(
    () => ({ userId: null, tasks: {}, hydrated: false }) as DraftState,
    persistOptions(writingKey(null), (s: DraftState) => ({ userId: s.userId, tasks: s.tasks })),
  ),
);

// ── Pure helpers ────────────────────────────────────────────────────────────

/** Template text as one answer: non-empty slots in template order, blank line between. */
export function joinSlots(template: TemplateSlot[], slots: Record<string, string>): string {
  return template
    .map((sl) => (slots[sl.key] ?? '').trim())
    .filter(Boolean)
    .join('\n\n');
}

/** Append a sentence starter to the end of a slot, with a space if needed. */
export function appendStarter(slot: string, starter: string): string {
  if (!slot) return starter;
  return /\s$/.test(slot) ? slot + starter : `${slot} ${starter}`;
}

/** Add an attempt, newest first, keeping at most `cap`. */
export function addAttempt(attempts: SavedAttempt[], a: SavedAttempt, cap = MAX_ATTEMPTS): SavedAttempt[] {
  return [a, ...attempts].slice(0, cap);
}

const hasText = (d?: WritingDraft) =>
  !!d && (!!d.text.trim() || Object.values(d.slots).some((v) => v.trim()));

/** How many tasks of a type have a non-empty draft, and how many attempts are saved. */
export function countsForType(tasks: Record<string, TaskRecord>, type: WritingTaskType): { drafts: number; attempts: number } {
  let drafts = 0;
  let attempts = 0;
  for (const r of Object.values(tasks)) {
    if (r.type !== type) continue;
    if (hasText(r.draft)) drafts++;
    attempts += r.attempts.length;
  }
  return { drafts, attempts };
}

// ── Actions ─────────────────────────────────────────────────────────────────

export function saveDraft(taskId: string, type: WritingTaskType, draft: Omit<WritingDraft, 'updatedAt'>, now = Date.now()): void {
  useWritingDrafts.setState((s) => {
    const rec = s.tasks[taskId] ?? { type, attempts: [] };
    return { tasks: { ...s.tasks, [taskId]: { ...rec, type, draft: { ...draft, updatedAt: now } } } };
  });
}

export function saveAttempt(taskId: string, type: WritingTaskType, text: string, mode?: DraftMode, now = Date.now()): SavedAttempt {
  const a: SavedAttempt = { savedAt: now, text, wordCount: countWords(text), mode };
  useWritingDrafts.setState((s) => {
    const rec = s.tasks[taskId] ?? { type, attempts: [] };
    return { tasks: { ...s.tasks, [taskId]: { ...rec, type, attempts: addAttempt(rec.attempts, a) } } };
  });
  return a;
}

export function deleteAttempt(taskId: string, savedAt: number): void {
  useWritingDrafts.setState((s) => {
    const rec = s.tasks[taskId];
    if (!rec) return {};
    return { tasks: { ...s.tasks, [taskId]: { ...rec, attempts: rec.attempts.filter((a) => a.savedAt !== savedAt) } } };
  });
}

export function clearDraft(taskId: string): void {
  useWritingDrafts.setState((s) => {
    const rec = s.tasks[taskId];
    if (!rec) return {};
    const { draft: _gone, ...rest } = rec;
    return { tasks: { ...s.tasks, [taskId]: rest } };
  });
}

/** Point the store at a user's own saved copy (see useWritingReady). */
export async function switchWritingUser(userId: string | null): Promise<void> {
  const st = useWritingDrafts.getState();
  if (st.userId === userId && st.hydrated) return;
  const key = writingKey(userId);
  useWritingDrafts.persist.setOptions({ name: key });
  if (await AsyncStorage.getItem(key)) {
    await useWritingDrafts.persist.rehydrate();
    useWritingDrafts.setState({ userId, hydrated: true });
  } else {
    useWritingDrafts.setState({ userId, tasks: {}, hydrated: true });
  }
}
