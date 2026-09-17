# futuristic.

AI video üretimi ve yazılım geliştirme için kaynaklara dayalı Türkçe araştırma atlası.

**[Canlı rapor](https://karacaismail.github.io/futuristic/)** · **[Tam rapor](docs/REPORT.md)** · **[Kaynak manifestosu](public/sources/manifest.json)**

React + TypeScript + Vite + Tailwind CSS + **daisyUI 5**. Statik GitHub Pages; API anahtarı veya backend gerekmez.

## İçerik

- 6 özgün belge, byte düzeyinde korunmuş 263.605 bayt; SHA-256 manifestosu.
- 112 özgün kaynak referansı, 177 araç/teknoloji kaydı, 29 ayrıntılı rehber ve 70 sayısal iddia kaydı. İlk sürümdeki 11 kritik kontrol ile yeni rehberlerdeki birincil kontrol/hesap düzeltmeleri ayrı izlenir.
- Video üretimi, yazılım geliştirme, ortak mimari, kalite/risk, maliyet ve yol haritası.
- Türkçe/ASCII arama bütün rehberleri, sayıları, araçları ve özgün metinleri kapsar. Gerçek araç detay URL’si; filtre ve üçlü karşılaştırmanın paylaşılabilir URL’si.
- Yeniden üretim, insan süresi, sabit/değişken giderleri içeren maliyet senaryosu.
- Yerel okuma ve yol haritası kaydı; kaynak ağı sorununda hata ve yeniden deneme.

Kaynakların tamamının arşivlenmesi bütün iddiaların doğrulandığı anlamına gelmez. Doğrulama, kaynak iddiası, çelişki ve senaryo ayrımı `verification.json`, `claims.json` ve rehberlerde görünürdür. Arşivleme anlamsal kapsamın yerine geçmez; kapsam haritası kaynakla açıklama arasındaki izi gösterir. Kaynak metinlerin içindeki eski sohbet atıfları URL olarak yeniden üretilmez.

## Çalıştırma

Node.js 24 kullanın.

```sh
npm ci
npm run dev
```

Uygulama `http://localhost:5173/futuristic/` adresindedir. Vite boş bir porta geçerse terminaldeki adresi kullanın. `base: '/futuristic/'` GitHub Pages proje diziniyle aynıdır. Hash tabanlı yollar sayesinde derin bağlantı ve sayfa yenileme GitHub Pages üzerinde çalışır.

## Geliştirme ve doğrulama

```sh
npm run format:check        # Prettier
npm run lint                # Biome
npm test                    # birim davranışları + kaynak bütünlüğü
npm run typecheck           # TypeScript
npm run build               # rapor dışa aktarımı + production derlemesi
npx playwright install chromium
npm run test:e2e            # production preview üzerinde tarayıcı kontrolleri
npm run check              # format + lint + birim + build + E2E
```

Tarayıcı testleri 1440px masaüstü ve iPhone boyutunda mobil Chromium profillerinde çalışır; gerçek iOS Safari sertifikasyonu değildir. Ek ekran boyutu, hata kurtarma, klavye ve axe erişilebilirlik kontrolleri testlerde tanımlıdır. Tarayıcı testleri `vite preview` kullanır: geliştirme sunucusunun HMR olayları test durumunu sıfırlamaz.

## Mobile-first UX ve DX

- Birincil gezinme mobilde altta; tüm bölüm listesi native dialog panelinde.
- Önce karar/özet, sonra açılabilir alt bölümler; okundu işareti cihazda korunur.
- Geniş tablolar mobilde etiketli kayıt kartları; araç karşılaştırması dikey akış.
- Masaüstünde kalıcı menü, bölüm içi gezinme ve yan yana karşılaştırma.
- Dokunma hedefleri, safe-area, en az 1rem metin ve kullanıcı kök boyutuna uyan girişler, reduced motion ve görünür odak.
- Native dialog Escape/focus trapping; kapanışta açan denetime dönüş.
- Rehber, katalog, kütüphane ve Markdown renderer ayrı chunk; geniş kapsam verisi ilgili sayfalar açılınca yüklenir.
- daisyUI açık/koyu/sistem teması, kalıcı tercih ve semantic renkler; D01/D02 için düzenlenmiş okuma görünümü.
- Harici font servisi yok; fontlar build ile sunulur.
- `npm ci`, sabitlenmiş bağımlılıklar, küçük domain fonksiyonları, reproducible importer/exporter.

## İçeriği güncelleme

- `src/content/*.md`: sentez bölümleri.
- `src/data/report.ts`: bölüm başlığı ve gezinme metadatası.
- `src/data/tools.json`: elle düzenlenen araç kataloğu; `scripts/build-tools.py` içeriği ezmeden alanlarını doğrular.
- `src/content/guide/*.md` ve `src/data/topics.json`: uygulama rehberleri ve kısa karar özetleri.
- `scripts/build-coverage.mjs`: kaynak bölüm/pasaj aralıkları ve konu indeksi; editoryal özetleri korur. İndeks eşleşmesi iddia doğruluğu veya anlamsal tamlık sertifikası değildir.
- `scripts/build-claims.py`: kaynak sayıları, değerlendirme ve düzeltmeleri içeren `claims.json` üretimi.
- `src/data/verification.json`: tarih, iddia, sonuç ve birincil kanıt.
- `public/sources/D01.txt` … `D06.txt`: değişmemiş orijinaller.
- `scripts/import-sources.py`: mevcut orijinallerden manifestoyu/referansları/ZIP’i yeniden üretir. Repository’deki dosyalar yeterlidir; eksik orijinal varsa işlem hata verir.
- `npm run report:export`: aynı içerikten `public/rapor.md`, `public/rapor.html` ve `docs/REPORT.md` üretir. Build öncesinde otomatik çalışır.

Kaynak metni değiştirmeden önce bunun artık aynı orijinal olmadığını dikkate alın. Hash testindeki baz uzunluk bilinçli bir bütünlük kontrolüdür. Atıf veya doğrulama sayısı değişirse kullanıcıya gösterilen anlatımları ve test sözleşmesini de güncelleyin.

## Yayın

GitHub repository Settings → Pages → Source: **GitHub Actions**. `main` dalına push birim testlerini, build’i, mobil/masaüstü tarayıcı ve erişilebilirlik kontrollerini çalıştırır; yalnızca başarıdan sonra Pages artifact’ı yayınlanır. Pull request çalışmaları test edilir, yayınlanmaz.

Site yalnızca araştırma/planlama portalıdır. Video üretmez, sosyal hesaplara bağlanmaz veya ücretli provider çağrısı yapmaz. Üçüncü taraf kaynakların telif/lisansları ilgili sahiplerine aittir.
