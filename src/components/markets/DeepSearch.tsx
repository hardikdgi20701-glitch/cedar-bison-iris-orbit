import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Newspaper, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Sparkline } from "@/components/charts/Sparkline";
import { displayTicker, googleFinanceSearchUrl, googleNewsUrl, googleSearchUrl } from "@/lib/market/google";
import { deepSearch } from "@/lib/market/server";
import type { MarketQuote, NewsItem } from "@/lib/market/types";
import { cn, formatMoney, pct, timeAgo } from "@/lib/utils";

type Hit = {
  symbol: string;
  ticker: string;
  name: string;
  exchange: string;
  googleFinance: string;
  googleSearch: string;
  googleNews: string;
};

type Result = {
  query: string;
  hits: Hit[];
  quotes: MarketQuote[];
  news: NewsItem[];
  googleFinanceSearch: string;
  googleSearch: string;
};

export function DeepSearch({ initial = "" }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  function run(query: string) {
    const next = query.trim();
    if (next.length < 1 || busy) return;
    setBusy(true);
    setErr(null);
    void deepSearch({ data: { q: next } })
      .then((res) => setResult(res))
      .catch((e) => setErr(e instanceof Error ? e.message : "Search failed"))
      .finally(() => setBusy(false));
  }

  useEffect(() => {
    if (initial.trim()) run(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  useEffect(() => {
    if (!result?.query) return;
    const id = window.setInterval(() => {
      void deepSearch({ data: { q: result.query } })
        .then((res) => setResult(res))
        .catch(() => {
          /* keep last */
        });
    }, 20000);
    return () => window.clearInterval(id);
  }, [result?.query]);

  const by = new Map((result?.quotes ?? []).map((x) => [x.symbol, x]));

  return (
    <div className="space-y-5">
      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          run(q);
        }}
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Deep search any NSE, BSE or global name"
            className="h-12 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none placeholder:text-subtle focus:bg-bg focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button
          type="submit"
          disabled={busy || !q.trim()}
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg hover:bg-primary-hover disabled:opacity-40"
        >
          {busy ? "Searching…" : "Deep Search"}
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        <a
          href={googleFinanceSearchUrl(q || "Nifty 50")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs hover:bg-surface"
        >
          Google Finance <ArrowUpRight className="size-3.5" />
        </a>
        <a
          href={googleSearchUrl(`${q || "Indian stock market"} NSE BSE`)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs hover:bg-surface"
        >
          Google Search <ArrowUpRight className="size-3.5" />
        </a>
        <a
          href={googleNewsUrl(`${q || "India stock market"} stock`)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs hover:bg-surface"
        >
          Google News <ArrowUpRight className="size-3.5" />
        </a>
      </div>
      {err ? <p className="text-sm text-down">{err}</p> : null}
      {result ? (
        <>
          <section>
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <h2 className="text-base font-medium">Live matches</h2>
              <p className="text-[11px] text-subtle">Quotes refresh every 30s · delayed public snapshot</p>
            </div>
            <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
              {result.hits.map((h) => {
                const quote = by.get(h.symbol);
                const up = (quote?.change ?? 0) >= 0;
                return (
                  <li key={h.symbol} className="grid gap-2 px-3 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                    <Link to="/quote/$symbol" params={{ symbol: h.symbol }} className="min-w-0 hover:text-primary">
                      <p className="text-sm font-medium">{h.ticker || displayTicker(h.symbol)}</p>
                      <p className="truncate text-xs text-muted">
                        {h.name} · {h.exchange}
                      </p>
                    </Link>
                    <div className="flex items-center gap-3">
                      {quote?.spark?.length ? <Sparkline data={quote.spark} up={up} className="h-8 w-20" /> : null}
                      <div className="min-w-[92px] text-right">
                        <p className="text-sm tabular-nums">{quote ? formatMoney(quote.price, quote.currency) : "—"}</p>
                        <p className={cn("text-xs tabular-nums", up ? "text-up" : "text-down")}>
                          {quote ? pct(quote.changePct) : "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:col-span-2">
                      <a
                        href={h.googleFinance}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-8 items-center rounded-full bg-primary-soft px-3 text-[11px] font-medium text-primary"
                      >
                        Google Finance
                      </a>
                      <a
                        href={h.googleSearch}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-8 items-center rounded-full border border-border px-3 text-[11px] hover:bg-surface"
                      >
                        Google
                      </a>
                      <a
                        href={h.googleNews}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-8 items-center rounded-full border border-border px-3 text-[11px] hover:bg-surface"
                      >
                        News
                      </a>
                    </div>
                  </li>
                );
              })}
              {result.hits.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-muted">
                  No listed matches. Try the Google links above for a live web search.
                </li>
              ) : null}
            </ul>
          </section>
          <section>
            <h2 className="mb-2 flex items-center gap-2 text-base font-medium">
              <Newspaper className="size-4 text-muted" />
              Latest headlines
            </h2>
            <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
              {result.news.map((n) => (
                <li key={n.url + n.title}>
                  <a href={n.url} target="_blank" rel="noreferrer" className="block px-4 py-3 hover:bg-surface">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-subtle">
                      {n.source} · {timeAgo(n.published)}
                    </p>
                  </a>
                </li>
              ))}
              {result.news.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-muted">No headlines yet for this query.</li>
              ) : null}
            </ul>
          </section>
        </>
      ) : (
        <p className="text-sm text-muted">
          Search a ticker or company. Results combine the local NSE/BSE universe, live quotes, Google News, and
          one-click Google Finance follow-through.
        </p>
      )}
    </div>
  );
}
