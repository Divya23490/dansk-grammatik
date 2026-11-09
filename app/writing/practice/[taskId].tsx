import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Linking, Platform, Pressable, Share, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  TASK_TYPE_GUIDES,
  countWords,
  findSimTask,
  type PracticeTask,
  templateForTask,
  type TaskTemplateSlot,
} from '../../../src/content/writing';
import { activeProvider } from '../../../src/feedback/claudeCoach';
import type { WritingFeedback } from '../../../src/feedback/types';
import { analyseAnswer, toFeedbackTask, type StructureCheck } from '../../../src/writing/analyse';
import { buildReviewPrompt } from '../../../src/writing/reviewPrompt';
import {
  appendStarter,
  deleteAttempt,
  joinSlots,
  saveAttempt,
  saveDraft,
  useWritingDrafts,
  type DraftMode,
  type SavedAttempt,
} from '../../../src/writing/draftStore';
import { loadPrivateTask } from '../../../src/writing/store';
import { useWritingReady } from '../../../src/writing/useWritingReady';
import { Countdown, formatClock, useNow } from '../../../src/ui/exam/Clock';
import { Button, Card, Label, Txt, s } from '../../../src/ui/primitives';
import { Screen } from '../../../src/ui/Screen';
import { Segmented } from '../../../src/ui/Segmented';
import { Snackbar } from '../../../src/ui/Snackbar';
import { useTheme } from '../../../src/ui/theme';
import { useWide } from '../../../src/ui/useWide';
import { FeedbackView } from '../../../src/ui/writing/FeedbackView';
import { TYPE_MINUTES } from '../../../src/ui/writing/labels';
import { TaskCard } from '../../../src/ui/writing/TaskCard';
import { TaskExtras } from '../../../src/ui/writing/TaskExtras';

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const AUTOSAVE_MS = 800;

/** The writing editor for one practice task: free or by template, with timer, drafts and a basic check. */
export default function WritingPractice() {
  const t = useTheme();
  const params = useLocalSearchParams<{ taskId: string; mode?: string }>();
  const taskId = one(params.taskId) ?? '';
  const modeParam = one(params.mode);
  const sim = findSimTask(taskId);
  // undefined while an official task loads; null when there is none.
  const [task, setTask] = useState<PracticeTask | null | undefined>(sim);

  useEffect(() => {
    if (sim) {
      setTask(sim);
      return;
    }
    let live = true;
    setTask(undefined);
    loadPrivateTask(taskId)
      .then((r) => live && setTask(r))
      .catch(() => live && setTask(null));
    return () => {
      live = false;
    };
  }, [taskId, sim]);

  if (task === undefined) {
    return (
      <Screen contentContainerStyle={{ padding: t.space(8), alignItems: 'center' }}>
        <Stack.Screen options={{ title: 'Writing' }} />
        <ActivityIndicator color={t.c.textMuted} />
      </Screen>
    );
  }
  if (task === null) {
    return (
      <Screen contentContainerStyle={{ padding: t.space(4) }}>
        <Stack.Screen options={{ title: 'Writing' }} />
        <Card tone="sunken">
          <Txt variant="body" style={{ lineHeight: 22 }}>
            This task couldn’t be found. Official past tasks come from your account: sign in and open them once while
            online.
          </Txt>
        </Card>
      </Screen>
    );
  }
  return (
    <Editor
      key={task.id}
      task={task}
      modeParam={modeParam === 'template' || modeParam === 'free' ? modeParam : undefined}
    />
  );
}

