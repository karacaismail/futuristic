import { Dialog, Empty, Icon, PageTitle, Pill, SourceChips } from './components';
import { TopicLinks } from './TopicLinks';
import tools from './data/tools.json';
import { normalizeText } from './lib/research';
import Markdown from './Markdown';
type Tool = (typeof tools)[number];
const fields: [keyof Tool, string][] = [
  ['pricing', 'Fiyat ve birim'],
  ['license', 'Lisans ve haklar'],
  ['limits', 'Sınırlar'],
  ['maturity', 'Olgunluk ve bakım'],
  ['integration', 'Entegrasyon'],
  ['workflow', 'Ortak çalışma deseni · Sentez'],
  ['decision', 'Seçim ölçütü · Sentez'],
];
const dataFilters = [
  ['pricing', 'Fiyat verisi olanlar'],
  ['license', 'Lisans bilgisi olanlar'],
] as const;
const priceCount = tools.filter((t) => t.availability.pricing).length;
const licenseCount = tools.filter((t) => t.availability.license).length;
function FieldCitation({ tool, field }: { tool: Tool; field: string }) {
  const source =
    'fieldSources' in tool
      ? (
          tool.fieldSources as Record<
            string,
            { document: string; excerpt: string; tableHeader?: string }
          >
        )[field]
      : undefined;
  return source ? (
    <details className="field-citation">
      <summary>Bu alanın kaynak satırı · {source.document}</summary>
      <div className="source-excerpt">
        <Markdown body={`${source.tableHeader || ''}${source.excerpt}`} />
      </div>
      <SourceChips ids={[source.document]} />
    </details>
  ) : null;
}
export function ToolsPage({ params }: { params: URLSearchParams }) {
  const query = params.get('q') || '',
    category = params.get('category') || 'Tümü',
    hosting = params.get('hosting') || 'Tümü';
  const selected = [...new Set((params.get('compare') || '').split(','))]
    .filter((id) => tools.some((t) => t.id === id))
    .slice(0, 3);
  const compare = params.get('view') === 'compare';
  const detail = tools.find((t) => t.id === params.get('tool'));
  const requiredData = (params.get('data') || '')
    .split(',')
    .filter((key): key is 'pricing' | 'license' => key === 'pricing' || key === 'license');
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'Tümü') next.set(key, value);
    else next.delete(key);
    window.history.replaceState(null, '', `#/tools${next.size ? '?' + next : ''}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };
  const toggle = (id: string) =>
    update(
      'compare',
      (selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id].slice(0, 3)
      ).join(','),
    );
  if (params.has('tool'))
    return detail ? (
      <>
        <a className="btn btn-ghost" href="#/tools">
          ← Araç radarı
        </a>
        <PageTitle
          eyebrow={`${detail.id} / ${detail.category}`}
          title={detail.name}
          description={detail.role}
        />
        <div className="article-meta">
          <Pill>{detail.hosting}</Pill>
          <SourceChips ids={detail.documents} />
        </div>
        <TopicLinks ids={[detail.topic]} />
        <div className="tool-detail-grid">
          {fields.map(([key, label]) => (
            <section className="card bg-base-100" key={key}>
              <h2>{label}</h2>
              {key in detail.availability &&
                !detail.availability[key as keyof typeof detail.availability] && (
                  <Pill>Kaynakta araç özelinde veri yok</Pill>
                )}
              <p>{String(detail[key])}</p>
              <FieldCitation tool={detail} field={key} />
            </section>
          ))}
        </div>
        <section className="section-block">
          <h2>Kaynakta geçtiği yer</h2>
          <p className="fine-print">
            İlgili paragraf veya tablo satırı kaynak bağlamını gösterir. Alanların tamamını
            doğrulayan kanıt değildir. Kaynak iddiası ile güncel doğrulama ayrı tutulur.
          </p>
          {detail.evidence.map((e, i) => (
            <details className="collapse collapse-arrow bg-base-100 border-base-300 border" key={i}>
              <summary className="collapse-title">{e.document} · Kaynak pasajını aç</summary>
              <div className="collapse-content">
                <p className="fine-print">
                  Kaynak karakter aralığı: {e.start}–{e.end}
                </p>
                <div className="source-excerpt">
                  <Markdown body={`${e.tableHeader || ''}${e.excerpt}`} />
                </div>
                <SourceChips ids={[e.document]} />
              </div>
            </details>
          ))}
        </section>
        {detail.url && (
          <a className="btn btn-outline" href={detail.url} target="_blank" rel="noreferrer">
            Kaynak bağlantısı ↗
          </a>
        )}
      </>
    ) : (
      <Empty title="Araç bulunamadı" description="Araç radarından devam et." />
    );
  const result = tools.filter(
    (t) =>
      (category === 'Tümü' || t.category === category) &&
      (hosting === 'Tümü' || t.hosting === hosting) &&
      requiredData.every((key) => t.availability[key]) &&
      normalizeText(`${t.name} ${t.role} ${t.fit}`).includes(normalizeText(query)),
  );
  const chosen = tools.filter((t) => selected.includes(t.id));
  return (
    <>
      <PageTitle
        eyebrow="04 / ARAÇ & TEKNOLOJİ"
        title="Doğru iş için, doğru araç."
        description={`${tools.length} araç ve teknoloji kaydı. ${priceCount} kayıtta fiyat, ${licenseCount} kayıtta lisans veya kullanım koşulu bilgisi var. Bilgi varlığı güncel doğrulama demek değildir; açık kaynak sınıflandırması da lisans bilgisine dahildir.`}
      />
      <div className="catalog-toolbar">
        <label className="input search-field">
          <Icon name="search" />
          <input
            type="search"
            aria-label="Araçlarda ara"
            placeholder="Araç, ihtiyaç veya teknoloji ara…"
            value={query}
            onChange={(e) => update('q', e.target.value)}
          />
        </label>
        <select
          className="select"
          aria-label="Çalışma ortamı"
          value={hosting}
          onChange={(e) => update('hosting', e.target.value)}
        >
          {['Tümü', 'Yerel', 'Bulut', 'Hibrit'].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>
      <fieldset className="data-filters">
        <legend>Kaynakta bilgi bulunan alanlar</legend>
        {dataFilters.map(([key, label]) => (
          <label key={key}>
            <input
              className="checkbox"
              type="checkbox"
              checked={requiredData.includes(key)}
              onChange={() =>
                update(
                  'data',
                  (requiredData.includes(key)
                    ? requiredData.filter((k) => k !== key)
                    : [...requiredData, key]
                  ).join(','),
                )
              }
            />
            {label}
          </label>
        ))}
        <p>İkisini seçersen her iki alanda da bilgi bulunan araçlar gösterilir.</p>
      </fieldset>
      <div className="filter-chips">
        {['Tümü', ...new Set(tools.map((t) => t.category))].map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-ghost'}`}
            aria-pressed={category === cat}
            onClick={() => update('category', cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <p className="results-meta" role="status">
        {result.length} araç gösteriliyor · Kaynakta yalnız adı geçen alternatiflerde eksik bilgi
        açıkça belirtilir.
      </p>
      <div className="tool-grid">
        {result.map((t) => (
          <article className="card tool-card" data-testid="tool-card" key={t.id}>
            <div className="tool-top">
              <Pill>{t.category}</Pill>
              <label className="compare-check">
                <input
                  className="checkbox checkbox-sm"
                  type="checkbox"
                  aria-label={`${t.name} karşılaştır`}
                  checked={selected.includes(t.id)}
                  disabled={selected.length === 3 && !selected.includes(t.id)}
                  onChange={() => toggle(t.id)}
                />
              </label>
            </div>
            <h2>
              <a href={`#/tools?tool=${t.id}`}>{t.name}</a>
            </h2>
            <p>{t.role}</p>
            <div className="data-badges">
              <Pill>{t.availability.pricing ? 'Fiyat verisi var' : 'Fiyat belirtilmemiş'}</Pill>
              <Pill>{t.availability.license ? 'Lisans bilgisi var' : 'Lisans belirtilmemiş'}</Pill>
            </div>
            <dl>
              <dt>Uygun kullanım</dt>
              <dd>{t.fit}</dd>
              <dt>Dikkat noktası</dt>
              <dd>{t.limits}</dd>
            </dl>
            <div className="tool-footer">
              <Pill>{t.hosting}</Pill>
              <a
                className="btn btn-ghost"
                href={`#/tools?tool=${t.id}`}
                aria-label={`${t.name} ayrıntıları`}
              >
                Ayrıntılar →
              </a>
            </div>
            <SourceChips ids={t.documents} />
          </article>
        ))}
      </div>
      {!result.length && (
        <Empty title="Eşleşen araç bulunamadı" description="Aramayı veya filtreleri değiştir.">
          <a className="btn btn-outline" href="#/tools">
            Filtreleri temizle
          </a>
        </Empty>
      )}
      {selected.length > 0 && (
        <div className="compare-bar">
          <span>{selected.length}/3 seçildi</span>
          <button className="btn btn-ghost" onClick={() => update('compare', '')}>
            Temizle
          </button>
          <button
            className="btn btn-primary"
            disabled={selected.length < 2}
            onClick={() => update('view', 'compare')}
          >
            {selected.length} aracı karşılaştır <Icon name="arrow" size={17} />
          </button>
          {selected.length < 2 && <small>Bir araç daha seç.</small>}
        </div>
      )}
      {compare && (
        <Dialog wide title="Araç karşılaştırması" onClose={() => update('view', '')}>
          <div className="comparison-grid">
            {chosen.map((t) => (
              <article key={t.id}>
                <Pill>{t.category}</Pill>
                <h3>{t.name}</h3>
                <dl>
                  {fields.map(([key, label]) => (
                    <div key={key}>
                      <dt>{label}</dt>
                      <dd>{String(t[key])}</dd>
                    </div>
                  ))}
                </dl>
                <TopicLinks ids={[t.topic]} />
                <SourceChips ids={t.documents} />
                <a className="btn btn-outline" href={`#/tools?tool=${t.id}`}>
                  Ayrıntıları aç
                </a>
              </article>
            ))}
          </div>
          <p className="fine-print">
            Adres çubuğundaki bağlantı filtreleri, seçili araçları ve açık karşılaştırmayı paylaşır.
            Fiyatlar kaynak tarihlidir.
          </p>
        </Dialog>
      )}
    </>
  );
}
