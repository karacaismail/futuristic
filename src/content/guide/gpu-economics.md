## Fiyatı sakla; hesabın varsayımını da görünür yap

D06'nın **GEX131 €889/ay** fiyatı, **€1.199/ay + €599 setup** alternatif listesi ve **€1,4247/saat** rakamı birbirine eşit teklifler değildir. Rapor tarihi, vergi, ülke, yapılandırma, kurulum ve dönem farklı olabilir. Burada kaynak rakamları korunur; canlı configurator teklifi gibi sunulmaz. D06 GEX44'ü RTX 4000 SFF Ada 20 GB / €184–234; GEX131'i RTX PRO 6000 Blackwell Max-Q 96 GB, Xeon Gold 5412U 24 core / 256 GB DDR5 olarak tanımlar. Güncel satın alma öncesinde donanım ve fiyat ayrıca teyit edilmelidir.

## Uygulama: API ile GPU'yu aynı iş yükünde karşılaştır

1. 30 gün boyunca girdi token'ı, çıktı token'ı, cache-hit token'ı, saatlik eşzamanlılık, p95 bekleme ve kabul edilen görev sayısını kaydet. 15 açık ajan oturumu 15 aktif decode akışı demek değildir.
2. API maliyetini `(uncached input × input rate + cached input × cache rate + output × output rate) / 1M` ile hesapla. Tool, arama, depolama ve gateway ücretlerini ekle. İnput/output oranı bilinmiyorsa tek token fiyatı kullanma.
3. GPU aylık toplamına kira, setup amortismanı, disk/egress, elektrik (varsa), bakım saatleri, yedek kapasite ve başarısız iş maliyetini koy. Dövizleri aynı gün ve aynı para birimine çevir.
4. Aynı repo görevlerinde kaliteyi eşitle: ucuz model iki kat deneme veya daha fazla insan düzeltmesi istiyorsa ham token maliyeti kazanç değildir.
5. Bir hafta boyunca 1/4/8/15 gerçek eşzamanlı yükle kuyruk ve gecikmeyi ölç. Ağırlık + KV cache sığmadan maliyet karşılaştırması geçersizdir.

### Kaynaktaki break-even hesabının denetimi

D06, 100 token/sn kart için yaklaşık 259M token/ay ve “150M token/ay + %40 kullanımda self-host kazanır” eşiğini aktarır. **100 × 60 × 60 × 24 × 30 = 259,2M** yalnız yüzde 100 kesintisiz çıktıda geçerlidir; yüzde 40 kullanım **103,68M** eder. Bu bir hesap düzeltmesidir, gerçek GPU benchmark'ı değildir.

Kaynak ayrıca en ucuz açık model API'sini $0,14–0,28/M verir. **150M × $0,28/M = $42**; bu, €889 kirayı bile otomatik karşılamaz. $0,14/M'de $21 olur. İki rakamın aynı anda “self-host kesin daha ucuz” sonucu vermesi mümkün değildir; token türü, kalite eşdeğerliği, kur ve toplam iş yükü eksiktir. D06'nın 120–180M ucuz API eşiği ve 15–25M flagship eşiği bu nedenle **doğrulanmamış kaynak senaryosu** olarak tutulur. İkinci eşik ancak kullanılan gerçek input/output karışımıyla yeniden hesaplanabilir.

Saatlik €1,4247 × 720 saat = **€1.025,784/30 gün**. D06'nın yaklaşık €1.026 hesabı tutarlıdır; ayın gün sayısı, cap ve sözleşme şartı ayrı değişkendir.

## Karar: abonelik, API ve self-host üç ayrı ürün

**Claude Max $100 / $200** bireysel erişim planı kaynak iddiasıdır; sınırsız 15-ajan API bütçesi değildir. D06 ChatGPT Plus $20, Pro $100/$200 ve Business yaklaşık $25/kişi aktarır. UI aboneliğinin API kredisi, rate limit'i veya otomasyon hakkı ayrıca kontrol edilir. “Geliştirici başına $100–200” gözlemi çoklu ajanların sürekli tüketimini ölçmez.

OpenRouter tek key/bakiye ve provider failover kolaylığı sunan gateway olarak değerlendirilir. Kaynaktaki 500+ model, %5,5 kredi alım ücreti, BYOK için $25.000'e kadar ücretsiz / sonra %5 rakamları kaynak tarihlidir. Ucuz görevi uygun modele taşımak tasarruf sağlayabilir; gateway kullanmak tek başına indirim değildir. Hassas veri için yönlendirilen gerçek provider'ın retention ve training koşulları izlenir.

İsmail için karar sırası: mevcut API kullanımını ölç → M5 Max'te tek kullanıcılı local kalite testi → GEX131 sınıfında sınırlı serving deneyi → gerçek kabul edilen görev maliyetiyle karar. GLM-5.2 gibi çok büyük toplam ağırlığı 96 GB karta sığıyor varsayma. [D06](#/sources?doc=D06)
