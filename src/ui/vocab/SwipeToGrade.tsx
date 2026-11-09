import React from 'react';
import { Platform, StyleSheet, type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme';
import type { Grade } from './grade';

type SwipeGrade = Extract<Grade, 'again' | 'good'>;

const MAX_ROTATE = 8;
const MAX_TINT = 0.25;
const THRESHOLD = 0.3;
const FLING_VELOCITY = 800;
const FLY_OFF_MS = 200;

function buzz(g: SwipeGrade) {
  if (Platform.OS === 'web') return;
  try {
    Haptics.notificationAsync(
      g === 'good' ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
    ).catch(() => {});
  } catch {
    // No haptics engine (simulator, old device): the swipe is feedback enough.
  }
}

/**
 * Swipe a turned card right for "Knew it" or left for "Didn't know". "Hard"
 * is deliberately left to the buttons and keys: a third direction would be a
 * guess the learner has to remember.
 *
 * The pan only claims the touch after 15 px of sideways travel and gives up
 * after 12 px of vertical travel, so a tap still flips the card and a tall
 * back face still scrolls in its ScrollView. After `onGrade` the parent is
 * expected to mount the next card under a new key, so a successful swipe
 * leaves the card off screen rather than resetting it.
 */
export function SwipeToGrade({
  enabled,
  onGrade,
  children,
}: {
  enabled: boolean;
  onGrade: (g: SwipeGrade) => void;
  children: React.ReactNode;
}) {
  const t = useTheme();
  const reduceMotion = useReducedMotion();
  const x = useSharedValue(0);
  const width = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    width.value = e.nativeEvent.layout.width;
  };

  const finish = (g: SwipeGrade) => {
    buzz(g);
    onGrade(g);
  };

  const pan = Gesture.Pan()
    .enabled(enabled)
    .activeOffsetX([-15, 15])
    .failOffsetY([-12, 12])
    .onUpdate((e) => {
      x.value = e.translationX;
    })
    .onEnd((e) => {
      const w = width.value || 320;
      const far = Math.abs(e.translationX) > w * THRESHOLD;
      const fast = Math.abs(e.velocityX) > FLING_VELOCITY && Math.sign(e.velocityX) === Math.sign(e.translationX);
      if (!far && !fast) {
        x.value = withSpring(0);
        return;
      }
      const dir = e.translationX > 0 ? 1 : -1;
      const g: SwipeGrade = dir > 0 ? 'good' : 'again';
      if (reduceMotion) {
        scheduleOnRN(finish, g);
        return;
      }
      x.value = withTiming(dir * w * 1.5, { duration: FLY_OFF_MS }, (done) => {
        if (done) scheduleOnRN(finish, g);
      });
    })
    .onFinalize((_e, success) => {
      // Cancelled mid-drag (a scroll took over, say): put the card back.
      if (!success && x.value !== 0) x.value = withSpring(0);
    });

  const cardStyle = useAnimatedStyle(() => {
    const w = width.value || 320;
    return {
      transform: [
        { translateX: x.value },
        { rotate: `${interpolate(x.value, [-w, 0, w], [-MAX_ROTATE, 0, MAX_ROTATE], Extrapolation.CLAMP)}deg` },
      ],
    };
  });

  const goodTint = useAnimatedStyle(() => {
    const w = width.value || 320;
    return { opacity: interpolate(x.value, [0, w * THRESHOLD], [0, MAX_TINT], Extrapolation.CLAMP) };
  });
  const againTint = useAnimatedStyle(() => {
    const w = width.value || 320;
    return { opacity: interpolate(x.value, [-w * THRESHOLD, 0], [MAX_TINT, 0], Extrapolation.CLAMP) };
  });

  // style.pointerEvents, not the prop, which react-native-web now warns about.
  const tint = [StyleSheet.absoluteFill, { borderRadius: t.radius.lg, pointerEvents: 'none' as const }];

  return (
    <GestureDetector gesture={pan}>
      <Animated.View onLayout={onLayout} style={cardStyle}>
        {children}
        <Animated.View style={[tint, { backgroundColor: t.c.success }, goodTint]} />
        <Animated.View style={[tint, { backgroundColor: t.c.warning }, againTint]} />
      </Animated.View>
    </GestureDetector>
  );
}
