## KVKK, RTÜK ve ses/yüz hakkı üretim akışının parçasıdır

D04'ün HRMS/İBYS kişisel veri bölümü ile D05'in Türkiye yayıncılık bölümü önceki sentezde kaybolmuştu. Bunlar ayrı bir yerel karar katmanıdır. **KVKK** açısından kod, log, ses kaydı, çalışan fixture'ı ve müşteri görüntüsü sadece teknik girdi sayılmaz. **RTÜK**'ün izleme kapasitesine ilişkin bir açıklama da tek başına her sosyal medya hesabına yeni bir lisans yükümlülüğü doğduğunu kanıtlamaz.

17 Eylül 2026 kontrolünde KVKK'nın [üretken AI rehberi](https://www.kvkk.gov.tr/Icerik/8547/uretken-yapay-zeka-ve-kisisel-verilerin-korunmasi-rehberi-15-soruda), AI yaşam döngüsündeki kişisel veri işlemesini 6698 sayılı Kanun çerçevesinde ele alıyor. Kurumun [iş yeri kullanımı](https://www.kvkk.gov.tr/Icerik/8674/is-yerlerinde-uretken-yapay-zeka-araclarinin-kullanimi) ve [Agentic AI](https://www.kvkk.gov.tr/Icerik/8683/etken-yapay-zeka-agentic-ai) belgeleri de kurumsal kullanım ve otonom eylemlerin veri boyutuna odaklanıyor. Bunlar uygulamaya özel hukuki değerlendirmenin yerine geçen otomatik izinler değildir.

## Uygulama: veri ve hak kaydını iş kimliğine bağla

| Kontrol noktası      | Video hattında                                     | Yazılım hattında                                        | Saklanacak kanıt                                              |
| -------------------- | -------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------- |
| Veri envanteri       | Yüz, ses, müşteri görseli, yayın kimliği           | Personel kaydı, sağlık/İSG verisi, log, kod, secret     | Veri kategorisi, işleme amacı ve sorumlu                      |
| Hukuki değerlendirme | Ses klonlama, avatar, telif, reklam claim'i        | Test fixture'ları, telemetry, HRMS/İBYS bağlamı         | Uygun hukuki dayanak ve gerektiğinde rıza/izin kaydı          |
| Minimizasyon         | Sahne için gerekmeyen kişisel ayrıntıyı çıkar      | Sentetik fixture, maskelenmiş trace, secret redaksiyonu | Gönderilen veri sınıfı ve redaksiyon sonucu                   |
| Yurt dışı aktarım    | TTS/video/avatar sağlayıcısı ve alt işleyenleri    | Bulut LLM, gateway, MCP, hata izleme servisi            | Ülke, sözleşme, retention/training ve aktarım değerlendirmesi |
| Saklama/silme        | Ham ses, ara video, master ve onay kaydı ayrı süre | Prompt log'u, agent trace'i, dump ve test çıktısı       | Lifecycle ve erişim/silme kaydı                               |
| Yayın onayı          | Onaylı sürüm hash'i ve AI açıklaması               | PR/merge ve deploy yetkisi                              | Kim, hangi sürümü, ne zaman onayladı?                         |

Rıza gereken işlemde kayıt kapsamı açık olmalı: hangi ses/yüz, hangi amaç ve platformlar, hangi kullanım süresi. “Sağlayıcı ses klonlayabiliyor” ile “bu sesi kullanmaya yetkim var” ayrı sorulardır. Rızanın her işlem için tek mümkün hukuki dayanak olduğunu varsayma; HRMS ve özel nitelikli verilerde değerlendirmeyi uzmanlaştır.

### RTÜK iddiasının sınırı

D05, 2026'da yapay zekâ ile dijital yayın izleme, anahtar kelime/nefret söylemi/telif taraması ve uzman değerlendirmesi planını; ayrıca sosyal medya lisans/denetim sinyalini aktarıyor. Bu birleşik iddianın bütçe sunumundaki tam kapsamı bu revizyonda bağımsız doğrulanmadı. Bulunan [27 Ocak 2026 RTÜK açıklaması](https://www.rtuk.gov.tr/rtuk-radyo-dinleyici-olcumlerini-elektronik-sisteme-tasiyor/5137), radyo dinleyici ölçümünün elektronik sisteme taşınması ve AI analizini anlatıyor. **Radyo ölçüm duyurusu, bütün YouTube/Instagram hesapları için genel lisans zorunluluğu kanıtı değildir.** Kaynaktaki iddia görünür tutulur; olası yaptırım listesi her içeriğe otomatik uygulanmaz.

## Karar: ülke, aktör ve yayın türüne göre kontrol

Türkiye'deki veri koruma ve yayıncılık değerlendirmesi, AB AI Act şeffaflığı ve platform disclosure alanlarından ayrı izlenir. Hedef pazar AB ise sağlayıcı/deployer rolü ve Article 50 kapsamı ayrıca incelenir. Tek bir “uyumludur” kutusu yerine veri/hak/sözleşme/yayın onayı kapıları kullan. Ticari kullanımda belirsiz kalan dayanak, ses izni veya yayın kapsamı final onaydan önce çözülür. [D04](#/sources?doc=D04) [D05](#/sources?doc=D05)
