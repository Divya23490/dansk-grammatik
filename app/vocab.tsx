import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../src/ui/Screen';
import { splitAtForm, type VocabExample } from '../src/content/examples';
import { MAX_LEVEL, type Level } from '../src/content/levels';
import { VOCABULARY, type VocabCategory } from '../src/content/vocabulary';
import { currentLevelNow, useCurrentLevel } from '../src/profile/levelStore';
import { useVocabSession, type CardMode, type SessionLength } from '../src/profile/vocabSession';
import { LevelBadge, LevelUpNotice } from '../src/ui/LevelBadge';
import {
  SESSION_CATEGORIES,
  countByCategory,
  nextFromPool,
  nextWord,
  summarizeVocab,
  useVocabProfile,
} from '../src/profile/vocabStore';
import { Segmented } from '../src/ui/Segmented';
import { FlipCard } from '../src/ui/FlipCard';
import { DailyGoal } from '../src/ui/vocab/DailyGoal';
import { GapFill } from '../src/ui/vocab/GapFill';
import type { Grade } from '../src/ui/vocab/grade';
import { SpeakButton } from '../src/ui/vocab/SpeakButton';
import { SwipeToGrade } from '../src/ui/vocab/SwipeToGrade';
import { useCardKeys } from '../src/ui/vocab/useCardKeys';
import { clozeFor } from '../src/vocab/cloze';
import { Button, Card, Label, StrengthBar, Txt, s } from '../src/ui/primitives';
import { useTheme } from '../src/ui/theme';
import { cardsFor, type SetCard } from '../src/vocabSets/cards';
import { splitAtPhrase } from '../src/vocabSets/match';
import { itemsInSet, liveSets, useVocabSets } from '../src/vocabSets/store';

const CATEGORY_LABEL: Record<VocabCategory, string> = {
  connector: 'Connector',
  noun: 'Noun',
  verb: 'Verb',
  adjective: 'Adjective',
  phrase: 'Phrase',
};

const CATEGORY_PLURAL: Record<VocabCategory, string> = {
  connector: 'Connectors',
  noun: 'Nouns',
  verb: 'Verbs',
  adjective: 'Adjectives',
  phrase: 'Phrases',
};

const MODE_OPTIONS: { key: CardMode; label: string }[] = [
  { key: 'da-en', label: 'Danish → English' },
  { key: 'en-da', label: 'English → Danish' },
  { key: 'gap', label: 'Gap-fill' },
];

const LENGTH_OPTIONS: { key: string; label: string }[] = [
  { key: '10', label: '10' },
  { key: '20', label: '20' },
  { key: '30', label: '30' },
  { key: 'endless', label: 'Endless' },
];

/** Usage sentences shown on the back of a card; more than this is a wall of text. */
const MAX_EXAMPLES = 4;

interface Session {
  categories: VocabCategory[];
  /** A round of a small set can be shorter than any of the length options. */
  length: SessionLength | number;
  allLevels: boolean;
  /** A round of the learner's own sets instead of the deck: these sets' cards, no niveau. */
  setIds?: string[];
  /** A redo round: exactly these cards (the ones missed last round), weakest first. */
  pool?: SetCard[];
  /** Every word shown this round, the current card included — none repeats until these run out. */
  served: Set<string>;
  results: { word: SetCard; grade: Grade }[];
}

/** The cards a round draws from, when it has a fixed list: a redo, or the learner's sets. */
function fixedPool(session: Session): SetCard[] | null {
  if (session.pool) return session.pool;
  if (session.setIds) return setPool(session.setIds);
  return null;
}

/** Words missed this round ("again" or "hard"), each once. */
function missedIn(session: Session): SetCard[] {
  // A word can come round twice once the deck runs dry; list it once.
  return [...new Map(session.results.filter((r) => r.grade !== 'good').map((r) => [r.word.id, r.word])).values()];
}

