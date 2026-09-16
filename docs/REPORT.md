# Futuristic — Yapay zekâdan üretim sistemine

**Araştırma sentezi · 16 Eylül 2026 · v1.0**

AI video üretimi ve yazılım geliştirme için mimari, araç, maliyet, kalite ve uygulama raporu. Altı kaynak belgenin tamamı korunmuştur; bütün iddiaların doğrulandığı ileri sürülmez.

## Yönetici özeti

En güçlü ortak yatırım, yaratıcı modelleri deterministik yürütme ve açık doğrulama kapılarıyla birleştirmektir. Video için tek formatta insan onaylı bir üretim hattı; yazılım için kabul kriteri, TDD, küçük diff ve ölçülmüş review döngüsüyle başla. Başarıyı üretilen çıktı sayısıyla değil, kabul edilen çıktı başına toplam maliyet, kalite ve insan emeğiyle ölç.

Kapsam: **6 özgün belge**, **112 benzersiz referans**, **55 araç/teknoloji kartı**, **11 seçilmiş kritik iddia kontrolü**. Arşiv 263.605 bayttır; 209 çözümlenemeyen eski sohbet atıf belirteci orijinallerde korunur.


---

## 1. Video üretimi

### Karar: önce tek bir formatı uçtan uca çalıştır

Başlangıç için önerimiz, **30 saniyelik Türkçe bir B2B ürün anlatımı**: onaylı ürün bilgisi → senaryo → referans görseller → ses → altyazı → deterministik kurgu → önizleme → onay → tek platformda yayın. Bu bir tasarım önerisidir; gelir veya teslimat süresi garantisi değildir. Video kaynakları aynı noktada birleşiyor: üretim bileşenleri güçlü olsa da bütün zincirin güvenilirliği ayrı bir mühendislik işi. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)

İlk pilotta bir LLM, karşılaştırılan iki Türkçe ses sağlayıcısından biri ve tek render motoru yeterli. Ürün için onaylı görselleri kullan; jeneratif videoyu yalnızca anlatıya değer katan sahnelere ekle. Yayın hesabı ve uygulama izinlerini yaratıcı üretimle eşzamanlı hazırla.

### Beş üretim yaklaşımı

| Yaklaşım | En uygun kullanım | Sınırı | Pilot kararı |
|---|---|---|---|
| Stok + ses + altyazı | Basit açıklayıcı, düşük maliyetli kısa video | Anahtar kelimeye göre stok eşleşmesi anlatıyı kaçırabilir | Özgün analiz ve editoryal kontrolle dene |
| Avatar / sunucu | Eğitim, onboarding, B2B anlatım, lokalizasyon | Rıza, Türkçe telaffuz ve dudak uyumu | Gerçek izleyiciyle kör değerlendirme |
| Jeneratif sahneler | Ürün atmosferi, sinematik B-roll, kampanya | Sahne tutarlılığı, tekrar üretim maliyeti | Onaylı görselden kısa sahneler üret |
| Uzun içerikten kısa video | Webinar, podcast, mevcut demo | Kaynak materyal ve bağlamın korunması gerekir | Kaynak içerik varsa ilk aday |
| Programatik kurgu | Marka şablonu, ürün kataloğu, veri grafikleri | Yaratıcı varlıkları kendisi üretmez | Üretim hattının ortak temeli |

MoneyPrinterTurbo ve ShortGPT hızlı stok tabanlı başlangıç sağlar. OpenMontage kaynaklarda daha ajansal prodüksiyon örneği olarak sunuluyor; araç/skill sayıları ve olgunluk iddiaları bağımsız doğrulanmadı. Bir projeyi üretime alırken lisansı, güncelliği, kimlik doğrulaması ve bağımlılıkları ayrıca incele. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)

### Üretim hattının kalbi: timeline ve varlık manifestosu

Videonun esas kaydı yalnızca son MP4 olmamalı. Brief, senaryo sürümü, sahne kimliği, referans görsel, üretim denemeleri, ses, altyazı zamanları, timeline, onay ve platform gönderi kimliği birlikte tutulmalı. Sağlayıcı değiştiğinde bu kayıt korunur. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03)

**Şablonla başla:** Creatomate, Shotstack veya JSON2Video hızlı bir ilk hat için adaydır. React ile karmaşık grafik ve marka animasyonu gerekiyorsa Remotion; encode, mux, ölçekleme, ses ve teknik kontroller için FFmpeg değerlendir. Remotion’ın kaynak erişimi, MIT lisansı anlamına gelmez; şirket kullanımını lisans koşulları belirler. [Resmî lisans](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)

Sesi sahne sürelerinden bağımsız üretip sonradan rastgele sıkıştırma. Telaffuz sözlüğünü sürümle; Türkçe ürün adları, sayılar, kısaltmalar ve yabancı isimlerle test et. ASR/forced alignment çıktısını altyazıya dönüştür; satır uzunluğu, güvenli alan, okuma hızı ve son sözcüğün kesilmemesini kontrol et. Google TTS, ElevenLabs, Whisper/Scribe ve diğerleri kaynakların aday havuzudur; “Türkçede en iyi” kararı bu raporda ölçülmüş değildir. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)

### Yayınlamak da bir durum makinesi

YouTube, TikTok, Instagram/Facebook ve LinkedIn için ayrı adaptör kullan. Ortak arayüz; gönderim, durum sorgusu, token yenileme, hata sınıflandırma ve sonuç kaydını kapsasın. HTTP 200, videonun herkese açık olarak yayında olduğunu kanıtlamaz. Processing ve moderasyon durumunu izle. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03)

| Platform | Tasarımda korunacak ayrım | Doğrulama |
|---|---|---|
| YouTube | Proje kotası, kanal sınırı ve audit ayrı konular | Güncel tabloda videos.insert için 100 çağrı/gün; eski 1.600 birim hesabını kullanma |
| TikTok | Creator bilgisi, kullanıcı onayı, görünürlük, audit | Denetlenmemiş istemciler private ile sınırlı; init için token başına 6 istek/dk |
| Instagram | Container → processing → publish; login yolu ve scope | 90 saniye evrensel API sınırı değil; Meta örneği 3 sn–15 dk |
| LinkedIn | Medya upload ile post oluşturma farklı işlemler | Organizasyon/üye izinlerini ve kullanılan sürümü hesap üzerinde sınama |

[YouTube kota tablosu](https://developers.google.com/youtube/v3/determine_quota_cost) · [TikTok Direct Post](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post) · [Meta örneği](https://github.com/fbsamples/reels_publishing_apis/blob/main/insta_reels_publishing_api_sample/README.md)

Postiz, Blotato, Upload-Post ve Ayrshare ortak yayın katmanı adaylarıdır. Üçüncü taraf kullanmak hesap yetkilendirmesini, içerik sorumluluğunu veya tüm platform kısıtlarını ortadan kaldırmaz. Kaynaklardaki fiyat/plan ve denetim iddialarını sözleşme öncesi yeniden teyit et. [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)

### İki onay, dört kalite kontrolü

Senaryo onayı pahalı üretimden önce; final video onayı yayından önce gelir. Onay video sürümü ve hash’iyle eşleşmelidir. Onaydan sonra değişen çıktı tekrar incelenir.

- **Teknik:** codec, fps, oran, süre, bozuk kare, ses clipping ve sessizlik.
- **Anlamsal:** anlatılan ürün, sayı, vaat, görüntü ve senaryo uyumu.
- **Marka:** logo, yazı tipi, telaffuz, CTA, ton ve güvenli alan.
- **Haklar:** görsel/müzik lisansı, ses/yüz kullanımı, AI bildirimi ve platform koşulları.

Çok sahneli kimlik tutarlılığı, uzun videoda anlatı ritmi, yaratıcı renk düzenleme, beat-matching ve Türkçe avatar değerlendirmesi açık kalan kalite alanlarıdır. Teknik olarak tamamlanan üretimi otomatik olarak kabul edilmiş sayma. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)

### Başarı nasıl ölçülür?

Kabul edilen saniye başına tüm üretim harcaması, insan düzeltme süresi, ret oranı, p50/p95 iş süresi ve başarılı yayın oranı temel operasyon metrikleridir. İçerik etkisini izlenme süresi, tutulma, tıklama ve ürün dönüşümüyle ayrıca değerlendir. “Ayda şu kadar gelir” veya sabit bir RPM, bu kaynaklardan güvenilir iş sonucu olarak çıkarılamaz.


---

## 2. Yazılım geliştirme

### Karar: ajanı doğrulanabilir işlerle başlat

Birincil yatırım, tek bir modele bağlanmak yerine **spesifikasyon → başarısız test → küçük değişiklik → doğrulama → inceleme** döngüsünü kurmaktır. İlk görevler; bir bug’ın regresyon testi, API değiştirmeyen refactor, dokümantasyon ve sınırlı bağımlılık güncellemesi olabilir. İşin bitişi “ajan tamamladım dedi” değil, kabul kriterlerinin geçtiği kanıttır. [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)

