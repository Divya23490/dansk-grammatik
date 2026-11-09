import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import type { Grade } from './grade';
import { isActivatableTarget, isTypingTarget, keyAction } from './cardKeys';

// Re-exported so callers have one import; the pure helpers live apart so tests
// can load them without pulling in react-native.
export { isActivatableTarget, isTypingTarget, keyAction };

/**
 * Keyboard shortcuts for the flashcard trainer on the web: Space/Enter to
 * turn the card, then ←/↓/→ or 1/2/3 to grade it. A no-op on native, where
 * there is no keyboard to speak of.
 *
 * Arrows and digits still work while a button has focus (clicking the card
 * leaves focus on it, and grading straight after with → should not need a
 * click elsewhere first); only Space/Enter defer to the focused control.
 * The callbacks live in refs so the listener is attached once per `enabled`
 * change rather than on every render.
 */
export function useCardKeys({
  enabled,
  flipped,
  onFlip,
  onGrade,
}: {
  enabled: boolean;
  flipped: boolean;
  onFlip: () => void;
  onGrade: (g: Grade) => void;
}) {
  const latest = useRef({ flipped, onFlip, onGrade });
  latest.current = { flipped, onFlip, onGrade };

  useEffect(() => {
    if (Platform.OS !== 'web' || !enabled || typeof window === 'undefined') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const active = typeof document !== 'undefined' ? document.activeElement : null;
      if (isTypingTarget(e.target) || isTypingTarget(active)) return;
      const { flipped: isFlipped, onFlip: flip, onGrade: grade } = latest.current;
      const action = keyAction(e.key, isFlipped);
      if (!action) return;
      if ((e.key === ' ' || e.key === 'Enter') && (isActivatableTarget(e.target) || isActivatableTarget(active))) {
        return;
      }
      e.preventDefault();
      if (action === 'flip') flip();
      else grade(action);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled]);
}
