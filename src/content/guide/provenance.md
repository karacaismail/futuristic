## Kaynak izi, filigran ve açıklama

C2PA, SynthID ve platformdaki “AI ile üretildi” seçeneği farklı katmanlardır. C2PA imzalı bir içerik geçmişi/manifest sunabilir; SynthID gibi filigranlar içerikte tespit edilebilir işaret taşır; kullanıcı açıklaması izleyiciyi bilgilendirir. Hiçbiri videonun anlattığı olayın doğru olduğunu tek başına kanıtlamaz.

## Uygulama: provenance bilgisini üretimden yayına taşı

1. Üreticiden gelen özgün dosyayı ve varsa credential/manifest bilgisini sakla. Dosya hash'i, üretici, model sürümü, üretim zamanı ve referansların hak kaydı ilişkilensin.
2. Kurgu ve transcode sonrasında metadata/credential durumunu yeniden kontrol et. Bir önceki dosyanın imzasını değişmiş dosyaya aynen taşımak geçerli imza oluşturmaz. Türev ilişkiyi destekleyen araç varsa yeni manifest üretir.
3. Final çıktı için “hangi öğeler üretildi, hangi öğeler kaydedildi, hangi değişiklikler yapıldı?” kaydını tut. AI ses, gerçek görüntü ve sentetik B-roll aynı videoda olabilir.
4. Platforma uygun disclosure alanını ve gerekiyorsa görünür açıklamayı ayarla. API'nin bu alanı desteklemesi, alanın iş akışında gerçekten gönderildiği test edilerek doğrulanır.
5. Yayın sonrası indirilen/servis edilen dosyada metadata veya filigran korunmuş mu örnekle. Platformun yeniden kodlaması bazı bilgileri kaybettirebilir; kesin korunma sözü verme.

### Politika ve tarih düzeltmeleri

D01'in YouTube “inauthentic content” değişikliğini Temmuz 2026'ya bağlaması hatalıdır; doğrulama kaydı **15 Temmuz 2025** tarihini gösterir. Tekrarlı, seri üretilmiş veya düşük özgün katkılı içerik monetizasyon riski taşıyabilir. AI kullanımı tek başına bütün içeriklerin demonetize olduğu anlamına gelmez. 16 kanal / 35M abone kapatma ve TikTok shadowban oranları kaynak iddiası olarak saklanır, platform garantisi gibi kullanılmaz.

D05'in TikTok'ta Kasım 2025 için 1,3 milyar, Temmuz 2026 için 3 milyar etiketli içerik ve Temmuz 27 kurul açıklaması sayıları kaynak iddiasıdır; farklı tarih/ölçüm tanımı güncel oran çıkarmaya yetmez. Etiket sayısı toplam AI içerik hacmini veya erişim etkisini tek başına vermez.

AB AI Act m.50; sağlayıcı ve sistemi kullanan tarafın farklı yükümlülüklerini ayırır. Kaynağın tüm medya için tek bir zorunluluk ve tek yürürlük tarihi vermesi fazla geneldir. Mevcut doğrulama kaydı, konsolide metindeki sağlayıcı m.50(2) kapsamı ve geçiş tarihlerini ayırır. D01'in €15M / dünya cirosunun %3'ü ifadesi her olayda otomatik kesilecek ceza değildir; ihlal türü ve hukuk değerlendirmesi gerekir.

## Karar: doğruluk kontrolünü metadata'ya devretme

Teknik provenance, hak zinciri ve editoryal doğrulama ayrı kayıtlar olarak tutulur. AI etiketlemek yanlış ürün iddiasını düzeltmez; metadata silinmesi de tek başına sahtecilik kanıtı değildir. Türkiye tarafında KVKK, ses/görüntü rızası ve RTÜK kapsamı ayrıca ele alınır. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03) [D05](#/sources?doc=D05)
