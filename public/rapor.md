# Futuristic — Yapay zekâdan üretim sistemine

**Araştırma raporu · 17 Eylül 2026 · v2.2**

AI video üretimi ve yazılım geliştirme için mimari, araç, maliyet, kalite ve uygulama raporu. Altı kaynak belgenin tamamı korunmuştur; bütün iddiaların doğrulandığı ileri sürülmez.

[Yönetici özeti](yonetici-ozeti.md) · [Araştırma raporu](rapor.md) · [Tam ekler](rapor-ekleri.md)

## Okuma kılavuzu

En güçlü ortak yatırım, yaratıcı modelleri deterministik yürütme ve açık doğrulama kapılarıyla birleştirmektir. Video için tek formatta insan onaylı bir üretim hattı; yazılım için kabul kriteri, TDD, küçük diff ve ölçülmüş review döngüsüyle başla. Başarıyı üretilen çıktı sayısıyla değil, kabul edilen çıktı başına toplam maliyet, kalite ve insan emeğiyle ölç.

Kapsam: **6 özgün belge**, **112 benzersiz referans**, **177 araç/teknoloji kartı**, **13 seçilmiş kritik iddia kontrolü**. Arşiv 263.605 bayttır; 209 çözümlenemeyen eski sohbet atıf belirteci orijinallerde korunur.

39 araç kaydında fiyat; 37 kayıtta lisans, açık kaynak sınıflandırması veya kullanım koşulu bilgisi var. Bilgi varlığı bağımsız doğrulama değildir. Araştırma raporu uygulama rehberlerini; tam ekler araç verileri, sayısal iddialar ve referans indeksini içerir.


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

Araç kataloğu kaynakların rol ve kullanım senaryolarını bir araya getirir. Bir araç kartında yer almak, bağımsız performans testi, satın alma önerisi veya mevcut API erişimi garantisi değildir. Fiyatlar, skorlar, kapasite ve gelir projeksiyonları artık kaynak iddiası / kontrol / düzeltme / çelişki / senaryo durumlarıyla görünürdür. Farklı benchmark harness’leri tek sıralama yapılmaz; araç detayında bu alanların mevcut bilgisi veya eksikliği görünür. Ortak iş akışı ve seçim ölçütü editoryal sentez olarak etiketlenir. Fiyat ve lisans verisi filtreleri yalnız ilgili bilgi bulunan kayıtları seçer; birlikte kullanıldıklarında iki koşul da aranır.

### Kaynak izlenebilirliği

Her özgün dosya byte uzunluğu ve SHA-256 ile manifestoda yer alır. Kaynak sayfasında tam metni okumak, tek dosyayı indirmek veya altı belgeyi manifestoyla ZIP olarak almak mümkündür. Özgün TXT dosyaları ihtiyaç anında yüklenir. Konu/kapsam indeksi açıklamalı rehber ve kaynak pasajlarını da taşır. Araç pasajları cümle, paragraf veya tablo satırı sınırlarıyla, özgün karakter aralığı korunarak seçilir. Pasajda araç adının geçmesi her alanı doğrulamaz. D03/D04 tablolarından aktarılan entegrasyon hücreleri ayrıca ilgili alanın kaynak satırıyla gösterilir.

İki belgede paragraf/satır ayrımları aktarım sırasında kaybolmuştur. Orijinal dosya aynen korunur; okuma görünümü cümle sınırlarında pasaj ve paragraf araları oluşturur. “Kaynak pasajı” etiketleri yeni okuma bölümlemesidir; kayıp özgün başlıkların aynen geri getirildiği iddia edilmez. Düz metin görünümü ve özgün indirme ayrıca korunur. D04 kapsam haritası paragraflara ve tablo satırlarına ayrılmıştır; kod blokları bölünmez. Ayrı satırın okunabilmesi için tablo başlığı gösterimde tekrar edilir, özgün kaynak aralığı değiştirilmez. Diğer belgelerin Markdown, tablo, kod ve şema metinleri de özgün biçimleriyle indirilebilir.

D03/D04’teki eski sohbet atıf belirteçleri (`turn…search…` vb.) erişilebilir kaynak URL’si değildir. Bu belirteçlerden bağlantı uydurulmaz; orijinal metinde saklanır ve çözümlenemeyen atıf olarak sayılır. Açık URL’ler, çıplak alan adları, açık GitHub repo kimlikleri ve arXiv numaraları ayrı indekslenir.

### Tasarım tercihleri

