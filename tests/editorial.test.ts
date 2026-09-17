import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import tools from '../src/data/tools.json';
import claims from '../src/data/claims.json';
import coverage from '../src/data/coverage.json';

const content = [
  ...tools.flatMap((t) => [
    t.pricing,
    t.license,
    t.limits,
    t.maturity,
    t.integration,
    t.workflow,
    t.decision,
  ]),
  ...claims.flatMap((c) => [c.statement, c.assessment]),
  ...readdirSync('src/content/guide').map((file) =>
    readFileSync(`src/content/guide/${file}`, 'utf8'),
  ),
];
const missingSpace =
  /(?:Starter|Creator|Max|Pro|ücretsiz|dakika|kredi|batch|Review|model|ayrı|başına|eski|Ocak|Şubat|Mart|Nisan|Mayıs|Haziran|Temmuz|Ağustos|Eylül|Ekim|Kasım|Aralık)(?=\d)|\d(?=(?:kredi|kişi|gün|hafta|ay|kanal|repo|model|çağrı|yıldız)\b)|[A-Za-zÇĞİÖŞÜçğıöşü](?=\$\d)|\d(?=\$)/gu;

describe('editoryal kalite sözleşmesi', () => {
  it('fiyat, tarih ve miktarlarda sözcükleri sayılara yapıştırmaz', () => {
    expect(
      content.flatMap((text) =>
        [...text.matchAll(missingSpace)].map((m) =>
          text.slice(Math.max(0, m.index - 25), m.index + 50),
        ),
      ),
    ).toEqual([]);
    expect(content.filter((text) => /\$\d[\d.,]*\s*\$/.test(text))).toEqual([]);
  });
  it('alana bağlı kaynak satırları değişmemiş kaynakta bulunur', () => {
    for (const t of tools)
      if ('fieldSources' in t) {
        for (const source of Object.values(
          t.fieldSources as Record<string, { document: string; excerpt: string }>,
        ))
          expect(readFileSync(`public/sources/${source.document}.txt`, 'utf8')).toContain(
            source.excerpt,
          );
      }
  });
  it('alan varlığını genel tavsiye metninden ayırır', () => {
    for (const t of tools) {
      expect(t).toHaveProperty('availability.pricing');
      expect(t).toHaveProperty('availability.license');
    }
    expect(tools.find((t) => t.id === 'T23')).toHaveProperty('availability.pricing', false);
    expect(tools.find((t) => t.id === 'T23')).toHaveProperty('availability.license', true);
    expect(tools.find((t) => t.name === 'OpenAI Agents SDK')).toHaveProperty(
      'availability.license',
      false,
    );
    expect(tools.find((t) => t.name === 'Runway')).toHaveProperty('availability.pricing', true);
  });
  it('kanıt alıntıları cümle/paragraf sınırında ve kaynak aralığıyla saklanır', () => {
    for (const t of tools)
      for (const e of t.evidence) {
        expect(e).toHaveProperty('start');
        expect(e).toHaveProperty('end');
        expect(e).toHaveProperty('kind');
        const range = e as typeof e & { start: number; end: number; kind: string };
        const raw = readFileSync(`public/sources/${e.document}.txt`, 'utf8');
        expect(raw.slice(range.start, range.end)).toBe(e.excerpt);
        expect(range.start === 0 || /\s/u.test(raw[range.start - 1])).toBe(true);
        expect(range.end === raw.length || /\s/u.test(raw[range.end])).toBe(true);
        expect(['sentence', 'paragraph', 'table-row', 'list-item']).toContain(range.kind);
      }
  });
  it('D04 çok konulu dev pasajlara sıkışmaz, tablo ve kod parçalanmaz', () => {
    const units = coverage.filter((u) => u.document === 'D04');
    expect(Math.max(...units.map((u) => u.text.length))).toBeLessThanOrEqual(3500);
    expect(units.filter((u) => u.topics.length > 8)).toHaveLength(0);
    expect(units.some((u) => u.title.includes('Diffblue'))).toBe(true);
    for (const unit of units) expect((unit.text.match(/^```/gm) || []).length % 2).toBe(0);
  });
  it('okuma raporu, yönetici sürümü ve tam ek birbirinden ayrıdır', () => {
    expect(existsSync('public/yonetici-ozeti.md')).toBe(true);
    expect(existsSync('public/rapor-ekleri.md')).toBe(true);
    const report = readFileSync('public/rapor.md', 'utf8');
    const executive = readFileSync('public/yonetici-ozeti.md', 'utf8');
    const appendix = readFileSync('public/rapor-ekleri.md', 'utf8');
    expect(executive.split(/\s+/).length).toBeLessThan(1600);
    expect(report.split(/\s+/).length).toBeLessThan(25000);
    expect(report).toContain('rapor-ekleri.md');
    expect(appendix).toContain('T23 · ComfyUI');
    expect(appendix).toContain('22,50');
    expect(report).not.toContain('Kendi domain sözleşmesini sağlayıcıdan ayır; credential');
  });
});
