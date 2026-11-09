import { gradedForTask, type GradedAnswer, type LearnerSample, type PracticeTask } from '../content/writing';

/** One task with its graded answers: the illustrative ladder and any learner samples. */
export interface ExampleGroup {
  task: PracticeTask;
  ladder: GradedAnswer[];
  samples: LearnerSample[];
}

const BAND_RANK: Record<string, number> = { '12': 0, '10': 1, '7': 2, '4': 3, '02': 4, '00': 5 };
const byBand = (a: GradedAnswer, b: GradedAnswer) => (BAND_RANK[a.band] ?? 9) - (BAND_RANK[b.band] ?? 9);

/**
 * Group the examples of one task type by task: simulated tasks first, then
 * official ones in the order given, then tasks known only from a learner
 * sample that carries its own task. Tasks with nothing to show are dropped.
 */
export function exampleGroups(
  simTasks: PracticeTask[],
  officialTasks: PracticeTask[],
  samples: LearnerSample[],
): ExampleGroup[] {
  const groups: ExampleGroup[] = [...simTasks, ...officialTasks].map((task) => ({
    task,
    ladder: [...gradedForTask(task)].sort(byBand),
    samples: [],
  }));
  const byId = new Map(groups.map((g) => [g.task.id, g]));
  for (const s of samples) {
    let g = byId.get(s.taskId);
    if (!g && s.task) {
      g = { task: s.task, ladder: [...(s.task.examples ?? [])].sort(byBand), samples: [] };
      groups.push(g);
      byId.set(s.taskId, g);
    }
    g?.samples.push(s);
  }
  return groups.filter((g) => g.ladder.length || g.samples.length);
}
