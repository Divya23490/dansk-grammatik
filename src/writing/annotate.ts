/**
 * Split a text into plain and marked segments, marking the first occurrence
 * of each quote. Quotes that aren't found are skipped; a quote overlapping an
 * earlier-starting mark is dropped. Used for annotated answers and for the
 * underlined questions in a Delprøve 1 mail.
 */

export interface Segment {
  text: string;
  /** Index into the quotes passed in, for a marked segment. */
  mark?: number;
}

export function segmentText(text: string, quotes: string[]): Segment[] {
  const spans = quotes
    .map((q, i) => ({ i, start: q ? text.indexOf(q) : -1, len: q.length }))
    .filter((sp) => sp.start >= 0)
    .sort((a, b) => a.start - b.start || b.len - a.len);

  const out: Segment[] = [];
  let at = 0;
  for (const sp of spans) {
    if (sp.start < at) continue; // overlaps the previous mark
    if (sp.start > at) out.push({ text: text.slice(at, sp.start) });
    out.push({ text: text.slice(sp.start, sp.start + sp.len), mark: sp.i });
    at = sp.start + sp.len;
  }
  if (at < text.length) out.push({ text: text.slice(at) });
  return out;
}

/** Indices of quotes that `segmentText` would mark in this text. */
export function foundQuotes(text: string, quotes: string[]): Set<number> {
  return new Set(segmentText(text, quotes).flatMap((sg) => (sg.mark === undefined ? [] : [sg.mark])));
}
