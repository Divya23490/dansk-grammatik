import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { PART_NAMES, type InsertTask, type Lf2Task, type ReadingPaper } from '../../../src/content/exams/types';
import { setSelfMark, useAttempts, type Attempt } from '../../../src/exam/attemptStore';
import { lf2ItemId } from '../../../src/exam/grade';
import { usePaper } from '../../../src/exam/papers';
import { reviewItems, taskScores, type ReviewItem } from '../../../src/exam/review';
import { Explanation, type ExplainLang } from '../../../src/ui/exam/Explanation';
import { ChoiceItem, InsertPicker, Lf1Item } from '../../../src/ui/exam/items';
import { PassageBlocks, PassageTitle } from '../../../src/ui/exam/Passage';
import { ReadingLayout, useIsWide, type Pane } from '../../../src/ui/exam/ReadingLayout';
import { Button, Card, Label, Txt, s, withFont } from '../../../src/ui/primitives';
import { Segmented } from '../../../src/ui/Segmented';
import { useTheme } from '../../../src/ui/theme';

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const noop = () => {};

/**
 * A handed-in attempt laid out like the paper: the text on one side, and on
 * the other every question with your answer and the right one. Cloze and
 * insert answers are also marked in the text itself.
 */
export default function ReadingReview() {
  const t = useTheme();
  const params = useLocalSearchParams<{ paperId: string; attempt: string; task?: string; item?: string }>();
  const { paper, error, retry } = usePaper(one(params.paperId));
  const attemptId = one(params.attempt);
  const attempt = useAttempts((st) => st.attempts.find((a) => a.id === attemptId));

  if (error) {
    return (
      <View style={{ flex: 1, padding: t.space(6), gap: t.space(4), backgroundColor: t.c.bg }}>
        <Txt variant="body">{error}</Txt>
        <Button label="Try again" tone="ghost" onPress={retry} />
      </View>
    );
  }
  if (!paper || !attempt) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: t.c.bg }}>
        {paper ? <Txt variant="body">This attempt isn’t on this device.</Txt> : <ActivityIndicator color={t.c.textMuted} />}
      </View>
    );
  }
  const task = Number(one(params.task));
  return (
    <Review
      paper={paper}
      attempt={attempt}
      initialTask={Number.isInteger(task) && task >= 0 && task < paper.lf2.tasks.length ? task : 0}
      initialItem={one(params.item)}
    />
  );
}

