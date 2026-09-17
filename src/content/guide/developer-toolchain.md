## Ajanın geliştirici arayüzü: komut, şema ve test

Ajanın daha iyi çalışması için framework'ü değiştirmekten önce deterministik komutları ve domain sözleşmesini görünür yap. D04/D06'nın agent-native yaklaşımı; scaffold, metadata/DSL, şema, migration ve test harness üzerinden güvenilir küçük işlemler sunar. UI tıklamalarıyla yapılabilen bir işin CLI/API karşılığı geliştirici deneyimini de iyileştirir.

## Uygulama: İsmail'in stack'ine uygun araç zinciri

| Alan                    | Düzen                                                        | Kabul kanıtı                                                                  |
| ----------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Python / FastAPI        | uv ortamı; Ruff lint + format; seçilmiş type checker; pytest | Lock dosyası, temiz lint, tip ve davranış testleri                            |
| Tip denetimi            | mypy, ty veya Pyrefly karşılaştırması                        | SQLAlchemy/Pydantic plugin davranışı ve mevcut hata seti; hız tek karar değil |
| React / Vite / TanStack | TypeScript, Query/Table/Router; tutarlı format/lint          | Query key/schema sınırları, erişilebilir component ve route testleri          |
| UI geliştirme           | Storybook bileşen senaryosu + Playwright kullanıcı akışı     | Mobil etkileşim, focus, hata/boş/loading durumları                            |
| Veritabanı              | SQLModel / PostgreSQL / Alembic                              | Migration ileri/geri davranışı, veri korunumu ve ayrı test DB                 |
| Operasyon               | Docker Compose + GitHub Actions                              | Aynı komutların yerel ve CI'da çalışması; test artifact'ları                  |

**Ruff** lint ve format yapar; type checker değildir. D06'nın 10–100× hız ifadesi iş yüküne bağlı kaynak iddiasıdır. **ty** beta ve **Pyrefly** Rust yaklaşımı; kaynakta Django için 578 ms ile 16 sn karşılaştırması anılır. Bu tek ölçüm plugin uyumluluğunu veya kendi kodunun semantik doğruluğunu kanıtlamaz. Pydantic v1 / SQLAlchemy mypy plugin kullanan projelerde doğrudan kaldırma kararı verilmez.

TypeScript tarafında **Biome**, **oxlint** ve **Prettier** rollerini ayır: oxlint linter'dır; formatter diye sunulmaz. Aynı dosyayı farklı stil kurallarıyla biçimlendiren iki formatter çalıştırma. EditorConfig, açık package scripts, pre-commit'te hızlı deterministik kontroller ve CI kapıları onboarding'i kolaylaştırır. Her tuş vuruşunda ücretli LLM incelemesi çalıştırmak gerekli değildir.

### Tasarımdan koda

Figma MCP / Framelink tasarım bilgisini, component ve token bağlamını taşır. Çıktı varsayılan React/Tailwind olsa bile bu üretim kodu kalite garantisi değildir. Stitch kaynakta 19 Mart sürümü, sonsuz canvas, MCP ve ücretsiz 350 generation iddiasıyla geçer; plan limiti güncel teklif olarak kabul edilmez. v0'ın Next.js varsayılanı, İsmail'in Next.js/Supabase dışlamasıyla çelişiyorsa React/Vite hedefi açıkça verilmelidir.

## Karar: hızlandırmayı bakım maliyetiyle ölç

Scaffold; domain adlandırması, dosya yerleşimi, migration ve test komutlarını birlikte üretmelidir. Ajan yanlış test komutu tahmin ediyorsa daha büyük modelden önce repo dokümantasyonunu düzelt. Bu portalda da okunabilir TSX, format kontrolü, lint ve gerçek tarayıcı testleri DX'nin parçasıdır. [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)
