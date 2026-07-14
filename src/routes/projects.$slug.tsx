import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TechChip } from "@/components/TechChip";
import { allProjects } from "@/data/projects";
import type { ProjectImage } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetailPage,
  loader: ({ params }) => {
    const project = allProjects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.title} — Ahmed Sallam` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.title} — Ahmed Sallam` },
        { property: "og:description", content: p.summary },
      ],
    };
  },
});

/* ─── Scroll-reveal hook ─── */
function useReveal() {
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

  return { ref, visible };
}

/* ─── Lightbox ─── */
function Lightbox({
  image,
  onClose,
}: {
  image: ProjectImage;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full border border-ash bg-ink/80 text-mist backdrop-blur-sm transition-all hover:border-data hover:text-data"
        aria-label="Close lightbox"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M4 4l10 10M14 4L4 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl border border-ash"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.caption}
          className="max-h-[85vh] w-auto object-contain"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-void/80 to-transparent p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
            {image.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Project Detail Page ─── */
function ProjectDetailPage() {
  const { project: p } = Route.useLoaderData();
  const hero = useReveal();
  const gallery = useReveal();
  const arch = useReveal();
  const highlights = useReveal();
  const techSection = useReveal();
  const [lightboxImage, setLightboxImage] = useState<ProjectImage | null>(null);

  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  return (
    <div className="relative min-h-screen w-full bg-void text-mist">
      <Nav />

      {lightboxImage && (
        <Lightbox image={lightboxImage} onClose={closeLightbox} />
      )}

      <main className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 border-b border-ash">
          <div
            ref={hero.ref}
            className={`mx-auto max-w-4xl px-6 md:px-10 transition-all duration-800 ${
              hero.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              to="/projects"
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
              All Projects
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="rounded-full border border-data/30 bg-data/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-data">
                {p.type === "DE" ? "Data Engineering" : "Data Analysis"}
              </span>
            </div>

            <h1 className="font-sans text-3xl font-semibold tracking-tight text-snow md:text-5xl lg:text-6xl">
              {p.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-mist/90 md:text-lg">
              {p.description}
            </p>

            {/* Links */}
            <div className="mt-8 flex flex-wrap gap-4">
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-ash bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mist transition-all hover:border-data hover:text-data hover:-translate-y-0.5"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  View on GitHub ↗
                </a>
              )}
              {p.demoUrl && (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-data px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-void transition-all hover:bg-data/90 hover:-translate-y-0.5"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        {p.images.length > 0 && (
          <section className="py-16 md:py-20 border-b border-ash">
            <div
              ref={gallery.ref}
              className={`mx-auto max-w-5xl px-6 md:px-10 transition-all duration-800 ${
                gallery.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-data mb-4">
                Gallery
              </p>
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-snow md:text-3xl mb-8">
                Screenshots & diagrams
              </h2>

              <div
                className={`grid gap-4 ${
                  p.images.length === 1
                    ? "grid-cols-1"
                    : p.images.length === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {p.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setLightboxImage(img)}
                    className={`group relative overflow-hidden rounded-xl border border-ash bg-ink/40 transition-all duration-500 hover:border-data/40 hover:shadow-lg hover:shadow-data/10 cursor-pointer ${
                      gallery.visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      transitionDelay: gallery.visible
                        ? `${200 + i * 100}ms`
                        : "0ms",
                    }}
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-void/50 flex items-center justify-center p-2">
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 border-t border-ash/60">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog group-hover:text-mist transition-colors">
                        {img.caption}
                      </p>
                    </div>
                    {/* Expand icon */}
                    <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-md bg-void/60 text-fog opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Architecture */}
        <section className="py-16 md:py-20 border-b border-ash">
          <div
            ref={arch.ref}
            className={`mx-auto max-w-4xl px-6 md:px-10 transition-all duration-800 ${
              arch.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-data mb-4">
              Architecture
            </p>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-snow md:text-3xl">
              How it's built
            </h2>

            {/* Pipeline flow */}
            <div className="mt-8 rounded-2xl border border-ash bg-ink/60 p-6 md:p-8 overflow-hidden">
              <div className="flex flex-wrap gap-2 items-center">
                {p.architecture.split("→").map((step, i, arr) => (
                  <span key={step.trim()} className="flex items-center gap-2">
                    <span className="rounded-lg border border-ash bg-void/80 px-3 py-1.5 font-mono text-[11px] text-mist whitespace-nowrap">
                      {step.trim()}
                    </span>
                    {i < arr.length - 1 && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-data/60 shrink-0"
                      >
                        <path
                          d="M6 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-mist/80 italic">
              {p.role}
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16 md:py-20 border-b border-ash">
          <div
            ref={highlights.ref}
            className={`mx-auto max-w-4xl px-6 md:px-10 transition-all duration-800 ${
              highlights.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-data mb-4">
              Highlights
            </p>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-snow md:text-3xl">
              Key achievements
            </h2>

            <ul className="mt-8 space-y-4">
              {p.highlights.map((h, i) => (
                <li
                  key={h}
                  className={`flex items-start gap-4 rounded-xl border border-ash bg-ink/40 p-4 md:p-5 transition-all duration-600 ${
                    highlights.visible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-6"
                  }`}
                  style={{
                    transitionDelay: highlights.visible
                      ? `${200 + i * 120}ms`
                      : "0ms",
                  }}
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-data/30 bg-data/10 font-mono text-[10px] font-medium text-data">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-mist md:text-base">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 md:py-20">
          <div
            ref={techSection.ref}
            className={`mx-auto max-w-4xl px-6 md:px-10 transition-all duration-800 ${
              techSection.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-data mb-4">
              Stack
            </p>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-snow md:text-3xl">
              Technologies used
            </h2>

            <div className="mt-8 flex flex-wrap gap-3">
              {p.tech.map((t, i) => (
                <span
                  key={t}
                  className={`transition-all duration-500 ${
                    techSection.visible
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                  style={{
                    transitionDelay: techSection.visible
                      ? `${100 + i * 80}ms`
                      : "0ms",
                  }}
                >
                  <TechChip tech={t} size={32} showLabel />
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom navigation */}
        <section className="border-t border-ash">
          <div className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fog hover:text-data transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M9 3l-4 4 4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                All Projects
              </Link>
              {(() => {
                const currentIndex = allProjects.findIndex(
                  (proj) => proj.slug === p.slug,
                );
                const nextProject =
                  allProjects[(currentIndex + 1) % allProjects.length];
                return (
                  <Link
                    to="/projects/$slug"
                    params={{ slug: nextProject.slug }}
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fog hover:text-data transition-colors"
                  >
                    Next: {nextProject.title}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M5 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                );
              })()}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
