## Olay, durum ve uzun süren iş

n8n/Make/Zapier uygulamalar arası iş akışını; Temporal kalıcı, uzun süreli yürütmeyi; LangGraph/CrewAI/AutoGen gibi çerçeveler ajan kararlarını düzenler. Bunları aynı tür “otomasyon aracı” diye kıyaslamak hatalıdır. D01/D03/D05/D06'nın ortak ihtiyacı: servis çağrısı saatler süren insan onayını veya dakikalar süren render'ı tek HTTP bağlantısında beklemesin.

## Uygulama: n8n ile ilk üretim hattı

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

### Hata toparlama

429 ve geçici 5xx için sağlayıcının `Retry-After` bilgisini gözeterek `base × 2^retry + jitter` kullan. Geçersiz prompt, lisans veya izin hatası aynı isteği tekrar ederek çözülmez. Kaynağın “beş hata / 60 saniye” circuit breaker eşiği örnektir; trafik ve sağlayıcı davranışıyla ayarlanır. Açık devrede çağrıları durdur, kısa sağlık denemesiyle yarı açık duruma geç.

Retry bütçesi tükenince DLQ kaydı hata sınıfı, iş ID'si ve son güvenli adıma dönüş bilgisi taşır. Editoryal ret teknik hata değildir; revizyon kuyruğuna gider. Serverless control plane kısa karar/dispatch işlerini, render veya GPU worker uzun yoğun işi taşır. GPU'nun idle süresi ve cold-start etkisi ölçülür.

## Karar: mevcut Pane + n8n düzeninden başla

D06'nın 15 ajan hedefinde mesaj triage'ı, kod üretimi ve deploy aynı yetkiyle çalışmamalı. OpenClaw öneri ve görev yönlendirsin; n8n durum/bildirim yönetsin; worker ayrı worktree'de testli diff üretsin. LangGraph/CrewAI gibi yeni katmanlar ancak gerçek branch/retry/state ihtiyacı mevcut araçların kapasitesini aşıyorsa eklenir. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03) [D05](#/sources?doc=D05) [D06](#/sources?doc=D06)
