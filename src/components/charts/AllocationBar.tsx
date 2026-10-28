import type { Allocation } from "@/lib/types";

const SLEEVES: { key: keyof Allocation; label: string; className: string }[] = [
  { key: "equity", label: "Equity", className: "bg-primary" },
  { key: "hybrid", label: "Hybrid", className: "bg-primary/55" },
  { key: "debt", label: "Debt", className: "bg-muted" },
  { key: "gold", label: "Gold", className: "bg-warn" },
];

export function AllocationBar({ allocation }: { allocation: Allocation }) {
  return (
    <div>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-chip">
        {SLEEVES.map((s) => (
          <div
            key={s.key}
            className={s.className}
            style={{ width: `${allocation[s.key] * 100}%` }}
            title={`${s.label} ${Math.round(allocation[s.key] * 100)}%`}
          />
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted sm:grid-cols-4">
        {SLEEVES.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5">
            <span className={`inline-block size-2 rounded-full ${s.className}`} />
            {s.label} {Math.round(allocation[s.key] * 100)}%
          </li>
        ))}
      </ul>
    </div>
  );
}
