import { googleFinanceQuoteUrl, googleFinanceSearchUrl, googleNewsUrl, googleSearchUrl, displayTicker } from "./google";
import { createServerFn } from "@tanstack/react-start";
import {
  NSE_ACTIVE_CALLS,
  NSE_ACTIVE_OI,
  NSE_ACTIVE_PUTS,
  NSE_BOARD_STATS,
  NSE_CLOSE_IST,
  NSE_CORPORATES,
  NSE_FX_FUTURES,
  NSE_FX_SPOT,
  NSE_GIFT,
  NSE_IPO,
  NSE_NIFTY_USD,
  NSE_OPTION_CHAIN,
  NSE_TURNOVER,
  NSE_TURNOVER_TOTAL,
} from "./nse-session";
import { fetchNseDeskBundle } from "./nse-feed";
import { findCompany, COMPANIES, INDICES, nseSession, searchUniverse, upcomingNseHolidays } from "./universe";
import type {
  ChartPoint,
  ChartSeries,
  CompanyProfile,
  MarketQuote,
  NewsItem,
  QuoteBundle,
  QuoteRange,
} from "./types";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

type CacheEntry<T> = { at: number; value: T };
const cache = new Map<string, CacheEntry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>, force = false): Promise<T> {
  const hit = cache.get(key) as CacheEntry<T> | undefined;
  if (hit && Date.now() - hit.at < ttlMs && (!force || Date.now() - hit.at < 1000)) return Promise.resolve(hit.value);
  const pending = inflight.get(key) as Promise<T> | undefined;
  if (pending && !force) return pending;
  const job = fn()
    .then((value) => {
      cache.set(key, { at: Date.now(), value });
      inflight.delete(key);
      return value;
    })
    .catch((err) => {
      inflight.delete(key);
      if (hit) return hit.value;
      throw err;
    });
  inflight.set(key, job);
  return job;
}

