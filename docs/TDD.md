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
