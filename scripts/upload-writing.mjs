#!/usr/bin/env node
/**
 * Upload the private writing items to Supabase.
 *
 *   npm run writing:upload
 *
 * Reads content-private/writing/*.json (kept out of git: the repo is public).
 * Each file is one WritingItem — an official task or a learner sample — and is
 * upserted into `writing_items`, where only signed-in users can read it. Only
 * items whose kind or content changed are written, so `updated_at` — which
 * the app can use to refresh its cached copy — moves only when an item really
 * changes.
 *
 * Needs, in .env.local:
 *   EXPO_PUBLIC_SUPABASE_URL   (already there for the app)
 *   SUPABASE_SECRET_KEY        the project's secret (service-role) key — it
 *                              bypasses row-level security, so it must never
 *                              get an EXPO_PUBLIC_ prefix or leave this machine.
 *   WRITING_SAMPLES_OWNER      e-mail of the account that may read the learner
 *                              samples (they are private texts). Without it,
 *                              learner samples are skipped.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'content-private/writing');

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnv(path.join(root, '.env.local'));

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) {
  console.error('Set EXPO_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local.');
  process.exit(1);
}
if (!fs.existsSync(dir)) {
  console.error(`Nothing to upload: ${path.relative(root, dir)} does not exist.`);
  process.exit(1);
}

const client = createClient(url, secret, { auth: { persistSession: false } });

const items = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));

const officialById = new Map(items.filter((i) => i.kind === 'official-task').map((i) => [i.id, i.content]));

/** What a list shows without the full content. */
function metaOf(item) {
  const c = item.content;
  const task = item.kind === 'official-task' ? c : (c.task ?? officialById.get(c.taskId));
  return {
    type: task?.type ?? null,
    title: task?.title ?? null,
    session: task?.session ?? null,
    origin: c.origin,
    ...(item.kind === 'learner-sample' ? { taskId: c.taskId, author: c.author, band: c.band } : {}),
  };
}

// Learner samples are readable only by their owner (see migration 0004).
let owner = null;
const ownerEmail = process.env.WRITING_SAMPLES_OWNER?.trim().toLowerCase();
if (ownerEmail) {
  for (let page = 1; !owner; page++) {
    const { data, error } = await client.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) {
      console.error(`Could not look up ${ownerEmail}: ${error.message}`);
      process.exit(1);
    }
    owner = data.users.find((u) => u.email?.toLowerCase() === ownerEmail)?.id ?? null;
    if (data.users.length < 1000) break;
  }
  if (!owner) {
    console.error(`No account with e-mail ${ownerEmail}.`);
    process.exit(1);
  }
}
const skipped = owner ? [] : items.filter((i) => i.kind === 'learner-sample');
if (skipped.length) console.warn(`Skipping ${skipped.length} learner samples: set WRITING_SAMPLES_OWNER in .env.local.`);
const uploadable = items.filter((i) => !skipped.includes(i));
const ownerOf = (i) => (i.kind === 'learner-sample' ? owner : null);

const { data: existing, error: readError } = await client.from('writing_items').select('id, kind, content, owner');
if (readError) {
  console.error(`Could not read writing_items: ${readError.message}. Has migration 0004 been run?`);
  process.exit(1);
}
// jsonb does not keep key order, so compare a key-sorted serialisation of both sides.
function stable(v) {
  if (Array.isArray(v)) return `[${v.map(stable).join(',')}]`;
  if (v && typeof v === 'object')
    return `{${Object.keys(v)
      .filter((k) => v[k] !== undefined)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${stable(v[k])}`)
      .join(',')}}`;
  return JSON.stringify(v);
}
const fingerprint = (r, o) => `${r.kind}\n${o}\n${stable(r.content)}`;
const before = new Map((existing ?? []).map((r) => [r.id, fingerprint(r, r.owner)]));

const changed = uploadable.filter((i) => before.get(i.id) !== fingerprint(i, ownerOf(i)));
const now = new Date().toISOString();
const rows = changed.map((i) => ({ id: i.id, kind: i.kind, meta: metaOf(i), content: i.content, owner: ownerOf(i), updated_at: now }));

if (rows.length) {
  const { error } = await client.from('writing_items').upsert(rows, { onConflict: 'id' });
  if (error) {
    console.error(`Upload failed: ${error.message}`);
    process.exit(1);
  }
}
console.log(`${uploadable.length} writing items: ${rows.length} uploaded, ${uploadable.length - rows.length} unchanged.`);
for (const r of rows) console.log(`  ↑ ${r.id} (${r.kind})`);
