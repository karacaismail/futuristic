## Video hattının veri sözleşmesi

Üretim hattını tek bir prompt ve çıktı URL'si olarak saklamak, revizyon ve maliyet takibini bozar. D03'ün önerdiği veri modeli; Campaign, ContentJob, ScriptVersion, Storyboard, Scene, GenerationAttempt, Asset, Timeline, Render, QC, Approval, Publication ve Analytics kayıtlarını ayırır. Bir onaylı video ile başarısız denemeleri aynı kayıtta ezme.

## Uygulama: küçük ama izlenebilir bir sözleşme

| Kayıt                   | Girdi / zorunlu alan                                                              | Çıktı ve sorumluluk                  |
| ----------------------- | --------------------------------------------------------------------------------- | ------------------------------------ |
| ContentJob              | brief, marka, hedef platform/dil, deadline, bütçe, onay politikası                | İşi tekilleştiren ID ve durum        |
| ScriptVersion           | metin, kanıt kaynakları, CTA, önceki sürüm                                        | Onaylanabilir değişmez metin sürümü  |
| Scene                   | scene_id, süre, narration, visual_intent, referanslar, kamera, güvenli yazı alanı | Üreticiden bağımsız sahne tarifi     |
| GenerationAttempt       | model/provider sürümü, prompt hash, seed, vendor_job_id, maliyet                  | Her denemenin sonucu ve hata sınıfı  |
| Asset                   | dosya URI, hash, codec, boyut, süre, hak/provenance kaydı                         | Tekrar kullanılabilir medya          |
| Timeline / Render       | track'ler, font/şablon sürümü, çözünürlük, fps, ses seviyesi                      | Render edilmiş belirli dosya         |
| QC / Approval           | kontrol bulguları, reviewer, karar, artifact hash                                 | Yayına uygunluk ve değişiklik izleme |
| Publication / Analytics | platform, hesap, post ID, status, yayın zamanı, ölçüm penceresi                   | Dağıtım ve sonuçların takibi         |

Örneğin `POST /content-jobs` isteği Türkçe brief, hedefler, `brand_id` ve `approval_policy` taşır. `Idempotency-Key` aynı işin iki kez açılmasını önler; bunun gerçekten çalışması için anahtar ve istek hash'i veritabanında atomik tutulmalıdır. Aynı anahtarla farklı payload sessizce kabul edilmez.

Scene'de süre ve anlatım ayrı alanlardır. Metni okuyunca 12 saniye sürüyorsa 5 saniyelik sahneye sıkıştırmak yerine metni ya da timeline'ı değiştir. `safe_text` alanı, platform arayüzünün kapattığı kenarlar dışında metin yerleşimini belirtir. Fallback; stok, statik görsel hareketi veya başka model olarak önceden tanımlanır.

Timeline örneği 1080×1920, 30 fps, video / voice / music / captions / logo track'lerinden oluşabilir. Bu bir teslimat profili örneğidir; tüm kaynak videoların doğal fps'si aynı olmak zorunda değildir. Dönüşüm kararını renderer verir, model prompt'u değil.

### Dosya yaşam döngüsü

`raw/`, `work/`, `master/`, `delivery/` ayrımı orijinali, ara çıktıyı, onaylı master'ı ve platform varyantını ayırır. Her türev üst varlığın hash'ini taşır. Model URL'leri kalıcı arşiv sanılmaz; süreleri dolmadan kurumun nesne deposuna alınır. İndirme başarısı ve hash kontrolünden önce iş tamamlandı sayılmaz.

## Karar: revizyonun hangi kaydı geçersiz kıldığını tanımla

Senaryo değişince sonraki ses/sahne/render onayları; yalnız altyazı zamanlaması değişince ilgili render ve yayın onayı geçersizleşir. Hash tabanlı onay, eski videoya verilmiş kararın yeni çıktıya taşınmasını önler. Marka verisi, OAuth token ve kişisel veri aynı blob'a konmaz; erişim izinleri ayrı tutulur. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03)
