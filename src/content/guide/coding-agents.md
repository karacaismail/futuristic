## Kod tamamlama, repo ajanı ve ajan platformu

Copilot/Tabnine gibi IDE yardımı, Claude Code/Codex/Aider gibi terminal ajanı, Cursor gibi IDE–ajan birleşimi ve OpenHands/Devin gibi görev platformu aynı satın alma kategorisi değildir. D02/D04/D06; işin bağlamı, çalıştırma yetkisi, model yönlendirme ve doğrulama katmanına göre seçim yapmayı önerir. Bir modelin benchmark skoru kullandığı ürünün bütün agent harness'ini açıklamaz.

## Uygulama: mevcut Codex master + Claude Code worker düzeni

Master kabul kriteri ve test kanıtını tanımlar; iş parçasını dosya sahipliği, sınır ve bütçe ile worker'a verir. Worker repo keşfi → başarısız regresyon → küçük değişiklik → test → diff incelemesi sırasını izler. Master'ın kendi varsayımını worker'ın tekrar etmesi bağımsız review sayılmaz; kanıt ve itiraz alanı gerekir.

**Claude Code** kaynakta terminal, izin yönetimi, Skills, hooks, subagents ve TS/Python Agent SDK ile anlatılır. `SKILL.md` progressive disclosure ile gerekli bağlamı yükler. `PreToolUse/PostToolUse`, `SubagentStart/Stop`, `Pre/PostCompact`, `SessionEnd` gibi hook olayları deterministik kontrol noktası olabilir. Hook adı ve sürüm desteği kurulumda teyit edilir; yalnız prompt'a yazılan “yasak” erişim kontrolü değildir. Alt ajanlar ayrı bağlam/model/izinle sınırlanır; kaynakta geçen beş nested seviye evrensel ürün limiti sayılmaz.

**Codex** için D06; CLI, IDE, cloud görev, uygulama/App Server ve `codex apply <task-id>` türü yerel uygulama akışını birlikte anlatır. v0.115 / 16 Mart subagent altı paralel görev ve 10 Eylül Agents API beta tarihleri kaynak iddiası olarak korunur; mevcut ürün yeteneklerinin bağımsız doğrulaması değildir. Yerel, hosted ve self-host runner'ın secret/egress sınırları ayrıca tasarlanır.

**Cursor** kaynakta 2.0 / 29 Ekim 2025, Plan Mode, sekiz paralel worktree/background ajanı ve Ubuntu ortamıyla geçer. “Composer çoğu işi 30 saniyeden kısa yapar” pazarlama/iş yükü iddiasıdır; uzun görev ve kabul kalitesini temsil etmez. IDE içinde hızlı keşif için değerlidir; 15 sürekli ajan kapasitesi fiyat ve kota incelemesi ister.

**Aider** Tree-sitter/AST ile repo map, dosya imzaları ve bağımlılıkları seçer; SEARCH/REPLACE diff, git commit/undo, architect–editor model ayrımı ve headless kullanım sunan kaynak örneğidir. Repo map bütün dosyayı bağlama koymadan ilgili yapıyı gösterir. Yüksek muhakemeli model planlar, ucuz model uygular; doğruluğu aynı test kanıtıyla ölçülür. Kaynak lisans adlandırmaları çelişirse belirli repo/sürüm lisansı kontrol edilir.

**OpenHands** Docker sandbox ve özelleştirilebilir görev runtime'ı; **SWE-agent** agent–computer interface/harness araştırması olarak ele alınır. Cline, Roo Code, Kilo Code, Amp, Factory Droid, Warp ve Gemini CLI kaynakta alternatif olarak anılır; her birinin fiyatı ve yetkisi verilmediğinden varsayılan eşdeğerlik kurulmaz. Devin ancak mevcut sistemden farklı, ölçülebilir bir operasyon avantajı sağlarsa ayrıca denenir.

### Ürün yaşam döngüsü ve deployment

D04, Continue için Apache-2.0 repo/IDE/CLI geçmişinin yanında 2026'da read-only ve ekibin Cursor'a katıldığı iddiasını taşır; Windsurf için Codeium marka değişimi, 2025 Cognition satın alımı ve Devin yakınsamasını vurgular. Bunlar kaynak iddialarıdır; yeni yatırımda bakım ve roadmap teyidi gerekir. Tabnine SaaS/VPC/on-prem/air-gapped seçenekleriyle IP izolasyonunda, GitLab Duo ise GitLab.com/Self-Managed/Dedicated ve kaynakta 18.1 review GA / 18.4 self-host model GA iddialarıyla mevcut platform bağlamında değerlendirilir.

## Karar: ürün eklemekten önce tekrar eden işi seç

CRUD/DTO/serializer/API client, test fixture, dokümantasyon ve dar refactor iyi ilk adaylardır. Şema migrasyonu, auth, para/sağlık verisi veya çok servisli değişikliklerde daha güçlü kabul kapıları gerekir. Claude Max $100/$200, Cursor $20/$60/$200 ve Copilot $10/$39 kaynak fiyatlarıdır; insan aboneliği API token kotası veya kesintisiz worker lisansı değildir. Başarılı görev başına maliyet ve review kuyruğu satın alma kararına taşınır. [D02](#/sources?doc=D02) [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)
