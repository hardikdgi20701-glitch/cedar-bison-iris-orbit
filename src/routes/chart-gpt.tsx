import { createFileRoute, Link } from "@tanstack/react-router";
import { ChartGpt } from "@/components/markets/ChartGpt";
import { MascotClip } from "@/components/markets/MascotClip";
import { Sparkline } from "@/components/charts/Sparkline";
import { getQuoteBundle } from "@/lib/market/server";
import type { QuoteBundle } from "@/lib/market/types";
import { ARTICLES } from "@/lib/learn";
import { cn, formatMoney, pct } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/chart-gpt")({ component: ChartGptPage });

const DESKS = [
  { id: "^NSEI", label: "Nifty 50" },
  { id: "^BSESN", label: "Sensex" },
  { id: "^NSEBANK", label: "Bank Nifty" },
  { id: "RELIANCE.NS", label: "Reliance" },
  { id: "HDFCBANK.NS", label: "HDFC Bank" },
  { id: "TCS.NS", label: "TCS" },
  { id: "INFY.NS", label: "Infosys" },
  { id: "SBIN.NS", label: "SBI" },
  { id: "ITC.NS", label: "ITC" },
] as const;

const LESSONS = [
  {
    slug: "how-to-read-candles",
    title: "How a candle is built",
    body: "Four prices make one bar: Open, High, Low, Close. The body is open→close. The wicks are the extreme high and low. Green usually means buyers won that period. Red means sellers won. That result is history — it does not promise the next bar.",
  },
  {
    slug: "bull-vs-bear",
    title: "Bull and bear are labels, not orders",
    body: "On PlanVista, Bull / green only means the last print is above the previous close. Bear / red means it is below. A bull market is a long stretch of rising prices. One green day is not a bull market. One red day is not a crash.",
  },
  {
    slug: "how-to-read-graphs",
    title: "Read the axes first",
    body: "X is time. Y is price. A 1-day chart answers ‘what did the last session do?’. A 1-year chart answers ‘where did we come from?’. For a student SIP, the long picture (or no stock chart at all) is the calmer default.",
  },
  {
    slug: "stop-loss-and-target",
    title: "Write the plan before the order",
    body: "If you ever buy a stock, write entry, stop-loss and target first. A stop is the price where the idea is wrong — not a guaranteed fill. Many beginners never need a stock stop. A SIP in an index fund is a schedule, not an intraday sport.",
  },
  {
    slug: "using-chart-gpt",
    title: "How to talk to Chart GPT",
    body: "Ask it to teach, not to pick. ‘How do I read this wick?’ works. ‘Kya buy karu?’ does not — it will refuse and show you how a stop is written instead. Stay on one symbol so the snapshot stays honest.",
  },
] as const;

function ChartGptPage() {
  const [symbol, setSymbol] = useState<string>("^NSEI");
  const [bundle, setBundle] = useState<QuoteBundle | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let live = true;
    setBusy(true);
    setErr(null);
    void getQuoteBundle({ data: { symbol, range: "1d", fresh: true } })
      .then((b) => {
        if (live) setBundle(b);
      })
      .catch((e) => {
        if (live) {
          setBundle(null);
          setErr(e instanceof Error ? e.message : "Could not load this chart");
        }
      })
      .finally(() => {
        if (live) setBusy(false);
      });
    return () => {
      live = false;
    };
  }, [symbol]);

  const q = bundle?.quote;
  const up = (q?.change ?? 0) >= 0;
  const related = ARTICLES.filter((a) =>
    ["how-to-read-candles", "how-to-read-graphs", "bull-vs-bear", "stop-loss-and-target", "using-chart-gpt", "which-timeframe"].includes(
      a.slug,
    ),
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">CNBC Awaaz desk · education</p>
        <h1 className="mt-1 text-3xl font-medium tracking-tight">Chart GPT</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
          A working chart classroom, not a tip line. Pick a name, then ask how to <em>read</em> the picture —
          candles, trend, volume, support and resistance. Chart GPT will not tell you what to buy. Green is not
          a buy. Red is not a sell.
        </p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {DESKS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setSymbol(d.id)}
            className={cn(
              "h-9 shrink-0 rounded-full px-3 text-sm",
              symbol === d.id ? "bg-primary text-primary-fg" : "border border-border bg-surface hover:bg-surface-2",
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      {err ? <p className="text-sm text-down">{err}</p> : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="space-y-4">
          {q ? (
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface p-4">
              <MascotClip up={up} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted">{q.name}</p>
                <p className="text-2xl font-medium tabular-nums">{formatMoney(q.price, q.currency)}</p>
                <p className={cn("text-sm", up ? "text-up" : "text-down")}>
                  {up ? "Bull" : "Bear"} {pct(q.changePct)} ·{" "}
                  {q.marketState === "open" ? "live / delayed" : "last close"}
                </p>
              </div>
              {q.spark.length > 2 ? (
                <div className="hidden sm:block">
                  <Sparkline data={q.spark} up={up} />
                </div>
              ) : null}
              <Link
                to="/quote/$symbol"
                params={{ symbol: q.symbol }}
                className="text-xs text-primary hover:underline"
              >
                Open full chart
              </Link>
            </div>
          ) : busy ? (
            <div className="h-24 animate-pulse rounded-xl bg-surface" />
          ) : null}

          {bundle ? <ChartGpt key={symbol} bundle={bundle} variant="page" /> : <div className="h-96 animate-pulse rounded-xl bg-surface" />}
        </div>

        <aside className="space-y-4">
          <section className="rounded-xl border border-border bg-surface p-4">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted">
              <BookOpen className="size-3.5" />
              How this chat works
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-4 text-[13px] leading-relaxed text-muted marker:text-primary">
              <li>Pick a name above. Chart GPT only cites that last print.</li>
              <li>Ask how to <em>read</em> it — candle, trend, volume, support.</li>
              <li>Follow-ups stay on the same topic. “Aur batao” works.</li>
              <li>Buy/sell questions are refused on purpose. That is the product.</li>
            </ol>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              Replies are written in short paragraphs with bullets so you can actually read them on a phone.
              If the language desk is busy, the classroom notes still answer from the same numbers.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-surface p-4">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted">
              Read this first
            </p>
            <ul className="mt-3 space-y-4">
              {LESSONS.map((l) => (
                <li key={l.slug} className="border-t border-border pt-3 first:border-0 first:pt-0">
                  <p className="text-sm font-medium">{l.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{l.body}</p>
                  <Link
                    to="/learn/$slug"
                    params={{ slug: l.slug }}
                    className="mt-1 inline-block text-xs text-primary hover:underline"
                  >
                    Full lesson
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-border p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">Chart classroom</p>
            <ul className="mt-2 space-y-1">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link
                    to="/learn/$slug"
                    params={{ slug: a.slug }}
                    className="block rounded-md px-2 py-2 text-sm hover:bg-surface"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
