import { i as __toESM } from "../_runtime.mjs";
import { i as formatVol, o as pct, r as formatMoney, s as timeAgo, t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Area, d as Tooltip, i as XAxis, r as YAxis, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
import { C as ExternalLink, D as ChevronLeft, E as ChevronRight, N as Bell, S as FileText, l as Search, n as User } from "../_libs/lucide-react.mjs";
import { _ as getNseDesk, f as useLiveRefresh, y as getQuotes } from "./router-Dvl9OxAQ.mjs";
import { t as TapeStamp } from "./TapeStamp-BH7Q32bE.mjs";
import { c as NSE_FNO_IST, d as NSE_FX_IST, o as NSE_CLOSE_IST, u as NSE_FX_FUT_IST } from "./nse-session-DdhHigPE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nse-DPQgYdBH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RANGES = [
	{
		id: "1d",
		label: "1D"
	},
	{
		id: "1mo",
		label: "1M"
	},
	{
		id: "6mo",
		label: "6M"
	},
	{
		id: "1y",
		label: "1Y"
	}
];
var UTILITY = [
	{
		hash: "cas",
		label: "CAS"
	},
	{
		hash: "option-chain",
		label: "Option Chain"
	},
	{
		hash: "turnover",
		label: "Market Turnover"
	},
	{
		hash: "ipo",
		label: "Listings"
	},
	{
		hash: "ipo",
		label: "IPO"
	},
	{
		hash: "headlines",
		label: "Circulars"
	},
	{
		to: "/report",
		label: "Daily Report"
	},
	{
		hash: "holidays",
		label: "Holidays"
	},
	{
		hash: "corporates",
		label: "Corporates"
	},
	{
		hash: "headlines",
		label: "Press Releases"
	},
	{
		to: "/learn",
		label: "Contact Us"
	}
];
var MAIN_NAV = [
	{
		id: "home",
		label: "HOME"
	},
	{
		id: "link",
		label: "ABOUT",
		to: "/learn"
	},
	{
		id: "data",
		label: "MARKET DATA"
	},
	{
		id: "invest",
		label: "INVEST"
	},
	{
		id: "link",
		label: "LIST",
		to: "/learn"
	},
	{
		id: "link",
		label: "TRADE",
		to: "/chart-gpt"
	},
	{
		id: "link",
		label: "REGULATION",
		to: "/learn"
	},
	{
		id: "link",
		label: "LEARN",
		to: "/learn"
	},
	{
		id: "link",
		label: "RESOURCES",
		to: "/search"
	},
	{
		id: "link",
		label: "COMPLAINTS",
		href: "https://scores.sebi.gov.in/"
	},
	{
		id: "link",
		label: "RESEARCH",
		to: "/search"
	},
	{
		id: "link",
		label: "INVESTOR RELATIONS",
		to: "/progress"
	}
];
function inrNum(n, digits = 2) {
	return n.toLocaleString("en-IN", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
function signed(n, digits = 2) {
	const v = n.toLocaleString("en-IN", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
	return n > 0 ? `+${v}` : v;
}
function Tone({ n, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(n >= 0 ? "text-up" : "text-down", className),
		children
	});
}
function scrollToId(id) {
	document.getElementById(id)?.scrollIntoView({
		behavior: "smooth",
		block: "start"
	});
}
function NseBoard() {
	const navigate = useNavigate();
	const [range, setRange] = (0, import_react.useState)("1d");
	const [lang, setLang] = (0, import_react.useState)("en");
	const [query, setQuery] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("home");
	const [snap, setSnap] = (0, import_react.useState)("gainers");
	const [heroIdx, setHeroIdx] = (0, import_react.useState)(0);
	const [nifty, setNifty] = (0, import_react.useState)(null);
	const [chart, setChart] = (0, import_react.useState)(null);
	const [openPx, setOpenPx] = (0, import_react.useState)(null);
	const [prevClose, setPrevClose] = (0, import_react.useState)(null);
	const [heroIndices, setHeroIndices] = (0, import_react.useState)([]);
	const [indices, setIndices] = (0, import_react.useState)([]);
	const [stocks, setStocks] = (0, import_react.useState)([]);
	const [boardStats, setBoardStats] = (0, import_react.useState)(null);
	const [turnover, setTurnover] = (0, import_react.useState)([]);
	const [turnoverTotal, setTurnoverTotal] = (0, import_react.useState)(null);
	const [calls, setCalls] = (0, import_react.useState)([]);
	const [puts, setPuts] = (0, import_react.useState)([]);
	const [oiContracts, setOi] = (0, import_react.useState)([]);
	const [corporates, setCorporates] = (0, import_react.useState)([]);
	const [ipo, setIpo] = (0, import_react.useState)(null);
	const [fxSpot, setFxSpot] = (0, import_react.useState)([]);
	const [fxFutures, setFxFutures] = (0, import_react.useState)([]);
	const [optionChain, setOptionChain] = (0, import_react.useState)([]);
	const [gift, setGift] = (0, import_react.useState)(null);
	const [niftyUsd, setNiftyUsd] = (0, import_react.useState)(null);
	const [news, setNews] = (0, import_react.useState)([]);
	const [session, setSession] = (0, import_react.useState)({
		open: false,
		label: "NSE closed"
	});
	const [asOf, setAsOf] = (0, import_react.useState)(0);
	const [source, setSource] = (0, import_react.useState)("simulated");
	const [lastPrint, setLastPrint] = (0, import_react.useState)(NSE_CLOSE_IST);
	const [holidays, setHolidays] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [tick, setTick] = (0, import_react.useState)(0);
	useLiveRefresh(() => {
		getNseDesk({ data: {
			range,
			fresh: true
		} }).then((res) => {
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
			setLastPrint(res.lastPrint || "07-Oct-2026 15:30 IST");
			if (res.holidays?.length) setHolidays(res.holidays);
		}).finally(() => setBusy(false));
	}, 2e4, [range, tick]);
	const liveSymbols = (0, import_react.useRef)([
		"^NSEI",
		"^BSESN",
		"^NSEBANK",
		"^CNXIT",
		"^INDIAVIX"
	]);
	liveSymbols.current = [.../* @__PURE__ */ new Set([
		"^NSEI",
		"^BSESN",
		"^NSEBANK",
		"^CNXIT",
		"^INDIAVIX",
		...nifty ? [nifty.symbol] : [],
		...heroIndices.map((q) => q.symbol),
		...indices.map((q) => q.symbol),
		...stocks.map((q) => q.symbol)
	])].slice(0, 40);
	useLiveRefresh(() => {
		return getQuotes({ data: { symbols: liveSymbols.current } }).then((rows) => {
			if (!rows.length) return;
			const by = new Map(rows.map((q) => [q.symbol, q]));
			const patch = (q) => {
				const n = by.get(q.symbol);
				return n ? {
					...q,
					price: n.price,
					change: n.change,
					changePct: n.changePct,
					previousClose: n.previousClose,
					asOf: n.asOf,
					source: n.source
				} : q;
			};
			setNifty((q) => q ? patch(q) : by.get("^NSEI") ?? q);
			setHeroIndices((list) => list.map(patch));
			setIndices((list) => list.map(patch));
			setStocks((list) => list.map(patch));
			const latest = rows.reduce((m, q) => Math.max(m, q.asOf || 0), 0);
			if (latest) setAsOf(latest);
			setSource("live");
		});
	}, 1e3, []);
	const up = (nifty?.change ?? 0) >= 0;
	const q = query.trim().toLowerCase();
	const tape = (0, import_react.useMemo)(() => {
		const rows = q ? stocks.filter((s) => (s.shortName || s.name).toLowerCase().includes(q) || s.symbol.toLowerCase().includes(q)) : stocks;
		return rows.length ? [...rows, ...rows] : [];
	}, [stocks, q]);
	const gainers = (0, import_react.useMemo)(() => [...stocks].sort((a, b) => b.changePct - a.changePct).slice(0, 5), [stocks]);
	const losers = (0, import_react.useMemo)(() => [...stocks].sort((a, b) => a.changePct - b.changePct).slice(0, 5), [stocks]);
	const byValue = (0, import_react.useMemo)(() => [...stocks].sort((a, b) => (b.volume ?? 0) * b.price - (a.volume ?? 0) * a.price).slice(0, 5), [stocks]);
	const byVol = (0, import_react.useMemo)(() => [...stocks].sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0)).slice(0, 5), [stocks]);
	const snapRows = snap === "gainers" ? gainers : snap === "losers" ? losers : snap === "value" ? byValue : byVol;
	const visibleHero = heroIndices.slice(heroIdx, heroIdx + 5);
	const chartPts = chart?.points ?? [];
	function searchGo() {
		const text = query.trim();
		if (!text) return;
		const hit = stocks.find((s) => s.symbol.replace(/\.NS$/, "").toLowerCase() === text.toLowerCase() || (s.shortName || "").toLowerCase().includes(text.toLowerCase()));
		if (hit) {
			navigate({
				to: "/quote/$symbol",
				params: { symbol: hit.symbol }
			});
			return;
		}
		navigate({
			to: "/search",
			search: { q: text }
		});
	}
	function goHash(hash) {
		setTab(hash === "option-chain" ? "chain" : hash === "cas" || hash === "turnover" ? "data" : "home");
		window.setTimeout(() => scrollToId(hash), 50);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "nse-desk min-h-screen bg-nse-wash text-nse-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-nse-bar text-[11px] text-nse-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-2 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-x-3 gap-y-1",
						children: UTILITY.map((u) => u.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: u.to,
							className: "hover:underline",
							children: u.label
						}, u.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "hover:underline",
							onClick: () => goHash(u.hash),
							children: u.label
						}, u.label))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "h-8 rounded-sm border border-nse-ink/30 bg-transparent px-2 text-[11px]",
								value: lang,
								onChange: (e) => setLang(e.target.value),
								"aria-label": "Language",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "en",
									children: "English"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "hi",
									children: "हिन्दी"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4 opacity-80" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 opacity-80" })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-nse-line bg-nse-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1280px] flex-wrap items-center gap-3 px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-sm bg-nse-bar text-nse-ink",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold leading-none",
									children: "PV"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-lg font-bold tracking-tight text-nse",
									children: "NSE desk"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[10px] uppercase tracking-wide text-nse-muted",
									children: "PlanVista classroom"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "flex min-w-0 flex-1 overflow-hidden rounded-full border border-nse-line bg-nse-card",
							onSubmit: (e) => {
								e.preventDefault();
								searchGo();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "h-11 min-w-0 flex-1 bg-transparent px-4 text-sm outline-none",
								placeholder: "Search by Company name, Index or Symbol…",
								value: query,
								onChange: (e) => setQuery(e.target.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "grid size-11 place-items-center text-nse",
								"aria-label": "Search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full min-w-0 flex-wrap items-stretch gap-2 text-xs lg:w-auto",
							children: [
								nifty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "min-w-[132px] rounded-sm border border-nse-line px-3 py-1.5 text-left",
									onClick: () => setTab("home"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[10px] font-semibold text-nse",
											children: "Nifty 50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-bold tabular-nums",
											children: inrNum(nifty.price)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tone, {
											n: nifty.change,
											className: "block tabular-nums",
											children: [
												signed(nifty.change),
												" (",
												pct(nifty.changePct),
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[10px] text-nse-muted",
											children: lastPrint
										})
									]
								}) : null,
								niftyUsd ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-[132px] rounded-sm border border-nse-line px-3 py-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[10px] font-semibold text-nse",
											children: "Nifty 50 USD"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-bold tabular-nums",
											children: inrNum(niftyUsd.ltp)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tone, {
											n: niftyUsd.change,
											className: "block tabular-nums",
											children: [
												signed(niftyUsd.change),
												" (",
												niftyUsd.changePct.toFixed(2),
												"%)"
											]
										})
									]
								}) : null,
								gift ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-[140px] rounded-sm border border-nse-line px-3 py-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[10px] font-semibold text-nse",
											children: "GIFT Nifty"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-bold tabular-nums",
											children: inrNum(gift.ltp)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tone, {
											n: gift.change,
											className: "block tabular-nums",
											children: [
												signed(gift.change),
												" (",
												gift.changePct.toFixed(2),
												"%)"
											]
										})
									]
								}) : null
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "border-b border-nse-line bg-nse-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-[1280px] gap-1 overflow-x-auto px-2",
					children: MAIN_NAV.map((item) => {
						const active = item.id !== "link" && tab === item.id;
						const cls = cn("shrink-0 border-b-2 px-3 py-3 text-[12px] font-semibold tracking-wide", active ? "border-nse-gold text-nse" : "border-transparent text-nse-muted hover:text-nse");
						if (item.href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							target: "_blank",
							rel: "noreferrer",
							className: cls,
							children: item.label
						}, item.label);
						if (item.to) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: cls,
							children: item.label
						}, item.label);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cls,
							onClick: () => setTab(item.id),
							children: item.label
						}, item.label);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden border-b border-nse-line bg-nse-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max flex-nowrap animate-[ticker_70s_linear_infinite] py-2",
					children: (tape.length ? tape : [{
						symbol: "NIFTY",
						shortName: "NIFTY 50",
						price: 0,
						change: 0,
						changePct: 0,
						currency: "INR"
					}]).map((s, i) => {
						const green = s.change >= 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/quote/$symbol",
							params: { symbol: s.symbol },
							className: cn("mx-1 inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-sm border border-nse-line px-3 text-xs", green ? "border-l-4 border-l-up" : "border-l-4 border-l-down"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: (s.shortName || s.symbol.replace(/\.NS$/, "")).toUpperCase()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: inrNum(s.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tone, {
									n: s.change,
									className: "tabular-nums",
									children: [
										signed(s.change),
										" (",
										pct(s.changePct),
										")"
									]
								})
							]
						}, `${s.symbol}-${i}`);
					})
				})
			}),
			tab === "chain" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionChainPanel, {
				nifty,
				lastPrint,
				rows: optionChain,
				onBack: () => setTab("home")
			}) : tab === "invest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestPanel, { lang }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-[1280px] px-3 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-8 place-items-center rounded-full border border-nse-line",
								onClick: () => setHeroIdx((n) => Math.max(0, n - 1)),
								"aria-label": "Previous indices",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid min-w-0 flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5",
								children: (visibleHero.length ? visibleHero : heroIndices).map((idx) => {
									const green = idx.change >= 0;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => void navigate({
											to: "/quote/$symbol",
											params: { symbol: idx.symbol }
										}),
										className: cn("rounded-md border border-nse-line px-3 py-3 text-left", green ? "bg-nse-green-soft" : "bg-nse-pink"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-semibold uppercase tracking-wide text-nse-muted",
												children: idx.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-lg font-bold tabular-nums",
												children: inrNum(idx.price)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tone, {
												n: idx.change,
												className: "text-xs tabular-nums",
												children: [
													signed(idx.change),
													" (",
													pct(idx.changePct),
													")"
												]
											})
										]
									}, idx.name);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-8 place-items-center rounded-full border border-nse-line",
								onClick: () => setHeroIdx((n) => Math.min(Math.max(0, heroIndices.length - 5), n + 1)),
								"aria-label": "Next indices",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 lg:grid-cols-[1.15fr_0.85fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-nse-line bg-nse-card p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-sm font-bold uppercase tracking-wide text-nse",
										children: "NIFTY 50"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[11px] text-nse-muted",
										children: ["Updated: ", lastPrint]
									})]
								}),
								nifty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap items-end gap-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-3xl font-bold tabular-nums",
												children: inrNum(nifty.price)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tone, {
												n: nifty.change,
												className: "text-sm font-medium tabular-nums",
												children: [
													signed(nifty.change),
													" (",
													pct(nifty.changePct),
													")"
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendDot, {
												color: "var(--color-nse-mid)",
												label: "Open",
												value: openPx != null ? inrNum(openPx) : "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendDot, {
												color: "var(--color-up)",
												label: "High",
												value: nifty.dayHigh != null ? inrNum(nifty.dayHigh) : "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendDot, {
												color: "var(--color-down)",
												label: "Low",
												value: nifty.dayLow != null ? inrNum(nifty.dayLow) : "—"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex flex-wrap gap-1",
										children: RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setRange(r.id),
											className: cn("h-8 rounded-full px-3 text-[11px] font-semibold", range === r.id ? "bg-nse text-nse-ink" : "bg-nse-soft text-nse hover:bg-nse-line"),
											children: r.label
										}, r.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NiftyArea, {
										points: chartPts,
										up
									})
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-8 text-sm text-nse-muted",
									children: busy ? "Loading last print…" : "Tape unavailable."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TapeStamp, {
										asOf,
										source,
										session: session.label,
										label: "NSE last print · refreshes on open",
										busy,
										onRefresh: () => {
											setBusy(true);
											setTick((n) => n + 1);
										}
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "overflow-hidden rounded-md bg-nse-blue p-5 text-nse-ink",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-nse-gold",
									children: "World Investor Week"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-2xl font-bold leading-tight",
									children: lang === "hi" ? "समझ से निवेश आसान" : "Make investing simple — then take the next step."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-nse-mist",
									children: "Classroom board for 5–11 Oct 2026. Mutual funds, stocks, REITs, InvITs, bonds, commodities — read first. This desk is not the exchange and not SEBI-registered advice."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/learn",
										className: "inline-flex h-10 items-center rounded-sm bg-nse-gold px-3 text-sm font-semibold text-nse-deep",
										children: "Open classroom"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/chart-gpt",
										className: "inline-flex h-10 items-center rounded-sm border border-nse-ink/40 px-3 text-sm",
										children: "Ask Chart GPT"
									})]
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "cas",
					className: "mx-auto max-w-[1280px] px-3 pb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold text-nse",
									children: "Market Statistics"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] text-nse-muted",
									children: ["As on ", boardStats?.asOf ?? "07-Oct-2026 15:30 IST"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
										label: "Stock Traded",
										value: boardStats ? inrInt(boardStats.traded) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
										label: "Advances",
										value: boardStats ? inrInt(boardStats.advances) : "—",
										tone: "up"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
										label: "Declines",
										value: boardStats ? inrInt(boardStats.declines) : "—",
										tone: "down"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
										label: "Unchanged",
										value: boardStats ? inrInt(boardStats.unchanged) : "—",
										tone: "warn"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
										label: "No. of Stocks at 52 Week High",
										value: boardStats ? inrInt(boardStats.weekHigh) : "—",
										tone: "up"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
										label: "No. of Stocks at 52 Week Low",
										value: boardStats ? inrInt(boardStats.weekLow) : "—",
										tone: "down"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
										label: "No. of Stocks in Upper Circuit",
										value: boardStats ? inrInt(boardStats.upperCircuit) : "—",
										tone: "up"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
										label: "No. of Stocks in Lower Circuit",
										value: boardStats ? inrInt(boardStats.lowerCircuit) : "—",
										tone: "down"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid gap-2 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-nse-line bg-nse-card p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-nse-muted",
										children: "Registered Client Accounts"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xl font-bold tabular-nums text-nse",
										children: boardStats ? inrInt(boardStats.clients) : "—"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-nse-line bg-nse-card p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-nse-muted",
											children: "Market Capitalization"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-lg font-bold text-nse",
											children: [
												"₹ Lac Crs ",
												boardStats ? boardStats.mcapLacCr.toFixed(2) : "—",
												" | Tn $ ",
												boardStats ? boardStats.mcapTnUsd.toFixed(2) : "—"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-nse-muted",
											children: boardStats?.asOf
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center justify-between rounded-md border border-nse px-3 py-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-nse",
									children: "Avg Order Ack Latency (nanoseconds)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold tabular-nums",
									children: boardStats?.ackLatencyNs ?? "—"
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "turnover",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold text-nse",
									children: "Market Turnover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] text-nse-muted",
									children: ["As on ", boardStats?.asOf?.slice(0, 11) ?? "07-Oct-2026"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto rounded-md border border-nse-line bg-nse-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full min-w-[520px] text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-nse text-nse-ink",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5 text-left font-medium",
												children: "Products"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5 text-right font-medium",
												children: "Volume"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5 text-right font-medium",
												children: "Value (₹ Crores)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5 text-right font-medium",
												children: "Open Interest"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5 text-right font-medium",
												children: "Updated at"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [turnover.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-t border-nse-line",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2 font-medium",
												children: row.product
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2 text-right tabular-nums",
												children: row.volume
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2 text-right tabular-nums",
												children: row.value
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2 text-right tabular-nums",
												children: row.oi
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2 text-right tabular-nums",
												children: row.updatedAt
											})
										]
									}, row.product)), turnoverTotal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-t-2 border-nse bg-nse-soft font-semibold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2",
												children: turnoverTotal.product
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2 text-right tabular-nums",
												children: turnoverTotal.volume
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2 text-right tabular-nums",
												children: turnoverTotal.value
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2 text-right tabular-nums",
												children: turnoverTotal.oi
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-3 py-2" })
										]
									}) : null] })]
								})
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-[1280px] px-3 pb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 lg:grid-cols-[0.9fr_1.1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13",
							target: "_blank",
							rel: "noreferrer",
							className: "overflow-hidden rounded-md bg-nse-blue p-5 text-nse-ink",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wide text-nse-gold",
									children: "Investor caution"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-lg font-bold",
									children: "Fake apps often look real."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-nse-mist",
									children: "Download apps only from the verified list on the SEBI website. PlanVista does not take orders or money."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold text-nse",
									children: "Market Snapshot"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs text-nse hover:underline",
									onClick: () => setTab("data"),
									children: "View more"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-3 border-b border-nse-line text-sm",
								children: [
									["gainers", "Gainers"],
									["losers", "Losers"],
									["value", "Most Active (Value)"],
									["volume", "Most Active (Volume)"]
								].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSnap(id),
									className: cn("border-b-2 px-1 py-2 text-xs font-semibold", snap === id ? "border-nse-gold text-nse" : "border-transparent text-nse-muted"),
									children: label
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full min-w-[520px] text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-nse text-nse-ink",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5 text-left font-medium",
												children: "Symbol"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5 text-right font-medium",
												children: "LTP"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5 text-right font-medium",
												children: "Chng"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5 text-right font-medium",
												children: "%Chng"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5 text-right font-medium",
												children: "Volume (Lakhs)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5 text-right font-medium",
												children: "Value (₹ Crores)"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: snapRows.map((s) => {
										const green = s.change >= 0;
										const volL = (s.volume ?? 0) / 1e5;
										const valCr = (s.volume ?? 0) * s.price / 1e7;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b border-nse-line",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/quote/$symbol",
														params: { symbol: s.symbol },
														className: "font-semibold hover:text-nse",
														children: s.symbol.replace(/\.NS$/, "").toUpperCase()
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2 text-right tabular-nums font-semibold",
													children: inrNum(s.price)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: cn("px-3 py-2 text-right tabular-nums", green ? "text-up" : "text-down"),
													children: signed(s.change)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: cn("px-3 py-2 text-right tabular-nums", green ? "text-up" : "text-down"),
													children: (s.changePct * 100).toFixed(2)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2 text-right tabular-nums",
													children: volL ? volL.toFixed(2) : "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2 text-right tabular-nums",
													children: valCr ? valCr.toFixed(2) : "—"
												})
											]
										}, s.symbol);
									}) })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-nse-muted",
								children: "Data shown above represents only Nifty 50 stocks."
							})
						] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "option-chain",
					className: "mx-auto max-w-[1280px] px-3 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-nse",
								children: "Most Active Contracts"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] text-nse-muted",
								children: ["As on ", NSE_FNO_IST]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 lg:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContractTable, {
									title: "Most Active Calls",
									rows: calls
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContractTable, {
									title: "Most Active Puts",
									rows: puts
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContractTable, {
									title: "Most Active Contracts by OI",
									rows: oiContracts
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-3 text-sm font-semibold text-nse hover:underline",
							onClick: () => setTab("chain"),
							children: "Open full option chain →"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-[1280px] px-3 pb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "corporates",
							className: "rounded-md border border-nse-line bg-nse-card p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-semibold text-nse",
										children: "Corporate Info"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/search",
										className: "text-xs text-nse hover:underline",
										children: "View more"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-xs font-semibold text-nse",
									children: "Corporate Announcement"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "divide-y divide-nse-line",
									children: corporates.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start justify-between gap-3 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm font-semibold",
												children: [
													c.name,
													" (",
													c.symbol,
													")"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-nse-muted",
												children: ["Subject : ", c.subject]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-nse-muted",
												children: ["Broadcast Date : ", c.at]
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-sm border border-nse-line px-2 py-1 text-[10px] text-nse-muted",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }),
												"PDF ",
												c.size
											]
										})]
									}, c.symbol + c.at))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "ipo",
							className: "rounded-md border border-nse-line bg-nse-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold text-nse",
									children: "IPO Tracker"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/learn",
									className: "text-xs text-nse hover:underline",
									children: "How an IPO works"
								})]
							}), ipo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpoCard, {
										value: ipo.year,
										label: "IPOs in the Year",
										tone: "soft"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpoCard, {
										value: ipo.sme,
										label: "IPOs on NSE SME Segment",
										tone: "soft"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpoCard, {
										value: ipo.gainIssue,
										label: "IPOs in Gain w.r.t. issue Price",
										tone: "up"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpoCard, {
										value: ipo.lossIssue,
										label: "IPOs in Loss w.r.t. issue Price",
										tone: "down"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpoCard, {
										value: ipo.gainListing,
										label: "IPOs in Gain on Listing Date",
										tone: "up"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpoCard, {
										value: ipo.lossListing,
										label: "IPOs in Loss on Listing Date",
										tone: "down"
									})
								]
							}) : null]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-[1280px] px-3 pb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-nse",
								children: "Reference Rates"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] text-nse-muted",
								children: ["As on ", NSE_FX_IST]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-md border border-nse-line bg-nse-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[480px] text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-nse text-nse-ink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-left font-medium",
											children: "Currency"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-left font-medium",
											children: "Unit"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-right font-medium",
											children: "Today's value"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-right font-medium",
											children: "Previous day value"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: fxSpot.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-nse-line",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 font-semibold",
											children: r.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: r.unit
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-2 text-right tabular-nums",
											children: ["₹ ", r.today.toFixed(4)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-2 text-right tabular-nums",
											children: ["₹ ", r.previous.toFixed(4)]
										})
									]
								}, r.code)) })]
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-nse",
								children: "Currency Snapshot"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] text-nse-muted",
								children: ["As on ", NSE_FX_FUT_IST]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-md border border-nse-line bg-nse-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[560px] text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-nse text-nse-ink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-left font-medium",
											children: "Contracts"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-right font-medium",
											children: "LTP"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-right font-medium",
											children: "%Chng"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-right font-medium",
											children: "Volume"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-right font-medium",
											children: "Turnover (₹ Crores)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-right font-medium",
											children: "Open Interest"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: fxFutures.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-nse-line",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 font-medium",
											children: r.contract
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-right tabular-nums",
											children: r.ltp.toFixed(4)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: cn("px-3 py-2 text-right tabular-nums", r.changePct >= 0 ? "text-up" : "text-down"),
											children: r.changePct.toFixed(4)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-right tabular-nums",
											children: r.volume.toLocaleString("en-IN")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-right tabular-nums",
											children: r.turnoverCr.toLocaleString("en-IN")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-right tabular-nums",
											children: r.oi.toLocaleString("en-IN")
										})
									]
								}, r.contract)) })]
							})
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "holidays",
					className: "mx-auto max-w-[1280px] px-3 pb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 lg:grid-cols-[1fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-nse-line bg-nse-card p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold text-nse",
									children: "Holidays"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-nse-muted",
									children: "Next NSE capital-market holidays. Session Mon–Fri, 9:15–15:30 IST."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 divide-y divide-nse-line",
									children: holidays.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-baseline justify-between gap-3 py-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm font-medium",
											children: h.name
										}), h.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-nse-muted",
											children: h.note
										}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm tabular-nums text-nse",
											children: [
												h.date.slice(8),
												"/",
												h.date.slice(5, 7),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-1 text-[11px] text-nse-muted",
													children: h.day
												})
											]
										})]
									}, h.date))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "headlines",
							className: "rounded-md border border-nse-line bg-nse-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-nse",
								children: "Circulars & press"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-3",
								children: news.slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: item.url || "#",
									target: "_blank",
									rel: "noreferrer",
									className: "block hover:text-nse",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-semibold uppercase tracking-wide text-nse-accent",
											children: item.source
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-sm font-medium",
											children: item.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-nse-muted",
											children: item.published ? timeAgo(item.published) : ""
										})
									]
								}) }, item.url + item.title))
							})]
						})]
					})
				}),
				tab === "data" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-[1280px] px-3 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold text-nse",
							children: "All indices"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 overflow-x-auto rounded-md border border-nse-line bg-nse-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[480px] text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-nse text-nse-ink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-left font-medium",
											children: "Index"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-right font-medium",
											children: "LTP"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-right font-medium",
											children: "Chng"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2.5 text-right font-medium",
											children: "%Chng"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: indices.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-nse-line",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2.5 font-medium",
											children: i.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2.5 text-right tabular-nums",
											children: inrNum(i.price)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: cn("px-3 py-2.5 text-right tabular-nums", i.change >= 0 ? "text-up" : "text-down"),
											children: signed(i.change)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: cn("px-3 py-2.5 text-right tabular-nums", i.change >= 0 ? "text-up" : "text-down"),
											children: pct(i.changePct)
										})
									]
								}, i.name)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-nse-muted",
							children: [
								"Nifty 50 names this session: ",
								formatVol(stocks.reduce((m, s) => m + (s.volume ?? 0), 0)),
								" volume across ",
								stocks.length,
								" last prints. Full-board counts above are the exchange-wide print, not just Nifty 50."
							]
						})
					]
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "bg-nse-deep py-10 text-nse-mist",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-[1280px] gap-8 px-3 sm:grid-cols-2 lg:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
							title: "Equity",
							links: [
								["Live market", "/markets"],
								["NSE desk", "/nse"],
								["Deep search", "/search"],
								["Chart GPT", "/chart-gpt"]
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
							title: "Learn",
							links: [
								["Classroom", "/learn"],
								["Risk quiz", "/quiz"],
								["Knowledge gate", "/gate"],
								["How to read a chart", "/chart-gpt"]
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
							title: "Plan",
							links: [
								["SIP calculator", "/sip"],
								["Goals", "/planner"],
								["Portfolio", "/portfolio"],
								["Analytics", "/analytics"]
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-nse-ink",
							children: "Official sites"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-col gap-1.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.nseindia.com/",
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-1 hover:text-nse-ink",
									children: ["nseindia.com ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.sebi.gov.in/",
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-1 hover:text-nse-ink",
									children: ["sebi.gov.in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://scores.sebi.gov.in/",
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-1 hover:text-nse-ink",
									children: ["SCORES complaints ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-nse-ink",
								children: "Session"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: session.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs",
								children: prevClose != null ? `Prev close ${formatMoney(prevClose, "INR")}` : lastPrint
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-[11px] leading-relaxed",
								children: "Unofficial classroom board. Not the National Stock Exchange of India, not a broker, not SEBI-registered advice. Full-board statistics, turnover, F&O and IPO cards are the last official homepage print; Nifty 50 tape refreshes whenever you open this page."
							})
						] })
					]
				})
			})
		]
	});
}
function inrInt(n) {
	return n.toLocaleString("en-IN");
}
function LegendDot({ color, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-1 inline-block size-2 rounded-full",
				style: { background: color }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-nse-muted",
				children: [label, " "]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium tabular-nums",
				children: value
			})
		]
	});
}
function NiftyArea({ points, up }) {
	const data = points.map((p) => ({
		t: p.t,
		close: p.close,
		label: new Intl.DateTimeFormat("en-IN", {
			timeZone: "Asia/Kolkata",
			hour: "2-digit",
			minute: "2-digit",
			hourCycle: "h23"
		}).format(p.t)
	}));
	if (!data.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-52 rounded-sm bg-nse-wash" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 h-52 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "nseFill",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-nse-chart)",
							stopOpacity: .85
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-nse-chart)",
							stopOpacity: .15
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fontSize: 10,
							fill: "var(--color-nse-muted)"
						},
						interval: "preserveStartEnd"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						domain: ["auto", "auto"],
						tick: {
							fontSize: 10,
							fill: "var(--color-nse-muted)"
						},
						width: 56,
						tickFormatter: (v) => v.toLocaleString("en-IN")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: {
							fontSize: 12,
							borderRadius: 6
						},
						formatter: (v) => [typeof v === "number" ? inrNum(v) : String(v), "Nifty"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "close",
						stroke: up ? "var(--color-up)" : "var(--color-down)",
						fill: "url(#nseFill)",
						strokeWidth: 1.6
					})
				]
			})
		})
	});
}
function StatCard({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-md border border-nse-line bg-nse-card p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute right-0 top-0 size-0 border-t-[18px] border-l-[18px] border-l-transparent", tone === "up" ? "border-t-up" : tone === "down" ? "border-t-down" : tone === "warn" ? "border-t-nse-gold" : "border-t-nse") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pr-3 text-[11px] text-nse-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 text-2xl font-bold tabular-nums", tone === "up" ? "text-up" : tone === "down" ? "text-down" : "text-nse-fg"),
				children: value
			})
		]
	});
}
function ContractTable({ title, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto rounded-md border border-nse-line bg-nse-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "px-3 pt-3 text-sm font-semibold text-nse",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "mt-2 w-full min-w-[280px] text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-nse text-nse-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-2 py-2 text-left font-medium",
						children: "Contract"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-2 py-2 text-right font-medium",
						children: "LTP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-2 py-2 text-right font-medium",
						children: "Chng"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-2 py-2 text-right font-medium",
						children: "%Chng"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-nse-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-2 py-2 font-medium",
						children: r.contract
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-2 py-2 text-right tabular-nums",
						children: inrNum(r.ltp)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn("px-2 py-2 text-right tabular-nums", r.change >= 0 ? "text-up" : "text-down"),
						children: signed(r.change)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn("px-2 py-2 text-right tabular-nums", r.change >= 0 ? "text-up" : "text-down"),
						children: r.changePct.toFixed(2)
					})
				]
			}, r.contract)) })]
		})]
	});
}
function IpoCard({ value, label, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-md p-3", tone === "up" ? "bg-nse-green-soft" : tone === "down" ? "bg-nse-pink" : "bg-nse-soft"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("text-2xl font-bold tabular-nums", tone === "up" ? "text-up" : tone === "down" ? "text-down" : "text-nse"),
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[11px] text-nse-muted",
			children: label
		})]
	});
}
function FooterCol({ title, links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-semibold text-nse-ink",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex flex-col gap-1.5 text-sm",
		children: links.map(([label, to]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			className: "hover:text-nse-ink",
			children: label
		}, to + label))
	})] });
}
function OptionChainPanel({ nifty, lastPrint, rows, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1280px] px-3 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mb-3 text-sm font-semibold text-nse",
				onClick: onBack,
				children: "← Home"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-bold text-nse",
				children: "Option Chain (Equity Derivatives)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-nse-muted",
				children: [
					"Underlying index : NIFTY ",
					nifty ? inrNum(nifty.price) : "—",
					" · As on ",
					lastPrint,
					" · Expiry 13-Oct-2026"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-nse-muted",
				children: "Last session print around ATM. Education only — this is not a live broker chain and not a buy/sell signal."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto rounded-md border border-nse-line bg-nse-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("thead", {
						className: "bg-nse text-nse-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								colSpan: 4,
								className: "px-2 py-2 text-center font-medium",
								children: "Calls"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2",
								children: "Strike"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								colSpan: 4,
								className: "px-2 py-2 text-center font-medium",
								children: "Puts"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-nse-mid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2",
									children: "LTP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2",
									children: "Chng"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2",
									children: "Bid"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2",
									children: "Ask"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2",
									children: "Strike"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2",
									children: "Bid"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2",
									children: "Ask"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2",
									children: "LTP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2",
									children: "Chng"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-nse-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right tabular-nums",
								children: r.callLtp != null ? inrNum(r.callLtp) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("px-2 py-2 text-right tabular-nums", (r.callChg ?? 0) >= 0 ? "text-up" : "text-down"),
								children: r.callChg != null ? signed(r.callChg) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right tabular-nums",
								children: r.callBid ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right tabular-nums",
								children: r.callAsk ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-center font-bold text-nse",
								children: inrNum(r.strike, 2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right tabular-nums",
								children: r.putBid ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right tabular-nums",
								children: r.putAsk ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-right tabular-nums",
								children: r.putLtp != null ? inrNum(r.putLtp) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("px-2 py-2 text-right tabular-nums", (r.putChg ?? 0) >= 0 ? "text-up" : "text-down"),
								children: r.putChg != null ? signed(r.putChg) : "—"
							})
						]
					}, r.strike)) })]
				})
			})
		]
	});
}
function InvestPanel({ lang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[880px] px-3 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-nse",
				children: lang === "hi" ? "निवेश से पहले पढ़ें" : "Invest — after you can read the tape"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-nse-fg",
				children: "This desk shows the last NSE homepage print so you can practise. It does not open a trading account, collect money, or give tips. Use the classroom, then a SEBI-registered intermediary if you invest."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/learn",
						className: "rounded-md border border-nse-line bg-nse-card p-4 hover:border-nse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-nse",
							children: "Classroom"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-nse-muted",
							children: "Shares, SIPs, stops, IPO basics — short pages."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/quiz",
						className: "rounded-md border border-nse-line bg-nse-card p-4 hover:border-nse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-nse",
							children: "Risk quiz"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-nse-muted",
							children: "Sign in every time you open it. 18+ · education only."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/sip",
						className: "rounded-md border border-nse-line bg-nse-card p-4 hover:border-nse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-nse",
							children: "SIP calculator"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-nse-muted",
							children: "See how a monthly amount can grow. Not a product sale."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/chart-gpt",
						className: "rounded-md border border-nse-line bg-nse-card p-4 hover:border-nse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-nse",
							children: "Chart GPT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-nse-muted",
							children: "Ask how to read today's candle. No buy/sell calls."
						})]
					})
				]
			})
		]
	});
}
function NsePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NseBoard, {});
}
//#endregion
export { NsePage as component };