Ana sayfa yönetici özeti ve kararı değiştiren sayılarla açılır; araç dizini özetin ardından gelir. Mobil rapor metni başlangıçta bütünüyle açıktır. İsteğe bağlı toplu daraltma/açma vardır; destekleyen tarayıcılarda sayfada arama daraltılmış bölümü açar. Destek yoksa metin açık kalır. Alt gezinme ve bölüm paneli tek elle erişilir; araç karşılaştırması dar ekranda dikey kartlara dönüşür. Okuma sütunu 68ch üst sınırına ve seçili fontun gerçek satır ölçüsüne göre daraltılır; başlık basamakları 1rem alt sınırının üzerinde ayrışır. 48px etkileşim alanı, klavye odağı, reduced motion ve cihaz güvenli alanı tasarımın temelidir.

Masaüstünde kalıcı içerik menüsü, daha geniş karşılaştırma alanı ve aynı URL/okuma durumu kullanılır. Okundu ve yol haritası işaretleri yalnızca bu tarayıcıda saklanır; hesap veya cihazlar arası senkronizasyon yoktur. Depolama engellenirse oturum içi kullanım devam eder.

### Teknik kapsam

Portal React, TypeScript, Vite, Tailwind CSS ve daisyUI ile hazırlanmış statik bir GitHub Pages uygulamasıdır. Gerçek video üretimi, ücretli model çağrısı, sosyal hesap bağlantısı veya sunucu tarafı ajan çalıştırma içermez. Hesaplayıcı bir planlama aracıdır; canlı fiyat servisi değildir.

DX için birim ve tarayıcı testleri, tip kontrolü, sürümü sabitlenmiş bağımlılıklar, kaynak bütünlüğü testi ve GitHub Actions yayın hattı kullanılır. Test başarısızsa yeni sürüm yayın aşamasına geçmez.

### Anlamsal kapsam nasıl denetlenir?

[Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage) altı belgeyi bölüm/pasaj sırasıyla gösterir. Her kayıt gerçek kaynak karakter aralığı ve ilgili konu bağlantılarını taşır. Yöntem rehberleri amaç, girdi/çıktı, adımlar, sınırlamalar ve seçim gerekçesini açıklar. Kaynağın yalnız alternatif olarak adını andığı ürünlerde eksik fiyat veya yetenek uydurulmaz.

İsmail’e özel bağlam [karar haritasında](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack); sayılar [iddia defterinde](https://karacaismail.github.io/futuristic/#/claims); özgün belgelere ait 112 açık referans [kütüphanede](https://karacaismail.github.io/futuristic/#/sources?tab=references) yer alır. Yeni kontrol bağlantıları ilgili rehber ve kayıtta gösterilir, 112 özgün referans sayısıyla karıştırılmaz. İndirilebilir yönetici özeti öncelikleri kısaca açıklar. Araştırma raporu bütün rehberleri; tam ekler sayısal kayıtları, araç özelindeki bilgileri ve referans indeksini içerir. Ortak workflow şablonları eklerde bir kez tanımlanır; her araç o desene bağlanır. Eksik alanlara yazılmış genel tavsiyeler rapor hacmini büyütmek için tekrarlanmaz.

Tema açık/koyu/sistem olarak seçilebilir. Tipografi en az 1rem’dir; ana okuma metni daha büyük, metadata ve kontroller en az taban boyuttadır. Formatter, lint, tip kontrolü, içerik bağlantıları ve mobil/masaüstü davranışları CI’da doğrulanır.


## 7. Maliyet modeli

Aylık toplam = video sayısı × video başına üretilen saniye × saniye birim fiyatı × kabul başına ortalama deneme + video sayısı × inceleme dakikası / 60 × saatlik insan maliyeti + video sayısı × diğer değişken gider + sabit gider.

**Örnek senaryo, güncel teklif değildir:** 100 video/ay, 30 üretilen saniye/video, $0,12/sn, 2 deneme, 5 dakika inceleme/video, $12/saat insan emeği, $0,50 diğer/video ve $50 sabit gider → $720 üretim + $100 insan + $50 diğer + $50 sabit = **$920/ay**. Video başına $9,20; kabul edilen saniye başına üretim $0,24. Deneme sayısı 4 olduğunda toplam $1.640 olur. Vergi ve kur etkisi dahil değildir. [D03 ve D05 sentezi]

[Kendi senaryonu hesapla](https://karacaismail.github.io/futuristic/#/cost). Self-host karşılaştırmasında GPU kirası, idle kapasite, model lisansı, bakım emeği, disk/egress ve aynı kaliteyi yakalama maliyeti ayrıca hesaba katılır.


## 8. Ayrıntılı uygulama rehberi

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
