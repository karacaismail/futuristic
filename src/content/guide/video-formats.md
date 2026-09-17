## Beş yöntem, üç farklı işletme senaryosu

Video otomasyonu tek bir yöntem değildir. Faceless stok montajı, avatar, jeneratif sahne, repurposing ve programatik kurgu farklı girdiler, insan işi ve maliyet yapıları taşır. Birinin “otomatik video” demesi diğerinin yaratıcı kontrolünü veya API kapsamını sağladığını göstermez.

## Uygulama: girdi ve teslimatı seçerek hat kur

| Yöntem                | Girdi → işlem → çıktı                                                        | Güçlü olduğu yer                                | Yapmadığı / kalite sınırı                                                              |
| --------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| Faceless              | Konu → LLM script → Pexels/Pixabay/Storyblocks klip → TTS → altyazı → render | Ucuz açıklayıcı, eğitim, tek niş pilot          | Anahtar kelime eşlemesi alakasız B-roll getirebilir; özgün bakış açısını garanti etmez |
| Avatar / talking-head | Onaylı metin/ses → sunucu/çeviri/lip-sync → kurumsal video                   | Onboarding, eğitim, LinkedIn ve çok dil         | Sinematik aksiyon ve uzun süre doğal duygu aynı kabiliyet değil                        |
| Tam jeneratif         | Storyboard + referans → kısa sahneler → seçim/yeniden üretim → assembly      | Hero shot, atmosfer ve ürün animasyonu          | Uzun form, fizik ve karakter sürekliliği garanti değil                                 |
| Repurposing           | Podcast/webinar/demo → transkript → kesit seçimi → reframe/altyazı           | Var olan uzun içeriğin değerini çoğaltma        | Kaynak içerik olmadan sıfırdan özgün video üretmez                                     |
| Programatik           | Varlık + veri + timeline → deterministik render                              | Marka şablonu, katalog, grafik, kişiselleştirme | Yaratıcı varlığı kendisi üretmez; diğer yöntemlerin ortak montaj katmanıdır            |

**Mimari A — bütçe faceless:** AJAN konu ve script önerir; İNSAN script'i onaylar; SİSTEM ElevenLabs, stok/Wan, Whisper/Scribe ve Remotion/FFmpeg veya cloud renderer'ı çağırır. AJAN thumbnail/metadata taslağı çıkarır; İNSAN final'i onaylar; SİSTEM Postiz/Blotato ve analytics'i yürütür. D05 $50–150/ay + kullanım, video başına $0,20–1 aktarır. Bunlar gerçek hacim ve hizmet planı belirtilmeden taahhüt değildir.

**Mimari B — premium generative + avatar:** script onayından sonra Kling/Veo sahneleri, gerektiğinde HeyGen, native audio veya ElevenLabs; Creatomate ile montaj; OpusClip/Vizard ile ek kesit; ikinci onaydan sonra yayın. D05 $300–800/ay + kullanım aktarır. Ortalama tekrar sayısı, avatar saniyesi ve premium shot oranı maliyeti belirler.

**Mimari C — İsmail için B2B:** ürün/özellik notu veya Notion/Drive girdisi → marka sesiyle script → insan düzenlemesi → HeyGen/Synthesia veya gerçek ürün referansıyla I2V → Remotion/Creatomate → LinkedIn uyarlaması → her video için final onay. D05 $150–400/ay + kullanım senaryosu verir. Ana KPI demo/lead/dönüşüm; faceless reklam geliriyle aynı değildir.

## Karar: template-first ve generative-first birlikte çalışır

Katalog, haber kartı, emlak ve çok sayıda benzer varyantta **template-first** seç: AI metin/varlık üretir, layout sabittir. Hero kampanya ve sinematik B-roll için **generative-first** seç: sahne keşfi daha pahalı ve daha değişkendir. Ortak `ContentJob`, shot list, asset manifest ve timeline sayesinde iki yaklaşımı aynı sistemde birleştir.

Başlangıç pilotu kaynakların önerdiği 30 saniyelik Türkçe dikey ürün anlatımı olabilir; bir format, tek marka kit'i ve sınırlı yayın hesabıyla kabul edilen çıktı maliyetini ölç. Niş seçimi, hook, ritim ve marka yargısı ayrı insan emeğidir. AutoShorts/InVideo/VEED gibi paketler hızlı başlangıç sağlar; özel kurgu, API ve hak kayıtlarını görünür kılan bir hat yerine otomatik olarak geçmez. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03) [D05](#/sources?doc=D05)
