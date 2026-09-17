# Futuristic — Yapay zekâdan üretim sistemine

**Araştırma sentezi · 17 Eylül 2026 · v2.0**

AI video üretimi ve yazılım geliştirme için mimari, araç, maliyet, kalite ve uygulama raporu. Altı kaynak belgenin tamamı korunmuştur; bütün iddiaların doğrulandığı ileri sürülmez.

## Yönetici özeti

En güçlü ortak yatırım, yaratıcı modelleri deterministik yürütme ve açık doğrulama kapılarıyla birleştirmektir. Video için tek formatta insan onaylı bir üretim hattı; yazılım için kabul kriteri, TDD, küçük diff ve ölçülmüş review döngüsüyle başla. Başarıyı üretilen çıktı sayısıyla değil, kabul edilen çıktı başına toplam maliyet, kalite ve insan emeğiyle ölç.

Kapsam: **6 özgün belge**, **112 benzersiz referans**, **177 araç/teknoloji kartı**, **13 seçilmiş kritik iddia kontrolü**. Arşiv 263.605 bayttır; 209 çözümlenemeyen eski sohbet atıf belirteci orijinallerde korunur.


---

## 1. Video üretimi

### Karar: önce tek bir formatı uçtan uca çalıştır

Başlangıç için önerimiz, **30 saniyelik Türkçe bir B2B ürün anlatımı**: onaylı ürün bilgisi → senaryo → referans görseller → ses → altyazı → deterministik kurgu → önizleme → onay → tek platformda yayın. Bu bir tasarım önerisidir; gelir veya teslimat süresi garantisi değildir. Video kaynakları aynı noktada birleşiyor: üretim bileşenleri güçlü olsa da bütün zincirin güvenilirliği ayrı bir mühendislik işi. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)

İlk pilotta bir LLM, karşılaştırılan iki Türkçe ses sağlayıcısından biri ve tek render motoru yeterli. Ürün için onaylı görselleri kullan; jeneratif videoyu yalnızca anlatıya değer katan sahnelere ekle. Yayın hesabı ve uygulama izinlerini yaratıcı üretimle eşzamanlı hazırla.

### Beş üretim yaklaşımı

| Yaklaşım                  | En uygun kullanım                             | Sınırı                                                    | Pilot kararı                             |
| ------------------------- | --------------------------------------------- | --------------------------------------------------------- | ---------------------------------------- |
| Stok + ses + altyazı      | Basit açıklayıcı, düşük maliyetli kısa video  | Anahtar kelimeye göre stok eşleşmesi anlatıyı kaçırabilir | Özgün analiz ve editoryal kontrolle dene |
| Avatar / sunucu           | Eğitim, onboarding, B2B anlatım, lokalizasyon | Rıza, Türkçe telaffuz ve dudak uyumu                      | Gerçek izleyiciyle kör değerlendirme     |
| Jeneratif sahneler        | Ürün atmosferi, sinematik B-roll, kampanya    | Sahne tutarlılığı, tekrar üretim maliyeti                 | Onaylı görselden kısa sahneler üret      |
| Uzun içerikten kısa video | Webinar, podcast, mevcut demo                 | Kaynak materyal ve bağlamın korunması gerekir             | Kaynak içerik varsa ilk aday             |
| Programatik kurgu         | Marka şablonu, ürün kataloğu, veri grafikleri | Yaratıcı varlıkları kendisi üretmez                       | Üretim hattının ortak temeli             |

MoneyPrinterTurbo ve ShortGPT hızlı stok tabanlı başlangıç sağlar. OpenMontage kaynaklarda daha ajansal prodüksiyon örneği olarak sunuluyor; araç/skill sayıları ve olgunluk iddiaları bağımsız doğrulanmadı. Bir projeyi üretime alırken lisansı, güncelliği, kimlik doğrulaması ve bağımlılıkları ayrıca incele. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)

### Üretim hattının kalbi: timeline ve varlık manifestosu

Videonun esas kaydı yalnızca son MP4 olmamalı. Brief, senaryo sürümü, sahne kimliği, referans görsel, üretim denemeleri, ses, altyazı zamanları, timeline, onay ve platform gönderi kimliği birlikte tutulmalı. Sağlayıcı değiştiğinde bu kayıt korunur. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03)

**Şablonla başla:** Creatomate, Shotstack veya JSON2Video hızlı bir ilk hat için adaydır. React ile karmaşık grafik ve marka animasyonu gerekiyorsa Remotion; encode, mux, ölçekleme, ses ve teknik kontroller için FFmpeg değerlendir. Remotion’ın kaynak erişimi, MIT lisansı anlamına gelmez; şirket kullanımını lisans koşulları belirler. [Resmî lisans](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)

Sesi sahne sürelerinden bağımsız üretip sonradan rastgele sıkıştırma. Telaffuz sözlüğünü sürümle; Türkçe ürün adları, sayılar, kısaltmalar ve yabancı isimlerle test et. ASR/forced alignment çıktısını altyazıya dönüştür; satır uzunluğu, güvenli alan, okuma hızı ve son sözcüğün kesilmemesini kontrol et. Google TTS, ElevenLabs, Whisper/Scribe ve diğerleri kaynakların aday havuzudur; “Türkçede en iyi” kararı bu raporda ölçülmüş değildir. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)

### Yayınlamak da bir durum makinesi

YouTube, TikTok, Instagram/Facebook ve LinkedIn için ayrı adaptör kullan. Ortak arayüz; gönderim, durum sorgusu, token yenileme, hata sınıflandırma ve sonuç kaydını kapsasın. HTTP 200, videonun herkese açık olarak yayında olduğunu kanıtlamaz. Processing ve moderasyon durumunu izle. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03)

| Platform  | Tasarımda korunacak ayrım                             | Doğrulama                                                                           |
| --------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------- |
| YouTube   | Proje kotası, kanal sınırı ve audit ayrı konular      | Güncel tabloda videos.insert için 100 çağrı/gün; eski 1.600 birim hesabını kullanma |
| TikTok    | Creator bilgisi, kullanıcı onayı, görünürlük, audit   | Denetlenmemiş istemciler private ile sınırlı; init için token başına 6 istek/dk     |
| Instagram | Container → processing → publish; login yolu ve scope | 90 saniye evrensel API sınırı değil; Meta örneği 3 sn–15 dk                         |
| LinkedIn  | Medya upload ile post oluşturma farklı işlemler       | Organizasyon/üye izinlerini ve kullanılan sürümü hesap üzerinde sınama              |

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

| Katman                     | Kaynaklardaki örnekler                            | Seçim sorusu                                                |
| -------------------------- | ------------------------------------------------- | ----------------------------------------------------------- |
| IDE / CLI ajanı            | Codex, Claude Code, Cursor, Copilot, Aider, Cline | Kendi repo görevlerinde doğru değişiklik yapabiliyor mu?    |
| İzole ajan ortamı          | OpenHands, worktree, container/VM                 | Dosya ayrımı mı gerekiyor, güvenlik izolasyonu mu?          |
| Spec / bağlam              | AGENTS.md, Spec Kit, ADR, alan sözlüğü            | Komutlar, sınırlar ve done kriteri açık mı?                 |
| Test ve review             | Playwright, CodeRabbit, Qodo, Copilot review      | Gerçek hatayı yakalıyor mu, inceleme yükünü azaltıyor mu?   |
| Deterministik güvenlik     | Semgrep, CodeQL, dependency/secret scan           | Kritik bulgu build’i durduruyor mu?                         |
| Model serving              | vLLM, SGLang, MLX, llama.cpp/Ollama               | Gerçek eşzamanlı yükte kalite, gecikme ve maliyet ne?       |
| RAG / uygulama framework’ü | LlamaIndex, Haystack, LangGraph                   | Repo dışı bilgi veya kalıcı dallanan iş akışı gerekiyor mu? |

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

| Seçenek              | Ne zaman değerli?                                     | Operasyonel bedel                                      |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| n8n                  | Webhook, HTTP, DB, onay ve iş sistemi entegrasyonları | Queue/concurrency, secrets, yükseltme ve hata yönetimi |
| Make / Zapier        | Teknik olmayan ekibin dar kapsamlı otomasyonu         | İşlem bazlı maliyet, plan sınırları ve dışa taşıma     |
| Temporal             | Uzun süren, yeniden başlayabilen, kritik iş akışı     | Workflow determinismi ve yeni altyapı                  |
| Container workers    | FFmpeg/Remotion render                                | Kaynak sınırı, job izolasyonu ve ölçekleme             |
| ComfyUI + GPU worker | Gizlilik veya ölçülmüş yüksek hacimli üretim          | Model lisansı, VRAM, cold start ve kapasite            |
| OpenClaw / ajan SDK  | Araştırma, triage, öneri ve mesajlaşma                | Tool izinleri ve dış içerik güvenliği                  |

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

| Risk                      | Erken sinyal                               | Kontrol                                             | Sorumlu rol    |
| ------------------------- | ------------------------------------------ | --------------------------------------------------- | -------------- |
| Sahne / ürün tutarsızlığı | Yüksek insan ret oranı                     | Onaylı referanslar, sahne bazlı yeniden üretim      | İçerik editörü |
| Mükerrer yayın            | Timeout sonrası ikinci post                | İdempotency, işlem uzlaştırma, platform ID’si       | Backend        |
| Maliyet taşması           | Attempt ve token artışı                    | İş başına bütçe, tur/süre limiti, alarm             | Operasyon      |
| Prompt injection          | Araç çıktısındaki eylem talimatı           | Trust boundary, sınırlı yetki, veri çıkışı kontrolü | Güvenlik       |
| Test zayıflatma           | Silinen assertion veya test                | Test diff incelemesi, davranış sözleşmesi           | Reviewer       |
| Gizli veri sızıntısı      | Prompt/log içinde kişisel veri veya secret | Sentetik fixture, maskeleme, dar erişim             | Veri sorumlusu |
| Sağlayıcı kapanışı        | Deprecation ve model ID değişimi           | Adaptör, sürüm kayıtları, alternatif pilot          | Teknik lider   |
| İçerik hakları            | Asset’in rıza/lisans kaydı yok             | Asset bazlı kullanım kaydı ve yayın kapısı          | İçerik/uyum    |
| Yayın erişimi             | İşlem başarılı ama private                 | Audit, hesap izinleri, görünürlük sorgusu           | Entegrasyon    |
| Review darboğazı          | PR kuyruğu ve yeniden iş artışı            | Küçük işler, kapasite limiti, net sahiplik          | Ekip lideri    |

Bu risk öncelikleri analitik sentezdir; ölçülmüş olasılık yüzdeleri değildir. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)

### Provenans, bildirim ve haklar

C2PA içerik geçmişinin doğrulanabilir kaydını, watermark ise farklı bir işaretleme mekanizmasını temsil eder. Yeniden kodlama veya düzenleme sonrası imzanın/manifestonun geçerliliği ayrıca sınanmalıdır; basit metadata pass-through bütün provenansı koruma garantisi değildir. Yayın platformunun AI bildirimi de ayrı bir adımdır. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03)

YouTube’un 15 Temmuz 2025 tarihli güncellemesi tekrarlı/kitlesel içerik konusunu açıklar. AI kullanmak tek başına para kazanmayı engellemez; özgün yorum, anlatı ve izleyiciye değer esas alınır. Kaynaklardaki “AI etiketini kaybetmek otomatik %90 erişim düşüşü yaratır” veya “repost kesin shadowban getirir” ifadelerine doğrulanmış platform kuralı olarak yer vermiyoruz. [YouTube politikası](https://support.google.com/youtube/answer/1311392)

EU AI Act’te sağlayıcı ve kullanan tarafın sorumlulukları farklıdır. Konsolide metin, 2 Ağustos 2026 öncesinde piyasaya sunulmuş ilgili sistemlerin sağlayıcılarına Madde 50(2) için 2 Aralık 2026’ya kadar geçiş verir. Her AI medyası için aynı teknik işaretin zorunlu olduğu çıkarımı yapılmamalı; kapsam ve istisnalar kullanım özelinde değerlendirilir. [Konsolide mevzuat](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng)

Gerçek kişinin sesini/yüzünü, kişisel logları ve müşteri belgelerini kullanırken hak, rıza ve veri aktarımı koşulları netleştirilmelidir. Müzik için platform, kanal, ticari kullanım ve abonelik sonrasındaki hakları kayıt altına al. Suno/Udio, Artlist veya Epidemic planlarıyla ilgili kaynak fiyatları ve davalara dair tarihsel iddialar güncel sözleşme yerine geçmez. [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)

### Henüz bilmediğimiz şeyler

Günlük hacim, eşzamanlı iş, hedef platform, ortalama süre, marka sayısı, bütçe, veri ikameti, onay SLA’sı, telif kapsamı ve gerçek izleyici tepkisi belirlenmeden “en iyi stack” kararı kesinleşmez.

Yazılım tarafında da repo büyüklüğü, mevcut test kalitesi, gerçek aylık token kullanımı, cache oranı, inceleme yükü ve self-host bakım kapasitesi ölçülmelidir. D06’daki 15 ajan ve GPU donanımı anlatımı, bu portalın kullanıcısına ait doğrulanmış canlı kapasite verisi değildir.

### Sayıları karara taşıma biçimi

Önceki sürümün fiyat, benchmark, GitHub yıldızı, GPU eşiği ve RPM projeksiyonlarını yalnız arşivde bırakması içerik kaybıydı. Bu sürümde bunlar [sayısal kayıtlar](https://karacaismail.github.io/futuristic/#/claims) içinde kaynak ifadesi ve değerlendirmesiyle birlikte, ilgili [uygulama rehberinde](https://karacaismail.github.io/futuristic/#/guide) ise karar bağlamıyla yer alır. Doğrulanmamış olmak, görünmez bırakılma gerekçesi değildir.

Örneğin D05’teki 30 × $0,75 hesabı $12 değil $22,50’dir. D06’daki 150M token × $0,28/M = $42, €889 GPU’nun otomatik break-even kanıtı değildir. Özgün rakam ve düzeltme yan yana korunur. Q8 “kayıpsız”, KV cache “logaritmik”, MCP “halüsinasyonu engeller” gibi genellemelerin sınırları ilgili rehberlerde açıklanır.

[Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security), [KVKK / RTÜK](https://karacaismail.github.io/futuristic/#/guide?topic=turkey-compliance), [müzik hakları](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) ve [provenance](https://karacaismail.github.io/futuristic/#/guide?topic=provenance) dosyaları riskin uygulanabilir kontrolünü ayrıntılandırır.


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

| Video operasyonu                    | Yazılım operasyonu                        |
| ----------------------------------- | ----------------------------------------- |
| Kabul edilen saniye başına maliyet  | Kabul edilen görev / merge başına maliyet |
| İlk denemede kabul oranı            | İlk CI geçiş oranı                        |
| Editör dakikası / video             | Review ve rework dakikası / PR            |
| Yayınlama başarısı ve görünürlük    | Change failure ve escaped defect          |
| İzleyici tutulması ve ürün dönüşümü | PR cycle time ve ekip memnuniyeti         |

Yalnızca üretilen video veya kod satırı sayısı başarı ölçütü değildir. Baseline, dönem, örneklem ve ölçüm yöntemiyle birlikte karar ver.


---

## 6. Yöntem ve kapsam

### Kapsam ve yöntem

Bu rapor 17 Eylül 2026 tarihinde kapsamı genişletilen bir araştırma sentezidir. Kullanıcının paylaştığı altı belgenin tamamı değişmeden arşivlendi. Video belgeleri D01/D03/D05; yazılım belgeleri D02/D04/D06 olarak kimliklendirildi. Ortak öneriler birleştirildi, farklı senaryolar ayrı tutuldu ve karar etkisi yüksek seçilmiş iddialar birincil kaynaklardan kontrol edildi.

**Arşiv bütünlüğü, anlamsal kapsam ve doğrulama ayrı sorumluluklardır.** İlk sürüm arşivi korudu fakat birçok yöntemi ve sayısal veriyi karar metnine taşımadı. Bu eksik, 29 ayrıntılı rehber, 177 araç kaydı ve 70 sayısal kayıtla giderilmeye çalışıldı; kapsam haritası denetimi görünür kılar. Konu eşleşmesi tek başına her ayrıntının yeterince açıklanmış olduğunun otomatik kanıtı değildir. Dış bağlantıların tamamı indekslendi; hepsinin güncel fiyatı, bütün sayfaların içeriği veya bütün akademik sonuçlar yeniden araştırılmadı. Doğrulama tablosu kontrol edilen iddiayı, tarihi, ilgili belgeyi ve kanıt bağlantısını ayrı gösterir.

### Dört kanıt seviyesi

- **Doğrulandı:** bağlantılı birincil kaynak, belirtilen dar iddiayı destekliyor.
- **Düzeltildi:** özgün belgede tarih, limit veya yorum sorunu var; sentezde düzeltme kullanılıyor.
- **Kaynak aktarımı:** belgede bulunan bağlantı, araç veya iddia; yeniden doğrulama anlamına gelmiyor.
- **Sentez / varsayım:** bu raporun mimari önerisi, deney tasarımı veya kullanıcı kontrollü hesap girdisi.

Araç kataloğu kaynakların rol ve kullanım senaryolarını bir araya getirir. Bir araç kartında yer almak, bağımsız performans testi, satın alma önerisi veya mevcut API erişimi garantisi değildir. Fiyatlar, skorlar, kapasite ve gelir projeksiyonları artık kaynak iddiası / kontrol / düzeltme / çelişki / senaryo durumlarıyla görünürdür. Farklı benchmark harness’leri tek sıralama yapılmaz; araç detayında fiyat, lisans, limit, olgunluk, entegrasyon, iş akışı ve kaynak pasajı bulunur.

### Kaynak izlenebilirliği

Her özgün dosya byte uzunluğu ve SHA-256 ile manifestoda yer alır. Kaynak sayfasında tam metni okumak, tek dosyayı indirmek veya altı belgeyi manifestoyla ZIP olarak almak mümkündür. Özgün TXT dosyaları ihtiyaç anında yüklenir. Konu/kapsam indeksi açıklamalı rehber ve kaynak pasajlarını da taşır.

İki belgede paragraf/satır ayrımları aktarım sırasında kaybolmuştur. Orijinal dosya aynen korunur; okuma görünümü cümle sınırlarında pasaj ve paragraf araları oluşturur. “Kaynak pasajı” etiketleri yeni okuma bölümlemesidir; kayıp özgün başlıkların aynen geri getirildiği iddia edilmez. Düz metin görünümü ve özgün indirme ayrıca korunur. Diğer belgelerin Markdown, tablo, kod ve şema metinleri de özgün biçimleriyle indirilebilir.

D03/D04’teki eski sohbet atıf belirteçleri (`turn…search…` vb.) erişilebilir kaynak URL’si değildir. Bu belirteçlerden bağlantı uydurulmaz; orijinal metinde saklanır ve çözümlenemeyen atıf olarak sayılır. Açık URL’ler, çıplak alan adları, açık GitHub repo kimlikleri ve arXiv numaraları ayrı indekslenir.

### Tasarım tercihleri

Mobil kullanıcı önce kararı, özeti ve sonraki adımı görür. Alt gezinme ve bölüm paneli tek elle erişilir. Uzun rapor alt bölümlere ayrılır; araç karşılaştırması dar ekranda dikey kartlara dönüşür. 48px etkileşim alanı, klavye odağı, reduced motion ve cihaz güvenli alanı tasarımın temelidir.

Masaüstünde kalıcı içerik menüsü, daha geniş karşılaştırma alanı ve aynı URL/okuma durumu kullanılır. Okundu ve yol haritası işaretleri yalnızca bu tarayıcıda saklanır; hesap veya cihazlar arası senkronizasyon yoktur. Depolama engellenirse oturum içi kullanım devam eder.

### Teknik kapsam

Portal React, TypeScript, Vite, Tailwind CSS ve daisyUI ile hazırlanmış statik bir GitHub Pages uygulamasıdır. Gerçek video üretimi, ücretli model çağrısı, sosyal hesap bağlantısı veya sunucu tarafı ajan çalıştırma içermez. Hesaplayıcı bir planlama aracıdır; canlı fiyat servisi değildir.

DX için birim ve tarayıcı testleri, tip kontrolü, sürümü sabitlenmiş bağımlılıklar, kaynak bütünlüğü testi ve GitHub Actions yayın hattı kullanılır. Test başarısızsa yeni sürüm yayın aşamasına geçmez.

### Anlamsal kapsam nasıl denetlenir?

[Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage) altı belgeyi bölüm/pasaj sırasıyla gösterir. Her kayıt gerçek kaynak karakter aralığı ve ilgili konu bağlantılarını taşır. Yöntem rehberleri amaç, girdi/çıktı, adımlar, sınırlamalar ve seçim gerekçesini açıklar. Kaynağın yalnız alternatif olarak adını andığı ürünlerde eksik fiyat veya yetenek uydurulmaz.

İsmail’e özel bağlam [karar haritasında](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack); sayılar [iddia defterinde](https://karacaismail.github.io/futuristic/#/claims); özgün belgelere ait 112 açık referans [kütüphanede](https://karacaismail.github.io/futuristic/#/sources?tab=references) yer alır. Yeni kontrol bağlantıları ilgili rehber ve kayıtta gösterilir, 112 özgün referans sayısıyla karıştırılmaz. İndirilebilir rapor bu rehberleri, sayısal kayıtları ve araç detaylarını içerir.

Tema açık/koyu/sistem olarak seçilebilir. Tipografi en az 1rem’dir; ana okuma metni daha büyük, metadata ve kontroller en az taban boyuttadır. Formatter, lint, tip kontrolü, içerik bağlantıları ve mobil/masaüstü davranışları CI’da doğrulanır.


## 7. Maliyet modeli

Aylık toplam = video sayısı × video başına üretilen saniye × saniye birim fiyatı × kabul başına ortalama deneme + video sayısı × inceleme dakikası / 60 × saatlik insan maliyeti + video sayısı × diğer değişken gider + sabit gider.

**Örnek senaryo, güncel teklif değildir:** 100 video/ay, 30 üretilen saniye/video, $0,12/sn, 2 deneme, 5 dakika inceleme/video, $12/saat insan emeği, $0,50 diğer/video ve $50 sabit gider → $720 üretim + $100 insan + $50 diğer + $50 sabit = **$920/ay**. Video başına $9,20; kabul edilen saniye başına üretim $0,24. Deneme sayısı 4 olduğunda toplam $1.640 olur. Vergi ve kur etkisi dahil değildir. [D03 ve D05 sentezi]

[Kendi senaryonu hesapla](https://karacaismail.github.io/futuristic/#/cost). Self-host karşılaştırmasında GPU kirası, idle kapasite, model lisansı, bakım emeği, disk/egress ve aynı kaliteyi yakalama maliyeti ayrıca hesaba katılır.

## 8. Araç ve teknoloji kataloğu

Bu katalog kaynak sentezidir; fiyat, lisans, limit, entegrasyon ve karar bağlamı içerir. Kaynak fiyatları güncel teklif değildir.

### T01 · Veo

**Video · Bulut · D01, D03, D05**

Görsel ve metinden sahne üretimi. Ürün atmosferi ve kontrollü kısa planlar

- **Fiyat ve birim:** D05 $0,75/sn ve Fast $0,15/sn; 30 saniye × $0,75 = $22,50. Güncel teklif değil.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Sürüm, bölge, süre ve tekrar üretim maliyeti
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında görsel ve metinden sahne üretimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Ürün atmosferi ve kontrollü kısa planlar. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T01) · [Kaynak bağlantısı](https://cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate)

### T02 · Runway

**Video · Bulut · D01, D03, D05**

Jeneratif video ve dönüşüm. API ile sahne üretimi

- **Fiyat ve birim:** Kontrol edilen API tablosu: kredi $0,01; Gen-4.5 12 kredi/sn, Veo 3.1 sesli 40 kredi/sn.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Model ve endpoint özellikleri ayrı doğrulanmalı
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında jeneratif video ve dönüşüm. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** API ile sahne üretimi. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T02) · [Kaynak bağlantısı](https://docs.dev.runwayml.com/)

### T03 · Luma

**Video · Bulut · D03, D05**

Sahne üretimi ve video dönüşümü. Görselden video pilotu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Asenkron job ve kalite değişkenliği
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında sahne üretimi ve video dönüşümü. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Görselden video pilotu. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T03) · [Kaynak bağlantısı](https://docs.lumalabs.ai/)

### T04 · Kling

**Video · Bulut · D01, D03, D05**

Jeneratif sahne ve hareket kontrolü. Ürün referansı ile sahne karşılaştırması

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** API erişimi, lisans ve model sürümü
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında jeneratif sahne ve hareket kontrolü. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Ürün referansı ile sahne karşılaştırması. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T04) · [Kaynak bağlantısı](https://kling.ai/)

### T05 · MiniMax / Hailuo

**Video · Bulut · D03, D05**

Video ve ses ailesi. Tek sağlayıcıyla video/ses pilotu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Model ve ücretleri ayrı değerlendirmek gerekir
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında video ve ses ailesi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Tek sağlayıcıyla video/ses pilotu. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T05) · [Kaynak bağlantısı](https://platform.minimax.io/)

### T06 · Adobe Firefly

**Video · Bulut · D03**

Görsel, video ve yaratıcı servisler. Adobe üretim ekosistemi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** UI özellikleri API kapsamını garanti etmez
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında görsel, video ve yaratıcı servisler. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Adobe üretim ekosistemi. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T06) · [Kaynak bağlantısı](https://developer.adobe.com/firefly-services/docs/firefly-api/)

### T07 · HeyGen

**Avatar · Bulut · D03, D05**

Sunucu, çeviri ve avatar. B2B anlatım ve lokalizasyon

- **Fiyat ve birim:** D05 Creator $29/ay yıllık; Avatar V API $0,05/sn. UI/API ayrı.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** D03 175+ dil, batch100; Türkçe/lip-sync ve API concurrency ayrı ölçülür.
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında sunucu, çeviri ve avatar. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı metin/ses ve rıza → async avatar → telaffuz/lip-sync → final onay.
- **Seçim gerekçesi:** B2B anlatım ve lokalizasyon. Avatar ve canlı persona rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T07) · [Kaynak bağlantısı](https://docs.heygen.com/)

### T08 · Synthesia

**Avatar · Bulut · D03, D05**

Metinden sunuculu video. Eğitim ve onboarding

- **Fiyat ve birim:** D05 Starter ~$18/ay yıllık; D03 free 10 dk/ay.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Yaratıcı kontrol ve sözleşme kapsamı
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında metinden sunuculu video. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı metin/ses ve rıza → async avatar → telaffuz/lip-sync → final onay.
- **Seçim gerekçesi:** Eğitim ve onboarding. Avatar ve canlı persona rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T08) · [Kaynak bağlantısı](https://docs.synthesia.io/)

### T09 · Tavus

**Avatar · Bulut · D03, D05**

Etkileşimli video persona. Canlı konuşan avatar

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Offline video render ile aynı kullanım değil
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında etkileşimli video persona. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı metin/ses ve rıza → async avatar → telaffuz/lip-sync → final onay.
- **Seçim gerekçesi:** Canlı konuşan avatar. Avatar ve canlı persona rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T09) · [Kaynak bağlantısı](https://docs.tavus.io/)

### T10 · ElevenLabs

**Ses · Bulut · D01, D03, D05**

TTS, dublaj ve transkripsiyon. Türkçe ses karşılaştırması

- **Fiyat ve birim:** D05 free 10.000 karakter/ay; ücret model/voice/plan bazında.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Telaffuz ve ses hakkı ayrıca değerlendirilir
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında tts, dublaj ve transkripsiyon. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli metin/ses → üretim/transkripsiyon → hizalama → Türkçe/QC → timeline.
- **Seçim gerekçesi:** Türkçe ses karşılaştırması. Türkçe ses, altyazı ve lokalizasyon rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T10) · [Kaynak bağlantısı](https://elevenlabs.io/docs)

### T11 · Google Cloud TTS

**Ses · Bulut · D03, D05**

Metinden konuşma. Türkçe ses ve SSML tabanlı akış

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Seçilen ses/model bazında ölçüm
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında metinden konuşma. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli metin/ses → üretim/transkripsiyon → hizalama → Türkçe/QC → timeline.
- **Seçim gerekçesi:** Türkçe ses ve SSML tabanlı akış. Türkçe ses, altyazı ve lokalizasyon rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T11) · [Kaynak bağlantısı](https://cloud.google.com/text-to-speech/docs)

### T12 · OpenAI TTS

**Ses · Bulut · D03, D05**

Metinden konuşma. LLM ile ortak sağlayıcı akışı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Ses seçenekleri ve fiyatı model bazında teyit
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında metinden konuşma. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli metin/ses → üretim/transkripsiyon → hizalama → Türkçe/QC → timeline.
- **Seçim gerekçesi:** LLM ile ortak sağlayıcı akışı. Türkçe ses, altyazı ve lokalizasyon rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T12) · [Kaynak bağlantısı](https://platform.openai.com/docs/guides/text-to-speech)

### T13 · Whisper

**Ses · Yerel · D05**

Sesin metne dökülmesi. Altyazı üretimi ve kontrol

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Hizalama, özel terim ve konuşma kalitesi
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında sesin metne dökülmesi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli metin/ses → üretim/transkripsiyon → hizalama → Türkçe/QC → timeline.
- **Seçim gerekçesi:** Altyazı üretimi ve kontrol. Türkçe ses, altyazı ve lokalizasyon rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T13) · [Kaynak bağlantısı](https://github.com/openai/whisper)

### T14 · Remotion

**Kurgu · Yerel · D01, D03, D05**

React ile programatik video. Marka motion sistemi ve veri grafikleri

- **Fiyat ve birim:** D05 $25/seat veya $0,01/render, min $100/ay; ücretsiz koşullar ayrıca.
- **Lisans ve haklar:** Özel ticari lisans; birey/≤3 çalışan ücretsiz koşulu V09’da kontrol edildi. MIT değil.
- **Sınırlar:** Şirket lisansı ve render operasyonu
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında react ile programatik video. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Marka motion sistemi ve veri grafikleri. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T14) · [Kaynak bağlantısı](https://github.com/remotion-dev/remotion)

### T15 · FFmpeg

**Kurgu · Yerel · D01, D03, D05**

Encode, filtre, ses ve mux. Deterministik medya işlemleri

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Build seçeneklerine göre LGPL/GPL ve codec yükümlülükleri incelenir.
- **Sınırlar:** Yaratıcı sahne üretmez; build lisansı incelenir
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında encode, filtre, ses ve mux. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Deterministik medya işlemleri. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T15) · [Kaynak bağlantısı](https://ffmpeg.org/)

### T16 · Shotstack

**Kurgu · Bulut · D03, D05**

JSON timeline ve cloud render. API ile hızlı üretim hattı

- **Fiyat ve birim:** D05 $0,30/dk PAYG; $39/ay planda $0,20/dk.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kullanım maliyeti ve sağlayıcı bağımlılığı
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında json timeline ve cloud render. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** API ile hızlı üretim hattı. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T16) · [Kaynak bağlantısı](https://shotstack.io/docs/)

### T17 · Creatomate

**Kurgu · Bulut · D03, D05**

Şablon ve JSON ile render. Sosyal video varyantları

- **Fiyat ve birim:** D05 $49–54/ay, 2.000 kredi; ~720p dakika14 kredi.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kredi modeli ve template sınırları
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında şablon ve json ile render. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Sosyal video varyantları. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T17) · [Kaynak bağlantısı](https://creatomate.com/docs/api/introduction)

### T18 · JSON2Video

**Kurgu · Bulut · D03, D05**

JSON ile sahne birleştirme. Basit otomatik video şablonları

- **Fiyat ve birim:** D05 $49,95/ay/200 dk Full HD; ücretsiz600 kredi; 4K4×.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Render ve çözünürlük maliyeti
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında json ile sahne birleştirme. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Basit otomatik video şablonları. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T18) · [Kaynak bağlantısı](https://json2video.com/docs/)

### T19 · auto-editor

**Kurgu · Yerel · D03**

Sessizlik tabanlı otomatik kesim. Konuşma içeriklerini temizleme

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Anlatı/viral an seçiminin yerine geçmez
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında sessizlik tabanlı otomatik kesim. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Konuşma içeriklerini temizleme. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T19) · [Kaynak bağlantısı](https://github.com/WyattBlue/auto-editor)

### T20 · OpusClip

**Kurgu · Bulut · D03, D05**

Uzun videodan kısa kesitler. Podcast ve webinar yeniden kullanımı

- **Fiyat ve birim:** D05 Starter15$/ay; API planı D03 ile çelişiyor.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** D03 public/Pro API30req/dk/key; D05 API Business. Çelişki çözülmedi.
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında uzun videodan kısa kesitler. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Podcast ve webinar yeniden kullanımı. Uzun videodan kısa içerik rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T20) · [Kaynak bağlantısı](https://www.opus.pro/)

### T21 · MoneyPrinterTurbo

**Kurgu · Yerel · D01, D05**

Stok, ses ve altyazı otomasyonu. Hızlı faceless pilot

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Auth, lisans, secret ve editoryal katman gerekir
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında stok, ses ve altyazı otomasyonu. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Hızlı faceless pilot. Director ve sahne ajanları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T21) · [Kaynak bağlantısı](https://github.com/harry0703/MoneyPrinterTurbo)

### T22 · ShortGPT

**Kurgu · Yerel · D01, D05**

Programlanabilir kısa video üretimi. Stok ve dublaj deneyleri

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Bağımlılık ve bakım durumunu incele
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında programlanabilir kısa video üretimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Stok ve dublaj deneyleri. Director ve sahne ajanları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T22) · [Kaynak bağlantısı](https://github.com/RayVentura/ShortGPT)

### T23 · ComfyUI

**Model · Yerel · D03, D05**

Düğüm tabanlı inference workflow. Yerel video/görsel GPU üretimi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D03 çekirdek GPL-3.0; node ve model ağırlığı ayrı.
- **Sınırlar:** İleri workflow için D03 32 GB+ VRAM/100 GB+ disk örneği; bütün kurulumların minimumu değil. Model/node lisansı ve VRAM ayrıca.
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında düğüm tabanlı inference workflow. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Yerel video/görsel GPU üretimi. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T23) · [Kaynak bağlantısı](https://github.com/Comfy-Org/ComfyUI)

### T24 · LTX-2

**Model · Yerel · D03, D05**

Video ve ses üretim modeli. Hibrit GPU pilotu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Ağırlık lisansı ve donanım benchmark’ı
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında video ve ses üretim modeli. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Hibrit GPU pilotu. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T24) · [Kaynak bağlantısı](https://github.com/Lightricks/LTX-2)

### T25 · Wan 2.2

**Model · Yerel · D03, D05**

Açık video model ailesi. Yerel sahne üretimi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Daha yeni Wan sürümlerine lisansı genelleme
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında açık video model ailesi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Yerel sahne üretimi. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T25) · [Kaynak bağlantısı](https://github.com/Wan-Video/Wan2.2)

### T26 · HunyuanVideo

**Model · Yerel · D03, D05**

Video üretim modeli. GPU tabanlı araştırma/pilot

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Donanım ve ticari kullanım koşulları
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında video üretim modeli. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** GPU tabanlı araştırma/pilot. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T26) · [Kaynak bağlantısı](https://github.com/Tencent-Hunyuan/HunyuanVideo)

### T27 · CogVideo

**Model · Yerel · D03, D05**

Video üretim ve ince ayar. Kontrollü açık model deneyi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Model/weight lisansı ve kaynak ihtiyacı
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında video üretim ve ince ayar. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Kontrollü açık model deneyi. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T27) · [Kaynak bağlantısı](https://github.com/zai-org/CogVideo)

### T28 · Postiz

**Yayın · Hibrit · D05**

Sosyal içerik planlama. Kontrollü self-host yayın katmanı

- **Fiyat ve birim:** D05 self-host ücretsiz, cloud $29/ay.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Platform uygulama ve OAuth gereksinimleri
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Hibrit ortamında sosyal içerik planlama. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı artifact hash → platform adaptörü → status/post ID → analytics.
- **Seçim gerekçesi:** Kontrollü self-host yayın katmanı. Yayın API’leri ve sosyal dağıtım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T28) · [Kaynak bağlantısı](https://github.com/gitroomhq/postiz-app)

### T29 · Blotato

**Yayın · Bulut · D05**

Çoklu sosyal yayın katmanı. Entegrasyon pilotunu hızlandırma

- **Fiyat ve birim:** D05 $29/ay, dokuz platform.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Hesap izinlerini ve plan kapsamını teyit et
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında çoklu sosyal yayın katmanı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı artifact hash → platform adaptörü → status/post ID → analytics.
- **Seçim gerekçesi:** Entegrasyon pilotunu hızlandırma. Yayın API’leri ve sosyal dağıtım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T29) · [Kaynak bağlantısı](https://blotato.com/)

### T30 · Upload-Post

**Yayın · Bulut · D01, D05**

Sosyal yayın API katmanı. Dar kapsamlı yayın pilotu

- **Fiyat ve birim:** D05 aylık24$, yıllık16$/ay; ücretsiz10 upload/ay.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kota, desteklenen platform ve plan
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında sosyal yayın api katmanı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı artifact hash → platform adaptörü → status/post ID → analytics.
- **Seçim gerekçesi:** Dar kapsamlı yayın pilotu. Yayın API’leri ve sosyal dağıtım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T30) · [Kaynak bağlantısı](https://upload-post.com/)

### T31 · Ayrshare

**Yayın · Bulut · D05**

Birleşik sosyal API. Çoklu müşteri/hesap entegrasyonu

- **Fiyat ve birim:** D05 $149/ay; 30+ profil için farklı ücretleme.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Profil bazlı maliyet ve sözleşme
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında birleşik sosyal api. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı artifact hash → platform adaptörü → status/post ID → analytics.
- **Seçim gerekçesi:** Çoklu müşteri/hesap entegrasyonu. Yayın API’leri ve sosyal dağıtım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T31) · [Kaynak bağlantısı](https://www.ayrshare.com/)

### T32 · n8n

**Orkestrasyon · Hibrit · D01, D03, D05, D06**

Webhook ve deterministik iş akışı. Video hattı, CI bildirimleri ve onay

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Fair-code / Sustainable Use koşulları; açık kaynak ile eşitlenmez.
- **Sınırlar:** Fair-code lisans; queue ve secrets yönetimi
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Hibrit ortamında webhook ve deterministik iş akışı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Video hattı, CI bildirimleri ve onay. Workflow, retry ve kalıcı durum rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T32) · [Kaynak bağlantısı](https://docs.n8n.io/)

### T33 · Temporal

**Orkestrasyon · Hibrit · D03, D05**

Kalıcı ve uzun süreli workflow. Kritik asenkron üretim işleri

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Yeni altyapı ve deterministik workflow disiplini
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Hibrit ortamında kalıcı ve uzun süreli workflow. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Kritik asenkron üretim işleri. Workflow, retry ve kalıcı durum rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T33) · [Kaynak bağlantısı](https://docs.temporal.io/workflows)

### T34 · Make / Zapier

**Orkestrasyon · Bulut · D03, D05**

Görsel SaaS otomasyonu. Düşük hacimli iş sistemi bağlantıları

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** İşlem maliyeti ve taşınabilirlik
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında görsel saas otomasyonu. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Düşük hacimli iş sistemi bağlantıları. Workflow, retry ve kalıcı durum rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T34) · [Kaynak bağlantısı](https://www.make.com/)

### T35 · OpenClaw

**Orkestrasyon · Yerel · D05, D06**

Araç kullanan otonom ajan. Triage, öneri ve mesajlaşma

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D06 MIT; eklenti/skill ve model şartları ayrı.
- **Sınırlar:** Güçlü araç erişimi; izolasyon ve izin denetimi
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında araç kullanan otonom ajan. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Triage, öneri ve mesajlaşma. Gözlemlenebilirlik ve operasyon rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T35) · [Kaynak bağlantısı](https://github.com/openclaw/openclaw)

### T36 · LangGraph

**Orkestrasyon · Yerel · D04, D05, D06**

Durumlu ajan grafı. Gerçek dallanan ajan iş akışları

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Küçük ihtiyaçta ek karmaşıklık
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında durumlu ajan grafı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Gerçek dallanan ajan iş akışları. Workflow, retry ve kalıcı durum rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T36) · [Kaynak bağlantısı](https://github.com/langchain-ai/langgraph)

### T37 · Codex

**Kodlama · Hibrit · D04, D06**

Repo, terminal ve test ajanı. Tanımlı bug, refactor ve test görevleri

- **Fiyat ve birim:** D06 ChatGPT20$/100$/200$ planları ve API ayrı.
- **Lisans ve haklar:** D04 CLI açık kaynak, modeller/hizmet proprietary; runtime ile hizmet lisansı ayrı.
- **Sınırlar:** İzin, ortam ve model kapasitesi ayrı konular
- **Olgunluk:** D04 yüksek ve hızlı gelişen ürün değerlendirmesi; kaynakta Security beta sonuçları vendor ölçümüdür.
- **Entegrasyon:** Hibrit ortamında repo, terminal ve test ajanı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Tanımlı bug, refactor ve test görevleri. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T37) · [Kaynak bağlantısı](https://github.com/openai/codex)

### T38 · Claude Code

**Kodlama · Hibrit · D02, D06**

Terminal ve araç kullanan ajan. Bağlamlı repo geliştirme

- **Fiyat ve birim:** D06 Max100$/200$; API model token fiyatı ayrı.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Hooks ve alt ajan izinleri gözden geçirilmeli
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Hibrit ortamında terminal ve araç kullanan ajan. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Bağlamlı repo geliştirme. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T38) · [Kaynak bağlantısı](https://code.claude.com/docs/)

### T39 · Cursor

**Kodlama · Bulut · D02, D04, D06**

Ajan odaklı IDE. Etkileşimli geliştirme ve repo keşfi

- **Fiyat ve birim:** D04 $20/$60/$200; D06 plan/concurrency teyidi.
- **Lisans ve haklar:** D04 proprietary.
- **Sınırlar:** Kota, ortam erişimi ve review yükü
- **Olgunluk:** D04 çok yüksek ürün olgunluğu değerlendirmesi; plan/kota ve cloud worker yetkileri ayrıca.
- **Entegrasyon:** Bulut ortamında ajan odaklı ide. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Etkileşimli geliştirme ve repo keşfi. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T39) · [Kaynak bağlantısı](https://cursor.com/)

### T40 · GitHub Copilot

**Kodlama · Bulut · D04, D06**

IDE, review ve repo ajanı. GitHub merkezli geliştirme

- **Fiyat ve birim:** D04 $10/$39 plan örnekleri.
- **Lisans ve haklar:** D04 proprietary SaaS. Model, platform ve plan koşulları ayrı.
- **Sınırlar:** Review tam hata kapsamı sağlamaz
- **Olgunluk:** D04 analitik sınıflandırması: çok yüksek. Bu kaynak değerlendirmesi bağımsız ürün sertifikası değildir.
- **Entegrasyon:** D04 GitHub, VS Code, Visual Studio, JetBrains, Xcode, Neovim ve MCP. Completion/chat → agent → review → issue-to-PR; her planda aynı kapsam varsayılmaz.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** GitHub merkezli geliştirme. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T40) · [Kaynak bağlantısı](https://docs.github.com/en/copilot)

### T41 · Aider

**Kodlama · Yerel · D02, D04, D06**

Git ile çalışan terminal ajanı. Model bağımsız küçük değişiklikler

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 Apache-2.0; D02 lisans anlatımıyla uyuşmazlık varsa kullanılan sürümün LICENSE dosyası esas alınır.
- **Sınırlar:** Doğru context ve test altyapısı gerekir
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında git ile çalışan terminal ajanı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Model bağımsız küçük değişiklikler. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T41) · [Kaynak bağlantısı](https://github.com/Aider-AI/aider)

### T42 · OpenHands

**Kodlama · Yerel · D02, D04, D06**

Yazılım ajan platformu. İzole görev ve özelleştirme

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 açık kaynak olarak belirtiliyor; belirli SDK/runtime lisans sürümünü ayrıca kontrol et.
- **Sınırlar:** Sandbox kurulumu ve operasyon
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Python/TypeScript/REST, repo automation ve Docker sandbox; SDK ile özel runner kurulabilir.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** İzole görev ve özelleştirme. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T42) · [Kaynak bağlantısı](https://github.com/OpenHands/openhands)

### T43 · Qwen Code / Coder

**Kodlama · Yerel · D04, D06**

Ajan runtime’ı ve ayrı model ailesi. Açık ekosistem coding pilotu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 Qwen Code runtime Apache-2.0; Coder model ağırlığı artifact koşulları ayrı.
- **Sınırlar:** Runtime ile model ağırlığı lisansı farklı
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** CLI/editor ve MCP; Qwen veya başka modeli kendi test harness’iyle kullan. Runtime, model ve serving motoru farklı seçimler.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Açık ekosistem coding pilotu. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T43) · [Kaynak bağlantısı](https://github.com/QwenLM/qwen-code)

### T44 · Spec Kit

**Kodlama · Yerel · D06**

Spec, plan ve task iş akışı. Uzun ömürlü ve çok modüllü geliştirme

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Küçük görevlerde ek süreç yükü
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında spec, plan ve task iş akışı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Uzun ömürlü ve çok modüllü geliştirme. SDD, AGENTS.md ve bağlam rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T44) · [Kaynak bağlantısı](https://github.com/github/spec-kit)

### T45 · Playwright

**Kalite · Yerel · D04, D06**

Tarayıcı akışı ve E2E testi. Mobil/masaüstü davranış doğrulama

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Test senaryosu ve assertion kalitesi önemli
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında tarayıcı akışı ve e2e testi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Mobil/masaüstü davranış doğrulama. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T45) · [Kaynak bağlantısı](https://playwright.dev/)

### T46 · CodeRabbit

**Kalite · Bulut · D02, D04, D06**

PR bağlamında AI inceleme. Review kuyruğuna yardımcı ilk katman

- **Fiyat ve birim:** D04/D06 yıllık faturalamada $24/$48/$72 kişi-ay.
- **Lisans ve haklar:** D04 proprietary.
- **Sınırlar:** D06 %49,2 precision; yorum yoğunluğu ve kendi PR’ında gerçek hata oranı.
- **Olgunluk:** D04 yüksek olgunluk değerlendirmesi; D06 precision kendi PR’larında yeniden ölçülmeli.
- **Entegrasyon:** D04 GitHub/GitLab PR workflow, Jira/Linear. Ek kullanım bedelleri ve team planı ayrılır.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Review kuyruğuna yardımcı ilk katman. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T46) · [Kaynak bağlantısı](https://coderabbit.ai/)

### T47 · Qodo

**Kalite · Bulut · D02, D04, D06**

Kod kalitesi, test ve review. Kurala dayalı doğrulama pilotu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 proprietary.
- **Sınırlar:** Vendor metrikleri bağımsız ölçüm değil
- **Olgunluk:** D04 yüksek olgunluk değerlendirmesi. Eğitimde kod kullanmama beyanı vendor beyanıdır.
- **Entegrasyon:** IDE, Git, CI ve organization rules; kaynakta Enterprise SSO/BYOK/deployment kontrolleri. Test ve pre-PR kapılarıyla birlikte.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Kurala dayalı doğrulama pilotu. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T47) · [Kaynak bağlantısı](https://www.qodo.ai/)

### T48 · Semgrep

**Kalite · Hibrit · D02, D04, D06**

Statik güvenlik ve triage. CI ve agent değişikliklerini tarama

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 open-core/commercial platform; kullanılan tarayıcı/servis paketi ayrı.
- **Sınırlar:** Kural kapsamı ve veri akışı sınırları
- **Olgunluk:** D04 çok yüksek AppSec olgunluğu değerlendirmesi.
- **Entegrasyon:** IDE, agent hook, MCP, CI ve PR. SAST/SCA/secrets finding → AI triage/autofix → scanner tekrar çalıştırma.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** CI ve agent değişikliklerini tarama. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T48) · [Kaynak bağlantısı](https://semgrep.dev/)

### T49 · SonarQube

**Kalite · Hibrit · D02**

Kalite kapısı ve teknik borç. Kurumsal kod kalite görünürlüğü

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** AI doğruluğu veya güvenlik garantisi değil
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Hibrit ortamında kalite kapısı ve teknik borç. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Kurumsal kod kalite görünürlüğü. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T49) · [Kaynak bağlantısı](https://www.sonarsource.com/products/sonarqube/)

### T50 · Sentry Seer

**Kalite · Bulut · D04, D06**

Telemetry bağlamında hata araştırması. Production hata → kanıt → fix adayı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 proprietary hizmet.
- **Sınırlar:** Kaliteli log/trace ve veri maskeleme gerekir
- **Olgunluk:** D04 yüksek olgunluk değerlendirmesi.
- **Entegrasyon:** Sentry errors/traces/logs/release + GitHub/Slack/MCP. Kök neden hipotezi → reprodüksiyon → testli fix PR.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Production hata → kanıt → fix adayı. Gözlemlenebilirlik ve operasyon rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T50) · [Kaynak bağlantısı](https://docs.sentry.io/product/ai-in-sentry/)

### T51 · Context7

**Kodlama · Bulut · D06**

Kütüphane dokümantasyonunu getirme. Sürüm bağlamı ve API araştırması

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Dönen veri doğrulanmalı; halüsinasyonu sıfırlamaz
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Bulut ortamında kütüphane dokümantasyonunu getirme. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Sürüm bağlamı ve API araştırması. MCP ve domain araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T51) · [Kaynak bağlantısı](https://github.com/upstash/context7)

### T52 · vLLM / SGLang

**Model · Yerel · D02, D06**

Yüksek verimli model serving. Eşzamanlı self-host ajan pilotu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** KV cache, batching, GPU ve bakım maliyeti
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında yüksek verimli model serving. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Eşzamanlı self-host ajan pilotu. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T52) · [Kaynak bağlantısı](https://github.com/vllm-project/vllm)

### T53 · MLX / Ollama

**Model · Yerel · D02, D06**

Yerel model çalıştırma. Mac/kişisel ortamda gizli veri pilotu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Belleğe sığmak hedef gecikmeyi garanti etmez
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında yerel model çalıştırma. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Mac/kişisel ortamda gizli veri pilotu. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T53) · [Kaynak bağlantısı](https://github.com/ml-explore/mlx)

### T54 · LlamaIndex / Haystack

**Orkestrasyon · Yerel · D04**

Bilgi getirme ve veri pipeline’ı. Repo dışı kurumsal bilgi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 LlamaIndex MIT, Haystack Apache-2.0; paket sürümü kontrol edilir.
- **Sınırlar:** Gereksiz RAG eklemek context ve bakım yükü yaratır
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında bilgi getirme ve veri pipeline’ı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Repo dışı kurumsal bilgi. RAG ve kurumsal bilgi getirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T54) · [Kaynak bağlantısı](https://github.com/run-llama/llama_index)

### T55 · SWE-agent

**Kodlama · Yerel · D04**

Araştırma amaçlı repo ajanı. Harness ve agent deneyleri

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 OSS araştırma framework’ü; belirli repo/sürüm lisansı kontrol edilir.
- **Sınırlar:** Benchmark başarısı ürün ROI’si değildir
- **Olgunluk:** Kaynakta kullanım deseni anlatılıyor; üretim olgunluğu ve güncel API kapsamı için görev bazlı PoC gerekir.
- **Entegrasyon:** Yerel ortamında araştırma amaçlı repo ajanı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Harness ve agent deneyleri. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T55) · [Kaynak bağlantısı](https://github.com/swe-agent/swe-agent)

### T56 · Diffblue Cover

**Kalite · Hibrit · D04**

Java unit test üretimi ve bakımı. Java unit test üretimi ve bakımı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 commercial.
- **Sınırlar:** Java odaklı; FastAPI/React için aynı çözüm değil. Üretilen test semantiği kontrol edilir.
- **Olgunluk:** D04 yüksek ama dar Java kapsamı.
- **Entegrasyon:** Java build/test sistemleri ve CI; D04 offline/air-gapped deterministic test generation seçeneği tarif eder. FastAPI/React yerine Java legacy modülde değerlendirilir.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Java unit test üretimi ve bakımı. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T56)

### T57 · Greptile

**Kalite · Bulut · D02, D06**

Codebase indeksleme ve cross-file PR inceleme. Codebase indeksleme ve cross-file PR inceleme

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** D06 %82 recall vendor iddiası; yanlış pozitif ve repo indeks gizliliği ölçülmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında codebase indeksleme ve cross-file pr inceleme. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Codebase indeksleme ve cross-file PR inceleme. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T57)

### T58 · OpenRouter

**Model · Bulut · D06**

Tek key/bakiye ile model ve provider yönlendirme. Tek key/bakiye ile model ve provider yönlendirme

- **Fiyat ve birim:** D06 %5,5 kredi alım ücreti; BYOK25k$’a kadar free sonra%5.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Asıl provider retention, latency ve erişim sınırları ortadan kalkmaz.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında tek key/bakiye ile model ve provider yönlendirme. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Tek key/bakiye ile model ve provider yönlendirme. API, M5 Max ve Hetzner ekonomisi rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T58)

### T59 · Vibe Kanban

**Kodlama · Yerel · D06**

Görev panosu, worktree ve ajan koordinasyonu. Görev panosu, worktree ve ajan koordinasyonu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D06 Apache/community-fork iddiası; kullanılan repo/sürüm kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** D06 10 Nisan2026 Bloop kapanışı bildiriyor; ürün ve community fork bakımı ayrı teyit edilmeli.
- **Entegrasyon:** Yerel ortamında görev panosu, worktree ve ajan koordinasyonu. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Görev panosu, worktree ve ajan koordinasyonu. Worktree ve çoklu ajan yöneticileri rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T59) · [Kaynak bağlantısı](https://github.com/no-fluff/awesome-vibe-coding)

### T60 · DeepSeek

**Model · Hibrit · D02, D06**

R1, distill ve V4 olarak farklı model aileleri. R1, distill ve V4 olarak farklı model aileleri

- **Fiyat ve birim:** D06 Flash input/output $0,14/$0,28 /1M token; self-host toplamı ayrı.
- **Lisans ve haklar:** D06 V4 MIT iddiası; model ağırlığı ile API veri politikası ayrı.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Hibrit ortamında r1, distill ve v4 olarak farklı model aileleri. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** R1, distill ve V4 olarak farklı model aileleri. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T60)

### T61 · Suno

**Ses · Bulut · D03, D05**

Prompt ile müzik üretimi. Prompt ile müzik üretimi

- **Fiyat ve birim:** D05 Pro10$/ay veya yıllık8$/ay.
- **Lisans ve haklar:** Free kişisel; ücretli dönemde üretime ticari kullanım kaynak iddiası; üçüncü kişi hakları ayrı.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında prompt ile müzik üretimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli metin/ses → üretim/transkripsiyon → hizalama → Türkçe/QC → timeline.
- **Seçim gerekçesi:** Prompt ile müzik üretimi. Müzik ve medya hakları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T61) · [Kaynak bağlantısı](https://help.suno.com)

### T62 · Epidemic Sound

**Ses · Bulut · D05**

Lisanslı müzik ve ses efekti kütüphanesi. Lisanslı müzik ve ses efekti kütüphanesi

- **Fiyat ve birim:** D05 Creator9,99$/Pro16,99$/ay yıllık.
- **Lisans ve haklar:** Plan, bağlı kanal, müşteri/reklam ve abonelik tarihine bağlı stok lisansı.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında lisanslı müzik ve ses efekti kütüphanesi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli metin/ses → üretim/transkripsiyon → hizalama → Türkçe/QC → timeline.
- **Seçim gerekçesi:** Lisanslı müzik ve ses efekti kütüphanesi. Müzik ve medya hakları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T62) · [Kaynak bağlantısı](https://epidemicsound.com)

### T63 · Artlist

**Ses · Bulut · D05**

Müzik ve stok medya lisansları. Müzik ve stok medya lisansları

- **Fiyat ve birim:** D05 Social9,99$/ay; Pro/Max kapsamı farklı.
- **Lisans ve haklar:** Social organik sosyal; Pro/Max, reklam/müşteri/kanal kapsamı sözleşme bazında.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında müzik ve stok medya lisansları. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli metin/ses → üretim/transkripsiyon → hizalama → Türkçe/QC → timeline.
- **Seçim gerekçesi:** Müzik ve stok medya lisansları. Müzik ve medya hakları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T63) · [Kaynak bağlantısı](https://artlist.io)

### T64 · Tabnine

**Kodlama · Hibrit · D04**

IDE kod yardımı ve kurum odaklı erişim. IDE kod yardımı ve kurum odaklı erişim

- **Fiyat ve birim:** D04 yıllık $39/$59 kişi-ay.
- **Lisans ve haklar:** D04 proprietary.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** D04 yüksek olgunluk değerlendirmesi; özellikle veri izolasyonu gerektiren kurumlar.
- **Entegrasyon:** D04 major IDE, Git/Jira/Confluence, MCP; SaaS, VPC, on-prem ve air-gapped deployment seçenekleri. İzolasyon ihtiyacını gerçek sözleşmeyle eşleştir.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** IDE kod yardımı ve kurum odaklı erişim. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T64)

