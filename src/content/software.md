## Karar: ajanı doğrulanabilir işlerle başlat

Birincil yatırım, tek bir modele bağlanmak yerine **spesifikasyon → başarısız test → küçük değişiklik → doğrulama → inceleme** döngüsünü kurmaktır. İlk görevler; bir bug’ın regresyon testi, API değiştirmeyen refactor, dokümantasyon ve sınırlı bağımlılık güncellemesi olabilir. İşin bitişi “ajan tamamladım dedi” değil, kabul kriterlerinin geçtiği kanıttır. [D02](#/sources?doc=D02) [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)

## Bir model ile bir ajan aynı şey değil

Model akıl yürütür ve çıktı üretir. Ajan; modele repo araması, dosya düzenleme, terminal, tarayıcı, test ve tekrar deneme döngüsü sağlar. Kodlama ortamı bu araçların izinlerini ve çalışma alanını belirler. Orkestratör görevleri koordine eder. Bu katmanları bir ürün sıralamasında karıştırmak yanlış satın alma kararına yol açar.

| Katman                     | Kaynaklardaki örnekler                            | Seçim sorusu                                                |
| -------------------------- | ------------------------------------------------- | ----------------------------------------------------------- |
| IDE / CLI ajanı            | Codex, Claude Code, Cursor, Copilot, Aider, Cline | Kendi repo görevlerinde doğru değişiklik yapabiliyor mu?    |
| İzole ajan ortamı          | OpenHands, worktree, container/VM                 | Dosya ayrımı mı gerekiyor, güvenlik izolasyonu mu?          |
| Spec / bağlam              | AGENTS.md, Spec Kit, ADR, alan sözlüğü            | Komutlar, sınırlar ve done kriteri açık mı?                 |
| Test ve review             | Playwright, CodeRabbit, Qodo, Copilot review      | Gerçek hatayı yakalıyor mu, inceleme yükünü azaltıyor mu?   |
| Deterministik güvenlik     | Semgrep, CodeQL, dependency/secret scan           | Kritik bulgu build’i durduruyor mu?                         |
| Model serving              | vLLM, SGLang, MLX, llama.cpp/Ollama               | Gerçek eşzamanlı yükte kalite, gecikme ve maliyet ne?       |
| RAG / uygulama framework’ü | LlamaIndex, Haystack, LangGraph                   | Repo dışı bilgi veya kalıcı dallanan iş akışı gerekiyor mu? |

Worktree ayrı checkout sağlar; host dosyalarına veya ağa erişimi engelleyen bir sandbox değildir. Üretim verisi ve güçlü araç erişimi varsa container/VM, dar kapsamlı kimlik bilgileri ve ayrı işlem yetkileri gerekir. [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)

## TDD, ajan için çalıştırılabilir sözleşme

1. Beklenen davranışı, sınır durumlarını ve korunacak mevcut davranışı yaz.
2. Testi çalıştır; doğru nedenle başarısız olduğunu kaydet.
3. Testi geçiren en küçük üretim değişikliğini yap.
4. İlgili testleri, tip kontrolünü ve mevcut kritik akışları çalıştır.
5. Refactor et; aynı testleri tekrar geçir. Testi silerek veya assertion’ı gevşeterek başarı elde etme.
6. Değişiklik, test kanıtı ve kalan belirsizlikleri incelemeye sun.

Birim testleri hesap ve iş kuralını; entegrasyon testleri sınırları; tarayıcı testleri gerçek kullanıcı akışını doğrular. Ekran görüntüsü veya bir MCP tarayıcı oturumu, kalıcı bir E2E testi yerine geçmez. Playwright gözlemini sabit locator ve assertion içeren teste dönüştür. [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)

Bu portalda da ilk davranış testleri uygulamadan önce yazıldı: Türkçe arama, yeniden üretimi içeren maliyet modeli, yerel kayıt dayanıklılığı, kaynak bütünlüğü ve mobil/masaüstü okuma akışları.

## Bağlamı küçük ve işe yarar tut

AGENTS.md içinde gerçek kurulum/test komutları, modül sınırları, mevcut konvansiyonlar ve tamamlanma kriterleri olsun. Yaşayan mimari kararlarını ADR’lerde, alan terimlerini sözlükte sakla. Araçların kendi talimat dosyası desteğini sürüme göre teyit et. Kaynaklardaki “ne kadar çok bağlam o kadar iyi” varsayımı desteklenmiyor. [D02](#/sources?doc=D02) [D06](#/sources?doc=D06)

Prompt caching; sağlayıcıya, eşleşen prefix’e, token eşiğine ve TTL’e bağlıdır. Statik içerikleri başta, değişken görev verisini sonda tutmak bir optimizasyon adaydır. Tek dosyadaki bir karakterin her durumda bütün önbelleği yok ettiği veya her istekte %90 indirim sağlandığı söylenemez. Cache hit ve gerçek faturayı ölç.

## MCP ve RAG: farklı ihtiyaçlar

MCP dış araç ve verilere erişimi standartlaştırır; RAG ilgili bilgiyi getirir. PostgreSQL şemasını okumak, issue almak ve tarayıcı testi yapmak araç erişimidir. Repo dışı iş kuralları, runbook ve müşteri dokümantasyonu ise bilgi getirmeyi gerektirebilir. Her repo için vektör veritabanı kurmak zorunlu değildir. [D04](#/sources?doc=D04)

Başlangıçta GitHub, güncel dokümantasyon ve Playwright gibi birkaç gerekli entegrasyon seç. Dönen veriyi talimat kabul etme; tool izinleri, kimlik, log ve veri çıkışını kontrol et. MCP kendi başına güvenlik garantisi vermez. Uzak taşıma için Streamable HTTP güncel temel; eski HTTP+SSE örneklerini sürümünü bilmeden kopyalama. [MCP transport spesifikasyonu](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports)

## Daha çok kod, daha yüksek üretkenlik anlamına gelmez

METR’nin 2025 deneyinde kendi olgun projelerinde çalışan 16 geliştirici, 246 görevde AI ile ortalama %19 daha uzun süre harcadı. Bu, belirli bir örneklem ve araç döneminin sonucu. 2026 takip yazısı seçim etkilerinin güncel hızlanma büyüklüğünü güvenilir ölçmeyi zorlaştırdığını söylüyor. Dolayısıyla iki sonuçtan da evrensel bir “AI hız oranı” türetmiyoruz. [2025 çalışma](https://arxiv.org/abs/2507.09089) · [2026 yöntem güncellemesi](https://metr.org/blog/2026-02-24-uplift-update/)

DORA’nın 2025 bulgusu, AI’ın mevcut organizasyonel kapasiteyi büyütmesi: test ve teslimat darboğazları çözülmeden daha fazla üretim aynı ölçüde daha fazla değer yaratmayabilir. [DORA raporu](https://dora.dev/research/2025/dora-report/)

**2–4 haftalık baz ölçüm** ve benzer görevlerle pilot öneriyoruz. PR cycle time, review süresi, escaped defect, change failure rate, mühendislik saati ve kabul edilen görev başına maliyeti birlikte izle. Kod satırı miktarını başarı KPI’ı yapma. GitClear, SWE-bench ve vendor benchmark sayıları kaynaklarda korunuyor; farklı görev/harness/sürüm sonuçlarını doğrudan sıralamaya dönüştürmüyoruz. [D02](#/sources?doc=D02) [D04](#/sources?doc=D04)

## Yerel model kararı: önce iş yükünü ölç

Açık ağırlık, ücretsiz işletim veya sınırsız ticari kullanım demek değildir. Model lisansı, runtime lisansı ve eğitim/veri koşulları farklıdır. VRAM hesabına ağırlıklar, KV cache, context uzunluğu, batching ve concurrency dahil edilir. MoE’nin aktif parametre sayısı, bütün modelin belleğe sığdığı anlamına gelmez.

Kaynakların 15 eşzamanlı ajan, 128 GB Mac ve Hetzner GPU senaryolarını kapasite hipotezi olarak kullan. Evrensel “150 milyon tokenda self-host kazanır” eşiği vermiyoruz. Gerçek token giriş/çıkış oranı, cache, kabul edilen görev kalitesi, bekleme süresi, GPU kullanım oranı ve bakım emeğiyle 30 günlük karşılaştırma yap. [D02](#/sources?doc=D02) [D06](#/sources?doc=D06)

Python için Ruff + bir tip kontrolcü + pytest; React/TypeScript için formatter/linter + TypeScript + Vitest + Playwright tutarlı bir geri bildirim hattıdır. Mevcut projedeki mypy eklentileri veya lint kuralları korunmalı; sırf yeni olduğu için araç geçişi yapılmamalı.
