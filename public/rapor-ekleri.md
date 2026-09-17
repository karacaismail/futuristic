# Futuristic — Tam veri ve kaynak ekleri

**17 Eylül 2026 · v2.1**

[Yönetici özeti](yonetici-ozeti.md) · [Araştırma raporu](rapor.md) · [Tam ekler](rapor-ekleri.md)

39 araç kaydında fiyat; 37 kayıtta lisans, açık kaynak sınıflandırması veya kullanım koşulu bilgisi var. Bilgi varlığı bağımsız doğrulama değildir. Araştırma raporu uygulama rehberlerini; tam ekler araç verileri, sayısal iddialar ve referans indeksini içerir.

## A. Katalog okuma anahtarı

Eksik fiyat ücretsiz anlamına gelmez. Kod lisansı, model ağırlığı, medya hakkı ve hizmet sözleşmesi ayrı konulardır. Kaynakta bulunmayan alanlar aşağıdaki dökümde doldurulmaz; sitede eksikliği açıkça gösterilir. Tarihli kaynak bilgisi ürün garantisi değildir.

Ortak çalışma desenleri editoryal sentezdir, araçların yerleşik özellikleri olarak sayılmaz. Genel entegrasyon ilkesi: domain sözleşmesi, credential, job durumu, retry ve onayı sağlayıcı adaptöründen bağımsız tasarla. Seçim ölçütü: mevcut stack’teki somut açığı ilgili rehberin kabul testleriyle ölç. Bu genel ilkeler her araç için tekrarlanmaz.

- **W1:** Sahne sözleşmesi → model/adaptör çağrısı → job takibi → asset/QC → render.
- **W2:** Onaylı metin/ses ve rıza → async avatar → telaffuz/lip-sync → final onay.
- **W3:** İzinli metin/ses → üretim/transkripsiyon → hizalama → Türkçe/QC → timeline.
- **W4:** İzinli varlık + timeline/template → render → teknik/marka QC → onaylı çıktı.
- **W5:** Aynı görev seti → model/quantization → 1/4/8/15 yük → kalite/bellek/maliyet ölçümü.
- **W6:** Onaylı artifact hash → platform adaptörü → status/post ID → analytics.
- **W7:** Olay → şemalı girdi → kalıcı durum → dar araç → retry/onay → ölçüm.
- **W8:** Kabul kriteri → izole görev → failing test → küçük patch → check/diff → review.
- **W9:** Görev/diff/finding → bağımsız kontrol → test/bulgu → patch → yeniden doğrulama.
- **W10:** İhtiyacı tanımla → kaynak/sürüm/izin kontrolü → dar adaptör veya çalışma alanı → test/kanıt → sınırlı pilot.

## B. Araç ve teknoloji kayıtları

### T01 · Veo

**Video · Bulut · D01, D03, D05**

Görsel ve metinden sahne üretimi. Ürün atmosferi ve kontrollü kısa planlar

