import React, { useMemo, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import type { VocabEntry } from '../../content/vocabulary';
import { checkCloze, clozeChoices, type Cloze } from '../../vocab/cloze';
import { AnswerInput, DanishKeys, insertAt, type Selection } from '../AnswerInput';
import { ModeSwitch } from '../ModeSwitch';
import { Button, Card, Label, Txt } from '../primitives';
import { useTheme } from '../theme';
import { useAnswerMode, useWide } from '../useWide';

type Result = 'right' | 'close' | 'wrong';

/**
 * A vocab card as a gap-fill: one of the word's sentences with the word taken
 * out, answered by tapping one of its forms or by typing it — the same
 * tap-or-type preference (and switch) as the grammar exercises.
 *
 * Only an exact answer counts as known. A one-letter slip is shown as
 * "Almost" rather than "Not quite", since the word was clearly recalled, but
 * it is still reported as not known: the spelling is part of knowing it.
 *
 * Mount with a `key` per card (e.g. card.id) so each card starts blank.
 */
export function GapFill({
  card,
  cloze,
  pool,
  onDone,
}: {
  card: VocabEntry;
  cloze: Cloze;
  /** Words the tap choices draw distractors from (the deck, or the set). */
  pool: readonly VocabEntry[];
  onDone: (knewIt: boolean) => void;
}) {
  const t = useTheme();
  const { wide, onLayout } = useWide();
  const { mode, switchMode } = useAnswerMode(wide);
  const tap = mode === 'tap';

  const [typed, setTyped] = useState('');
  const [sel, setSel] = useState<Selection | undefined>(undefined);
  const [given, setGiven] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const input = useRef<TextInput>(null);

  // Shuffled once per card, so the options don't jump around on re-render.
  const choices = useMemo(
    () => clozeChoices(cloze.answer, card, pool),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [card.id, cloze.answer],
  );

  const revealed = result !== null;

  const submit = (answer: string, fromTap: boolean) => {
    if (revealed || !answer.trim()) return;
    const r = checkCloze(answer, cloze.answer);
    // A tapped option is either the one or another word: no typo to forgive.
    setResult(fromTap && r === 'close' ? 'wrong' : r);
    setGiven(answer.trim());
  };

  const insert = (ch: string) => {
    const next = insertAt(typed, sel, ch);
    setTyped(next.value);
    setSel(next.sel);
    input.current?.focus();
    requestAnimationFrame(() => input.current?.setSelection?.(next.sel.start, next.sel.end));
  };

  const gap = !revealed ? (
    <Txt variant="title" color={t.c.accent} style={{ textDecorationLine: 'underline' }}>
      {(!tap && typed.trim()) || '_____'}
    </Txt>
  ) : (
    <Txt variant="title" color={result === 'right' ? t.c.success : t.c.text} style={{ fontWeight: '700' }}>
      {cloze.answer}
    </Txt>
  );

  const tone = result === 'right' ? 'success' : 'warning';
  const toneColor = result === 'right' ? t.c.success : t.c.warning;
  const verdict = result === 'right' ? 'Correct' : result === 'close' ? 'Almost — check the spelling' : 'Not quite';

  // Verdict, the finished sentence and the meaning, then Next. Beside the
  // question on a wide screen, as in the grammar exercises.
  const feedback = revealed ? (
    <View style={{ gap: t.space(3) }}>
      <Card tone={tone}>
        <Label color={toneColor}>{verdict}</Label>
        {result !== 'right' && given ? (
          <Txt variant="body" style={{ marginTop: t.space(2), lineHeight: 22 }}>
            <Txt variant="label" color={t.c.textMuted}>
              {'You wrote:  '}
            </Txt>
            <Txt variant="body" color={t.c.textFaint} style={{ textDecorationLine: 'line-through' }}>
              {given}
            </Txt>
          </Txt>
        ) : null}
        <Txt variant="body" style={{ marginTop: t.space(2), lineHeight: 22 }}>
          {cloze.before}
          <Txt variant="body" style={{ lineHeight: 22, fontWeight: '700' }}>
            {cloze.answer}
          </Txt>
          {cloze.after}
        </Txt>
        <Txt variant="body" style={{ marginTop: t.space(2), lineHeight: 22 }}>
          <Txt variant="body" style={{ fontWeight: '700' }}>
            {card.word}
          </Txt>
          {card.glossEn ? <Txt variant="body" color={t.c.textMuted}>{`  —  ${card.glossEn}`}</Txt> : null}
        </Txt>
        {card.forms ? (
          <Txt variant="body" color={t.c.textFaint} style={{ marginTop: t.space(1), fontSize: 13 }}>
            {card.forms}
          </Txt>
        ) : null}
      </Card>
      <Button label="Next" onPress={() => onDone(result === 'right')} />
    </View>
  ) : null;

  const question = (
    <>
      <Card tone="sunken">
        <Label>Fill the gap</Label>
        <Txt variant="title" style={{ marginTop: t.space(2) }}>
          {cloze.before}
          {gap}
          {cloze.after}
        </Txt>
        {cloze.en ? (
          <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(2), lineHeight: 22 }}>
            {cloze.en}
          </Txt>
        ) : null}
        {card.glossEn ? (
          <Txt variant="body" color={t.c.textFaint} style={{ marginTop: t.space(1), fontSize: 13 }}>
            {card.glossEn}
          </Txt>
        ) : null}
      </Card>

      {tap ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.space(2.5) }}>
          {choices.map((opt) => {
            const isCorrect = checkCloze(opt, cloze.answer) === 'right';
            const isPicked = revealed && given === opt;
            const bg = !revealed ? t.c.surface : isCorrect ? t.c.successSoft : isPicked ? t.c.accentSoft : t.c.surface;
            const border = !revealed ? t.c.border : isCorrect ? t.c.success : isPicked ? t.c.accent : t.c.border;
            return (
              <Pressable
                key={opt}
                onPress={() => submit(opt, true)}
                disabled={revealed}
                accessibilityRole="button"
                style={{ flexGrow: 1, flexBasis: 140, maxWidth: '100%' }}
              >
                <View
                  style={{
                    backgroundColor: bg,
                    borderWidth: 1.5,
                    borderColor: border,
                    borderRadius: t.radius.md,
                    paddingVertical: t.space(3.5),
                    paddingHorizontal: t.space(4),
                  }}
                >
                  <Txt
                    variant="heading"
                    color={revealed && isCorrect ? t.c.success : t.c.text}
                    style={{ fontSize: 17, lineHeight: 24 }}
                  >
                    {opt}
                  </Txt>
                </View>
              </Pressable>
            );
          })}
        </View>
      ) : (
        <View style={{ gap: t.space(2.5) }}>
          <AnswerInput
            ref={input}
            value={typed}
            onChangeText={setTyped}
            onSelectionChange={(e) => setSel(e.nativeEvent.selection)}
            onSubmitEditing={() => submit(typed, false)}
            submitBehavior="submit"
            returnKeyType="done"
            locked={revealed}
            tone={revealed ? (result === 'right' ? 'success' : 'warning') : undefined}
            placeholder="Type the missing word"
            accessibilityLabel="The missing word"
            autoFocus
          />
          {!revealed ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: t.space(2.5) }}>
              <DanishKeys onInsert={insert} />
              <Button label="Check" onPress={() => submit(typed, false)} disabled={!typed.trim()} />
            </View>
          ) : null}
        </View>
      )}

      {!revealed ? <ModeSwitch mode={mode} onSwitch={switchMode} /> : null}
    </>
  );

  return (
    <View onLayout={onLayout} style={{ gap: t.space(4) }}>
      {wide ? (
        <View style={{ flexDirection: 'row', gap: t.space(5), alignItems: 'flex-start' }}>
          <View style={{ flex: 1, gap: t.space(4) }}>{question}</View>
          <View style={{ flex: 1 }}>{feedback}</View>
        </View>
      ) : (
        <>
          {question}
          {feedback}
        </>
      )}
    </View>
  );
}
