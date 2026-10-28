import { i as __toESM } from "../_runtime.mjs";
import { o as pct, r as formatMoney, t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as searchSymbols, f as useLiveRefresh, g as getMarketHome, s as Route$6, v as getQuoteBundle, y as getQuotes } from "./router-Dvl9OxAQ.mjs";
import { n as useDeskPlan } from "./desk-plan-DD0ZGSIw.mjs";
import { t as CandleChart } from "./CandleChart-C8zh-yRf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/research-C3CNwZHT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function avg(xs) {
	if (!xs.length) return null;
	return xs.reduce((s, n) => s + n, 0) / xs.length;
}
function rsi(closes, period = 14) {
	if (closes.length <= period) return null;
	let gains = 0;
	let losses = 0;
	for (let i = closes.length - period; i < closes.length; i++) {
		const d = closes[i] - closes[i - 1];
		if (d >= 0) gains += d;
		else losses -= d;
	}
	if (losses === 0) return 100;
	return 100 - 100 / (1 + gains / losses);
}
function ema(closes, period) {
	if (closes.length < period) return null;
	const k = 2 / (period + 1);
	let prev = avg(closes.slice(0, period));
	for (let i = period; i < closes.length; i++) prev = closes[i] * k + prev * (1 - k);
	return prev;
}
function buildXray(bundle, lang) {
	const pts = bundle.chart.points.filter((p) => Number.isFinite(p.close));
	const q = bundle.quote;
	const closes = pts.map((p) => p.close);
	const last = q.price || closes[closes.length - 1] || 0;
	const window = pts.slice(-20);
	const hi = window.length ? Math.max(...window.map((p) => p.high ?? p.close)) : last;
	const lo = window.length ? Math.min(...window.map((p) => p.low ?? p.close)) : last;
	const week = pts.slice(-5);
	const weekHi = week.length ? Math.max(...week.map((p) => p.high ?? p.close)) : hi;
	const weekLo = week.length ? Math.min(...week.map((p) => p.low ?? p.close)) : lo;
	const support = lo;
	const resistance = hi;
	const invalidation = support > 0 ? support * .997 : support;
	const nearBreak = resistance > 0 && last >= resistance * .985 && last <= resistance * 1.01;
	const rsiV = rsi(closes);
	const sma20 = closes.length >= 20 ? avg(closes.slice(-20)) : null;
	const sma50 = closes.length >= 50 ? avg(closes.slice(-50)) : null;
	const ema12 = ema(closes, 12);
	const ema26 = ema(closes, 26);
	const macd = ema12 != null && ema26 != null ? ema12 - ema26 : null;
	const recent = pts.slice(-14);
	const rh = recent.length ? Math.max(...recent.map((p) => p.high ?? p.close)) : last;
	const rl = recent.length ? Math.min(...recent.map((p) => p.low ?? p.close)) : last;
	const stoch = rh > rl ? (last - rl) / (rh - rl) * 100 : null;
	const bar = pts[pts.length - 1];
	const pivot = bar ? ((bar.high ?? last) + (bar.low ?? last) + last) / 3 : null;
	const span = Math.max(...pts.map((p) => p.high ?? p.close)) - Math.min(...pts.map((p) => p.low ?? p.close));
	const mid = pts.length > 2 ? (Math.max(...pts.map((p) => p.high ?? p.close)) + Math.min(...pts.map((p) => p.low ?? p.close))) / 2 : null;
	const vol = q.volume;
	const avgVol = bundle.stats.avgVolume;
	const volRatio = vol && avgVol ? vol / avgVol : null;
	const reward = Math.max(0, resistance - last);
	const risk = Math.max(.01, last - invalidation);
	const rr = last > invalidation ? reward / risk : null;
	let score = 40;
	if (sma20 && last > sma20) score += 15;
	if (sma50 && last > sma50) score += 10;
	if (rsiV != null && rsiV >= 40 && rsiV <= 65) score += 15;
	if (rsiV != null && (rsiV > 75 || rsiV < 25)) score -= 10;
	if (volRatio != null && volRatio > 1.2) score += 10;
	if (resistance > support && (last - support) / (resistance - support) < .45) score += 10;
	score = Math.max(5, Math.min(95, Math.round(score)));
	const hiLang = lang === "hi";
	const breakout = nearBreak ? hiLang ? "Aakhri print resistance ke paas hai. Breakout tab maana jaaye jab close us level ke upar rahe — usse pehle nahi." : "The last print is near resistance. A breakout is only a close above that level, not a touch." : hiLang ? "Abhi breakout zone nahi. Price support aur resistance ke beech hai." : "No breakout zone right now. Price is between support and resistance.";
	const volumeNote = volRatio == null ? hiLang ? "Volume ki tulna ke liye average nahi mila." : "No average volume on this snapshot, so the bar is unread." : volRatio > 1.3 ? hiLang ? `Volume average se ${volRatio.toFixed(1)}× hai. Move mein log hain — direction alag sawaal hai.` : `Volume is ${volRatio.toFixed(1)}× its average. People showed up. Direction is a separate question.` : hiLang ? "Volume ordinary hai. Badi candle bhi shor ho sakti hai." : "Volume is ordinary. A loud candle can still be noise.";
	const planReason = hiLang ? `Idea tab galat hai jab last print ${invalidation.toFixed(2)} ke neeche band ho. Reward/risk is window par ${rr == null ? "—" : rr.toFixed(1)} hai. Score ${score}/100 ek padhai hai, munafa ka vaada nahi.` : `The idea is wrong if the last print closes under ${invalidation.toFixed(2)}. Reward versus that risk is ${rr == null ? "—" : rr.toFixed(1)} on this window. The ${score}/100 score is a reading, not odds of profit.`;
	const headline = bundle.news[0]?.title;
	const move = Math.abs(q.changePct);
	const why = hiLang ? move < .004 ? "Move chhota hai. Zyadatar yeh shor hota hai, koi badi khabar nahi." : headline ? `Feed ki pehli headline: “${headline}”. Yeh wajah ho sakti hai, ya sirf saath-saath chhapi khabar. Band karne se pehle dekho ke volume bhi saath hai ya nahi.` : "Is snapshot par koi taaza headline nahi mili. Candle akeli wajah nahi hoti." : move < .004 ? "The move is small. That is usually noise, not a story." : headline ? `First headline in the feed: “${headline}”. It might be the driver, or just a story printed next to the move. Check whether volume agrees before you exit.` : "No fresh headline on this snapshot. A candle by itself is not a reason.";
	const weekEvent = headline ? hiLang ? `Is hafte ki feed mein sabse upar: “${headline}”. Gap isi se badal sakta hai — ya nahi bhi.` : `Top of this week’s feed: “${headline}”. That is the event that could change the gap — or not.` : hiLang ? "Koi ek event headline par nahi hai. Gap ko khabar maan kar trade mat likho." : "No single event is sitting on the headline. Do not invent a gap story.";
	return {
		support,
		resistance,
		invalidation,
		breakout,
		volumeNote,
		rsi: rsiV,
		sma20,
		sma50,
		macd: macd == null ? "—" : macd >= 0 ? hiLang ? "MACD upar" : "MACD above zero" : hiLang ? "MACD neeche" : "MACD below zero",
		stoch,
		pivot,
		midpoint: mid && span > 0 ? mid : null,
		rr,
		score,
		planReason,
		why,
		weekSupport: weekLo,
		weekResistance: weekHi,
		weekEvent
	};
}
function parsePosition(raw) {
	const text = raw.trim();
	if (text.length < 2) return null;
	const m = text.match(/(\d[\d,]*)\s+([A-Za-z][A-Za-z0-9&.\- ]{1,32}?)\s+(?:at|@)\s+₹?\s*([\d,.]+)/i);
	if (m) return {
		qty: Number(m[1].replace(/,/g, "")),
		name: m[2].trim(),
		entry: Number(m[3].replace(/,/g, "")),
		raw: text
	};
	const loose = text.match(/([A-Za-z][A-Za-z0-9&.\- ]{1,32})/);
	if (!loose) return null;
	return {
		qty: null,
		name: loose[1].trim(),
		entry: null,
		raw: text
	};
}
function positionNote(pos, last, support, lang) {
	const hi = lang === "hi";
	if (pos.entry == null || !last) return hi ? "Naam mil gaya. Entry price likho, jaise: 1200 RELIANCE at 1258" : "Name noted. Add an entry, like: 1200 RELIANCE at 1258";
	const side = (pos.qty ? (last - pos.entry) * pos.qty : last - pos.entry) >= 0 ? hi ? "aage" : "ahead" : hi ? "peeche" : "behind";
	const wrong = hi ? `Idea tab galat hai jab last print support ${support.toFixed(2)} ke neeche band ho.` : `The idea is wrong if the last print closes under support at ${support.toFixed(2)}.`;
	return `${hi ? `${pos.qty ?? 1} ka farq ab ${side} hai.` : `${pos.qty ?? "The"} position is ${side} of the entry.`} ${wrong}`;
}
var ASKS = [
	{
		en: "Why is Reliance moving?",
		hi: "Reliance kyun hil raha hai?",
		symbol: "RELIANCE.NS"
	},
	{
		en: "HDFC Bank: result or noise?",
		hi: "HDFC Bank: result ya shor?",
		symbol: "HDFCBANK.NS"
	},
	{
		en: "Tata Motors levels",
		hi: "Tata Motors ke level",
		symbol: "TATAMOTORS.NS"
	},
	{
		en: "Nifty setup",
		hi: "Nifty ka setup",
		symbol: "^NSEI"
	},
	{
		en: "Infosys support and resistance",
		hi: "Infosys support / resistance",
		symbol: "INFY.NS"
	},
	{
		en: "SBI momentum",
		hi: "SBI ka momentum",
		symbol: "SBIN.NS"
	},
	{
		en: "Bank Nifty levels",
		hi: "Bank Nifty ke level",
		symbol: "^NSEBANK"
	},
	{
		en: "TCS before the open",
		hi: "TCS, open se pehle",
		symbol: "TCS.NS"
	}
];
function ResearchPage() {
	const search = Route$6.useSearch();
	const navigate = useNavigate();
	const tier = useDeskPlan((s) => s.tier);
	const [lang, setLang] = (0, import_react.useState)("en");
	const [query, setQuery] = (0, import_react.useState)("");
	const [symbol, setSymbol] = (0, import_react.useState)(search.symbol || "^NSEI");
	const [bundle, setBundle] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [err, setErr] = (0, import_react.useState)(null);
	const [paste, setPaste] = (0, import_react.useState)("");
	const [posText, setPosText] = (0, import_react.useState)(null);
	const [nifty, setNifty] = (0, import_react.useState)(null);
	const [us, setUs] = (0, import_react.useState)(null);
	const [news, setNews] = (0, import_react.useState)([]);
	const hi = lang === "hi";
	(0, import_react.useEffect)(() => {
		if (search.symbol && search.symbol !== symbol) {
			setSymbol(search.symbol);
			setBusy(true);
		}
	}, [search.symbol, symbol]);
	useLiveRefresh(() => {
		return getQuoteBundle({ data: {
			symbol,
			range: "6mo",
			fresh: false
		} }).then((b) => {
			setBundle(b);
			setErr(null);
		}).catch((e) => setErr(e instanceof Error ? e.message : "Could not read this name")).finally(() => setBusy(false));
	}, 3e4, [symbol]);
	useLiveRefresh(() => {
		return getQuotes({ data: { symbols: [symbol, "^NSEI"] } }).then((rows) => {
			const row = rows.find((q) => q.symbol === symbol) ?? rows[0];
			const n = rows.find((q) => q.symbol === "^NSEI");
			if (n) setNifty(n);
			if (!row) return;
			setBundle((b) => b && b.quote.symbol === row.symbol ? {
				...b,
				quote: {
					...b.quote,
					price: row.price,
					change: row.change,
					changePct: row.changePct,
					previousClose: row.previousClose,
					asOf: row.asOf,
					source: row.source
				}
			} : b);
		});
	}, 1e3, [symbol]);
	useLiveRefresh(() => {
		getMarketHome({ data: {
			region: "india",
			fresh: true
		} }).then((res) => {
			setNews(res.news.slice(0, 3));
			const n = res.quotes.find((q) => /nifty 50/i.test(q.name)) ?? res.quotes[0] ?? null;
			setNifty(n);
		});
		getMarketHome({ data: {
			region: "us",
			fresh: true
		} }).then((res) => {
			setUs(res.quotes.find((q) => /s&p|nasdaq|dow/i.test(q.name)) ?? res.quotes[0] ?? null);
		});
	}, 6e4, []);
	async function runQuery(text) {
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
		navigate({
			to: "/research",
			search: { symbol: hit }
		});
	}
	function readPosition() {
		const parsed = parsePosition(paste);
		if (!parsed || !bundle) {
			setPosText(hi ? "Jaise likho: 1200 RELIANCE at 1258" : "Write it like: 1200 RELIANCE at 1258");
			return;
		}
		const brief = buildXray(bundle, lang);
		setPosText(positionNote(parsed, bundle.quote.price, brief.support, lang));
		if (parsed.name.length > 1) runQuery(parsed.name);
	}
	const brief = bundle ? buildXray(bundle, lang) : null;
	const q = bundle?.quote;
	const up = (q?.change ?? 0) >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
							children: hi ? "PlanVista research" : "PlanVista research"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 text-3xl font-medium tracking-tight",
							children: hi ? "Kisi bhi naam ko 15 second mein padho." : "Read any name in about 15 seconds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: hi ? "Level, plan, wajah, aur aapki position. Yeh research hai — buy ya sell ki salah nahi. NSE, broker, ya bank tak kuch nahi jaata." : "Levels, a plan, the reason, and your position. This is research — not a buy or sell call. Nothing is sent to NSE, a broker, or a bank."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium uppercase text-primary",
						children: tier
					}), ["en", "hi"].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setLang(id),
						className: cn("h-9 rounded-full px-3 text-xs font-medium", lang === id ? "bg-primary text-primary-fg" : "bg-surface text-muted"),
						children: id === "en" ? "English" : "हिन्दी"
					}, id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-2 sm:flex-row",
				onSubmit: (e) => {
					e.preventDefault();
					runQuery(query);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: hi ? "Reliance, HDFC Bank, Nifty…" : "Reliance, HDFC Bank, Nifty…",
					className: "h-12 min-w-0 flex-1 rounded-full border border-border bg-bg px-4 text-base"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-12 rounded-full bg-primary px-5 text-sm font-medium text-primary-fg",
					children: hi ? "X-ray" : "X-ray"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: ASKS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setSymbol(a.symbol);
						setQuery(hi ? a.hi : a.en);
						navigate({
							to: "/research",
							search: { symbol: a.symbol }
						});
					},
					className: "h-9 shrink-0 rounded-full bg-surface px-3 text-xs text-fg hover:bg-chip",
					children: hi ? a.hi : a.en
				}, a.symbol + a.en))
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-down",
				children: err
			}) : null,
			q && brief ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "overflow-hidden rounded-xl border border-border bg-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-[#e0e3eb] px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-medium text-[#131722]",
								children: q.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 flex flex-wrap items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-medium tabular-nums text-[#131722]",
									children: formatMoney(q.price, q.currency)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-sm font-medium tabular-nums", up ? "text-[#089981]" : "text-[#f23645]"),
									children: pct(q.changePct)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandleChart, {
							series: bundle.chart,
							mark: q.price,
							stop: brief.invalidation,
							target: brief.resistance
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2 border-t border-[#e0e3eb] px-3 py-2 text-[11px] text-[#5f6368]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["RSI ", brief.rsi == null ? "—" : brief.rsi.toFixed(1)] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["SMA20 ", brief.sma20 == null ? "—" : brief.sma20.toFixed(1)] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["SMA50 ", brief.sma50 == null ? "—" : brief.sma50.toFixed(1)] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: brief.macd }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Stoch ", brief.stoch == null ? "—" : brief.stoch.toFixed(0)] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Pivot ", brief.pivot == null ? "—" : brief.pivot.toFixed(1)] })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							title: hi ? "Level" : "Levels",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: hi ? "Support" : "Support",
									v: formatMoney(brief.support, q.currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: hi ? "Resistance" : "Resistance",
									v: formatMoney(brief.resistance, q.currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs leading-relaxed text-muted",
									children: brief.breakout
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted",
									children: brief.volumeNote
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							title: hi ? "Plan" : "Plan",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: hi ? "Invalidation" : "Invalidation",
									v: formatMoney(brief.invalidation, q.currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "R:R",
									v: brief.rr == null ? "—" : brief.rr.toFixed(1)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: hi ? "Padhai score" : "Reading score",
									v: `${brief.score}/100`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs leading-relaxed text-muted",
									children: brief.planReason
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							title: hi ? "Kyun hila" : "Why it moved",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-relaxed text-muted",
								children: brief.why
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/trade",
							search: {
								symbol: q.symbol,
								side: "buy"
							},
							className: "inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-fg",
							children: hi ? "Practice desk par kholo" : "Open on the practice desk"
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 animate-pulse rounded-xl bg-surface" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: hi ? "Apni position paste karo" : "Paste your position"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: hi ? "Jaise: 1200 RELIANCE at 1258 — ya “970 CE, loss mein hu”." : "Like: 1200 RELIANCE at 1258 — or “970 CE, loss mein hu”."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: paste,
							onChange: (e) => setPaste(e.target.value),
							className: "h-11 min-w-0 flex-1 rounded-md border border-border bg-bg px-3 text-sm",
							placeholder: "1200 RELIANCE at 1258"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: readPosition,
							className: "h-11 rounded-full bg-chip px-4 text-sm font-medium",
							children: hi ? "Padho" : "Read it"
						})]
					}),
					posText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: posText
					}) : null,
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-subtle",
						children: hi ? "Tape padh rahe hain…" : "Reading the tape…"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium uppercase tracking-wide text-primary",
							children: "7:00"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-lg font-medium",
							children: hi ? "Pre-market" : "Pre-market"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: "Nifty"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: nifty ? `${formatMoney(nifty.price, nifty.currency)} ${pct(nifty.changePct)}` : "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: hi ? "Raat ko US" : "Overnight US"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: us ? `${us.shortName} ${pct(us.changePct)}` : "—"
									})]
								}),
								nifty?.dayLow && nifty.dayHigh ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: hi ? "Aaj ki range" : "Today’s range"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums",
										children: [
											formatMoney(nifty.dayLow, "INR"),
											" – ",
											formatMoney(nifty.dayHigh, "INR")
										]
									})]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-xs leading-relaxed text-muted",
							children: news.length ? news.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: n.url,
								target: "_blank",
								rel: "noreferrer",
								className: "hover:underline",
								children: n.title
							}) }, n.title)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: hi ? "Abhi headline nahi aayi." : "No headlines yet." })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium uppercase tracking-wide text-primary",
							children: hi ? "Ravi raat" : "Sunday night"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-lg font-medium",
							children: hi ? "Hafte ke level" : "Monday’s levels"
						}),
						brief && q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: hi ? "Hafte ka support" : "Week support"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: formatMoney(brief.weekSupport, q.currency)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: hi ? "Hafte ka resistance" : "Week resistance"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: formatMoney(brief.weekResistance, q.currency)
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs leading-relaxed text-muted",
							children: brief.weekEvent
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: hi ? "Pehle ek naam chuno." : "Pick a name first."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/plans",
							className: "mt-4 inline-block text-sm text-primary hover:underline",
							children: hi ? "Plan dekho" : "See the plan"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] leading-relaxed text-subtle",
				children: hi ? "Padhai ke liye. PlanVista SEBI ya RBI ke saath registered nahi hai, broker nahi hai, aur aapka paisa nahi rakhta. Score munafa ki sambhavna nahi hai." : "For learning. PlanVista is not registered with SEBI or RBI, is not a broker, and does not hold your money. The reading score is not a probability of profit."
			})
		]
	});
}
function Card({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children
		})]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex justify-between gap-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums",
			children: v
		})]
	});
}
//#endregion
export { ResearchPage as component };
