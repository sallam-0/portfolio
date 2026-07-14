import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import portraitAsset from "@/assets/portrait.png.asset.json";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden px-6 md:px-10"
    >
      {/* Reduced-motion fallback: static portrait behind text */}
      {reduced && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={portraitAsset.url}
            alt="Portrait of Ahmed Sallam"
            className="h-[75%] w-auto max-w-[50%] object-contain opacity-25"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/60 to-transparent" />
        </div>
      )}

      {/* Text content — positioned left side, particles form portrait on right */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center">
        <div
          className={`w-full max-w-2xl transition-all duration-1000 ease-out md:w-1/2 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className={`mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-fog transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Data Engineer · Cairo → the internet
          </p>
          <h1
            className={`font-sans text-5xl font-semibold leading-[0.95] tracking-tight text-snow md:text-7xl lg:text-[96px] transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Ahmed Sallam
          </h1>
          <p
            className={`mt-6 max-w-md text-lg text-mist md:text-xl transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            I turn scattered signals into trustworthy systems.
          </p>
          <div
            className={`mt-10 flex flex-wrap items-center gap-3 transition-all duration-700 delay-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <Link
              to="/projects"
              className="rounded-md bg-data px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-void transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-data/20"
            >
              View Work →
            </Link>
            <a
              href="mailto:ahmedalasallam@gmail.com"
              className="rounded-md border border-ash bg-ink px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-mist transition-all hover:border-data hover:text-data hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>
        </div>
        {/* Right half is empty — particles fill this space via the fixed canvas */}
      </div>

      <a
        href="#ingest"
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-fog transition-all duration-700 delay-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        aria-label="Scroll to Ingest stage"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em]">Scroll to begin</span>
          <svg
            className="animate-soft-pulse"
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 4v14M2 12l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </a>
    </section>
  );
}
