import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";

const LINKS = [
  { href: "/", label: "Home", isRoute: true },
  { href: "/projects", label: "Work", isRoute: true },
  { href: "/#principles", label: "Principles" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Navigate to a hash link — if already on /, scroll directly; otherwise navigate home first. */
  const handleHashClick = (href: string) => {
    setOpen(false);
    const hash = href.replace("/#", "#");
    const isHome = router.state.location.pathname === "/";
    if (isHome) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + hash;
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-void/70 backdrop-blur-md" : "bg-transparent"
      } ${mounted ? "animate-nav-in" : "opacity-0"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="group flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-data transition-transform duration-300 group-hover:scale-150" />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-mist group-hover:text-snow transition-colors">
            Ahmed Sallam
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l, i) =>
            l.isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog transition-all hover:text-snow hover:-translate-y-0.5"
                style={{ animationDelay: `${200 + i * 80}ms` }}
              >
                {l.label}
              </Link>
            ) : (
              <button
                key={l.href}
                type="button"
                onClick={() => handleHashClick(l.href)}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog transition-all hover:text-snow hover:-translate-y-0.5"
                style={{ animationDelay: `${200 + i * 80}ms` }}
              >
                {l.label}
              </button>
            ),
          )}
          <a
            href="mailto:ahmedalasallam@gmail.com"
            className="rounded-md border border-ash bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mist transition-all hover:border-data hover:text-data hover:-translate-y-0.5"
          >
            Get in touch
          </a>
        </nav>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-ash bg-ink text-mist md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            {open ? (
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <>
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-ash bg-void/95 backdrop-blur md:hidden">
          <div className="flex flex-col px-6 py-4">
            {LINKS.map((l) =>
              l.isRoute ? (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 font-mono text-xs uppercase tracking-[0.18em] text-mist"
                >
                  {l.label}
                </Link>
              ) : (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => handleHashClick(l.href)}
                  className="py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-mist"
                >
                  {l.label}
                </button>
              ),
            )}
            <a
              href="mailto:ahmedalasallam@gmail.com"
              onClick={() => setOpen(false)}
              className="py-3 font-mono text-xs uppercase tracking-[0.18em] text-data"
            >
              Get in touch →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
