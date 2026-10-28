import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkline } from "@/components/charts/Sparkline";
import { DeepSearch } from "@/components/markets/DeepSearch";
import { TapeStamp } from "@/components/markets/TapeStamp";
import { useLiveRefresh } from "@/hooks/useLiveRefresh";
import { COMPANIES, INDICES } from "@/lib/market/universe";
import { getMarketHome, getQuotes } from "@/lib/market/server";
import type { MarketQuote, NewsItem } from "@/lib/market/types";
import { cn, formatMoney, pct, timeAgo } from "@/lib/utils";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/markets")({ component: Markets });

function Markets() {
  const [sector, setSector] = useState("All");
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [idx, setIdx] = useState<MarketQuote[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [asOf, setAsOf] = useState(0);
  const [source, setSource] = useState<"live" | "cached" | "simulated">("simulated");
  const [busy, setBusy] = useState(false);
  const [tick, setTick] = useState(0);
  const sectors = useMemo(() => ["All", ...Array.from(new Set(COMPANIES.map((c) => c.sector)))], []);
  const list = sector === "All" ? COMPANIES : COMPANIES.filter((c) => c.sector === sector);
  const symbols = useMemo(() => list.slice(0, 32).map((c) => c.yahoo).join("|"), [list]);

  useLiveRefresh(() => {
    return getMarketHome({ data: { region: "india", fresh: tick > 0 } }).then((res) => {
      setNews(res.news);
      setAsOf(res.asOf);
      setSource(res.source);
    });
  }, 20_000, [tick]);

  useLiveRefresh(() => {
    return getQuotes({
      data: {
        symbols: INDICES.filter((i) => i.region === "india").slice(0, 8).map((i) => i.yahoo),
      },
    }).then((rows) => {
      setIdx(rows);
      const latest = rows.reduce((m, q) => Math.max(m, q.asOf || 0), 0);
      if (latest) setAsOf(latest);
      if (rows.some((q) => q.source === "live")) setSource("live");
    });
  }, 1000, []);

  useLiveRefresh(() => {
    return getQuotes({ data: { symbols: list.slice(0, 32).map((c) => c.yahoo) } }).then(setQuotes);
  }, 1000, [symbols]);

  const by = new Map(quotes.map((q) => [q.symbol, q]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">Markets</h1>
        <p className="mt-1 text-sm text-muted">
          Search any NSE or BSE listed company from the top bar. Public delayed tape — not a live broker feed.
        </p>
        <div className="mt-2">
          <TapeStamp
            asOf={asOf || idx[0]?.asOf}
            source={source}
            busy={busy}
            onRefresh={() => {
              setBusy(true);
              setTick((n) => n + 1);
              window.setTimeout(() => setBusy(false), 800);
            }}
          />
        </div>
      </div>
      <section>
        <h2 className="mb-3 text-base font-medium">Indian indices</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {idx.map((m) => {
            const up = m.change >= 0;
            return (
              <Link
                key={m.symbol}
                to="/quote/$symbol"
                params={{ symbol: m.symbol }}
                className="rounded-xl border border-border p-4 hover:bg-surface"
              >
                <p className="text-sm font-medium">{m.name}</p>
                <p className="mt-1 text-xl font-medium tabular-nums">{formatMoney(m.price, m.currency)}</p>
                <p className={cn("text-xs tabular-nums", up ? "text-up" : "text-down")}>{pct(m.changePct)}</p>
                <Sparkline data={m.spark} up={up} className="mt-2 h-8 w-full" />
              </Link>
            );
          })}
        </div>
      </section>
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-medium">Listed companies</h2>
          <div className="flex flex-wrap gap-1">
            {sectors.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSector(s)}
                className={cn(
                  "h-8 rounded-full px-3 text-xs",
                  sector === s ? "bg-chip font-medium" : "text-muted hover:bg-surface",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-surface text-xs text-muted">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Name</th>
                <th className="px-3 py-2 text-left font-medium">Sector</th>
                <th className="px-3 py-2 text-right font-medium">Price</th>
                <th className="px-3 py-2 text-right font-medium">Change</th>
                <th className="px-3 py-2 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {list.slice(0, 32).map((c) => {
                const q = by.get(c.yahoo);
                const up = (q?.change ?? 0) >= 0;
                return (
                  <tr key={c.symbol} className="border-t border-border hover:bg-surface">
                    <td className="px-3 py-3">
                      <Link to="/quote/$symbol" params={{ symbol: c.yahoo }} className="font-medium text-primary hover:underline">
                        {c.symbol}
                      </Link>
                      <div className="text-xs text-subtle">{c.name}</div>
                    </td>
                    <td className="px-3 py-3 text-muted">{c.sector}</td>
                    <td className="px-3 py-3 text-right tabular-nums">
                      {q ? formatMoney(q.price, q.currency) : "—"}
                    </td>
                    <td className={cn("px-3 py-3 text-right tabular-nums", up ? "text-up" : "text-down")}>
                      {q ? pct(q.changePct) : "—"}
                    </td>
                    <td className="px-3 py-3">{q ? <Sparkline data={q.spark} up={up} /> : null}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-base font-medium">Latest market news</h2>
        <div className="divide-y divide-border rounded-xl border border-border">
          {(news.length ? news : []).slice(0, 10).map((n) => (
            <a
              key={n.url + n.title}
              href={n.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-start justify-between gap-3 px-4 py-3 text-sm hover:bg-surface"
            >
              <span>{n.title}</span>
              <span className="shrink-0 text-xs text-subtle">
                {n.source} · {timeAgo(n.published)}
              </span>
            </a>
          ))}
          {news.length === 0 ? <p className="px-4 py-6 text-sm text-muted">Refreshing headlines…</p> : null}
        </div>
      </section>
      <section className="rounded-xl border border-border p-4 sm:p-5">
        <h2 className="text-base font-medium">Deep Search</h2>
        <p className="mt-1 mb-4 text-sm text-muted">
          Look up any listed name, then continue on Google Finance, Google Search or Google News. Quotes refresh live.
        </p>
        <DeepSearch />
      </section>
    </div>
  );
}
