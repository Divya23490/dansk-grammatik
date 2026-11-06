import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { RULES } from '../../grammar/rules';
import type { WritingFeedback } from '../../feedback/types';
import { Button, Card, Divider, Label, Txt, s } from '../primitives';
import { useTheme } from '../theme';

/** Corrections and notes from a feedback provider, each correction linked to its rule. */
export function FeedbackView({ feedback, providerLabel }: { feedback: WritingFeedback; providerLabel: string }) {
  const t = useTheme();
  const router = useRouter();
  return (
    <View style={{ gap: t.space(3) }}>
      <Divider />
      <View style={s.rowBetween}>
        <Label>
          {feedback.corrections.length
            ? `${feedback.corrections.length} thing${feedback.corrections.length === 1 ? '' : 's'} to fix`
            : 'Nothing flagged'}
        </Label>
        <Txt variant="label" color={t.c.textFaint}>
          {providerLabel}
        </Txt>
      </View>

      {feedback.corrections.map((c, i) => (
        <Card key={i}>
          <View style={[s.row, { gap: t.space(2), flexWrap: 'wrap' }]}>
            <Txt variant="body" color={t.c.accent} style={{ textDecorationLine: 'line-through' }}>
              {c.original}
            </Txt>
            <Txt variant="body" color={t.c.textFaint}>
              →
            </Txt>
            <Txt variant="heading" color={t.c.success}>
              {c.suggestion}
            </Txt>
          </View>
          <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(2.5) }}>
            {c.explanation}
          </Txt>
          {c.ruleId ? (
            <Button
              tone="ghost"
              label={`Rule: ${RULES[c.ruleId].da}`}
              onPress={() => router.push(`/rule/${c.ruleId}` as never)}
              style={{ marginTop: t.space(3) }}
            />
          ) : null}
        </Card>
      ))}

      {feedback.notes.map((n, i) => (
        <Card key={`n${i}`} tone="sunken">
          <Txt variant="body" color={t.c.textMuted}>
            {n}
          </Txt>
        </Card>
      ))}
    </View>
  );
}
