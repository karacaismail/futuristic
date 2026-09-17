## Kapsam ve yöntem

Bu rapor 17 Eylül 2026 tarihinde kapsamı genişletilen bir araştırma sentezidir. Kullanıcının paylaştığı altı belgenin tamamı değişmeden arşivlendi. Video belgeleri D01/D03/D05; yazılım belgeleri D02/D04/D06 olarak kimliklendirildi. Ortak öneriler birleştirildi, farklı senaryolar ayrı tutuldu ve karar etkisi yüksek seçilmiş iddialar birincil kaynaklardan kontrol edildi.

**Arşiv bütünlüğü, anlamsal kapsam ve doğrulama ayrı sorumluluklardır.** İlk sürüm arşivi korudu fakat birçok yöntemi ve sayısal veriyi karar metnine taşımadı. Bu eksik, 29 ayrıntılı rehber, 177 araç kaydı ve 70 sayısal kayıtla giderilmeye çalışıldı; kapsam haritası denetimi görünür kılar. Konu eşleşmesi tek başına her ayrıntının yeterince açıklanmış olduğunun otomatik kanıtı değildir. Dış bağlantıların tamamı indekslendi; hepsinin güncel fiyatı, bütün sayfaların içeriği veya bütün akademik sonuçlar yeniden araştırılmadı. Doğrulama tablosu kontrol edilen iddiayı, tarihi, ilgili belgeyi ve kanıt bağlantısını ayrı gösterir.

## Dört kanıt seviyesi

- **Doğrulandı:** bağlantılı birincil kaynak, belirtilen dar iddiayı destekliyor.
- **Düzeltildi:** özgün belgede tarih, limit veya yorum sorunu var; sentezde düzeltme kullanılıyor.
- **Kaynak aktarımı:** belgede bulunan bağlantı, araç veya iddia; yeniden doğrulama anlamına gelmiyor.
- **Sentez / varsayım:** bu raporun mimari önerisi, deney tasarımı veya kullanıcı kontrollü hesap girdisi.

Araç kataloğu kaynakların rol ve kullanım senaryolarını bir araya getirir. Bir araç kartında yer almak, bağımsız performans testi, satın alma önerisi veya mevcut API erişimi garantisi değildir. Fiyatlar, skorlar, kapasite ve gelir projeksiyonları artık kaynak iddiası / kontrol / düzeltme / çelişki / senaryo durumlarıyla görünürdür. Farklı benchmark harness’leri tek sıralama yapılmaz; araç detayında bu alanların mevcut bilgisi veya eksikliği görünür. Ortak iş akışı ve seçim ölçütü editoryal sentez olarak etiketlenir. Fiyat ve lisans verisi filtreleri yalnız ilgili bilgi bulunan kayıtları seçer; birlikte kullanıldıklarında iki koşul da aranır.

## Kaynak izlenebilirliği

Her özgün dosya byte uzunluğu ve SHA-256 ile manifestoda yer alır. Kaynak sayfasında tam metni okumak, tek dosyayı indirmek veya altı belgeyi manifestoyla ZIP olarak almak mümkündür. Özgün TXT dosyaları ihtiyaç anında yüklenir. Konu/kapsam indeksi açıklamalı rehber ve kaynak pasajlarını da taşır. Araç pasajları cümle, paragraf veya tablo satırı sınırlarıyla, özgün karakter aralığı korunarak seçilir. Pasajda araç adının geçmesi her alanı doğrulamaz. D03/D04 tablolarından aktarılan entegrasyon hücreleri ayrıca ilgili alanın kaynak satırıyla gösterilir.

İki belgede paragraf/satır ayrımları aktarım sırasında kaybolmuştur. Orijinal dosya aynen korunur; okuma görünümü cümle sınırlarında pasaj ve paragraf araları oluşturur. “Kaynak pasajı” etiketleri yeni okuma bölümlemesidir; kayıp özgün başlıkların aynen geri getirildiği iddia edilmez. Düz metin görünümü ve özgün indirme ayrıca korunur. D04 kapsam haritası paragraflara ve tablo satırlarına ayrılmıştır; kod blokları bölünmez. Ayrı satırın okunabilmesi için tablo başlığı gösterimde tekrar edilir, özgün kaynak aralığı değiştirilmez. Diğer belgelerin Markdown, tablo, kod ve şema metinleri de özgün biçimleriyle indirilebilir.