/** The cards in these of the learner's sets, read fresh from the store. */
function setPool(setIds: string[]): SetCard[] {
  const { items } = useVocabSets.getState();
  return cardsFor(setIds.flatMap((id) => itemsInSet(items, id)));
}

/**
 * Vocabulary flashcards — the hard exam words, plus every word the grammar
 * trainers use, served up to the learner's niveau.
 *
 * Flip-and-self-grade rather than typed recall: at PD3 level the skill being
 * built is recognising and deploying a word inside a spoken argument, not
 * spelling it under pressure. Practice comes in rounds of a chosen size and
 * word type, so a sitting has an end and a list of what to look at again.
 * Wherever a card has them, its back shows the word at work — the exam words'
 * own example, and a sentence for each form a bank word inflects into —
 * because a connector or an abstract noun memorised in isolation evaporates
 * the moment the exam actually needs it in context.
 */
export default function Vocab() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const stats = useVocabProfile((s2) => s2.stats);
  const record = useVocabProfile((s2) => s2.record);

  const level = useCurrentLevel('vocab');
  const [session, setSession] = useState<Session | null>(null);
  const [finished, setFinished] = useState(false);
  const [word, setWord] = useState<SetCard | null>(null);
  const [flipped, setFlipped] = useState(false);

  const summary = useMemo(() => summarizeVocab(stats, Date.now(), level), [stats, level]);

  const start = useCallback((categories: VocabCategory[], length: SessionLength, allLevels: boolean) => {
    const first = nextWord(useVocabProfile.getState().stats, undefined, Date.now(), currentLevelNow('vocab'), {
      categories,
      allLevels,
    });
    setSession({ categories, length, allLevels, served: new Set([first.id]), results: [] });
    setWord(first);
    setFlipped(false);
    setFinished(false);
  }, []);

  const startSets = useCallback((setIds: string[], length: SessionLength) => {
    const pool = setPool(setIds);
    const first = nextFromPool(useVocabProfile.getState().stats, pool);
    if (!first) return;
    // A round is never longer than the sets it draws from.
    const fitted = length === 'endless' ? length : Math.min(length, pool.length);
    setSession({ categories: [], length: fitted, allLevels: true, setIds, served: new Set([first.id]), results: [] });
    setWord(first);
    setFlipped(false);
    setFinished(false);
  }, []);

  const startRedo = useCallback((prev: Session) => {
    const pool = missedIn(prev);
    const first = nextFromPool(useVocabProfile.getState().stats, pool);
    if (!first) return;
    setSession({
      categories: prev.categories,
      length: pool.length,
      allLevels: prev.allLevels,
      setIds: prev.setIds,
      pool,
      served: new Set([first.id]),
      results: [],
    });
    setWord(first);
    setFlipped(false);
    setFinished(false);
  }, []);

  // Arriving from a set's own screen ("Practise this set"): start a round of it straight away.
  const { sets: setsParam } = useLocalSearchParams<{ sets?: string }>();
  const hydratedSets = useVocabSets((st) => st.hydrated);
  const startedFromParam = useRef(false);
  useEffect(() => {
    if (!setsParam || !hydratedSets || startedFromParam.current) return;
    startedFromParam.current = true;
    startSets(setsParam.split(','), useVocabSession.getState().length);
  }, [setsParam, hydratedSets, startSets]);

  const backToSetup = useCallback(() => {
    setSession(null);
    setWord(null);
    setFinished(false);
  }, []);

  const endSession = useCallback(() => {
    if (session?.results.length) setFinished(true);
    else backToSetup();
  }, [session, backToSetup]);

  const grade = useCallback(
    (g: Grade) => {
      if (!session || !word) return;
      // The progress log is known / not known; "hard" was a struggle, so it
      // counts as not known and the word comes back sooner.
      record(word.id, g === 'good', { ownSet: !!session.setIds });
      const results = [...session.results, { word, grade: g }];
      if (session.length !== 'endless' && results.length >= session.length) {
        setSession({ ...session, results });
        setFinished(true);
        return;
      }
      // A fixed round never repeats a card; Endless lets weak words come back, as before.
      const exclude = session.length === 'endless' ? undefined : session.served;
      const stats = useVocabProfile.getState().stats;
      const fixed = fixedPool(session);
      const nxt = fixed
        ? (nextFromPool(stats, fixed, word.id, Date.now(), exclude) ?? word)
        : nextWord(stats, word.id, Date.now(), currentLevelNow('vocab'), {
            categories: session.categories,
            allLevels: session.allLevels,
            exclude,
          });
      setSession({ ...session, results, served: new Set(session.served).add(nxt.id) });
      setWord(nxt);
      setFlipped(false);
    },
    [record, session, word],
  );

  const mode = useVocabSession((st) => st.mode);
  const dailyGoal = useVocabSession((st) => st.dailyGoal);
  const setDailyGoal = useVocabSession((st) => st.setDailyGoal);

  // Distractors for gap-fill taps: the round's own cards, or the whole deck.
  // Once per round, so the options don't reshuffle under the learner.
  const gapPool = useMemo(
    () => (session ? (fixedPool(session) ?? VOCABULARY) : VOCABULARY),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session?.setIds, session?.pool],
  );
  // The sentence rotates with each sighting, so a word seen again can show another.
  const cloze = useMemo(
    () => (word && mode === 'gap' ? clozeFor(word, stats[word.id]?.attempts ?? 0) : null),
    // Not on `stats`: grading this card would swap its sentence mid-answer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [word, mode, session?.results.length],
  );
  // English first needs an English meaning to show; an own card may lack one.
  const reverse = mode === 'en-da' && !!word?.glossEn;

  useCardKeys({
    enabled: !!word && !!session && !finished && !cloze,
    flipped,
    onFlip: () => setFlipped((f) => !f),
    onGrade: grade,
  });

  const cardKey = session && word ? `${session.results.length}:${word.id}` : 'none';

  return (
    <Screen
      contentContainerStyle={{
        padding: t.space(4),
        paddingBottom: insets.bottom + t.space(8),
        gap: t.space(4),
      }}
    >
      <View>
        <Txt variant="display" style={{ fontSize: 26 }}>
          Vocabulary
        </Txt>
        <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1) }}>
          {summary.mastered} of {summary.total} words are solid — the rest either stick or are due for another look.
        </Txt>
      </View>

      <View style={{ gap: t.space(1.5) }}>
        <StrengthBar value={summary.total ? summary.mastered / summary.total : 0} color={t.c.success} />
      </View>

      <DailyGoal goal={dailyGoal} onChangeGoal={setDailyGoal} />

      <LevelUpNotice domain="vocab" />

      {!session ? (
        <SessionSetup level={level} onStart={start} onStartSets={startSets} />
      ) : finished ? (
        <SessionSummary
          session={session}
          onAgain={() =>
            session.setIds
              ? startSets(session.setIds, useVocabSession.getState().length)
              : start(
                  session.categories,
                  // A redo's length is however many were missed; a new round goes back to the chosen one.
                  session.pool ? useVocabSession.getState().length : (session.length as SessionLength),
                  session.allLevels,
                )
          }
          onRedo={() => startRedo(session)}
          onChange={backToSetup}
        />
      ) : word ? (
        <>
          {/* ── Round progress ─────────────────────────────────────────── */}
          <View style={{ gap: t.space(1.5) }}>
            <View style={s.rowBetween}>
              <Txt variant="label" color={t.c.textMuted}>
                {session.length === 'endless'
                  ? `Card ${session.results.length + 1}`
                  : `${session.results.length + 1} / ${session.length}`}
              </Txt>
              <Button
                label="End session"
                tone="ghost"
                onPress={endSession}
                style={{ paddingVertical: t.space(1.5), paddingHorizontal: t.space(3) }}
              />
            </View>
            {session.length !== 'endless' ? (
              <StrengthBar value={session.results.length / session.length} color={t.c.accent} />
            ) : null}
          </View>

          {/* ── The card ─────────────────────────────────────────────────── */}
          {cloze ? (
            <GapFill key={cardKey} card={word} cloze={cloze} pool={gapPool} onDone={(k) => grade(k ? 'good' : 'again')} />
          ) : (
            <>
              <SwipeToGrade key={cardKey} enabled={flipped} onGrade={grade}>
                <FlipCard
                  flipped={flipped}
                  onPress={() => setFlipped((f) => !f)}
                  accessibilityLabel={
                    flipped ? 'Turn the card back' : `${reverse ? word.glossEn : word.word}. Flip the card`
                  }
                  // English first: the front must not read the answer out.
                  frontCorner={reverse ? undefined : <SpeakButton text={word.word} />}
                  backCorner={<SpeakButton text={word.word} />}
                  front={
                    <Card style={{ flexGrow: 1, minHeight: 220, justifyContent: 'center' }}>
                      <View style={{ alignItems: 'center', gap: t.space(2) }}>
                        <View style={[s.row, { gap: t.space(2) }]}>
                          <Label color={t.c.textFaint}>
                            {reverse ? 'IN DANISH?' : word.own ? 'My word' : CATEGORY_LABEL[word.category]}
                          </Label>
                          {word.own ? null : <LevelBadge level={word.level} />}
                        </View>
                        {reverse ? (
                          <Txt variant="title" style={{ textAlign: 'center' }}>
                            {word.glossEn}
                          </Txt>
                        ) : (
                          <Txt variant="display" style={{ textAlign: 'center', fontSize: 26 }}>
                            {word.word}
                          </Txt>
                        )}
                        <Txt variant="body" color={t.c.textFaint} style={{ marginTop: t.space(3) }}>
                          Tap to flip the card
                        </Txt>
                      </View>
                    </Card>
                  }
                  back={
                    <Card style={{ flexGrow: 1, minHeight: 220, justifyContent: 'center', gap: t.space(3) }}>
                      {reverse ? (
                        <View>
                          <Label color={t.c.accent}>DANISH</Label>
                          <Txt variant="display" style={{ fontSize: 26, marginTop: t.space(1) }}>
                            {word.word}
                          </Txt>
                        </View>
                      ) : null}
                      <CardBack word={word} />
                    </Card>
                  }
                />
              </SwipeToGrade>

              {/* ── Self-grade ───────────────────────────────────────────── */}
              {flipped ? (
                <View style={{ gap: t.space(2) }}>
                  <View style={[s.row, { gap: t.space(3) }]}>
                    <Button label="Again" tone="ghost" onPress={() => grade('again')} style={{ flex: 1 }} />
                    <Button label="Hard" tone="primary" onPress={() => grade('hard')} style={{ flex: 1 }} />
                    <Button label="Good" tone="success" onPress={() => grade('good')} style={{ flex: 1 }} />
                  </View>
                  <Txt variant="body" color={t.c.textFaint} style={{ textAlign: 'center', fontSize: 13 }}>
                    {Platform.OS === 'web'
                      ? 'Keys: ← or 1 again · ↓ or 2 hard · → or 3 good · space to turn'
                      : 'Or swipe the card: right if you knew it, left if not.'}
                  </Txt>
                </View>
              ) : (
                <Txt variant="body" color={t.c.textFaint} style={{ textAlign: 'center' }}>
                  {reverse
                    ? 'Say the Danish word before you flip the card.'
                    : 'Try to guess the meaning before you flip the card.'}
                  {Platform.OS === 'web' ? ' (Space flips it.)' : ''}
                </Txt>
              )}
            </>
          )}
        </>
      ) : null}

      <Txt variant="label" color={t.c.textFaint} style={{ textAlign: 'center' }}>
        {summary.total} WORDS UP TO NIVEAU {level} · {summary.dueForReview.length} DUE FOR REVIEW
      </Txt>
    </Screen>
  );
}

