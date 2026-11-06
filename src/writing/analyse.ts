/**
 * Cheap, offline structural checks on a PD3 writing answer.
 *
 * Pure (no React). These are hints, not grades: length against the exam's
 * expectations, whether every task bullet got a paragraph, whether the
 * evaluation point got its share of the answer, and — for the D1 e-mail —
 * greeting/closing and a rough check that each underlined question is touched.
 */
import type { WritingTask } from '../feedback/types';
import { TASK_TYPE_GUIDES } from '../content/writing/guides';
import type { BulletKey, PracticeTask, TaskTypeGuide } from '../content/writing/types';

export interface StructureCheck {
  wordCount: number;
  /** English notes on length, coverage of bullets, evaluation share… */
  notes: string[];
}

/** D2: above this, extra length tends to add errors rather than points. */
const D2_FAR_OVER = 300;
/** D1: below this, an e-mail is likely too thin to answer every point. */
const D1_TOO_SHORT = 120;
/** A slot with fewer words than this barely answers its bullet. */
const SLOT_MIN_WORDS = 10;
/** Flag the evaluation share when it falls below this (for a 0.5 bullet). */
const EVAL_SHARE_FLOOR = 0.4;

/** Function words (> 4 letters) that say nothing about an underlined question's topic. */
const STOPWORDS = new Set([
  'hvordan', 'hvorfor', 'hvornår', 'hvilken', 'hvilket', 'hvilke', 'hvorhen',
  'noget', 'nogen', 'nogle', 'kunne', 'skulle', 'ville', 'synes', 'gerne',
  'måske', 'rigtig', 'meget', 'mange', 'eller', 'efter', 'fordi', 'derfor',
  'deres', 'jeres', 'vores', 'andre', 'anden', 'andet', 'bliver', 'blive',
  'kommer', 'komme', 'tænker', 'kender', 'dette', 'denne', 'disse', 'sammen',
  'altid', 'aldrig', 'inden', 'under', 'mellem', 'hvis', 'have', 'havde',
  'været', 'være', 'lidt', 'virkelig', 'egentlig', 'stadig', 'allerede',
  'hinanden', 'nogensinde', 'selv', 'skrive', 'fortælle', 'fortæl', 'måtte',
  'burde', 'gøre', 'gjorde', 'tror', 'mener', 'syntes', 'hvordan',
]);

const GREETING_RE = /^\s*(hej|hejsa|hey|hallo|kære|goddag|godmorgen)(?![\p{L}])/iu;
const CLOSING_RE =
  /(?<![\p{L}])(hilsen|hilsner|knus|vi ses|vi snakkes|hav det godt|kh)(?![\p{L}])/iu;

function words(text: string | undefined): string[] {
  return (text ?? '').trim().match(/\S+/g) ?? [];
}

function countWords(text: string | undefined): number {
  return words(text).length;
}

/** Letter-only lowercase tokens. */
function tokens(text: string): string[] {
  return (text.toLowerCase().match(/\p{L}+/gu) ?? []);
}

/** The 1–2 longest content words of an underlined phrase. */
function keyWords(phrase: string): string[] {
  const uniq = [...new Set(tokens(phrase))].filter((w) => w.length > 4 && !STOPWORDS.has(w));
  return uniq.sort((a, b) => b.length - a.length).slice(0, 2);
}

/** A key word is present when some token shares its first 5 letters (a crude stem). */
function mentions(textTokens: string[], key: string): boolean {
  const stem = key.slice(0, 5);
  return textTokens.some((t) => t === key || (t.length >= 5 && t.startsWith(stem)));
}

/** Slot key → bullet key, from the guide's template; falls back to slot key = bullet key. */
function slotBullets(task: PracticeTask, guide: TaskTypeGuide, slotTexts: Record<string, string>) {
  const map = new Map<string, BulletKey>();
  for (const slot of guide.template) if (slot.bullet) map.set(slot.key, slot.bullet);
  if (map.size === 0) {
    const keys = new Set<string>(task.bullets.map((b) => b.key));
    for (const k of Object.keys(slotTexts)) if (keys.has(k)) map.set(k, k as BulletKey);
  }
  return map;
}

