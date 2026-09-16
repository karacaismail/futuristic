## Takvimden önce geçiş kriteri

Aşağıdaki plan kaynakların ortak önerilerinden türetilmiş bir başlangıç sırasıdır. Haftalar tahmindir; ekip kapasitesi, app review ve içerik kalitesi süreyi değiştirir. D03’teki yaklaşık beş aylık program ile D04/D06’daki kısa yazılım pilotu, aynı teslimat taahhüdü olarak birleştirilmedi. [D03](#/sources?doc=D03) [D04](#/sources?doc=D04) [D05](#/sources?doc=D05) [D06](#/sources?doc=D06)

## 01 · Çerçeve ve baz ölçüm

**İlk 1–2 hafta.** Tek içerik formatı, hedef kitle, platform, editör ve maliyet tavanını tanımla. Ürün bilgi kaynağı, marka kiti, kullanım hakları ve telaffuz sözlüğünü hazırla. Platform erişim/audit başvurusunu erken başlat.

Yazılım için mevcut lint/typecheck/test komutlarını tek doğrulama akışına bağla. Kısa AGENTS.md ve kabul kriteri şablonu oluştur. PR süresi, hata ve inceleme emeği için baz veri toplamayı başlat.

**Çıkış kriteri:** iş kuralları, kaynak sahipliği ve ölçülecek KPI’lar yazılı; ajan mevcut testi tek komutla çalıştırabiliyor.

## 02 · Dar kapsamlı pilot

**2–4. haftalar.** 10–20 video adayı veya 20–50 eşlenmiş sahneyle sağlayıcı karşılaştırması yap. Bu sayılar deney tasarımı önerisidir. Aynı brief, referans, kalite rubriği ve değerlendiriciyi kullan. Bir ses sağlayıcısı, bir renderer ve bir publisher ile ilk hattı tamamla.

Kod tarafında tek repo, sınırlı görevler ve küçük değişiklikler seç. Her bug için önce regresyon testi, sonra fix; her sonuç için doğrulama kanıtı üret. AI PR review’u yardımcı katman olarak dene.

**Çıkış kriteri:** uçtan uca gerçek çıktı; maliyet ve insan emeği kaydı; kalite bozulmadan net fayda.

## 03 · Dayanıklılık ve kontrollü yayın

**5–8. haftalar.** Duplicate callback, kayıp callback, 429, timeout, token expiry ve worker restart senaryolarını test et. Onay sonrası çıktı değişimini engelle; idempotency ve bütçe sınırlarını doğrula. Final yayın görünürlüğünü platformdan teyit et.

Test, SAST, dependency ve secret taramasını CI kapılarına bağla. İnceleme kapasitesini aşan ajan eşzamanlılığını düşür. Incident için log → hipotez → fix PR akışını sınırlı yetkiyle kur.

**Çıkış kriteri:** gözlemlenen hata senaryolarından veri ve yayın kaybı olmadan kurtarma; sorumlu kişi ve runbook.

## 04 · Ölçerek ölçekleme

**9–12. haftalar ve sonrası.** İkinci platformu, ikinci formatı veya model routing’i tek tek ekle. Yoğun kullanılan bir video sahne tipinde ComfyUI/GPU pilotu veya yazılım ajanlarında self-host serving dene. Her ek katmanın bakım maliyetini hesapla.

Yüksek hacimli video için D03’ün 3–6 aylık durable workflow, gelişmiş QC ve hibrit GPU programını bu fazın devamı olarak ele al. Kalite verisi birikmeden bütün onayları kaldırma.

**Çıkış kriteri:** kabul edilen çıktı başına toplam maliyet ve p95 süre iyileşiyor; ret, incident ve review yükü artmıyor.

## Başarı panosu

| Video operasyonu | Yazılım operasyonu |
|---|---|
| Kabul edilen saniye başına maliyet | Kabul edilen görev / merge başına maliyet |
| İlk denemede kabul oranı | İlk CI geçiş oranı |
| Editör dakikası / video | Review ve rework dakikası / PR |
| Yayınlama başarısı ve görünürlük | Change failure ve escaped defect |
| İzleyici tutulması ve ürün dönüşümü | PR cycle time ve ekip memnuniyeti |

Yalnızca üretilen video veya kod satırı sayısı başarı ölçütü değildir. Baseline, dönem, örneklem ve ölçüm yöntemiyle birlikte karar ver.
