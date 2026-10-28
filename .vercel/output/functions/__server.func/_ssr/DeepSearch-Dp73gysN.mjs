import { i as __toESM } from "../_runtime.mjs";
import { a as displayTicker, c as googleFinanceSearchUrl, l as googleNewsUrl, u as googleSearchUrl } from "./universe-C6G9ps6z.mjs";
import { o as pct, r as formatMoney, s as timeAgo, t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowUpRight, h as Newspaper, l as Search } from "../_libs/lucide-react.mjs";
import { c as Sparkline, h as deepSearch } from "./router-Dvl9OxAQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DeepSearch-Dp73gysN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeepSearch({ initial = "" }) {
	const [q, setQ] = (0, import_react.useState)(initial);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	function run(query) {
		const next = query.trim();
		if (next.length < 1 || busy) return;
		setBusy(true);
		setErr(null);
		deepSearch({ data: { q: next } }).then((res) => setResult(res)).catch((e) => setErr(e instanceof Error ? e.message : "Search failed")).finally(() => setBusy(false));
	}
	(0, import_react.useEffect)(() => {
		if (initial.trim()) run(initial);
	}, [initial]);
	(0, import_react.useEffect)(() => {
		if (!result?.query) return;
		const id = window.setInterval(() => {
			deepSearch({ data: { q: result.query } }).then((res) => setResult(res)).catch(() => {});
		}, 2e4);
		return () => window.clearInterval(id);
	}, [result?.query]);
	const by = new Map((result?.quotes ?? []).map((x) => [x.symbol, x]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-2 sm:flex-row",
				onSubmit: (e) => {
					e.preventDefault();
					run(q);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Deep search any NSE, BSE or global name",
						className: "h-12 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none placeholder:text-subtle focus:bg-bg focus:ring-2 focus:ring-primary/30"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy || !q.trim(),
					className: "inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg hover:bg-primary-hover disabled:opacity-40",
					children: busy ? "Searching…" : "Deep Search"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: googleFinanceSearchUrl(q || "Nifty 50"),
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs hover:bg-surface",
						children: ["Google Finance ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: googleSearchUrl(`${q || "Indian stock market"} NSE BSE`),
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs hover:bg-surface",
						children: ["Google Search ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: googleNewsUrl(`${q || "India stock market"} stock`),
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs hover:bg-surface",
						children: ["Google News ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
					})
				]
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-down",
				children: err
			}) : null,
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: "Live matches"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-subtle",
					children: "Quotes refresh every 30s · delayed public snapshot"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "divide-y divide-border overflow-hidden rounded-xl border border-border",
				children: [result.hits.map((h) => {
					const quote = by.get(h.symbol);
					const up = (quote?.change ?? 0) >= 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-2 px-3 py-3 sm:grid-cols-[1fr_auto] sm:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/quote/$symbol",
								params: { symbol: h.symbol },
								className: "min-w-0 hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: h.ticker || displayTicker(h.symbol)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted",
									children: [
										h.name,
										" · ",
										h.exchange
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [quote?.spark?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
									data: quote.spark,
									up,
									className: "h-8 w-20"
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-[92px] text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm tabular-nums",
										children: quote ? formatMoney(quote.price, quote.currency) : "—"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("text-xs tabular-nums", up ? "text-up" : "text-down"),
										children: quote ? pct(quote.changePct) : "—"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 sm:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: h.googleFinance,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex h-8 items-center rounded-full bg-primary-soft px-3 text-[11px] font-medium text-primary",
										children: "Google Finance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: h.googleSearch,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex h-8 items-center rounded-full border border-border px-3 text-[11px] hover:bg-surface",
										children: "Google"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: h.googleNews,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex h-8 items-center rounded-full border border-border px-3 text-[11px] hover:bg-surface",
										children: "News"
									})
								]
							})
						]
					}, h.symbol);
				}), result.hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-4 py-8 text-center text-sm text-muted",
					children: "No listed matches. Try the Google links above for a live web search."
				}) : null]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-2 flex items-center gap-2 text-base font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "size-4 text-muted" }), "Latest headlines"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "divide-y divide-border overflow-hidden rounded-xl border border-border",
				children: [result.news.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: n.url,
					target: "_blank",
					rel: "noreferrer",
					className: "block px-4 py-3 hover:bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: n.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							n.source,
							" · ",
							timeAgo(n.published)
						]
					})]
				}) }, n.url + n.title)), result.news.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-4 py-6 text-center text-sm text-muted",
					children: "No headlines yet for this query."
				}) : null]
			})] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Search a ticker or company. Results combine the local NSE/BSE universe, live quotes, Google News, and one-click Google Finance follow-through."
			})
		]
	});
}
//#endregion
export { DeepSearch as t };
