import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import type { Explained } from '../../content/exams/types';
import type { ReviewItem, WrongOption } from '../../exam/review';
import { Label, Txt } from '../primitives';
import { useTheme } from '../theme';

/** Which language(s) the explanations show in. */
export type ExplainLang = 'both' | 'da' | 'en';

/** Under a reviewed item: why the right answer is right, and why the other options are not. */
export function Explanation({ item, lang }: { item: ReviewItem; lang: ExplainLang }) {
  const t = useTheme();
  const [showAll, setShowAll] = useState(false);
  const wrong = item.whyNot ?? [];
  const picked = wrong.find((w) => w.picked);
  const others = wrong.filter((w) => !w.picked);
  if (!item.why && !wrong.length) return null;

  return (
    <View
      style={{
        marginTop: t.space(2),
        padding: t.space(3),
        borderRadius: t.radius.sm,
        backgroundColor: t.c.surfaceSunken,
        gap: t.space(2.5),
      }}
    >
      {picked ? (
        <Section
          title={
            picked.belongsIn
              ? `Du valgte ${picked.letter} · it belongs in gap ${picked.belongsIn}`
              : `Du valgte ${picked.letter}${picked.text && picked.text.length < 60 ? ` (“${picked.text}”)` : ''} · why not`
          }
          tone={t.c.warning}
          e={picked}
          lang={lang}
        />
      ) : null}
      {item.why ? (
        <View style={{ gap: t.space(1.5) }}>
          <Label color={t.c.success}>
            {item.task < 0 ? 'Hvor står svaret? · where the answer is' : `Hvorfor ${item.key.split(' / ')[0]} er rigtigt · why it’s right`}
          </Label>
          {item.why.quote ? (
            <View style={{ borderLeftWidth: 3, borderLeftColor: t.c.accent, paddingLeft: t.space(2.5) }}>
              <Txt variant="body" style={{ fontSize: 15, lineHeight: 22, fontStyle: 'italic' }}>
                {`“${item.why.quote}”`}
              </Txt>
            </View>
          ) : null}
          <Bilingual e={item.why} lang={lang} />
        </View>
      ) : null}
      {others.length ? (
        <View style={{ gap: t.space(2.5) }}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: showAll }}
            onPress={() => setShowAll((v) => !v)}
            style={{ alignSelf: 'flex-start' }}
          >
            <Txt variant="label" color={t.c.accent}>
              {`${showAll ? '▾' : '▸'} ${picked ? 'De andre forkerte svar' : 'De forkerte svar'} · the other options (${others.length})`}
            </Txt>
          </Pressable>
          {showAll ? others.map((w) => <Section key={w.letter} title={optionTitle(w)} tone={t.c.textMuted} e={w} lang={lang} />) : null}
        </View>
      ) : null}
    </View>
  );
}

const optionTitle = (w: WrongOption) => `${w.letter}${w.text && w.text.length < 60 ? ` · “${w.text}”` : ''}`;

function Section({ title, tone, e, lang }: { title: string; tone: string; e: Explained; lang: ExplainLang }) {
  const t = useTheme();
  return (
    <View style={{ gap: t.space(1) }}>
      <Label color={tone}>{title}</Label>
      <Bilingual e={e} lang={lang} />
    </View>
  );
}

function Bilingual({ e, lang }: { e: Explained; lang: ExplainLang }) {
  const t = useTheme();
  return (
    <View style={{ gap: t.space(1) }}>
      {lang !== 'en' ? (
        <Txt variant="body" style={{ fontSize: 15, lineHeight: 22 }}>
          {e.da}
        </Txt>
      ) : null}
      {lang !== 'da' ? (
        <Txt variant="body" color={lang === 'both' ? t.c.textMuted : t.c.text} style={{ fontSize: lang === 'both' ? 14 : 15, lineHeight: 21 }}>
          {e.en}
        </Txt>
      ) : null}
    </View>
  );
}
