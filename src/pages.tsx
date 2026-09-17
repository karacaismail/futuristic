import { lazy, Suspense, useState } from 'react';
const Markdown = lazy(() => import('./Markdown'));
import { Icon, Pill, PageTitle, SourceChips, HeroDiagram } from './components';
import { navigation, sections, milestones, type ReportSection } from './data/report';
import corpus from './data/corpus.json';
import counts from './data/counts.json';
import verification from './data/verification.json';
import { estimateCost, type CostInput } from './lib/research';
import { useStoredIds } from './lib/storage';

export function Overview({ read }: { read: string[] }) {
  return (
    <>
      <div className="intro-line">
        <span className="eyebrow">BAĞLANTILI BİR GELECEK İÇİN</span>
        <span className="edition">ARAŞTIRMA SERİSİ / 001</span>
      </div>
      <section className="overview-hero">
        <div className="hero-copy">
          <Pill tone="green">
            <span className="status-dot" /> Eylül 2026 araştırması
          </Pill>
          <h1 tabIndex={-1}>
            Yapay zekâdan
            <br />
            <span>üretim sistemine.</span>
          </h1>
          <p>
            Fikirleri videoya, gereksinimleri yazılıma dönüştür.
            <br className="desktop-only" /> Altı araştırma. İki üretim hattı. Tek bir açık yol
            haritası.
          </p>
          <a className="btn btn-primary" href="#/guide">
            Araştırmayı keşfet <Icon name="arrow" size={18} />
          </a>
          <a className="hero-text-link" href="#/methodology">
            Rapor hakkında <Icon name="chevron" size={16} />
          </a>
        </div>
        <HeroDiagram />
      </section>
      <div className="stats-strip">
        <div>
          <strong>06</strong>
          <span>Kaynak belge</span>
        </div>
        <div>
          <strong>{corpus.references.length}</strong>
          <span>İzlenebilir referans</span>
        </div>
        <div>
          <strong>{counts.tools}</strong>
          <span>Araç & teknoloji</span>
        </div>
        <div>
          <strong>02</strong>
          <span>Birbirini besleyen hat</span>
        </div>
      </div>
      <section className="revision-entry card bg-base-100">
        <div>
          <span className="eyebrow">AYRINTILI ARAŞTIRMA / v2</span>
          <h2>Bilgiyi kararın içine taşı.</h2>
          <p>29 uygulama rehberi · 70 sayısal kayıt · Kaynaktan konuya kapsam haritası</p>
        </div>
        <div className="topic-links">
          <a className="btn btn-primary" href="#/guide?topic=personal-stack">
            İsmail için karar haritası →
          </a>
          <a className="btn btn-outline" href="#/guide">
            Bütün rehberler
          </a>
          <a className="btn btn-outline" href="#/claims">
            Sayılar ve iddialar
          </a>
          <a className="btn btn-ghost" href="#/coverage">
            Kapsam haritası
          </a>
        </div>
      </section>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">İKİ ODAK, ORTAK YAKLAŞIM</span>
            <h2>Hangi geleceği inşa ediyorsun?</h2>
          </div>
          <span className="muted small">
            Araştırmadan uygulamaya <Icon name="arrow" size={16} />
          </span>
        </div>
        <div className="track-grid">
          <article className="track-card video-track card">
            <div className="track-top">
              <span className="track-icon">
                <Icon name="video" size={24} />
              </span>
              <span className="mono">01 / İÇERİK</span>
            </div>
            <h3>
              Fikirden yayına.
              <br />
              Uçtan uca video üretimi.
            </h3>
            <p>
              Senaryo, görsel, ses, kurgu ve yayın. Yaratıcılığı otomasyonla buluşturan, insan
              onaylı bir üretim hattı.
            </p>
            <div className="tag-row">
              <Pill>Generative video</Pill>
              <Pill>Orkestrasyon</Pill>
              <Pill>Yayınlama</Pill>
            </div>
            <a href="#/video" aria-label="Video raporunu oku" className="track-link">
              Video raporunu oku{' '}
              <span className="round-arrow">
                <Icon name="arrow" />
              </span>
            </a>
            <svg className="track-watermark" viewBox="0 0 170 140" aria-hidden="true">
              <ellipse cx="52" cy="73" rx="34" ry="54" />
              <path d="M101 44L134 20V128M106 128H158" />
            </svg>
          </article>
          <article className="track-card code-track card">
            <div className="track-top">
              <span className="track-icon">
                <Icon name="code" size={24} />
              </span>
              <span className="mono">02 / YAZILIM</span>
            </div>
            <h3>
              Gereksinimden ürüne.
              <br />
              AI ile yazılım geliştirme.
            </h3>
            <p>
              Ajanlar, bağlam, test ve kod inceleme. Daha hızlı üretimi, ölçülebilir kaliteye
              dönüştüren mühendislik.
            </p>
            <div className="tag-row">
              <Pill>Kodlama ajanları</Pill>
              <Pill>TDD</Pill>
              <Pill>Developer experience</Pill>
            </div>
            <a href="#/software" className="track-link">
              Yazılım raporunu oku{' '}
              <span className="round-arrow">
                <Icon name="arrow" />
              </span>
            </a>
            <svg className="track-watermark" viewBox="0 0 190 140" aria-hidden="true">
              <ellipse cx="48" cy="73" rx="34" ry="54" />
              <path d="M108 44C108 8 172 8 172 44C172 65 123 104 110 127H179" />
            </svg>
          </article>
        </div>
      </section>
      <section className="insight-banner">
        <div className="insight-mark">
          <Icon name="sparkles" size={26} />
        </div>
        <div>
          <p className="eyebrow">ARAŞTIRMANIN ORTAK SONUCU</p>
          <h3>Modeli değil, üretim döngüsünü tasarla.</h3>
          <p>
            Değiştirilebilir araçlar, açık sözleşmeler, doğrulama ve insan kararı. İki hattın da
            sağlam temeli aynı.
          </p>
        </div>
        <a href="#/architecture" className="btn btn-outline">
          Mimariyi incele <Icon name="arrow" size={17} />
        </a>
      </section>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">BİLGİYİ KARARA DÖNÜŞTÜR</span>
            <h2>Araştırma masan</h2>
          </div>
          <a href="#/roadmap" className="text-link">
            Yol haritası <Icon name="arrow" size={15} />
          </a>
        </div>
        <div className="desk-grid">
          {[
            {
              id: 'tools',
              icon: 'boxes',
              label: 'Araç radarı',
              text: `${counts.tools} aracı incele. Fiyat, lisans, sınır ve iş akışını karşılaştır.`,
              hint: 'KEŞFET & KARŞILAŞTIR',
            },
            {
              id: 'cost',
              icon: 'calculator',
              label: 'Maliyet laboratuvarı',
              text: 'Tekrar üretim ve insan emeği dahil, kendi senaryonu hesapla.',
              hint: 'VARSAY & HESAPLA',
            },
            {
              id: 'sources',
              icon: 'library',
              label: 'Kaynak kütüphanesi',
              text: 'Özgün metinler, referanslar ve tarihli doğrulama kayıtları.',
              hint: 'OKU & DOĞRULA',
            },
          ].map((item) => (
            <a href={`#/${item.id}`} className="desk-card card" key={item.id}>
              <div className="desk-card-top">
                <Icon name={item.icon} size={23} />
                <Icon name="arrow" size={19} />
              </div>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
              <span className="mono">{item.hint}</span>
            </a>
          ))}
        </div>
      </section>
      <div className="overview-bottom">
        <div>
          <Icon name="shield" />
          <p>
            <strong>İddialar aynı ağırlıkta değil.</strong>
            <span>
              {verification.length} kritik iddia kontrol edildi. Fiyat ve benchmark iddialarının
              kapsamı açıkça belirtiliyor.
            </span>
          </p>
          <a className="text-link" href="#/sources?tab=verified">
            Doğrulama kaydı <Icon name="arrow" size={15} />
          </a>
        </div>
        <div className="reading-mini">
          <Icon name="book" />
          <span>
            <strong>
              {read.length} / {sections.length}
            </strong>{' '}
            bölüm okundu
          </span>
          <progress
            className="progress progress-primary"
            max={sections.length}
            value={read.length}
          />
        </div>
      </div>
    </>
  );
}

