/**
 * Where official writing tasks and learner samples come from.
 *
 * They are private (transcribed official task sheets, real learner texts), so
 * they stay out of the public repo and the static bundle: they live in the
 * Supabase table `writing_items` (official tasks: any signed-in user; learner
 * samples: their owner only). The
 * whole set is small, so it is fetched in one go and cached on the device;
 * the cached copy is shown while fetching and when the network is down. When
 * nobody is signed in nothing private is shown (state 'signedOut').
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSession } from '../auth/session';
import { supabase } from '../auth/supabase';
import type { LearnerSample, PracticeTask, WritingTaskType } from '../content/writing/types';
import { findTaskInRows, samplesForType, splitRows, tasksOfType, type WritingRow } from './privateItems';

/**
 * 'offline': the fetch failed; tasks/samples hold the cached copy (possibly
 * empty), so show them with a retry rather than treating this as "nothing".
 */
export type WritingLoadState = 'loading' | 'ready' | 'offline' | 'signedOut';

export interface PrivateWriting {
  /** Official past tasks, newest session first. */
  tasks: PracticeTask[];
  samples: LearnerSample[];
  state: WritingLoadState;
  retry: () => void;
}

/**
 * Cached per account: learner samples are readable only by their owner, so a
 * second account on the same device must never see the first one's rows.
 */
const itemsKey = (userId: string) => `skema-writing-items-v1-${userId}`;

/** Last rows seen this session, so a remounting screen doesn't flash empty. */
let memory: { userId: string; rows: WritingRow[] } | null = null;

async function readCache(userId: string): Promise<WritingRow[] | null> {
  if (memory?.userId === userId) return memory.rows;
  try {
    const raw = await AsyncStorage.getItem(itemsKey(userId));
    const rows = raw ? (JSON.parse(raw) as WritingRow[]) : null;
    memory = rows ? { userId, rows } : null;
    return rows;
  } catch {
    return null;
  }
}

async function writeCache(userId: string, rows: WritingRow[]): Promise<void> {
  memory = { userId, rows };
  try {
    await AsyncStorage.setItem(itemsKey(userId), JSON.stringify(rows));
  } catch {
    // A full or unavailable cache only costs a refetch next time.
  }
}

async function fetchRows(userId: string): Promise<WritingRow[]> {
  if (!supabase) throw new Error('Accounts aren’t set up for this copy of the app.');
  const { data, error } = await supabase.from('writing_items').select('id, kind, content, updated_at');
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as WritingRow[];
  await writeCache(userId, rows);
  return rows;
}

export function usePrivateWriting(): PrivateWriting {
  const status = useSession((s) => s.status);
  const userId = useSession((s) => s.userId);
  const signedIn = status === 'signedIn' && !!userId;
  const [rows, setRows] = useState<WritingRow[]>(() => (memory && memory.userId === userId ? memory.rows : []));
  const [state, setState] = useState<WritingLoadState>(signedIn || status === 'loading' ? 'loading' : 'signedOut');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (status === 'loading') {
      setState('loading');
      return;
    }
    if (!signedIn || !userId) {
      setRows([]);
      setState('signedOut');
      return;
    }
    let live = true;
    void (async () => {
      setState('loading');
      // Never show another account's rows while this one's load.
      if (memory?.userId !== userId) setRows([]);
      const cached = await readCache(userId);
      if (cached && live) setRows(cached);
      try {
        const fresh = await fetchRows(userId);
        if (live) {
          setRows(fresh);
          setState('ready');
        }
      } catch {
        if (live) setState('offline');
      }
    })();
    return () => {
      live = false;
    };
  }, [status, signedIn, userId, attempt]);

  const { tasks, samples } = useMemo(() => (signedIn ? splitRows(rows) : { tasks: [], samples: [] }), [rows, signedIn]);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { tasks, samples, state, retry };
}

export const privateTasksOfType = (w: PrivateWriting, type: WritingTaskType) => tasksOfType(w.tasks, type);

/** Samples whose task (linked or embedded) is of this type. */
export const samplesOfType = (w: PrivateWriting, type: WritingTaskType) => samplesForType(w.samples, w.tasks, type);

/** Cached lookup used by the editor route (works offline once loaded). */
export async function loadPrivateTask(id: string): Promise<PracticeTask | null> {
  const { status, userId } = useSession.getState();
  if (status !== 'signedIn' || !userId) return null;
  const cached = await readCache(userId);
  const hit = cached ? findTaskInRows(cached, id) : null;
  if (hit) return hit;
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('writing_items')
      .select('id, kind, content, updated_at')
      .eq('id', id)
      .maybeSingle();
    if (error || !data) return null;
    const row = data as WritingRow;
    if (row.kind !== 'official-task') return null;
    await writeCache(userId, [...(cached ?? []).filter((r) => r.id !== row.id), row]);
    return row.content as PracticeTask;
  } catch {
    return null;
  }
}
