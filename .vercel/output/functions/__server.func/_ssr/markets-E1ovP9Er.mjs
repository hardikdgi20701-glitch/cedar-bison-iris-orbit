import { i as __toESM } from "../_runtime.mjs";
import { r as INDICES, t as COMPANIES } from "./universe-C6G9ps6z.mjs";
import { o as pct, r as formatMoney, s as timeAgo, t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Sparkline, f as useLiveRefresh, g as getMarketHome, y as getQuotes } from "./router-Dvl9OxAQ.mjs";
import { t as TapeStamp } from "./TapeStamp-BH7Q32bE.mjs";
import { t as DeepSearch } from "./DeepSearch-Dp73gysN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/markets-E1ovP9Er.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Markets() {
	const [sector, setSector] = (0, import_react.useState)("All");
	const [quotes, setQuotes] = (0, import_react.useState)([]);
	const [idx, setIdx] = (0, import_react.useState)([]);
	const [news, setNews] = (0, import_react.useState)([]);
	const [asOf, setAsOf] = (0, import_react.useState)(0);
	const [source, setSource] = (0, import_react.useState)("simulated");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [tick, setTick] = (0, import_react.useState)(0);
	const sectors = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set(COMPANIES.map((c) => c.sector)))], []);
	const list = sector === "All" ? COMPANIES : COMPANIES.filter((c) => c.sector === sector);
	const symbols = (0, import_react.useMemo)(() => list.slice(0, 32).map((c) => c.yahoo).join("|"), [list]);
	useLiveRefresh(() => {
		return getMarketHome({ data: {
			region: "india",
			fresh: tick > 0
		} }).then((res) => {
			setNews(res.news);
			setAsOf(res.asOf);
			setSource(res.source);
		});
	}, 2e4, [tick]);
	useLiveRefresh(() => {
		return getQuotes({ data: { symbols: INDICES.filter((i) => i.region === "india").slice(0, 8).map((i) => i.yahoo) } }).then((rows) => {
			setIdx(rows);
			const latest = rows.reduce((m, q) => Math.max(m, q.asOf || 0), 0);
			if (latest) setAsOf(latest);
			if (rows.some((q) => q.source === "live")) setSource("live");
		});
	}, 1e3, []);
	useLiveRefresh(() => {
		return getQuotes({ data: { symbols: list.slice(0, 32).map((c) => c.yahoo) } }).then(setQuotes);
	}, 1e3, [symbols]);
	const by = new Map(quotes.map((q) => [q.symbol, q]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium tracking-tight",
					children: "Markets"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Search any NSE or BSE listed company from the top bar. Public delayed tape — not a live broker feed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TapeStamp, {
						asOf: asOf || idx[0]?.asOf,
						source,
						busy,
						onRefresh: () => {
							setBusy(true);
							setTick((n) => n + 1);
							window.setTimeout(() => setBusy(false), 800);
						}
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-base font-medium",
				children: "Indian indices"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: idx.map((m) => {
					const up = m.change >= 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/quote/$symbol",
						params: { symbol: m.symbol },
						className: "rounded-xl border border-border p-4 hover:bg-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: m.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xl font-medium tabular-nums",
								children: formatMoney(m.price, m.currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("text-xs tabular-nums", up ? "text-up" : "text-down"),
								children: pct(m.changePct)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
								data: m.spark,
								up,
								className: "mt-2 h-8 w-full"
							})
						]
					}, m.symbol);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: "Listed companies"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1",
					children: sectors.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSector(s),
						className: cn("h-8 rounded-full px-3 text-xs", sector === s ? "bg-chip font-medium" : "text-muted hover:bg-surface"),
						children: s
					}, s))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left font-medium",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left font-medium",
								children: "Sector"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-right font-medium",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-right font-medium",
								children: "Change"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Trend"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.slice(0, 32).map((c) => {
						const q = by.get(c.yahoo);
						const up = (q?.change ?? 0) >= 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border hover:bg-surface",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-3 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/quote/$symbol",
										params: { symbol: c.yahoo },
										className: "font-medium text-primary hover:underline",
										children: c.symbol
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-subtle",
										children: c.name
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-muted",
									children: c.sector
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-right tabular-nums",
									children: q ? formatMoney(q.price, q.currency) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn("px-3 py-3 text-right tabular-nums", up ? "text-up" : "text-down"),
									children: q ? pct(q.changePct) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3",
									children: q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
										data: q.spark,
										up
									}) : null
								})
							]
						}, c.symbol);
					}) })]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-base font-medium",
				children: "Latest market news"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "divide-y divide-border rounded-xl border border-border",
				children: [(news.length ? news : []).slice(0, 10).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: n.url,
					target: "_blank",
					rel: "noreferrer",
					className: "flex items-start justify-between gap-3 px-4 py-3 text-sm hover:bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 text-xs text-subtle",
						children: [
							n.source,
							" · ",
							timeAgo(n.published)
						]
					})]
				}, n.url + n.title)), news.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-6 text-sm text-muted",
					children: "Refreshing headlines…"
				}) : null]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "Deep Search"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 mb-4 text-sm text-muted",
						children: "Look up any listed name, then continue on Google Finance, Google Search or Google News. Quotes refresh live."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeepSearch, {})
				]
			})
		]
	});
}
//#endregion
export { Markets as component };
