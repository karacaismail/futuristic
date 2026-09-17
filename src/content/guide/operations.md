## Gözlemlenebilirlik: öneriden sonuca kadar aynı iş kimliği

D03/D04/D06 hem video hem coding hattında job/task ID, maliyet, hata ve insan müdahalesini izlemeyi gerektirir. Çok log toplamak yeterli değildir; script, scene, render, approval, post veya issue, commit, CI ve incident birbirine bağlanmalıdır.

## Uygulama: iki hattın ortak telemetry sözleşmesi

| Ölçüm    | Video                                                      | Yazılım                                                        |
| -------- | ---------------------------------------------------------- | -------------------------------------------------------------- |
| Süre     | Queue, üretim, render, onay, yayın p50/p95                 | Keşif, coding, test, review ve merge bekleme                   |
| Başarı   | Request success, QC kabul, insan ret ve platform son durum | Görev kabulü, test başarısı, revert ve kaçan hata              |
| Maliyet  | Denemeler dahil kabul edilen saniye/video                  | Cache dahil token, runner ve insan review / kabul edilen görev |
| Veri izi | Model/prompt/asset/render/onay hash'i                      | Model/task/worktree/commit/check ilişkisi                      |
| Alarm    | 429, stuck job, token expiry, maliyet sıçraması, storage   | CI tekrarları, yetki ihlali, failed deploy, review kuyruğu     |

Sentry Seer; hata, log, trace, release ve commit bağlamından kök neden hipotezi ve patch adayı çıkaran akış olarak ele alınır. Hipotez doğrulanmadan üretim değişmez: incident → kanıt → yerel reprodüksiyon → regresyon → branch/PR → review. Datadog Bits mevcut Datadog telemetry'siyle benzer araştırma işine yardımcı olabilir. Yeni AI özelliği için çalışan observability altyapısını sebepsiz taşımak gerekmez.

Grafana/Loki metrik ve log için, Snyk/DeepSource güvenlik/kalite için kaynakta anılır. D06'daki DeepSource F1 %84,51 iddiası ölçüm kümesi ve hata sınıfları bilinmeden araçlar arası üstünlük kanıtı değildir. Provider token kullanımını kendi `cost_events` kaydıyla mutabık tut; API cevabındaki tahmini ücret ile fatura farklı olabilir.

### OpenClaw + n8n için üç somut akış

1. **PR triage:** GitHub webhook → n8n doğrulama → OpenClaw özet/öncelik önerisi → yetkili kanala bildirim → insan review. Kaynakta önerilen politika otomatik merge değildir.
2. **CI hatası:** Başarısız check → maskelenmiş log → hata sınıfı → worker ayrı worktree'de reprodüksiyon/test/fix → PR. Tekrarlayan CI retry, kaynak sorunu ile kod hatasını ayırır.
3. **Refactor görevi:** Onaylı backlog → n8n task kaydı → ajan bütçe ve kapsamla çalışır → test kanıtı → diff inceleme → deterministik deploy fonksiyonu. Ajanın kendi testini geçti demesi deployment izni değildir.

OpenClaw kaynakta HTTP/WebSocket Gateway, queue, Exec Approval Manager, ReAct, Skills/ClawHub, heartbeat, memory ve `SOUL.md` ile anlatılır. TS/Node/Bun ve MIT iddiaları belirli repo/sürüm içindir. 50+ kanal, 250.829 GitHub yıldızı (3 Mart), React 243k/Linux 218k karşılaştırmaları popülerlik kaydıdır; güvenlik sınırlarını kaldırma gerekçesi değildir.

### Delegasyon ve skill keşfi

`freddy-schuetz/n8n-claw`, kaynakta n8n içinde OpenClaw benzeri ajan ve OpenClaw'a delegasyon skill'i olarak anlatılır. Task ID ve kabul kriterini n8n'de sakla, delegasyonu dar araca ver, sonucu aynı işe bağla; ikinci kez tetikleme ve timeout kontrolünü koru. `SamurAIGPT/awesome-openclaw` skill/tutorial keşfi sunar; indirilen her skill'in komutları ve yetkisi ayrı incelenir.

## Karar: önce ölçümün kendisini güvenilir yap

Log'larda token, ses/görüntü rıza belgesi ve personel verisi taşınmaz. Retention ve erişim politikası tanımlanır. Aynı görevin retry'ları farklı başarı sayılmamalı; başarısız/iptal edilen işler denominator'dan çıkarılmamalı. Bir ay gerçek trafik olmadan 15 ajan veya GPU tasarrufu hakkında kesin ROI ilan edilmez. [D03](#/sources?doc=D03) [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)
