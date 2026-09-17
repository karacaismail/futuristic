## Sunuculu video ile konuşan canlı persona ayrılır

HeyGen/Synthesia tarzı offline render eğitim ve ürün anlatımında; Tavus tarzı etkileşimli persona ise gerçek zamanlı konuşmada kullanılır. Aynı “avatar” etiketi latency, altyapı, kullanıcı rızası ve faturalama sorunlarının aynı olduğunu göstermez. D-ID, Hedra, Argil ve Captions.ai kaynaklarda alternatiflerdir; ayrıntısı verilmemiş özellikler bu raporda kesinmiş gibi doldurulmaz.

## Uygulama: avatar üretimini içerik hattına bağla

**Girdi:** onaylı script veya ses, presenter kimliği, dil, arka plan, marka kiti ve kullanım izni. **İşlem:** avatar/voice seç → async render job oluştur → provider ID'yi sakla → webhook/batch sonucunu al → Türkçe telaffuz ve lip-sync izle → altyazı/brand overlay ekle → final onayı kaydet. **Çıktı:** kullanım hakkı ve sürümü belli bir presenter asset'i; tek başına tüm yayın paketi değil.

| Platform         | Kaynakta verilen ayrıntı                                                                                                     | Satın alma / API sorusu                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| HeyGen           | D03 175+ dil, 100'e kadar batch, REST/webhook/CLI/MCP; D05 100+ avatar, Creator $29/ay yıllık, Avatar V API $0,05/sn ($3/dk) | UI aboneliği API kullanımını içeriyor mu? Avatar IV/V kredi tüketimi, batch ve concurrency hangi planda?                 |
| Synthesia        | D03 160+ dil, free 10 dk/ay ve 9 stock avatar; D05 240+ avatar, Starter yaklaşık $18/ay yıllık, SCORM                        | Kurumsal eğitim/brand kit için template ve SCORM gereksinimi var mı? Free ile ücretli avatar kataloğu karıştırılıyor mu? |
| Tavus            | LiveKit, Meet, Zoom, Teams bağlantılarıyla gerçek zamanlı persona                                                            | Offline üretim yerine konuşma gecikmesi, session state, moderasyon ve eşzamanlılık bütçesi                               |
| Adobe Avatar API | Metin veya kendi sesi; image/video background; async job                                                                     | Firefly/Adobe sözleşmesi, stock voice ve custom asset hakları                                                            |
| VEED             | Avatar, dubbing, TTS, subtitle, AI edit ve editing API                                                                       | UI'daki tüm editing adımları API'de yapılabiliyor mu?                                                                    |

Kaynaklar HeyGen'i doğal avatar, Synthesia'yı yapısal kurumsal editör tarafında konumlandırıyor. Bu **kaynak değerlendirmesi** bir Türkçe kullanıcı testi değildir. Aynı 30–60 saniyelik ürün metnini karşılaştır; sayı, kısaltma, Türkçe/İngilizce geçiş, dudak kapanışı ve duygusal doğallık için kabul rubriği oluştur. Avatar kalitesini yalnız sessiz video izleyerek değerlendirme.

## Karar: B2B güveni kredi fiyatından önce gelir

İsmail'in B2B ürün anlatımı için avatar, tekrar kullanılabilir bir presenter formatı sağlayabilir. Yüksek marka riskinde her final insan onayından geçer. Sesi/yüzü temsil edilen kişinin yetkisi, sentetik içerik açıklaması ve ticari kullanım kapsamı üretim kaydına bağlanır. D05'teki $330/ay HeyGen kullanıcı deneyimi anekdottur; evrensel aylık maliyet değildir. Yüksek kalite avatar kredisi, render süresi ve tekrar sayısıyla bütçe modeli kur. [D03](#/sources?doc=D03) [D05](#/sources?doc=D05)
