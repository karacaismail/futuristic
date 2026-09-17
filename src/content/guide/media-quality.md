## Teknik, anlamsal ve editoryal kalite

Dosyanın açılması, sahnenin doğru olduğu anlamına gelmez. D01/D03; codec, ses, zamanlama, karakter sürekliliği, ürün doğruluğu ve marka kurallarını ayrı kalite katmanları olarak ele alır. Model başarısı yerine kabul edilen video kalitesini ölçmek bu katmanların tümünü gerektirir.

## Uygulama: dört kontrol kapısı

| Kapı         | Otomatik kontroller                                                                              | İnsan kontrolü / başarısızlık yolu                                                     |
| ------------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Teknik       | ffprobe ile codec, süre, fps, çözünürlük; decode testi; siyah/donuk frame; sessizlik ve clipping | Bozuk dosya yeniden indirilir veya render edilir; model gereksiz yere tekrar çağrılmaz |
| Anlamsal     | OCR, transkripsiyon, referans eşleştirme, VLM ile bulgu üretimi                                  | Özellik/istatistik doğruluğu, yüz/ürün deformasyonu, yanlış dil                        |
| Marka        | Font, renk, logo, CTA, güvenli alan, süre, altyazı politikası                                    | Ton, iddianın bağlamı, uygunsuz stok ve yaratıcı bütünlük                              |
| Hak ve yayın | Rıza/lisans kayıtları, müzik kapsamı, AI açıklaması, platform profili                            | İzin belirsizliği yayını durdurur; final artifact üzerinde onay alınır                 |

30–120 saniyelik bir anlatı için kaynakta önerilen 4–8 ana shot, pratik bir planlama örneğidir; model veya platform limiti değildir. Karakter sheet'i, ürün referansı, renk/ışık rehberi ve aynı sahne niyeti kimlik tutarlılığını artırır. İlk ve son kare köprüleri yardımcı olabilir; kesmelerin fiziksel sürekliliği yine gözlenir.

Kaynakların saydığı **VBench, VBench2, WBench, VWG-Bench**; temporal coherence, insan/nesne tutarlılığı ve fizik gibi model karşılaştırma boyutlarına işaret eder. Tek aggregate skor; Türkçe konuşma, logo doğruluğu veya kendi ürün sahnenin başarısını göstermez. Benchmark seti, sürümü ve ölçülen görev açıklanmadan sıralama taşınmaz.

Kurgu için rack focus, kamera hareketi, beat matching, dudak-ses senkronu ve spatial audio ayrı değerlendirilir. Müzik ritmine kesmek her anlatıya uygun değildir. Speech intelligibility, arka plan müziği ducking'i ve altyazının sözle hizası önceliklidir. Modelin native audio çıktısı varsa yeniden seslendirme ile çakışan iki konuşma track'i bırakılmaz.

### İnsan onayı gerçekten neyi onaylar?

Telegram/Slack bildirimi; küçük önizleme, final dosya, metin, hak özeti, maliyet ve revizyon düğümü sunar. Onay/reddet webhook'u kimlik doğrulaması, süre sonu, tekrar kullanım koruması ve imza kontrolüyle bağlanır. Karar Postgres'te reviewer ve artifact hash'iyle saklanır. Yayıncı, render değiştiğinde eski onayı kullanamaz.

## Karar: otomatik puana aşırı güvenme

Bir VLM'nin “uygun” demesi telif, tıbbi iddia veya ürün özelliğini doğrulamaz. Yüksek riskli içerikte insan kontrolü zorunlu iş kuralıdır; düşük riskte örnekleme ancak gerçek hata verisiyle azaltılır. Kaynakta geçen FFmpeg bellek sızıntısı her build'in kaçınılmaz özelliği değildir: worker RSS, dosya tanıtıcıları ve job sonunda kaynak temizliği ölçülür; gerekiyorsa process izolasyonu ve worker recycle uygulanır. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03)
