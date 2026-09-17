## Render, motion graphics ve yaratıcı finishing aynı işlem değildir

FFmpeg/MoviePy pikselleri ve medya dosyalarını keser, birleştirir, filtreler; Remotion kareyi React/TSX ile tanımlar. Shotstack/Creatomate/JSON2Video ise timeline veya template'i cloud API ile render eder. Profesyonel NLE olan Premiere/Resolve, editörün yaratıcı renk/ritim kararlarına ve proje alışverişine ayrı bir yol sunar.

## Uygulama: değiştirilebilir render sözleşmesi kur

`resolution`, `fps`, `duration`, `tracks`, `clips`, `captions`, `audio` ve platform safe-area'larını kendi timeline şemanda sakla. Renderer adaptörü bunu vendor payload'una çevirsin. Asset URL'leri süreli olabilir; render başlamadan erişilebilirlik/süreyi doğrula, değişmez asset hash'iyle çalış. Çıktıda ffprobe/codec/fps/süre/ses kontrolü, sonra görsel marka kontrolü uygula.

| Araç / desen                   | Somut kullanım                                               | Kaynak fiyatı / lisans / sınır                                                                                                               |
| ------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| FFmpeg / MoviePy               | Trim, concat, crossfade, scale, mux, loudness, LUT/transcode | CPU/GPU container; build'e göre lisans. Uzun process/bellek birikimini job izolasyonu, timeout ve recycle ile izle                           |
| Remotion                       | Data-driven chart, dinamik ürün kartı, brand motion          | D05 birey/≤3 çalışan ücretsiz koşulu; $25/koltuk veya $0,01/render, min $100/ay senaryosu. MIT varsayımı yanlış; V09 lisans kontrolü korunur |
| Remotion Lambda                | Render'ı parçalara ayırıp cloud'da paralel işleme            | S3/output, concurrency, başlangıç ve cloud maliyeti; her render'ın saniyede biteceği veya memory leak'i çözeceği garantisi yok               |
| Shotstack                      | timeline → tracks → clips; HTML5/JS dinamik grafik; callback | D05 $0,30/dk PAYG; $39/ay'dan abonelikte $0,20/dk; self-host yok kaynak iddiası                                                              |
| Creatomate                     | Template/data-driven sosyal varyant, altyazı                 | D05 $49–54/ay / 2.000 kredi; görsel 1, yaklaşık 720p dakika 14 kredi; self-host yok                                                          |
| JSON2Video                     | JSON scenes, text, video, image, audio/TTS ve subtitle       | D05 free 600 kredi; $49,95/ay / 200 dk Full HD; kredi=1 sn 1080p, 4K=4× iddiası                                                              |
| Bannerbear / Plainly           | Medya template'i / After Effects template render             | D05 $49/1.000 kredi; Plainly $69/50 render dk; template bağımlılığı                                                                          |
| Editly / Revideo               | Kodla deterministik video kompozisyonu                       | Kaynakta adı geçiyor; kesin lisans/API olgunluğu ayrıca araştırılmalı                                                                        |
| Premiere UXP / DaVinci Resolve | Editörle hibrit finishing, caption track, yaratıcı grade     | Creative Cloud / free+Studio ayrımı; kaynak Resolve 21.1 diyor, güncel scripting sözleşmesi UNK                                              |
| Runway Ruby                    | SDR→HDR gibi mekanik dönüşüm                                 | Color grade'in sanatsal süreklilik kararının yerine geçmez                                                                                   |

**Color grading boşluğu:** LUT veya renk uzayı dönüşümü otomatik olabilir; bütün sahnede ışık/ten rengi/marka hissini yaratıcı biçimde korumak aynı sorun değildir. Kaynakların işaret ettiği fidelity gap, rack focus, beat'e göre kesim, eşzamanlı eylem, lip-speech ve spatial audio uyumu üzerinde belirgindir. İnsan finishing kapısı bu nedenle ayrı kalır.

## Karar: yazılım becerisine ve varyant ihtiyacına göre seç

İsmail'in React becerisi ve self-host tercihi Remotion + FFmpeg'i doğal aday yapar; bakım/lisans/cloud renderer ekonomisi yine ölçülür. İçerik ekibinin şablonu kendisinin değiştirmesi gerekiyorsa Creatomate/Shotstack pilotu daha düşük sürtünmeli olabilir. Deterministik render, yaratıcı sahne üreticisini değiştirmeyi kolaylaştırır; provenansın transcode sonrası korunması/yeniden oluşturulması ayrıca kontrol edilir. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03) [D05](#/sources?doc=D05)
