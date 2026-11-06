import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { CRITERIA, countWords, type Band, type GradedAnswer, type PracticeTask } from '../../content/writing';
import { Card, Label, Txt, s } from '../primitives';
import { useTheme } from '../theme';
import { AnnotatedText, NoteList } from './AnnotatedText';
import { TaskCard } from './TaskCard';

export const BAND_ORDER: Band[] = ['12', '10', '7', '4', '02', '00'];

export function BandChip({ band }: { band: Band }) {
  const t = useTheme();
  const tone =
    band === '12' || band === '10'
      ? { fg: t.c.success, bg: t.c.successSoft }
      : band === '7'
        ? { fg: t.c.text, bg: t.c.surfaceSunken }
        : band === '4'
          ? { fg: t.c.warning, bg: t.c.warningSoft }
          : { fg: t.c.accent, bg: t.c.accentSoft };
  return (
    <View
      style={{
        minWidth: 40,
        alignItems: 'center',
        borderRadius: 999,
        paddingHorizontal: t.space(2.5),
        paddingVertical: t.space(1),
        backgroundColor: tone.bg,
        borderWidth: 1,
        borderColor: tone.fg + '55',
      }}
    >
      <Txt variant="heading" color={tone.fg} style={{ fontSize: 15, lineHeight: 18, fontVariant: ['tabular-nums'] }}>
        ~{band}
      </Txt>
    </View>
  );
}

/** A graded answer (illustrative or learner sample), collapsed to its verdict until opened. */
export function GradedAnswerCard({ answer, task }: { answer: GradedAnswer; task?: PracticeTask }) {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<number | null>(null);
  const learner = answer.origin === 'learner';
  const words = countWords(answer.text);

  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={({ pressed }) => ({
          padding: t.space(4),
          backgroundColor: pressed ? t.c.surfaceSunken : 'transparent',
        })}
      >
        <View style={[s.row, { gap: t.space(3), alignItems: 'flex-start' }]}>
          <BandChip band={answer.band} />
          <View style={{ flex: 1 }}>
            {learner ? (
              <Label color={t.c.accent}>Learner sample{answer.author ? ` · ${answer.author}` : ''}</Label>
            ) : null}
            <Txt variant="body" style={{ lineHeight: 22 }}>
              {answer.summary}
            </Txt>
            <Txt variant="label" color={t.c.textFaint} style={{ marginTop: t.space(1) }}>
              {words} words{task ? ` · ${task.title}` : ''}
            </Txt>
          </View>
          <Txt variant="title" color={t.c.textFaint} style={{ fontSize: 20, lineHeight: 22 }}>
            {open ? '⌃' : '⌄'}
          </Txt>
        </View>
      </Pressable>

      {open ? (
        <View style={{ paddingHorizontal: t.space(4), paddingBottom: t.space(4), gap: t.space(4) }}>
          {task ? <TaskCard task={task} compact /> : null}
          <AnnotatedText text={answer.text} annotations={answer.annotations} selected={sel} onSelect={setSel} />
          <NoteList text={answer.text} annotations={answer.annotations} selected={sel} onSelect={setSel} />
          <CriteriaList answer={answer} />
          <TeacherComment answer={answer} />
        </View>
      ) : null}
    </Card>
  );
}

/** "How it scores": the comment under each official criterion. */
export function CriteriaList({ answer }: { answer: GradedAnswer }) {
  const t = useTheme();
  if (!answer.criteria.length) return null;
  return (
            <View style={{ gap: t.space(2.5) }}>
              <Label>How it scores</Label>
              {answer.criteria.map((c, i) => (
                <View key={i}>
                  <Txt variant="heading" style={{ fontSize: 15 }}>
                    {CRITERIA[c.criterion]?.title ?? c.criterion}
                  </Txt>
                  <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21, marginTop: 2 }}>
                    {c.comment}
                  </Txt>
                </View>
              ))}
            </View>
  );
}

export function TeacherComment({ answer }: { answer: GradedAnswer }) {
  const t = useTheme();
  if (!answer.teacherComment) return null;
  return (
            <Card tone="sunken">
              <Label>Teacher’s comment</Label>
              <Txt variant="body" style={{ marginTop: t.space(1.5), lineHeight: 22, fontStyle: 'italic' }}>
                {answer.teacherComment}
              </Txt>
            </Card>
  );
}
