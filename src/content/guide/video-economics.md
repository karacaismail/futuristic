## Maliyet birimi: kabul edilen saniye ve tamamlanan iş

Liste fiyatını video süresiyle çarpmak yalnız ilk denemeyi hesaplar. D03/D05; yeniden üretim, TTS, avatar, müzik, render, storage, egress, yayın ve insan incelemesini birlikte değerlendirmeyi gerektirir. Final sürenin tamamı generative video olmak zorunda değildir: ekran kaydı, stok, grafik ve motion daha farklı maliyet taşır.

## Uygulama: görünür varsayımlarla hesapla

**Üretim maliyeti = üretilen saniye × birim fiyat × kabul başına ortalama deneme.** Toplama insan emeği, değişken servis gideri ve sabit abonelikler eklenir. Reddedilen denemeler fiyat hesabından çıkarılmaz. [Etkileşimli hesaplayıcı](#/cost) aynı ayrımı kullanır.

Runway'nin kontrol edilen resmi kredi tablosunda **1 kredi = $0,01**, **Gen-4.5 = 12 kredi/sn**, **Veo 3.1 sesli = 40 kredi/sn**. Dolayısıyla sekiz saniyelik shot sırasıyla **$0,96** ve **$3,20**; on shot ilk denemede **$9,60 / $32** olur. Ortalama iki denemede **$19,20 / $64** yalnız üretim gideridir. Aynı gateway'deki farklı model fiyatları tek bir “Runway saniye ücreti” değildir. [Resmi fiyat tablosu](https://docs.dev.runwayml.com/guides/pricing/)

D05; Kling $0,10/sn, Veo Fast $0,15/sn, Sora 2 $0,10/sn, Runway $0,12–0,15/sn, Wan/Grok $0,05/sn aktarır. Ses, çözünürlük, provider gateway ve model sürümü eşitlenmeden doğrudan kalite/fiyat sıralaması kurulmaz. **Kaynağın Veo için 30 × $0,75 = $12 hesabı yanlış: sonuç $22,50.** Bu hata ve özgün $12 iddiası sayısal kayıtta birlikte korunur.

| Ölçek kalemi       | Kaynak senaryosu                                           | Nasıl kullanılmalı?                                                                |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| GPU inference      | H100 $2–2,70/saat; Wan $0,25–0,60/clip                     | Donanım, süre, ayar ve doluluk belirtilmeden garanti fiyat değildir                |
| Self-host eşiği    | Ayda 5.000 clip sonrası avantaj iddiası                    | API–GPU farkı, bakım, kalite ve iş yüküyle yeniden hesaplanır; evrensel eşik değil |
| Storage            | Günde 100 video × 200 MB final = 20 GB; ara dosyalar 3–10× | 60–200 GB/gün çalışma verisi senaryosu; lifecycle, master saklama ve egress ayrıca |
| Faceless başlangıç | Aylık $100–500 araç/üretim bütçesi                         | Dağıtım ve editoryal emek dahil edilmezse toplamı küçümser                         |

### Gelir varsayımlarını bütçe garantisine dönüştürme

D05 finans/AI/business nişlerinde **$7–25 RPM**, 12–18 ayda düşük binler dolar, $10.000+ aylık gelirin azınlıkta ve 1–3 yıllık breakout olabileceğini öne sürer. Bu bir gelir tahmini ve senaryodur; kanal, ülke, sezon, video uzunluğu ve monetizasyon uygunluğu sonucu değiştirir. **RPM**, üreticinin bin görüntülenme başına geliridir; reklamveren CPM'iyle aynı değildir.

Örneğin $500 gideri yalnız $7 RPM reklamla kapatmak yaklaşık 71.429 monetize edilen eşdeğer görüntülenme gerektirir; $25 RPM'de 20.000. Bu basit oran platformun gerçek RPM tanımı, vergi ve insan maliyetini kapsamayabilir. B2B ürün videosunda reklam RPM'i yerine qualified lead, demo, satış dönüşümü ve üretim süresi ölçülür.

## Karar: hacimden önce kabul oranını iyileştir

İlk 10–20 videoda sahne başına deneme, kabul nedeni, insan dakikası ve gerçek fatura tutulur. Premium modeli yalnız değer yaratan shot'a yönlendirmek, bütün videoyu ucuz ama çok tekrar isteyen modelde üretmekten daha ekonomik olabilir. Yeni GPU satın alma kararı video ve coding iş yükleri ayrı ölçüldükten sonra verilir. [D03](#/sources?doc=D03) [D05](#/sources?doc=D05) [GPU hesabı](#/guide?topic=gpu-economics)
