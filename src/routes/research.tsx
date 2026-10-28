import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CandleChart } from "@/components/charts/CandleChart";
import { useLiveRefresh } from "@/hooks/useLiveRefresh";
import { useDeskPlan } from "@/lib/desk-plan";
import { getMarketHome, getQuoteBundle, getQuotes, searchSymbols } from "@/lib/market/server";
import type { MarketQuote, NewsItem, QuoteBundle } from "@/lib/market/types";
import { buildXray, parsePosition, positionNote, type DeskLang } from "@/lib/xray";
import { cn, formatMoney, pct } from "@/lib/utils";
import { useEffect, useState, type ReactNode } from "react";

export const Route = createFileRoute("/research")({
  validateSearch: (search: Record<string, unknown>): { symbol?: string } => ({
    symbol: typeof search.symbol === "string" && search.symbol.trim() ? search.symbol : undefined,
  }),
  component: ResearchPage,
});

const ASKS: { en: string; hi: string; symbol: string }[] = [
  { en: "Why is Reliance moving?", hi: "Reliance kyun hil raha hai?", symbol: "RELIANCE.NS" },
  { en: "HDFC Bank: result or noise?", hi: "HDFC Bank: result ya shor?", symbol: "HDFCBANK.NS" },
  { en: "Tata Motors levels", hi: "Tata Motors ke level", symbol: "TATAMOTORS.NS" },
  { en: "Nifty setup", hi: "Nifty ka setup", symbol: "^NSEI" },
  { en: "Infosys support and resistance", hi: "Infosys support / resistance", symbol: "INFY.NS" },
  { en: "SBI momentum", hi: "SBI ka momentum", symbol: "SBIN.NS" },
  { en: "Bank Nifty levels", hi: "Bank Nifty ke level", symbol: "^NSEBANK" },
  { en: "TCS before the open", hi: "TCS, open se pehle", symbol: "TCS.NS" },
];

function ResearchPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const tier = useDeskPlan((s) => s.tier);
  const [lang, setLang] = useState<DeskLang>("en");
  const [query, setQuery] = useState("");
  const [symbol, setSymbol] = useState(search.symbol || "^NSEI");
  const [bundle, setBundle] = useState<QuoteBundle | null>(null);
  const [busy, setBusy] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [paste, setPaste] = useState("");
  const [posText, setPosText] = useState<string | null>(null);
  const [nifty, setNifty] = useState<MarketQuote | null>(null);
  const [us, setUs] = useState<MarketQuote | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const hi = lang === "hi";

  useEffect(() => {
    if (search.symbol && search.symbol !== symbol) {
      setSymbol(search.symbol);
      setBusy(true);
    }
  }, [search.symbol, symbol]);

  useLiveRefresh(() => {
    return getQuoteBundle({ data: { symbol, range: "6mo", fresh: false } })
      .then((b) => {
        setBundle(b);
        setErr(null);
      })
      .catch((e) => setErr(e instanceof Error ? e.message : "Could not read this name"))
      .finally(() => setBusy(false));
  }, 30_000, [symbol]);

  useLiveRefresh(() => {
    return getQuotes({ data: { symbols: [symbol, "^NSEI"] } }).then((rows) => {
      const row = rows.find((q) => q.symbol === symbol) ?? rows[0];
      const n = rows.find((q) => q.symbol === "^NSEI");
      if (n) setNifty(n);
      if (!row) return;
      setBundle((b) =>
        b && b.quote.symbol === row.symbol
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

  useLiveRefresh(() => {
    void getMarketHome({ data: { region: "india", fresh: true } }).then((res) => {
      setNews(res.news.slice(0, 3));
      const n = res.quotes.find((q) => /nifty 50/i.test(q.name)) ?? res.quotes[0] ?? null;
      setNifty(n);
    });
    void getMarketHome({ data: { region: "us", fresh: true } }).then((res) => {
      setUs(res.quotes.find((q) => /s&p|nasdaq|dow/i.test(q.name)) ?? res.quotes[0] ?? null);
    });
  }, 60_000, []);

  async function runQuery(text: string) {
    const q = text.trim();
    if (!q) return;
    setBusy(true);
    setErr(null);
    const found = await searchSymbols({ data: { q } }).catch(() => null);
    const hit = found?.local[0]?.yahoo || found?.remote[0]?.symbol;
    if (!hit) {
      setBusy(false);
      setErr(hi ? "Yeh naam tape par nahi mila." : "That name is not on the tape we can read.");
      return;
    }
    setSymbol(hit);
    void navigate({ to: "/research", search: { symbol: hit } });
  }

  function readPosition() {
    const parsed = parsePosition(paste);
    if (!parsed || !bundle) {
      setPosText(hi ? "Jaise likho: 1200 RELIANCE at 1258" : "Write it like: 1200 RELIANCE at 1258");
      return;
    }
    const brief = buildXray(bundle, lang);
    setPosText(positionNote(parsed, bundle.quote.price, brief.support, lang));
    if (parsed.name.length > 1) void runQuery(parsed.name);
  }

  const brief = bundle ? buildXray(bundle, lang) : null;
  const q = bundle?.quote;
  const up = (q?.change ?? 0) >= 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
            {hi ? "PlanVista research" : "PlanVista research"}
          </p>
          <h1 className="mt-1 text-3xl font-medium tracking-tight">
            {hi ? "Kisi bhi naam ko 15 second mein padho." : "Read any name in about 15 seconds."}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {hi
              ? "Level, plan, wajah, aur aapki position. Yeh research hai — buy ya sell ki salah nahi. NSE, broker, ya bank tak kuch nahi jaata."
              : "Levels, a plan, the reason, and your position. This is research — not a buy or sell call. Nothing is sent to NSE, a broker, or a bank."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium uppercase text-primary">{tier}</span>
          {(["en", "hi"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setLang(id)}
              className={cn("h-9 rounded-full px-3 text-xs font-medium", lang === id ? "bg-primary text-primary-fg" : "bg-surface text-muted")}
            >
              {id === "en" ? "English" : "हिन्दी"}
            </button>
          ))}
        </div>
      </div>

      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          void runQuery(query);
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={hi ? "Reliance, HDFC Bank, Nifty…" : "Reliance, HDFC Bank, Nifty…"}
          className="h-12 min-w-0 flex-1 rounded-full border border-border bg-bg px-4 text-base"
        />
        <button type="submit" className="h-12 rounded-full bg-primary px-5 text-sm font-medium text-primary-fg">
          {hi ? "X-ray" : "X-ray"}
        </button>
      </form>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {ASKS.map((a) => (
          <button
            key={a.symbol + a.en}
            type="button"
            onClick={() => {
              setSymbol(a.symbol);
              setQuery(hi ? a.hi : a.en);
              void navigate({ to: "/research", search: { symbol: a.symbol } });
            }}
            className="h-9 shrink-0 rounded-full bg-surface px-3 text-xs text-fg hover:bg-chip"
          >
            {hi ? a.hi : a.en}
          </button>
        ))}
      </div>

      {err ? <p className="text-sm text-down">{err}</p> : null}

      {q && brief ? (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="overflow-hidden rounded-xl border border-border bg-white">
            <div className="border-b border-[#e0e3eb] px-4 py-3">
              <h2 className="text-lg font-medium text-[#131722]">{q.name}</h2>
              <p className="mt-0.5 flex flex-wrap items-baseline gap-2">
                <span className="text-2xl font-medium tabular-nums text-[#131722]">{formatMoney(q.price, q.currency)}</span>
                <span className={cn("text-sm font-medium tabular-nums", up ? "text-[#089981]" : "text-[#f23645]")}>
                  {pct(q.changePct)}
                </span>
              </p>
            </div>
            <CandleChart series={bundle!.chart} mark={q.price} stop={brief.invalidation} target={brief.resistance} />
            <div className="flex flex-wrap gap-2 border-t border-[#e0e3eb] px-3 py-2 text-[11px] text-[#5f6368]">
              <span>RSI {brief.rsi == null ? "—" : brief.rsi.toFixed(1)}</span>
              <span>SMA20 {brief.sma20 == null ? "—" : brief.sma20.toFixed(1)}</span>
              <span>SMA50 {brief.sma50 == null ? "—" : brief.sma50.toFixed(1)}</span>
              <span>{brief.macd}</span>
              <span>Stoch {brief.stoch == null ? "—" : brief.stoch.toFixed(0)}</span>
              <span>Pivot {brief.pivot == null ? "—" : brief.pivot.toFixed(1)}</span>
            </div>
          </section>

          <div className="space-y-3">
            <Card title={hi ? "Level" : "Levels"}>
              <Row k={hi ? "Support" : "Support"} v={formatMoney(brief.support, q.currency)} />
              <Row k={hi ? "Resistance" : "Resistance"} v={formatMoney(brief.resistance, q.currency)} />
              <p className="mt-2 text-xs leading-relaxed text-muted">{brief.breakout}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{brief.volumeNote}</p>
            </Card>
            <Card title={hi ? "Plan" : "Plan"}>
              <Row k={hi ? "Invalidation" : "Invalidation"} v={formatMoney(brief.invalidation, q.currency)} />
              <Row k="R:R" v={brief.rr == null ? "—" : brief.rr.toFixed(1)} />
              <Row k={hi ? "Padhai score" : "Reading score"} v={`${brief.score}/100`} />
              <p className="mt-2 text-xs leading-relaxed text-muted">{brief.planReason}</p>
            </Card>
            <Card title={hi ? "Kyun hila" : "Why it moved"}>
              <p className="text-xs leading-relaxed text-muted">{brief.why}</p>
            </Card>
            <Link
              to="/trade"
              search={{ symbol: q.symbol, side: "buy" }}
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-fg"
            >
              {hi ? "Practice desk par kholo" : "Open on the practice desk"}
            </Link>
          </div>
        </div>
      ) : (
        <div className="h-80 animate-pulse rounded-xl bg-surface" />
      )}

      <section className="rounded-xl border border-border p-4">
        <h2 className="text-sm font-medium">{hi ? "Apni position paste karo" : "Paste your position"}</h2>
        <p className="mt-1 text-xs text-muted">
          {hi ? "Jaise: 1200 RELIANCE at 1258 — ya “970 CE, loss mein hu”." : "Like: 1200 RELIANCE at 1258 — or “970 CE, loss mein hu”."}
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
            className="h-11 min-w-0 flex-1 rounded-md border border-border bg-bg px-3 text-sm"
            placeholder="1200 RELIANCE at 1258"
          />
          <button type="button" onClick={readPosition} className="h-11 rounded-full bg-chip px-4 text-sm font-medium">
            {hi ? "Padho" : "Read it"}
          </button>
        </div>
        {posText ? <p className="mt-2 text-sm leading-relaxed">{posText}</p> : null}
        {busy ? <p className="mt-2 text-xs text-subtle">{hi ? "Tape padh rahe hain…" : "Reading the tape…"}</p> : null}
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-border p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-primary">7:00</p>
          <h2 className="mt-1 text-lg font-medium">{hi ? "Pre-market" : "Pre-market"}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex justify-between gap-3">
              <span className="text-muted">Nifty</span>
              <span className="tabular-nums">{nifty ? `${formatMoney(nifty.price, nifty.currency)} ${pct(nifty.changePct)}` : "—"}</span>
            </li>
            <li className="flex justify-between gap-3">
              <span className="text-muted">{hi ? "Raat ko US" : "Overnight US"}</span>
              <span className="tabular-nums">{us ? `${us.shortName} ${pct(us.changePct)}` : "—"}</span>
            </li>
            {nifty?.dayLow && nifty.dayHigh ? (
              <li className="flex justify-between gap-3">
                <span className="text-muted">{hi ? "Aaj ki range" : "Today’s range"}</span>
                <span className="tabular-nums">
                  {formatMoney(nifty.dayLow, "INR")} – {formatMoney(nifty.dayHigh, "INR")}
                </span>
              </li>
            ) : null}
          </ul>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted">
            {news.length
              ? news.map((n) => (
                  <li key={n.title}>
                    <a href={n.url} target="_blank" rel="noreferrer" className="hover:underline">
                      {n.title}
                    </a>
                  </li>
                ))
              : <li>{hi ? "Abhi headline nahi aayi." : "No headlines yet."}</li>}
          </ul>
        </section>
        <section className="rounded-xl border border-border p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-primary">{hi ? "Ravi raat" : "Sunday night"}</p>
          <h2 className="mt-1 text-lg font-medium">{hi ? "Hafte ke level" : "Monday’s levels"}</h2>
          {brief && q ? (
            <>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-muted">{hi ? "Hafte ka support" : "Week support"}</span><span className="tabular-nums">{formatMoney(brief.weekSupport, q.currency)}</span></li>
                <li className="flex justify-between"><span className="text-muted">{hi ? "Hafte ka resistance" : "Week resistance"}</span><span className="tabular-nums">{formatMoney(brief.weekResistance, q.currency)}</span></li>
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-muted">{brief.weekEvent}</p>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted">{hi ? "Pehle ek naam chuno." : "Pick a name first."}</p>
          )}
          <Link to="/plans" className="mt-4 inline-block text-sm text-primary hover:underline">
            {hi ? "Plan dekho" : "See the plan"}
          </Link>
        </section>
      </div>
      <p className="text-[11px] leading-relaxed text-subtle">
        {hi
          ? "Padhai ke liye. PlanVista SEBI ya RBI ke saath registered nahi hai, broker nahi hai, aur aapka paisa nahi rakhta. Score munafa ki sambhavna nahi hai."
          : "For learning. PlanVista is not registered with SEBI or RBI, is not a broker, and does not hold your money. The reading score is not a probability of profit."}
      </p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-border p-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <p className="flex justify-between gap-3 text-sm">
      <span className="text-muted">{k}</span>
      <span className="tabular-nums">{v}</span>
    </p>
  );
}
