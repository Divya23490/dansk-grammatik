/**
 * "Copy for review": the task, the learner's answer and grading instructions
 * as one prompt, to paste into an AI assistant until the in-app AI review
 * exists. Pure, so it can be tested and later reused as the coach's prompt.
 */

import { countWords } from '../content/writing';
import { CRITERIA, type PracticeTask, type TaskTypeGuide } from '../content/writing/types';

const TYPE_NAME: Record<PracticeTask['type'], string> = {
  'd1-email': 'Delprøve 1 — an informal e-mail reply to a Danish friend',
  'd2a-diagram': 'Delprøve 2A — a text of at least 200 words based on a diagram',
  'd2b-list': 'Delprøve 2B — a text of at least 200 words based on a list of viewpoints',
};

function taskText(task: PracticeTask): string {
  const out: string[] = [];
  if (task.session) out.push(`(${task.session})`);
  out.push(task.title);
  if (task.intro.trim()) out.push(task.intro.trim());
  if (task.mail) {
    out.push(`Mail fra ${task.mail.from}:`, ...task.mail.paragraphs.map((p) => `> ${p}`));
    out.push('Understregede dele (skal besvares):', ...task.mail.underlined.map((u) => `- “${u}”`));
  }
  if (task.table) {
    const { caption, columns, rows, source, note } = task.table;
    out.push(`Diagram: ${caption}`, columns.join(' | '), ...rows.map((r) => r.join(' | ')));
    if (source) out.push(source);
    if (note) out.push(`(${note})`);
  }
  if (task.list?.length) out.push('Liste:', ...task.list.map((l, i) => `${i + 1}. ${l}`));
  out.push('Opgave:', ...task.bullets.map((b) => `- ${b.danish}`));
  if (task.minWords) out.push(`Mindst ${task.minWords} ord.`);
  return out.join('\n');
}

export function buildReviewPrompt(task: PracticeTask, answer: string, guide?: TaskTypeGuide): string {
  const words = countWords(answer);
  const evaluate = task.bullets.find((b) => b.key === 'evaluate' && b.share);
  const target = guide?.targetWords;

  const specifics: string[] = [];
  if (task.type === 'd1-email') {
    specifics.push(
      '- Check every underlined question one by one: answered and developed, answered thinly, or missed.',
      '- Check the other bullets (thank the friend, the proposal) and the informal register (greeting, du, closing).',
    );
  } else {
    specifics.push(
      `- Check each bullet in turn. It must be at least ${task.minWords ?? 200} words.`,
      evaluate
        ? `- The evaluation bullet should be about ${Math.round(evaluate.share! * 100)} % of the answer: estimate its actual share.`
        : '- Check that the evaluation is developed, with reasons (begrundelse) and a conclusion.',
      task.type === 'd2a-diagram'
        ? '- The description should give the main trends, not every number, and must not claim more than the diagram shows.'
        : '- The comments should name the viewpoints they discuss and agree or disagree with reasons.',
    );
  }

  return [
    'You are an experienced censor for the Danish language exam "Prøve i Dansk 3" (PD3), written part (skriftlig fremstilling), CEFR level B2.',
    `Please assess my answer to this task: ${TYPE_NAME[task.type]}.`,
    '',
    'How PD3 writing is assessed (official criteria):',
    ...Object.values(CRITERIA).map((c) => `- ${c.title}: ${c.danish}`),
    'The grade uses the Danish 7-point scale (12, 10, 7, 4, 02, 00, -3) and is holistic; Delprøve 1 weighs less than Delprøve 2.',
    '',
    'Please give me, in English (quote my Danish exactly):',
    '1. An approximate band on the 7-point scale for this task alone, with one sentence on why.',
    '2. Task fulfilment, bullet by bullet:',
    ...specifics.map((l) => `   ${l}`),
    '3. Two to four sentences each on structure & coherence and on language.',
    '4. Corrections, in a table: my text → corrected Danish → why (name the grammar rule, e.g. V2 inversion, ikke-placement, en/et, endings). Include every error you find, most important first.',
    '5. The three things that would raise my grade the most next time.',
    '6. A corrected version of my answer that keeps my ideas and level of complexity (not a rewrite at a higher level).',
    '',
    '— TASK —',
    taskText(task),
    '',
    `— MY ANSWER (${words} words${target ? `; a strong answer is usually ${target[0]}–${target[1]}` : ''}) —`,
    answer.trim(),
  ].join('\n');
}
