## Model, ajan ve serving motoru farklı seçimlerdir

Aider/Qwen Code/OpenHands bir görevi araçlarla yürüten ajan kabuğudur; Qwen, DeepSeek, GLM veya Kimi model ailesidir; vLLM/SGLang/MLX ise modeli çalıştıran motorlardır. Model ağırlığının lisansı, repository kodunun lisansı ve API sağlayıcısının veri politikası ayrı kontrol edilir. Açık ağırlık, otomatik olarak OSI onaylı açık kaynak veya sınırsız ticari kullanım demek değildir.

## Uygulama: model adaylarını donanıma ve göreve eşleştir

Aşağıdaki değerler **D02/D06 kaynak iddialarıdır; güncel ölçüm veya indirme garantisi değildir.** Sürümler, harness ve quantization aynı olmadan skorları sıralama gibi kullanma.

| Aday                             | Kaynaktaki özellik / sayı                                                           | Pratik rol ve sınır                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Qwen2.5-Coder 7B                 | Q4_K_M yaklaşık 4,7–5,5 GB; 8 GB sınıfı kart; 40–50 token/sn iddiası                | Completion, küçük script; uzun context ve eşzamanlılık için ek bellek                                    |
| Qwen2.5-Coder 14B                | Q5_K_M 10,7–12,5 GB; Q8_0 14,7–16,5 GB                                              | Orta ölçekli yerel kodlama. D02'nin Q8'i “kayıpsız” sayması doğru bir varsayım değildir                  |
| Qwen2.5-Coder 32B                | Q4_K_M 19,6–22 GB; 24 GB GPU sınıfı                                                 | Çok dosyalı işler için aday; ağırlık sığsa bile KV cache bütçesi sınırlı                                 |
| DeepSeek-R1 / distill            | Ana model 671B; D02 yaklaşık 400+ GB verir. Distill-Qwen-32B için Q4/24 GB sınıfı   | Tam R1 ile damıtılmış 32B modelin kapasite ve davranışını karıştırma                                     |
| Qwen3-Coder-Next                 | D06: 80B toplam / 3B aktif, 512 expert / 10 seçili, 256K–1M context, yaklaşık 46 GB | MoE hesap yükünü azaltır; bütün gerekli expert ağırlıkları yine depolanır                                |
| Qwen3.6-27B                      | D06: SWE-bench %77,2 ve Mac'te yaklaşık 30 token/sn                                 | Tarihli kaynak adayı; gerçek artifact, lisans ve aynı görevlerde başarı teyit edilmeli                   |
| DeepSeek V4 Pro / Flash          | D06: MIT, Pro %80,6; Flash 284B-A13B ve 2-bit Mac'te yaklaşık 39 token/sn           | Vendor/community iddiaları. 2-bit kalite kaybı ve offload gecikmesi ayrıca ölçülür                       |
| GLM-5.2 / GLM-5.3                | D06: 744B toplam / 40B aktif, 1M context, Terminal-Bench 2.1 81,0                   | 40B aktif demek 40B ağırlık değildir. 744B × 4-bit ≈ 372 GB; tek 96 GB kart önerisi bu varsayımla tutmaz |
| Kimi K3                          | D06: yaklaşık 2,8T parametre, Vals %93,4, Frontend Arena liderlik iddiası           | Cluster ölçeği; tek GEX131 veya Mac için self-host adayı diye sunulamaz                                  |
| Mistral Devstral, gpt-oss, Llama | D06 alternatif aileler olarak anıyor                                                | Kesin sürüm/lisans/VRAM verilmediği için kıyas verisi eksik                                              |
| StarCoder2 / CodeGen             | D04: OpenRAIL-M / Apache-2.0; araştırma ve fine-tuning çizgisi                      | Tarihsel temel; doğrudan güncel en iyi repo ajanı oldukları sonucu çıkmaz                                |

Serving seçimini küçük bir görev setiyle yap: aynı model/quantization, aynı system prompt, aynı 1/4/8/15 oturum yükü. İlk token süresi, kullanıcı başına decode hızı, p95 kuyruk, test başarı oranı ve bellek tepesini kaydet. D06'nın vLLM için H100'de 12.500 token/sn ve SGLang için %29 avantaj rakamları model/batch/iş yükü olmadan kendi SLA'na aktarılamaz.

- **vLLM:** batching, PagedAttention ve geniş uyumluluk; GPU'da yüksek toplam throughput deneyi.
- **SGLang:** RadixAttention/prefix reuse; aynı talimatlarla tekrarlayan ajan istekleri için karşılaştırma adayı.
- **TensorRT-LLM:** NVIDIA optimizasyonu; derleme ve sürüm bakım maliyeti daha yüksek olabilir.
- **llama.cpp / Ollama / LM Studio:** GGUF ve yerel kullanım ergonomisi; kolay kurulum, üretim kapasitesi garantisi değil.
- **MLX:** Apple Silicon birleşik belleği için yerel motor; D06'daki Ollama 0.19 MLX ve 58→112 decode / 1.154→1.810 prefill değerleri kaynak ölçümüdür.

### Model framework’ü ve ajan runtime’ı

Hugging Face Transformers, D04'te Apache-2.0 framework olarak PyTorch tabanlı model yükleme, inference ve fine-tuning katmanıdır. StarCoder/CodeGen gibi modelleri araştırmak veya özel veriyle uyarlamak için kullanılabilir; issue okuyup test çalıştıran coding ajanının yerine geçmez. TGI gibi serving yolları ayrıca değerlendirilir. Dataset izni, model ağırlığı lisansı ve eğitim maliyeti framework lisansından bağımsızdır.

## Karar: önce sığma, sonra kalite, sonra ekonomi

Alt bellek sınırı yaklaşık `parametre sayısı × bit / 8` ile başlar; quantization metadata'sı, activation, runtime ve KV cache buna eklenir. Sabit mimari/batch için KV cache bağlam uzunluğu ile yaklaşık doğrusal büyür; D02'nin “logaritmik” ifadesi kapasite hesabına alınmamalı. CPU offload sığmayı mümkün kılabilir ama aynı hızda çalışmayı garanti etmez.

D06'nın M5 Max için 40-core GPU, 128 GB ve 600–614 GB/sn; Qwen3.5-35B-A3B için 112 token/sn sayıları donanım/benchmark iddiası olarak korunur. Kendi 30 günlük repo görevlerinde doğru patch oranı ve insan düzeltme süresi kabul edilmeden satın alma kararı verilmez. Model adı, toplam/aktif parametre, quantization, context ve test harness'i birlikte raporlanır. [D02](#/sources?doc=D02) [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)
