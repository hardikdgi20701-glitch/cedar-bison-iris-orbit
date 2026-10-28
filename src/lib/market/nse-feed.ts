import { nseSession, upcomingNseHolidays } from "./universe";
import type { ChartPoint, ChartSeries, MarketQuote, QuoteRange } from "./types";
import {
  HERO_INDEX_IDS,
  NSE_ACTIVE_CALLS,
  NSE_ACTIVE_OI,
  NSE_ACTIVE_PUTS,
  NSE_BOARD_STATS,
  NSE_CLOSE_IST,
  NSE_CORPORATES,
  NSE_FNO_IST,
  NSE_FX_FUT_IST,
  NSE_FX_FUTURES,
  NSE_FX_IST,
  NSE_FX_SPOT,
  NSE_GIFT,
  NSE_IPO,
  NSE_NIFTY_USD,
  NSE_OHLC,
  NSE_OPTION_CHAIN,
  NSE_SESSION_DATE,
  NSE_TURNOVER,
  NSE_TURNOVER_TOTAL,
  type NseBoardStats,
  type NseContract,
  type NseCorporate,
  type NseFxFuture,
  type NseFxSpot,
  type NseIpoTracker,
  type NseOptionRow,
  type NseTurnoverRow,
} from "./nse-session";

export type {
  NseBoardStats,
  NseContract,
  NseCorporate,
  NseFxFuture,
  NseFxSpot,
  NseIpoTracker,
  NseOptionRow,
  NseTurnoverRow,
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

const MC = "https://appfeeds.moneycontrol.com/jsonapi/market";
const MC_PRICE = "https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia";

export type NseFeedKind = "nse" | "nse-relay" | "yahoo";

export type NseDeskBundle = {
  nifty: MarketQuote;
  niftyChart: ChartSeries;
  open: number | null;
  high: number | null;
  low: number | null;
  prevClose: number | null;
  indices: MarketQuote[];
  heroIndices: MarketQuote[];
  stocks: MarketQuote[];
  book: { sector: string; names: number; volume: number; value: number }[];
  stats: {
    traded: number;
    advances: number;
    declines: number;
    unchanged: number;
    weekHigh: number;
    weekLow: number;
    volume: number;
    value: number;
  };
  boardStats: NseBoardStats;
  turnover: NseTurnoverRow[];
  turnoverTotal: NseTurnoverRow;
  calls: NseContract[];
  puts: NseContract[];
  oiContracts: NseContract[];
  corporates: NseCorporate[];
  ipo: NseIpoTracker;
  fxSpot: NseFxSpot[];
  fxFutures: NseFxFuture[];
  optionChain: NseOptionRow[];
  gift: typeof NSE_GIFT;
  niftyUsd: typeof NSE_NIFTY_USD;
  vix: MarketQuote | null;
  session: { open: boolean; label: string };
  asOf: number;
  source: "live" | "cached";
  feed: NseFeedKind;
  lastPrint: string;
  holidays: { date: string; name: string; day: string; note?: string }[];
};

const INDEX_IDS: { id: number; yahoo: string }[] = [
  { id: 9, yahoo: "^NSEI" },
  { id: 6, yahoo: "NSE:NEXT50" },
  { id: 23, yahoo: "^NSEBANK" },
  { id: 47, yahoo: "NSE:FINSERVICE" },
  { id: 128, yahoo: "NSE:MIDSELECT" },
  { id: 4, yahoo: "^BSESN" },
  { id: 19, yahoo: "^CNXIT" },
  { id: 52, yahoo: "^CNXAUTO" },
  { id: 41, yahoo: "^CNXPHARMA" },
  { id: 39, yahoo: "^CNXFMCG" },
  { id: 38, yahoo: "^CNXENERGY" },
  { id: 36, yahoo: "^INDIAVIX" },
  { id: 7, yahoo: "NSE:NIFTY500" },
  { id: 53, yahoo: "NSE:SMALLCAP" },
];

const SLUG_TO_YAHOO: Record<string, string> = {
  adanienterprises: "ADANIENT.NS",
  adaniportsspecialeconomiczone: "ADANIPORTS.NS",
  apollohospitalsenterprises: "APOLLOHOSP.NS",
  asianpaints: "ASIANPAINT.NS",
  axisbank: "AXISBANK.NS",
  bajajauto: "BAJAJ-AUTO.NS",
  bajajfinance: "BAJFINANCE.NS",
  bajajfinserv: "BAJAJFINSV.NS",
  bharatelectronics: "BEL.NS",
  bhartiairtel: "BHARTIARTL.NS",
  bselimited: "BSE.NS",
  cipla: "CIPLA.NS",
  coalindia: "COALINDIA.NS",
  drreddyslaboratories: "DRREDDY.NS",
  eichermotors: "EICHERMOT.NS",
  eternal: "ETERNAL.NS",
  grasimindustries: "GRASIM.NS",
  hcltechnologies: "HCLTECH.NS",
  hdfcbank: "HDFCBANK.NS",
  hdfclifeinsurancecompany: "HDFCLIFE.NS",
  hindalcoindustries: "HINDALCO.NS",
  hindustanunilever: "HINDUNILVR.NS",
  icicibank: "ICICIBANK.NS",
  infosys: "INFY.NS",
  interglobeaviation: "INDIGO.NS",
  itc: "ITC.NS",
  jiofinancialservices: "JIOFIN.NS",
  jswsteel: "JSWSTEEL.NS",
  kotakmahindrabank: "KOTAKBANK.NS",
  larsentoubro: "LT.NS",
  mahindramahindra: "M&M.NS",
  marutisuzukiindia: "MARUTI.NS",
  maxhealthcareinstitute: "MAXHEALTH.NS",
  nestleindia: "NESTLEIND.NS",
  ntpc: "NTPC.NS",
  oilnaturalgascorporation: "ONGC.NS",
  powergridcorporationindia: "POWERGRID.NS",
  relianceindustries: "RELIANCE.NS",
  statebankindia: "SBIN.NS",
  sbilifeinsurancecompany: "SBILIFE.NS",
  shriramfinance: "SHRIRAMFIN.NS",
  sunpharmaceuticalindustries: "SUNPHARMA.NS",
  tataconsumerproducts: "TATACONSUM.NS",
  tatasteel: "TATASTEEL.NS",
  tataconsultancyservices: "TCS.NS",
  techmahindra: "TECHM.NS",
  titancompany: "TITAN.NS",
  tatamotorspassengervehicles: "TATAMOTORS.NS",
  trent: "TRENT.NS",
  ultratechcement: "ULTRACEMCO.NS",
};

const RANGE_TO_MC: Record<QuoteRange, string> = {
  "1d": "1d",
  "5d": "5d",
  "1mo": "1m",
  "6mo": "6m",
  ytd: "1y",
  "1y": "1y",
  "5y": "max",
  max: "max",
};

function num(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v !== "string") return 0;
  const n = Number(v.replace(/,/g, "").replace(/%/g, "").trim());
  return Number.isFinite(n) ? n : 0;
}

