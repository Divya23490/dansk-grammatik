/**
 * PD3 writing prep — the shared content contract.
 *
 * The real exam (2013–2024) only ever sets three task types:
 *   d1-email     Delprøve 1: informal reply to a Danish friend's e-mail.
 *   d2a-diagram  Delprøve 2A: ≥200 words from a diagram (describe → causes → evaluate).
 *   d2b-list     Delprøve 2B: ≥200 words from a box of 6 viewpoints (experience → comment → evaluate).
 *
 * Public content in this folder is original (written for the app) and labelled
 * as such. Official tasks and the learner's own texts are private: they live in
 * content-private/writing/*.json and are served from Supabase to signed-in users
 * (see src/writing/store.ts), but they use the same shapes defined here.
 */

import type { RuleId } from '../../grammar/rules';

export type WritingTaskType = 'd1-email' | 'd2a-diagram' | 'd2b-list';

export const WRITING_TASK_TYPES: WritingTaskType[] = ['d1-email', 'd2a-diagram', 'd2b-list'];

/**
 * Stable keys for the task sheet's bullet points. The phase-2 checker grades
 * "was this bullet addressed?" per key, so keep them stable.
 *   d1:  thanks · underlined · proposal
 *   d2a: describe · causes · evaluate
 *   d2b: experience · viewpoints · evaluate
 */
export type BulletKey =
  | 'thanks'
  | 'underlined'
  | 'proposal'
  | 'describe'
  | 'causes'
  | 'experience'
  | 'viewpoints'
  | 'evaluate';

export const BULLETS_BY_TYPE: Record<WritingTaskType, BulletKey[]> = {
  'd1-email': ['thanks', 'underlined', 'proposal'],
  'd2a-diagram': ['describe', 'causes', 'evaluate'],
  'd2b-list': ['experience', 'viewpoints', 'evaluate'],
};

export interface TaskBullet {
  key: BulletKey;
  /** Danish wording as on the task sheet. */
  danish: string;
  /** Plain-English gloss of what the bullet asks. */
  english: string;
  /** Required share of the answer, e.g. 0.5 for the evaluation point (from 2018 V). */
  share?: number;
}

/** Danish with an English gloss. */
export interface Phrase {
  da: string;
  en: string;
}

/** A diagram rendered as a native table (2A). */
export interface DataTable {
  caption: string;
  columns: string[];
  rows: string[][];
  /** e.g. "Kilde: Danmarks Statistik". */
  source?: string;
  /** Anything the table loses (chart type, how values were read off). */
  note?: string;
}

/** The friend's mail in Delprøve 1. */
export interface FriendMail {
  from: string;
  /** The mail body, paragraph by paragraph. */
  paragraphs: string[];
  /** The underlined questions, verbatim — each must be answered. */
  underlined: string[];
}

export interface PracticeTask {
  /** 'wsim-d1-1' for simulated; 'pd3-2019-summer-d1' for official (private). */
  id: string;
  type: WritingTaskType;
  /** Short topic title, e.g. "Flyrejser". */
  title: string;
  origin: 'simulated' | 'official';
  /** Session label for official tasks, e.g. "PD3 Sommer 2019". */
  session?: string;
  /** Situation / introduction text in Danish. */
  intro: string;
  /** d1-email only. */
  mail?: FriendMail;
  /** d2a-diagram only. */
  table?: DataTable;
  /** d2b-list only: the six statements / suggestions / examples. */
  list?: string[];
  bullets: TaskBullet[];
  minWords?: number;
  /**
   * Topic-specific help per template slot (key = TemplateSlot.key of this
   * type's guide): what to write here for *this* task, and starters already
   * fitted to the topic. Falls back to the generic template where absent.
   */
  slots?: Record<string, TaskSlotGuide>;
  /** 3–5 English tips for this exact task: traps in the wording, ideas, what to avoid. */
  tips?: Tip[];
  /** 10–15 useful Danish words and phrases for the topic, with English glosses. */
  words?: Phrase[];
  /**
   * Graded example answers to this task. Used by private (official) tasks,
   * whose examples travel with the task; public simulated tasks keep theirs
   * in the GRADED_* arrays so their ids are locked.
   */
  examples?: GradedAnswer[];
  /** Link to the official PDF when public, for anything the transcription loses. */
  pdfUrl?: string;
}

export interface TaskSlotGuide {
  /** English: what this paragraph should say for this topic. */
  hint: string;
  /** 2–4 Danish starters fitted to the topic, with English glosses. */
  starters: Phrase[];
}

