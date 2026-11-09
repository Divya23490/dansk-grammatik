import React, { useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../src/ui/Screen';
import { activeProvider } from '../src/feedback/claudeCoach';
import type { WritingFeedback } from '../src/feedback/types';
import { WRITING_TASKS, type WritingExam } from '../src/content/writingTasks';
import { useSettings } from '../src/profile/settings';
import { Button, Card, Label, Txt, s } from '../src/ui/primitives';
import { FeedbackView } from '../src/ui/writing/FeedbackView';
import { useTheme } from '../src/ui/theme';

/**
 * Writing studio.
 *
 * Official PD3 and PD2 writing tasks plus FVU-style practice, grouped by exam.
 * The offline checker below is deliberately narrow — it only flags
 * what it can explain by rule — and it says so. The Claude-backed coach slots
 * in behind the same interface once the proxy exists; the UI does not change,
 * only the provider label.
 */

export default function Write() {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  const target = useSettings((st) => st.targetExam);
  const [exam, setExam] = useState<WritingExam>(
    target === 'PD2' || target === 'FVU' ? target : 'PD3',
  );
  const tasks = WRITING_TASKS.filter((tk) => tk.exam === exam);
  const [taskIdx, setTaskIdx] = useState(0);
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [busy, setBusy] = useState(false);

  const task = (tasks[taskIdx] ?? tasks[0]).task;
  const provider = activeProvider();
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  const review = useCallback(async () => {
    setBusy(true);
    try {
      const fb = await provider.review(text, task);
      setFeedback(fb);
    } finally {
      setBusy(false);
    }
  }, [provider, task, text]);

  return (
    <Screen
      contentContainerStyle={{
        padding: t.space(4),
        paddingBottom: insets.bottom + t.space(10),
        gap: t.space(4),
      }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Task picker */}
      <View style={[s.row, { gap: t.space(2) }]}>
        {(['PD3', 'PD2', 'FVU'] as const).map((e) => (
          <Button
            key={e}
            tone={e === exam ? 'primary' : 'ghost'}
            label={e}
            onPress={() => {
              setExam(e);
              setTaskIdx(0);
              setFeedback(null);
            }}
            style={{ flex: 1, paddingHorizontal: t.space(2) }}
          />
        ))}
      </View>

      <View style={[s.row, { gap: t.space(2), flexWrap: 'wrap' }]}>
        {tasks.map((tk, i) => (
          <Button
            key={i}
            tone={i === taskIdx ? 'primary' : 'ghost'}
            label={tk.name}
            onPress={() => {
              setTaskIdx(i);
              setFeedback(null);
            }}
            style={{ flexGrow: 1, flexBasis: '30%', paddingHorizontal: t.space(2) }}
          />
        ))}
      </View>

      <Card tone="sunken">
        <Label>
          {task.label ??
            (task.kind === 'essay'
              ? `Essay · min. ${task.minWords} words`
              : `Letter · ${task.register === 'formel' ? 'formal' : 'informal'}`)}
        </Label>
        {task.source ? (
          <Txt variant="label" color={t.c.accent} style={{ marginTop: t.space(1.5) }}>
            {task.source}
          </Txt>
        ) : null}
        <Txt variant="body" style={{ marginTop: t.space(2), lineHeight: 23 }}>
          {task.prompt}
        </Txt>
        {task.focus ? (
          <View style={{ marginTop: t.space(3), gap: t.space(1.5) }}>
            <Label>Opgave</Label>
            {task.focus.map((f, i) => (
              <Txt key={i} variant="body" color={t.c.textMuted} style={{ lineHeight: 22 }}>
                • {f}
              </Txt>
            ))}
          </View>
        ) : null}
      </Card>

      {/* Editor */}
      <View>
        <View style={s.rowBetween}>
          <Label>Your text</Label>
          <Txt variant="label" color={words ? t.c.textMuted : t.c.textFaint}>
            {words} WORDS
          </Txt>
        </View>
        <TextInput
          multiline
          value={text}
          onChangeText={(v) => {
            setText(v);
            setFeedback(null);
          }}
          placeholder="Write here…"
          placeholderTextColor={t.c.textFaint}
          textAlignVertical="top"
          style={{
            marginTop: t.space(2),
            minHeight: 200,
            backgroundColor: t.c.surface,
            borderWidth: 1,
            borderColor: t.c.border,
            borderRadius: t.radius.md,
            padding: t.space(3.5),
            color: t.c.text,
            fontSize: 16,
            lineHeight: 24,
          }}
        />
      </View>

      <Button
        label={busy ? 'Checking…' : 'Check my Danish'}
        loading={busy}
        disabled={!text.trim()}
        onPress={review}
      />

      {/* Feedback */}
      {feedback ? <FeedbackView feedback={feedback} providerLabel={provider.label} /> : null}
    </Screen>
  );
}
