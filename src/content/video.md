## Karar: önce tek bir formatı uçtan uca çalıştır

Başlangıç için önerimiz, **30 saniyelik Türkçe bir B2B ürün anlatımı**: onaylı ürün bilgisi → senaryo → referans görseller → ses → altyazı → deterministik kurgu → önizleme → onay → tek platformda yayın. Bu bir tasarım önerisidir; gelir veya teslimat süresi garantisi değildir. Video kaynakları aynı noktada birleşiyor: üretim bileşenleri güçlü olsa da bütün zincirin güvenilirliği ayrı bir mühendislik işi. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03) [D05](#/sources?doc=D05)

İlk pilotta bir LLM, karşılaştırılan iki Türkçe ses sağlayıcısından biri ve tek render motoru yeterli. Ürün için onaylı görselleri kullan; jeneratif videoyu yalnızca anlatıya değer katan sahnelere ekle. Yayın hesabı ve uygulama izinlerini yaratıcı üretimle eşzamanlı hazırla.

## Beş üretim yaklaşımı

| Yaklaşım | En uygun kullanım | Sınırı | Pilot kararı |
|---|---|---|---|
| Stok + ses + altyazı | Basit açıklayıcı, düşük maliyetli kısa video | Anahtar kelimeye göre stok eşleşmesi anlatıyı kaçırabilir | Özgün analiz ve editoryal kontrolle dene |
| Avatar / sunucu | Eğitim, onboarding, B2B anlatım, lokalizasyon | Rıza, Türkçe telaffuz ve dudak uyumu | Gerçek izleyiciyle kör değerlendirme |
| Jeneratif sahneler | Ürün atmosferi, sinematik B-roll, kampanya | Sahne tutarlılığı, tekrar üretim maliyeti | Onaylı görselden kısa sahneler üret |
| Uzun içerikten kısa video | Webinar, podcast, mevcut demo | Kaynak materyal ve bağlamın korunması gerekir | Kaynak içerik varsa ilk aday |
| Programatik kurgu | Marka şablonu, ürün kataloğu, veri grafikleri | Yaratıcı varlıkları kendisi üretmez | Üretim hattının ortak temeli |

MoneyPrinterTurbo ve ShortGPT hızlı stok tabanlı başlangıç sağlar. OpenMontage kaynaklarda daha ajansal prodüksiyon örneği olarak sunuluyor; araç/skill sayıları ve olgunluk iddiaları bağımsız doğrulanmadı. Bir projeyi üretime alırken lisansı, güncelliği, kimlik doğrulaması ve bağımlılıkları ayrıca incele. [D01](#/sources?doc=D01) [D05](#/sources?doc=D05)

## Üretim hattının kalbi: timeline ve varlık manifestosu

Videonun esas kaydı yalnızca son MP4 olmamalı. Brief, senaryo sürümü, sahne kimliği, referans görsel, üretim denemeleri, ses, altyazı zamanları, timeline, onay ve platform gönderi kimliği birlikte tutulmalı. Sağlayıcı değiştiğinde bu kayıt korunur. [D03](#/sources?doc=D03)

**Şablonla başla:** Creatomate, Shotstack veya JSON2Video hızlı bir ilk hat için adaydır. React ile karmaşık grafik ve marka animasyonu gerekiyorsa Remotion; encode, mux, ölçekleme, ses ve teknik kontroller için FFmpeg değerlendir. Remotion’ın kaynak erişimi, MIT lisansı anlamına gelmez; şirket kullanımını lisans koşulları belirler. [Resmî lisans](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)

Sesi sahne sürelerinden bağımsız üretip sonradan rastgele sıkıştırma. Telaffuz sözlüğünü sürümle; Türkçe ürün adları, sayılar, kısaltmalar ve yabancı isimlerle test et. ASR/forced alignment çıktısını altyazıya dönüştür; satır uzunluğu, güvenli alan, okuma hızı ve son sözcüğün kesilmemesini kontrol et. Google TTS, ElevenLabs, Whisper/Scribe ve diğerleri kaynakların aday havuzudur; “Türkçede en iyi” kararı bu raporda ölçülmüş değildir. [D03](#/sources?doc=D03) [D05](#/sources?doc=D05)

## Yayınlamak da bir durum makinesi

YouTube, TikTok, Instagram/Facebook ve LinkedIn için ayrı adaptör kullan. Ortak arayüz; gönderim, durum sorgusu, token yenileme, hata sınıflandırma ve sonuç kaydını kapsasın. HTTP 200, videonun herkese açık olarak yayında olduğunu kanıtlamaz. Processing ve moderasyon durumunu izle. [D03](#/sources?doc=D03)

| Platform | Tasarımda korunacak ayrım | Doğrulama |
|---|---|---|
| YouTube | Proje kotası, kanal sınırı ve audit ayrı konular | Güncel tabloda videos.insert için 100 çağrı/gün; eski 1.600 birim hesabını kullanma |
| TikTok | Creator bilgisi, kullanıcı onayı, görünürlük, audit | Denetlenmemiş istemciler private ile sınırlı; init için token başına 6 istek/dk |
| Instagram | Container → processing → publish; login yolu ve scope | 90 saniye evrensel API sınırı değil; Meta örneği 3 sn–15 dk |
| LinkedIn | Medya upload ile post oluşturma farklı işlemler | Organizasyon/üye izinlerini ve kullanılan sürümü hesap üzerinde sınama |

[YouTube kota tablosu](https://developers.google.com/youtube/v3/determine_quota_cost) · [TikTok Direct Post](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post) · [Meta örneği](https://github.com/fbsamples/reels_publishing_apis/blob/main/insta_reels_publishing_api_sample/README.md)

Postiz, Blotato, Upload-Post ve Ayrshare ortak yayın katmanı adaylarıdır. Üçüncü taraf kullanmak hesap yetkilendirmesini, içerik sorumluluğunu veya tüm platform kısıtlarını ortadan kaldırmaz. Kaynaklardaki fiyat/plan ve denetim iddialarını sözleşme öncesi yeniden teyit et. [D05](#/sources?doc=D05)

## İki onay, dört kalite kontrolü

Senaryo onayı pahalı üretimden önce; final video onayı yayından önce gelir. Onay video sürümü ve hash’iyle eşleşmelidir. Onaydan sonra değişen çıktı tekrar incelenir.

- **Teknik:** codec, fps, oran, süre, bozuk kare, ses clipping ve sessizlik.
- **Anlamsal:** anlatılan ürün, sayı, vaat, görüntü ve senaryo uyumu.
- **Marka:** logo, yazı tipi, telaffuz, CTA, ton ve güvenli alan.
- **Haklar:** görsel/müzik lisansı, ses/yüz kullanımı, AI bildirimi ve platform koşulları.

Çok sahneli kimlik tutarlılığı, uzun videoda anlatı ritmi, yaratıcı renk düzenleme, beat-matching ve Türkçe avatar değerlendirmesi açık kalan kalite alanlarıdır. Teknik olarak tamamlanan üretimi otomatik olarak kabul edilmiş sayma. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03) [D05](#/sources?doc=D05)

## Başarı nasıl ölçülür?

Kabul edilen saniye başına tüm üretim harcaması, insan düzeltme süresi, ret oranı, p50/p95 iş süresi ve başarılı yayın oranı temel operasyon metrikleridir. İçerik etkisini izlenme süresi, tutulma, tıklama ve ürün dönüşümüyle ayrıca değerlendir. “Ayda şu kadar gelir” veya sabit bir RPM, bu kaynaklardan güvenilir iş sonucu olarak çıkarılamaz.
