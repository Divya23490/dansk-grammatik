import React from 'react';
import { Pressable, View } from 'react-native';
import { computeStreak, useActivity } from '../../profile/activity';
import { nextGoal, useVocabToday, type DailyGoal as Goal } from '../../profile/vocabGoal';
import { Card, StrengthBar, Txt, s } from '../primitives';
import { useTheme } from '../theme';

/**
 * Today's vocabulary count against the learner's goal, plus the practice
 * streak. Quiet by design: it sits above the deck as a nudge, not a banner.
 * The streak counts practice anywhere in the app, not just vocabulary, so it
 * is labelled as a practice streak.
 */
export function DailyGoal({ goal, onChangeGoal }: { goal: number; onChangeGoal?: (g: Goal) => void }) {
  const t = useTheme();
  const done = useVocabToday();
  const activeDays = useActivity((a) => a.activeDays);
  const streak = computeStreak(activeDays).current;
  const met = done >= goal;

  return (
    <Card tone="sunken" style={{ paddingVertical: t.space(3), gap: t.space(2) }}>
      <View style={s.rowBetween}>
        <Txt variant="heading">
          Today: {done} / {goal} cards
        </Txt>
        {onChangeGoal ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Daily goal ${goal} cards. Tap to change.`}
            hitSlop={8}
            onPress={() => onChangeGoal(nextGoal(goal))}
            style={({ pressed }) => ({
              paddingHorizontal: t.space(2),
              paddingVertical: t.space(0.5),
              borderRadius: t.radius.md,
              borderWidth: 1,
              borderColor: t.c.border,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Txt variant="label" color={t.c.textMuted}>
              Goal: {goal}
            </Txt>
          </Pressable>
        ) : null}
      </View>
      <StrengthBar value={goal > 0 ? done / goal : 0} color={met ? t.c.success : t.c.accent} />
      <View style={s.rowBetween}>
        <Txt variant="label" color={met ? t.c.success : t.c.textMuted}>
          {met ? 'Goal met for today' : `${goal - done} to go`}
        </Txt>
        <Txt variant="label" color={t.c.textMuted}>
          {streak > 0 ? `🔥 ${streak}-day practice streak` : 'Start a practice streak today'}
        </Txt>
      </View>
    </Card>
  );
}
