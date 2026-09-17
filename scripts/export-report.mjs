import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const corpus = JSON.parse(fs.readFileSync('src/data/corpus.json', 'utf8'));
const tools = JSON.parse(fs.readFileSync('src/data/tools.json', 'utf8'));
const verification = JSON.parse(fs.readFileSync('src/data/verification.json', 'utf8'));
const base = 'https://karacaismail.github.io/futuristic/';
const topics = JSON.parse(fs.readFileSync('src/data/topics.json', 'utf8'));
const claims = JSON.parse(fs.readFileSync('src/data/claims.json', 'utf8'));
const coverage = JSON.parse(fs.readFileSync('src/data/coverage.json', 'utf8'));
const labels = {
  source: 'Kaynak iddiası',
  verified: 'Kontrol edildi',
  corrected: 'Düzeltildi',
  conflict: 'Çelişki var',
  scenario: 'Senaryo',
};
const navigation =
  '[Yönetici özeti](yonetici-ozeti.md) · [Araştırma raporu](rapor.md) · [Tam ekler](rapor-ekleri.md)\n\n';
const scope = `${tools.filter((t) => t.availability.pricing).length} araç kaydında fiyat; ${tools.filter((t) => t.availability.license).length} kayıtta lisans, açık kaynak sınıflandırması veya kullanım koşulu bilgisi var. Bilgi varlığı bağımsız doğrulama değildir. Araştırma raporu uygulama rehberlerini; tam ekler araç verileri, sayısal iddialar ve referans indeksini içerir.`;
let report = '# Futuristic — Yapay zekâdan üretim sistemine\n\n';
report += '**Araştırma raporu · 17 Eylül 2026 · v2.1**\n\n';
report +=
  'AI video üretimi ve yazılım geliştirme için mimari, araç, maliyet, kalite ve uygulama raporu. Altı kaynak belgenin tamamı korunmuştur; bütün iddiaların doğrulandığı ileri sürülmez.\n\n';
report += navigation;
report += '## Okuma kılavuzu\n\n';
report +=
  'En güçlü ortak yatırım, yaratıcı modelleri deterministik yürütme ve açık doğrulama kapılarıyla birleştirmektir. Video için tek formatta insan onaylı bir üretim hattı; yazılım için kabul kriteri, TDD, küçük diff ve ölçülmüş review döngüsüyle başla. Başarıyı üretilen çıktı sayısıyla değil, kabul edilen çıktı başına toplam maliyet, kalite ve insan emeğiyle ölç.\n\n';
