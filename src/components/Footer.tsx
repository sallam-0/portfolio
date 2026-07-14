import { useEffect, useRef, useState } from "react";
import { ResumeOverlay } from "./ResumeOverlay";

export function Footer() {
  const [visible, setVisible] = useState(false);
  const [showResume, setShowResume] = useState(false);
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
      { rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative z-10 w-full border-t border-ash bg-void"
    >
      {showResume && <ResumeOverlay onClose={() => setShowResume(false)} />}
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div
          className={`flex flex-col gap-10 md:flex-row md:items-end md:justify-between transition-all duration-800 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <p
              className={`font-mono text-[11px] uppercase tracking-[0.28em] text-data transition-all duration-700 delay-100 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              Let's talk
            </p>
            <h2
              className={`mt-3 max-w-xl font-sans text-3xl font-semibold tracking-tight text-snow md:text-5xl transition-all duration-700 delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Building something that needs to be true?
            </h2>
            <a
              href="mailto:ahmedalasallam@gmail.com"
              className={`mt-6 inline-block font-mono text-sm uppercase tracking-[0.18em] text-mist underline decoration-data decoration-2 underline-offset-4 hover:text-data transition-all duration-700 delay-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              ahmedalasallam@gmail.com
            </a>
          </div>
          <nav
            className={`flex flex-wrap gap-6 md:justify-end transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            aria-label="Elsewhere"
          >
            <a
              href="https://github.com/sallam-0"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist hover:text-data transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="http://linkedin.com/in/ahmedsallam109"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist hover:text-data transition-colors"
            >
              LinkedIn ↗
            </a>
            <button
              type="button"
              onClick={() => setShowResume(true)}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist hover:text-data transition-colors"
            >
              Résumé ↗
            </button>
          </nav>
        </div>
        <div
          className={`mt-14 flex flex-col items-start justify-between gap-4 border-t border-ash pt-6 text-xs text-fog md:flex-row md:items-center transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-mono uppercase tracking-[0.18em]">
            © 2026 Ahmed Sallam · Built with TanStack, Canvas, and a lot of particles.
          </p>
          <a
            href="#hero"
            className="font-mono uppercase tracking-[0.18em] text-mist hover:text-data transition-colors"
          >
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
