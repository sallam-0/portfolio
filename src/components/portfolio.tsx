import { useEffect, useRef, useState, type ReactNode } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const STAGES = [
  { label: "Ingest", sub: "Kafka · Debezium" },
  { label: "Process", sub: "Flink · Spark · dbt" },
  { label: "Store", sub: "Snowflake · BigQuery · HDFS" },
  { label: "Serve", sub: "Power BI · APIs" },
];

export function PipelineFlow() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="relative flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-between">
        {STAGES.map((s, i) => (
          <div key={s.label} className="flex flex-1 items-center gap-4 sm:flex-col sm:items-center sm:text-center">
            <div className="relative flex items-center gap-4 sm:flex-col">
              <span className="pipe-node relative grid h-10 w-10 place-items-center rounded-full bg-primary/20 ring-1 ring-primary/50">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  0{i + 1}
                </p>
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="hidden text-xs text-muted-foreground sm:block">{s.sub}</p>
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <div className="relative hidden h-px flex-1 bg-gradient-to-r from-primary/40 via-border to-primary/40 sm:block">
                <span
                  className="pipe-packet absolute -top-[3px] h-1.5 w-6 rounded-full bg-primary shadow-[0_0_12px] shadow-primary/70"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TypedRole() {
  const roles = [
    "streaming pipelines.",
    "cloud data platforms.",
    "dimensional warehouses.",
    "analytics that ship.",
  ];
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = roles[idx];
    const speed = deleting ? 35 : 65;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIdx((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);
  return <span className="caret text-primary">{text}</span>;
}

export type Project = {
  title: string;
  summary: string;
  highlights: string[];
  tags: string[];
  repo: string;
  image?: string;
  category?: string;
  imagePrompt: string;
};

export function ProjectMedia({ src, alt, prompt }: { src?: string; alt: string; prompt: string }) {
  const [open, setOpen] = useState(false);
  if (src) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-black/40"
        >
          <img src={src} alt={alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
          <span className="absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur">
            Click to enlarge
          </span>
        </button>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
            onClick={() => setOpen(false)}
          >
            <img src={src} alt={alt} className="max-h-[92vh] max-w-[92vw] rounded-lg shadow-2xl" />
          </div>
        )}
      </>
    );
  }
  return (
    <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-card/40 p-6 text-center">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">Image slot</p>
        <p className="mt-2 text-sm font-medium text-foreground">Add pipeline diagram</p>
        <p className="mt-1 max-w-md text-xs text-muted-foreground">{prompt}</p>
        <p className="mt-3 font-mono text-[10px] text-muted-foreground">Recommended: 1600 × 900 · PNG</p>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 60}>
      <article className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 transition hover:border-primary/40 hover:bg-card/70">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/5 opacity-0 blur-3xl transition group-hover:opacity-100" />
        <ProjectMedia src={project.image} alt={`${project.title} architecture`} prompt={project.imagePrompt} />
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            {project.category && (
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                {project.category}
              </p>
            )}
            <h3 className="mt-1 text-xl font-semibold">{project.title}</h3>
          </div>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener"
            className="shrink-0 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary"
          >
            Repository ↗
          </a>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{project.summary}</p>
        <ul className="mt-4 space-y-1.5 text-sm">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-foreground/90">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/70 bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </article>
    </Reveal>
  );
}
