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