async function yahooJson(path: string): Promise<unknown> {
  const hosts = ["https://query2.finance.yahoo.com", "https://query1.finance.yahoo.com"];
  let last: Error | null = null;
  for (const host of hosts) {
    try {
      const res = await fetch(host + path, {
        headers: {
          "User-Agent": UA,
          Accept: "application/json,text/plain,*/*",
          "Accept-Language": "en-IN,en;q=0.9",
        },
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) throw new Error(`Yahoo ${res.status}`);
      return await res.json();
    } catch (e) {
      last = e instanceof Error ? e : new Error("Yahoo failed");
    }
  }
  throw last ?? new Error("Yahoo failed");
}

const RANGE_MAP: Record<QuoteRange, { range: string; interval: string }> = {
  "1d": { range: "1d", interval: "2m" },
  "5d": { range: "5d", interval: "15m" },
  "1mo": { range: "1mo", interval: "1d" },
  "6mo": { range: "6mo", interval: "1d" },
  ytd: { range: "ytd", interval: "1d" },
  "1y": { range: "1y", interval: "1d" },
  "5y": { range: "5y", interval: "1wk" },
  max: { range: "max", interval: "1mo" },
};

type ChartRaw = {
  chart?: {
    result?: {
      meta: {
        symbol: string;
        shortName?: string;
        longName?: string;
        exchangeName?: string;
        fullExchangeName?: string;
        currency?: string;
        regularMarketPrice?: number;
        regularMarketPreviousClose?: number;
        chartPreviousClose?: number;
        previousClose?: number;
        regularMarketDayHigh?: number;
        regularMarketDayLow?: number;
        regularMarketVolume?: number;
        fiftyTwoWeekHigh?: number;
        fiftyTwoWeekLow?: number;
        regularMarketTime?: number;
        instrumentType?: string;
      };
      timestamp?: number[];
      indicators?: {
        quote?: {
          open?: (number | null)[];
          high?: (number | null)[];
          low?: (number | null)[];
          close?: (number | null)[];
          volume?: (number | null)[];
        }[];
      };
    }[];
  };
};

function sparkFrom(closes: number[], n = 28): number[] {
  if (closes.length <= n) return closes;
  const step = (closes.length - 1) / (n - 1);
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(closes[Math.round(i * step)]!);
  return out;
}

const SIM_BASE: Record<string, { price: number; currency: string }> = {
  "^NSEI": { price: 23398, currency: "INR" },
  "^BSESN": { price: 74782, currency: "INR" },
  "^NSEBANK": { price: 56607, currency: "INR" },
  "^CNXIT": { price: 28922, currency: "INR" },
  "^CNXAUTO": { price: 23880, currency: "INR" },
  "^CNXPHARMA": { price: 21940, currency: "INR" },
  "^CNXFMCG": { price: 54810, currency: "INR" },
  "^CNXENERGY": { price: 33820, currency: "INR" },
  "^GSPC": { price: 7657, currency: "USD" },
  "^DJI": { price: 50780, currency: "USD" },
  "^IXIC": { price: 21640, currency: "USD" },
  "^N225": { price: 42880, currency: "JPY" },
  "^FTSE": { price: 9180, currency: "GBP" },
  "^GDAXI": { price: 23640, currency: "EUR" },
  "^FCHI": { price: 7840, currency: "EUR" },
  "BTC-USD": { price: 77125, currency: "USD" },
  "ETH-USD": { price: 4280, currency: "USD" },
  "USDINR=X": { price: 95.55, currency: "INR" },
  "EURINR=X": { price: 111.4, currency: "INR" },
  "GC=F": { price: 4409, currency: "USD" },
  "^INDIAVIX": { price: 12.29, currency: "INR" },
  "RELIANCE.NS": { price: 1257.5, currency: "INR" },
  "TCS.NS": { price: 2200.8, currency: "INR" },
  "HDFCBANK.NS": { price: 708.25, currency: "INR" },
  "INFY.NS": { price: 1037.7, currency: "INR" },
  "ICICIBANK.NS": { price: 1379.3, currency: "INR" },
  "ITC.NS": { price: 412, currency: "INR" },
  "SBIN.NS": { price: 995.7, currency: "INR" },
  "BHARTIARTL.NS": { price: 1802, currency: "INR" },
  "AXISBANK.NS": { price: 1273, currency: "INR" },
};

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function simulateChart(symbol: string, range: QuoteRange): { quote: MarketQuote; series: ChartSeries } {
  const day = new Date().toISOString().slice(0, 10);
  const hour = new Date().getHours();
  let seed = hashSeed(`${symbol}-${day}-${hour}-${range}`);
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const company = findCompany(symbol);
  const listed = INDICES.find((i) => i.yahoo.toUpperCase() === symbol.toUpperCase());
  const baseRow = SIM_BASE[symbol] ?? SIM_BASE[symbol.toUpperCase()];
  const base = baseRow?.price ?? (company?.eps ? Math.max(40, company.eps * 18) : 500 + (hashSeed(symbol) % 2500));
  const currency = baseRow?.currency ?? "INR";
  const n = range === "1d" ? 48 : range === "5d" ? 40 : range === "1mo" ? 32 : range === "max" ? 60 : 40;
  const drift = (rand() - 0.48) * 0.012;
  const points: ChartPoint[] = [];
  const closes: number[] = [];
  let price = base * (1 + (rand() - 0.5) * 0.02);
  const now = Date.now();
  const stepMs =
    range === "1d" ? 5 * 60 * 1000 : range === "5d" ? 30 * 60 * 1000 : range === "1mo" ? 24 * 3600 * 1000 : 7 * 24 * 3600 * 1000;
  for (let i = 0; i < n; i++) {
    const open = price;
    price = Math.max(base * 0.7, price * (1 + drift + (rand() - 0.5) * 0.008));
    const close = price;
    const wick = Math.abs(close - open) * 0.35 + base * 0.001 * rand();
    const t = now - (n - 1 - i) * stepMs;
    points.push({
      t,
      open,
      close,
      high: Math.max(open, close) + wick,
      low: Math.max(1, Math.min(open, close) - wick * rand()),
      volume: Math.round(200_000 + rand() * 2_000_000),
    });
    closes.push(price);
  }
  const last = closes[closes.length - 1] ?? base;
  const prev = closes[0] ?? base;
  const change = last - prev;
  const changePct = prev ? change / prev : 0;
  const hi = Math.max(...closes);
  const lo = Math.min(...closes);
  const quote: MarketQuote = {
    symbol,
    name: listed?.name ?? company?.name ?? symbol,
    shortName: listed?.name ?? company?.symbol ?? symbol,
    exchange: company?.exchange ?? (symbol.startsWith("^") ? "INDEX" : "NSE"),
    currency,
    price: last,
    previousClose: prev,
    change,
    changePct,
    dayHigh: hi,
    dayLow: lo,
    volume: points[points.length - 1]?.volume ?? null,
    fiftyTwoWeekHigh: hi * 1.12,
    fiftyTwoWeekLow: lo * 0.88,
    spark: sparkFrom(closes),
    marketState: sessionState(),
    asOf: now,
    source: "simulated",
  };
  return { quote, series: { symbol, range, previousClose: prev, currency, points } };
}

function sessionState(): "open" | "closed" {
  return nseSession().open ? "open" : "closed";
}

const lastLive = new Map<string, { quote: MarketQuote; series: ChartSeries }>();

async function fetchChart(symbol: string, range: QuoteRange): Promise<{ quote: MarketQuote; series: ChartSeries }> {
  try {
    const live = await fetchChartLive(symbol, range);
    lastLive.set(`${symbol}:${range}`, live);
    lastLive.set(`q:${symbol}`, live);
    return live;
  } catch {
    const hit = lastLive.get(`${symbol}:${range}`) ?? lastLive.get(`q:${symbol}`);
    if (hit) {
      return {
        quote: { ...hit.quote, source: "cached", marketState: sessionState() },
        series: hit.series,
      };
    }
    return simulateChart(symbol, range);
  }
}

async function fetchChartLive(symbol: string, range: QuoteRange): Promise<{ quote: MarketQuote; series: ChartSeries }> {
  const spec = RANGE_MAP[range];
  const path = `/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${spec.interval}&range=${spec.range}&includePrePost=false`;
  const raw = (await yahooJson(path)) as ChartRaw;
  const result = raw.chart?.result?.[0];
  if (!result) throw new Error("No chart data");
  const meta = result.meta;
  const ts = result.timestamp ?? [];
  const quoteBar = result.indicators?.quote?.[0];
  const close = quoteBar?.close ?? [];
  const open = quoteBar?.open ?? [];
  const high = quoteBar?.high ?? [];
  const low = quoteBar?.low ?? [];
  const vol = quoteBar?.volume ?? [];
  const points: ChartPoint[] = [];
  const closes: number[] = [];
  for (let i = 0; i < ts.length; i++) {
    const c = close[i];
    if (c == null || !Number.isFinite(c)) continue;
    const o = open[i];
    const h = high[i];
    const l = low[i];
    points.push({
      t: ts[i]! * 1000,
      close: c,
      open: o != null && Number.isFinite(o) ? o : c,
      high: h != null && Number.isFinite(h) ? h : c,
      low: l != null && Number.isFinite(l) ? l : c,
      volume: vol[i] ?? null,
    });
    closes.push(c);
  }
  const price = meta.regularMarketPrice ?? closes[closes.length - 1] ?? 0;
  const prev =
    meta.chartPreviousClose ??
    meta.regularMarketPreviousClose ??
    meta.previousClose ??
    closes[closes.length - 2] ??
    closes[0] ??
    price;
  const change = price - prev;
  const changePct = prev ? change / prev : 0;
  const company = findCompany(symbol);
  const quote: MarketQuote = {
    symbol,
    name: company?.name ?? meta.longName ?? meta.shortName ?? symbol,
    shortName: meta.shortName ?? company?.symbol ?? symbol,
    exchange: meta.fullExchangeName ?? meta.exchangeName ?? company?.exchange ?? "",
    currency: meta.currency ?? "INR",
    price,
    previousClose: prev,
    change,
    changePct,
    dayHigh: meta.regularMarketDayHigh ?? null,
    dayLow: meta.regularMarketDayLow ?? null,
    volume: meta.regularMarketVolume ?? null,
    fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh ?? null,
    fiftyTwoWeekLow: meta.fiftyTwoWeekLow ?? null,
    spark: sparkFrom(closes),
    marketState: sessionState(),
    asOf: (meta as { regularMarketTime?: number }).regularMarketTime
      ? (meta as { regularMarketTime?: number }).regularMarketTime! * 1000
      : Date.now(),
    source: "live",
  };
  return {
    quote,
    series: { symbol, range, previousClose: prev, currency: quote.currency, points },
  };
}

function parseRss(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  for (const block of blocks) {
    const title = decodeXml(tag(block, "title"));
    const link = decodeXml(tag(block, "link"));
    const source =
      decodeXml((block.match(/<source[^>]*>([\s\S]*?)<\/source>/) ?? [])[1] ?? "") ||
      decodeXml(tag(block, "dc:creator")) ||
      "News";
    const published = decodeXml(tag(block, "pubDate"));
    if (!title) continue;
    items.push({ title: title.replace(/ - [^-]+$/, (m) => (source ? "" : m)).trim() || title, source, url: link, published });
    if (items.length >= 16) break;
  }
  return items;
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${name}>`))
    ?? block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`));
  return m?.[1]?.trim() ?? "";
}

