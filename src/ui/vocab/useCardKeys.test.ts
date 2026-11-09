import { describe, expect, it } from 'vitest';
import { isActivatableTarget, isTypingTarget, keyAction } from './cardKeys';

describe('keyAction', () => {
  it('flips on Space or Enter while face down', () => {
    expect(keyAction(' ', false)).toBe('flip');
    expect(keyAction('Enter', false)).toBe('flip');
  });

  it('does not grade while face down', () => {
    for (const k of ['ArrowLeft', 'ArrowDown', 'ArrowRight', '1', '2', '3']) {
      expect(keyAction(k, false)).toBeNull();
    }
  });

  it('ignores Space and Enter once flipped', () => {
    expect(keyAction(' ', true)).toBeNull();
    expect(keyAction('Enter', true)).toBeNull();
  });

  it('grades with arrows or digits once flipped', () => {
    expect(keyAction('ArrowLeft', true)).toBe('again');
    expect(keyAction('1', true)).toBe('again');
    expect(keyAction('ArrowDown', true)).toBe('hard');
    expect(keyAction('2', true)).toBe('hard');
    expect(keyAction('ArrowRight', true)).toBe('good');
    expect(keyAction('3', true)).toBe('good');
  });

  it('ignores unrelated keys', () => {
    expect(keyAction('a', true)).toBeNull();
    expect(keyAction('ArrowUp', true)).toBeNull();
    expect(keyAction('4', false)).toBeNull();
  });
});

const el = (tagName: string, extra: { role?: string; isContentEditable?: boolean } = {}) => ({
  tagName,
  isContentEditable: extra.isContentEditable ?? false,
  getAttribute: (name: string) => (name === 'role' ? (extra.role ?? null) : null),
});

describe('isTypingTarget', () => {
  it('spots form fields, whatever the case of the tag', () => {
    expect(isTypingTarget(el('INPUT'))).toBe(true);
    expect(isTypingTarget(el('textarea'))).toBe(true);
    expect(isTypingTarget(el('SELECT'))).toBe(true);
  });

  it('spots contentEditable and textbox roles', () => {
    expect(isTypingTarget(el('DIV', { isContentEditable: true }))).toBe(true);
    expect(isTypingTarget(el('DIV', { role: 'textbox' }))).toBe(true);
  });

  it('leaves buttons and plain elements alone', () => {
    expect(isTypingTarget(el('BUTTON'))).toBe(false);
    expect(isTypingTarget(el('DIV', { role: 'button' }))).toBe(false);
    expect(isTypingTarget(el('BODY'))).toBe(false);
  });

  it('copes with null and odd values', () => {
    expect(isTypingTarget(null)).toBe(false);
    expect(isTypingTarget(undefined)).toBe(false);
    expect(isTypingTarget('INPUT')).toBe(false);
    expect(isTypingTarget({})).toBe(false);
  });
});

describe('isActivatableTarget', () => {
  it('spots buttons, links and role=button (a Pressable on the web)', () => {
    expect(isActivatableTarget(el('BUTTON'))).toBe(true);
    expect(isActivatableTarget(el('a'))).toBe(true);
    expect(isActivatableTarget(el('DIV', { role: 'button' }))).toBe(true);
  });

  it('leaves text fields and plain elements alone', () => {
    expect(isActivatableTarget(el('INPUT'))).toBe(false);
    expect(isActivatableTarget(el('DIV'))).toBe(false);
    expect(isActivatableTarget(null)).toBe(false);
  });
});
