import fs from 'node:fs';
const rows = `personal-stack|İsmail için karar haritası|Kişisel bağlam|D04,D05,D06|MetaFramer,atonota,PIM,HRMS,İBYS,İsmail,Ismail,Next.js,Supabase,Frappe
video-formats|Beş video yöntemi ve üç mimari|Video|D01,D03,D05|faceless,template-first,generative-first,mimari A,mimari B,mimari C
video-agents|Director ve sahne ajanları|Video|D01,D03,D05|OpenMontage,ShortGPT,MoneyPrinter,Director,Screenwriter,SceneBuilder
video-models|Video modelleri ve yönlendirme|Video|D01,D03,D05|Veo,Runway,Luma,Kling,Hailuo,ComfyUI,LTX,CogVideo,Hunyuan,Wan
voice-localization|Türkçe ses, altyazı ve lokalizasyon|Video|D01,D03,D05|TTS,Whisper,Scribe,SSML,ElevenLabs,Speech,transkripsiyon
avatar|Avatar ve canlı persona|Video|D03,D05|HeyGen,Synthesia,Tavus,avatar,presenter
editing-finishing|Kurgu, render ve finishing|Video|D01,D03,D05|Remotion,FFmpeg,MoviePy,Shotstack,Creatomate,JSON2Video,finishing,grading
repurposing|Uzun videodan kısa içerik|Video|D03,D05|OpusClip,Vizard,Ssemble,Descript,repurpos,CapCut,AutoPod
media-contracts|İçerik veri modeli ve sözleşmeler|Mimari|D01,D03|ContentJob,Storyboard,Timeline,GenerationAttempt,Asset,contract,şema
media-quality|Kalite kapıları ve insan onayı|Video|D01,D03,D05|VBench,quality,kalite,onay,HITL,VLM,QC,lip-speech
orchestration|Workflow, retry ve kalıcı durum|Mimari|D01,D03,D04,D05,D06|n8n,Temporal,Make,Zapier,LangGraph,CrewAI,retry,circuit,webhook
publishing|Yayın API’leri ve sosyal dağıtım|Video|D01,D03,D05|publish,YouTube,Instagram,TikTok,LinkedIn,Postiz,Blotato,Upload-Post,Ayrshare
music-rights|Müzik ve medya hakları|Uyum|D03,D05|Suno,Epidemic,Artlist,müzik,muzik,telif,copyright
provenance|C2PA, SynthID ve AI açıklaması|Uyum|D01,D03,D05|C2PA,SynthID,AI Act,inauthentic,şeffaf,provenance,disclosure
video-economics|Video bütçesi, RPM ve gelir|Ekonomi|D03,D05|RPM,gelir,break-even,storage,$0.,bütçe,maliyet
coding-agents|Kodlama ajanları ve çalışma döngüsü|Yazılım|D02,D04,D06|Codex,Claude Code,Cursor,Aider,OpenHands,Copilot,Cline,Devin
agent-managers|Worktree ve çoklu ajan yöneticileri|Yazılım|D06|Pane,Conductor,Kanban,Squad,amux,agentbox,Sculptor,VibeTree
spec-context|SDD, AGENTS.md ve bağlam|Yazılım|D02,D04,D06|Spec,AGENTS.md,CLAUDE.md,SDD,constitution,cache,Kiro,BMAD
mcp|MCP ve domain araçları|Mimari|D02,D04,D06|MCP,Context7,FastMCP,JSON-RPC,Streamable,SSE
rag|RAG ve kurumsal bilgi getirme|Mimari|D02,D04,D06|RAG,retrieval,AST,Tree-sitter,LlamaIndex,Haystack,LangChain
local-models|Yerel modeller ve inference|Yazılım|D02,D04,D06|Qwen,DeepSeek,GLM,Kimi,MLX,Ollama,vLLM,SGLang,quantization,VRAM
GPU_PLACEHOLDER
 testing-review|TDD, AI review ve otomatik onarım|Yazılım|D02,D04,D06|TDD,CodeRabbit,Qodo,Greptile,Diffblue,Sonar,Semgrep,review,Playwright
measurement|Benchmark ve gerçek üretkenlik|Ekonomi|D02,D04,D06|METR,DORA,GitClear,SWE-bench,benchmark,throughput,ROI
 developer-toolchain|FastAPI, React ve geliştirici araçları|Yazılım|D04,D06|Ruff,Pyrefly,Biome,oxlint,Prettier,Figma,Stitch,v0,TanStack,uv,tooling
security|Ajan güvenliği ve OWASP|Uyum|D02,D04,D06|OWASP,injection,security,güvenlik,guardrail,Snyk,secret,lethal
 turkey-compliance|KVKK, ses rızası ve RTÜK|Uyum|D03,D04,D05,D06|KVKK,RTÜK,RTUK,rıza,riza,kişisel,GDPR
operations|Gözlemlenebilirlik ve operasyon|Mimari|D03,D04,D06|Sentry,Datadog,OpenClaw,DevOps,monitoring,observability,Grafana,telemetry
rollout|Pilot, takvim ve yatırım planı|Kişisel bağlam|D03,D04,D05,D06|yol haritası,roadmap,pilot,UNK,öncelik,sonraki,başlamalı,skip`;
const parsed = rows
  .replace(
    'GPU_PLACEHOLDER',
    'gpu-economics|API, M5 Max ve Hetzner ekonomisi|Ekonomi|D06|Hetzner,GEX131,GEX44,OpenRouter,M5 Max,889,15 ajan,15-ajan',
  )
  .split('\n')
  .map((row) => {
    const [id, title, category, docs, keys] = row.trim().split('|');
    return { id, title, category, documents: docs.split(','), keywords: keys.split(',') };
  });
