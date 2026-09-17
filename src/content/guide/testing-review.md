## Test üretimi, PR review ve otomatik onarımın sorumlulukları

Test runner çalıştırılabilir davranışı sınar; review aracı diff'teki şüpheli noktaları bulur; SAST/SCA scanner güvenlik/bağımlılık bulgusu üretir. Birinin varlığı diğerini gereksiz kılmaz. “Self-healing” bazen yalnız teşhis, bazen patch önerisi, bazen PR açma demektir; ürün adı yerine hangi aktörün hangi dosyayı değiştirebildiğini yaz.

## Uygulama: failing test → patch → bağımsız kontrol

1. Gereksinimin bug öncesi/sonrası davranışını ve sınır koşulunu yaz. Regression test doğru nedenle kırmızı olmalı; derlenmeyen test tek başına davranış kanıtı değildir.
2. Ajan minimum patch'i uygulasın. Assertion silme, skip ekleme, snapshot'ı gerekçesiz yenileme veya izin kontrolünü gevşetme ayrı review gerektirsin. Test weakening böyle yakalanır.
3. Formatter/lint/typecheck ardından unit, integration ve riskli akışlarda Playwright çalışsın. Coverage kadar mutation score ve yanlış pozitif testler değerlendirilsin.
4. CodeQL/Semgrep finding → SARIF/data-flow + ilgili kod → AI düzeltme → scanner ve test tekrar çalıştırma. LLM'nin “güvenli” demesi scanner sonucunun yerini almaz.
5. PR'da root cause, değişen davranış, çalıştırılan komutlar ve kalan risk yer alsın. İnsan merge kararı; production operasyonu ayrı kapı.

| Araç / sınıf                   | Ne üretir?                                         | Nerede faydalı?                                            | Kontrol edilmesi gereken                                                                                |
| ------------------------------ | -------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Playwright / MCP               | Akış keşfi; commit edilmiş testte kalıcı assertion | React/Vite mobil sipariş, listeleme, form ve izin akışları | MCP oturumu tek başına regression testi değildir; locator ve beklenen davranış review edilir            |
| Diffblue Cover                 | Java unit test üretimi/bakımı                      | Büyük legacy Java modülleri                                | FastAPI/React'e doğrudan eşdeğer değil; üretilen testin semantiği ve ortam desteği                      |
| Qodo / Qodo Cover / Merge      | Kurallar, PR inceleme, test üretimi                | Çok repo, ticket uyumu ve test açığı                       | D02'nin %60,1 F1 iddiasının benchmark bağlamı                                                           |
| CodeRabbit                     | Diff ve bağlam üzerinde inceleme/öneri             | İnsan review kuyruğunu azaltma                             | D06 %49,2 precision; planlara göre $24/$48/$72/kişi-ay kaynak iddiası; gürültü kendi PR'larında ölçülür |
| Greptile                       | Codebase indeksleme ve cross-file inceleme         | Bağlantılı monorepo/servis etkileri                        | Kaynaktaki %82 recall kendi benchmark'ı; yanlış pozitif ve indeks gizliliği                             |
| Copilot Review / GitLab Duo    | Platform içi review ve sonraki ajan işi            | Mevcut GitHub/GitLab ekibi                                 | Lisans kapsamı, çağrılan araçlar, insan sorumluluğu                                                     |
| Cursor Bugbot                  | PR incelemesi                                      | Cursor kullanan ekip                                       | D06'nın ~90 sn ve $1–1,50/review rakamı kaynak iddiası                                                  |
| SonarQube                      | Kalite kapısı, duplication, teknik borç            | Kurumsal sürdürülebilirlik                                 | Test veya bütün güvenlik açıklıklarını kapatma garantisi değil                                          |
| DeepSource / Snyk / Dependabot | Statik kalite, bağımlılık bulgusu ve güncelleme    | CVE ve migration bakım kuyruğu                             | AI önerisinden sonra deterministik doğrulama                                                            |

D06'nın “review araçlarının hepsi kodu okur, asla çalıştırmaz” genellemesi kendi Copilot/CodeQL anlatımıyla da gerilimlidir. Doğru ayrım, belirli ürün/sürümün yürütme yetenekleri ile **bizim CI davranış kanıtımızın** ayrı olmasıdır. Review başarısını runtime testi yerine sayma.

## Karar: ikinci review botunu ancak ek değer gösterirse al

Başlangıçta bir AI review katmanı kullan. Eşdeğer PR'larda bulunan gerçek hata, yanlış alarm, yorum başına düzeltme oranı ve reviewer dakikasını ölç. Yüksek recall aracı daha çok bulgu getirip insanı yorsa net kazanç düşebilir. CodeRabbit'in repo/müşteri/ARR sayıları ya da DeepSource'un %84,51 F1'i farklı ölçümleri anlatır; aynı leaderboard sütunu değildir.

İsmail'in 15 ajan hedefinde temel darboğaz PR üretme sayısından çok kabul edilebilir değişiklik ve review kapasitesidir. Ayrı worker işini ayrı kabul kriteriyle sınar; kritik auth/ödeme/migration işinde bir modelin kendi çıktısına verdiği onayla yetinilmez. [D02](#/sources?doc=D02) [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)