function decodeXml(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(new RegExp("&" + "amp;", "g"), "&")
    .replace(new RegExp("&" + "lt;", "g"), "<")
    .replace(new RegExp("&" + "gt;", "g"), ">")
    .replace(new RegExp("&" + "quot;", "g"), '"')
    .replace(/&#39;/g, "'")
    .replace(new RegExp("&" + "apos;", "g"), "'");
}

async function fetchRss(url: string): Promise<NewsItem[]> {
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(4000) });
  if (!res.ok) return [];
  return parseRss(await res.text());
}

async function fetchNews(query: string): Promise<NewsItem[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
  try {
    return await fetchRss(url);
  } catch {
    return [];
  }
}

function newsKey(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().slice(0, 72);
}

async function mergeNews(feeds: Promise<NewsItem[]>[], limit = 16): Promise<NewsItem[]> {
  const chunks = await Promise.all(feeds.map((p) => p.catch(() => [] as NewsItem[])));
  const seen = new Set<string>();
  const all: NewsItem[] = [];
  for (const items of chunks) {
    for (const it of items) {
      const key = newsKey(it.title);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      all.push(it);
    }
  }
  all.sort((a, b) => (Date.parse(b.published) || 0) - (Date.parse(a.published) || 0));
  return all.slice(0, limit);
}

