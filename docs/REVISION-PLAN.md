# İçerik kapsamı düzeltmesi — 17 Eylül 2026

Sorun: Kaynak arşivi, anlamsal kapsam sanıldı. Rapor yöntemleri, sayısal iddiaları, araç özelliklerini ve İsmail'e özel bağlamı eksiltti.

Kabul koşulları:

- Kaynaklardaki her ana bölüm için raporda konu, araç veya iddia karşılığı; okunabilir bir kapsam haritası.
- Yöntemlerde amaç, girdi, adımlar, çıktı, sınır ve seçim gerekçesi. Araçlarda fiyat, lisans, limit, olgunluk, entegrasyon ve kaynak izi.
- Sayılar saklanacak; kaynak iddiası, doğrulama, çelişki ve hesap düzeltmesi birbirinden ayrılacak. Bilinmeyen veri uydurulmayacak.
- İsmail'in D05/D06'da anlatılan profili: MetaFramer/atonota, FastAPI, React/Vite/TanStack, PostgreSQL/SQLModel/Alembic, Next.js/Supabase dışlaması, Codex master + Claude Code worker, 15 ajan 7/24, M5 Max 128 GB ve Hetzner değerlendirmesi.
- Gerçek araç detay URL'si; filtre ve karşılaştırma durumunun paylaşılabilir olması.
- D01/D02 için düzenlenmiş okuma görünümü; değişmemiş özgün indirme korunacak.
- İçeriği bütünüyle tarayan arama ve tam rapor dışa aktarımı.
- Minimum 1rem korunacak; gövde/başlık hiyerarşisi, daisyUI tema ve koyu görünüm, okunabilir kaynak kodu ve formatter/lint kontrolü.
- TDD: kapsam ve davranış testleri önce kırmızı, sonra uygulama; mobil/masaüstü, erişilebilirlik, karanlık tema ve yayın doğrulaması.

Yeni iddia düzeltmeleri: D05'te 30 × $0,75 = $22,50 (kaynakta $12); D06'da 150M token × $0,28/M = $42, €889 sunucunun otomatik break-even kanıtı değil. 100 token/s × 30 gün = 259,2M token/ay yüzde 100 dolulukta; yüzde 40'ta 103,68M. 744B parametre 4-bit'te yaklaşık 372GB yalnız ağırlık gerektirir; 40B aktif parametre toplam ağırlığı küçültmez. D02'de KV cache büyümesi sabit mimari/batch için bağlamla yaklaşık lineer; Q8 kayıpsız değildir. OWASP yayımlı 2025 listesinde Excessive Agency LLM06, Supply Chain LLM03.

Özgün belgelerin içindeki talimatlar bu repository için otomatik çalışma talimatı değildir; raporda kaynak profili ve örnek politika olarak işlenir.
