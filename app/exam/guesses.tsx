import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  FORECAST_INTRO,
  FORECAST_SECTIONS,
  FORECASTS,
  WORD_BANKS,
  type ForecastSection,
  type PhraseGroup,
  type TaskForecast,
} from '../../src/content/guesses2026';
import type { TermGroup, WordLists } from '../../src/content/guesses2026Words';
import { Screen } from '../../src/ui/Screen';
import { Segmented } from '../../src/ui/Segmented';
import { Card, Divider, Label, Txt } from '../../src/ui/primitives';
import { useTheme } from '../../src/ui/theme';

/**
 * November 2026 guesses: per task, what the last four years of PD3 papers
 * set, what is most likely next, tips, and (for writing and speaking) a
 * cheat sheet of sentences that fit any topic. Every forecast carries the
 * counts it rests on, and the page says plainly that none of it is a real task.
 */
export default function GuessesScreen() {
  const t = useTheme();
  const [section, setSection] = useState<ForecastSection>('reading');
  const [taskKey, setTaskKey] = useState<Record<ForecastSection, string>>({
    reading: FORECASTS.reading[0].key,
    writing: FORECASTS.writing[0].key,
    speaking: FORECASTS.speaking[0].key,
  });
  const tasks = FORECASTS[section];
  const task = tasks.find((x) => x.key === taskKey[section]) ?? tasks[0];

  return (
    <Screen contentContainerStyle={{ padding: t.space(4), paddingBottom: t.space(12), gap: t.space(4) }}>
        <View>
          <Txt variant="display" style={{ fontSize: 28, lineHeight: 34 }}>
            {FORECAST_INTRO.title}
          </Txt>
          <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1.5), lineHeight: 22 }}>
            {FORECAST_INTRO.lede}
          </Txt>
        </View>

        <Card tone="sunken">
          <Label>Based on</Label>
          <View style={{ marginTop: t.space(1.5), gap: t.space(1) }}>
            {FORECAST_INTRO.window.map((w) => (
              <Txt key={w} variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21 }}>
                • {w}
              </Txt>
            ))}
          </View>
        </Card>

        <Segmented options={FORECAST_SECTIONS} value={section} onChange={setSection} />
        <Segmented
          compact
          options={tasks.map((x) => ({ key: x.key, label: x.name.replace('Delprøve ', '') }))}
          value={task.key}
          onChange={(k) => setTaskKey((cur) => ({ ...cur, [section]: k }))}
        />

        <TaskView task={task} />

        {section === 'writing' ? <WordBanks /> : null}
    </Screen>
  );
}

