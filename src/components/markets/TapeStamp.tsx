import { RefreshCw } from "lucide-react";
import { cn, formatIst, timeAgo } from "@/lib/utils";

export function TapeStamp({
  asOf,
  source,
  session,
  onRefresh,
  busy,
  label,
}: {
  asOf?: number;
  source?: "live" | "cached" | "simulated";
  session?: string;
  onRefresh?: () => void;
  busy?: boolean;
  label?: string;
}) {
  const live = source === "live" || source === "cached";
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-subtle">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-medium",
          live ? "bg-up-soft text-up" : "bg-chip text-muted",
        )}
      >
        <span className={cn("size-1.5 rounded-full", live ? "bg-up animate-pulse" : "bg-muted")} />
        {label ?? (live ? "Public delayed tape" : "Last known print")}
      </span>
      <span>{asOf ? `${timeAgo(asOf)} · ${formatIst(asOf)}` : "Updating…"}</span>
      {session ? <span>· {session}</span> : null}
      {onRefresh ? (
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex h-8 items-center gap-1 rounded-full px-2 text-xs text-muted hover:bg-surface hover:text-fg"
        >
          <RefreshCw className={cn("size-3.5", busy && "animate-spin")} />
          Refresh
        </button>
      ) : null}
    </div>
  );
}
