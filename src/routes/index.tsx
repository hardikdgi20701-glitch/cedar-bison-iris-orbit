import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkline } from "@/components/charts/Sparkline";
import { MascotClip } from "@/components/markets/MascotClip";
import { TapeStamp } from "@/components/markets/TapeStamp";
import { useLiveRefresh } from "@/hooks/useLiveRefresh";
import { getMarketHome, getQuotes } from "@/lib/market/server";
import type { MarketQuote, NewsItem } from "@/lib/market/types";
import { ARTICLES, HEADLINES } from "@/lib/learn";
import { BADGE_META, useSiply } from "@/lib/store";
import { cn, formatMoney, pct, timeAgo } from "@/lib/utils";
import { useRef, useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const REGIONS = [
  { id: "india", label: "India" },
  { id: "us", label: "US" },
  { id: "europe", label: "Europe" },
  { id: "fx", label: "Currencies" },
  { id: "crypto", label: "Crypto" },
] as const;

function Home() {
  const [region, setRegion] = useState<(typeof REGIONS)[number]["id"]>("india");
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [session, setSession] = useState({ open: false, label: "NSE closed" });
  const [busy, setBusy] = useState(true);
  const [asOf, setAsOf] = useState(0);
  const [source, setSource] = useState<"live" | "cached" | "simulated">("simulated");
  const [tick, setTick] = useState(0);
  const hasData = useRef(false);
  const profile = useSiply((s) => s.profile);
  const badges = useSiply((s) => s.badges);

  const quoteSymbols = useRef<string[]>([]);

  useLiveRefresh(() => {
    if (!hasData.current) setBusy(true);
    return getMarketHome({ data: { region, fresh: tick > 0 } })
      .then((res) => {
        hasData.current = true;
        quoteSymbols.current = res.quotes.map((q) => q.symbol);
        setQuotes(res.quotes);
        setNews(res.news);
        setSession(res.session);
        setAsOf(res.asOf);
        setSource(res.source);
      })
      .catch(() => {
        if (!hasData.current) {
          setQuotes([]);
          setNews([]);
        }
      })
      .finally(() => setBusy(false));
  }, 20_000, [region, tick]);

  useLiveRefresh(() => {
    const symbols = quoteSymbols.current;
    if (!symbols.length) return;
    return getQuotes({ data: { symbols } }).then((rows) => {
      if (!rows.length) return;
      const by = new Map(rows.map((q) => [q.symbol, q]));
      setQuotes((prev) =>
        prev.map((q) => {
          const n = by.get(q.symbol);
          if (!n) return q;
          return {
            ...q,
            price: n.price,
            change: n.change,
            changePct: n.changePct,
            previousClose: n.previousClose,
            asOf: n.asOf,
            source: n.source,
            spark: n.spark.length ? n.spark : q.spark,
          };
        }),
      );
      setAsOf(Date.now());
      setSource("live");
    });
  }, 1000, [region]);

  const lead = news[0];
  const rest = news.slice(1, 10);
  const nifty = quotes.find((q) => /nifty 50/i.test(q.name) || /nifty/i.test(q.shortName)) ?? quotes[0];
  const isBull = (nifty?.change ?? 0) >= 0;

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-border p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Built for people who read before they tap</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
          X-ray any NSE name. See the level, the reason, and where the idea is wrong.
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Hindi or English. Nifty, Reliance, HDFC Bank, and the rest of the tape PlanVista can read. About fifteen
          seconds. Not a tip, not a broker.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/research" className="inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg">
            Start free — no card
          </Link>
          <Link to="/plans" className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium">
            See the plan
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          SEBI studies found that about 9 in 10 individual traders in equity futures and options lost money. The usual
          gap was no stop, no reason, and no price that proves the idea wrong. PlanVista puts those three on the
          page before a practice order.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Levels", "Support, resistance, breakout zone, volume — for today and for the week."],
            ["Plan", "Invalidation, reason, reward versus risk, and a reading score. Not a promise."],
            ["Why it moved", "Headline, volume, or just noise — before you exit on a red candle."],
            ["Your position", "Paste “1200 RELIANCE at 1258”. See where it stands, and where it is wrong."],
          ].map(([title, body]) => (
            <Link key={title} to="/research" className="rounded-xl border border-border p-3 hover:bg-surface">
              <p className="text-sm font-medium">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{body}</p>
            </Link>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl bg-surface p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-subtle">Forwarded tip</p>
            <p className="mt-1 text-sm">“Buy the call, target on the screenshot.”</p>
            <ul className="mt-2 space-y-1 text-xs text-muted">
              <li>No stop</li>
              <li>No reason</li>
              <li>No source</li>
              <li>Whenever the group wakes up</li>
            </ul>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary-soft p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">PlanVista</p>
            <p className="mt-1 text-sm">The chart, the headline, and the price that ends the idea.</p>
            <ul className="mt-2 space-y-1 text-xs text-fg">
              <li>Support zone</li>
              <li>RSI and volume, named</li>
              <li>Invalidation written down</li>
              <li>Hindi or English · free to start</li>
            </ul>
          </div>
        </div>
      </section>
      {nifty ? (
        <section className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3 p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Today’s session</p>
              <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
                {isBull ? "Bull tape" : "Bear tape"}
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Hello {profile.displayName.split(" ")[0] || "learner"}. The animal follows Nifty’s last print.
                Green is not a buy. Red is not a sell.
                {profile.riskScore > 0 ? (
                  <>
                    {" "}
                    Your risk-fitness score is{" "}
                    <span className={cn("tabular-nums font-medium", profile.riskScore >= 70 ? "text-up" : "text-down")}>
                      {profile.riskScore}%
                    </span>
                    .
                  </>
                ) : null}
              </p>
              <p className={cn("text-sm tabular-nums", isBull ? "text-up" : "text-down")}>
                {nifty.name} {pct(nifty.changePct)} · {session.label}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  to="/trade"
                  search={{ symbol: "RELIANCE.NS", side: "buy" }}
                  className="inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-hover"
                >
                  Practice a trade
                </Link>
                <Link
                  to="/learn"
                  className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium hover:bg-bg"
                >
                  Academy
                </Link>
                <Link
                  to="/nse"
                  className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium hover:bg-bg"
                >
                  NSE desk
                </Link>
                <Link
                  to="/search"
                  className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium hover:bg-bg"
                >
                  Deep Search
                </Link>
              </div>
            </div>
            <div className="relative min-h-44">
              <video
                key={isBull ? "bull" : "bear"}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={isBull ? "/media/bull.jpg" : "/media/bear.jpg"}
              >
                <source src={isBull ? "/media/bull.mp4" : "/media/bear.mp4"} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">Markets</h1>
            <p className="mt-1 text-sm text-muted">
              Live NSE & BSE quotes · {session.label}
              {profile.displayName ? ` · Welcome back, ${profile.displayName.split(" ")[0]}` : ""}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-1">
        {REGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => {
              hasData.current = false;
              setRegion(r.id);
            }}
            className={cn(
              "h-11 rounded-full px-4 text-sm",
              region === r.id ? "bg-chip font-medium text-fg" : "text-muted hover:bg-surface hover:text-fg",
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      <TapeStamp
        asOf={asOf}
        source={source}
        session={session.label}
        busy={busy}
        onRefresh={() => {
          hasData.current = true;
          setTick((n) => n + 1);
        }}
      />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(busy && quotes.length === 0 ? [0, 1, 2, 3] : quotes).map((q, i) =>
          typeof q === "number" ? (
            <div key={i} className="h-32 animate-pulse rounded-xl border border-border bg-surface" />
          ) : (
            <Link
              key={q.symbol}
              to="/quote/$symbol"
              params={{ symbol: q.symbol }}
              className="rounded-xl border border-border p-4 hover:bg-surface"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium">{q.name}</p>
                <MascotClip up={q.change >= 0} size="sm" />
              </div>
              <p className="mt-1 text-2xl font-medium tabular-nums tracking-tight">
                {formatMoney(q.price, q.currency)}
              </p>
              <p className={cn("flex items-center gap-1.5 text-sm tabular-nums", q.change >= 0 ? "text-up" : "text-down")}>
                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  {q.change >= 0 ? "Bull" : "Bear"}
                </span>
                {pct(q.changePct)}
              </p>
              <Sparkline data={q.spark} up={q.change >= 0} className="mt-2 h-10 w-full" />
            </Link>
          ),
        )}
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-base font-medium">{region === "india" ? "India market summary" : "Market summary"}</h2>
          <Link to="/markets" className="text-sm text-primary hover:underline">
            All markets
          </Link>
        </div>
        {lead ? (
          <article className="rounded-xl border border-border p-4 sm:p-5">
            <p className="text-xs text-subtle">
              {lead.source} · {timeAgo(lead.published)}
            </p>
            <a href={lead.url} target="_blank" rel="noreferrer" className="mt-1 block text-lg font-medium hover:text-primary">
              {lead.title}
            </a>
            <div className="mt-4 divide-y divide-border">
              {rest.map((n) => (
                <a
                  key={n.url + n.title}
                  href={n.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start justify-between gap-3 py-3 text-sm hover:text-primary"
                >
                  <span>{n.title}</span>
                  <span className="shrink-0 text-xs text-subtle">
                    {n.source} · {timeAgo(n.published)}
                  </span>
                </a>
              ))}
            </div>
          </article>
        ) : (
          <article className="rounded-xl border border-border p-4">
            <p className="text-sm font-medium">Classroom tape</p>
            <ul className="mt-3 space-y-3">
              {HEADLINES.map((h) => (
                <li key={h.title}>
                  <Link to="/learn" className="text-sm hover:text-primary">
                    {h.title}
                  </Link>
                  <p className="text-[11px] text-subtle">
                    {h.source} · {h.time}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium">Start learning</h2>
          <Link to="/learn" className="text-sm text-primary hover:underline">
            Full course
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {ARTICLES.slice(0, 4).map((a) => (
            <Link key={a.slug} to="/learn/$slug" params={{ slug: a.slug }} className="overflow-hidden rounded-xl border border-border hover:bg-surface">
              {a.image ? (
                <img src={a.image} alt="" className="h-32 w-full object-cover" />
              ) : null}
              <div className="space-y-1 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">{a.kicker}</p>
                <p className="font-medium text-fg">{a.title}</p>
                <p className="text-sm leading-relaxed text-muted">
                  {a.body[0].length > 120 ? `${a.body[0].slice(0, 117).trim()}…` : a.body[0]}
                </p>
                <p className="text-sm text-subtle">{a.minutes} min read</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/planner" className="rounded-xl border border-border p-4 hover:bg-surface">
          <p className="text-xs uppercase tracking-wide text-subtle">Goals</p>
          <p className="mt-1 text-lg font-medium">Build a SIP watchlist</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">Name a goal, inflate the cost, see the monthly SIP.</p>
        </Link>
        <Link to="/chart-gpt" className="rounded-xl border border-border p-4 hover:bg-surface">
          <p className="text-xs uppercase tracking-wide text-subtle">Chart GPT</p>
          <p className="mt-1 text-lg font-medium">Ask the chart, not a tip</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            A working chat that reads the last print — candles, trend, volume. It will not tell you what to buy.
          </p>
        </Link>
        <Link to="/quiz" className="rounded-xl border border-border p-4 hover:bg-surface">
          <p className="text-xs uppercase tracking-wide text-subtle">Risk quiz</p>
          <p className="mt-1 text-lg font-medium">Sign in every time</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">18+ classroom login, then seven questions that map a teaching mix.</p>
        </Link>
        <div className="rounded-xl border border-border p-4">
          <p className="text-xs uppercase tracking-wide text-subtle">Badges</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {badges.map((b) => (
              <li key={b} className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium text-primary">
                {BADGE_META[b].label}
              </li>
            ))}
            {badges.length === 0 ? (
              <li className="text-xs text-muted">Complete onboarding and the knowledge gate to start.</li>
            ) : null}
          </ul>
        </div>
      </section>
    </div>
  );
}
