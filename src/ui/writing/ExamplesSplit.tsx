import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import { countWords, type GradedAnswer, type OfficialExample, type PracticeTask } from '../../content/writing';
import type { ExampleGroup } from '../../writing/exampleGroups';
import { Card, Label, Txt, s } from '../primitives';
import { useTheme } from '../theme';
import { AnnotatedText, NoteList } from './AnnotatedText';
import { BandChip, CriteriaList, TeacherComment } from './GradedAnswerCard';
import { TaskCard } from './TaskCard';

export interface ExampleItem {
  answer: GradedAnswer;
  task?: PracticeTask;
}

/** Window width from which the Examples tab splits into answer | notes. */
export const SPLIT_MIN = 1000;
const PANEL_WIDTH = 420;

/**
 * Desktop Examples: pick an answer at the top left, read it below, and keep
 * its verdict, every note and the criteria in a panel on the right. Both
 * columns are sized to the window and scroll on their own, so a tapped
 * highlight's note comes into view without scrolling the page.
 */
export function ExamplesSplit({ group, official }: { group: ExampleGroup; official: OfficialExample[] }) {
  const t = useTheme();
  const { height: winH } = useWindowDimensions();
  const ladder: ExampleItem[] = group.ladder.map((answer) => ({ answer, task: group.task }));
  const samples: ExampleItem[] = group.samples.map((answer) => ({ answer, task: group.task }));
  const all = [...ladder, ...samples];
  const [activeId, setActiveId] = useState(all[0]?.answer.id ?? null);
  const [sel, setSel] = useState<number | null>(null);
  const [showTask, setShowTask] = useState(false);
  const active = all.find((x) => x.answer.id === activeId) ?? all[0];

  // Fill the window below wherever the split starts.
  const root = useRef<View>(null);
  const [top, setTop] = useState(160);
  const measure = useCallback(() => {
    root.current?.measureInWindow((_x, y) => {
      if (y > 0) setTop(y);
    });
  }, []);
  useEffect(measure, [measure, winH]);
  const height = Math.max(460, winH - top - t.space(4));

  // Scroll the selected note into view; reset both columns on a new answer.
  const left = useRef<ScrollView>(null);
  const panel = useRef<ScrollView>(null);
  const listY = useRef(0);
  const itemY = useRef<Record<number, number>>({});
  useEffect(() => {
    if (sel === null) return;
    const y = itemY.current[sel];
    if (y !== undefined) panel.current?.scrollTo({ y: Math.max(0, listY.current + y - t.space(3)), animated: true });
  }, [sel, t]);
  const pick = (id: string) => {
    setActiveId(id);
    setSel(null);
    itemY.current = {};
    left.current?.scrollTo({ y: 0, animated: false });
    panel.current?.scrollTo({ y: 0, animated: false });
  };

  if (!active) return null;
  const { answer, task } = active;
  const learner = answer.origin === 'learner';

  return (
    <View ref={root} onLayout={measure} style={[s.row, { gap: t.space(4), height, alignItems: 'stretch' }]}>
      {/* Left: picker, task, answer */}
      <ScrollView ref={left} style={{ flex: 1 }} contentContainerStyle={{ gap: t.space(3), paddingBottom: t.space(6) }}>
        {ladder.length ? (
          <PickerGroup title="Illustrative ladder · written for this app, not official grades">
            {ladder.map((x) => (
              <Pill key={x.answer.id} item={x} on={x.answer.id === answer.id} onPress={() => pick(x.answer.id)} />
            ))}
          </PickerGroup>
        ) : null}
        {samples.length ? (
          <PickerGroup title="Learner samples">
            {samples.map((x) => (
              <Pill
                key={x.answer.id}
                item={x}
                label={x.answer.author}
                on={x.answer.id === answer.id}
                onPress={() => pick(x.answer.id)}
              />
            ))}
          </PickerGroup>
        ) : null}

        {task ? (
          <View style={{ gap: t.space(2) }}>
            <Pressable
              onPress={() => setShowTask((v) => !v)}
              accessibilityRole="button"
              accessibilityState={{ expanded: showTask }}
              style={[s.row, { gap: t.space(2) }]}
            >
              <Txt variant="heading" style={{ fontSize: 15, flex: 1 }}>
                Task · {task.title}
                {task.session ? ` · ${task.session}` : ''}
              </Txt>
              <Txt variant="label" color={t.c.accent}>
                {showTask ? 'Hide task ⌃' : 'Show task ⌄'}
              </Txt>
            </Pressable>
            {showTask ? <TaskCard task={task} compact /> : null}
          </View>
        ) : null}

        <AnnotatedText text={answer.text} annotations={answer.annotations} selected={sel} onSelect={setSel} />

        {official.length ? (
          <View style={{ gap: t.space(1.5), marginTop: t.space(2) }}>
            <Label>Official example</Label>
            {official.map((ex) => (
              <Pressable key={ex.id} onPress={() => Linking.openURL(ex.url)} accessibilityRole="link">
                <Txt variant="body" color={t.c.accent} style={{ fontSize: 15 }}>
                  ↗ {ex.label}
                </Txt>
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>

      {/* Right: verdict, notes, criteria */}
      <Card style={{ width: PANEL_WIDTH, padding: 0, overflow: 'hidden' }}>
        <ScrollView ref={panel} style={{ flex: 1 }} contentContainerStyle={{ padding: t.space(4), gap: t.space(4) }}>
          <View style={[s.row, { gap: t.space(3), alignItems: 'flex-start' }]}>
            <BandChip band={answer.band} />
            <View style={{ flex: 1 }}>
              <Label color={learner ? t.c.accent : t.c.warning}>
                {learner ? `Learner sample${answer.author ? ` · ${answer.author}` : ''}` : 'Illustrative'}
              </Label>
              <Txt variant="body" style={{ lineHeight: 22 }}>
                {answer.summary}
              </Txt>
              <Txt variant="label" color={t.c.textFaint} style={{ marginTop: t.space(1) }}>
                {countWords(answer.text)} words
              </Txt>
            </View>
          </View>
          <TeacherComment answer={answer} />
          <View onLayout={(e: LayoutChangeEvent) => (listY.current = e.nativeEvent.layout.y)}>
            <NoteList
              text={answer.text}
              annotations={answer.annotations}
              selected={sel}
              onSelect={setSel}
              onItemLayout={(i, e) => (itemY.current[i] = e.nativeEvent.layout.y)}
            />
          </View>
          <CriteriaList answer={answer} />
        </ScrollView>
      </Card>
    </View>
  );
}

function PickerGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useTheme();
  return (
    <View style={{ gap: t.space(1.5) }}>
      <Label>{title}</Label>
      <View style={[s.row, { gap: t.space(2), flexWrap: 'wrap' }]}>{children}</View>
    </View>
  );
}

function Pill({ item, on, onPress, label }: { item: ExampleItem; on: boolean; onPress: () => void; label?: string }) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      style={({ pressed }) => [
        s.row,
        {
          gap: t.space(2),
          paddingLeft: t.space(1),
          paddingRight: label ? t.space(3) : t.space(1),
          paddingVertical: t.space(1),
          borderRadius: 999,
          borderWidth: on ? 2 : 1,
          borderColor: on ? t.c.accent : t.c.border,
          backgroundColor: on ? t.c.accentSoft : pressed ? t.c.surfaceSunken : t.c.surface,
        },
      ]}
    >
      <BandChip band={item.answer.band} />
      {label ? (
        <Txt variant="label" color={on ? t.c.text : t.c.textMuted}>
          {label}
        </Txt>
      ) : null}
    </Pressable>
  );
}
