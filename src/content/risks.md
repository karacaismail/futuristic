## Kritik ayrım: belgede geçmesi, doğrulanmış olması değil

Altı kaynak birbirini destekleyen mimari öneriler yanında çelişkili fiyat, tarih, limit ve benchmark iddiaları da içeriyor. Kaynak kütüphanesinde orijinal metinler değiştirilmeden saklandı. Bu rapor ise **doğrulanmış bilgi**, **düzeltilmiş iddia**, **kaynak aktarımı** ve **tasarım önerisini** birbirinden ayırıyor.

## Öncelikli risk kaydı

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

Bu risk öncelikleri analitik sentezdir; ölçülmüş olasılık yüzdeleri değildir. [D01](#/sources?doc=D01) [D02](#/sources?doc=D02) [D03](#/sources?doc=D03) [D04](#/sources?doc=D04) [D05](#/sources?doc=D05) [D06](#/sources?doc=D06)

## Provenans, bildirim ve haklar

C2PA içerik geçmişinin doğrulanabilir kaydını, watermark ise farklı bir işaretleme mekanizmasını temsil eder. Yeniden kodlama veya düzenleme sonrası imzanın/manifestonun geçerliliği ayrıca sınanmalıdır; basit metadata pass-through bütün provenansı koruma garantisi değildir. Yayın platformunun AI bildirimi de ayrı bir adımdır. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03)

YouTube’un 15 Temmuz 2025 tarihli güncellemesi tekrarlı/kitlesel içerik konusunu açıklar. AI kullanmak tek başına para kazanmayı engellemez; özgün yorum, anlatı ve izleyiciye değer esas alınır. Kaynaklardaki “AI etiketini kaybetmek otomatik %90 erişim düşüşü yaratır” veya “repost kesin shadowban getirir” ifadelerine doğrulanmış platform kuralı olarak yer vermiyoruz. [YouTube politikası](https://support.google.com/youtube/answer/1311392)

EU AI Act’te sağlayıcı ve kullanan tarafın sorumlulukları farklıdır. Konsolide metin, 2 Ağustos 2026 öncesinde piyasaya sunulmuş ilgili sistemlerin sağlayıcılarına Madde 50(2) için 2 Aralık 2026’ya kadar geçiş verir. Her AI medyası için aynı teknik işaretin zorunlu olduğu çıkarımı yapılmamalı; kapsam ve istisnalar kullanım özelinde değerlendirilir. [Konsolide mevzuat](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng)

Gerçek kişinin sesini/yüzünü, kişisel logları ve müşteri belgelerini kullanırken hak, rıza ve veri aktarımı koşulları netleştirilmelidir. Müzik için platform, kanal, ticari kullanım ve abonelik sonrasındaki hakları kayıt altına al. Suno/Udio, Artlist veya Epidemic planlarıyla ilgili kaynak fiyatları ve davalara dair tarihsel iddialar güncel sözleşme yerine geçmez. [D04](#/sources?doc=D04) [D05](#/sources?doc=D05)

## Henüz bilmediğimiz şeyler

Günlük hacim, eşzamanlı iş, hedef platform, ortalama süre, marka sayısı, bütçe, veri ikameti, onay SLA’sı, telif kapsamı ve gerçek izleyici tepkisi belirlenmeden “en iyi stack” kararı kesinleşmez.

Yazılım tarafında da repo büyüklüğü, mevcut test kalitesi, gerçek aylık token kullanımı, cache oranı, inceleme yükü ve self-host bakım kapasitesi ölçülmelidir. D06’daki 15 ajan ve GPU donanımı anlatımı, bu portalın kullanıcısına ait doğrulanmış canlı kapasite verisi değildir.

## Karara taşınmayan sayısal iddialar

Kaynaklarda geçen model liderlik skorları, GitHub yıldızları, API/abonelik fiyatları, sabit GPU break-even eşiği, gelir/RPM projeksiyonları ve güvenlik açıklarına ait başarı yüzdeleri topluca yeniden doğrulanmadı. Bunlar tam metin arşivinde bulunur; dashboard’da doğrulanmış istatistik olarak kullanılmaz.

Benzer şekilde “Q8 kayıpsızdır”, “KV cache context ile logaritmik büyür”, “MCP halüsinasyonu engeller” ve “bir araç tek başına güvenliği garanti eder” türü genellemeler karar temeli değildir. Donanım kapasitesi ve kaliteyi seçilen runtime, model ve iş yükünde ölçmek gerekir.