function Review({
  paper,
  attempt,
  initialTask,
  initialItem,
}: {
  paper: ReadingPaper;
  attempt: Attempt;
  initialTask: number;
  initialItem?: string;
}) {
  const t = useTheme();
  const router = useRouter();
  const wide = useIsWide();
  const passageRef = useRef<ScrollView>(null);
  const questionsRef = useRef<ScrollView>(null);
  const [pane, setPane] = useState<Pane>(initialItem && !wide ? 'questions' : 'text');
  const [taskIdx, setTaskIdx] = useState(initialTask);
  const [focusItem, setFocusItem] = useState<string | null>(initialItem ?? null);
  const [lang, setLang] = useState<ExplainLang>('both');
  // The item the page was opened on: scrolled to once its card has been laid out.
  const pendingScroll = useRef<string | null>(initialItem ?? null);
  const itemY = useRef<Record<string, number>>({});
  const sectionY = useRef<Record<number, number>>({});

  const items = useMemo(() => reviewItems(paper, attempt), [paper, attempt]);
  const byId = useMemo(() => new Map(items.map((it) => [it.id, it])), [items]);
  const scores = useMemo(() => taskScores(items), [items]);
  const points = items.reduce((sum, it) => sum + it.points, 0);
  const max = items.reduce((sum, it) => sum + it.max, 0);
  const wrong = items.filter((it) => !it.correct).length;

  const item = (id: string) => byId.get(id)!;
  const reviewProps = { practice: true, checked: true, onCheck: noop } as const;

  const scrollToItem = (id: string) => {
    const y = itemY.current[id];
    if (y !== undefined) setTimeout(() => questionsRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true }), 50);
  };

  /** From a gap in the text to its question: switch pane on a phone, then scroll to it. */
  const goToItem = (id: string) => {
    setFocusItem(id);
    if (!wide) setPane('questions');
    scrollToItem(id);
  };

  const track = (id: string, child: React.ReactNode) => (
    <View
      key={id}
      onLayout={(e) => {
        itemY.current[id] = e.nativeEvent.layout.y;
        if (pendingScroll.current === id) {
          pendingScroll.current = null;
          scrollToItem(id);
        }
      }}
      style={{ marginBottom: t.space(3) }}
    >
      {child}
      <Explanation item={item(id)} lang={lang} />
    </View>
  );

  const switchTask = (i: number) => {
    setTaskIdx(i);
    setFocusItem(null);
    pendingScroll.current = null;
    itemY.current = {};
    passageRef.current?.scrollTo({ y: 0, animated: false });
    questionsRef.current?.scrollTo({ y: 0, animated: false });
  };

  const backToResult = () =>
    router.canGoBack()
      ? router.back()
      : router.replace({ pathname: '/exam/[paperId]/result', params: { paperId: paper.id, attempt: attempt.id } } as never);

  // ── Top bar ──────────────────────────────────────────────────────────────

  const top = (
    <View style={{ gap: t.space(2.5) }}>
      <View style={[s.rowBetween, { gap: t.space(3) }]}>
        <View style={{ flex: 1 }}>
          <Label color={t.c.textMuted}>{`Review · ${attempt.mode === 'exam' ? 'Exam' : 'Practice'}`}</Label>
          <Txt variant="heading" numberOfLines={1}>
            {PART_NAMES[attempt.part]}
            <Txt variant="body" color={t.c.textMuted}>{`  ·  ${paper.title}`}</Txt>
          </Txt>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Txt variant="heading">{`${points}/${max}`}</Txt>
          <Label color={wrong ? t.c.warning : t.c.success}>{wrong ? `${wrong} to look at` : 'All right'}</Label>
        </View>
        <Button label="Results" tone="ghost" onPress={backToResult} style={{ paddingVertical: t.space(2), paddingHorizontal: t.space(4) }} />
      </View>
      <View style={[s.row, { gap: t.space(2), alignItems: 'center' }]}>
        <Label color={t.c.textFaint}>Explanations</Label>
        <View style={{ flex: 1, maxWidth: 260 }}>
          <Segmented
            compact
            options={[
              { key: 'both', label: 'DA + EN' },
              { key: 'da', label: 'Dansk' },
              { key: 'en', label: 'English' },
            ]}
            value={lang}
            onChange={(k) => setLang(k as ExplainLang)}
          />
        </View>
      </View>
      {attempt.part === 'lf2' ? (
        <Segmented
          compact
          options={paper.lf2.tasks.map((task, i) => ({
            key: String(i),
            label: task.label,
            badge: scores[i] ? `${scores[i].points}/${scores[i].max}` : undefined,
          }))}
          value={String(taskIdx)}
          onChange={(k) => switchTask(Number(k))}
        />
      ) : null}
    </View>
  );

  // ── Panes ────────────────────────────────────────────────────────────────

  const { passage, questions } = attempt.part === 'lf1' ? lf1Panes() : lf2Panes(paper.lf2.tasks[taskIdx], taskIdx);

  function lf1Panes() {
    const toc = (
      <Card tone="sunken" style={{ marginBottom: t.space(6) }}>
        <Label>Indhold</Label>
        <Txt variant="title" style={{ marginTop: t.space(1), marginBottom: t.space(2) }}>
          {paper.lf1.theme}
        </Txt>
        {paper.lf1.sections.map((sec, i) => (
          <Pressable
            key={i}
            accessibilityRole="link"
            onPress={() => passageRef.current?.scrollTo({ y: Math.max(0, (sectionY.current[i] ?? 0) - 8), animated: true })}
            style={({ pressed }) => ({ paddingVertical: t.space(1.5), opacity: pressed ? 0.6 : 1 })}
          >
            <Txt variant="body" color={t.c.accent} style={{ textDecorationLine: 'underline' }}>
              {sec.title}
            </Txt>
          </Pressable>
        ))}
      </Card>
    );
    const p = (
      <>
        {toc}
        {paper.lf1.sections.map((sec, i) => (
          <View key={i} onLayout={(e) => (sectionY.current[i] = e.nativeEvent.layout.y)} style={{ marginBottom: t.space(10) }}>
            <View style={[s.rowBetween, { marginBottom: t.space(2) }]}>
              <Label color={t.c.textFaint}>{paper.lf1.theme}</Label>
              <Pressable onPress={() => passageRef.current?.scrollTo({ y: 0, animated: true })} accessibilityRole="link">
                <Label color={t.c.accent}>↑ Indhold</Label>
              </Pressable>
            </View>
            <PassageTitle>{sec.title}</PassageTitle>
            <PassageBlocks blocks={sec.blocks} />
          </View>
        ))}
      </>
    );
    const groups: { section: string; qs: typeof paper.lf1.questions }[] = [];
    for (const q of paper.lf1.questions) {
      const last = groups[groups.length - 1];
      if (last && last.section === q.section) last.qs.push(q);
      else groups.push({ section: q.section, qs: [q] });
    }
    const qs = (
      <>
        <Instruction>
          The key is a guide, and the censor may accept other answers. If yours says the same as the key in other words,
          mark it right yourself.
        </Instruction>
        {groups.map((g) => (
          <View key={g.section} style={{ marginBottom: t.space(2) }}>
            <Label color={t.c.textMuted}>{`Søg informationer under ${g.section}`}</Label>
            <View style={{ height: t.space(2) }} />
            {g.qs.map((q) => {
              const id = `q${q.n}`;
              const it = item(id);
              return track(
                id,
                <View style={{ gap: t.space(1.5) }}>
                  <Lf1Item
                    q={q}
                    value={it.given}
                    onChange={noop}
                    ok={it.correct}
                    note="If your answer says the same thing in other words, mark it right below."
                    highlight={focusItem === id}
                    {...reviewProps}
                  />
                  <SelfMark paper={paper} attempt={attempt} item={it} />
                </View>,
              );
            })}
          </View>
        ))}
      </>
    );
    return { passage: p, questions: qs };
  }

  function lf2Panes(task: Lf2Task, ti: number) {
    if (task.kind === 'mc') {
      const p = task.passages.map((ps, i) => (
        <View key={i} style={{ marginBottom: t.space(8) }}>
          {task.passages.length > 1 ? <Label color={t.c.textFaint}>{`Tekst ${i + 1}`}</Label> : null}
          <PassageTitle>{ps.title}</PassageTitle>
          <PassageBlocks blocks={ps.blocks} />
        </View>
      ));
      const qs = task.questions.map((q, i) => {
        const id = lf2ItemId(ti, i + 1);
        return track(
          id,
          <ChoiceItem
            number={i + 1}
            prompt={task.passages.length > 1 && q.passage !== undefined ? `(Tekst ${q.passage + 1}) ${q.prompt}` : q.prompt}
            options={q.options}
            value={item(id).given}
            onSelect={noop}
            correct={q.correct}
            alsoCorrect={q.alsoCorrect}
            highlight={focusItem === id}
            {...reviewProps}
          />,
        );
      });
      return { passage: p, questions: <>{qs}</> };
    }

    if (task.kind === 'insert') return insertPanes(task, ti);

    // Cloze: each gap in the text shows the word you chose, and the right one if it wasn't.
    const gapLabel = (n: number) => {
      if (n === 0 && task.example) {
        const word = task.example.options[task.example.correct.charCodeAt(0) - 65];
        return <ReviewGap n={0} example right={word} />;
      }
      const id = lf2ItemId(ti, n);
      const it = item(id);
      return (
        <ReviewGap
          n={n}
          given={it.givenText}
          right={it.keyText}
          ok={it.correct}
          focused={focusItem === id}
          onPress={() => goToItem(id)}
        />
      );
    };
    const p = (
      <>
        <PassageTitle>{task.passage.title}</PassageTitle>
        <PassageBlocks blocks={task.passage.blocks} renderGap={gapLabel} />
      </>
    );
    const qs = (
      <>
        <Instruction>Tap a gap in the text to jump to it.</Instruction>
        {task.gaps.map((g, i) => {
          const id = lf2ItemId(ti, i + 1);
          return track(
            id,
            <ChoiceItem
              number={i + 1}
              options={g.options}
              value={item(id).given}
              onSelect={noop}
              correct={g.correct}
              alsoCorrect={g.alsoCorrect}
              inline
              highlight={focusItem === id}
              {...reviewProps}
            />,
          );
        })}
      </>
    );
    return { passage: p, questions: qs };
  }

  function insertPanes(task: InsertTask, ti: number) {
    const p = (
      <>
        <PassageTitle>{task.passage.title}</PassageTitle>
        <PassageBlocks
          blocks={task.passage.blocks}
          renderBlockGap={(n) => {
            const id = lf2ItemId(ti, n);
            const it = item(id);
            const tone = it.correct ? t.c.success : t.c.warning;
            return (
              <Pressable
                onPress={() => goToItem(id)}
                accessibilityRole="button"
                accessibilityLabel={`Hul ${n}, ${it.correct ? 'right' : 'wrong'}: your answer ${it.given || 'none'}, right answer ${task.correct[n - 1]}`}
                style={{
                  borderWidth: focusItem === id ? 2 : 1.5,
                  borderColor: focusItem === id ? t.c.accent : tone,
                  borderRadius: t.radius.md,
                  padding: t.space(3),
                  backgroundColor: it.correct ? t.c.successSoft : t.c.warningSoft,
                  gap: t.space(1),
                }}
              >
                <Label color={tone}>
                  {it.correct
                    ? `${n}  ·  ${it.given}  ·  right`
                    : `${n}  ·  ${it.given ? `you chose ${it.given}` : 'no answer'}  ·  right answer ${task.correct[n - 1]}`}
                </Label>
                {it.givenText && !it.correct ? (
                  <Txt
                    variant="body"
                    color={t.c.textMuted}
                    style={{ fontSize: 15, lineHeight: 23, textDecorationLine: 'line-through' }}
                  >
                    {it.givenText}
                  </Txt>
                ) : null}
                {it.keyText ? (
                  <Txt variant="body" style={{ fontSize: 16, lineHeight: 26 }}>
                    {it.keyText}
                  </Txt>
                ) : null}
              </Pressable>
            );
          }}
        />
      </>
    );
    const letters = task.inserts.map((x) => x.letter);
    const placed = task.correct.map((_, i) => item(lf2ItemId(ti, i + 1)).given);
    const none = new Set<string>();
    const qs = (
      <>
        <View style={{ gap: t.space(2), marginBottom: t.space(5) }}>
          {task.inserts.map((ins) => {
            const rightAt = task.correct.indexOf(ins.letter);
            const yoursAt = placed.indexOf(ins.letter);
            return (
              <View
                key={ins.letter}
                style={{
                  flexDirection: 'row',
                  gap: t.space(3),
                  padding: t.space(3),
                  borderRadius: t.radius.md,
                  backgroundColor: t.c.surface,
                  borderWidth: 1,
                  borderColor: t.c.border,
                }}
              >
                <Txt variant="heading">{ins.letter}</Txt>
                <Txt variant="body" style={{ flex: 1, fontSize: 15, lineHeight: 22 }}>
                  {ins.text}
                </Txt>
                <Label color={rightAt < 0 ? t.c.textFaint : yoursAt === rightAt ? t.c.success : t.c.warning}>
                  {rightAt < 0 ? 'extra' : `hul ${rightAt + 1}`}
                </Label>
              </View>
            );
          })}
        </View>
        {task.correct.map((c, i) => {
          const id = lf2ItemId(ti, i + 1);
          return track(
            id,
            <InsertPicker
              gap={i + 1}
              letters={letters}
              value={item(id).given}
              usedElsewhere={none}
              onSelect={noop}
              correct={c}
              highlight={focusItem === id}
              {...reviewProps}
            />,
          );
        })}
      </>
    );
    return { passage: p, questions: qs };
  }

  return (
    <ReadingLayout
      top={top}
      passage={passage}
      questions={questions}
      passageRef={passageRef}
      questionsRef={questionsRef}
      pane={pane}
      onPaneChange={setPane}
      questionsBadge={`${points}/${max}`}
    />
  );
}

