import { beforeEach, describe, expect, it } from 'vitest';
import type { TemplateSlot } from '../content/writing/types';
import { segmentText } from './annotate';
import {
  addAttempt,
  appendStarter,
  clearDraft,
  countsForType,
  joinSlots,
  MAX_ATTEMPTS,
  saveAttempt,
  saveDraft,
  switchWritingUser,
  useWritingDrafts,
} from './draftStore';

const slot = (key: string): TemplateSlot => ({ key, title: key, purpose: '', words: [10, 20], starters: [] });

beforeEach(async () => {
  await switchWritingUser(`u-${Math.random()}`);
});

describe('pure helpers', () => {
  it('joins non-empty slots in template order with blank lines', () => {
    expect(joinSlots([slot('a'), slot('b'), slot('c')], { c: 'Tre.', a: ' En. ', b: '  ' })).toBe('En.\n\nTre.');
  });

  it('appends a starter with a space only when needed', () => {
    expect(appendStarter('', 'Kære Ole')).toBe('Kære Ole');
    expect(appendStarter('Hej.', 'Tak')).toBe('Hej. Tak');
    expect(appendStarter('Hej.\n', 'Tak')).toBe('Hej.\nTak');
  });

  it('keeps attempts newest first and capped', () => {
    let list = [] as ReturnType<typeof addAttempt>;
    for (let i = 0; i < MAX_ATTEMPTS + 5; i++) list = addAttempt(list, { savedAt: i, text: '', wordCount: 0 });
    expect(list).toHaveLength(MAX_ATTEMPTS);
    expect(list[0].savedAt).toBe(MAX_ATTEMPTS + 4);
  });
});

describe('store', () => {
  it('saves drafts and attempts and counts them by type', () => {
    saveDraft('t1', 'd1-email', { mode: 'free', text: 'Hej Ole', slots: {} }, 5);
    saveDraft('t2', 'd1-email', { mode: 'template', text: '', slots: { a: '  ' } }, 5);
    saveAttempt('t1', 'd1-email', 'Hej Ole, tak for mailen', 'free', 6);
    saveAttempt('t3', 'd2b-list', 'x', 'free', 7);
    const tasks = useWritingDrafts.getState().tasks;
    expect(tasks.t1.draft?.updatedAt).toBe(5);
    expect(tasks.t1.attempts[0].wordCount).toBe(5);
    expect(countsForType(tasks, 'd1-email')).toEqual({ drafts: 1, attempts: 1 });
    expect(countsForType(tasks, 'd2b-list')).toEqual({ drafts: 0, attempts: 1 });
    clearDraft('t1');
    expect(useWritingDrafts.getState().tasks.t1.draft).toBeUndefined();
    expect(useWritingDrafts.getState().tasks.t1.attempts).toHaveLength(1);
  });

  it('keeps each user’s drafts apart', async () => {
    const me = `u-${Math.random()}`;
    await switchWritingUser(me);
    saveDraft('t1', 'd1-email', { mode: 'free', text: 'mine', slots: {} });
    await switchWritingUser(`u-${Math.random()}`);
    expect(useWritingDrafts.getState().tasks.t1).toBeUndefined();
    await switchWritingUser(me);
    expect(useWritingDrafts.getState().tasks.t1.draft?.text).toBe('mine');
  });
});

describe('segmentText', () => {
  it('marks first occurrences in order and skips missing or overlapping quotes', () => {
    const segs = segmentText('Jeg har boet her i to år. Jeg har', ['Jeg har', 'nope', 'har boet', 'to år']);
    expect(segs).toEqual([
      { text: 'Jeg har', mark: 0 },
      { text: ' boet her i ' },
      { text: 'to år', mark: 3 },
      { text: '. Jeg har' },
    ]);
  });

  it('returns the whole text when nothing matches', () => {
    expect(segmentText('abc', [])).toEqual([{ text: 'abc' }]);
  });
});
