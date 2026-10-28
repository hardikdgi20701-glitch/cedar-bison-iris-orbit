import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  tone = "accent",
}: {
  value: number
  className?: string
  tone?: "accent" | "bull" | "bear" | "warn"
}) {
  const pct = Math.max(0, Math.min(100, value));
  const fill =
    tone === "bull" ? "bg-bull" : tone === "bear" ? "bg-bear" : tone === "warn" ? "bg-warn" : "bg-primary";
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-2", className)}>
      <div className={cn("h-full rounded-full transition-[width] duration-300", fill)} style={{ width: `${pct}%` }} />
    </div>
  );
}