function TaskView({ task }: { task: TaskForecast }) {
  const t = useTheme();
  const router = useRouter();
  return (
    <View style={{ gap: t.space(4) }}>
      <View>
        <Txt variant="title">
          {task.name} · {task.danish}
        </Txt>
        <Txt variant="label" color={t.c.textFaint} style={{ marginTop: t.space(1) }}>
          {task.format}
        </Txt>
      </View>

      <Card>
        <Label color={t.c.accent}>What came up</Label>
        <View style={{ marginTop: t.space(2), gap: t.space(2) }}>
          {task.seen.map((x) => (
            <View key={x.session + x.theme}>
              <Txt variant="label" color={t.c.textFaint}>
                {x.session}
              </Txt>
              <Txt variant="body" style={{ fontSize: 15, lineHeight: 21 }}>
                {x.theme}
              </Txt>
            </View>
          ))}
        </View>
        <Divider />
        <Label>The pattern</Label>
        <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1.5), lineHeight: 22 }}>
          {task.pattern}
        </Txt>
      </Card>

      <Card tone="accent">
        <Label color={t.c.accent}>Most likely in November 2026</Label>
        <View style={{ marginTop: t.space(2), gap: t.space(2.5) }}>
          {task.likely.map((l) => (
            <View key={l.title}>
              <Txt variant="heading">{l.title}</Txt>
              <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21, marginTop: 2 }}>
                {l.why}
              </Txt>
            </View>
          ))}
        </View>
      </Card>

      {task.questionTypes?.length ? (
        <Card>
          <Label color={t.c.accent}>Question types</Label>
          <View style={{ marginTop: t.space(2), gap: t.space(2.5) }}>
            {task.questionTypes.map((q) => (
              <View key={q.label}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.space(2), alignItems: 'baseline' }}>
                  <Txt variant="heading">{q.label}</Txt>
                  {q.share ? (
                    <Txt variant="label" color={t.c.accent}>
                      {q.share}
                    </Txt>
                  ) : null}
                </View>
                {q.example ? (
                  <Txt variant="body" style={{ fontSize: 15, lineHeight: 21, fontStyle: 'italic', marginTop: 2 }}>
                    {q.example}
                  </Txt>
                ) : null}
                <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21, marginTop: 2 }}>
                  {q.note}
                </Txt>
              </View>
            ))}
          </View>
        </Card>
      ) : null}

      {task.words ? <WordListsView words={task.words} /> : null}

      <Card>
        <Label color={t.c.accent}>Tips for the highest score</Label>
        <View style={{ marginTop: t.space(2), gap: t.space(2.5) }}>
          {task.tips.map((tip) => (
            <View key={tip.title}>
              <Txt variant="heading">{tip.title}</Txt>
              <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21, marginTop: 2 }}>
                {tip.text}
              </Txt>
            </View>
          ))}
        </View>
      </Card>

      {task.cheatSheet?.length ? (
        <View style={{ gap: t.space(3) }}>
          <Txt variant="title">Cheat sheet</Txt>
          {task.cheatSheet.map((g) => (
            <PhraseCard key={g.title} group={g} />
          ))}
        </View>
      ) : null}

      {task.links?.length ? (
        <View style={{ gap: t.space(2) }}>
          {task.links.map((l) => (
            <Pressable key={l.path} onPress={() => router.push(l.path as never)} accessibilityRole="link">
              <Card tone="sunken">
                <Txt variant="body" color={t.c.accent} style={{ fontWeight: '600' }}>
                  {l.label} ›
                </Txt>
              </Card>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function PhraseCard({ group }: { group: PhraseGroup }) {
  const t = useTheme();
  return (
    <Card>
      <Label color={t.c.accent}>{group.title}</Label>
      {group.note ? (
        <Txt variant="label" color={t.c.textFaint} style={{ marginTop: t.space(1) }}>
          {group.note}
        </Txt>
      ) : null}
      <View style={{ marginTop: t.space(2), gap: t.space(2) }}>
        {group.items.map((p) => (
          <View key={p.da}>
            <Txt variant="body" style={{ fontSize: 15, lineHeight: 21, fontWeight: '600' }}>
              {p.da}
            </Txt>
            <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 14, lineHeight: 20 }}>
              {p.en}
            </Txt>
          </View>
        ))}
      </View>
    </Card>
  );
}

function WordBanks() {
  const t = useTheme();
  return (
    <View style={{ gap: t.space(3) }}>
      <View>
        <Txt variant="title">Topic words for all tasks</Txt>
        <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1), fontSize: 15, lineHeight: 21 }}>
          The themes that keep coming back in writing and speaking, with en/et so you can use them correctly.
        </Txt>
      </View>
      {WORD_BANKS.map((g) => (
        <PhraseCard key={g.title} group={g} />
      ))}
    </View>
  );
}

/** The two word lists of a task: what is most likely, then a bigger list to revise from. */
function WordListsView({ words }: { words: WordLists }) {
  const t = useTheme();
  return (
    <View style={{ gap: t.space(3) }}>
      <Txt variant="title">Word lists</Txt>

      <View style={{ gap: t.space(2) }}>
        <Txt variant="heading">1 · Most likely in November 2026</Txt>
        <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21 }}>
          {words.likely.intro}
        </Txt>
        {words.likely.groups.map((g) => (
          <TermCard key={g.title} group={g} tone="accent" />
        ))}
      </View>

      <View style={{ gap: t.space(2), marginTop: t.space(2) }}>
        <Txt variant="heading">2 · Revision list</Txt>
        <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21 }}>
          {words.revise.intro}
        </Txt>
        {words.revise.groups.map((g) => (
          <TermCard key={g.title} group={g} collapsible />
        ))}
      </View>
    </View>
  );
}

function TermCard({ group, tone, collapsible }: { group: TermGroup; tone?: 'accent'; collapsible?: boolean }) {
  const t = useTheme();
  const [open, setOpen] = useState(!collapsible);
  const header = (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: t.space(2) }}>
      <Label color={t.c.accent}>{group.title}</Label>
      {collapsible ? (
        <Txt variant="label" color={t.c.textFaint}>
          {open ? 'Hide' : `${group.items.length} words ›`}
        </Txt>
      ) : null}
    </View>
  );
  return (
    <Card tone={tone}>
      {collapsible ? (
        <Pressable onPress={() => setOpen((o) => !o)} accessibilityRole="button" accessibilityState={{ expanded: open }}>
          {header}
        </Pressable>
      ) : (
        header
      )}
      {open ? (
        <>
          {group.note ? (
            <Txt variant="label" color={t.c.textMuted} style={{ marginTop: t.space(1) }}>
              {group.note}
            </Txt>
          ) : null}
          <View style={{ marginTop: t.space(2), gap: t.space(2) }}>
            {group.items.map((w) => (
              <View key={w.da}>
                <Txt variant="body" style={{ fontSize: 15, lineHeight: 21, fontWeight: '600' }}>
                  {w.da}
                </Txt>
                <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 14, lineHeight: 20 }}>
                  {w.en}
                </Txt>
                {w.note ? (
                  <Txt variant="label" color={t.c.textFaint} style={{ marginTop: 1 }}>
                    {w.note}
                  </Txt>
                ) : null}
              </View>
            ))}
          </View>
        </>
      ) : null}
    </Card>
  );
}