const NEWS_QUERIES: Record<string, { rss: string[]; q: string[] }> = {
  india: {
    rss: [
      "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
      "https://www.moneycontrol.com/rss/MCtopnews.xml",
      "https://www.livemint.com/rss/markets",
    ],
    q: ["Nifty Sensex India stock market", "crude oil rupee gold India markets"],
  },
  us: {
    rss: ["https://feeds.a.dj.com/rss/RSSMarketsMain.xml"],
    q: ["S&P 500 Nasdaq Dow stock market", "Federal Reserve stocks"],
  },
  europe: {
    rss: [],
    q: ["European stocks STOXX DAX FTSE", "ECB markets"],
  },
  fx: {
    rss: [],
    q: ["USDINR rupee dollar RBI", "gold silver forex India"],
  },
  crypto: {
    rss: [],
    q: ["Bitcoin Ethereum crypto market"],
  },
};

async function fetchIndiaHeadlines(): Promise<NewsItem[]> {
  return fetchRegionNews("india");
}

async function fetchRegionNews(region: string): Promise<NewsItem[]> {
  const spec = NEWS_QUERIES[region] ?? NEWS_QUERIES.india!;
  return mergeNews(
    [
      ...spec.rss.map((url) => fetchRss(url)),
      ...spec.q.map((q) => fetchNews(q)),
    ],
    16,
  );
}

type YahooSearch = {
  quotes?: {
    symbol?: string;
    shortname?: string;
    longname?: string;
    exchDisp?: string;
    quoteType?: string;
    exchange?: string;
  }[];
};

async function yahooSearch(q: string, indiaOnly = true) {
  const path = `/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=12&newsCount=0`;
  const raw = (await yahooJson(path)) as YahooSearch;
  return (raw.quotes ?? [])
    .filter((x) => x.symbol && (x.quoteType === "EQUITY" || x.quoteType === "INDEX" || x.quoteType === "ETF"))
    .map((x) => ({
      symbol: x.symbol!,
      name: x.longname ?? x.shortname ?? x.symbol!,
      exchange: x.exchDisp ?? x.exchange ?? "",
      type: x.quoteType ?? "EQUITY",
    }))
    .filter((r) => {
      if (!indiaOnly) return true;
      const ex = r.exchange.toUpperCase();
      return (
        r.symbol.endsWith(".NS") ||
        r.symbol.endsWith(".BO") ||
        ex.includes("NSE") ||
        ex.includes("BSE") ||
        ex.includes("BOMBAY") ||
        r.symbol.startsWith("^") ||
        r.type === "INDEX"
      );
    });
}

function analysisFrom(quote: MarketQuote, yearCloses: number[], profile: CompanyProfile | null): string[] {
  const lines: string[] = [];
  const { price, changePct, fiftyTwoWeekHigh, fiftyTwoWeekLow, dayHigh, dayLow } = quote;
  const up = changePct >= 0;
  lines.push(
    `${quote.name} is ${up ? "up" : "down"} ${(Math.abs(changePct) * 100).toFixed(2)}% versus the previous close, trading at ${formatPx(price, quote.currency)}.`,
  );
  if (fiftyTwoWeekHigh && fiftyTwoWeekLow) {
    const vsHigh = (price / fiftyTwoWeekHigh - 1) * 100;
    const span = fiftyTwoWeekHigh - fiftyTwoWeekLow || 1;
    const pos = ((price - fiftyTwoWeekLow) / span) * 100;
    lines.push(
      `The stock is ${Math.abs(vsHigh).toFixed(1)}% ${vsHigh >= 0 ? "above" : "below"} its 52-week high of ${formatPx(fiftyTwoWeekHigh, quote.currency)}, sitting near the ${pos.toFixed(0)}th percentile of the 52-week range.`,
    );
  }
  if (dayHigh && dayLow) {
    lines.push(`Today’s range is ${formatPx(dayLow, quote.currency)} – ${formatPx(dayHigh, quote.currency)}.`);
  }
  if (yearCloses.length > 20) {
    const ago = yearCloses[0]!;
    const ret = ago ? (price / ago - 1) * 100 : 0;
    lines.push(`Over the available 1-year window the last close implies a ${ret >= 0 ? "gain" : "decline"} of ${Math.abs(ret).toFixed(1)}%.`);
  }
  if (profile?.quarters?.length) {
    const last = profile.quarters[profile.quarters.length - 1]!;
    if (last.yoyRevenue != null) {
      lines.push(
        `Latest compiled quarter (${last.label}) shows revenue ${last.yoyRevenue >= 0 ? "up" : "down"} ${(Math.abs(last.yoyRevenue) * 100).toFixed(1)}% YoY` +
          (last.yoyPat != null
            ? ` and PAT ${last.yoyPat >= 0 ? "up" : "down"} ${(Math.abs(last.yoyPat) * 100).toFixed(1)}% YoY.`
            : "."),
      );
    }
  }
  lines.push(
    "This is an educational snapshot built from public market data — not a recommendation to buy or sell.",
  );
  return lines;
}

