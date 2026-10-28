import { createFileRoute, Link } from "@tanstack/react-router";
import { CandleChart } from "@/components/charts/CandleChart";
import { RangeTabs } from "@/components/charts/PriceChart";
import { Sparkline } from "@/components/charts/Sparkline";
import { ChartGpt } from "@/components/markets/ChartGpt";
import { MascotClip } from "@/components/markets/MascotClip";
import { googleFinanceQuoteUrl, googleNewsUrl, googleSearchUrl } from "@/lib/market/google";
import { getQuoteBundle, getQuotes } from "@/lib/market/server";
import type { MarketQuote, QuoteBundle, QuoteRange } from "@/lib/market/types";
import { findCompany } from "@/lib/market/universe";
import { useSiply } from "@/lib/store";
import { cn, formatMoney, formatVol, inr, pct, timeAgo } from "@/lib/utils";
import { useState } from "react";
import { TapeStamp } from "@/components/markets/TapeStamp";
import { useLiveRefresh } from "@/hooks/useLiveRefresh";

export const Route = createFileRoute("/quote/$symbol")({ component: QuotePage });

function QuotePage() {
  const { symbol: raw } = Route.useParams();
  const symbol = decodeURIComponent(raw);
  const [range, setRange] = useState<QuoteRange>("1d");
  const [tab, setTab] = useState<"overview" | "earnings" | "financials" | "news" | "analysis">("overview");
  const [bundle, setBundle] = useState<QuoteBundle | null>(null);
  const [related, setRelated] = useState<MarketQuote[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const watchlist = useSiply((s) => s.watchlist);
  const toggleWatch = useSiply((s) => s.toggleWatch);
  const added = watchlist.includes(symbol) || watchlist.includes(bundle?.quote.symbol ?? "");

  const [tick, setTick] = useState(0);

  useLiveRefresh(() => {
    setErr(null);
    return getQuoteBundle({ data: { symbol, range, fresh: tick > 0 } })
      .then((b) => {
        setBundle(b);
        const rel = b.profile?.related ?? [];
        if (rel.length) {
          const yahoos = rel
            .map((s) => findCompany(s)?.yahoo)
            .filter((x): x is string => Boolean(x));
          return getQuotes({ data: { symbols: yahoos } }).then(setRelated);
        }
        setRelated([]);
      })
      .catch((e) => {
        setErr(e instanceof Error ? e.message : "Could not load this quote");
      });
  }, 15_000, [symbol, range, tick]);

  useLiveRefresh(() => {
    return getQuotes({ data: { symbols: [symbol] } }).then((rows) => {
      const row = rows[0];
      if (!row) return;
      setBundle((b) =>
        b
          ? {
              ...b,
              quote: {
                ...b.quote,
                price: row.price,
                change: row.change,
                changePct: row.changePct,
                previousClose: row.previousClose,
                asOf: row.asOf,
                source: row.source,
              },
            }
          : b,
      );
    });
  }, 1000, [symbol]);

  if (err) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted">{err}</p>
        <p className="mt-2 text-sm text-subtle">Try another NSE/BSE ticker from search.</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          Back to markets
        </Link>
      </div>
    );
  }
  if (!bundle) {
    return <div className="h-96 animate-pulse rounded-xl bg-surface" />;
  }

  const q = bundle.quote;
  const up = q.change >= 0;
  const profile = bundle.profile;
  const display = q.shortName.replace(/\.NS$|\.BO$/, "");

  return (
    <div className="space-y-6">
      <p className="text-xs text-subtle">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-1">|</span>
        {q.exchange}:{display}
      </p>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">{q.name}</h1>
          <div className="mt-2 flex flex-wrap items-end gap-3">
            <MascotClip up={up} size="lg" />
            <p className="text-4xl font-medium tabular-nums tracking-tight">{formatMoney(q.price, q.currency)}</p>
            <p className={cn("text-lg font-medium tabular-nums", up ? "text-up" : "text-down")}>
              {up ? "Bull" : "Bear"} {pct(q.changePct)} ({formatMoney(q.change, q.currency)}){" "}
              {q.marketState === "open" ? "now" : "last close"}
            </p>
          </div>
          <p className="mt-1 text-xs text-subtle">
            {q.exchange} · {q.currency} · {q.marketState === "open" ? "Market open" : "Market closed"} · delayed
          </p>
          <div className="mt-2">
            <TapeStamp asOf={q.asOf} source={q.source} onRefresh={() => setTick((n) => n + 1)} />
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <button
            type="button"
            onClick={() => toggleWatch(q.symbol)}
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium",
              added ? "border border-border bg-surface" : "bg-primary text-primary-fg hover:bg-primary-hover",
            )}
          >
            {added ? "Added" : "Add to list"}
          </button>
          <div className="flex gap-2">
            <Link
              to="/trade"
              search={{ symbol: q.symbol, side: "buy" }}
              className="inline-flex h-10 items-center justify-center rounded-full bg-up px-4 text-sm font-medium text-white"
            >
              Buy
            </Link>
            <Link
              to="/trade"
              search={{ symbol: q.symbol, side: "sell" }}
              className="inline-flex h-10 items-center justify-center rounded-full bg-down px-4 text-sm font-medium text-white"
            >
              Sell
            </Link>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <a
              href={googleFinanceQuoteUrl(q.symbol)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center rounded-full border border-border px-3 text-xs hover:bg-surface"
            >
              Google Finance
            </a>
            <a
              href={googleSearchUrl(`${q.name} stock`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center rounded-full border border-border px-3 text-xs hover:bg-surface"
            >
              Google
            </a>
            <a
              href={googleNewsUrl(`${q.name} stock`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center rounded-full border border-border px-3 text-xs hover:bg-surface"
            >
              News
            </a>
            <a
              href={`/search?q=${encodeURIComponent(display)}`}
              className="inline-flex h-9 items-center rounded-full bg-primary-soft px-3 text-xs font-medium text-primary"
            >
              Deep Search
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border p-3 sm:p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <RangeTabs value={range} onChange={setRange} />
          <p className="text-xs text-subtle">Prev. close {formatMoney(q.previousClose, q.currency)}</p>
        </div>
        <CandleChart series={bundle.chart} mark={q.price} />
      </div>

      <ChartGpt key={q.symbol} bundle={bundle} />

      <div className="flex gap-1 overflow-x-auto border-b border-border">
        {(
          [
            ["overview", "Overview"],
            ["earnings", "Earnings"],
            ["financials", "Financials"],
            ["news", "News"],
            ["analysis", "Analysis"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={cn(
              "shrink-0 border-b-2 px-3 py-2.5 text-sm",
              tab === k ? "border-primary font-medium text-primary" : "border-transparent text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <div className="space-y-6">
          {bundle.analysis[0] ? (
            <p className="text-sm leading-relaxed text-muted">{bundle.analysis[0]}</p>
          ) : null}
          <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-border sm:grid-cols-3">
            <Stat k="Open" v={formatMoney(bundle.stats.open ?? q.previousClose, q.currency)} />
            <Stat k="High" v={formatMoney(q.dayHigh ?? 0, q.currency)} />
            <Stat k="Low" v={formatMoney(q.dayLow ?? 0, q.currency)} />
            <Stat k="Mkt. cap" v={bundle.stats.marketCap ? inr(bundle.stats.marketCap, true) : "—"} />
            <Stat k="Volume" v={formatVol(q.volume)} />
            <Stat k="Avg. vol." v={formatVol(bundle.stats.avgVolume)} />
            <Stat k="P/E ratio" v={bundle.stats.pe != null ? bundle.stats.pe.toFixed(2) : "—"} />
            <Stat k="EPS" v={bundle.stats.eps != null ? formatMoney(bundle.stats.eps, q.currency) : "—"} />
            <Stat k="52-wk high" v={formatMoney(q.fiftyTwoWeekHigh ?? 0, q.currency)} />
            <Stat k="52-wk low" v={formatMoney(q.fiftyTwoWeekLow ?? 0, q.currency)} />
            <Stat k="1Y return" v={bundle.stats.return1y != null ? pct(bundle.stats.return1y) : "—"} />
            <Stat k="Employees" v={bundle.stats.employees ?? "—"} />
          </dl>
          {related.length ? (
            <section>
              <h2 className="mb-3 text-base font-medium">Related stocks</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((r) => (
                  <Link
                    key={r.symbol}
                    to="/quote/$symbol"
                    params={{ symbol: r.symbol }}
                    className="rounded-xl border border-border p-3 hover:bg-surface"
                  >
                    <p className="text-xs text-subtle">{r.shortName.replace(/\.NS$|\.BO$/, "")}</p>
                    <p className="truncate text-sm font-medium">{r.name}</p>
                    <p className="mt-1 text-sm tabular-nums">{formatMoney(r.price, r.currency)}</p>
                    <p className={cn("text-xs tabular-nums", r.change >= 0 ? "text-up" : "text-down")}>
                      {pct(r.changePct)}
                    </p>
                    <Sparkline data={r.spark} up={r.change >= 0} className="mt-2 h-8 w-full" />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
          {profile ? (
            <section>
              <h2 className="mb-2 text-base font-medium">Profile</h2>
              <p className="text-sm leading-relaxed text-muted">{profile.description}</p>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-subtle">CEO</dt>
                  <dd>{profile.ceo ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-subtle">Headquarters</dt>
                  <dd>{profile.headquarters ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-subtle">Sector</dt>
                  <dd>
                    {profile.sector} · {profile.industry}
                  </dd>
                </div>
              </dl>
            </section>
          ) : null}
        </div>
      ) : null}

      {tab === "earnings" ? (
        <Earnings profile={profile} name={q.name} />
      ) : null}

      {tab === "financials" ? (
        <div className="space-y-4">
          <p className="text-sm text-muted">
            Snapshot ratios compiled for learning. Always verify against the latest exchange filing.
          </p>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Card k="Trailing P/E" v={bundle.stats.pe != null ? bundle.stats.pe.toFixed(2) : "—"} />
            <Card k="EPS" v={bundle.stats.eps != null ? formatMoney(bundle.stats.eps, q.currency) : "—"} />
            <Card k="Market cap" v={bundle.stats.marketCap ? inr(bundle.stats.marketCap, true) : "—"} />
            <Card k="Book value / sh" v={profile?.bookValue != null ? String(profile.bookValue) : "—"} />
            <Card k="Shares" v={profile?.sharesCr != null ? `${profile.sharesCr} Cr` : "—"} />
            <Card
              k="Vs 52w high"
              v={bundle.stats.vs52wHigh != null ? pct(bundle.stats.vs52wHigh) : "—"}
            />
          </dl>
        </div>
      ) : null}

      {tab === "news" ? (
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
          {bundle.news.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-muted">No recent headlines for this name.</li>
          ) : (
            bundle.news.map((n) => (
              <li key={n.url + n.title}>
                <a href={n.url} target="_blank" rel="noreferrer" className="block px-4 py-3 hover:bg-surface">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-subtle">
                    {n.source} · {timeAgo(n.published)}
                  </p>
                </a>
              </li>
            ))
          )}
        </ul>
      ) : null}

      {tab === "analysis" ? (
        <div className="space-y-3">
          {bundle.analysis.map((line) => (
            <p key={line.slice(0, 40)} className="text-sm leading-relaxed text-muted">
              {line}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Earnings({
  profile,
  name,
}: {
  profile: QuoteBundle["profile"];
  name: string;
}) {
  const rows = profile?.quarters ?? [];
  if (!rows.length) {
    return (
      <p className="text-sm text-muted">
        Quarterly history for {name} is not in the compiled set yet. Use the Research panel to ask about the
        latest exchange filing, and treat any figure as educational.
      </p>
    );
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Compiled quarterly results (₹ crore). Figures are for classroom use — confirm with BSE/NSE filings
        before acting.
      </p>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-surface text-xs text-muted">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Quarter</th>
              <th className="px-3 py-2 text-right font-medium">Revenue (₹ Cr)</th>
              <th className="px-3 py-2 text-right font-medium">PAT (₹ Cr)</th>
              <th className="px-3 py-2 text-right font-medium">EPS</th>
              <th className="px-3 py-2 text-right font-medium">Rev YoY</th>
              <th className="px-3 py-2 text-right font-medium">PAT YoY</th>
            </tr>
          </thead>
          <tbody>
            {[...rows].reverse().map((r) => (
              <tr key={r.period} className="border-t border-border">
                <td className="px-3 py-3 font-medium">{r.label}</td>
                <td className="px-3 py-3 text-right tabular-nums">{r.revenueCr?.toLocaleString("en-IN") ?? "—"}</td>
                <td className="px-3 py-3 text-right tabular-nums">{r.patCr?.toLocaleString("en-IN") ?? "—"}</td>
                <td className="px-3 py-3 text-right tabular-nums">{r.eps ?? "—"}</td>
                <td className={cn("px-3 py-3 text-right tabular-nums", (r.yoyRevenue ?? 0) >= 0 ? "text-up" : "text-down")}>
                  {r.yoyRevenue != null ? pct(r.yoyRevenue) : "—"}
                </td>
                <td className={cn("px-3 py-3 text-right tabular-nums", (r.yoyPat ?? 0) >= 0 ? "text-up" : "text-down")}>
                  {r.yoyPat != null ? pct(r.yoyPat) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-border px-3 py-3 even:bg-surface/40 sm:odd:border-r sm:[&:nth-child(3n)]:border-r-0 max-sm:odd:border-r">
      <dt className="text-[11px] uppercase tracking-wide text-subtle">{k}</dt>
      <dd className="mt-1 text-sm font-medium tabular-nums">{v}</dd>
    </div>
  );
}

function Card({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="text-[11px] uppercase tracking-wide text-subtle">{k}</p>
      <p className="mt-1 text-lg font-medium tabular-nums">{v}</p>
    </div>
  );
}
