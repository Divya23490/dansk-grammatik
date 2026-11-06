import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Linking, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import {
  OFFICIAL_EXAMPLES,
  TASK_TYPE_GUIDES,
  WRITING_TASK_TYPES,
  findSimTask,
  gradedForType,
  simTasksOfType,
  type PracticeTask,
  type TaskTypeGuide,
  type TipGroup,
  type WritingTaskType,
} from '../../src/content/writing';
import { RULES } from '../../src/grammar/rules';
import { useWritingDrafts } from '../../src/writing/draftStore';
import { privateTasksOfType, samplesOfType, usePrivateWriting, type PrivateWriting } from '../../src/writing/store';
import { useWritingReady } from '../../src/writing/useWritingReady';
import { Button, Card, Label, ListGroup, ListRow, Txt, s } from '../../src/ui/primitives';
import { Screen } from '../../src/ui/Screen';
import { Segmented } from '../../src/ui/Segmented';
import { useTheme } from '../../src/ui/theme';
import { ExamplesSplit, SPLIT_MIN } from '../../src/ui/writing/ExamplesSplit';
import { BAND_ORDER, GradedAnswerCard } from '../../src/ui/writing/GradedAnswerCard';
import { plural, TYPE_SHORT } from '../../src/ui/writing/labels';

type Tab = 'tips' | 'template' | 'examples' | 'practice' | 'phrases';

const TABS: { key: Tab; label: string }[] = [
  { key: 'tips', label: 'Tips' },
  { key: 'template', label: 'Template' },
  { key: 'examples', label: 'Examples' },
  { key: 'practice', label: 'Practice' },
  { key: 'phrases', label: 'Phrases' },
];

const PHASE: Record<TipGroup['phase'], string> = {
  before: 'Before you write',
  while: 'While you write',
  proofread: 'Proofreading',
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

const practiceHref = (taskId: string, mode?: 'template' | 'free') =>
  ({ pathname: '/writing/practice/[taskId]', params: mode ? { taskId, mode } : { taskId } }) as never;

const ruleName = (id: string) => (RULES as Record<string, { da: string } | undefined>)[id]?.da ?? id;

/** One task type: tips, the paragraph template, graded examples, tasks to practise, phrases and pitfalls. */
export default function WritingType() {
  const t = useTheme();
  const params = useLocalSearchParams<{ type: string; tab?: string }>();
  const type = one(params.type) as WritingTaskType;
  const initial = one(params.tab) as Tab | undefined;
  const [tab, setTab] = useState<Tab>(TABS.some((x) => x.key === initial) ? initial! : 'tips');
  const w = usePrivateWriting();
  // Desktop Examples: answer | notes side by side, so the page needs the room.
  const split = useWindowDimensions().width >= SPLIT_MIN && tab === 'examples';

  if (!WRITING_TASK_TYPES.includes(type)) {
    return (
      <Screen contentContainerStyle={{ padding: t.space(4) }}>
        <Stack.Screen options={{ title: 'Writing' }} />
        <Txt variant="body">There is no writing task type “{String(type)}”.</Txt>
      </Screen>
    );
  }
  const g = TASK_TYPE_GUIDES[type];
  const name = g.name && g.name !== type ? g.name : TYPE_SHORT[type];

  return (
    <Screen
      maxWidth={split ? 1280 : undefined}
      contentContainerStyle={{ padding: t.space(4), paddingBottom: split ? t.space(4) : t.space(12), gap: t.space(4) }}
    >
      <Stack.Screen options={{ title: name }} />
      <View>
        <Label color={t.c.accent}>{g.danish && g.danish !== type ? g.danish : TYPE_SHORT[type]}</Label>
        <Txt variant="display" style={{ fontSize: 28, lineHeight: 34, marginTop: t.space(1) }}>
          {name}
        </Txt>
        {g.summary && !split ? (
          <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1.5), lineHeight: 22 }}>
            {g.summary}
          </Txt>
        ) : null}
      </View>

      {/* Five tabs don't fit a phone's width: the row scrolls sideways there and fills the width when it can. */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, minWidth: 470 }}>
        <Segmented options={TABS} value={tab} onChange={setTab} compact style={{ flex: 1 }} />
      </ScrollView>

      {tab === 'tips' ? <TipsTab g={g} /> : null}
      {tab === 'template' ? <TemplateTab g={g} /> : null}
      {tab === 'examples' ? <ExamplesTab type={type} w={w} split={split} /> : null}
      {tab === 'practice' ? <PracticeTab type={type} w={w} /> : null}
      {tab === 'phrases' ? <PhrasesTab g={g} /> : null}
    </Screen>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <Card tone="sunken">
      <Txt variant="body" color={t.c.textMuted} style={{ lineHeight: 22 }}>
        {children}
      </Txt>
    </Card>
  );
}