- **Fiyat ve birim:** D05 $0,75/sn ve Fast $0,15/sn; 30 saniye × $0,75 = $22,50. Güncel teklif değil.
- **Sınırlar:** Sürüm, bölge, süre ve tekrar üretim maliyeti
- **Entegrasyon:** D03: T2V, I2V, first/last frame, extend, reference image, ses; API erişimi kaynakta mevcut olarak işaretlenmiş.
- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T01) · [Araç bağlantısı](https://cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate)

### T02 · Runway

**Video · Bulut · D01, D03, D05**

Jeneratif video ve dönüşüm. API ile sahne üretimi

- **Fiyat ve birim:** Kontrol edilen API tablosu: kredi $0,01; Gen-4.5 12 kredi/sn, Veo 3.1 sesli 40 kredi/sn.
- **Sınırlar:** Model ve endpoint özellikleri ayrı doğrulanmalı
- **Entegrasyon:** D03: T2V/I2V/V2V, çoklu model, audio, references, HDR/format conversion; API erişimi kaynakta mevcut olarak işaretlenmiş.
- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T02) · [Araç bağlantısı](https://docs.dev.runwayml.com/)

### T03 · Luma

**Video · Bulut · D03, D05**

Sahne üretimi ve video dönüşümü. Görselden video pilotu

- **Sınırlar:** Asenkron job ve kalite değişkenliği
- **Entegrasyon:** D03: T2V, I2V, modify video, camera control, reframe, audio; API erişimi kaynakta mevcut olarak işaretlenmiş.
- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T03) · [Araç bağlantısı](https://docs.lumalabs.ai/)

### T04 · Kling

**Video · Bulut · D01, D03, D05**

Jeneratif sahne ve hareket kontrolü. Ürün referansı ile sahne karşılaştırması

- **Fiyat ve birim:** D05 Kling 3.0: yaklaşık $0,10/sn; ModelsLab / fal.ai erişimi. Kaynak fiyatı, güncel teklif değildir.
- **Sınırlar:** API erişimi, lisans ve model sürümü
- **Entegrasyon:** D03: T2V, I2V, video editing, motion control, avatar; Kling Video 3.0/Omni; API erişimi kaynakta mevcut olarak işaretlenmiş.
- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T04) · [Araç bağlantısı](https://kling.ai/)

### T05 · MiniMax / Hailuo

**Video · Bulut · D03, D05**

Video ve ses ailesi. Tek sağlayıcıyla video/ses pilotu

- **Sınırlar:** Model ve ücretleri ayrı değerlendirmek gerekir
- **Entegrasyon:** D03: H3/Hailuo: T2V, I2V, first-last frame, multimodal references; API erişimi kaynakta mevcut olarak işaretlenmiş.
- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T05) · [Araç bağlantısı](https://platform.minimax.io/)

### T06 · Adobe Firefly

**Video · Bulut · D03**

Görsel, video ve yaratıcı servisler. Adobe üretim ekosistemi

- **Sınırlar:** UI özellikleri API kapsamını garanti etmez
- **Entegrasyon:** D03: Generate/edit image, video, audio, avatar; API erişimi kaynakta mevcut olarak işaretlenmiş.
- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T06) · [Araç bağlantısı](https://developer.adobe.com/firefly-services/docs/firefly-api/)

### T07 · HeyGen

**Avatar · Bulut · D03, D05**

Sunucu, çeviri ve avatar. B2B anlatım ve lokalizasyon

- **Fiyat ve birim:** D05 Creator $29/ay yıllık; Avatar V API $0,05/sn. UI/API ayrı.
- **Sınırlar:** D03 175+ dil, batch 100; Türkçe/lip-sync ve API concurrency ayrı ölçülür.
- **Entegrasyon:** D03: Güçlü REST + webhook + batch + CLI/MCP.
- **Ortak desen:** W2

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T07) · [Araç bağlantısı](https://docs.heygen.com/)

### T08 · Synthesia

**Avatar · Bulut · D03, D05**

Metinden sunuculu video. Eğitim ve onboarding

- **Fiyat ve birim:** D05 Starter ~$18/ay yıllık; D03 free 10 dk/ay.
- **Sınırlar:** Yaratıcı kontrol ve sözleşme kapsamı
- **Entegrasyon:** D03: Script → presenter video, custom avatar, localization, brand kit, analytics; API erişimi kaynakta mevcut olarak işaretlenmiş.
- **Ortak desen:** W2

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T08) · [Araç bağlantısı](https://docs.synthesia.io/)

### T09 · Tavus

**Avatar · Bulut · D03, D05**

Etkileşimli video persona. Canlı konuşan avatar

- **Sınırlar:** Offline video render ile aynı kullanım değil
- **Entegrasyon:** D03: Real-time conversational video/persona; API erişimi kaynakta mevcut olarak işaretlenmiş.
- **Ortak desen:** W2

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T09) · [Araç bağlantısı](https://docs.tavus.io/)

### T10 · ElevenLabs

**Ses · Bulut · D01, D03, D05**

TTS, dublaj ve transkripsiyon. Türkçe ses karşılaştırması

- **Fiyat ve birim:** D05 free 10.000 karakter/ay; ücret model/voice/plan bazında.
- **Sınırlar:** Telaffuz ve ses hakkı ayrıca değerlendirilir
- **Entegrasyon:** D03: Evet; API erişimi kaynakta mevcut olarak işaretlenmiş.
- **Ortak desen:** W3

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T10) · [Araç bağlantısı](https://elevenlabs.io/docs)

### T11 · Google Cloud TTS

**Ses · Bulut · D03, D05**

Metinden konuşma. Türkçe ses ve SSML tabanlı akış

- **Sınırlar:** Seçilen ses/model bazında ölçüm
- **Entegrasyon:** D03: REST/gRPC.
- **Ortak desen:** W3

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T11) · [Araç bağlantısı](https://cloud.google.com/text-to-speech/docs)

### T12 · OpenAI TTS

**Ses · Bulut · D03, D05**

Metinden konuşma. LLM ile ortak sağlayıcı akışı

- **Sınırlar:** Ses seçenekleri ve fiyatı model bazında teyit
- **Entegrasyon:** D03: Evet; API erişimi kaynakta mevcut olarak işaretlenmiş.
- **Ortak desen:** W3

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T12) · [Araç bağlantısı](https://platform.openai.com/docs/guides/text-to-speech)

### T13 · Whisper

**Ses · Yerel · D05**

Sesin metne dökülmesi. Altyazı üretimi ve kontrol

- **Sınırlar:** Hizalama, özel terim ve konuşma kalitesi
- **Ortak desen:** W3

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T13) · [Araç bağlantısı](https://github.com/openai/whisper)

### T14 · Remotion

**Kurgu · Yerel · D01, D03, D05**

React ile programatik video. Marka motion sistemi ve veri grafikleri

- **Fiyat ve birim:** D05 $25/seat veya $0,01/render, min $100/ay; ücretsiz koşullar ayrıca.
- **Lisans / haklar / sınıflandırma:** Özel ticari lisans; birey/≤3 çalışan ücretsiz koşulu V09’da kontrol edildi. MIT değil.
- **Sınırlar:** Şirket lisansı ve render operasyonu
- **Entegrasyon:** D03: React/programmatic.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T14) · [Araç bağlantısı](https://github.com/remotion-dev/remotion)

### T15 · FFmpeg

**Kurgu · Yerel · D01, D03, D05**

Encode, filtre, ses ve mux. Deterministik medya işlemleri

- **Lisans / haklar / sınıflandırma:** Build seçeneklerine göre LGPL/GPL ve codec yükümlülükleri incelenir.
- **Sınırlar:** Yaratıcı sahne üretmez; build lisansı incelenir
- **Entegrasyon:** D03: CLI/library.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T15) · [Araç bağlantısı](https://ffmpeg.org/)

### T16 · Shotstack

**Kurgu · Bulut · D03, D05**

JSON timeline ve cloud render. API ile hızlı üretim hattı

- **Fiyat ve birim:** D05 $0,30/dk PAYG; $39/ay planda $0,20/dk.
- **Sınırlar:** Kullanım maliyeti ve sağlayıcı bağımlılığı
- **Entegrasyon:** D03: REST, JSON timeline, templates, callbacks, SDK.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T16) · [Araç bağlantısı](https://shotstack.io/docs/)

### T17 · Creatomate

**Kurgu · Bulut · D03, D05**

Şablon ve JSON ile render. Sosyal video varyantları

- **Fiyat ve birim:** D05 $49–54/ay, 2.000 kredi; ~720p dakika 14 kredi.
- **Sınırlar:** Kredi modeli ve template sınırları
- **Entegrasyon:** D03: REST, SDK, Zapier/Make/n8n.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T17) · [Araç bağlantısı](https://creatomate.com/docs/api/introduction)

### T18 · JSON2Video

**Kurgu · Bulut · D03, D05**

JSON ile sahne birleştirme. Basit otomatik video şablonları

- **Fiyat ve birim:** D05 $49,95/ay/200 dk Full HD; ücretsiz 600 kredi; 4K = 4×.
- **Sınırlar:** Render ve çözünürlük maliyeti
- **Entegrasyon:** D03: REST, webhook; Make/n8n.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T18) · [Araç bağlantısı](https://json2video.com/docs/)

### T19 · auto-editor

**Kurgu · Yerel · D03**

Sessizlik tabanlı otomatik kesim. Konuşma içeriklerini temizleme

- **Sınırlar:** Anlatı/viral an seçiminin yerine geçmez
- **Entegrasyon:** D03: CLI.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T19) · [Araç bağlantısı](https://github.com/WyattBlue/auto-editor)

### T20 · OpusClip

**Kurgu · Bulut · D03, D05**

Uzun videodan kısa kesitler. Podcast ve webinar yeniden kullanımı

- **Fiyat ve birim:** D05 Starter $15/ay; API planı D03 ile çelişiyor.
- **Sınırlar:** D03 public/Pro API30req/dk/key; D05 API Business. Çelişki çözülmedi.
- **Entegrasyon:** D03: Public API.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T20) · [Araç bağlantısı](https://www.opus.pro/)

### T21 · MoneyPrinterTurbo

**Kurgu · Yerel · D01, D05**

Stok, ses ve altyazı otomasyonu. Hızlı faceless pilot

- **Lisans / haklar / sınıflandırma:** D05 MoneyPrinterTurbo deposunu MIT lisanslı olarak bildiriyor; bağımsız lisans kontrolü yapılmadı.
- **Sınırlar:** D05: dahili kimlik doğrulama yok; üçüncü taraf API anahtarları ve büyük Whisper indirmesi gerekir. İmaj sürümünü sabitle, izole ortam ve dar yetki kullan.
- **Olgunluk değerlendirmesi:** D05: v1.3.6, 2 Eylül 2026; 119.000 yıldız / 18.200 fork. Tarihli kaynak iddiasıdır; popülerlik bakım garantisi değildir.
- **Entegrasyon:** D05: Python/FastAPI/Streamlit; WebUI, REST, CLI, AI-agent arayüzü ve Docker. Yayın için üçüncü taraf upload servisi gerekir.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T21) · [Araç bağlantısı](https://github.com/harry0703/MoneyPrinterTurbo)

### T22 · ShortGPT

**Kurgu · Yerel · D01, D05**

Programlanabilir kısa video üretimi. Stok ve dublaj deneyleri

- **Sınırlar:** Bağımlılık ve bakım durumunu incele
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T22) · [Araç bağlantısı](https://github.com/RayVentura/ShortGPT)

### T23 · ComfyUI

**Model · Yerel · D03, D05**

Düğüm tabanlı inference workflow. Yerel video/görsel GPU üretimi

- **Lisans / haklar / sınıflandırma:** D03 çekirdek GPL-3.0; node ve model ağırlığı ayrı.
- **Sınırlar:** İleri workflow için D03 32 GB+ VRAM/100 GB+ disk örneği; bütün kurulumların minimumu değil. Model/node lisansı ve VRAM ayrıca.
- **Entegrasyon:** D03: API + workflow JSON nedeniyle self-hosted generation gateway için güçlü aday.
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T23) · [Araç bağlantısı](https://github.com/Comfy-Org/ComfyUI)

### T24 · LTX-2

**Model · Yerel · D03, D05**

Video ve ses üretim modeli. Hibrit GPU pilotu

- **Sınırlar:** Ağırlık lisansı ve donanım benchmark’ı
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T24) · [Araç bağlantısı](https://github.com/Lightricks/LTX-2)

### T25 · Wan 2.2

**Model · Yerel · D03, D05**

Açık video model ailesi. Yerel sahne üretimi

- **Fiyat ve birim:** D05 Wan 2.2: yaklaşık $0,05/sn; RunPod için $0,25–0,60/klip. GPU, süre ve sağlayıcı farklıdır; kaynak fiyatıdır.
- **Sınırlar:** Daha yeni Wan sürümlerine lisansı genelleme
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T25) · [Araç bağlantısı](https://github.com/Wan-Video/Wan2.2)

### T26 · HunyuanVideo

**Model · Yerel · D03, D05**

Video üretim modeli. GPU tabanlı araştırma/pilot

- **Sınırlar:** Donanım ve ticari kullanım koşulları
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T26) · [Araç bağlantısı](https://github.com/Tencent-Hunyuan/HunyuanVideo)

### T27 · CogVideo

**Model · Yerel · D03, D05**

Video üretim ve ince ayar. Kontrollü açık model deneyi

- **Sınırlar:** Model/weight lisansı ve kaynak ihtiyacı
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T27) · [Araç bağlantısı](https://github.com/zai-org/CogVideo)

### T28 · Postiz

**Yayın · Hibrit · D05**

Sosyal içerik planlama. Kontrollü self-host yayın katmanı

- **Fiyat ve birim:** D05 self-host ücretsiz, cloud $29/ay.
- **Lisans / haklar / sınıflandırma:** D05 Postiz’i açık kaynak/self-host olarak sınıflandırıyor; kesin lisans sürümü kaynakta belirtilmiyor.
- **Sınırlar:** Platform uygulama ve OAuth gereksinimleri
- **Ortak desen:** W6

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T28) · [Araç bağlantısı](https://github.com/gitroomhq/postiz-app)

### T29 · Blotato

**Yayın · Bulut · D05**

Çoklu sosyal yayın katmanı. Entegrasyon pilotunu hızlandırma

- **Fiyat ve birim:** D05 $29/ay, dokuz platform.
- **Sınırlar:** Hesap izinlerini ve plan kapsamını teyit et
- **Ortak desen:** W6

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T29) · [Araç bağlantısı](https://blotato.com/)

### T30 · Upload-Post

**Yayın · Bulut · D01, D05**

Sosyal yayın API katmanı. Dar kapsamlı yayın pilotu

- **Fiyat ve birim:** D05 aylık $24, yıllık $16/ay; ücretsiz 10 upload/ay.
- **Sınırlar:** Kota, desteklenen platform ve plan
- **Ortak desen:** W6

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T30) · [Araç bağlantısı](https://upload-post.com/)

### T31 · Ayrshare

**Yayın · Bulut · D05**

Birleşik sosyal API. Çoklu müşteri/hesap entegrasyonu

- **Fiyat ve birim:** D05 $149/ay; 30+ profil için farklı ücretleme.
- **Sınırlar:** Profil bazlı maliyet ve sözleşme
- **Ortak desen:** W6

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T31) · [Araç bağlantısı](https://www.ayrshare.com/)

### T32 · n8n

**Orkestrasyon · Hibrit · D01, D03, D05, D06**

Webhook ve deterministik iş akışı. Video hattı, CI bildirimleri ve onay

- **Lisans / haklar / sınıflandırma:** Fair-code / Sustainable Use koşulları; açık kaynak ile eşitlenmez.
- **Sınırlar:** Fair-code lisans; queue ve secrets yönetimi
- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T32) · [Araç bağlantısı](https://docs.n8n.io/)

### T33 · Temporal

**Orkestrasyon · Hibrit · D03, D05**

Kalıcı ve uzun süreli workflow. Kritik asenkron üretim işleri

- **Sınırlar:** Yeni altyapı ve deterministik workflow disiplini
- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T33) · [Araç bağlantısı](https://docs.temporal.io/workflows)

### T34 · Make / Zapier

**Orkestrasyon · Bulut · D03, D05**

Görsel SaaS otomasyonu. Düşük hacimli iş sistemi bağlantıları

- **Sınırlar:** İşlem maliyeti ve taşınabilirlik
- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T34) · [Araç bağlantısı](https://www.make.com/)

### T35 · OpenClaw

**Orkestrasyon · Yerel · D05, D06**

Araç kullanan otonom ajan. Triage, öneri ve mesajlaşma

- **Lisans / haklar / sınıflandırma:** D06 MIT; eklenti/skill ve model şartları ayrı.
- **Sınırlar:** Güçlü araç erişimi; izolasyon ve izin denetimi
- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T35) · [Araç bağlantısı](https://github.com/openclaw/openclaw)

### T36 · LangGraph

**Orkestrasyon · Yerel · D04, D05, D06**

Durumlu ajan grafı. Gerçek dallanan ajan iş akışları

- **Sınırlar:** Küçük ihtiyaçta ek karmaşıklık
- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T36) · [Araç bağlantısı](https://github.com/langchain-ai/langgraph)

### T37 · Codex

**Kodlama · Hibrit · D04, D06**

Repo, terminal ve test ajanı. Tanımlı bug, refactor ve test görevleri

- **Fiyat ve birim:** D06 ChatGPT $20/$100/$200 planları ve API ayrı.
- **Lisans / haklar / sınıflandırma:** D04 CLI açık kaynak, modeller/hizmet proprietary; runtime ile hizmet lisansı ayrı.
- **Sınırlar:** İzin, ortam ve model kapasitesi ayrı konular
- **Olgunluk değerlendirmesi:** D04 yüksek ve hızlı gelişen ürün değerlendirmesi; kaynakta Security beta sonuçları vendor ölçümüdür.
- **Entegrasyon:** D04 karşılaştırma tablosu: CLI, Codex app/cloud, API/SDK, GitHub, Slack.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T37) · [Araç bağlantısı](https://github.com/openai/codex)

### T38 · Claude Code

**Kodlama · Hibrit · D02, D06**

Terminal ve araç kullanan ajan. Bağlamlı repo geliştirme

- **Fiyat ve birim:** D06 Max $100/$200; API model token fiyatı ayrı.
- **Sınırlar:** Hooks ve alt ajan izinleri gözden geçirilmeli
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T38) · [Araç bağlantısı](https://code.claude.com/docs/)

### T39 · Cursor

**Kodlama · Bulut · D02, D04, D06**

Ajan odaklı IDE. Etkileşimli geliştirme ve repo keşfi

- **Fiyat ve birim:** D04 $20/$60/$200; D06 plan/concurrency teyidi.
- **Lisans / haklar / sınıflandırma:** D04 proprietary.
- **Sınırlar:** Kota, ortam erişimi ve review yükü
- **Olgunluk değerlendirmesi:** D04 çok yüksek ürün olgunluğu değerlendirmesi; plan/kota ve cloud worker yetkileri ayrıca.
- **Entegrasyon:** D04 karşılaştırma tablosu: Cursor IDE, Git, MCP, cloud agents.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T39) · [Araç bağlantısı](https://cursor.com/)

### T40 · GitHub Copilot

**Kodlama · Bulut · D04, D06**

IDE, review ve repo ajanı. GitHub merkezli geliştirme

- **Fiyat ve birim:** D04 $10/$39 plan örnekleri.
- **Lisans / haklar / sınıflandırma:** D04 proprietary SaaS. Model, platform ve plan koşulları ayrı.
- **Sınırlar:** Review tam hata kapsamı sağlamaz
- **Olgunluk değerlendirmesi:** D04 analitik sınıflandırması: çok yüksek. Bu kaynak değerlendirmesi bağımsız ürün sertifikası değildir.
- **Entegrasyon:** D04 karşılaştırma tablosu: GitHub, VS Code, Visual Studio, JetBrains, Xcode, Neovim ve diğer IDE’ler; MCP.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T40) · [Araç bağlantısı](https://docs.github.com/en/copilot)

### T41 · Aider

**Kodlama · Yerel · D02, D04, D06**

Git ile çalışan terminal ajanı. Model bağımsız küçük değişiklikler

- **Lisans / haklar / sınıflandırma:** D04 Apache-2.0; D02 lisans anlatımıyla uyuşmazlık varsa kullanılan sürümün LICENSE dosyası esas alınır.
- **Sınırlar:** Doğru context ve test altyapısı gerekir
- **Olgunluk değerlendirmesi:** D04 yazarının değerlendirmesi: Çok pragmatik, model-agnostic CLI. Bağımsız olgunluk ölçümü değildir.
- **Entegrasyon:** D04 karşılaştırma tablosu: Local Git repo, repo map, auto-commit.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T41) · [Araç bağlantısı](https://github.com/Aider-AI/aider)

### T42 · OpenHands

**Kodlama · Yerel · D02, D04, D06**

Yazılım ajan platformu. İzole görev ve özelleştirme

- **Lisans / haklar / sınıflandırma:** D04 açık kaynak olarak belirtiliyor; belirli SDK/runtime lisans sürümünü ayrıca kontrol et.
- **Sınırlar:** Sandbox kurulumu ve operasyon
- **Olgunluk değerlendirmesi:** D04 yazarının değerlendirmesi: Agent araştırması, self-host ve özelleştirme. Bağımsız olgunluk ölçümü değildir.
- **Entegrasyon:** D04 karşılaştırma tablosu: Python/TypeScript/REST, repo automation.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T42) · [Araç bağlantısı](https://github.com/OpenHands/openhands)

### T43 · Qwen Code / Coder

**Kodlama · Yerel · D04, D06**

Ajan runtime’ı ve ayrı model ailesi. Açık ekosistem coding pilotu

- **Lisans / haklar / sınıflandırma:** D04 Qwen Code runtime Apache-2.0; Coder model ağırlığı artifact koşulları ayrı.
- **Sınırlar:** Runtime ile model ağırlığı lisansı farklı
- **Olgunluk değerlendirmesi:** D04 yazarının değerlendirmesi: Güçlü açık agent shell. Bağımsız olgunluk ölçümü değildir.
- **Entegrasyon:** D04 karşılaştırma tablosu: CLI, editor, desktop/browser, MCP, local modeller.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T43) · [Araç bağlantısı](https://github.com/QwenLM/qwen-code)

### T44 · Spec Kit

**Kodlama · Yerel · D06**

Spec, plan ve task iş akışı. Uzun ömürlü ve çok modüllü geliştirme

- **Sınırlar:** Küçük görevlerde ek süreç yükü
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T44) · [Araç bağlantısı](https://github.com/github/spec-kit)

### T45 · Playwright

**Kalite · Yerel · D04, D06**

Tarayıcı akışı ve E2E testi. Mobil/masaüstü davranış doğrulama

- **Sınırlar:** Test senaryosu ve assertion kalitesi önemli
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T45) · [Araç bağlantısı](https://playwright.dev/)

### T46 · CodeRabbit

**Kalite · Bulut · D02, D04, D06**

PR bağlamında AI inceleme. Review kuyruğuna yardımcı ilk katman

- **Fiyat ve birim:** D04/D06 yıllık faturalamada $24/$48/$72 kişi-ay.
- **Lisans / haklar / sınıflandırma:** D04 proprietary.
- **Sınırlar:** D06 %49,2 precision; yorum yoğunluğu ve kendi PR’ında gerçek hata oranı.
- **Olgunluk değerlendirmesi:** D04 yüksek olgunluk değerlendirmesi; D06 precision kendi PR’larında yeniden ölçülmeli.
- **Entegrasyon:** D04 karşılaştırma tablosu: GitHub/GitLab, PR workflow, Jira/Linear.
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T46) · [Araç bağlantısı](https://coderabbit.ai/)

### T47 · Qodo

**Kalite · Bulut · D02, D04, D06**

Kod kalitesi, test ve review. Kurala dayalı doğrulama pilotu

- **Lisans / haklar / sınıflandırma:** D04 proprietary.
- **Sınırlar:** Vendor metrikleri bağımsız ölçüm değil
- **Olgunluk değerlendirmesi:** D04 yüksek olgunluk değerlendirmesi. Eğitimde kod kullanmama beyanı vendor beyanıdır.
- **Entegrasyon:** D04 karşılaştırma tablosu: IDE, Git, CI, organization rules.
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T47) · [Araç bağlantısı](https://www.qodo.ai/)

### T48 · Semgrep

**Kalite · Hibrit · D02, D04, D06**

Statik güvenlik ve triage. CI ve agent değişikliklerini tarama

- **Lisans / haklar / sınıflandırma:** D04 open-core/commercial platform; kullanılan tarayıcı/servis paketi ayrı.
- **Sınırlar:** Kural kapsamı ve veri akışı sınırları
- **Olgunluk değerlendirmesi:** D04 çok yüksek AppSec olgunluğu değerlendirmesi.
- **Entegrasyon:** D04 karşılaştırma tablosu: IDE, agent hooks, MCP, CI, PR.
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T48) · [Araç bağlantısı](https://semgrep.dev/)

### T49 · SonarQube

**Kalite · Hibrit · D02**

Kalite kapısı ve teknik borç. Kurumsal kod kalite görünürlüğü

- **Sınırlar:** AI doğruluğu veya güvenlik garantisi değil
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T49) · [Araç bağlantısı](https://www.sonarsource.com/products/sonarqube/)

### T50 · Sentry Seer

**Kalite · Bulut · D04, D06**

Telemetry bağlamında hata araştırması. Production hata → kanıt → fix adayı

- **Lisans / haklar / sınıflandırma:** D04 proprietary hizmet.
- **Sınırlar:** Kaliteli log/trace ve veri maskeleme gerekir
- **Olgunluk değerlendirmesi:** D04 yüksek olgunluk değerlendirmesi.
- **Entegrasyon:** D04 karşılaştırma tablosu: Sentry, GitHub, Slack, MCP, coding agents.
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T50) · [Araç bağlantısı](https://docs.sentry.io/product/ai-in-sentry/)

### T51 · Context7

**Kodlama · Bulut · D06**

Kütüphane dokümantasyonunu getirme. Sürüm bağlamı ve API araştırması

- **Sınırlar:** Dönen veri doğrulanmalı; halüsinasyonu sıfırlamaz
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T51) · [Araç bağlantısı](https://github.com/upstash/context7)

### T52 · vLLM / SGLang

**Model · Yerel · D02, D06**

Yüksek verimli model serving. Eşzamanlı self-host ajan pilotu

- **Sınırlar:** KV cache, batching, GPU ve bakım maliyeti
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T52) · [Araç bağlantısı](https://github.com/vllm-project/vllm)

### T53 · MLX / Ollama

**Model · Yerel · D02, D06**

Yerel model çalıştırma. Mac/kişisel ortamda gizli veri pilotu

- **Sınırlar:** Belleğe sığmak hedef gecikmeyi garanti etmez
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T53) · [Araç bağlantısı](https://github.com/ml-explore/mlx)

### T54 · LlamaIndex / Haystack

**Orkestrasyon · Yerel · D04**

Bilgi getirme ve veri pipeline’ı. Repo dışı kurumsal bilgi

- **Lisans / haklar / sınıflandırma:** D04 LlamaIndex MIT, Haystack Apache-2.0; paket sürümü kontrol edilir.
- **Sınırlar:** Gereksiz RAG eklemek context ve bakım yükü yaratır
- **Entegrasyon:** D04: LlamaIndex — RAG, parsing, indexing, agents; Haystack — retrieval, routing, memory, multimodal, agents.
- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T54) · [Araç bağlantısı](https://github.com/run-llama/llama_index)

### T55 · SWE-agent

**Kodlama · Yerel · D04**

Araştırma amaçlı repo ajanı. Harness ve agent deneyleri

- **Lisans / haklar / sınıflandırma:** D04 OSS araştırma framework’ü; belirli repo/sürüm lisansı kontrol edilir.
- **Sınırlar:** Benchmark başarısı ürün ROI’si değildir
- **Olgunluk değerlendirmesi:** D04 yazarının değerlendirmesi: Agent mimarisi ve evaluation için önemli. Bağımsız olgunluk ölçümü değildir.
- **Entegrasyon:** D04 karşılaştırma tablosu: GitHub issue → patch, shell/tools.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T55) · [Araç bağlantısı](https://github.com/swe-agent/swe-agent)

### T56 · Diffblue Cover

**Kalite · Hibrit · D04**

Java unit test üretimi ve bakımı. 

- **Lisans / haklar / sınıflandırma:** D04 commercial.
- **Sınırlar:** Java odaklı; FastAPI/React için aynı çözüm değil. Üretilen test semantiği kontrol edilir.
- **Olgunluk değerlendirmesi:** D04 yüksek ama dar Java kapsamı.
- **Entegrasyon:** D04 karşılaştırma tablosu: Java build/test sistemleri, CI.
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T56)

