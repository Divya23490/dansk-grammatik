/**
 * Structural checks for writing content: does a task have exactly what its
 * task type needs, and does a graded learner text point at real words and a
 * real task? Used by the content tests for every private item (official tasks
 * and learner samples in content-private/writing/) and usable for the public
 * simulated tasks, so a slip in a transcription shows up as a named problem
 * rather than as a broken screen in the app.
 *
 * Every validator returns a list of human-readable errors; empty means valid.
 */

import {
  BULLETS_BY_TYPE,
  WRITING_TASK_TYPES,
  type Band,
  type Criterion,
  type GradedAnswer,
  type LearnerSample,
  type PracticeTask,
  type WritingItem,
  type WritingTaskType,
} from './types';
import { TASK_TYPE_GUIDES } from './guides';

export const OFFICIAL_TASK_ID = /^pd3-(\d{4})-(summer|winter)-(d1|d2a|d2b)$/;
export const LEARNER_SAMPLE_ID = /^learner-[a-z0-9-]+$/;
const SIM_TASK_ID = /^wsim-(d1|d2a|d2b)-[a-z0-9-]+$/;
const EMBEDDED_TASK_ID = /^[a-z0-9][a-z0-9-]*$/;

const SHORT: Record<WritingTaskType, string> = { 'd1-email': 'd1', 'd2a-diagram': 'd2a', 'd2b-list': 'd2b' };
const BANDS: Band[] = ['12', '10', '7', '4', '02', '00'];
const CRITERIA: Criterion[] = ['task', 'pragmatic', 'linguistic'];
const ANNOTATION_KINDS = ['good', 'error', 'style'];
const SEASON_DA: Record<string, string> = { summer: 'sommer', winter: 'vinter' };

const isText = (x: unknown): x is string => typeof x === 'string' && x.trim().length > 0;

export interface TaskCheckOptions {
  /** The task is carried inside a learner sample: a non-official id need not be a wsim- id. */
  embedded?: boolean;
}

