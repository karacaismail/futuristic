## Çoklu ajan yöneticisi hangi problemi çözer?

D06'nın Pane / Auto-Claude / worktree bağlamında asıl ihtiyaç yeni bir kod modeli değil; iş kuyruğu, ayrı checkout, görünür durum, diff incelemesi ve birleştirme sırasıdır. **Git worktree dosya izolasyonu sağlar; güvenlik sandbox'ı sağlamaz.** Aynı kullanıcının secret'ına ve ağına erişebilen iki worktree hâlâ aynı yetki alanındadır.

## Uygulama: 15 ajan için görev sözleşmesi

Her görev hedef, kabul kriteri, branch/worktree, dosya sahipliği, bağımlı iş, izinli komutlar, model bütçesi ve timeout taşır. Aynı veritabanı migrasyonuna veya ortak şemaya iki ajan eşzamanlı yazıyorsa worktree tek başına merge doğruluğu sağlamaz. Şema sahibi ve birleştirme sırası önceden tanımlanır.

| Kaynakta geçen yönetici | Anlatılan yaklaşım                              | İsmail'in düzeninde değerlendirme                                                                        |
| ----------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Pane / Auto-Claude      | Mevcut çoklu ajan çalışma bağlamı               | İlk karşılaştırma tabanı; çalışan akışı sırf yeni isim için değiştirme                                   |
| Conductor               | Mac üzerinde worktree, diff ve PR odaklı arayüz | Yerel paralel görevleri inceleme; sunucu ajan havuzu ayrı konu                                           |
| Vibe Kanban             | Bloop kökenli yerel görev panosu ve worktree    | D06, 10 Nisan 2026 kapanışı / Apache community ayrımını bildiriyor; ürün, repo ve fork bakımını teyit et |
| Claude Squad            | tmux/TUI, session ve worktree                   | Terminal odaklı hafif koordinasyon; izolasyonu ayrıca kur                                                |
| CodeConductor / amux    | Çoklu coding ajanı oturum yönetimi              | Log, restart, budget ve görev–branch eşleşmesini PoC'de kontrol et                                       |
| agentbox                | Hetzner/Docker üzerinden worker yaklaşımı       | Ağ, disk, token ve container yaşam döngüsü önemli                                                        |
| Sculptor                | Container tabanlı ajan çalışma alanı            | İmaj güncelleme ve çıktı aktarımı maliyeti                                                               |
| VibeTree                | Kaynakta alternatifleri derleyen repo           | Bir runtime garantisi değil; keşif indeksi                                                               |

Bir worker tamamlandığında “kod yazdı” değil, değişen dosyalar, test komut/sonuçları, kalan belirsizlikler ve diff döner. Aynı anda çok worker üretimi artırırken review darboğazını büyütebilir. Üretim concurrency'si insan onay kuyruğuna göre de sınırlandırılır.

### Kuyruk ve güvenlik birbirinden ayrı

İş planlayıcı retries, priority ve capacity yönetir. Sandbox dar token, ayrı filesystem mount, egress allowlist ve kaynak kotası uygular. Model seçimi risk/karmaşıklığa göre değişebilir; parent modelinin her alt göreve miras kalması gereksiz maliyet yaratabilir. Düşük maliyetli worker kullanmak testleri zayıflatma yetkisi vermek anlamına gelmez.

### Repo keşfi

D06'nın `no-fluff/awesome-vibe-coding` ve `andyrewlee/awesome-agent-orchestrators` listeleri alternatifleri keşfetmek içindir. Listeye alınmak bakım veya güvenlik onayı değildir. Her adayda son bakım, lisans, worktree temizliği, kesilen işi sürdürme, diff review ve container sınırını ayrı kontrol et. Kod deposuna yıldız vermek ile production standardı seçmek farklı kararlardır.

## Karar: göç için ölçülebilir bir gerekçe iste

Yeni yönetici ancak context kaybı, durmuş görevler, diff inceleme süresi, çakışan dosyalar veya uzaktan worker işletimi gibi somut bir sorunu azaltıyorsa eklenir. Önce mevcut Pane düzeninde görev tamamlanma, conflict, retry ve insan review süresini ölç; alternatifle aynı görev setini karşılaştır. [D06](#/sources?doc=D06)