report += `Kapsam: **${corpus.documents.length} özgün belge**, **${corpus.references.length} benzersiz referans**, **${tools.length} araç/teknoloji kartı**, **${verification.length} seçilmiş kritik iddia kontrolü**. Arşiv ${corpus.totalBytes.toLocaleString('tr-TR')} bayttır; ${corpus.opaqueCitations} çözümlenemeyen eski sohbet atıf belirteci orijinallerde korunur.\n\n`;
report += scope + '\n\n';
for (const [id, title] of [
  ['video', '1. Video üretimi'],
  ['software', '2. Yazılım geliştirme'],
  ['architecture', '3. Referans mimari'],
  ['risks', '4. Riskler ve boşluklar'],
  ['roadmap', '5. Uygulama yol haritası'],
  ['methodology', '6. Yöntem ve kapsam'],
]) {
  const text = fs
    .readFileSync(`src/content/${id}.md`, 'utf8')
    .replace(/^## /gm, '### ')
    .replaceAll('](#/sources?doc=', `](${base}#/sources?doc=`)
    .replace(/\]\(#\/(.*?)\)/g, `](${base}#/$1)`);
  report += `\n---\n\n## ${title}\n\n${text}\n`;
}
report += '\n## 7. Maliyet modeli\n\n';
report +=
  'Aylık toplam = video sayısı × video başına üretilen saniye × saniye birim fiyatı × kabul başına ortalama deneme + video sayısı × inceleme dakikası / 60 × saatlik insan maliyeti + video sayısı × diğer değişken gider + sabit gider.\n\n';
report +=
  '**Örnek senaryo, güncel teklif değildir:** 100 video/ay, 30 üretilen saniye/video, $0,12/sn, 2 deneme, 5 dakika inceleme/video, $12/saat insan emeği, $0,50 diğer/video ve $50 sabit gider → $720 üretim + $100 insan + $50 diğer + $50 sabit = **$920/ay**. Video başına $9,20; kabul edilen saniye başına üretim $0,24. Deneme sayısı 4 olduğunda toplam $1.640 olur. Vergi ve kur etkisi dahil değildir. [D03 ve D05 sentezi]\n\n';
report += `[Kendi senaryonu hesapla](${base}#/cost). Self-host karşılaştırmasında GPU kirası, idle kapasite, model lisansı, bakım emeği, disk/egress ve aynı kaliteyi yakalama maliyeti ayrıca hesaba katılır.\n\n`;
report += '\n## 8. Ayrıntılı uygulama rehberi\n\n';
for (const topic of topics)
  report += `### ${topic.title}\n\n**${topic.documents.join(', ')} · ${topic.category}**\n\n${fs.readFileSync(`src/content/guide/${topic.id}.md`, 'utf8').replace(/^### /gm, '##### ').replace(/^## /gm, '#### ')}\n\n`;
let appendix =
  '# Futuristic — Tam veri ve kaynak ekleri\n\n**17 Eylül 2026 · v2.1**\n\n' +
  navigation +
  scope +
  '\n\n';
appendix +=
  '## A. Katalog okuma anahtarı\n\nEksik fiyat ücretsiz anlamına gelmez. Kod lisansı, model ağırlığı, medya hakkı ve hizmet sözleşmesi ayrı konulardır. Kaynakta bulunmayan alanlar aşağıdaki dökümde doldurulmaz; sitede eksikliği açıkça gösterilir. Tarihli kaynak bilgisi ürün garantisi değildir.\n\nOrtak çalışma desenleri editoryal sentezdir, araçların yerleşik özellikleri olarak sayılmaz. Genel entegrasyon ilkesi: domain sözleşmesi, credential, job durumu, retry ve onayı sağlayıcı adaptöründen bağımsız tasarla. Seçim ölçütü: mevcut stack’teki somut açığı ilgili rehberin kabul testleriyle ölç. Bu genel ilkeler her araç için tekrarlanmaz.\n\n';
const workflows = [...new Set(tools.map((t) => t.workflow))];
for (const [i, workflow] of workflows.entries()) appendix += `- **W${i + 1}:** ${workflow}\n`;
appendix += '\n## B. Araç ve teknoloji kayıtları\n\n';
const fields = [
  ['pricing', 'Fiyat ve birim'],
  ['license', 'Lisans / haklar / sınıflandırma'],
  ['limits', 'Sınırlar'],
  ['maturity', 'Olgunluk değerlendirmesi'],
  ['integration', 'Entegrasyon'],
];
for (const t of tools) {
  appendix += `### ${t.id} · ${t.name}\n\n**${t.category} · ${t.hosting} · ${t.documents.join(', ')}**\n\n${t.role}${t.role.endsWith('.') ? '' : '.'} ${t.fit === t.role ? '' : t.fit}\n\n`;
  for (const [key, label] of fields)
    if (t.availability[key]) appendix += `- **${label}:** ${t[key]}\n`;
  if (
    !t.decision.includes('rehberindeki kabul ölçütleriyle') &&
    !t.decision.startsWith('Mevcut stack’in')
  )
    appendix += `- **Editoryal seçim notu:** ${t.decision}\n`;
  appendix += `- **Ortak desen:** W${workflows.indexOf(t.workflow) + 1}\n\n[Uygulama rehberi](${base}#/guide?topic=${t.topic}) · [Kaynak pasajı ve eksik alanlar](${base}#/tools?tool=${t.id})${t.url ? ` · [Araç bağlantısı](${t.url})` : ''}\n\n`;
}
appendix += '## C. Tarihli doğrulama / düzeltme kaydı\n\n';
for (const v of verification)
  appendix += `### ${v.id} · ${v.title}\n\n**${v.status === 'corrected' ? 'Düzeltildi' : 'Doğrulandı'} · ${v.checked} · Belgeler: ${v.documents.join(', ')}**\n\n${v.finding} [Birincil kaynak](${v.url})\n\n`;
appendix += '## D. Özgün kaynaklar ve kapsam matrisi\n\n';
for (const doc of corpus.documents)
  appendix += `### ${doc.id} · ${doc.title}\n\n${doc.summary}\n\n- [Özgün tam metin](${base}${doc.path})\n- ${doc.bytes} bayt; ${doc.characters} karakter; ${doc.referenceCount} açık referans.\n- SHA-256: \`${doc.sha256}\`\n\n`;
appendix += `[Altı belgeyi manifestoyla ZIP indir](${base}sources/arastirma-arsivi.zip).\n\n`;
appendix +=
  '## E. Tam referans indeksi\n\nAşağıdaki bağlantılar kaynak belgelerden çıkarılmıştır. Bu liste doğrulama listesi değildir.\n\n';
for (const r of corpus.references)
  appendix += `- **${r.id}** [${r.title}](${r.url}) — ${r.documents.join(', ')}\n`;
appendix += '\n## F. Sayısal iddia ve varsayım defteri\n\n';
for (const c of claims)
  appendix += `### ${c.title}\n\n**${labels[c.status]} · ${c.documents.join(', ')}**\n\n**Kaynak:** ${c.statement}\n\n**Değerlendirme:** ${c.assessment}\n\n[Uygulama bağlamı](${base}#/guide?topic=${c.topic})${c.url ? ` · [Birincil kontrol kaynağı](${c.url})` : ''}\n\n`;
appendix +=
  '\n## G. Kaynak bölümlerinden konuya kapsam haritası\n\nBu indeks kaynakla açıklama arasındaki izi gösterir; eşleşme, iddianın doğruluk veya tamlık sertifikası değildir. D01/D02 başlıkları kayıp olduğundan cümle sınırlarında okuma pasajlarına ayrıldı.\n\n';
for (const unit of coverage)
  appendix += `- **${unit.id}** (${unit.start}–${unit.end}): ${unit.title.replaceAll('\n', ' ')} — [Kapsam haritası](${base}#/coverage?doc=${unit.document})\n`;
const executive =
  '# Futuristic — Yönetici özeti\n\n**17 Eylül 2026 · v2.1**\n\n' +
  navigation +
  fs.readFileSync('src/content/executive.md', 'utf8') +
  '\n\n**Kayıt kapsamı:** ' +
  scope +
  '\n';
const css = fs.readFileSync('scripts/report.css', 'utf8');
for (const [slug, title, doc, text] of [
  ['rapor', 'Araştırma raporu', 'REPORT', report],
  ['rapor-ekleri', 'Tam veri ve kaynak ekleri', 'APPENDIX', appendix],
  ['yonetici-ozeti', 'Yönetici özeti', 'EXECUTIVE', executive],
]) {
  const markdown = text.replace(/\]\(#\/(.*?)\)/g, `](${base}#/$1)`).trimEnd() + '\n';
  fs.writeFileSync(`public/${slug}.md`, markdown);
  fs.writeFileSync(
    `docs/${doc}.md`,
    markdown.replace(
      /\]\((rapor|rapor-ekleri|yonetici-ozeti)\.md\)/g,
      (_, name) =>
        `](${{ rapor: 'REPORT', 'rapor-ekleri': 'APPENDIX', 'yonetici-ozeti': 'EXECUTIVE' }[name]}.md)`,
    ),
  );
  const htmlText = markdown.replace(/\]\((rapor|rapor-ekleri|yonetici-ozeti)\.md\)/g, ']($1.html)');
  const body = renderToStaticMarkup(
    React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, htmlText),
  );
  fs.writeFileSync(
    `public/${slug}.html`,
    `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Futuristic — ${title}</title><style>${css}</style></head><body><nav><button onclick="window.print()">Yazdır / PDF olarak kaydet</button><a href="${base}">Etkileşimli rapora dön</a></nav><main>${body}</main></body></html>`,
  );
  console.log(`${slug}: ${markdown.split(/\s+/).length} sözcük`);
}
