## Ortak tasarım: olasılıksal karar, deterministik yürütme

Video üretimi ile yazılım geliştirme aynı kontrol sorununu paylaşır: modelin yaratıcılığı yararlı, sonucu ise doğrulanmaya muhtaçtır. Ajan bir sahne veya kod değişikliği önerir; sözleşmeler, durum kayıtları, test ve insan incelemesi bu öneriyi teslim edilebilir çıktıya dönüştürür. Bu ortak mimari, altı belgenin birlikte değerlendirilmesinden çıkan sentezdir. [D01](#/sources?doc=D01) [D02](#/sources?doc=D02) [D03](#/sources?doc=D03) [D04](#/sources?doc=D04) [D05](#/sources?doc=D05) [D06](#/sources?doc=D06)

## Video alan modeli

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

Provider payload’ları yalnızca adaptörde yaşar. Çekirdek sözleşme, sağlayıcı kapandığında veya model değiştiğinde sabit kalır. `content_id`, `scene_id`, model sürümü, prompt hash’i ve varlık checksum’ı her adımdan izlenebilir olmalı. [D03](#/sources?doc=D03)

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

## Dayanıklılık: sadece retry eklemek yetmez

- **İdempotency:** aynı içerik sürümü + platform için unique kayıt tut; timeout sonrasında yeni upload’dan önce eski gönderimin durumunu sorgula.
- **Durum kalıcılığı:** vendor job ID’sini beklemeye geçmeden kaydet; işlem yeniden başladığında kaldığı noktadan devam et.
- **Callback güvenliği:** imzayı doğrula, zaman penceresi ve replay kontrolü uygula; tekrar veya sırasız gelen event’leri yönet.
- **Retry bütçesi:** 429/5xx için sınırlı backoff + jitter; `Retry-After` varsa dikkate al. Yetki/policy hatalarını körlemesine tekrar etme.
- **Circuit breaker:** hata eşiğinde sağlayıcı çağrılarını durdur; kontrollü probe ile toparlanmayı sınama. Her hata doğrudan DLQ’ya gönderilmek zorunda değil.
- **Kurtarma kuyruğu:** yeniden deneme bütçesi tükenen veya müdahale isteyen işleri sebebiyle kaydet; tekrar başlatma maliyetini görünür kıl.
- **Dosya ömrü:** imzalı URL’nin süresi provider’ın indirme süresini kapsasın. Kopyayı ve hash’i kontrol edilen depoda sakla.

Üretim timeout’u yeni faturalı deneme başlatmakla aynı şey değildir. Önce sağlayıcının eski job’ının akıbetini uzlaştır. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03)

## Orkestrasyon seçenekleri

| Seçenek              | Ne zaman değerli?                                     | Operasyonel bedel                                      |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| n8n                  | Webhook, HTTP, DB, onay ve iş sistemi entegrasyonları | Queue/concurrency, secrets, yükseltme ve hata yönetimi |
| Make / Zapier        | Teknik olmayan ekibin dar kapsamlı otomasyonu         | İşlem bazlı maliyet, plan sınırları ve dışa taşıma     |
| Temporal             | Uzun süren, yeniden başlayabilen, kritik iş akışı     | Workflow determinismi ve yeni altyapı                  |
| Container workers    | FFmpeg/Remotion render                                | Kaynak sınırı, job izolasyonu ve ölçekleme             |
| ComfyUI + GPU worker | Gizlilik veya ölçülmüş yüksek hacimli üretim          | Model lisansı, VRAM, cold start ve kapasite            |
| OpenClaw / ajan SDK  | Araştırma, triage, öneri ve mesajlaşma                | Tool izinleri ve dış içerik güvenliği                  |

n8n akışı yürütür; ajan sınırlı karar verir; insan yüksek etkili sonucu onaylar. OpenClaw, LangGraph veya CrewAI gereksinim olmadan eklenirse yönetilecek yeni bir sistem oluşturur. n8n’in fair-code lisansını da dağıtım/ticari kullanım modeliyle birlikte değerlendir. [D03](#/sources?doc=D03) [D05](#/sources?doc=D05) [D06](#/sources?doc=D06)

## Kodlama hattı

Issue + kabul kriterleri → izole branch/çalışma alanı → başarısız test → uygulama → lint/typecheck/tests → güvenlik taraması → diff incelemesi → PR → inceleme/merge → sürüm izleme.

Sentry/Datadog/Grafana kayıtlarından gelen hata bağlamı bu döngüye beslenebilir. Ajanın hipoteziyle log kanıtını ayır. Production telemetry salt okunur olmalı; hassas veriler maskelenmeli. Güvenlik tarayıcısı bulgusunu düzelten ajan, tarayıcıyı ve regresyon testini yeniden çalıştırmalıdır. [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)

## Saklama ve gözlemlenebilirlik

`raw`, `work`, `master`, `delivery` alanlarını ayrı lifecycle kurallarıyla tut. Ara çıktı büyümesi final MP4’ten çok daha yüksek olabilir. Kaynaklardaki 100 video × 200 MB = 20 GB/gün hesabı yalnızca final dosyalar için örnektir; varyant, yedek ve egress dahil değildir. [D03](#/sources?doc=D03)

İzlenecek olaylar: bekleyen işler, callback timeout, 429 oranı, token süresi, kalite reddi, tekrar harcaması, render belleği, yayın görünürlüğü, insan onay süresi. Uzun ömürlü render süreçleri yerine kaynak limitli ayrı işler arıza alanını küçültür; kaynaklardaki bütün bellek problemlerini tek başına FFmpeg’e atfetmek doğru değildir.
