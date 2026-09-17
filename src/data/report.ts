import video from '../content/video.md?raw';
import software from '../content/software.md?raw';
import architecture from '../content/architecture.md?raw';
import risks from '../content/risks.md?raw';
import roadmap from '../content/roadmap.md?raw';
import methodology from '../content/methodology.md?raw';

export type ReportSection = {
  id: string;
  number: string;
  label: string;
  title: string;
  intro: string;
  eyebrow: string;
  minutes: number;
  takeaway: string;
  sources: string[];
  body: string;
};
export const sections: ReportSection[] = [
  {
    id: 'video',
    number: '01',
    label: 'Video üretimi',
    title: 'Fikirden yayına, tek bir üretim hattı.',
    intro: 'Yaratıcı modelleri, güvenilir kurgu ve kontrollü dağıtımla birleştiren video mimarisi.',
    eyebrow: 'İÇERİK & OTOMASYON',
    minutes: 8,
    takeaway: 'AI sahneyi üretir. Kod videoyu inşa eder. Editör son sözü söyler.',
    sources: ['D01', 'D03', 'D05'],
    body: video,
  },
  {
    id: 'software',
    number: '02',
    label: 'Yazılım geliştirme',
    title: 'Daha çok kod değil, daha iyi teslimat.',
    intro: 'Kodlama ajanlarından TDD’ye, bağlam yönetiminden ölçülebilir geliştirici deneyimine.',
    eyebrow: 'AJANLAR & GELİŞTİRME',
    minutes: 9,
    takeaway:
      'En değerli ajan, doğrulanabilir bir işi küçük ve test edilmiş bir değişikliğe dönüştürendir.',
    sources: ['D02', 'D04', 'D06'],
    body: software,
  },
  {
    id: 'architecture',
    number: '03',
    label: 'Referans mimari',
    title: 'Zekâyı esnek, sistemi güvenilir kur.',
    intro:
      'İki farklı üretim hattı. Ortak bir ilke: karar, yürütme ve doğrulama katmanlarını ayır.',
    eyebrow: 'SİSTEM TASARIMI',
    minutes: 6,
    takeaway:
      'Kalıcı durum, açık sözleşmeler ve değiştirilebilir adaptörler; tek bir modelden daha uzun ömürlüdür.',
    sources: ['D01', 'D02', 'D03', 'D04', 'D05', 'D06'],
    body: architecture,
  },
  {
    id: 'risks',
    number: '06',
    label: 'Riskler & boşluklar',
    title: 'Görünmeyen maliyeti görünür yap.',
    intro:
      'Kalite, haklar, ajan güvenliği ve kaynak çelişkileri için uygulanabilir bir risk kaydı.',
    eyebrow: 'KALİTE & GÜVEN',
    minutes: 6,
    takeaway:
      'Teknik olarak başarılı bir çıktı; doğru, lisanslı veya yayına uygun bir çıktı demek değildir.',
    sources: ['D01', 'D02', 'D03', 'D04', 'D05', 'D06'],
    body: risks,
  },
  {
    id: 'roadmap',
    number: '07',
    label: 'Yol haritası',
    title: 'Küçük başla. Kanıtla. Sonra büyüt.',
    intro: 'İki çalışma hattını ölçülebilir geçiş kriterleriyle ilerleten uygulama planı.',
    eyebrow: 'STRATEJİDEN UYGULAMAYA',
    minutes: 5,
    takeaway: 'İlk hedef: tek format, tek repo, ölçülmüş kalite ve görünür toplam maliyet.',
    sources: ['D03', 'D04', 'D05', 'D06'],
    body: roadmap,
  },
  {
    id: 'methodology',
    number: '09',
    label: 'Yöntem & kapsam',
    title: 'Her kararın arkasında bir iz olsun.',
    intro: 'Kaynaklar nasıl birleştirildi, neler doğrulandı ve hangi noktalar açık kaldı?',
    eyebrow: 'ARAŞTIRMA NOTLARI',
    minutes: 4,
    takeaway: 'Kaynakların tamamı korunur; doğrulama kapsamı açıkça sınırlandırılır.',
    sources: ['D01', 'D02', 'D03', 'D04', 'D05', 'D06'],
    body: methodology,
  },
];
export const navigation = [
  { id: 'overview', label: 'Genel bakış', icon: 'grid' },
  { id: 'guide', label: 'Ayrıntılı rehber', icon: 'book' },
  { id: 'claims', label: 'Sayılar & iddialar', icon: 'calculator' },
  { id: 'coverage', label: 'Kapsam haritası', icon: 'network' },
  { id: 'video', label: 'Video üretimi', icon: 'video', number: '01' },
  { id: 'software', label: 'Yazılım geliştirme', icon: 'code', number: '02' },
  { id: 'architecture', label: 'Referans mimari', icon: 'network', number: '03' },
  { id: 'tools', label: 'Araç radarı', icon: 'boxes', number: '04' },
  { id: 'cost', label: 'Maliyet laboratuvarı', icon: 'calculator', number: '05' },
  { id: 'risks', label: 'Riskler & boşluklar', icon: 'shield', number: '06' },
  { id: 'roadmap', label: 'Yol haritası', icon: 'route', number: '07' },
  { id: 'sources', label: 'Kaynak kütüphanesi', icon: 'library', number: '08' },
  { id: 'methodology', label: 'Yöntem & kapsam', icon: 'info', number: '09' },
];
export const milestones = [
  {
    id: 'scope',
    phase: '01',
    title: 'Pilot kapsamını yaz',
    description: 'Format, hedef platform, kullanıcı ve maliyet tavanı.',
  },
  {
    id: 'baseline',
    phase: '01',
    title: 'Baz ölçümü başlat',
    description: 'Video kalite rubriği ve repo teslimat metrikleri.',
  },
  {
    id: 'contracts',
    phase: '02',
    title: 'İlk üretim hattını tamamla',
    description: 'Brief → script → medya → onay → yayın.',
  },
  {
    id: 'tdd',
    phase: '02',
    title: 'Ajan için TDD kapısı kur',
    description: 'Failing test → küçük değişiklik → doğrulama.',
  },
  {
    id: 'failure',
    phase: '03',
    title: 'Hata senaryolarını sına',
    description: 'Timeout, 429, tekrar callback ve token expiry.',
  },
  {
    id: 'approval',
    phase: '03',
    title: 'Sürüm ve onayı ilişkilendir',
    description: 'Onaylı artifact değişirse yeniden inceleme.',
  },
  {
    id: 'measure',
    phase: '04',
    title: 'Toplam maliyet ve kaliteyi karşılaştır',
    description: 'Kabul edilen çıktı başına insan ve altyapı maliyeti.',
  },
  {
    id: 'scale',
    phase: '04',
    title: 'Tek bir yeni yetenek ekle',
    description: 'İkinci platform, format veya ölçülmüş GPU pilotu.',
  },
];