D03/D04’teki eski sohbet atıf belirteçleri (`turn…search…` vb.) erişilebilir kaynak URL’si değildir. Bu belirteçlerden bağlantı uydurulmaz; orijinal metinde saklanır ve çözümlenemeyen atıf olarak sayılır. Açık URL’ler, çıplak alan adları, açık GitHub repo kimlikleri ve arXiv numaraları ayrı indekslenir.

## Tasarım tercihleri

Ana sayfa yönetici özeti ve kararı değiştiren sayılarla açılır; araç dizini özetin ardından gelir. Mobil rapor metni başlangıçta bütünüyle açıktır. İsteğe bağlı toplu daraltma/açma vardır; destekleyen tarayıcılarda sayfada arama daraltılmış bölümü açar. Destek yoksa metin açık kalır. Alt gezinme ve bölüm paneli tek elle erişilir; araç karşılaştırması dar ekranda dikey kartlara dönüşür. Okuma sütunu 68ch üst sınırına ve seçili fontun gerçek satır ölçüsüne göre daraltılır; başlık basamakları 1rem alt sınırının üzerinde ayrışır. 48px etkileşim alanı, klavye odağı, reduced motion ve cihaz güvenli alanı tasarımın temelidir.

Masaüstünde kalıcı içerik menüsü, daha geniş karşılaştırma alanı ve aynı URL/okuma durumu kullanılır. Okundu ve yol haritası işaretleri yalnızca bu tarayıcıda saklanır; hesap veya cihazlar arası senkronizasyon yoktur. Depolama engellenirse oturum içi kullanım devam eder.

## Teknik kapsam

Portal React, TypeScript, Vite, Tailwind CSS ve daisyUI ile hazırlanmış statik bir GitHub Pages uygulamasıdır. Gerçek video üretimi, ücretli model çağrısı, sosyal hesap bağlantısı veya sunucu tarafı ajan çalıştırma içermez. Hesaplayıcı bir planlama aracıdır; canlı fiyat servisi değildir.

DX için birim ve tarayıcı testleri, tip kontrolü, sürümü sabitlenmiş bağımlılıklar, kaynak bütünlüğü testi ve GitHub Actions yayın hattı kullanılır. Test başarısızsa yeni sürüm yayın aşamasına geçmez.

## Anlamsal kapsam nasıl denetlenir?

[Kapsam haritası](#/coverage) altı belgeyi bölüm/pasaj sırasıyla gösterir. Her kayıt gerçek kaynak karakter aralığı ve ilgili konu bağlantılarını taşır. Yöntem rehberleri amaç, girdi/çıktı, adımlar, sınırlamalar ve seçim gerekçesini açıklar. Kaynağın yalnız alternatif olarak adını andığı ürünlerde eksik fiyat veya yetenek uydurulmaz.

İsmail’e özel bağlam [karar haritasında](#/guide?topic=personal-stack); sayılar [iddia defterinde](#/claims); özgün belgelere ait 112 açık referans [kütüphanede](#/sources?tab=references) yer alır. Yeni kontrol bağlantıları ilgili rehber ve kayıtta gösterilir, 112 özgün referans sayısıyla karıştırılmaz. İndirilebilir yönetici özeti öncelikleri kısaca açıklar. Araştırma raporu bütün rehberleri; tam ekler sayısal kayıtları, araç özelindeki bilgileri ve referans indeksini içerir. Ortak workflow şablonları eklerde bir kez tanımlanır; her araç o desene bağlanır. Eksik alanlara yazılmış genel tavsiyeler rapor hacmini büyütmek için tekrarlanmaz.

Tema açık/koyu/sistem olarak seçilebilir. Tipografi en az 1rem’dir; ana okuma metni daha büyük, metadata ve kontroller en az taban boyuttadır. Formatter, lint, tip kontrolü, içerik bağlantıları ve mobil/masaüstü davranışları CI’da doğrulanır.
