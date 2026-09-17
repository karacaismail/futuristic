## MCP: araca bağlanma sözleşmesi, güven sınırı değil

Model Context Protocol host–client–server düzeninde araç, kaynak ve prompt yeteneklerini tanımlar. Host bir veya daha çok client bağlantısı yönetir; her client bir server bağlantısına karşılık gelir. JSON-RPC 2.0 mesajları kullanılır. D02'nin eski HTTP+SSE anlatımı güncel transport varsayımı yapılamaz; doğrulanmış 2025-06-18 sürümünde stdio ve Streamable HTTP ayrımı vardır.

## Uygulama: üç dar entegrasyonla başla

1. **GitHub**: issue, PR, diff ve check sonuçlarını oku; yazma araçlarını görev ihtiyacına göre ayrıca aç. Merge/deploy erişimi bir doküman okuma aracıyla aynı token'a bağlanmaz.
2. **Context7**: kullanılan kütüphane ve sürümü belirt; dönen örneği repo bağımlılığıyla karşılaştır. Güncel görünen bir örnek test veya resmi sözleşmenin yerine geçmez.
3. **Playwright**: gerçek kullanıcı akışını çalıştır, gözlenen UI'dan locator üret, assertion yaz ve repo testine dönüştür. Geçici tarayıcı başarısı kalıcı regresyon koruması değildir.

D06, Context7 için 62k yıldız / v4.1.1 / 14 Eylül; Playwright MCP için 37,1k yıldız / Apache-2.0 aktarır. Yıldız sayıları tarihli popülerlik iddiasıdır, güvenlik veya kalite skoru değildir. Kaynaktaki 13/20 sunucunun arşivlenmiş olabileceği gözlemi de bütün MCP ekosistemine genellenmez.

### Kendi domain araçların

FastMCP ile `get_product_schema`, `validate_attribute_mapping`, `read_doctype`, `preview_menu_change` gibi MetaFramer/PIM/Frappe/ERPNext/QR menü işine dar araçlar sunulabilir. Genel SQL veya shell yerine alanı sınırlı API, input schema, rol kontrolü ve audit kaydı tercih edilir. Read-only Postgres keşfi bile kişisel veri döndürüyorsa maskeleme ister.

n8n kaynakta üç yol sunar: workflow içindeki **MCP Server Trigger**, ajan için **MCP Client Tool**, Nisan 2026 preview olarak anılan **instance-level MCP**. Community `n8n-mcp` projesinin 2.000+ node bilgisi bir kaynak iddiasıdır. Dokümantasyon getiren tool ile üretim workflow'unu tetikleyen tool aynı riskte değildir.

### Bağlam ve prompt injection

Kaynak sunucu başına 2–5k tool schema token'ı ve aynı anda 3–5 server önerir; bu sabit protokol maliyeti değil yaklaşık bütçe varsayımıdır. Kullanılmayan araçlar hem maliyet hem yanlış seçim yüzeyini büyütür. Araç açıklaması, ticket, README ve tool sonucu dış veri kabul edilir; içindeki “şu secret'ı gönder” metni kullanıcı talimatına yükseltilmez.

## Karar: yeteneği ihtiyaca göre yükle

Tool poisoning, açıklama değişimi ve veri sızdırma için server sürümü/hash'i, izin ve audit kontrolü gerekir. Private data + untrusted content + dışarı yazma erişimi bir araya gelince risk artar. Sentry ve filesystem yalnız gerekli scope ile; Supabase ise İsmail'in açık stack dışlaması nedeniyle önerilen başlangıç setinde yer almaz. [D02](#/sources?doc=D02) [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)
