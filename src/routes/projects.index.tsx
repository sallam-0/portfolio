import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TechChip } from "@/components/TechChip";
import {
  allProjects,
  dataEngineeringProjects,
  dataAnalyticsProjects,
  type Project,
} from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Ahmed Sallam" },
      {
        name: "description",
        content:
          "Selected data engineering and data analysis projects by Ahmed Sallam. Pipelines, warehouses, semantic layers, and attribution models.",
      },
      { property: "og:title", content: "Projects — Ahmed Sallam" },
      {
        property: "og:description",
        content:
          "Data engineering & analytics portfolio — streaming pipelines, lakehouse migrations, retention models, and attribution warehouses.",
      },
    ],
  }),
  component: ProjectsPage,
});

type Filter = "all" | "DE" | "DA";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "DE", label: "Data Engineering" },
  { key: "DA", label: "Data Analysis" },
];

function getProjects(filter: Filter): Project[] {
  if (filter === "DE") return dataEngineeringProjects;
  if (filter === "DA") return dataAnalyticsProjects;
  return allProjects;
}

/* ─── Project Card ─── */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link
        to="/projects/$slug"
        params={{ slug: p.slug }}
        className="group block h-full"
      >
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-ash bg-ink/80 backdrop-blur-sm transition-all duration-500 hover:border-data/40 hover:shadow-2xl hover:shadow-data/10 hover:-translate-y-1">
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
                <pattern
                  id={`grid-${p.slug}`}
                  width="16"
                  height="16"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M16 0H0V16"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.06"
                  />
                </pattern>
              </defs>
              <rect width="320" height="180" fill={`url(#grid-${p.slug})`} />
              {/* Three-node pipeline */}
              <g stroke="currentColor" strokeOpacity="0.6">
                <line
                  x1="50"
                  y1="90"
                  x2="130"
                  y2="90"
                  strokeDasharray="3 3"
                />
                <line
                  x1="170"
                  y1="90"
                  x2="250"
                  y2="90"
                  strokeDasharray="3 3"
                />
              </g>
              <g>
                <rect
                  x="20"
                  y="70"
                  width="60"
                  height="40"
                  rx="6"
                  fill="#0a0a0a"
                  stroke="#3da9fc"
                />
                <rect
                  x="130"
                  y="70"
                  width="60"
                  height="40"
                  rx="6"
                  fill="#0a0a0a"
                  stroke="#8a8a8a"
                />
                <rect
                  x="240"
                  y="70"
                  width="60"
                  height="40"
                  rx="6"
                  fill="#0a0a0a"
                  stroke="#7ee787"
                />
              </g>
              <g fill="#c9c9c9" fontFamily="monospace" fontSize="9">
                <text x="30" y="140">
                  source
                </text>
                <text x="138" y="140">
                  transform
                </text>
                <text x="250" y="140">
                  serve
                </text>
              </g>
            </svg>
          )}
            {/* Type badge */}
            <span className="absolute top-3 right-3 rounded border border-ash/80 bg-void/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fog backdrop-blur-sm group-hover:border-data group-hover:text-data transition-colors">
              {p.type}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-semibold text-snow group-hover:text-data transition-colors duration-300">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist line-clamp-3">
              {p.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.slice(0, 4).map((t) => (
                <TechChip key={t} tech={t} size={22} />
              ))}
              {p.tech.length > 4 && (
                <span className="inline-flex items-center justify-center rounded-md border border-ash bg-ink px-2 font-mono text-[10px] text-fog">
                  +{p.tech.length - 4}
                </span>
              )}
            </div>
            <div className="mt-auto pt-5">
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
    </div>
  );
}

/* ─── Projects Page ─── */
function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const projects = getProjects(filter);

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
      { rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-void text-mist">
      <Nav />
      <main className="relative z-10">
        {/* Hero header */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div
            ref={headerRef}
            className={`mx-auto max-w-7xl px-6 md:px-10 transition-all duration-800 ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fog hover:text-data transition-colors mb-8"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-300 hover:-translate-x-1"
              >
                <path
                  d="M9 3l-4 4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to home
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-data">
              All Projects
            </p>
            <h1 className="mt-3 font-sans text-4xl font-semibold tracking-tight text-snow md:text-5xl lg:text-6xl">
              Systems that made the number trustable.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-mist/80 md:text-lg">
              From real-time pipelines to semantic layers — each project is a
              step toward data you can bet on.
            </p>
          </div>
        </section>

        {/* Filter tabs */}
        <section className="mx-auto max-w-7xl px-6 md:px-10 pb-10">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 border ${
                  filter === f.key
                    ? "bg-data text-void border-data shadow-lg shadow-data/20"
                    : "bg-transparent text-fog border-ash hover:border-fog hover:text-mist"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Project grid */}
        <section className="mx-auto max-w-7xl px-6 md:px-10 pb-20 md:pb-28">
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            key={filter}
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} p={p} index={i} />
            ))}
          </div>

          {/* Project count */}
          <div className="mt-10 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
              {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"}
              {filter !== "all" &&
                ` in ${filter === "DE" ? "Data Engineering" : "Data Analysis"}`}
            </span>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
