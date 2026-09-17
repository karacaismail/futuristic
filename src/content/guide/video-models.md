## Üretici seçimi model adından önce shot ihtiyacına dayanır

T2V metinden, I2V onaylı görselden, V2V var olan videodan yeni sahne üretir. First/last frame, referans görsel, kamera/hareket kontrolü, extend, reframe ve native audio birbirinden ayrı yeteneklerdir. Ürün geometrisinin doğru olması gereken sahnede metinden serbest üretim yerine onaylı packshot + I2V daha kontrollü bir başlangıçtır.

## Uygulama: aynı sahne setiyle sağlayıcı karşılaştırması

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

### Açık video modeli kolu

ComfyUI, JSON workflow ve async queue ile Wan 2.1/2.2, LTX-Video/LTX-2, HunyuanVideo ve CogVideoX için gateway olabilir. D03 çekirdeği GPL-3.0 olarak aktarır; özel node ve model ağırlığı lisansı ayrıca bakılır. D05 Wan için 24–80 GB, Hunyuan için 60–80 GB, LTX için bazı 24 GB yolları; D03 gelişmiş LTX workflow'u için 32 GB+ VRAM / 100 GB+ disk verir. **32/100 bütün ComfyUI kurulumlarının evrensel minimumu değildir.** D05'in Wan 2.5+ kapalı ağırlık iddiası sürüm bazında teyit gerektirir.

### Model gateway ve doğrudan API

fal.ai, Replicate ve ModelsLab; birden çok modele ortak erişim yüzeyi olarak D03/D05'te yer alır. D05'in ModelsLab için 600+ model iddiası kalite veya bütün modellerde aynı ticari hak anlamına gelmez. Gateway input şeması, async job, webhook, çıktı URL ömrü, kredi ve provider hatasını kendi adaptörüne çevir. Doğrudan API'den geçişte ses/çözünürlük fiyatının eşit olduğunu varsayma. Kaynaktaki Runway Gen-4.5 enterprise waitlist ifadesi de tarihli erişim iddiasıdır; güncel genel erişim sınırı diye kullanılmaz.

## Karar: görüntü kalitesi ve operasyonu birlikte seç

D03'ün LTX araştırması 5 sn / 24 fps / 768×512 çıktıyı H100'de 2 sn; CogVideoX için 10 sn / 768×1360 aktarır. Bunlar farklı model/ayar research rakamlarıdır; gerçek pipeline SLA'sı değildir. Cold-start, diskten ağırlık yükleme, queue, export ve yeniden denemeyi ekle. Gizli ürün görselleri için self-host, yüksek kalite hero shot için SaaS ve basit B-roll için ucuz rota birlikte değerlendirilebilir. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03) [D05](#/sources?doc=D05)
