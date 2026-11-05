import type { Grade } from './grade';

/**
 * What a key press means for the card on screen. Space and Enter only turn
 * the card face up; once it is showing the answer they do nothing, so a
 * stray second press cannot flip it back before the learner grades it.
 */
export function keyAction(key: string, flipped: boolean): 'flip' | Grade | null {
  if (!flipped) return key === ' ' || key === 'Enter' ? 'flip' : null;
  switch (key) {
    case 'ArrowLeft':
    case '1':
      return 'again';
    case 'ArrowDown':
    case '2':
      return 'hard';
    case 'ArrowRight':
    case '3':
      return 'good';
    default:
      return null;
  }
}

type ElLike = {
  tagName?: unknown;
  isContentEditable?: unknown;
  getAttribute?: (name: string) => string | null;
};

function tagOf(el: unknown): string {
  const tag = (el as ElLike).tagName;
  return typeof tag === 'string' ? tag.toUpperCase() : '';
}

function roleOf(el: unknown): string | null {
  const get = (el as ElLike).getAttribute;
  return typeof get === 'function' ? get.call(el, 'role') : null;
}

/**
 * True when keys belong to a text field (the search box, a note), so the
 * shortcuts must keep out of the way. Duck-typed rather than `instanceof
 * HTMLElement` so it can be tested without a DOM.
 */
export function isTypingTarget(el: unknown): boolean {
  if (!el || typeof el !== 'object') return false;
  const tag = tagOf(el);
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if ((el as ElLike).isContentEditable === true) return true;
  const role = roleOf(el);
  return role === 'textbox' || role === 'searchbox' || role === 'combobox';
}

/**
 * True for a focused control that the browser (or react-native-web's
 * Pressable) already activates on Space/Enter. Handling those keys as well
 * would act twice — flip and press, say. This includes the flip card itself,
 * which is a Pressable with role="button".
 */
export function isActivatableTarget(el: unknown): boolean {
  if (!el || typeof el !== 'object') return false;
  const tag = tagOf(el);
  if (tag === 'BUTTON' || tag === 'A') return true;
  const role = roleOf(el);
  return role === 'button' || role === 'link';
}