/**
 * Cheap structural checks. `slotTexts` is present in template mode
 * (slot key → text) and enables per-bullet and evaluation-share checks.
 * `guide` defaults to the task type's guide; tests pass a fixture.
 */
export function analyseAnswer(
  task: PracticeTask,
  text: string,
  slotTexts?: Record<string, string>,
  guide: TaskTypeGuide = TASK_TYPE_GUIDES[task.type],
): StructureCheck {
  const wordCount = countWords(text);
  const notes: string[] = [];
  const isD1 = task.type === 'd1-email';
  const minWords = task.minWords ?? guide?.minWords ?? (isD1 ? undefined : 200);

  // ── Length ───────────────────────────────────────────────────────────
  if (minWords && wordCount < minWords) {
    notes.push(
      `You have ${wordCount} words; this task asks for at least ${minWords} words. Falling short of the minimum costs marks.`,
    );
  } else if (isD1 && wordCount < D1_TOO_SHORT) {
    notes.push(
      `You have ${wordCount} words. An e-mail under about ${D1_TOO_SHORT} words is likely too thin to answer every point properly.`,
    );
  }
  if (!isD1 && wordCount > D2_FAR_OVER) {
    notes.push(
      `You have ${wordCount} words. Teachers advise staying near 200–250 words: extra length adds errors, not points.`,
    );
  }

  // ── Template mode: per-bullet coverage and evaluation share ─────────
  if (slotTexts && guide) {
    const bySlot = slotBullets(task, guide, slotTexts);
    const wordsByBullet = new Map<BulletKey, number>();
    let slotTotal = 0;
    for (const [slot, txt] of Object.entries(slotTexts)) {
      const n = countWords(txt);
      slotTotal += n;
      const b = bySlot.get(slot);
      if (b) wordsByBullet.set(b, (wordsByBullet.get(b) ?? 0) + n);
    }
    const linked = new Set(bySlot.values());
    for (const bullet of task.bullets) {
      if (!linked.has(bullet.key)) continue;
      if ((wordsByBullet.get(bullet.key) ?? 0) < SLOT_MIN_WORDS) {
        notes.push(`You haven't answered bullet: ${bullet.english}`);
      }
    }
    const evaluate = task.bullets.find((b) => b.key === 'evaluate');
    if (evaluate?.share && slotTotal > 0 && linked.has('evaluate')) {
      const share = (wordsByBullet.get('evaluate') ?? 0) / slotTotal;
      const floor = evaluate.share * (EVAL_SHARE_FLOOR / 0.5);
      if (share < floor) {
        const pct = Math.round(share * 100);
        const want = evaluate.share === 0.5 ? 'about half' : `about ${Math.round(evaluate.share * 100)}%`;
        notes.push(
          `The evaluation point should be ${want} the answer — yours is ${pct}%. Expand your own opinion with reasons and examples.`,
        );
      }
    }
  }

  // ── D1 e-mail: underlined questions and register ─────────────────────
  if (isD1) {
    const textTokens = tokens(text);
    for (const phrase of task.mail?.underlined ?? []) {
      const keys = keyWords(phrase);
      if (keys.length === 0) continue;
      if (!keys.some((k) => mentions(textTokens, k))) {
        notes.push(`You may not have answered: “${phrase}” — check that your e-mail responds to it.`);
      }
    }
    if (wordCount > 0) {
      if (!GREETING_RE.test(text)) {
        notes.push('Start the e-mail with a greeting such as "Hej Anna" or "Kære Anna".');
      }
      const tail = text.trim().slice(-200);
      if (!CLOSING_RE.test(tail)) {
        notes.push(
          'End the e-mail with an informal closing such as "Kærlig hilsen", "Mange hilsner", "Knus" or "Vi ses".',
        );
      }
    }
  }

  return { wordCount, notes };
}

/** Adapt a PracticeTask to the feedback providers' WritingTask. */
export function toFeedbackTask(task: PracticeTask): WritingTask {
  const focus = task.bullets.map((b) => b.danish).filter(Boolean);
  const common = {
    prompt: task.intro,
    focus: focus.length ? focus : undefined,
    label: task.title,
    source: task.session,
  };
  return task.type === 'd1-email'
    ? { kind: 'letter', register: 'uformel', ...common, minWords: task.minWords }
    : { kind: 'essay', ...common, minWords: task.minWords ?? 200 };
}