/**
 * Pick the round: the deck (which word types, which levels) or the learner's
 * own sets, and how many cards. Remembered for next time, except the source.
 */
function SessionSetup({
  level,
  onStart,
  onStartSets,
}: {
  level: Level;
  onStart: (categories: VocabCategory[], length: SessionLength, allLevels: boolean) => void;
  onStartSets: (setIds: string[], length: SessionLength) => void;
}) {
  const t = useTheme();
  const allSets = useVocabSets((st) => st.sets);
  const setItems = useVocabSets((st) => st.items);
  const sets = useMemo(
    () => liveSets(allSets).map((x) => ({ ...x, count: cardsFor(itemsInSet(setItems, x.id)).length })),
    [allSets, setItems],
  );
  const [source, setSource] = useState<'deck' | 'sets'>('deck');
  // Every set to begin with: the usual wish is "my words", not one list of them.
  const [picked, setPicked] = useState<string[]>(() => sets.map((x) => x.id));
  const chosen = picked.filter((id) => sets.some((x) => x.id === id && x.count > 0));
  const categories = useVocabSession((st) => st.categories);
  const length = useVocabSession((st) => st.length);
  const setCategories = useVocabSession((st) => st.setCategories);
  const setLength = useVocabSession((st) => st.setLength);
  const mode = useVocabSession((st) => st.mode);
  const setMode = useVocabSession((st) => st.setMode);
  const allLevels = useVocabSession((st) => st.allLevels);
  const setAllLevels = useVocabSession((st) => st.setAllLevels);

  const counts = useMemo(() => countByCategory(allLevels ? MAX_LEVEL : level), [allLevels, level]);
  const available = categories.reduce((n, c) => n + counts[c], 0);

  const toggle = (c: VocabCategory) =>
    setCategories(categories.includes(c) ? categories.filter((x) => x !== c) : [...categories, c]);

  const lengthPicker = (
    <View style={{ gap: t.space(2) }}>
      <Label color={t.c.textFaint}>CARDS PER ROUND</Label>
      <Segmented
        compact
        options={LENGTH_OPTIONS}
        value={String(length)}
        onChange={(k) => setLength(k === 'endless' ? 'endless' : (Number(k) as SessionLength))}
      />
    </View>
  );

  const modePicker = (
    <View style={{ gap: t.space(2) }}>
      <Label color={t.c.textFaint}>CARDS</Label>
      <Segmented compact options={MODE_OPTIONS} value={mode} onChange={(k) => setMode(k as CardMode)} />
    </View>
  );

  const sourcePicker = sets.length ? (
    <View style={{ gap: t.space(2) }}>
      <Label color={t.c.textFaint}>PRACTISE</Label>
      <Segmented
        compact
        options={[
          { key: 'deck', label: 'Deck' },
          { key: 'sets', label: 'My sets' },
        ]}
        value={source}
        onChange={(k) => setSource(k === 'sets' ? 'sets' : 'deck')}
      />
    </View>
  ) : null;

  if (source === 'sets' && sets.length) {
    return (
      <Card style={{ gap: t.space(4) }}>
        {sourcePicker}
        <View style={{ gap: t.space(2) }}>
          <Label color={t.c.textFaint}>SETS</Label>
          <View style={[s.wrap, { gap: t.space(2) }]}>
            {sets.map((x) => (
              <ToggleChip
                key={x.id}
                label={x.name}
                count={x.count}
                on={chosen.includes(x.id)}
                onPress={() => setPicked(picked.includes(x.id) ? picked.filter((id) => id !== x.id) : [...picked, x.id])}
              />
            ))}
          </View>
        </View>
        {modePicker}
        {lengthPicker}
        <Button label="Start" onPress={() => onStartSets(chosen, length)} disabled={chosen.length === 0} />
      </Card>
    );
  }

  return (
    <Card style={{ gap: t.space(4) }}>
      {sourcePicker}
      <View style={{ gap: t.space(2) }}>
        <Label color={t.c.textFaint}>WORD TYPES</Label>
        <View style={[s.wrap, { gap: t.space(2) }]}>
          {SESSION_CATEGORIES.map((c) => (
            <ToggleChip
              key={c}
              label={CATEGORY_PLURAL[c]}
              count={counts[c]}
              on={categories.includes(c)}
              onPress={() => toggle(c)}
            />
          ))}
        </View>
      </View>
      <View style={{ gap: t.space(2) }}>
        <Label color={t.c.textFaint}>LEVELS</Label>
        <Segmented
          compact
          options={[
            { key: 'mine', label: `Up to niveau ${level}` },
            { key: 'all', label: 'All levels' },
          ]}
          value={allLevels ? 'all' : 'mine'}
          onChange={(k) => setAllLevels(k === 'all')}
        />
      </View>
      {modePicker}
      {lengthPicker}
      <Button label="Start" onPress={() => onStart(categories, length, allLevels)} disabled={available === 0} />
    </Card>
  );
}

