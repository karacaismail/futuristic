## Yönetmen ajan, üretim işçileri ve editör

D01'in Director–Screenwriter–SceneBuilder düzeni üç farklı sorumluluk tanımlar. Director hedef kitleyi, anlatı yayını ve marka sınırlarını seçer. Screenwriter doğrulanmış ürün bilgisinden metin ve sahne planı çıkarır. SceneBuilder onaylı sahne sözleşmesini üreticiye, sese ve kurguya çevirir. Her ajanı aynı uzun prompt ile çalıştırmak bu ayrımı sağlamaz; girdiler, çıktılar ve değiştirebilecekleri alanlar açık olmalıdır.

## Uygulama: brief'ten revizyona kontrollü döngü

1. Brief; amaç, platform, dil, süre, CTA, izinli kaynak, yasak iddia ve onay sahibini taşır. RAG ürün bilgisini getirir; kaynak bulunmayan özellik metne eklenmez.
2. Director anlatıyı problem → çözüm → kanıt → CTA gibi bir iskelete bağlar. Screenwriter anlatım metni, ekran metni ve sahne niyetini ayrı alanlarda yazar. Ses için uygun cümle uzunluğu ile ekranda okunabilir kelime sayısı aynı kısıt değildir.
3. Sahne planı şema kontrolünden geçer. Ürün logosu ve zorunlu açıklamalar generative modelin çizimine bırakılmayabilir; kurgu katmanında deterministik eklenir.
4. SceneBuilder her sahne için üretici, model, referans görsel, prompt sürümü, bütçe ve fallback seçer. Bir sahne hatası tüm videoyu yeniden üretmez.
5. VLM çıktıyı referansla karşılaştırır: ürün geometrisi, karakter kimliği, yazı, süreklilik, yasak öğe. VLM puanı otomatik gerçeklik kanıtı değildir; örneklem insan incelemesiyle kalibre edilir.
6. Revizyon notu belirli `scene_id` ve hata sınıfına bağlanır. Aynı hatada sonsuz regenerate yerine deneme sınırı, alternatif model veya editöre devretme uygulanır.

### Kaynaklardaki hazır hatlar

**OpenMontage**, D01'de 12 üretim hattı, 52 araç, 500+ skill, 14+ video API ve yedi boyutlu yönlendirme ile anlatılıyor. YAML manifest, Markdown skill ve HyperFrames katmanı modülerliği hedefliyor. Bunlar kaynak iddialarıdır; bağımsız doğrulanmış ürün kapsamı veya üretim garantisi değildir. Kendi adaptör sözleşmesi, pinlenmiş sürüm ve örnek çıktılarla PoC gerekir.

**MoneyPrinterTurbo** daha doğrusal bir başlangıçtır: `config.toml` → konu/metin → Pexels/Pixabay veya yerel stok → EdgeTTS → altyazı → dikey/yatay çıktı. Kaynakta OpenAI, Gemini, Moonshot, MiniMax ve OFoxAI/Shengsuanyun geçitleri anılır. Hızlı faceless deneyi sağlar; özgün araştırma, doğruluk, telif ve dağıtım güvenilirliğini otomatik çözmez.

**ShortGPT**, Python tabanlı düzenleme dili, TinyDB'de kalıcı durum, EdgeTTS/ElevenLabs ve görsel arama ile deneysel bir hat olarak tarif edilir. D01'in 30+ dil desteği iddiası her dilde aynı telaffuz kalitesi anlamına gelmez. Bakım durumu, bağımlılık sürümü ve varlıkların kullanım hakları değerlendirilmelidir.

## Karar: ajan sayısı yerine görev sınırını tasarla

Tek bir format ve az sayıda sahne için tek planlayıcı + deterministik renderer yeterli olabilir. Birden çok ajan; ürün bilgisi, yaratıcı seçim ve teknik yürütme gerçekten farklı bağlam/izin gerektiriyorsa değer katar. Modelin kendi çıktısını onaylaması bağımsız kalite kontrolü değildir. Final onayı metin taslağına değil render edilmiş varlık hash'ine bağla. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03) [D05](#/sources?doc=D05)
