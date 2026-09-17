import { lazy, Suspense } from 'react';
import executive from './content/executive.md?raw';
const Markdown = lazy(() => import('./Markdown'));

const parts = executive
  .split(/^## /m)
  .filter(Boolean)
  .map((part) => ({
    title: part.slice(0, part.indexOf('\n')).trim(),
    body: part.slice(part.indexOf('\n') + 1).trim(),
  }));
const opening = parts[0];
const lead = opening.body.match(/^\*\*(.*?)\*\*/s)?.[1] || '';
const rationale = opening.body.replace(/^\*\*.*?\*\*/s, '').trim();
const numbers = parts.find((part) => part.title === 'Kararı değiştiren sayılar')!;

export default function Executive() {
  return (
    <article className="executive-summary reading-column" aria-labelledby="executive-title">
      <header>
        <p className="eyebrow">00 / YÖNETİCİ ÖZETİ · 17 EYLÜL 2026</p>
        <h1 id="executive-title" tabIndex={-1}>
          {opening.title}
        </h1>
        <p className="executive-lead">
          <strong>{lead}</strong>
        </p>
      </header>
      <Suspense fallback={<p role="status">Özet yükleniyor…</p>}>
        <section id="executive-numbers" aria-labelledby="numbers-title">
          <h2 id="numbers-title">{numbers.title}</h2>
          <Markdown body={numbers.body} />
        </section>
        <section aria-labelledby="rationale-title">
          <h2 id="rationale-title">Önceliğin gerekçesi</h2>
          <Markdown body={rationale} />
        </section>
        {parts
          .filter((part) => part !== opening && part !== numbers)
          .map((part) => (
            <section key={part.title}>
              <h2>{part.title}</h2>
              <Markdown body={part.body} />
            </section>
          ))}
      </Suspense>
      <nav className="executive-downloads" aria-label="Rapor dosyaları">
        <a
          className="btn btn-primary"
          href={`${import.meta.env.BASE_URL}yonetici-ozeti.md`}
          download
        >
          Yönetici özetini indir
        </a>
        <a className="btn btn-outline" href={`${import.meta.env.BASE_URL}rapor.html`}>
          Tam rapor
        </a>
        <a className="btn btn-ghost" href={`${import.meta.env.BASE_URL}rapor-ekleri.html`}>
          Ekler
        </a>
      </nav>
    </article>
  );
}