export function validatePracticeTask(t: PracticeTask, opts: TaskCheckOptions = {}): string[] {
  const errors: string[] = [];
  const err = (m: string) => errors.push(m);
  if (!t || typeof t !== 'object') return ['task is not an object'];

  const typeOk = WRITING_TASK_TYPES.includes(t.type);
  if (!typeOk) err(`type "${String(t.type)}" is not one of ${WRITING_TASK_TYPES.join(', ')}`);
  if (!isText(t.title)) err('title is empty');
  // Some 2A/2B sheets have no situation text, only the diagram or the box.
  if (typeof t.intro !== 'string') err('intro is missing');
  else if (t.type === 'd1-email' && !isText(t.intro)) err('intro is empty');
  if (t.origin !== 'official' && t.origin !== 'simulated') err(`origin "${String(t.origin)}" is not official/simulated`);

  // ── id ──
  if (!isText(t.id)) err('id is empty');
  else if (t.origin === 'official') {
    const m = OFFICIAL_TASK_ID.exec(t.id);
    if (!m) err(`id "${t.id}" does not match pd3-YYYY-(summer|winter)-(d1|d2a|d2b)`);
    else {
      if (typeOk && m[3] !== SHORT[t.type]) err(`id "${t.id}" ends in ${m[3]} but type is ${t.type}`);
      if (!isText(t.session)) err('official task has no session label');
      else {
        const s = t.session.toLowerCase();
        if (!s.includes(m[1])) err(`session "${t.session}" does not mention ${m[1]}`);
        if (!s.includes(SEASON_DA[m[2]]) && !s.includes(m[2])) err(`session "${t.session}" does not say ${SEASON_DA[m[2]]}`);
      }
    }
  } else if (opts.embedded) {
    if (!EMBEDDED_TASK_ID.test(t.id)) err(`id "${t.id}" should be lower-case letters, digits and dashes`);
  } else {
    const m = SIM_TASK_ID.exec(t.id);
    if (!m) err(`id "${t.id}" does not match wsim-(d1|d2a|d2b)-…`);
    else if (typeOk && m[1] !== SHORT[t.type]) err(`id "${t.id}" says ${m[1]} but type is ${t.type}`);
  }

  // ── bullets ──
  if (!Array.isArray(t.bullets)) err('bullets missing');
  else if (typeOk) {
    const keys = t.bullets.map((b) => b.key);
    const want = BULLETS_BY_TYPE[t.type];
    if (keys.join(',') !== want.join(',')) err(`bullet keys [${keys.join(', ')}] should be [${want.join(', ')}]`);
    t.bullets.forEach((b, i) => {
      if (!isText(b.danish)) err(`bullet ${i + 1} (${b.key}): danish is empty`);
      if (!isText(b.english)) err(`bullet ${i + 1} (${b.key}): english is empty`);
      if (b.share !== undefined && !(typeof b.share === 'number' && b.share > 0 && b.share <= 1))
        err(`bullet ${i + 1} (${b.key}): share ${String(b.share)} should be in (0, 1]`);
    });
  }
  if (t.minWords !== undefined && !(Number.isInteger(t.minWords) && t.minWords > 0))
    err(`minWords ${String(t.minWords)} should be a positive integer`);

  // ── type-specific material ──
  if (t.type === 'd1-email') {
    const mail = t.mail;
    if (!mail) err('d1-email task has no mail');
    else {
      if (!isText(mail.from)) err('mail.from is empty');
      if (!Array.isArray(mail.paragraphs) || !mail.paragraphs.length) err('mail has no paragraphs');
      else mail.paragraphs.forEach((p, i) => !isText(p) && err(`mail paragraph ${i + 1} is empty`));
      const underlined = Array.isArray(mail.underlined) ? mail.underlined : [];
      if (underlined.length < 2) err(`mail has ${underlined.length} underlined questions, expected at least 2`);
      const paras = Array.isArray(mail.paragraphs) ? mail.paragraphs : [];
      for (const u of underlined) {
        if (!isText(u)) err('an underlined question is empty');
        else if (!paras.some((p) => typeof p === 'string' && p.includes(u)))
          err(`underlined "${u}" is not a verbatim substring of any mail paragraph`);
      }
    }
  } else if (t.mail) err(`${t.type} task should not have a mail`);

  if (t.type === 'd2a-diagram') {
    const tb = t.table;
    if (!tb) err('d2a-diagram task has no table');
    else {
      if (!isText(tb.caption)) err('table caption is empty');
      const cols = Array.isArray(tb.columns) ? tb.columns : [];
      if (cols.length < 2) err(`table has ${cols.length} columns, expected at least 2`);
      cols.forEach((c, i) => typeof c !== 'string' && err(`table column ${i + 1} is not a string`));
      const rows = Array.isArray(tb.rows) ? tb.rows : [];
      if (!rows.length) err('table has no rows');
      rows.forEach((r, i) => {
        if (!Array.isArray(r)) err(`table row ${i + 1} is not an array`);
        else {
          if (r.length !== cols.length) err(`table row ${i + 1} has ${r.length} cells, expected ${cols.length}`);
          if (r.some((c) => typeof c !== 'string')) err(`table row ${i + 1} has a non-string cell`);
        }
      });
    }
  } else if (t.table) err(`${t.type} task should not have a table`);

  if (t.type === 'd2b-list') {
    const list = Array.isArray(t.list) ? t.list : null;
    if (!list) err('d2b-list task has no list');
    else {
      if (list.length !== 6) err(`list has ${list.length} items, expected 6`);
      list.forEach((x, i) => !isText(x) && err(`list item ${i + 1} is empty`));
    }
  } else if (t.list) err(`${t.type} task should not have a list`);

  // Topic-specific template help: keys must be slots of this type's template.
  if (t.slots !== undefined) {
    const keys = new Set((TASK_TYPE_GUIDES[t.type as WritingTaskType]?.template ?? []).map((sl) => sl.key));
    if (!t.slots || typeof t.slots !== 'object') err('slots must be an object');
    else
      for (const [key, g] of Object.entries(t.slots)) {
        if (!keys.has(key)) err(`slots.${key} is not a template slot of ${t.type}`);
        if (!isText(g?.hint)) err(`slots.${key} has no hint`);
        const st = Array.isArray(g?.starters) ? g.starters : [];
        if (!st.length) err(`slots.${key} has no starters`);
        st.forEach((p, i) => (!isText(p?.da) || !isText(p?.en)) && err(`slots.${key}.starters[${i}] needs da and en`));
      }
  }

  if (t.tips !== undefined) {
    if (!Array.isArray(t.tips)) err('tips must be a list');
    else t.tips.forEach((x, i) => (!isText(x?.title) || !isText(x?.text)) && err(`tips[${i}] needs title and text`));
  }
  if (t.words !== undefined) {
    if (!Array.isArray(t.words)) err('words must be a list');
    else t.words.forEach((p, i) => (!isText(p?.da) || !isText(p?.en)) && err(`words[${i}] needs da and en`));
  }
  if (t.examples !== undefined) {
    if (!Array.isArray(t.examples)) err('examples must be a list');
    else {
      const ids = new Set<string>();
      t.examples.forEach((a, i) => {
        for (const e of validateGradedAnswer(a)) err(`examples[${i}]: ${e}`);
        if (a?.taskId !== t.id) err(`examples[${i}]: taskId "${String(a?.taskId)}" should be "${t.id}"`);
        if (a?.origin !== 'illustrative') err(`examples[${i}]: origin should be illustrative`);
        if (ids.has(a?.id)) err(`examples[${i}]: duplicate id "${a?.id}"`);
        ids.add(a?.id);
      });
    }
  }

  return errors;
}