const previousTopics = fs.existsSync('src/data/topics.json')
  ? JSON.parse(fs.readFileSync('src/data/topics.json', 'utf8'))
  : [];
const topics = parsed.map(({ keywords, ...topic }) => ({
  ...topic,
  summary:
    previousTopics.find((t) => t.id === topic.id)?.summary ||
    fs
      .readFileSync(`src/content/guide/${topic.id}.md`, 'utf8')
      .split('\n\n')[1]
      .replaceAll('**', '')
      .replaceAll('`', ''),
  minutes: Math.max(
    2,
    Math.ceil(
      fs.readFileSync(`src/content/guide/${topic.id}.md`, 'utf8').split(/\s+/).length / 180,
    ),
  ),
}));
fs.writeFileSync('src/data/topics.json', JSON.stringify(topics, null, 2) + '\n');
const units = [];
for (const doc of ['D01', 'D02', 'D03', 'D04', 'D05', 'D06']) {
  const raw = fs.readFileSync(`public/sources/${doc}.txt`, 'utf8');
  let boundaries = [{ start: 0, title: 'Giriş ve kapsam' }];
  if (doc === 'D01' || doc === 'D02') {
    // Original paragraph boundaries were lost. Split only after sentences; these are passages, not reconstructed original headings.
    const sentences = [...raw.matchAll(/[.!?](?=\s+[A-ZÇĞİÖŞÜ])/gu)];
    let last = 0;
    for (const m of sentences)
      if (m.index + 1 - last > 1800) {
        boundaries.push({ start: m.index + 1, title: `Kaynak pasajı ${boundaries.length + 1}` });
        last = m.index + 1;
      }
  } else {
    let fence = false,
      offset = 0;
    for (const line of raw.split(/(?<=\n)/)) {
      if (/^\s*```/.test(line)) fence = !fence;
      if (
        !fence &&
        (/^#{1,3} /.test(line) ||
          (doc === 'D05' &&
            /^(?:\d+[.)]?\s*[-—:]?\s*[A-Z]|[A-Z][A-Z0-9 _/—:()–+-]{10,})/.test(line))) &&
        offset > 0
      )
        boundaries.push({
          start: offset,
          title: line
            .trim()
            .replace(/^#+\s*/, '')
            .slice(0, 160),
        });
      offset += line.length;
    }
  }
  boundaries.forEach((b, i) => {
    const end = boundaries[i + 1]?.start ?? raw.length,
      text = raw.slice(b.start, end),
      lower = text.toLocaleLowerCase('tr');
    const ranked = parsed
      .filter((t) => t.documents.includes(doc))
      .map((t) => ({
        id: t.id,
        score: t.keywords.reduce(
          (n, k) => n + (lower.includes(k.toLocaleLowerCase('tr')) ? 1 : 0),
          0,
        ),
      }))
      .sort((a, b) => b.score - a.score);
    const ids = ranked
      .filter((t) => t.score > 0)
      .slice(0, 6)
      .map((t) => t.id);
    if (!ids.length)
      ids.push(['D01', 'D03', 'D05'].includes(doc) ? 'video-formats' : 'coding-agents');
    units.push({
      id: `${doc}-${String(i + 1).padStart(2, '0')}`,
      document: doc,
      title: b.title,
      start: b.start,
      end,
      text,
      topics: ids,
    });
  });
}
// The personal and compliance subjects are distributed in broad source sections; preserve their explicit relationships.
for (const t of parsed)
  for (const doc of t.documents) {
    const candidates = units.filter(
      (u) =>
        u.document === doc &&
        t.keywords.some((k) => u.text.toLocaleLowerCase('tr').includes(k.toLocaleLowerCase('tr'))),
    );
    for (const u of candidates) if (!u.topics.includes(t.id)) u.topics.push(t.id);
  }
fs.writeFileSync('src/data/coverage.json', JSON.stringify(units, null, 2) + '\n');
console.log(`${topics.length} konu, ${units.length} kaynak bölümü/pasajı`);
