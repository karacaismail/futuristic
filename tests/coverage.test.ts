import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import topics from '../src/data/topics.json';
import coverage from '../src/data/coverage.json';
import tools from '../src/data/tools.json';
import claims from '../src/data/claims.json';

describe('arşivden karara anlamsal kapsam', () => {
  it('her kaynak bölümü açıklamalı bir konuya ve gerçek kaynak aralığına bağlanır', () => {
    expect(new Set(coverage.map((unit) => unit.document)).size).toBe(6);
    for (const unit of coverage) {
      const raw = readFileSync(`public/sources/${unit.document}.txt`, 'utf8');
      expect(raw.slice(unit.start, unit.end)).toBe(unit.text);
      expect(unit.topics.length).toBeGreaterThan(0);
      expect(unit.topics.every((id: string) => topics.some((topic) => topic.id === id))).toBe(true);
    }
    for (const topic of topics) {
      const body = readFileSync(`src/content/guide/${topic.id}.md`, 'utf8');
      expect(body).toContain('## Uygulama');
      expect(body).toContain('## Karar');
      expect(coverage.some((unit) => unit.topics.includes(topic.id))).toBe(true);
    }
  });
  it('araçlar yalnız etiket değildir; fiyat, lisans, sınır ve entegrasyon taşır', () => {
    for (const name of [
      'ComfyUI',
      'Diffblue Cover',
      'Greptile',
      'OpenRouter',
      'Vibe Kanban',
      'DeepSeek',
      'Suno',
      'Epidemic Sound',
      'Tabnine',
      'GitLab Duo',
      'CrewAI',
      'DeepSource',
      'Descript',
      'Vizard',
    ]) {
      const tool = tools.find((tool) => tool.name.includes(name));
      expect(tool, name).toBeDefined();
      for (const key of [
        'pricing',
        'license',
        'limits',
        'maturity',
        'integration',
        'workflow',
        'decision',
        'evidence',
      ])
        expect(tool?.[key as keyof typeof tool], `${name}.${key}`).toBeTruthy();
    }
    expect(tools.find((tool) => tool.id === 'T23')?.name).toBe('ComfyUI');
  });
  it('kaynak sayıları ve çelişkileri erişilebilir tutar', () => {
    for (const id of [
      'runway-credits',
      'gex131',
      'claude-max',
      'gitclear',
      'swe-bench',
      'rpm',
      'gpu-break-even',
      'veo-arithmetic',
    ]) {
      const claim = claims.find((claim) => claim.id === id);
      expect(claim, id).toBeDefined();
      expect(claim?.statement).toBeTruthy();
      expect(claim?.assessment).toBeTruthy();
      expect(claim?.documents.length).toBeGreaterThan(0);
      expect(['source', 'verified', 'corrected', 'conflict', 'scenario']).toContain(claim?.status);
    }
    expect(claims.find((claim) => claim.id === 'veo-arithmetic')?.assessment).toContain('22,50');
    expect(claims.find((claim) => claim.id === 'gpu-break-even')?.assessment).toContain('42');
  });
  it('kişisel bağlam ve Türkiye uyumu ayrı karar dosyalarında açıklanır', () => {
    const profile = readFileSync('src/content/guide/personal-stack.md', 'utf8');
    for (const term of [
      'MetaFramer',
      'atonota',
      'Next.js',
      'Supabase',
      'FastAPI',
      'Frappe',
      'ERPNext',
      '15 ajan',
      'M5 Max',
      'Codex master',
    ])
      expect(profile).toContain(term);
    const compliance = readFileSync('src/content/guide/turkey-compliance.md', 'utf8');
    for (const term of ['KVKK', 'RTÜK', 'ses', 'yurt dışı', 'HRMS', 'İBYS'])
      expect(compliance.toLocaleLowerCase('tr')).toContain(term.toLocaleLowerCase('tr'));
  });
});

describe('yayınlanan içeriğin izlenebilirliği', () => {
  it('kaynak pasajları her özgün belgeyi boşluksuz ve tekrarsız kapsar', () => {
    for (const document of ['D01', 'D02', 'D03', 'D04', 'D05', 'D06']) {
      const units = coverage.filter((unit) => unit.document === document);
      expect(units.map((unit) => unit.text).join('')).toBe(
        readFileSync(`public/sources/${document}.txt`, 'utf8'),
      );
      units.forEach((unit, index) => expect(unit.start).toBe(index ? units[index - 1].end : 0));
    }
  });
  it('araçların kanıt pasajları gerçekten bağlı özgün belgelerde bulunur', () => {
    for (const tool of tools) {
      expect(topics.some((topic) => topic.id === tool.topic)).toBe(true);
      expect(tool.evidence.length).toBeGreaterThan(0);
      for (const evidence of tool.evidence)
        expect(readFileSync(`public/sources/${evidence.document}.txt`, 'utf8')).toContain(
          evidence.excerpt,
        );
    }
  });
  it('rehberlerdeki iç bağlantılar gerçek konu, belge ve iddia kayıtlarına gider', () => {
    const validRoutes = [
      'overview',
      'guide',
      'claims',
      'coverage',
      'tools',
      'video',
      'software',
      'architecture',
      'cost',
      'risks',
      'roadmap',
      'sources',
      'methodology',
    ];
    for (const topic of topics) {
      const body = readFileSync(`src/content/guide/${topic.id}.md`, 'utf8');
      for (const match of body.matchAll(/\]\(#\/([^)]*)\)/g)) {
        const [route, query] = match[1].split('?');
        expect(validRoutes).toContain(route);
        const params = new URLSearchParams(query);
        if (params.has('topic'))
          expect(topics.some((t) => t.id === params.get('topic'))).toBe(true);
        if (params.has('doc'))
          expect(['D01', 'D02', 'D03', 'D04', 'D05', 'D06']).toContain(params.get('doc'));
      }
    }
    for (const claim of claims) expect(topics.some((topic) => topic.id === claim.topic)).toBe(true);
  });
  it('okuma raporu rehberleri, ekler bütün sayısal kayıtları ve somut araç verilerini içerir', () => {
    const report = readFileSync('public/rapor.md', 'utf8');
    const appendix = readFileSync('public/rapor-ekleri.md', 'utf8');
    for (const topic of topics) expect(report).toContain(topic.title);
    for (const claim of claims) {
      expect(appendix).toContain(claim.statement);
      expect(appendix).toContain(claim.assessment);
    }
    for (const tool of tools) {
      expect(appendix).toContain(`${tool.id} · ${tool.name}`);
      for (const key of ['pricing', 'license', 'limits', 'maturity', 'integration'] as const)
        if (tool.availability[key]) expect(appendix).toContain(tool[key]);
      expect(appendix).toContain(tool.workflow);
      if (
        !tool.decision.includes('rehberindeki kabul ölçütleriyle') &&
        !tool.decision.startsWith('Mevcut stack’in')
      )
        expect(appendix).toContain(tool.decision);
    }
  });
});
