import { useActiveStage, STAGE_IDS } from "@/hooks/useActiveStage";

const LABELS: Record<string, string> = {
  ingest: "Ingest",
  validate: "Validate",
  quality: "Quality",
  transform: "Transform",
  orchestrate: "Orchestrate",
  serve: "Serve",
};

export function StageIndicator() {
  const active = useActiveStage();
  const stages = STAGE_IDS.filter((s) => s !== "hero");
  const activeIndex = stages.indexOf(active as (typeof stages)[number]);

  // Hide when hero active or when past serve
  const visible = activeIndex >= 0;

  return (
    <div
      className={`pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 md:block transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-live="polite"
    >
      <ol className="flex flex-col gap-4">
        {stages.map((s, i) => {
          const isActive = i === activeIndex;
          const done = i < activeIndex;
          return (
            <li key={s} className="flex items-center gap-3">
              <a
                href={`#${s}`}
                className={`pointer-events-auto font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  isActive ? "text-data" : done ? "text-mist" : "text-fog/50"
                }`}
              >
                <span className="mr-2">{String(i + 1).padStart(2, "0")}</span>
                <span className={isActive ? "opacity-100" : "opacity-0 md:opacity-70"}>
                  {LABELS[s]}
                </span>
              </a>
              <span
                className={`h-px w-6 transition-colors ${
                  done ? "bg-data" : isActive ? "bg-mist" : "bg-ash"
                }`}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
