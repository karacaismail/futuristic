from pathlib import Path
import re, json, hashlib, zipfile
ROOT=Path(__file__).resolve().parents[1]
SOURCES=[
 ('Video otomasyonu: mimari ve risk analizi','video','Ajansal prodüksiyon, Remotion/FFmpeg, n8n, yayınlama, kalite ve provenans.'),
 ('AI ile yazılım: mimari ve üretkenlik','software','METR, DORA, SDD, bağlam, prompt caching, MCP, yerel modeller ve kalite.'),
 ('Uçtan uca video: araçlar ve referans mimari','video','Sağlayıcı envanteri, timeline sözleşmeleri, platform API’leri ve operasyon modeli.'),
 ('AI geliştirme: 2023–2026 uygulama rehberi','software','Araç ve repo karşılaştırması, doğrulama döngüsü, ROI, yönetişim ve pilot.'),
 ('Video içerik hattı: pragmatik saha rehberi','video','Beş üretim yaklaşımı, B2B senaryoları, self-host, OpenClaw, müzik ve platformlar.'),
 ('Yazılım ajanları: karar odaklı rehber','software','Worktree, AGENTS.md, Spec Kit, MCP, test, model serving ve GPU ekonomisi.'),
]
metadata=[]; references={}; occurrences=0
for n,(title,topic,summary) in enumerate(SOURCES,1):
 id=f'D{n:02}'
 dest=ROOT/'public/sources'/f'{id}.txt'
 if not dest.exists(): raise FileNotFoundError(f'Özgün belge eksik: {dest}')
 raw=dest.read_bytes(); body=raw.decode()
 # URLs with or without a scheme; preserve the path, don't turn opaque citation tokens into URLs.
 pattern=r'(?:https?://)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:/[^\s<>\[\](){}\uE200-\uF8FF"“”]*)?'
 candidates=[]
 scan=body.replace('fal.ai/RunPod/self','fal.ai').replace('fal.ai/Replicate','fal.ai').replace('Make.com/Zapier','Make.com').replace('anthropic.com/openai.com','anthropic.com openai.com')
 for m in re.finditer(pattern,scan):
  value=m.group().rstrip('.,;:—')
  if value.lower().endswith(('.md','.json','.toml','.yaml','.py','.tsx','.js','.ts','.sh')) and '/' not in value: continue
  if '.' not in value: continue
  if not value.startswith(('http://','https://')) and not re.match(r'^(?:[a-zA-Z0-9-]+\.)+(?:com|org|net|io|ai|dev|app|eu|co|pro|cloud)(?:/|$)',value,re.I): continue
  url=value if value.startswith(('http://','https://')) else 'https://'+value
  candidates.append((url,m.start()))
 # Bare GitHub owner/repo references in D06's explicit repository list.
 if id=='D06':
  for match in re.finditer(r'\*\*([\w.-]+/[\w.-]+)\*\*',body): candidates.append(('https://github.com/'+match.group(1),match.start()))
 for match in re.finditer(r'arXiv(?:\s*:\s*|\s+)([0-9]{4}\.[0-9]{4,5})',body,re.I): candidates.append(('https://arxiv.org/abs/'+match.group(1),match.start()))
 if id=='D05': candidates.append(('https://github.com/RayVentura/ShortGPT',body.index('RayVentura/ShortGPT')))
 urls=[]
 for url,pos in candidates:
  occurrences+=1
  key=url.rstrip('/')
  if key not in references: references[key]={'id':'','url':url,'title':re.sub(r'^https?://','',url),'documents':[], 'mentions':0,'status':'imported'}
  ref=references[key]; ref['mentions']+=1
  if id not in ref['documents']: ref['documents'].append(id)
  if key not in urls: urls.append(key)
 opaque=re.findall(r'cite(.*?)',body)
 metadata.append({'id':id,'title':title,'topic':topic,'summary':summary,'path':f'sources/{id}.txt','bytes':len(raw),'characters':len(body),'sha256':hashlib.sha256(raw).hexdigest(),'referenceCount':len(urls),'opaqueCitations':len(opaque)})
for n,r in enumerate(references.values(),1): r['id']=f'R{n:03}'
data={'documents':metadata,'references':list(references.values()),'totalBytes':sum(x['bytes'] for x in metadata),'referenceOccurrences':occurrences,'opaqueCitations':sum(x['opaqueCitations'] for x in metadata)}
(ROOT/'src/data/corpus.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
(ROOT/'public/sources/manifest.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
with zipfile.ZipFile(ROOT/'public/sources/arastirma-arsivi.zip','w',zipfile.ZIP_DEFLATED) as z:
 for m in metadata: z.write(ROOT/'public'/m['path'],f"{m['id']}.txt")
 z.write(ROOT/'public/sources/manifest.json','manifest.json')
print(json.dumps({'documents':len(metadata),'references':len(references),'mentions':occurrences,'opaqueCitations':data['opaqueCitations'],'bytes':data['totalBytes']},ensure_ascii=False))
