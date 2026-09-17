## Üretkenlik iddiasının paydası görünür olmalı

METR, DORA, GitClear, SWE-bench ve vendor review kıyasları farklı soruları yanıtlar. Bir benchmark skorunu geliştirici saatine, kullanıcı algısını teslimat hızına, churn korelasyonunu tek başına nedenselliğe çevirmek yanlış karar üretir. Kaynak rakamları saklanır; örneklem, tarih, harness ve ölçüm türü yanlarında yer alır.

## Uygulama: veri tablosundan kontrollü pilota

| Kaynak iddiası             | Ne söylüyor?                                                                                                    | Ne söylemiyor?                                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| METR 2025                  | 16 deneyimli OSS geliştirici, 246 görev; AI ile %19 daha uzun süre; katılımcılarda yaklaşık %20 hızlanma algısı | Yeni repo, yeni model ve bütün görevlerde aynı etki                                                             |
| METR 2026                  | D04 %4–20 hızlanma yönünde ham sinyal aktarıyor                                                                 | Seçim etkileri nedeniyle güvenilir genel etki büyüklüğü değil; mevcut V07 düzeltmesi korunur                    |
| GitClear                   | D02: 600M+ satır, churn %84 artış; refactoring %25'ten %10 altına; copy/paste'ın moved code'u geçmesi           | AI'ın tek başına nedensel etkisi veya her repo için aynı oran; bu revizyonda %84 rakamı bağımsız teyit edilmedi |
| DORA 2025                  | D02 %90 kullanım aktarır; ortak bulgu AI'ın sistemin güçlü/zayıf taraflarını büyütmesi                          | Her ekibin throughput ve stability'sinin aynı yönde değişmesi                                                   |
| Copilot / saha çalışmaları | D04 review'da yaklaşık %15; docs/completion'da %50'ye, tekrarlı işlerde %30–40'a kadar kazanım aktarır          | Bağımsız, aynı görev dağılımında garanti edilmiş net kazanç                                                     |
| SDD vaka çalışması         | D02: bir mühendis/dört ajan, %90 ilk kabul, 5,4× throughput, yarı takvim                                        | Dört kişilik her ekibin tek kişiye indirilebileceği                                                             |

GitClear'ın [güncel metodoloji açıklaması](https://gitkraken.gitclear.com/industry_stats/ai_code_quality_signal_graphs), churn'ü iki hafta içinde yeniden yazılan/silinen authored satır payı olarak tanımlar. Bu gösterge rework için bir vekildir; benchmark accuracy ile aynı kavram değildir.

### SWE-bench ve diğer ölçümler

D04 özgün SWE-bench için 12 Python repo / 2.294 issue; D02 Verified için insan kontrolünden geçmiş 500 problem, Pro için 41 repo / 1.865 görev aktarır. Verified, Pro, Terminal-Bench ve Frontend Arena birbirinin yerine geçmez. D02'deki “contamination imkânsız” ifadesi mutlak güvence olarak kullanılamaz.

D02/D06'daki sayılar görünür kalsın: Claude Opus 5 %96–97, GPT-5.6 Sol %96,2, Claude Fable 5/Mythos %93,9–95, Qwen 3.8 Max %67,7–77,3, Qwen2.5-Coder 32B yaklaşık %27–33; Pro için Muse Spark 1.1 %61,5 ve farklı vendor harness'inde Fable %80. D06 açık model tarafında DeepSeek V4 %80,6, Qwen3-Coder-Next %70,6, Qwen3.6-27B %77,2, Kimi K3 %93,4 ve GLM Terminal-Bench 81,0 aktarıyor. **Bu yeni sürüm, bu model adlarını veya skorları bağımsız güncel leaderboard doğrulaması saymaz.** Kaynaktaki farklı harness'ler tek sıralamaya birleştirilmez.

## Karar: kendi ürünlerinde net faydayı ölç

2–4 hafta baseline, ardından benzer görevlerle 5–10 geliştirici/az sayıda repo pilotu D04'ün önerisidir. İşleri complexity, domain familiarity ve task türüne göre ayır. Time-to-first-PR, time-to-merge, PR cycle time, review latency/rounds, diff büyüklüğü, CI failure, mutation/coverage, escaped defects, change failure, recovery/MTTR, security remediation ve developer satisfaction birlikte izlenir.

Finansal çıktı **kabul edilen görev veya merge edilen PR başına toplam maliyet** olmalı. 25 kişi × ayda 2 saat net kazanç = 50 saat senaryosu, lisansın teorik geri dönüşünü sınar; kodlama 5 saat kısalıp review 6 saat uzarsa negatif net sonuç vardır. AI-generated LOC ve kabul edilen öneri oranı adoption göstergesidir, tek başına başarı KPI'sı değildir. [D02](#/sources?doc=D02) [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)
