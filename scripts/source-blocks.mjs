// Ranges always refer to the unchanged UTF-16 source string.
export function sourceBlocks(raw) {
  const lines = [...raw.matchAll(/[^\n]*\n|[^\n]+$/g)];
  const blocks = [];
  let start = 0,
    kind = 'paragraph',
    fence = false,
    tableHeader = '';
  const emit = (end) => {
    if (end > start) blocks.push({ start, end, kind, tableHeader, text: raw.slice(start, end) });
    start = end;
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i][0],
      offset = lines[i].index;
    if (/^\s*```/.test(line)) {
      if (!fence) {
        emit(offset);
        kind = 'code';
      }
      fence = !fence;
      if (!fence) {
        emit(offset + line.length);
        kind = 'paragraph';
      }
      continue;
    }
    if (fence) continue;
    if (/^\s*\|/.test(line)) {
      emit(offset);
      kind = 'table-row';
      if (/^\s*\|\s*:?-+/.test(lines[i + 1]?.[0] || '')) {
        tableHeader = line + lines[++i][0];
        emit(lines[i].index + lines[i][0].length);
      } else emit(offset + line.length);
      kind = 'paragraph';
    } else if (/^#{1,6} /.test(line)) {
      emit(offset);
      kind = 'heading';
      emit(offset + line.length);
      kind = 'paragraph';
      tableHeader = '';
    } else if (!line.trim()) {
      emit(offset + line.length);
      tableHeader = '';
      kind = 'paragraph';
    } else if (/^\s*(?:[-*+] |\d+[.)] )/.test(line)) {
      emit(offset);
      kind = 'list-item';
    }
  }
  emit(raw.length);
  // Absorb whitespace into its preceding range, never lose source characters.
  return blocks.reduce((out, b) => {
    if (!b.text.trim() && out.length) {
      out.at(-1).end = b.end;
      out.at(-1).text += b.text;
    } else out.push(b);
    return out;
  }, []);
}