### T65 · GitLab Duo

**Kodlama · Bulut · D04**

GitLab iş akışında kodlama ve inceleme yardımı. GitLab iş akışında kodlama ve inceleme yardımı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 proprietary.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** D04 yüksek olgunluk; Code Review18.1 GA ve self-host model18.4 GA kaynak iddiaları.
- **Entegrasyon:** GitLab.com, Self-Managed ve Dedicated; mevcut repo/CI izinleriyle birlikte model erişimi ve veri akışı değerlendirilir.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** GitLab iş akışında kodlama ve inceleme yardımı. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T65) · [Kaynak bağlantısı](https://GitLab.com)

### T66 · CrewAI

**Orkestrasyon · Yerel · D04, D05, D06**

Rol ve görev tabanlı çoklu ajan akışı. Rol ve görev tabanlı çoklu ajan akışı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında rol ve görev tabanlı çoklu ajan akışı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Rol ve görev tabanlı çoklu ajan akışı. Workflow, retry ve kalıcı durum rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T66)

### T67 · DeepSource

**Kalite · Bulut · D06**

Statik kalite analizi ve düzeltme önerileri. Statik kalite analizi ve düzeltme önerileri

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** D06 F1%84,51 iddiası farklı veri setleriyle doğrudan kıyaslanmaz.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında statik kalite analizi ve düzeltme önerileri. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Statik kalite analizi ve düzeltme önerileri. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T67)

### T68 · Descript

**Kurgu · Bulut · D03, D05**

Transkript merkezli video ve ses düzenleme. Transkript merkezli video ve ses düzenleme

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında transkript merkezli video ve ses düzenleme. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Transkript merkezli video ve ses düzenleme. Uzun videodan kısa içerik rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T68)

### T69 · Vizard

**Kurgu · Bulut · D05**

Highlight, reframe ve altyazılı kısa video. Highlight, reframe ve altyazılı kısa video

- **Fiyat ve birim:** D05 ~$14,50/ay yıllık; Creator API iddiası.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** D05 32+ dil; Türkçe üstünlüğü kaynak görüşü, bağımsız test değil.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında highlight, reframe ve altyazılı kısa video. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Highlight, reframe ve altyazılı kısa video. Uzun videodan kısa içerik rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T69)

### T70 · Ssemble

**Kurgu · Bulut · D05**

Otomatik kısa video ve kurgu alternatifi. Otomatik kısa video ve kurgu alternatifi

- **Fiyat ve birim:** D05 $7,50/ay; API tüm planlarda iddiası.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında otomatik kısa video ve kurgu alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Otomatik kısa video ve kurgu alternatifi. Uzun videodan kısa içerik rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T70)

### T71 · Klap

**Kurgu · Bulut · D05**

Uzun videodan kısa klip üretimi. Uzun videodan kısa klip üretimi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında uzun videodan kısa klip üretimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Uzun videodan kısa klip üretimi. Uzun videodan kısa içerik rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T71)

### T72 · Munch

**Kurgu · Bulut · D05**

Video kesiti seçimi ve yeniden kullanımı. Video kesiti seçimi ve yeniden kullanımı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında video kesiti seçimi ve yeniden kullanımı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Video kesiti seçimi ve yeniden kullanımı. Uzun videodan kısa içerik rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T72)

### T73 · CapCut

**Kurgu · Bulut · D05**

Editör içinde AI destekli montaj. Editör içinde AI destekli montaj

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında editör içinde ai destekli montaj. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Editör içinde AI destekli montaj. Uzun videodan kısa içerik rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T73)

### T74 · AutoPod

**Kurgu · Yerel · D05**

Podcast düzenleme otomasyonu. Podcast düzenleme otomasyonu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında podcast düzenleme otomasyonu. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Podcast düzenleme otomasyonu. Uzun videodan kısa içerik rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T74)

### T75 · Wisecut

**Kurgu · Bulut · D05**

Konuşma odaklı otomatik video düzenleme. Konuşma odaklı otomatik video düzenleme

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında konuşma odaklı otomatik video düzenleme. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Konuşma odaklı otomatik video düzenleme. Uzun videodan kısa içerik rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T75)

### T76 · VEED

**Kurgu · Bulut · D03, D05**

Avatar, dublaj, altyazı ve video editing. Avatar, dublaj, altyazı ve video editing

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında avatar, dublaj, altyazı ve video editing. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Avatar, dublaj, altyazı ve video editing. Avatar ve canlı persona rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T76) · [Kaynak bağlantısı](https://www.veed.io/)

### T77 · D-ID

**Avatar · Bulut · D05**

Sunuculu video için kaynakta anılan alternatif. Sunuculu video için kaynakta anılan alternatif

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında sunuculu video için kaynakta anılan alternatif. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı metin/ses ve rıza → async avatar → telaffuz/lip-sync → final onay.
- **Seçim gerekçesi:** Sunuculu video için kaynakta anılan alternatif. Avatar ve canlı persona rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T77)

### T78 · Hedra

**Avatar · Bulut · D05**

Karakter ve konuşan video alternatifi. Karakter ve konuşan video alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında karakter ve konuşan video alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı metin/ses ve rıza → async avatar → telaffuz/lip-sync → final onay.
- **Seçim gerekçesi:** Karakter ve konuşan video alternatifi. Avatar ve canlı persona rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T78)

### T79 · Argil

**Avatar · Bulut · D05**

Avatar video alternatifi. Avatar video alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında avatar video alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı metin/ses ve rıza → async avatar → telaffuz/lip-sync → final onay.
- **Seçim gerekçesi:** Avatar video alternatifi. Avatar ve canlı persona rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T79)

### T80 · Captions.ai

**Avatar · Bulut · D05**

AI video ve presenter alternatifi. AI video ve presenter alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında ai video ve presenter alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı metin/ses ve rıza → async avatar → telaffuz/lip-sync → final onay.
- **Seçim gerekçesi:** AI video ve presenter alternatifi. Avatar ve canlı persona rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T80) · [Kaynak bağlantısı](https://Captions.ai)

### T81 · Pika

**Video · Bulut · D05**

Jeneratif video alternatifi. Jeneratif video alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında jeneratif video alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Jeneratif video alternatifi. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T81)

### T82 · Seedance

**Video · Bulut · D03, D05**

Gateway üzerinden de sunulan video model ailesi. Gateway üzerinden de sunulan video model ailesi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında gateway üzerinden de sunulan video model ailesi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Gateway üzerinden de sunulan video model ailesi. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T82)

### T83 · Mochi

**Model · Yerel · D05**

Açık video üretimi alternatifi. Açık video üretimi alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında açık video üretimi alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Açık video üretimi alternatifi. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T83)

### T84 · Grok

**Video · Bulut · D05**

Kaynak fiyat karşılaştırmasında anılan video modeli. Kaynak fiyat karşılaştırmasında anılan video modeli

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında kaynak fiyat karşılaştırmasında anılan video modeli. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Kaynak fiyat karşılaştırmasında anılan video modeli. Video bütçesi, RPM ve gelir rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T84)

### T85 · Sora 2

**Video · Bulut · D03, D05**

Kaynakta metinden/görselden video üretimi. Kaynakta metinden/görselden video üretimi

- **Fiyat ve birim:** D05 $0,10/sn; V03 API yaşam döngüsü uyarısı.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** V03 kaydında 24 Eylül2026 API kapanışı; yeni bağımlılık kurulmaz.
- **Olgunluk:** Yaşam döngüsü riski V03’te kayıtlı; tarihsel karşılaştırma için korunur.
- **Entegrasyon:** Bulut ortamında kaynakta metinden/görselden video üretimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Kaynakta metinden/görselden video üretimi. Video modelleri ve yönlendirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T85)

### T86 · OpenMontage

**Orkestrasyon · Yerel · D01**

Director, skill ve sağlayıcı adaptörleriyle video hattı. Director, skill ve sağlayıcı adaptörleriyle video hattı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında director, skill ve sağlayıcı adaptörleriyle video hattı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Director, skill ve sağlayıcı adaptörleriyle video hattı. Director ve sahne ajanları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T86)

### T87 · MoviePy

**Kurgu · Yerel · D01, D03**

Python ile medya kliplerini kesme ve birleştirme. Python ile medya kliplerini kesme ve birleştirme

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında python ile medya kliplerini kesme ve birleştirme. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Python ile medya kliplerini kesme ve birleştirme. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T87)

### T88 · Bannerbear

**Kurgu · Bulut · D05**

Şablondan medya varyantı üretimi. Şablondan medya varyantı üretimi

- **Fiyat ve birim:** D05 $49/1.000 kredi.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında şablondan medya varyantı üretimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Şablondan medya varyantı üretimi. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T88)

### T89 · Plainly

**Kurgu · Bulut · D05**

After Effects şablonlarını render etme. After Effects şablonlarını render etme

- **Fiyat ve birim:** D05 $69/50 render dakikası.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında after effects şablonlarını render etme. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** After Effects şablonlarını render etme. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T89)

### T90 · Editly

**Kurgu · Yerel · D03, D05**

Kodla deterministik video kompozisyonu. Kodla deterministik video kompozisyonu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında kodla deterministik video kompozisyonu. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Kodla deterministik video kompozisyonu. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T90)

### T91 · Revideo

**Kurgu · Yerel · D03, D05**

Kodla video kompozisyonu alternatifi. Kodla video kompozisyonu alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında kodla video kompozisyonu alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Kodla video kompozisyonu alternatifi. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T91)

### T92 · Adobe Premiere UXP

**Kurgu · Yerel · D03**

Editör ve eklenti üzerinden yaratıcı finishing. Editör ve eklenti üzerinden yaratıcı finishing

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında editör ve eklenti üzerinden yaratıcı finishing. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Editör ve eklenti üzerinden yaratıcı finishing. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T92) · [Kaynak bağlantısı](https://developer.adobe.com/firefly-services/docs/firefly-api/)

### T93 · DaVinci Resolve

**Kurgu · Yerel · D03**

Kurgu, renk ve finishing. Kurgu, renk ve finishing

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında kurgu, renk ve finishing. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **Seçim gerekçesi:** Kurgu, renk ve finishing. Kurgu, render ve finishing rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T93)

### T94 · Pexels

**Video · Bulut · D01, D05**

Stok görsel/video girdisi. Stok görsel/video girdisi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında stok görsel/video girdisi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Stok görsel/video girdisi. Beş video yöntemi ve üç mimari rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T94)

### T95 · Pixabay

**Video · Bulut · D01, D05**

Stok görsel/video ve medya girdisi. Stok görsel/video ve medya girdisi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında stok görsel/video ve medya girdisi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Stok görsel/video ve medya girdisi. Beş video yöntemi ve üç mimari rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T95)

### T96 · Storyblocks

**Video · Bulut · D05**

Stok medya kütüphanesi. Stok medya kütüphanesi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında stok medya kütüphanesi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Stok medya kütüphanesi. Beş video yöntemi ve üç mimari rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T96)

### T97 · AutoShorts

**Video · Bulut · D05**

Paket faceless içerik üretimi. Paket faceless içerik üretimi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında paket faceless içerik üretimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Paket faceless içerik üretimi. Beş video yöntemi ve üç mimari rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T97) · [Kaynak bağlantısı](https://AutoShorts.ai)

### T98 · InVideo

**Video · Bulut · D03, D05**

Script-to-video paket üretim akışı. Script-to-video paket üretim akışı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında script-to-video paket üretim akışı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **Seçim gerekçesi:** Script-to-video paket üretim akışı. Beş video yöntemi ve üç mimari rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T98)

### T99 · EdgeTTS

**Ses · Bulut · D01, D05**

Stok video hatlarında metinden ses. Stok video hatlarında metinden ses

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında stok video hatlarında metinden ses. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli metin/ses → üretim/transkripsiyon → hizalama → Türkçe/QC → timeline.
- **Seçim gerekçesi:** Stok video hatlarında metinden ses. Türkçe ses, altyazı ve lokalizasyon rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T99)

### T100 · Scribe

**Ses · Bulut · D05**

Sesin metne dökülmesi ve Türkçe transkripsiyon. Sesin metne dökülmesi ve Türkçe transkripsiyon

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında sesin metne dökülmesi ve türkçe transkripsiyon. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli metin/ses → üretim/transkripsiyon → hizalama → Türkçe/QC → timeline.
- **Seçim gerekçesi:** Sesin metne dökülmesi ve Türkçe transkripsiyon. Türkçe ses, altyazı ve lokalizasyon rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T100)

### T101 · Azure neural TTS

**Ses · Bulut · D03, D05**

Kurumsal metinden konuşma. Kurumsal metinden konuşma

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında kurumsal metinden konuşma. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** İzinli metin/ses → üretim/transkripsiyon → hizalama → Türkçe/QC → timeline.
- **Seçim gerekçesi:** Kurumsal metinden konuşma. Türkçe ses, altyazı ve lokalizasyon rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T101)

### T102 · Mixpost

**Yayın · Yerel · D05**

Laravel tabanlı self-host sosyal planlama. Laravel tabanlı self-host sosyal planlama

- **Fiyat ve birim:** D05 $299 tek sefer.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında laravel tabanlı self-host sosyal planlama. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı artifact hash → platform adaptörü → status/post ID → analytics.
- **Seçim gerekçesi:** Laravel tabanlı self-host sosyal planlama. Yayın API’leri ve sosyal dağıtım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T102)

