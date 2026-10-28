import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Sparkline } from "@/components/charts/Sparkline";
import { displayTicker } from "@/lib/market/google";
import { MARKET_LISTS } from "@/lib/market/lists";
import { getQuotes, searchSymbols } from "@/lib/market/server";
import type { MarketQuote } from "@/lib/market/types";
import { findCompany } from "@/lib/market/universe";
import { useSiply } from "@/lib/store";
import { cn, formatMoney, pct } from "@/lib/utils";
import { useLiveRefresh } from "@/hooks/useLiveRefresh";

export function WatchlistRail() {
  const watchlist = useSiply((s) => s.watchlist);
  const toggleWatch = useSiply((s) => s.toggleWatch);
  const [open, setOpen] = useState<Record<string, boolean>>({ watchlist: true, index: true });
  const [quotes, setQuotes] = useState<Record<string, MarketQuote>>({});
  const [adding, setAdding] = useState(false);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<{ symbol: string; name: string; exchange: string }[]>([]);

  const groups = useMemo(
    () => [{ id: "watchlist", name: "Watchlist", symbols: watchlist }, ...MARKET_LISTS],
    [watchlist],
  );

  const needed = useMemo(() => {
    const set = new Set<string>();
    for (const g of groups) {
      if (open[g.id]) g.symbols.forEach((s) => set.add(s));
    }
    return [...set];
  }, [groups, open]);

  useLiveRefresh(() => {
    const batch = needed.slice(0, 40);
    if (!batch.length) return;
    return getQuotes({ data: { symbols: batch } })
      .then((rows) => {
        setQuotes((prev) => {
          const next = { ...prev };
          for (const r of rows) next[r.symbol] = r;
          return next;
        });
      })
      .catch(() => {
        /* keep last */
      });
  }, 1000, [needed.join("|")]);

  useEffect(() => {
    const query = q.trim();
    if (!adding || query.length < 1) {
      setHits([]);
      return;
    }
    let live = true;
    const t = window.setTimeout(() => {
      void searchSymbols({ data: { q: query } })
        .then((res) => {
          if (!live) return;
          setHits([
            ...res.local.map((c) => ({ symbol: c.yahoo, name: c.name, exchange: c.exchange })),
            ...res.remote.map((r) => ({ symbol: r.symbol, name: r.name, exchange: r.exchange })),
          ].slice(0, 8));
        })
        .catch(() => {
          if (live) setHits([]);
        });
    }, 180);
    return () => {
      live = false;
      window.clearTimeout(t);
    };
  }, [q, adding]);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-3 py-3">
        <p className="text-sm font-medium">Lists</p>
        <Link to="/markets" className="text-xs text-primary hover:underline">
          Markets
        </Link>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {groups.map((g) => {
          const expanded = Boolean(open[g.id]);
          return (
            <section key={g.id} className="border-t border-border">
              <div className="flex items-center gap-1 px-2 py-1.5">
                <button
                  type="button"
                  className="min-h-11 flex-1 rounded-md px-1 text-left text-sm font-medium hover:bg-surface"
                  onClick={() => setOpen((s) => ({ ...s, [g.id]: !expanded }))}
                >
                  {g.name}
                </button>
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-fg"
                  aria-label={`Add symbol to ${g.name}`}
                  onClick={() => {
                    setAdding(true);
                    setOpen((s) => ({ ...s, watchlist: true, [g.id]: true }));
                  }}
                >
                  <Plus className="size-4" />
                </button>
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-fg"
                  aria-label={expanded ? `Collapse ${g.name}` : `Expand ${g.name}`}
                  onClick={() => setOpen((s) => ({ ...s, [g.id]: !expanded }))}
                >
                  {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
              </div>
              {expanded ? (
                <ul>
                  {g.symbols.map((sym) => {
                    const quote = quotes[sym];
                    const company = findCompany(sym);
                    const ticker = displayTicker(sym);
                    const name = quote?.name ?? company?.name ?? ticker;
                    const href = `/quote/${encodeURIComponent(sym)}`;
                    const active =
                      pathname === href || pathname.endsWith("/" + encodeURIComponent(sym));
                    const up = (quote?.change ?? 0) >= 0;
                    const flat = quote != null && Math.abs(quote.changePct) < 0.00005;
                    return (
                      <li key={g.id + sym}>
                        <Link
                          to="/quote/$symbol"
                          params={{ symbol: sym }}
                          className={cn(
                            "grid grid-cols-[1fr_72px_auto] items-center gap-2 px-3 py-2 hover:bg-surface",
                            active ? "bg-surface" : "",
                          )}
                        >
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-medium tracking-tight">{ticker}</p>
                            <p className="truncate text-[11px] text-subtle">{name}</p>
                          </div>
                          {quote?.spark?.length ? (
                            <Sparkline data={quote.spark} up={up} className="h-7 w-[72px]" />
                          ) : (
                            <span className="text-center text-subtle">—</span>
                          )}
                          <div className="min-w-[88px] text-right">
                            <p className="text-[13px] tabular-nums">
                              {quote ? formatMoney(quote.price, quote.currency) : "—"}
                            </p>
                            <p
                              className={cn(
                                "inline-flex items-center justify-end gap-0.5 text-[11px] tabular-nums",
                                flat ? "text-muted" : up ? "text-up" : "text-down",
                              )}
                            >
                              {quote && !flat ? (up ? "Bull " : "Bear ") : null}
                              {quote ? pct(quote.changePct) : "—"}
                              {quote && !flat ? (
                                up ? (
                                  <ArrowUp className="size-3" />
                                ) : (
                                  <ArrowDown className="size-3" />
                                )
                              ) : null}
                            </p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                  {g.symbols.length === 0 ? (
                    <li className="px-3 py-6 text-center text-xs text-muted">
                      Search any NSE or BSE name to build a list.
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </section>
          );
        })}
      </div>
      {adding ? (
        <div className="border-t border-border p-3">
          <p className="mb-2 text-xs font-medium">Add symbol</p>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search NSE & BSE"
            className="h-10 w-full rounded-md border border-border bg-bg px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <ul className="mt-2 max-h-40 overflow-y-auto">
            {hits.map((h) => (
              <li key={h.symbol}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-surface"
                  onClick={() => {
                    toggleWatch(h.symbol);
                    setQ("");
                    setAdding(false);
                    setOpen((s) => ({ ...s, watchlist: true }));
                  }}
                >
                  <span className="min-w-0 truncate">
                    <span className="font-medium">{displayTicker(h.symbol)}</span>
                    <span className="ml-2 text-muted">{h.name}</span>
                  </span>
                  <span className="text-[11px] text-subtle">{h.exchange}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-2 text-xs text-muted hover:text-fg"
            onClick={() => {
              setAdding(false);
              setQ("");
            }}
          >
            Close
          </button>
        </div>
      ) : null}
      <div className="border-t border-border p-3">
        <Link
          to="/search"
          className="flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm hover:bg-surface"
        >
          <Search className="size-4 text-primary" />
          <span>
            <span className="font-medium">Deep Search</span>
            <span className="ml-1 text-xs text-muted">Google + live quotes</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