/** A multi-select pill — the same on/off look as Segmented, but each toggles on its own. */
function ToggleChip({
  label,
  count,
  on,
  onPress,
}: {
  label: string;
  count: number;
  on: boolean;
  onPress: () => void;
}) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: on }}
      style={({ pressed }) => ({
        borderWidth: 1,
        borderColor: on ? t.c.accent : t.c.border,
        backgroundColor: on ? t.c.accentSoft : t.c.surface,
        borderRadius: 999,
        paddingHorizontal: t.space(3),
        paddingVertical: t.space(1.5),
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Txt variant="chip" color={on ? t.c.accent : t.c.textMuted} style={{ fontSize: 14 }}>
        {label}
        <Txt variant="label" color={t.c.textFaint}>{`  ${count}`}</Txt>
      </Txt>
    </Pressable>
  );
}

/** End of a round: the score, and the words that didn't come to mind. */
function SessionSummary({
  session,
  onAgain,
  onRedo,
  onChange,
}: {
  session: Session;
  onAgain: () => void;
  onRedo: () => void;
  onChange: () => void;
}) {
  const t = useTheme();
  const knew = session.results.filter((r) => r.grade === 'good').length;
  const hard = session.results.filter((r) => r.grade === 'hard').length;
  const missed = missedIn(session);

  return (
    <Card style={{ gap: t.space(4) }}>
      <View>
        <Txt variant="title">
          Knew {knew} of {session.results.length}
        </Txt>
        {hard ? (
          <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1) }}>
            {hard} {hard === 1 ? 'was' : 'were'} hard.
          </Txt>
        ) : null}
        <Txt variant="body" color={t.c.textMuted} style={{ marginTop: t.space(1) }}>
          {missed.length
            ? 'These will come back sooner — have another look now.'
            : 'Every word came to mind this round.'}
        </Txt>
      </View>
      {missed.length ? (
        <View style={{ gap: t.space(2) }}>
          <Label color={t.c.textFaint}>TO LOOK AT AGAIN</Label>
          {missed.map((w) => (
            <View key={w.id}>
              <Txt variant="heading">{w.word}</Txt>
              <Txt variant="body" color={t.c.textMuted} style={{ fontSize: 14 }}>
                {w.glossEn}
              </Txt>
            </View>
          ))}
        </View>
      ) : null}
      {missed.length ? <Button label={`Redo the ${missed.length} missed`} tone="success" onPress={onRedo} /> : null}
      <View style={[s.row, { gap: t.space(3) }]}>
        <Button label="Change setup" tone="ghost" onPress={onChange} style={{ flex: 1 }} />
        <Button label="Another round" onPress={onAgain} style={{ flex: 1 }} />
      </View>
    </Card>
  );
}

