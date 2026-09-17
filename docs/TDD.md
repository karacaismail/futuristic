# TDD ve doğrulama kaydı

## Sözleşme

Arama Türkçe/ASCII yazımlarını eşler, birden fazla sözcüğü birlikte arar ve başlık eşleşmesini öne alır. Maliyet toplamı ret/yeniden üretim, insan emeği ve sabit/değişken giderleri içerir; geçersiz sayı sonucu göstermez. Okuma kaydı bozulsa veya depolama engellense dahi okuyucu çalışır. Altı orijinal dosya kayıpsız kalır.

## Red → green

1. `tests/research.test.ts` uygulama fonksiyonlarından önce yazıldı. Stub fonksiyonlar başarısız oldu; çıktı `evidence/01-red-unit.txt`.
2. Kaynak çıkarma testleri bitişik cümleleri URL sanma hatasını yakaladı. 15 başarısız / 3 geçen test kaydı `evidence/02-red-corpus.txt`.
3. Türkçe normalizasyonu, hesaplama, kayıt temizleme ve referans ayrıştırma düzeltildi. 18 test yeşil: `evidence/03-green-domain.txt`.
4. Gerçek mobil akış testi önce yalnızca “Hazırlanıyor” başlığını buldu ve doğru nedenle başarısız oldu: `evidence/04-red-browser.txt`.
5. Arayüz eklendi. İlk geliştirme sunucusu test çalıştırmasında HMR nedeniyle sayfa durumunun sıfırlanması gözlendi; test ortamı production preview’a geçirildi. Test assertion’ları zayıflatılmadı.
6. Axe ile ikincil metin kontrastı hataları test edilip düzeltildi. Red kanıtı `evidence/07-red-accessibility.txt`.
7. 320px tablo testi, mobil kayıt başlığının erişilebilir hücre adına katılmasını da doğrular. İlk seçicide eksik olan “Yaklaşım” etiketi erişilebilirlik ağacına göre düzeltildi.

## Sonuç — 16 Eylül 2026

- 18 birim/kaynak testi geçti: `evidence/10-green-unit.txt`.
- 34 mobil/masaüstü tarayıcı testi geçti: `evidence/12-green-browser.txt`. Okuma, arama, karşılaştırma, hesaplama, kalıcı durum, depolama engeli, ağ hatası, klavye odağı, 320px akış ve axe kontrolleri dahildir.
- TypeScript ve production build geçti: `evidence/build.txt`.
- 390px mobil, 768px tablet ve 1440px masaüstü görsel kontrolü yapıldı; ekran görüntüleri `evidence/` dizinindedir.

## Sınırlar

Otomatik erişilebilirlik denetimi tam WCAG uyum sertifikası değildir. Mobil profil Chromium emülasyonudur. Gerçek ses/video üretimi, sosyal API izinleri ve ücretli modeller bu statik raporun doğrulama kapsamı dışındadır.

## 17 Eylül 2026 — Minimum metin boyutu

Önce `tests/e2e/typography.spec.ts` eklendi; mevcut arayüzde üç mobil senaryo da başarısız oldu. Tüm özel metin ölçüleri rem birimine taşındı ve 1rem alt sınırı uygulandı. daisyUI tablo başlıkları, etiketler, form alanları, pencereler ve tam raporun yazdırma görünümü kapsama alındı. Genişleyen metin için masaüstü menüsü ve mobil satır geçişleri düzenlendi.

Sonuç: 40 tarayıcı testi geçti. Yeni kontroller, görüntülenen metnin hesaplanan boyutunu kök boyutuyla karşılaştırır; 320px ekranda 20px kök yazı boyutu ve yatay taşma da sınanır. 320, 768, 1024 ve 1440px görünümleri ayrıca kontrol edildi.

## 17 Eylül 2026 — Anlamsal kapsam revizyonu

