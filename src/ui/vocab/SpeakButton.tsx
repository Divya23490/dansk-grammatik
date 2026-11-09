import Ionicons from '@expo/vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, Pressable, type GestureResponderEvent } from 'react-native';
import { useTheme } from '../theme';

/**
 * Speech on the web goes through the browser's speechSynthesis; some browsers
 * (and embedded webviews) lack it, and a button that does nothing is worse
 * than no button.
 */
const canSpeak =
  Platform.OS !== 'web' || (typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined');

/**
 * Hear a Danish word or sentence read aloud. Pressing again while it speaks
 * stops it. Safe inside another Pressable (the flip card): the press does not
 * reach the parent.
 */
export function SpeakButton({
  text,
  label,
  size = 'md',
}: {
  text: string;
  /** What the accessibility label names, when `text` is long (a sentence). */
  label?: string;
  size?: 'sm' | 'md';
}) {
  const t = useTheme();
  const [speaking, setSpeaking] = useState(false);
  // Read in cleanup, which must not see a stale `speaking`.
  const speakingRef = useRef(false);

  const set = useCallback((on: boolean) => {
    speakingRef.current = on;
    setSpeaking(on);
  }, []);

  useEffect(
    () => () => {
      // Only stop speech this button started: leaving one card must not cut
      // off another's.
      if (speakingRef.current) void Speech.stop();
    },
    [],
  );

  const onPress = useCallback(
    (e: GestureResponderEvent) => {
      // On web the press would bubble to the flip card and turn it over.
      e.stopPropagation?.();
      if (speakingRef.current) {
        void Speech.stop();
        set(false);
        return;
      }
      // Stop anything else first; speech otherwise queues behind it.
      void Speech.stop();
      set(true);
      Speech.speak(text, {
        language: 'da-DK',
        rate: 0.9,
        onDone: () => set(false),
        onStopped: () => set(false),
        onError: () => set(false),
      });
    },
    [text, set],
  );

  if (!canSpeak) return null;

  const box = size === 'sm' ? 30 : 38;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Hear "${label ?? text}" in Danish`}
      accessibilityState={{ busy: speaking }}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => ({
        width: box,
        height: box,
        borderRadius: box / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: speaking ? t.c.accentSoft : pressed ? t.c.surfaceSunken : 'transparent',
      })}
    >
      <Ionicons
        name={speaking ? 'volume-high' : 'volume-medium-outline'}
        size={size === 'sm' ? 18 : 22}
        color={speaking ? t.c.accent : t.c.textMuted}
      />
    </Pressable>
  );
}
