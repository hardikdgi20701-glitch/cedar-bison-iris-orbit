import { i as __toESM } from "../_runtime.mjs";
import { o as pct, r as formatMoney, t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as BookOpen } from "../_libs/lucide-react.mjs";
import { c as Sparkline, u as ARTICLES, v as getQuoteBundle } from "./router-Dvl9OxAQ.mjs";
import { t as ChartGpt } from "./ChartGpt-CQRzRKGB.mjs";
import { t as MascotClip } from "./MascotClip-Vj8S27Ut.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chart-gpt-DGjVMz8w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DESKS = [
	{
		id: "^NSEI",
		label: "Nifty 50"
	},
	{
		id: "^BSESN",
		label: "Sensex"
	},
	{
		id: "^NSEBANK",
		label: "Bank Nifty"
	},
	{
		id: "RELIANCE.NS",
		label: "Reliance"
	},
	{
		id: "HDFCBANK.NS",
		label: "HDFC Bank"
	},
	{
		id: "TCS.NS",
		label: "TCS"
	},
	{
		id: "INFY.NS",
		label: "Infosys"
	},
	{
		id: "SBIN.NS",
		label: "SBI"
	},
	{
		id: "ITC.NS",
		label: "ITC"
	}
];
var LESSONS = [
	{
		slug: "how-to-read-candles",
		title: "How a candle is built",
		body: "Four prices make one bar: Open, High, Low, Close. The body is open→close. The wicks are the extreme high and low. Green usually means buyers won that period. Red means sellers won. That result is history — it does not promise the next bar."
	},
	{
		slug: "bull-vs-bear",
		title: "Bull and bear are labels, not orders",
		body: "On PlanVista, Bull / green only means the last print is above the previous close. Bear / red means it is below. A bull market is a long stretch of rising prices. One green day is not a bull market. One red day is not a crash."
	},
	{
		slug: "how-to-read-graphs",
		title: "Read the axes first",
		body: "X is time. Y is price. A 1-day chart answers ‘what did the last session do?’. A 1-year chart answers ‘where did we come from?’. For a student SIP, the long picture (or no stock chart at all) is the calmer default."
	},
	{
		slug: "stop-loss-and-target",
		title: "Write the plan before the order",
		body: "If you ever buy a stock, write entry, stop-loss and target first. A stop is the price where the idea is wrong — not a guaranteed fill. Many beginners never need a stock stop. A SIP in an index fund is a schedule, not an intraday sport."
	},
	{
		slug: "using-chart-gpt",
		title: "How to talk to Chart GPT",
		body: "Ask it to teach, not to pick. ‘How do I read this wick?’ works. ‘Kya buy karu?’ does not — it will refuse and show you how a stop is written instead. Stay on one symbol so the snapshot stays honest."
	}
];
function ChartGptPage() {
	const [symbol, setSymbol] = (0, import_react.useState)("^NSEI");
	const [bundle, setBundle] = (0, import_react.useState)(null);
	const [err, setErr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let live = true;
		setBusy(true);
		setErr(null);
		getQuoteBundle({ data: {
			symbol,
			range: "1d",
			fresh: true
		} }).then((b) => {
			if (live) setBundle(b);
		}).catch((e) => {
			if (live) {
				setBundle(null);
				setErr(e instanceof Error ? e.message : "Could not load this chart");
			}
		}).finally(() => {
			if (live) setBusy(false);
		});
		return () => {
			live = false;
		};
	}, [symbol]);
	const q = bundle?.quote;
	const up = (q?.change ?? 0) >= 0;
	const related = ARTICLES.filter((a) => [
		"how-to-read-candles",
		"how-to-read-graphs",
		"bull-vs-bear",
		"stop-loss-and-target",
		"using-chart-gpt",
		"which-timeframe"
	].includes(a.slug));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-widest text-primary",
					children: "CNBC Awaaz desk · education"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-medium tracking-tight",
					children: "Chart GPT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-2xl text-[15px] leading-relaxed text-muted",
					children: [
						"A working chart classroom, not a tip line. Pick a name, then ask how to ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "read" }),
						" the picture — candles, trend, volume, support and resistance. Chart GPT will not tell you what to buy. Green is not a buy. Red is not a sell."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5 overflow-x-auto pb-1",
				children: DESKS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSymbol(d.id),
					className: cn("h-9 shrink-0 rounded-full px-3 text-sm", symbol === d.id ? "bg-primary text-primary-fg" : "border border-border bg-surface hover:bg-surface-2"),
					children: d.label
				}, d.id))
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-down",
				children: err
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MascotClip, {
								up,
								size: "lg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: q.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-medium tabular-nums",
										children: formatMoney(q.price, q.currency)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: cn("text-sm", up ? "text-up" : "text-down"),
										children: [
											up ? "Bull" : "Bear",
											" ",
											pct(q.changePct),
											" ·",
											" ",
											q.marketState === "open" ? "live / delayed" : "last close"
										]
									})
								]
							}),
							q.spark.length > 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden sm:block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
									data: q.spark,
									up
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/quote/$symbol",
								params: { symbol: q.symbol },
								className: "text-xs text-primary hover:underline",
								children: "Open full chart"
							})
						]
					}) : busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-xl bg-surface" }) : null, bundle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartGpt, {
						bundle,
						variant: "page"
					}, symbol) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-96 animate-pulse rounded-xl bg-surface" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), "How this chat works"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
									className: "mt-3 list-decimal space-y-2 pl-4 text-[13px] leading-relaxed text-muted marker:text-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pick a name above. Chart GPT only cites that last print." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											"Ask how to ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "read" }),
											" it — candle, trend, volume, support."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Follow-ups stay on the same topic. “Aur batao” works." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Buy/sell questions are refused on purpose. That is the product." })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-[13px] leading-relaxed text-muted",
									children: "Replies are written in short paragraphs with bullets so you can actually read them on a phone. If the language desk is busy, the classroom notes still answer from the same numbers."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-xl border border-border bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted",
								children: "Read this first"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-4",
								children: LESSONS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "border-t border-border pt-3 first:border-0 first:pt-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: l.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[13px] leading-relaxed text-muted",
											children: l.body
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/learn/$slug",
											params: { slug: l.slug },
											className: "mt-1 inline-block text-xs text-primary hover:underline",
											children: "Full lesson"
										})
									]
								}, l.slug))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-xl border border-border p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold uppercase tracking-widest text-muted",
								children: "Chart classroom"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-1",
								children: related.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/learn/$slug",
									params: { slug: a.slug },
									className: "block rounded-md px-2 py-2 text-sm hover:bg-surface",
									children: a.title
								}) }, a.slug))
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { ChartGptPage as component };
