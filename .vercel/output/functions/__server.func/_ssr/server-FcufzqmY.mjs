import { a as displayTicker, c as googleFinanceSearchUrl, d as nseSession, f as searchUniverse, l as googleNewsUrl, o as findCompany, p as upcomingNseHolidays, r as INDICES, s as googleFinanceQuoteUrl, t as COMPANIES, u as googleSearchUrl } from "./universe-C6G9ps6z.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { _ as NSE_OPTION_CHAIN, a as NSE_BOARD_STATS, f as NSE_FX_SPOT, g as NSE_OHLC, h as NSE_NIFTY_USD, i as NSE_ACTIVE_PUTS, l as NSE_FX_FUTURES, m as NSE_IPO, n as NSE_ACTIVE_CALLS, o as NSE_CLOSE_IST, p as NSE_GIFT, r as NSE_ACTIVE_OI, s as NSE_CORPORATES, t as HERO_INDEX_IDS, v as NSE_TURNOVER, y as NSE_TURNOVER_TOTAL } from "./nse-session-DdhHigPE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-FcufzqmY.js
var UA$1 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
var MC = "https://appfeeds.moneycontrol.com/jsonapi/market";
var MC_PRICE = "https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia";
var INDEX_IDS = [
	{
		id: 9,
		yahoo: "^NSEI"
	},
	{
		id: 6,
		yahoo: "NSE:NEXT50"
	},
	{
		id: 23,
		yahoo: "^NSEBANK"
	},
	{
		id: 47,
		yahoo: "NSE:FINSERVICE"
	},
	{
		id: 128,
		yahoo: "NSE:MIDSELECT"
	},
	{
		id: 4,
		yahoo: "^BSESN"
	},
	{
		id: 19,
		yahoo: "^CNXIT"
	},
	{
		id: 52,
		yahoo: "^CNXAUTO"
	},
	{
		id: 41,
		yahoo: "^CNXPHARMA"
	},
	{
		id: 39,
		yahoo: "^CNXFMCG"
	},
	{
		id: 38,
		yahoo: "^CNXENERGY"
	},
	{
		id: 36,
		yahoo: "^INDIAVIX"
	},
	{
		id: 7,
		yahoo: "NSE:NIFTY500"
	},
	{
		id: 53,
		yahoo: "NSE:SMALLCAP"
	}
];
var SLUG_TO_YAHOO = {
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
	ultratechcement: "ULTRACEMCO.NS"
};
var RANGE_TO_MC = {
	"1d": "1d",
	"5d": "5d",
	"1mo": "1m",
	"6mo": "6m",
	ytd: "1y",
	"1y": "1y",
	"5y": "max",
	max: "max"
};
function num(v) {
	if (typeof v === "number" && Number.isFinite(v)) return v;
	if (typeof v !== "string") return 0;
	const n = Number(v.replace(/,/g, "").replace(/%/g, "").trim());
	return Number.isFinite(n) ? n : 0;
}
function vol(v) {
	if (typeof v === "number") return v;
	if (typeof v !== "string") return 0;
	const s = v.toLowerCase().replace(/,/g, "").trim();
	const m = s.match(/^(-?[\d.]+)\s*([kmb])?$/);
	if (!m) return num(s);
	const n = Number(m[1]);
	const u = m[2];
	return n * (u === "k" ? 1e3 : u === "m" ? 1e6 : u === "b" ? 1e9 : 1);
}
async function getJson(url, extra = {}) {
	const res = await fetch(url, {
		headers: {
			"User-Agent": UA$1,
			Accept: "application/json,text/plain,*/*",
			"Accept-Language": "en-IN,en;q=0.9",
			Referer: extra.Referer ?? "https://www.moneycontrol.com/markets/indian-indices/",
			...extra
		},
		signal: AbortSignal.timeout(8e3)
	});
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	return res.json();
}
function quoteFromIndex(row, yahoo, asOf) {
	const name = row.stkexchg?.trim();
	const price = num(row.lastprice);
	if (!name || !price) return null;
	const prev = num(row.prevclose) || price;
	const change = num(row.change) || price - prev;
	const changePct = (num(row.percentchange) || (prev ? change / prev * 100 : 0)) / 100;
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
		source: "live"
	};
}
function slugFromUrl(url) {
	if (!url) return "";
	const parts = url.replace(/\/+$/, "").split("/").filter(Boolean);
	return (parts.at(-2) ?? parts.at(-1) ?? "").toLowerCase();
}
function quoteFromStock(row, asOf, open) {
	const name = row.shortname?.trim();
	const price = num(row.lastvalue);
	if (!name || !price) return null;
	const change = num(row.change);
	const changePct = num(row.percentchange) / 100;
	const prev = price - change;
	const slug = slugFromUrl(row.url);
	return {
		symbol: SLUG_TO_YAHOO[slug] ?? `${slug.replace(/[^a-z0-9]/g, "").toUpperCase() || name}.NS`,
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
		source: "live"
	};
}
function parseGraphTime(label, fallback) {
	const s = label.trim();
	const months = {
		Jan: 0,
		Feb: 1,
		Mar: 2,
		Apr: 3,
		May: 4,
		Jun: 5,
		Jul: 6,
		Aug: 7,
		Sep: 8,
		Oct: 9,
		Nov: 10,
		Dec: 11
	};
	const withHm = s.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})\s+(\d{1,2}):(\d{2})$/);
	if (withHm) {
		const [, d, mon, y, h, mi] = withHm;
		return Date.UTC(Number(y), months[mon] ?? 0, Number(d), Number(h) - 5, Number(mi) - 30);
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
			day: "2-digit"
		}).formatToParts(base);
		const y = Number(parts.find((p) => p.type === "year")?.value);
		const m = Number(parts.find((p) => p.type === "month")?.value);
		const d = Number(parts.find((p) => p.type === "day")?.value);
		return Date.UTC(y, m - 1, d, Number(hm[1]) - 5, Number(hm[2]) - 30);
	}
	return fallback;
}
function seriesFromGraph(graph, range, asOf) {
	const values = graph.values ?? [];
	const points = [];
	for (const v of values) {
		const close = num(v._close ?? v._value);
		if (!close) continue;
		points.push({
			t: parseGraphTime(String(v._time ?? ""), asOf),
			close,
			volume: v._volume == null ? null : num(v._volume) || null
		});
	}
	return {
		symbol: "^NSEI",
		range,
		previousClose: num(graph.prev_close) || points[0]?.close || 0,
		currency: "INR",
		points
	};
}
async function fetchMcIndex(id) {
	const raw = await getJson(`${MC}/indices&ind_id=${id}`);
	if (!raw.indices?.stkexchg) throw new Error(`no index ${id}`);
	return raw.indices;
}
async function fetchMcPriceNifty() {
	const d = (await getJson(`${MC_PRICE}/in%3BNSX`, { Referer: "https://www.moneycontrol.com/" })).data;
	if (!d) throw new Error("no nifty price");
	const last = num(d.pricecurrent);
	const prev = num(d.priceprevclose);
	const asOf = num(d.lastupd_epoch) * 1e3 || Date.now();
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
		pct: num(d.pricepercentchange) || (prev ? (last - prev) / prev * 100 : 0),
		asOf,
		lastupd: String(d.lastupd ?? ""),
		state: String(d.market_state ?? "CLOSED"),
		weekHigh: num(d["52wkhi"]),
		weekLow: num(d["52wklow"])
	};
}
async function fetchUsdInr() {
	try {
		const px = (await getJson("https://query1.finance.yahoo.com/v8/finance/chart/USDINR=X?interval=1d&range=2d", { Referer: "https://finance.yahoo.com/" })).chart?.result?.[0]?.meta?.regularMarketPrice;
		return typeof px === "number" && px > 0 ? px : null;
	} catch {
		return null;
	}
}
var nseBlockedUntil = 0;
async function tryOfficialNse() {
	if (Date.now() < nseBlockedUntil) return null;
	try {
		const home = await fetch("https://www.nseindia.com/", {
			headers: {
				"User-Agent": UA$1,
				Accept: "text/html,application/xhtml+xml",
				"Accept-Language": "en-IN,en;q=0.9"
			},
			signal: AbortSignal.timeout(3500)
		});
		if (!home.ok) {
			nseBlockedUntil = Date.now() + 3e5;
			return null;
		}
		const cookies = home.headers.getSetCookie?.().map((c) => c.split(";")[0]).join("; ") ?? "";
		const res = await fetch("https://www.nseindia.com/api/allIndices", {
			headers: {
				"User-Agent": UA$1,
				Accept: "application/json",
				"Accept-Language": "en-IN,en;q=0.9",
				Referer: "https://www.nseindia.com/",
				Cookie: cookies
			},
			signal: AbortSignal.timeout(4e3)
		});
		if (!res.ok) {
			nseBlockedUntil = Date.now() + 3e5;
			return null;
		}
		return res.json();
	} catch {
		nseBlockedUntil = Date.now() + 3e5;
		return null;
	}
}
function emptyQuote(name, yahoo, asOf) {
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
		source: "live"
	};
}
async function fetchNseDeskBundle(range) {
	const feed = await tryOfficialNse() ? "nse" : "nse-relay";
	const [price, niftyRow, indexRows, stocksRaw, industriesRaw, graphRaw, usdInr] = await Promise.all([
		fetchMcPriceNifty(),
		fetchMcIndex(9),
		Promise.all(INDEX_IDS.map(async (i) => {
			try {
				return {
					spec: i,
					row: await fetchMcIndex(i.id)
				};
			} catch {
				return null;
			}
		})),
		getJson(`${MC}/marketmap&format=&type=0&ind_id=9`),
		getJson(`${MC}/marketmap&format=&type=1&ind_id=9`),
		getJson(`${MC}/graph&format=&ind_id=9&range=${RANGE_TO_MC[range] ?? "1d"}&type=area`),
		fetchUsdInr()
	]);
	const asOf = price.asOf || Number(niftyRow.epoch_time || 0) * 1e3 || Date.now();
	const open = String(price.state).toLowerCase() === "open";
	const cal = nseSession();
	const session = {
		open,
		label: open ? "NSE open · 9:15–15:30 IST" : cal.label
	};
	const niftyBase = quoteFromIndex(niftyRow, "^NSEI", asOf) ?? emptyQuote("NIFTY 50", "^NSEI", asOf);
	const nifty = {
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
		marketState: open ? "open" : "closed"
	};
	let graph = graphRaw.graph;
	if (range === "1y" || range === "ytd" || range === "5y") {
		const pts = graph?.values ?? [];
		const first = String(pts[0]?._time ?? "");
		if (/^\d{1,2}:\d{2}$/.test(first)) graph = (await getJson(`${MC}/graph&format=&ind_id=9&range=max&type=area`)).graph;
	}
	let niftyChart = seriesFromGraph(graph ?? {}, range, asOf);
	if (range === "1y" || range === "ytd") {
		const cut = asOf - (range === "ytd" ? asOf - Date.UTC(new Date(asOf).getUTCFullYear(), 0, 1) : 31536e6);
		niftyChart = {
			...niftyChart,
			points: niftyChart.points.filter((p) => p.t >= cut),
			range
		};
	} else if (range === "5y") niftyChart = {
		...niftyChart,
		points: niftyChart.points.filter((p) => p.t >= asOf - 15768e7),
		range
	};
	nifty.spark = niftyChart.points.map((p) => p.close).filter((_, i, a) => i % Math.max(1, Math.floor(a.length / 28)) === 0);
	const indices = indexRows.filter((x) => Boolean(x)).map((x) => quoteFromIndex(x.row, x.spec.yahoo === "^NSEI" && x.row.stkexchg !== "NIFTY 50" ? `NSE:${x.row.stkexchg}` : x.spec.yahoo, asOf)).filter((q) => Boolean(q));
	const vix = indices.find((i) => /vix/i.test(i.name)) ?? null;
	const heroIndices = HERO_INDEX_IDS.map((h) => {
		const want = h.label.toUpperCase().replace(/\s+/g, " ");
		const hit = indices.find((i) => i.name.toUpperCase().replace(/\s+/g, " ") === want) ?? indices.find((i) => {
			const n = i.name.toUpperCase().replace(/\s+/g, " ");
			if (want === "NIFTY 50") return n === "NIFTY 50";
			return n.includes(want) || n.includes(want.replace("NIFTY ", ""));
		});
		if (hit) return {
			...hit,
			name: h.label,
			shortName: h.label,
			symbol: h.yahoo
		};
		if (h.id === 9) return nifty;
		return emptyQuote(h.label, h.yahoo, asOf);
	});
	const stocks = (stocksRaw.item ?? []).map((s) => quoteFromStock(s, asOf, open)).filter((q) => Boolean(q));
	const book = (industriesRaw.item ?? []).map((s) => ({
		sector: s.shortname ?? "—",
		names: 0,
		volume: 0,
		value: num(s.mktcap) * 1e7
	})).filter((r) => r.sector && r.sector !== "—").sort((a, b) => b.value - a.value).slice(0, 12);
	const niftyAdv = stocks.filter((s) => s.change > 0).length || price.adv;
	const niftyDecl = stocks.filter((s) => s.change < 0).length || price.decl;
	const niftyUnch = stocks.filter((s) => s.change === 0).length || price.unchg;
	const volume = stocks.reduce((m, s) => m + (s.volume ?? 0), 0);
	const value = stocks.reduce((m, s) => m + (s.volume ?? 0) * s.price, 0);
	const lastPrint = niftyRow.lastupdated ? `${niftyRow.lastupdated} IST` : price.lastupd ? `${price.lastupd} IST` : NSE_CLOSE_IST;
	const fxSpot = NSE_FX_SPOT.map((row) => row.code === "USD" && usdInr ? {
		...row,
		today: usdInr
	} : row);
	const niftyUsd = {
		...NSE_NIFTY_USD,
		asOf: lastPrint
	};
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
			value
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
		holidays: upcomingNseHolidays()
	};
}
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var cache = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
function cached(key, ttlMs, fn, force = false) {
	const hit = cache.get(key);
	if (hit && Date.now() - hit.at < ttlMs && (!force || Date.now() - hit.at < 1e3)) return Promise.resolve(hit.value);
	const pending = inflight.get(key);
	if (pending && !force) return pending;
	const job = fn().then((value) => {
		cache.set(key, {
			at: Date.now(),
			value
		});
		inflight.delete(key);
		return value;
	}).catch((err) => {
		inflight.delete(key);
		if (hit) return hit.value;
		throw err;
	});
	inflight.set(key, job);
	return job;
}
async function yahooJson(path) {
	const hosts = ["https://query2.finance.yahoo.com", "https://query1.finance.yahoo.com"];
	let last = null;
	for (const host of hosts) try {
		const res = await fetch(host + path, {
			headers: {
				"User-Agent": UA,
				Accept: "application/json,text/plain,*/*",
				"Accept-Language": "en-IN,en;q=0.9"
			},
			signal: AbortSignal.timeout(4e3)
		});
		if (!res.ok) throw new Error(`Yahoo ${res.status}`);
		return await res.json();
	} catch (e) {
		last = e instanceof Error ? e : /* @__PURE__ */ new Error("Yahoo failed");
	}
	throw last ?? /* @__PURE__ */ new Error("Yahoo failed");
}
var RANGE_MAP = {
	"1d": {
		range: "1d",
		interval: "2m"
	},
	"5d": {
		range: "5d",
		interval: "15m"
	},
	"1mo": {
		range: "1mo",
		interval: "1d"
	},
	"6mo": {
		range: "6mo",
		interval: "1d"
	},
	ytd: {
		range: "ytd",
		interval: "1d"
	},
	"1y": {
		range: "1y",
		interval: "1d"
	},
	"5y": {
		range: "5y",
		interval: "1wk"
	},
	max: {
		range: "max",
		interval: "1mo"
	}
};
function sparkFrom(closes, n = 28) {
	if (closes.length <= n) return closes;
	const step = (closes.length - 1) / (n - 1);
	const out = [];
	for (let i = 0; i < n; i++) out.push(closes[Math.round(i * step)]);
	return out;
}
var SIM_BASE = {
	"^NSEI": {
		price: 23398,
		currency: "INR"
	},
	"^BSESN": {
		price: 74782,
		currency: "INR"
	},
	"^NSEBANK": {
		price: 56607,
		currency: "INR"
	},
	"^CNXIT": {
		price: 28922,
		currency: "INR"
	},
	"^CNXAUTO": {
		price: 23880,
		currency: "INR"
	},
	"^CNXPHARMA": {
		price: 21940,
		currency: "INR"
	},
	"^CNXFMCG": {
		price: 54810,
		currency: "INR"
	},
	"^CNXENERGY": {
		price: 33820,
		currency: "INR"
	},
	"^GSPC": {
		price: 7657,
		currency: "USD"
	},
	"^DJI": {
		price: 50780,
		currency: "USD"
	},
	"^IXIC": {
		price: 21640,
		currency: "USD"
	},
	"^N225": {
		price: 42880,
		currency: "JPY"
	},
	"^FTSE": {
		price: 9180,
		currency: "GBP"
	},
	"^GDAXI": {
		price: 23640,
		currency: "EUR"
	},
	"^FCHI": {
		price: 7840,
		currency: "EUR"
	},
	"BTC-USD": {
		price: 77125,
		currency: "USD"
	},
	"ETH-USD": {
		price: 4280,
		currency: "USD"
	},
	"USDINR=X": {
		price: 95.55,
		currency: "INR"
	},
	"EURINR=X": {
		price: 111.4,
		currency: "INR"
	},
	"GC=F": {
		price: 4409,
		currency: "USD"
	},
	"^INDIAVIX": {
		price: 12.29,
		currency: "INR"
	},
	"RELIANCE.NS": {
		price: 1257.5,
		currency: "INR"
	},
	"TCS.NS": {
		price: 2200.8,
		currency: "INR"
	},
	"HDFCBANK.NS": {
		price: 708.25,
		currency: "INR"
	},
	"INFY.NS": {
		price: 1037.7,
		currency: "INR"
	},
	"ICICIBANK.NS": {
		price: 1379.3,
		currency: "INR"
	},
	"ITC.NS": {
		price: 412,
		currency: "INR"
	},
	"SBIN.NS": {
		price: 995.7,
		currency: "INR"
	},
	"BHARTIARTL.NS": {
		price: 1802,
		currency: "INR"
	},
	"AXISBANK.NS": {
		price: 1273,
		currency: "INR"
	}
};
function hashSeed(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function simulateChart(symbol, range) {
	let seed = hashSeed(`${symbol}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}-${(/* @__PURE__ */ new Date()).getHours()}-${range}`);
	const rand = () => {
		seed = seed * 1664525 + 1013904223 >>> 0;
		return seed / 4294967296;
	};
	const company = findCompany(symbol);
	const listed = INDICES.find((i) => i.yahoo.toUpperCase() === symbol.toUpperCase());
	const baseRow = SIM_BASE[symbol] ?? SIM_BASE[symbol.toUpperCase()];
	const base = baseRow?.price ?? (company?.eps ? Math.max(40, company.eps * 18) : 500 + hashSeed(symbol) % 2500);
	const currency = baseRow?.currency ?? "INR";
	const n = range === "1d" ? 48 : range === "5d" ? 40 : range === "1mo" ? 32 : range === "max" ? 60 : 40;
	const drift = (rand() - .48) * .012;
	const points = [];
	const closes = [];
	let price = base * (1 + (rand() - .5) * .02);
	const now = Date.now();
	const stepMs = range === "1d" ? 3e5 : range === "5d" ? 18e5 : range === "1mo" ? 864e5 : 6048e5;
	for (let i = 0; i < n; i++) {
		const open = price;
		price = Math.max(base * .7, price * (1 + drift + (rand() - .5) * .008));
		const close = price;
		const wick = Math.abs(close - open) * .35 + base * .001 * rand();
		const t = now - (n - 1 - i) * stepMs;
		points.push({
			t,
			open,
			close,
			high: Math.max(open, close) + wick,
			low: Math.max(1, Math.min(open, close) - wick * rand()),
			volume: Math.round(2e5 + rand() * 2e6)
		});
		closes.push(price);
	}
	const last = closes[closes.length - 1] ?? base;
	const prev = closes[0] ?? base;
	const change = last - prev;
	const changePct = prev ? change / prev : 0;
	const hi = Math.max(...closes);
	const lo = Math.min(...closes);
	return {
		quote: {
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
			fiftyTwoWeekLow: lo * .88,
			spark: sparkFrom(closes),
			marketState: sessionState(),
			asOf: now,
			source: "simulated"
		},
		series: {
			symbol,
			range,
			previousClose: prev,
			currency,
			points
		}
	};
}
function sessionState() {
	return nseSession().open ? "open" : "closed";
}
var lastLive = /* @__PURE__ */ new Map();
async function fetchChart(symbol, range) {
	try {
		const live = await fetchChartLive(symbol, range);
		lastLive.set(`${symbol}:${range}`, live);
		lastLive.set(`q:${symbol}`, live);
		return live;
	} catch {
		const hit = lastLive.get(`${symbol}:${range}`) ?? lastLive.get(`q:${symbol}`);
		if (hit) return {
			quote: {
				...hit.quote,
				source: "cached",
				marketState: sessionState()
			},
			series: hit.series
		};
		return simulateChart(symbol, range);
	}
}
async function fetchChartLive(symbol, range) {
	const spec = RANGE_MAP[range];
	const result = (await yahooJson(`/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${spec.interval}&range=${spec.range}&includePrePost=false`)).chart?.result?.[0];
	if (!result) throw new Error("No chart data");
	const meta = result.meta;
	const ts = result.timestamp ?? [];
	const quoteBar = result.indicators?.quote?.[0];
	const close = quoteBar?.close ?? [];
	const open = quoteBar?.open ?? [];
	const high = quoteBar?.high ?? [];
	const low = quoteBar?.low ?? [];
	const vol = quoteBar?.volume ?? [];
	const points = [];
	const closes = [];
	for (let i = 0; i < ts.length; i++) {
		const c = close[i];
		if (c == null || !Number.isFinite(c)) continue;
		const o = open[i];
		const h = high[i];
		const l = low[i];
		points.push({
			t: ts[i] * 1e3,
			close: c,
			open: o != null && Number.isFinite(o) ? o : c,
			high: h != null && Number.isFinite(h) ? h : c,
			low: l != null && Number.isFinite(l) ? l : c,
			volume: vol[i] ?? null
		});
		closes.push(c);
	}
	const price = meta.regularMarketPrice ?? closes[closes.length - 1] ?? 0;
	const prev = meta.chartPreviousClose ?? meta.regularMarketPreviousClose ?? meta.previousClose ?? closes[closes.length - 2] ?? closes[0] ?? price;
	const change = price - prev;
	const changePct = prev ? change / prev : 0;
	const company = findCompany(symbol);
	const quote = {
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
		asOf: meta.regularMarketTime ? meta.regularMarketTime * 1e3 : Date.now(),
		source: "live"
	};
	return {
		quote,
		series: {
			symbol,
			range,
			previousClose: prev,
			currency: quote.currency,
			points
		}
	};
}
function parseRss(xml) {
	const items = [];
	const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
	for (const block of blocks) {
		const title = decodeXml(tag(block, "title"));
		const link = decodeXml(tag(block, "link"));
		const source = decodeXml((block.match(/<source[^>]*>([\s\S]*?)<\/source>/) ?? [])[1] ?? "") || decodeXml(tag(block, "dc:creator")) || "News";
		const published = decodeXml(tag(block, "pubDate"));
		if (!title) continue;
		items.push({
			title: title.replace(/ - [^-]+$/, (m) => source ? "" : m).trim() || title,
			source,
			url: link,
			published
		});
		if (items.length >= 16) break;
	}
	return items;
}
function tag(block, name) {
	return (block.match(new RegExp(`<${name}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${name}>`)) ?? block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`)))?.[1]?.trim() ?? "";
}
function decodeXml(s) {
	return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/* @__PURE__ */ new RegExp("&amp;", "g"), "&").replace(/* @__PURE__ */ new RegExp("&lt;", "g"), "<").replace(/* @__PURE__ */ new RegExp("&gt;", "g"), ">").replace(/* @__PURE__ */ new RegExp("&quot;", "g"), "\"").replace(/&#39;/g, "'").replace(/* @__PURE__ */ new RegExp("&apos;", "g"), "'");
}
async function fetchRss(url) {
	const res = await fetch(url, {
		headers: { "User-Agent": UA },
		signal: AbortSignal.timeout(4e3)
	});
	if (!res.ok) return [];
	return parseRss(await res.text());
}
async function fetchNews(query) {
	const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
	try {
		return await fetchRss(url);
	} catch {
		return [];
	}
}
function newsKey(title) {
	return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().slice(0, 72);
}
async function mergeNews(feeds, limit = 16) {
	const chunks = await Promise.all(feeds.map((p) => p.catch(() => [])));
	const seen = /* @__PURE__ */ new Set();
	const all = [];
	for (const items of chunks) for (const it of items) {
		const key = newsKey(it.title);
		if (!key || seen.has(key)) continue;
		seen.add(key);
		all.push(it);
	}
	all.sort((a, b) => (Date.parse(b.published) || 0) - (Date.parse(a.published) || 0));
	return all.slice(0, limit);
}
var NEWS_QUERIES = {
	india: {
		rss: [
			"https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
			"https://www.moneycontrol.com/rss/MCtopnews.xml",
			"https://www.livemint.com/rss/markets"
		],
		q: ["Nifty Sensex India stock market", "crude oil rupee gold India markets"]
	},
	us: {
		rss: ["https://feeds.a.dj.com/rss/RSSMarketsMain.xml"],
		q: ["S&P 500 Nasdaq Dow stock market", "Federal Reserve stocks"]
	},
	europe: {
		rss: [],
		q: ["European stocks STOXX DAX FTSE", "ECB markets"]
	},
	fx: {
		rss: [],
		q: ["USDINR rupee dollar RBI", "gold silver forex India"]
	},
	crypto: {
		rss: [],
		q: ["Bitcoin Ethereum crypto market"]
	}
};
async function fetchRegionNews(region) {
	const spec = NEWS_QUERIES[region] ?? NEWS_QUERIES.india;
	return mergeNews([...spec.rss.map((url) => fetchRss(url)), ...spec.q.map((q) => fetchNews(q))], 16);
}
async function yahooSearch(q, indiaOnly = true) {
	return ((await yahooJson(`/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=12&newsCount=0`)).quotes ?? []).filter((x) => x.symbol && (x.quoteType === "EQUITY" || x.quoteType === "INDEX" || x.quoteType === "ETF")).map((x) => ({
		symbol: x.symbol,
		name: x.longname ?? x.shortname ?? x.symbol,
		exchange: x.exchDisp ?? x.exchange ?? "",
		type: x.quoteType ?? "EQUITY"
	})).filter((r) => {
		if (!indiaOnly) return true;
		const ex = r.exchange.toUpperCase();
		return r.symbol.endsWith(".NS") || r.symbol.endsWith(".BO") || ex.includes("NSE") || ex.includes("BSE") || ex.includes("BOMBAY") || r.symbol.startsWith("^") || r.type === "INDEX";
	});
}
function analysisFrom(quote, yearCloses, profile) {
	const lines = [];
	const { price, changePct, fiftyTwoWeekHigh, fiftyTwoWeekLow, dayHigh, dayLow } = quote;
	const up = changePct >= 0;
	lines.push(`${quote.name} is ${up ? "up" : "down"} ${(Math.abs(changePct) * 100).toFixed(2)}% versus the previous close, trading at ${formatPx(price, quote.currency)}.`);
	if (fiftyTwoWeekHigh && fiftyTwoWeekLow) {
		const vsHigh = (price / fiftyTwoWeekHigh - 1) * 100;
		const span = fiftyTwoWeekHigh - fiftyTwoWeekLow || 1;
		const pos = (price - fiftyTwoWeekLow) / span * 100;
		lines.push(`The stock is ${Math.abs(vsHigh).toFixed(1)}% ${vsHigh >= 0 ? "above" : "below"} its 52-week high of ${formatPx(fiftyTwoWeekHigh, quote.currency)}, sitting near the ${pos.toFixed(0)}th percentile of the 52-week range.`);
	}
	if (dayHigh && dayLow) lines.push(`Today’s range is ${formatPx(dayLow, quote.currency)} – ${formatPx(dayHigh, quote.currency)}.`);
	if (yearCloses.length > 20) {
		const ago = yearCloses[0];
		const ret = ago ? (price / ago - 1) * 100 : 0;
		lines.push(`Over the available 1-year window the last close implies a ${ret >= 0 ? "gain" : "decline"} of ${Math.abs(ret).toFixed(1)}%.`);
	}
	if (profile?.quarters?.length) {
		const last = profile.quarters[profile.quarters.length - 1];
		if (last.yoyRevenue != null) lines.push(`Latest compiled quarter (${last.label}) shows revenue ${last.yoyRevenue >= 0 ? "up" : "down"} ${(Math.abs(last.yoyRevenue) * 100).toFixed(1)}% YoY` + (last.yoyPat != null ? ` and PAT ${last.yoyPat >= 0 ? "up" : "down"} ${(Math.abs(last.yoyPat) * 100).toFixed(1)}% YoY.` : "."));
	}
	lines.push("This is an educational snapshot built from public market data — not a recommendation to buy or sell.");
	return lines;
}
function formatPx(n, ccy) {
	if (ccy === "INR" || ccy === "USD") return (ccy === "INR" ? "₹" : "$") + n.toLocaleString(ccy === "INR" ? "en-IN" : "en-US", { maximumFractionDigits: n >= 100 ? 2 : 4 });
	return n.toLocaleString("en-IN", { maximumFractionDigits: 2 }) + " " + ccy;
}
function retFrom(closes, days, price) {
	if (closes.length < days) return null;
	const base = closes[closes.length - 1 - days];
	if (!base) return null;
	return price / base - 1;
}
function currencyFor(symbol) {
	if (symbol.endsWith(".NS") || symbol.endsWith(".BO") || symbol.startsWith("^NSE") || symbol.startsWith("^BSE") || symbol.startsWith("^CNX") || symbol.startsWith("^CRSL") || symbol === "^INDIAVIX" || symbol.startsWith("NIFTY") || symbol === "USDINR=X") return "INR";
	return "USD";
}
function mapSparkRows(wanted, raw) {
	const session = sessionState();
	const out = [];
	for (const symbol of wanted) {
		const row = raw[symbol];
		const closes = (row?.close ?? []).filter((n) => Number.isFinite(n));
		const price = row?.fulldayPrice ?? closes[closes.length - 1];
		if (price == null || !Number.isFinite(price)) continue;
		const prev = row?.previousClose && row.previousClose > 0 ? row.previousClose : price;
		const change = row?.fulldayChange ?? price - prev;
		const changePct = row?.fulldayChangePercent != null ? row.fulldayChangePercent / 100 : prev ? change / prev : 0;
		const company = findCompany(symbol);
		const index = INDICES.find((i) => i.yahoo === symbol);
		const spark = closes.length > 32 ? closes.filter((_, i) => i % Math.ceil(closes.length / 32) === 0) : closes;
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
			asOf: (row?.end ?? Math.floor(Date.now() / 1e3)) * 1e3,
			source: "live"
		});
	}
	return out;
}
async function fetchSparkChunk(symbols) {
	if (!symbols.length) return [];
	const path = `/v8/finance/spark?symbols=${symbols.map(encodeURIComponent).join(",")}&range=1d&interval=5m`;
	try {
		const raw = await yahooJson(path);
		if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Spark empty");
		const rows = mapSparkRows(symbols, raw);
		if (!rows.length) throw new Error("Spark empty");
		return rows;
	} catch (err) {
		if (symbols.length === 1) return [];
		const mid = Math.ceil(symbols.length / 2);
		const [a, b] = await Promise.all([fetchSparkChunk(symbols.slice(0, mid)), fetchSparkChunk(symbols.slice(mid))]);
		if (!a.length && !b.length) throw err;
		return [...a, ...b];
	}
}
/** One Yahoo call per small group, so a long list still refreshes every second. */
async function fetchSparkQuotes(symbols) {
	const uniq = [...new Set(symbols.map((s) => s.trim()).filter(Boolean))].slice(0, 40);
	if (!uniq.length) return [];
	const chunks = [];
	for (let i = 0; i < uniq.length; i += 8) chunks.push(uniq.slice(i, i + 8));
	const out = (await Promise.all(chunks.map((chunk) => fetchSparkChunk(chunk)))).flat();
	if (!out.length) throw new Error("Spark empty");
	return out;
}
var getQuotes_createServerFn_handler = createServerRpc({
	id: "5948da8bf4c04fa12b5a432843bb3a7036103dc6f3e924194d39a3211ad6f650",
	name: "getQuotes",
	filename: "src/lib/market/server.ts"
}, (opts) => getQuotes.__executeServer(opts));
var getQuotes = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	const symbols = d?.symbols;
	if (!Array.isArray(symbols)) throw new Error("symbols required");
	return {
		symbols: symbols.slice(0, 40).map(String),
		fresh: Boolean(d.fresh)
	};
}).handler(getQuotes_createServerFn_handler, async ({ data }) => {
	const key = `live:${[...data.symbols].sort().join("|")}`;
	try {
		const rows = await cached(key, 1e3, () => fetchSparkQuotes(data.symbols), data.fresh);
		if (rows.length) {
			const order = new Map(data.symbols.map((s, i) => [s, i]));
			return [...rows].sort((a, b) => (order.get(a.symbol) ?? 0) - (order.get(b.symbol) ?? 0));
		}
	} catch {}
	const out = [];
	await Promise.all(data.symbols.map(async (sym) => {
		try {
			const row = await cached(`q:${sym}`, 8e3, () => fetchChart(sym, "5d"), data.fresh);
			out.push(row.quote);
		} catch {}
	}));
	const order = new Map(data.symbols.map((s, i) => [s, i]));
	out.sort((a, b) => (order.get(a.symbol) ?? 0) - (order.get(b.symbol) ?? 0));
	return out;
});
var getChart_createServerFn_handler = createServerRpc({
	id: "a04b39d305727adcd6ad9cb315ab77e37f8791cd7d5e940e045bcb457dff4725",
	name: "getChart",
	filename: "src/lib/market/server.ts"
}, (opts) => getChart.__executeServer(opts));
var getChart = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	if (!d?.symbol) throw new Error("symbol required");
	const range = d.range ?? "1d";
	if (!(range in RANGE_MAP)) throw new Error("bad range");
	return {
		symbol: String(d.symbol),
		range,
		fresh: Boolean(d.fresh)
	};
}).handler(getChart_createServerFn_handler, async ({ data }) => {
	return (await cached(`c:${data.symbol}:${data.range}`, 12e3, () => fetchChart(data.symbol, data.range), data.fresh)).series;
});
var getQuoteBundle_createServerFn_handler = createServerRpc({
	id: "b354a524a6cbba392d0645cea016f451d312080d2b0c965435be457138c033ac",
	name: "getQuoteBundle",
	filename: "src/lib/market/server.ts"
}, (opts) => getQuoteBundle.__executeServer(opts));
var getQuoteBundle = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	if (!d?.symbol) throw new Error("symbol required");
	return {
		symbol: String(d.symbol),
		range: d.range ?? "1d",
		fresh: Boolean(d.fresh)
	};
}).handler(getQuoteBundle_createServerFn_handler, async ({ data }) => {
	const profile = findCompany(data.symbol) ?? null;
	const yahoo = profile?.yahoo ?? data.symbol;
	const [main, year] = await Promise.all([cached(`c:${yahoo}:${data.range}`, 12e3, () => fetchChart(yahoo, data.range), data.fresh), cached(`c:${yahoo}:1y`, 45e3, () => fetchChart(yahoo, "1y"), data.fresh).catch(() => null)]);
	const yearCloses = year?.series.points.map((p) => p.close) ?? [];
	const newsQuery = profile ? `${profile.name} stock` : `${main.quote.name} stock`;
	const news = await cached(`n:${newsQuery}`, 2e4, () => mergeNews([fetchNews(newsQuery), fetchNews(`${newsQuery} India NSE`)], 10), data.fresh).catch(() => []);
	const avgVolume = year && year.series.points.length ? year.series.points.reduce((s, p) => s + (p.volume ?? 0), 0) / year.series.points.length : null;
	const marketCap = profile?.sharesCr && main.quote.price ? profile.sharesCr * 1e7 * main.quote.price : null;
	const vs52wHigh = main.quote.fiftyTwoWeekHigh && main.quote.fiftyTwoWeekHigh > 0 ? main.quote.price / main.quote.fiftyTwoWeekHigh - 1 : null;
	return {
		quote: {
			...main.quote,
			spark: year?.quote.spark ?? main.quote.spark
		},
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
			return1y: yearCloses.length > 2 ? main.quote.price / yearCloses[0] - 1 : null,
			vs52wHigh
		},
		delayed: true
	};
});
var searchSymbols_createServerFn_handler = createServerRpc({
	id: "c92fff7a71d6b66371a7fb00eccfda99f9b3a5a18eec9613d8925e8f284ad937",
	name: "searchSymbols",
	filename: "src/lib/market/server.ts"
}, (opts) => searchSymbols.__executeServer(opts));
var searchSymbols = createServerFn({ method: "POST" }).validator((data) => {
	return { q: String(data?.q ?? "").trim() };
}).handler(searchSymbols_createServerFn_handler, async ({ data }) => {
	const q = data.q;
	if (q.length < 1) return {
		local: [],
		remote: []
	};
	const local = searchUniverse(q, 8);
	let remote = [];
	if (q.length >= 2) try {
		remote = await cached(`s:${q.toLowerCase()}`, 6e4, () => yahooSearch(q, true));
		const localYahoo = new Set(local.map((c) => c.yahoo.toUpperCase()));
		remote = remote.filter((r) => !localYahoo.has(r.symbol.toUpperCase()));
	} catch {
		remote = [];
	}
	return {
		local,
		remote: remote.slice(0, 8)
	};
});
var deepSearch_createServerFn_handler = createServerRpc({
	id: "2511b9cef7a308ff5ec82e09bd3b563ad5c75799f7f4c3af8fa8d4fc1defe76d",
	name: "deepSearch",
	filename: "src/lib/market/server.ts"
}, (opts) => deepSearch.__executeServer(opts));
var deepSearch = createServerFn({ method: "POST" }).validator((data) => {
	const q = String(data?.q ?? "").trim();
	if (q.length > 80) throw new Error("Keep searches under 80 characters");
	return { q };
}).handler(deepSearch_createServerFn_handler, async ({ data }) => {
	const q = data.q;
	const empty = {
		query: q,
		hits: [],
		quotes: [],
		news: [],
		googleFinanceSearch: googleFinanceSearchUrl(q || "Nifty 50"),
		googleSearch: googleSearchUrl(`${q || "Indian stock market"} NSE BSE`)
	};
	if (q.length < 1) return empty;
	const local = searchUniverse(q, 10);
	let remote = [];
	try {
		remote = await cached(`ds:${q.toLowerCase()}`, 6e4, () => yahooSearch(q, false));
	} catch {
		remote = [];
	}
	const hits = [];
	const seen = /* @__PURE__ */ new Set();
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
			googleNews: googleNewsUrl(`${c.name} stock`)
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
			googleNews: googleNewsUrl(`${r.name} stock`)
		});
	}
	const top = hits.slice(0, 10);
	const quotes = [];
	await Promise.all(top.map(async (h) => {
		try {
			const row = await cached(`q:${h.symbol}`, 8e3, () => fetchChart(h.symbol, "5d"));
			quotes.push(row.quote);
		} catch {}
	}));
	return {
		query: q,
		hits: top,
		quotes,
		news: await cached(`n:ds:${q.toLowerCase()}`, 2e4, () => mergeNews([fetchNews(`${q} stock India`), fetchNews(`${q} NSE BSE`)], 10)).catch(() => []),
		googleFinanceSearch: googleFinanceSearchUrl(q),
		googleSearch: googleSearchUrl(`${q} NSE BSE stock`)
	};
});
var getMarketHome_createServerFn_handler = createServerRpc({
	id: "1032937a8477871338630ae8ff42a84bcde9f05f7f24c728920eb9ee81fa0105",
	name: "getMarketHome",
	filename: "src/lib/market/server.ts"
}, (opts) => getMarketHome.__executeServer(opts));
var getMarketHome = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	return {
		region: String(d?.region ?? "india"),
		fresh: Boolean(d?.fresh)
	};
}).handler(getMarketHome_createServerFn_handler, async ({ data }) => {
	const list = INDICES.filter((i) => i.region === data.region).slice(0, 4);
	const quotes = [];
	await Promise.all(list.map(async (i) => {
		try {
			const row = await cached(`q:${i.yahoo}`, 8e3, () => fetchChart(i.yahoo, "5d"), data.fresh);
			quotes.push({
				...row.quote,
				name: i.name,
				shortName: i.name
			});
		} catch {}
	}));
	const news = await cached(`n:home:${data.region}`, 2e4, () => fetchRegionNews(data.region), data.fresh).catch(() => []);
	const session = nseSession();
	const asOf = quotes.reduce((m, q) => Math.max(m, q.asOf || 0), 0) || Date.now();
	const source = quotes.some((q) => q.source === "live") ? "live" : quotes.some((q) => q.source === "cached") ? "cached" : "simulated";
	return {
		quotes,
		news,
		session,
		region: data.region,
		asOf,
		source
	};
});
var getNseDesk_createServerFn_handler = createServerRpc({
	id: "80872c179abf26db717be80bd954f3e92e693da313276734e9f1893749fad329",
	name: "getNseDesk",
	filename: "src/lib/market/server.ts"
}, (opts) => getNseDesk.__executeServer(opts));
var getNseDesk = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	const range = d?.range ?? "1d";
	if (!(range in RANGE_MAP)) throw new Error("bad range");
	return {
		fresh: Boolean(d?.fresh),
		range
	};
}).handler(getNseDesk_createServerFn_handler, async ({ data }) => {
	const news = await cached(`n:home:india`, 2e4, () => fetchRegionNews("india"), data.fresh).catch(() => []);
	try {
		return {
			...await cached(`nse-desk:${data.range}`, 8e3, () => fetchNseDeskBundle(data.range), data.fresh),
			news,
			range: data.range
		};
	} catch {
		const indexSpecs = INDICES.filter((i) => i.region === "india").slice(0, 12);
		const stockSpecs = COMPANIES.filter((c) => c.yahoo.endsWith(".NS")).slice(0, 28);
		const niftyYahoo = "^NSEI";
		const [niftyRow, indexQuotes, stockQuotes] = await Promise.all([
			cached(`c:${niftyYahoo}:${data.range}`, 12e3, () => fetchChart(niftyYahoo, data.range), data.fresh),
			Promise.all(indexSpecs.map(async (i) => {
				try {
					return {
						...(await cached(`q:${i.yahoo}`, 8e3, () => fetchChart(i.yahoo, "5d"), data.fresh)).quote,
						name: i.name,
						shortName: i.name
					};
				} catch {
					return null;
				}
			})),
			Promise.all(stockSpecs.map(async (c) => {
				try {
					return {
						quote: (await cached(`q:${c.yahoo}`, 8e3, () => fetchChart(c.yahoo, "5d"), data.fresh)).quote,
						sector: c.sector
					};
				} catch {
					return null;
				}
			}))
		]);
		const indices = indexQuotes.filter((q) => Boolean(q));
		const stockRows = stockQuotes.filter((r) => Boolean(r));
		const stocks = stockRows.map((r) => r.quote);
		let advances = 0;
		let declines = 0;
		let unchanged = 0;
		let weekHigh = 0;
		let weekLow = 0;
		let volume = 0;
		let value = 0;
		const bySector = /* @__PURE__ */ new Map();
		for (const row of stockRows) {
			const q = row.quote;
			if (q.change > 0) advances += 1;
			else if (q.change < 0) declines += 1;
			else unchanged += 1;
			if (q.fiftyTwoWeekHigh && q.price >= q.fiftyTwoWeekHigh * .995) weekHigh += 1;
			if (q.fiftyTwoWeekLow && q.price <= q.fiftyTwoWeekLow * 1.005) weekLow += 1;
			const vol = q.volume ?? 0;
			volume += vol;
			value += vol * q.price;
			const cur = bySector.get(row.sector) ?? {
				names: 0,
				volume: 0,
				value: 0
			};
			cur.names += 1;
			cur.volume += vol;
			cur.value += vol * q.price;
			bySector.set(row.sector, cur);
		}
		const book = [...bySector.entries()].map(([sector, v]) => ({
			sector,
			...v
		})).sort((a, b) => b.value - a.value).slice(0, 8);
		const session = nseSession();
		const asOf = [
			niftyRow.quote,
			...indices,
			...stocks
		].reduce((m, q) => Math.max(m, q.asOf || 0), 0) || Date.now();
		const sourceList = [
			niftyRow.quote,
			...indices,
			...stocks
		];
		const source = sourceList.some((q) => q.source === "live") ? "live" : sourceList.some((q) => q.source === "cached") ? "cached" : "simulated";
		return {
			nifty: {
				...niftyRow.quote,
				name: "NIFTY 50",
				shortName: "NIFTY 50"
			},
			niftyChart: niftyRow.series,
			open: niftyRow.series.points[0]?.close ?? null,
			high: niftyRow.quote.dayHigh,
			low: niftyRow.quote.dayLow,
			prevClose: niftyRow.quote.previousClose,
			indices,
			heroIndices: indices.slice(0, 5),
			stocks,
			book,
			stats: {
				traded: stocks.length,
				advances,
				declines,
				unchanged,
				weekHigh,
				weekLow,
				volume,
				value
			},
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
			feed: "yahoo",
			lastPrint: NSE_CLOSE_IST,
			holidays: upcomingNseHolidays(),
			range: data.range
		};
	}
});
var getIndexList_createServerFn_handler = createServerRpc({
	id: "76936a157cae8e3a2f21f3c4632688d31273503a1515bffe40bb4eccdd043ccb",
	name: "getIndexList",
	filename: "src/lib/market/server.ts"
}, (opts) => getIndexList.__executeServer(opts));
var getIndexList = createServerFn({ method: "GET" }).handler(getIndexList_createServerFn_handler, async () => {
	return INDICES;
});
//#endregion
export { deepSearch_createServerFn_handler, getChart_createServerFn_handler, getIndexList_createServerFn_handler, getMarketHome_createServerFn_handler, getNseDesk_createServerFn_handler, getQuoteBundle_createServerFn_handler, getQuotes_createServerFn_handler, searchSymbols_createServerFn_handler };
