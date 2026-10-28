import { cn } from "@/lib/utils";

export function RiskMeter({
  percent,
  size = 168,
  label = "Risk score",
  passAt = 70,
  className,
}: {
  percent: number;
  size?: number;
  label?: string;
  passAt?: number;
  className?: string;
}) {
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  const passed = p >= passAt;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (p / 100) * circ;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 120 120" className="-rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" className="stroke-chip" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            className={passed ? "stroke-emerald-500" : "stroke-rose-500"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-4xl font-semibold tabular-nums", passed ? "text-emerald-400" : "text-rose-400")}>
            {p}%
          </span>
          <span className="text-[10px] uppercase tracking-wide text-muted">{label}</span>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">
        Pass mark {passAt}% · {passed ? "cleared" : `${Math.max(0, passAt - p)}% short`}
      </p>
    </div>
  );
}
