import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Search,
  User,
} from "lucide-react";
import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TapeStamp } from "@/components/markets/TapeStamp";
import { useLiveRefresh } from "@/hooks/useLiveRefresh";
import { getNseDesk, getQuotes } from "@/lib/market/server";
import {
  NSE_CLOSE_IST,
  NSE_FNO_IST,
  NSE_FX_FUT_IST,
  NSE_FX_IST,
  type NseBoardStats,
  type NseContract,
  type NseCorporate,
  type NseFxFuture,
  type NseFxSpot,
  type NseIpoTracker,
  type NseOptionRow,
  type NseTurnoverRow,
} from "@/lib/market/nse-feed";
import type { ChartSeries, MarketQuote, NewsItem } from "@/lib/market/types";
import { cn, formatMoney, formatVol, pct, timeAgo } from "@/lib/utils";

type RangeKey = "1d" | "1mo" | "6mo" | "1y";
type SnapTab = "gainers" | "losers" | "value" | "volume";
type PageTab = "home" | "chain" | "data" | "invest";

const RANGES: { id: RangeKey; label: string }[] = [
  { id: "1d", label: "1D" },
  { id: "1mo", label: "1M" },
  { id: "6mo", label: "6M" },
  { id: "1y", label: "1Y" },
];

const UTILITY: { href?: string; to?: string; hash?: string; label: string }[] = [
  { hash: "cas", label: "CAS" },
  { hash: "option-chain", label: "Option Chain" },
  { hash: "turnover", label: "Market Turnover" },
  { hash: "ipo", label: "Listings" },
  { hash: "ipo", label: "IPO" },
  { hash: "headlines", label: "Circulars" },
  { to: "/report", label: "Daily Report" },
  { hash: "holidays", label: "Holidays" },
  { hash: "corporates", label: "Corporates" },
  { hash: "headlines", label: "Press Releases" },
  { to: "/learn", label: "Contact Us" },
];

const MAIN_NAV: { id: PageTab | "link"; label: string; to?: string; href?: string }[] = [
  { id: "home", label: "HOME" },
  { id: "link", label: "ABOUT", to: "/learn" },
  { id: "data", label: "MARKET DATA" },
  { id: "invest", label: "INVEST" },
  { id: "link", label: "LIST", to: "/learn" },
  { id: "link", label: "TRADE", to: "/chart-gpt" },
  { id: "link", label: "REGULATION", to: "/learn" },
  { id: "link", label: "LEARN", to: "/learn" },
  { id: "link", label: "RESOURCES", to: "/search" },
  { id: "link", label: "COMPLAINTS", href: "https://scores.sebi.gov.in/" },
  { id: "link", label: "RESEARCH", to: "/search" },
  { id: "link", label: "INVESTOR RELATIONS", to: "/progress" },
];

function inrNum(n: number, digits = 2) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function signed(n: number, digits = 2) {
  const v = n.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  return n > 0 ? `+${v}` : v;
}