### T57 · Greptile

**Kalite · Bulut · D02, D06**

Codebase indeksleme ve cross-file PR inceleme. 

- **Sınırlar:** D06 %82 recall vendor iddiası; yanlış pozitif ve repo indeks gizliliği ölçülmeli.
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T57)

### T58 · OpenRouter

**Model · Bulut · D06**

Tek key/bakiye ile model ve provider yönlendirme. 

- **Fiyat ve birim:** D06 %5,5 kredi alım ücreti; BYOK $25.000’a kadar free sonra %5.
- **Sınırlar:** Asıl provider retention, latency ve erişim sınırları ortadan kalkmaz.
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T58)

### T59 · Vibe Kanban

**Kodlama · Yerel · D06**

Görev panosu, worktree ve ajan koordinasyonu. 

- **Lisans / haklar / sınıflandırma:** D06 Apache/community-fork iddiası; kullanılan repo/sürüm kontrol edilmeli.
- **Olgunluk değerlendirmesi:** D06 10 Nisan 2026 Bloop kapanışı bildiriyor; ürün ve community fork bakımı ayrı teyit edilmeli.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T59) · [Araç bağlantısı](https://github.com/no-fluff/awesome-vibe-coding)

### T60 · DeepSeek

**Model · Hibrit · D02, D06**

R1, distill ve V4 olarak farklı model aileleri. 

- **Fiyat ve birim:** D06 Flash input/output $0,14/$0,28 /1M token; self-host toplamı ayrı.
- **Lisans / haklar / sınıflandırma:** D06 V4 MIT iddiası; model ağırlığı ile API veri politikası ayrı.
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T60)

### T61 · Suno

**Ses · Bulut · D03, D05**

Prompt ile müzik üretimi. 

- **Fiyat ve birim:** D05 Pro $10/ay veya yıllık $8/ay.
- **Lisans / haklar / sınıflandırma:** Free kişisel; ücretli dönemde üretime ticari kullanım kaynak iddiası; üçüncü kişi hakları ayrı.
- **Ortak desen:** W3

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T61) · [Araç bağlantısı](https://help.suno.com)

### T62 · Epidemic Sound

**Ses · Bulut · D05**

Lisanslı müzik ve ses efekti kütüphanesi. 

- **Fiyat ve birim:** D05 Creator $9,99/Pro $16,99/ay yıllık.
- **Lisans / haklar / sınıflandırma:** Plan, bağlı kanal, müşteri/reklam ve abonelik tarihine bağlı stok lisansı.
- **Ortak desen:** W3

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T62) · [Araç bağlantısı](https://epidemicsound.com)

### T63 · Artlist

**Ses · Bulut · D05**

Müzik ve stok medya lisansları. 

- **Fiyat ve birim:** D05 Social $9,99/ay; Pro/Max kapsamı farklı.
- **Lisans / haklar / sınıflandırma:** Social organik sosyal; Pro/Max, reklam/müşteri/kanal kapsamı sözleşme bazında.
- **Ortak desen:** W3

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T63) · [Araç bağlantısı](https://artlist.io)

### T64 · Tabnine

**Kodlama · Hibrit · D04**

IDE kod yardımı ve kurum odaklı erişim. 

- **Fiyat ve birim:** D04 yıllık $39/$59 kişi-ay.
- **Lisans / haklar / sınıflandırma:** D04 proprietary.
- **Olgunluk değerlendirmesi:** D04 yüksek olgunluk değerlendirmesi; özellikle veri izolasyonu gerektiren kurumlar.
- **Entegrasyon:** D04 karşılaştırma tablosu: Major IDE’ler, Git/Jira/Confluence, MCP; SaaS/VPC/on-prem/air-gapped.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T64)

### T65 · GitLab Duo

**Kodlama · Bulut · D04**

GitLab iş akışında kodlama ve inceleme yardımı. 

- **Lisans / haklar / sınıflandırma:** D04 proprietary.
- **Olgunluk değerlendirmesi:** D04 yüksek olgunluk; Code Review 18.1 GA ve self-host model 18.4 GA kaynak iddiaları.
- **Entegrasyon:** D04 karşılaştırma tablosu: GitLab.com, Self-Managed, Dedicated.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T65) · [Araç bağlantısı](https://GitLab.com)

### T66 · CrewAI

**Orkestrasyon · Yerel · D04, D05, D06**

Rol ve görev tabanlı çoklu ajan akışı. 

- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T66)

### T67 · DeepSource

**Kalite · Bulut · D06**

Statik kalite analizi ve düzeltme önerileri. 

- **Sınırlar:** D06 F1%84,51 iddiası farklı veri setleriyle doğrudan kıyaslanmaz.
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T67)

### T68 · Descript

**Kurgu · Bulut · D03, D05**

Transkript merkezli video ve ses düzenleme. 

- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T68)

### T69 · Vizard

**Kurgu · Bulut · D05**

Highlight, reframe ve altyazılı kısa video. 

- **Fiyat ve birim:** D05 ~$14,50/ay yıllık; Creator API iddiası.
- **Sınırlar:** D05 32+ dil; Türkçe üstünlüğü kaynak görüşü, bağımsız test değil.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T69)

### T70 · Ssemble

**Kurgu · Bulut · D05**

Otomatik kısa video ve kurgu alternatifi. 

- **Fiyat ve birim:** D05 $7,50/ay; API tüm planlarda iddiası.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T70)

### T71 · Klap

**Kurgu · Bulut · D05**

Uzun videodan kısa klip üretimi. 

- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T71)

### T72 · Munch

**Kurgu · Bulut · D05**

Video kesiti seçimi ve yeniden kullanımı. 

- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T72)

### T73 · CapCut

**Kurgu · Bulut · D05**

Editör içinde AI destekli montaj. 

- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T73)

### T74 · AutoPod

**Kurgu · Yerel · D05**

Podcast düzenleme otomasyonu. 

- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T74)

### T75 · Wisecut

**Kurgu · Bulut · D05**

Konuşma odaklı otomatik video düzenleme. 

- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=repurposing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T75)

### T76 · VEED

**Kurgu · Bulut · D03, D05**

Avatar, dublaj, altyazı ve video editing. 

- **Entegrasyon:** D03: Video Editing API mevcut.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T76) · [Araç bağlantısı](https://www.veed.io/)

### T77 · D-ID

**Avatar · Bulut · D05**

Sunuculu video için kaynakta anılan alternatif. 

- **Ortak desen:** W2

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T77)

### T78 · Hedra

**Avatar · Bulut · D05**

Karakter ve konuşan video alternatifi. 

- **Ortak desen:** W2

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T78)

### T79 · Argil

**Avatar · Bulut · D05**

Avatar video alternatifi. 

- **Ortak desen:** W2

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T79)

### T80 · Captions.ai

**Avatar · Bulut · D05**

AI video ve presenter alternatifi. 

- **Ortak desen:** W2

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=avatar) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T80) · [Araç bağlantısı](https://Captions.ai)

### T81 · Pika

**Video · Bulut · D05**

Jeneratif video alternatifi. 

- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T81)

### T82 · Seedance

**Video · Bulut · D03, D05**

Gateway üzerinden de sunulan video model ailesi. 

- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T82)

### T83 · Mochi

**Model · Yerel · D05**

Açık video üretimi alternatifi. 

- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T83)

### T84 · Grok

**Video · Bulut · D05**

Kaynak fiyat karşılaştırmasında anılan video modeli. 

- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T84)

### T85 · Sora 2

**Video · Bulut · D03, D05**

Kaynakta metinden/görselden video üretimi. 

- **Fiyat ve birim:** D05 $0,10/sn; V03 API yaşam döngüsü uyarısı.
- **Sınırlar:** V03 kaydında 24 Eylül 2026 API kapanışı; yeni bağımlılık kurulmaz.
- **Olgunluk değerlendirmesi:** Yaşam döngüsü riski V03’te kayıtlı; tarihsel karşılaştırma için korunur.
- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T85)

### T86 · OpenMontage

**Orkestrasyon · Yerel · D01**

Director, skill ve sağlayıcı adaptörleriyle video hattı. 

- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T86)

### T87 · MoviePy

**Kurgu · Yerel · D01, D03**

Python ile medya kliplerini kesme ve birleştirme. 

- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T87)

### T88 · Bannerbear

**Kurgu · Bulut · D05**

Şablondan medya varyantı üretimi. 

- **Fiyat ve birim:** D05 $49/1.000 kredi.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T88)

### T89 · Plainly

**Kurgu · Bulut · D05**

After Effects şablonlarını render etme. 

- **Fiyat ve birim:** D05 $69/50 render dakikası.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T89)

### T90 · Editly

**Kurgu · Yerel · D03, D05**

Kodla deterministik video kompozisyonu. 

- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T90)

### T91 · Revideo

**Kurgu · Yerel · D03, D05**

Kodla video kompozisyonu alternatifi. 

- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T91)

### T92 · Adobe Premiere UXP

**Kurgu · Yerel · D03**

Editör ve eklenti üzerinden yaratıcı finishing. 

- **Entegrasyon:** D03: UXP API/plugin.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T92) · [Araç bağlantısı](https://developer.adobe.com/firefly-services/docs/firefly-api/)

### T93 · DaVinci Resolve

**Kurgu · Yerel · D03**

Kurgu, renk ve finishing. 

- **Entegrasyon:** D03: Scripting/pro entegrasyonu mevcut olmakla birlikte bu araştırmada güncel resmi API sözleşmesinin ayrıntıları UNK.
- **Ortak desen:** W4

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T93)

### T94 · Pexels

**Video · Bulut · D01, D05**

Stok görsel/video girdisi. 

- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T94)

### T95 · Pixabay

**Video · Bulut · D01, D05**

Stok görsel/video ve medya girdisi. 

- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T95)

### T96 · Storyblocks

**Video · Bulut · D05**

Stok medya kütüphanesi. 

- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T96)

### T97 · AutoShorts

**Video · Bulut · D05**

Paket faceless içerik üretimi. 

- **Fiyat ve birim:** D05 AutoShorts.ai: 19 / 39 / 69 USD/ay. Kaynak tarihli plan fiyatları.
- **Sınırlar:** D05: abonelik başına tek seri; paylaşılan şablonlar içerik tekdüzeliği oluşturabilir.
- **Entegrasyon:** D05: videonun üretimi ile otomatik paylaşımı aynı SaaS akışında sunar.
- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T97) · [Araç bağlantısı](https://AutoShorts.ai)

### T98 · InVideo

**Video · Bulut · D03, D05**

Script-to-video paket üretim akışı. 

- **Fiyat ve birim:** D05 InVideo AI Plus: 17 USD/ay başlangıç. Kaynak tarihli iddia; model ve kullanım maliyetini ayrıca kontrol et.
- **Sınırlar:** D05: 200+ model iddiası; paket içindeki Sora 2 API için V03 kapanış kaydı geçerlidir.
- **Entegrasyon:** D05: Veo 3.1, Kling ve Seedance erişimini SaaS paketi içinde birleştirir.
- **Ortak desen:** W1

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T98)

### T99 · EdgeTTS

**Ses · Bulut · D01, D05**

Stok video hatlarında metinden ses. 

- **Ortak desen:** W3

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T99)

### T100 · Scribe

**Ses · Bulut · D05**

Sesin metne dökülmesi ve Türkçe transkripsiyon. 

- **Ortak desen:** W3

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T100)

### T101 · Azure neural TTS

**Ses · Bulut · D03, D05**

Kurumsal metinden konuşma. 

- **Ortak desen:** W3

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T101)

### T102 · Mixpost

**Yayın · Yerel · D05**

Laravel tabanlı self-host sosyal planlama. 

- **Fiyat ve birim:** D05: Mixpost için 299 USD tek seferlik lisans; sunucu ve bakım gideri ayrıca. Güncel teklif değildir.
- **Lisans / haklar / sınıflandırma:** D05 Mixpost’u açık kaynak ve ücretli lisans seçenekli olarak sınıflandırıyor; belirli kod lisansını vermiyor.
- **Entegrasyon:** D05: Laravel üzerinde self-host; sosyal yayın ve zamanlama. Sunucu kurulumu ve bakım kullanıcıya aittir.
- **Ortak desen:** W6

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T102)

### T103 · Buffer

**Yayın · Bulut · D05**

Sosyal yayın ve planlama alternatifi. 

- **Ortak desen:** W6

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T103)

### T104 · Metricool

**Yayın · Bulut · D05**

Sosyal planlama ve ölçüm alternatifi. 

- **Ortak desen:** W6

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T104)

### T105 · Publer

**Yayın · Bulut · D05**

Sosyal yayın planlama alternatifi. 

