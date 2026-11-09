/**
 * Checks for the answer explanations a reading paper carries: every item has
 * one, in Danish and English; every wrong option says why it is wrong; and
 * every quote really is in the text, so an explanation can't point at words
 * the learner won't find.
 */

import type { Block, ClozeTask, Explained, Inline, ReadingPaper, Why } from './types';

/** Loose enough for typographic quotes, dashes and line breaks; strict about the words. */
export const normalizeQuote = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFC')
    .replace(/[’‘`´]/g, "'")
    .replace(/[”“«»„]/g, '"')
    .replace(/[–—‑]/g, '-')
    .replace(/…/g, '...')
    .replace(/\s+/g, ' ')
    .trim();

const runsText = (runs: Inline[], gap: (n: number) => string) =>
  runs.map((r) => (typeof r === 'string' ? r : 'gap' in r ? gap(r.gap) : 'em' in r ? r.em : r.strong)).join('');

function blocksText(blocks: Block[], gap: (n: number) => string = () => ' '): string {
  return blocks
    .map((b) => {
      switch (b.t) {
        case 'h':
        case 'small':
          return b.text;
        case 'p':
          return runsText(b.runs, gap);
        case 'list':
          return b.items.join('\n');
        case 'table':
          return b.rows.map((r) => r.join(' ')).join('\n');
        case 'gap':
          return '';
      }
    })
    .join('\n');
}

const letterAt = (options: string[], letter: string) => options[letter.charCodeAt(0) - 65] ?? '';

/** A cloze text read the way it should end up: every gap holding its right word. */
export function filledCloze(task: ClozeTask): string {
  return blocksText(task.passage.blocks, (n) =>
    n === 0 && task.example ? letterAt(task.example.options, task.example.correct) : letterAt(task.gaps[n - 1]?.options ?? [], task.gaps[n - 1]?.correct ?? ''),
  );
}

const MAX_QUOTE_WORDS = 40;

/** Every problem with the paper's explanations; `required` also reports items that have none. */
export function validateExplanations(p: ReadingPaper, required = true): string[] {
  const problems: string[] = [];
  const err = (m: string) => problems.push(`${p.id}: ${m}`);

  const explained = (where: string, e: Explained | undefined) => {
    if (!e) return required ? err(`${where}: no explanation`) : undefined;
    if (typeof e.da !== 'string' || !e.da.trim()) err(`${where}: empty Danish explanation`);
    if (typeof e.en !== 'string' || !e.en.trim()) err(`${where}: empty English explanation`);
  };
  const why = (where: string, w: Why | undefined, text: string) => {
    explained(where, w);
    if (!w?.quote) return;
    if (w.quote.trim().split(/\s+/).length > MAX_QUOTE_WORDS) err(`${where}: quote is over ${MAX_QUOTE_WORDS} words`);
    if (!text.includes(normalizeQuote(w.quote))) err(`${where}: quote "${w.quote}" is not in the text`);
  };
  /** whyNot must cover exactly the letters that are not accepted. */
  const whyNot = (where: string, given: Record<string, Explained> | undefined, wrong: string[]) => {
    if (!given) return required ? err(`${where}: no explanation for the wrong options`) : undefined;
    const keys = Object.keys(given).sort().join();
    if (keys !== [...wrong].sort().join()) err(`${where}: wrong-option explanations are for [${keys}], expected [${wrong.sort()}]`);
    for (const [l, e] of Object.entries(given)) explained(`${where} option ${l}`, e);
  };

  const lf1Text = normalizeQuote(p.lf1.sections.map((s) => [s.title, blocksText(s.blocks)].join('\n')).join('\n'));
  for (const q of p.lf1.questions) why(`LF1 q${q.n}`, q.why, lf1Text);

  for (const task of p.lf2.tasks) {
    const L = task.label;
    if (task.kind === 'mc') {
      const text = normalizeQuote(task.passages.map((x) => [x.title, blocksText(x.blocks)].join('\n')).join('\n'));
      task.questions.forEach((q, i) => {
        const ok = new Set([q.correct, ...(q.alsoCorrect ?? [])]);
        const wrong = q.options.map((_, j) => String.fromCharCode(65 + j)).filter((l) => !ok.has(l));
        why(`${L} q${i + 1}`, q.why, text);
        whyNot(`${L} q${i + 1}`, q.whyNot, wrong);
      });
    } else if (task.kind === 'cloze') {
      const text = normalizeQuote(filledCloze(task));
      task.gaps.forEach((g, i) => {
        const ok = new Set([g.correct, ...(g.alsoCorrect ?? [])]);
        const wrong = g.options.map((_, j) => String.fromCharCode(65 + j)).filter((l) => !ok.has(l));
        why(`${L} gap ${i + 1}`, g.why, text);
        whyNot(`${L} gap ${i + 1}`, g.whyNot, wrong);
      });
    } else {
      const text = normalizeQuote([task.passage.title, blocksText(task.passage.blocks), ...task.inserts.map((x) => x.text)].join('\n'));
      if (task.why && task.why.length !== task.correct.length) err(`${L}: ${task.why.length} explanations for ${task.correct.length} gaps`);
      task.correct.forEach((_, i) => why(`${L} gap ${i + 1}`, task.why?.[i], text));
      const extras = task.inserts.map((x) => x.letter).filter((l) => !task.correct.includes(l));
      whyNot(`${L} extra paragraphs`, task.whyNotExtra, extras);
    }
  }
  return problems;
}
