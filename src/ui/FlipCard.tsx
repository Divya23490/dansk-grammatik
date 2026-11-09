import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const HALF_TURN_IN = 140;
const HALF_TURN_OUT = 180;

/**
 * A card that turns over on its vertical axis when `flipped` changes.
 *
 * Both faces are laid out from the first render — the hidden one invisible
 * and out of the accessibility tree — and the card takes the height of the
 * taller one, so it doesn't jump when the back (often several times taller
 * than the front) comes round. Each face should fill the height it's given
 * (`flexGrow: 1`) so the short one's border reaches the bottom too.
 *
 * The turn runs in two halves: edge-on, swap the face, back to flat. Give it
 * a fresh `key` for a new card so it starts face up without turning:
 * animating the old face away would flash the next card's answer.
 *
 * Buttons that belong on a face (the speaker) go in `frontCorner` and
 * `backCorner`, not inside the faces: on the web the card is a <button>, and
 * a button inside a button is invalid HTML. The corner sits over the card's
 * top-right, outside the pressable, and turns with it.
 */
export function FlipCard({
  flipped,
  onPress,
  front,
  back,
  accessibilityLabel,
  frontCorner,
  backCorner,
}: {
  flipped: boolean;
  onPress: () => void;
  front: React.ReactNode;
  back: React.ReactNode;
  accessibilityLabel?: string;
  frontCorner?: React.ReactNode;
  backCorner?: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  // The face on screen lags `flipped` by half a turn.
  const [showBack, setShowBack] = useState(flipped);
  const [heights, setHeights] = useState({ front: 0, back: 0 });
  const angle = useSharedValue(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduceMotion) {
      setShowBack(flipped);
      return;
    }
    // Turning to the back goes one way, turning back the other, like a real card.
    const dir = flipped ? 1 : -1;
    angle.value = withTiming(90 * dir, { duration: HALF_TURN_IN, easing: Easing.in(Easing.quad) }, (done) => {
      if (!done) return;
      scheduleOnRN(setShowBack, flipped);
      angle.value = -90 * dir;
      angle.value = withTiming(0, { duration: HALF_TURN_OUT, easing: Easing.out(Easing.quad) });
    });
  }, [flipped, reduceMotion, angle]);

  const style = useAnimatedStyle(() => ({
    transform: [{ perspective: 1200 }, { rotateY: `${angle.value}deg` }],
  }));

  // The hidden face is absolute, so it reports its own content height; the
  // visible one is stretched to the card, which can only report the current
  // maximum or more — either way the max is the taller face.
  const measure = useCallback(
    (which: 'front' | 'back') => (e: LayoutChangeEvent) => {
      const h = Math.ceil(e.nativeEvent.layout.height);
      setHeights((prev) => (prev[which] === h ? prev : { ...prev, [which]: h }));
    },
    [],
  );
  const minHeight = Math.max(heights.front, heights.back) || undefined;

  const face = (node: React.ReactNode, which: 'front' | 'back') => {
    const visible = showBack === (which === 'back');
    return (
      <View
        onLayout={measure(which)}
        // style.pointerEvents, not the prop, which react-native-web now warns about.
        style={visible ? styles.visible : styles.hidden}
        aria-hidden={!visible}
        accessibilityElementsHidden={!visible}
        importantForAccessibility={visible ? 'auto' : 'no-hide-descendants'}
      >
        {node}
      </View>
    );
  };

  const corner = showBack ? backCorner : frontCorner;

  return (
    <Animated.View style={style}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel}>
        <View style={{ minHeight }}>
          {face(front, 'front')}
          {face(back, 'back')}
        </View>
      </Pressable>
      {corner ? <View style={styles.corner}>{corner}</View> : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  visible: { flexGrow: 1, pointerEvents: 'auto' },
  corner: { position: 'absolute', top: 10, right: 10 },
  hidden: { position: 'absolute', top: 0, left: 0, right: 0, opacity: 0, pointerEvents: 'none' },
});
