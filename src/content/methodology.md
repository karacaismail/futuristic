## Kapsam ve yöntem

Bu rapor 16 Eylül 2026 tarihli bir araştırma sentezidir. Kullanıcının paylaştığı altı belgenin tamamı değişmeden arşivlendi. Video belgeleri D01/D03/D05; yazılım belgeleri D02/D04/D06 olarak kimliklendirildi. Ortak öneriler birleştirildi, farklı senaryolar ayrı tutuldu ve karar etkisi yüksek seçilmiş iddialar birincil kaynaklardan kontrol edildi.

**Eksiksiz arşiv, bütün iddiaların doğrulanması anlamına gelmez.** Dış bağlantıların tamamı indekslendi; hepsinin güncel fiyatı, bütün sayfaların içeriği veya bütün akademik sonuçlar yeniden araştırılmadı. Doğrulama tablosu kontrol edilen iddiayı, tarihi, ilgili belgeyi ve kanıt bağlantısını ayrı gösterir.

## Dört kanıt seviyesi

- **Doğrulandı:** bağlantılı birincil kaynak, belirtilen dar iddiayı destekliyor.
- **Düzeltildi:** özgün belgede tarih, limit veya yorum sorunu var; sentezde düzeltme kullanılıyor.
- **Kaynak aktarımı:** belgede bulunan bağlantı, araç veya iddia; yeniden doğrulama anlamına gelmiyor.
- **Sentez / varsayım:** bu raporun mimari önerisi, deney tasarımı veya kullanıcı kontrollü hesap girdisi.

Araç kataloğu kaynakların rol ve kullanım senaryolarını bir araya getirir. Bir araç kartında yer almak, bağımsız performans testi, satın alma önerisi veya mevcut API erişimi garantisi değildir. Fiyat ve benchmark sıralamaları bu nedenle katalog kartlarına kesin sayı olarak aktarılmadı.

## Kaynak izlenebilirliği

Her özgün dosya byte uzunluğu ve SHA-256 ile manifestoda yer alır. Kaynak sayfasında tam metni okumak, tek dosyayı indirmek veya altı belgeyi manifestoyla ZIP olarak almak mümkündür. Tam metinler ihtiyaç anında yüklenir; mobil açılışta bütün arşiv indirilmez.

İki belgede paragraf/satır ayrımları aktarım sırasında kaybolmuştur. Orijinal dosya aynen korunur; okuyucu yalnızca görsel satır kırma uygular. Diğer belgelerin Markdown, tablo, kod ve şema metinleri de özgün biçimleriyle indirilebilir.

D03/D04’teki eski sohbet atıf belirteçleri (`turn…search…` vb.) erişilebilir kaynak URL’si değildir. Bu belirteçlerden bağlantı uydurulmaz; orijinal metinde saklanır ve çözümlenemeyen atıf olarak sayılır. Açık URL’ler, çıplak alan adları, açık GitHub repo kimlikleri ve arXiv numaraları ayrı indekslenir.

## Tasarım tercihleri

Mobil kullanıcı önce kararı, özeti ve sonraki adımı görür. Alt gezinme ve bölüm paneli tek elle erişilir. Uzun rapor alt bölümlere ayrılır; araç karşılaştırması dar ekranda dikey kartlara dönüşür. 48px etkileşim alanı, klavye odağı, reduced motion ve cihaz güvenli alanı tasarımın temelidir.

Masaüstünde kalıcı içerik menüsü, daha geniş karşılaştırma alanı ve aynı URL/okuma durumu kullanılır. Okundu ve yol haritası işaretleri yalnızca bu tarayıcıda saklanır; hesap veya cihazlar arası senkronizasyon yoktur. Depolama engellenirse oturum içi kullanım devam eder.

## Teknik kapsam

Portal React, TypeScript, Vite, Tailwind CSS ve daisyUI ile hazırlanmış statik bir GitHub Pages uygulamasıdır. Gerçek video üretimi, ücretli model çağrısı, sosyal hesap bağlantısı veya sunucu tarafı ajan çalıştırma içermez. Hesaplayıcı bir planlama aracıdır; canlı fiyat servisi değildir.

DX için birim ve tarayıcı testleri, tip kontrolü, sürümü sabitlenmiş bağımlılıklar, kaynak bütünlüğü testi ve GitHub Actions yayın hattı kullanılır. Test başarısızsa yeni sürüm yayın aşamasına geçmez.
