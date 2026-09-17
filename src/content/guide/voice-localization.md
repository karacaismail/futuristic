## Türkçe destek bir dil listesinden ibaret değildir

TTS metni sese, ASR/STT sesi metne çevirir; dublaj çeviri ve zamanlamayı, voice cloning kimlik/hak yönetimini, forced alignment ise sözcüklerin ses üzerindeki konumunu ekler. Türkçe desteği, ürün adını doğru okuma, aksan, sayı/tarih telaffuzu veya avatar dudak uyumu için yeterli kanıt değildir.

## Uygulama: ses profilini ayrı varlık olarak yönet

1. Türkçe karakter, İngilizce ürün adı, kısaltma, para/tarih ve uzun cümle içeren sabit test metni hazırla. Yerli konuşmacılarla kör dinleme yap; marka tonu ve anlaşılabilirliği ayrı puanla.
2. `VoiceProfile` içinde sağlayıcı/model/voice ID, konuşma hızı, pronunciation glossary, lisans/izin ve sürümü sakla. Bir ses değişince etkilenen videolar bulunabilsin.
3. TTS audio'yu üret; SSML mark/timepoint veya ASR/forced alignment ile zaman bilgisini çıkar. Başlangıç/bitiş, sessizlik ve clipping'i teknik QC'ye sok.
4. Altyazı cue'larını sözcük/phrase zamanlarından üret. Türkçe satır kırma, eklerin ayrılmaması, okunma süresi ve mobil safe-area kontrolü yap.
5. Lokalizasyon için çeviri → marka/claim kontrolü → ses → altyazı → görsel içi metin → final izleme zincirini çalıştır. Aynı master timeline'ın farklı dilde konuşma süresi değişebilir.

| Sağlayıcı / araç              | Kaynak verisi                                                                                  | Kullanım ve sınır                                                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| ElevenLabs                    | Multilingual v2 29 dil; Flash v2.5 32 dil/~75 ms; free 10.000 karakter/ay; MP3 `mp3_44100_128` | D05 kalite üstünlüğü iddia eder; bağımsız Türkçe bake-off değildir. Hız ve free limit sürüme bağlıdır |
| Scribe                        | D05 Türkçe ve İstanbul/Ege/Karadeniz/Güneydoğu aksanlarını anıyor                              | “88M konuşmacı” kalite puanı değil; gerçek aksan kaydıyla WER ve özel terim doğruluğu ölç             |
| Whisper / EdgeTTS             | Açık/yerel transkripsiyon veya TTS tabanlı ShortGPT akışı                                      | Whisper model indirme/bellek yükü; TTS hizmetinin kullanım koşulları ayrı                             |
| Google Cloud TTS              | tr-TR, SSML, mark/timepoint; MP3, Linear16/PCM, OGG Opus, ALAW/MULAW; sync/streaming/async     | Türkçe karşılaştırmanın referans adaylarından; karakter/voice/model fiyatını ayrı izle                |
| OpenAI TTS                    | D03 11 built-in voice aktarır                                                                  | Aynı LLM sağlayıcısını kullanmak entegrasyonu kolaylaştırabilir; katalog/model koşulları değişebilir  |
| MiniMax Speech                | D03 speech-2.8 HD/Turbo, emotion control, 40 dil                                               | Video + ses billing yüzeyi sadeleşebilir; kalite ve haklar bağımsız test edilir                       |
| Azure neural TTS / Adobe TTS  | Kaynaklarda alternatif ses katmanları                                                          | Kurumsal katalog ve seçilen endpoint/voice özellikleri kontrol edilir                                 |
| Runway Seed Audio / Eleven v3 | D03 credit/sec veya karakter modeli; WAV/MP3/Opus, SFX                                         | Ortak gateway kolaylığı, doğrudan sağlayıcıyla aynı ücret anlamına gelmez                             |

## Karar: sesi, lip-sync'i ve müziği ayrı kabul et

TTS başarılı olsa bile görüntüdeki dudak hareketi veya beat-matching başarısız olabilir. İnsan sesinin klonlanmasında amaç/süre/platform kapsamı ve gerekli izin kaydı tutulur. Müzik/SFX lisansı ses sağlayıcısının TTS sözleşmesinden ayrı ele alınır. Native audio kullanan video modelinde de konuşma içeriği, loudness ve Türkçe anlaşılabilirliği aynı QC kapısından geçer. [D01](#/sources?doc=D01) [D03](#/sources?doc=D03) [D05](#/sources?doc=D05)