### T103 · Buffer

**Yayın · Bulut · D05**

Sosyal yayın ve planlama alternatifi. Sosyal yayın ve planlama alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında sosyal yayın ve planlama alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı artifact hash → platform adaptörü → status/post ID → analytics.
- **Seçim gerekçesi:** Sosyal yayın ve planlama alternatifi. Yayın API’leri ve sosyal dağıtım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T103)

### T104 · Metricool

**Yayın · Bulut · D05**

Sosyal planlama ve ölçüm alternatifi. Sosyal planlama ve ölçüm alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında sosyal planlama ve ölçüm alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı artifact hash → platform adaptörü → status/post ID → analytics.
- **Seçim gerekçesi:** Sosyal planlama ve ölçüm alternatifi. Yayın API’leri ve sosyal dağıtım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T104)

### T105 · Publer

**Yayın · Bulut · D05**

Sosyal yayın planlama alternatifi. Sosyal yayın planlama alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında sosyal yayın planlama alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı artifact hash → platform adaptörü → status/post ID → analytics.
- **Seçim gerekçesi:** Sosyal yayın planlama alternatifi. Yayın API’leri ve sosyal dağıtım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T105)

### T106 · Late

**Yayın · Bulut · D05**

Kaynakta anılan sosyal yayın API alternatifi. Kaynakta anılan sosyal yayın API alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında kaynakta anılan sosyal yayın api alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı artifact hash → platform adaptörü → status/post ID → analytics.
- **Seçim gerekçesi:** Kaynakta anılan sosyal yayın API alternatifi. Yayın API’leri ve sosyal dağıtım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T106)

### T107 · SocialBee

**Yayın · Bulut · D05**

Sosyal içerik planlama alternatifi. Sosyal içerik planlama alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında sosyal içerik planlama alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Onaylı artifact hash → platform adaptörü → status/post ID → analytics.
- **Seçim gerekçesi:** Sosyal içerik planlama alternatifi. Yayın API’leri ve sosyal dağıtım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T107)

### T108 · Activepieces

**Orkestrasyon · Hibrit · D05**

Uygulamalar arası workflow otomasyonu. Uygulamalar arası workflow otomasyonu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Hibrit ortamında uygulamalar arası workflow otomasyonu. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Uygulamalar arası workflow otomasyonu. Workflow, retry ve kalıcı durum rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T108)

### T109 · Windmill

**Orkestrasyon · Hibrit · D05**

Script ve workflow çalıştırma. Script ve workflow çalıştırma

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Hibrit ortamında script ve workflow çalıştırma. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Script ve workflow çalıştırma. Workflow, retry ve kalıcı durum rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T109)

### T110 · Prefect

**Orkestrasyon · Hibrit · D05**

Veri/iş pipeline orkestrasyonu. Veri/iş pipeline orkestrasyonu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Hibrit ortamında veri/iş pipeline orkestrasyonu. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Veri/iş pipeline orkestrasyonu. Workflow, retry ve kalıcı durum rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T110)

### T111 · AutoGen

**Orkestrasyon · Yerel · D05**

Çoklu ajan konuşma ve görev düzeni. Çoklu ajan konuşma ve görev düzeni

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında çoklu ajan konuşma ve görev düzeni. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Çoklu ajan konuşma ve görev düzeni. Workflow, retry ve kalıcı durum rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T111)

### T112 · Google ADK

**Orkestrasyon · Yerel · D06**

Ajan uygulaması geliştirme çerçevesi. Ajan uygulaması geliştirme çerçevesi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında ajan uygulaması geliştirme çerçevesi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Ajan uygulaması geliştirme çerçevesi. Workflow, retry ve kalıcı durum rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T112) · [Kaynak bağlantısı](https://cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate)

### T113 · LangChain

**Orkestrasyon · Yerel · D04**

Model, araç ve retrieval bağlayıcıları. Model, araç ve retrieval bağlayıcıları

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 MIT; kullanılan paket/sürüm için kontrol.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında model, araç ve retrieval bağlayıcıları. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Model, araç ve retrieval bağlayıcıları. RAG ve kurumsal bilgi getirme rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T113) · [Kaynak bağlantısı](https://github.com/langchain-ai/langchain)

### T114 · Cline

**Kodlama · Yerel · D04, D06**

IDE içinde araç kullanan coding ajanı. IDE içinde araç kullanan coding ajanı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında ide içinde araç kullanan coding ajanı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** IDE içinde araç kullanan coding ajanı. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T114)

### T115 · Roo Code

**Kodlama · Yerel · D06**

Kaynakta anılan IDE ajan alternatifi. Kaynakta anılan IDE ajan alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında kaynakta anılan ide ajan alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Kaynakta anılan IDE ajan alternatifi. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T115)

### T116 · Kilo Code

**Kodlama · Yerel · D06**

Kaynakta anılan kodlama ajan alternatifi. Kaynakta anılan kodlama ajan alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında kaynakta anılan kodlama ajan alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Kaynakta anılan kodlama ajan alternatifi. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T116)

### T117 · Amp

**Kodlama · Bulut · D06**

Coding ajan alternatifi. Coding ajan alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında coding ajan alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Coding ajan alternatifi. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T117)

### T118 · Factory Droid

**Kodlama · Bulut · D06**

Görev odaklı coding ajanı. Görev odaklı coding ajanı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında görev odaklı coding ajanı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Görev odaklı coding ajanı. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T118)

### T119 · Warp

**Kodlama · Yerel · D06**

Terminal ve ajan geliştirme ortamı. Terminal ve ajan geliştirme ortamı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında terminal ve ajan geliştirme ortamı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Terminal ve ajan geliştirme ortamı. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T119)

### T120 · Gemini CLI

**Kodlama · Yerel · D06**

Terminal ajan alternatifi. Terminal ajan alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında terminal ajan alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Terminal ajan alternatifi. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T120)

### T121 · Devin

**Kodlama · Bulut · D04, D06**

Yazılım görevlerini yürüten ajan platformu. Yazılım görevlerini yürüten ajan platformu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında yazılım görevlerini yürüten ajan platformu. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Yazılım görevlerini yürüten ajan platformu. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T121)

### T122 · Windsurf

**Kodlama · Bulut · D04**

AI odaklı IDE. AI odaklı IDE

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 proprietary.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** D04 Codeium→Windsurf marka değişimi ve 2025 Cognition satın alımı; yetenek yüksek, roadmap riski yüksek kaynak değerlendirmesi.
- **Entegrasyon:** Bulut ortamında ai odaklı ide. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Mevcut kullanıcı için ilgili; yeni kurumsal yatırımda ürün hattı ve Devin yakınsaması teyit edilmeli.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T122)

### T123 · Continue

**Kodlama · Yerel · D04**

Özelleştirilebilir coding yardımcısı. Özelleştirilebilir coding yardımcısı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 Apache-2.0 repo.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** D04 2026’da read-only ve ekibin Cursor’a katıldığı iddiasını taşıyor. Bağımsız teyit edilmedi; yeni yatırım öncesi bakım durumu kritik.
- **Entegrasyon:** D04 VS Code/JetBrains/CLI. Bakım ve geçiş maliyeti değerlendirilmeden yeni standart olarak seçilmez.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Özelleştirilebilir coding yardımcısı. Kodlama ajanları ve çalışma döngüsü rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T123) · [Kaynak bağlantısı](https://github.com/continuedev/continue)

### T124 · Pane

**Kodlama · Yerel · D06**

İsmail’in mevcut çoklu ajan çalışma ortamı. İsmail’in mevcut çoklu ajan çalışma ortamı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında i̇smail’in mevcut çoklu ajan çalışma ortamı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** İsmail’in mevcut çoklu ajan çalışma ortamı. Worktree ve çoklu ajan yöneticileri rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T124) · [Kaynak bağlantısı](https://runpane.com)

### T125 · Auto-Claude

**Kodlama · Yerel · D06**

Kaynak kişisel bağlamında ajan yönetimi. Kaynak kişisel bağlamında ajan yönetimi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında kaynak kişisel bağlamında ajan yönetimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Kaynak kişisel bağlamında ajan yönetimi. Worktree ve çoklu ajan yöneticileri rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T125)

### T126 · Conductor

**Kodlama · Yerel · D06**

Mac üzerinde worktree, diff ve PR yönetimi. Mac üzerinde worktree, diff ve PR yönetimi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında mac üzerinde worktree, diff ve pr yönetimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Mac üzerinde worktree, diff ve PR yönetimi. Worktree ve çoklu ajan yöneticileri rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T126)

### T127 · Claude Squad

**Kodlama · Yerel · D06**

tmux/TUI ile ajan session ve worktree. tmux/TUI ile ajan session ve worktree

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında tmux/tui ile ajan session ve worktree. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** tmux/TUI ile ajan session ve worktree. Worktree ve çoklu ajan yöneticileri rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T127) · [Kaynak bağlantısı](https://support.claude.com)

### T128 · Code Conductor

**Kodlama · Yerel · D06**

Çoklu coding ajan oturum yönetimi. Çoklu coding ajan oturum yönetimi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında çoklu coding ajan oturum yönetimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Çoklu coding ajan oturum yönetimi. Worktree ve çoklu ajan yöneticileri rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T128)

### T129 · amux

**Kodlama · Yerel · D06**

Çoklu terminal ajan koordinasyonu. Çoklu terminal ajan koordinasyonu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında çoklu terminal ajan koordinasyonu. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Çoklu terminal ajan koordinasyonu. Worktree ve çoklu ajan yöneticileri rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T129)

### T130 · agentbox

**Kodlama · Yerel · D06**

Hetzner/Docker tabanlı worker yaklaşımı. Hetzner/Docker tabanlı worker yaklaşımı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında hetzner/docker tabanlı worker yaklaşımı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Hetzner/Docker tabanlı worker yaklaşımı. Worktree ve çoklu ajan yöneticileri rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T130)

### T131 · Sculptor

**Kodlama · Yerel · D06**

Container tabanlı ajan çalışma alanı. Container tabanlı ajan çalışma alanı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında container tabanlı ajan çalışma alanı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Container tabanlı ajan çalışma alanı. Worktree ve çoklu ajan yöneticileri rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T131)

### T132 · VibeTree

**Kodlama · Yerel · D06**

Ajan yöneticileri için keşif/kürasyon reposu. Ajan yöneticileri için keşif/kürasyon reposu

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında ajan yöneticileri için keşif/kürasyon reposu. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Ajan yöneticileri için keşif/kürasyon reposu. Worktree ve çoklu ajan yöneticileri rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T132)

### T133 · Kiro

**Kodlama · Bulut · D06**

Requirements, design ve tasks tabanlı spesifikasyon. Requirements, design ve tasks tabanlı spesifikasyon

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında requirements, design ve tasks tabanlı spesifikasyon. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Requirements, design ve tasks tabanlı spesifikasyon. SDD, AGENTS.md ve bağlam rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T133)

### T134 · BMAD

**Kodlama · Yerel · D06**

Analyst, PM, architect ve dev rol akışı. Analyst, PM, architect ve dev rol akışı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında analyst, pm, architect ve dev rol akışı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Analyst, PM, architect ve dev rol akışı. SDD, AGENTS.md ve bağlam rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T134)

### T135 · Superpowers

**Kodlama · Yerel · D06**

Tekrarlanabilir coding skill yaklaşımı. Tekrarlanabilir coding skill yaklaşımı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında tekrarlanabilir coding skill yaklaşımı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Tekrarlanabilir coding skill yaklaşımı. SDD, AGENTS.md ve bağlam rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T135)

### T136 · FastMCP

**Orkestrasyon · Yerel · D06**

Python ile dar domain MCP araçları. Python ile dar domain MCP araçları

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında python ile dar domain mcp araçları. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **Seçim gerekçesi:** Python ile dar domain MCP araçları. MCP ve domain araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T136)

### T137 · GitHub MCP

**Kodlama · Hibrit · D06**

Issue, PR ve check bağlantısı. Issue, PR ve check bağlantısı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Hibrit ortamında issue, pr ve check bağlantısı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Issue, PR ve check bağlantısı. MCP ve domain araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T137) · [Kaynak bağlantısı](https://github.com/remotion-dev/remotion)

### T138 · Cursor Bugbot

**Kalite · Bulut · D06**

PR diff’i ve bağlamında hata inceleme. PR diff’i ve bağlamında hata inceleme

- **Fiyat ve birim:** D06 yaklaşık $1–1,50/review kaynak iddiası.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında pr diff’i ve bağlamında hata inceleme. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** PR diff’i ve bağlamında hata inceleme. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T138)

### T139 · Snyk

**Kalite · Hibrit · D04, D06**

Kod ve bağımlılık güvenliği. Kod ve bağımlılık güvenliği

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Hibrit ortamında kod ve bağımlılık güvenliği. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Kod ve bağımlılık güvenliği. Ajan güvenliği ve OWASP rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T139)

### T140 · Dependabot

**Kalite · Bulut · D04, D06**

Bağımlılık güncelleme ve güvenlik PR’ı. Bağımlılık güncelleme ve güvenlik PR’ı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında bağımlılık güncelleme ve güvenlik pr’ı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Bağımlılık güncelleme ve güvenlik PR’ı. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T140)

### T141 · CodeQL

**Kalite · Yerel · D04, D06**

Semantik güvenlik analizi ve SARIF bulguları. Semantik güvenlik analizi ve SARIF bulguları

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında semantik güvenlik analizi ve sarif bulguları. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Semantik güvenlik analizi ve SARIF bulguları. TDD, AI review ve otomatik onarım rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T141)

### T142 · GLM

**Model · Hibrit · D06**

Açık ağırlıklı büyük coding model ailesi. Açık ağırlıklı büyük coding model ailesi

- **Fiyat ve birim:** D06 API $1/$3,41 /1M input/output.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** 744B × 4-bit ≈372 GB ağırlık; 96 GB karta doğrudan sığma varsayımı yanlış.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Hibrit ortamında açık ağırlıklı büyük coding model ailesi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Açık ağırlıklı büyük coding model ailesi. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T142)

### T143 · Kimi

**Model · Bulut · D06**

Büyük model ve API ailesi. Büyük model ve API ailesi

- **Fiyat ve birim:** D06 Morph gateway $3/$15 /1M input/output.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** 2,8T kaynak iddiası; tek Mac/GEX131 self-host adayı değil.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında büyük model ve api ailesi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Büyük model ve API ailesi. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T143)

### T144 · Mistral Devstral

**Model · Hibrit · D06**

Kodlama için alternatif model ailesi. Kodlama için alternatif model ailesi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Hibrit ortamında kodlama için alternatif model ailesi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Kodlama için alternatif model ailesi. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T144)

### T145 · gpt-oss

**Model · Yerel · D06**

Kaynakta anılan açık ağırlıklı model alternatifi. Kaynakta anılan açık ağırlıklı model alternatifi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında kaynakta anılan açık ağırlıklı model alternatifi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Kaynakta anılan açık ağırlıklı model alternatifi. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T145)

### T146 · Llama

**Model · Yerel · D06**

Yerel inference model ailesi. Yerel inference model ailesi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında yerel inference model ailesi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Yerel inference model ailesi. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T146) · [Kaynak bağlantısı](https://github.com/run-llama/llama_index)

### T147 · StarCoder2

**Model · Yerel · D04**

Kod model araştırması ve fine-tuning. Kod model araştırması ve fine-tuning

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 BigCode OpenRAIL-M ağırlık koşulları.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında kod model araştırması ve fine-tuning. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Kod model araştırması ve fine-tuning. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T147) · [Kaynak bağlantısı](https://github.com/bigcode-project/starcoder2)

### T148 · CodeGen

**Model · Yerel · D04**

Kod üretimi araştırma modeli. Kod üretimi araştırma modeli

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 Apache-2.0 kaynak lisansı.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında kod üretimi araştırma modeli. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Kod üretimi araştırma modeli. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T148) · [Kaynak bağlantısı](https://github.com/salesforce/CodeGen)

### T149 · AlphaCode

**Model · Bulut · D04**

Rekabetçi programlama araştırması. Rekabetçi programlama araştırması

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 genel amaçlı OSS ürün değildir; program synthesis araştırması.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında rekabetçi programlama araştırması. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Rekabetçi programlama araştırması. Benchmark ve gerçek üretkenlik rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T149) · [Kaynak bağlantısı](https://deepmind.google/blog/competitive-programming-with-alphacode/)

### T150 · TensorRT-LLM

**Model · Yerel · D06**

NVIDIA üzerinde optimize inference. NVIDIA üzerinde optimize inference

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında nvidia üzerinde optimize inference. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** NVIDIA üzerinde optimize inference. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T150)

### T151 · llama.cpp

**Model · Yerel · D06**

GGUF ile yerel inference motoru. GGUF ile yerel inference motoru

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında gguf ile yerel inference motoru. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** GGUF ile yerel inference motoru. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T151)

### T152 · LM Studio

**Model · Yerel · D06**

Yerel model çalıştırma arayüzü. Yerel model çalıştırma arayüzü

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında yerel model çalıştırma arayüzü. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **Seçim gerekçesi:** Yerel model çalıştırma arayüzü. Yerel modeller ve inference rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T152)

### T153 · Ruff

**Kalite · Yerel · D06**

Python lint ve format. Python lint ve format

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Lint/format yapar; type checking için başka araç gerekir.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında python lint ve format. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Python lint ve format. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T153)

### T154 · ty

**Kalite · Yerel · D06**

Python tip denetimi. Python tip denetimi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında python tip denetimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Python tip denetimi. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T154)

### T155 · Pyrefly

**Kalite · Yerel · D06**

Rust tabanlı Python tip denetimi. Rust tabanlı Python tip denetimi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında rust tabanlı python tip denetimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Rust tabanlı Python tip denetimi. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T155)

### T156 · mypy

**Kalite · Yerel · D06**

Plugin ekosistemli Python tip denetimi. Plugin ekosistemli Python tip denetimi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında plugin ekosistemli python tip denetimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Plugin ekosistemli Python tip denetimi. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T156)

### T157 · uv

**Kodlama · Yerel · D06**

Python ortam ve paket yönetimi. Python ortam ve paket yönetimi

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında python ortam ve paket yönetimi. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Python ortam ve paket yönetimi. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T157)

### T158 · Biome

**Kalite · Yerel · D06**

JavaScript/TypeScript lint ve format. JavaScript/TypeScript lint ve format

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında javascript/typescript lint ve format. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** JavaScript/TypeScript lint ve format. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T158)

### T159 · oxlint

**Kalite · Yerel · D06**

JavaScript/TypeScript lint. JavaScript/TypeScript lint

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Linter; formatter olarak sunulmamalı.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında javascript/typescript lint. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** JavaScript/TypeScript lint. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T159)

### T160 · Prettier

**Kalite · Yerel · D06**

Kod biçimlendirme. Kod biçimlendirme

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında kod biçimlendirme. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Kod biçimlendirme. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T160)

### T161 · Storybook

**Kalite · Yerel · D04, D06**

Bileşen senaryoları ve etkileşim testleri. Bileşen senaryoları ve etkileşim testleri

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında bileşen senaryoları ve etkileşim testleri. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Bileşen senaryoları ve etkileşim testleri. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T161)

### T162 · Figma MCP / Framelink

**Kodlama · Bulut · D06**

Tasarım bilgisi ve token’ları koda taşıma. Tasarım bilgisi ve token’ları koda taşıma

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında tasarım bilgisi ve token’ları koda taşıma. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Tasarım bilgisi ve token’ları koda taşıma. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T162)

### T163 · Stitch

**Kodlama · Bulut · D06**

UI tasarımından uygulama taslağına. UI tasarımından uygulama taslağına

- **Fiyat ve birim:** D06 ücretsiz350 generation iddiası.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında ui tasarımından uygulama taslağına. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** UI tasarımından uygulama taslağına. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T163)

### T164 · v0

**Kodlama · Bulut · D06**

Prompt ile arayüz kodu taslağı. Prompt ile arayüz kodu taslağı

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Next.js varsayılan çıktısı React/Vite ve Supabase dışlamasına göre uyarlanmalı.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Bulut ortamında prompt ile arayüz kodu taslağı. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **Seçim gerekçesi:** Prompt ile arayüz kodu taslağı. FastAPI, React ve geliştirici araçları rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T164)

### T165 · Datadog Bits

**Kalite · Bulut · D04, D06**

Telemetry bağlamında olay araştırması. Telemetry bağlamında olay araştırması

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** D04 proprietary.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** D04 yüksek olgunluk değerlendirmesi.
- **Entegrasyon:** Datadog telemetry; kaynakta GitHub, Sentry, Grafana, Dynatrace, Splunk, ServiceNow bağlantıları. Olay hipotezini telemetry ile sınar.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Telemetry bağlamında olay araştırması. Gözlemlenebilirlik ve operasyon rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T165)

### T166 · Grafana / Loki

**Kalite · Yerel · D06**

Metrik ve log gözlemlenebilirliği. Metrik ve log gözlemlenebilirliği

- **Fiyat ve birim:** Kaynak bu araç için karşılaştırılabilir kesin plan/tarife vermiyor. Abonelik, kullanım ve işletim giderini ayrı teyit et.
- **Lisans ve haklar:** Kaynakta belirli sürüm/planın tam lisans koşulları yok; kod, ağırlık, medya hakkı ve hizmet sözleşmesi birbirinden ayrı kontrol edilmeli.
- **Sınırlar:** Kaynağın ayrıntı vermediği alanlar ayrıca teyit edilmeli.
- **Olgunluk:** Kaynakta alternatif olarak anılıyor; sürüm/bakım/API erişimi bu raporda bağımsız doğrulanmadı.
- **Entegrasyon:** Yerel ortamında metrik ve log gözlemlenebilirliği. Kendi domain sözleşmesini sağlayıcıdan ayır; credential ve job/durum kayıtlarını adaptörde yönet.
- **İş akışı:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **Seçim gerekçesi:** Metrik ve log gözlemlenebilirliği. Gözlemlenebilirlik ve operasyon rehberindeki kabul ölçütleriyle karşılaştır; kaynakta ayrıntısı bulunmayan yeteneği var sayma.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T166)

### T167 · Hugging Face Transformers

**Model · Hibrit · D04**

Model yükleme, inference ve fine-tuning için PyTorch/Transformers katmanı; kod/ses/görsel/multimodal aileler.. Model yükleme, inference ve fine-tuning için PyTorch/Transformers katmanı; kod/ses/görsel/multimodal aileler.

- **Fiyat ve birim:** Kaynak bu ürünün karşılaştırılabilir tam tarifesini vermiyor; model kullanımı ve işletim bedeli ayrı bütçelenir.
- **Lisans ve haklar:** Apache-2.0 framework; model ağırlığının lisansı ayrı.
- **Sınırlar:** Kaynak rolü açıklar; sürüm, kota, yetki ve kalite için aynı görevle PoC gerekir.
- **Olgunluk:** Tarihli kaynak değerlendirmesi; repo/servis bakımı bu revizyonda bağımsız doğrulanmadı.
- **Entegrasyon:** Model yükleme, inference ve fine-tuning için PyTorch/Transformers katmanı; kod/ses/görsel/multimodal aileler.
- **İş akışı:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.
- **Seçim gerekçesi:** Mevcut stack’in somut açığını kapatıyorsa kullan; ilgili rehberdeki kalite ve işletim ölçütleriyle değerlendir.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T167) · [Kaynak bağlantısı](https://github.com/huggingface/transformers)

### T168 · OpenAI Agents SDK

**Orkestrasyon · Hibrit · D05**

Kaynakta tool kullanımı, handoff ve tracing ile özel ajan uygulaması kurmak için anlatılan SDK.. Kaynakta tool kullanımı, handoff ve tracing ile özel ajan uygulaması kurmak için anlatılan SDK.

- **Fiyat ve birim:** Kaynak bu ürünün karşılaştırılabilir tam tarifesini vermiyor; model kullanımı ve işletim bedeli ayrı bütçelenir.
- **Lisans ve haklar:** Kaynakta tam lisans/plan koşulu verilmemiş; SDK ve model hizmetini ayrı kontrol et.
- **Sınırlar:** Kaynak rolü açıklar; sürüm, kota, yetki ve kalite için aynı görevle PoC gerekir.
- **Olgunluk:** Tarihli kaynak değerlendirmesi; repo/servis bakımı bu revizyonda bağımsız doğrulanmadı.
- **Entegrasyon:** Kaynakta tool kullanımı, handoff ve tracing ile özel ajan uygulaması kurmak için anlatılan SDK.
- **İş akışı:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.
- **Seçim gerekçesi:** Mevcut stack’in somut açığını kapatıyorsa kullan; ilgili rehberdeki kalite ve işletim ölçütleriyle değerlendir.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T168)

### T169 · Claude Agent SDK

**Orkestrasyon · Hibrit · D05, D06**

Claude Code araç-kullanımını TypeScript/Python uygulamasına taşıyan SDK deseni; dar görev, izin ve çıktı sözleşmesi.. Claude Code araç-kullanımını TypeScript/Python uygulamasına taşıyan SDK deseni; dar görev, izin ve çıktı sözleşmesi.

- **Fiyat ve birim:** Kaynak bu ürünün karşılaştırılabilir tam tarifesini vermiyor; model kullanımı ve işletim bedeli ayrı bütçelenir.
- **Lisans ve haklar:** SDK/runtime ve model aboneliği/API koşulları ayrı.
- **Sınırlar:** Kaynak rolü açıklar; sürüm, kota, yetki ve kalite için aynı görevle PoC gerekir.
- **Olgunluk:** Tarihli kaynak değerlendirmesi; repo/servis bakımı bu revizyonda bağımsız doğrulanmadı.
- **Entegrasyon:** Claude Code araç-kullanımını TypeScript/Python uygulamasına taşıyan SDK deseni; dar görev, izin ve çıktı sözleşmesi.
- **İş akışı:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.
- **Seçim gerekçesi:** Mevcut stack’in somut açığını kapatıyorsa kullan; ilgili rehberdeki kalite ve işletim ölçütleriyle değerlendir.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T169)

### T170 · n8n-claw

**Orkestrasyon · Yerel · D06**

n8n içinde OpenClaw benzeri ajan ve OpenClaw’a delegasyon skill’i; görev devretme entegrasyonu.. n8n içinde OpenClaw benzeri ajan ve OpenClaw’a delegasyon skill’i; görev devretme entegrasyonu.