Önce `tests/coverage.test.ts` kapsam sözleşmesi yazıldı; veri dosyaları yokken kırmızı oldu (`evidence/v2/red-content.txt`). Sonra yeni sayfalar eklenmeden `revision.spec.ts` çalıştırıldı: rehber/iddia sayfası, gerçek ComfyUI detayı ve paragraflı okuyucu bulunamadığı için üç davranış testi kırmızı oldu (`evidence/v2/red-browser.txt`).

29 ayrıntılı rehber, 177 araç kaydı, 70 sayısal kayıt ve 158 kaynak bölüm/pasaj bağlantısı eklendi. Testler kaynak aralıklarının özgün metinle eşleşmesini, boşluksuz kapsamı, gerçek kanıt pasajlarını, iç bağlantıları ve bütün içeriğin tam rapora aktarılmasını doğrular. Bu yapısal kontroller tek başına anlamsal yeterlilik veya iddia doğruluğu sertifikası değildir.

Tarayıcı testleri; gerçek araç permalink’i, URL’de filtre/karşılaştırma, rehber araması, kaynak okuma görünümü, kalıcı tema ve mobil tablo akışını kapsar. Genişletme sırasında checkbox’ın hash olayını beklerken geri dönmesi, büyütülmüş metinde buton taşması, HTML raporda h5 alt sınırı ve koyu temada kontrast/ilk yükleme renk geçişi düzeltildi. Assertion’lar gevşetilmedi.

Son sonuç: **26 birim/içerik testi + 50 Chromium mobil/masaüstü testi geçti.** Açık/koyu tema için axe, 320px’de 20px kök metin ve çıktı raporunda 1rem minimum dahildir. Prettier, Biome, TypeScript ve production build başarılı. Kanıtlar `evidence/v2/` içinde. İlk sayfa yaklaşık104KB gzip JS; rehber/katalog/kaynak verileri ayrı chunk’larda.

## 17 Eylül 2026 — Veri kapsamı ve okunabilirlik revizyonu

İkinci denetimin beş bulgusu için önce `editorial.test.ts` yazıldı: bitişik fiyat/tarih/miktar, alan varlığı, kaynak pasajı sınırları, D04 bölümlemesi ve rapor/ek ayrımı. Beş test mevcut sürümde başarısız oldu. Yeni fiyat/lisans filtreleri ve üç rapor seçeneği için iki masaüstü tarayıcı testi de uygulama değişikliğinden önce kırmızı oldu. Kayıtlar `evidence/v3/red-unit.txt` ve `red-browser.txt` içindedir.

- Katalogdaki `availability`, fiyat/lisans/limit/olgunluk/entegrasyon verisini genel tavsiye metninden ayırır. 177 kayıt içinde 39 fiyat, 37 lisans/kullanım koşulu/sınıflandırma ve 60 entegrasyon kaydı vardır. Bu sayılar doğrulanmış ürün sayısı değildir. İki veri filtresi birlikte AND koşuluyla çalışır; URL, yenileme ve karttaki eksik alan etiketi test edilir.
- D03/D04 tablolarından aktarılan entegrasyon alanları ilgili özgün tablo satırına ayrıca bağlandı. MoneyPrinterTurbo, Mixpost, InVideo ve Kling/Wan gibi kayıtların kaynakta bulunan ayrıntıları işlendi. Genel workflow ve seçim ölçütleri sentez etiketi taşır.
- 246 araç bağlamı cümle, paragraf veya tablo satırlarından seçilir; `start/end/kind` ve tam kaynak eşleşmesi test edilir. Alana özel satırların da kaynakta bulunması ayrıca test edilir. Tablo başlığı yalnız gösterim bağlamı olarak eklenir; aralık değişmez. Bu yapısal testler her iddianın semantik doğrulaması değildir.
- D04, 8 geniş bölümden 262 okuma birimine ayrıldı; en uzun birim 949 UTF-16 karakter. Toplam 412 kaynak birimi, altı orijinali boşluksuz ve tekrarsız kapsar. Kod blokları bölünmez; konu bağlantıları birim başına en çok altıdır.
- Yönetici özeti yaklaşık 700 sözcük, araştırma raporu yaklaşık 18 bin, veri ekleri yaklaşık 19 bin sözcüktür. 29 rehber ana raporda; 70 sayısal iddianın hem kaynak ifadesi hem değerlendirmesi, bütün somut katalog alanları ve 112 referans eklerde kalır. Ortak workflow tanımları bir kez yazılır. Bütünlük testi yeni okuma/ek sözleşmesine güncellendi; içerik kapsamı kontrolü kaldırılmadı.