export function Article({
  section,
  read,
  onRead,
  persisted,
}: {
  section: ReportSection;
  read: boolean;
  onRead: () => void;
  persisted: boolean;
}) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const parts = section.body
    .split(/^## /m)
    .filter(Boolean)
    .map((part, index) => ({
      id: `${section.id}-${index}`,
      title: part.split('\n')[0],
      body: part.slice(part.indexOf('\n') + 1),
    }));
  const navIndex = navigation.findIndex((item) => item.id === section.id);
  const next = navIndex >= 0 ? navigation[navIndex + 1] : undefined;
  return (
    <>
      <PageTitle
        eyebrow={`${section.number} / ${section.eyebrow}`}
        title={section.title}
        description={section.intro}
      >
        <div className="article-meta">
          <span>
            <Icon name="book" size={15} />
            {section.minutes} dk okuma
          </span>
          <span>17 Eylül 2026</span>
          <SourceChips ids={section.sources} />
        </div>
      </PageTitle>
      <div className="takeaway">
        <span className="eyebrow">BİR CÜMLEDE</span>
        <p>{section.takeaway}</p>
      </div>
      {section.id === 'architecture' && <Pipeline />}
      {section.id === 'roadmap' && <RoadmapChecklist />}
      <div className="article-layout">
        <article className="article-body">
          {parts.map((part, index) => (
            <section
              className={`article-part ${index === 0 || expanded.includes(part.id) ? 'expanded' : ''}`}
              key={part.id}
              id={part.id}
            >
              <h2 className="desktop-section-title">{part.title}</h2>
              <button
                className="mobile-section-toggle"
                aria-expanded={index === 0 || expanded.includes(part.id)}
                aria-controls={`${part.id}-body`}
                onClick={() =>
                  setExpanded((current) =>
                    current.includes(part.id)
                      ? current.filter((id) => id !== part.id)
                      : [...current, part.id],
                  )
                }
                disabled={index === 0}
              >
                <span>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  {part.title}
                </span>
                {index > 0 && <Icon name="chevron" size={18} />}
              </button>
              <div id={`${part.id}-body`} className="article-part-body">
                <Suspense fallback={<p role="status">Bölüm yükleniyor…</p>}>
                  <Markdown body={part.body} />
                </Suspense>
              </div>
            </section>
          ))}
        </article>
        <aside className="on-this-page">
          <span className="eyebrow">BU BÖLÜMDE</span>
          {parts.map((part, i) => (
            <button
              key={part.id}
              onClick={() =>
                document
                  .getElementById(part.id)
                  ?.scrollIntoView({ behavior: 'instant', block: 'start' })
              }
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              {part.title}
            </button>
          ))}
          <div className="sidebar-note">
            <Icon name="file" />
            <p>Detayın kaynağına git.</p>
            <SourceChips ids={section.sources} />
          </div>
        </aside>
      </div>
      <div className="article-end">
        <button className={`btn ${read ? 'btn-soft' : 'btn-primary'}`} onClick={onRead}>
          <Icon name={read ? 'check' : 'book'} size={18} />
          {read ? 'Okundu işaretini kaldır' : 'Okundu olarak işaretle'}
        </button>
        <p>
          {persisted
            ? 'Okuma durumun bu tarayıcıda saklanır.'
            : 'Tarayıcı kaydetmeye izin vermiyor; durum bu oturumda korunuyor.'}
        </p>
        {next && (
          <a className="next-article" href={`#/${next.id}`}>
            <span>
              <small>SONRAKİ BÖLÜM</small>
              <strong>{next.label}</strong>
            </span>
            <Icon name="arrow" size={24} />
          </a>
        )}
      </div>
    </>
  );
}
export function Pipeline() {
  const [track, setTrack] = useState<'video' | 'code'>('video');
  const steps =
    track === 'video'
      ? [
          ['Brief & kaynak', 'insan'],
          ['Senaryo & sahneler', 'ajan'],
          ['Ses & kurgu', 'sistem'],
          ['QC & onay', 'insan'],
          ['Yayın & ölçüm', 'sistem'],
        ]
      : [
          ['Spec & kabul', 'insan'],
          ['Başarısız test', 'ajan'],
          ['Küçük değişiklik', 'ajan'],
          ['CI & inceleme', 'sistem'],
          ['Merge & ölçüm', 'insan'],
        ];
  return (
    <section className="pipeline-card card">
      <div className="section-heading">
        <div>
          <span className="eyebrow">ETKİLEŞİMLİ MİMARİ</span>
          <h2>Kim, neyi yapıyor?</h2>
        </div>
        <div className="tabs tabs-box" role="tablist" aria-label="Üretim hattı">
          {(['video', 'code'] as const).map((id) => (
            <button
              className={`tab ${track === id ? 'tab-active' : ''}`}
              role="tab"
              aria-selected={track === id}
              key={id}
              onClick={() => setTrack(id)}
            >
              {id === 'video' ? 'Video hattı' : 'Kod hattı'}
            </button>
          ))}
        </div>
      </div>
      <ol className="pipeline-steps">
        {steps.map(([label, actor], i) => (
          <li key={label}>
            <span className="pipeline-number">0{i + 1}</span>
            <strong>{label}</strong>
            <Pill tone={actor === 'insan' ? 'green' : actor === 'ajan' ? 'purple' : 'neutral'}>
              {actor === 'insan' ? 'İnsan' : actor === 'ajan' ? 'AI ajanı' : 'Sistem'}
            </Pill>
          </li>
        ))}
      </ol>
      <p className="pipeline-note">
        <Icon name="route" size={17} />
        Hata veya ret, ilgili aşamaya geri döner. Aynı iş yeniden başlatıldığında durum korunur.
      </p>
    </section>
  );
}
const defaults: CostInput = {
  videos: 100,
  seconds: 30,
  rate: 0.12,
  attempts: 2,
  fixed: 50,
  reviewMinutes: 5,
  hourlyRate: 12,
  otherPerVideo: 0.5,
};
export function CostPage() {
  const [values, setValues] = useState(
    Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, String(value)])),
  );
  let result: ReturnType<typeof estimateCost> | undefined;
  let error = '';
  try {
    if (Object.values(values).some((value) => value.trim() === ''))
      throw new Error('Geçerli bir hesap için bütün alanları doldur.');
    result = estimateCost(
      Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, Number(value)]),
      ) as CostInput,
    );
  } catch (e) {
    error = (e as Error).message;
  }
  const money = (n: number) =>
    new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(n);
  const fields: [keyof CostInput, string, string, string][] = [
    ['videos', 'Aylık video sayısı', 'adet', '1'],
    ['seconds', 'Video başına üretilen saniye', 'saniye', '1'],
    ['rate', 'Üretim birim fiyatı', 'USD / sn', '0.01'],
    ['attempts', 'Kabul başına ortalama deneme', 'deneme', '0.1'],
    ['fixed', 'Aylık sabit gider', 'USD', '1'],
    ['otherPerVideo', 'Diğer gider / video', 'USD', '0.1'],
    ['reviewMinutes', 'İnsan incelemesi / video', 'dakika', '1'],
    ['hourlyRate', 'İnsan emeğinin saatlik maliyeti', 'USD / saat', '1'],
  ];
  return (
    <>
      <PageTitle
        eyebrow="05 / MALİYET LABORATUVARI"
        title="Üretimin gerçek bedelini hesapla."
        description="Yalnızca son çıktıyı değil, reddedilen denemeleri ve insan emeğini de hesaba kat."
      />
      <div className="scenario-note">
        <Icon name="info" />
        <p>
          <strong>Bir senaryo, canlı fiyat değil.</strong> Başlangıç değerleri değiştirilebilir
          örnek varsayımlardır. Aynı para birimindeki kendi tekliflerini gir.
        </p>
      </div>
      <div className="cost-layout">
        <section className="cost-inputs card">
          <div className="section-heading">
            <h2>Senaryonun girdileri</h2>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() =>
                setValues(
                  Object.fromEntries(Object.entries(defaults).map(([k, v]) => [k, String(v)])),
                )
              }
            >
              Sıfırla
            </button>
          </div>
          <div className="cost-fields">
            {fields.map(([key, label, unit, step]) => (
              <label className="form-field" key={key}>
                <span>{label}</span>
                <div className="unit-input">
                  <input
                    className="input"
                    type="number"
                    min={key === 'attempts' ? 1 : 0}
                    step={step}
                    inputMode="decimal"
                    value={values[key]}
                    onChange={(e) =>
                      setValues((current) => ({ ...current, [key]: e.target.value }))
                    }
                  />
                  <small>{unit}</small>
                </div>
              </label>
            ))}
          </div>
          <p className="fine-print">
            “Diğer gider” alanına LLM, ses, render, yayın, depolama ve egress payını ekle. Vergi ve
            kur etkisi ayrıca bütçelenmelidir.
          </p>
        </section>
        <section className="cost-result card" aria-live="polite">
          <span className="eyebrow">TAHMİNİ AYLIK TOPLAM</span>
          {error ? (
            <div role="alert" className="alert alert-error">
              {error}
            </div>
          ) : (
            result && (
              <>
                <strong className="cost-total" data-testid="monthly-cost">
                  {money(result.total)}
                </strong>
                <span className="cost-per">Video başına {money(result.perVideo)}</span>
                <div className="cost-chart" aria-hidden="true">
                  {[result.generation, result.review, result.other, Number(values.fixed)].map(
                    (value, i) => (
                      <span
                        key={i}
                        className={`cost-segment seg-${i}`}
                        style={{ flex: value || 0.0001 }}
                      />
                    ),
                  )}
                </div>
                <dl className="cost-breakdown">
                  {[
                    ['Tüm üretim denemeleri', result.generation],
                    ['İnsan incelemesi', result.review],
                    ['Diğer değişken gider', result.other],
                    ['Sabit gider', Number(values.fixed)],
                  ].map(([label, value], i) => (
                    <div key={label}>
                      <dt>
                        <i className={`seg-${i}`} />
                        {label}
                      </dt>
                      <dd>{money(value as number)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="accepted-cost">
                  <span>
                    Kabul edilen saniye başına
                    <br />
                    üretim maliyeti
                  </span>
                  <strong>{money(result.acceptedSecond)}</strong>
                </div>
              </>
            )
          )}
          <SourceChips ids={['D03', 'D05']} />
        </section>
      </div>
      <div className="takeaway">
        <span className="eyebrow">FORMÜL</span>
        <p className="formula">
          Video × saniye × birim fiyat × deneme
          <br />+ insan emeği + diğer giderler + sabit gider
        </p>
      </div>
      <section className="report-prose standalone">
        <h2>API mi, self-host mu?</h2>
        <p>
          Self-host için GPU kirası, idle kapasite, bakım emeği, disk, enerji, lisans ve aynı
          kaliteyi yakalamak için gereken denemeleri dahil et. API tarafında girdi/çıktı token
          oranı, cache ve kabul edilen görev oranını ölç. Evrensel bir token veya klip eşiği yoktur.
        </p>
        <p>
          Ölçüm önerisi: 30 günlük gerçek iş yükünü aynı kabul kriterleriyle karşılaştır. Saatlik
          tepe kapasite ve p95 gecikme, aylık toplam kadar önemlidir.{' '}
          <a href="#/software">Yazılım raporundaki kapasite yaklaşımını oku →</a>
        </p>
      </section>
    </>
  );
}
export function RoadmapChecklist() {
  const saved = useStoredIds(
    'futuristic:milestones:v1',
    milestones.map((m) => m.id),
  );
  return (
    <section className="roadmap-checklist card">
      <div className="section-heading">
        <div>
          <span className="eyebrow">KİŞİSEL ÇALIŞMA LİSTEN</span>
          <h2>İlk adımı görünür kıl.</h2>
        </div>
        <Pill tone="green">
          {saved.ids.length} / {milestones.length} tamamlandı
        </Pill>
      </div>
      <progress
        className="progress progress-primary"
        value={saved.ids.length}
        max={milestones.length}
        aria-label="Yol haritası ilerlemesi"
      />
      <div className="milestone-grid">
        {milestones.map((item) => (
          <label key={item.id} className={`milestone ${saved.ids.includes(item.id) ? 'done' : ''}`}>
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={saved.ids.includes(item.id)}
              onChange={() => saved.toggle(item.id)}
            />
            <span>
              <small>FAZ {item.phase}</small>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </span>
          </label>
        ))}
      </div>
      <p className="fine-print">
        {saved.persisted
          ? 'İşaretlerin yalnızca bu tarayıcıda saklanır. İstediğin zaman geri alabilirsin.'
          : 'Tarayıcı kaydetmeye izin vermiyor. İşaretlerin bu oturumda korunuyor.'}
      </p>
    </section>
  );
}
