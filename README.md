# futuristic.

AI video üretimi ve yazılım geliştirme için kaynaklara dayalı Türkçe araştırma atlası.

**[Canlı rapor](https://karacaismail.github.io/futuristic/)** · **[Tam rapor](docs/REPORT.md)** · **[Kaynak manifestosu](public/sources/manifest.json)**

React + TypeScript + Vite + Tailwind CSS + **daisyUI 5**. Statik GitHub Pages; API anahtarı veya backend gerekmez.

## İçerik

- 6 özgün belge, byte düzeyinde korunmuş 263.605 bayt; SHA-256 manifestosu.
- 112 benzersiz kaynak referansı, 55 araç/teknoloji kartı ve 11 tarihli kritik iddia doğrulaması.
- Video üretimi, yazılım geliştirme, ortak mimari, kalite/risk, maliyet ve yol haritası.
- Türkçe/ASCII uyumlu tam metin arama, araç filtreleme ve üçlü karşılaştırma.
- Yeniden üretim, insan süresi, sabit/değişken giderleri içeren maliyet senaryosu.
- Yerel okuma ve yol haritası kaydı; kaynak ağı sorununda hata ve yeniden deneme.

Kaynakların tamamının arşivlenmesi bütün iddiaların doğrulandığı anlamına gelmez. Kontrol edilen bulguların kapsamı `src/data/verification.json` içinde açıkça kayıtlıdır. Kaynak metinlerin içindeki eski sohbet atıfları URL olarak yeniden üretilmez.

## Çalıştırma

Node.js 24 kullanın.

```sh
npm ci
npm run dev
```

Uygulama `http://localhost:5173/futuristic/` adresindedir. Vite boş bir porta geçerse terminaldeki adresi kullanın. `base: '/futuristic/'` GitHub Pages proje diziniyle aynıdır. Hash tabanlı yollar sayesinde derin bağlantı ve sayfa yenileme GitHub Pages üzerinde çalışır.

## Geliştirme ve doğrulama

```sh
npm test                    # birim davranışları + kaynak bütünlüğü
npm run typecheck           # TypeScript
npm run build               # rapor dışa aktarımı + production derlemesi
npx playwright install chromium
npm run test:e2e            # production preview üzerinde tarayıcı kontrolleri
npm run check              # birim + build + E2E
```

Tarayıcı testleri 1440px masaüstü ve iPhone boyutunda mobil Chromium profillerinde çalışır; gerçek iOS Safari sertifikasyonu değildir. Ek ekran boyutu, hata kurtarma, klavye ve axe erişilebilirlik kontrolleri testlerde tanımlıdır. Tarayıcı testleri `vite preview` kullanır: geliştirme sunucusunun HMR olayları test durumunu sıfırlamaz.

## Mobile-first UX ve DX

- Birincil gezinme mobilde altta; tüm bölüm listesi native dialog panelinde.
- Önce karar/özet, sonra açılabilir alt bölümler; okundu işareti cihazda korunur.
- Geniş tablolar mobilde etiketli kayıt kartları; araç karşılaştırması dikey akış.
- Masaüstünde kalıcı menü, bölüm içi gezinme ve yan yana karşılaştırma.
- Dokunma hedefleri, safe-area, 16px mobil girişler, reduced motion ve görünür odak.
- Native dialog Escape/focus trapping; kapanışta açan denetime dönüş.
- Markdown renderer ayrı chunk; özgün 264 KB arşiv tam metin/aramanın gerektiği anda yüklenir.
- Harici font servisi yok; fontlar build ile sunulur.
- `npm ci`, sabitlenmiş bağımlılıklar, küçük domain fonksiyonları, reproducible importer/exporter.

## İçeriği güncelleme

- `src/content/*.md`: sentez bölümleri.
- `src/data/report.ts`: bölüm başlığı ve gezinme metadatası.
- `src/data/tools.json`: araç kataloğu; üretim kaynağı `scripts/build-tools.py`.
- `src/data/verification.json`: tarih, iddia, sonuç ve birincil kanıt.
- `public/sources/D01.txt` … `D06.txt`: değişmemiş orijinaller.
- `scripts/import-sources.py`: mevcut orijinallerden manifestoyu/referansları/ZIP’i yeniden üretir. Repository’deki dosyalar yeterlidir; eksik orijinal varsa işlem hata verir.
- `npm run report:export`: aynı içerikten `public/rapor.md`, `public/rapor.html` ve `docs/REPORT.md` üretir. Build öncesinde otomatik çalışır.

Kaynak metni değiştirmeden önce bunun artık aynı orijinal olmadığını dikkate alın. Hash testindeki baz uzunluk bilinçli bir bütünlük kontrolüdür. Atıf veya doğrulama sayısı değişirse kullanıcıya gösterilen anlatımları ve test sözleşmesini de güncelleyin.

## Yayın

GitHub repository Settings → Pages → Source: **GitHub Actions**. `main` dalına push birim testlerini, build’i, mobil/masaüstü tarayıcı ve erişilebilirlik kontrollerini çalıştırır; yalnızca başarıdan sonra Pages artifact’ı yayınlanır. Pull request çalışmaları test edilir, yayınlanmaz.

Site yalnızca araştırma/planlama portalıdır. Video üretmez, sosyal hesaplara bağlanmaz veya ücretli provider çağrısı yapmaz. Üçüncü taraf kaynakların telif/lisansları ilgili sahiplerine aittir.