### Bir model ile bir ajan aynı şey değil

Model akıl yürütür ve çıktı üretir. Ajan; modele repo araması, dosya düzenleme, terminal, tarayıcı, test ve tekrar deneme döngüsü sağlar. Kodlama ortamı bu araçların izinlerini ve çalışma alanını belirler. Orkestratör görevleri koordine eder. Bu katmanları bir ürün sıralamasında karıştırmak yanlış satın alma kararına yol açar.

| Katman | Kaynaklardaki örnekler | Seçim sorusu |
|---|---|---|
| IDE / CLI ajanı | Codex, Claude Code, Cursor, Copilot, Aider, Cline | Kendi repo görevlerinde doğru değişiklik yapabiliyor mu? |
| İzole ajan ortamı | OpenHands, worktree, container/VM | Dosya ayrımı mı gerekiyor, güvenlik izolasyonu mu? |
| Spec / bağlam | AGENTS.md, Spec Kit, ADR, alan sözlüğü | Komutlar, sınırlar ve done kriteri açık mı? |
| Test ve review | Playwright, CodeRabbit, Qodo, Copilot review | Gerçek hatayı yakalıyor mu, inceleme yükünü azaltıyor mu? |
| Deterministik güvenlik | Semgrep, CodeQL, dependency/secret scan | Kritik bulgu build’i durduruyor mu? |
| Model serving | vLLM, SGLang, MLX, llama.cpp/Ollama | Gerçek eşzamanlı yükte kalite, gecikme ve maliyet ne? |
| RAG / uygulama framework’ü | LlamaIndex, Haystack, LangGraph | Repo dışı bilgi veya kalıcı dallanan iş akışı gerekiyor mu? |

Worktree ayrı checkout sağlar; host dosyalarına veya ağa erişimi engelleyen bir sandbox değildir. Üretim verisi ve güçlü araç erişimi varsa container/VM, dar kapsamlı kimlik bilgileri ve ayrı işlem yetkileri gerekir. [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)

### TDD, ajan için çalıştırılabilir sözleşme

1. Beklenen davranışı, sınır durumlarını ve korunacak mevcut davranışı yaz.
2. Testi çalıştır; doğru nedenle başarısız olduğunu kaydet.
3. Testi geçiren en küçük üretim değişikliğini yap.
4. İlgili testleri, tip kontrolünü ve mevcut kritik akışları çalıştır.
5. Refactor et; aynı testleri tekrar geçir. Testi silerek veya assertion’ı gevşeterek başarı elde etme.
6. Değişiklik, test kanıtı ve kalan belirsizlikleri incelemeye sun.

Birim testleri hesap ve iş kuralını; entegrasyon testleri sınırları; tarayıcı testleri gerçek kullanıcı akışını doğrular. Ekran görüntüsü veya bir MCP tarayıcı oturumu, kalıcı bir E2E testi yerine geçmez. Playwright gözlemini sabit locator ve assertion içeren teste dönüştür. [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)

Bu portalda da ilk davranış testleri uygulamadan önce yazıldı: Türkçe arama, yeniden üretimi içeren maliyet modeli, yerel kayıt dayanıklılığı, kaynak bütünlüğü ve mobil/masaüstü okuma akışları.

### Bağlamı küçük ve işe yarar tut

AGENTS.md içinde gerçek kurulum/test komutları, modül sınırları, mevcut konvansiyonlar ve tamamlanma kriterleri olsun. Yaşayan mimari kararlarını ADR’lerde, alan terimlerini sözlükte sakla. Araçların kendi talimat dosyası desteğini sürüme göre teyit et. Kaynaklardaki “ne kadar çok bağlam o kadar iyi” varsayımı desteklenmiyor. [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)

Prompt caching; sağlayıcıya, eşleşen prefix’e, token eşiğine ve TTL’e bağlıdır. Statik içerikleri başta, değişken görev verisini sonda tutmak bir optimizasyon adaydır. Tek dosyadaki bir karakterin her durumda bütün önbelleği yok ettiği veya her istekte %90 indirim sağlandığı söylenemez. Cache hit ve gerçek faturayı ölç.

### MCP ve RAG: farklı ihtiyaçlar

MCP dış araç ve verilere erişimi standartlaştırır; RAG ilgili bilgiyi getirir. PostgreSQL şemasını okumak, issue almak ve tarayıcı testi yapmak araç erişimidir. Repo dışı iş kuralları, runbook ve müşteri dokümantasyonu ise bilgi getirmeyi gerektirebilir. Her repo için vektör veritabanı kurmak zorunlu değildir. [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04)

Başlangıçta GitHub, güncel dokümantasyon ve Playwright gibi birkaç gerekli entegrasyon seç. Dönen veriyi talimat kabul etme; tool izinleri, kimlik, log ve veri çıkışını kontrol et. MCP kendi başına güvenlik garantisi vermez. Uzak taşıma için Streamable HTTP güncel temel; eski HTTP+SSE örneklerini sürümünü bilmeden kopyalama. [MCP transport spesifikasyonu](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports)

### Daha çok kod, daha yüksek üretkenlik anlamına gelmez

METR’nin 2025 deneyinde kendi olgun projelerinde çalışan 16 geliştirici, 246 görevde AI ile ortalama %19 daha uzun süre harcadı. Bu, belirli bir örneklem ve araç döneminin sonucu. 2026 takip yazısı seçim etkilerinin güncel hızlanma büyüklüğünü güvenilir ölçmeyi zorlaştırdığını söylüyor. Dolayısıyla iki sonuçtan da evrensel bir “AI hız oranı” türetmiyoruz. [2025 çalışma](https://arxiv.org/abs/2507.09089) · [2026 yöntem güncellemesi](https://metr.org/blog/2026-02-24-uplift-update/)

DORA’nın 2025 bulgusu, AI’ın mevcut organizasyonel kapasiteyi büyütmesi: test ve teslimat darboğazları çözülmeden daha fazla üretim aynı ölçüde daha fazla değer yaratmayabilir. [DORA raporu](https://dora.dev/research/2025/dora-report/)

**2–4 haftalık baz ölçüm** ve benzer görevlerle pilot öneriyoruz. PR cycle time, review süresi, escaped defect, change failure rate, mühendislik saati ve kabul edilen görev başına maliyeti birlikte izle. Kod satırı miktarını başarı KPI’ı yapma. GitClear, SWE-bench ve vendor benchmark sayıları kaynaklarda korunuyor; farklı görev/harness/sürüm sonuçlarını doğrudan sıralamaya dönüştürmüyoruz. [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04)

### Yerel model kararı: önce iş yükünü ölç

Açık ağırlık, ücretsiz işletim veya sınırsız ticari kullanım demek değildir. Model lisansı, runtime lisansı ve eğitim/veri koşulları farklıdır. VRAM hesabına ağırlıklar, KV cache, context uzunluğu, batching ve concurrency dahil edilir. MoE’nin aktif parametre sayısı, bütün modelin belleğe sığdığı anlamına gelmez.

Kaynakların 15 eşzamanlı ajan, 128 GB Mac ve Hetzner GPU senaryolarını kapasite hipotezi olarak kullan. Evrensel “150 milyon tokenda self-host kazanır” eşiği vermiyoruz. Gerçek token giriş/çıkış oranı, cache, kabul edilen görev kalitesi, bekleme süresi, GPU kullanım oranı ve bakım emeğiyle 30 günlük karşılaştırma yap. [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)

Python için Ruff + bir tip kontrolcü + pytest; React/TypeScript için formatter/linter + TypeScript + Vitest + Playwright tutarlı bir geri bildirim hattıdır. Mevcut projedeki mypy eklentileri veya lint kuralları korunmalı; sırf yeni olduğu için araç geçişi yapılmamalı.


---

## 3. Referans mimari

### Ortak tasarım: olasılıksal karar, deterministik yürütme

Video üretimi ile yazılım geliştirme aynı kontrol sorununu paylaşır: modelin yaratıcılığı yararlı, sonucu ise doğrulanmaya muhtaçtır. Ajan bir sahne veya kod değişikliği önerir; sözleşmeler, durum kayıtları, test ve insan incelemesi bu öneriyi teslim edilebilir çıktıya dönüştürür. Bu ortak mimari, altı belgenin birlikte değerlendirilmesinden çıkan sentezdir. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)

### Video alan modeli

```text
Campaign → ContentJob
  ├─ ScriptVersion → StoryboardVersion → Scene
  │                                   └─ GenerationAttempt
  ├─ Asset + rights + checksum
  ├─ TimelineVersion → Render → QCResult
  ├─ Approval (artifact hash + actor + time)
  └─ Publication (platform + state + post id)
                   └─ AnalyticsSnapshot
```

Provider payload’ları yalnızca adaptörde yaşar. Çekirdek sözleşme, sağlayıcı kapandığında veya model değiştiğinde sabit kalır. `content_id`, `scene_id`, model sürümü, prompt hash’i ve varlık checksum’ı her adımdan izlenebilir olmalı. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03)