**32 birim/içerik testi ve 54 Chromium mobil/masaüstü testi geçti.** Prettier, Biome, TypeScript ve production build başarılı. Üç HTML raporun ekran/yazdırma metni en az 1rem; 320px ve 20px kök yazı boyutu kontrolü geçiyor. Kaynak dosyaları değişmedi. Mobil filtreler, rapor seçenekleri, açık kaynak pasajı ve masaüstü kataloğu ayrıca görsel olarak kontrol edildi. Kayıtlar ve görüntüler `evidence/v3/` dizinindedir.

## 17 Eylül 2026 — Raporun sunumu ve kesintisiz okuma

`report-reading.spec.ts` önce yazıldı. İlk ekrandaki karar, özetin gezinmedeki önceliği, mobilde açık metin, özellik desteği olmayan tarayıcı davranışı ve okuma ölçüsü için beş test mevcut sürümde başarısız oldu (`evidence/v4/red-browser.txt`).

- Ana sayfa aynı yönetici özeti içeriğini sunar; sonuç cümlesini altı satırlık karar tablosu izler. Rehber dizini ve eski tanıtım alanı özetin altındadır. Menü `00 · Yönetici özeti` ile başlar; birincil indirme özete, ikincil bağlantılar rapora ve eklere gider.
- Mobilde bütün rapor bölümleri başlangıçta açıktır. Destekleyen tarayıcılarda toplu açma/daraltma ve `hidden="until-found"` kullanılır. Yerel metin parçası bağlantısıyla gerçek tarayıcı açılma akışı sınanır: eşleşen bölüm açılırken diğer bölümler kapalı kalır ve React durumu güncellenir. Bu, [HTML standardındaki ortak ata açma algoritmasını](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute) çalıştırır; otomatik test işletim sisteminin Cmd+F arayüzünü kullanmaz.
- `beforematch` desteği özellik algılama ile belirlenir. Destek yoksa metin açık kalır ve daraltma denetimleri sunulmaz. Bu durum ayrıca simüle edilerek sınanır. Kurulu WebKit sürümü özelliği desteklediğinden WebKit'te de yerel açılma akışı geçti; gerçek bir iPhone üzerinde test yapılmadı.
- Yalnız `68ch` sınırı Inter ile gerçek satırlarda hâlâ 89–93 karakter üretti. Render edilen karakterlerin konumlarını ölçen ek regresyon testi kırmızı oldu (`evidence/v4/red-measure.txt`). Paragraflara `min(68ch, 36rem)` uygulanınca 1440px ekran görüntüsündeki seçili paragrafın tam satırları 56–70 karaktere indi. Bu örnek ölçümdür; her paragraf için sabit karakter sayısı iddiası değildir. Karar tablosu 68ch sınırını kullanır. Gövde, h3, h2 ve h1 ayrı ölçülere sahiptir; minimum 1rem korunur.

**32 birim/içerik testi ve 69 tarayıcı testi geçti:** 64 Chromium mobil/masaüstü, 5 WebKit okuma testi. TypeScript, production build, Prettier ve Biome başarılı. 320px/20px kök boyutu, açık/koyu tema erişilebilirliği ve mevcut veri kapsamı testleri geçiyor. Kaynaklar, rehberler, araçlar ve sayısal iddialar değiştirilmedi. Kanıtlar, mobil/masaüstü ekran görüntüleri ve satır ölçümü `evidence/v4/` dizinindedir.