- **Fiyat ve birim:** Kaynak bu ürünün karşılaştırılabilir tam tarifesini vermiyor; model kullanımı ve işletim bedeli ayrı bütçelenir.
- **Lisans ve haklar:** Kaynak belirli repo lisans sürümünü vermiyor; kullanılan commit kontrol edilmeli.
- **Sınırlar:** Kaynak rolü açıklar; sürüm, kota, yetki ve kalite için aynı görevle PoC gerekir.
- **Olgunluk:** Tarihli kaynak değerlendirmesi; repo/servis bakımı bu revizyonda bağımsız doğrulanmadı.
- **Entegrasyon:** n8n içinde OpenClaw benzeri ajan ve OpenClaw’a delegasyon skill’i; görev devretme entegrasyonu.
- **İş akışı:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.
- **Seçim gerekçesi:** Mevcut stack’in somut açığını kapatıyorsa kullan; ilgili rehberdeki kalite ve işletim ölçütleriyle değerlendir.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T170) · [Kaynak bağlantısı](https://github.com/freddy-schuetz/n8n-claw)

### T171 · n8n-mcp

**Orkestrasyon · Yerel · D06**

Kaynağa göre yaklaşık2.000 node bilgisini ajana sunar; workflow tasarımı için dokümantasyon/araç katmanı.. Kaynağa göre yaklaşık2.000 node bilgisini ajana sunar; workflow tasarımı için dokümantasyon/araç katmanı.

- **Fiyat ve birim:** Kaynak bu ürünün karşılaştırılabilir tam tarifesini vermiyor; model kullanımı ve işletim bedeli ayrı bütçelenir.
- **Lisans ve haklar:** Community repo; lisans ve server izinleri sürüm bazında teyit edilir.
- **Sınırlar:** Kaynak rolü açıklar; sürüm, kota, yetki ve kalite için aynı görevle PoC gerekir.
- **Olgunluk:** Tarihli kaynak değerlendirmesi; repo/servis bakımı bu revizyonda bağımsız doğrulanmadı.
- **Entegrasyon:** Kaynağa göre yaklaşık2.000 node bilgisini ajana sunar; workflow tasarımı için dokümantasyon/araç katmanı.
- **İş akışı:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.
- **Seçim gerekçesi:** Mevcut stack’in somut açığını kapatıyorsa kullan; ilgili rehberdeki kalite ve işletim ölçütleriyle değerlendir.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T171) · [Kaynak bağlantısı](https://github.com/czlonkowski/n8n-mcp)

### T172 · awesome-vibe-coding

**Kodlama · Yerel · D06**

Claude Squad, Code Conductor, Vibe Kanban, VibeTree gibi araçları derleyen keşif listesi.. Claude Squad, Code Conductor, Vibe Kanban, VibeTree gibi araçları derleyen keşif listesi.

- **Fiyat ve birim:** Kaynak bu ürünün karşılaştırılabilir tam tarifesini vermiyor; model kullanımı ve işletim bedeli ayrı bütçelenir.
- **Lisans ve haklar:** Kürasyon listesinin lisansı listelenen araçları otomatik lisanslamaz.
- **Sınırlar:** Kaynak rolü açıklar; sürüm, kota, yetki ve kalite için aynı görevle PoC gerekir.
- **Olgunluk:** Tarihli kaynak değerlendirmesi; repo/servis bakımı bu revizyonda bağımsız doğrulanmadı.
- **Entegrasyon:** Claude Squad, Code Conductor, Vibe Kanban, VibeTree gibi araçları derleyen keşif listesi.
- **İş akışı:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.
- **Seçim gerekçesi:** Mevcut stack’in somut açığını kapatıyorsa kullan; ilgili rehberdeki kalite ve işletim ölçütleriyle değerlendir.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T172) · [Kaynak bağlantısı](https://github.com/no-fluff/awesome-vibe-coding)

### T173 · awesome-agent-orchestrators

**Kodlama · Yerel · D06**

Worktree/sandbox ve agentbox/claude-squad/amux seçeneklerini keşfetmek için kürasyon.. Worktree/sandbox ve agentbox/claude-squad/amux seçeneklerini keşfetmek için kürasyon.

- **Fiyat ve birim:** Kaynak bu ürünün karşılaştırılabilir tam tarifesini vermiyor; model kullanımı ve işletim bedeli ayrı bütçelenir.
- **Lisans ve haklar:** Liste ile ürün/runtime lisansı ayrı.
- **Sınırlar:** Kaynak rolü açıklar; sürüm, kota, yetki ve kalite için aynı görevle PoC gerekir.
- **Olgunluk:** Tarihli kaynak değerlendirmesi; repo/servis bakımı bu revizyonda bağımsız doğrulanmadı.
- **Entegrasyon:** Worktree/sandbox ve agentbox/claude-squad/amux seçeneklerini keşfetmek için kürasyon.
- **İş akışı:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.
- **Seçim gerekçesi:** Mevcut stack’in somut açığını kapatıyorsa kullan; ilgili rehberdeki kalite ve işletim ölçütleriyle değerlendir.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T173) · [Kaynak bağlantısı](https://github.com/andyrewlee/awesome-agent-orchestrators)

### T174 · awesome-openclaw

**Orkestrasyon · Yerel · D06**

OpenClaw kaynak, skill ve tutorial kürasyonu; gerekli yetenekleri keşfetmeye yardımcı.. OpenClaw kaynak, skill ve tutorial kürasyonu; gerekli yetenekleri keşfetmeye yardımcı.

- **Fiyat ve birim:** Kaynak bu ürünün karşılaştırılabilir tam tarifesini vermiyor; model kullanımı ve işletim bedeli ayrı bütçelenir.
- **Lisans ve haklar:** Her skill/repo lisansı ve yetkisi bağımsız incelenir.
- **Sınırlar:** Kaynak rolü açıklar; sürüm, kota, yetki ve kalite için aynı görevle PoC gerekir.
- **Olgunluk:** Tarihli kaynak değerlendirmesi; repo/servis bakımı bu revizyonda bağımsız doğrulanmadı.
- **Entegrasyon:** OpenClaw kaynak, skill ve tutorial kürasyonu; gerekli yetenekleri keşfetmeye yardımcı.
- **İş akışı:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.
- **Seçim gerekçesi:** Mevcut stack’in somut açığını kapatıyorsa kullan; ilgili rehberdeki kalite ve işletim ölçütleriyle değerlendir.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T174) · [Kaynak bağlantısı](https://github.com/SamurAIGPT/awesome-openclaw)

### T175 · fal.ai

**Model · Bulut · D03, D05**

Birden çok video/model sağlayıcısına async inference geçidi; kendi job/adaptör sözleşmesini koru.. Birden çok video/model sağlayıcısına async inference geçidi; kendi job/adaptör sözleşmesini koru.

- **Fiyat ve birim:** Kaynak bu ürünün karşılaştırılabilir tam tarifesini vermiyor; model kullanımı ve işletim bedeli ayrı bütçelenir.
- **Lisans ve haklar:** Gateway, model ağırlığı ve çıktı hakkı farklı sözleşmeler.
- **Sınırlar:** Kaynak rolü açıklar; sürüm, kota, yetki ve kalite için aynı görevle PoC gerekir.
- **Olgunluk:** Tarihli kaynak değerlendirmesi; repo/servis bakımı bu revizyonda bağımsız doğrulanmadı.
- **Entegrasyon:** Birden çok video/model sağlayıcısına async inference geçidi; kendi job/adaptör sözleşmesini koru.
- **İş akışı:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.
- **Seçim gerekçesi:** Mevcut stack’in somut açığını kapatıyorsa kullan; ilgili rehberdeki kalite ve işletim ölçütleriyle değerlendir.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T175) · [Kaynak bağlantısı](https://fal.ai/)

### T176 · Replicate

**Model · Bulut · D03, D05**

Model sürümlerini API ile çalıştıran gateway; input schema, async job, callback ve çıktı indirmeyi adaptöre bağla.. Model sürümlerini API ile çalıştıran gateway; input schema, async job, callback ve çıktı indirmeyi adaptöre bağla.

- **Fiyat ve birim:** Kaynak bu ürünün karşılaştırılabilir tam tarifesini vermiyor; model kullanımı ve işletim bedeli ayrı bütçelenir.
- **Lisans ve haklar:** Barındırma hizmeti lisansı model lisansının yerine geçmez.
- **Sınırlar:** Kaynak rolü açıklar; sürüm, kota, yetki ve kalite için aynı görevle PoC gerekir.
- **Olgunluk:** Tarihli kaynak değerlendirmesi; repo/servis bakımı bu revizyonda bağımsız doğrulanmadı.
- **Entegrasyon:** Model sürümlerini API ile çalıştıran gateway; input schema, async job, callback ve çıktı indirmeyi adaptöre bağla.
- **İş akışı:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.
- **Seçim gerekçesi:** Mevcut stack’in somut açığını kapatıyorsa kullan; ilgili rehberdeki kalite ve işletim ölçütleriyle değerlendir.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T176) · [Kaynak bağlantısı](https://replicate.com/)

### T177 · ModelsLab

**Model · Bulut · D05**

Kaynakta600+ modele tek API erişimi iddiasıyla anılan gateway.. Kaynakta600+ modele tek API erişimi iddiasıyla anılan gateway.

- **Fiyat ve birim:** Kaynak bu ürünün karşılaştırılabilir tam tarifesini vermiyor; model kullanımı ve işletim bedeli ayrı bütçelenir.
- **Lisans ve haklar:** Model ve medya hakları kullanılan endpoint/sağlayıcı bazında teyit edilir.
- **Sınırlar:** Kaynak rolü açıklar; sürüm, kota, yetki ve kalite için aynı görevle PoC gerekir.
- **Olgunluk:** Tarihli kaynak değerlendirmesi; repo/servis bakımı bu revizyonda bağımsız doğrulanmadı.
- **Entegrasyon:** Kaynakta600+ modele tek API erişimi iddiasıyla anılan gateway.
- **İş akışı:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.
- **Seçim gerekçesi:** Mevcut stack’in somut açığını kapatıyorsa kullan; ilgili rehberdeki kalite ve işletim ölçütleriyle değerlendir.

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak izi ve detay](https://karacaismail.github.io/futuristic/#/tools?tool=T177) · [Kaynak bağlantısı](https://modelslab.com/)

## 9. Tarihli doğrulama / düzeltme kaydı

### V01 · YouTube yükleme kotası

**Düzeltildi · 2026-09-17 · Belgeler: D01, D05**

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

### V12 · Runway kredi birimi ve model farkı

**Doğrulandı · 2026-09-17 · Belgeler: D01, D03, D05**

17 Eylül resmi API fiyat tablosu kredi başına $0,01, Gen-4.5 için12 kredi/sn ve Veo3.1 sesli için40 kredi/sn veriyor. Sekiz saniyede $0,96/$3,20 üretim gideri; deneme, format ve diğer servisler ayrıca. [Birincil kaynak](https://docs.dev.runwayml.com/guides/pricing/)

### V13 · OWASP kategori eşlemesi

**Düzeltildi · 2026-09-17 · Belgeler: D02**

Kontrol edilen yayımlı2025 listesinde Supply Chain LLM03, Excessive Agency LLM06. D02’nin2026 diye sunduğu sıra bu listeyle uyuşmuyor; doğrulanmamış2026 sınıflaması kabul edilmedi. [Birincil kaynak](https://genai.owasp.org/llm-top-10/)

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

## 12. Ayrıntılı uygulama rehberi

### İsmail için karar haritası

**D04, D05, D06 · Kişisel bağlam**

#### İsmail'in kaynaklarda tarif edilen çalışma bağlamı

D04/D05/D06 genel pazar raporu değildir: MetaFramer / atonota ve Metaframework, PIM, HRMS, İBYS, Crybro, B2B marketplace, QR menü ve emlak ürünleri için karar bağlamı taşır. D06; **Codex master + Claude Code worker**, Cursor/Cline, Pane, Auto-Claude, worktree'ler ve altı Hetzner sunucusuna deterministik shell deploy akışı tarif ediyor. Bunlar kaynakta anlatılan profil olarak korunur; bu rapor mevcut makinelerin veya aboneliklerin envanterini uzaktan doğrulamış değildir.

Stack kısıtı açıktır: **Next.js ve Supabase kullanılmayacak.** Özel uygulama gerekirse React + Vite + TanStack; backend FastAPI; veri PostgreSQL + SQLModel + Alembic; paketleme Docker/Compose. Frappe / ERPNext mevcut domain servisleri olarak ayrı değerlendirilir. Bu portal da React/Vite kullanır. Bir tasarım aracının varsayılan Next.js çıktısı, bu kısıtı kendiliğinden değiştirmez.

#### Uygulama: aynı ajan her ürüne aynı bağlamla başlamaz

| Ürün / iş             | Ajana verilecek bağlam                                                   | İlk doğrulanabilir iş                           | Kabul kanıtı                                              |
| --------------------- | ------------------------------------------------------------------------ | ----------------------------------------------- | --------------------------------------------------------- |
| MetaFramer / atonota  | DDD bounded context'leri, domain sözlüğü, katman bağımlılıkları, ADR'ler | API değiştirmeyen bir modül refactor'ı          | Mimari bağımlılık ve uyumluluk testleri                   |
| PIM / B2B marketplace | Ürün taksonomisi, attribute inheritance, mapping ve validation kuralları | Child override / parent inheritance hatası      | Hem explicit değer hem boş değer regresyonu               |
| HRMS                  | Rol matrisi, iş kuralları, sentetik çalışan fixture'ları                 | İzin veya bordro kuralının sınır testleri       | Yetki ve veri ayrımı testleri; gerçek personel verisi yok |
| İBYS                  | İş güvenliği akışı, mevzuat bağlamı, iz kayıtları                        | Durum geçişi / onay akışı doğrulaması           | Yetkisiz geçişin reddi ve denetim izi                     |
| Frappe / ERPNext      | DocType, servis sınırı ve uygulama API sözleşmesi                        | Salt okunur domain keşfi; sonra dar yazma aracı | İzin, tekrar çağrı ve input validation testleri           |
| QR menü / emlak       | Sipariş, ürün görünürlüğü, ilan oluşturma senaryoları                    | Mobil tarayıcıdan tamamlanan bir kritik akış    | Commit edilmiş Playwright testi                           |
| Crybro                | Exchange adaptörleri, simulation, veri akışları                          | Tekrarlı event veya veri boşluğu testi          | Simülasyon; gerçek finansal eylemden ayrılmış doğrulama   |

1. Her repo için kısa, komut odaklı `AGENTS.md` oluştur; DDD kurallarını ve gerçek test komutlarını yaz. `CLAUDE.md` kanonik dosyayı işaret etsin. Bir araç dosyayı otomatik okumuyorsa başlangıç bağlamında açıkça bağla.
2. Master ajan işi kabul kriteri, dosya sahipliği, bağımlılık ve bütçe ile bölsün. Worker başına ayrı worktree ver. Worktree dosya çakışmasını azaltır; sistem erişimini sınırlamak için ayrıca container ve dar token gerekir.
3. Worker çıktısı test kanıtı ve küçük diff olsun. Kaynakların önerdiği kurumsal politika PR-only + insan merge'üdür; korumayı yalnız prompt'a bırakma, repository ayarı ve izinlerle uygula.
4. OpenClaw mesajlaşma/triyaj kararlarını, n8n webhook ve durum geçişlerini yönetsin. Kaynakta anlatılan deploy fonksiyonu deterministik kalsın; rapor herhangi bir sunucuya kurulum yapmaz.

#### Karar: 15 ajan ve kişisel Mac iki ayrı kapasite problemi

**15 ajan 7/24** çalıştırma hedefi, 15 insan aboneliğiyle eşdeğer değildir. Ajanlar ne kadar süre gerçekten token üretiyor, ne kadar süre test/render bekliyor ölçülmelidir. Eşzamanlı oturum sayısı tek başına GPU alım gerekçesi olmaz. Girdi/çıktı token'ı, cache isabeti, kuyruk süresi, başarılı görev başına toplam maliyet ve review kuyruğu birlikte değerlendirilir.

**M5 Max 128 GB** kaynakta planlanan kişisel yerel inference ortamıdır: gizli bağlam, offline keşif ve tek geliştirici için MLX/Ollama pilotu. Bu, Hetzner üzerinde çok kullanıcılı 15 ajan sunucusuyla aynı SLA'yı vermez. GEX131 ve model sığma hesabı [GPU ekonomiği](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) dosyasında; model/quantization seçenekleri [yerel modeller](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) dosyasındadır.

Video tarafında öncelik B2B SaaS ürün anlatımıdır: onaylı özellik notu → marka sesi → avatar veya ürün görseli → Remotion/Creatomate → LinkedIn varyantı → final insan onayı. Faceless kanal aynı altyapıda ayrı, 10–20 videoluk gelir deneyi olarak kalır; B2B lead dönüşümüyle reklam RPM'i aynı KPI değildir. [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### Beş video yöntemi ve üç mimari

**D01, D03, D05 · Video**

#### Beş yöntem, üç farklı işletme senaryosu

Video otomasyonu tek bir yöntem değildir. Faceless stok montajı, avatar, jeneratif sahne, repurposing ve programatik kurgu farklı girdiler, insan işi ve maliyet yapıları taşır. Birinin “otomatik video” demesi diğerinin yaratıcı kontrolünü veya API kapsamını sağladığını göstermez.

#### Uygulama: girdi ve teslimatı seçerek hat kur

| Yöntem                | Girdi → işlem → çıktı                                                        | Güçlü olduğu yer                                | Yapmadığı / kalite sınırı                                                              |
| --------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| Faceless              | Konu → LLM script → Pexels/Pixabay/Storyblocks klip → TTS → altyazı → render | Ucuz açıklayıcı, eğitim, tek niş pilot          | Anahtar kelime eşlemesi alakasız B-roll getirebilir; özgün bakış açısını garanti etmez |
| Avatar / talking-head | Onaylı metin/ses → sunucu/çeviri/lip-sync → kurumsal video                   | Onboarding, eğitim, LinkedIn ve çok dil         | Sinematik aksiyon ve uzun süre doğal duygu aynı kabiliyet değil                        |
| Tam jeneratif         | Storyboard + referans → kısa sahneler → seçim/yeniden üretim → assembly      | Hero shot, atmosfer ve ürün animasyonu          | Uzun form, fizik ve karakter sürekliliği garanti değil                                 |
| Repurposing           | Podcast/webinar/demo → transkript → kesit seçimi → reframe/altyazı           | Var olan uzun içeriğin değerini çoğaltma        | Kaynak içerik olmadan sıfırdan özgün video üretmez                                     |
| Programatik           | Varlık + veri + timeline → deterministik render                              | Marka şablonu, katalog, grafik, kişiselleştirme | Yaratıcı varlığı kendisi üretmez; diğer yöntemlerin ortak montaj katmanıdır            |

**Mimari A — bütçe faceless:** AJAN konu ve script önerir; İNSAN script'i onaylar; SİSTEM ElevenLabs, stok/Wan, Whisper/Scribe ve Remotion/FFmpeg veya cloud renderer'ı çağırır. AJAN thumbnail/metadata taslağı çıkarır; İNSAN final'i onaylar; SİSTEM Postiz/Blotato ve analytics'i yürütür. D05 $50–150/ay + kullanım, video başına $0,20–1 aktarır. Bunlar gerçek hacim ve hizmet planı belirtilmeden taahhüt değildir.

**Mimari B — premium generative + avatar:** script onayından sonra Kling/Veo sahneleri, gerektiğinde HeyGen, native audio veya ElevenLabs; Creatomate ile montaj; OpusClip/Vizard ile ek kesit; ikinci onaydan sonra yayın. D05 $300–800/ay + kullanım aktarır. Ortalama tekrar sayısı, avatar saniyesi ve premium shot oranı maliyeti belirler.

**Mimari C — İsmail için B2B:** ürün/özellik notu veya Notion/Drive girdisi → marka sesiyle script → insan düzenlemesi → HeyGen/Synthesia veya gerçek ürün referansıyla I2V → Remotion/Creatomate → LinkedIn uyarlaması → her video için final onay. D05 $150–400/ay + kullanım senaryosu verir. Ana KPI demo/lead/dönüşüm; faceless reklam geliriyle aynı değildir.

#### Karar: template-first ve generative-first birlikte çalışır

Katalog, haber kartı, emlak ve çok sayıda benzer varyantta **template-first** seç: AI metin/varlık üretir, layout sabittir. Hero kampanya ve sinematik B-roll için **generative-first** seç: sahne keşfi daha pahalı ve daha değişkendir. Ortak `ContentJob`, shot list, asset manifest ve timeline sayesinde iki yaklaşımı aynı sistemde birleştir.

Başlangıç pilotu kaynakların önerdiği 30 saniyelik Türkçe dikey ürün anlatımı olabilir; bir format, tek marka kit'i ve sınırlı yayın hesabıyla kabul edilen çıktı maliyetini ölç. Niş seçimi, hook, ritim ve marka yargısı ayrı insan emeğidir. AutoShorts/InVideo/VEED gibi paketler hızlı başlangıç sağlar; özel kurgu, API ve hak kayıtlarını görünür kılan bir hat yerine otomatik olarak geçmez. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)


### Director ve sahne ajanları

**D01, D03, D05 · Video**

#### Yönetmen ajan, üretim işçileri ve editör

D01'in Director–Screenwriter–SceneBuilder düzeni üç farklı sorumluluk tanımlar. Director hedef kitleyi, anlatı yayını ve marka sınırlarını seçer. Screenwriter doğrulanmış ürün bilgisinden metin ve sahne planı çıkarır. SceneBuilder onaylı sahne sözleşmesini üreticiye, sese ve kurguya çevirir. Her ajanı aynı uzun prompt ile çalıştırmak bu ayrımı sağlamaz; girdiler, çıktılar ve değiştirebilecekleri alanlar açık olmalıdır.

#### Uygulama: brief'ten revizyona kontrollü döngü

1. Brief; amaç, platform, dil, süre, CTA, izinli kaynak, yasak iddia ve onay sahibini taşır. RAG ürün bilgisini getirir; kaynak bulunmayan özellik metne eklenmez.
2. Director anlatıyı problem → çözüm → kanıt → CTA gibi bir iskelete bağlar. Screenwriter anlatım metni, ekran metni ve sahne niyetini ayrı alanlarda yazar. Ses için uygun cümle uzunluğu ile ekranda okunabilir kelime sayısı aynı kısıt değildir.
3. Sahne planı şema kontrolünden geçer. Ürün logosu ve zorunlu açıklamalar generative modelin çizimine bırakılmayabilir; kurgu katmanında deterministik eklenir.
4. SceneBuilder her sahne için üretici, model, referans görsel, prompt sürümü, bütçe ve fallback seçer. Bir sahne hatası tüm videoyu yeniden üretmez.
5. VLM çıktıyı referansla karşılaştırır: ürün geometrisi, karakter kimliği, yazı, süreklilik, yasak öğe. VLM puanı otomatik gerçeklik kanıtı değildir; örneklem insan incelemesiyle kalibre edilir.
6. Revizyon notu belirli `scene_id` ve hata sınıfına bağlanır. Aynı hatada sonsuz regenerate yerine deneme sınırı, alternatif model veya editöre devretme uygulanır.

##### Kaynaklardaki hazır hatlar

**OpenMontage**, D01'de 12 üretim hattı, 52 araç, 500+ skill, 14+ video API ve yedi boyutlu yönlendirme ile anlatılıyor. YAML manifest, Markdown skill ve HyperFrames katmanı modülerliği hedefliyor. Bunlar kaynak iddialarıdır; bağımsız doğrulanmış ürün kapsamı veya üretim garantisi değildir. Kendi adaptör sözleşmesi, pinlenmiş sürüm ve örnek çıktılarla PoC gerekir.

**MoneyPrinterTurbo** daha doğrusal bir başlangıçtır: `config.toml` → konu/metin → Pexels/Pixabay veya yerel stok → EdgeTTS → altyazı → dikey/yatay çıktı. Kaynakta OpenAI, Gemini, Moonshot, MiniMax ve OFoxAI/Shengsuanyun geçitleri anılır. Hızlı faceless deneyi sağlar; özgün araştırma, doğruluk, telif ve dağıtım güvenilirliğini otomatik çözmez.

**ShortGPT**, Python tabanlı düzenleme dili, TinyDB'de kalıcı durum, EdgeTTS/ElevenLabs ve görsel arama ile deneysel bir hat olarak tarif edilir. D01'in 30+ dil desteği iddiası her dilde aynı telaffuz kalitesi anlamına gelmez. Bakım durumu, bağımlılık sürümü ve varlıkların kullanım hakları değerlendirilmelidir.

#### Karar: ajan sayısı yerine görev sınırını tasarla

Tek bir format ve az sayıda sahne için tek planlayıcı + deterministik renderer yeterli olabilir. Birden çok ajan; ürün bilgisi, yaratıcı seçim ve teknik yürütme gerçekten farklı bağlam/izin gerektiriyorsa değer katar. Modelin kendi çıktısını onaylaması bağımsız kalite kontrolü değildir. Final onayı metin taslağına değil render edilmiş varlık hash'ine bağla. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)


### Video modelleri ve yönlendirme

**D01, D03, D05 · Video**

#### Üretici seçimi model adından önce shot ihtiyacına dayanır

T2V metinden, I2V onaylı görselden, V2V var olan videodan yeni sahne üretir. First/last frame, referans görsel, kamera/hareket kontrolü, extend, reframe ve native audio birbirinden ayrı yeteneklerdir. Ürün geometrisinin doğru olması gereken sahnede metinden serbest üretim yerine onaylı packshot + I2V daha kontrollü bir başlangıçtır.

#### Uygulama: aynı sahne setiyle sağlayıcı karşılaştırması

| Aile                           | Kaynakların anlattığı yetenek ve limit                                                                                    | Entegrasyon kararı                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Veo 3.1 / Vertex AI            | D03: 4/6/8 sn, 9:16/16:9, 720p/1080p ve bazı yollarda 4K; first/last frame, reference, extend, ses; prompt dili İngilizce | Bölge, model ID ve sesli/sessiz fiyatı ayrı tutulur; Türkçe ses kalitesi pilotta ölçülür                       |
| Runway Gen-4.5 ve model router | T2V/I2V/V2V; Wan, Seedance, Hailuo gibi modeller aynı API altında; ProRes/PNG/HDR dönüşümleri                             | Tek gateway operasyonu sadeleştirir; kendi `GenerationJob` şemasını korumazsan ikinci seviyede lock-in yaratır |
| Luma Ray / Dream Machine       | Yaklaşık 10–15 sn sınıfı, camera control, modify video, reframe, async job                                                | Job ID kalıcı kaydedilir; polling/callback sözleşmesi ve yeniden üretim bütçesi                                |
| Kling 3.0 / Omni               | Motion control, video editing, avatar ve native 4K ürün iddiası                                                           | Erişim, model sürümü, karakter tutarlılığı ve sağlayıcı fiyatı aynı PoC'de                                     |
| MiniMax H3 / Hailuo            | D03: 768p/2K, 4–15 sn, 24 fps; eski Hailuo 1080p; multimodal reference                                                    | Video ve TTS ortak sağlayıcı olabilir; endpoint ve billing ayrı kalır                                          |
| Adobe Firefly                  | Generate/edit image, video, audio, avatar; 16:9/9:16/1:1 ve 540–1080 sınıfı                                               | Creative Cloud uyumu yararlı; web uygulaması özelliği API'de var sayılmaz                                      |
| Pika / Seedance / Mochi        | D05 alternatif ürün/model aileleri olarak listeler; ayrıntı sınırlı                                                       | Katalogda görünür; desteklenmeyen fiyat/limit uydurulmaz                                                       |
| Sora 2                         | Kaynak fiyatı $0,10/sn baz; API için 24 Eylül 2026 kapanış kaydı                                                          | Tarihsel karşılaştırmada tutulur; V03 yaşam döngüsü nedeniyle yeni bağımlılık kurulmaz                         |

Aynı **20–50 storyboard sahnesini** seç: ürün, insan, hareket, tipografi ve Türkçe anlatım gibi görev sınıflarını ayır. Her aday için referans seti, prompt sürümü, seed varsa seed, model ID ve tüm denemeleri kaydet. Human score, temporal coherence, prompt adherence, ürün/karakter doğruluğu, p50/p95 süre ve accepted-second maliyeti karşılaştır.

Router'ın kalite, süreklilik, maliyet, gecikme, politika uyumu ve kota sağlığı girdileri olsun. Kalite puanı yükseldikçe iyi; maliyet ve gecikme yükseldikçe kötü olacak şekilde ölçekleri normalize et. Kaynaktaki ağırlıklı skor formülünü bütün terimleri artı yaparak körü körüne kullanma. Başarısız premium sahneye fallback stok veya başka model seçerken içerik sınıfı ve marka onayı korunur.

##### Açık video modeli kolu

ComfyUI, JSON workflow ve async queue ile Wan 2.1/2.2, LTX-Video/LTX-2, HunyuanVideo ve CogVideoX için gateway olabilir. D03 çekirdeği GPL-3.0 olarak aktarır; özel node ve model ağırlığı lisansı ayrıca bakılır. D05 Wan için 24–80 GB, Hunyuan için 60–80 GB, LTX için bazı 24 GB yolları; D03 gelişmiş LTX workflow'u için 32 GB+ VRAM / 100 GB+ disk verir. **32/100 bütün ComfyUI kurulumlarının evrensel minimumu değildir.** D05'in Wan 2.5+ kapalı ağırlık iddiası sürüm bazında teyit gerektirir.

##### Model gateway ve doğrudan API

fal.ai, Replicate ve ModelsLab; birden çok modele ortak erişim yüzeyi olarak D03/D05'te yer alır. D05'in ModelsLab için 600+ model iddiası kalite veya bütün modellerde aynı ticari hak anlamına gelmez. Gateway input şeması, async job, webhook, çıktı URL ömrü, kredi ve provider hatasını kendi adaptörüne çevir. Doğrudan API'den geçişte ses/çözünürlük fiyatının eşit olduğunu varsayma. Kaynaktaki Runway Gen-4.5 enterprise waitlist ifadesi de tarihli erişim iddiasıdır; güncel genel erişim sınırı diye kullanılmaz.

#### Karar: görüntü kalitesi ve operasyonu birlikte seç

D03'ün LTX araştırması 5 sn / 24 fps / 768×512 çıktıyı H100'de 2 sn; CogVideoX için 10 sn / 768×1360 aktarır. Bunlar farklı model/ayar research rakamlarıdır; gerçek pipeline SLA'sı değildir. Cold-start, diskten ağırlık yükleme, queue, export ve yeniden denemeyi ekle. Gizli ürün görselleri için self-host, yüksek kalite hero shot için SaaS ve basit B-roll için ucuz rota birlikte değerlendirilebilir. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)


### Türkçe ses, altyazı ve lokalizasyon

**D01, D03, D05 · Video**

#### Türkçe destek bir dil listesinden ibaret değildir

TTS metni sese, ASR/STT sesi metne çevirir; dublaj çeviri ve zamanlamayı, voice cloning kimlik/hak yönetimini, forced alignment ise sözcüklerin ses üzerindeki konumunu ekler. Türkçe desteği, ürün adını doğru okuma, aksan, sayı/tarih telaffuzu veya avatar dudak uyumu için yeterli kanıt değildir.

#### Uygulama: ses profilini ayrı varlık olarak yönet

1. Türkçe karakter, İngilizce ürün adı, kısaltma, para/tarih ve uzun cümle içeren sabit test metni hazırla. Yerli konuşmacılarla kör dinleme yap; marka tonu ve anlaşılabilirliği ayrı puanla.
2. `VoiceProfile` içinde sağlayıcı/model/voice ID, konuşma hızı, pronunciation glossary, lisans/izin ve sürümü sakla. Bir ses değişince etkilenen videolar bulunabilsin.
3. TTS audio'yu üret; SSML mark/timepoint veya ASR/forced alignment ile zaman bilgisini çıkar. Başlangıç/bitiş, sessizlik ve clipping'i teknik QC'ye sok.
4. Altyazı cue'larını sözcük/phrase zamanlarından üret. Türkçe satır kırma, eklerin ayrılmaması, okunma süresi ve mobil safe-area kontrolü yap.
5. Lokalizasyon için çeviri → marka/claim kontrolü → ses → altyazı → görsel içi metin → final izleme zincirini çalıştır. Aynı master timeline'ın farklı dilde konuşma süresi değişebilir.

| Sağlayıcı / araç              | Kaynak verisi                                                                                  | Kullanım ve sınır                                                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| ElevenLabs                    | Multilingual v2 29 dil; Flash v2.5 32 dil/~75 ms; free 10.000 karakter/ay; MP3 `mp3_44100_128` | D05 kalite üstünlüğü iddia eder; bağımsız Türkçe bake-off değildir. Hız ve free limit sürüme bağlıdır |
| Scribe                        | D05 Türkçe ve İstanbul/Ege/Karadeniz/Güneydoğu aksanlarını anıyor                              | “88M konuşmacı” kalite puanı değil; gerçek aksan kaydıyla WER ve özel terim doğruluğu ölç             |
| Whisper / EdgeTTS             | Açık/yerel transkripsiyon veya TTS tabanlı ShortGPT akışı                                      | Whisper model indirme/bellek yükü; TTS hizmetinin kullanım koşulları ayrı                             |
| Google Cloud TTS              | tr-TR, SSML, mark/timepoint; MP3, Linear16/PCM, OGG Opus, ALAW/MULAW; sync/streaming/async     | Türkçe karşılaştırmanın referans adaylarından; karakter/voice/model fiyatını ayrı izle                |
| OpenAI TTS                    | D03 11 built-in voice aktarır                                                                  | Aynı LLM sağlayıcısını kullanmak entegrasyonu kolaylaştırabilir; katalog/model koşulları değişebilir  |
| MiniMax Speech                | D03 speech-2.8 HD/Turbo, emotion control, 40 dil                                               | Video + ses billing yüzeyi sadeleşebilir; kalite ve haklar bağımsız test edilir                       |
| Azure neural TTS / Adobe TTS  | Kaynaklarda alternatif ses katmanları                                                          | Kurumsal katalog ve seçilen endpoint/voice özellikleri kontrol edilir                                 |
| Runway Seed Audio / Eleven v3 | D03 credit/sec veya karakter modeli; WAV/MP3/Opus, SFX                                         | Ortak gateway kolaylığı, doğrudan sağlayıcıyla aynı ücret anlamına gelmez                             |

#### Karar: sesi, lip-sync'i ve müziği ayrı kabul et

TTS başarılı olsa bile görüntüdeki dudak hareketi veya beat-matching başarısız olabilir. İnsan sesinin klonlanmasında amaç/süre/platform kapsamı ve gerekli izin kaydı tutulur. Müzik/SFX lisansı ses sağlayıcısının TTS sözleşmesinden ayrı ele alınır. Native audio kullanan video modelinde de konuşma içeriği, loudness ve Türkçe anlaşılabilirliği aynı QC kapısından geçer. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)


### Avatar ve canlı persona

**D03, D05 · Video**

#### Sunuculu video ile konuşan canlı persona ayrılır

HeyGen/Synthesia tarzı offline render eğitim ve ürün anlatımında; Tavus tarzı etkileşimli persona ise gerçek zamanlı konuşmada kullanılır. Aynı “avatar” etiketi latency, altyapı, kullanıcı rızası ve faturalama sorunlarının aynı olduğunu göstermez. D-ID, Hedra, Argil ve Captions.ai kaynaklarda alternatiflerdir; ayrıntısı verilmemiş özellikler bu raporda kesinmiş gibi doldurulmaz.

#### Uygulama: avatar üretimini içerik hattına bağla

**Girdi:** onaylı script veya ses, presenter kimliği, dil, arka plan, marka kiti ve kullanım izni. **İşlem:** avatar/voice seç → async render job oluştur → provider ID'yi sakla → webhook/batch sonucunu al → Türkçe telaffuz ve lip-sync izle → altyazı/brand overlay ekle → final onayı kaydet. **Çıktı:** kullanım hakkı ve sürümü belli bir presenter asset'i; tek başına tüm yayın paketi değil.

| Platform         | Kaynakta verilen ayrıntı                                                                                                     | Satın alma / API sorusu                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| HeyGen           | D03 175+ dil, 100'e kadar batch, REST/webhook/CLI/MCP; D05 100+ avatar, Creator $29/ay yıllık, Avatar V API $0,05/sn ($3/dk) | UI aboneliği API kullanımını içeriyor mu? Avatar IV/V kredi tüketimi, batch ve concurrency hangi planda?                 |
| Synthesia        | D03 160+ dil, free 10 dk/ay ve 9 stock avatar; D05 240+ avatar, Starter yaklaşık $18/ay yıllık, SCORM                        | Kurumsal eğitim/brand kit için template ve SCORM gereksinimi var mı? Free ile ücretli avatar kataloğu karıştırılıyor mu? |
| Tavus            | LiveKit, Meet, Zoom, Teams bağlantılarıyla gerçek zamanlı persona                                                            | Offline üretim yerine konuşma gecikmesi, session state, moderasyon ve eşzamanlılık bütçesi                               |
| Adobe Avatar API | Metin veya kendi sesi; image/video background; async job                                                                     | Firefly/Adobe sözleşmesi, stock voice ve custom asset hakları                                                            |
| VEED             | Avatar, dubbing, TTS, subtitle, AI edit ve editing API                                                                       | UI'daki tüm editing adımları API'de yapılabiliyor mu?                                                                    |

Kaynaklar HeyGen'i doğal avatar, Synthesia'yı yapısal kurumsal editör tarafında konumlandırıyor. Bu **kaynak değerlendirmesi** bir Türkçe kullanıcı testi değildir. Aynı 30–60 saniyelik ürün metnini karşılaştır; sayı, kısaltma, Türkçe/İngilizce geçiş, dudak kapanışı ve duygusal doğallık için kabul rubriği oluştur. Avatar kalitesini yalnız sessiz video izleyerek değerlendirme.

#### Karar: B2B güveni kredi fiyatından önce gelir

İsmail'in B2B ürün anlatımı için avatar, tekrar kullanılabilir bir presenter formatı sağlayabilir. Yüksek marka riskinde her final insan onayından geçer. Sesi/yüzü temsil edilen kişinin yetkisi, sentetik içerik açıklaması ve ticari kullanım kapsamı üretim kaydına bağlanır. D05'teki $330/ay HeyGen kullanıcı deneyimi anekdottur; evrensel aylık maliyet değildir. Yüksek kalite avatar kredisi, render süresi ve tekrar sayısıyla bütçe modeli kur. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)


### Kurgu, render ve finishing

**D01, D03, D05 · Video**

#### Render, motion graphics ve yaratıcı finishing aynı işlem değildir

FFmpeg/MoviePy pikselleri ve medya dosyalarını keser, birleştirir, filtreler; Remotion kareyi React/TSX ile tanımlar. Shotstack/Creatomate/JSON2Video ise timeline veya template'i cloud API ile render eder. Profesyonel NLE olan Premiere/Resolve, editörün yaratıcı renk/ritim kararlarına ve proje alışverişine ayrı bir yol sunar.

#### Uygulama: değiştirilebilir render sözleşmesi kur

`resolution`, `fps`, `duration`, `tracks`, `clips`, `captions`, `audio` ve platform safe-area'larını kendi timeline şemanda sakla. Renderer adaptörü bunu vendor payload'una çevirsin. Asset URL'leri süreli olabilir; render başlamadan erişilebilirlik/süreyi doğrula, değişmez asset hash'iyle çalış. Çıktıda ffprobe/codec/fps/süre/ses kontrolü, sonra görsel marka kontrolü uygula.

| Araç / desen                   | Somut kullanım                                               | Kaynak fiyatı / lisans / sınır                                                                                                               |
| ------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| FFmpeg / MoviePy               | Trim, concat, crossfade, scale, mux, loudness, LUT/transcode | CPU/GPU container; build'e göre lisans. Uzun process/bellek birikimini job izolasyonu, timeout ve recycle ile izle                           |
| Remotion                       | Data-driven chart, dinamik ürün kartı, brand motion          | D05 birey/≤3 çalışan ücretsiz koşulu; $25/koltuk veya $0,01/render, min $100/ay senaryosu. MIT varsayımı yanlış; V09 lisans kontrolü korunur |
| Remotion Lambda                | Render'ı parçalara ayırıp cloud'da paralel işleme            | S3/output, concurrency, başlangıç ve cloud maliyeti; her render'ın saniyede biteceği veya memory leak'i çözeceği garantisi yok               |
| Shotstack                      | timeline → tracks → clips; HTML5/JS dinamik grafik; callback | D05 $0,30/dk PAYG; $39/ay'dan abonelikte $0,20/dk; self-host yok kaynak iddiası                                                              |
| Creatomate                     | Template/data-driven sosyal varyant, altyazı                 | D05 $49–54/ay / 2.000 kredi; görsel 1, yaklaşık 720p dakika 14 kredi; self-host yok                                                          |
| JSON2Video                     | JSON scenes, text, video, image, audio/TTS ve subtitle       | D05 free 600 kredi; $49,95/ay / 200 dk Full HD; kredi=1 sn 1080p, 4K=4× iddiası                                                              |
| Bannerbear / Plainly           | Medya template'i / After Effects template render             | D05 $49/1.000 kredi; Plainly $69/50 render dk; template bağımlılığı                                                                          |
| Editly / Revideo               | Kodla deterministik video kompozisyonu                       | Kaynakta adı geçiyor; kesin lisans/API olgunluğu ayrıca araştırılmalı                                                                        |
| Premiere UXP / DaVinci Resolve | Editörle hibrit finishing, caption track, yaratıcı grade     | Creative Cloud / free+Studio ayrımı; kaynak Resolve 21.1 diyor, güncel scripting sözleşmesi UNK                                              |
| Runway Ruby                    | SDR→HDR gibi mekanik dönüşüm                                 | Color grade'in sanatsal süreklilik kararının yerine geçmez                                                                                   |

**Color grading boşluğu:** LUT veya renk uzayı dönüşümü otomatik olabilir; bütün sahnede ışık/ten rengi/marka hissini yaratıcı biçimde korumak aynı sorun değildir. Kaynakların işaret ettiği fidelity gap, rack focus, beat'e göre kesim, eşzamanlı eylem, lip-speech ve spatial audio uyumu üzerinde belirgindir. İnsan finishing kapısı bu nedenle ayrı kalır.

#### Karar: yazılım becerisine ve varyant ihtiyacına göre seç

İsmail'in React becerisi ve self-host tercihi Remotion + FFmpeg'i doğal aday yapar; bakım/lisans/cloud renderer ekonomisi yine ölçülür. İçerik ekibinin şablonu kendisinin değiştirmesi gerekiyorsa Creatomate/Shotstack pilotu daha düşük sürtünmeli olabilir. Deterministik render, yaratıcı sahne üreticisini değiştirmeyi kolaylaştırır; provenansın transcode sonrası korunması/yeniden oluşturulması ayrıca kontrol edilir. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)


### Uzun videodan kısa içerik

**D03, D05 · Video**

#### Uzun içeriğin içinden kısa video seçmek

Repurposing, kaynak podcast/webinar/demo'nun anlamlı parçalarını bulup hedef formata dönüştürür. Otomatik sessizlik kesimi, semantik highlight seçimi, speaker-aware reframe ve “viral an” puanlaması ayrı yeteneklerdir. Bir skor videonun gerçekten izleneceğini garanti etmez.

#### Uygulama: kesiti bağlamıyla kabul et

1. Kaynak video ve haklarını kaydet; transkript, konuşmacı ve zaman aralıklarını çıkar.
2. Aday segmentleri konu bütünlüğü, başta bağımsız anlaşılabilirlik, hook ve sonlandırma açısından puanla. Sorunun cevap kısmını tek başına kesmek yanlış anlam yaratabilir.
3. 9:16 reframe'de aktif konuşmacı/ürün ve altyazı safe-area'sını koru. Ekran paylaşımı veya grafik içeren sahnede yüz takibi tek başına yeterli değildir.
4. ASR'deki kişi/ürün adlarını glossary ile düzelt; süreyi ve kesim kenarlarını kontrol et. İnsan son kesiti orijinal bağlamıyla karşılaştırsın.
5. Ayrı hook/başlık/thumbnail varyantlarını deney kaydına bağla. Aynı içerikten çıkan klipler bağımsız içerik performansıyla izlenir.

