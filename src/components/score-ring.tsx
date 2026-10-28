import { cn } from "@/lib/utils";

const PASS_MARK = 70;

export function ScoreRing({
  percent,
  size = 176,
  label = "Risk fitness",
}: {
  percent: number;
  size?: number;
  label?: string;
}) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circ - (clamped / 100) * circ;
  const pass = clamped >= PASS_MARK;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 128 128" className="absolute inset-0 -rotate-90">
          <circle cx="64" cy="64" r={r} fill="none" stroke="var(--color-surface-2)" strokeWidth="8" />
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke={pass ? "var(--color-bull)" : "var(--color-bear)"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-5xl font-medium tabular-nums tracking-tight text-fg">{clamped}%</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">{label}</p>
        </div>
      </div>
      <p className={cn("text-sm", pass ? "text-bull" : "text-bear")}>
        {pass ? "Pass mark cleared" : `Need ${PASS_MARK}% to enter`}
      </p>
    </div>
  );
}