function formatPx(n: number, ccy: string): string {
  if (ccy === "INR" || ccy === "USD") {
    const sym = ccy === "INR" ? "₹" : "$";
    return (
      sym +
      n.toLocaleString(ccy === "INR" ? "en-IN" : "en-US", {
        maximumFractionDigits: n >= 100 ? 2 : 4,
      })
    );
  }
  return n.toLocaleString("en-IN", { maximumFractionDigits: 2 }) + " " + ccy;
}

function retFrom(closes: number[], days: number, price: number): number | null {
  if (closes.length < days) return null;
  const base = closes[closes.length - 1 - days];
  if (!base) return null;
  return price / base - 1;
}

type SparkRow = {
  symbol?: string;
  previousClose?: number;
  close?: number[];
  fulldayChange?: number;
  fulldayChangePercent?: number;
  fulldayPrice?: number;
  end?: number;
};

function currencyFor(symbol: string): string {
  if (
    symbol.endsWith(".NS") ||
    symbol.endsWith(".BO") ||
    symbol.startsWith("^NSE") ||
    symbol.startsWith("^BSE") ||
    symbol.startsWith("^CNX") ||
    symbol.startsWith("^CRSL") ||
    symbol === "^INDIAVIX" ||
    symbol.startsWith("NIFTY") ||
    symbol === "USDINR=X"
  ) {
    return "INR";
  }
  return "USD";
}

function mapSparkRows(wanted: string[], raw: Record<string, SparkRow>): MarketQuote[] {
  const session = sessionState();
  const out: MarketQuote[] = [];
  for (const symbol of wanted) {
    const row = raw[symbol];
    const closes = (row?.close ?? []).filter((n) => Number.isFinite(n));
    const price = row?.fulldayPrice ?? closes[closes.length - 1];
    if (price == null || !Number.isFinite(price)) continue;
    const prev = row?.previousClose && row.previousClose > 0 ? row.previousClose : price;
    const change = row?.fulldayChange ?? price - prev;
    const changePct =
      row?.fulldayChangePercent != null ? row.fulldayChangePercent / 100 : prev ? change / prev : 0;
    const company = findCompany(symbol);
    const index = INDICES.find((i) => i.yahoo === symbol);
    const spark =
      closes.length > 32 ? closes.filter((_, i) => i % Math.ceil(closes.length / 32) === 0) : closes;
    out.push({
      symbol: row?.symbol || symbol,
      name: company?.name ?? index?.name ?? symbol,
      shortName: company?.symbol ?? index?.name ?? symbol.replace(/\.NS$|\.BO$/, ""),
      exchange: company?.exchange ?? (symbol.startsWith("^") ? "INDEX" : "NSE"),
      currency: currencyFor(symbol),
      price,
      previousClose: prev,
      change,
      changePct,
      dayHigh: closes.length ? Math.max(...closes) : null,
      dayLow: closes.length ? Math.min(...closes) : null,
      volume: null,
      fiftyTwoWeekHigh: null,
      fiftyTwoWeekLow: null,
      spark,
      marketState: session,
      asOf: (row?.end ?? Math.floor(Date.now() / 1000)) * 1000,
      source: "live",
    });
  }
  return out;
}

async function fetchSparkChunk(symbols: string[]): Promise<MarketQuote[]> {
  if (!symbols.length) return [];
  const path = `/v8/finance/spark?symbols=${symbols.map(encodeURIComponent).join(",")}&range=1d&interval=5m`;
  try {
    const raw = (await yahooJson(path)) as Record<string, SparkRow>;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Spark empty");
    const rows = mapSparkRows(symbols, raw);
    if (!rows.length) throw new Error("Spark empty");
    return rows;
  } catch (err) {
    if (symbols.length === 1) return [];
    const mid = Math.ceil(symbols.length / 2);
    const [a, b] = await Promise.all([
      fetchSparkChunk(symbols.slice(0, mid)),
      fetchSparkChunk(symbols.slice(mid)),
    ]);
    if (!a.length && !b.length) throw err;
    return [...a, ...b];
  }
}

/** One Yahoo call per small group, so a long list still refreshes every second. */
async function fetchSparkQuotes(symbols: string[]): Promise<MarketQuote[]> {
  const uniq = [...new Set(symbols.map((s) => s.trim()).filter(Boolean))].slice(0, 40);
  if (!uniq.length) return [];
  const chunks: string[][] = [];
  for (let i = 0; i < uniq.length; i += 8) chunks.push(uniq.slice(i, i + 8));
  const parts = await Promise.all(chunks.map((chunk) => fetchSparkChunk(chunk)));
  const out = parts.flat();
  if (!out.length) throw new Error("Spark empty");
  return out;
}

