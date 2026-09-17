## Spesifikasyon, bağlam ve cache farklı sorunları çözer

Vibe coding hızlı keşif/prototip için kullanılabilir; kalıcı bir ürünün kabul ölçütlerini tek başına tanımlamaz. Spec-driven development (SDD) davranışı, durumları, izinleri ve testleri önce yazmayı amaçlar. Context engineering ise bu görevi çözecek ajana gereken bilgiyi doğru zamanda verir. Prompt caching, tekrar kullanılan sabit bağlamın hesaplama maliyetini düşürür; doğruluk veya güvenlik mekanizması değildir.

## Uygulama: spesifikasyondan küçük ve kanıtlı değişikliğe

**Spec Kit** kaynaklarda dört artifact ile tanımlanır: `constitution.md` kalıcı ilkeler/kısıtlar, `spec.md` ne ve neden, `plan.md` teknik tasarım, `tasks.md` uygulanabilir adımlar. Tutarlılık analizi spec-plan-task arasındaki boşlukları yakalamalıdır. Kiro requirements → design → tasks; BMAD analyst/PM/architect/dev rolleri; Superpowers ve Agent Skills tekrarlanabilir uzmanlık paketleri olarak aynı alanda farklı kapsam sunar. Bunları aynı projede üst üste yığmak yerine ihtiyaç duyulan artifact ve sorumluluğu seç.

Bir PIM görevi için örnek sözleşme: child attribute'da explicit değer varsa parent'ı geçersiz kıl; yoksa parent'tan devral; public API ve DB şeması değişmesin. Önce iki davranışı da sınayan failing regression test, sonra küçük patch, ardından domain/integration/typecheck doğrulaması. Başarılı bir demo, veri modeli veya izin sınırındaki boşluğu kapatmaz.

`AGENTS.md` insanın bilip modelin bilmediği yerel kuralları taşısın: kurulum, doğrulama komutları, bounded context sınırı, migration politikası, test fixture kuralı ve “tamamlandı” kanıtı. D06, Claude Code için kanonik `AGENTS.md`'yi `CLAUDE.md` üzerinden bağlama desenini önerir; araçların destek biçimi/sürümü eşit değildir. Dosyayı kısa tut ve ilgili alt alanın ayrıntısını gerektiğinde yükle.

| Bağlam türü                | Nereye konur?             | Ne zaman yüklenir?                |
| -------------------------- | ------------------------- | --------------------------------- |
| Sabit mimari ve komutlar   | Repo talimatı / ADR       | Oturum başlangıcı ve ilgili görev |
| Domain sözlüğü             | Konu belgesi / retrieval  | PIM, HRMS veya framework görevi   |
| Güncel hata ve diff        | Görev mesajı, tool sonucu | İlgili iterasyon                  |
| Geniş wiki                 | Hybrid search + reranking | Repo dışı bilgi eksikse           |
| Tekrarlanan uzmanlık       | Skill                     | Görev eşleştiğinde                |
| Deterministik yasak/format | Hook, CI, izin katmanı    | Araç eylemi veya doğrulama kapısı |

Cache için istikrarlı prefix, tutarlı dosya sırası ve görevden bağımsız tool tanımları yararlıdır. Tarih/git status gibi değişkenleri sabit talimat bloğuna karıştırma. Ancak D02'nin “oturum boyunca kuralları asla değiştirme” ifadesini doğruluğun önüne koyma: yanlış talimatı düzeltmek cache isabetinden önemlidir. TTL, minimum token, cache yazma/okuma fiyatı ve sağlayıcı kapsamı ayrı ölçülür. “%90 tasarruf” kaynak tavan iddiasıdır; tüm faturanın %90 azalacağı anlamına gelmez.

## Karar: daha uzun talimat her zaman daha iyi sonuç vermez

D06, `arXiv:2602.11988` için context dosyalarının ortalama %20+ inference maliyeti eklediği ve genel başarı artışı göstermediği bulgusunu aktarır; başka çalışma için 1.925 repo / 2.303 CLAUDE.md sayısını verir. Bunlar kaynak çalışmasının kapsamıyla ele alınır, bütün repo talimatlarını kaldırma gerekçesi yapılmaz. D02'nin bir mühendis/dört ajan modernizasyon örneğindeki %90 ilk kabul, 5,4 kat throughput ve yarı süre iddiaları da tek vaka üzerinden evrensel kadro dönüşümü kanıtı değildir.

MetaFramer gibi çok modüllü işlerde SDD ve architecture-aware context anlamlıdır. Tek seferlik birkaç satırlık script için bütün bir constitution/rol zinciri gereksiz olabilir. Ölçüt; eksik gereksinimden çıkan rework azalıyor mu, kritik davranış test edilebilir mi, görev başına context maliyeti kontrol altında mı? [D02](#/sources?doc=D02) [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)
