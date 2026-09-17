import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
const Markdown = lazy(() => import('./Markdown'));

export default function ReadingBody({
  id,
  body,
  open,
  onReveal,
}: {
  id: string;
  body: string;
  open: boolean;
  onReveal: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = ref.current!;
    // React's boolean hidden prop cannot express the enumerated until-found value.
    if (open) element.removeAttribute('hidden');
    else element.setAttribute('hidden', 'until-found');
    element.addEventListener('beforematch', onReveal);
    return () => element.removeEventListener('beforematch', onReveal);
  }, [open, onReveal]);
  return (
    <div id={id} ref={ref} className="article-part-body">
      <Suspense fallback={<p role="status">Bölüm yükleniyor…</p>}>
        <Markdown body={body} />
      </Suspense>
    </div>
  );
}
