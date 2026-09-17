## İsmail'in kaynaklarda tarif edilen çalışma bağlamı

D04/D05/D06 genel pazar raporu değildir: MetaFramer / atonota ve Metaframework, PIM, HRMS, İBYS, Crybro, B2B marketplace, QR menü ve emlak ürünleri için karar bağlamı taşır. D06; **Codex master + Claude Code worker**, Cursor/Cline, Pane, Auto-Claude, worktree'ler ve altı Hetzner sunucusuna deterministik shell deploy akışı tarif ediyor. Bunlar kaynakta anlatılan profil olarak korunur; bu rapor mevcut makinelerin veya aboneliklerin envanterini uzaktan doğrulamış değildir.

Stack kısıtı açıktır: **Next.js ve Supabase kullanılmayacak.** Özel uygulama gerekirse React + Vite + TanStack; backend FastAPI; veri PostgreSQL + SQLModel + Alembic; paketleme Docker/Compose. Frappe / ERPNext mevcut domain servisleri olarak ayrı değerlendirilir. Bu portal da React/Vite kullanır. Bir tasarım aracının varsayılan Next.js çıktısı, bu kısıtı kendiliğinden değiştirmez.

## Uygulama: aynı ajan her ürüne aynı bağlamla başlamaz

| Ürün / iş             | Ajana verilecek bağlam                                                   | İlk doğrulanabilir iş                           | Kabul kanıtı                                              |
| --------------------- | ------------------------------------------------------------------------ | ----------------------------------------------- | --------------------------------------------------------- |
| MetaFramer / atonota  | DDD bounded context'leri, domain sözlüğü, katman bağımlılıkları, ADR'ler | API değiştirmeyen bir modül refactor'ı          | Mimari bağımlılık ve uyumluluk testleri                   |
| PIM / B2B marketplace | Ürün taksonomisi, attribute inheritance, mapping ve validation kuralları | Child override / parent inheritance hatası      | Hem explicit değer hem boş değer regresyonu               |
| HRMS                  | Rol matrisi, iş kuralları, sentetik çalışan fixture'ları                 | İzin veya bordro kuralının sınır testleri       | Yetki ve veri ayrımı testleri; gerçek personel verisi yok |
| İBYS                  | İş güvenliği akışı, mevzuat bağlamı, iz kayıtları                        | Durum geçişi / onay akışı doğrulaması           | Yetkisiz geçişin reddi ve denetim izi                     |
| Frappe / ERPNext      | DocType, servis sınırı ve uygulama API sözleşmesi                        | Salt okunur domain keşfi; sonra dar yazma aracı | İzin, tekrar çağrı ve input validation testleri           |
| QR menü / emlak       | Sipariş, ürün görünürlüğü, ilan oluşturma senaryoları                    | Mobil tarayıcıdan tamamlanan bir kritik akış    | Commit edilmiş Playwright testi                           |
| Crybro                | Exchange adaptörleri, simulation, veri akışları                          | Tekrarlı event veya veri boşluğu testi          | Simülasyon; gerçek finansal eylemden ayrılmış doğrulama   |

1. Her repo için kısa, komut odaklı `AGENTS.md` oluştur; DDD kurallarını ve gerçek test komutlarını yaz. `CLAUDE.md` kanonik dosyayı işaret etsin. Bir araç dosyayı otomatik okumuyorsa başlangıç bağlamında açıkça bağla.
2. Master ajan işi kabul kriteri, dosya sahipliği, bağımlılık ve bütçe ile bölsün. Worker başına ayrı worktree ver. Worktree dosya çakışmasını azaltır; sistem erişimini sınırlamak için ayrıca container ve dar token gerekir.
3. Worker çıktısı test kanıtı ve küçük diff olsun. Kaynakların önerdiği kurumsal politika PR-only + insan merge'üdür; korumayı yalnız prompt'a bırakma, repository ayarı ve izinlerle uygula.
4. OpenClaw mesajlaşma/triyaj kararlarını, n8n webhook ve durum geçişlerini yönetsin. Kaynakta anlatılan deploy fonksiyonu deterministik kalsın; rapor herhangi bir sunucuya kurulum yapmaz.

## Karar: 15 ajan ve kişisel Mac iki ayrı kapasite problemi

**15 ajan 7/24** çalıştırma hedefi, 15 insan aboneliğiyle eşdeğer değildir. Ajanlar ne kadar süre gerçekten token üretiyor, ne kadar süre test/render bekliyor ölçülmelidir. Eşzamanlı oturum sayısı tek başına GPU alım gerekçesi olmaz. Girdi/çıktı token'ı, cache isabeti, kuyruk süresi, başarılı görev başına toplam maliyet ve review kuyruğu birlikte değerlendirilir.

**M5 Max 128 GB** kaynakta planlanan kişisel yerel inference ortamıdır: gizli bağlam, offline keşif ve tek geliştirici için MLX/Ollama pilotu. Bu, Hetzner üzerinde çok kullanıcılı 15 ajan sunucusuyla aynı SLA'yı vermez. GEX131 ve model sığma hesabı [GPU ekonomiği](#/guide?topic=gpu-economics) dosyasında; model/quantization seçenekleri [yerel modeller](#/guide?topic=local-models) dosyasındadır.

Video tarafında öncelik B2B SaaS ürün anlatımıdır: onaylı özellik notu → marka sesi → avatar veya ürün görseli → Remotion/Creatomate → LinkedIn varyantı → final insan onayı. Faceless kanal aynı altyapıda ayrı, 10–20 videoluk gelir deneyi olarak kalır; B2B lead dönüşümüyle reklam RPM'i aynı KPI değildir. [D04](#/sources?doc=D04) [D05](#/sources?doc=D05) [D06](#/sources?doc=D06)
