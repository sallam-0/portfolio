import { TECH_LABELS, techMonogram, type TechKey } from "@/data/tech";

/** Small square inline-SVG chip: monogram + hover label. */
export function TechChip({
  tech,
  size = 24,
  showLabel = false,
}: {
  tech: TechKey;
  size?: number;
  showLabel?: boolean;
}) {
  const mono = techMonogram(tech);
  const label = TECH_LABELS[tech];
  return (
    <span
      className="group/tech inline-flex items-center gap-2"
      title={label}
    >
      <span
        aria-hidden="true"
        className="inline-flex shrink-0 items-center justify-center rounded-md border border-ash bg-ink font-mono text-[10px] font-medium text-mist transition-colors group-hover/tech:border-data group-hover/tech:text-data"
        style={{ width: size, height: size }}
      >
        {mono}
      </span>
      {showLabel && (
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fog">
          {label}
        </span>
      )}
      <span className="sr-only">{label}</span>
    </span>
  );
}
