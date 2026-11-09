import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { PART_NAMES, type ReadingPaper } from '../../../src/content/exams/types';
import { bestTotal, setSelfMark, useAttempts, type Attempt } from '../../../src/exam/attemptStore';
import { gradeFor, isPassingGrade, scorePart } from '../../../src/exam/grade';
import { usePaper } from '../../../src/exam/papers';
import { reviewItems, type ReviewItem } from '../../../src/exam/review';
import { formatDuration } from '../../../src/ui/exam/Clock';
import { Button, Card, Label, Txt, s } from '../../../src/ui/primitives';
import { Screen } from '../../../src/ui/Screen';
import { useTheme } from '../../../src/ui/theme';

/** The marked paper: points, the grade it adds up to, and every answer against the key. */
export default function ReadingResult() {
  const t = useTheme();
  const { paperId, attempt: attemptId } = useLocalSearchParams<{ paperId: string; attempt: string }>();
  const { paper, error, retry } = usePaper(paperId);
  const attempt = useAttempts((st) => st.attempts.find((a) => a.id === attemptId));

  if (error) {
    return (
      <Screen contentContainerStyle={{ padding: t.space(4), gap: t.space(3) }}>
        <Txt variant="body">{error}</Txt>
        <Button label="Try again" tone="ghost" onPress={retry} />
      </Screen>
    );
  }
  if (!paper || !attempt) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: t.c.bg }}>
        {paper ? <Txt variant="body">This attempt isn’t on this device.</Txt> : <ActivityIndicator color={t.c.textMuted} />}
      </View>
    );
  }
  return <Result paper={paper} attempt={attempt} />;
}

function Result({ paper, attempt }: { paper: ReadingPaper; attempt: Attempt }) {
  const t = useTheme();
  const router = useRouter();
  const attempts = useAttempts((st) => st.attempts);
  const score = scorePart(paper, attempt.part, attempt.answers, attempt.selfMarks);
  const total = bestTotal(attempts, paper.id);
  const other = attempt.part === 'lf1' ? 'lf2' : 'lf1';
  const grade = total ? gradeFor(paper.gradeTable, total.points) : null;
  const items = useMemo(() => reviewItems(paper, attempt), [paper, attempt]);
  const review = (item?: ReviewItem) =>
    router.push({
      pathname: '/exam/[paperId]/review',
      params: {
        paperId: paper.id,
        attempt: attempt.id,
        ...(item ? { item: item.id, ...(item.task >= 0 ? { task: String(item.task) } : {}) } : {}),
      },
    } as never);

  return (
    <Screen contentContainerStyle={{ padding: t.space(4), paddingBottom: t.space(12), gap: t.space(4) }}>
      <View>
        <Label color={t.c.textMuted}>{`${paper.title} · ${attempt.mode === 'exam' ? 'Exam' : 'Practice'}`}</Label>
        <Txt variant="display" style={{ fontSize: 28, lineHeight: 34, marginTop: t.space(1) }}>
          {PART_NAMES[attempt.part]}
        </Txt>
      </View>

      <Card>
        <View style={[s.row, { alignItems: 'flex-end', gap: t.space(2) }]}>
          <Txt variant="display">{String(score.points)}</Txt>
          <Txt variant="title" color={t.c.textMuted} style={{ marginBottom: 3 }}>
            {`/ ${score.max} point`}
          </Txt>
        </View>
        <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1) }}>
          {`Time used: ${formatDuration(attempt.durationMs)}`}
        </Txt>
        <View style={{ marginTop: t.space(3), gap: t.space(1.5) }}>
          {score.byTask.map((task) => (
            <View key={task.label} style={s.rowBetween}>
              <Txt variant="body" style={{ flex: 1 }} numberOfLines={1}>
                {`Delprøve ${task.label}  ·  ${task.title}`}
              </Txt>
              <Txt variant="heading">{`${task.points}/${task.max}`}</Txt>
            </View>
          ))}
        </View>
      </Card>

      {total && grade ? (
        <Card tone={isPassingGrade(grade) ? 'success' : 'warning'}>
          <Label color={isPassingGrade(grade) ? t.c.success : t.c.warning}>Reading grade</Label>
          <View style={[s.row, { alignItems: 'flex-end', gap: t.space(3), marginTop: t.space(1) }]}>
            <Txt variant="display">{grade}</Txt>
            <Txt variant="body" color={t.c.textMuted} style={{ marginBottom: 4, flex: 1 }}>
              {`${total.points}/${total.max} points: your best Læseforståelse 1 plus your best Læseforståelse 2 on this paper${
                paper.gradeTableFrom ? ' (this session’s conversion table isn’t available, so a neighbouring one is used)' : ''
              }.`}
            </Txt>
          </View>
        </Card>
      ) : (
        <Card tone="sunken">
          <Txt variant="body" style={{ lineHeight: 22 }}>
            {`The reading grade combines both parts. Do ${PART_NAMES[other]} of this paper to see it.`}
          </Txt>
          <Button
            label={`Go to ${PART_NAMES[other]}`}
            tone="ghost"
            style={{ marginTop: t.space(3) }}
            onPress={() => router.replace({ pathname: '/exam/[paperId]', params: { paperId: paper.id } } as never)}
          />
        </Card>
      )}

      <View style={[s.rowBetween, { gap: t.space(3), flexWrap: 'wrap' }]}>
        <Txt variant="title">Your answers</Txt>
        <Button label="Review with the text" onPress={() => review()} style={{ paddingVertical: t.space(2.5) }} />
      </View>
      {attempt.part === 'lf1' ? (
        <Txt variant="body" color={t.c.textMuted} style={{ lineHeight: 22, marginTop: -t.space(2) }}>
          The answer key is a guide, and the censor may accept other answers. If your answer says the same as the key in
          other words, mark it right yourself.
        </Txt>
      ) : null}
      <View style={{ gap: t.space(2) }}>
        {items.map((item) => (
          <ItemRow key={item.id} item={item} paper={paper} attempt={attempt} onOpen={() => review(item)} />
        ))}
      </View>

      <View style={{ gap: t.space(2), marginTop: t.space(2) }}>
        <Button
          label="Back to the paper"
          onPress={() => router.replace({ pathname: '/exam/[paperId]', params: { paperId: paper.id } } as never)}
        />
      </View>
    </Screen>
  );
}