```json
{
  "content_id": "demo-001",
  "version": 1,
  "language": "tr-TR",
  "target": "shorts_9x16",
  "state": "AWAITING_SCRIPT_APPROVAL",
  "idempotency_key": "demo-001:v1:youtube",
  "budget_limit": 20,
  "currency": "USD"
}
```

Bu payload bir tasarım örneğidir; çalışan bir API veya gerçek iş kaydı değildir.

### Dayanıklılık: sadece retry eklemek yetmez

- **İdempotency:** aynı içerik sürümü + platform için unique kayıt tut; timeout sonrasında yeni upload’dan önce eski gönderimin durumunu sorgula.
- **Durum kalıcılığı:** vendor job ID’sini beklemeye geçmeden kaydet; işlem yeniden başladığında kaldığı noktadan devam et.
- **Callback güvenliği:** imzayı doğrula, zaman penceresi ve replay kontrolü uygula; tekrar veya sırasız gelen event’leri yönet.
- **Retry bütçesi:** 429/5xx için sınırlı backoff + jitter; `Retry-After` varsa dikkate al. Yetki/policy hatalarını körlemesine tekrar etme.
- **Circuit breaker:** hata eşiğinde sağlayıcı çağrılarını durdur; kontrollü probe ile toparlanmayı sınama. Her hata doğrudan DLQ’ya gönderilmek zorunda değil.
- **Kurtarma kuyruğu:** yeniden deneme bütçesi tükenen veya müdahale isteyen işleri sebebiyle kaydet; tekrar başlatma maliyetini görünür kıl.
- **Dosya ömrü:** imzalı URL’nin süresi provider’ın indirme süresini kapsasın. Kopyayı ve hash’i kontrol edilen depoda sakla.

Üretim timeout’u yeni faturalı deneme başlatmakla aynı şey değildir. Önce sağlayıcının eski job’ının akıbetini uzlaştır. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03)

### Orkestrasyon seçenekleri

| Seçenek | Ne zaman değerli? | Operasyonel bedel |
|---|---|---|
| n8n | Webhook, HTTP, DB, onay ve iş sistemi entegrasyonları | Queue/concurrency, secrets, yükseltme ve hata yönetimi |
| Make / Zapier | Teknik olmayan ekibin dar kapsamlı otomasyonu | İşlem bazlı maliyet, plan sınırları ve dışa taşıma |
| Temporal | Uzun süren, yeniden başlayabilen, kritik iş akışı | Workflow determinismi ve yeni altyapı |
| Container workers | FFmpeg/Remotion render | Kaynak sınırı, job izolasyonu ve ölçekleme |
| ComfyUI + GPU worker | Gizlilik veya ölçülmüş yüksek hacimli üretim | Model lisansı, VRAM, cold start ve kapasite |
| OpenClaw / ajan SDK | Araştırma, triage, öneri ve mesajlaşma | Tool izinleri ve dış içerik güvenliği |

n8n akışı yürütür; ajan sınırlı karar verir; insan yüksek etkili sonucu onaylar. OpenClaw, LangGraph veya CrewAI gereksinim olmadan eklenirse yönetilecek yeni bir sistem oluşturur. n8n’in fair-code lisansını da dağıtım/ticari kullanım modeliyle birlikte değerlendir. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)

### Kodlama hattı

Issue + kabul kriterleri → izole branch/çalışma alanı → başarısız test → uygulama → lint/typecheck/tests → güvenlik taraması → diff incelemesi → PR → inceleme/merge → sürüm izleme.

Sentry/Datadog/Grafana kayıtlarından gelen hata bağlamı bu döngüye beslenebilir. Ajanın hipoteziyle log kanıtını ayır. Production telemetry salt okunur olmalı; hassas veriler maskelenmeli. Güvenlik tarayıcısı bulgusunu düzelten ajan, tarayıcıyı ve regresyon testini yeniden çalıştırmalıdır. [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)

### Saklama ve gözlemlenebilirlik

`raw`, `work`, `master`, `delivery` alanlarını ayrı lifecycle kurallarıyla tut. Ara çıktı büyümesi final MP4’ten çok daha yüksek olabilir. Kaynaklardaki 100 video × 200 MB = 20 GB/gün hesabı yalnızca final dosyalar için örnektir; varyant, yedek ve egress dahil değildir. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03)

İzlenecek olaylar: bekleyen işler, callback timeout, 429 oranı, token süresi, kalite reddi, tekrar harcaması, render belleği, yayın görünürlüğü, insan onay süresi. Uzun ömürlü render süreçleri yerine kaynak limitli ayrı işler arıza alanını küçültür; kaynaklardaki bütün bellek problemlerini tek başına FFmpeg’e atfetmek doğru değildir.


---

## 4. Riskler ve boşluklar

### Kritik ayrım: belgede geçmesi, doğrulanmış olması değil

Altı kaynak birbirini destekleyen mimari öneriler yanında çelişkili fiyat, tarih, limit ve benchmark iddiaları da içeriyor. Kaynak kütüphanesinde orijinal metinler değiştirilmeden saklandı. Bu rapor ise **doğrulanmış bilgi**, **düzeltilmiş iddia**, **kaynak aktarımı** ve **tasarım önerisini** birbirinden ayırıyor.

### Öncelikli risk kaydı

| Risk | Erken sinyal | Kontrol | Sorumlu rol |
|---|---|---|---|
| Sahne / ürün tutarsızlığı | Yüksek insan ret oranı | Onaylı referanslar, sahne bazlı yeniden üretim | İçerik editörü |
| Mükerrer yayın | Timeout sonrası ikinci post | İdempotency, işlem uzlaştırma, platform ID’si | Backend |
| Maliyet taşması | Attempt ve token artışı | İş başına bütçe, tur/süre limiti, alarm | Operasyon |
| Prompt injection | Araç çıktısındaki eylem talimatı | Trust boundary, sınırlı yetki, veri çıkışı kontrolü | Güvenlik |
| Test zayıflatma | Silinen assertion veya test | Test diff incelemesi, davranış sözleşmesi | Reviewer |
| Gizli veri sızıntısı | Prompt/log içinde kişisel veri veya secret | Sentetik fixture, maskeleme, dar erişim | Veri sorumlusu |
| Sağlayıcı kapanışı | Deprecation ve model ID değişimi | Adaptör, sürüm kayıtları, alternatif pilot | Teknik lider |
| İçerik hakları | Asset’in rıza/lisans kaydı yok | Asset bazlı kullanım kaydı ve yayın kapısı | İçerik/uyum |
| Yayın erişimi | İşlem başarılı ama private | Audit, hesap izinleri, görünürlük sorgusu | Entegrasyon |
| Review darboğazı | PR kuyruğu ve yeniden iş artışı | Küçük işler, kapasite limiti, net sahiplik | Ekip lideri |

Bu risk öncelikleri analitik sentezdir; ölçülmüş olasılık yüzdeleri değildir. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)

### Provenans, bildirim ve haklar

C2PA içerik geçmişinin doğrulanabilir kaydını, watermark ise farklı bir işaretleme mekanizmasını temsil eder. Yeniden kodlama veya düzenleme sonrası imzanın/manifestonun geçerliliği ayrıca sınanmalıdır; basit metadata pass-through bütün provenansı koruma garantisi değildir. Yayın platformunun AI bildirimi de ayrı bir adımdır. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03)

