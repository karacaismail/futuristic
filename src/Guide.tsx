import { TopicLinks } from './TopicLinks';
import { useState } from 'react';
import { Article } from './pages';
import Markdown from './Markdown';
import { Empty, PageTitle, Pill, SourceChips } from './components';
import { topics, statuses } from './data/guide';
import claims from './data/claims.json';
import coverage from './data/coverage.json';
import { normalizeText } from './lib/research';
import { useStoredIds } from './lib/storage';

export function Evidence({ unit }: { unit: (typeof coverage)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="collapse collapse-arrow evidence-item bg-base-100 border-base-300 border"
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary className="collapse-title">
        {unit.id} · {unit.title}
      </summary>
      <div className="collapse-content">
        <SourceChips ids={[unit.document]} />
        <TopicLinks ids={unit.topics} />
        {open && (
          <div className="source-excerpt">
            <Markdown
              body={
                unit.tableHeader && !unit.text.includes(unit.tableHeader)
                  ? `${unit.tableHeader}${unit.text}`
                  : unit.text
              }
            />
          </div>
        )}
      </div>
    </details>
  );
}
export function GuidePage({ params }: { params: URLSearchParams }) {
  const selected = topics.find((t) => t.id === params.get('topic'));
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tümü');
  const saved = useStoredIds(
    'futuristic:guides:v2',
    topics.map((t) => t.id),
  );
  if (params.has('topic') && !selected)
    return (
      <Empty title="Konu bulunamadı" description="Rehber dizininden devam edebilirsin.">
        <a className="btn btn-primary" href="#/guide">
          Bütün rehberler
        </a>
      </Empty>
    );
  if (selected) {
    const records = claims.filter((c) => c.topic === selected.id);
    const units = coverage.filter((c) => c.topics.includes(selected.id));
    return (
      <>
        <a className="btn btn-ghost" href="#/guide">
          ← Bütün rehberler
        </a>
        <Article
          key={selected.id}
          section={{
            id: selected.id,
            number: 'REHBER',
            label: selected.title,
            title: selected.title,
            intro: `${selected.category} · Kaynaklardan uygulamaya: yöntem, iş akışı, sınırlar ve karar.`,
            eyebrow: selected.category,
            minutes: selected.minutes,
            takeaway: selected.summary,
            sources: selected.documents,
            body: selected.body,
          }}
          read={saved.ids.includes(selected.id)}
          onRead={() => saved.toggle(selected.id)}
          persisted={saved.persisted}
        />
        {records.length > 0 && (
          <section className="section-block">
            <h2>Bu konunun sayısal kayıtları</h2>
            <div className="claim-links">
              {records.map((c) => (
                <a key={c.id} href={`#/claims?claim=${c.id}`}>
                  <Pill>{statuses[c.status]}</Pill>
                  <strong>{c.title}</strong>
                  <span>{c.statement}</span>
                </a>
              ))}
            </div>
          </section>
        )}
        <section className="section-block">
          <h2>Kaynak bölümleriyle bağlantı</h2>
          <p className="fine-print">
            İlgili özgün pasajlar, rapordaki açıklamanın yanında denetlenebilir. Eşleşme doğruluk
            onayı değildir; geniş kaynak bölümleri birden çok konu içerebilir.
          </p>
          <div className="evidence-list">
            {units.map((unit) => (
              <Evidence key={unit.id} unit={unit} />
            ))}
          </div>
        </section>
      </>
    );
  }
  const found = topics.filter(
    (t) =>
      (category === 'Tümü' || t.category === category) &&
      normalizeText(t.title + ' ' + t.body).includes(normalizeText(query)),
  );
  return (
    <>
      <PageTitle
        eyebrow="AYRINTILI REHBER"
        title="Yöntemi anla. Uygulamaya taşı."
        description={`${topics.length} konu dosyası: girdiler, adımlar, araçlar, sınırlar ve İsmail’in çalışma düzenine etkisi.`}
      />
      <a
        className="profile-link card bg-primary text-primary-content"
        href="#/guide?topic=personal-stack"
      >
        <strong>İsmail için karar haritası →</strong>
        <span>MetaFramer / atonota · FastAPI / Frappe · 15 ajan · M5 Max / Hetzner</span>
      </a>
      <label className="input search-field">
        <input
          type="search"
          aria-label="Rehberlerde ara"
          placeholder="Yöntem, araç veya iş akışı ara…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="filter-chips">
        {['Tümü', ...new Set(topics.map((t) => t.category))].map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-ghost'}`}
            aria-pressed={category === cat}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <p role="status">{found.length} konu</p>
      <div className="guide-grid">
        {found.map((t) => (
          <a className="card guide-card bg-base-100" href={`#/guide?topic=${t.id}`} key={t.id}>
            <Pill>{t.category}</Pill>
            <h2>{t.title}</h2>
            <p>{t.summary}</p>
            <span>
              {t.minutes} dk · {t.documents.join(' / ')}{' '}
              {saved.ids.includes(t.id) ? '· Okundu' : ''} →
            </span>
          </a>
        ))}
      </div>
      {!found.length && <Empty title="Konu bulunamadı" description="Daha kısa bir terim dene." />}
    </>
  );
}
export function ClaimsPage({ params }: { params: URLSearchParams }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const selected = params.get('claim');
  const found = claims.filter(
    (c) =>
      (!selected || c.id === selected) &&
      (status === 'all' || c.status === status) &&
      normalizeText(c.title + ' ' + c.statement + ' ' + c.assessment).includes(
        normalizeText(query),
      ),
  );
  return (
    <>
      <PageTitle
        eyebrow="SAYILAR & İDDİALAR"
        title="Rakamlar, varsayımlarıyla birlikte."
        description="Fiyat, benchmark, kapasite, popülerlik ve gelir iddiaları korunur. Kaynak aktarımı ile doğrulama ve hesap düzeltmesi ayrı gösterilir."
      />
      {selected ? (
        <a className="btn btn-outline" href="#/claims">
          Bütün sayısal kayıtlar
        </a>
      ) : (
        <div className="catalog-toolbar">
          <label className="input search-field">
            <input
              type="search"
              aria-label="Sayısal kayıtlarda ara"
              placeholder="Fiyat, model, RPM, benchmark…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <select
            className="select"
            aria-label="İddia durumu"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">Bütün durumlar</option>
            {Object.entries(statuses).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}
      <p className="results-meta" role="status">
        {found.length} kayıt · Kontrol kapsamı her kayıtta ayrı
      </p>
      <div className="claims-list">
        {found.map((c) => (
          <article className="card claim-card bg-base-100" key={c.id} id={c.id}>
            <Pill
              tone={
                c.status === 'corrected' || c.status === 'conflict'
                  ? 'amber'
                  : c.status === 'verified'
                    ? 'green'
                    : 'neutral'
              }
            >
              {statuses[c.status]}
            </Pill>
            <h2>
              <a href={`#/claims?claim=${c.id}`}>{c.title}</a>
            </h2>
            <h3>Kaynağın söylediği</h3>
            <p>{c.statement}</p>
            <h3>Değerlendirme ve kullanım sınırı</h3>
            <p>{c.assessment}</p>
            <SourceChips ids={c.documents} />
            <TopicLinks ids={[c.topic]} />
            {'url' in c && (
              <a href={c.url} target="_blank" rel="noreferrer" className="text-link">
                Birincil kontrol kaynağı ↗
              </a>
            )}
          </article>
        ))}
      </div>
      {!found.length && (
        <Empty title="Kayıt bulunamadı" description="Aramayı veya durum filtresini değiştir." />
      )}
    </>
  );
}
export function CoveragePage({ params }: { params: URLSearchParams }) {
  const doc = params.get('doc') || 'D01';
  const units = coverage.filter((c) => c.document === doc);
  return (
    <>
      <PageTitle
        eyebrow="KAPSAM HARİTASI"
        title="Kaynak → açıklama → karar."
        description="Özgün belgelerin bölümleri/pasajları ile ayrıntılı rehberler arasındaki bağlantı. Arşiv bütünlüğü ile anlamın yeterli açıklanması farklı denetimlerdir."
      />
      <div className="alert bg-base-200">
        D01/D02’nin satır yapısı kayıp olduğundan cümle sınırlarında okuma pasajları oluşturuldu.
        Bunlar özgün başlık iddiası değildir. Konu bağlantıları yardımcı bir indeks; her iddianın
        doğrulandığı anlamına gelmez.
      </div>
      <div className="filter-chips">
        {['D01', 'D02', 'D03', 'D04', 'D05', 'D06'].map((id) => (
          <a
            key={id}
            className={`btn ${id === doc ? 'btn-primary' : 'btn-ghost'}`}
            href={`#/coverage?doc=${id}`}
            aria-current={id === doc ? 'page' : undefined}
          >
            {id}
          </a>
        ))}
      </div>
      <p>{units.length} bölüm/pasaj · Özgün metindeki sırası korunur</p>
      <div className="coverage-list">
        {units.map((unit) => (
          <article className="card bg-base-100 coverage-card" key={unit.id}>
            <h2>
              {unit.id} · {unit.title}
            </h2>
            <TopicLinks ids={unit.topics} />
            <Evidence unit={unit} />
          </article>
        ))}
      </div>
    </>
  );
}