function vol(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return 0;
  const s = v.toLowerCase().replace(/,/g, "").trim();
  const m = s.match(/^(-?[\d.]+)\s*([kmb])?$/);
  if (!m) return num(s);
  const n = Number(m[1]);
  const u = m[2];
  return n * (u === "k" ? 1e3 : u === "m" ? 1e6 : u === "b" ? 1e9 : 1);
}

async function getJson(url: string, extra: Record<string, string> = {}): Promise<unknown> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "application/json,text/plain,*/*",
      "Accept-Language": "en-IN,en;q=0.9",
      Referer: extra.Referer ?? "https://www.moneycontrol.com/markets/indian-indices/",
      ...extra,
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

type McIndex = {
  stkexchg?: string;
  exchange?: string;
  lastprice?: string;
  change?: string;
  percentchange?: string;
  open?: string;
  high?: string;
  low?: string;
  prevclose?: string;
  yearlyhigh?: string;
  yearlylow?: string;
  lastupdated?: string;
  epoch_time?: number;
  market_state?: string;
  bridgesymbol?: string;
};

function quoteFromIndex(row: McIndex, yahoo: string, asOf: number): MarketQuote | null {
  const name = row.stkexchg?.trim();
  const price = num(row.lastprice);
  if (!name || !price) return null;
  const prev = num(row.prevclose) || price;
  const change = num(row.change) || price - prev;
  const changePct = (num(row.percentchange) || (prev ? (change / prev) * 100 : 0)) / 100;
  const state = String(row.market_state || "").toLowerCase() === "open" ? "open" : "closed";
  return {
    symbol: yahoo,
    name,
    shortName: name,
    exchange: row.exchange || "NSE",
    currency: "INR",
    price,
    previousClose: prev,
    change,
    changePct,
    dayHigh: num(row.high) || null,
    dayLow: num(row.low) || null,
    volume: null,
    fiftyTwoWeekHigh: num(row.yearlyhigh) || null,
    fiftyTwoWeekLow: num(row.yearlylow) || null,
    spark: [],
    marketState: state,
    asOf,
    source: "live",
  };
}

