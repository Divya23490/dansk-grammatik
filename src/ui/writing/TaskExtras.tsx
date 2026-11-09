import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { gradedForTask, type PracticeTask } from '../../content/writing';
import { Card, Label, Txt, s } from '../primitives';
import { useTheme } from '../theme';

/** Under a practice task: its own tips, its word bank and a way to its graded examples. */
export function TaskExtras({ task }: { task: PracticeTask }) {
  const t = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState<'tips' | 'words' | null>(null);
  const tips = task.tips ?? [];
  const words = task.words ?? [];
  const examples = gradedForTask(task).length;
  if (!tips.length && !words.length && !examples) return null;

  const toggle = (k: 'tips' | 'words') => setOpen((v) => (v === k ? null : k));

  return (
    <Card style={{ gap: t.space(3) }}>
      <View style={[s.row, { gap: t.space(2), flexWrap: 'wrap' }]}>
        {tips.length ? (
          <Chip label={`Tips for this task · ${tips.length}`} on={open === 'tips'} onPress={() => toggle('tips')} />
        ) : null}
        {words.length ? (
          <Chip label={`Word bank · ${words.length}`} on={open === 'words'} onPress={() => toggle('words')} />
        ) : null}
        {examples ? (
          <Chip
            label={`Graded examples · ${examples} ›`}
            onPress={() =>
              router.push({
                pathname: '/writing/[type]',
                params: { type: task.type, tab: 'examples', task: task.id },
              } as never)
            }
          />
        ) : null}
      </View>

      {open === 'tips' ? (
        <View style={{ gap: t.space(2.5) }}>
          {tips.map((tip, i) => (
            <View key={i}>
              <Txt variant="heading" style={{ fontSize: 15 }}>
                {tip.title}
              </Txt>
              <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21, marginTop: 2 }}>
                {tip.text}
              </Txt>
            </View>
          ))}
        </View>
      ) : null}

      {open === 'words' ? (
        <View style={{ gap: t.space(1.5) }}>
          <Label>Useful for this topic</Label>
          {words.map((w, i) => (
            <View key={i} style={[s.row, { gap: t.space(2), alignItems: 'flex-start' }]}>
              <Txt variant="body" style={{ fontSize: 15, lineHeight: 21, flex: 1, fontWeight: '600' }}>
                {w.da}
              </Txt>
              <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21, flex: 1 }}>
                {w.en}
              </Txt>
            </View>
          ))}
        </View>
      ) : null}
    </Card>
  );
}

function Chip({ label, on, onPress }: { label: string; on?: boolean; onPress: () => void }) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ expanded: on }}
      style={({ pressed }) => ({
        borderRadius: 999,
        borderWidth: 1,
        borderColor: on ? t.c.accent : t.c.border,
        backgroundColor: on ? t.c.accentSoft : pressed ? t.c.surfaceSunken : t.c.surface,
        paddingHorizontal: t.space(3),
        paddingVertical: t.space(1.5),
      })}
    >
      <Txt variant="label" color={on ? t.c.text : t.c.textMuted} style={{ fontWeight: '600' }}>
        {label}
      </Txt>
    </Pressable>
  );
}