function CardBack({ word }: { word: SetCard }) {
  const t = useTheme();
  const examples = word.examples?.slice(0, MAX_EXAMPLES) ?? [];
  return (
    <View style={{ gap: t.space(3) }}>
      <View>
        <Label color={t.c.accent}>{word.own ? 'YOUR MEANING' : 'ENGLISH'}</Label>
        {word.glossEn ? (
          <Txt variant="heading" style={{ marginTop: t.space(1) }}>
            {word.glossEn}
          </Txt>
        ) : (
          <Txt variant="body" color={t.c.textFaint} style={{ marginTop: t.space(1) }}>
            No meaning added yet — you can add one in the set.
          </Txt>
        )}
      </View>
      {word.fromText ? <FromYourText {...word.fromText} /> : null}
      {word.forms ? (
        <View>
          <Label color={t.c.textFaint}>FORMS</Label>
          <Txt variant="heading" style={{ marginTop: t.space(1) }}>
            {word.forms}
          </Txt>
        </View>
      ) : null}
      {word.definitionDa ? (
        <View>
          <Label color={t.c.textFaint}>IN DANISH</Label>
          <Txt variant="body" style={{ marginTop: t.space(1), lineHeight: 22 }}>
            {word.definitionDa}
          </Txt>
        </View>
      ) : null}
      {word.example ? (
        <View
          style={{
            borderLeftWidth: 3,
            borderLeftColor: t.c.border,
            paddingLeft: t.space(3),
          }}
        >
          <Txt variant="body" style={{ lineHeight: 22, fontStyle: 'italic' }}>
            "{word.example}"
          </Txt>
          <Txt variant="body" color={t.c.textFaint} style={{ marginTop: t.space(1), fontSize: 13 }}>
            {word.exampleEn}
          </Txt>
        </View>
      ) : null}
      {examples.length ? (
        <View style={{ gap: t.space(3) }}>
          <Label color={t.c.textFaint}>IN USE</Label>
          {examples.map((ex, i) => (
            <UsageSentence key={i} example={ex} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

/** The sentence a set word was picked out of, with the word in bold and where it came from. */
function FromYourText({ sentence, form, source }: NonNullable<SetCard['fromText']>) {
  const t = useTheme();
  const parts = splitAtPhrase(sentence, form);
  return (
    <View style={{ gap: t.space(1) }}>
      <Label color={t.c.textFaint}>FROM YOUR TEXT</Label>
      <View style={{ borderLeftWidth: 3, borderLeftColor: t.c.accent, paddingLeft: t.space(3) }}>
        <Txt variant="body" style={{ lineHeight: 22 }}>
          {parts ? (
            <>
              {parts.before}
              <Txt variant="body" style={{ lineHeight: 22, fontWeight: '700' }}>
                {parts.match}
              </Txt>
              {parts.after}
            </>
          ) : (
            sentence
          )}
        </Txt>
        {source ? (
          <Txt variant="body" color={t.c.textFaint} style={{ marginTop: t.space(1), fontSize: 13 }}>
            {source.label}
          </Txt>
        ) : null}
      </View>
    </View>
  );
}

/** One usage sentence, with the form it demonstrates set in bold. */
function UsageSentence({ example }: { example: VocabExample }) {
  const t = useTheme();
  const parts = splitAtForm(example.da, example.form);
  return (
    <View style={{ borderLeftWidth: 3, borderLeftColor: t.c.border, paddingLeft: t.space(3) }}>
      {example.form ? <Label color={t.c.textFaint}>{example.form}</Label> : null}
      <Txt variant="body" style={{ lineHeight: 22, marginTop: example.form ? t.space(0.5) : 0 }}>
        {parts ? (
          <>
            {parts.before}
            <Txt variant="body" style={{ lineHeight: 22, fontWeight: '700' }}>
              {parts.match}
            </Txt>
            {parts.after}
          </>
        ) : (
          example.da
        )}
      </Txt>
      <Txt variant="body" color={t.c.textFaint} style={{ marginTop: t.space(1), fontSize: 13 }}>
        {example.en}
      </Txt>
    </View>
  );
}
