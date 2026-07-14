import { useEffect, useState } from "react";

export type StageId =
  | "hero"
  | "ingest"
  | "validate"
  | "quality"
  | "transform"
  | "orchestrate"
  | "serve";

export const STAGE_IDS: StageId[] = [
  "hero",
  "ingest",
  "validate",
  "quality",
  "transform",
  "orchestrate",
  "serve",
];

export function useActiveStage(): StageId {
  const [active, setActive] = useState<StageId>("hero");
  useEffect(() => {
    const els = STAGE_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (els.length === 0) return;

    const pickActive = () => {
      const vh = window.innerHeight;
      const center = vh / 2;
      let bestId: StageId = "hero";
      let bestDist = Infinity;
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) continue;
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.id as StageId;
        }
      }
      setActive((prev) => (prev === bestId ? prev : bestId));
    };

    pickActive();
    window.addEventListener("scroll", pickActive, { passive: true });
    window.addEventListener("resize", pickActive);
    return () => {
      window.removeEventListener("scroll", pickActive);
      window.removeEventListener("resize", pickActive);
    };
  }, []);
  return active;
}