/** Checks shared by illustrative answers and learner samples. */
export function validateGradedAnswer(a: GradedAnswer): string[] {
  const errors: string[] = [];
  const err = (m: string) => errors.push(m);
  if (!a || typeof a !== 'object') return ['answer is not an object'];
  if (!isText(a.id)) err('id is empty');
  if (!isText(a.taskId)) err('taskId is empty');
  if (!BANDS.includes(a.band)) err(`band "${String(a.band)}" is not one of ${BANDS.join(', ')}`);
  if (!isText(a.text)) err('text is empty');
  if (!isText(a.summary)) err('summary is empty');

  if (!Array.isArray(a.criteria)) err('criteria missing');
  else {
    const seen = new Set<string>();
    a.criteria.forEach((c, i) => {
      if (!CRITERIA.includes(c.criterion)) err(`criteria ${i + 1}: "${String(c.criterion)}" is not a criterion`);
      else if (seen.has(c.criterion)) err(`criteria: ${c.criterion} appears twice`);
      seen.add(c.criterion);
      if (!isText(c.comment)) err(`criteria ${i + 1} (${c.criterion}): comment is empty`);
    });
  }

  if (!Array.isArray(a.annotations)) err('annotations missing');
  else
    a.annotations.forEach((n, i) => {
      const label = `annotation ${i + 1}`;
      if (!ANNOTATION_KINDS.includes(n.kind)) err(`${label}: kind "${String(n.kind)}" is not good/error/style`);
      if (!isText(n.note)) err(`${label}: note is empty`);
      if (!isText(n.quote)) err(`${label}: quote is empty`);
      else if (typeof a.text === 'string' && !a.text.includes(n.quote))
        err(`${label}: quote "${n.quote}" is not a verbatim substring of the text`);
      if (n.fix !== undefined && !isText(n.fix)) err(`${label}: fix is empty`);
    });
  return errors;
}

/**
 * A learner sample. Pass `taskIds` (ids of every task the app can resolve) to
 * also check that the sample's task exists; a sample that embeds its own task
 * resolves on its own.
 */
export function validateLearnerSample(s: LearnerSample, taskIds?: ReadonlySet<string>): string[] {
  const errors = validateGradedAnswer(s);
  const err = (m: string) => errors.push(m);
  if (!s || typeof s !== 'object') return errors;
  if (isText(s.id) && !LEARNER_SAMPLE_ID.test(s.id)) err(`id "${s.id}" does not match learner-[a-z0-9-]+`);
  if (s.origin !== 'learner') err(`origin "${String(s.origin)}" should be learner`);
  if (!isText(s.author)) err('author is empty (use a display name like "Learner A")');
  if (s.teacherComment !== undefined && !isText(s.teacherComment)) err('teacherComment is empty');

  if (s.task) {
    for (const e of validatePracticeTask(s.task, { embedded: true })) err(`task: ${e}`);
    if (s.task.id !== s.taskId) err(`embedded task id "${s.task.id}" differs from taskId "${s.taskId}"`);
  } else if (taskIds && !taskIds.has(s.taskId)) {
    err(`taskId "${s.taskId}" matches no known task and no task is embedded`);
  }
  return errors;
}

/** One row of `writing_items` (= one file in content-private/writing/). */
export function validateWritingItem(item: WritingItem, taskIds?: ReadonlySet<string>): string[] {
  if (!item || typeof item !== 'object') return ['item is not an object'];
  const errors: string[] = [];
  if (!item.content || typeof item.content !== 'object') return ['content is missing'];
  if (item.id !== item.content.id) errors.push(`item id "${item.id}" differs from content id "${item.content.id}"`);
  if (item.kind === 'official-task') {
    if (item.content.origin !== 'official') errors.push(`official-task content has origin "${item.content.origin}"`);
    errors.push(...validatePracticeTask(item.content));
  } else if (item.kind === 'learner-sample') {
    errors.push(...validateLearnerSample(item.content, taskIds));
  } else {
    errors.push(`kind "${String((item as { kind: unknown }).kind)}" is not official-task/learner-sample`);
  }
  return errors;
}