export const getQuotes = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { symbols?: string[]; fresh?: boolean };
    const symbols = d?.symbols;
    if (!Array.isArray(symbols)) throw new Error("symbols required");
    return { symbols: symbols.slice(0, 40).map(String), fresh: Boolean(d.fresh) };
  })
  .handler(async ({ data }): Promise<MarketQuote[]> => {
    const key = `live:${[...data.symbols].sort().join("|")}`;
    try {
      const rows = await cached(key, 1000, () => fetchSparkQuotes(data.symbols), data.fresh);
      if (rows.length) {
        const order = new Map(data.symbols.map((s, i) => [s, i]));
        return [...rows].sort((a, b) => (order.get(a.symbol) ?? 0) - (order.get(b.symbol) ?? 0));
      }
    } catch {
      /* chart fallback below */
    }
    const out: MarketQuote[] = [];
    await Promise.all(
      data.symbols.map(async (sym) => {
        try {
          const row = await cached(`q:${sym}`, 8_000, () => fetchChart(sym, "5d"), data.fresh);
          out.push(row.quote);
        } catch {
          /* skip */
        }
      }),
    );
    const order = new Map(data.symbols.map((s, i) => [s, i]));
    out.sort((a, b) => (order.get(a.symbol) ?? 0) - (order.get(b.symbol) ?? 0));
    return out;
  });

export const getChart = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { symbol?: string; range?: QuoteRange; fresh?: boolean };
    if (!d?.symbol) throw new Error("symbol required");
    const range = (d.range ?? "1d") as QuoteRange;
    if (!(range in RANGE_MAP)) throw new Error("bad range");
    return { symbol: String(d.symbol), range, fresh: Boolean(d.fresh) };
  })
  .handler(async ({ data }): Promise<ChartSeries> => {
    const row = await cached(`c:${data.symbol}:${data.range}`, 12_000, () => fetchChart(data.symbol, data.range), data.fresh);
    return row.series;
  });

export const getQuoteBundle = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { symbol?: string; range?: QuoteRange; fresh?: boolean };
    if (!d?.symbol) throw new Error("symbol required");
    return { symbol: String(d.symbol), range: (d.range ?? "1d") as QuoteRange, fresh: Boolean(d.fresh) };
  })
  .handler(async ({ data }): Promise<QuoteBundle> => {
    const profile = findCompany(data.symbol) ?? null;
    const yahoo = profile?.yahoo ?? data.symbol;
    const [main, year] = await Promise.all([
      cached(`c:${yahoo}:${data.range}`, 12_000, () => fetchChart(yahoo, data.range), data.fresh),
      cached(`c:${yahoo}:1y`, 45_000, () => fetchChart(yahoo, "1y"), data.fresh).catch(() => null),
    ]);
    const yearCloses = year?.series.points.map((p) => p.close) ?? [];
    const newsQuery = profile ? `${profile.name} stock` : `${main.quote.name} stock`;
    const news = await cached(
      `n:${newsQuery}`,
      20_000,
      () => mergeNews([fetchNews(newsQuery), fetchNews(`${newsQuery} India NSE`)], 10),
      data.fresh,
    ).catch(() => [] as NewsItem[]);
    const avgVolume =
      year && year.series.points.length
        ? year.series.points.reduce((s, p) => s + (p.volume ?? 0), 0) / year.series.points.length
        : null;
    const marketCap =
      profile?.sharesCr && main.quote.price ? profile.sharesCr * 1e7 * main.quote.price : null;
    const vs52wHigh =
      main.quote.fiftyTwoWeekHigh && main.quote.fiftyTwoWeekHigh > 0
        ? main.quote.price / main.quote.fiftyTwoWeekHigh - 1
        : null;
    return {
      quote: { ...main.quote, spark: year?.quote.spark ?? main.quote.spark },
      chart: main.series,
      profile,
      news,
      analysis: analysisFrom(main.quote, yearCloses, profile),
      stats: {
        open: main.series.points[0]?.close ?? null,
        avgVolume,
        marketCap,
        pe: profile?.pe ?? null,
        eps: profile?.eps ?? null,
        employees: profile?.employees ?? null,
        return1m: yearCloses.length ? retFrom(yearCloses, 21, main.quote.price) : null,
        return1y: yearCloses.length > 2 ? main.quote.price / yearCloses[0]! - 1 : null,
        vs52wHigh,
      },
      delayed: true,
    };
  });

export const searchSymbols = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const q = String((data as { q?: string })?.q ?? "").trim();
    return { q };
  })
  .handler(async ({ data }) => {
    const q = data.q;
    if (q.length < 1) return { local: [] as CompanyProfile[], remote: [] as { symbol: string; name: string; exchange: string; type: string }[] };
    const local = searchUniverse(q, 8);
    let remote: { symbol: string; name: string; exchange: string; type: string }[] = [];
    if (q.length >= 2) {
      try {
        remote = await cached(`s:${q.toLowerCase()}`, 60_000, () => yahooSearch(q, true));
        const localYahoo = new Set(local.map((c) => c.yahoo.toUpperCase()));
        remote = remote.filter((r) => !localYahoo.has(r.symbol.toUpperCase()));
      } catch {
        remote = [];
      }
    }
    return { local, remote: remote.slice(0, 8) };
  });

