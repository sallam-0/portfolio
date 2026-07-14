import { useEffect } from "react";

export function ResumeOverlay({ onClose }: { onClose: () => void }) {
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void/90 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Header bar */}
      <div
        className="w-full max-w-4xl flex items-center justify-between px-4 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-data">
          Résumé
        </span>
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md border border-ash bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mist transition-all hover:border-data hover:text-data"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1v9M3 7l4 4 4-4M2 12h10"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download PDF
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ash bg-ink/80 text-mist backdrop-blur-sm transition-all hover:border-data hover:text-data"
            aria-label="Close resume"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 4l8 8M12 4L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* PDF viewer */}
      <div
        className="relative w-full max-w-4xl flex-1 overflow-hidden rounded-t-xl border border-ash bg-ink/40"
        style={{ minHeight: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="h-full w-full"
          aria-label="Resume PDF viewer"
        >
          {/* Fallback if PDF can't render */}
          <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
            <div className="rounded-full border border-ash bg-ink p-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-fog">
                <path
                  d="M8 4h10l6 6v18a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M18 4v6h6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-snow">
                Unable to display PDF
              </p>
              <p className="mt-2 text-sm text-fog">
                Your browser may not support inline PDF viewing.
              </p>
            </div>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-data px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-void transition-all hover:bg-data/90"
            >
              Download Resume PDF
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}
