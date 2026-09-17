import { useEffect, useRef, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Icon } from './components';
function AdaptiveTable({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLTableElement>(null);
  useEffect(() => {
    const headers = [...ref.current!.querySelectorAll('th')].map((th) => th.textContent || '');
    ref.current!.querySelectorAll('tbody tr').forEach((row) =>
      row.querySelectorAll('td').forEach((cell, i) => {
        cell.dataset.label = headers[i] || '';
      }),
    );
  }, [children]);
  return (
    <div className="table-scroll" tabIndex={0} role="region" aria-label="Karşılaştırma tablosu">
      <table className="table" ref={ref}>
        {children}
      </table>
    </div>
  );
}
export default function Markdown({ body }: { body: string }) {
  return (
    <div className="report-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              {...(href?.startsWith('https:') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {children}
              {href?.startsWith('https:') && <Icon name="external" size={12} />}
            </a>
          ),
          table: ({ children }) => <AdaptiveTable>{children}</AdaptiveTable>,
          pre: ({ children }) => (
            <pre
              tabIndex={0}
              role="region"
              aria-label="Kod örneği"
              onKeyDown={(event) => {
                if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
                if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
                event.preventDefault();
                event.currentTarget.scrollBy({ left: event.key === 'ArrowRight' ? 40 : -40 });
              }}
            >
              {children}
            </pre>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
