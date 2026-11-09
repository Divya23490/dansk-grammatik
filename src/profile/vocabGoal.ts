/**
 * The daily vocabulary goal: how many cards the learner has practised today.
 *
 * Nothing new is stored for this — the progress log already records every
 * vocab answer with its time, so today's count is derived from it. That keeps
 * it in step across devices for free. The goal number itself lives with the
 * other vocab session preferences.
 */

import { useMemo } from 'react';
import { useLog } from '../sync/log';
import type { ProgressEvent } from '../sync/types';
import { todayIso } from './settings';

export const GOAL_OPTIONS = [10, 20, 30, 50] as const;
export type DailyGoal = (typeof GOAL_OPTIONS)[number];

/**
 * Vocab cards answered on a local day. A reset does not uncount them: it
 * wipes what was learned, but the practice still happened that day.
 */
export function cardsOnDay(events: readonly ProgressEvent[], dayIso: string): number {
  let n = 0;
  for (const e of events) {
    if (e.kind === 'answer' && e.domain === 'vocab' && todayIso(new Date(e.at)) === dayIso) n += 1;
  }
  return n;
}

/** The goal after `goal` in GOAL_OPTIONS, wrapping round; for a one-tap cycle. */
export function nextGoal(goal: number): DailyGoal {
  const i = GOAL_OPTIONS.indexOf(goal as DailyGoal);
  return GOAL_OPTIONS[(i + 1) % GOAL_OPTIONS.length];
}

/** Vocab cards practised today. Recounts only when the log changes. */
export function useVocabToday(): number {
  const events = useLog((s) => s.events);
  // The day is read on each recount, so a screen left open past midnight
  // catches up at the next answer rather than never.
  const today = todayIso();
  return useMemo(() => cardsOnDay(events, today), [events, today]);
}