export const deepSearch = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const q = String((data as { q?: string })?.q ?? "").trim();
    if (q.length > 80) throw new Error("Keep searches under 80 characters");
    return { q };
  })
  .handler(async ({ data }) => {
    const q = data.q;
    const empty = {
      query: q,
      hits: [] as {
        symbol: string;
        ticker: string;
        name: string;
        exchange: string;
        googleFinance: string;
        googleSearch: string;
        googleNews: string;
      }[],
      quotes: [] as MarketQuote[],
      news: [] as NewsItem[],
      googleFinanceSearch: googleFinanceSearchUrl(q || "Nifty 50"),
      googleSearch: googleSearchUrl(`${q || "Indian stock market"} NSE BSE`),
    };
    if (q.length < 1) return empty;
    const local = searchUniverse(q, 10);
    let remote: { symbol: string; name: string; exchange: string; type: string }[] = [];
    try {
      remote = await cached(`ds:${q.toLowerCase()}`, 60_000, () => yahooSearch(q, false));
    } catch {
      remote = [];
    }
    const hits: typeof empty.hits = [];
    const seen = new Set<string>();
    for (const c of local) {
      const key = c.yahoo.toUpperCase();
      if (seen.has(key)) continue;
      seen.add(key);
      hits.push({
        symbol: c.yahoo,
        ticker: c.symbol,
        name: c.name,
        exchange: c.exchange,
        googleFinance: googleFinanceQuoteUrl(c.yahoo),
        googleSearch: googleSearchUrl(`${c.name} stock NSE`),
        googleNews: googleNewsUrl(`${c.name} stock`),
      });
    }
    for (const r of remote) {
      const key = r.symbol.toUpperCase();
      if (seen.has(key)) continue;
      seen.add(key);
      hits.push({
        symbol: r.symbol,
        ticker: displayTicker(r.symbol),
        name: r.name,
        exchange: r.exchange || r.type,
        googleFinance: googleFinanceQuoteUrl(r.symbol),
        googleSearch: googleSearchUrl(`${r.name} stock`),
        googleNews: googleNewsUrl(`${r.name} stock`),
      });
    }
    const top = hits.slice(0, 10);
    const quotes: MarketQuote[] = [];
    await Promise.all(
      top.map(async (h) => {
        try {
          const row = await cached(`q:${h.symbol}`, 8_000, () => fetchChart(h.symbol, "5d"));
          quotes.push(row.quote);
        } catch {
          /* skip */
        }
      }),
    );
    const news = await cached(`n:ds:${q.toLowerCase()}`, 20_000, () =>
      mergeNews([fetchNews(`${q} stock India`), fetchNews(`${q} NSE BSE`)], 10),
    ).catch(() => [] as NewsItem[]);
    return {
      query: q,
      hits: top,
      quotes,
      news,
      googleFinanceSearch: googleFinanceSearchUrl(q),
      googleSearch: googleSearchUrl(`${q} NSE BSE stock`),
    };
  });

export const getMarketHome = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { region?: string; fresh?: boolean };
    const region = String(d?.region ?? "india") as "india" | "us" | "europe" | "crypto" | "fx";
    return { region, fresh: Boolean(d?.fresh) };
  })
  .handler(async ({ data }) => {
    const list = INDICES.filter((i) => i.region === data.region).slice(0, 4);
    const quotes: MarketQuote[] = [];
    await Promise.all(
      list.map(async (i) => {
        try {
          const row = await cached(`q:${i.yahoo}`, 8_000, () => fetchChart(i.yahoo, "5d"), data.fresh);
          quotes.push({ ...row.quote, name: i.name, shortName: i.name });
        } catch {
          /* skip */
        }
      }),
    );
    const news = await cached(`n:home:${data.region}`, 20_000, () => fetchRegionNews(data.region), data.fresh).catch(
      () => [] as NewsItem[],
    );
    const session = nseSession();
    const asOf = quotes.reduce((m, q) => Math.max(m, q.asOf || 0), 0) || Date.now();
    const source = quotes.some((q) => q.source === "live") ? ("live" as const) : quotes.some((q) => q.source === "cached") ? ("cached" as const) : ("simulated" as const);
    return { quotes, news, session, region: data.region, asOf, source };
  });

export type NseDeskStats = {
  traded: number;
  advances: number;
  declines: number;
  unchanged: number;
  weekHigh: number;
  weekLow: number;
  volume: number;
  value: number;
};

export type NseSectorBook = {
  sector: string;
  names: number;
  volume: number;
  value: number;
};