| Araç                                  | Kaynakların çizdiği rol                             | Fiyat / API belirsizliği                                                                                                                                             |
| ------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpusClip                              | Highlight/ranking, captions ve yayın                | D05 Starter $15/ay, API Business der; D03 2026 public API, Pro/free trial ve 30 req/dk/key der. **Çelişki korunur**, erişim sözleşmesi teyit edilmeden plan seçilmez |
| Vizard                                | Temiz kesim, reframe ve 32+ dil transkripsiyon      | D05 Creator yaklaşık $14,50/ay yıllık ve Creator'a API der; Türkçe kalite karşılaştırması kaynak görüşüdür                                                           |
| Ssemble                               | Kısa video/otomatik kurgu alternatifi               | D05 $7,50/ay ve tüm planlarda API iddiası; güncel teyit yok                                                                                                          |
| Klap / Munch                          | Uzun videodan kısa içerik                           | Kaynakta alternatif olarak anılır; ayrıntılı kota/plan yok                                                                                                           |
| Descript / CapCut / AutoPod / Wisecut | Transkript veya editör merkezli AI montaj           | UI yeteneği ile API otomasyonu ayrılır; ürün bazında sözleşme gerekir                                                                                                |
| auto-editor                           | Sessizlik/loudness tabanlı cut ve subtitle retiming | Yerel CLI preprocessing; anlatı yargısı ve viral ranking yerine geçmez                                                                                               |

#### Karar: mevcut içerik varsa ilk pilot olabilir

Kaynak içerik zaten iyi bir anlatım içeriyorsa repurposing, sıfırdan jeneratif sahne üretimine göre daha az doğruluk ve görsel tutarlılık riskiyle değer üretebilir. İsmail'in ürün demoları ve webinar'ları varsa bu hattı B2B üretime bağla. Kaynak video yoksa bu araç sınıfı ilk girdi sorununu çözmez. Kredi, analiz edilen kaynak dakikası, üretilen klip ve API hakkının hangi birimden ücretlendiğini karşılaştır. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)


### İçerik veri modeli ve sözleşmeler

**D01, D03 · Mimari**

#### Video hattının veri sözleşmesi

Üretim hattını tek bir prompt ve çıktı URL'si olarak saklamak, revizyon ve maliyet takibini bozar. D03'ün önerdiği veri modeli; Campaign, ContentJob, ScriptVersion, Storyboard, Scene, GenerationAttempt, Asset, Timeline, Render, QC, Approval, Publication ve Analytics kayıtlarını ayırır. Bir onaylı video ile başarısız denemeleri aynı kayıtta ezme.

#### Uygulama: küçük ama izlenebilir bir sözleşme

| Kayıt                   | Girdi / zorunlu alan                                                              | Çıktı ve sorumluluk                  |
| ----------------------- | --------------------------------------------------------------------------------- | ------------------------------------ |
| ContentJob              | brief, marka, hedef platform/dil, deadline, bütçe, onay politikası                | İşi tekilleştiren ID ve durum        |
| ScriptVersion           | metin, kanıt kaynakları, CTA, önceki sürüm                                        | Onaylanabilir değişmez metin sürümü  |
| Scene                   | scene_id, süre, narration, visual_intent, referanslar, kamera, güvenli yazı alanı | Üreticiden bağımsız sahne tarifi     |
| GenerationAttempt       | model/provider sürümü, prompt hash, seed, vendor_job_id, maliyet                  | Her denemenin sonucu ve hata sınıfı  |
| Asset                   | dosya URI, hash, codec, boyut, süre, hak/provenance kaydı                         | Tekrar kullanılabilir medya          |
| Timeline / Render       | track'ler, font/şablon sürümü, çözünürlük, fps, ses seviyesi                      | Render edilmiş belirli dosya         |
| QC / Approval           | kontrol bulguları, reviewer, karar, artifact hash                                 | Yayına uygunluk ve değişiklik izleme |
| Publication / Analytics | platform, hesap, post ID, status, yayın zamanı, ölçüm penceresi                   | Dağıtım ve sonuçların takibi         |

Örneğin `POST /content-jobs` isteği Türkçe brief, hedefler, `brand_id` ve `approval_policy` taşır. `Idempotency-Key` aynı işin iki kez açılmasını önler; bunun gerçekten çalışması için anahtar ve istek hash'i veritabanında atomik tutulmalıdır. Aynı anahtarla farklı payload sessizce kabul edilmez.

Scene'de süre ve anlatım ayrı alanlardır. Metni okuyunca 12 saniye sürüyorsa 5 saniyelik sahneye sıkıştırmak yerine metni ya da timeline'ı değiştir. `safe_text` alanı, platform arayüzünün kapattığı kenarlar dışında metin yerleşimini belirtir. Fallback; stok, statik görsel hareketi veya başka model olarak önceden tanımlanır.

Timeline örneği 1080×1920, 30 fps, video / voice / music / captions / logo track'lerinden oluşabilir. Bu bir teslimat profili örneğidir; tüm kaynak videoların doğal fps'si aynı olmak zorunda değildir. Dönüşüm kararını renderer verir, model prompt'u değil.

##### Dosya yaşam döngüsü

`raw/`, `work/`, `master/`, `delivery/` ayrımı orijinali, ara çıktıyı, onaylı master'ı ve platform varyantını ayırır. Her türev üst varlığın hash'ini taşır. Model URL'leri kalıcı arşiv sanılmaz; süreleri dolmadan kurumun nesne deposuna alınır. İndirme başarısı ve hash kontrolünden önce iş tamamlandı sayılmaz.

#### Karar: revizyonun hangi kaydı geçersiz kıldığını tanımla

Senaryo değişince sonraki ses/sahne/render onayları; yalnız altyazı zamanlaması değişince ilgili render ve yayın onayı geçersizleşir. Hash tabanlı onay, eski videoya verilmiş kararın yeni çıktıya taşınmasını önler. Marka verisi, OAuth token ve kişisel veri aynı blob'a konmaz; erişim izinleri ayrı tutulur. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03)


### Kalite kapıları ve insan onayı

**D01, D03, D05 · Video**

#### Teknik, anlamsal ve editoryal kalite

Dosyanın açılması, sahnenin doğru olduğu anlamına gelmez. D01/D03; codec, ses, zamanlama, karakter sürekliliği, ürün doğruluğu ve marka kurallarını ayrı kalite katmanları olarak ele alır. Model başarısı yerine kabul edilen video kalitesini ölçmek bu katmanların tümünü gerektirir.

#### Uygulama: dört kontrol kapısı

| Kapı         | Otomatik kontroller                                                                              | İnsan kontrolü / başarısızlık yolu                                                     |
| ------------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Teknik       | ffprobe ile codec, süre, fps, çözünürlük; decode testi; siyah/donuk frame; sessizlik ve clipping | Bozuk dosya yeniden indirilir veya render edilir; model gereksiz yere tekrar çağrılmaz |
| Anlamsal     | OCR, transkripsiyon, referans eşleştirme, VLM ile bulgu üretimi                                  | Özellik/istatistik doğruluğu, yüz/ürün deformasyonu, yanlış dil                        |
| Marka        | Font, renk, logo, CTA, güvenli alan, süre, altyazı politikası                                    | Ton, iddianın bağlamı, uygunsuz stok ve yaratıcı bütünlük                              |
| Hak ve yayın | Rıza/lisans kayıtları, müzik kapsamı, AI açıklaması, platform profili                            | İzin belirsizliği yayını durdurur; final artifact üzerinde onay alınır                 |

30–120 saniyelik bir anlatı için kaynakta önerilen 4–8 ana shot, pratik bir planlama örneğidir; model veya platform limiti değildir. Karakter sheet'i, ürün referansı, renk/ışık rehberi ve aynı sahne niyeti kimlik tutarlılığını artırır. İlk ve son kare köprüleri yardımcı olabilir; kesmelerin fiziksel sürekliliği yine gözlenir.

Kaynakların saydığı **VBench, VBench2, WBench, VWG-Bench**; temporal coherence, insan/nesne tutarlılığı ve fizik gibi model karşılaştırma boyutlarına işaret eder. Tek aggregate skor; Türkçe konuşma, logo doğruluğu veya kendi ürün sahnenin başarısını göstermez. Benchmark seti, sürümü ve ölçülen görev açıklanmadan sıralama taşınmaz.

Kurgu için rack focus, kamera hareketi, beat matching, dudak-ses senkronu ve spatial audio ayrı değerlendirilir. Müzik ritmine kesmek her anlatıya uygun değildir. Speech intelligibility, arka plan müziği ducking'i ve altyazının sözle hizası önceliklidir. Modelin native audio çıktısı varsa yeniden seslendirme ile çakışan iki konuşma track'i bırakılmaz.

##### İnsan onayı gerçekten neyi onaylar?

Telegram/Slack bildirimi; küçük önizleme, final dosya, metin, hak özeti, maliyet ve revizyon düğümü sunar. Onay/reddet webhook'u kimlik doğrulaması, süre sonu, tekrar kullanım koruması ve imza kontrolüyle bağlanır. Karar Postgres'te reviewer ve artifact hash'iyle saklanır. Yayıncı, render değiştiğinde eski onayı kullanamaz.

#### Karar: otomatik puana aşırı güvenme

Bir VLM'nin “uygun” demesi telif, tıbbi iddia veya ürün özelliğini doğrulamaz. Yüksek riskli içerikte insan kontrolü zorunlu iş kuralıdır; düşük riskte örnekleme ancak gerçek hata verisiyle azaltılır. Kaynakta geçen FFmpeg bellek sızıntısı her build'in kaçınılmaz özelliği değildir: worker RSS, dosya tanıtıcıları ve job sonunda kaynak temizliği ölçülür; gerekiyorsa process izolasyonu ve worker recycle uygulanır. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03)


### Workflow, retry ve kalıcı durum

**D01, D03, D04, D05, D06 · Mimari**

#### Olay, durum ve uzun süren iş

n8n/Make/Zapier uygulamalar arası iş akışını; Temporal kalıcı, uzun süreli yürütmeyi; LangGraph/CrewAI/AutoGen gibi çerçeveler ajan kararlarını düzenler. Bunları aynı tür “otomasyon aracı” diye kıyaslamak hatalıdır. D01/D03/D05/D06'nın ortak ihtiyacı: servis çağrısı saatler süren insan onayını veya dakikalar süren render'ı tek HTTP bağlantısında beklemesin.

#### Uygulama: n8n ile ilk üretim hattı

Webhook/RSS/Sheets/CMS → marka ve ürün bilgisini yükle → şemalı script → metin onayı → sahneleri böl → HTTP üretim isteği → vendor job ID'yi sakla → Wait/callback veya kontrollü polling → varlıkları doğrula → TTS → timeline → render → QC → final onay → publish → analytics.

Queue worker concurrency'si sağlayıcı kotası ve bütçeye göre sınırlanır. Callback iki kez gelebilir; durum geçişi ve çıktı hash'i tekilleştirilir. Callback gelmezse timeout ve status sorgusu devreye girer. İşin durumunu yalnız n8n ekranındaki execution log'una bırakmak yerine ürün veritabanında tutmak yeniden başlatmayı kolaylaştırır.

| Seçenek                                                   | Uygun iş                                                                                 | Sınır / tasarım kararı                                                                                               |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| n8n                                                       | Kendi sunucunda webhook, onay, API ve CI akışları                                        | Fair-code; queue, credentials, erişim ve yedekleme işletilmelidir                                                    |
| Make                                                      | Iterator, aggregator, router ile SaaS bağlantıları                                       | Kaynaktaki 300 webhook/10 sn değeri hesap/özellik bağlamında teyit ister; sıralı iş gerekirken paralel çalışma seçme |
| Zapier                                                    | Düşük hacimli pazarlama/iş sistemi akışları; Catch Hook/Raw, GET/POST/PUT/Custom Request | İşlem maliyeti, payload ve uygulama yetenekleri plan bazında                                                         |
| Temporal                                                  | Üç dakika üretim + altı saat onay + beş dakika render gibi uzun, kritik işler            | Event history/replay ve deterministik workflow kuralları; activity içindeki yan etki ayrıca idempotent olmalı        |
| Activepieces / Windmill / Prefect                         | Kaynaklarda alternatif workflow ve geliştirici otomasyonu                                | Ekosistem, lisans, retry ve deployment gereksinimi için ayrı PoC                                                     |
| LangGraph / CrewAI / AutoGen / Google ADK / ajan SDK'ları | Dallanan, durumlu karar veya rol ayrımı                                                  | Sabit bir pipeline için gereksiz ajan koordinasyonu eklemeyin                                                        |

##### Hata toparlama

429 ve geçici 5xx için sağlayıcının `Retry-After` bilgisini gözeterek `base × 2^retry + jitter` kullan. Geçersiz prompt, lisans veya izin hatası aynı isteği tekrar ederek çözülmez. Kaynağın “beş hata / 60 saniye” circuit breaker eşiği örnektir; trafik ve sağlayıcı davranışıyla ayarlanır. Açık devrede çağrıları durdur, kısa sağlık denemesiyle yarı açık duruma geç.

Retry bütçesi tükenince DLQ kaydı hata sınıfı, iş ID'si ve son güvenli adıma dönüş bilgisi taşır. Editoryal ret teknik hata değildir; revizyon kuyruğuna gider. Serverless control plane kısa karar/dispatch işlerini, render veya GPU worker uzun yoğun işi taşır. GPU'nun idle süresi ve cold-start etkisi ölçülür.

#### Karar: mevcut Pane + n8n düzeninden başla

D06'nın 15 ajan hedefinde mesaj triage'ı, kod üretimi ve deploy aynı yetkiyle çalışmamalı. OpenClaw öneri ve görev yönlendirsin; n8n durum/bildirim yönetsin; worker ayrı worktree'de testli diff üretsin. LangGraph/CrewAI gibi yeni katmanlar ancak gerçek branch/retry/state ihtiyacı mevcut araçların kapasitesini aşıyorsa eklenir. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### Yayın API’leri ve sosyal dağıtım

**D01, D03, D05 · Video**

#### Yayın API'si bir dosya yükleme düğmesinden fazlasıdır

Her platformun OAuth izni, uygulama incelemesi, medya hazırlama, açıklama, durum sorgusu ve kota sözleşmesi farklıdır. D03 doğrudan API; D05 Postiz/Blotato/Upload-Post/Ayrshare gibi aracı servisleri birlikte değerlendirir. Aracı servis kullanmak hesap yetkisini, platform denetimini veya içerik onayını ortadan kaldırmaz.

#### Uygulama: platform adaptörleri

| Platform         | İş akışı                                                                           | Kontrol noktası                                                                                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| YouTube          | Resumable upload / videos.insert → metadata → thumbnail → processing/status        | 17 Eylül kontrolünde videos.insert ve search.list ayrı ayrı varsayılan 100 çağrı/gün, çağrı başına 1 kota; eski 1.600 veya 100 birim/çağrı hesabı taşınmaz. Audit gereksinimi olan projelerde private kısıtı; kanal günlük yükleme sınırı quota'dan farklı |
| TikTok           | Creator info → kullanıcı tercihleri → publish init veya upload → transfer → status | Direct Post `video.publish` ve upload kapsamı ayrılır. Init limiti 6/dk/token doğrulandı; denetimsiz uygulamalar private kısıtlıdır                                                                                                                        |
| Instagram / Meta | Medya container oluştur → FINISHED durumunu bekle → publish → post ID doğrula      | Facebook Login / Instagram Login yolu ve hesap izinleri ayrı. D05'in “en fazla 90 sn” iddiası evrensel değil; doğrulanan Reels yolu 3 sn–15 dk                                                                                                             |
| LinkedIn         | Video upload başlat → dosya aktar → asset hazır olunca Posts API → sonuç izle      | Üye/kurum izinleri, caption ve thumbnail ayrı değerlendirilir; kişisel ve organization yetkisini karıştırma                                                                                                                                                |

TikTok'ta URL pull veya dosya upload/chunk yolu seçilir; URL sahipliği ve kaynak erişimi kontrol edilir. Her platformda zamanlanmış iş; onaylı `artifact_hash`, hedef hesap, yayın saati ve metadata sürümü taşır. API'nin 200 dönmesi videonun işlendiği veya halka açık olduğu anlamına gelmez. Kalıcı post ID ve son durum kaydedilmeden iş “yayında” sayılmaz.

##### Aracı servislerin kaynak fiyatları

D05; **Blotato $29/ay ve dokuz platform**, **Upload-Post $24 aylık veya yıllık planda $16/ay; ücretsiz 10 upload/ay**, **Ayrshare $149/ay ve 30+ profil için farklı ücretleme**, **Postiz self-host ücretsiz veya cloud $29/ay**, **Mixpost $299 tek sefer** aktarır. Bunlar kaynak fiyat iddialarıdır; güncel satın alma teklifi değildir. Buffer, Metricool, Publer, Late ve SocialBee de alternatif olarak korunur; kaynağın vermediği kota/fiyat eklenmez.

Postiz, D05'te Docker ve 30+ MCP aracıyla; Mixpost Laravel tabanlı self-host olarak tarif edilir. Self-host yazılımın ücretsiz olması platform hesaplarının, uygulama incelemesinin ve sunucu bakımının ücretsiz olduğu anlamına gelmez. Ajana token vermek yerine dar “onaylı işi yayınla / durumunu oku” aracı sun.

[Güncel YouTube kota tablosu](https://developers.google.com/youtube/v3/determine_quota_cost) gövde/tablo düzeyinde bu ayrımı verir; sayfanın otomatik özetinde kalan eski 1.600 ifadesiyle çelişir. Proje konsolundaki atanmış limit ayrıca kontrol edilir.

#### Karar: kota, rıza ve tekrar yayın koruması

D01'in 200/saat BUC, 60 günlük token ve yeni kanal ~20 upload/gün ifadeleri farklı limit türlerini bir araya getirir; evrensel kapasite hesabı yapılmaz. `uploadLimitExceeded` için retry fırtınası üretme; kanal durumunu incele. Token yenileme ve izin iptali ayrı alarmdır. D05'in 2–4 haftalık Meta review süresi SLA değildir.

Timeout sonrası tekrar POST etmeden önce platformdaki mevcut job/post ID sorgulanır. Yayın kaydı ve idempotency anahtarı ikinci kopyayı önler; platform desteklemiyorsa kendi tekilleştirme katmanın gerekir. “Shadowban %90” gibi kaynaktaki nedensellik iddiaları bağımsız kanıt değildir; erişim düşüşü içerik, hesap ve ölçüm penceresiyle incelenir. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)


### Müzik ve medya hakları

**D03, D05 · Uyum**

#### Müzik, ses ve görüntünün hak zinciri

Stok lisansı, model sağlayıcısının ticari kullanım izni ve eserin telif koruması üç ayrı sorudur. Bir servis “commercial use” sununca üçüncü kişi hak iddiasına karşı sınırsız tazminat taahhüdü vermiş olmaz. D03/D05'in müzik karşılaştırması bu nedenle yalnız fiyat tablosu değil, yayın kapsamı kararıdır.

#### Uygulama: varlık başına lisans kaydı

Her müzik/stok/ses dosyası için asset ID, sağlayıcı, plan, edinme tarihi, lisans metninin sürümü, hak sahibi/rıza kaydı, izin verilen platform ve hesaplar, reklam kullanımı, müşteri işi, abonelik bitişi ve varsa indemnity sınırı saklanır. Lisans kaydı final videonun hash'iyle ilişkilendirilir.

| Seçenek                       | Kaynak fiyatı ve kapsam iddiası                                                              | Karar için gerekli kontrol                                                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Suno                          | Pro $10/ay veya yıllıkta $8/ay; free kişisel, ücretli dönemde üretilen parça ticari kullanım | Plan koşulları ve üretim tarihi; çıktı benzerliği, üçüncü kişi hakları, tazminat kapsamı. Abonelik sonrası free üretimi eski planla lisanslama |
| Epidemic Sound                | Creator $9,99, Pro $16,99/ay yıllık faturalama; sınırsız müzik/SFX, kanal whitelist          | Müşteri/reklam/kurum kapsamı; kaynakta Pro için 5M takipçi / $10M şirket sınırı anılır, sözleşme bazında teyit                                 |
| Artlist                       | Social $9,99/ay; organik sosyal kapsam; Pro/Max daha geniş kullanım ve üç kanal iddiası      | Kanal, client work, paid ad, seat ve indemnity üst sınırı; bütün planlara aynı hakkı atama                                                     |
| Stok müzik / kendi kayıtların | Kaynağa ve sözleşmeye göre                                                                   | Beste, master, performans ve senkronizasyon hakları ayrı olabilir                                                                              |

Kaynak Epidemic'te aktif abonelik sırasında doğru biçimde yayımlanan/cleared videoların abonelik sonrasında korunabildiğini söyler. Bunu “indirdiğim bütün parçaları sonsuza kadar yeni projede kullanabilirim” diye genişletme. Kanal bağlama veya whitelist eksikse hak sahibi claim'i gelebilir; itiraz için kayıt gerekir.

##### Yapay müzik ve hukuki gelişmeler

D05, 2025'te Warner–Suno ve UMG–Udio anlaşmalarını, Sony/UMG–Suno ihtilaflarını anıyor. Bu tarihli kaynak iddiaları tüm katalogların bütün kullanımlar için temizlendiğini göstermez. Bu raporda anlaşmaların güncel kapsamı bağımsız doğrulanmış kabul edilmez. ABD'de insan katkısı tartışması da “AI içeren hiçbir eser korunmaz” sonucuna indirgenmez; insanın yaratıcı katkısı, işin türü ve yargı alanı belirleyicidir.

#### Karar: başlangıçta hak yönetimi kolay seçeneği seç