- **Ortak desen:** W6

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T105)

### T106 · Late

**Yayın · Bulut · D05**

Kaynakta anılan sosyal yayın API alternatifi. 

- **Ortak desen:** W6

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T106)

### T107 · SocialBee

**Yayın · Bulut · D05**

Sosyal içerik planlama alternatifi. 

- **Ortak desen:** W6

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=publishing) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T107)

### T108 · Activepieces

**Orkestrasyon · Hibrit · D05**

Uygulamalar arası workflow otomasyonu. 

- **Lisans / haklar / sınıflandırma:** D05 Activepieces’i açık kaynak alternatif olarak sınıflandırıyor; belirli lisans ve enterprise koşulları verilmemiş.
- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T108)

### T109 · Windmill

**Orkestrasyon · Hibrit · D05**

Script ve workflow çalıştırma. 

- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T109)

### T110 · Prefect

**Orkestrasyon · Hibrit · D05**

Veri/iş pipeline orkestrasyonu. 

- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T110)

### T111 · AutoGen

**Orkestrasyon · Yerel · D05**

Çoklu ajan konuşma ve görev düzeni. 

- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T111)

### T112 · Google ADK

**Orkestrasyon · Yerel · D06**

Ajan uygulaması geliştirme çerçevesi. 

- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T112) · [Araç bağlantısı](https://cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate)

### T113 · LangChain

**Orkestrasyon · Yerel · D04**

Model, araç ve retrieval bağlayıcıları. 

- **Lisans / haklar / sınıflandırma:** D04 MIT; kullanılan paket/sürüm için kontrol.
- **Olgunluk değerlendirmesi:** D04 yazarının değerlendirmesi: Genel agent uygulama framework’ü. Bağımsız olgunluk ölçümü değildir.
- **Entegrasyon:** D04 karşılaştırma tablosu: Model/tool/vector-store abstractions; LangGraph.
- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=rag) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T113) · [Araç bağlantısı](https://github.com/langchain-ai/langchain)

### T114 · Cline

**Kodlama · Yerel · D04, D06**

IDE içinde araç kullanan coding ajanı. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T114)

### T115 · Roo Code

**Kodlama · Yerel · D06**

Kaynakta anılan IDE ajan alternatifi. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T115)

### T116 · Kilo Code

**Kodlama · Yerel · D06**

Kaynakta anılan kodlama ajan alternatifi. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T116)

### T117 · Amp

**Kodlama · Bulut · D06**

Coding ajan alternatifi. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T117)

### T118 · Factory Droid

**Kodlama · Bulut · D06**

Görev odaklı coding ajanı. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T118)

### T119 · Warp

**Kodlama · Yerel · D06**

Terminal ve ajan geliştirme ortamı. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T119)

### T120 · Gemini CLI

**Kodlama · Yerel · D06**

Terminal ajan alternatifi. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T120)

### T121 · Devin

**Kodlama · Bulut · D04, D06**

Yazılım görevlerini yürüten ajan platformu. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T121)

### T122 · Windsurf

**Kodlama · Bulut · D04**

AI odaklı IDE. 

- **Lisans / haklar / sınıflandırma:** D04 proprietary.
- **Olgunluk değerlendirmesi:** D04 Codeium→Windsurf marka değişimi ve 2025 Cognition satın alımı; yetenek yüksek, roadmap riski yüksek kaynak değerlendirmesi.
- **Entegrasyon:** D04 karşılaştırma tablosu: IDE, agent workflow.
- **Editoryal seçim notu:** Mevcut kullanıcı için ilgili; yeni kurumsal yatırımda ürün hattı ve Devin yakınsaması teyit edilmeli.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T122)

### T123 · Continue

**Kodlama · Yerel · D04**

Özelleştirilebilir coding yardımcısı. 

- **Lisans / haklar / sınıflandırma:** D04 Apache-2.0 repo.
- **Olgunluk değerlendirmesi:** D04 2026’da read-only ve ekibin Cursor’a katıldığı iddiasını taşıyor. Bağımsız teyit edilmedi; yeni yatırım öncesi bakım durumu kritik.
- **Entegrasyon:** D04 karşılaştırma tablosu: VS Code/JetBrains/CLI.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T123) · [Araç bağlantısı](https://github.com/continuedev/continue)

### T124 · Pane

**Kodlama · Yerel · D06**

İsmail’in mevcut çoklu ajan çalışma ortamı. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T124) · [Araç bağlantısı](https://runpane.com)

### T125 · Auto-Claude

**Kodlama · Yerel · D06**

Kaynak kişisel bağlamında ajan yönetimi. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T125)

### T126 · Conductor

**Kodlama · Yerel · D06**

Mac üzerinde worktree, diff ve PR yönetimi. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T126)

### T127 · Claude Squad

**Kodlama · Yerel · D06**

tmux/TUI ile ajan session ve worktree. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T127) · [Araç bağlantısı](https://support.claude.com)

### T128 · Code Conductor

**Kodlama · Yerel · D06**

Çoklu coding ajan oturum yönetimi. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T128)

### T129 · amux

**Kodlama · Yerel · D06**

Çoklu terminal ajan koordinasyonu. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T129)

### T130 · agentbox

**Kodlama · Yerel · D06**

Hetzner/Docker tabanlı worker yaklaşımı. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T130)

### T131 · Sculptor

**Kodlama · Yerel · D06**

Container tabanlı ajan çalışma alanı. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T131)

### T132 · VibeTree

**Kodlama · Yerel · D06**

Ajan yöneticileri için keşif/kürasyon reposu. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T132)

### T133 · Kiro

**Kodlama · Bulut · D06**

Requirements, design ve tasks tabanlı spesifikasyon. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T133)

### T134 · BMAD

**Kodlama · Yerel · D06**

Analyst, PM, architect ve dev rol akışı. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T134)

### T135 · Superpowers

**Kodlama · Yerel · D06**

Tekrarlanabilir coding skill yaklaşımı. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=spec-context) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T135)

### T136 · FastMCP

**Orkestrasyon · Yerel · D06**

Python ile dar domain MCP araçları. 

- **Ortak desen:** W7

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T136)

### T137 · GitHub MCP

**Kodlama · Hibrit · D06**

Issue, PR ve check bağlantısı. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T137) · [Araç bağlantısı](https://github.com/remotion-dev/remotion)

### T138 · Cursor Bugbot

**Kalite · Bulut · D06**

PR diff’i ve bağlamında hata inceleme. 

- **Fiyat ve birim:** D06 yaklaşık $1–1,50/review kaynak iddiası.
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T138)

### T139 · Snyk

**Kalite · Hibrit · D04, D06**

Kod ve bağımlılık güvenliği. 

- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=security) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T139)

### T140 · Dependabot

**Kalite · Bulut · D04, D06**

Bağımlılık güncelleme ve güvenlik PR’ı. 

- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T140)

### T141 · CodeQL

**Kalite · Yerel · D04, D06**

Semantik güvenlik analizi ve SARIF bulguları. 

- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=testing-review) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T141)

### T142 · GLM

**Model · Hibrit · D06**

Açık ağırlıklı büyük coding model ailesi. 

- **Fiyat ve birim:** D06 API $1/$3,41 /1M input/output.
- **Sınırlar:** 744B × 4-bit ≈372 GB ağırlık; 96 GB karta doğrudan sığma varsayımı yanlış.
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T142)

### T143 · Kimi

**Model · Bulut · D06**

Büyük model ve API ailesi. 

- **Fiyat ve birim:** D06 Morph gateway $3/$15 /1M input/output.
- **Sınırlar:** 2,8T kaynak iddiası; tek Mac/GEX131 self-host adayı değil.
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T143)

### T144 · Mistral Devstral

**Model · Hibrit · D06**

Kodlama için alternatif model ailesi. 

- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T144)

### T145 · gpt-oss

**Model · Yerel · D06**

Kaynakta anılan açık ağırlıklı model alternatifi. 

- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T145)

### T146 · Llama

**Model · Yerel · D06**

Yerel inference model ailesi. 

- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T146) · [Araç bağlantısı](https://github.com/run-llama/llama_index)

### T147 · StarCoder2

**Model · Yerel · D04**

Kod model araştırması ve fine-tuning. 

- **Lisans / haklar / sınıflandırma:** D04 BigCode OpenRAIL-M ağırlık koşulları.
- **Olgunluk değerlendirmesi:** D04 yazarının değerlendirmesi: Araştırma, fine-tuning, kontrollü/self-host code inference. Bağımsız olgunluk ölçümü değildir.
- **Entegrasyon:** D04 karşılaştırma tablosu: Transformers/TGI vb..
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T147) · [Araç bağlantısı](https://github.com/bigcode-project/starcoder2)

### T148 · CodeGen

**Model · Yerel · D04**

Kod üretimi araştırma modeli. 

- **Lisans / haklar / sınıflandırma:** D04 Apache-2.0 kaynak lisansı.
- **Olgunluk değerlendirmesi:** D04 yazarının değerlendirmesi: Tarihsel ve araştırma değeri yüksek; production frontier değil. Bağımsız olgunluk ölçümü değildir.
- **Entegrasyon:** D04 karşılaştırma tablosu: Local inference/research.
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T148) · [Araç bağlantısı](https://github.com/salesforce/CodeGen)

### T149 · AlphaCode

**Model · Bulut · D04**

Rekabetçi programlama araştırması. 

- **Lisans / haklar / sınıflandırma:** D04 genel amaçlı OSS ürün değildir; program synthesis araştırması.
- **Olgunluk değerlendirmesi:** D04 yazarının değerlendirmesi: Competitive-programming araştırmasının kilometre taşı. Bağımsız olgunluk ölçümü değildir.
- **Entegrasyon:** D04 karşılaştırma tablosu: Doğrudan ekip aracı olarak önerilmez.
- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=measurement) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T149) · [Araç bağlantısı](https://deepmind.google/blog/competitive-programming-with-alphacode/)

### T150 · TensorRT-LLM

**Model · Yerel · D06**

NVIDIA üzerinde optimize inference. 

- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T150)

### T151 · llama.cpp

**Model · Yerel · D06**

GGUF ile yerel inference motoru. 

- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T151)

### T152 · LM Studio

**Model · Yerel · D06**

Yerel model çalıştırma arayüzü. 

- **Ortak desen:** W5

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T152)

### T153 · Ruff

**Kalite · Yerel · D06**

Python lint ve format. 

- **Sınırlar:** Lint/format yapar; type checking için başka araç gerekir.
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T153)

### T154 · ty

**Kalite · Yerel · D06**

Python tip denetimi. 

- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T154)

### T155 · Pyrefly

**Kalite · Yerel · D06**

Rust tabanlı Python tip denetimi. 

- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T155)

### T156 · mypy

**Kalite · Yerel · D06**

Plugin ekosistemli Python tip denetimi. 

- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T156)

### T157 · uv

**Kodlama · Yerel · D06**

Python ortam ve paket yönetimi. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T157)

### T158 · Biome

**Kalite · Yerel · D06**

JavaScript/TypeScript lint ve format. 

- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T158)

### T159 · oxlint

**Kalite · Yerel · D06**

JavaScript/TypeScript lint. 

- **Sınırlar:** Linter; formatter olarak sunulmamalı.
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T159)

### T160 · Prettier

**Kalite · Yerel · D06**

Kod biçimlendirme. 

- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T160)

### T161 · Storybook

**Kalite · Yerel · D04, D06**

Bileşen senaryoları ve etkileşim testleri. 

- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T161)

### T162 · Figma MCP / Framelink

**Kodlama · Bulut · D06**

Tasarım bilgisi ve token’ları koda taşıma. 

- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T162)

### T163 · Stitch

**Kodlama · Bulut · D06**

UI tasarımından uygulama taslağına. 

- **Fiyat ve birim:** D06 ücretsiz 350 generation iddiası.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T163)

### T164 · v0

**Kodlama · Bulut · D06**

Prompt ile arayüz kodu taslağı. 

- **Sınırlar:** Next.js varsayılan çıktısı React/Vite ve Supabase dışlamasına göre uyarlanmalı.
- **Ortak desen:** W8

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=developer-toolchain) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T164)

### T165 · Datadog Bits

**Kalite · Bulut · D04, D06**

Telemetry bağlamında olay araştırması. 

- **Lisans / haklar / sınıflandırma:** D04 proprietary.
- **Olgunluk değerlendirmesi:** D04 yüksek olgunluk değerlendirmesi.
- **Entegrasyon:** D04 karşılaştırma tablosu: Datadog telemetry + GitHub, Sentry, Grafana, Dynatrace, Splunk, ServiceNow.
- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T165)

### T166 · Grafana / Loki

**Kalite · Yerel · D06**

Metrik ve log gözlemlenebilirliği. 

- **Ortak desen:** W9

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T166)

### T167 · Hugging Face Transformers

**Model · Hibrit · D04**

Model yükleme, inference ve fine-tuning için PyTorch/Transformers katmanı; kod/ses/görsel/multimodal aileler. 

- **Lisans / haklar / sınıflandırma:** Apache-2.0 framework; model ağırlığının lisansı ayrı.
- **Olgunluk değerlendirmesi:** D04 yazarının değerlendirmesi: Açık modeller için temel runtime/training katmanlarından. Bağımsız olgunluk ölçümü değildir.
- **Entegrasyon:** D04 karşılaştırma tablosu: PyTorch/Transformers ekosistemi; text/vision/audio/multimodal.
- **Ortak desen:** W10

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=local-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T167) · [Araç bağlantısı](https://github.com/huggingface/transformers)

### T168 · OpenAI Agents SDK

**Orkestrasyon · Hibrit · D05**

Kaynakta tool kullanımı, handoff ve tracing ile özel ajan uygulaması kurmak için anlatılan SDK. 

- **Entegrasyon:** Kaynakta tool kullanımı, handoff ve tracing ile özel ajan uygulaması kurmak için anlatılan SDK.
- **Ortak desen:** W10

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T168)

### T169 · Claude Agent SDK

**Orkestrasyon · Hibrit · D05, D06**

Claude Code araç-kullanımını TypeScript/Python uygulamasına taşıyan SDK deseni; dar görev, izin ve çıktı sözleşmesi. 

- **Entegrasyon:** Claude Code araç-kullanımını TypeScript/Python uygulamasına taşıyan SDK deseni; dar görev, izin ve çıktı sözleşmesi.
- **Ortak desen:** W10

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T169)

### T170 · n8n-claw

**Orkestrasyon · Yerel · D06**

n8n içinde OpenClaw benzeri ajan ve OpenClaw’a delegasyon skill’i; görev devretme entegrasyonu. 

