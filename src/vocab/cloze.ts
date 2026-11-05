/**
 * Gap-fill cards for the vocab trainer: one of the word's own sentences with
 * the word taken out, to be put back by tapping or typing.
 *
 * Recognising a word on a flashcard is the easy half; producing it — in the
 * right form, in a real sentence — is what PD3 writing asks for. So the gap is
 * always the form exactly as the sentence uses it ("accepterede", not
 * "acceptere"), and the distractors lean on the word's other forms, so a tap
 * still means choosing the inflection rather than just spotting the word.
 */

import type { VocabEntry } from '../content/vocabulary';

export interface Cloze {
  before: string;
  /** The form as it appears in the sentence, capitals and all. */
  answer: string;
  after: string;
  /** The sentence's English translation, when there is one. */
  en?: string;
}

/** Words in a `forms` string that are grammar, not the word: "en bil · bilen", "har accepteret". */
const FORM_FILLER = new Set(['en', 'et', 'at', 'har', 'er', 'sig']);

/** Whole-word, case-insensitive; æ ø å (any letter) count as part of a word. */
function find(sentence: string, token: string): { index: number; match: string } | null {
  const t = token.trim();
  if (!t) return null;
  const esc = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
  try {
    const m = new RegExp(`(?<![\\p{L}\\p{N}])${esc}(?![\\p{L}\\p{N}])`, 'iu').exec(sentence);
    return m ? { index: m.index, match: m[0] } : null;
  } catch {
    // An engine without lookbehind or \p{…}: no gap rather than a wrong one.
    return null;
  }
}

function cut(sentence: string, token: string, en?: string): Cloze | null {
  const hit = find(sentence, token);
  if (!hit) return null;
  return {
    before: sentence.slice(0, hit.index),
    answer: hit.match,
    after: sentence.slice(hit.index + hit.match.length),
    ...(en ? { en } : {}),
  };
}

/** Every spelling the word can take: the headword, its form list, the words of its `forms` line. */
function formsOf(card: VocabEntry): string[] {
  const fromLine = (card.forms ?? '')
    .split(/[·,]/)
    .flatMap((part) => part.trim().split(/\s+/))
    .filter((w) => w && !FORM_FILLER.has(w.toLowerCase()));
  return dedupe([card.word, ...(card.formList ?? []), ...fromLine].map((w) => w.trim()).filter(Boolean));
}

/**
 * Every sentence a gap can be cut from, best first: usage sentences whose
 * form is marked, then the sentence a set word was picked out of, then the
 * main example with whichever form of the word it contains (longest first,
 * so a phrase beats one of its words).
 */
function candidates(card: VocabEntry & { fromText?: { sentence: string; form: string } }): Cloze[] {
  const out: Cloze[] = [];
  for (const ex of card.examples ?? []) {
    if (!ex.form) continue;
    const c = cut(ex.da, ex.form, ex.en);
    if (c) out.push(c);
  }
  if (card.fromText) {
    const c = cut(card.fromText.sentence, card.fromText.form);
    if (c) out.push(c);
  }
  if (card.example) {
    const tokens = formsOf(card).sort((a, b) => b.length - a.length);
    for (const tok of tokens) {
      const c = cut(card.example, tok, card.exampleEn);
      if (c) {
        out.push(c);
        break;
      }
    }
  }
  return out;
}

/**
 * A gap-fill for this card, or null when none of its sentences can be found
 * to contain the word (an own card with no sentence, a split phrase like
 * "på den ene side … på den anden side"). `pick` rotates through the usable
 * sentences, so a word seen again need not show the same one.
 */
export function clozeFor(card: VocabEntry, pick = 0): Cloze | null {
  const all = candidates(card);
  if (!all.length) return null;
  const i = ((Math.floor(pick) % all.length) + all.length) % all.length;
  return all[i];
}

function norm(s: string): string {
  return s.trim().replace(/\s+/g, ' ').toLowerCase();
}

/** Levenshtein distance, stopping early once it passes `max`. */
function distance(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      best = Math.min(best, cur[j]);
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

/**
 * Grade a typed answer. Case and spacing are forgiven; æ/ø/å are not. One
 * slip in a word of four letters or more is 'close' — still not known, but
 * worth telling apart from not knowing the word at all. Shorter words have
 * no room for a typo that isn't another word.
 */
export function checkCloze(typed: string, answer: string): 'right' | 'close' | 'wrong' {
  const a = norm(typed);
  const b = norm(answer);
  if (!a) return 'wrong';
  if (a === b) return 'right';
  if (b.replace(/\s/g, '').length >= 4 && distance(a, b, 1) === 1) return 'close';
  return 'wrong';
}

function dedupe(words: string[]): string[] {
  const seen = new Set<string>();
  return words.filter((w) => {
    const k = norm(w);
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function shuffle<T>(xs: T[], rng: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const wordCount = (s: string) => s.trim().split(/\s+/).length;

/**
 * The answer and up to n-1 distractors, shuffled. The word's own other forms
 * come first (so tapping still tests the inflection); then words of the same
 * category from `pool` — in the same slot of their form list when the answer
 * is one of the card's forms (a definite noun against definite nouns), and
 * preferring the answer's word count. A capitalised answer (first in the
 * sentence) gets capitalised distractors, so the capital gives nothing away.
 */
export function clozeChoices(
  answer: string,
  card: VocabEntry,
  pool: readonly VocabEntry[],
  n = 4,
  rng: () => number = Math.random,
): string[] {
  const key = norm(answer);
  const own = formsOf(card).filter((w) => norm(w) !== key && wordCount(w) === wordCount(answer));

  const slot = (card.formList ?? []).findIndex((f) => norm(f) === key);
  const others = shuffle(
    pool.filter((e) => e.id !== card.id && e.category === card.category),
    rng,
  ).map((e) => (slot >= 0 && e.formList?.[slot] ? e.formList[slot] : e.word));
  const sameLength = others.filter((w) => wordCount(w) === wordCount(answer));
  const rest = others.filter((w) => wordCount(w) !== wordCount(answer));

  const capital = answer.charAt(0) !== answer.charAt(0).toLowerCase();
  const style = (w: string) => (capital ? w.charAt(0).toUpperCase() + w.slice(1) : w);

  const distractors = dedupe([answer, ...shuffle(own, rng), ...sameLength, ...rest].map((w, i) => (i ? style(w) : w)))
    .slice(1, Math.max(1, n));
  return shuffle([answer, ...distractors], rng);
}