Markalı B2B reklam ve müşteri işinde açık lisans kayıtlı bir stok müzik planı operasyonu sadeleştirebilir. Suno gibi üreticiler yaratıcı deneye uygundur; planın izin verdiği kullanım ile hukuki koruma/tazminat aynı şey değildir. Ses klonu veya avatar için kişinin kapsamı açık rızası ve iptal süreci ayrıca gerekir. Türkçe kurumsal içerikte bu kayıtlar [Türkiye uyumu](https://karacaismail.github.io/futuristic/#/guide?topic=turkey-compliance) değerlendirmesine bağlanır. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)


### C2PA, SynthID ve AI açıklaması

**D01, D03, D05 · Uyum**

#### Kaynak izi, filigran ve açıklama

C2PA, SynthID ve platformdaki “AI ile üretildi” seçeneği farklı katmanlardır. C2PA imzalı bir içerik geçmişi/manifest sunabilir; SynthID gibi filigranlar içerikte tespit edilebilir işaret taşır; kullanıcı açıklaması izleyiciyi bilgilendirir. Hiçbiri videonun anlattığı olayın doğru olduğunu tek başına kanıtlamaz.

#### Uygulama: provenance bilgisini üretimden yayına taşı

1. Üreticiden gelen özgün dosyayı ve varsa credential/manifest bilgisini sakla. Dosya hash'i, üretici, model sürümü, üretim zamanı ve referansların hak kaydı ilişkilensin.
2. Kurgu ve transcode sonrasında metadata/credential durumunu yeniden kontrol et. Bir önceki dosyanın imzasını değişmiş dosyaya aynen taşımak geçerli imza oluşturmaz. Türev ilişkiyi destekleyen araç varsa yeni manifest üretir.
3. Final çıktı için “hangi öğeler üretildi, hangi öğeler kaydedildi, hangi değişiklikler yapıldı?” kaydını tut. AI ses, gerçek görüntü ve sentetik B-roll aynı videoda olabilir.
4. Platforma uygun disclosure alanını ve gerekiyorsa görünür açıklamayı ayarla. API'nin bu alanı desteklemesi, alanın iş akışında gerçekten gönderildiği test edilerek doğrulanır.
5. Yayın sonrası indirilen/servis edilen dosyada metadata veya filigran korunmuş mu örnekle. Platformun yeniden kodlaması bazı bilgileri kaybettirebilir; kesin korunma sözü verme.

##### Politika ve tarih düzeltmeleri

D01'in YouTube “inauthentic content” değişikliğini Temmuz 2026'ya bağlaması hatalıdır; doğrulama kaydı **15 Temmuz 2025** tarihini gösterir. Tekrarlı, seri üretilmiş veya düşük özgün katkılı içerik monetizasyon riski taşıyabilir. AI kullanımı tek başına bütün içeriklerin demonetize olduğu anlamına gelmez. 16 kanal / 35M abone kapatma ve TikTok shadowban oranları kaynak iddiası olarak saklanır, platform garantisi gibi kullanılmaz.

D05'in TikTok'ta Kasım 2025 için 1,3 milyar, Temmuz 2026 için 3 milyar etiketli içerik ve Temmuz 27 kurul açıklaması sayıları kaynak iddiasıdır; farklı tarih/ölçüm tanımı güncel oran çıkarmaya yetmez. Etiket sayısı toplam AI içerik hacmini veya erişim etkisini tek başına vermez.

AB AI Act m.50; sağlayıcı ve sistemi kullanan tarafın farklı yükümlülüklerini ayırır. Kaynağın tüm medya için tek bir zorunluluk ve tek yürürlük tarihi vermesi fazla geneldir. Mevcut doğrulama kaydı, konsolide metindeki sağlayıcı m.50(2) kapsamı ve geçiş tarihlerini ayırır. D01'in €15M / dünya cirosunun %3'ü ifadesi her olayda otomatik kesilecek ceza değildir; ihlal türü ve hukuk değerlendirmesi gerekir.

#### Karar: doğruluk kontrolünü metadata'ya devretme

Teknik provenance, hak zinciri ve editoryal doğrulama ayrı kayıtlar olarak tutulur. AI etiketlemek yanlış ürün iddiasını düzeltmez; metadata silinmesi de tek başına sahtecilik kanıtı değildir. Türkiye tarafında KVKK, ses/görüntü rızası ve RTÜK kapsamı ayrıca ele alınır. [D01](https://karacaismail.github.io/futuristic/#/sources?doc=D01) [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)


### Video bütçesi, RPM ve gelir

**D03, D05 · Ekonomi**

#### Maliyet birimi: kabul edilen saniye ve tamamlanan iş

Liste fiyatını video süresiyle çarpmak yalnız ilk denemeyi hesaplar. D03/D05; yeniden üretim, TTS, avatar, müzik, render, storage, egress, yayın ve insan incelemesini birlikte değerlendirmeyi gerektirir. Final sürenin tamamı generative video olmak zorunda değildir: ekran kaydı, stok, grafik ve motion daha farklı maliyet taşır.

#### Uygulama: görünür varsayımlarla hesapla

**Üretim maliyeti = üretilen saniye × birim fiyat × kabul başına ortalama deneme.** Toplama insan emeği, değişken servis gideri ve sabit abonelikler eklenir. Reddedilen denemeler fiyat hesabından çıkarılmaz. [Etkileşimli hesaplayıcı](https://karacaismail.github.io/futuristic/#/cost) aynı ayrımı kullanır.

Runway'nin kontrol edilen resmi kredi tablosunda **1 kredi = $0,01**, **Gen-4.5 = 12 kredi/sn**, **Veo 3.1 sesli = 40 kredi/sn**. Dolayısıyla sekiz saniyelik shot sırasıyla **$0,96** ve **$3,20**; on shot ilk denemede **$9,60 / $32** olur. Ortalama iki denemede **$19,20 / $64** yalnız üretim gideridir. Aynı gateway'deki farklı model fiyatları tek bir “Runway saniye ücreti” değildir. [Resmi fiyat tablosu](https://docs.dev.runwayml.com/guides/pricing/)

D05; Kling $0,10/sn, Veo Fast $0,15/sn, Sora 2 $0,10/sn, Runway $0,12–0,15/sn, Wan/Grok $0,05/sn aktarır. Ses, çözünürlük, provider gateway ve model sürümü eşitlenmeden doğrudan kalite/fiyat sıralaması kurulmaz. **Kaynağın Veo için 30 × $0,75 = $12 hesabı yanlış: sonuç $22,50.** Bu hata ve özgün $12 iddiası sayısal kayıtta birlikte korunur.

| Ölçek kalemi       | Kaynak senaryosu                                           | Nasıl kullanılmalı?                                                                |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| GPU inference      | H100 $2–2,70/saat; Wan $0,25–0,60/clip                     | Donanım, süre, ayar ve doluluk belirtilmeden garanti fiyat değildir                |
| Self-host eşiği    | Ayda 5.000 clip sonrası avantaj iddiası                    | API–GPU farkı, bakım, kalite ve iş yüküyle yeniden hesaplanır; evrensel eşik değil |
| Storage            | Günde 100 video × 200 MB final = 20 GB; ara dosyalar 3–10× | 60–200 GB/gün çalışma verisi senaryosu; lifecycle, master saklama ve egress ayrıca |
| Faceless başlangıç | Aylık $100–500 araç/üretim bütçesi                         | Dağıtım ve editoryal emek dahil edilmezse toplamı küçümser                         |

##### Gelir varsayımlarını bütçe garantisine dönüştürme

D05 finans/AI/business nişlerinde **$7–25 RPM**, 12–18 ayda düşük binler dolar, $10.000+ aylık gelirin azınlıkta ve 1–3 yıllık breakout olabileceğini öne sürer. Bu bir gelir tahmini ve senaryodur; kanal, ülke, sezon, video uzunluğu ve monetizasyon uygunluğu sonucu değiştirir. **RPM**, üreticinin bin görüntülenme başına geliridir; reklamveren CPM'iyle aynı değildir.

Örneğin $500 gideri yalnız $7 RPM reklamla kapatmak yaklaşık 71.429 monetize edilen eşdeğer görüntülenme gerektirir; $25 RPM'de 20.000. Bu basit oran platformun gerçek RPM tanımı, vergi ve insan maliyetini kapsamayabilir. B2B ürün videosunda reklam RPM'i yerine qualified lead, demo, satış dönüşümü ve üretim süresi ölçülür.

#### Karar: hacimden önce kabul oranını iyileştir

İlk 10–20 videoda sahne başına deneme, kabul nedeni, insan dakikası ve gerçek fatura tutulur. Premium modeli yalnız değer yaratan shot'a yönlendirmek, bütün videoyu ucuz ama çok tekrar isteyen modelde üretmekten daha ekonomik olabilir. Yeni GPU satın alma kararı video ve coding iş yükleri ayrı ölçüldükten sonra verilir. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05) [GPU hesabı](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics)


### Kodlama ajanları ve çalışma döngüsü

**D02, D04, D06 · Yazılım**

#### Kod tamamlama, repo ajanı ve ajan platformu

Copilot/Tabnine gibi IDE yardımı, Claude Code/Codex/Aider gibi terminal ajanı, Cursor gibi IDE–ajan birleşimi ve OpenHands/Devin gibi görev platformu aynı satın alma kategorisi değildir. D02/D04/D06; işin bağlamı, çalıştırma yetkisi, model yönlendirme ve doğrulama katmanına göre seçim yapmayı önerir. Bir modelin benchmark skoru kullandığı ürünün bütün agent harness'ini açıklamaz.

#### Uygulama: mevcut Codex master + Claude Code worker düzeni

Master kabul kriteri ve test kanıtını tanımlar; iş parçasını dosya sahipliği, sınır ve bütçe ile worker'a verir. Worker repo keşfi → başarısız regresyon → küçük değişiklik → test → diff incelemesi sırasını izler. Master'ın kendi varsayımını worker'ın tekrar etmesi bağımsız review sayılmaz; kanıt ve itiraz alanı gerekir.

**Claude Code** kaynakta terminal, izin yönetimi, Skills, hooks, subagents ve TS/Python Agent SDK ile anlatılır. `SKILL.md` progressive disclosure ile gerekli bağlamı yükler. `PreToolUse/PostToolUse`, `SubagentStart/Stop`, `Pre/PostCompact`, `SessionEnd` gibi hook olayları deterministik kontrol noktası olabilir. Hook adı ve sürüm desteği kurulumda teyit edilir; yalnız prompt'a yazılan “yasak” erişim kontrolü değildir. Alt ajanlar ayrı bağlam/model/izinle sınırlanır; kaynakta geçen beş nested seviye evrensel ürün limiti sayılmaz.

**Codex** için D06; CLI, IDE, cloud görev, uygulama/App Server ve `codex apply <task-id>` türü yerel uygulama akışını birlikte anlatır. v0.115 / 16 Mart subagent altı paralel görev ve 10 Eylül Agents API beta tarihleri kaynak iddiası olarak korunur; mevcut ürün yeteneklerinin bağımsız doğrulaması değildir. Yerel, hosted ve self-host runner'ın secret/egress sınırları ayrıca tasarlanır.

**Cursor** kaynakta 2.0 / 29 Ekim 2025, Plan Mode, sekiz paralel worktree/background ajanı ve Ubuntu ortamıyla geçer. “Composer çoğu işi 30 saniyeden kısa yapar” pazarlama/iş yükü iddiasıdır; uzun görev ve kabul kalitesini temsil etmez. IDE içinde hızlı keşif için değerlidir; 15 sürekli ajan kapasitesi fiyat ve kota incelemesi ister.

**Aider** Tree-sitter/AST ile repo map, dosya imzaları ve bağımlılıkları seçer; SEARCH/REPLACE diff, git commit/undo, architect–editor model ayrımı ve headless kullanım sunan kaynak örneğidir. Repo map bütün dosyayı bağlama koymadan ilgili yapıyı gösterir. Yüksek muhakemeli model planlar, ucuz model uygular; doğruluğu aynı test kanıtıyla ölçülür. Kaynak lisans adlandırmaları çelişirse belirli repo/sürüm lisansı kontrol edilir.

**OpenHands** Docker sandbox ve özelleştirilebilir görev runtime'ı; **SWE-agent** agent–computer interface/harness araştırması olarak ele alınır. Cline, Roo Code, Kilo Code, Amp, Factory Droid, Warp ve Gemini CLI kaynakta alternatif olarak anılır; her birinin fiyatı ve yetkisi verilmediğinden varsayılan eşdeğerlik kurulmaz. Devin ancak mevcut sistemden farklı, ölçülebilir bir operasyon avantajı sağlarsa ayrıca denenir.

##### Ürün yaşam döngüsü ve deployment

D04, Continue için Apache-2.0 repo/IDE/CLI geçmişinin yanında 2026'da read-only ve ekibin Cursor'a katıldığı iddiasını taşır; Windsurf için Codeium marka değişimi, 2025 Cognition satın alımı ve Devin yakınsamasını vurgular. Bunlar kaynak iddialarıdır; yeni yatırımda bakım ve roadmap teyidi gerekir. Tabnine SaaS/VPC/on-prem/air-gapped seçenekleriyle IP izolasyonunda, GitLab Duo ise GitLab.com/Self-Managed/Dedicated ve kaynakta 18.1 review GA / 18.4 self-host model GA iddialarıyla mevcut platform bağlamında değerlendirilir.

#### Karar: ürün eklemekten önce tekrar eden işi seç

CRUD/DTO/serializer/API client, test fixture, dokümantasyon ve dar refactor iyi ilk adaylardır. Şema migrasyonu, auth, para/sağlık verisi veya çok servisli değişikliklerde daha güçlü kabul kapıları gerekir. Claude Max $100/$200, Cursor $20/$60/$200 ve Copilot $10/$39 kaynak fiyatlarıdır; insan aboneliği API token kotası veya kesintisiz worker lisansı değildir. Başarılı görev başına maliyet ve review kuyruğu satın alma kararına taşınır. [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### Worktree ve çoklu ajan yöneticileri

**D06 · Yazılım**

#### Çoklu ajan yöneticisi hangi problemi çözer?

D06'nın Pane / Auto-Claude / worktree bağlamında asıl ihtiyaç yeni bir kod modeli değil; iş kuyruğu, ayrı checkout, görünür durum, diff incelemesi ve birleştirme sırasıdır. **Git worktree dosya izolasyonu sağlar; güvenlik sandbox'ı sağlamaz.** Aynı kullanıcının secret'ına ve ağına erişebilen iki worktree hâlâ aynı yetki alanındadır.

#### Uygulama: 15 ajan için görev sözleşmesi

Her görev hedef, kabul kriteri, branch/worktree, dosya sahipliği, bağımlı iş, izinli komutlar, model bütçesi ve timeout taşır. Aynı veritabanı migrasyonuna veya ortak şemaya iki ajan eşzamanlı yazıyorsa worktree tek başına merge doğruluğu sağlamaz. Şema sahibi ve birleştirme sırası önceden tanımlanır.

| Kaynakta geçen yönetici | Anlatılan yaklaşım                              | İsmail'in düzeninde değerlendirme                                                                        |
| ----------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Pane / Auto-Claude      | Mevcut çoklu ajan çalışma bağlamı               | İlk karşılaştırma tabanı; çalışan akışı sırf yeni isim için değiştirme                                   |
| Conductor               | Mac üzerinde worktree, diff ve PR odaklı arayüz | Yerel paralel görevleri inceleme; sunucu ajan havuzu ayrı konu                                           |
| Vibe Kanban             | Bloop kökenli yerel görev panosu ve worktree    | D06, 10 Nisan 2026 kapanışı / Apache community ayrımını bildiriyor; ürün, repo ve fork bakımını teyit et |
| Claude Squad            | tmux/TUI, session ve worktree                   | Terminal odaklı hafif koordinasyon; izolasyonu ayrıca kur                                                |
| CodeConductor / amux    | Çoklu coding ajanı oturum yönetimi              | Log, restart, budget ve görev–branch eşleşmesini PoC'de kontrol et                                       |
| agentbox                | Hetzner/Docker üzerinden worker yaklaşımı       | Ağ, disk, token ve container yaşam döngüsü önemli                                                        |
| Sculptor                | Container tabanlı ajan çalışma alanı            | İmaj güncelleme ve çıktı aktarımı maliyeti                                                               |
| VibeTree                | Kaynakta alternatifleri derleyen repo           | Bir runtime garantisi değil; keşif indeksi                                                               |

Bir worker tamamlandığında “kod yazdı” değil, değişen dosyalar, test komut/sonuçları, kalan belirsizlikler ve diff döner. Aynı anda çok worker üretimi artırırken review darboğazını büyütebilir. Üretim concurrency'si insan onay kuyruğuna göre de sınırlandırılır.

##### Kuyruk ve güvenlik birbirinden ayrı

İş planlayıcı retries, priority ve capacity yönetir. Sandbox dar token, ayrı filesystem mount, egress allowlist ve kaynak kotası uygular. Model seçimi risk/karmaşıklığa göre değişebilir; parent modelinin her alt göreve miras kalması gereksiz maliyet yaratabilir. Düşük maliyetli worker kullanmak testleri zayıflatma yetkisi vermek anlamına gelmez.

##### Repo keşfi

D06'nın `no-fluff/awesome-vibe-coding` ve `andyrewlee/awesome-agent-orchestrators` listeleri alternatifleri keşfetmek içindir. Listeye alınmak bakım veya güvenlik onayı değildir. Her adayda son bakım, lisans, worktree temizliği, kesilen işi sürdürme, diff review ve container sınırını ayrı kontrol et. Kod deposuna yıldız vermek ile production standardı seçmek farklı kararlardır.

#### Karar: göç için ölçülebilir bir gerekçe iste

Yeni yönetici ancak context kaybı, durmuş görevler, diff inceleme süresi, çakışan dosyalar veya uzaktan worker işletimi gibi somut bir sorunu azaltıyorsa eklenir. Önce mevcut Pane düzeninde görev tamamlanma, conflict, retry ve insan review süresini ölç; alternatifle aynı görev setini karşılaştır. [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### SDD, AGENTS.md ve bağlam

**D02, D04, D06 · Yazılım**

#### Spesifikasyon, bağlam ve cache farklı sorunları çözer

Vibe coding hızlı keşif/prototip için kullanılabilir; kalıcı bir ürünün kabul ölçütlerini tek başına tanımlamaz. Spec-driven development (SDD) davranışı, durumları, izinleri ve testleri önce yazmayı amaçlar. Context engineering ise bu görevi çözecek ajana gereken bilgiyi doğru zamanda verir. Prompt caching, tekrar kullanılan sabit bağlamın hesaplama maliyetini düşürür; doğruluk veya güvenlik mekanizması değildir.

#### Uygulama: spesifikasyondan küçük ve kanıtlı değişikliğe

**Spec Kit** kaynaklarda dört artifact ile tanımlanır: `constitution.md` kalıcı ilkeler/kısıtlar, `spec.md` ne ve neden, `plan.md` teknik tasarım, `tasks.md` uygulanabilir adımlar. Tutarlılık analizi spec-plan-task arasındaki boşlukları yakalamalıdır. Kiro requirements → design → tasks; BMAD analyst/PM/architect/dev rolleri; Superpowers ve Agent Skills tekrarlanabilir uzmanlık paketleri olarak aynı alanda farklı kapsam sunar. Bunları aynı projede üst üste yığmak yerine ihtiyaç duyulan artifact ve sorumluluğu seç.

Bir PIM görevi için örnek sözleşme: child attribute'da explicit değer varsa parent'ı geçersiz kıl; yoksa parent'tan devral; public API ve DB şeması değişmesin. Önce iki davranışı da sınayan failing regression test, sonra küçük patch, ardından domain/integration/typecheck doğrulaması. Başarılı bir demo, veri modeli veya izin sınırındaki boşluğu kapatmaz.

`AGENTS.md` insanın bilip modelin bilmediği yerel kuralları taşısın: kurulum, doğrulama komutları, bounded context sınırı, migration politikası, test fixture kuralı ve “tamamlandı” kanıtı. D06, Claude Code için kanonik `AGENTS.md`'yi `CLAUDE.md` üzerinden bağlama desenini önerir; araçların destek biçimi/sürümü eşit değildir. Dosyayı kısa tut ve ilgili alt alanın ayrıntısını gerektiğinde yükle.

| Bağlam türü                | Nereye konur?             | Ne zaman yüklenir?                |
| -------------------------- | ------------------------- | --------------------------------- |
| Sabit mimari ve komutlar   | Repo talimatı / ADR       | Oturum başlangıcı ve ilgili görev |
| Domain sözlüğü             | Konu belgesi / retrieval  | PIM, HRMS veya framework görevi   |
| Güncel hata ve diff        | Görev mesajı, tool sonucu | İlgili iterasyon                  |
| Geniş wiki                 | Hybrid search + reranking | Repo dışı bilgi eksikse           |
| Tekrarlanan uzmanlık       | Skill                     | Görev eşleştiğinde                |
| Deterministik yasak/format | Hook, CI, izin katmanı    | Araç eylemi veya doğrulama kapısı |

Cache için istikrarlı prefix, tutarlı dosya sırası ve görevden bağımsız tool tanımları yararlıdır. Tarih/git status gibi değişkenleri sabit talimat bloğuna karıştırma. Ancak D02'nin “oturum boyunca kuralları asla değiştirme” ifadesini doğruluğun önüne koyma: yanlış talimatı düzeltmek cache isabetinden önemlidir. TTL, minimum token, cache yazma/okuma fiyatı ve sağlayıcı kapsamı ayrı ölçülür. “%90 tasarruf” kaynak tavan iddiasıdır; tüm faturanın %90 azalacağı anlamına gelmez.

#### Karar: daha uzun talimat her zaman daha iyi sonuç vermez

D06, `arXiv:2602.11988` için context dosyalarının ortalama %20+ inference maliyeti eklediği ve genel başarı artışı göstermediği bulgusunu aktarır; başka çalışma için 1.925 repo / 2.303 CLAUDE.md sayısını verir. Bunlar kaynak çalışmasının kapsamıyla ele alınır, bütün repo talimatlarını kaldırma gerekçesi yapılmaz. D02'nin bir mühendis/dört ajan modernizasyon örneğindeki %90 ilk kabul, 5,4 kat throughput ve yarı süre iddiaları da tek vaka üzerinden evrensel kadro dönüşümü kanıtı değildir.

MetaFramer gibi çok modüllü işlerde SDD ve architecture-aware context anlamlıdır. Tek seferlik birkaç satırlık script için bütün bir constitution/rol zinciri gereksiz olabilir. Ölçüt; eksik gereksinimden çıkan rework azalıyor mu, kritik davranış test edilebilir mi, görev başına context maliyeti kontrol altında mı? [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### MCP ve domain araçları

**D02, D04, D06 · Mimari**

#### MCP: araca bağlanma sözleşmesi, güven sınırı değil

Model Context Protocol host–client–server düzeninde araç, kaynak ve prompt yeteneklerini tanımlar. Host bir veya daha çok client bağlantısı yönetir; her client bir server bağlantısına karşılık gelir. JSON-RPC 2.0 mesajları kullanılır. D02'nin eski HTTP+SSE anlatımı güncel transport varsayımı yapılamaz; doğrulanmış 2025-06-18 sürümünde stdio ve Streamable HTTP ayrımı vardır.

#### Uygulama: üç dar entegrasyonla başla

1. **GitHub**: issue, PR, diff ve check sonuçlarını oku; yazma araçlarını görev ihtiyacına göre ayrıca aç. Merge/deploy erişimi bir doküman okuma aracıyla aynı token'a bağlanmaz.
2. **Context7**: kullanılan kütüphane ve sürümü belirt; dönen örneği repo bağımlılığıyla karşılaştır. Güncel görünen bir örnek test veya resmi sözleşmenin yerine geçmez.
3. **Playwright**: gerçek kullanıcı akışını çalıştır, gözlenen UI'dan locator üret, assertion yaz ve repo testine dönüştür. Geçici tarayıcı başarısı kalıcı regresyon koruması değildir.

D06, Context7 için 62k yıldız / v4.1.1 / 14 Eylül; Playwright MCP için 37,1k yıldız / Apache-2.0 aktarır. Yıldız sayıları tarihli popülerlik iddiasıdır, güvenlik veya kalite skoru değildir. Kaynaktaki 13/20 sunucunun arşivlenmiş olabileceği gözlemi de bütün MCP ekosistemine genellenmez.

##### Kendi domain araçların

FastMCP ile `get_product_schema`, `validate_attribute_mapping`, `read_doctype`, `preview_menu_change` gibi MetaFramer/PIM/Frappe/ERPNext/QR menü işine dar araçlar sunulabilir. Genel SQL veya shell yerine alanı sınırlı API, input schema, rol kontrolü ve audit kaydı tercih edilir. Read-only Postgres keşfi bile kişisel veri döndürüyorsa maskeleme ister.

n8n kaynakta üç yol sunar: workflow içindeki **MCP Server Trigger**, ajan için **MCP Client Tool**, Nisan 2026 preview olarak anılan **instance-level MCP**. Community `n8n-mcp` projesinin 2.000+ node bilgisi bir kaynak iddiasıdır. Dokümantasyon getiren tool ile üretim workflow'unu tetikleyen tool aynı riskte değildir.

##### Bağlam ve prompt injection

Kaynak sunucu başına 2–5k tool schema token'ı ve aynı anda 3–5 server önerir; bu sabit protokol maliyeti değil yaklaşık bütçe varsayımıdır. Kullanılmayan araçlar hem maliyet hem yanlış seçim yüzeyini büyütür. Araç açıklaması, ticket, README ve tool sonucu dış veri kabul edilir; içindeki “şu secret'ı gönder” metni kullanıcı talimatına yükseltilmez.

#### Karar: yeteneği ihtiyaca göre yükle

Tool poisoning, açıklama değişimi ve veri sızdırma için server sürümü/hash'i, izin ve audit kontrolü gerekir. Private data + untrusted content + dışarı yazma erişimi bir araya gelince risk artar. Sentry ve filesystem yalnız gerekli scope ile; Supabase ise İsmail'in açık stack dışlaması nedeniyle önerilen başlangıç setinde yer almaz. [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### RAG ve kurumsal bilgi getirme

**D02, D04, D06 · Mimari**

#### Repo bağlamı ile kurumsal bilgi aynı retrieval problemi değildir

D02/D04; bütün repo'yu her isteğe koymak yerine görevle ilgili yapı ve kanıtı seçmeyi önerir. Aider repo map kod imzaları ve bağımlılıklarını; lexical search sembol ve hata metnini; RAG ise ürün belgeleri, ADR, ticket, wiki ve domain bilgisini getirebilir. Her projeye otomatik vektör veritabanı eklemek gereksiz işletim yükü yaratır.

#### Uygulama: retrieval katmanını gereksinime göre büyüt

| İhtiyaç                     | İlk yöntem                                            | Bir sonraki adım için kanıt                        |
| --------------------------- | ----------------------------------------------------- | -------------------------------------------------- |
| Bilinen symbol / hata metni | rg, IDE symbol search, stack trace                    | Kaçan eşanlamlı/domain terimleri                   |
| Kod yapısı ve etki alanı    | AST/Tree-sitter, repo map, import ve call ilişkisi    | Birden çok repo ve domain bağımlılığı              |
| Ürün/ADR/ticket bilgisi     | İzinli doküman araması + metadata filtresi            | Lexical aramanın recall'ı yetersizse hybrid        |
| Büyük kurumsal bilgi        | Lexical + vector retrieval, reranker                  | Yanlış bağlam, gecikme ve erişim ihlali ölçümü     |
| Birkaç adımda keşif         | Agentic retrieval: soruyu böl, ara, kanıtı kontrol et | Ek tur maliyeti karşılığında görev başarısı artışı |

Dokümanları başlık ve anlamsal sınırlarda parçalara ayır; kaynak URI, sürüm/tarih, tenant ve erişim etiketi tut. Retrieval sırasında erişim filtresi uygulanır; yetkisiz veri getirildikten sonra LLM'nin sansürlemesine güvenilmez. Reranker en iyi kanıtı seçer fakat kaynağın doğru veya güncel olduğunu kendiliğinden doğrulamaz.

LlamaIndex, LangChain ve Haystack kaynaklarda bağlayıcı, retrieval ve pipeline çerçeveleri olarak geçer. D04, LlamaIndex/LangChain için MIT, Haystack için Apache-2.0 aktarır; kullanılan paket sürümünün lisansı ayrı kaydedilir. Framework seçimi kaynak bağlayıcıları, metadata filtreleri, test edilebilirlik ve gözlemlenebilirliğe göre yapılır.

##### Domain sözlüğü ve güncelleme

MetaFramer/atonota için bounded context ve ubiquitous language, PIM için attribute inheritance / explicit override, Frappe için DocType ve servis sınırı retrieval etiketlerine yansıtılır. Eski ADR iptal edildiğinde yeni kararla ilişkilendirilir; tarih filtresi olmadan çelişkili iki belgeyi eşit gerçek olarak sunma. Videoda ürün metni de aynı doğrulanmış bilgi tabanından beslenebilir.

#### Karar: retrieval kalitesini sonuçtan ayırarak ölç

Altın soru setinde doğru belgenin ilk k sonuçta bulunması, alıntı doğruluğu, eski belge kullanımı, erişim filtresi ve yanıtın kaynakla desteklenmesi ölçülür. Kod değişikliği ayrıca testlerden geçer. Cache için sabit system/policy öne, değişken görev sona konabilir; doğruluğu bozan eski bağlam sırf cache hit korumak için tutulmaz. [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### Yerel modeller ve inference

**D02, D04, D06 · Yazılım**

#### Model, ajan ve serving motoru farklı seçimlerdir

Aider/Qwen Code/OpenHands bir görevi araçlarla yürüten ajan kabuğudur; Qwen, DeepSeek, GLM veya Kimi model ailesidir; vLLM/SGLang/MLX ise modeli çalıştıran motorlardır. Model ağırlığının lisansı, repository kodunun lisansı ve API sağlayıcısının veri politikası ayrı kontrol edilir. Açık ağırlık, otomatik olarak OSI onaylı açık kaynak veya sınırsız ticari kullanım demek değildir.

#### Uygulama: model adaylarını donanıma ve göreve eşleştir

Aşağıdaki değerler **D02/D06 kaynak iddialarıdır; güncel ölçüm veya indirme garantisi değildir.** Sürümler, harness ve quantization aynı olmadan skorları sıralama gibi kullanma.

| Aday                             | Kaynaktaki özellik / sayı                                                           | Pratik rol ve sınır                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Qwen2.5-Coder 7B                 | Q4_K_M yaklaşık 4,7–5,5 GB; 8 GB sınıfı kart; 40–50 token/sn iddiası                | Completion, küçük script; uzun context ve eşzamanlılık için ek bellek                                    |
| Qwen2.5-Coder 14B                | Q5_K_M 10,7–12,5 GB; Q8_0 14,7–16,5 GB                                              | Orta ölçekli yerel kodlama. D02'nin Q8'i “kayıpsız” sayması doğru bir varsayım değildir                  |
| Qwen2.5-Coder 32B                | Q4_K_M 19,6–22 GB; 24 GB GPU sınıfı                                                 | Çok dosyalı işler için aday; ağırlık sığsa bile KV cache bütçesi sınırlı                                 |
| DeepSeek-R1 / distill            | Ana model 671B; D02 yaklaşık 400+ GB verir. Distill-Qwen-32B için Q4/24 GB sınıfı   | Tam R1 ile damıtılmış 32B modelin kapasite ve davranışını karıştırma                                     |
| Qwen3-Coder-Next                 | D06: 80B toplam / 3B aktif, 512 expert / 10 seçili, 256K–1M context, yaklaşık 46 GB | MoE hesap yükünü azaltır; bütün gerekli expert ağırlıkları yine depolanır                                |
| Qwen3.6-27B                      | D06: SWE-bench %77,2 ve Mac'te yaklaşık 30 token/sn                                 | Tarihli kaynak adayı; gerçek artifact, lisans ve aynı görevlerde başarı teyit edilmeli                   |
| DeepSeek V4 Pro / Flash          | D06: MIT, Pro %80,6; Flash 284B-A13B ve 2-bit Mac'te yaklaşık 39 token/sn           | Vendor/community iddiaları. 2-bit kalite kaybı ve offload gecikmesi ayrıca ölçülür                       |
| GLM-5.2 / GLM-5.3                | D06: 744B toplam / 40B aktif, 1M context, Terminal-Bench 2.1 81,0                   | 40B aktif demek 40B ağırlık değildir. 744B × 4-bit ≈ 372 GB; tek 96 GB kart önerisi bu varsayımla tutmaz |
| Kimi K3                          | D06: yaklaşık 2,8T parametre, Vals %93,4, Frontend Arena liderlik iddiası           | Cluster ölçeği; tek GEX131 veya Mac için self-host adayı diye sunulamaz                                  |
| Mistral Devstral, gpt-oss, Llama | D06 alternatif aileler olarak anıyor                                                | Kesin sürüm/lisans/VRAM verilmediği için kıyas verisi eksik                                              |
| StarCoder2 / CodeGen             | D04: OpenRAIL-M / Apache-2.0; araştırma ve fine-tuning çizgisi                      | Tarihsel temel; doğrudan güncel en iyi repo ajanı oldukları sonucu çıkmaz                                |

Serving seçimini küçük bir görev setiyle yap: aynı model/quantization, aynı system prompt, aynı 1/4/8/15 oturum yükü. İlk token süresi, kullanıcı başına decode hızı, p95 kuyruk, test başarı oranı ve bellek tepesini kaydet. D06'nın vLLM için H100'de 12.500 token/sn ve SGLang için %29 avantaj rakamları model/batch/iş yükü olmadan kendi SLA'na aktarılamaz.

- **vLLM:** batching, PagedAttention ve geniş uyumluluk; GPU'da yüksek toplam throughput deneyi.
- **SGLang:** RadixAttention/prefix reuse; aynı talimatlarla tekrarlayan ajan istekleri için karşılaştırma adayı.
- **TensorRT-LLM:** NVIDIA optimizasyonu; derleme ve sürüm bakım maliyeti daha yüksek olabilir.
- **llama.cpp / Ollama / LM Studio:** GGUF ve yerel kullanım ergonomisi; kolay kurulum, üretim kapasitesi garantisi değil.
- **MLX:** Apple Silicon birleşik belleği için yerel motor; D06'daki Ollama 0.19 MLX ve 58→112 decode / 1.154→1.810 prefill değerleri kaynak ölçümüdür.

##### Model framework’ü ve ajan runtime’ı

Hugging Face Transformers, D04'te Apache-2.0 framework olarak PyTorch tabanlı model yükleme, inference ve fine-tuning katmanıdır. StarCoder/CodeGen gibi modelleri araştırmak veya özel veriyle uyarlamak için kullanılabilir; issue okuyup test çalıştıran coding ajanının yerine geçmez. TGI gibi serving yolları ayrıca değerlendirilir. Dataset izni, model ağırlığı lisansı ve eğitim maliyeti framework lisansından bağımsızdır.

#### Karar: önce sığma, sonra kalite, sonra ekonomi

Alt bellek sınırı yaklaşık `parametre sayısı × bit / 8` ile başlar; quantization metadata'sı, activation, runtime ve KV cache buna eklenir. Sabit mimari/batch için KV cache bağlam uzunluğu ile yaklaşık doğrusal büyür; D02'nin “logaritmik” ifadesi kapasite hesabına alınmamalı. CPU offload sığmayı mümkün kılabilir ama aynı hızda çalışmayı garanti etmez.

D06'nın M5 Max için 40-core GPU, 128 GB ve 600–614 GB/sn; Qwen3.5-35B-A3B için 112 token/sn sayıları donanım/benchmark iddiası olarak korunur. Kendi 30 günlük repo görevlerinde doğru patch oranı ve insan düzeltme süresi kabul edilmeden satın alma kararı verilmez. Model adı, toplam/aktif parametre, quantization, context ve test harness'i birlikte raporlanır. [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### API, M5 Max ve Hetzner ekonomisi

**D06 · Ekonomi**

#### Fiyatı sakla; hesabın varsayımını da görünür yap

D06'nın **GEX131 €889/ay** fiyatı, **€1.199/ay + €599 setup** alternatif listesi ve **€1,4247/saat** rakamı birbirine eşit teklifler değildir. Rapor tarihi, vergi, ülke, yapılandırma, kurulum ve dönem farklı olabilir. Burada kaynak rakamları korunur; canlı configurator teklifi gibi sunulmaz. D06 GEX44'ü RTX 4000 SFF Ada 20 GB / €184–234; GEX131'i RTX PRO 6000 Blackwell Max-Q 96 GB, Xeon Gold 5412U 24 core / 256 GB DDR5 olarak tanımlar. Güncel satın alma öncesinde donanım ve fiyat ayrıca teyit edilmelidir.

#### Uygulama: API ile GPU'yu aynı iş yükünde karşılaştır

1. 30 gün boyunca girdi token'ı, çıktı token'ı, cache-hit token'ı, saatlik eşzamanlılık, p95 bekleme ve kabul edilen görev sayısını kaydet. 15 açık ajan oturumu 15 aktif decode akışı demek değildir.
2. API maliyetini `(uncached input × input rate + cached input × cache rate + output × output rate) / 1M` ile hesapla. Tool, arama, depolama ve gateway ücretlerini ekle. İnput/output oranı bilinmiyorsa tek token fiyatı kullanma.
3. GPU aylık toplamına kira, setup amortismanı, disk/egress, elektrik (varsa), bakım saatleri, yedek kapasite ve başarısız iş maliyetini koy. Dövizleri aynı gün ve aynı para birimine çevir.
4. Aynı repo görevlerinde kaliteyi eşitle: ucuz model iki kat deneme veya daha fazla insan düzeltmesi istiyorsa ham token maliyeti kazanç değildir.
5. Bir hafta boyunca 1/4/8/15 gerçek eşzamanlı yükle kuyruk ve gecikmeyi ölç. Ağırlık + KV cache sığmadan maliyet karşılaştırması geçersizdir.

##### Kaynaktaki break-even hesabının denetimi

D06, 100 token/sn kart için yaklaşık 259M token/ay ve “150M token/ay + %40 kullanımda self-host kazanır” eşiğini aktarır. **100 × 60 × 60 × 24 × 30 = 259,2M** yalnız yüzde 100 kesintisiz çıktıda geçerlidir; yüzde 40 kullanım **103,68M** eder. Bu bir hesap düzeltmesidir, gerçek GPU benchmark'ı değildir.

Kaynak ayrıca en ucuz açık model API'sini $0,14–0,28/M verir. **150M × $0,28/M = $42**; bu, €889 kirayı bile otomatik karşılamaz. $0,14/M'de $21 olur. İki rakamın aynı anda “self-host kesin daha ucuz” sonucu vermesi mümkün değildir; token türü, kalite eşdeğerliği, kur ve toplam iş yükü eksiktir. D06'nın 120–180M ucuz API eşiği ve 15–25M flagship eşiği bu nedenle **doğrulanmamış kaynak senaryosu** olarak tutulur. İkinci eşik ancak kullanılan gerçek input/output karışımıyla yeniden hesaplanabilir.

Saatlik €1,4247 × 720 saat = **€1.025,784/30 gün**. D06'nın yaklaşık €1.026 hesabı tutarlıdır; ayın gün sayısı, cap ve sözleşme şartı ayrı değişkendir.

#### Karar: abonelik, API ve self-host üç ayrı ürün

**Claude Max $100 / $200** bireysel erişim planı kaynak iddiasıdır; sınırsız 15-ajan API bütçesi değildir. D06 ChatGPT Plus $20, Pro $100/$200 ve Business yaklaşık $25/kişi aktarır. UI aboneliğinin API kredisi, rate limit'i veya otomasyon hakkı ayrıca kontrol edilir. “Geliştirici başına $100–200” gözlemi çoklu ajanların sürekli tüketimini ölçmez.

OpenRouter tek key/bakiye ve provider failover kolaylığı sunan gateway olarak değerlendirilir. Kaynaktaki 500+ model, %5,5 kredi alım ücreti, BYOK için $25.000'e kadar ücretsiz / sonra %5 rakamları kaynak tarihlidir. Ucuz görevi uygun modele taşımak tasarruf sağlayabilir; gateway kullanmak tek başına indirim değildir. Hassas veri için yönlendirilen gerçek provider'ın retention ve training koşulları izlenir.

İsmail için karar sırası: mevcut API kullanımını ölç → M5 Max'te tek kullanıcılı local kalite testi → GEX131 sınıfında sınırlı serving deneyi → gerçek kabul edilen görev maliyetiyle karar. GLM-5.2 gibi çok büyük toplam ağırlığı 96 GB karta sığıyor varsayma. [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### TDD, AI review ve otomatik onarım

**D02, D04, D06 · Yazılım**

#### Test üretimi, PR review ve otomatik onarımın sorumlulukları

Test runner çalıştırılabilir davranışı sınar; review aracı diff'teki şüpheli noktaları bulur; SAST/SCA scanner güvenlik/bağımlılık bulgusu üretir. Birinin varlığı diğerini gereksiz kılmaz. “Self-healing” bazen yalnız teşhis, bazen patch önerisi, bazen PR açma demektir; ürün adı yerine hangi aktörün hangi dosyayı değiştirebildiğini yaz.

#### Uygulama: failing test → patch → bağımsız kontrol

1. Gereksinimin bug öncesi/sonrası davranışını ve sınır koşulunu yaz. Regression test doğru nedenle kırmızı olmalı; derlenmeyen test tek başına davranış kanıtı değildir.
2. Ajan minimum patch'i uygulasın. Assertion silme, skip ekleme, snapshot'ı gerekçesiz yenileme veya izin kontrolünü gevşetme ayrı review gerektirsin. Test weakening böyle yakalanır.
3. Formatter/lint/typecheck ardından unit, integration ve riskli akışlarda Playwright çalışsın. Coverage kadar mutation score ve yanlış pozitif testler değerlendirilsin.
4. CodeQL/Semgrep finding → SARIF/data-flow + ilgili kod → AI düzeltme → scanner ve test tekrar çalıştırma. LLM'nin “güvenli” demesi scanner sonucunun yerini almaz.
5. PR'da root cause, değişen davranış, çalıştırılan komutlar ve kalan risk yer alsın. İnsan merge kararı; production operasyonu ayrı kapı.

| Araç / sınıf                   | Ne üretir?                                         | Nerede faydalı?                                            | Kontrol edilmesi gereken                                                                                |
| ------------------------------ | -------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Playwright / MCP               | Akış keşfi; commit edilmiş testte kalıcı assertion | React/Vite mobil sipariş, listeleme, form ve izin akışları | MCP oturumu tek başına regression testi değildir; locator ve beklenen davranış review edilir            |
| Diffblue Cover                 | Java unit test üretimi/bakımı                      | Büyük legacy Java modülleri                                | FastAPI/React'e doğrudan eşdeğer değil; üretilen testin semantiği ve ortam desteği                      |
| Qodo / Qodo Cover / Merge      | Kurallar, PR inceleme, test üretimi                | Çok repo, ticket uyumu ve test açığı                       | D02'nin %60,1 F1 iddiasının benchmark bağlamı                                                           |
| CodeRabbit                     | Diff ve bağlam üzerinde inceleme/öneri             | İnsan review kuyruğunu azaltma                             | D06 %49,2 precision; planlara göre $24/$48/$72/kişi-ay kaynak iddiası; gürültü kendi PR'larında ölçülür |
| Greptile                       | Codebase indeksleme ve cross-file inceleme         | Bağlantılı monorepo/servis etkileri                        | Kaynaktaki %82 recall kendi benchmark'ı; yanlış pozitif ve indeks gizliliği                             |
| Copilot Review / GitLab Duo    | Platform içi review ve sonraki ajan işi            | Mevcut GitHub/GitLab ekibi                                 | Lisans kapsamı, çağrılan araçlar, insan sorumluluğu                                                     |
| Cursor Bugbot                  | PR incelemesi                                      | Cursor kullanan ekip                                       | D06'nın ~90 sn ve $1–1,50/review rakamı kaynak iddiası                                                  |
| SonarQube                      | Kalite kapısı, duplication, teknik borç            | Kurumsal sürdürülebilirlik                                 | Test veya bütün güvenlik açıklıklarını kapatma garantisi değil                                          |
| DeepSource / Snyk / Dependabot | Statik kalite, bağımlılık bulgusu ve güncelleme    | CVE ve migration bakım kuyruğu                             | AI önerisinden sonra deterministik doğrulama                                                            |

D06'nın “review araçlarının hepsi kodu okur, asla çalıştırmaz” genellemesi kendi Copilot/CodeQL anlatımıyla da gerilimlidir. Doğru ayrım, belirli ürün/sürümün yürütme yetenekleri ile **bizim CI davranış kanıtımızın** ayrı olmasıdır. Review başarısını runtime testi yerine sayma.

#### Karar: ikinci review botunu ancak ek değer gösterirse al

Başlangıçta bir AI review katmanı kullan. Eşdeğer PR'larda bulunan gerçek hata, yanlış alarm, yorum başına düzeltme oranı ve reviewer dakikasını ölç. Yüksek recall aracı daha çok bulgu getirip insanı yorsa net kazanç düşebilir. CodeRabbit'in repo/müşteri/ARR sayıları ya da DeepSource'un %84,51 F1'i farklı ölçümleri anlatır; aynı leaderboard sütunu değildir.

İsmail'in 15 ajan hedefinde temel darboğaz PR üretme sayısından çok kabul edilebilir değişiklik ve review kapasitesidir. Ayrı worker işini ayrı kabul kriteriyle sınar; kritik auth/ödeme/migration işinde bir modelin kendi çıktısına verdiği onayla yetinilmez. [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### Benchmark ve gerçek üretkenlik

**D02, D04, D06 · Ekonomi**

#### Üretkenlik iddiasının paydası görünür olmalı

METR, DORA, GitClear, SWE-bench ve vendor review kıyasları farklı soruları yanıtlar. Bir benchmark skorunu geliştirici saatine, kullanıcı algısını teslimat hızına, churn korelasyonunu tek başına nedenselliğe çevirmek yanlış karar üretir. Kaynak rakamları saklanır; örneklem, tarih, harness ve ölçüm türü yanlarında yer alır.

#### Uygulama: veri tablosundan kontrollü pilota

| Kaynak iddiası             | Ne söylüyor?                                                                                                    | Ne söylemiyor?                                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| METR 2025                  | 16 deneyimli OSS geliştirici, 246 görev; AI ile %19 daha uzun süre; katılımcılarda yaklaşık %20 hızlanma algısı | Yeni repo, yeni model ve bütün görevlerde aynı etki                                                             |
| METR 2026                  | D04 %4–20 hızlanma yönünde ham sinyal aktarıyor                                                                 | Seçim etkileri nedeniyle güvenilir genel etki büyüklüğü değil; mevcut V07 düzeltmesi korunur                    |
| GitClear                   | D02: 600M+ satır, churn %84 artış; refactoring %25'ten %10 altına; copy/paste'ın moved code'u geçmesi           | AI'ın tek başına nedensel etkisi veya her repo için aynı oran; bu revizyonda %84 rakamı bağımsız teyit edilmedi |
| DORA 2025                  | D02 %90 kullanım aktarır; ortak bulgu AI'ın sistemin güçlü/zayıf taraflarını büyütmesi                          | Her ekibin throughput ve stability'sinin aynı yönde değişmesi                                                   |
| Copilot / saha çalışmaları | D04 review'da yaklaşık %15; docs/completion'da %50'ye, tekrarlı işlerde %30–40'a kadar kazanım aktarır          | Bağımsız, aynı görev dağılımında garanti edilmiş net kazanç                                                     |
| SDD vaka çalışması         | D02: bir mühendis/dört ajan, %90 ilk kabul, 5,4× throughput, yarı takvim                                        | Dört kişilik her ekibin tek kişiye indirilebileceği                                                             |

GitClear'ın [güncel metodoloji açıklaması](https://gitkraken.gitclear.com/industry_stats/ai_code_quality_signal_graphs), churn'ü iki hafta içinde yeniden yazılan/silinen authored satır payı olarak tanımlar. Bu gösterge rework için bir vekildir; benchmark accuracy ile aynı kavram değildir.

##### SWE-bench ve diğer ölçümler

D04 özgün SWE-bench için 12 Python repo / 2.294 issue; D02 Verified için insan kontrolünden geçmiş 500 problem, Pro için 41 repo / 1.865 görev aktarır. Verified, Pro, Terminal-Bench ve Frontend Arena birbirinin yerine geçmez. D02'deki “contamination imkânsız” ifadesi mutlak güvence olarak kullanılamaz.

D02/D06'daki sayılar görünür kalsın: Claude Opus 5 %96–97, GPT-5.6 Sol %96,2, Claude Fable 5/Mythos %93,9–95, Qwen 3.8 Max %67,7–77,3, Qwen2.5-Coder 32B yaklaşık %27–33; Pro için Muse Spark 1.1 %61,5 ve farklı vendor harness'inde Fable %80. D06 açık model tarafında DeepSeek V4 %80,6, Qwen3-Coder-Next %70,6, Qwen3.6-27B %77,2, Kimi K3 %93,4 ve GLM Terminal-Bench 81,0 aktarıyor. **Bu yeni sürüm, bu model adlarını veya skorları bağımsız güncel leaderboard doğrulaması saymaz.** Kaynaktaki farklı harness'ler tek sıralamaya birleştirilmez.

#### Karar: kendi ürünlerinde net faydayı ölç

2–4 hafta baseline, ardından benzer görevlerle 5–10 geliştirici/az sayıda repo pilotu D04'ün önerisidir. İşleri complexity, domain familiarity ve task türüne göre ayır. Time-to-first-PR, time-to-merge, PR cycle time, review latency/rounds, diff büyüklüğü, CI failure, mutation/coverage, escaped defects, change failure, recovery/MTTR, security remediation ve developer satisfaction birlikte izlenir.

Finansal çıktı **kabul edilen görev veya merge edilen PR başına toplam maliyet** olmalı. 25 kişi × ayda 2 saat net kazanç = 50 saat senaryosu, lisansın teorik geri dönüşünü sınar; kodlama 5 saat kısalıp review 6 saat uzarsa negatif net sonuç vardır. AI-generated LOC ve kabul edilen öneri oranı adoption göstergesidir, tek başına başarı KPI'sı değildir. [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### FastAPI, React ve geliştirici araçları

**D04, D06 · Yazılım**

#### Ajanın geliştirici arayüzü: komut, şema ve test

Ajanın daha iyi çalışması için framework'ü değiştirmekten önce deterministik komutları ve domain sözleşmesini görünür yap. D04/D06'nın agent-native yaklaşımı; scaffold, metadata/DSL, şema, migration ve test harness üzerinden güvenilir küçük işlemler sunar. UI tıklamalarıyla yapılabilen bir işin CLI/API karşılığı geliştirici deneyimini de iyileştirir.

#### Uygulama: İsmail'in stack'ine uygun araç zinciri

| Alan                    | Düzen                                                        | Kabul kanıtı                                                                  |
| ----------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Python / FastAPI        | uv ortamı; Ruff lint + format; seçilmiş type checker; pytest | Lock dosyası, temiz lint, tip ve davranış testleri                            |
| Tip denetimi            | mypy, ty veya Pyrefly karşılaştırması                        | SQLAlchemy/Pydantic plugin davranışı ve mevcut hata seti; hız tek karar değil |
| React / Vite / TanStack | TypeScript, Query/Table/Router; tutarlı format/lint          | Query key/schema sınırları, erişilebilir component ve route testleri          |
| UI geliştirme           | Storybook bileşen senaryosu + Playwright kullanıcı akışı     | Mobil etkileşim, focus, hata/boş/loading durumları                            |
| Veritabanı              | SQLModel / PostgreSQL / Alembic                              | Migration ileri/geri davranışı, veri korunumu ve ayrı test DB                 |
| Operasyon               | Docker Compose + GitHub Actions                              | Aynı komutların yerel ve CI'da çalışması; test artifact'ları                  |

**Ruff** lint ve format yapar; type checker değildir. D06'nın 10–100× hız ifadesi iş yüküne bağlı kaynak iddiasıdır. **ty** beta ve **Pyrefly** Rust yaklaşımı; kaynakta Django için 578 ms ile 16 sn karşılaştırması anılır. Bu tek ölçüm plugin uyumluluğunu veya kendi kodunun semantik doğruluğunu kanıtlamaz. Pydantic v1 / SQLAlchemy mypy plugin kullanan projelerde doğrudan kaldırma kararı verilmez.

TypeScript tarafında **Biome**, **oxlint** ve **Prettier** rollerini ayır: oxlint linter'dır; formatter diye sunulmaz. Aynı dosyayı farklı stil kurallarıyla biçimlendiren iki formatter çalıştırma. EditorConfig, açık package scripts, pre-commit'te hızlı deterministik kontroller ve CI kapıları onboarding'i kolaylaştırır. Her tuş vuruşunda ücretli LLM incelemesi çalıştırmak gerekli değildir.

##### Tasarımdan koda

Figma MCP / Framelink tasarım bilgisini, component ve token bağlamını taşır. Çıktı varsayılan React/Tailwind olsa bile bu üretim kodu kalite garantisi değildir. Stitch kaynakta 19 Mart sürümü, sonsuz canvas, MCP ve ücretsiz 350 generation iddiasıyla geçer; plan limiti güncel teklif olarak kabul edilmez. v0'ın Next.js varsayılanı, İsmail'in Next.js/Supabase dışlamasıyla çelişiyorsa React/Vite hedefi açıkça verilmelidir.

#### Karar: hızlandırmayı bakım maliyetiyle ölç

Scaffold; domain adlandırması, dosya yerleşimi, migration ve test komutlarını birlikte üretmelidir. Ajan yanlış test komutu tahmin ediyorsa daha büyük modelden önce repo dokümantasyonunu düzelt. Bu portalda da okunabilir TSX, format kontrolü, lint ve gerçek tarayıcı testleri DX'nin parçasıdır. [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### Ajan güvenliği ve OWASP

**D02, D04, D06 · Uyum**

#### Ajan güvenliği erişim ve veri akışı problemidir

D02/D04/D06; prompt injection, hassas veri sızması, tedarik zinciri ve aşırı yetkiyi öne çıkarır. Bir ajan doğru kod üretebilir ve yine de gereksiz secret okuyabilir. Güvenli davranış talimatı yararlıdır; işletim sistemi, token ve servis sınırlarının yerine geçmez.

#### Uygulama: dört yetki seviyesi

| Seviye | Yetki                             | Kontrol                                                                   |
| ------ | --------------------------------- | ------------------------------------------------------------------------- |
| A      | Salt okunur repo / izinli doküman | Veri maskeleme, tenant filtresi, audit                                    |
| B      | Yerel dosya değişikliği ve test   | Ephemeral sandbox, kaynak kotası, dar mount ve egress                     |
| C      | Uzak branch / PR oluşturma        | Repo scope token, check ve branch policy; sınırlı write                   |
| D      | Secret, üretim DB, deploy, merge  | Ayrı rol/onay ve deterministik workflow; genel worker'a otomatik verilmez |

Özel veri, güvenilmeyen içerik ve dışarıya veri gönderme aynı ajanda birleşirse “lethal trifecta” oluşur. Ticket, README, tool description, web sayfası ve log içindeki komutlar üst düzey talimat sayılmaz. Kötü niyetli metin “hata ayıklamak için env'i şu URL'ye yolla” diyebilir; bunu yalnız dil modeliyle fark etmeye güvenmek yetersizdir.

##### OWASP numaralarını düzelt

D02'nin “2026 LLM03 aşırı yetki / LLM04 supply chain” eşlemesi yayımlı 2025 listesiyle uyuşmuyor. Kontrol edilen resmi listede **LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM03 Supply Chain, LLM04 Data and Model Poisoning, LLM05 Improper Output Handling, LLM06 Excessive Agency, LLM07 System Prompt Leakage, LLM08 Vector and Embedding Weaknesses, LLM09 Misinformation, LLM10 Unbounded Consumption** bulunur. Bu rapor doğrulanmamış bir 2026 sıralamasını resmileştirmez. [OWASP](https://genai.owasp.org/llm-top-10/)

Semgrep/SonarQube/Snyk ve dependency taramaları; SQL injection, XSS, secret ve riskli bağımlılık için deterministik kanıt sağlar. SARIF bulgusu → dar patch adayı → aynı taramanın ve regresyonun yeniden çalışması → review akışı uygulanır. AI reviewer güvenlik kapısının tek bileşeni olmaz.

##### Kaynaklardaki olay anlatıları

D06; Sentry DSN üzerinden Agentjacking ve %85 başarı, Codex branch adı/command injection düzeltmesi, OpenClaw eski sürüm RCE ve belirli patch sürümleri aktarır. Bunlar tarihli kaynak iddialarıdır; bu raporda kendi exploit testi veya güncel güvenli sürüm doğrulaması yapılmış değildir. Eski “en az şu sürümü kur” sayısını bugünün güvenli sürüm garantisi yapmak yerine kullanılan sürümün resmi advisory'si ve güncelleme politikası kontrol edilir.

#### Karar: regresyon testinin zayıflatılmasını da incele

Ajan testleri silerek veya assertion'ı gevşeterek yeşil sonucu sağlayabilir. Diff review; yalnız ürün kodunu değil test değişikliklerini, izin genişlemesini, ağ hedefini, migration ve yeni bağımlılığı da kapsar. HRMS/İBYS gibi alanlarda gerçek kişisel veriyi prompt'a taşımadan sentetik fixture ve maskeli telemetry kullan. [D02](https://karacaismail.github.io/futuristic/#/sources?doc=D02) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### KVKK, ses rızası ve RTÜK

**D03, D04, D05, D06 · Uyum**

#### KVKK, RTÜK ve ses/yüz hakkı üretim akışının parçasıdır

D04'ün HRMS/İBYS kişisel veri bölümü ile D05'in Türkiye yayıncılık bölümü önceki sentezde kaybolmuştu. Bunlar ayrı bir yerel karar katmanıdır. **KVKK** açısından kod, log, ses kaydı, çalışan fixture'ı ve müşteri görüntüsü sadece teknik girdi sayılmaz. **RTÜK**'ün izleme kapasitesine ilişkin bir açıklama da tek başına her sosyal medya hesabına yeni bir lisans yükümlülüğü doğduğunu kanıtlamaz.

17 Eylül 2026 kontrolünde KVKK'nın [üretken AI rehberi](https://www.kvkk.gov.tr/Icerik/8547/uretken-yapay-zeka-ve-kisisel-verilerin-korunmasi-rehberi-15-soruda), AI yaşam döngüsündeki kişisel veri işlemesini 6698 sayılı Kanun çerçevesinde ele alıyor. Kurumun [iş yeri kullanımı](https://www.kvkk.gov.tr/Icerik/8674/is-yerlerinde-uretken-yapay-zeka-araclarinin-kullanimi) ve [Agentic AI](https://www.kvkk.gov.tr/Icerik/8683/etken-yapay-zeka-agentic-ai) belgeleri de kurumsal kullanım ve otonom eylemlerin veri boyutuna odaklanıyor. Bunlar uygulamaya özel hukuki değerlendirmenin yerine geçen otomatik izinler değildir.

#### Uygulama: veri ve hak kaydını iş kimliğine bağla

| Kontrol noktası      | Video hattında                                     | Yazılım hattında                                        | Saklanacak kanıt                                              |
| -------------------- | -------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------- |
| Veri envanteri       | Yüz, ses, müşteri görseli, yayın kimliği           | Personel kaydı, sağlık/İSG verisi, log, kod, secret     | Veri kategorisi, işleme amacı ve sorumlu                      |
| Hukuki değerlendirme | Ses klonlama, avatar, telif, reklam claim'i        | Test fixture'ları, telemetry, HRMS/İBYS bağlamı         | Uygun hukuki dayanak ve gerektiğinde rıza/izin kaydı          |
| Minimizasyon         | Sahne için gerekmeyen kişisel ayrıntıyı çıkar      | Sentetik fixture, maskelenmiş trace, secret redaksiyonu | Gönderilen veri sınıfı ve redaksiyon sonucu                   |
| Yurt dışı aktarım    | TTS/video/avatar sağlayıcısı ve alt işleyenleri    | Bulut LLM, gateway, MCP, hata izleme servisi            | Ülke, sözleşme, retention/training ve aktarım değerlendirmesi |
| Saklama/silme        | Ham ses, ara video, master ve onay kaydı ayrı süre | Prompt log'u, agent trace'i, dump ve test çıktısı       | Lifecycle ve erişim/silme kaydı                               |
| Yayın onayı          | Onaylı sürüm hash'i ve AI açıklaması               | PR/merge ve deploy yetkisi                              | Kim, hangi sürümü, ne zaman onayladı?                         |

Rıza gereken işlemde kayıt kapsamı açık olmalı: hangi ses/yüz, hangi amaç ve platformlar, hangi kullanım süresi. “Sağlayıcı ses klonlayabiliyor” ile “bu sesi kullanmaya yetkim var” ayrı sorulardır. Rızanın her işlem için tek mümkün hukuki dayanak olduğunu varsayma; HRMS ve özel nitelikli verilerde değerlendirmeyi uzmanlaştır.

##### RTÜK iddiasının sınırı

D05, 2026'da yapay zekâ ile dijital yayın izleme, anahtar kelime/nefret söylemi/telif taraması ve uzman değerlendirmesi planını; ayrıca sosyal medya lisans/denetim sinyalini aktarıyor. Bu birleşik iddianın bütçe sunumundaki tam kapsamı bu revizyonda bağımsız doğrulanmadı. Bulunan [27 Ocak 2026 RTÜK açıklaması](https://www.rtuk.gov.tr/rtuk-radyo-dinleyici-olcumlerini-elektronik-sisteme-tasiyor/5137), radyo dinleyici ölçümünün elektronik sisteme taşınması ve AI analizini anlatıyor. **Radyo ölçüm duyurusu, bütün YouTube/Instagram hesapları için genel lisans zorunluluğu kanıtı değildir.** Kaynaktaki iddia görünür tutulur; olası yaptırım listesi her içeriğe otomatik uygulanmaz.

#### Karar: ülke, aktör ve yayın türüne göre kontrol

Türkiye'deki veri koruma ve yayıncılık değerlendirmesi, AB AI Act şeffaflığı ve platform disclosure alanlarından ayrı izlenir. Hedef pazar AB ise sağlayıcı/deployer rolü ve Article 50 kapsamı ayrıca incelenir. Tek bir “uyumludur” kutusu yerine veri/hak/sözleşme/yayın onayı kapıları kullan. Ticari kullanımda belirsiz kalan dayanak, ses izni veya yayın kapsamı final onaydan önce çözülür. [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05)


### Gözlemlenebilirlik ve operasyon

**D03, D04, D06 · Mimari**

#### Gözlemlenebilirlik: öneriden sonuca kadar aynı iş kimliği

D03/D04/D06 hem video hem coding hattında job/task ID, maliyet, hata ve insan müdahalesini izlemeyi gerektirir. Çok log toplamak yeterli değildir; script, scene, render, approval, post veya issue, commit, CI ve incident birbirine bağlanmalıdır.

#### Uygulama: iki hattın ortak telemetry sözleşmesi

| Ölçüm    | Video                                                      | Yazılım                                                        |
| -------- | ---------------------------------------------------------- | -------------------------------------------------------------- |
| Süre     | Queue, üretim, render, onay, yayın p50/p95                 | Keşif, coding, test, review ve merge bekleme                   |
| Başarı   | Request success, QC kabul, insan ret ve platform son durum | Görev kabulü, test başarısı, revert ve kaçan hata              |
| Maliyet  | Denemeler dahil kabul edilen saniye/video                  | Cache dahil token, runner ve insan review / kabul edilen görev |
| Veri izi | Model/prompt/asset/render/onay hash'i                      | Model/task/worktree/commit/check ilişkisi                      |
| Alarm    | 429, stuck job, token expiry, maliyet sıçraması, storage   | CI tekrarları, yetki ihlali, failed deploy, review kuyruğu     |

Sentry Seer; hata, log, trace, release ve commit bağlamından kök neden hipotezi ve patch adayı çıkaran akış olarak ele alınır. Hipotez doğrulanmadan üretim değişmez: incident → kanıt → yerel reprodüksiyon → regresyon → branch/PR → review. Datadog Bits mevcut Datadog telemetry'siyle benzer araştırma işine yardımcı olabilir. Yeni AI özelliği için çalışan observability altyapısını sebepsiz taşımak gerekmez.

Grafana/Loki metrik ve log için, Snyk/DeepSource güvenlik/kalite için kaynakta anılır. D06'daki DeepSource F1 %84,51 iddiası ölçüm kümesi ve hata sınıfları bilinmeden araçlar arası üstünlük kanıtı değildir. Provider token kullanımını kendi `cost_events` kaydıyla mutabık tut; API cevabındaki tahmini ücret ile fatura farklı olabilir.

##### OpenClaw + n8n için üç somut akış

1. **PR triage:** GitHub webhook → n8n doğrulama → OpenClaw özet/öncelik önerisi → yetkili kanala bildirim → insan review. Kaynakta önerilen politika otomatik merge değildir.
2. **CI hatası:** Başarısız check → maskelenmiş log → hata sınıfı → worker ayrı worktree'de reprodüksiyon/test/fix → PR. Tekrarlayan CI retry, kaynak sorunu ile kod hatasını ayırır.
3. **Refactor görevi:** Onaylı backlog → n8n task kaydı → ajan bütçe ve kapsamla çalışır → test kanıtı → diff inceleme → deterministik deploy fonksiyonu. Ajanın kendi testini geçti demesi deployment izni değildir.

OpenClaw kaynakta HTTP/WebSocket Gateway, queue, Exec Approval Manager, ReAct, Skills/ClawHub, heartbeat, memory ve `SOUL.md` ile anlatılır. TS/Node/Bun ve MIT iddiaları belirli repo/sürüm içindir. 50+ kanal, 250.829 GitHub yıldızı (3 Mart), React 243k/Linux 218k karşılaştırmaları popülerlik kaydıdır; güvenlik sınırlarını kaldırma gerekçesi değildir.

##### Delegasyon ve skill keşfi

`freddy-schuetz/n8n-claw`, kaynakta n8n içinde OpenClaw benzeri ajan ve OpenClaw'a delegasyon skill'i olarak anlatılır. Task ID ve kabul kriterini n8n'de sakla, delegasyonu dar araca ver, sonucu aynı işe bağla; ikinci kez tetikleme ve timeout kontrolünü koru. `SamurAIGPT/awesome-openclaw` skill/tutorial keşfi sunar; indirilen her skill'in komutları ve yetkisi ayrı incelenir.

#### Karar: önce ölçümün kendisini güvenilir yap

Log'larda token, ses/görüntü rıza belgesi ve personel verisi taşınmaz. Retention ve erişim politikası tanımlanır. Aynı görevin retry'ları farklı başarı sayılmamalı; başarısız/iptal edilen işler denominator'dan çıkarılmamalı. Bir ay gerçek trafik olmadan 15 ajan veya GPU tasarrufu hakkında kesin ROI ilan edilmez. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)


### Pilot, takvim ve yatırım planı

**D03, D04, D05, D06 · Kişisel bağlam**

#### İki yatırım hattını aynı anda büyütme

Kaynakların zaman çizelgeleri birer plan önerisidir; teslimat taahhüdü değildir. Video hattında platform uygulama incelemesi, ses/avatar rızası ve marka materyalleri; coding hattında test altyapısı, erişim ve insan review kapasitesi kritik bağımlılıklardır. İsmail için ilk değer; ürün anlatım videosu ile mevcut kodlama düzeninde testli küçük değişikliktir.

#### Uygulama: aşamalı pilot

| Evre          | Video                                                      | Yazılım / kişisel stack                                            | Çıkış kanıtı                                        |
| ------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------- |
| İlk hafta     | Tek B2B formatı ve yayın hedefi, marka/ürün/hak envanteri  | Kısa AGENTS.md, gerçek test komutları, GitHub–Context7–Playwright  | Çalışan manuel örnek ve baseline                    |
| 2–4 hafta     | 20–50 benchmark sahnesi; 10–20 video; metin ve final onayı | 5–10 geliştirici veya eşdeğer görev pilotu; Spec Kit uygun işlerde | Kabul oranı, maliyet, review süresi, hata örnekleri |
| İlk 1–2 ay    | TTS/renderer/publisher adaptörleri, QC ve retry            | CodeRabbit/Qodo/Greptile karşılaştırması; deterministic toolchain  | Aynı görev setinde ölçülebilir iyileşme             |
| Ölçüm sonrası | Provider routing, hacim testi, retention                   | M5 Max yerel model pilotu; 30 günlük trafikten sonra GPU           | Kalite eşitliğinde toplam maliyet ve latency        |
| Ölçekleme     | Gerekirse Temporal/GPU/çok dil                             | Gerekirse özel MCP ve çoklu ajan yönetimi                          | Kuyruk, erişim, budget ve rollback kanıtı           |

D03'ün 21 Eylül 2026–Şubat 2027 ayrıntılı planı; yaklaşık iki hafta gereksinim, marka iki, benchmark dört, script üç, TTS dört, render dört, publisher üç–dört hafta, uygulama review için sekiz haftaya varan pay, QC dört, observability dört, load üç, routing üç, GPU dört hafta ve yaklaşık 12 günlük rollout kalemleri içerir. Paralel işler ve dış review beklemeleri vardır; süreler basitçe toplanıp tek takvim garantisi yapılmaz.

##### Başlangıç paketinin eksikleri

Marka rehberi, motion sistemi, prompt örnekleri, izinli ses, presenter/ürün referansları, doğrulanmış knowledge base, müzik lisansı, render preset'i, OAuth uygulamaları, approval yetkilisi ve kabul seti hazır olmalıdır. “Modeli bağladık” bu girdilerin yerini tutmaz.

D03'teki 17 belirsizlik grubunu karar listesinde açık bırak: hacim/peak, süre, platform oranı, dil, avatar, 4K/HDR, onay SLA'sı, marka varyantı, ürün doğruluğu, kişiselleştirme, veri yerleşimi, rıza/haklar, müzik, retention, bütçe, KPI ve işletim sahipliği. Her varsayımın sahibi, test tarihi ve geçersizleşme koşulu olsun.

##### Ekip yatırım senaryoları

D04 düşük ölçekte 5–10 geliştirici, 3–8 kişi-gün kurulum, $150–750/ay ve 2–4 hafta; orta ölçekte 25 geliştirici, 15–30 kişi-gün, $1.000–3.500/ay ve 6–10 hafta; yüksek ölçekte 25–50 geliştirici, 40–90 kişi-gün, $4.000–15.000+/ay ve 3–6 ay; regüle yapıda 60–150+ kişi-gün ve 4–9+ ay senaryosu verir. Bunlar kaynak varsayımlarıdır, piyasa teklifi veya İsmail'in tek kişilik maliyeti değildir.

#### Karar: durdurma ölçütünü de yaz

Kalite eşiği sağlanmıyorsa, review yükü artıyorsa veya kabul edilen iş maliyeti baseline'ı aşıyorsa otomasyonu genişletme. İyileşme hangi iş sınıfında varsa orada devam et. Karmaşık multi-agent framework, Devin, Kimi self-host veya çok sayıda MCP sunucusu ancak mevcut düzenin somut açığını kapatıyorsa plana girer. [D03](https://karacaismail.github.io/futuristic/#/sources?doc=D03) [D04](https://karacaismail.github.io/futuristic/#/sources?doc=D04) [D05](https://karacaismail.github.io/futuristic/#/sources?doc=D05) [D06](https://karacaismail.github.io/futuristic/#/sources?doc=D06)



## 13. Sayısal iddia ve varsayım defteri

### Runway kredi ve saniye fiyatı

**Kontrol edildi · D01, D03, D05**

**Kaynak:** 1 kredi $0,01; Gen-4.5 12 kredi/sn; Veo 3.1 sesli 40 kredi/sn.

**Değerlendirme:** 17 Eylül 2026 resmi tabloda kontrol edildi. 8 sn için $0,96 ve $3,20; 10 shot ve iki denemede $19,20 ve $64. Diğer ücretler ayrıca.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Birincil kontrol kaynağı](https://docs.dev.runwayml.com/guides/pricing/)

### Hetzner GEX131 teklifleri

**Çelişki var · D06**

**Kaynak:** €889/ay; başka listede €1.199/ay + €599 setup; saatlik €1,4247. GEX44 €184–234/ay.

**Değerlendirme:** Vergi, tarih, ülke ve konfigürasyon eşitlenmeden tek fiyat sayılamaz. €1,4247 × 720 = €1.025,784. Güncel teklif bağımsız teyit edilmedi.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics)

### Claude Max ve bireysel planlar

**Kaynak iddiası · D06**

**Kaynak:** Claude Max $100/$200; ChatGPT Plus $20, Pro $100/$200, Business yaklaşık $25/kişi.

**Değerlendirme:** Kaynak fiyatları. İnsan aboneliği API kredisi veya 15 ajan için sınırsız otomasyon hakkı değildir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics)

### GitClear churn ve refactoring

**Kaynak iddiası · D02, D04**

**Kaynak:** 600M+ satır; churn %84 artış; refactoring %25’ten %10 altına; copy/paste moved code’u geçiyor.

**Değerlendirme:** %84 bu revizyonda bağımsız teyit edilmedi. Korelasyon nedensellik değildir; güncel metodoloji churn’ü iki haftada yeniden yazılan/silinen satırlarla tanımlar.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)

### SWE-bench aileleri ve model skorları

**Kaynak iddiası · D02, D04, D06**

**Kaynak:** Özgün: 12 Python repo/2.294 issue; Verified: 500 problem; Pro: 41 repo/1.865 görev. Opus 5 %96–97, Sol %96,2, Fable/Mythos %93,9–95, Qwen 3.8 %67,7–77,3, Qwen2.5 32B %27–33; Pro Muse Spark %61,5, Fable %80.

**Değerlendirme:** Farklı harness ve benchmark’lar bir sıralamaya karıştırılmaz. Model adları ve güncel skorlar bağımsız teyit edilmedi; contamination imkânsız denemez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)

### Faceless gelir ve RPM

**Senaryo · D05**

**Kaynak:** Finans/AI/business için $7–25 RPM; başlangıç $100–500/ay; 12–18 ayda düşük binler, $10k+ azınlık, breakout 1–3 yıl.

**Değerlendirme:** Kaynak senaryosu, gelir garantisi değil. RPM üretici geliri; CPM reklamveren ölçümü. $500 gider için $7 RPM’de yaklaşık 71.429, $25 RPM’de 20.000 görüntülenme gerekir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics)

### Self-host break-even çelişkisi

**Düzeltildi · D06**

**Kaynak:** 150M token/ay + %40 dolulukta self-host kazancı; ucuz API $0,14–0,28/M; ucuz modelde 120–180M, flagship’te 15–25M eşik.

**Değerlendirme:** 150M × $0,28/M = $42; €889 GPU kira bedelini otomatik karşılamaz. 100 token/sn × 30 gün = 259,2M, %40’ta 103,68M. Kalite, input/output karışımı ve kur eksik.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics)

### D05 Veo çarpım hatası

**Düzeltildi · D05**

**Kaynak:** 30 saniye × $0,75 için kaynakta $12 yazıyor.

**Değerlendirme:** Doğru çarpım $22,50. Bu hesap düzeltmesi, $0,75’in güncel fiyat olduğunu doğrulamaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics)

### Frontier API tarifeleri

**Kaynak iddiası · D06**

**Kaynak:** Claude Opus 5 $5/$25, Fable 5.1 $10/$50, Sonnet 5 $2/$10, Haiku 4.5 $1/$5; Sol $4/$20 promosyon veya $5/$30, Astra $10/$50 (input/output, 1M token).

**Değerlendirme:** D06 kaynak tablosu; tarihler ve model isimleri bağımsız teyit edilmedi. Sol promosyonu 21 Kasım’a kadar iddia edilir. Cache ve batch fiyatı ayrı.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics)

### Açık model API fiyatları

**Kaynak iddiası · D06**

**Kaynak:** DeepSeek Flash $0,14/$0,28; GLM $1/$3,41; Morph Kimi $3/$15; Qwen Next $0,11/$0,80 / 1M input/output.

**Değerlendirme:** Provider, bölge, veri politikası ve cache değişebilir. Tek “token fiyatı”na indirgenmez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics)

### Cache ve batch tasarrufu

**Kaynak iddiası · D02, D06**

**Kaynak:** D02 prompt cache ile %90’a kadar; D06 batch %50 indirim, cache hit için temel fiyatın %10’u.

**Değerlendirme:** Sağlayıcı ve token sınıfına bağlı kaynak değerleri. Tüm faturada aynı indirim garanti değildir; cache yazma/TTL/uygun prefix ölçülür.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context)

### OpenRouter ücretleri

**Kaynak iddiası · D06**

**Kaynak:** 500+ model; kredi alımında %5,5; BYOK $25.000’e kadar ücretsiz sonra %5.

**Değerlendirme:** Kaynak tarihli iddialar. Gateway routing kolaylığı fiyat indirimi veya tüm provider’larda aynı retention demek değil.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics)