/** "B · Rejsen var lang" — the letter and what it stands for, shortened for a long paragraph. */
const spell = (letter: string, text?: string) => {
  if (!letter) return '—';
  if (!text) return letter;
  return `${letter} · ${text.length > 140 ? `${text.slice(0, 137).trimEnd()}…` : text}`;
};

function ItemRow({
  item,
  paper,
  attempt,
  onOpen,
}: {
  item: ReviewItem;
  paper: ReadingPaper;
  attempt: Attempt;
  onOpen: () => void;
}) {
  const t = useTheme();
  const lf1 = attempt.part === 'lf1';
  const override = attempt.selfMarks[item.id];

  return (
    <View
      style={{
        padding: t.space(3),
        borderRadius: t.radius.md,
        borderWidth: 1,
        borderColor: item.correct ? t.c.success + '55' : t.c.warning + '55',
        backgroundColor: item.correct ? t.c.successSoft : t.c.warningSoft,
        gap: t.space(1),
      }}
    >
      <View style={s.rowBetween}>
        <Txt variant="heading">{item.label}</Txt>
        <Label color={item.correct ? t.c.success : t.c.warning}>
          {`${item.points}/${item.max}${item.selfMarked ? ' · marked by you' : ''}`}
        </Label>
      </View>
      {item.prompt ? (
        <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 14, lineHeight: 20 }}>
          {item.prompt}
        </Txt>
      ) : null}
      <Txt variant="body" style={{ fontSize: 15, lineHeight: 21 }}>
        {`Your answer: ${lf1 ? item.given.trim() || '—' : spell(item.given, item.givenText)}`}
      </Txt>
      {!item.correct || lf1 ? (
        <Txt variant="body" style={{ fontSize: 15, lineHeight: 21 }}>
          {lf1 ? `Rettenøgle: ${item.key}` : `Right answer: ${spell(item.key, item.keyText)}`}
        </Txt>
      ) : null}
      <View style={[s.row, { gap: t.space(4), marginTop: t.space(1), flexWrap: 'wrap' }]}>
        {lf1 && item.given.trim() ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => setSelfMark(paper, attempt.id, item.id, override === undefined ? !item.correct : null)}
          >
            <Txt variant="label" color={t.c.accent}>
              {override !== undefined ? 'Undo my marking' : item.correct ? 'Mark as wrong' : 'Mark as right'}
            </Txt>
          </Pressable>
        ) : null}
        <Pressable accessibilityRole="link" onPress={onOpen}>
          <Txt variant="label" color={t.c.accent}>
            See it in the text ›
          </Txt>
        </Pressable>
      </View>
    </View>
  );
}
