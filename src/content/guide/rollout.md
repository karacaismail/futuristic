## İki yatırım hattını aynı anda büyütme

Kaynakların zaman çizelgeleri birer plan önerisidir; teslimat taahhüdü değildir. Video hattında platform uygulama incelemesi, ses/avatar rızası ve marka materyalleri; coding hattında test altyapısı, erişim ve insan review kapasitesi kritik bağımlılıklardır. İsmail için ilk değer; ürün anlatım videosu ile mevcut kodlama düzeninde testli küçük değişikliktir.

## Uygulama: aşamalı pilot

| Evre          | Video                                                      | Yazılım / kişisel stack                                            | Çıkış kanıtı                                        |
| ------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------- |
| İlk hafta     | Tek B2B formatı ve yayın hedefi, marka/ürün/hak envanteri  | Kısa AGENTS.md, gerçek test komutları, GitHub–Context7–Playwright  | Çalışan manuel örnek ve baseline                    |
| 2–4 hafta     | 20–50 benchmark sahnesi; 10–20 video; metin ve final onayı | 5–10 geliştirici veya eşdeğer görev pilotu; Spec Kit uygun işlerde | Kabul oranı, maliyet, review süresi, hata örnekleri |
| İlk 1–2 ay    | TTS/renderer/publisher adaptörleri, QC ve retry            | CodeRabbit/Qodo/Greptile karşılaştırması; deterministic toolchain  | Aynı görev setinde ölçülebilir iyileşme             |
| Ölçüm sonrası | Provider routing, hacim testi, retention                   | M5 Max yerel model pilotu; 30 günlük trafikten sonra GPU           | Kalite eşitliğinde toplam maliyet ve latency        |
| Ölçekleme     | Gerekirse Temporal/GPU/çok dil                             | Gerekirse özel MCP ve çoklu ajan yönetimi                          | Kuyruk, erişim, budget ve rollback kanıtı           |

D03'ün 21 Eylül 2026–Şubat 2027 ayrıntılı planı; yaklaşık iki hafta gereksinim, marka iki, benchmark dört, script üç, TTS dört, render dört, publisher üç–dört hafta, uygulama review için sekiz haftaya varan pay, QC dört, observability dört, load üç, routing üç, GPU dört hafta ve yaklaşık 12 günlük rollout kalemleri içerir. Paralel işler ve dış review beklemeleri vardır; süreler basitçe toplanıp tek takvim garantisi yapılmaz.

### Başlangıç paketinin eksikleri

Marka rehberi, motion sistemi, prompt örnekleri, izinli ses, presenter/ürün referansları, doğrulanmış knowledge base, müzik lisansı, render preset'i, OAuth uygulamaları, approval yetkilisi ve kabul seti hazır olmalıdır. “Modeli bağladık” bu girdilerin yerini tutmaz.

D03'teki 17 belirsizlik grubunu karar listesinde açık bırak: hacim/peak, süre, platform oranı, dil, avatar, 4K/HDR, onay SLA'sı, marka varyantı, ürün doğruluğu, kişiselleştirme, veri yerleşimi, rıza/haklar, müzik, retention, bütçe, KPI ve işletim sahipliği. Her varsayımın sahibi, test tarihi ve geçersizleşme koşulu olsun.

### Ekip yatırım senaryoları

D04 düşük ölçekte 5–10 geliştirici, 3–8 kişi-gün kurulum, $150–750/ay ve 2–4 hafta; orta ölçekte 25 geliştirici, 15–30 kişi-gün, $1.000–3.500/ay ve 6–10 hafta; yüksek ölçekte 25–50 geliştirici, 40–90 kişi-gün, $4.000–15.000+/ay ve 3–6 ay; regüle yapıda 60–150+ kişi-gün ve 4–9+ ay senaryosu verir. Bunlar kaynak varsayımlarıdır, piyasa teklifi veya İsmail'in tek kişilik maliyeti değildir.

## Karar: durdurma ölçütünü de yaz

Kalite eşiği sağlanmıyorsa, review yükü artıyorsa veya kabul edilen iş maliyeti baseline'ı aşıyorsa otomasyonu genişletme. İyileşme hangi iş sınıfında varsa orada devam et. Karmaşık multi-agent framework, Devin, Kimi self-host veya çok sayıda MCP sunucusu ancak mevcut düzenin somut açığını kapatıyorsa plana girer. [D03](#/sources?doc=D03) [D04](#/sources?doc=D04) [D05](#/sources?doc=D05) [D06](#/sources?doc=D06)
