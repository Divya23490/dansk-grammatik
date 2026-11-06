import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import type { DataTable, FriendMail, PracticeTask, TaskBullet } from '../../content/writing/types';
import { segmentText } from '../../writing/annotate';
import { Card, Label, Txt, s, withFont } from '../primitives';
import { useTheme } from '../theme';

/** A 2A diagram as a native table; scrolls sideways when it has many columns. */
export function DataTableView({ table }: { table: DataTable }) {
  const t = useTheme();
  const colMin = table.columns.length > 3 ? 96 : 120;
  const cell = (v: string, j: number, head: boolean) => (
    <View
      key={j}
      style={{
        flex: j === 0 ? 1.4 : 1,
        minWidth: j === 0 ? colMin * 1.3 : colMin,
        paddingVertical: t.space(2),
        paddingHorizontal: t.space(2.5),
        borderLeftWidth: j === 0 ? 0 : 1,
        borderLeftColor: t.c.border,
      }}
    >
      <Txt
        variant={head ? 'label' : 'body'}
        color={head ? t.c.textMuted : t.c.text}
        style={[
          { fontSize: head ? 13 : 15, lineHeight: head ? 18 : 21 },
          head ? { fontWeight: '700' } : null,
          j > 0 && !head ? { textAlign: 'right', fontVariant: ['tabular-nums'] } : null,
        ]}
      >
        {v}
      </Txt>
    </View>
  );
  return (
    <View style={{ gap: t.space(2) }}>
      <Txt variant="heading" style={{ fontSize: 15 }}>
        {table.caption}
      </Txt>
      <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flexGrow: 1,
            borderWidth: 1,
            borderColor: t.c.border,
            borderRadius: t.radius.md,
            overflow: 'hidden',
            backgroundColor: t.c.surface,
          }}
        >
          <View style={{ flexDirection: 'row', backgroundColor: t.c.surfaceSunken }}>
            {table.columns.map((c, j) => cell(c, j, true))}
          </View>
          {table.rows.map((r, i) => (
            <View key={i} style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: t.c.border }}>
              {r.map((v, j) => cell(v, j, false))}
            </View>
          ))}
        </View>
      </ScrollView>
      {table.source ? (
        <Txt variant="label" color={t.c.textFaint}>
          {table.source}
        </Txt>
      ) : null}
      {table.note ? (
        <Txt variant="label" color={t.c.textFaint} style={{ fontStyle: 'italic' }}>
          {table.note}
        </Txt>
      ) : null}
    </View>
  );
}

/** The friend's mail, with the questions that must be answered underlined. */
export function MailView({ mail }: { mail: FriendMail }) {
  const t = useTheme();
  return (
    <View
      style={{
        borderLeftWidth: 3,
        borderLeftColor: t.c.borderStrong,
        paddingLeft: t.space(3),
        gap: t.space(2),
      }}
    >
      <Txt variant="label" color={t.c.textFaint}>
        From: {mail.from}
      </Txt>
      {mail.paragraphs.map((p, i) => (
        <Text key={i} style={withFont([t.font.body, { color: t.c.text, lineHeight: 24 }])}>
          {segmentText(p, mail.underlined).map((sg, k) =>
            sg.mark === undefined ? (
              sg.text
            ) : (
              <Text key={k} style={withFont({ textDecorationLine: 'underline', fontWeight: '600' })}>
                {sg.text}
              </Text>
            ),
          )}
        </Text>
      ))}
    </View>
  );
}

export function BulletList({ bullets, minWords }: { bullets: TaskBullet[]; minWords?: number }) {
  const t = useTheme();
  const [english, setEnglish] = useState(false);
  if (!bullets.length && !minWords) return null;
  return (
    <View style={{ gap: t.space(1.5) }}>
      <View style={s.rowBetween}>
        <Label>Opgave</Label>
        {bullets.some((b) => b.english) ? (
          <Pressable
            onPress={() => setEnglish((v) => !v)}
            accessibilityRole="button"
            accessibilityState={{ selected: english }}
            hitSlop={8}
            style={{
              borderWidth: 1,
              borderColor: english ? t.c.accent : t.c.border,
              backgroundColor: english ? t.c.accentSoft : 'transparent',
              borderRadius: 999,
              paddingHorizontal: t.space(2.5),
              paddingVertical: t.space(0.5),
            }}
          >
            <Txt variant="label" color={english ? t.c.accent : t.c.textMuted}>
              English
            </Txt>
          </Pressable>
        ) : null}
      </View>
      {bullets.map((b) => (
        <View key={b.key} style={[s.row, { alignItems: 'flex-start', gap: t.space(2) }]}>
          <Txt variant="body" color={t.c.textMuted}>
            •
          </Txt>
          <View style={{ flex: 1 }}>
            <Txt variant="body" style={{ lineHeight: 22 }}>
              {b.danish}
              {b.share ? (
                <Txt variant="label" color={t.c.textFaint}>{`  ~${Math.round(b.share * 100)}% of the answer`}</Txt>
              ) : null}
            </Txt>
            {english ? (
              <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 14, lineHeight: 20, fontStyle: 'italic' }}>
                {b.english}
              </Txt>
            ) : null}
          </View>
        </View>
      ))}
      {minWords ? (
        <Txt variant="label" color={t.c.textFaint} style={{ marginTop: t.space(1) }}>
          At least {minWords} words
        </Txt>
      ) : null}
    </View>
  );
}

export function originLabel(task: PracticeTask): string {
  return task.origin === 'official' ? `Official · ${task.session ?? 'past paper'}` : 'Practice · written for this app';
}

/** The whole task sheet: intro, mail / table / list, bullets, length. */
export function TaskCard({ task, compact }: { task: PracticeTask; compact?: boolean }) {
  const t = useTheme();
  return (
    <Card tone="sunken" style={compact ? { padding: t.space(3) } : undefined}>
      {!compact ? (
        <View style={{ marginBottom: t.space(2) }}>
          <Label color={task.origin === 'official' ? t.c.accent : t.c.textMuted}>{originLabel(task)}</Label>
          <Txt variant="title" style={{ marginTop: t.space(1) }}>
            {task.title}
          </Txt>
        </View>
      ) : (
        <Label>Task · {task.title}</Label>
      )}
      <View style={{ gap: t.space(3), marginTop: compact ? t.space(2) : 0 }}>
        {task.intro ? (
          <Txt variant="body" style={{ lineHeight: 23 }}>
            {task.intro}
          </Txt>
        ) : null}
        {task.mail ? <MailView mail={task.mail} /> : null}
        {task.table ? <DataTableView table={task.table} /> : null}
        {task.list?.length ? (
          <View style={{ gap: t.space(1.5) }}>
            {task.list.map((item, i) => (
              <View key={i} style={[s.row, { alignItems: 'flex-start', gap: t.space(2) }]}>
                <Txt variant="label" color={t.c.textFaint} style={{ width: 18, marginTop: 3 }}>
                  {i + 1}.
                </Txt>
                <Txt variant="body" style={{ flex: 1, lineHeight: 22 }}>
                  {item}
                </Txt>
              </View>
            ))}
          </View>
        ) : null}
        <BulletList bullets={task.bullets} minWords={task.minWords} />
        {task.pdfUrl && !compact ? (
          <Pressable onPress={() => Linking.openURL(task.pdfUrl!)} accessibilityRole="link">
            <Txt variant="label" color={t.c.accent}>
              ↗ Open the original task sheet (PDF)
            </Txt>
          </Pressable>
        ) : null}
      </View>
    </Card>
  );
}