### M5 Max yerel kapasite

**Kaynak iddiası · D06**

**Kaynak:** 40-core GPU, 128 GB, 600–614 GB/sn; Qwen3.5-35B-A3B 112 token/sn; Qwen3.6-27B yaklaşık 30 token/sn.

**Değerlendirme:** Donanım/benchmark kaynak iddiası; kişisel tek oturum ölçümü 15 eşzamanlı ajan SLA’sı değildir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=local-models)

### GEX donanım profilleri

**Kaynak iddiası · D06**

**Kaynak:** GEX44 RTX 4000 SFF Ada 20 GB; GEX131 RTX PRO 6000 Blackwell Max-Q 96 GB + Xeon Gold 5412U 24 core/256 GB DDR5.

**Değerlendirme:** Kaynak konfigürasyonu; sipariş öncesi güncel yapılandırma teyit edilmeli. KV cache ve concurrency ayrıca kapasite ister.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics)

### GLM toplam ve aktif parametre

**Düzeltildi · D06**

**Kaynak:** GLM-5.2/5.3: 744B toplam, 40B aktif; 1M context; tek 96 GB kart tavsiyesi.

**Değerlendirme:** 744B × 4 bit / 8 ≈ 372 GB yalnız ağırlık; aktif 40B toplam ağırlığı azaltmaz. Offload veya cluster olmadan sığma varsayımı tutmaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=local-models)

### Qwen2.5-Coder bellek aralıkları

**Kaynak iddiası · D02**

**Kaynak:** 7B Q4 4,7–5,5 GB ve 40–50 tok/sn; 14B Q5 10,7–12,5 GB, Q8 14,7–16,5 GB; 32B Q4 19,6–22 GB.

**Değerlendirme:** Quantization, context, runtime ve donanımla değişir. Q8 kayıpsız değildir. 24 GB kartta ağırlık sığması uzun context kapasitesini garanti etmez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=local-models)

### DeepSeek-R1 tam model ve distill

**Kaynak iddiası · D02**

**Kaynak:** 671B ana model, yaklaşık 400+ GB ve 8 H100; distill Qwen32B Q4 için 24 GB sınıfı.

**Değerlendirme:** Tam model ile distill aynı yetenek ve donanım maliyeti değildir; paralellik ve KV cache bütçesi eklenir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=local-models)

### Açık model yetenek iddiaları

**Kaynak iddiası · D06**

**Kaynak:** Qwen3-Coder-Next 80B-A3B, 512 expert/10 seçili, 256K–1M context, ~46 GB, SWE %70,6; Qwen3.6-27B %77,2; DeepSeek V4 Pro %80,6, Flash 284B-A13B/2-bit ~39 tok/sn; Kimi K3 2,8T/ Vals %93,4; GLM Terminal-Bench 81,0.

**Değerlendirme:** Tarihli kaynak iddiaları; aynı görev/harness değildir. Gerçek artifact, lisans ve ölçüm kurulumunu teyit etmeden model sıralaması yapılmaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=local-models)

### Serving motoru hızları

**Kaynak iddiası · D06**

**Kaynak:** vLLM H100’de 12.500 token/sn; SGLang %29 avantaj; Ollama 0.19 MLX ile decode 58→112, prefill 1.154→1.810.

**Değerlendirme:** Model, batch, context ve donanım eşitlenmeden kendi kullanımına taşınamaz. Toplam throughput ile kullanıcı başına hız ayrılır.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=local-models)

### KV cache büyüme iddiası

**Düzeltildi · D02**

**Kaynak:** D02 bağlam büyüdükçe KV cache’in logaritmik arttığını söylüyor.

**Değerlendirme:** Sabit model mimarisi ve batch için yaklaşık doğrusal artış temel kapasite varsayımıdır; paged allocation toplam gerekli veriyi logaritmik yapmaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=local-models)

### METR 2025 deney sonucu

**Kontrol edildi · D02, D04**

**Kaynak:** 16 deneyimli geliştirici, 246 görev; AI ile %19 daha uzun süre; katılımcılar yaklaşık %20 hızlanma algılıyor.

**Değerlendirme:** Dar örneklemde gerçek sonuç doğrulama kaydında mevcut. Yeni görev/model/ekiplere evrensel oran olarak taşınmaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Birincil kontrol kaynağı](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)

### METR 2026 hızlanma sinyali

**Düzeltildi · D04**

**Kaynak:** %4–20 hızlanma yönünde ham sonuçlar.

**Değerlendirme:** Seçim yanlılığı ve değişen katılım güvenilir genel etki tahminini engelliyor; eski doğrulama kaydı V07 ayrıntıyı korur.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)

### DORA kullanım ve sistem etkisi

**Kaynak iddiası · D02, D04**

**Kaynak:** D02 %90 AI kullanımı; AI güçlü ve zayıf mühendislik sistemlerini büyütür.

**Değerlendirme:** %90 bağımsız yeniden teyit edilmedi; amplifier yorumu önceki resmi kontrolle desteklenir. Her ekipte stability artışı demek değil.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)

### SDD modernizasyon vakası

**Kaynak iddiası · D02**

**Kaynak:** Bir staff engineer + dört ajan, dört kişilik ekibe göre yarı süre, %90 ilk kabul, 5,4× throughput; arXiv 2605.18461.

**Değerlendirme:** Tek vaka ve kaynak iddiası; bütün ekiplerin küçültülmesi için nedensel kanıt değildir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context)

### Repo talimatı araştırmaları

**Kaynak iddiası · D06**

**Kaynak:** Context dosyaları %20+ inference maliyeti, genel başarı artışı yok; başka çalışma 1.925 repo/2.303 CLAUDE.md.

**Değerlendirme:** Kaynak çalışma kapsamıyla yorumlanır. Kısa, işe yarayan domain kuralı ile uzun genel talimatı eşitleme.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context)

### AGENTS.md ve standartlaşma

**Kaynak iddiası · D06**

**Kaynak:** 60k+ repo, Aralık 2025 AAIF katılımı; Claude için CLAUDE.md farkı.

**Değerlendirme:** Tarihli benimsenme iddiası; bütün araçların aynı dosyayı aynı kuralla okuduğunu göstermez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context)

### AI review kıyasları

**Kaynak iddiası · D02, D06**

**Kaynak:** Qodo F1 %60,1; CodeRabbit precision %49,2; Greptile recall %82; DeepSource F1 %84,51; Bugbot ~90 sn/$1–1,50 review.

**Değerlendirme:** F1, precision, recall ve farklı veri kümeleri aynı sıralamada karşılaştırılamaz. Kendi PR’ında gerçek hata ve yanlış alarm ölçülür.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review)

### Kod yardımcısı ve review planları

**Kaynak iddiası · D04, D06**