YouTube’un 15 Temmuz 2025 tarihli güncellemesi tekrarlı/kitlesel içerik konusunu açıklar. AI kullanmak tek başına para kazanmayı engellemez; özgün yorum, anlatı ve izleyiciye değer esas alınır. Kaynaklardaki “AI etiketini kaybetmek otomatik %90 erişim düşüşü yaratır” veya “repost kesin shadowban getirir” ifadelerine doğrulanmış platform kuralı olarak yer vermiyoruz. [YouTube politikası](https://support.google.com/youtube/answer/1311392)

EU AI Act’te sağlayıcı ve kullanan tarafın sorumlulukları farklıdır. Konsolide metin, 2 Ağustos 2026 öncesinde piyasaya sunulmuş ilgili sistemlerin sağlayıcılarına Madde 50(2) için 2 Aralık 2026’ya kadar geçiş verir. Her AI medyası için aynı teknik işaretin zorunlu olduğu çıkarımı yapılmamalı; kapsam ve istisnalar kullanım özelinde değerlendirilir. [Konsolide mevzuat](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng)

Gerçek kişinin sesini/yüzünü, kişisel logları ve müşteri belgelerini kullanırken hak, rıza ve veri aktarımı koşulları netleştirilmelidir. Müzik için platform, kanal, ticari kullanım ve abonelik sonrasındaki hakları kayıt altına al. Suno/Udio, Artlist veya Epidemic planlarıyla ilgili kaynak fiyatları ve davalara dair tarihsel iddialar güncel sözleşme yerine geçmez. [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)

### Henüz bilmediğimiz şeyler

Günlük hacim, eşzamanlı iş, hedef platform, ortalama süre, marka sayısı, bütçe, veri ikameti, onay SLA’sı, telif kapsamı ve gerçek izleyici tepkisi belirlenmeden “en iyi stack” kararı kesinleşmez.

Yazılım tarafında da repo büyüklüğü, mevcut test kalitesi, gerçek aylık token kullanımı, cache oranı, inceleme yükü ve self-host bakım kapasitesi ölçülmelidir. D06’daki 15 ajan ve GPU donanımı anlatımı, bu portalın kullanıcısına ait doğrulanmış canlı kapasite verisi değildir.

### Karara taşınmayan sayısal iddialar

Kaynaklarda geçen model liderlik skorları, GitHub yıldızları, API/abonelik fiyatları, sabit GPU break-even eşiği, gelir/RPM projeksiyonları ve güvenlik açıklarına ait başarı yüzdeleri topluca yeniden doğrulanmadı. Bunlar tam metin arşivinde bulunur; dashboard’da doğrulanmış istatistik olarak kullanılmaz.

Benzer şekilde “Q8 kayıpsızdır”, “KV cache context ile logaritmik büyür”, “MCP halüsinasyonu engeller” ve “bir araç tek başına güvenliği garanti eder” türü genellemeler karar temeli değildir. Donanım kapasitesi ve kaliteyi seçilen runtime, model ve iş yükünde ölçmek gerekir.


---

## 5. Uygulama yol haritası

### Takvimden önce geçiş kriteri

Aşağıdaki plan kaynakların ortak önerilerinden türetilmiş bir başlangıç sırasıdır. Haftalar tahmindir; ekip kapasitesi, app review ve içerik kalitesi süreyi değiştirir. D03’teki yaklaşık beş aylık program ile D04/D06’daki kısa yazılım pilotu, aynı teslimat taahhüdü olarak birleştirilmedi. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)

### 01 · Çerçeve ve baz ölçüm

**İlk 1–2 hafta.** Tek içerik formatı, hedef kitle, platform, editör ve maliyet tavanını tanımla. Ürün bilgi kaynağı, marka kiti, kullanım hakları ve telaffuz sözlüğünü hazırla. Platform erişim/audit başvurusunu erken başlat.

Yazılım için mevcut lint/typecheck/test komutlarını tek doğrulama akışına bağla. Kısa AGENTS.md ve kabul kriteri şablonu oluştur. PR süresi, hata ve inceleme emeği için baz veri toplamayı başlat.

**Çıkış kriteri:** iş kuralları, kaynak sahipliği ve ölçülecek KPI’lar yazılı; ajan mevcut testi tek komutla çalıştırabiliyor.

### 02 · Dar kapsamlı pilot

**2–4. haftalar.** 10–20 video adayı veya 20–50 eşlenmiş sahneyle sağlayıcı karşılaştırması yap. Bu sayılar deney tasarımı önerisidir. Aynı brief, referans, kalite rubriği ve değerlendiriciyi kullan. Bir ses sağlayıcısı, bir renderer ve bir publisher ile ilk hattı tamamla.

Kod tarafında tek repo, sınırlı görevler ve küçük değişiklikler seç. Her bug için önce regresyon testi, sonra fix; her sonuç için doğrulama kanıtı üret. AI PR review’u yardımcı katman olarak dene.

**Çıkış kriteri:** uçtan uca gerçek çıktı; maliyet ve insan emeği kaydı; kalite bozulmadan net fayda.

### 03 · Dayanıklılık ve kontrollü yayın

**5–8. haftalar.** Duplicate callback, kayıp callback, 429, timeout, token expiry ve worker restart senaryolarını test et. Onay sonrası çıktı değişimini engelle; idempotency ve bütçe sınırlarını doğrula. Final yayın görünürlüğünü platformdan teyit et.

Test, SAST, dependency ve secret taramasını CI kapılarına bağla. İnceleme kapasitesini aşan ajan eşzamanlılığını düşür. Incident için log → hipotez → fix PR akışını sınırlı yetkiyle kur.

**Çıkış kriteri:** gözlemlenen hata senaryolarından veri ve yayın kaybı olmadan kurtarma; sorumlu kişi ve runbook.

### 04 · Ölçerek ölçekleme

**9–12. haftalar ve sonrası.** İkinci platformu, ikinci formatı veya model routing’i tek tek ekle. Yoğun kullanılan bir video sahne tipinde ComfyUI/GPU pilotu veya yazılım ajanlarında self-host serving dene. Her ek katmanın bakım maliyetini hesapla.

Yüksek hacimli video için D03’ün 3–6 aylık durable workflow, gelişmiş QC ve hibrit GPU programını bu fazın devamı olarak ele al. Kalite verisi birikmeden bütün onayları kaldırma.

**Çıkış kriteri:** kabul edilen çıktı başına toplam maliyet ve p95 süre iyileşiyor; ret, incident ve review yükü artmıyor.

### Başarı panosu

| Video operasyonu | Yazılım operasyonu |
|---|---|
| Kabul edilen saniye başına maliyet | Kabul edilen görev / merge başına maliyet |
| İlk denemede kabul oranı | İlk CI geçiş oranı |
| Editör dakikası / video | Review ve rework dakikası / PR |
| Yayınlama başarısı ve görünürlük | Change failure ve escaped defect |
| İzleyici tutulması ve ürün dönüşümü | PR cycle time ve ekip memnuniyeti |

Yalnızca üretilen video veya kod satırı sayısı başarı ölçütü değildir. Baseline, dönem, örneklem ve ölçüm yöntemiyle birlikte karar ver.


---

## 6. Yöntem ve kapsam

### Kapsam ve yöntem

Bu rapor 16 Eylül 2026 tarihli bir araştırma sentezidir. Kullanıcının paylaştığı altı belgenin tamamı değişmeden arşivlendi. Video belgeleri D01/D03/D05; yazılım belgeleri D02/D04/D06 olarak kimliklendirildi. Ortak öneriler birleştirildi, farklı senaryolar ayrı tutuldu ve karar etkisi yüksek seçilmiş iddialar birincil kaynaklardan kontrol edildi.

**Eksiksiz arşiv, bütün iddiaların doğrulanması anlamına gelmez.** Dış bağlantıların tamamı indekslendi; hepsinin güncel fiyatı, bütün sayfaların içeriği veya bütün akademik sonuçlar yeniden araştırılmadı. Doğrulama tablosu kontrol edilen iddiayı, tarihi, ilgili belgeyi ve kanıt bağlantısını ayrı gösterir.

### Dört kanıt seviyesi

- **Doğrulandı:** bağlantılı birincil kaynak, belirtilen dar iddiayı destekliyor.
- **Düzeltildi:** özgün belgede tarih, limit veya yorum sorunu var; sentezde düzeltme kullanılıyor.
- **Kaynak aktarımı:** belgede bulunan bağlantı, araç veya iddia; yeniden doğrulama anlamına gelmiyor.
- **Sentez / varsayım:** bu raporun mimari önerisi, deney tasarımı veya kullanıcı kontrollü hesap girdisi.

Araç kataloğu kaynakların rol ve kullanım senaryolarını bir araya getirir. Bir araç kartında yer almak, bağımsız performans testi, satın alma önerisi veya mevcut API erişimi garantisi değildir. Fiyat ve benchmark sıralamaları bu nedenle katalog kartlarına kesin sayı olarak aktarılmadı.

### Kaynak izlenebilirliği

Her özgün dosya byte uzunluğu ve SHA-256 ile manifestoda yer alır. Kaynak sayfasında tam metni okumak, tek dosyayı indirmek veya altı belgeyi manifestoyla ZIP olarak almak mümkündür. Tam metinler ihtiyaç anında yüklenir; mobil açılışta bütün arşiv indirilmez.

İki belgede paragraf/satır ayrımları aktarım sırasında kaybolmuştur. Orijinal dosya aynen korunur; okuyucu yalnızca görsel satır kırma uygular. Diğer belgelerin Markdown, tablo, kod ve şema metinleri de özgün biçimleriyle indirilebilir.

