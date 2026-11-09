import React from 'react';
import { Pressable, View } from 'react-native';
import type { PracticeTask } from '../../content/writing';
import { Label, Txt, s } from '../primitives';
import { useTheme } from '../theme';

/** "PD3 Sommer 2019" → "S19"; simulated tasks have no session. */
const shortSession = (session?: string) => {
  const m = session?.match(/(Sommer|Vinter)\s+(\d{4})/i);
  return m ? `${m[1][0].toUpperCase()}${m[2].slice(2)}` : null;
};

/** Pick one task: practice tasks and past papers, as wrapping chips. */
export function TaskPicker({
  tasks,
  value,
  onChange,
}: {
  tasks: PracticeTask[];
  value: string | null;
  onChange: (id: string) => void;
}) {
  const t = useTheme();
  const groups = [
    { title: 'Practice tasks', items: tasks.filter((x) => x.origin === 'simulated') },
    { title: 'Past papers', items: tasks.filter((x) => x.origin === 'official') },
  ].filter((g) => g.items.length);

  return (
    <View style={{ gap: t.space(2.5) }}>
      {groups.map((g) => (
        <View key={g.title} style={{ gap: t.space(1.5) }}>
          <Label>{g.title}</Label>
          <View style={[s.row, { gap: t.space(1.5), flexWrap: 'wrap' }]}>
            {g.items.map((task) => {
              const on = task.id === value;
              const sess = shortSession(task.session);
              return (
                <Pressable
                  key={task.id}
                  onPress={() => onChange(task.id)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                  accessibilityLabel={`${task.title}${task.session ? `, ${task.session}` : ''}`}
                  style={({ pressed }) => [
                    s.row,
                    {
                      gap: t.space(1.5),
                      borderRadius: 999,
                      borderWidth: on ? 2 : 1,
                      borderColor: on ? t.c.accent : t.c.border,
                      backgroundColor: on ? t.c.accentSoft : pressed ? t.c.surfaceSunken : t.c.surface,
                      paddingHorizontal: t.space(3),
                      paddingVertical: t.space(1.5),
                      maxWidth: '100%',
                    },
                  ]}
                >
                  {sess ? (
                    <Txt variant="label" color={t.c.accent} style={{ fontWeight: '700' }}>
                      {sess}
                    </Txt>
                  ) : null}
                  <Txt variant="label" color={on ? t.c.text : t.c.textMuted} numberOfLines={1} style={{ flexShrink: 1 }}>
                    {task.title}
                  </Txt>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
