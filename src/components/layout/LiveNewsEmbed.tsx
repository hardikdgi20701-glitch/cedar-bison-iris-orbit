import { ExternalLink, Maximize2, Minimize2, Radio, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import { useLiveRefresh } from "@/hooks/useLiveRefresh";
import { getLiveTv, TV_CHANNELS, type LiveTv, type TvChannelId } from "@/lib/market/live-tv";
import { cn } from "@/lib/utils";

export function LiveNewsEmbed() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [channel, setChannel] = useState<TvChannelId>(() => {
    if (typeof window === "undefined") return "awaaz";
    const saved = window.localStorage.getItem("pv-tv-channel") as TvChannelId | null;
    return TV_CHANNELS.some((c) => c.id === saved) ? saved! : "awaaz";
  });
  const [stream, setStream] = useState<LiveTv | null>(null);
  const [busy, setBusy] = useState(false);
  const [tick, setTick] = useState(0);

  useLiveRefresh(() => {
    setBusy(true);
    void getLiveTv({ data: { channel, fresh: true } })
      .then(setStream)
      .catch(() => {
        /* keep last */
      })
      .finally(() => setBusy(false));
  }, 90_000, [channel, tick]);

  function pick(id: TvChannelId) {
    setChannel(id);
    try {
      localStorage.setItem("pv-tv-channel", id);
    } catch {
      /* ignore */
    }
  }

  const live = Boolean(stream?.live);
  const title = stream?.title || "Market desk";
  const chMeta = TV_CHANNELS.find((c) => c.id === channel);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 left-4 z-20 inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-3 text-xs font-medium text-fg shadow-lg hover:bg-chip md:bottom-4"
      >
        <span className={cn("size-1.5 rounded-full", live ? "animate-pulse bg-down" : "bg-muted")} />
        {live ? "Live TV" : "Last live"} · {chMeta?.name ?? "CNBC Awaaz"}
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed z-50 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl",
        expanded
          ? "bottom-20 left-4 h-[min(72vh,640px)] w-[min(420px,92vw)] md:bottom-4"
          : "bottom-20 left-4 w-[min(340px,92vw)] md:bottom-4",
      )}
    >
      <div className="flex items-start justify-between gap-2 border-b border-border px-2.5 py-1.5">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Radio className="size-3.5 text-primary" />
            <span className="text-[11px] font-medium tracking-wide text-fg">PlanVista TV</span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase",
                live ? "bg-down-soft text-down" : "bg-chip text-muted",
              )}
            >
              <span className={cn("size-1.5 rounded-full", live ? "animate-pulse bg-down" : "bg-muted")} />
              {live ? "Live" : "Last live"}
            </span>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-muted" title={title}>
            {chMeta?.name} · {title}
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-chip hover:text-fg"
            onClick={() => setTick((n) => n + 1)}
            aria-label="Refresh stream"
          >
            <RefreshCw className={cn("size-3.5", busy && "animate-spin")} />
          </button>
          {stream?.watchUrl ? (
            <a
              href={stream.watchUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-chip hover:text-fg"
              aria-label="Open on YouTube"
            >
              <ExternalLink className="size-3.5" />
            </a>
          ) : null}
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-chip hover:text-fg"
            onClick={() => setExpanded((e) => !e)}
            aria-label={expanded ? "Minimise" : "Expand"}
          >
            {expanded ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </button>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-chip hover:text-fg"
            onClick={() => setOpen(false)}
            aria-label="Close live TV"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>

      <div className={cn("bg-bg", expanded ? "h-[calc(100%-92px)]" : "h-[186px]")}>
        {stream?.embedUrl ? (
          <iframe
            key={stream.videoId}
            title={`${stream.channelName} ${live ? "live" : "last live"}`}
            src={stream.embedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted">Tuning the desk…</div>
        )}
      </div>

      <div className="flex gap-1 overflow-x-auto border-t border-border px-2 py-1.5">
        {TV_CHANNELS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => pick(c.id)}
            className={cn(
              "h-8 shrink-0 rounded-full px-2.5 text-[11px]",
              channel === c.id ? "bg-chip font-medium text-fg" : "text-muted hover:bg-chip hover:text-fg",
            )}
          >
            {c.name.replace("CNBC-", "").replace("CNBC ", "")}
          </button>
        ))}
      </div>
    </div>
  );
}
