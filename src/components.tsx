import { useEffect, useRef, type ReactNode } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Braces,
  Calculator,
  Check,
  ChevronRight,
  CircleHelp,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Grid2X2,
  Library,
  List,
  Network,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Video,
  X,
} from 'lucide-react';

const icons = {
  grid: Grid2X2,
  video: Video,
  code: Code2,
  network: Network,
  boxes: Boxes,
  calculator: Calculator,
  shield: ShieldCheck,
  route: Route,
  library: Library,
  info: CircleHelp,
  search: Search,
  book: BookOpen,
  file: FileText,
  download: Download,
  external: ExternalLink,
  arrow: ArrowUpRight,
  chevron: ChevronRight,
  check: Check,
  x: X,
  sparkles: Sparkles,
  list: List,
  braces: Braces,
};
export function Icon({
  name,
  size = 20,
  ...props
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Component = icons[name as keyof typeof icons] || FileText;
  return <Component size={size} strokeWidth={1.65} aria-hidden="true" {...props} />;
}
export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  return <span className={`badge pill pill-${tone}`}>{children}</span>;
}
export function PageTitle({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-title">
      <p className="eyebrow">{eyebrow}</p>
      <h1 tabIndex={-1}>{title}</h1>
      <p className="page-description">{description}</p>
      {children}
    </header>
  );
}
export function Dialog({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement;
    dialog.showModal();
    dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    return () => {
      dialog.close();
      previous?.focus?.();
    };
  }, []);
  return (
    <dialog
      className={`modal research-dialog ${wide ? 'wide' : ''}`}
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dialog-title"
    >
      <div className="modal-box">
        <header className="dialog-head">
          <h2 id="dialog-title">{title}</h2>
          <button
            className="btn btn-ghost btn-square"
            onClick={onClose}
            aria-label="Pencereyi kapat"
          >
            <Icon name="x" />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}
export function Empty({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <Icon name="search" size={32} />
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
}
export function SourceChips({ ids }: { ids: string[] }) {
  return (
    <div className="source-chips">
      {ids.map((id) => (
        <a
          key={id}
          className="source-chip"
          href={`#/sources?doc=${id}`}
          aria-label={`${id} kaynağını oku`}
        >
          <Icon name="file" size={13} />
          {id}
        </a>
      ))}
    </div>
  );
}
export function HeroDiagram() {
  return (
    <div
      className="hero-diagram"
      aria-label="Araştırma, yapay zekâ, doğrulama ve üretim katmanları"
      role="img"
    >
      <svg viewBox="0 0 440 300" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="orbit-stroke">
            <stop stopColor="#d7eeac" stopOpacity=".05" />
            <stop offset=".5" stopColor="#d7eeac" stopOpacity=".7" />
            <stop offset="1" stopColor="#d7eeac" stopOpacity=".08" />
          </linearGradient>
          <radialGradient id="orb">
            <stop stopColor="#344b37" />
            <stop offset="1" stopColor="#15251f" />
          </radialGradient>
        </defs>
        <path d="M0 150H440M220 0V300" stroke="#fff" strokeOpacity=".05" strokeDasharray="3 6" />
        <ellipse
          cx="220"
          cy="150"
          rx="188"
          ry="76"
          transform="rotate(-28 220 150)"
          stroke="url(#orbit-stroke)"
        />
        <ellipse
          cx="220"
          cy="150"
          rx="161"
          ry="103"
          transform="rotate(28 220 150)"
          stroke="url(#orbit-stroke)"
        />
        <ellipse
          cx="220"
          cy="150"
          rx="102"
          ry="126"
          transform="rotate(-40 220 150)"
          stroke="url(#orbit-stroke)"
        />
        <circle cx="220" cy="150" r="59" fill="url(#orb)" stroke="#d7eeac" strokeOpacity=".35" />
        <path d="M203 169V129H239V139H214V146H235V156H214V169" fill="#d7eeac" />
        <path d="M230 163H240V170H230" fill="#d7eeac" />
        <circle cx="63" cy="199" r="5" fill="#d7eeac" />
        <circle cx="343" cy="61" r="4" fill="#d7eeac" />
        <circle cx="314" cy="245" r="5" fill="#c1afe5" />
      </svg>
      <span className="diagram-tag tag-one">
        <Icon name="video" size={15} /> İçerik üretimi
      </span>
      <span className="diagram-tag tag-two">
        <Icon name="code" size={15} /> Yazılım geliştirme
      </span>
      <span className="diagram-legend">
        <i /> İnsan + yapay zekâ + sistem
      </span>
    </div>
  );
}