function Editor({ task, modeParam }: { task: PracticeTask; modeParam?: DraftMode }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { wide, onLayout } = useWide();
  const ready = useWritingReady();
  const guide = TASK_TYPE_GUIDES[task.type];
  // The type's template with this topic's hints and starters merged in.
  const template = useMemo(() => templateForTask(task), [task]);
  const canTemplate = template.length > 0;
  const provider = activeProvider();

  const [seeded, setSeeded] = useState(false);
  const [mode, setMode] = useState<DraftMode>('free');
  const [text, setText] = useState('');
  const [slots, setSlots] = useState<Record<string, string>>({});
  const [check, setCheck] = useState<{ structure: StructureCheck; feedback: WritingFeedback } | null>(null);
  const [busy, setBusy] = useState(false);
  const [snack, setSnack] = useState<{ msg: string; undo?: SavedAttempt; openClaude?: boolean } | null>(null);

  // Seed from the saved draft once the store has loaded — never before, or the
  // first autosave would overwrite it with an empty draft.
  useEffect(() => {
    if (!ready || seeded) return;
    const d = useWritingDrafts.getState().tasks[task.id]?.draft;
    setText(d?.text ?? '');
    setSlots(d?.slots ?? {});
    const want = modeParam ?? d?.mode ?? 'free';
    setMode(want === 'template' && canTemplate ? 'template' : 'free');
    setSeeded(true);
  }, [ready, seeded, task.id, modeParam, canTemplate]);

  // Debounced autosave, flushed on leaving the screen.
  const pending = useRef<null | (() => void)>(null);
  useEffect(() => {
    if (!seeded) return;
    const save = () => {
      saveDraft(task.id, task.type, { mode, text, slots });
      pending.current = null;
    };
    pending.current = save;
    const id = setTimeout(save, AUTOSAVE_MS);
    return () => clearTimeout(id);
  }, [seeded, mode, text, slots, task.id, task.type]);
  useEffect(() => () => pending.current?.(), []);

  const fullText = mode === 'template' ? joinSlots(template, slots) : text;
  const words = countWords(fullText);

  const switchMode = (m: DraftMode) => {
    // Carry the template text over into an empty free-mode box.
    if (m === 'free' && !text.trim()) setText(joinSlots(template, slots));
    setMode(m);
    setCheck(null);
  };

  const runCheck = useCallback(async () => {
    setBusy(true);
    try {
      const structure = analyseAnswer(task, fullText, mode === 'template' ? slots : undefined);
      const feedback = await provider.review(fullText, toFeedbackTask(task));
      setCheck({ structure, feedback });
    } finally {
      setBusy(false);
    }
  }, [task, fullText, mode, slots, provider]);

  const hideSnack = useCallback(() => setSnack(null), []);

  const onSaveAttempt = () => {
    const a = saveAttempt(task.id, task.type, fullText, mode);
    setSnack({ msg: `Attempt saved · ${a.wordCount} words`, undo: a });
  };

  const onCopyForReview = async () => {
    const prompt = buildReviewPrompt(task, fullText, guide);
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(prompt);
        setSnack({ msg: 'Copied: paste it into Claude for a full review', openClaude: true });
        return;
      } catch {
        // Clipboard blocked (e.g. no permission): fall through to the share sheet.
      }
    }
    try {
      await Share.share({ message: prompt });
    } catch {
      setSnack({ msg: 'Could not copy the review prompt' });
    }
  };

  const taskView = (
    <View style={{ gap: t.space(3) }}>
      <TaskCard task={task} />
      <TaskExtras task={task} />
    </View>
  );

  const editor = (
    <View style={{ gap: t.space(4) }}>
      {canTemplate ? (
        <Segmented
          options={[
            { key: 'free', label: 'Free writing' },
            { key: 'template', label: 'With template' },
          ]}
          value={mode}
          onChange={switchMode}
          compact
        />
      ) : null}

      <Timer minutes={TYPE_MINUTES[task.type]} />

      {!seeded ? (
        <ActivityIndicator color={t.c.textMuted} />
      ) : mode === 'template' ? (
        <View style={{ gap: t.space(4) }}>
          {template.map((sl) => (
            <SlotEditor
              key={sl.key}
              slot={sl}
              value={slots[sl.key] ?? ''}
              onChange={(v) => {
                setSlots((cur) => ({ ...cur, [sl.key]: v }));
                setCheck(null);
              }}
            />
          ))}
        </View>
      ) : (
        <TextInput
          multiline
          value={text}
          onChangeText={(v) => {
            setText(v);
            setCheck(null);
          }}
          placeholder="Write here…"
          placeholderTextColor={t.c.textFaint}
          textAlignVertical="top"
          accessibilityLabel="Your answer"
          style={inputStyle(t, 320)}
        />
      )}

      <WordMeter words={words} minWords={task.minWords ?? guide.minWords} target={guide.targetWords} />

      <View style={[s.row, { gap: t.space(2) }]}>
        <Button
          label={busy ? 'Checking…' : 'Check'}
          loading={busy}
          disabled={!fullText.trim()}
          onPress={runCheck}
          style={{ flex: 1 }}
        />
        <Button tone="ghost" label="Save attempt" disabled={!fullText.trim()} onPress={onSaveAttempt} style={{ flex: 1 }} />
      </View>
      <Button
        tone="ghost"
        label="Copy for AI review"
        disabled={!fullText.trim()}
        onPress={onCopyForReview}
      />
      <Txt variant="label" color={t.c.textFaint}>
        Check is a basic check: length, the task’s points and the word-order rules it can explain. It is not a grade.
        For a full review (band, criteria, every correction), copy the task and your answer as a ready-made prompt and
        paste it into Claude. Your draft saves on this device as you type.
      </Txt>

      {check ? (
        <View style={{ gap: t.space(3) }}>
          {check.structure.notes.length ? (
            <Card tone="sunken">
              <Label>Structure · {check.structure.wordCount} words</Label>
              <View style={{ marginTop: t.space(2), gap: t.space(1.5) }}>
                {check.structure.notes.map((n, i) => (
                  <Txt key={i} variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21 }}>
                    • {n}
                  </Txt>
                ))}
              </View>
            </Card>
          ) : null}
          <FeedbackView feedback={check.feedback} providerLabel={provider.label} />
        </View>
      ) : null}

      <SavedAttempts taskId={task.id} ready={ready} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: t.c.bg }}>
      <Stack.Screen options={{ title: task.title }} />
      <Screen
        maxWidth={1240}
        contentContainerStyle={{ padding: t.space(4), paddingBottom: insets.bottom + t.space(16) }}
      >
        <View onLayout={onLayout}>
          {wide ? (
            <View style={{ flexDirection: 'row', gap: t.space(5), alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>{taskView}</View>
              <View style={{ flex: 1.15 }}>{editor}</View>
            </View>
          ) : (
            <View style={{ gap: t.space(4) }}>
              {taskView}
              {editor}
            </View>
          )}
        </View>
      </Screen>
      <Snackbar
        message={snack?.msg ?? null}
        action={snack?.undo ? 'Undo' : snack?.openClaude ? 'Open Claude' : undefined}
        onAction={() => {
          if (snack?.undo) deleteAttempt(task.id, snack.undo.savedAt);
          if (snack?.openClaude) void Linking.openURL('https://claude.ai/new');
          setSnack(null);
        }}
        onHide={hideSnack}
      />
    </View>
  );
}

