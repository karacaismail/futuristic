import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import corpus from '../src/data/corpus.json';

describe('kayıpsız kaynak arşivi', () => {
  it('altı belgenin byte uzunluğu ve hash değerleri eşleşir', () => {
    expect(corpus.documents).toHaveLength(6);
    let total = 0;
    for (const source of corpus.documents) {
      const raw = readFileSync(`public/${source.path}`);
      expect(raw.length).toBe(source.bytes);
      expect(createHash('sha256').update(raw).digest('hex')).toBe(source.sha256);
      total += raw.length;
    }
    expect(total).toBe(263605);
  });
  it('atıfları tekilleştirir ve belgeye kadar izlenebilir tutar', () => {
    expect(new Set(corpus.references.map(ref => ref.url.replace(/\/$/, ''))).size).toBe(corpus.references.length);
    for (const ref of corpus.references) {
      expect(ref.documents.length).toBeGreaterThan(0);
      expect(ref.documents.every(id => corpus.documents.some(doc => doc.id === id))).toBe(true);
      expect(ref.url).toMatch(/^https?:\/\//);
    }
  });
  it('düz metindeki bitişik cümleleri ve API yöntemlerini URL sanmaz', () => {
    const links = corpus.references.map(ref => ref.url);
    expect(links).not.toContain('https://incelemektedir.Sistem');
    expect(links).not.toContain('https://videos.insert');
    expect(links).not.toContain('https://s01.mp');
    expect(links).not.toContain('https://fal.ai/Replicate');
  });
  it('çıplak alan adlarını ve açık repo kimliklerini de indeksler', () => {
    const links = corpus.references.map(ref => ref.url);
    expect(links).toContain('https://github.com/github/spec-kit');
    expect(links).toContain('https://n8n.io/workflows/2971');
    expect(links).toContain('https://openai.com');
    expect(corpus.opaqueCitations).toBe(209);
  });
});