**Kaynak:** Copilot $10/$39; Cursor $20/$60/$200; Tabnine $39/$59 yıllık; CodeRabbit $24/$48/$72 kişi-ay yıllık.

**Değerlendirme:** Kaynak fiyatları, güncel teklif değil. Kullanıcı, repo, kullanım kotası ve API ayrı incelenir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review)

### Görev bazında üretkenlik

**Senaryo · D04**

**Kaynak:** Review yaklaşık %15; docs/completion %50’ye; tekrarlı işler %30–40’a kadar kazanım. 25 kişi × 2 saat = 50 saat/ay örneği.

**Değerlendirme:** Farklı çalışmaların tavan/ortalama değerleri; review ve rework çıkarılmadan net ROI hesaplanmaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)

### Ajan concurrency ve tarihler

**Kaynak iddiası · D06**

**Kaynak:** Codex v0.115/16 Mart altı subagent; Agents API 10 Eylül beta; Cursor 2.0/29 Ekim 2025 sekiz worktree; Claude nested seviye beş; Composer çoğu iş <30 sn.

**Değerlendirme:** Kaynak tarihli özellik iddiaları; ürün sürümü/planı bağımsız teyit edilmedi. 15 ajan kapasitesi için gerçek kota ve bütçe ölçülür.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents)

### MCP bağlam maliyeti

**Kaynak iddiası · D06**

**Kaynak:** Sunucu başına 2–5k schema token; 3–5 aktif server önerisi; incelenen 20’nin 13’ü arşivlenmiş.

**Değerlendirme:** Sabit protokol maliyeti veya bütün ekosistem oranı değil. Gerektiğinde tool yükle, bakım durumunu ilgili repo için kontrol et.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=mcp)

### Tarihli GitHub yıldızları

**Kaynak iddiası · D02, D06**

**Kaynak:** D02 Aider 40k+; D06 Context7 62k, Playwright MCP 37,1k, n8n 45k; OpenClaw 3 Mart 250.829, karşılaştırılan React 243k/Linux 218k.

**Değerlendirme:** Kaynak anlık sayılarıdır; farklı tarihler karıştırılmaz. Popülerlik kalite, bakım, güvenlik veya benimsenme garantisi değil.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=operations)

### OpenClaw tarih ve ölçek

**Kaynak iddiası · D06**

**Kaynak:** Kasım 2025 başlangıcı, 29 Ocak 2026 yeniden adlandırma, 50+ kanal; kurucunun PSPDFKit $800M geçmişi.

**Değerlendirme:** Kaynak tarihsel/biografik iddiaları bağımsız teyit edilmedi. Teknik seçim için yetki, izolasyon ve bakım daha ilgili.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=operations)

### n8n MCP yüzeyleri

**Kaynak iddiası · D06**

**Kaynak:** Nisan 2026 instance-level preview; community n8n-mcp 2.000+ node.

**Değerlendirme:** Sürüm ve plan bazında teyit gerekir; dokümantasyon arama ile workflow yürütme aynı yetki değildir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=mcp)

### Python toolchain hızları

**Kaynak iddiası · D06**

**Kaynak:** Ruff 10–100×; ty/Pyrefly karşılaştırmasında Django 578 ms / 16 sn.

**Değerlendirme:** Kaynak mikrobenchmark’ı, bütün projelerde aynı sonuç değil. Ruff type checker değildir; plugin uyumluluğu ayrıca test edilir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain)

### Stitch tasarım planı

**Kaynak iddiası · D06**

**Kaynak:** 19 Mart 2026 sürümü; ücretsiz 350 generation, sonsuz canvas ve MCP.

**Değerlendirme:** Kaynak ürün/plan iddiası; React/Vite hedefi açık olmalı. Next.js varsayılanı stack kararını değiştirmez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain)

### Ajan güvenliği olay oranları

**Kaynak iddiası · D06**

**Kaynak:** Sentry DSN Agentjacking %85; 12 Haziran Tenet; OpenClaw <2026.1.29 RCE / ≥2026.2.21 önerisi; Codex branch injection düzeltmesi.

**Değerlendirme:** Tarihli kaynak olayları bağımsız reproduce edilmedi. Eski minimum sürüm bugünün güvenli sürüm garantisi değildir; güncel advisory kontrolü gerekir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=security)

### OWASP kategori numaraları

**Düzeltildi · D02**

**Kaynak:** D02 “2026” listesinde LLM03 Excessive Agency, LLM04 Supply Chain yazıyor.

**Değerlendirme:** Kontrol edilen resmi 2025 listesinde Supply Chain LLM03, Excessive Agency LLM06. Rapor doğrulanmamış 2026 sıralaması üretmez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Birincil kontrol kaynağı](https://genai.owasp.org/llm-top-10/)

### Video modelleri kaynak fiyatları

**Kaynak iddiası · D05**

**Kaynak:** Kling $0,10/sn, Veo Fast $0,15/sn, Sora 2 $0,10/sn, Runway $0,12–0,15/sn, Wan/Grok $0,05/sn.

**Değerlendirme:** Model, gateway, audio, çözünürlük ve deneme sayısı eşitlenmeden sıralama olmaz; Sora yaşam döngüsü ayrıca V03 kaydında.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics)

### Veo 3.1 kaynak sınırları

**Kaynak iddiası · D03**

**Kaynak:** 4/6/8 sn; 9:16 ve 16:9; 720p/1080p, bazı yollarda 4K; İngilizce prompt; reference/first-last/extend/native audio.

**Değerlendirme:** Model ID, region ve endpoint bazında. Türkçe çıktının gerçek kalitesi ayrı pilot gerektirir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-models)

### Diğer video modelleri

**Kaynak iddiası · D03, D05**

**Kaynak:** Luma 10–15 sn sınıfı; MiniMax H3 4–15 sn, 768p/2K, 24fps; Kling 3.0/Omni native 4K iddiası.

**Değerlendirme:** Kaynak ürün kabiliyetleri; UI/API ve model sürümü eşit değil. Güncel erişim ve sözleşme ayrıca kontrol edilir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-models)

### Açık video modelleri donanımı

**Kaynak iddiası · D03, D05**

**Kaynak:** Wan 24–80 GB; Hunyuan 60–80 GB; LTX bazı 24 GB yolları; gelişmiş workflow 32 GB VRAM/100 GB disk.

**Değerlendirme:** 32 GB/100 GB tüm ComfyUI kurulumlarının minimumu değildir. Model, quantization ve çözünürlük belirtilmeli.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-models)

### Video araştırma ölçümleri

**Kaynak iddiası · D03**

**Kaynak:** LTX H100’de 5 sn/24fps/768×512 çıktıyı 2 sn üretme; CogVideoX 10 sn/768×1360.

**Değerlendirme:** Research ölçümleri uçtan uca SLA değil; cold-start, queue, I/O ve encode eklenir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-models)

### OpenMontage kapsam iddiaları

**Kaynak iddiası · D01**

**Kaynak:** 12 hat, 52 araç, 500+ skill, 14+ video API, yedi boyutlu routing.

**Değerlendirme:** Kaynak iddiaları; ürün kapsamı ve bakım bağımsız teyit edilmedi. YAML/skill/adaptör yapısı PoC’de sınanır.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents)

### ShortGPT dil ve araç kapsamı

**Kaynak iddiası · D01**

**Kaynak:** 30+ dil; TinyDB, Python editing language, EdgeTTS/ElevenLabs ve Bing Image.

**Değerlendirme:** Dil listesi Türkçe kalite kanıtı değildir; bağımlılık bakımı ve görsel hakları kontrol edilir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents)

### Avatar katalogları ve limitler

**Kaynak iddiası · D03, D05**

**Kaynak:** HeyGen 175+ dil, 100 batch, 100+ avatar; Synthesia 160+ dil, 240+ avatar; free 10 dk/ay ve 9 avatar.

**Değerlendirme:** Farklı plan/katalog ve tarihler. Türkçe ve lip-sync için aynı metinle karşılaştırma gerekir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=avatar)

### Avatar fiyatları

**Kaynak iddiası · D05**

**Kaynak:** HeyGen Creator $29/ay yıllık, Avatar V API $0,05/sn=$3/dk; kullanıcı deneyimi $330/ay; Synthesia Starter ~$18/ay yıllık.

**Değerlendirme:** UI ve API faturası ayrıdır. $330 tek kullanıcının anekdotu; genellenmez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=avatar)

### Ses ve transkripsiyon sayıları

**Kaynak iddiası · D03, D05**

**Kaynak:** ElevenLabs v2 29 dil; Flash v2.5 32 dil/~75ms; free 10k karakter/ay; Scribe Türkçe 88M konuşmacı; OpenAI 11 voice; MiniMax speech-2.8 40 dil.

**Değerlendirme:** Dil/konuşmacı sayısı kalite puanı değil. Latency koşulu, model ve ses hakkı ayrı; Türkçe özel terimler test edilir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization)

### Remotion lisans ve fiyat

**Kaynak iddiası · D03, D05**

**Kaynak:** Birey/≤3 çalışan ücretsiz koşulu; $25/seat veya $0,01/render, min $100/ay kaynak senaryosu.

**Değerlendirme:** Ücretsiz koşul resmi V09 kontrolünde ayrılmıştır; bütün fiyatlar yeniden teyit edilmedi. MIT varsayımı yapılmaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing)

### Cloud renderer fiyatları

**Kaynak iddiası · D05**

**Kaynak:** Shotstack $0,30/dk PAYG, $39/ay abonelikte $0,20/dk; Creatomate $49–54/2.000 kredi, 720p dk~14 kredi; JSON2Video $49,95/200 dk Full HD, free600 kredi, 4K4×; Bannerbear $49/1.000 kredi; Plainly $69/50dk.

**Değerlendirme:** Kredi ve dakika eşdeğer değil; kaynak planları güncel teklif sayılmaz. Egress, concurrency ve render tekrarları ayrıca.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing)

### OpusClip erişim çelişkisi

**Çelişki var · D03, D05**

**Kaynak:** D03 public API/Pro/free trial, 30 req/dk/key; D05 API yalnız Business, Starter $15/ay.

**Değerlendirme:** Plan/endpoint/tarih uyuşmazlığı çözülmüş sayılmaz. API hakkı satın alma öncesi teyit edilmeli.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing)

### Repurposing planları

**Kaynak iddiası · D05**

**Kaynak:** Vizard Creator ~$14,50/ay yıllık, API ve 32+ dil; Ssemble $7,50/ay tüm planlarda API.

**Değerlendirme:** Kaynak fiyat ve erişim iddiaları. Analiz edilen dakika, üretilen klip ve API kotası ayrılır.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing)

### Yayın gateway fiyatları

**Kaynak iddiası · D05**

**Kaynak:** Blotato $29/ay/9 platform; Upload-Post $24 veya yıllık $16, free10 upload; Ayrshare $149 ve 30+ profil için ayrı fiyat; Postiz self-host free/cloud29; Mixpost $299 tek sefer.

**Değerlendirme:** Platform izinleri ortadan kalkmaz. Hesap/profil/marka başına maliyet ve gerçek API kapsamı güncel kontrol ister.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)

### YouTube upload kota değişimi

**Düzeltildi · D01, D03, D05**

**Kaynak:** D05 videos.insert1.600, D01 100 birim/çağrı aktarıyor.

**Değerlendirme:** 17 Eylül resmi tablo: videos.insert ve search.list ayrı ayrı100 çağrı/gün; çağrı başına1 kota. Otomatik sayfa özetindeki eski1.600 ifadesi gövdeyle çelişiyor. Kanal upload limiti farklı; ~20/gün evrensel değil.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)

### TikTok init sınırı

**Kontrol edildi · D03, D05**

**Kaynak:** Direct Post init 6 istek/dakika/access token; audit olmadan private kısıtı.

**Değerlendirme:** V04 resmi kontrolü korunur; creator info/consent ve yayın durum doğrulaması gerekli.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)

### Instagram süre ve kota iddiaları

**Düzeltildi · D01, D03, D05**

**Kaynak:** D05 evrensel 90 sn; D01 200/saat BUC ve 60 günlük token; review2–4 hafta.

**Değerlendirme:** Doğrulanan Facebook Login Reels yolu 3 sn–15 dk. Diğer sayılar endpoint/hesap bağlamı olmadan kapasite/SLA kabul edilmez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)

### Suno kullanım bedeli ve hakları

**Kaynak iddiası · D05**

**Kaynak:** Pro $10/ay veya yıllık $8; free kişisel; ücretli dönemde üretime commercial use.

**Değerlendirme:** Kaynak koşulları. Ticari izin, telif koruması ve üçüncü kişiye karşı tazminat aynı değil.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights)

### Epidemic / Artlist planları

**Kaynak iddiası · D05**

**Kaynak:** Epidemic Creator $9,99/Pro16,99 yıllık; Pro’da 5M takipçi/$10M şirket sınırı; Artlist Social9,99, Pro/Max3kanal iddiası.

**Değerlendirme:** Kaynak sözleşme özeti güncel hukuk görüşü değil. Reklam, client work, whitelist ve abonelik sonrası yeni yayın ayrı kontrol edilir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights)

### YouTube politika tarihi

**Düzeltildi · D01, D05**

**Kaynak:** D01 Temmuz 2026; D05 ve resmi kaynak 15 Temmuz 2025 inauthentic content güncellemesi.

**Değerlendirme:** 2025 tarihi esas alınır. AI kullanımı tek başına tüm videoların demonetize olduğu anlamına gelmez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)

### AI içerik ve kapatma sayıları

**Kaynak iddiası · D01, D05**

**Kaynak:** TikTok 1,3B (Kasım2025) ve 3B (Temmuz2026) etiket; YouTube16kanal35M abone; shadowban%90 iddiası.

**Değerlendirme:** Bağımsız teyit edilmedi. Etiket sayısı toplam AI hacmi veya erişim nedeni değil; nedensellik kurulamaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)

### AB AI Act tarih ve yaptırım

**Düzeltildi · D01, D03, D05**

**Kaynak:** Kaynaklarda 2 Ağustos2026 genel yürürlük, €15M/%3 yaptırım.

**Değerlendirme:** V11 konsolide metin sağlayıcı/deployer ve geçiş tarihlerini ayırır; her medya/her ihlal için aynı tarih/ceza varsayılmaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)

### Video GPU ve ölçek eşiği

**Senaryo · D05**

**Kaynak:** H100 $2–2,70/saat; Wan $0,25–0,60/clip; ayda5.000 clip self-host eşiği.

**Değerlendirme:** İş yükü, kalite ve doluluk olmadan evrensel eşik değil. Bakım ve tekrar üretim eklenmeli.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics)

### Depolama senaryosu

**Senaryo · D03**

**Kaynak:** 100 video/gün × 200MB =20GB final; work3–10× =60–200GB/gün.

**Değerlendirme:** Senaryo hesabı; master retention ve egress ayrıca. Hacim gerçek telemetry ile güncellenir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts)

### Üç video mimarisinin bütçeleri

**Senaryo · D05**

**Kaynak:** A bütçe faceless $50–150/ay + kullanım, $0,20–1/video; B premium $300–800; C B2B $150–400.

**Değerlendirme:** Kaynak senaryoları; kabul/deneme, premium oranı ve insan emeği dahil olmadan taahhüt değil.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats)

### Ekip yatırım senaryoları

**Senaryo · D04**

**Kaynak:** 5–10dev:3–8kişi-gün/$150–750/2–4hafta;25dev:15–30/$1k–3,5k/6–10hafta;25–50dev:40–90/$4k–15k+/3–6ay;regüle60–150+/4–9+ay.

**Değerlendirme:** Kaynak varsayımları; tek geliştiriciye veya kendi ekibine doğrudan fiyat biçmez. Baseline ile net tasarruf ölçülür.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)

### Video programı ve benchmark

**Senaryo · D03**

**Kaynak:** 21 Eylül2026–Şubat2027; 20–50 benchmark sahnesi, 17 belirsizlik grubu, ~12gün rollout, platform review için8haftaya varan pay.

**Değerlendirme:** Plan önerisi ve tamponlar, teslimat SLA’sı değil. Paralel işler basitçe toplanmaz; ayrıntılı evreler rehberde.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)

### Ölçüm pilotu

**Senaryo · D04, D05, D06**

**Kaynak:** 2–4hafta baseline,5–10dev pilot;10–20video;15ajan7/24 hedefi.

**Değerlendirme:** Kaynak başlangıç senaryosu. Aynı görev türü, review maliyeti, ret ve başarısız işler ölçüme dahil.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)

### Make webhook kapasitesi

**Kaynak iddiası · D03**

**Kaynak:** 300 gelen webhook/10sn iddiası.

**Değerlendirme:** Plan ve endpoint bazında teyit gerekir. Paralel/sıralı yürütme ayrı seçenek; queue ve retry tasarlanır.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration)

### Circuit breaker örnek eşiği

**Senaryo · D01**

**Kaynak:** Beş hata/60sn; retry base×2^n+jitter.

**Değerlendirme:** Kaynak tasarım örneği; evrensel eşik değil. Retry-After, hata türü, bütçe ve DLQ/insan revizyon ayrımı gerekli.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration)

### Vibe Kanban yaşam döngüsü

**Kaynak iddiası · D06**

**Kaynak:** Bloop kapanışı10Nisan2026, Apache community/fork ayrımı.

**Değerlendirme:** Kaynak iddiası; ürün hizmeti, açık repo ve fork bakımını ayrı kontrol et. Sırf isim var diye mevcut Pane’den geçiş önerilmez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers)


## 14. Kaynak bölümlerinden konuya kapsam haritası

Bu indeks kaynakla açıklama arasındaki izi gösterir; eşleşme, iddianın doğruluk veya tamlık sertifikası değildir. D01/D02 başlıkları kayıp olduğundan cümle sınırlarında okuma pasajlarına ayrıldı.

- **D01-01 · Giriş ve kapsam:** [Director ve sahne ajanları](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D01-02 · Kaynak pasajı 2:** [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Director ve sahne ajanları](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents)
- **D01-03 · Kaynak pasajı 3:** [Director ve sahne ajanları](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats)
- **D01-04 · Kaynak pasajı 4:** [Director ve sahne ajanları](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D01-05 · Kaynak pasajı 5:** [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing)
- **D01-06 · Kaynak pasajı 6:** [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D01-07 · Kaynak pasajı 7:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D01-08 · Kaynak pasajı 8:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)
- **D01-09 · Kaynak pasajı 9:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing)
- **D01-10 · Kaynak pasajı 10:** [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization)
- **D01-11 · Kaynak pasajı 11:** [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Director ve sahne ajanları](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)
- **D01-12 · Kaynak pasajı 12:** [Director ve sahne ajanları](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D02-01 · Giriş ve kapsam:** [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag)
- **D02-02 · Kaynak pasajı 2:** [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)
- **D02-03 · Kaynak pasajı 3:** [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)
- **D02-04 · Kaynak pasajı 4:** [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)
- **D02-05 · Kaynak pasajı 5:** [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security)
- **D02-06 · Kaynak pasajı 6:** [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp)
- **D02-07 · Kaynak pasajı 7:** [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security)
- **D02-08 · Kaynak pasajı 8:** [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review)
- **D02-09 · Kaynak pasajı 9:** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag)
- **D02-10 · Kaynak pasajı 10:** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models)
- **D02-11 · Kaynak pasajı 11:** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security)
- **D02-12 · Kaynak pasajı 12:** [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)
- **D02-13 · Kaynak pasajı 13:** [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context)
- **D02-14 · Kaynak pasajı 14:** [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)
- **D02-15 · Kaynak pasajı 15:** [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security)
- **D02-16 · Kaynak pasajı 16:** [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag)
- **D02-17 · Kaynak pasajı 17:** [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security)
- **D02-18 · Kaynak pasajı 18:** [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag)
- **D03-01 · Giriş ve kapsam:** [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats)
- **D03-02 · Yönetici özeti:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Uzun videodan kısa içerik](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations)
- **D03-03 · Kapsam, varsayımlar ve hedef yetenek modeli:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Müzik ve medya hakları](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [KVKK, ses rızası ve RTÜK](https://karacaismail.github.io/futuristic/#/guide?topic=turkey-compliance)
- **D03-04 · Güncel araç ve platform envanteri:** [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats)
- **D03-05 · Generative video ve video dönüşümü:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics)
- **D03-06 · Script-to-video, avatar ve presenter:** [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D03-07 · TTS, dublaj ve audio:** [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts)
- **D03-08 · Kurgu, assembly, motion graphics ve finishing:** [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Uzun videodan kısa içerik](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D03-09 · Açık kaynak ve self-hosted ekosistem:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts)
- **D03-10 · Referans mimari ve otomasyon pipeline'ları:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration)
- **D03-11 · Referans içerik akışı:** [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration)
- **D03-12 · Audio ve timeline akışı:** [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts)
- **D03-13 · Template-first ile generative-first farkı:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts)
- **D03-14 · Entegrasyon, orkestrasyon ve otomatik yayınlama:** [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats)
- **D03-15 · Sosyal platformların doğrudan API'leri:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D03-16 · n8n referans deseni:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D03-17 · Make referans deseni:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing)
- **D03-18 · Zapier referans deseni:** [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Uzun videodan kısa içerik](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing)
- **D03-19 · Production-grade durable orchestration:** [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D03-20 · Gap analizi, bilinmeyenler ve riskler:** [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Müzik ve medya hakları](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D03-21 · UNK listesi:** [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [KVKK, ses rızası ve RTÜK](https://karacaismail.github.io/futuristic/#/guide?topic=turkey-compliance) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D03-22 · Ana riskler:** [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Müzik ve medya hakları](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D03-23 · Uygulama yol haritası, maliyet ve operasyon modeli:** [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations)
- **D03-24 · İlk dönem: benchmark ve contracts:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D03-25 · MVP dönemi: ilk uçtan uca vertical slice:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D03-26 · Ölçek dönemi: hybrid SaaS + open source:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D03-27 · Compute ve storage:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D03-28 · Maliyet modeli:** [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D03-29 · Monitoring ve observability:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration)
- **D03-30 · Önerilen hedef mimari ve karar:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [İçerik veri modeli ve sözleşmeler](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Uzun videodan kısa içerik](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D04-01 · Giriş ve kapsam:** [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag)
- **D04-02 · Yönetici özeti:** [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [KVKK, ses rızası ve RTÜK](https://karacaismail.github.io/futuristic/#/guide?topic=turkey-compliance) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D04-03 · Son üç yılda teknoloji değişimi:** [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D04-04 · Araç ve repo karşılaştırması:** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D04-05 · Somut kullanım desenleri ve mimari:** [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D04-06 · Fayda, ölçüm ve gerçekçi ROI:** [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations)
- **D04-07 · Riskler, yönetişim ve maliyet:** [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [KVKK, ses rızası ve RTÜK](https://karacaismail.github.io/futuristic/#/guide?topic=turkey-compliance) · [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D04-08 · Uygulama yol haritası ve önerilen sonraki adımlar:** [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [KVKK, ses rızası ve RTÜK](https://karacaismail.github.io/futuristic/#/guide?topic=turkey-compliance) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D05-01 · Giriş ve kapsam:** [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)
- **D05-02 · 1. YONETICI OZETI: EYLUL 2026'DA GERCEKCI DURUM:** [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration)
- **D05-03 · 1) Platform politikalari tam otomatik uretimi cezalandirir. YouTube resmi kaydina gore (support.google.com/youtube/answer/1311392), 15 Temmuz 2025'te sunu yapti:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)
- **D05-04 · 2) Kalite tavani insan yargisindadir. Bagimsiz kullanici raporlari (Reddit, GitHub issue'lari, YouTube incelemeleri) tutarli sekilde AI ciktisinin jenerik kaldi:** [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D05-05 · 3) Hukuki/uyum yuku artiyor. EU AI Act (Regulation (EU) 2024/1689) Article 50 seffaflik yukumlulukleri 2 Agustos 2026'dan itibaren gecerlidir; Komisyon rehber i:** [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)
- **D05-06 · 2. YAKLASIMLAR (5 ANA URETIM YAKLASIMI):** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Uzun videodan kısa içerik](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Director ve sahne ajanları](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics)
- **D05-07 · 3. ARACLAR (KATEGORILI PEYZAJ):** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Director ve sahne ajanları](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D05-08 · 4. OPENCLAW: NE OLDUGU VE n8n ILE KOMBINASYON:** [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D05-09 · 5. REFERANS MIMARILER (3 UCTAN UCA TASARIM):** [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D05-10 · MIMARI A — "Butce faceless hatti, agirlikli self-hosted" (~50-150 USD/ay + kullanim):** [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats)
- **D05-11 · 1. Konu arastirmasi: AJAN (Claude/GPT/Gemini) trend/nis onerir; SISTEM Google Sheet'e yazar.:** [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats)
- **D05-12 · 2. Script: AJAN yazar; INSAN onaylar (1. ONAY KAPISI).:** [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D05-13 · 3. Seslendirme: SISTEM ElevenLabs API cagirir (Turkce ses).:** [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization)
- **D05-14 · 4. Gorsel: SISTEM stok (Pexels) ceker veya self-hosted Wan 2.2 (RunPod GPU, klip basi ~0.25-0.60 USD).:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models)
- **D05-15 · 5. Birlestirme/render: SISTEM Creatomate/Shotstack sablonu veya self-hosted FFmpeg/Remotion.:** [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing)
- **D05-16 · 6. Altyazi: SISTEM Whisper/Scribe (Turkce).:** [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization)
- **D05-17 · 7. Thumbnail + metadata/SEO: AJAN uretir.:** [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats)
- **D05-18 · 8. Yayin: SISTEM Postiz (self-host) veya Blotato ile yayinlar; INSAN final video onayi (2. ONAY KAPISI).:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D05-19 · 9. Analitik dongu: SISTEM YouTube/TikTok analitigini ceker; AJAN sonraki konulari onerir.:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D05-20 · MIMARI B — "Premium jeneratif + avatar hatti, API uzerinden" (~300-800 USD/ay + kullanim):** [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D05-21 · 3. Seslendirme: ElevenLabs veya Veo native ses.:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization)
- **D05-22 · 4. Video: SISTEM Kling 3.0/Veo 3.1 (jeneratif) + HeyGen (avatar talking-head).:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar)
- **D05-23 · 5. Montaj: SISTEM Creatomate; repurposing icin OpusClip/Vizard.:** [Uzun videodan kısa içerik](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing)
- **D05-24 · 8. Yayin: Blotato (denetimden gecmis) + INSAN final onay (2. kapi).:** [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D05-25 · 9. Analitik: AJAN A/B (kanca/baslik/thumbnail) karar dongusu; INSAN karar.:** [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics)
- **D05-26 · MIMARI C — "B2B SaaS pazarlama hatti, insan onay kapili" (~150-400 USD/ay + kullanim) — bu kullanicinin ana ihtiyaci:** [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D05-27 · 1. Girdi: INSAN urun/ozellik notu verir (veya Notion/Drive'dan cekilir).:** [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats)
- **D05-28 · 2. Script: AJAN (marka sesi prompt'uyla) yazar; INSAN duzenler+onaylar.:** [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D05-29 · 3. Sunum: HeyGen/Synthesia avatar (LinkedIn thought-leadership) veya Veo urun demo.:** [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D05-30 · 4. Seslendirme: ElevenLabs (kurumsal Turkce/Ingilizce ses).:** [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization)
- **D05-31 · 5. Render: Remotion (marka-tutarli, self-host) veya Creatomate.:** [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing)
- **D05-32 · 6. Yayin: LinkedIn API + Ayrshare/Blotato; INSAN her video onayi (yuksek marka riski nedeniyle zorunlu).:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D05-33 · 7. Analitik: SISTEM raporlar; INSAN strateji karari.:** [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack)
- **D05-34 · 6. OTOMASYONLAR NASIL KURULUR (ADIM ADIM + API ONAY SURECLERI):** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D05-35 · 7. NELER YAPMAK LAZIM (ONCELIKLI KONTROL LISTESI):** [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats)
- **D05-36 · 1. Hetzner'de n8n'i (Docker) ve OpenClaw'u izole kullanici + kapsamli anahtarlarla kur; GitHub private repo deploy hattini bagla.:** [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration)
- **D05-37 · 2. ElevenLabs (Turkce ses) + bir LLM (Claude/GPT/Gemini) + bir render katmani (Creatomate veya self-host FFmpeg/Remotion) API anahtarlarini al.:** [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization)
- **D05-38 · 3. Yayin icin Blotato (hizli, denetimden gecmis) VEYA Postiz (self-host, lock-in yok) sec.:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D05-39 · 4. TikTok app review ve Instagram app review sureclerini HEMEN baslat (haftalar surer); YouTube kotasi icin gerekirse audit talebi ac.:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D05-40 · 5. Iki onay kapisi tasarla: script onayi + final video onayi (OpenClaw ile mobilden Telegram onayi).:** [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality)
- **D05-41 · 6. AI aciklama is-akisini kur: YouTube altered-content toggle, TikTok AI label, EU AI Act makine-okunur isaret.:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)
- **D05-42 · 7. Tek nis ile basla, 10-20 video ile test et, sonra n8n workflow'unu duplicate ederek kanal cogalt.:** [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration)
- **D05-43 · 8. Analitik geri-besleme dongusu kur: YouTube/TikTok API'den metrik cek, AJAN A/B onersin, INSAN karar versin.:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)
- **D05-44 · 9. Muzik lisansini netlestir (Bolum 8) — Epidemic/Artlist Pro veya dikkatli Suno.:** [Müzik ve medya hakları](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights)
- **D05-45 · 10. Maliyet tavani koy: jeneratif saniye-basi ve token maliyetlerine aylik hard-limit tanimla.:** [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics)
- **D05-46 · 8. BILINMEYEN BILINMEYENLER (TUZAKLAR):** [Müzik ve medya hakları](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance) · [KVKK, ses rızası ve RTÜK](https://karacaismail.github.io/futuristic/#/guide?topic=turkey-compliance) · [Video modelleri ve yönlendirme](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics)
- **D05-47 · 9. GAP ANALIZI:** [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Müzik ve medya hakları](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights)
- **D05-48 · 10. KAYNAKLAR (URL'LER):** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Müzik ve medya hakları](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [Director ve sahne ajanları](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)
- **D05-49 · 11. GUVENLI / RISKLI / KURUMSAL-DOGRU / BU KULLANICI ICIN PRATIK ONERI:** [Yayın API’leri ve sosyal dağıtım](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Müzik ve medya hakları](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [Beş video yöntemi ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Avatar ve canlı persona](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [Kalite kapıları ve insan onayı](https://karacaismail.github.io/futuristic/#/guide?topic=media-quality) · [Türkçe ses, altyazı ve lokalizasyon](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kurgu, render ve finishing](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [C2PA, SynthID ve AI açıklaması](https://karacaismail.github.io/futuristic/#/guide?topic=provenance) · [Video bütçesi, RPM ve gelir](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [KVKK, ses rızası ve RTÜK](https://karacaismail.github.io/futuristic/#/guide?topic=turkey-compliance) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D06-01 · Giriş ve kapsam:** [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag)
- **D06-02 · TL;DR:** [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D06-03 · Genel Bakış (sade dil):** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)
- **D06-04 · 1. Kodlama Ajanları ve Orkestrasyon:** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents)
- **D06-05 · Claude Code (Anthropic):** [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review)
- **D06-06 · OpenAI Codex (CLI + Cloud + Agents API):** [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations)
- **D06-07 · Cursor 2.x (background/paralel ajanlar):** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D06-08 · Diğer ajanlar (kısa):** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context)
- **D06-09 · Ajan Yöneticileri / Orkestratörler (git worktree tabanlı):** [Worktree ve çoklu ajan yöneticileri](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D06-10 · 2. Spec-Driven Development ve Ajan-Context Standartları:** [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context)
- **D06-11 · AGENTS.md:** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security)
- **D06-12 · GitHub Spec Kit:** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D06-13 · Diğer: Kiro-style specs, BMAD, Superpowers-style skill kütüphaneleri, Agent Skills standardı:** [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents)
- **D06-14 · 3. MCP (Model Context Protocol) Ekosistemi:** [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations)
- **D06-15 · FastMCP (Python):** [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag)
- **D06-16 · 4. AI-Destekli Test/QA ve "Self-Healing" Pipeline'lar:** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents)
- **D06-17 · Agentic test üretimi + Playwright MCP / browser ajanları:** [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain)
- **D06-18 · AI PR review araçları (aktörleri açıkça):** [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D06-19 · Otomatik PR-fix ajanları ve CI/CD:** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review)
- **D06-20 · 5. Açık-Ağırlıklı Kodlama Modelleri ve Self-Hosting:** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents)
- **D06-21 · Eylül 2026 itibarıyla en iyi açık-ağırlıklı kodlama modelleri:** [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)
- **D06-22 · Inference serving seçenekleri:** [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)
- **D06-23 · 128 GB M5 Max MacBook'ta gerçekçi olarak ne çalışır?:** [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics)
- **D06-24 · Hetzner GPU seçenekleri (15 eşzamanlı ajan için):** [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics)
- **D06-25 · Cost/benefit: Self-host vs API (senin 15-ajan-7/24 profilin):** [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag)
- **D06-26 · OpenRouter:** [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics)
- **D06-27 · 6. Workflow Otomasyonu ve Ajan Platformları:** [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents)
- **D06-28 · OpenClaw (senin decision/action ajan katmanın):** [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations)
- **D06-29 · n8n (senin deterministik workflow katmanın):** [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations)
- **D06-30 · Diğer ajan framework'leri (sadece pragmatik değer varsa):** [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag)
- **D06-31 · 7. Python/FastAPI ve React/TypeScript'e Özel AI Tooling:** [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain)
- **D06-32 · Python tarafı:** [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review)
- **D06-33 · React/TypeScript tarafı:** [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context)
- **D06-34 · Design-to-code (Next.js YASAK — düz React/Vite alternatifleri):** [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review)
- **D06-35 · 8. DevOps/Infra AI:** [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)
- **D06-36 · 9. Son 12 Ayda Yıldızlanmaya Değer GitHub Repo'ları:** [Worktree ve çoklu ajan yöneticileri](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations)
- **D06-37 · 10. Riskler ve Anti-Pattern'ler + Guardrail'ler:** [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Worktree ve çoklu ajan yöneticileri](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D06-38 · Nereden Başlamalı: İsmail için Öncelikli Adımlar:** [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [SDD, AGENTS.md ve bağlam](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D06-39 · Şimdilik atlanacaklar (skip):** [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [FastAPI, React ve geliştirici araçları](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [İsmail için karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Pilot, takvim ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)
- **D06-40 · OpenClaw + n8n senaryosu (sadece gerçekten oturduğu yerde):** [Workflow, retry ve kalıcı durum](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kodlama ajanları ve çalışma döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations)
- **D06-41 · Caveat'ler (Belirsizlikler):** [API, M5 Max ve Hetzner ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [MCP ve domain araçları](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Yerel modeller ve inference](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Benchmark ve gerçek üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [RAG ve kurumsal bilgi getirme](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [TDD, AI review ve otomatik onarım](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Ajan güvenliği ve OWASP](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Gözlemlenebilirlik ve operasyon](https://karacaismail.github.io/futuristic/#/guide?topic=operations)
