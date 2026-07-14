import { useEffect, useRef, useState, type ReactNode } from "react";
import { TechChip } from "./TechChip";
import type { TechKey } from "@/data/tech";

export type StageSectionProps = {
  id: string;
  index: number;
  eyebrow: string;
  title: string;
  body: string;
  tools: TechKey[];
  align?: "left" | "right";
  next?: string;
  children?: ReactNode;
};

/** DOM overlay for a pipeline stage. Sits above the fixed canvas. */
export function StageSection({
  id,
  index,
  eyebrow,
  title,
  body,
  tools,
  align = "right",
  next,
  children,
}: StageSectionProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setVisible(true);
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const num = String(index).padStart(2, "0");
  const alignClass =
    align === "left"
      ? "md:mr-auto md:ml-0 md:pr-8"
      : "md:ml-auto md:mr-0 md:pl-8";

  // Directional animation based on alignment
  const slideDirection = align === "left" ? "translate-x-[-60px]" : "translate-x-[60px]";

  return (
    <section
      ref={ref}
      id={id}
      className="relative flex min-h-screen w-full items-center px-6 py-24 md:px-10"
      aria-labelledby={`${id}-title`}
    >
      <div className={`relative z-10 w-full max-w-2xl ${alignClass}`}>
        <div
          className={`rounded-xl border border-ash/60 bg-void/50 p-6 backdrop-blur-sm md:p-8 transition-all duration-[900ms] cubic-bezier(0.16,1,0.3,1) ${
            visible
              ? "opacity-100 translate-x-0 translate-y-0"
              : `opacity-0 ${slideDirection} translate-y-4`
          }`}
        >
          <p
            className={`font-mono text-[11px] uppercase tracking-[0.28em] text-data transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Stage {num} · {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className={`mt-3 font-sans text-3xl font-semibold tracking-tight text-snow md:text-5xl transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-5 max-w-lg text-base leading-relaxed text-mist md:text-lg transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            {body}
          </p>
          <div
            className={`mt-6 flex flex-wrap items-center gap-3 transition-all duration-700 delay-[400ms] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            {tools.map((t, i) => (
              <span
                key={t}
                className="transition-all duration-500"
                style={{ transitionDelay: visible ? `${450 + i * 60}ms` : "0ms" }}
              >
                <TechChip tech={t} size={26} showLabel />
              </span>
            ))}
          </div>
          {children && (
            <div
              className={`transition-all duration-700 delay-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {children}
            </div>
          )}
        </div>
        {next && (
          <a
            href={`#${next}`}
            className={`mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-fog transition-all hover:text-data duration-700 delay-600 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span>Next · {num} →</span>
          </a>
        )}
      </div>
    </section>
  );
}
