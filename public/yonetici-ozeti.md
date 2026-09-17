# Futuristic — Yönetici özeti

**17 Eylül 2026 · v2.1**

[Yönetici özeti](yonetici-ozeti.md) · [Araştırma raporu](rapor.md) · [Tam ekler](rapor-ekleri.md)

## İsmail için önce hangi yatırım?

**Önce mevcut yazılım çalışma döngüsünü güçlendir; video tarafında tek bir B2B formatını pilotla.** MetaFramer/atonota’nın Next.js, React ve Supabase bağlamı ile FastAPI, Frappe ve ERPNext işleri; repo kuralları, domain sözlüğü, çalıştırılabilir test komutları ve dar yetkili araç bağlantılarından yararlanır. HRMS ve İBYS verilerinde aktarım, kayıt ve erişim koşulları ayrıca tasarlanmalıdır. Bu öneri D04/D06’nın kişisel bağlamının sentezidir; ölçülmüş verimlilik sonucu değildir.

Codex master / Claude worker çalışma tercihinde görev kabul ölçütünü baştan yaz. Önce hatayı gösteren test, ardından küçük değişiklik, mevcut kontroller ve insan incelemesi gelsin. Paralel ajan sayısını ancak görevler bağımsızsa artır; 15 ajan hedefini 15 eşzamanlı ağır model çağrısı varsayımıyla boyutlandırma. Ayrı worktree, görev durumu, çakışma kontrolü ve bütçe sınırı gerekir. [Kişisel karar haritası](https://karacaismail.github.io/futuristic/#/guide?topic=personal-stack) · [Kodlama döngüsü](https://karacaismail.github.io/futuristic/#/guide?topic=coding-agents)

## Video hattı: ürün notundan onaylı yayına

İlk deney, D05’in B2B mimari C akışını temel alabilir: ürün/özellik notu → marka sesine uygun senaryo → insan onayı → ses/avatar veya ürün görüntüsü → Remotion/Creatomate ile kurgu → teknik ve marka kontrolü → final onayı → yayın → analitik. n8n tetikleme ve servis çağrılarını; gerektiğinde bir ajan araştırma, senaryo ve yorumlamayı üstlenir. OpenClaw’ın mobil onay ve mesajlaşma rolü, sınırsız shell veya üretim hesabı yetkisi gerektirmez.

Faceless, avatar, jeneratif sahne, uzun videodan kısa klip ve şablon odaklı üretim ayrı yöntemlerdir. Aynı maliyet/kalite beklentisiyle değerlendirilmemelidir. D05’in A için $50–150, B için $300–800 ve C için $150–400 aylık aralıkları kullanım giderine ek kaynak senaryolarıdır. [Beş yöntem ve üç mimari](https://karacaismail.github.io/futuristic/#/guide?topic=video-formats) · [Yayın sözleşmeleri](https://karacaismail.github.io/futuristic/#/guide?topic=publishing)

## Kararı değiştiren sayılar

| Konu          | Kaynağın iddiası / kontrol                                                     | Karar etkisi                                                                                            |
| ------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Veo örneği    | D05: 30 sn × $0,75 için $12 yazıyor; doğru sonuç **$22,50**                    | Birim fiyatın güncelliği ayrıca değerlendirilir; yanlış çarpım bütçeye taşınmaz                         |
| Runway API    | 17 Eylül kontrolü: kredi $0,01; Gen-4.5 12 kredi/sn; Veo 3.1 sesli 40 kredi/sn | 8 saniye için sırasıyla $0,96 / $3,20; ret ve yeniden deneme faturayı büyütür                           |
| Hetzner / API | D06: €889 kira ve 150M token için $0,28/M API varsayımı                        | 150M token **$42** eder; tek başına kira karşısında self-host avantajını göstermez                      |
| GPU doluluğu  | 100 token/sn × 30 gün = 259,2M; %40 kullanımda **103,68M**                     | 150M token ile %40 doluluğu aynı kapasite varsayımı gibi kullanma                                       |
| GLM belleği   | D06: 744B toplam / 40B aktif parametre; tek 96 GB kart önerisi                 | 4 bitte yalnız ağırlık yaklaşık **372 GB**; aktif parametre sayısı depolanan ağırlığı küçültmez         |
| RPM           | D05: $7–25 RPM, gelir senaryosu                                                | $500 gideri karşılamak yaklaşık 71.429–20.000 eşdeğer görüntülenme gerektirir; gelir garantisi değildir |

[70 sayısal kayıt](https://karacaismail.github.io/futuristic/#/claims) özgün iddia ile değerlendirmeyi birlikte tutar. Farklı SWE-bench aileleri, vendor skorları ve gerçek ekip verimliliği aynı sıralama değildir. M5 Max tek oturum hızını, 15 ajan altında gecikme ve kalite garantisi olarak kullanma. [GPU ekonomisi](https://karacaismail.github.io/futuristic/#/guide?topic=gpu-economics) · [Benchmark ve üretkenlik](https://karacaismail.github.io/futuristic/#/guide?topic=measurement)

## Pilotun çıkış ölçütleri

Yazılım için kaynaklardaki 2–4 haftalık baseline ve 5–10 geliştiricilik pilot bir başlangıç tasarımıdır. Kendi ekip boyutuna uyarla; aynı görev sınıflarında toplam süre, ilk kabul, yeniden açılan hata, review yükü ve ücretli kullanım kaydı tut. Önce format/lint/typecheck/test ve repo bağlamı; ardından sınırlı issue → PR; telemetry → fix döngüsü daha sonra gelir.

Video için 10–20 içerikte kabul edilen çıktı başına toplam gideri, insan düzenleme süresini, sahne ret oranını ve yayın başarısını ölç. Başarı yalnız çıktı adedi değildir. Marka tutarlılığı, Türkçe telaffuz/altyazı, ses rızası, müzik hakkı ve platform açıklamaları onay aşamasında görünür olmalıdır. Başarı eşiğini başlamadan belirle; yeterli ölçüm yoksa pahalı GPU veya çok sayıda abonelik kararını ertele. [Pilot ve yatırım planı](https://karacaismail.github.io/futuristic/#/guide?topic=rollout)

## Bu raporu nasıl kullanmalı?

Bu özet öncelik seçimi içindir. Araştırma raporu 29 konunun yöntemini, adımlarını ve sınırlarını açıklar. Tam ekler araç verilerini, sayısal iddiaları, kontrol kayıtlarını ve 112 özgün referansı taşır. Katalogdaki “bilgi var” etiketi, bağımsız doğrulama anlamına gelmez. Kaynakta olmayan tarife ve lisans ayrıntıları uydurulmaz; ortak çalışma önerileri araç özelliği gibi sayılmaz.

Altı özgün belge, hash manifestosu ve ham indirme seçenekleri korunur. Kaynak pasajı bir bağlam izidir; karttaki her alanın tek başına kanıtı değildir. D01/D02’de kayıp satır yapısı nedeniyle okuma pasajları cümle sınırlarından, D04’te ise paragraflar ve tablo satırlarından oluşturulmuştur.


**Kayıt kapsamı:** 39 araç kaydında fiyat; 37 kayıtta lisans, açık kaynak sınıflandırması veya kullanım koşulu bilgisi var. Bilgi varlığı bağımsız doğrulama değildir. Araştırma raporu uygulama rehberlerini; tam ekler araç verileri, sayısal iddialar ve referans indeksini içerir.