// ── Tips ────────────────────────────────────────────────────────────────────

function TipsTab({ g }: { g: TaskTypeGuide }) {
  const t = useTheme();
  const groups = g.tips.filter((gr) => gr.tips.length);
  if (!groups.length) return <Empty>Tips for this task are on their way.</Empty>;
  return (
    <View style={{ gap: t.space(4) }}>
      {groups.map((gr) => (
        <Card key={gr.phase}>
          <Label color={t.c.accent}>{PHASE[gr.phase]}</Label>
          <View style={{ marginTop: t.space(2.5), gap: t.space(3) }}>
            {gr.tips.map((tip, i) => (
              <View key={i}>
                <Txt variant="heading">{tip.title}</Txt>
                <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1), lineHeight: 22 }}>
                  {tip.text}
                </Txt>
              </View>
            ))}
          </View>
        </Card>
      ))}
    </View>
  );
}

// ── Template ────────────────────────────────────────────────────────────────

function TemplateTab({ g }: { g: TaskTypeGuide }) {
  const t = useTheme();
  const router = useRouter();
  const first = simTasksOfType(g.type)[0];
  if (!g.template.length) return <Empty>The paragraph template for this task is on its way.</Empty>;
  const bulletText = (key?: string) => g.officialBullets.find((b) => b.key === key);
  const total = g.template.reduce((a, sl) => [a[0] + sl.words[0], a[1] + sl.words[1]], [0, 0]);

  return (
    <View style={{ gap: t.space(3) }}>
      <Txt variant="body" color={t.c.textMuted} style={{ lineHeight: 22 }}>
        One paragraph per slot, in this order — about {total[0]}–{total[1]} words in all. Tap a starter in the editor to
        drop it into the paragraph.
      </Txt>
      {g.template.map((sl, i) => {
        const b = bulletText(sl.bullet);
        return (
          <Card key={sl.key}>
            <View style={[s.rowBetween, { alignItems: 'flex-start', gap: t.space(2) }]}>
              <View style={{ flex: 1 }}>
                <Label color={t.c.textFaint}>{i + 1}</Label>
                <Txt variant="title" style={{ fontSize: 19, lineHeight: 24 }}>
                  {sl.title}
                </Txt>
              </View>
              <Txt variant="label" color={t.c.textMuted} style={{ fontVariant: ['tabular-nums'] }}>
                {sl.words[0]}–{sl.words[1]} words
              </Txt>
            </View>
            <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1.5), lineHeight: 22 }}>
              {sl.purpose}
            </Txt>
            {b ? (
              <View
                style={{
                  marginTop: t.space(2.5),
                  borderLeftWidth: 3,
                  borderLeftColor: t.c.accent,
                  paddingLeft: t.space(2.5),
                }}
              >
                <Txt variant="label" color={t.c.textFaint}>
                  Answers the bullet
                </Txt>
                <Txt variant="body" style={{ fontSize: 15, lineHeight: 21 }}>
                  {b.danish}
                </Txt>
              </View>
            ) : null}
            {sl.starters.length ? (
              <View style={{ marginTop: t.space(3), gap: t.space(1.5) }}>
                <Label>Starters</Label>
                {sl.starters.map((p, k) => (
                  <View key={k}>
                    <Txt variant="body" style={{ lineHeight: 22 }}>
                      {p.da}
                    </Txt>
                    <Txt variant="label" color={t.c.textFaint}>
                      {p.en}
                    </Txt>
                  </View>
                ))}
              </View>
            ) : null}
          </Card>
        );
      })}
      <Button
        label="Practise with this template"
        disabled={!first}
        onPress={() => first && router.push(practiceHref(first.id, 'template'))}
      />
    </View>
  );
}