function inputStyle(t: ReturnType<typeof useTheme>, minHeight: number) {
  return {
    minHeight,
    backgroundColor: t.c.surface,
    borderWidth: 1,
    borderColor: t.c.border,
    borderRadius: t.radius.md,
    padding: t.space(3.5),
    color: t.c.text,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: t.fontFamily.regular,
  } as const;
}

function SlotEditor({ slot, value, onChange }: { slot: TaskTemplateSlot; value: string; onChange: (v: string) => void }) {
  const t = useTheme();
  const n = countWords(value);
  const [lo, hi] = slot.words;
  const color = n === 0 ? t.c.textFaint : n < lo ? t.c.textMuted : n > hi ? t.c.warning : t.c.success;
  return (
    <View>
      <View style={[s.rowBetween, { alignItems: 'flex-end', gap: t.space(2) }]}>
        <Txt variant="heading" style={{ flex: 1 }}>
          {slot.title}
        </Txt>
        <Txt variant="label" color={color} style={{ fontVariant: ['tabular-nums'] }}>
          {n} / {lo}–{hi}
        </Txt>
      </View>
      <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 14, lineHeight: 20, marginTop: 2 }}>
        {slot.purpose}
      </Txt>
      {slot.hint ? (
        <View
          style={{
            marginTop: t.space(1.5),
            borderLeftWidth: 3,
            borderLeftColor: t.c.accent,
            paddingLeft: t.space(2.5),
            paddingVertical: t.space(0.5),
          }}
        >
          <Txt variant="body" style={{ fontSize: 14, lineHeight: 20 }}>
            <Txt variant="label" color={t.c.accent} style={{ fontWeight: '700' }}>
              For this topic:{' '}
            </Txt>
            {slot.hint}
          </Txt>
        </View>
      ) : null}
      <TextInput
        multiline
        value={value}
        onChangeText={onChange}
        placeholder={(slot.topicStarters[0] ?? slot.starters[0])?.da ? `${(slot.topicStarters[0] ?? slot.starters[0]).da} …` : 'Write this paragraph…'}
        placeholderTextColor={t.c.textFaint}
        textAlignVertical="top"
        accessibilityLabel={slot.title}
        style={[inputStyle(t, 96), { marginTop: t.space(2) }]}
      />
      {slot.topicStarters.length || slot.starters.length ? (
        <View style={[s.wrap, { gap: t.space(1.5), marginTop: t.space(2) }]}>
          {/* Topic starters first (accent), then the generic ones from the type's template. */}
          {[
            ...slot.topicStarters.map((p) => ({ p, topic: true })),
            ...slot.starters.map((p) => ({ p, topic: false })),
          ].map(({ p, topic }, i) => (
            <Pressable
              key={i}
              onPress={() => onChange(appendStarter(value, p.da))}
              accessibilityRole="button"
              accessibilityLabel={`Insert: ${p.da} (${p.en})`}
              style={({ pressed }) => ({
                borderWidth: 1,
                borderColor: topic ? t.c.accent + '66' : t.c.border,
                backgroundColor: pressed ? t.c.surfaceSunken : topic ? t.c.accentSoft : t.c.surface,
                borderRadius: 999,
                paddingHorizontal: t.space(3),
                paddingVertical: t.space(1.5),
                maxWidth: '100%',
              })}
            >
              <Txt variant="body" style={{ fontSize: 14, lineHeight: 19 }}>
                + {p.da}
              </Txt>
              <Txt variant="label" color={t.c.textFaint} style={{ fontSize: 12, lineHeight: 15 }}>
                {p.en}
              </Txt>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function WordMeter({ words, minWords, target }: { words: number; minWords?: number; target: [number, number] }) {
  const t = useTheme();
  const [lo, hi] = target;
  const color =
    minWords && words < minWords
      ? t.c.textMuted
      : hi && words > hi * 1.25
        ? t.c.warning
        : hi && words >= lo
          ? t.c.success
          : t.c.text;
  const parts = [minWords ? `min. ${minWords}` : null, hi ? `aim ${lo}–${hi}` : null].filter(Boolean);
  return (
    <View style={[s.rowBetween, { gap: t.space(2) }]}>
      <Txt variant="heading" color={color} style={{ fontVariant: ['tabular-nums'] }}>
        {words} {words === 1 ? 'word' : 'words'}
      </Txt>
      {parts.length ? (
        <Txt variant="label" color={t.c.textFaint}>
          {parts.join(' · ')}
        </Txt>
      ) : null}
    </View>
  );
}

/** Optional exam clock: counts down from the exam-hall time, pausable. Not saved. */
function Timer({ minutes }: { minutes: number }) {
  const t = useTheme();
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [spent, setSpent] = useState(0);
  const running = startedAt !== null;
  const now = useNow(running);
  const used = spent + (running ? now - startedAt : 0);
  const remaining = minutes * 60_000 - used;
  const touched = running || spent > 0;

  return (
    <Card tone="sunken" style={{ paddingVertical: t.space(2.5) }}>
      <View style={[s.rowBetween, { gap: t.space(2) }]}>
        <View style={{ flex: 1 }}>
          <Label>Exam timer</Label>
          {touched ? (
            remaining > 0 ? (
              <Countdown remaining={remaining} />
            ) : (
              <Txt variant="heading" color={t.c.warning}>
                Time’s up · {formatClock(-remaining)} over
              </Txt>
            )
          ) : (
            <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15 }}>
              {minutes} min, as in the exam
            </Txt>
          )}
        </View>
        <View style={[s.row, { gap: t.space(2) }]}>
          <Button
            tone={running ? 'ghost' : 'primary'}
            label={running ? 'Pause' : touched ? 'Resume' : 'Start'}
            onPress={() => {
              if (running) {
                setSpent(spent + (Date.now() - startedAt));
                setStartedAt(null);
              } else setStartedAt(Date.now());
            }}
            style={{ paddingVertical: t.space(2), paddingHorizontal: t.space(4) }}
          />
          {touched && !running ? (
            <Button
              tone="ghost"
              label="Reset"
              onPress={() => setSpent(0)}
              style={{ paddingVertical: t.space(2), paddingHorizontal: t.space(3) }}
            />
          ) : null}
        </View>
      </View>
    </Card>
  );
}

function SavedAttempts({ taskId, ready }: { taskId: string; ready: boolean }) {
  const t = useTheme();
  const attempts = useWritingDrafts((st) => st.tasks[taskId]?.attempts);
  const [open, setOpen] = useState<number | null>(null);
  if (!ready || !attempts?.length) return null;
  return (
    <View style={{ gap: t.space(2), marginTop: t.space(2) }}>
      <Label>Saved attempts</Label>
      {attempts.map((a) => {
        const on = open === a.savedAt;
        return (
          <Card key={a.savedAt} style={{ paddingVertical: t.space(3) }}>
            <Pressable onPress={() => setOpen(on ? null : a.savedAt)} accessibilityRole="button" accessibilityState={{ expanded: on }}>
              <View style={s.rowBetween}>
                <Txt variant="body" style={{ fontSize: 15 }}>
                  {new Date(a.savedAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                </Txt>
                <Txt variant="label" color={t.c.textFaint}>
                  {a.wordCount} words {on ? '⌃' : '⌄'}
                </Txt>
              </View>
            </Pressable>
            {on ? (
              <View style={{ marginTop: t.space(2), gap: t.space(2) }}>
                <Txt variant="body" color={t.c.textMuted} style={{ lineHeight: 23 }}>
                  {a.text}
                </Txt>
                <Pressable onPress={() => deleteAttempt(taskId, a.savedAt)} accessibilityRole="button" hitSlop={6}>
                  <Txt variant="label" color={t.c.accent}>
                    Delete this attempt
                  </Txt>
                </Pressable>
              </View>
            ) : null}
          </Card>
        );
      })}
    </View>
  );
}