type McStock = {
  shortname?: string;
  lastvalue?: string;
  change?: string;
  percentchange?: string;
  volume?: string;
  mktcap?: string;
  url?: string;
};

function slugFromUrl(url?: string) {
  if (!url) return "";
  const parts = url.replace(/\/+$/, "").split("/").filter(Boolean);
  return (parts.at(-2) ?? parts.at(-1) ?? "").toLowerCase();
}

function quoteFromStock(row: McStock, asOf: number, open: boolean): MarketQuote | null {
  const name = row.shortname?.trim();
  const price = num(row.lastvalue);
  if (!name || !price) return null;
  const change = num(row.change);
  const changePct = num(row.percentchange) / 100;
  const prev = price - change;
  const slug = slugFromUrl(row.url);
  const symbol = SLUG_TO_YAHOO[slug] ?? `${slug.replace(/[^a-z0-9]/g, "").toUpperCase() || name}.NS`;
  return {
    symbol,
    name,
    shortName: name,
    exchange: "NSE",
    currency: "INR",
    price,
    previousClose: prev,
    change,
    changePct,
    dayHigh: null,
    dayLow: null,
    volume: vol(row.volume),
    fiftyTwoWeekHigh: null,
    fiftyTwoWeekLow: null,
    spark: [],
    marketState: open ? "open" : "closed",
    asOf,
    source: "live",
  };
}

function parseGraphTime(label: string, fallback: number): number {
  const s = label.trim();
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const withHm = s.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})\s+(\d{1,2}):(\d{2})$/);
  if (withHm) {
    const [, d, mon, y, h, mi] = withHm;
    const utc = Date.UTC(Number(y), months[mon] ?? 0, Number(d), Number(h) - 5, Number(mi) - 30);
    return utc;
  }
  const day = s.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (day) {
    const [, d, mon, y] = day;
    return Date.UTC(Number(y), months[mon] ?? 0, Number(d), 10, 0);
  }
  const hm = s.match(/^(\d{1,2}):(\d{2})$/);
  if (hm) {
    const base = new Date(fallback);
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(base);
    const y = Number(parts.find((p) => p.type === "year")?.value);
    const m = Number(parts.find((p) => p.type === "month")?.value);
    const d = Number(parts.find((p) => p.type === "day")?.value);
    return Date.UTC(y, m - 1, d, Number(hm[1]) - 5, Number(hm[2]) - 30);
  }
  return fallback;
}

type GraphVal = { _time?: string; _value?: string | number | null; _close?: string | number | null; _volume?: string | number | null };

