import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const corpus=JSON.parse(fs.readFileSync('src/data/corpus.json','utf8'));
const tools=JSON.parse(fs.readFileSync('src/data/tools.json','utf8'));
const verification=JSON.parse(fs.readFileSync('src/data/verification.json','utf8'));
const base='https://karacaismail.github.io/futuristic/';
let report='# Futuristic — Yapay zekâdan üretim sistemine\n\n';
report+='**Araştırma sentezi · 16 Eylül 2026 · v1.0**\n\n';
report+='AI video üretimi ve yazılım geliştirme için mimari, araç, maliyet, kalite ve uygulama raporu. Altı kaynak belgenin tamamı korunmuştur; bütün iddiaların doğrulandığı ileri sürülmez.\n\n';
report+='## Yönetici özeti\n\n';
report+='En güçlü ortak yatırım, yaratıcı modelleri deterministik yürütme ve açık doğrulama kapılarıyla birleştirmektir. Video için tek formatta insan onaylı bir üretim hattı; yazılım için kabul kriteri, TDD, küçük diff ve ölçülmüş review döngüsüyle başla. Başarıyı üretilen çıktı sayısıyla değil, kabul edilen çıktı başına toplam maliyet, kalite ve insan emeğiyle ölç.\n\n';
report+=`Kapsam: **${corpus.documents.length} özgün belge**, **${corpus.references.length} benzersiz referans**, **${tools.length} araç/teknoloji kartı**, **${verification.length} seçilmiş kritik iddia kontrolü**. Arşiv ${corpus.totalBytes.toLocaleString('tr-TR')} bayttır; ${corpus.opaqueCitations} çözümlenemeyen eski sohbet atıf belirteci orijinallerde korunur.\n\n`;
for(const [id,title] of [['video','1. Video üretimi'],['software','2. Yazılım geliştirme'],['architecture','3. Referans mimari'],['risks','4. Riskler ve boşluklar'],['roadmap','5. Uygulama yol haritası'],['methodology','6. Yöntem ve kapsam']]) {
 const text=fs.readFileSync(`src/content/${id}.md`,'utf8').replace(/^## /gm,'### ').replaceAll('](#/sources?doc=',`](${base}#/sources?doc=`).replace(/\]\(#\/(.*?)\)/g,`](${base}#/$1)`);
 report+=`\n---\n\n## ${title}\n\n${text}\n`;
}
report+='\n## 7. Maliyet modeli\n\n';
report+='Aylık toplam = video sayısı × video başına üretilen saniye × saniye birim fiyatı × kabul başına ortalama deneme + video sayısı × inceleme dakikası / 60 × saatlik insan maliyeti + video sayısı × diğer değişken gider + sabit gider.\n\n';
report+='**Örnek senaryo, güncel teklif değildir:** 100 video/ay, 30 üretilen saniye/video, $0,12/sn, 2 deneme, 5 dakika inceleme/video, $12/saat insan emeği, $0,50 diğer/video ve $50 sabit gider → $720 üretim + $100 insan + $50 diğer + $50 sabit = **$920/ay**. Video başına $9,20; kabul edilen saniye başına üretim $0,24. Deneme sayısı 4 olduğunda toplam $1.640 olur. Vergi ve kur etkisi dahil değildir. [D03 ve D05 sentezi]\n\n';
report+=`[Kendi senaryonu hesapla](${base}#/cost). Self-host karşılaştırmasında GPU kirası, idle kapasite, model lisansı, bakım emeği, disk/egress ve aynı kaliteyi yakalama maliyeti ayrıca hesaba katılır.\n\n`;
report+='## 8. Araç ve teknoloji kataloğu\n\nBu katalog kaynak sentezidir; güncel fiyat veya bağımsız performans sıralaması içermez.\n\n';
for(const category of [...new Set(tools.map(t=>t.category))]){
 report+=`### ${category}\n\n| Araç | Rol ve uygun kullanım | Sınır | Ortam | Kaynak belgeler |\n|---|---|---|---|---|\n`;
 for(const t of tools.filter(t=>t.category===category))report+=`| [${t.name}](${t.url}) | ${t.role}. ${t.fit} | ${t.limitation} | ${t.hosting} | ${t.documents.join(', ')} |\n`;
 report+='\n';
}
report+='## 9. Tarihli doğrulama / düzeltme kaydı\n\n';
for(const v of verification)report+=`### ${v.id} · ${v.title}\n\n**${v.status==='corrected'?'Düzeltildi':'Doğrulandı'} · ${v.checked} · Belgeler: ${v.documents.join(', ')}**\n\n${v.finding} [Birincil kaynak](${v.url})\n\n`;
report+='## 10. Özgün kaynaklar ve kapsam matrisi\n\n';
for(const doc of corpus.documents)report+=`### ${doc.id} · ${doc.title}\n\n${doc.summary}\n\n- [Özgün tam metin](${base}${doc.path})\n- ${doc.bytes} bayt; ${doc.characters} karakter; ${doc.referenceCount} açık referans.\n- SHA-256: \`${doc.sha256}\`\n\n`;
report+=`[Altı belgeyi manifestoyla ZIP indir](${base}sources/arastirma-arsivi.zip).\n\n`;
report+='## 11. Tam referans indeksi\n\nAşağıdaki bağlantılar kaynak belgelerden çıkarılmıştır. Bu liste doğrulama listesi değildir.\n\n';
for(const r of corpus.references)report+=`- **${r.id}** [${r.title}](${r.url}) — ${r.documents.join(', ')}\n`;
fs.writeFileSync('public/rapor.md',report);fs.writeFileSync('docs/REPORT.md',report);
const body=renderToStaticMarkup(React.createElement(ReactMarkdown,{remarkPlugins:[remarkGfm]},report));
const html=`<!doctype html><html lang="tr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Futuristic — Tam araştırma raporu</title><style>body{font:16px/1.8 system-ui,sans-serif;color:#243c2b;max-width:1000px;margin:auto;padding:35px 22px}h1,h2,h3{line-height:1.3;letter-spacing:-.03em}h1{font-size:42px}h2{margin-top:50px;border-top:1px solid #ccd9c6;padding-top:24px}h3{margin-top:30px}a{color:#315d36;overflow-wrap:anywhere}table{border-collapse:collapse;font-size:12px;display:block;overflow:auto}td,th{border:1px solid #d3dfcc;padding:10px;text-align:left;min-width:110px}th{background:#edf3e7}pre{overflow:auto;padding:20px;background:#edf3e7}code{overflow-wrap:anywhere}button{padding:12px 20px;cursor:pointer;background:#294f3b;color:white;border:0;border-radius:7px}nav{display:flex;gap:20px;align-items:center}nav a{font-size:13px}@media print{nav{display:none}body{font-size:10pt;max-width:none}h2{break-before:page}table{display:table;overflow:visible}td,th{font-size:8pt;min-width:0}pre{white-space:pre-wrap}h1{font-size:30pt}a{color:inherit}}</style><nav><button onclick="window.print()">Yazdır / PDF olarak kaydet</button><a href="${base}">Etkileşimli rapora dön</a></nav><main>${body}</main></html>`;
fs.writeFileSync('public/rapor.html',html);
console.log(`Rapor: ${report.length} karakter, ${corpus.references.length} referans, ${tools.length} araç.`);