// ── Examples ────────────────────────────────────────────────────────────────

function ExamplesTab({ type, w, split }: { type: WritingTaskType; w: PrivateWriting; split: boolean }) {
  const t = useTheme();
  const graded = [...gradedForType(type)].sort((a, b) => BAND_ORDER.indexOf(a.band) - BAND_ORDER.indexOf(b.band));
  const samples = samplesOfType(w, type);
  const official = OFFICIAL_EXAMPLES.filter((ex) => ex.types.includes(type));

  if (split && graded.length) {
    return (
      <ExamplesSplit
        ladder={graded.map((a) => ({ answer: a, task: findSimTask(a.taskId) }))}
        samples={samples.map((sm) => ({ answer: sm, task: sm.task ?? w.tasks.find((x) => x.id === sm.taskId) }))}
        official={official}
      />
    );
  }

  return (
    <View style={{ gap: t.space(5) }}>
      <View style={{ gap: t.space(3) }}>
        <Card tone="warning" style={{ paddingVertical: t.space(3) }}>
          <Txt variant="heading" color={t.c.warning} style={{ fontSize: 15 }}>
            Illustrative — written for this app, not an official grade
          </Txt>
          <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 14, lineHeight: 20, marginTop: t.space(1) }}>
            Each answer shows roughly what a band looks like. Real grades are holistic across both tasks.
          </Txt>
        </Card>
        {graded.length ? (
          graded.map((a) => <GradedAnswerCard key={a.id} answer={a} task={findSimTask(a.taskId)} />)
        ) : (
          <Empty>Graded example answers for this task are on their way.</Empty>
        )}
      </View>

      {samples.length ? (
        <View style={{ gap: t.space(3) }}>
          <Txt variant="heading" color={t.c.textMuted} style={{ paddingHorizontal: t.space(1) }}>
            Learner samples
          </Txt>
          {samples.map((sm) => (
            <GradedAnswerCard key={sm.id} answer={sm} task={sm.task ?? w.tasks.find((x) => x.id === sm.taskId)} />
          ))}
        </View>
      ) : null}

      {official.length ? (
        <View style={{ gap: t.space(3) }}>
          <Txt variant="heading" color={t.c.textMuted} style={{ paddingHorizontal: t.space(1) }}>
            Official examples
          </Txt>
          {official.map((ex) => (
            <Card key={ex.id}>
              <Pressable onPress={() => Linking.openURL(ex.url)} accessibilityRole="link">
                <Txt variant="heading" color={t.c.accent}>
                  ↗ {ex.label}
                </Txt>
              </Pressable>
              {ex.notes.length ? (
                <View style={{ marginTop: t.space(2), gap: t.space(1.5) }}>
                  {ex.notes.map((n, i) => (
                    <Txt key={i} variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21 }}>
                      • {n}
                    </Txt>
                  ))}
                </View>
              ) : null}
            </Card>
          ))}
        </View>
      ) : null}
    </View>
  );
}

// ── Practice ────────────────────────────────────────────────────────────────

