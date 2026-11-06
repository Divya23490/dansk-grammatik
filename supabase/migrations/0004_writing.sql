-- Skema: PD3 writing prep — official writing tasks and learner samples.
--
-- Additive only: one new table, nothing in 0001–0003 changes.

-- ── Writing items: official tasks and graded learner texts ─────────────────
-- The repo is public and the web build is a static bundle, so transcribed
-- official tasks (PracticeTask) and real learner texts with our critique
-- (LearnerSample) are not shipped with the app. They live here: official tasks
-- are readable by any signed-in user; a learner sample only by its owner (the
-- learner whose texts they are), and by nobody when it has no owner. There is no insert/update/delete
-- policy: only the seed script (scripts/upload-writing.mjs, using the secret
-- key, which bypasses row-level security) writes them.
create table public.writing_items (
  id         text primary key,
  kind       text not null check (kind in ('official-task', 'learner-sample')),
  -- What a list would show without opening the item: {type, title, session, origin}.
  meta       jsonb not null default '{}'::jsonb,
  -- The full PracticeTask or LearnerSample (src/content/writing/types.ts).
  content    jsonb not null,
  -- Learner samples only: the account allowed to read them.
  owner      uuid references auth.users (id) on delete cascade,
  updated_at timestamptz not null default now()
);

alter table public.writing_items enable row level security;
create policy "signed-in users: read official tasks, owners: read own samples" on public.writing_items
  for select to authenticated
  using (kind = 'official-task' or owner = (select auth.uid()));