export const getNseDesk = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { fresh?: boolean; range?: QuoteRange };
    const range = (d?.range ?? "1d") as QuoteRange;
    if (!(range in RANGE_MAP)) throw new Error("bad range");
    return { fresh: Boolean(d?.fresh), range };
  })
  .handler(async ({ data }) => {
    const news = await cached(`n:home:india`, 20_000, () => fetchRegionNews("india"), data.fresh).catch(
      () => [] as NewsItem[],
    );
    try {
      const desk = await cached(`nse-desk:${data.range}`, 8_000, () => fetchNseDeskBundle(data.range), data.fresh);
      return { ...desk, news, range: data.range };
    } catch {
      const indexSpecs = INDICES.filter((i) => i.region === "india").slice(0, 12);
      const stockSpecs = COMPANIES.filter((c) => c.yahoo.endsWith(".NS")).slice(0, 28);
      const niftyYahoo = "^NSEI";
      const [niftyRow, indexQuotes, stockQuotes] = await Promise.all([
        cached(`c:${niftyYahoo}:${data.range}`, 12_000, () => fetchChart(niftyYahoo, data.range), data.fresh),
        Promise.all(
          indexSpecs.map(async (i) => {
            try {
              const row = await cached(`q:${i.yahoo}`, 8_000, () => fetchChart(i.yahoo, "5d"), data.fresh);
              return { ...row.quote, name: i.name, shortName: i.name };
            } catch {
              return null;
            }
          }),
        ),
        Promise.all(
          stockSpecs.map(async (c) => {
            try {
              const row = await cached(`q:${c.yahoo}`, 8_000, () => fetchChart(c.yahoo, "5d"), data.fresh);
              return { quote: row.quote, sector: c.sector };
            } catch {
              return null;
            }
          }),
        ),
      ]);
      const indices = indexQuotes.filter((q): q is MarketQuote => Boolean(q));
      const stockRows = stockQuotes.filter((r): r is { quote: MarketQuote; sector: string } => Boolean(r));
      const stocks = stockRows.map((r) => r.quote);
      let advances = 0;
      let declines = 0;
      let unchanged = 0;
      let weekHigh = 0;
      let weekLow = 0;
      let volume = 0;
      let value = 0;
      const bySector = new Map<string, { names: number; volume: number; value: number }>();
      for (const row of stockRows) {
        const q = row.quote;
        if (q.change > 0) advances += 1;
        else if (q.change < 0) declines += 1;
        else unchanged += 1;
        if (q.fiftyTwoWeekHigh && q.price >= q.fiftyTwoWeekHigh * 0.995) weekHigh += 1;
        if (q.fiftyTwoWeekLow && q.price <= q.fiftyTwoWeekLow * 1.005) weekLow += 1;
        const vol = q.volume ?? 0;
        volume += vol;
        value += vol * q.price;
        const cur = bySector.get(row.sector) ?? { names: 0, volume: 0, value: 0 };
        cur.names += 1;
        cur.volume += vol;
        cur.value += vol * q.price;
        bySector.set(row.sector, cur);
      }
      const book: NseSectorBook[] = [...bySector.entries()]
        .map(([sector, v]) => ({ sector, ...v }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8);
      const session = nseSession();
      const asOf =
        [niftyRow.quote, ...indices, ...stocks].reduce((m, q) => Math.max(m, q.asOf || 0), 0) || Date.now();
      const sourceList = [niftyRow.quote, ...indices, ...stocks];
      const source = sourceList.some((q) => q.source === "live")
        ? ("live" as const)
        : sourceList.some((q) => q.source === "cached")
          ? ("cached" as const)
          : ("simulated" as const);
      return {
        nifty: { ...niftyRow.quote, name: "NIFTY 50", shortName: "NIFTY 50" },
        niftyChart: niftyRow.series,
        open: niftyRow.series.points[0]?.close ?? null,
        high: niftyRow.quote.dayHigh,
        low: niftyRow.quote.dayLow,
        prevClose: niftyRow.quote.previousClose,
        indices,
        heroIndices: indices.slice(0, 5),
        stocks,
        book,
        stats: { traded: stocks.length, advances, declines, unchanged, weekHigh, weekLow, volume, value },
        boardStats: NSE_BOARD_STATS,
        turnover: NSE_TURNOVER,
        turnoverTotal: NSE_TURNOVER_TOTAL,
        calls: NSE_ACTIVE_CALLS,
        puts: NSE_ACTIVE_PUTS,
        oiContracts: NSE_ACTIVE_OI,
        corporates: NSE_CORPORATES,
        ipo: NSE_IPO,
        fxSpot: NSE_FX_SPOT,
        fxFutures: NSE_FX_FUTURES,
        optionChain: NSE_OPTION_CHAIN,
        gift: NSE_GIFT,
        niftyUsd: NSE_NIFTY_USD,
        vix: indices.find((i) => /vix/i.test(i.name)) ?? null,
        news,
        session,
        asOf,
        source,
        feed: "yahoo" as const,
        lastPrint: NSE_CLOSE_IST,
        holidays: upcomingNseHolidays(),
        range: data.range,
      };
    }
  });

export const getIndexList = createServerFn({ method: "GET" }).handler(async () => {
  return INDICES;
});
