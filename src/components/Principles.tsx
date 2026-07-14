import { useEffect, useRef, useState } from "react";
import { principles } from "@/data/principles";
import { TECH_LABELS, techMonogram } from "@/data/tech";

function PrincipleCard({ pr, index }: { pr: (typeof principles)[number]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-ash bg-ink p-6 transition-all duration-700 hover:border-data hover:shadow-lg hover:shadow-data/5 hover:-translate-y-1 md:p-8 ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.96]"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <h3 className="font-sans text-2xl font-semibold text-snow">
          {pr.name}
        </h3>
        {/* Orbit */}
        <div className="relative h-24 w-24 shrink-0">
          <div className="absolute inset-0 rounded-full border border-ash/70 group-hover:border-data/50 transition-colors duration-500" />
          <div className="orbit-ring absolute inset-0">
            {pr.tools.map((t, i) => {
              const angle = (i / pr.tools.length) * Math.PI * 2;
              const r = 44;
              const x = 48 + Math.cos(angle) * r - 12;
              const y = 48 + Math.sin(angle) * r - 12;
              return (
                <div
                  key={t}
                  style={{ left: x, top: y }}
                  className="absolute h-6 w-6"
                >
                  <div className="orbit-counter flex h-6 w-6 items-center justify-center rounded border border-ash bg-void font-mono text-[9px] text-mist group-hover:border-data group-hover:text-data transition-colors duration-300">
                    {techMonogram(t)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-mist md:text-base">
        {pr.definition}
      </p>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
        {pr.tools.map((t) => TECH_LABELS[t]).join(" · ")}
      </p>
    </article>
  );
}

export function Principles() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setHeaderVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="principles"
      className="relative z-10 w-full bg-void"
      aria-labelledby="principles-title"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div
          ref={headerRef}
          className={`mb-14 max-w-2xl transition-all duration-800 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-data">
            Ground truth
          </p>
          <h2
            id="principles-title"
            className="mt-3 font-sans text-4xl font-semibold tracking-tight text-snow md:text-5xl"
          >
            Principles I build by.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((pr, i) => (
            <PrincipleCard key={pr.name} pr={pr} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
