/**
 * The vocabulary screen's session setup — which word types to drill and how
 * many cards a round lasts. A preference, not progress: it only saves the
 * learner re-picking the same setup every time they open the deck.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { VocabCategory } from '../content/vocabulary';
import { persistOptions } from './persistOptions';
import type { DailyGoal } from './vocabGoal';
import { SESSION_CATEGORIES } from './vocabStore';

/** Cards per round; 'endless' is the open-ended deck the screen used to be. */
export type SessionLength = 10 | 20 | 30 | 'endless';

/**
 * What a card asks: the Danish word for its meaning ('da-en', the classic
 * flashcard), the meaning for the Danish word to produce ('en-da'), or a
 * gap in one of the word's example sentences to type it into ('gap').
 */
export type CardMode = 'da-en' | 'en-da' | 'gap';

interface VocabSessionState {
  categories: VocabCategory[];
  length: SessionLength;
  /** Drill every level rather than only words up to the learner's niveau. */
  allLevels: boolean;
  mode: CardMode;
  /** Cards a day the learner aims for; today's count comes from the progress log. */
  dailyGoal: DailyGoal;
  hydrated: boolean;
  setCategories: (categories: VocabCategory[]) => void;
  setLength: (length: SessionLength) => void;
  setAllLevels: (allLevels: boolean) => void;
  setMode: (mode: CardMode) => void;
  setDailyGoal: (dailyGoal: DailyGoal) => void;
}

export const useVocabSession = create<VocabSessionState>()(
  persist(
    (set) => ({
      categories: SESSION_CATEGORIES,
      length: 20,
      allLevels: false,
      mode: 'da-en',
      dailyGoal: 20,
      hydrated: false,
      setCategories: (categories) => set({ categories }),
      setLength: (length) => set({ length }),
      setAllLevels: (allLevels) => set({ allLevels }),
      setMode: (mode) => set({ mode }),
      setDailyGoal: (dailyGoal) => set({ dailyGoal }),
    }),
    persistOptions('skema-vocab-session-v1', (s: VocabSessionState) => ({
      categories: s.categories,
      length: s.length,
      allLevels: s.allLevels,
      mode: s.mode,
      dailyGoal: s.dailyGoal,
    })),
  ),
);
