## Yayın API'si bir dosya yükleme düğmesinden fazlasıdır

Her platformun OAuth izni, uygulama incelemesi, medya hazırlama, açıklama, durum sorgusu ve kota sözleşmesi farklıdır. D03 doğrudan API; D05 Postiz/Blotato/Upload-Post/Ayrshare gibi aracı servisleri birlikte değerlendirir. Aracı servis kullanmak hesap yetkisini, platform denetimini veya içerik onayını ortadan kaldırmaz.

## Uygulama: platform adaptörleri

| Platform         | İş akışı                                                                           | Kontrol noktası                                                                                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| YouTube          | Resumable upload / videos.insert → metadata → thumbnail → processing/status        | 17 Eylül kontrolünde videos.insert ve search.list ayrı ayrı varsayılan 100 çağrı/gün, çağrı başına 1 kota; eski 1.600 veya 100 birim/çağrı hesabı taşınmaz. Audit gereksinimi olan projelerde private kısıtı; kanal günlük yükleme sınırı quota'dan farklı |
| TikTok           | Creator info → kullanıcı tercihleri → publish init veya upload → transfer → status | Direct Post `video.publish` ve upload kapsamı ayrılır. Init limiti 6/dk/token doğrulandı; denetimsiz uygulamalar private kısıtlıdır                                                                                                                        |
| Instagram / Meta | Medya container oluştur → FINISHED durumunu bekle → publish → post ID doğrula      | Facebook Login / Instagram Login yolu ve hesap izinleri ayrı. D05'in “en fazla 90 sn” iddiası evrensel değil; doğrulanan Reels yolu 3 sn–15 dk                                                                                                             |
| LinkedIn         | Video upload başlat → dosya aktar → asset hazır olunca Posts API → sonuç izle      | Üye/kurum izinleri, caption ve thumbnail ayrı değerlendirilir; kişisel ve organization yetkisini karıştırma                                                                                                                                                |

TikTok'ta URL pull veya dosya upload/chunk yolu seçilir; URL sahipliği ve kaynak erişimi kontrol edilir. Her platformda zamanlanmış iş; onaylı `artifact_hash`, hedef hesap, yayın saati ve metadata sürümü taşır. API'nin 200 dönmesi videonun işlendiği veya halka açık olduğu anlamına gelmez. Kalıcı post ID ve son durum kaydedilmeden iş “yayında” sayılmaz.

### Aracı servislerin kaynak fiyatları

D05; **Blotato $29/ay ve dokuz platform**, **Upload-Post $24 aylık veya yıllık planda $16/ay; ücretsiz 10 upload/ay**, **Ayrshare $149/ay ve 30+ profil için farklı ücretleme**, **Postiz self-host ücretsiz veya cloud $29/ay**, **Mixpost $299 tek sefer** aktarır. Bunlar kaynak fiyat iddialarıdır; güncel satın alma teklifi değildir. Buffer, Metricool, Publer, Late ve SocialBee de alternatif olarak korunur; kaynağın vermediği kota/fiyat eklenmez.

Postiz, D05'te Docker ve 30+ MCP aracıyla; Mixpost Laravel tabanlı self-host olarak tarif edilir. Self-host yazılımın ücretsiz olması platform hesaplarının, uygulama incelemesinin ve sunucu bakımının ücretsiz olduğu anlamına gelmez. Ajana token vermek yerine dar “onaylı işi yayınla / durumunu oku” aracı sun.

[Güncel YouTube kota tablosu](https://developers.google.com/youtube/v3/determine_quota_cost) gövde/tablo düzeyinde bu ayrımı verir; sayfanın otomatik özetinde kalan eski 1.600 ifadesiyle çelişir. Proje konsolundaki atanmış limit ayrıca kontrol edilir.

## Karar: kota, rıza ve tekrar yayın koruması

D01'in 200/saat BUC, 60 günlük token ve yeni kanal ~20 upload/gün ifadeleri farklı limit türlerini bir araya getirir; evrensel kapasite hesabı yapılmaz. `uploadLimitExceeded` için retry fırtınası üretme; kanal durumunu incele. Token yenileme ve izin iptali ayrı alarmdır. D05'in 2–4 haftalık Meta review süresi SLA değildir.

Timeout sonrası tekrar POST etmeden önce platformdaki mevcut job/post ID sorgulanır. Yayın kaydı ve idempotency anahtarı ikinci kopyayı önler; platform desteklemiyorsa kendi tekilleştirme katmanın gerekir. “Shadowban %90” gibi kaynaktaki nedensellik iddiaları bağımsız kanıt değildir; erişim düşüşü içerik, hesap ve ölçüm penceresiyle incelenir. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03) [D05](#/sources?doc=D05)