- **Entegrasyon:** n8n içinde OpenClaw benzeri ajan ve OpenClaw’a delegasyon skill’i; görev devretme entegrasyonu.
- **Ortak desen:** W10

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T170) · [Araç bağlantısı](https://github.com/freddy-schuetz/n8n-claw)

### T171 · n8n-mcp

**Orkestrasyon · Yerel · D06**

Kaynağa göre yaklaşık 2.000 node bilgisini ajana sunar; workflow tasarımı için dokümantasyon/araç katmanı. 

- **Entegrasyon:** Kaynağa göre yaklaşık 2.000 node bilgisini ajana sunar; workflow tasarımı için dokümantasyon/araç katmanı.
- **Ortak desen:** W10

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=mcp) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T171) · [Araç bağlantısı](https://github.com/czlonkowski/n8n-mcp)

### T172 · awesome-vibe-coding

**Kodlama · Yerel · D06**

Claude Squad, Code Conductor, Vibe Kanban, VibeTree gibi araçları derleyen keşif listesi. 

- **Entegrasyon:** Claude Squad, Code Conductor, Vibe Kanban, VibeTree gibi araçları derleyen keşif listesi.
- **Ortak desen:** W10

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T172) · [Araç bağlantısı](https://github.com/no-fluff/awesome-vibe-coding)

### T173 · awesome-agent-orchestrators

**Kodlama · Yerel · D06**

Worktree/sandbox ve agentbox/claude-squad/amux seçeneklerini keşfetmek için kürasyon. 

- **Entegrasyon:** Worktree/sandbox ve agentbox/claude-squad/amux seçeneklerini keşfetmek için kürasyon.
- **Ortak desen:** W10

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T173) · [Araç bağlantısı](https://github.com/andyrewlee/awesome-agent-orchestrators)

### T174 · awesome-openclaw

**Orkestrasyon · Yerel · D06**

OpenClaw kaynak, skill ve tutorial kürasyonu; gerekli yetenekleri keşfetmeye yardımcı. 

- **Entegrasyon:** OpenClaw kaynak, skill ve tutorial kürasyonu; gerekli yetenekleri keşfetmeye yardımcı.
- **Ortak desen:** W10

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=operations) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T174) · [Araç bağlantısı](https://github.com/SamurAIGPT/awesome-openclaw)

### T175 · fal.ai

**Model · Bulut · D03, D05**

Birden çok video/model sağlayıcısına async inference geçidi; kendi job/adaptör sözleşmesini koru. 

- **Entegrasyon:** Birden çok video/model sağlayıcısına async inference geçidi; kendi job/adaptör sözleşmesini koru.
- **Ortak desen:** W10

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T175) · [Araç bağlantısı](https://fal.ai/)

### T176 · Replicate

**Model · Bulut · D03, D05**

Model sürümlerini API ile çalıştıran gateway; input schema, async job, callback ve çıktı indirmeyi adaptöre bağla. 

- **Entegrasyon:** Model sürümlerini API ile çalıştıran gateway; input schema, async job, callback ve çıktı indirmeyi adaptöre bağla.
- **Ortak desen:** W10

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T176) · [Araç bağlantısı](https://replicate.com/)

### T177 · ModelsLab

**Model · Bulut · D05**

Kaynakta 600+ modele tek API erişimi iddiasıyla anılan gateway. 

- **Entegrasyon:** Kaynakta 600+ modele tek API erişimi iddiasıyla anılan gateway.
- **Ortak desen:** W10

[Uygulama rehberi](https://karacaismail.github.io/futuristic/#/guide?topic=video-models) · [Kaynak pasajı ve eksik alanlar](https://karacaismail.github.io/futuristic/#/tools?tool=T177) · [Araç bağlantısı](https://modelslab.com/)

## C. Tarihli doğrulama / düzeltme kaydı

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

## D. Özgün kaynaklar ve kapsam matrisi

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

## E. Tam referans indeksi

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

## F. Sayısal iddia ve varsayım defteri

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

**Kaynak:** Luma 10–15 sn sınıfı; MiniMax H3 4–15 sn, 768p/2K, 24 fps; Kling 3.0/Omni native 4K iddiası.

**Değerlendirme:** Kaynak ürün kabiliyetleri; UI/API ve model sürümü eşit değil. Güncel erişim ve sözleşme ayrıca kontrol edilir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-models)

### Açık video modelleri donanımı

**Kaynak iddiası · D03, D05**

**Kaynak:** Wan 24–80 GB; Hunyuan 60–80 GB; LTX bazı 24 GB yolları; gelişmiş workflow 32 GB VRAM/100 GB disk.

**Değerlendirme:** 32 GB/100 GB tüm ComfyUI kurulumlarının minimumu değildir. Model, quantization ve çözünürlük belirtilmeli.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-models)

### Video araştırma ölçümleri

**Kaynak iddiası · D03**

**Kaynak:** LTX H100’de 5 sn/24 fps/768×512 çıktıyı 2 sn üretme; CogVideoX 10 sn/768×1360.

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

**Kaynak:** ElevenLabs v2 29 dil; Flash v2.5 32 dil/~75 ms; free 10k karakter/ay; Scribe Türkçe 88M konuşmacı; OpenAI 11 voice; MiniMax speech-2.8 40 dil.

**Değerlendirme:** Dil/konuşmacı sayısı kalite puanı değil. Latency koşulu, model ve ses hakkı ayrı; Türkçe özel terimler test edilir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=voice-localization)

### Remotion lisans ve fiyat

**Kaynak iddiası · D03, D05**

**Kaynak:** Birey/≤3 çalışan ücretsiz koşulu; $25/seat veya $0,01/render, min $100/ay kaynak senaryosu.

**Değerlendirme:** Ücretsiz koşul resmi V09 kontrolünde ayrılmıştır; bütün fiyatlar yeniden teyit edilmedi. MIT varsayımı yapılmaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=editing-finishing)

### Cloud renderer fiyatları

**Kaynak iddiası · D05**

**Kaynak:** Shotstack $0,30/dk PAYG, $39/ay abonelikte $0,20/dk; Creatomate $49–54/2.000 kredi, 720p dk ~14 kredi; JSON2Video $49,95/200 dk Full HD, free 600 kredi, 4K = 4×; Bannerbear $49/1.000 kredi; Plainly $69/50 dk.

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

**Kaynak:** Blotato $29/ay/9 platform; Upload-Post $24 veya yıllık $16, free 10 upload; Ayrshare $149 ve 30+ profil için ayrı fiyat; Postiz self-host free/cloud 29; Mixpost $299 tek sefer.

**Değerlendirme:** Platform izinleri ortadan kalkmaz. Hesap/profil/marka başına maliyet ve gerçek API kapsamı güncel kontrol ister.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)

### YouTube upload kota değişimi

**Düzeltildi · D01, D03, D05**

**Kaynak:** D05 videos.insert 1.600, D01 100 birim/çağrı aktarıyor.

**Değerlendirme:** 17 Eylül resmi tablo: videos.insert ve search.list ayrı ayrı 100 çağrı/gün; çağrı başına 1 kota. Otomatik sayfa özetindeki eski 1.600 ifadesi gövdeyle çelişiyor. Kanal upload limiti farklı; ~20/gün evrensel değil.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)

### TikTok init sınırı

**Kontrol edildi · D03, D05**

**Kaynak:** Direct Post init 6 istek/dakika/access token; audit olmadan private kısıtı.

**Değerlendirme:** V04 resmi kontrolü korunur; creator info/consent ve yayın durum doğrulaması gerekli.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)

### Instagram süre ve kota iddiaları

**Düzeltildi · D01, D03, D05**

**Kaynak:** D05 evrensel 90 sn; D01 200/saat BUC ve 60 günlük token; review 2–4 hafta.

**Değerlendirme:** Doğrulanan Facebook Login Reels yolu 3 sn–15 dk. Diğer sayılar endpoint/hesap bağlamı olmadan kapasite/SLA kabul edilmez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)

### Suno kullanım bedeli ve hakları

**Kaynak iddiası · D05**

**Kaynak:** Pro $10/ay veya yıllık $8; free kişisel; ücretli dönemde üretime commercial use.

**Değerlendirme:** Kaynak koşulları. Ticari izin, telif koruması ve üçüncü kişiye karşı tazminat aynı değil.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights)

### Epidemic / Artlist planları

**Kaynak iddiası · D05**

**Kaynak:** Epidemic Creator $9,99/Pro $16,99 yıllık; Pro’da 5M takipçi/$10M şirket sınırı; Artlist Social $9,99, Pro/Max 3 kanal iddiası.

**Değerlendirme:** Kaynak sözleşme özeti güncel hukuk görüşü değil. Reklam, client work, whitelist ve abonelik sonrası yeni yayın ayrı kontrol edilir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=music-rights)

### YouTube politika tarihi

**Düzeltildi · D01, D05**

**Kaynak:** D01 Temmuz 2026; D05 ve resmi kaynak 15 Temmuz 2025 inauthentic content güncellemesi.

**Değerlendirme:** 2025 tarihi esas alınır. AI kullanımı tek başına tüm videoların demonetize olduğu anlamına gelmez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)

### AI içerik ve kapatma sayıları

**Kaynak iddiası · D01, D05**

**Kaynak:** TikTok 1,3B (Kasım 2025) ve 3B (Temmuz 2026) etiket; YouTube 16 kanal 35M abone; shadowban %90 iddiası.

**Değerlendirme:** Bağımsız teyit edilmedi. Etiket sayısı toplam AI hacmi veya erişim nedeni değil; nedensellik kurulamaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)

### AB AI Act tarih ve yaptırım

**Düzeltildi · D01, D03, D05**

**Kaynak:** Kaynaklarda 2 Ağustos 2026 genel yürürlük, €15M/%3 yaptırım.

**Değerlendirme:** V11 konsolide metin sağlayıcı/deployer ve geçiş tarihlerini ayırır; her medya/her ihlal için aynı tarih/ceza varsayılmaz.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=provenance)

### Video GPU ve ölçek eşiği

**Senaryo · D05**

**Kaynak:** H100 $2–2,70/saat; Wan $0,25–0,60/clip; ayda 5.000 clip self-host eşiği.

**Değerlendirme:** İş yükü, kalite ve doluluk olmadan evrensel eşik değil. Bakım ve tekrar üretim eklenmeli.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-economics)

### Depolama senaryosu

**Senaryo · D03**

**Kaynak:** 100 video/gün × 200 MB = 20 GB final; work 3–10× = 60–200 GB/gün.

**Değerlendirme:** Senaryo hesabı; master retention ve egress ayrıca. Hacim gerçek telemetry ile güncellenir.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=media-contracts)

### Üç video mimarisinin bütçeleri

**Senaryo · D05**

**Kaynak:** A bütçe faceless $50–150/ay + kullanım, $0,20–1/video; B premium $300–800; C B2B $150–400.

**Değerlendirme:** Kaynak senaryoları; kabul/deneme, premium oranı ve insan emeği dahil olmadan taahhüt değil.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats)

### Ekip yatırım senaryoları

**Senaryo · D04**

**Kaynak:** 5–10 dev: 3–8 kişi-gün/$150–750/2–4 hafta; 25 dev: 15–30/$1k–3,5k/6–10 hafta; 25–50 dev: 40–90/$4k–15k+/3–6 ay; regüle 60–150+/4–9+ ay.

**Değerlendirme:** Kaynak varsayımları; tek geliştiriciye veya kendi ekibine doğrudan fiyat biçmez. Baseline ile net tasarruf ölçülür.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)

### Video programı ve benchmark

**Senaryo · D03**

**Kaynak:** 21 Eylül 2026–Şubat 2027; 20–50 benchmark sahnesi, 17 belirsizlik grubu, ~12 gün rollout, platform review için 8 haftaya varan pay.

**Değerlendirme:** Plan önerisi ve tamponlar, teslimat SLA’sı değil. Paralel işler basitçe toplanmaz; ayrıntılı evreler rehberde.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)

### Ölçüm pilotu

**Senaryo · D04, D05, D06**

**Kaynak:** 2–4 hafta baseline, 5–10 dev pilot; 10–20 video; 15 ajan 7/24 hedefi.

**Değerlendirme:** Kaynak başlangıç senaryosu. Aynı görev türü, review maliyeti, ret ve başarısız işler ölçüme dahil.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)

### Make webhook kapasitesi

**Kaynak iddiası · D03**

**Kaynak:** 300 gelen webhook/10 sn iddiası.

**Değerlendirme:** Plan ve endpoint bazında teyit gerekir. Paralel/sıralı yürütme ayrı seçenek; queue ve retry tasarlanır.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration)

### Circuit breaker örnek eşiği

**Senaryo · D01**

**Kaynak:** Beş hata/60 sn; retry base×2^n+jitter.

**Değerlendirme:** Kaynak tasarım örneği; evrensel eşik değil. Retry-After, hata türü, bütçe ve DLQ/insan revizyon ayrımı gerekli.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=orchestration)

### Vibe Kanban yaşam döngüsü

**Kaynak iddiası · D06**

**Kaynak:** Bloop kapanışı 10 Nisan 2026, Apache community/fork ayrımı.

**Değerlendirme:** Kaynak iddiası; ürün hizmeti, açık repo ve fork bakımını ayrı kontrol et. Sırf isim var diye mevcut Pane’den geçiş önerilmez.

