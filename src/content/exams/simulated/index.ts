/**
 * Simulated PD3 reading papers: written for this app in the current exam
 * format, modelled on the official papers' text types, lengths and question
 * style. Not official papers — every screen that shows one says so.
 *
 * sim-1..3 turned out easier than the official papers and stay as warm-ups
 * (their ids and content are fixed: attempts point at them). sim-4 on are
 * `level: 'exam'`, written to the official range — see npm run exam:difficulty.
 */

import type { ReadingPaper } from '../types';
import SIM_1 from './sim-1.json';
import SIM_2 from './sim-2.json';
import SIM_3 from './sim-3.json';
import SIM_4 from './sim-4.json';
import SIM_5 from './sim-5.json';
import SIM_6 from './sim-6.json';

// JSON imports are typed loosely (a grade-table row is (string | number)[]), and with
// the answer explanations the inferred types grew too far apart for a direct cast.
// papers.test.ts validates every paper's shape, so the cast is checked there.
export const SIMULATED_PAPERS: ReadingPaper[] = [SIM_1, SIM_2, SIM_3, SIM_4, SIM_5, SIM_6] as unknown as ReadingPaper[];