function seriesFromGraph(graph: { values?: GraphVal[]; current_close?: string; prev_close?: string }, range: QuoteRange, asOf: number): ChartSeries {
  const values = graph.values ?? [];
  const points: ChartPoint[] = [];
  for (const v of values) {
    const close = num(v._close ?? v._value);
    if (!close) continue;
    points.push({
      t: parseGraphTime(String(v._time ?? ""), asOf),
      close,
      volume: v._volume == null ? null : num(v._volume) || null,
    });
  }
  const prev = num(graph.prev_close) || points[0]?.close || 0;
  return { symbol: "^NSEI", range, previousClose: prev, currency: "INR", points };
}

async function fetchMcIndex(id: number): Promise<McIndex> {
  const raw = (await getJson(`${MC}/indices&ind_id=${id}`)) as { indices?: McIndex };
  if (!raw.indices?.stkexchg) throw new Error(`no index ${id}`);
  return raw.indices;
}

async function fetchMcPriceNifty(): Promise<{
  adv: number;
  decl: number;
  unchg: number;
  open: number;
  high: number;
  low: number;
  last: number;
  prev: number;
  change: number;
  pct: number;
  asOf: number;
  lastupd: string;
  state: string;
  weekHigh: number;
  weekLow: number;
}> {
  const raw = (await getJson(`${MC_PRICE}/in%3BNSX`, { Referer: "https://www.moneycontrol.com/" })) as {
    data?: Record<string, unknown>;
  };
  const d = raw.data;
  if (!d) throw new Error("no nifty price");
  const last = num(d.pricecurrent);
  const prev = num(d.priceprevclose);
  const asOf = num(d.lastupd_epoch) * 1000 || Date.now();
  return {
    adv: num(d.adv),
    decl: num(d.decl),
    unchg: num(d.unchg),
    open: num(d.OPEN),
    high: num(d.HIGH),
    low: num(d.LOW),
    last,
    prev,
    change: num(d.pricechange) || last - prev,
    pct: num(d.pricepercentchange) || (prev ? ((last - prev) / prev) * 100 : 0),
    asOf,
    lastupd: String(d.lastupd ?? ""),
    state: String(d.market_state ?? "CLOSED"),
    weekHigh: num(d["52wkhi"]),
    weekLow: num(d["52wklow"]),
  };
}

async function fetchUsdInr(): Promise<number | null> {
  try {
    const raw = (await getJson("https://query1.finance.yahoo.com/v8/finance/chart/USDINR=X?interval=1d&range=2d", {
      Referer: "https://finance.yahoo.com/",
    })) as { chart?: { result?: { meta?: { regularMarketPrice?: number } }[] } };
    const px = raw.chart?.result?.[0]?.meta?.regularMarketPrice;
    return typeof px === "number" && px > 0 ? px : null;
  } catch {
    return null;
  }
}

let nseBlockedUntil = 0;

async function tryOfficialNse(): Promise<unknown | null> {
  if (Date.now() < nseBlockedUntil) return null;
  try {
    const home = await fetch("https://www.nseindia.com/", {
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-IN,en;q=0.9",
      },
      signal: AbortSignal.timeout(3500),
    });
    if (!home.ok) {
      nseBlockedUntil = Date.now() + 5 * 60_000;
      return null;
    }
    const cookies = home.headers.getSetCookie?.().map((c) => c.split(";")[0]).join("; ") ?? "";
    const res = await fetch("https://www.nseindia.com/api/allIndices", {
      headers: {
        "User-Agent": UA,
        Accept: "application/json",
        "Accept-Language": "en-IN,en;q=0.9",
        Referer: "https://www.nseindia.com/",
        Cookie: cookies,
      },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      nseBlockedUntil = Date.now() + 5 * 60_000;
      return null;
    }
    return res.json();
  } catch {
    nseBlockedUntil = Date.now() + 5 * 60_000;
    return null;
  }
}

function emptyQuote(name: string, yahoo: string, asOf: number): MarketQuote {
  return {
    symbol: yahoo,
    name,
    shortName: name,
    exchange: "NSE",
    currency: "INR",
    price: NSE_OHLC.last,
    previousClose: NSE_OHLC.prev,
    change: NSE_OHLC.change,
    changePct: NSE_OHLC.changePct / 100,
    dayHigh: NSE_OHLC.high,
    dayLow: NSE_OHLC.low,
    volume: null,
    fiftyTwoWeekHigh: null,
    fiftyTwoWeekLow: null,
    spark: [],
    marketState: "closed",
    asOf,
    source: "live",
  };
}

