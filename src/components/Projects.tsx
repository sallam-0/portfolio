import type { Project } from "@/data/projects";
import { allProjects } from "@/data/projects";
import { TechChip } from "./TechChip";
import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_ADVANCE_MS = 5000; // 5 seconds per project

function ProjectCard({ p, isActive }: { p: Project; isActive: boolean }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className="block h-full w-full"
    >
      <article
        className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-ink/80 backdrop-blur-sm transition-all duration-700 cursor-pointer ${
          isActive
            ? "border-data/40 shadow-2xl shadow-data/10 scale-100 opacity-100"
            : "border-ash scale-95 opacity-0"
        }`}
      >
        {/* Architecture diagram thumbnail */}
        <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-ash to-ink overflow-hidden">
          {p.images && p.images.length > 0 ? (
            <img
              src={p.images[0].src}
              alt={p.title}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <svg
              viewBox="0 0 320 180"
              className="absolute inset-0 h-full w-full text-fog transition-transform duration-700 group-hover:scale-105"
              aria-hidden="true"
            >
              <defs>
                <pattern id={`grid-${p.slug}`} width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M16 0H0V16" fill="none" stroke="currentColor" strokeOpacity="0.06" />
                </pattern>
              </defs>
              <rect width="320" height="180" fill={`url(#grid-${p.slug})`} />
              <g stroke="currentColor" strokeOpacity="0.6">
                <line x1="50" y1="90" x2="130" y2="90" strokeDasharray="3 3" />
                <line x1="170" y1="90" x2="250" y2="90" strokeDasharray="3 3" />
              </g>
              <g>
                <rect x="20" y="70" width="60" height="40" rx="6" fill="#0a0a0a" stroke="#3da9fc" />
                <rect x="130" y="70" width="60" height="40" rx="6" fill="#0a0a0a" stroke="#8a8a8a" />
                <rect x="240" y="70" width="60" height="40" rx="6" fill="#0a0a0a" stroke="#7ee787" />
              </g>
              <g fill="#c9c9c9" fontFamily="monospace" fontSize="9">
                <text x="30" y="140">source</text>
                <text x="138" y="140">transform</text>
                <text x="250" y="140">serve</text>
              </g>
            </svg>
          )}
          {/* Type badge overlay */}
          <span className="absolute top-3 right-3 rounded border border-ash/80 bg-void/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fog backdrop-blur-sm group-hover:border-data group-hover:text-data transition-colors">
            {p.type}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <h3 className="text-xl font-semibold text-snow group-hover:text-data transition-colors duration-300 md:text-2xl">{p.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-mist md:text-base">{p.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <TechChip key={t} tech={t} size={24} />
            ))}
          </div>
          <div className="mt-auto pt-6 flex items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fog group-hover:text-data transition-colors">
              View details
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = allProjects.length;

  // Scroll-triggered header reveal
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

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, isPaused, goNext]);

  // Pause on hover, resume on leave
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-void py-20 md:py-28"
      aria-labelledby="projects-title"
    >
      <a id="work" className="block -translate-y-24" aria-hidden="true" />

      {/* Header */}
      <div
        ref={headerRef}
        className={`mx-auto max-w-7xl px-6 pb-12 md:px-10 md:pb-16 transition-all duration-800 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-data">
          Selected Work
        </p>
        <h2
          id="projects-title"
          className="mt-3 font-sans text-4xl font-semibold tracking-tight text-snow md:text-5xl"
        >
          Systems that made the number trustable.
        </h2>
      </div>

      {/* Carousel */}
      <div
        className="relative mx-auto max-w-3xl px-6 md:px-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cards container */}
        <div className="relative" style={{ minHeight: 520 }}>
          {allProjects.map((p, i) => (
            <div
              key={p.slug}
              className="absolute inset-0 transition-all duration-700"
              style={{
                transform: i === activeIndex
                  ? "translateX(0) scale(1)"
                  : i < activeIndex
                    ? "translateX(-110%) scale(0.9)"
                    : "translateX(110%) scale(0.9)",
                opacity: i === activeIndex ? 1 : 0,
                pointerEvents: i === activeIndex ? "auto" : "none",
              }}
            >
              <ProjectCard p={p} isActive={i === activeIndex} />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-16 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-ash bg-ink/80 text-mist backdrop-blur-sm transition-all hover:border-data hover:text-data hover:shadow-lg hover:shadow-data/10 hover:scale-110"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next project"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-16 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-ash bg-ink/80 text-mist backdrop-blur-sm transition-all hover:border-data hover:text-data hover:shadow-lg hover:shadow-data/10 hover:scale-110"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Progress indicators */}
      <div className="mt-10 flex items-center justify-center gap-3">
        {allProjects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to project: ${p.title}`}
            className="group relative flex h-8 items-center justify-center"
          >
            {/* Progress bar background */}
            <div className={`h-1 rounded-full transition-all duration-500 ${
              i === activeIndex ? "w-10 bg-data" : "w-3 bg-ash hover:bg-fog"
            }`}>
              {/* Animated fill for auto-advance */}
              {i === activeIndex && !isPaused && (
                <div
                  className="h-full rounded-full bg-data/50"
                  style={{
                    animation: `progress-fill ${AUTO_ADVANCE_MS}ms linear`,
                    width: "100%",
                  }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Project counter */}
      <div className="mt-4 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
