import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Pressable, View } from 'react-native';
import {
  CRITERIA,
  OFFICIAL_EXAMPLES,
  TASK_TYPE_GUIDES,
  WRITING_TASK_TYPES,
  simTasksOfType,
  type Criterion,
  type WritingTaskType,
} from '../../src/content/writing';
import { countsForType, useWritingDrafts } from '../../src/writing/draftStore';
import { useWritingReady } from '../../src/writing/useWritingReady';
import { Card, Label, Txt, s } from '../../src/ui/primitives';
import { Screen } from '../../src/ui/Screen';
import { useTheme } from '../../src/ui/theme';
import { plural, TYPE_SHORT } from '../../src/ui/writing/labels';

/** Writing prep hub: the three PD3 writing task types, and how writing is graded. */
export default function WritingHub() {
  const t = useTheme();
  const router = useRouter();
  const ready = useWritingReady();
  const tasks = useWritingDrafts((st) => st.tasks);

  return (
    <Screen contentContainerStyle={{ padding: t.space(4), paddingBottom: t.space(12), gap: t.space(5) }}>
      <View>
        <Txt variant="display" style={{ fontSize: 28, lineHeight: 34 }}>
          Writing prep
        </Txt>
        <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1.5), lineHeight: 22 }}>
          PD3 skriftlig fremstilling only ever sets three kinds of task. Learn each one’s shape, see answers at
          different levels, then write your own against the clock.
        </Txt>
      </View>

      <View style={{ gap: t.space(3) }}>
        {WRITING_TASK_TYPES.map((type) => (
          <TypeCard
            key={type}
            type={type}
            counts={ready ? countsForType(tasks, type) : null}
            onPress={() => router.push({ pathname: '/writing/[type]', params: { type } } as never)}
          />
        ))}
      </View>

      <Card>
        <Label color={t.c.accent}>How writing is graded</Label>
        <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(2), lineHeight: 22 }}>
          Both tasks are marked together into one grade on the 7-point scale (12, 10, 7, 4, 02, 00, −3). The grade is
          holistic, not a sum of points — and Delprøve 2 counts for more than Delprøve 1. The examiners look at three
          things:
        </Txt>
        <View style={{ marginTop: t.space(3), gap: t.space(3) }}>
          {(Object.keys(CRITERIA) as Criterion[]).map((k) => (
            <View key={k}>
              <Txt variant="heading">{CRITERIA[k].title}</Txt>
              <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21, marginTop: 2 }}>
                {CRITERIA[k].english}
              </Txt>
              <Txt variant="label" color={t.c.textFaint} style={{ marginTop: 2, fontStyle: 'italic' }}>
                {CRITERIA[k].danish}
              </Txt>
            </View>
          ))}
        </View>
      </Card>

      {OFFICIAL_EXAMPLES.length ? (
        <Card tone="sunken">
          <Label>Official examples</Label>
          <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1.5), lineHeight: 22 }}>
            Answers published by the exam authority, with notes on why they pass. Each task type’s Examples tab has
            the ones for that task.
          </Txt>
          <View style={{ marginTop: t.space(2), gap: t.space(1) }}>
            {OFFICIAL_EXAMPLES.map((ex) => (
              <Pressable key={ex.id} onPress={() => Linking.openURL(ex.url)} accessibilityRole="link">
                <Txt variant="body" color={t.c.accent} style={{ lineHeight: 24 }}>
                  ↗ {ex.label}
                </Txt>
              </Pressable>
            ))}
          </View>
        </Card>
      ) : null}
    </Screen>
  );
}

function TypeCard({
  type,
  counts,
  onPress,
}: {
  type: WritingTaskType;
  counts: { drafts: number; attempts: number } | null;
  onPress: () => void;
}) {
  const t = useTheme();
  const g = TASK_TYPE_GUIDES[type];
  const [lo, hi] = g.targetWords;
  const meta = [
    g.time,
    g.minWords ? `min. ${g.minWords} words` : null,
    hi ? `aim for ${lo}–${hi} words` : null,
    `${plural(simTasksOfType(type).length, 'practice task')}`,
  ].filter(Boolean);
  const mine =
    counts && (counts.drafts || counts.attempts)
      ? [counts.drafts ? plural(counts.drafts, 'draft') : null, counts.attempts ? plural(counts.attempts, 'saved attempt') : null]
          .filter(Boolean)
          .join(' · ')
      : null;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={g.name}>
      {({ pressed }) => (
        <Card style={pressed ? { backgroundColor: t.c.surfaceSunken } : undefined}>
          <View style={[s.row, { gap: t.space(3) }]}>
            <View style={{ flex: 1 }}>
              <Label color={t.c.accent}>{g.danish && g.danish !== type ? g.danish : TYPE_SHORT[type]}</Label>
              <Txt variant="title" style={{ marginTop: t.space(1) }}>
                {g.name && g.name !== type ? g.name : TYPE_SHORT[type]}
              </Txt>
            </View>
            <Txt variant="title" color={t.c.textFaint} style={{ fontSize: 20, lineHeight: 22 }}>
              ›
            </Txt>
          </View>
          {g.summary ? (
            <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(2), lineHeight: 22 }}>
              {g.summary}
            </Txt>
          ) : null}
          <Txt variant="label" color={t.c.textFaint} style={{ marginTop: t.space(2.5) }}>
            {meta.join(' · ')}
          </Txt>
          {mine ? (
            <Txt variant="label" color={t.c.success} style={{ marginTop: t.space(1) }}>
              {mine}
            </Txt>
          ) : null}
        </Card>
      )}
    </Pressable>
  );
}
