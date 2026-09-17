import { useDeferredValue, useEffect, useState } from 'react';
import { Dialog, Empty, Icon, PageTitle, Pill, SourceChips } from './components';
import corpus from './data/corpus.json';
import verification from './data/verification.json';
import tools from './data/tools.json';
import { navigation, sections } from './data/report';
import { normalizeText, searchItems, type SearchItem } from './lib/research';
import { topics } from './data/guide';
import claims from './data/claims.json';
import coverage from './data/coverage.json';
import Markdown from './Markdown';
import { loadSource } from './lib/sources';

export function SourceDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const [reading, setReading] = useState(true);
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const doc = corpus.documents.find((doc) => doc.id === id);
  useEffect(() => {
    let current = true;
    setBody('');
    setError('');
    loadSource(id)
      .then((text) => {
        if (current) setBody(text);
      })
      .catch((e) => {
        if (current) setError(e.message);
      });
    return () => {
      current = false;
    };
  }, [id, retry]);
  return (
    <Dialog wide title={doc ? `${doc.id} · ${doc.title}` : 'Kaynak bulunamadı'} onClose={onClose}>
      {doc && (
        <>
          <div className="source-reader-meta">
            <Pill tone={doc.topic === 'video' ? 'green' : 'purple'}>
              {doc.topic === 'video' ? 'Video' : 'Yazılım'}
            </Pill>
            <span>{new Intl.NumberFormat('tr-TR').format(doc.characters)} karakter</span>
            <a
              className="btn btn-outline btn-sm"
              download={`${doc.id}.txt`}
              href={`${import.meta.env.BASE_URL}${doc.path}`}
            >
              <Icon name="download" size={16} />
              Özgün metni indir
            </a>
          </div>
          <div className="source-view-toggle">
            <button
              className={`btn ${reading ? 'btn-primary' : 'btn-ghost'}`}
              aria-pressed={reading}
              onClick={() => setReading(true)}
            >
              Okuma düzeni
            </button>
            <button
              className={`btn ${!reading ? 'btn-primary' : 'btn-ghost'}`}
              aria-pressed={!reading}
              onClick={() => setReading(false)}
            >
              Özgün düz metin
            </button>
          </div>
          <div className="source-reader-note">
            Okuma görünümünde paragraf araları düzenlenir; özgün indirme baytları değişmez. Buradaki
            iddiaların tamamı doğrulanmış değildir. Eski sohbet atıfları ve biçim kayıpları
            orijinalin parçasıdır.
          </div>
        </>
      )}
      {error ? (
        <div className="load-error" role="alert">
          <p>{error}</p>
          <button className="btn btn-outline" onClick={() => setRetry((x) => x + 1)}>
            Tekrar dene
          </button>
        </div>
      ) : body ? (
        reading ? (
          <div className="source-reading">
            {id === 'D01' || id === 'D02' ? (
              coverage
                .filter((u) => u.document === id)
                .map((unit) => (
                  <section key={unit.id}>
                    <h2>{unit.title}</h2>
                    {unit.text
                      .split(/(?<=[.!?])(?=\s+[A-ZÇĞİÖŞÜ])/u)
                      .reduce<string[][]>((groups, sentence) => {
                        const last = groups[groups.length - 1];
                        if (!last || last.join(' ').length > 650) groups.push([sentence]);
                        else last.push(sentence);
                        return groups;
                      }, [])
                      .map((group, i) => (
                        <p key={i}>{group.join(' ')}</p>
                      ))}
                  </section>
                ))
            ) : (
              <Markdown body={body} />
            )}
          </div>
        ) : (
          <pre className="source-fulltext">{body}</pre>
        )
      ) : (
        <div className="loading-state" role="status">
          <span className="loading loading-spinner" />
          Tam metin yükleniyor…
        </div>
      )}
    </Dialog>
  );
}
export function SourcesPage({ params }: { params: URLSearchParams }) {
  const currentTab = params.get('tab') || 'documents';
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('all');
  const [limit, setLimit] = useState(24);
  const docId = params.get('doc');
  const refs = corpus.references.filter((ref) =>
    normalizeText(`${ref.title} ${ref.url} ${ref.documents.join(' ')}`).includes(
      normalizeText(query),
    ),
  );
  const docs = corpus.documents.filter(
    (doc) =>
      (topic === 'all' || doc.topic === topic) &&
      normalizeText(`${doc.title} ${doc.summary} ${doc.id}`).includes(normalizeText(query)),
  );
  function tab(id: string) {
    window.location.hash = `/sources?tab=${id}`;
    setQuery('');
    setLimit(24);
  }
  return (
    <>
      <PageTitle
        eyebrow="08 / KAYNAK KÜTÜPHANESİ"
        title="Merak et. Kaynağına git."
        description="Altı özgün araştırma, tüm açık referanslar ve seçilmiş iddialar için birincil kaynak kontrolü."
      />
      <div className="library-summary">
        <div>
          <strong>6 / 6</strong>
          <span>belge arşivlendi</span>
        </div>
        <div>
          <strong>{corpus.references.length}</strong>
          <span>benzersiz referans</span>
        </div>
        <div>
          <strong>{verification.length}</strong>
          <span>kritik iddia kontrolü</span>
        </div>
        <a
          className="btn btn-outline"
          href={`${import.meta.env.BASE_URL}sources/arastirma-arsivi.zip`}
          download
        >
          <Icon name="download" size={17} />
          Arşivi indir <span className="mono">ZIP</span>
        </a>
      </div>
      <div className="library-tabs tabs tabs-border" role="tablist" aria-label="Kaynak görünümü">
        {[
          ['documents', 'Özgün belgeler', '06'],
          ['references', 'Referanslar', String(corpus.references.length)],
          ['verified', 'Doğrulama kaydı', String(verification.length)],
        ].map(([id, label, count]) => (
          <button
            key={id}
            className={`tab ${currentTab === id ? 'tab-active' : ''}`}
            role="tab"
            aria-selected={currentTab === id}
            onClick={() => tab(id)}
          >
            {label}
            <span>{count}</span>
          </button>
        ))}
      </div>
      {currentTab !== 'verified' && (
        <div className="catalog-toolbar">
          <label className="input search-field">
            <Icon name="search" size={19} />
            <input
              type="search"
              placeholder={
                currentTab === 'references'
                  ? 'Referans, alan adı veya belge kimliği…'
                  : 'Belge başlığı veya konu ara…'
              }
              aria-label="Kaynaklarda ara"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(24);
              }}
            />
          </label>
          {currentTab === 'documents' && (
            <div className="filter-chips compact">
              {[
                ['all', 'Tümü'],
                ['video', 'Video'],
                ['software', 'Yazılım'],
              ].map(([id, label]) => (
                <button
                  className={`btn btn-sm ${topic === id ? 'btn-primary' : 'btn-ghost'}`}
                  key={id}
                  onClick={() => setTopic(id)}
                  aria-pressed={topic === id}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {currentTab === 'documents' && (
        <>
          <div className="document-grid">
            {docs.map((doc) => (
              <article className="document-card card" key={doc.id}>
                <div className="document-card-top">
                  <span className={`document-icon ${doc.topic}`}>
                    <Icon name="file" size={25} />
                  </span>
                  <span className="mono">{doc.id}</span>
                  <Pill tone={doc.topic === 'video' ? 'green' : 'purple'}>
                    {doc.topic === 'video' ? 'Video' : 'Yazılım'}
                  </Pill>
                </div>
                <h2>{doc.title}</h2>
                <p>{doc.summary}</p>
                <div className="document-numbers">
                  <span>{doc.referenceCount} açık referans</span>
                  <span>{Math.ceil(doc.bytes / 1024)} KB · TXT</span>
                </div>
                <div className="document-actions">
                  <button
                    className="btn btn-ghost"
                    aria-label={`${doc.id} Tam metni oku`}
                    onClick={() => {
                      window.location.hash = `/sources?tab=documents&doc=${doc.id}`;
                    }}
                  >
                    Tam metni oku <Icon name="arrow" size={16} />
                  </button>
                  <a
                    className="btn btn-ghost btn-square"
                    aria-label={`${doc.id} dosyasını indir`}
                    href={`${import.meta.env.BASE_URL}${doc.path}`}
                    download
                  >
                    <Icon name="download" size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>
          {!docs.length && (
            <Empty title="Belge bulunamadı" description="Farklı bir sözcük veya konu seç." />
          )}
          <div className="report-download">
            <a
              className="btn btn-outline"
              href={`${import.meta.env.BASE_URL}rapor.html`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="file" size={17} />
              Tam raporu aç / yazdır
            </a>
            <a className="btn btn-ghost" href={`${import.meta.env.BASE_URL}rapor.md`} download>
              Markdown indir <Icon name="download" size={16} />
            </a>
          </div>
          <div className="method-note">
            <Icon name="info" />
            <div>
              <strong>Kaynağı koruyoruz, belirsizliği de.</strong>
              <p>
                {corpus.opaqueCitations} eski sohbet atıf belirteci tam metinlerde saklanıyor.
                URL’si olmayan atıflar için bağlantı uydurulmadı. D01 ve D02’nin satır yapısı özgün
                aktarımda kaybolmuş.
              </p>
              <a href="#/methodology">
                Yöntem ve doğrulama kapsamı <Icon name="arrow" size={15} />
              </a>
            </div>
          </div>
        </>
      )}
      {currentTab === 'references' && (
        <>
          <p className="fine-print reference-intro">
            Bağlantılar özgün belgelerden çıkarıldı ve tekilleştirildi. Listelenmesi, güncelliğinin
            veya iddialarının doğrulandığı anlamına gelmez. Çıplak alan adı, açık repo ve arXiv
            kimlikleri bağlantıya dönüştürüldü.
          </p>
          <p className="results-meta" role="status">
            {refs.length} referans bulundu
          </p>
          <div className="reference-list">
            {refs.slice(0, limit).map((ref) => (
              <article key={ref.id}>
                <span className="mono reference-id">{ref.id}</span>
                <div>
                  <a href={ref.url} target="_blank" rel="noreferrer">
                    {ref.title}
                    <Icon name="external" size={14} />
                  </a>
                  <SourceChips ids={ref.documents} />
                </div>
                <Pill>Kaynak aktarımı</Pill>
              </article>
            ))}
          </div>
          {limit < refs.length && (
            <button className="btn btn-outline load-more" onClick={() => setLimit((n) => n + 24)}>
              24 referans daha göster ({refs.length - limit} kaldı)
            </button>
          )}
          {!refs.length && (
            <Empty
              title="Referans bulunamadı"
              description="Alan adını veya D03 gibi bir belge kimliğini dene."
            />
          )}
        </>
      )}
      {currentTab === 'verified' && (
        <>
          <div className="verification-note">
            <Icon name="shield" />
            <p>
              <strong>Kontrol tarihleri: 16–17 Eylül 2026.</strong> Yalnızca aşağıdaki dar iddialar
              kontrol edildi. Bütün katalog, fiyatlar ve model sıralamaları doğrulanmış sayılmaz.
            </p>
          </div>
          <div className="verification-list">
            {verification.map((v) => (
              <article key={v.id} className="verification-card card">
                <div className="verification-card-top">
                  <span className="mono">{v.id}</span>
                  <Pill tone={v.status === 'corrected' ? 'amber' : 'green'}>
                    {v.status === 'corrected' ? 'Düzeltildi' : 'Doğrulandı'}
                  </Pill>
                  <span className="small muted">
                    {new Date(v.checked + 'T12:00:00').toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h2>{v.title}</h2>
                <p>{v.finding}</p>
                <div className="verification-footer">
                  <SourceChips ids={v.documents} />
                  <a href={v.url} target="_blank" rel="noreferrer" className="text-link">
                    Birincil kaynak <Icon name="external" size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
      {docId && (
        <SourceDialog
          id={docId}
          onClose={() => {
            window.location.hash = `/sources?tab=${currentTab}`;
          }}
        />
      )}
    </>
  );
}
const sectionItems: SearchItem[] = sections.map((s) => ({
  id: s.id,
  title: s.label,
  text: s.body,
  type: 'Bölüm',
}));
const toolItems: SearchItem[] = tools.map((t) => ({
  id: t.id,
  title: t.name,
  text: [
    t.role,
    t.fit,
    t.pricing,
    t.license,
    t.limits,
    t.maturity,
    t.integration,
    t.workflow,
    t.decision,
    ...t.evidence.map((e) => e.excerpt),
  ].join(' '),
  type: 'Araç',
}));
const guideItems: SearchItem[] = topics.map((t) => ({
  id: t.id,
  title: t.title,
  text: t.body,
  type: 'Rehber',
}));
const claimItems: SearchItem[] = claims.map((c) => ({
  id: c.id,
  title: c.title,
  text: c.statement + ' ' + c.assessment,
  type: 'Sayısal kayıt',
}));
export function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);
  const [sourceItems, setSourceItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(0);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setErrors(0);
    Promise.allSettled(
      corpus.documents.map(async (doc) => ({
        id: doc.id,
        title: doc.title,
        text: await loadSource(doc.id),
        type: 'Tam metin',
      })),
    ).then((results) => {
      if (!active) return;
      setSourceItems(results.flatMap((r) => (r.status === 'fulfilled' ? [r.value] : [])));
      setErrors(results.filter((r) => r.status === 'rejected').length);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [retry]);
  const results = query.trim()
    ? searchItems(
        [...sectionItems, ...guideItems, ...claimItems, ...toolItems, ...sourceItems],
        deferred,
      )
    : [];
  return (
    <Dialog title="Araştırmada ara" wide onClose={onClose}>
      <label className="input search-field global-search-field">
        <Icon name="search" />
        <input
          data-autofocus
          type="search"
          aria-label="Tüm araştırmada ara"
          placeholder="Bir fikir, araç veya kavram…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <kbd className="kbd">esc</kbd>
      </label>
      <p className="search-hint">
        Türkçe veya ASCII ile ara. Rehberler, sayısal kayıtlar, araçlar, bölümler ve altı özgün
        metin.
      </p>
      {loading && (
        <p className="small" role="status">
          Tam metin arşivi yükleniyor… Bölümler ve araçlar hazır.
        </p>
      )}
      {errors > 0 && (
        <div className="search-error" role="alert">
          {errors} belge yüklenemedi. Sonuçlar kısmi.
          <button className="btn btn-ghost btn-sm" onClick={() => setRetry((n) => n + 1)}>
            Tekrar dene
          </button>
        </div>
      )}
      {!query.trim() ? (
        <div className="search-suggestions">
          <span className="eyebrow">BİR YERDEN BAŞLA</span>
          {['Türkçe', 'MCP', 'idempotency', 'TDD', 'Remotion'].map((word) => (
            <button key={word} className="btn btn-outline" onClick={() => setQuery(word)}>
              {word}
              <Icon name="arrow" size={15} />
            </button>
          ))}
        </div>
      ) : (
        <>
          <p className="results-meta" role="status">
            {results.length} sonuç
          </p>
          <div className="search-results">
            {results.map((item) => {
              const path =
                item.type === 'Tam metin'
                  ? `sources?doc=${item.id}`
                  : item.type === 'Araç'
                    ? `tools?tool=${item.id}`
                    : item.type === 'Rehber'
                      ? `guide?topic=${item.id}`
                      : item.type === 'Sayısal kayıt'
                        ? `claims?claim=${item.id}`
                        : item.id;
              const word = normalizeText(deferred.trim().split(/\s+/)[0]);
              const index = normalizeText(item.text).indexOf(word);
              const snippet = item.text
                .slice(Math.max(0, index - 70), Math.max(0, index - 70) + 210)
                .replace(/[\n#|*`]/g, ' ');
              return (
                <a href={`#/${path}`} onClick={onClose} key={`${item.type}-${item.id}`}>
                  <span className="search-result-icon">
                    <Icon
                      name={
                        item.type === 'Araç' ? 'boxes' : item.type === 'Tam metin' ? 'file' : 'book'
                      }
                      size={18}
                    />
                  </span>
                  <div>
                    <small>
                      {item.type} ·{' '}
                      {item.type === 'Bölüm'
                        ? navigation.find((n) => n.id === item.id)?.number
                        : item.id}
                    </small>
                    <strong>{item.title}</strong>
                    <p>{snippet}…</p>
                  </div>
                  <Icon name="chevron" size={16} />
                </a>
              );
            })}
          </div>
          {!results.length && !loading && (
            <Empty
              title="Eşleşme bulunamadı"
              description="Daha kısa bir kavram veya farklı bir yazım dene."
            />
          )}
        </>
      )}
    </Dialog>
  );
}