/** LF1: the learner acts as their own censor, as on the result screen. */
function SelfMark({ paper, attempt, item }: { paper: ReadingPaper; attempt: Attempt; item: ReviewItem }) {
  const t = useTheme();
  if (!item.given.trim()) return null;
  const override = attempt.selfMarks[item.id];
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => setSelfMark(paper, attempt.id, item.id, override === undefined ? !item.correct : null)}
      style={{ alignSelf: 'flex-start', paddingHorizontal: t.space(1) }}
    >
      <Txt variant="label" color={t.c.accent}>
        {override !== undefined ? 'Undo my marking' : item.correct ? 'Mark as wrong' : 'Mark as right'}
      </Txt>
    </Pressable>
  );
}

function Instruction({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 22, marginBottom: t.space(4) }}>
      {children}
    </Txt>
  );
}

/** A cloze gap in review: the word chosen, struck through if wrong, then the right word. */
function ReviewGap({
  n,
  given,
  right,
  ok,
  example,
  focused,
  onPress,
}: {
  n: number;
  given?: string;
  right?: string;
  ok?: boolean;
  example?: boolean;
  focused?: boolean;
  onPress?: () => void;
}) {
  const t = useTheme();
  const tone = example ? t.c.textMuted : ok ? t.c.success : t.c.warning;
  return (
    <Text
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={withFont({
        fontWeight: '700',
        color: tone,
        backgroundColor: focused ? t.c.accentSoft : example ? t.c.surfaceSunken : ok ? t.c.successSoft : t.c.warningSoft,
      })}
    >
      {` (${n}) `}
      {example || ok ? (
        `${right ?? ''} `
      ) : (
        <>
          {given ? (
            <Text style={withFont({ textDecorationLine: 'line-through', fontWeight: '400', color: t.c.textMuted })}>{given}</Text>
          ) : (
            '……'
          )}
          {` → ${right ?? ''} `}
        </>
      )}
    </Text>
  );
}