export async function fetchNseDeskBundle(range: QuoteRange): Promise<NseDeskBundle> {
  const official = await tryOfficialNse();
  const feed: NseFeedKind = official ? "nse" : "nse-relay";

  const [price, niftyRow, indexRows, stocksRaw, industriesRaw, graphRaw, usdInr] = await Promise.all([
    fetchMcPriceNifty(),
    fetchMcIndex(9),
    Promise.all(
      INDEX_IDS.map(async (i) => {
        try {
          const row = await fetchMcIndex(i.id);
          return { spec: i, row };
        } catch {
          return null;
        }
      }),
    ),
    getJson(`${MC}/marketmap&format=&type=0&ind_id=9`) as Promise<{ item?: McStock[] }>,
    getJson(`${MC}/marketmap&format=&type=1&ind_id=9`) as Promise<{ item?: McStock[] }>,
    getJson(`${MC}/graph&format=&ind_id=9&range=${RANGE_TO_MC[range] ?? "1d"}&type=area`) as Promise<{
      graph?: { values?: GraphVal[]; current_close?: string; prev_close?: string };
    }>,
    fetchUsdInr(),
  ]);

  const asOf = price.asOf || Number(niftyRow.epoch_time || 0) * 1000 || Date.now();
  const open = String(price.state).toLowerCase() === "open";
  const cal = nseSession();
  const session = {
    open,
    label: open ? "NSE open · 9:15–15:30 IST" : cal.label,
  };

  const niftyBase = quoteFromIndex(niftyRow, "^NSEI", asOf) ?? emptyQuote("NIFTY 50", "^NSEI", asOf);
  const nifty: MarketQuote = {
    ...niftyBase,
    name: "NIFTY 50",
    shortName: "NIFTY 50",
    price: price.last || niftyBase.price,
    previousClose: price.prev || niftyBase.previousClose,
    change: price.change,
    changePct: price.pct / 100,
    dayHigh: price.high || niftyBase.dayHigh,
    dayLow: price.low || niftyBase.dayLow,
    fiftyTwoWeekHigh: price.weekHigh || niftyBase.fiftyTwoWeekHigh,
    fiftyTwoWeekLow: price.weekLow || niftyBase.fiftyTwoWeekLow,
    marketState: open ? "open" : "closed",
  };

  let graph = graphRaw.graph;
  if (range === "1y" || range === "ytd" || range === "5y") {
    const pts = graph?.values ?? [];
    const first = String(pts[0]?._time ?? "");
    if (/^\d{1,2}:\d{2}$/.test(first)) {
      const maxG = (await getJson(`${MC}/graph&format=&ind_id=9&range=max&type=area`)) as {
        graph?: { values?: GraphVal[]; current_close?: string; prev_close?: string };
      };
      graph = maxG.graph;
    }
  }
  let niftyChart = seriesFromGraph(graph ?? {}, range, asOf);
  if (range === "1y" || range === "ytd") {
    const cut = asOf - (range === "ytd" ? asOf - Date.UTC(new Date(asOf).getUTCFullYear(), 0, 1) : 365 * 86400000);
    niftyChart = { ...niftyChart, points: niftyChart.points.filter((p) => p.t >= cut), range };
  } else if (range === "5y") {
    niftyChart = { ...niftyChart, points: niftyChart.points.filter((p) => p.t >= asOf - 5 * 365 * 86400000), range };
  }
  nifty.spark = niftyChart.points.map((p) => p.close).filter((_, i, a) => i % Math.max(1, Math.floor(a.length / 28)) === 0);

  const indices = indexRows
    .filter((x): x is { spec: (typeof INDEX_IDS)[number]; row: McIndex } => Boolean(x))
    .map((x) =>
      quoteFromIndex(
        x.row,
        x.spec.yahoo === "^NSEI" && x.row.stkexchg !== "NIFTY 50" ? `NSE:${x.row.stkexchg}` : x.spec.yahoo,
        asOf,
      ),
    )
    .filter((q): q is MarketQuote => Boolean(q));

  const vix = indices.find((i) => /vix/i.test(i.name)) ?? null;

  const heroIndices = HERO_INDEX_IDS.map((h) => {
    const want = h.label.toUpperCase().replace(/\s+/g, " ");
    const hit =
      indices.find((i) => i.name.toUpperCase().replace(/\s+/g, " ") === want) ??
      indices.find((i) => {
        const n = i.name.toUpperCase().replace(/\s+/g, " ");
        if (want === "NIFTY 50") return n === "NIFTY 50";
        return n.includes(want) || n.includes(want.replace("NIFTY ", ""));
      });
    if (hit) return { ...hit, name: h.label, shortName: h.label, symbol: h.yahoo };
    if (h.id === 9) return nifty;
    return emptyQuote(h.label, h.yahoo, asOf);
  });

  const stocks = (stocksRaw.item ?? [])
    .map((s) => quoteFromStock(s, asOf, open))
    .filter((q): q is MarketQuote => Boolean(q));

  const book = (industriesRaw.item ?? [])
    .map((s) => ({
      sector: s.shortname ?? "—",
      names: 0,
      volume: 0,
      value: num(s.mktcap) * 1e7,
    }))
    .filter((r) => r.sector && r.sector !== "—")
    .sort((a, b) => b.value - a.value)
    .slice(0, 12);

  const niftyAdv = stocks.filter((s) => s.change > 0).length || price.adv;
  const niftyDecl = stocks.filter((s) => s.change < 0).length || price.decl;
  const niftyUnch = stocks.filter((s) => s.change === 0).length || price.unchg;
  const volume = stocks.reduce((m, s) => m + (s.volume ?? 0), 0);
  const value = stocks.reduce((m, s) => m + (s.volume ?? 0) * s.price, 0);

  const lastPrint = niftyRow.lastupdated
    ? `${niftyRow.lastupdated} IST`
    : price.lastupd
      ? `${price.lastupd} IST`
      : NSE_CLOSE_IST;

  const fxSpot = NSE_FX_SPOT.map((row) =>
    row.code === "USD" && usdInr
      ? { ...row, today: usdInr }
      : row,
  );
  const niftyUsd = { ...NSE_NIFTY_USD, asOf: lastPrint };

  return {
    nifty,
    niftyChart,
    open: price.open || NSE_OHLC.open,
    high: price.high || NSE_OHLC.high,
    low: price.low || NSE_OHLC.low,
    prevClose: price.prev || NSE_OHLC.prev,
    indices,
    heroIndices,
    stocks,
    book,
    stats: {
      traded: stocks.length || 50,
      advances: niftyAdv,
      declines: niftyDecl,
      unchanged: niftyUnch,
      weekHigh: NSE_BOARD_STATS.weekHigh,
      weekLow: NSE_BOARD_STATS.weekLow,
      volume,
      value,
    },
    boardStats: { ...NSE_BOARD_STATS },
    turnover: NSE_TURNOVER,
    turnoverTotal: NSE_TURNOVER_TOTAL,
    calls: NSE_ACTIVE_CALLS,
    puts: NSE_ACTIVE_PUTS,
    oiContracts: NSE_ACTIVE_OI,
    corporates: NSE_CORPORATES,
    ipo: NSE_IPO,
    fxSpot,
    fxFutures: NSE_FX_FUTURES,
    optionChain: NSE_OPTION_CHAIN,
    gift: NSE_GIFT,
    niftyUsd,
    vix,
    session,
    asOf,
    source: "live",
    feed,
    lastPrint,
    holidays: upcomingNseHolidays(),
  };
}

export { NSE_SESSION_DATE, NSE_CLOSE_IST, NSE_FNO_IST, NSE_FX_IST, NSE_FX_FUT_IST };