function Tone({ n, children, className }: { n: number; children: ReactNode; className?: string }) {
  return <span className={cn(n >= 0 ? "text-up" : "text-down", className)}>{children}</span>;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function NseBoard() {
  const navigate = useNavigate();
  const [range, setRange] = useState<RangeKey>("1d");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<PageTab>("home");
  const [snap, setSnap] = useState<SnapTab>("gainers");
  const [heroIdx, setHeroIdx] = useState(0);
  const [nifty, setNifty] = useState<MarketQuote | null>(null);
  const [chart, setChart] = useState<ChartSeries | null>(null);
  const [openPx, setOpenPx] = useState<number | null>(null);
  const [prevClose, setPrevClose] = useState<number | null>(null);
  const [heroIndices, setHeroIndices] = useState<MarketQuote[]>([]);
  const [indices, setIndices] = useState<MarketQuote[]>([]);
  const [stocks, setStocks] = useState<MarketQuote[]>([]);
  const [boardStats, setBoardStats] = useState<NseBoardStats | null>(null);
  const [turnover, setTurnover] = useState<NseTurnoverRow[]>([]);
  const [turnoverTotal, setTurnoverTotal] = useState<NseTurnoverRow | null>(null);
  const [calls, setCalls] = useState<NseContract[]>([]);
  const [puts, setPuts] = useState<NseContract[]>([]);
  const [oiContracts, setOi] = useState<NseContract[]>([]);
  const [corporates, setCorporates] = useState<NseCorporate[]>([]);
  const [ipo, setIpo] = useState<NseIpoTracker | null>(null);
  const [fxSpot, setFxSpot] = useState<NseFxSpot[]>([]);
  const [fxFutures, setFxFutures] = useState<NseFxFuture[]>([]);
  const [optionChain, setOptionChain] = useState<NseOptionRow[]>([]);
  const [gift, setGift] = useState<{ name: string; ltp: number; change: number; changePct: number; asOf: string } | null>(null);
  const [niftyUsd, setNiftyUsd] = useState<{ name: string; ltp: number; change: number; changePct: number; asOf: string } | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [session, setSession] = useState({ open: false, label: "NSE closed" });
  const [asOf, setAsOf] = useState(0);
  const [source, setSource] = useState<"live" | "cached" | "simulated">("simulated");
  const [lastPrint, setLastPrint] = useState(NSE_CLOSE_IST);
  const [holidays, setHolidays] = useState<{ date: string; name: string; day: string; note?: string }[]>([]);
  const [busy, setBusy] = useState(true);
  const [tick, setTick] = useState(0);

  useLiveRefresh(() => {
    void getNseDesk({ data: { range, fresh: true } })
      .then((res) => {
        setNifty(res.nifty);
        setChart(res.niftyChart);
        setOpenPx(res.open);
        setPrevClose(res.prevClose ?? res.nifty.previousClose);
        setHeroIndices(res.heroIndices?.length ? res.heroIndices : res.indices.slice(0, 5));
        setIndices(res.indices);
        setStocks(res.stocks);
        setBoardStats(res.boardStats);
        setTurnover(res.turnover ?? []);
        setTurnoverTotal(res.turnoverTotal ?? null);
        setCalls(res.calls ?? []);
        setPuts(res.puts ?? []);
        setOi(res.oiContracts ?? []);
        setCorporates(res.corporates ?? []);
        setIpo(res.ipo ?? null);
        setFxSpot(res.fxSpot ?? []);
        setFxFutures(res.fxFutures ?? []);
        setOptionChain(res.optionChain ?? []);
        setGift(res.gift ?? null);
        setNiftyUsd(res.niftyUsd ?? null);
        setNews(res.news);
        setSession(res.session);
        setAsOf(res.asOf);
        setSource(res.source);
        setLastPrint(res.lastPrint || NSE_CLOSE_IST);
        if (res.holidays?.length) setHolidays(res.holidays);
      })
      .finally(() => setBusy(false));
  }, 20_000, [range, tick]);

  const liveSymbols = useRef<string[]>(["^NSEI", "^BSESN", "^NSEBANK", "^CNXIT", "^INDIAVIX"]);
  liveSymbols.current = [
    ...new Set([
      "^NSEI",
      "^BSESN",
      "^NSEBANK",
      "^CNXIT",
      "^INDIAVIX",
      ...(nifty ? [nifty.symbol] : []),
      ...heroIndices.map((q) => q.symbol),
      ...indices.map((q) => q.symbol),
      ...stocks.map((q) => q.symbol),
    ]),
  ].slice(0, 40);

  useLiveRefresh(() => {
    return getQuotes({ data: { symbols: liveSymbols.current } }).then((rows) => {
      if (!rows.length) return;
      const by = new Map(rows.map((q) => [q.symbol, q]));
      const patch = (q: MarketQuote) => {
        const n = by.get(q.symbol);
        return n
          ? { ...q, price: n.price, change: n.change, changePct: n.changePct, previousClose: n.previousClose, asOf: n.asOf, source: n.source }
          : q;
      };
      setNifty((q) => (q ? patch(q) : (by.get("^NSEI") ?? q)));
      setHeroIndices((list) => list.map(patch));
      setIndices((list) => list.map(patch));
      setStocks((list) => list.map(patch));
      const latest = rows.reduce((m, q) => Math.max(m, q.asOf || 0), 0);
      if (latest) setAsOf(latest);
      setSource("live");
    });
  }, 1000, []);

  const up = (nifty?.change ?? 0) >= 0;
  const q = query.trim().toLowerCase();
  const tape = useMemo(() => {
    const rows = q ? stocks.filter((s) => (s.shortName || s.name).toLowerCase().includes(q) || s.symbol.toLowerCase().includes(q)) : stocks;
    return rows.length ? [...rows, ...rows] : [];
  }, [stocks, q]);

  const gainers = useMemo(() => [...stocks].sort((a, b) => b.changePct - a.changePct).slice(0, 5), [stocks]);
  const losers = useMemo(() => [...stocks].sort((a, b) => a.changePct - b.changePct).slice(0, 5), [stocks]);
  const byValue = useMemo(
    () => [...stocks].sort((a, b) => (b.volume ?? 0) * b.price - (a.volume ?? 0) * a.price).slice(0, 5),
    [stocks],
  );
  const byVol = useMemo(() => [...stocks].sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0)).slice(0, 5), [stocks]);
  const snapRows = snap === "gainers" ? gainers : snap === "losers" ? losers : snap === "value" ? byValue : byVol;
  const visibleHero = heroIndices.slice(heroIdx, heroIdx + 5);
  const chartPts = chart?.points ?? [];

  function searchGo() {
    const text = query.trim();
    if (!text) return;
    const hit = stocks.find(
      (s) =>
        s.symbol.replace(/\.NS$/, "").toLowerCase() === text.toLowerCase() ||
        (s.shortName || "").toLowerCase().includes(text.toLowerCase()),
    );
    if (hit) {
      void navigate({ to: "/quote/$symbol", params: { symbol: hit.symbol } });
      return;
    }
    void navigate({ to: "/search", search: { q: text } });
  }

  function goHash(hash: string) {
    setTab(hash === "option-chain" ? "chain" : hash === "cas" || hash === "turnover" ? "data" : "home");
    window.setTimeout(() => scrollToId(hash), 50);
  }

  return (
    <div className="nse-desk min-h-screen bg-nse-wash text-nse-fg">
      <div className="bg-nse-bar text-[11px] text-nse-ink">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-2 px-3 py-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {UTILITY.map((u) =>
              u.to ? (
                <Link key={u.label} to={u.to} className="hover:underline">
                  {u.label}
                </Link>
              ) : (
                <button key={u.label} type="button" className="hover:underline" onClick={() => goHash(u.hash!)}>
                  {u.label}
                </button>
              ),
            )}
          </div>
          <div className="flex items-center gap-3">
            <select
              className="h-8 rounded-sm border border-nse-ink/30 bg-transparent px-2 text-[11px]"
              value={lang}
              onChange={(e) => setLang(e.target.value as "en" | "hi")}
              aria-label="Language"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
            <User className="size-4 opacity-80" />
            <Bell className="size-4 opacity-80" />
          </div>
        </div>
      </div>

      <header className="border-b border-nse-line bg-nse-card">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-3 px-3 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-sm bg-nse-bar text-nse-ink">
              <span className="text-xs font-bold leading-none">PV</span>
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold tracking-tight text-nse">NSE desk</span>
              <span className="block text-[10px] uppercase tracking-wide text-nse-muted">PlanVista classroom</span>
            </span>
          </Link>
          <form
            className="flex min-w-0 flex-1 overflow-hidden rounded-full border border-nse-line bg-nse-card"
            onSubmit={(e) => {
              e.preventDefault();
              searchGo();
            }}
          >
            <input
              className="h-11 min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
              placeholder="Search by Company name, Index or Symbol…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="grid size-11 place-items-center text-nse" aria-label="Search">
              <Search className="size-4" />
            </button>
          </form>
          <div className="flex w-full min-w-0 flex-wrap items-stretch gap-2 text-xs lg:w-auto">
            {nifty ? (
              <button type="button" className="min-w-[132px] rounded-sm border border-nse-line px-3 py-1.5 text-left" onClick={() => setTab("home")}>
                <span className="block text-[10px] font-semibold text-nse">Nifty 50</span>
                <span className="block font-bold tabular-nums">{inrNum(nifty.price)}</span>
                <Tone n={nifty.change} className="block tabular-nums">
                  {signed(nifty.change)} ({pct(nifty.changePct)})
                </Tone>
                <span className="block text-[10px] text-nse-muted">{lastPrint}</span>
              </button>
            ) : null}
            {niftyUsd ? (
              <div className="min-w-[132px] rounded-sm border border-nse-line px-3 py-1.5">
                <span className="block text-[10px] font-semibold text-nse">Nifty 50 USD</span>
                <span className="block font-bold tabular-nums">{inrNum(niftyUsd.ltp)}</span>
                <Tone n={niftyUsd.change} className="block tabular-nums">
                  {signed(niftyUsd.change)} ({niftyUsd.changePct.toFixed(2)}%)
                </Tone>
              </div>
            ) : null}
            {gift ? (
              <div className="min-w-[140px] rounded-sm border border-nse-line px-3 py-1.5">
                <span className="block text-[10px] font-semibold text-nse">GIFT Nifty</span>
                <span className="block font-bold tabular-nums">{inrNum(gift.ltp)}</span>
                <Tone n={gift.change} className="block tabular-nums">
                  {signed(gift.change)} ({gift.changePct.toFixed(2)}%)
                </Tone>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <nav className="border-b border-nse-line bg-nse-card">
        <div className="mx-auto flex max-w-[1280px] gap-1 overflow-x-auto px-2">
          {MAIN_NAV.map((item) => {
            const active = item.id !== "link" && tab === item.id;
            const cls = cn(
              "shrink-0 border-b-2 px-3 py-3 text-[12px] font-semibold tracking-wide",
              active ? "border-nse-gold text-nse" : "border-transparent text-nse-muted hover:text-nse",
            );
            if (item.href) {
              return (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className={cls}>
                  {item.label}
                </a>
              );
            }
            if (item.to) {
              return (
                <Link key={item.label} to={item.to} className={cls}>
                  {item.label}
                </Link>
              );
            }
            return (
              <button key={item.label} type="button" className={cls} onClick={() => setTab(item.id as PageTab)}>
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="overflow-hidden border-b border-nse-line bg-nse-card">
        <div className="flex w-max flex-nowrap animate-[ticker_70s_linear_infinite] py-2">
          {(tape.length ? tape : [{ symbol: "NIFTY", shortName: "NIFTY 50", price: 0, change: 0, changePct: 0, currency: "INR" } as MarketQuote]).map((s, i) => {
            const green = s.change >= 0;
            return (
              <Link
                key={`${s.symbol}-${i}`}
                to="/quote/$symbol"
                params={{ symbol: s.symbol }}
                className={cn(
                  "mx-1 inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-sm border border-nse-line px-3 text-xs",
                  green ? "border-l-4 border-l-up" : "border-l-4 border-l-down",
                )}
              >
                <span className="font-semibold">{(s.shortName || s.symbol.replace(/\.NS$/, "")).toUpperCase()}</span>
                <span className="tabular-nums">{inrNum(s.price)}</span>
                <Tone n={s.change} className="tabular-nums">
                  {signed(s.change)} ({pct(s.changePct)})
                </Tone>
              </Link>
            );
          })}
        </div>
      </div>

      {tab === "chain" ? (
        <OptionChainPanel
          nifty={nifty}
          lastPrint={lastPrint}
          rows={optionChain}
          onBack={() => setTab("home")}
        />
      ) : tab === "invest" ? (
        <InvestPanel lang={lang} />
      ) : (
        <>
          <section className="mx-auto max-w-[1280px] px-3 py-4">
            <div className="mb-3 flex items-center gap-2">
              <button type="button" className="grid size-8 place-items-center rounded-full border border-nse-line" onClick={() => setHeroIdx((n) => Math.max(0, n - 1))} aria-label="Previous indices">
                <ChevronLeft className="size-4" />
              </button>
              <div className="grid min-w-0 flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                {(visibleHero.length ? visibleHero : heroIndices).map((idx) => {
                  const green = idx.change >= 0;
                  return (
                    <button
                      key={idx.name}
                      type="button"
                      onClick={() => void navigate({ to: "/quote/$symbol", params: { symbol: idx.symbol } })}
                      className={cn(
                        "rounded-md border border-nse-line px-3 py-3 text-left",
                        green ? "bg-nse-green-soft" : "bg-nse-pink",
                      )}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-nse-muted">{idx.name}</p>
                      <p className="mt-1 text-lg font-bold tabular-nums">{inrNum(idx.price)}</p>
                      <Tone n={idx.change} className="text-xs tabular-nums">
                        {signed(idx.change)} ({pct(idx.changePct)})
                      </Tone>
                    </button>
                  );
                })}
              </div>
              <button type="button" className="grid size-8 place-items-center rounded-full border border-nse-line" onClick={() => setHeroIdx((n) => Math.min(Math.max(0, heroIndices.length - 5), n + 1))} aria-label="Next indices">
                <ChevronRight className="size-4" />
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-md border border-nse-line bg-nse-card p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h1 className="text-sm font-bold uppercase tracking-wide text-nse">NIFTY 50</h1>
                  <span className="text-[11px] text-nse-muted">Updated: {lastPrint}</span>
                </div>
                {nifty ? (
                  <>
                    <div className="mt-2 flex flex-wrap items-end gap-6">
                      <div>
                        <p className="text-3xl font-bold tabular-nums">{inrNum(nifty.price)}</p>
                        <Tone n={nifty.change} className="text-sm font-medium tabular-nums">
                          {signed(nifty.change)} ({pct(nifty.changePct)})
                        </Tone>
                      </div>
                      <LegendDot color="var(--color-nse-mid)" label="Open" value={openPx != null ? inrNum(openPx) : "—"} />
                      <LegendDot color="var(--color-up)" label="High" value={nifty.dayHigh != null ? inrNum(nifty.dayHigh) : "—"} />
                      <LegendDot color="var(--color-down)" label="Low" value={nifty.dayLow != null ? inrNum(nifty.dayLow) : "—"} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {RANGES.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRange(r.id)}
                          className={cn(
                            "h-8 rounded-full px-3 text-[11px] font-semibold",
                            range === r.id ? "bg-nse text-nse-ink" : "bg-nse-soft text-nse hover:bg-nse-line",
                          )}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                    <NiftyArea points={chartPts} up={up} />
                  </>
                ) : (
                  <p className="mt-8 text-sm text-nse-muted">{busy ? "Loading last print…" : "Tape unavailable."}</p>
                )}
                <div className="mt-3">
                  <TapeStamp
                    asOf={asOf}
                    source={source}
                    session={session.label}
                    label="NSE last print · refreshes on open"
                    busy={busy}
                    onRefresh={() => {
                      setBusy(true);
                      setTick((n) => n + 1);
                    }}
                  />
                </div>
              </div>

              <aside className="overflow-hidden rounded-md bg-nse-blue p-5 text-nse-ink">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-nse-gold">World Investor Week</p>
                <h2 className="mt-2 text-2xl font-bold leading-tight">
                  {lang === "hi" ? "समझ से निवेश आसान" : "Make investing simple — then take the next step."}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-nse-mist">
                  Classroom board for 5–11 Oct 2026. Mutual funds, stocks, REITs, InvITs, bonds, commodities — read first.
                  This desk is not the exchange and not SEBI-registered advice.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to="/learn" className="inline-flex h-10 items-center rounded-sm bg-nse-gold px-3 text-sm font-semibold text-nse-deep">
                    Open classroom
                  </Link>
                  <Link to="/chart-gpt" className="inline-flex h-10 items-center rounded-sm border border-nse-ink/40 px-3 text-sm">
                    Ask Chart GPT
                  </Link>
                </div>
              </aside>
            </div>
          </section>

          <section id="cas" className="mx-auto max-w-[1280px] px-3 pb-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold text-nse">Market Statistics</h2>
                  <span className="text-[11px] text-nse-muted">As on {boardStats?.asOf ?? NSE_CLOSE_IST}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <StatCard label="Stock Traded" value={boardStats ? inrInt(boardStats.traded) : "—"} />
                  <StatCard label="Advances" value={boardStats ? inrInt(boardStats.advances) : "—"} tone="up" />
                  <StatCard label="Declines" value={boardStats ? inrInt(boardStats.declines) : "—"} tone="down" />
                  <StatCard label="Unchanged" value={boardStats ? inrInt(boardStats.unchanged) : "—"} tone="warn" />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <StatCard label="No. of Stocks at 52 Week High" value={boardStats ? inrInt(boardStats.weekHigh) : "—"} tone="up" />
                  <StatCard label="No. of Stocks at 52 Week Low" value={boardStats ? inrInt(boardStats.weekLow) : "—"} tone="down" />
                  <StatCard label="No. of Stocks in Upper Circuit" value={boardStats ? inrInt(boardStats.upperCircuit) : "—"} tone="up" />
                  <StatCard label="No. of Stocks in Lower Circuit" value={boardStats ? inrInt(boardStats.lowerCircuit) : "—"} tone="down" />
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-md border border-nse-line bg-nse-card p-3">
                    <p className="text-[11px] text-nse-muted">Registered Client Accounts</p>
                    <p className="mt-1 text-xl font-bold tabular-nums text-nse">{boardStats ? inrInt(boardStats.clients) : "—"}</p>
                  </div>
                  <div className="rounded-md border border-nse-line bg-nse-card p-3">
                    <p className="text-[11px] text-nse-muted">Market Capitalization</p>
                    <p className="mt-1 text-lg font-bold text-nse">
                      ₹ Lac Crs {boardStats ? boardStats.mcapLacCr.toFixed(2) : "—"} | Tn $ {boardStats ? boardStats.mcapTnUsd.toFixed(2) : "—"}
                    </p>
                    <p className="text-[11px] text-nse-muted">{boardStats?.asOf}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between rounded-md border border-nse px-3 py-2 text-sm">
                  <span className="font-medium text-nse">Avg Order Ack Latency (nanoseconds)</span>
                  <span className="font-bold tabular-nums">{boardStats?.ackLatencyNs ?? "—"}</span>
                </div>
              </div>

              <div id="turnover">
                <div className="mb-2 flex items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold text-nse">Market Turnover</h2>
                  <span className="text-[11px] text-nse-muted">As on {boardStats?.asOf?.slice(0, 11) ?? "07-Oct-2026"}</span>
                </div>
                <div className="overflow-x-auto rounded-md border border-nse-line bg-nse-card">
                  <table className="w-full min-w-[520px] text-xs">
                    <thead className="bg-nse text-nse-ink">
                      <tr>
                        <th className="px-3 py-2.5 text-left font-medium">Products</th>
                        <th className="px-3 py-2.5 text-right font-medium">Volume</th>
                        <th className="px-3 py-2.5 text-right font-medium">Value (₹ Crores)</th>
                        <th className="px-3 py-2.5 text-right font-medium">Open Interest</th>
                        <th className="px-3 py-2.5 text-right font-medium">Updated at</th>
                      </tr>
                    </thead>
                    <tbody>
                      {turnover.map((row) => (
                        <tr key={row.product} className="border-t border-nse-line">
                          <td className="px-3 py-2 font-medium">{row.product}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{row.volume}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{row.value}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{row.oi}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{row.updatedAt}</td>
                        </tr>
                      ))}
                      {turnoverTotal ? (
                        <tr className="border-t-2 border-nse bg-nse-soft font-semibold">
                          <td className="px-3 py-2">{turnoverTotal.product}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{turnoverTotal.volume}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{turnoverTotal.value}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{turnoverTotal.oi}</td>
                          <td className="px-3 py-2" />
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1280px] px-3 pb-6">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <a
                href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13"
                target="_blank"
                rel="noreferrer"
                className="overflow-hidden rounded-md bg-nse-blue p-5 text-nse-ink"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-nse-gold">Investor caution</p>
                <p className="mt-2 text-lg font-bold">Fake apps often look real.</p>
                <p className="mt-2 text-sm leading-relaxed text-nse-mist">
                  Download apps only from the verified list on the SEBI website. PlanVista does not take orders or money.
                </p>
              </a>
              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-nse">Market Snapshot</h2>
                  <button type="button" className="text-xs text-nse hover:underline" onClick={() => setTab("data")}>
                    View more
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 border-b border-nse-line text-sm">
                  {(
                    [
                      ["gainers", "Gainers"],
                      ["losers", "Losers"],
                      ["value", "Most Active (Value)"],
                      ["volume", "Most Active (Volume)"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSnap(id)}
                      className={cn(
                        "border-b-2 px-1 py-2 text-xs font-semibold",
                        snap === id ? "border-nse-gold text-nse" : "border-transparent text-nse-muted",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-xs">
                    <thead className="bg-nse text-nse-ink">
                      <tr>
                        <th className="px-3 py-2.5 text-left font-medium">Symbol</th>
                        <th className="px-3 py-2.5 text-right font-medium">LTP</th>
                        <th className="px-3 py-2.5 text-right font-medium">Chng</th>
                        <th className="px-3 py-2.5 text-right font-medium">%Chng</th>
                        <th className="px-3 py-2.5 text-right font-medium">Volume (Lakhs)</th>
                        <th className="px-3 py-2.5 text-right font-medium">Value (₹ Crores)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {snapRows.map((s) => {
                        const green = s.change >= 0;
                        const volL = (s.volume ?? 0) / 1e5;
                        const valCr = ((s.volume ?? 0) * s.price) / 1e7;
                        return (
                          <tr key={s.symbol} className="border-b border-nse-line">
                            <td className="px-3 py-2">
                              <Link to="/quote/$symbol" params={{ symbol: s.symbol }} className="font-semibold hover:text-nse">
                                {s.symbol.replace(/\.NS$/, "").toUpperCase()}
                              </Link>
                            </td>
                            <td className="px-3 py-2 text-right tabular-nums font-semibold">{inrNum(s.price)}</td>
                            <td className={cn("px-3 py-2 text-right tabular-nums", green ? "text-up" : "text-down")}>{signed(s.change)}</td>
                            <td className={cn("px-3 py-2 text-right tabular-nums", green ? "text-up" : "text-down")}>{(s.changePct * 100).toFixed(2)}</td>
                            <td className="px-3 py-2 text-right tabular-nums">{volL ? volL.toFixed(2) : "—"}</td>
                            <td className="px-3 py-2 text-right tabular-nums">{valCr ? valCr.toFixed(2) : "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="mt-1 text-[11px] text-nse-muted">Data shown above represents only Nifty 50 stocks.</p>
              </div>
            </div>
          </section>

          <section id="option-chain" className="mx-auto max-w-[1280px] px-3 pb-6">
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold text-nse">Most Active Contracts</h2>
              <span className="text-[11px] text-nse-muted">As on {NSE_FNO_IST}</span>
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              <ContractTable title="Most Active Calls" rows={calls} />
              <ContractTable title="Most Active Puts" rows={puts} />
              <ContractTable title="Most Active Contracts by OI" rows={oiContracts} />
            </div>
            <button type="button" className="mt-3 text-sm font-semibold text-nse hover:underline" onClick={() => setTab("chain")}>
              Open full option chain →
            </button>
          </section>

          <section className="mx-auto max-w-[1280px] px-3 pb-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <div id="corporates" className="rounded-md border border-nse-line bg-nse-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-nse">Corporate Info</h2>
                  <Link to="/search" className="text-xs text-nse hover:underline">View more</Link>
                </div>
                <p className="mb-2 text-xs font-semibold text-nse">Corporate Announcement</p>
                <ul className="divide-y divide-nse-line">
                  {corporates.map((c) => (
                    <li key={c.symbol + c.at} className="flex items-start justify-between gap-3 py-3">
                      <div>
                        <p className="text-sm font-semibold">
                          {c.name} ({c.symbol})
                        </p>
                        <p className="text-xs text-nse-muted">Subject : {c.subject}</p>
                        <p className="text-[11px] text-nse-muted">Broadcast Date : {c.at}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-sm border border-nse-line px-2 py-1 text-[10px] text-nse-muted">
                        <FileText className="size-3.5" />
                        PDF {c.size}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div id="ipo" className="rounded-md border border-nse-line bg-nse-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-nse">IPO Tracker</h2>
                  <Link to="/learn" className="text-xs text-nse hover:underline">How an IPO works</Link>
                </div>
                {ipo ? (
                  <div className="grid grid-cols-2 gap-2">
                    <IpoCard value={ipo.year} label="IPOs in the Year" tone="soft" />
                    <IpoCard value={ipo.sme} label="IPOs on NSE SME Segment" tone="soft" />
                    <IpoCard value={ipo.gainIssue} label="IPOs in Gain w.r.t. issue Price" tone="up" />
                    <IpoCard value={ipo.lossIssue} label="IPOs in Loss w.r.t. issue Price" tone="down" />
                    <IpoCard value={ipo.gainListing} label="IPOs in Gain on Listing Date" tone="up" />
                    <IpoCard value={ipo.lossListing} label="IPOs in Loss on Listing Date" tone="down" />
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1280px] px-3 pb-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <h2 className="text-lg font-semibold text-nse">Reference Rates</h2>
                  <span className="text-[11px] text-nse-muted">As on {NSE_FX_IST}</span>
                </div>
                <div className="overflow-x-auto rounded-md border border-nse-line bg-nse-card">
                  <table className="w-full min-w-[480px] text-xs">
                    <thead className="bg-nse text-nse-ink">
                      <tr>
                        <th className="px-3 py-2.5 text-left font-medium">Currency</th>
                        <th className="px-3 py-2.5 text-left font-medium">Unit</th>
                        <th className="px-3 py-2.5 text-right font-medium">Today's value</th>
                        <th className="px-3 py-2.5 text-right font-medium">Previous day value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fxSpot.map((r) => (
                        <tr key={r.code} className="border-t border-nse-line">
                          <td className="px-3 py-2 font-semibold">{r.name}</td>
                          <td className="px-3 py-2">{r.unit}</td>
                          <td className="px-3 py-2 text-right tabular-nums">₹ {r.today.toFixed(4)}</td>
                          <td className="px-3 py-2 text-right tabular-nums">₹ {r.previous.toFixed(4)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <h2 className="text-lg font-semibold text-nse">Currency Snapshot</h2>
                  <span className="text-[11px] text-nse-muted">As on {NSE_FX_FUT_IST}</span>
                </div>
                <div className="overflow-x-auto rounded-md border border-nse-line bg-nse-card">
                  <table className="w-full min-w-[560px] text-xs">
                    <thead className="bg-nse text-nse-ink">
                      <tr>
                        <th className="px-3 py-2.5 text-left font-medium">Contracts</th>
                        <th className="px-3 py-2.5 text-right font-medium">LTP</th>
                        <th className="px-3 py-2.5 text-right font-medium">%Chng</th>
                        <th className="px-3 py-2.5 text-right font-medium">Volume</th>
                        <th className="px-3 py-2.5 text-right font-medium">Turnover (₹ Crores)</th>
                        <th className="px-3 py-2.5 text-right font-medium">Open Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fxFutures.map((r) => (
                        <tr key={r.contract} className="border-t border-nse-line">
                          <td className="px-3 py-2 font-medium">{r.contract}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{r.ltp.toFixed(4)}</td>
                          <td className={cn("px-3 py-2 text-right tabular-nums", r.changePct >= 0 ? "text-up" : "text-down")}>
                            {r.changePct.toFixed(4)}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums">{r.volume.toLocaleString("en-IN")}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{r.turnoverCr.toLocaleString("en-IN")}</td>
                          <td className="px-3 py-2 text-right tabular-nums">{r.oi.toLocaleString("en-IN")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section id="holidays" className="mx-auto max-w-[1280px] px-3 pb-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-md border border-nse-line bg-nse-card p-4">
                <h2 className="text-lg font-semibold text-nse">Holidays</h2>
                <p className="mt-1 text-xs text-nse-muted">Next NSE capital-market holidays. Session Mon–Fri, 9:15–15:30 IST.</p>
                <ul className="mt-3 divide-y divide-nse-line">
                  {holidays.map((h) => (
                    <li key={h.date} className="flex items-baseline justify-between gap-3 py-2.5">
                      <span>
                        <span className="block text-sm font-medium">{h.name}</span>
                        {h.note ? <span className="text-[11px] text-nse-muted">{h.note}</span> : null}
                      </span>
                      <span className="text-sm tabular-nums text-nse">
                        {h.date.slice(8)}/{h.date.slice(5, 7)}
                        <span className="ml-1 text-[11px] text-nse-muted">{h.day}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div id="headlines" className="rounded-md border border-nse-line bg-nse-card p-4">
                <h2 className="text-lg font-semibold text-nse">Circulars & press</h2>
                <ul className="mt-3 space-y-3">
                  {news.slice(0, 5).map((item) => (
                    <li key={item.url + item.title}>
                      <a href={item.url || "#"} target="_blank" rel="noreferrer" className="block hover:text-nse">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-nse-accent">{item.source}</p>
                        <p className="mt-0.5 text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-nse-muted">{item.published ? timeAgo(item.published) : ""}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {tab === "data" ? (
            <section className="mx-auto max-w-[1280px] px-3 pb-6">
              <h2 className="text-lg font-semibold text-nse">All indices</h2>
              <div className="mt-3 overflow-x-auto rounded-md border border-nse-line bg-nse-card">
                <table className="w-full min-w-[480px] text-sm">
                  <thead className="bg-nse text-nse-ink">
                    <tr>
                      <th className="px-3 py-2.5 text-left font-medium">Index</th>
                      <th className="px-3 py-2.5 text-right font-medium">LTP</th>
                      <th className="px-3 py-2.5 text-right font-medium">Chng</th>
                      <th className="px-3 py-2.5 text-right font-medium">%Chng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {indices.map((i) => (
                      <tr key={i.name} className="border-t border-nse-line">
                        <td className="px-3 py-2.5 font-medium">{i.name}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums">{inrNum(i.price)}</td>
                        <td className={cn("px-3 py-2.5 text-right tabular-nums", i.change >= 0 ? "text-up" : "text-down")}>{signed(i.change)}</td>
                        <td className={cn("px-3 py-2.5 text-right tabular-nums", i.change >= 0 ? "text-up" : "text-down")}>{pct(i.changePct)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-nse-muted">
                Nifty 50 names this session: {formatVol(stocks.reduce((m, s) => m + (s.volume ?? 0), 0))} volume across {stocks.length} last prints.
                Full-board counts above are the exchange-wide print, not just Nifty 50.
              </p>
            </section>
          ) : null}
        </>
      )}

      <footer className="bg-nse-deep py-10 text-nse-mist">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-3 sm:grid-cols-2 lg:grid-cols-5">
          <FooterCol
            title="Equity"
            links={[
              ["Live market", "/markets"],
              ["NSE desk", "/nse"],
              ["Deep search", "/search"],
              ["Chart GPT", "/chart-gpt"],
            ]}
          />
          <FooterCol
            title="Learn"
            links={[
              ["Classroom", "/learn"],
              ["Risk quiz", "/quiz"],
              ["Knowledge gate", "/gate"],
              ["How to read a chart", "/chart-gpt"],
            ]}
          />
          <FooterCol
            title="Plan"
            links={[
              ["SIP calculator", "/sip"],
              ["Goals", "/planner"],
              ["Portfolio", "/portfolio"],
              ["Analytics", "/analytics"],
            ]}
          />
          <div>
            <p className="font-semibold text-nse-ink">Official sites</p>
            <div className="mt-2 flex flex-col gap-1.5 text-sm">
              <a href="https://www.nseindia.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-nse-ink">
                nseindia.com <ExternalLink className="size-3" />
              </a>
              <a href="https://www.sebi.gov.in/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-nse-ink">
                sebi.gov.in <ExternalLink className="size-3" />
              </a>
              <a href="https://scores.sebi.gov.in/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-nse-ink">
                SCORES complaints <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-nse-ink">Session</p>
            <p className="mt-2 text-sm">{session.label}</p>
            <p className="text-xs">{prevClose != null ? `Prev close ${formatMoney(prevClose, "INR")}` : lastPrint}</p>
            <p className="mt-3 text-[11px] leading-relaxed">
              Unofficial classroom board. Not the National Stock Exchange of India, not a broker, not SEBI-registered
              advice. Full-board statistics, turnover, F&O and IPO cards are the last official homepage print; Nifty 50
              tape refreshes whenever you open this page.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function inrInt(n: number) {
  return n.toLocaleString("en-IN");
}

function LegendDot({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <span className="text-xs">
      <span className="mr-1 inline-block size-2 rounded-full" style={{ background: color }} />
      <span className="text-nse-muted">{label} </span>
      <span className="font-medium tabular-nums">{value}</span>
    </span>
  );
}

function NiftyArea({ points, up }: { points: { t: number; close: number }[]; up: boolean }) {
  const data = points.map((p) => ({
    t: p.t,
    close: p.close,
    label: new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(p.t),
  }));
  if (!data.length) return <div className="mt-3 h-52 rounded-sm bg-nse-wash" />;
  const stroke = up ? "var(--color-up)" : "var(--color-down)";
  return (
    <div className="mt-3 h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="nseFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-nse-chart)" stopOpacity={0.85} />
              <stop offset="100%" stopColor="var(--color-nse-chart)" stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--color-nse-muted)" }} interval="preserveStartEnd" />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 10, fill: "var(--color-nse-muted)" }}
            width={56}
            tickFormatter={(v: number) => v.toLocaleString("en-IN")}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 6 }}
            formatter={(v) => [typeof v === "number" ? inrNum(v) : String(v), "Nifty"]}
          />
          <Area type="monotone" dataKey="close" stroke={stroke} fill="url(#nseFill)" strokeWidth={1.6} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone?: "up" | "down" | "warn" }) {
  return (
    <div className="relative overflow-hidden rounded-md border border-nse-line bg-nse-card p-3">
      <span
        className={cn(
          "absolute right-0 top-0 size-0 border-t-[18px] border-l-[18px] border-l-transparent",
          tone === "up" ? "border-t-up" : tone === "down" ? "border-t-down" : tone === "warn" ? "border-t-nse-gold" : "border-t-nse",
        )}
      />
      <p className="pr-3 text-[11px] text-nse-muted">{label}</p>
      <p className={cn("mt-1 text-2xl font-bold tabular-nums", tone === "up" ? "text-up" : tone === "down" ? "text-down" : "text-nse-fg")}>{value}</p>
    </div>
  );
}

function ContractTable({ title, rows }: { title: string; rows: NseContract[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-nse-line bg-nse-card">
      <h3 className="px-3 pt-3 text-sm font-semibold text-nse">{title}</h3>
      <table className="mt-2 w-full min-w-[280px] text-xs">
        <thead className="bg-nse text-nse-ink">
          <tr>
            <th className="px-2 py-2 text-left font-medium">Contract</th>
            <th className="px-2 py-2 text-right font-medium">LTP</th>
            <th className="px-2 py-2 text-right font-medium">Chng</th>
            <th className="px-2 py-2 text-right font-medium">%Chng</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.contract} className="border-t border-nse-line">
              <td className="px-2 py-2 font-medium">{r.contract}</td>
              <td className="px-2 py-2 text-right tabular-nums">{inrNum(r.ltp)}</td>
              <td className={cn("px-2 py-2 text-right tabular-nums", r.change >= 0 ? "text-up" : "text-down")}>{signed(r.change)}</td>
              <td className={cn("px-2 py-2 text-right tabular-nums", r.change >= 0 ? "text-up" : "text-down")}>{r.changePct.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IpoCard({ value, label, tone }: { value: number; label: string; tone: "up" | "down" | "soft" }) {
  return (
    <div
      className={cn(
        "rounded-md p-3",
        tone === "up" ? "bg-nse-green-soft" : tone === "down" ? "bg-nse-pink" : "bg-nse-soft",
      )}
    >
      <p className={cn("text-2xl font-bold tabular-nums", tone === "up" ? "text-up" : tone === "down" ? "text-down" : "text-nse")}>{value}</p>
      <p className="mt-1 text-[11px] text-nse-muted">{label}</p>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="font-semibold text-nse-ink">{title}</p>
      <div className="mt-2 flex flex-col gap-1.5 text-sm">
        {links.map(([label, to]) => (
          <Link key={to + label} to={to} className="hover:text-nse-ink">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function OptionChainPanel({
  nifty,
  lastPrint,
  rows,
  onBack,
}: {
  nifty: MarketQuote | null;
  lastPrint: string;
  rows: NseOptionRow[];
  onBack: () => void;
}) {
  return (
    <section className="mx-auto max-w-[1280px] px-3 py-5">
      <button type="button" className="mb-3 text-sm font-semibold text-nse" onClick={onBack}>
        ← Home
      </button>
      <h1 className="text-lg font-bold text-nse">Option Chain (Equity Derivatives)</h1>
      <p className="mt-1 text-sm text-nse-muted">
        Underlying index : NIFTY {nifty ? inrNum(nifty.price) : "—"} · As on {lastPrint} · Expiry 13-Oct-2026
      </p>
      <p className="mt-1 text-xs text-nse-muted">
        Last session print around ATM. Education only — this is not a live broker chain and not a buy/sell signal.
      </p>
      <div className="mt-4 overflow-x-auto rounded-md border border-nse-line bg-nse-card">
        <table className="w-full min-w-[720px] text-xs">
          <thead className="bg-nse text-nse-ink">
            <tr>
              <th colSpan={4} className="px-2 py-2 text-center font-medium">Calls</th>
              <th className="px-2 py-2">Strike</th>
              <th colSpan={4} className="px-2 py-2 text-center font-medium">Puts</th>
            </tr>
            <tr className="bg-nse-mid">
              <th className="px-2 py-2">LTP</th>
              <th className="px-2 py-2">Chng</th>
              <th className="px-2 py-2">Bid</th>
              <th className="px-2 py-2">Ask</th>
              <th className="px-2 py-2">Strike</th>
              <th className="px-2 py-2">Bid</th>
              <th className="px-2 py-2">Ask</th>
              <th className="px-2 py-2">LTP</th>
              <th className="px-2 py-2">Chng</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.strike} className="border-t border-nse-line">
                <td className="px-2 py-2 text-right tabular-nums">{r.callLtp != null ? inrNum(r.callLtp) : "—"}</td>
                <td className={cn("px-2 py-2 text-right tabular-nums", (r.callChg ?? 0) >= 0 ? "text-up" : "text-down")}>
                  {r.callChg != null ? signed(r.callChg) : "—"}
                </td>
                <td className="px-2 py-2 text-right tabular-nums">{r.callBid ?? "—"}</td>
                <td className="px-2 py-2 text-right tabular-nums">{r.callAsk ?? "—"}</td>
                <td className="px-2 py-2 text-center font-bold text-nse">{inrNum(r.strike, 2)}</td>
                <td className="px-2 py-2 text-right tabular-nums">{r.putBid ?? "—"}</td>
                <td className="px-2 py-2 text-right tabular-nums">{r.putAsk ?? "—"}</td>
                <td className="px-2 py-2 text-right tabular-nums">{r.putLtp != null ? inrNum(r.putLtp) : "—"}</td>
                <td className={cn("px-2 py-2 text-right tabular-nums", (r.putChg ?? 0) >= 0 ? "text-up" : "text-down")}>
                  {r.putChg != null ? signed(r.putChg) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function InvestPanel({ lang }: { lang: "en" | "hi" }) {
  return (
    <section className="mx-auto max-w-[880px] px-3 py-8">
      <h1 className="text-2xl font-bold text-nse">{lang === "hi" ? "निवेश से पहले पढ़ें" : "Invest — after you can read the tape"}</h1>
      <p className="mt-3 text-sm leading-relaxed text-nse-fg">
        This desk shows the last NSE homepage print so you can practise. It does not open a trading account, collect
        money, or give tips. Use the classroom, then a SEBI-registered intermediary if you invest.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link to="/learn" className="rounded-md border border-nse-line bg-nse-card p-4 hover:border-nse">
          <h2 className="font-semibold text-nse">Classroom</h2>
          <p className="mt-1 text-xs text-nse-muted">Shares, SIPs, stops, IPO basics — short pages.</p>
        </Link>
        <Link to="/quiz" className="rounded-md border border-nse-line bg-nse-card p-4 hover:border-nse">
          <h2 className="font-semibold text-nse">Risk quiz</h2>
          <p className="mt-1 text-xs text-nse-muted">Sign in every time you open it. 18+ · education only.</p>
        </Link>
        <Link to="/sip" className="rounded-md border border-nse-line bg-nse-card p-4 hover:border-nse">
          <h2 className="font-semibold text-nse">SIP calculator</h2>
          <p className="mt-1 text-xs text-nse-muted">See how a monthly amount can grow. Not a product sale.</p>
        </Link>
        <Link to="/chart-gpt" className="rounded-md border border-nse-line bg-nse-card p-4 hover:border-nse">
          <h2 className="font-semibold text-nse">Chart GPT</h2>
          <p className="mt-1 text-xs text-nse-muted">Ask how to read today's candle. No buy/sell calls.</p>
        </Link>
      </div>
    </section>
  );
}