[Uygulama bağlamı](https://karacaismail.github.io/futuristic/#/guide?topic=agent-managers)


## G. Kaynak bölümlerinden konuya kapsam haritası

Bu indeks kaynakla açıklama arasındaki izi gösterir; eşleşme, iddianın doğruluk veya tamlık sertifikası değildir. D01/D02 başlıkları kayıp olduğundan cümle sınırlarında okuma pasajlarına ayrıldı.

- **D01-01** (0–2000): Giriş ve kapsam — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D01-02** (2000–4112): Kaynak pasajı 2 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D01-03** (4112–5940): Kaynak pasajı 3 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D01-04** (5940–7768): Kaynak pasajı 4 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D01-05** (7768–9659): Kaynak pasajı 5 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D01-06** (9659–11581): Kaynak pasajı 6 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D01-07** (11581–13740): Kaynak pasajı 7 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D01-08** (13740–15550): Kaynak pasajı 8 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D01-09** (15550–17676): Kaynak pasajı 9 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D01-10** (17676–19701): Kaynak pasajı 10 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D01-11** (19701–21736): Kaynak pasajı 11 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D01-12** (21736–23050): Kaynak pasajı 12 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D01)
- **D02-01** (0–1880): Giriş ve kapsam — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-02** (1880–4103): Kaynak pasajı 2 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-03** (4103–6001): Kaynak pasajı 3 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-04** (6001–7827): Kaynak pasajı 4 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-05** (7827–9974): Kaynak pasajı 5 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-06** (9974–11952): Kaynak pasajı 6 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-07** (11952–14024): Kaynak pasajı 7 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-08** (14024–16197): Kaynak pasajı 8 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-09** (16197–18021): Kaynak pasajı 9 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-10** (18021–19940): Kaynak pasajı 10 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-11** (19940–21794): Kaynak pasajı 11 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-12** (21794–23658): Kaynak pasajı 12 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-13** (23658–25680): Kaynak pasajı 13 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-14** (25680–27531): Kaynak pasajı 14 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-15** (27531–29911): Kaynak pasajı 15 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-16** (29911–31723): Kaynak pasajı 16 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-17** (31723–33705): Kaynak pasajı 17 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D02-18** (33705–35591): Kaynak pasajı 18 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D02)
- **D03-01** (0–78): Giriş ve kapsam — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-02** (78–5190): Yönetici özeti — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-03** (5190–8835): Kapsam, varsayımlar ve hedef yetenek modeli — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-04** (8835–9032): Güncel araç ve platform envanteri — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-05** (9032–11957): Generative video ve video dönüşümü — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-06** (11957–14207): Script-to-video, avatar ve presenter — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-07** (14207–16037): TTS, dublaj ve audio — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-08** (16037–19526): Kurgu, assembly, motion graphics ve finishing — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-09** (19526–21977): Açık kaynak ve self-hosted ekosistem — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-10** (21977–23706): Referans mimari ve otomasyon pipeline'ları — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-11** (23706–25467): Referans içerik akışı — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-12** (25467–26495): Audio ve timeline akışı — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-13** (26495–27244): Template-first ile generative-first farkı — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-14** (27244–27296): Entegrasyon, orkestrasyon ve otomatik yayınlama — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-15** (27296–29679): Sosyal platformların doğrudan API'leri — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-16** (29679–30684): n8n referans deseni — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-17** (30684–31440): Make referans deseni — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-18** (31440–31888): Zapier referans deseni — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-19** (31888–33466): Production-grade durable orchestration — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-20** (33466–37085): Gap analizi, bilinmeyenler ve riskler — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-21** (37085–38077): UNK listesi — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-22** (38077–39662): Ana riskler — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-23** (39662–41083): Uygulama yol haritası, maliyet ve operasyon modeli — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-24** (41083–41766): İlk dönem: benchmark ve contracts — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-25** (41766–42933): MVP dönemi: ilk uçtan uca vertical slice — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-26** (42933–43671): Ölçek dönemi: hybrid SaaS + open source — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-27** (43671–44823): Compute ve storage — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-28** (44823–46207): Maliyet modeli — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-29** (46207–47417): Monitoring ve observability — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D03-30** (47417–54041): Önerilen hedef mimari ve karar — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D03)
- **D04-01** (0–899): Yönetici özeti · 16 Eylül 2026 itibarıyla yazılım geliştirmede yapay zekâ tarafındaki en önemli değişim, “kod öneren model — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-02** (899–929): Yönetici özeti · Buradaki kritik sonuç şudur: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-03** (929–1150): Yönetici özeti · > 2026’da yazılım geliştirme açısından asıl yatırım yapılacak şey tek başına daha iyi LLM değil; iyi bağl — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-04** (1150–1737): Yönetici özeti · Modelin kod yazma yeteneği önemli olmakla birlikte, gerçek repository işleri için modelin doğru dosyaları — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-05** (1737–2686): Yönetici özeti · Bununla birlikte “AI = otomatik olarak daha hızlı geliştirme” şeklinde bir genelleme bilimsel olarak savu — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-06** (2686–2801): Yönetici özeti · Dolayısıyla orta büyüklükte bir ekip için önerim, “her yere AI koyalım” değil, aşağıdaki sırayı uygulamak — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-07** (2801–2932): Yönetici özeti · Deterministik otomasyon → geliştirici asistanı → AI destekli review/test → sınırlı ajan → production tele — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-08** (2932–3479): Yönetici özeti · Yani önce formatter, lint, type-check, unit/integration/E2E test, SAST/SCA, secret scanning ve dependency — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-09** (3479–3576): Yönetici özeti · Orta ölçekli, GitHub tabanlı bir ekip için benim varsayılan 2026 teknoloji seçimim şu olur: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-10** (3576–3629): Yönetici özeti · Katman — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-11** (3629–3867): Yönetici özeti · Günlük IDE yardımı — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-12** (3867–4150): Yönetici özeti · Terminal/repo ajanı — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-13** (4150–4343): Yönetici özeti · Asenkron issue → PR — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-14** (4343–4588): Yönetici özeti · PR review — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-15** (4588–4775): Yönetici özeti · Güvenlik — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-16** (4775–4999): Yönetici özeti · Dependency — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-17** (4999–5233): Yönetici özeti · Test — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-18** (5233–5454): Yönetici özeti · Production debugging — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-19** (5454–5650): Yönetici özeti · Kurumsal bağlam — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-20** (5650–6009): Yönetici özeti · Özel RAG — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-21** (6009–6277): Yönetici özeti · Hassas kod / local — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-22** (6277–6646): Yönetici özeti · Bu rapordaki maliyet senaryolarında ekip büyüklüğü belirtilmediği için 25 geliştiricilik, GitHub kullanan — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-23** (6646–6705): Yönetici özeti · Benim temel yatırım önceliğim yaklaşık olarak şöyle olur: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-24** (6705–7031): Yönetici özeti · Birinci öncelik: repository bağlamı ve coding agent. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-25** (7031–7774): Yönetici özeti · Özellikle Metaframer/Metaframework gibi platform seviyesinde çok sayıda dosya, abstraction ve mimari kura — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-26** (7774–8004): Son üç yılda teknoloji değişimi · 2023–2026 dönemindeki en önemli teknolojik değişiklikleri tek tek ürün isimlerinden ziyade yazılım gelişt — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-27** (8004–8110): Son üç yılda teknoloji değişimi · Yaklaşım — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-28** (8110–8333): Son üç yılda teknoloji değişimi · Genel amaçlı LLM — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-29** (8333–8532): Son üç yılda teknoloji değişimi · Code LLM — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-30** (8532–8716): Son üç yılda teknoloji değişimi · Multimodal model — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-31** (8716–8933): Son üç yılda teknoloji değişimi · RAG — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-32** (8933–9122): Son üç yılda teknoloji değişimi · Program synthesis — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-33** (9122–9332): Son üç yılda teknoloji değişimi · Tool-using agents — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-34** (9332–9525): Son üç yılda teknoloji değişimi · MCP — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-35** (9525–9741): Son üç yılda teknoloji değişimi · AI + statik analiz — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-36** (9741–9943): Son üç yılda teknoloji değişimi · AI test automation — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-37** (9943–10117): Son üç yılda teknoloji değişimi · Model-based code review — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-38** (10117–10311): Son üç yılda teknoloji değişimi · AI observability/AIOps — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-39** (10311–10530): Son üç yılda teknoloji değişimi · Context engineering — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-40** (10530–11102): Son üç yılda teknoloji değişimi · Code LLM ve program synthesis tarafındaki evrim özellikle önemlidir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-41** (11102–11543): Son üç yılda teknoloji değişimi · AlphaCode da program synthesis açısından önemli bir araştırma çizgisidir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-42** (11543–11927): Son üç yılda teknoloji değişimi · Daha önemli kırılma 2023’te SWE-bench ile geldi. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-43** (11927–12323): Son üç yılda teknoloji değişimi · 2024’te SWE-agent, modelin yalnızca zekâsını değil bilgisayarla etkileşim arayüzünü optimize etmeye odakl — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-44** (12323–12770): Son üç yılda teknoloji değişimi · 2025–2026’da ise kod modellerinin eğitim hedefi de değişmeye başladı. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-45** (12770–13271): Son üç yılda teknoloji değişimi · OpenAI tarafında da aynı evrim gözleniyor. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-46** (13271–13312): Son üç yılda teknoloji değişimi · Bu değişimin pratik karşılığı şöyledir: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-47** (13312–13793): Son üç yılda teknoloji değişimi · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-48** (13793–14345): Son üç yılda teknoloji değişimi · Bu nedenle “hangi model en iyi kod yazıyor?” artık tek başına yanlış optimizasyon hedefidir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-49** (14345–14857): Son üç yılda teknoloji değişimi · Multimodal coding özellikle frontend tarafında yeni bir pratik kategori oluşturuyor. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-50** (14857–15496): Son üç yılda teknoloji değişimi · RAG tarafında ise iki farklı problemi ayırmak gerekiyor. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-51** (15496–15981): Son üç yılda teknoloji değişimi · Buradaki daha yeni yaklaşım agentic RAG’dir: sistem her prompt’ta körü körüne beş benzer chunk çekmek yer — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-52** (15981–16405): Son üç yılda teknoloji değişimi · Bu noktada MCP önemli hale geliyor. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-53** (16405–16442): Son üç yılda teknoloji değişimi · Pratik olarak şu fark ortaya çıkar: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-54** (16442–16573): Son üç yılda teknoloji değişimi · RAG: “Bu bilgiyi bul ve prompt’a koy.”   — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-55** (16573–16783): Son üç yılda teknoloji değişimi · Örneğin Metaframer üzerinde bir agent’ın PostgreSQL schema’sını okuması, Jira issue detayını alması, Sent — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-56** (16783–17147): Araç ve repo karşılaştırması · Aşağıdaki tablo ticari veya ürünleşmiş coding araçlarını, 16 Eylül 2026 itibarıyla kullanım biçimleri açı — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-57** (17147–17280): Araç ve repo karşılaştırması · Araç — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-58** (17280–17643): Araç ve repo karşılaştırması · GitHub Copilot — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-59** (17643–18048): Araç ve repo karşılaştırması · OpenAI Codex — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-60** (18048–18328): Araç ve repo karşılaştırması · Cursor — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-61** (18328–18677): Araç ve repo karşılaştırması · Tabnine — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-62** (18677–19059): Araç ve repo karşılaştırması · Codeium / Windsurf — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-63** (19059–19375): Araç ve repo karşılaştırması · CodeRabbit — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-64** (19375–19677): Araç ve repo karşılaştırması · Qodo — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-65** (19677–19925): Araç ve repo karşılaştırması · GitLab Duo — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-66** (19925–20215): Araç ve repo karşılaştırması · Diffblue Cover — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-67** (20215–20526): Araç ve repo karşılaştırması · Semgrep — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-68** (20526–20791): Araç ve repo karşılaştırması · Sentry Seer — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-69** (20791–21110): Araç ve repo karşılaştırması · Datadog Bits Investigation — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-70** (21110–21607): Araç ve repo karşılaştırması · GitHub Copilot açısından ürün artık sadece autocomplete değildir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-71** (21607–22216): Araç ve repo karşılaştırması · OpenAI Codex tarafında da “eski Codex code completion modeli” ile güncel Codex ürününü ayırmak gerekiyor. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-72** (22216–22277): Araç ve repo karşılaştırması · Açık kaynak ve araştırma ekosisteminde ise tablo farklıdır: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-73** (22277–22392): Araç ve repo karşılaştırması · Proje / model — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-74** (22392–22712): Araç ve repo karşılaştırması · StarCoder2 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-75** (22712–22965): Araç ve repo karşılaştırması · CodeGen / CodeGen2.5 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-76** (22965–23288): Araç ve repo karşılaştırması · AlphaCode / AlphaCode 2 — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-77** (23288–23569): Araç ve repo karşılaştırması · Qwen3-Coder-Next — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-78** (23569–23761): Araç ve repo karşılaştırması · Qwen Code — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-79** (23761–24070): Araç ve repo karşılaştırması · OpenHands — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-80** (24070–24330): Araç ve repo karşılaştırması · SWE-agent — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-81** (24330–24539): Araç ve repo karşılaştırması · Aider — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-82** (24539–24761): Araç ve repo karşılaştırması · LangChain — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-83** (24761–24993): Araç ve repo karşılaştırması · LlamaIndex — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-84** (24993–25229): Araç ve repo karşılaştırması · Haystack — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-85** (25229–25507): Araç ve repo karşılaştırması · Hugging Face Transformers — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-86** (25507–25792): Araç ve repo karşılaştırması · Continue — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-87** (25792–25831): Araç ve repo karşılaştırması · Burada özellikle bir ayrım yapılmalı: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-88** (25831–25999): Araç ve repo karşılaştırması · StarCoder2, CodeGen, AlphaCode gibi “model/araştırma projeleri” ile Copilot, Codex, Cursor, Aider, OpenHa — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-89** (25999–26306): Araç ve repo karşılaştırması · 2026 itibarıyla doğrudan üretkenlik için genellikle agent/runtime seçmek, sıfırdan model seçip inference  — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-90** (26306–26816): Araç ve repo karşılaştırması · Benzer biçimde LangChain/LlamaIndex/Haystack coding assistant değildir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-91** (26816–27203): Araç ve repo karşılaştırması · Codeium konusu ayrıca güncellik açısından dikkat çekicidir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-92** (27203–27454): Somut kullanım desenleri ve mimari · AI’nin en yüksek getiriyi sağladığı işleri “kod yazdırmak” şeklinde genellemek doğru değildir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-93** (27454–27560): Somut kullanım desenleri ve mimari · İş — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-94** (27560–27680): Somut kullanım desenleri ve mimari · Boilerplate — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-95** (27680–27825): Somut kullanım desenleri ve mimari · Unit test — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-96** (27825–27979): Somut kullanım desenleri ve mimari · Regression test — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-97** (27979–28122): Somut kullanım desenleri ve mimari · Refactor — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-98** (28122–28259): Somut kullanım desenleri ve mimari · Migration — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-99** (28259–28375): Somut kullanım desenleri ve mimari · Documentation — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-100** (28375–28511): Somut kullanım desenleri ve mimari · Code explanation — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-101** (28511–28618): Somut kullanım desenleri ve mimari · PR summary — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-102** (28618–28753): Somut kullanım desenleri ve mimari · Code review — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-103** (28753–28857): Somut kullanım desenleri ve mimari · Bug fixing — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-104** (28857–28971): Somut kullanım desenleri ve mimari · Issue → PR — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-105** (28971–29099): Somut kullanım desenleri ve mimari · Security remediation — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-106** (29099–29233): Somut kullanım desenleri ve mimari · Dependency upgrade — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-107** (29233–29364): Somut kullanım desenleri ve mimari · E2E frontend — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-108** (29364–29496): Somut kullanım desenleri ve mimari · Incident RCA — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-109** (29496–29625): Somut kullanım desenleri ve mimari · Production fix — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-110** (29625–29757): Somut kullanım desenleri ve mimari · En önemli pattern spec → failing test → implementation → verification şeklindedir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-111** (29757–30016): Somut kullanım desenleri ve mimari · > “Önce mevcut davranışı analiz et. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-112** (30016–30387): Somut kullanım desenleri ve mimari · şeklinde bir görev tanımı sonuçların güvenilirliğini önemli ölçüde artırır. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-113** (30387–30462): Somut kullanım desenleri ve mimari · İkinci güçlü pattern deterministik analiz → AI remediation modelidir: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-114** (30462–30848): Somut kullanım desenleri ve mimari · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-115** (30848–31227): Somut kullanım desenleri ve mimari · Bu mimari, LLM’in “güvenli mi?” diye kendi ürettiği koda bakması yerine, güvenlik scanner’ının somut find — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-116** (31227–31640): Somut kullanım desenleri ve mimari · Bu ayrım özellikle önemlidir çünkü GitHub kendi dokümanında LLM tabanlı düzeltmelerin syntactically incor — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-117** (31640–32098): Somut kullanım desenleri ve mimari · Pre-commit / local hook pattern’i için ise en iyi kullanım, AI review’u her keystroke’ta çalıştırmak deği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-118** (32098–32146): Somut kullanım desenleri ve mimari · Örnek bir repository standardı şöyle olabilir: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-119** (32146–32436): Somut kullanım desenleri ve mimari · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-120** (32436–32722): Somut kullanım desenleri ve mimari · Buradaki esas fikir “AI için özel doküman yazmak”tan çok insanların zaten bilmesi gereken gizli bilgiyi e — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-121** (32722–32778): Somut kullanım desenleri ve mimari · İyi bir `AGENTS.md` yaklaşık şu bilgileri taşımalıdır: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-122** (32778–33513): Somut kullanım desenleri ve mimari · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-123** (33513–33739): Somut kullanım desenleri ve mimari · Bu yaklaşım Metaframer/Metaframework benzeri framework düzeyindeki projelerde özellikle değerlidir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-124** (33739–33802): Somut kullanım desenleri ve mimari · Bir başka yüksek değerli pattern production incident’larıdır: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-125** (33802–34417): Somut kullanım desenleri ve mimari · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-126** (34417–34739): Somut kullanım desenleri ve mimari · Sentry Seer güncel olarak errors, traces, logs ve source context üzerinden root-cause araştırması yapabil — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-127** (34739–34772): Somut kullanım desenleri ve mimari · Buradaki pragmatik kural şudur: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-128** (34772–34843): Somut kullanım desenleri ve mimari · Observability veriniz kötüyse AI observability de kötü olacaktır. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-129** (34843–35059): Somut kullanım desenleri ve mimari · Trace propagation, structured logging, deployment markers, release/version mapping ve ownership bilgisini — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-130** (35059–35185): Somut kullanım desenleri ve mimari · RAG ve MCP’yi birlikte kullanma pattern’i de özellikle PIM, HRMS ve İBYS gibi domain-heavy sistemlerde an — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-131** (35185–35570): Somut kullanım desenleri ve mimari · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-132** (35570–35904): Somut kullanım desenleri ve mimari · Örneğin bir PIM projesinde “ürün attribute inheritance bug’ını düzelt” görevinin doğru yapılması için kod — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-133** (35904–36172): Fayda, ölçüm ve gerçekçi ROI · AI developer tooling’in faydasını tek bir “yüzde kaç daha hızlı?” sayısına indirgemek metodolojik olarak  — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-134** (36172–36202): Fayda, ölçüm ve gerçekçi ROI · Kanıtlar şu anda karışıktır: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-135** (36202–36257): Fayda, ölçüm ve gerçekçi ROI · Kaynak — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-136** (36257–36596): Fayda, ölçüm ve gerçekçi ROI · GitHub Copilot araştırmaları — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-137** (36596–36942): Fayda, ölçüm ve gerçekçi ROI · Büyük codebase üzerinde akademik/saha değerlendirmesi — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-138** (36942–37203): Fayda, ölçüm ve gerçekçi ROI · METR 2025 RCT — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-139** (37203–37459): Fayda, ölçüm ve gerçekçi ROI · METR 2026 takip çalışması — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-140** (37459–37683): Fayda, ölçüm ve gerçekçi ROI · DORA — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-141** (37683–38017): Fayda, ölçüm ve gerçekçi ROI · 2026 longitudinal developer çalışması — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-142** (38017–38049): Fayda, ölçüm ve gerçekçi ROI · Buradan çıkan en önemli sonuç: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-143** (38049–38124): Fayda, ölçüm ve gerçekçi ROI · > Algılanan hız kazanımı ile gerçek throughput’u ayrı ölçmek gerekir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-144** (38124–38448): Fayda, ölçüm ve gerçekçi ROI · Developer “bug’ı iki dakikada çözdüm” hissine sahip olabilir fakat gereksiz büyük diff, AI review yorumla — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-145** (38448–38511): Fayda, ölçüm ve gerçekçi ROI · Bu nedenle ekip seviyesinde aşağıdaki metric setini öneririm: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-146** (38511–38590): Fayda, ölçüm ve gerçekçi ROI · Metrik — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-147** (38590–38670): Fayda, ölçüm ve gerçekçi ROI · Time-to-first-PR — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-148** (38670–38746): Fayda, ölçüm ve gerçekçi ROI · Time-to-merge — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-149** (38746–38826): Fayda, ölçüm ve gerçekçi ROI · PR cycle time — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-150** (38826–38910): Fayda, ölçüm ve gerçekçi ROI · Review latency — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-151** (38910–39018): Fayda, ölçüm ve gerçekçi ROI · Review rounds — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-152** (39018–39123): Fayda, ölçüm ve gerçekçi ROI · PR size — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-153** (39123–39217): Fayda, ölçüm ve gerçekçi ROI · Build failure rate — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-154** (39217–39312): Fayda, ölçüm ve gerçekçi ROI · Test coverage — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-155** (39312–39419): Fayda, ölçüm ve gerçekçi ROI · Mutation score — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-156** (39419–39509): Fayda, ölçüm ve gerçekçi ROI · Escaped defect rate — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-157** (39509–39611): Fayda, ölçüm ve gerçekçi ROI · Change failure rate — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-158** (39611–39716): Fayda, ölçüm ve gerçekçi ROI · MTTR / failed deployment recovery — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-159** (39716–39806): Fayda, ölçüm ve gerçekçi ROI · Security remediation time — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-160** (39806–39927): Fayda, ölçüm ve gerçekçi ROI · AI suggestion acceptance — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-161** (39927–40026): Fayda, ölçüm ve gerçekçi ROI · AI-generated LOC — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-162** (40026–40107): Fayda, ölçüm ve gerçekçi ROI · Developer satisfaction — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-163** (40107–40201): Fayda, ölçüm ve gerçekçi ROI · Verification burden — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-164** (40201–40279): Fayda, ölçüm ve gerçekçi ROI · Cost per merged PR — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-165** (40279–40378): Fayda, ölçüm ve gerçekçi ROI · Cost per accepted AI task — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-166** (40378–40714): Fayda, ölçüm ve gerçekçi ROI · Özellikle AI-generated LOC oranını KPI yapmamak gerekir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-167** (40714–40748): Fayda, ölçüm ve gerçekçi ROI · Daha doğru pilot tasarımı şudur: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-168** (40748–41088): Fayda, ölçüm ve gerçekçi ROI · Baseline dönem: en az 2–4 hafta. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-169** (41088–41783): Fayda, ölçüm ve gerçekçi ROI · Örneğin 25 kişilik bir ekipte kişi başına ayda yalnızca 2 saat gerçek net kazanç sağlansa bile toplam 50  — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-170** (41783–42201): Fayda, ölçüm ve gerçekçi ROI · Defect reduction konusunda bugün savunulabilir tek bir sektör geneli yüzde vermek mümkün değildir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-171** (42201–42287): Fayda, ölçüm ve gerçekçi ROI · Onboarding’de ise AI’nin değeri daha nettir ama yine ölçülmelidir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-172** (42287–42526): Fayda, ölçüm ve gerçekçi ROI · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-173** (42526–42748): Fayda, ölçüm ve gerçekçi ROI · gibi sorular sorabilir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-174** (42748–42971): Riskler, yönetişim ve maliyet · AI coding’in en önemli riskleri yalnızca hallucination değildir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-175** (42971–43051): Riskler, yönetişim ve maliyet · Risk — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-176** (43051–43161): Riskler, yönetişim ve maliyet · Hallucination — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-177** (43161–43290): Riskler, yönetişim ve maliyet · Semantik hata — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-178** (43290–43395): Riskler, yönetişim ve maliyet · Security bug — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-179** (43395–43520): Riskler, yönetişim ve maliyet · Oversized change — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-180** (43520–43640): Riskler, yönetişim ve maliyet · Dependency hallucination — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-181** (43640–43765): Riskler, yönetişim ve maliyet · Secret leakage — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-182** (43765–43906): Riskler, yönetişim ve maliyet · Source-code leakage — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-183** (43906–44050): Riskler, yönetişim ve maliyet · Personal-data leakage — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-184** (44050–44173): Riskler, yönetişim ve maliyet · License/IP — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-185** (44173–44309): Riskler, yönetişim ve maliyet · Prompt injection — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-186** (44309–44439): Riskler, yönetişim ve maliyet · Excessive agency — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-187** (44439–44567): Riskler, yönetişim ve maliyet · Review complacency — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-188** (44567–44674): Riskler, yönetişim ve maliyet · Cost runaway — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-189** (44674–44803): Riskler, yönetişim ve maliyet · Vendor lock-in — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-190** (44803–44924): Riskler, yönetişim ve maliyet · Vendor roadmap — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-191** (44924–45257): Riskler, yönetişim ve maliyet · GitHub kendi responsible-use belgelerinde LLM tabanlı Autofix’in yanlış location, syntax veya semantic de — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-192** (45257–45650): Riskler, yönetişim ve maliyet · MCP ve agent dünyasında yeni bir güvenlik sınırı daha oluşuyor. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-193** (45650–45697): Riskler, yönetişim ve maliyet · Pratik permission model şu şekilde olmalıdır: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-194** (45697–46020): Riskler, yönetişim ve maliyet · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-195** (46020–46137): Riskler, yönetişim ve maliyet · Başlangıçta ajanların A–C seviyesinde tutulması, Level D eylemlerinin explicit human approval istemesi ge — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-196** (46137–46202): Riskler, yönetişim ve maliyet · Agent sandbox’ları ayrıca mümkün olduğunca ephemeral olmalıdır: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-197** (46202–46411): Riskler, yönetişim ve maliyet · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-198** (46411–46577): Riskler, yönetişim ve maliyet · OpenAI Codex görevleri izole cloud sandbox’larında çalıştırma yaklaşımını kullanıyor; bu agent mimarisind — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-199** (46577–47039): Riskler, yönetişim ve maliyet · Veri gizliliği Türkiye açısından ayrıca kritik. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-200** (47039–47179): Riskler, yönetişim ve maliyet · Bu nedenle özellikle HRMS veya İBYS gibi sistemlerde aşağıdaki içerikler doğrudan genel-purpose cloud cod — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-201** (47179–47343): Riskler, yönetişim ve maliyet · gerçek çalışan kayıtları, sağlık/iş güvenliği verileri, müşteri credential’ları, production dump’ları, er — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-202** (47343–47553): Riskler, yönetişim ve maliyet · Bunların yerine sentetik fixtures, masked telemetry ve minimum gerekli context kullanılmalıdır. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-203** (47553–48000): Riskler, yönetişim ve maliyet · Lisans açısından da “open-source model” ifadesi dikkatle kullanılmalıdır. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-204** (48000–48133): Riskler, yönetişim ve maliyet · Maliyet tarafında, ekip büyüklüğü ve mevcut toolchain verilmediği için aşağıdaki rakamlar planlama tahmin — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-205** (48133–48271): Riskler, yönetişim ve maliyet · Senaryo — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-206** (48271–48431): Riskler, yönetişim ve maliyet · Düşük — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-207** (48431–48636): Riskler, yönetişim ve maliyet · Orta — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-208** (48636–48826): Riskler, yönetişim ve maliyet · Yüksek — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-209** (48826–49074): Riskler, yönetişim ve maliyet · Regulated/self-host ağırlıklı — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-210** (49074–49621): Riskler, yönetişim ve maliyet · Kamu fiyatları bu tahminleri kalibre etmek için fikir veriyor: GitHub bireysel Copilot planlarında Free/P — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-211** (49621–49792): Riskler, yönetişim ve maliyet · Bunun önemli sonucu şu: aynı anda Copilot + Cursor + CodeRabbit + Qodo + Codex + ayrı security AI satın a — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-212** (49792–49893): Riskler, yönetişim ve maliyet · 25 kişilik ekipte ilk hedef en çok özellik değil, en az araçla en fazla SDLC kapsamı olmalıdır. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-213** (49893–50105): Uygulama yol haritası ve önerilen sonraki adımlar · Orta ölçekli bir ekipte AI coding dönüşümünü bir “tool rollout” değil, software delivery capability geliş — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-214** (50105–50179): Uygulama yol haritası ve önerilen sonraki adımlar · Aşama — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-215** (50179–50327): Uygulama yol haritası ve önerilen sonraki adımlar · Baseline — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-216** (50327–50535): Uygulama yol haritası ve önerilen sonraki adımlar · Repository readiness — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-217** (50535–50677): Uygulama yol haritası ve önerilen sonraki adımlar · IDE pilot — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-218** (50677–50804): Uygulama yol haritası ve önerilen sonraki adımlar · Agent pilot — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-219** (50804–50937): Uygulama yol haritası ve önerilen sonraki adımlar · Review/test — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-220** (50937–51046): Uygulama yol haritası ve önerilen sonraki adımlar · Security — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-221** (51046–51194): Uygulama yol haritası ve önerilen sonraki adımlar · Context integration — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-222** (51194–51309): Uygulama yol haritası ve önerilen sonraki adımlar · Observability — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-223** (51309–51449): Uygulama yol haritası ve önerilen sonraki adımlar · Scale/governance — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-224** (51449–51553): Uygulama yol haritası ve önerilen sonraki adımlar · İlk iki haftada teknoloji satın almaktan önce aşağıdaki repository hazırlığını yapmak daha değerlidir: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-225** (51553–52030): Uygulama yol haritası ve önerilen sonraki adımlar · Kod standardını makinece okunabilir hale getirin. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-226** (52030–52080): Uygulama yol haritası ve önerilen sonraki adımlar · Ben olsaydım ilk pilotu şu şekilde kurardım: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-227** (52080–52543): Uygulama yol haritası ve önerilen sonraki adımlar · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-228** (52543–52918): Uygulama yol haritası ve önerilen sonraki adımlar · İlk pilotta CodeRabbit/Qodo gibi ikinci review katmanını eklemem. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-229** (52918–53001): Uygulama yol haritası ve önerilen sonraki adımlar · İkinci fazda Codex veya benzeri agent’a yalnız seçilmiş task tipleri veririm: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-230** (53001–53368): Uygulama yol haritası ve önerilen sonraki adımlar · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-231** (53368–53534): Uygulama yol haritası ve önerilen sonraki adımlar · Codex’in repository içinde özellik yazma, bug düzeltme ve testleri iteratif çalışma tasarımı bu tür bound — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-232** (53534–53635): Uygulama yol haritası ve önerilen sonraki adımlar · Üçüncü fazda agent görevlerini issue template ile standardize etmek ciddi kalite artışı sağlar: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-233** (53635–54258): Uygulama yol haritası ve önerilen sonraki adımlar · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-234** (54258–54344): Uygulama yol haritası ve önerilen sonraki adımlar · Bu yapı, “prompt engineering”den daha önemli olan task engineering yaklaşımıdır. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-235** (54344–54997): Uygulama yol haritası ve önerilen sonraki adımlar · Dördüncü fazda MCP/RAG eklerim fakat yalnız ölçülen context problemi varsa. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-236** (54997–55067): Uygulama yol haritası ve önerilen sonraki adımlar · Kendi ürün portföyünüz açısından farklı optimizasyonlar yapılabilir: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-237** (55067–55125): Uygulama yol haritası ve önerilen sonraki adımlar · Proje tipi — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-238** (55125–55287): Uygulama yol haritası ve önerilen sonraki adımlar · Metaframer / Metaframework — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-239** (55287–55408): Uygulama yol haritası ve önerilen sonraki adımlar · PIM — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-240** (55408–55529): Uygulama yol haritası ve önerilen sonraki adımlar · HRMS — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-241** (55529–55661): Uygulama yol haritası ve önerilen sonraki adımlar · İBYS — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-242** (55661–55813): Uygulama yol haritası ve önerilen sonraki adımlar · Crybro — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-243** (55813–55928): Uygulama yol haritası ve önerilen sonraki adımlar · Yeni SaaS ürünleri — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-244** (55928–56587): Uygulama yol haritası ve önerilen sonraki adımlar · Özellikle Metaframer için uzun vadede en yüksek kaldıraç, framework’ün kendisini agent-native tasarlamak  — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-245** (56587–56662): Uygulama yol haritası ve önerilen sonraki adımlar · Bu nedenle önümüzdeki 3–6 ay için benim somut yatırım sıralamam şöyledir: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-246** (56662–56781): Uygulama yol haritası ve önerilen sonraki adımlar · Önce repository’leri AI-ready hale getirin. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-247** (56781–57149): Uygulama yol haritası ve önerilen sonraki adımlar · Sonra tek bir günlük coding assistant standardize edin. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-248** (57149–57557): Uygulama yol haritası ve önerilen sonraki adımlar · Repo-level ağır işler için Codex CLI’yi ayrıca pilotlayın. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-249** (57557–57772): Uygulama yol haritası ve önerilen sonraki adımlar · Security’de AI’yi scanner’ın yerine koymayın. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-250** (57772–58093): Uygulama yol haritası ve önerilen sonraki adımlar · Test generation’ı en erken ölçeklenecek use-case’lerden biri yapın. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-251** (58093–58216): Uygulama yol haritası ve önerilen sonraki adımlar · PR review botlarını üst üste bindirmeyin. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-252** (58216–58479): Uygulama yol haritası ve önerilen sonraki adımlar · RAG’i erteleyin; context problemini kanıtladıktan sonra kurun. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-253** (58479–58923): Uygulama yol haritası ve önerilen sonraki adımlar · Self-hosted modele yalnız gerekçeniz varsa geçin. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-254** (58923–59266): Uygulama yol haritası ve önerilen sonraki adımlar · Observability AI’yi mevcut platformun üzerine koyun. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-255** (59266–59341): Uygulama yol haritası ve önerilen sonraki adımlar · Son olarak, teknoloji seçiminden daha önemli bir yönetim prensibi vardır: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-256** (59341–59423): Uygulama yol haritası ve önerilen sonraki adımlar · > AI’ye kod üretme hedefi değil, doğrulanmış değişiklik üretme hedefi verin. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-257** (59423–59450): Uygulama yol haritası ve önerilen sonraki adımlar · 2023’ün AI coding modeli: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-258** (59450–59478): Uygulama yol haritası ve önerilen sonraki adımlar · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-259** (59478–59507): Uygulama yol haritası ve önerilen sonraki adımlar · 2026’nın daha doğru modeli: — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-260** (59507–59719): Uygulama yol haritası ve önerilen sonraki adımlar · Kod / mimari örneği — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-261** (59719–60338): Uygulama yol haritası ve önerilen sonraki adımlar · Yazılım geliştirmede önümüzdeki dönemin gerçek verimlilik kazancı büyük olasılıkla “LLM daha hızlı kod ya — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D04-262** (60338–60872): Uygulama yol haritası ve önerilen sonraki adımlar · Pratik olarak sizin için en yüksek getirili hedef, “AI kod yazsın” değil; “AI küçük, test edilmiş, securi — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D04)
- **D05-01** (0–1606): Giriş ve kapsam — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-02** (1606–2639): 1. YONETICI OZETI: EYLUL 2026'DA GERCEKCI DURUM — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-03** (2639–3236): 1) Platform politikalari tam otomatik uretimi cezalandirir. YouTube resmi kaydina gore (support.google.com/youtube/answer/1311392), 15 Temmuz 2025'te sunu yapti — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-04** (3236–3481): 2) Kalite tavani insan yargisindadir. Bagimsiz kullanici raporlari (Reddit, GitHub issue'lari, YouTube incelemeleri) tutarli sekilde AI ciktisinin jenerik kaldi — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-05** (3481–4031): 3) Hukuki/uyum yuku artiyor. EU AI Act (Regulation (EU) 2024/1689) Article 50 seffaflik yukumlulukleri 2 Agustos 2026'dan itibaren gecerlidir; Komisyon rehber i — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-06** (4031–10086): 2. YAKLASIMLAR (5 ANA URETIM YAKLASIMI) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-07** (10086–15037): 3. ARACLAR (KATEGORILI PEYZAJ) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-08** (15037–17551): 4. OPENCLAW: NE OLDUGU VE n8n ILE KOMBINASYON — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-09** (17551–17812): 5. REFERANS MIMARILER (3 UCTAN UCA TASARIM) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-10** (17812–17897): MIMARI A — "Butce faceless hatti, agirlikli self-hosted" (~50-150 USD/ay + kullanim) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-11** (17897–17990): 1. Konu arastirmasi: AJAN (Claude/GPT/Gemini) trend/nis onerir; SISTEM Google Sheet'e yazar. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-12** (17990–18045): 2. Script: AJAN yazar; INSAN onaylar (1. ONAY KAPISI). — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-13** (18045–18105): 3. Seslendirme: SISTEM ElevenLabs API cagirir (Turkce ses). — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-14** (18105–18208): 4. Gorsel: SISTEM stok (Pexels) ceker veya self-hosted Wan 2.2 (RunPod GPU, klip basi ~0.25-0.60 USD). — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-15** (18208–18301): 5. Birlestirme/render: SISTEM Creatomate/Shotstack sablonu veya self-hosted FFmpeg/Remotion. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-16** (18301–18345): 6. Altyazi: SISTEM Whisper/Scribe (Turkce). — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-17** (18345–18387): 7. Thumbnail + metadata/SEO: AJAN uretir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-18** (18387–18492): 8. Yayin: SISTEM Postiz (self-host) veya Blotato ile yayinlar; INSAN final video onayi (2. ONAY KAPISI). — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-19** (18492–18666): 9. Analitik dongu: SISTEM YouTube/TikTok analitigini ceker; AJAN sonraki konulari onerir. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-20** (18666–18813): MIMARI B — "Premium jeneratif + avatar hatti, API uzerinden" (~300-800 USD/ay + kullanim) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-21** (18813–18861): 3. Seslendirme: ElevenLabs veya Veo native ses. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-22** (18861–18940): 4. Video: SISTEM Kling 3.0/Veo 3.1 (jeneratif) + HeyGen (avatar talking-head). — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-23** (18940–19044): 5. Montaj: SISTEM Creatomate; repurposing icin OpusClip/Vizard. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-24** (19044–19112): 8. Yayin: Blotato (denetimden gecmis) + INSAN final onay (2. kapi). — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-25** (19112–19288): 9. Analitik: AJAN A/B (kanca/baslik/thumbnail) karar dongusu; INSAN karar. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-26** (19288–19405): MIMARI C — "B2B SaaS pazarlama hatti, insan onay kapili" (~150-400 USD/ay + kullanim) — bu kullanicinin ana ihtiyaci — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-27** (19405–19478): 1. Girdi: INSAN urun/ozellik notu verir (veya Notion/Drive'dan cekilir). — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-28** (19478–19550): 2. Script: AJAN (marka sesi prompt'uyla) yazar; INSAN duzenler+onaylar. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-29** (19550–19634): 3. Sunum: HeyGen/Synthesia avatar (LinkedIn thought-leadership) veya Veo urun demo. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-30** (19634–19694): 4. Seslendirme: ElevenLabs (kurumsal Turkce/Ingilizce ses). — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-31** (19694–19758): 5. Render: Remotion (marka-tutarli, self-host) veya Creatomate. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-32** (19758–19863): 6. Yayin: LinkedIn API + Ayrshare/Blotato; INSAN her video onayi (yuksek marka riski nedeniyle zorunlu). — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-33** (19863–20124): 7. Analitik: SISTEM raporlar; INSAN strateji karari. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-34** (20124–22408): 6. OTOMASYONLAR NASIL KURULUR (ADIM ADIM + API ONAY SURECLERI) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-35** (22408–22459): 7. NELER YAPMAK LAZIM (ONCELIKLI KONTROL LISTESI) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-36** (22459–22589): 1. Hetzner'de n8n'i (Docker) ve OpenClaw'u izole kullanici + kapsamli anahtarlarla kur; GitHub private repo deploy hattini bagla. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-37** (22589–22733): 2. ElevenLabs (Turkce ses) + bir LLM (Claude/GPT/Gemini) + bir render katmani (Creatomate veya self-host FFmpeg/Remotion) API anahtarlarini al. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-38** (22733–22824): 3. Yayin icin Blotato (hizli, denetimden gecmis) VEYA Postiz (self-host, lock-in yok) sec. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-39** (22824–22959): 4. TikTok app review ve Instagram app review sureclerini HEMEN baslat (haftalar surer); YouTube kotasi icin gerekirse audit talebi ac. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-40** (22959–23060): 5. Iki onay kapisi tasarla: script onayi + final video onayi (OpenClaw ile mobilden Telegram onayi). — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-41** (23060–23172): 6. AI aciklama is-akisini kur: YouTube altered-content toggle, TikTok AI label, EU AI Act makine-okunur isaret. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-42** (23172–23273): 7. Tek nis ile basla, 10-20 video ile test et, sonra n8n workflow'unu duplicate ederek kanal cogalt. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-43** (23273–23384): 8. Analitik geri-besleme dongusu kur: YouTube/TikTok API'den metrik cek, AJAN A/B onersin, INSAN karar versin. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-44** (23384–23466): 9. Muzik lisansini netlestir (Bolum 8) — Epidemic/Artlist Pro veya dikkatli Suno. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-45** (23466–23562): 10. Maliyet tavani koy: jeneratif saniye-basi ve token maliyetlerine aylik hard-limit tanimla. — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-46** (23562–28430): 8. BILINMEYEN BILINMEYENLER (TUZAKLAR) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-47** (28430–29470): 9. GAP ANALIZI — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-48** (29470–30841): 10. KAYNAKLAR (URL'LER) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D05-49** (30841–32636): 11. GUVENLI / RISKLI / KURUMSAL-DOGRU / BU KULLANICI ICIN PRATIK ONERI — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D05)
- **D06-01** (0–105): Giriş ve kapsam — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-02** (105–1569): TL;DR — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-03** (1569–3037): Genel Bakış (sade dil) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-04** (3037–3077): 1. Kodlama Ajanları ve Orkestrasyon — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-05** (3077–5457): Claude Code (Anthropic) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-06** (5457–6988): OpenAI Codex (CLI + Cloud + Agents API) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-07** (6988–7813): Cursor 2.x (background/paralel ajanlar) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-08** (7813–8250): Diğer ajanlar (kısa) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-09** (8250–9400): Ajan Yöneticileri / Orkestratörler (git worktree tabanlı) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-10** (9400–9460): 2. Spec-Driven Development ve Ajan-Context Standartları — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-11** (9460–11355): AGENTS.md — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-12** (11355–12327): GitHub Spec Kit — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-13** (12327–13030): Diğer: Kiro-style specs, BMAD, Superpowers-style skill kütüphaneleri, Agent Skills standardı — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-14** (13030–16004): 3. MCP (Model Context Protocol) Ekosistemi — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-15** (16004–16448): FastMCP (Python) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-16** (16448–16848): 4. AI-Destekli Test/QA ve "Self-Healing" Pipeline'lar — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-17** (16848–17973): Agentic test üretimi + Playwright MCP / browser ajanları — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-18** (17973–19661): AI PR review araçları (aktörleri açıkça) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-19** (19661–20303): Otomatik PR-fix ajanları ve CI/CD — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-20** (20303–20359): 5. Açık-Ağırlıklı Kodlama Modelleri ve Self-Hosting — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-21** (20359–21785): Eylül 2026 itibarıyla en iyi açık-ağırlıklı kodlama modelleri — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-22** (21785–22719): Inference serving seçenekleri — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-23** (22719–23581): 128 GB M5 Max MacBook'ta gerçekçi olarak ne çalışır? — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-24** (23581–24273): Hetzner GPU seçenekleri (15 eşzamanlı ajan için) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-25** (24273–26418): Cost/benefit: Self-host vs API (senin 15-ajan-7/24 profilin) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-26** (26418–27104): OpenRouter — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-27** (27104–27152): 6. Workflow Otomasyonu ve Ajan Platformları — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-28** (27152–28166): OpenClaw (senin decision/action ajan katmanın) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-29** (28166–29011): n8n (senin deterministik workflow katmanın) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-30** (29011–29641): Diğer ajan framework'leri (sadece pragmatik değer varsa) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-31** (29641–29701): 7. Python/FastAPI ve React/TypeScript'e Özel AI Tooling — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-32** (29701–30780): Python tarafı — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-33** (30780–31163): React/TypeScript tarafı — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-34** (31163–32124): Design-to-code (Next.js YASAK — düz React/Vite alternatifleri) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-35** (32124–33339): 8. DevOps/Infra AI — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-36** (33339–34755): 9. Son 12 Ayda Yıldızlanmaya Değer GitHub Repo'ları — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-37** (34755–36928): 10. Riskler ve Anti-Pattern'ler + Guardrail'ler — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-38** (36928–39461): Nereden Başlamalı: İsmail için Öncelikli Adımlar — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-39** (39461–39990): Şimdilik atlanacaklar (skip) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-40** (39990–40769): OpenClaw + n8n senaryosu (sadece gerçekten oturduğu yerde) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
- **D06-41** (40769–42014): Caveat'ler (Belirsizlikler) — [Kapsam haritası](https://karacaismail.github.io/futuristic/#/coverage?doc=D06)
