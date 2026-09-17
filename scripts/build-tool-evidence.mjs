import fs from 'node:fs';
import { sourceBlocks } from './source-blocks.mjs';
const tools = JSON.parse(fs.readFileSync('src/data/tools.json', 'utf8'));
const documents = Object.fromEntries(
  ['D01', 'D02', 'D03', 'D04', 'D05', 'D06'].map((id) => [
    id,
    fs.readFileSync(`public/sources/${id}.txt`, 'utf8'),
  ]),
);
const aliases = {
  T05: ['MiniMax', 'Hailuo'],
  T24: ['LTX-2', 'LTX'],
  T25: ['Wan 2.2', 'Wan2.2'],
  T43: ['Qwen Code', 'Qwen3-Coder'],
  T53: ['MLX', 'Ollama'],
  T54: ['LlamaIndex', 'Haystack'],
  T92: ['Premiere', 'UXP'],
  T101: ['Azure'],
  T145: ['gpt-oss'],
  T162: ['Figma', 'Framelink'],
  T168: ['OpenAI Agents SDK', 'Agents SDK'],
  T169: ['Claude Agent SDK', 'Agent SDK'],
};
function candidates(raw, id) {
  if (id === 'D01' || id === 'D02') {
    const sentences = [...new Intl.Segmenter('tr', { granularity: 'sentence' }).segment(raw)];
    return sentences.map((s) => ({
      start: s.index,
      end: s.index + s.segment.length,
      kind: 'sentence',
      text: s.segment,
    }));
  }
  return sourceBlocks(raw).filter((b) => !['heading', 'code'].includes(b.kind));
}
const cache = Object.fromEntries(
  Object.entries(documents).map(([id, raw]) => [id, candidates(raw, id)]),
);
for (const t of tools) {
  const names = (aliases[t.id] || t.name.split(' / ')).map((s) => s.toLowerCase());
  const old = t.evidence;
  t.evidence = old.map((e) => {
    const raw = documents[e.document];
    const choices = cache[e.document].filter((b) =>
      names.some((n) => b.text.toLowerCase().includes(n)),
    );
    // Prefer a tool's own table row/paragraph to a long introduction enumerating vendors.
    const score = (b) => {
      const plain = b.text
        .replaceAll('*', '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .trim()
        .toLowerCase();
      const head = plain.replace(/^\|\s*/, '');
      return (
        (names.some((n) => head.startsWith(n)) ? 100 : 0) +
        (b.kind === 'table-row' ? 30 : 0) +
        (/(?:lisans|GPL|Apache|MIT|API|VRAM|webhook|SDK|\$)/.test(b.text) ? 30 : 0) -
        Math.min(b.text.length / 200, 25)
      );
    };
    choices.sort((a, b) => score(b) - score(a));
    let best = choices[0];
    if (!best) {
      // Preserve a rare spelling variation's existing source context at paragraph boundaries.
      const at = raw.indexOf(e.excerpt);
      best = cache[e.document].find((b) => b.start <= at && b.end > at);
    }
    if (!best) throw new Error(`Missing source passage: ${t.id}/${e.document}`);
    let { start, end } = best;
    while (start < end && /\s/u.test(raw[start])) start++;
    while (end > start && /\s/u.test(raw[end - 1])) end--;
    while (start > 0 && !/\s/u.test(raw[start - 1])) start--;
    while (end < raw.length && !/\s/u.test(raw[end])) end++;
    while (start < end && /\s/u.test(raw[start])) start++;
    while (end > start && /\s/u.test(raw[end - 1])) end--;
    return {
      document: e.document,
      start,
      end,
      kind: best.kind,
      tableHeader: best.tableHeader || '',
      excerpt: raw.slice(start, end),
    };
  });
  for (const source of Object.values(t.fieldSources || {})) {
    const block = cache[source.document].find((b) => b.text.trim() === source.excerpt.trim());
    source.tableHeader = block?.tableHeader || '';
  }
}
fs.writeFileSync('src/data/tools.json', JSON.stringify(tools, null, 2) + '\n');
console.log(
  `${tools.reduce((n, t) => n + t.evidence.length, 0)} kaynak pasajı sözcük sınırlarıyla üretildi.`,
);
