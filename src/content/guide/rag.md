## Repo bağlamı ile kurumsal bilgi aynı retrieval problemi değildir

D02/D04; bütün repo'yu her isteğe koymak yerine görevle ilgili yapı ve kanıtı seçmeyi önerir. Aider repo map kod imzaları ve bağımlılıklarını; lexical search sembol ve hata metnini; RAG ise ürün belgeleri, ADR, ticket, wiki ve domain bilgisini getirebilir. Her projeye otomatik vektör veritabanı eklemek gereksiz işletim yükü yaratır.

## Uygulama: retrieval katmanını gereksinime göre büyüt

| İhtiyaç                     | İlk yöntem                                            | Bir sonraki adım için kanıt                        |
| --------------------------- | ----------------------------------------------------- | -------------------------------------------------- |
| Bilinen symbol / hata metni | rg, IDE symbol search, stack trace                    | Kaçan eşanlamlı/domain terimleri                   |
| Kod yapısı ve etki alanı    | AST/Tree-sitter, repo map, import ve call ilişkisi    | Birden çok repo ve domain bağımlılığı              |
| Ürün/ADR/ticket bilgisi     | İzinli doküman araması + metadata filtresi            | Lexical aramanın recall'ı yetersizse hybrid        |
| Büyük kurumsal bilgi        | Lexical + vector retrieval, reranker                  | Yanlış bağlam, gecikme ve erişim ihlali ölçümü     |
| Birkaç adımda keşif         | Agentic retrieval: soruyu böl, ara, kanıtı kontrol et | Ek tur maliyeti karşılığında görev başarısı artışı |

Dokümanları başlık ve anlamsal sınırlarda parçalara ayır; kaynak URI, sürüm/tarih, tenant ve erişim etiketi tut. Retrieval sırasında erişim filtresi uygulanır; yetkisiz veri getirildikten sonra LLM'nin sansürlemesine güvenilmez. Reranker en iyi kanıtı seçer fakat kaynağın doğru veya güncel olduğunu kendiliğinden doğrulamaz.

LlamaIndex, LangChain ve Haystack kaynaklarda bağlayıcı, retrieval ve pipeline çerçeveleri olarak geçer. D04, LlamaIndex/LangChain için MIT, Haystack için Apache-2.0 aktarır; kullanılan paket sürümünün lisansı ayrı kaydedilir. Framework seçimi kaynak bağlayıcıları, metadata filtreleri, test edilebilirlik ve gözlemlenebilirliğe göre yapılır.

### Domain sözlüğü ve güncelleme

MetaFramer/atonota için bounded context ve ubiquitous language, PIM için attribute inheritance / explicit override, Frappe için DocType ve servis sınırı retrieval etiketlerine yansıtılır. Eski ADR iptal edildiğinde yeni kararla ilişkilendirilir; tarih filtresi olmadan çelişkili iki belgeyi eşit gerçek olarak sunma. Videoda ürün metni de aynı doğrulanmış bilgi tabanından beslenebilir.

## Karar: retrieval kalitesini sonuçtan ayırarak ölç

Altın soru setinde doğru belgenin ilk k sonuçta bulunması, alıntı doğruluğu, eski belge kullanımı, erişim filtresi ve yanıtın kaynakla desteklenmesi ölçülür. Kod değişikliği ayrıca testlerden geçer. Cache için sabit system/policy öne, değişken görev sona konabilir; doğruluğu bozan eski bağlam sırf cache hit korumak için tutulmaz. [D02](#/sources?doc=D02) [D04](#/sources?doc=D04) [D06](#/sources?doc=D06)
