import { C as require_jsx_runtime, b as Link, g as Outlet, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { u as ARTICLES } from "./router-Dvl9OxAQ.mjs";
import { r as usePaper } from "./paper-BX3uudxs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn-U7z1OxBu.js
var import_jsx_runtime = require_jsx_runtime();
var ACADEMY = [
	{
		id: "beginner",
		title: "Beginner",
		blurb: "What a share is, how a SIP works, and how an order actually sits on the exchange.",
		slugs: [
			"what-is-a-share",
			"what-is-a-sip",
			"demat-and-orders",
			"nifty-sensex",
			"sebi-guidelines-basics"
		]
	},
	{
		id: "intermediate",
		title: "Intermediate",
		blurb: "Read a candle, a trend, a stop, and why green is not a buy.",
		slugs: [
			"how-to-read-candles",
			"how-to-read-graphs",
			"bull-vs-bear",
			"stop-loss-and-target",
			"risk-for-students",
			"index-funds-first"
		]
	},
	{
		id: "advanced",
		title: "Advanced",
		blurb: "Timeframes, indicators, market stats, and the mistakes that wipe a first account.",
		slugs: [
			"which-timeframe",
			"indicators-later",
			"using-chart-gpt",
			"reading-market-stats",
			"first-mistakes",
			"goal-based-vs-random"
		]
	},
	{
		id: "expert",
		title: "Expert",
		blurb: "Size the order, write the plan, and practise the fill on the paper desk — still not a tip.",
		slugs: [
			"step-up-sip",
			"inflation-is-the-silent-fee",
			"position-size",
			"trade-journal"
		]
	}
];
function levelProgress(read, slugs) {
	const done = slugs.filter((s) => read.includes(s)).length;
	return {
		done,
		total: slugs.length,
		pct: slugs.length ? done / slugs.length : 0
	};
}
function Learn() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const read = useSiply((s) => s.readSlugs);
	const fills = usePaper((s) => s.fills.length);
	if (!(path === "/learn" || path === "/learn/")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	const bySlug = new Map(ARTICLES.map((a) => [a.slug, a]));
	const doneLessons = ACADEMY.reduce((n, level) => n + levelProgress(read, level.slugs).done, 0);
	const allLessons = ACADEMY.reduce((n, level) => n + level.slugs.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
					children: "Academy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-medium tracking-tight",
					children: "Beginner to expert"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-[15px] leading-relaxed text-muted",
					children: ["Every lesson is open. These are the questions people type into Grok, Gemini and ChatGPT. The short answer is on the card. Open it and read the full answer in plain English. Then practise on the paper desk.", fills > 0 ? ` You have ${fills} practice fill${fills === 1 ? "" : "s"}.` : " You have not placed a practice order yet."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-2 overflow-hidden rounded-full bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-primary",
						style: { width: `${allLessons ? doneLessons / allLessons * 100 : 0}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-subtle",
					children: [
						doneLessons,
						" of ",
						allLessons,
						" lessons read"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/trade",
					search: {
						symbol: "RELIANCE.NS",
						side: "buy"
					},
					className: "mt-4 inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg",
					children: "Open paper desk"
				})
			]
		}), ACADEMY.map((level) => {
			const progress = levelProgress(read, level.slugs);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: level.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: level.blurb
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tabular-nums text-subtle",
						children: [
							progress.done,
							"/",
							progress.total
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3 sm:grid-cols-2",
					children: level.slugs.map((slug) => {
						const a = bySlug.get(slug);
						if (!a) return null;
						const readIt = read.includes(slug);
						const answer = a.body[0] ?? "";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/learn/$slug",
							params: { slug },
							className: "block h-full overflow-hidden rounded-xl border border-border hover:bg-surface",
							children: [a.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: a.image,
								alt: "",
								className: "h-32 w-full object-cover"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-[0.14em] text-muted",
										children: a.kicker
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-fg",
										children: a.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted",
										children: answer.length > 160 ? `${answer.slice(0, 157).trim()}…` : answer
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-subtle",
										children: [
											a.minutes,
											" min · diagram and chart",
											readIt ? " · Read" : ""
										]
									})
								]
							})]
						}) }, slug);
					})
				})]
			}, level.id);
		})]
	});
}
//#endregion
export { Learn as component };
