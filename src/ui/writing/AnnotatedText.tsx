import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, Text, View, type LayoutChangeEvent } from 'react-native';
import type { Annotation } from '../../content/writing/types';
import { RULES } from '../../grammar/rules';
import { foundQuotes, segmentText } from '../../writing/annotate';
import { Label, Txt, s, withFont } from '../primitives';
import { useTheme } from '../theme';

type Kind = Annotation['kind'];

export function useKindColors() {
  const t = useTheme();
  return (k: Kind) =>
    k === 'good'
      ? { fg: t.c.success, bg: t.c.successSoft, label: 'Good' }
      : k === 'error'
        ? { fg: t.c.accent, bg: t.c.accentSoft, label: 'Error' }
        : { fg: t.c.warning, bg: t.c.warningSoft, label: 'Style' };
}

const ruleName = (id: string) => (RULES as Record<string, { da: string } | undefined>)[id]?.da ?? id;

/**
 * An answer with its annotations highlighted inline (first occurrence of each
 * quote), coloured by kind. Selection is controlled by the parent, so the
 * notes can live beside the text (desktop) or under it (phone).
 */
export function AnnotatedText({
  text,
  annotations,
  selected,
  onSelect,
}: {
  text: string;
  annotations: Annotation[];
  selected: number | null;
  onSelect: (i: number | null) => void;
}) {
  const t = useTheme();
  const colors = useKindColors();
  const quotes = useMemo(() => annotations.map((a) => a.quote), [annotations]);
  const segs = useMemo(() => segmentText(text, quotes), [text, quotes]);

  return (
    <View style={{ backgroundColor: t.c.surfaceSunken, borderRadius: t.radius.md, padding: t.space(3.5) }}>
      <Text style={withFont([t.font.body, { color: t.c.text, lineHeight: 26 }])}>
        {segs.map((sg, i) => {
          if (sg.mark === undefined) return sg.text;
          const a = annotations[sg.mark];
          const c = colors(a.kind);
          const on = selected === sg.mark;
          return (
            <Text
              key={i}
              onPress={() => onSelect(on ? null : sg.mark!)}
              accessibilityRole="button"
              accessibilityLabel={`${c.label}: ${a.note}`}
              style={{
                backgroundColor: on ? c.fg + '40' : c.bg,
                textDecorationLine: 'underline',
                textDecorationColor: c.fg,
                color: t.c.text,
              }}
            >
              {sg.text}
            </Text>
          );
        })}
      </Text>
    </View>
  );
}

/** Every note in full; the selected one is highlighted. Tapping a note selects it (and its highlight). */
export function NoteList({
  text,
  annotations,
  selected,
  onSelect,
  onItemLayout,
}: {
  text: string;
  annotations: Annotation[];
  selected: number | null;
  onSelect: (i: number | null) => void;
  /** Reports each note's position, so a scrolling parent can bring the selected one into view. */
  onItemLayout?: (i: number, e: LayoutChangeEvent) => void;
}) {
  const t = useTheme();
  const router = useRouter();
  const colors = useKindColors();
  const found = useMemo(() => foundQuotes(text, annotations.map((a) => a.quote)), [text, annotations]);
  if (!annotations.length) return null;

  return (
    <View style={{ gap: t.space(2) }}>
      <Label>Notes · tap a highlight or a note</Label>
      {annotations.map((a, i) => {
        const c = colors(a.kind);
        const on = selected === i;
        return (
          <Pressable
            key={i}
            onLayout={onItemLayout ? (e) => onItemLayout(i, e) : undefined}
            onPress={() => onSelect(on ? null : i)}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            style={({ pressed }) => ({
              borderLeftWidth: on ? 4 : 3,
              borderLeftColor: c.fg,
              backgroundColor: on ? c.bg : pressed ? t.c.surfaceSunken : 'transparent',
              borderRadius: t.radius.sm,
              paddingVertical: t.space(2),
              paddingHorizontal: t.space(3),
            })}
          >
            <View style={[s.row, { gap: t.space(2), flexWrap: 'wrap' }]}>
              <Txt variant="label" color={c.fg} style={{ fontWeight: '700' }}>
                {c.label}
              </Txt>
              <Txt
                variant="body"
                color={a.kind === 'error' ? c.fg : t.c.text}
                style={{
                  fontSize: 15,
                  lineHeight: 21,
                  flexShrink: 1,
                  textDecorationLine: a.kind === 'error' && a.fix ? 'line-through' : 'none',
                }}
              >
                {a.quote}
              </Txt>
              {a.fix ? (
                <>
                  <Txt variant="body" color={t.c.textFaint} style={{ fontSize: 15 }}>
                    →
                  </Txt>
                  <Txt variant="heading" color={t.c.success} style={{ fontSize: 15, flexShrink: 1 }}>
                    {a.fix}
                  </Txt>
                </>
              ) : null}
            </View>
            <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 15, lineHeight: 21, marginTop: t.space(1) }}>
              {a.note}
              {found.has(i) ? '' : ' (quote not found in the text)'}
            </Txt>
            {a.ruleId ? (
              <Pressable
                onPress={() => router.push({ pathname: '/rule/[id]', params: { id: a.ruleId! } } as never)}
                accessibilityRole="link"
                style={{ marginTop: t.space(1) }}
              >
                <Txt variant="label" color={t.c.accent}>
                  Rule: {ruleName(a.ruleId)} ›
                </Txt>
              </Pressable>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
