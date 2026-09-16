from pathlib import Path
import json
# name | category | role | fit | limitation | hosting | URL | docs
rows='''Veo|Video|Görsel ve metinden sahne üretimi|Ürün atmosferi ve kontrollü kısa planlar|Sürüm, bölge, süre ve tekrar üretim maliyeti|Bulut|https://cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate|D01,D03,D05
Runway|Video|Jeneratif video ve dönüşüm|API ile sahne üretimi|Model ve endpoint özellikleri ayrı doğrulanmalı|Bulut|https://docs.dev.runwayml.com/|D01,D03,D05
Luma|Video|Sahne üretimi ve video dönüşümü|Görselden video pilotu|Asenkron job ve kalite değişkenliği|Bulut|https://docs.lumalabs.ai/|D03,D05
Kling|Video|Jeneratif sahne ve hareket kontrolü|Ürün referansı ile sahne karşılaştırması|API erişimi, lisans ve model sürümü|Bulut|https://kling.ai/|D01,D03,D05
MiniMax / Hailuo|Video|Video ve ses ailesi|Tek sağlayıcıyla video/ses pilotu|Model ve ücretleri ayrı değerlendirmek gerekir|Bulut|https://platform.minimax.io/|D03,D05
Adobe Firefly|Video|Görsel, video ve yaratıcı servisler|Adobe üretim ekosistemi|UI özellikleri API kapsamını garanti etmez|Bulut|https://developer.adobe.com/firefly-services/docs/firefly-api/|D03
HeyGen|Avatar|Sunucu, çeviri ve avatar|B2B anlatım ve lokalizasyon|API ve UI aboneliği farklı; rıza ve Türkçe test|Bulut|https://docs.heygen.com/|D03,D05
Synthesia|Avatar|Metinden sunuculu video|Eğitim ve onboarding|Yaratıcı kontrol ve sözleşme kapsamı|Bulut|https://docs.synthesia.io/|D03,D05
Tavus|Avatar|Etkileşimli video persona|Canlı konuşan avatar|Offline video render ile aynı kullanım değil|Bulut|https://docs.tavus.io/|D03,D05
ElevenLabs|Ses|TTS, dublaj ve transkripsiyon|Türkçe ses karşılaştırması|Telaffuz ve ses hakkı ayrıca değerlendirilir|Bulut|https://elevenlabs.io/docs|D01,D03,D05
Google Cloud TTS|Ses|Metinden konuşma|Türkçe ses ve SSML tabanlı akış|Seçilen ses/model bazında ölçüm|Bulut|https://cloud.google.com/text-to-speech/docs|D03,D05
OpenAI TTS|Ses|Metinden konuşma|LLM ile ortak sağlayıcı akışı|Ses seçenekleri ve fiyatı model bazında teyit|Bulut|https://platform.openai.com/docs/guides/text-to-speech|D03,D05
Whisper|Ses|Sesin metne dökülmesi|Altyazı üretimi ve kontrol|Hizalama, özel terim ve konuşma kalitesi|Yerel|https://github.com/openai/whisper|D05
Remotion|Kurgu|React ile programatik video|Marka motion sistemi ve veri grafikleri|Şirket lisansı ve render operasyonu|Yerel|https://github.com/remotion-dev/remotion|D01,D03,D05
FFmpeg|Kurgu|Encode, filtre, ses ve mux|Deterministik medya işlemleri|Yaratıcı sahne üretmez; build lisansı incelenir|Yerel|https://ffmpeg.org/|D01,D03,D05
Shotstack|Kurgu|JSON timeline ve cloud render|API ile hızlı üretim hattı|Kullanım maliyeti ve sağlayıcı bağımlılığı|Bulut|https://shotstack.io/docs/|D03,D05
Creatomate|Kurgu|Şablon ve JSON ile render|Sosyal video varyantları|Kredi modeli ve template sınırları|Bulut|https://creatomate.com/docs/api/introduction|D03,D05
JSON2Video|Kurgu|JSON ile sahne birleştirme|Basit otomatik video şablonları|Render ve çözünürlük maliyeti|Bulut|https://json2video.com/docs/|D03,D05
auto-editor|Kurgu|Sessizlik tabanlı otomatik kesim|Konuşma içeriklerini temizleme|Anlatı/viral an seçiminin yerine geçmez|Yerel|https://github.com/WyattBlue/auto-editor|D03
OpusClip|Kurgu|Uzun videodan kısa kesitler|Podcast ve webinar yeniden kullanımı|Kaynaklardaki API planları çelişkili; teyit gerekli|Bulut|https://www.opus.pro/|D03,D05
MoneyPrinterTurbo|Kurgu|Stok, ses ve altyazı otomasyonu|Hızlı faceless pilot|Auth, lisans, secret ve editoryal katman gerekir|Yerel|https://github.com/harry0703/MoneyPrinterTurbo|D01,D05
ShortGPT|Kurgu|Programlanabilir kısa video üretimi|Stok ve dublaj deneyleri|Bağımlılık ve bakım durumunu incele|Yerel|https://github.com/RayVentura/ShortGPT|D01,D05
ComfyUI|Model|Düğüm tabanlı inference workflow|Yerel video/görsel GPU üretimi|VRAM, node tedarik zinciri ve model lisansı|Yerel|https://github.com/Comfy-Org/ComfyUI|D03,D05
LTX-2|Model|Video ve ses üretim modeli|Hibrit GPU pilotu|Ağırlık lisansı ve donanım benchmark’ı|Yerel|https://github.com/Lightricks/LTX-2|D03,D05
Wan 2.2|Model|Açık video model ailesi|Yerel sahne üretimi|Daha yeni Wan sürümlerine lisansı genelleme|Yerel|https://github.com/Wan-Video/Wan2.2|D03,D05
HunyuanVideo|Model|Video üretim modeli|GPU tabanlı araştırma/pilot|Donanım ve ticari kullanım koşulları|Yerel|https://github.com/Tencent-Hunyuan/HunyuanVideo|D03,D05
CogVideo|Model|Video üretim ve ince ayar|Kontrollü açık model deneyi|Model/weight lisansı ve kaynak ihtiyacı|Yerel|https://github.com/zai-org/CogVideo|D03,D05
Postiz|Yayın|Sosyal içerik planlama|Kontrollü self-host yayın katmanı|Platform uygulama ve OAuth gereksinimleri|Hibrit|https://github.com/gitroomhq/postiz-app|D05
Blotato|Yayın|Çoklu sosyal yayın katmanı|Entegrasyon pilotunu hızlandırma|Hesap izinlerini ve plan kapsamını teyit et|Bulut|https://blotato.com/|D05
Upload-Post|Yayın|Sosyal yayın API katmanı|Dar kapsamlı yayın pilotu|Kota, desteklenen platform ve plan|Bulut|https://upload-post.com/|D01,D05
Ayrshare|Yayın|Birleşik sosyal API|Çoklu müşteri/hesap entegrasyonu|Profil bazlı maliyet ve sözleşme|Bulut|https://www.ayrshare.com/|D05
n8n|Orkestrasyon|Webhook ve deterministik iş akışı|Video hattı, CI bildirimleri ve onay|Fair-code lisans; queue ve secrets yönetimi|Hibrit|https://docs.n8n.io/|D01,D03,D05,D06
Temporal|Orkestrasyon|Kalıcı ve uzun süreli workflow|Kritik asenkron üretim işleri|Yeni altyapı ve deterministik workflow disiplini|Hibrit|https://docs.temporal.io/workflows|D03,D05
Make / Zapier|Orkestrasyon|Görsel SaaS otomasyonu|Düşük hacimli iş sistemi bağlantıları|İşlem maliyeti ve taşınabilirlik|Bulut|https://www.make.com/|D03,D05
OpenClaw|Orkestrasyon|Araç kullanan otonom ajan|Triage, öneri ve mesajlaşma|Güçlü araç erişimi; izolasyon ve izin denetimi|Yerel|https://github.com/openclaw/openclaw|D05,D06
LangGraph|Orkestrasyon|Durumlu ajan grafı|Gerçek dallanan ajan iş akışları|Küçük ihtiyaçta ek karmaşıklık|Yerel|https://github.com/langchain-ai/langgraph|D04,D05,D06
Codex|Kodlama|Repo, terminal ve test ajanı|Tanımlı bug, refactor ve test görevleri|İzin, ortam ve model kapasitesi ayrı konular|Hibrit|https://github.com/openai/codex|D04,D06
Claude Code|Kodlama|Terminal ve araç kullanan ajan|Bağlamlı repo geliştirme|Hooks ve alt ajan izinleri gözden geçirilmeli|Hibrit|https://code.claude.com/docs/|D02,D06
Cursor|Kodlama|Ajan odaklı IDE|Etkileşimli geliştirme ve repo keşfi|Kota, ortam erişimi ve review yükü|Bulut|https://cursor.com/|D02,D04,D06
GitHub Copilot|Kodlama|IDE, review ve repo ajanı|GitHub merkezli geliştirme|Review tam hata kapsamı sağlamaz|Bulut|https://docs.github.com/en/copilot|D04,D06
Aider|Kodlama|Git ile çalışan terminal ajanı|Model bağımsız küçük değişiklikler|Doğru context ve test altyapısı gerekir|Yerel|https://github.com/Aider-AI/aider|D02,D04,D06
OpenHands|Kodlama|Yazılım ajan platformu|İzole görev ve özelleştirme|Sandbox kurulumu ve operasyon|Yerel|https://github.com/OpenHands/openhands|D02,D04,D06
Qwen Code / Coder|Kodlama|Ajan runtime’ı ve ayrı model ailesi|Açık ekosistem coding pilotu|Runtime ile model ağırlığı lisansı farklı|Yerel|https://github.com/QwenLM/qwen-code|D04,D06
Spec Kit|Kodlama|Spec, plan ve task iş akışı|Uzun ömürlü ve çok modüllü geliştirme|Küçük görevlerde ek süreç yükü|Yerel|https://github.com/github/spec-kit|D06
Playwright|Kalite|Tarayıcı akışı ve E2E testi|Mobil/masaüstü davranış doğrulama|Test senaryosu ve assertion kalitesi önemli|Yerel|https://playwright.dev/|D04,D06
CodeRabbit|Kalite|PR bağlamında AI inceleme|Review kuyruğuna yardımcı ilk katman|Yanlış pozitifler ve plan özellikleri|Bulut|https://coderabbit.ai/|D02,D04,D06
Qodo|Kalite|Kod kalitesi, test ve review|Kurala dayalı doğrulama pilotu|Vendor metrikleri bağımsız ölçüm değil|Bulut|https://www.qodo.ai/|D02,D04,D06
Semgrep|Kalite|Statik güvenlik ve triage|CI ve agent değişikliklerini tarama|Kural kapsamı ve veri akışı sınırları|Hibrit|https://semgrep.dev/|D02,D04,D06
SonarQube|Kalite|Kalite kapısı ve teknik borç|Kurumsal kod kalite görünürlüğü|AI doğruluğu veya güvenlik garantisi değil|Hibrit|https://www.sonarsource.com/products/sonarqube/|D02
Sentry Seer|Kalite|Telemetry bağlamında hata araştırması|Production hata → kanıt → fix adayı|Kaliteli log/trace ve veri maskeleme gerekir|Bulut|https://docs.sentry.io/product/ai-in-sentry/|D04,D06
Context7|Kodlama|Kütüphane dokümantasyonunu getirme|Sürüm bağlamı ve API araştırması|Dönen veri doğrulanmalı; halüsinasyonu sıfırlamaz|Bulut|https://github.com/upstash/context7|D06
vLLM / SGLang|Model|Yüksek verimli model serving|Eşzamanlı self-host ajan pilotu|KV cache, batching, GPU ve bakım maliyeti|Yerel|https://github.com/vllm-project/vllm|D02,D06
MLX / Ollama|Model|Yerel model çalıştırma|Mac/kişisel ortamda gizli veri pilotu|Belleğe sığmak hedef gecikmeyi garanti etmez|Yerel|https://github.com/ml-explore/mlx|D02,D06
LlamaIndex / Haystack|Orkestrasyon|Bilgi getirme ve veri pipeline’ı|Repo dışı kurumsal bilgi|Gereksiz RAG eklemek context ve bakım yükü yaratır|Yerel|https://github.com/run-llama/llama_index|D04
SWE-agent|Kodlama|Araştırma amaçlı repo ajanı|Harness ve agent deneyleri|Benchmark başarısı ürün ROI’si değildir|Yerel|https://github.com/swe-agent/swe-agent|D04'''
tools=[]
for i,line in enumerate(rows.splitlines(),1):
 name,category,role,fit,limitation,hosting,url,docs=line.split('|')
 tools.append(dict(id=f'T{i:02}',name=name,category=category,role=role,fit=fit,limitation=limitation,hosting=hosting,url=url,documents=docs.split(',')))
(Path(__file__).resolve().parents[1]/'src/data/tools.json').write_text(json.dumps(tools,ensure_ascii=False,indent=2)+'\n')
print(len(tools),'araç kartı')