function PracticeTab({ type, w }: { type: WritingTaskType; w: PrivateWriting }) {
  const t = useTheme();
  const router = useRouter();
  const ready = useWritingReady();
  const records = useWritingDrafts((st) => st.tasks);
  const sims = simTasksOfType(type);
  const official = privateTasksOfType(w, type);

  const row = (task: PracticeTask) => {
    const rec = ready ? records[task.id] : undefined;
    const bits = [
      rec?.draft && (rec.draft.text.trim() || Object.values(rec.draft.slots).some((v) => v.trim())) ? 'draft' : null,
      rec?.attempts.length ? plural(rec.attempts.length, 'attempt') : null,
    ].filter(Boolean);
    return (
      <ListRow
        key={task.id}
        title={task.title}
        detail={task.origin === 'official' ? `Official · ${task.session ?? 'past paper'}` : 'Practice'}
        meta={bits.length ? bits.join(' · ') : undefined}
        metaColor={t.c.success}
        onPress={() => router.push(practiceHref(task.id))}
      />
    );
  };

  return (
    <View style={{ gap: t.space(5) }}>
      {sims.length ? (
        <View style={{ gap: t.space(2) }}>
          <ListGroup title="Practice tasks">{sims.map(row)}</ListGroup>
          <Txt variant="label" color={t.c.textFaint} style={{ paddingHorizontal: t.space(1) }}>
            Written for this app in the exam’s own format. Not official tasks.
          </Txt>
        </View>
      ) : (
        <Empty>Practice tasks for this type are on their way.</Empty>
      )}

      {official.length ? <ListGroup title="Official past tasks">{official.map(row)}</ListGroup> : null}
      {w.state === 'signedOut' ? <Empty>Sign in to practise past official tasks.</Empty> : null}
      {w.state === 'loading' && !official.length ? <ActivityIndicator color={t.c.textMuted} /> : null}
      {w.state === 'offline' ? (
        <Card tone="sunken">
          <Txt variant="body" style={{ lineHeight: 22 }}>
            The official tasks couldn’t be loaded. They come from your account, so you need to be online the first
            time you open them.
          </Txt>
          <Button label="Try again" tone="ghost" onPress={w.retry} style={{ marginTop: t.space(3) }} />
        </Card>
      ) : null}
    </View>
  );
}

// ── Phrases & pitfalls ──────────────────────────────────────────────────────

function PhrasesTab({ g }: { g: TaskTypeGuide }) {
  const t = useTheme();
  const router = useRouter();
  if (!g.phrases.length && !g.pitfalls.length) return <Empty>Phrases and pitfalls for this task are on their way.</Empty>;
  return (
    <View style={{ gap: t.space(4) }}>
      {g.phrases.map((pg, i) => (
        <Card key={i}>
          <Label color={t.c.accent}>{pg.function}</Label>
          <View style={{ marginTop: t.space(2), gap: t.space(2) }}>
            {pg.items.map((p, k) => (
              <View key={k}>
                <Txt variant="body" style={{ lineHeight: 22 }}>
                  {p.da}
                </Txt>
                <Txt variant="label" color={t.c.textFaint}>
                  {p.en}
                </Txt>
              </View>
            ))}
          </View>
        </Card>
      ))}

      {g.pitfalls.length ? (
        <View style={{ gap: t.space(3) }}>
          <Txt variant="heading" color={t.c.textMuted} style={{ paddingHorizontal: t.space(1), marginTop: t.space(2) }}>
            Pitfalls
          </Txt>
          {g.pitfalls.map((p) => (
            <Card key={p.id}>
              <Txt variant="heading">{p.title}</Txt>
              <View style={{ marginTop: t.space(2), gap: t.space(1) }}>
                <Txt variant="body" color={t.c.accent} style={{ textDecorationLine: 'line-through', lineHeight: 22 }}>
                  {p.wrong}
                </Txt>
                <Txt variant="body" color={t.c.success} style={{ fontWeight: '600', lineHeight: 22 }}>
                  → {p.right}
                </Txt>
              </View>
              <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(2), fontSize: 15, lineHeight: 21 }}>
                {p.explanation}
              </Txt>
              {p.ruleId ? (
                <Pressable
                  onPress={() => router.push({ pathname: '/rule/[id]', params: { id: p.ruleId! } } as never)}
                  accessibilityRole="link"
                  style={{ marginTop: t.space(2) }}
                >
                  <Txt variant="label" color={t.c.accent}>
                    Rule: {ruleName(p.ruleId)} ›
                  </Txt>
                </Pressable>
              ) : null}
            </Card>
          ))}
        </View>
      ) : null}
    </View>
  );
}