D03/D04’teki eski sohbet atıf belirteçleri (`turn…search…` vb.) erişilebilir kaynak URL’si değildir. Bu belirteçlerden bağlantı uydurulmaz; orijinal metinde saklanır ve çözümlenemeyen atıf olarak sayılır. Açık URL’ler, çıplak alan adları, açık GitHub repo kimlikleri ve arXiv numaraları ayrı indekslenir.

### Tasarım tercihleri

Mobil kullanıcı önce kararı, özeti ve sonraki adımı görür. Alt gezinme ve bölüm paneli tek elle erişilir. Uzun rapor alt bölümlere ayrılır; araç karşılaştırması dar ekranda dikey kartlara dönüşür. 48px etkileşim alanı, klavye odağı, reduced motion ve cihaz güvenli alanı tasarımın temelidir.

Masaüstünde kalıcı içerik menüsü, daha geniş karşılaştırma alanı ve aynı URL/okuma durumu kullanılır. Okundu ve yol haritası işaretleri yalnızca bu tarayıcıda saklanır; hesap veya cihazlar arası senkronizasyon yoktur. Depolama engellenirse oturum içi kullanım devam eder.

### Teknik kapsam

Portal React, TypeScript, Vite, Tailwind CSS ve daisyUI ile hazırlanmış statik bir GitHub Pages uygulamasıdır. Gerçek video üretimi, ücretli model çağrısı, sosyal hesap bağlantısı veya sunucu tarafı ajan çalıştırma içermez. Hesaplayıcı bir planlama aracıdır; canlı fiyat servisi değildir.

DX için birim ve tarayıcı testleri, tip kontrolü, sürümü sabitlenmiş bağımlılıklar, kaynak bütünlüğü testi ve GitHub Actions yayın hattı kullanılır. Test başarısızsa yeni sürüm yayın aşamasına geçmez.


## 7. Maliyet modeli

Aylık toplam = video sayısı × video başına üretilen saniye × saniye birim fiyatı × kabul başına ortalama deneme + video sayısı × inceleme dakikası / 60 × saatlik insan maliyeti + video sayısı × diğer değişken gider + sabit gider.

**Örnek senaryo, güncel teklif değildir:** 100 video/ay, 30 üretilen saniye/video, $0,12/sn, 2 deneme, 5 dakika inceleme/video, $12/saat insan emeği, $0,50 diğer/video ve $50 sabit gider → $720 üretim + $100 insan + $50 diğer + $50 sabit = **$920/ay**. Video başına $9,20; kabul edilen saniye başına üretim $0,24. Deneme sayısı 4 olduğunda toplam $1.640 olur. Vergi ve kur etkisi dahil değildir. [D03 ve D05 sentezi]

