import { describe, expect, it } from 'vitest';
import type { ProgressEvent } from '../sync/types';
import { GOAL_OPTIONS, cardsOnDay, nextGoal } from './vocabGoal';
import { todayIso } from './settings';

const at = (iso: string, h: number) => new Date(`${iso}T${String(h).padStart(2, '0')}:00:00`).getTime();
let n = 0;
const answer = (domain: string, when: number): ProgressEvent =>
  ({ kind: 'answer', id: `e${n++}`, at: when, domain, itemId: 'w', level: null, outcomes: {}, correct: true }) as ProgressEvent;

describe('cardsOnDay', () => {
  it('is zero with no events', () => {
    expect(cardsOnDay([], '2026-06-15')).toBe(0);
  });

  it('counts only vocab answers on that local day', () => {
    const events = [
      answer('vocab', at('2026-06-15', 0)),
      answer('vocab', at('2026-06-15', 23)),
      answer('vocab', at('2026-06-14', 23)),
      answer('vocab', at('2026-06-16', 0)),
      answer('grammar', at('2026-06-15', 12)),
    ];
    expect(cardsOnDay(events, '2026-06-15')).toBe(2);
  });

  it('uses the same local date as todayIso', () => {
    const when = at('2026-06-15', 9);
    expect(cardsOnDay([answer('vocab', when)], todayIso(new Date(when)))).toBe(1);
  });

  it('does not uncount after a reset', () => {
    const events: ProgressEvent[] = [
      answer('vocab', at('2026-06-15', 9)),
      { kind: 'reset', id: 'r', at: at('2026-06-15', 10), domain: 'vocab' },
      { kind: 'reset', id: 'r2', at: at('2026-06-15', 11), domain: 'all' },
    ];
    expect(cardsOnDay(events, '2026-06-15')).toBe(1);
  });
});

describe('nextGoal', () => {
  it('cycles through the options and wraps', () => {
    expect(nextGoal(10)).toBe(20);
    expect(nextGoal(50)).toBe(GOAL_OPTIONS[0]);
  });

  it('starts from the first option for an unknown goal', () => {
    expect(nextGoal(7)).toBe(GOAL_OPTIONS[0]);
  });
});