/** Bands on the Danish 7-point scale. The real grade is holistic across both tasks. */
export type Band = '12' | '10' | '7' | '4' | '02' | '00';

export type Criterion = 'task' | 'pragmatic' | 'linguistic';

export const CRITERIA: Record<Criterion, { title: string; danish: string; english: string }> = {
  task: {
    title: 'Task fulfilment',
    danish: 'Er alle punkter besvaret? Uddybes relevante punkter, og sammenfattes besvarelsen?',
    english: 'Every bullet answered, the important ones developed, and the answer rounded off.',
  },
  pragmatic: {
    title: 'Structure & coherence',
    danish: 'Pragmatisk færdighed – opbygning og sammenhæng, sprogligt udtryk',
    english: 'Clear paragraphs, logical order, linking words, register that fits the reader.',
  },
  linguistic: {
    title: 'Language',
    danish: 'Lingvistisk færdighed – ordforråd, grammatik, ortografi',
    english: 'Range and precision of vocabulary, grammar (word order, endings), spelling.',
  },
};

export interface CriterionComment {
  criterion: Criterion;
  comment: string;
}

export interface Annotation {
  /** An exact substring of the answer text (first occurrence is highlighted). */
  quote: string;
  kind: 'good' | 'error' | 'style';
  /** English explanation. */
  note: string;
  /** The corrected Danish, for errors. */
  fix?: string;
  ruleId?: RuleId;
}

export interface GradedAnswer {
  id: string;
  /** The PracticeTask this answers (public sim id or private official id). */
  taskId: string;
  /** Approximate band. */
  band: Band;
  text: string;
  /** One-line English verdict. */
  summary: string;
  criteria: CriterionComment[];
  annotations: Annotation[];
  /**
   * illustrative — written for the app to show a level; never an official grade.
   * learner       — a real learner text with our critique (private).
   */
  origin: 'illustrative' | 'learner';
  /** Display name, e.g. "Learner A". Never a real classmate's name. */
  author?: string;
  /** Teacher's original comment, kept verbatim when present (learner samples). */
  teacherComment?: string;
}

/** A learner sample may answer a task we haven't transcribed; then it carries it. */
export interface LearnerSample extends GradedAnswer {
  origin: 'learner';
  task?: PracticeTask;
}

export interface TemplateSlot {
  key: string;
  /** Danish slot name, e.g. "Hovedtræk". */
  title: string;
  /** English: what this paragraph does. */
  purpose: string;
  /** Suggested word budget [min, max]. */
  words: [number, number];
  /** The task bullet this slot answers, if any. */
  bullet?: BulletKey;
  /** 3–5 sentence starters. */
  starters: Phrase[];
}

export interface Pitfall {
  id: string;
  title: string;
  /** English explanation of the why. */
  explanation: string;
  wrong: string;
  right: string;
  ruleId?: RuleId;
  /** Where we saw it: the learner's own mails, a teacher's correction, or general. */
  seenIn?: 'own-mails' | 'teacher' | 'general';
}

export interface Tip {
  title: string;
  /** English explanation; Danish examples inline are fine. */
  text: string;
}

export interface TipGroup {
  phase: 'before' | 'while' | 'proofread';
  tips: Tip[];
}

export interface PhraseGroup {
  /** English function label, e.g. "Giving advice". */
  function: string;
  items: Phrase[];
}

export interface TaskTypeGuide {
  type: WritingTaskType;
  /** "E-mail to a friend" */
  name: string;
  /** "Delprøve 1 · e-mail" */
  danish: string;
  /** 2–3 sentences in English. */
  summary: string;
  /** Suggested time out of the 2½ hours, e.g. "about 45 min". */
  time: string;
  minWords?: number;
  /** Target length range for a strong answer [min, max]. */
  targetWords: [number, number];
  /** The bullets as they (almost always) appear on the sheet. */
  officialBullets: TaskBullet[];
  tips: TipGroup[];
  template: TemplateSlot[];
  phrases: PhraseGroup[];
  pitfalls: Pitfall[];
}

/** An official example answer we link to (not copied) with English notes. */
export interface OfficialExample {
  id: string;
  label: string;
  url: string;
  /** Which task types it covers. */
  types: WritingTaskType[];
  /** English notes: what it does well / why it passes. */
  notes: string[];
}

/** Rows of the private Supabase table `writing_items`. */
export type WritingItem =
  | { id: string; kind: 'official-task'; content: PracticeTask }
  | { id: string; kind: 'learner-sample'; content: LearnerSample };