[Kendi senaryonu hesapla](https://karacaismail.github.io/futuristic/#/cost). Self-host karşılaştırmasında GPU kirası, idle kapasite, model lisansı, bakım emeği, disk/egress ve aynı kaliteyi yakalama maliyeti ayrıca hesaba katılır.

## 8. Araç ve teknoloji kataloğu

Bu katalog kaynak sentezidir; güncel fiyat veya bağımsız performans sıralaması içermez.

### Video

| Araç | Rol ve uygun kullanım | Sınır | Ortam | Kaynak belgeler |
|---|---|---|---|---|
| [Veo](https://cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate) | Görsel ve metinden sahne üretimi. Ürün atmosferi ve kontrollü kısa planlar | Sürüm, bölge, süre ve tekrar üretim maliyeti | Bulut | D01, D03, D05 |
| [Runway](https://docs.dev.runwayml.com/) | Jeneratif video ve dönüşüm. API ile sahne üretimi | Model ve endpoint özellikleri ayrı doğrulanmalı | Bulut | D01, D03, D05 |
| [Luma](https://docs.lumalabs.ai/) | Sahne üretimi ve video dönüşümü. Görselden video pilotu | Asenkron job ve kalite değişkenliği | Bulut | D03, D05 |
| [Kling](https://kling.ai/) | Jeneratif sahne ve hareket kontrolü. Ürün referansı ile sahne karşılaştırması | API erişimi, lisans ve model sürümü | Bulut | D01, D03, D05 |
| [MiniMax / Hailuo](https://platform.minimax.io/) | Video ve ses ailesi. Tek sağlayıcıyla video/ses pilotu | Model ve ücretleri ayrı değerlendirmek gerekir | Bulut | D03, D05 |
| [Adobe Firefly](https://developer.adobe.com/firefly-services/docs/firefly-api/) | Görsel, video ve yaratıcı servisler. Adobe üretim ekosistemi | UI özellikleri API kapsamını garanti etmez | Bulut | D03 |

### Avatar

| Araç | Rol ve uygun kullanım | Sınır | Ortam | Kaynak belgeler |
|---|---|---|---|---|
| [HeyGen](https://docs.heygen.com/) | Sunucu, çeviri ve avatar. B2B anlatım ve lokalizasyon | API ve UI aboneliği farklı; rıza ve Türkçe test | Bulut | D03, D05 |
| [Synthesia](https://docs.synthesia.io/) | Metinden sunuculu video. Eğitim ve onboarding | Yaratıcı kontrol ve sözleşme kapsamı | Bulut | D03, D05 |
| [Tavus](https://docs.tavus.io/) | Etkileşimli video persona. Canlı konuşan avatar | Offline video render ile aynı kullanım değil | Bulut | D03, D05 |

### Ses

| Araç | Rol ve uygun kullanım | Sınır | Ortam | Kaynak belgeler |
|---|---|---|---|---|
| [ElevenLabs](https://elevenlabs.io/docs) | TTS, dublaj ve transkripsiyon. Türkçe ses karşılaştırması | Telaffuz ve ses hakkı ayrıca değerlendirilir | Bulut | D01, D03, D05 |
| [Google Cloud TTS](https://cloud.google.com/text-to-speech/docs) | Metinden konuşma. Türkçe ses ve SSML tabanlı akış | Seçilen ses/model bazında ölçüm | Bulut | D03, D05 |
| [OpenAI TTS](https://platform.openai.com/docs/guides/text-to-speech) | Metinden konuşma. LLM ile ortak sağlayıcı akışı | Ses seçenekleri ve fiyatı model bazında teyit | Bulut | D03, D05 |
| [Whisper](https://github.com/openai/whisper) | Sesin metne dökülmesi. Altyazı üretimi ve kontrol | Hizalama, özel terim ve konuşma kalitesi | Yerel | D05 |

### Kurgu

| Araç | Rol ve uygun kullanım | Sınır | Ortam | Kaynak belgeler |
|---|---|---|---|---|
| [Remotion](https://github.com/remotion-dev/remotion) | React ile programatik video. Marka motion sistemi ve veri grafikleri | Şirket lisansı ve render operasyonu | Yerel | D01, D03, D05 |
| [FFmpeg](https://ffmpeg.org/) | Encode, filtre, ses ve mux. Deterministik medya işlemleri | Yaratıcı sahne üretmez; build lisansı incelenir | Yerel | D01, D03, D05 |
| [Shotstack](https://shotstack.io/docs/) | JSON timeline ve cloud render. API ile hızlı üretim hattı | Kullanım maliyeti ve sağlayıcı bağımlılığı | Bulut | D03, D05 |
| [Creatomate](https://creatomate.com/docs/api/introduction) | Şablon ve JSON ile render. Sosyal video varyantları | Kredi modeli ve template sınırları | Bulut | D03, D05 |
| [JSON2Video](https://json2video.com/docs/) | JSON ile sahne birleştirme. Basit otomatik video şablonları | Render ve çözünürlük maliyeti | Bulut | D03, D05 |
| [auto-editor](https://github.com/WyattBlue/auto-editor) | Sessizlik tabanlı otomatik kesim. Konuşma içeriklerini temizleme | Anlatı/viral an seçiminin yerine geçmez | Yerel | D03 |
| [OpusClip](https://www.opus.pro/) | Uzun videodan kısa kesitler. Podcast ve webinar yeniden kullanımı | Kaynaklardaki API planları çelişkili; teyit gerekli | Bulut | D03, D05 |
| [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Stok, ses ve altyazı otomasyonu. Hızlı faceless pilot | Auth, lisans, secret ve editoryal katman gerekir | Yerel | D01, D05 |
| [ShortGPT](https://github.com/RayVentura/ShortGPT) | Programlanabilir kısa video üretimi. Stok ve dublaj deneyleri | Bağımlılık ve bakım durumunu incele | Yerel | D01, D05 |

### Model

| Araç | Rol ve uygun kullanım | Sınır | Ortam | Kaynak belgeler |
|---|---|---|---|---|
| [ComfyUI](https://github.com/Comfy-Org/ComfyUI) | Düğüm tabanlı inference workflow. Yerel video/görsel GPU üretimi | VRAM, node tedarik zinciri ve model lisansı | Yerel | D03, D05 |
| [LTX-2](https://github.com/Lightricks/LTX-2) | Video ve ses üretim modeli. Hibrit GPU pilotu | Ağırlık lisansı ve donanım benchmark’ı | Yerel | D03, D05 |
| [Wan 2.2](https://github.com/Wan-Video/Wan2.2) | Açık video model ailesi. Yerel sahne üretimi | Daha yeni Wan sürümlerine lisansı genelleme | Yerel | D03, D05 |
| [HunyuanVideo](https://github.com/Tencent-Hunyuan/HunyuanVideo) | Video üretim modeli. GPU tabanlı araştırma/pilot | Donanım ve ticari kullanım koşulları | Yerel | D03, D05 |
| [CogVideo](https://github.com/zai-org/CogVideo) | Video üretim ve ince ayar. Kontrollü açık model deneyi | Model/weight lisansı ve kaynak ihtiyacı | Yerel | D03, D05 |
| [vLLM / SGLang](https://github.com/vllm-project/vllm) | Yüksek verimli model serving. Eşzamanlı self-host ajan pilotu | KV cache, batching, GPU ve bakım maliyeti | Yerel | D02, D06 |
| [MLX / Ollama](https://github.com/ml-explore/mlx) | Yerel model çalıştırma. Mac/kişisel ortamda gizli veri pilotu | Belleğe sığmak hedef gecikmeyi garanti etmez | Yerel | D02, D06 |

### Yayın

| Araç | Rol ve uygun kullanım | Sınır | Ortam | Kaynak belgeler |
|---|---|---|---|---|
| [Postiz](https://github.com/gitroomhq/postiz-app) | Sosyal içerik planlama. Kontrollü self-host yayın katmanı | Platform uygulama ve OAuth gereksinimleri | Hibrit | D05 |
| [Blotato](https://blotato.com/) | Çoklu sosyal yayın katmanı. Entegrasyon pilotunu hızlandırma | Hesap izinlerini ve plan kapsamını teyit et | Bulut | D05 |
| [Upload-Post](https://upload-post.com/) | Sosyal yayın API katmanı. Dar kapsamlı yayın pilotu | Kota, desteklenen platform ve plan | Bulut | D01, D05 |
| [Ayrshare](https://www.ayrshare.com/) | Birleşik sosyal API. Çoklu müşteri/hesap entegrasyonu | Profil bazlı maliyet ve sözleşme | Bulut | D05 |

### Orkestrasyon

| Araç | Rol ve uygun kullanım | Sınır | Ortam | Kaynak belgeler |
|---|---|---|---|---|
| [n8n](https://docs.n8n.io/) | Webhook ve deterministik iş akışı. Video hattı, CI bildirimleri ve onay | Fair-code lisans; queue ve secrets yönetimi | Hibrit | D01, D03, D05, D06 |
| [Temporal](https://docs.temporal.io/workflows) | Kalıcı ve uzun süreli workflow. Kritik asenkron üretim işleri | Yeni altyapı ve deterministik workflow disiplini | Hibrit | D03, D05 |
| [Make / Zapier](https://www.make.com/) | Görsel SaaS otomasyonu. Düşük hacimli iş sistemi bağlantıları | İşlem maliyeti ve taşınabilirlik | Bulut | D03, D05 |
| [OpenClaw](https://github.com/openclaw/openclaw) | Araç kullanan otonom ajan. Triage, öneri ve mesajlaşma | Güçlü araç erişimi; izolasyon ve izin denetimi | Yerel | D05, D06 |
| [LangGraph](https://github.com/langchain-ai/langgraph) | Durumlu ajan grafı. Gerçek dallanan ajan iş akışları | Küçük ihtiyaçta ek karmaşıklık | Yerel | D04, D05, D06 |
| [LlamaIndex / Haystack](https://github.com/run-llama/llama_index) | Bilgi getirme ve veri pipeline’ı. Repo dışı kurumsal bilgi | Gereksiz RAG eklemek context ve bakım yükü yaratır | Yerel | D04 |

### Kodlama

| Araç | Rol ve uygun kullanım | Sınır | Ortam | Kaynak belgeler |
|---|---|---|---|---|
| [Codex](https://github.com/openai/codex) | Repo, terminal ve test ajanı. Tanımlı bug, refactor ve test görevleri | İzin, ortam ve model kapasitesi ayrı konular | Hibrit | D04, D06 |
| [Claude Code](https://code.claude.com/docs/) | Terminal ve araç kullanan ajan. Bağlamlı repo geliştirme | Hooks ve alt ajan izinleri gözden geçirilmeli | Hibrit | D02, D06 |
| [Cursor](https://cursor.com/) | Ajan odaklı IDE. Etkileşimli geliştirme ve repo keşfi | Kota, ortam erişimi ve review yükü | Bulut | D02, D04, D06 |
| [GitHub Copilot](https://docs.github.com/en/copilot) | IDE, review ve repo ajanı. GitHub merkezli geliştirme | Review tam hata kapsamı sağlamaz | Bulut | D04, D06 |
| [Aider](https://github.com/Aider-AI/aider) | Git ile çalışan terminal ajanı. Model bağımsız küçük değişiklikler | Doğru context ve test altyapısı gerekir | Yerel | D02, D04, D06 |
| [OpenHands](https://github.com/OpenHands/openhands) | Yazılım ajan platformu. İzole görev ve özelleştirme | Sandbox kurulumu ve operasyon | Yerel | D02, D04, D06 |
| [Qwen Code / Coder](https://github.com/QwenLM/qwen-code) | Ajan runtime’ı ve ayrı model ailesi. Açık ekosistem coding pilotu | Runtime ile model ağırlığı lisansı farklı | Yerel | D04, D06 |
| [Spec Kit](https://github.com/github/spec-kit) | Spec, plan ve task iş akışı. Uzun ömürlü ve çok modüllü geliştirme | Küçük görevlerde ek süreç yükü | Yerel | D06 |
| [Context7](https://github.com/upstash/context7) | Kütüphane dokümantasyonunu getirme. Sürüm bağlamı ve API araştırması | Dönen veri doğrulanmalı; halüsinasyonu sıfırlamaz | Bulut | D06 |
| [SWE-agent](https://github.com/swe-agent/swe-agent) | Araştırma amaçlı repo ajanı. Harness ve agent deneyleri | Benchmark başarısı ürün ROI’si değildir | Yerel | D04 |

### Kalite

| Araç | Rol ve uygun kullanım | Sınır | Ortam | Kaynak belgeler |
|---|---|---|---|---|
| [Playwright](https://playwright.dev/) | Tarayıcı akışı ve E2E testi. Mobil/masaüstü davranış doğrulama | Test senaryosu ve assertion kalitesi önemli | Yerel | D04, D06 |
| [CodeRabbit](https://coderabbit.ai/) | PR bağlamında AI inceleme. Review kuyruğuna yardımcı ilk katman | Yanlış pozitifler ve plan özellikleri | Bulut | D02, D04, D06 |
| [Qodo](https://www.qodo.ai/) | Kod kalitesi, test ve review. Kurala dayalı doğrulama pilotu | Vendor metrikleri bağımsız ölçüm değil | Bulut | D02, D04, D06 |
| [Semgrep](https://semgrep.dev/) | Statik güvenlik ve triage. CI ve agent değişikliklerini tarama | Kural kapsamı ve veri akışı sınırları | Hibrit | D02, D04, D06 |
| [SonarQube](https://www.sonarsource.com/products/sonarqube/) | Kalite kapısı ve teknik borç. Kurumsal kod kalite görünürlüğü | AI doğruluğu veya güvenlik garantisi değil | Hibrit | D02 |
| [Sentry Seer](https://docs.sentry.io/product/ai-in-sentry/) | Telemetry bağlamında hata araştırması. Production hata → kanıt → fix adayı | Kaliteli log/trace ve veri maskeleme gerekir | Bulut | D04, D06 |

## 9. Tarihli doğrulama / düzeltme kaydı

### V01 · YouTube yükleme kotası

**Düzeltildi · 2026-09-16 · Belgeler: D01, D05**

D05’teki 1.600 birim / yaklaşık 6 video hesabı güncel değil. 15 Eylül 2026 tarihli kota tablosunda videos.insert ve search.list için ayrı ayrı varsayılan 100 çağrı/gün, çağrı başına 1 kota belirtiliyor. Kanal yükleme sınırı bu proje kotasından ayrıdır. [Birincil kaynak](https://developers.google.com/youtube/v3/determine_quota_cost)

### V02 · YouTube politika tarihi

**Düzeltildi · 2026-09-16 · Belgeler: D01, D05**

Inauthentic content adlandırması 15 Temmuz 2025 tarihli; D01’deki Temmuz 2026 tarihi hatalı. AI kullanımı tek başına yasak değil; özgün değer taşımayan tekrarlı ve kitlesel içerik para kazanmaya uygun olmayabilir. [Birincil kaynak](https://support.google.com/youtube/answer/1311392)

### V03 · Sora API yaşam döngüsü

**Doğrulandı · 2026-09-16 · Belgeler: D03, D05**

Resmî OpenAI duyurusu API’nin 24 Eylül 2026’da sonlandırılacağını belirtiyor. Rapor tarihi itibarıyla gelecekteki bu kapanış, yeni entegrasyon seçimini etkiliyor. [Birincil kaynak](https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-discontinuation)

### V04 · TikTok: audit, onay ve hız sınırı

**Doğrulandı · 2026-09-16 · Belgeler: D01, D03, D05**

Direct Post belgesi denetlenmemiş istemcilerin içeriklerini private görünürlükle sınırlar. video.publish kapsamı, kullanıcı onayı ve creator bilgisi gerekir. Init endpoint’i kullanıcı access token’ı başına dakikada 6 istektir; tüm API için tek evrensel limit değildir. [Birincil kaynak](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post)

### V05 · Instagram: 90 saniye evrensel sınır değil

**Düzeltildi · 2026-09-16 · Belgeler: D01, D05**

Meta’nın resmî Reels örneği 3 saniye–15 dakika aralığı veriyor; kaynaklardaki kesin 90 saniye ifadesi genellenemez. Bu örnek Facebook Login akışına aittir; kullanılacak API sürümü, login yolu ve hesap izinleri ayrıca sınanmalı. [Birincil kaynak](https://github.com/fbsamples/reels_publishing_apis/blob/main/insta_reels_publishing_api_sample/README.md)

### V06 · METR: bağlama bağlı üretkenlik

**Doğrulandı · 2026-09-16 · Belgeler: D02, D04**

2025 RCT’sinde 16 geliştirici ve 246 görevde tamamlama süresi %19 arttı. Bu bulgu bütün geliştiricilere, görevlere veya 2026 modellerine genellenemez. [Birincil kaynak](https://arxiv.org/abs/2507.09089)

### V07 · METR 2026: kesin hızlanma oranı yok

**Düzeltildi · 2026-09-16 · Belgeler: D04**

24 Şubat 2026 güncellemesi yeni deneyin seçim etkileri nedeniyle güncel verimlilik için güvenilir bir büyüklük tahmini vermediğini söylüyor. Ham sonuçlar evrensel %4–20 hızlanma kanıtı olarak kullanılamaz. [Birincil kaynak](https://metr.org/blog/2026-02-24-uplift-update/)

### V08 · DORA: araçtan önce organizasyon

**Doğrulandı · 2026-09-16 · Belgeler: D02, D04**

2025 araştırmasının ana sonucu AI’ın organizasyonun mevcut güçlü ve zayıf yönlerini büyüttüğü. İyileşme, test, review ve teslimat sistemine yapılacak yatırımla birlikte değerlendirilmelidir. [Birincil kaynak](https://dora.dev/research/2025/dora-report/)

### V09 · Remotion lisansı

**Doğrulandı · 2026-09-16 · Belgeler: D01, D03, D05**

Remotion MIT olarak varsayılmamalı. İncelenen lisans bireyler, en fazla 3 çalışanlı kâr amaçlı kuruluşlar ve belirtilen diğer gruplar için ücretsiz kullanım tanımlar; kapsam dışındaki ticari kuruluşlarda şirket lisansı gerekir. [Birincil kaynak](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)

### V10 · MCP taşıma katmanı

**Düzeltildi · 2026-09-16 · Belgeler: D02, D06**

2025-06-18 spesifikasyonunda uzak bağlantılar için Streamable HTTP, eski HTTP+SSE taşımasının yerini alır. SSE bu akış içinde kullanılabilir; eski transport ile aynı kavram değildir. stdio yerel seçenek olarak kalır. [Birincil kaynak](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports)

### V11 · AI Act: uygulama ve geçiş tarihleri

**Doğrulandı · 2026-09-16 · Belgeler: D01, D05**

Konsolide mevzuat, 2 Ağustos 2026’dan önce piyasaya sunulmuş ilgili üretken sistemlerin sağlayıcılarına Madde 50(2) için 2 Aralık 2026’ya kadar geçiş tanıyor. Sağlayıcı ve kullanan tarafın yükümlülükleri ayrıdır; her içerik ve aktör için tek genel kural çıkarılamaz. [Birincil kaynak](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng)

## 10. Özgün kaynaklar ve kapsam matrisi

### D01 · Video otomasyonu: mimari ve risk analizi

Ajansal prodüksiyon, Remotion/FFmpeg, n8n, yayınlama, kalite ve provenans.

- [Özgün tam metin](https://karacaismail.github.io/futuristic/sources/D01.txt)
- 24734 bayt; 23050 karakter; 0 açık referans.
- SHA-256: `664eefccfcc0433d3d7bfdd7529f130634862ad70f3774f4d2641d2ae8adc030`

### D02 · AI ile yazılım: mimari ve üretkenlik

METR, DORA, SDD, bağlam, prompt caching, MCP, yerel modeller ve kalite.

- [Özgün tam metin](https://karacaismail.github.io/futuristic/sources/D02.txt)
- 38392 bayt; 35591 karakter; 3 açık referans.
- SHA-256: `39f467655fe287e42037eed9a22055a98b808de92bfa62344e37a129cd42f13d`

### D03 · Uçtan uca video: araçlar ve referans mimari

Sağlayıcı envanteri, timeline sözleşmeleri, platform API’leri ve operasyon modeli.

- [Özgün tam metin](https://karacaismail.github.io/futuristic/sources/D03.txt)
- 57415 bayt; 54041 karakter; 33 açık referans.
- SHA-256: `eb8a787c7794d784956fac0e461b1e836fadbf89489e8ec8d67cb6fc4f464d28`

### D04 · AI geliştirme: 2023–2026 uygulama rehberi

Araç ve repo karşılaştırması, doğrulama döngüsü, ROI, yönetişim ve pilot.

- [Özgün tam metin](https://karacaismail.github.io/futuristic/sources/D04.txt)
- 66000 bayt; 60872 karakter; 17 açık referans.
- SHA-256: `d93d8e5cabac82a417cbd24b810e90b3e0fa642075a6734141ca207eb62d3cc8`

### D05 · Video içerik hattı: pragmatik saha rehberi

Beş üretim yaklaşımı, B2B senaryoları, self-host, OpenClaw, müzik ve platformlar.

- [Özgün tam metin](https://karacaismail.github.io/futuristic/sources/D05.txt)
- 32688 bayt; 32636 karakter; 37 açık referans.
- SHA-256: `2cf6fbab402d7fdb7d106256e1e8b5f13289ee1bc03d3ee02c38fd8cb9ab4b7f`

### D06 · Yazılım ajanları: karar odaklı rehber

Worktree, AGENTS.md, Spec Kit, MCP, test, model serving ve GPU ekonomisi.

- [Özgün tam metin](https://karacaismail.github.io/futuristic/sources/D06.txt)
- 44376 bayt; 42014 karakter; 22 açık referans.
- SHA-256: `96d53681790e3d946bf21f5bea55bdac6e54c2d0a6996fb41e635437ab7640ca`

[Altı belgeyi manifestoyla ZIP indir](https://karacaismail.github.io/futuristic/sources/arastirma-arsivi.zip).

## 11. Tam referans indeksi

Aşağıdaki bağlantılar kaynak belgelerden çıkarılmıştır. Bu liste doğrulama listesi değildir.

- **R001** [Epoch.ai](https://Epoch.ai) — D02
- **R002** [arxiv.org/abs/2507.09089](https://arxiv.org/abs/2507.09089) — D02
- **R003** [arxiv.org/abs/2605.18461](https://arxiv.org/abs/2605.18461) — D02
- **R004** [cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate](https://cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate) — D03
- **R005** [docs.dev.runwayml.com/](https://docs.dev.runwayml.com/) — D03
- **R006** [docs.lumalabs.ai/](https://docs.lumalabs.ai/) — D03
- **R007** [developer.adobe.com/firefly-services/docs/firefly-api/](https://developer.adobe.com/firefly-services/docs/firefly-api/) — D03
- **R008** [kling.ai/](https://kling.ai/) — D03
- **R009** [platform.minimax.io/](https://platform.minimax.io/) — D03
- **R010** [docs.heygen.com/](https://docs.heygen.com/) — D03
- **R011** [docs.synthesia.io/](https://docs.synthesia.io/) — D03
- **R012** [docs.tavus.io/](https://docs.tavus.io/) — D03
- **R013** [developer.adobe.com/firefly-services/docs/audio-video-api/](https://developer.adobe.com/firefly-services/docs/audio-video-api/) — D03
- **R014** [www.veed.io/](https://www.veed.io/) — D03
- **R015** [elevenlabs.io/docs/api-reference/text-to-speech](https://elevenlabs.io/docs/api-reference/text-to-speech) — D03
- **R016** [cloud.google.com/text-to-speech/docs](https://cloud.google.com/text-to-speech/docs) — D03
- **R017** [platform.openai.com/docs/guides/text-to-speech](https://platform.openai.com/docs/guides/text-to-speech) — D03
- **R018** [shotstack.io/docs/](https://shotstack.io/docs/) — D03
- **R019** [creatomate.com/docs/api/introduction](https://creatomate.com/docs/api/introduction) — D03
- **R020** [json2video.com/docs/](https://json2video.com/docs/) — D03
- **R021** [github.com/remotion-dev/remotion](https://github.com/remotion-dev/remotion) — D03
- **R022** [ffmpeg.org/](https://ffmpeg.org/) — D03
- **R023** [github.com/WyattBlue/auto-editor](https://github.com/WyattBlue/auto-editor) — D03
- **R024** [developer.adobe.com/premiere-pro/](https://developer.adobe.com/premiere-pro/) — D03
- **R025** [github.com/Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) — D03
- **R026** [github.com/Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) — D03
- **R027** [arxiv.org/abs/2501.00103](https://arxiv.org/abs/2501.00103) — D03
- **R028** [github.com/Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) — D03
- **R029** [github.com/Tencent-Hunyuan/HunyuanVideo](https://github.com/Tencent-Hunyuan/HunyuanVideo) — D03
- **R030** [github.com/zai-org/CogVideo](https://github.com/zai-org/CogVideo) — D03
- **R031** [arxiv.org/abs/2408.06072](https://arxiv.org/abs/2408.06072) — D03
- **R032** [docs.n8n.io/](https://docs.n8n.io/) — D03
- **R033** [docs.temporal.io/workflows](https://docs.temporal.io/workflows) — D03
- **R034** [developers.google.com/youtube/v3/docs/videos/insert](https://developers.google.com/youtube/v3/docs/videos/insert) — D03
- **R035** [developers.tiktok.com/products/content-posting-api/](https://developers.tiktok.com/products/content-posting-api/) — D03
- **R036** [learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api) — D03
- **R037** [GitLab.com](https://GitLab.com) — D04
- **R038** [github.com/bigcode-project/starcoder2](https://github.com/bigcode-project/starcoder2) — D04
- **R039** [arxiv.org/abs/2402.19173](https://arxiv.org/abs/2402.19173) — D04
- **R040** [github.com/salesforce/CodeGen](https://github.com/salesforce/CodeGen) — D04
- **R041** [deepmind.google/blog/competitive-programming-with-alphacode/](https://deepmind.google/blog/competitive-programming-with-alphacode/) — D04
- **R042** [github.com/QwenLM/Qwen3-Coder](https://github.com/QwenLM/Qwen3-Coder) — D04
- **R043** [github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) — D04
- **R044** [github.com/OpenHands/openhands](https://github.com/OpenHands/openhands) — D04
- **R045** [github.com/OpenHands/software-agent-sdk](https://github.com/OpenHands/software-agent-sdk) — D04
- **R046** [github.com/swe-agent/swe-agent](https://github.com/swe-agent/swe-agent) — D04
- **R047** [arxiv.org/abs/2405.15793](https://arxiv.org/abs/2405.15793) — D04
- **R048** [github.com/Aider-AI/aider](https://github.com/Aider-AI/aider) — D04
- **R049** [github.com/langchain-ai/langchain](https://github.com/langchain-ai/langchain) — D04
- **R050** [github.com/run-llama/llama_index](https://github.com/run-llama/llama_index) — D04
- **R051** [github.com/deepset-ai/haystack](https://github.com/deepset-ai/haystack) — D04
- **R052** [github.com/huggingface/transformers](https://github.com/huggingface/transformers) — D04
- **R053** [github.com/continuedev/continue](https://github.com/continuedev/continue) — D04
- **R054** [support.google.com/youtube/answer/1311392](https://support.google.com/youtube/answer/1311392) — D05
- **R055** [Captions.ai](https://Captions.ai) — D05
- **R056** [fal.ai](https://fal.ai) — D05
- **R057** [AutoShorts.ai](https://AutoShorts.ai) — D05
- **R058** [Revid.ai](https://Revid.ai) — D05
- **R059** [Predis.ai](https://Predis.ai) — D05
- **R060** [Make.com](https://Make.com) — D05
- **R061** [github.com/harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — D05
- **R062** [github.com/gitroomhq/postiz-app](https://github.com/gitroomhq/postiz-app) — D05
- **R063** [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw) — D05
- **R064** [github.com](https://github.com) — D05
- **R065** [n8n.io/workflows/2971](https://n8n.io/workflows/2971) — D05
- **R066** [n8n.io/workflows/10455](https://n8n.io/workflows/10455) — D05
- **R067** [n8n.io/workflows/2875](https://n8n.io/workflows/2875) — D05
- **R068** [n8n.io/workflows/6014](https://n8n.io/workflows/6014) — D05
- **R069** [developers.google.com/youtube/v3](https://developers.google.com/youtube/v3) — D05
- **R070** [developers.tiktok.com/doc/content-posting-api-reference-direct-post](https://developers.tiktok.com/doc/content-posting-api-reference-direct-post) — D05
- **R071** [developers.facebook.com/documentation/instagram-platform/content-publishing](https://developers.facebook.com/documentation/instagram-platform/content-publishing) — D05
- **R072** [elevenlabs.io/docs](https://elevenlabs.io/docs) — D05
- **R073** [digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content](https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content) — D05
- **R074** [artificialintelligenceact.eu/transparency-rules-article-50/](https://artificialintelligenceact.eu/transparency-rules-article-50/) — D05
- **R075** [modelslab.com](https://modelslab.com) — D05
- **R076** [buildmvpfast.com](https://buildmvpfast.com) — D05
- **R077** [runpod.io/articles](https://runpod.io/articles) — D05
- **R078** [blotato.com/blog](https://blotato.com/blog) — D05
- **R079** [upload-post.com](https://upload-post.com) — D05
- **R080** [checkthat.ai](https://checkthat.ai) — D05
- **R081** [colossyan.com](https://colossyan.com) — D05
- **R082** [eesel.ai](https://eesel.ai) — D05
- **R083** [epidemicsound.com](https://epidemicsound.com) — D05
- **R084** [artlist.io](https://artlist.io) — D05
- **R085** [help.suno.com](https://help.suno.com) — D05
- **R086** [creatomate.com](https://creatomate.com) — D05
- **R087** [shotstack.io](https://shotstack.io) — D05
- **R088** [json2video.com](https://json2video.com) — D05
- **R089** [remotion.pro](https://remotion.pro) — D05
- **R090** [github.com/RayVentura/ShortGPT](https://github.com/RayVentura/ShortGPT) — D05
- **R091** [chatgpt.com/codex](https://chatgpt.com/codex) — D06
- **R092** [runpane.com](https://runpane.com) — D06
- **R093** [LogicStar.ai](https://LogicStar.ai) — D06
- **R094** [coderabbit.ai/pricing](https://coderabbit.ai/pricing) — D06
- **R095** [vals.ai/benchmarks/swebench](https://vals.ai/benchmarks/swebench) — D06
- **R096** [Arena.ai](https://Arena.ai) — D06
- **R097** [support.claude.com](https://support.claude.com) — D06
- **R098** [bex.co](https://bex.co) — D06
- **R099** [anthropic.com](https://anthropic.com) — D06
- **R100** [openai.com](https://openai.com) — D06
- **R101** [github.com/github/spec-kit](https://github.com/github/spec-kit) — D06
- **R102** [github.com/no-fluff/awesome-vibe-coding](https://github.com/no-fluff/awesome-vibe-coding) — D06
- **R103** [github.com/andyrewlee/awesome-agent-orchestrators](https://github.com/andyrewlee/awesome-agent-orchestrators) — D06
- **R104** [github.com/SamurAIGPT/awesome-openclaw](https://github.com/SamurAIGPT/awesome-openclaw) — D06
- **R105** [github.com/BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban) — D06
- **R106** [github.com/freddy-schuetz/n8n-claw](https://github.com/freddy-schuetz/n8n-claw) — D06
- **R107** [github.com/upstash/context7](https://github.com/upstash/context7) — D06
- **R108** [github.com/microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) — D06
- **R109** [github.com/czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp) — D06
- **R110** [arxiv.org/abs/2602.11988](https://arxiv.org/abs/2602.11988) — D06
- **R111** [arxiv.org/abs/2605.10039](https://arxiv.org/abs/2605.10039) — D06
- **R112** [arxiv.org/abs/2603.22489](https://arxiv.org/abs/2603.22489) — D06
