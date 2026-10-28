import { i as __toESM } from "../_runtime.mjs";
import { n as DEFAULT_WATCHLIST } from "./universe-C6G9ps6z.mjs";
import { o as pct, t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { c as Bar, d as Tooltip, i as XAxis, l as Cell, n as BarChart, r as YAxis, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
import { g as getMarketHome, y as getQuotes } from "./router-Dvl9OxAQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-Ck-lIEck.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-border bg-surface p-4", className),
		...props
	});
}
function AnalyticsPage() {
	const profile = useSiply((s) => s.profile);
	const watchlist = useSiply((s) => s.watchlist);
	const [quotes, setQuotes] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let live = true;
		Promise.all([getMarketHome({ data: { region: "india" } }), getQuotes({ data: { symbols: (watchlist.length ? watchlist : DEFAULT_WATCHLIST).slice(0, 12) } })]).then(([home, list]) => {
			if (!live) return;
			const map = /* @__PURE__ */ new Map();
			for (const q of [...home.quotes, ...list]) map.set(q.symbol, q);
			setQuotes([...map.values()]);
		});
		return () => {
			live = false;
		};
	}, [watchlist]);
	const breadth = (0, import_react.useMemo)(() => {
		const bull = quotes.filter((q) => q.change >= 0).length;
		return {
			bull,
			bear: quotes.length - bull,
			avg: quotes.length ? quotes.reduce((s, q) => s + q.changePct, 0) / quotes.length : 0,
			best: [...quotes].sort((a, b) => b.changePct - a.changePct)[0],
			worst: [...quotes].sort((a, b) => a.changePct - b.changePct)[0]
		};
	}, [quotes]);
	const bars = quotes.slice(0, 12).map((q) => ({
		name: (q.shortName || q.name).slice(0, 10),
		pct: Number((q.changePct * 100).toFixed(2)),
		bull: q.change >= 0
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium tracking-tight",
					children: "Analytics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Breadth of this delayed board plus your stored risk-fitness percentage. Teaching stats, not a model portfolio."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-muted",
							children: "Your risk score"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("text-4xl font-medium tabular-nums", (profile.riskScore ?? 0) >= 70 ? "text-bull" : "text-bear"),
							children: [profile.riskScore || "—", "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-subtle",
							children: [
								profile.riskGatePassed ? "Gate cleared" : "Take the knowledge gate",
								" ·",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/gate",
									className: "text-primary hover:underline",
									children: "Retake"
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-muted",
							children: "Bull vs bear"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-4xl font-medium tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-bull",
									children: breadth.bull
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: " / "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-bear",
									children: breadth.bear
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: "Names up vs down on this board"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-muted",
							children: "Average move"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("text-4xl font-medium tabular-nums", breadth.avg >= 0 ? "text-bull" : "text-bear"),
							children: pct(breadth.avg)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: "Equal-weight across listed names"
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: "Session change %"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: bars,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 24
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: {
										fill: "var(--color-muted)",
										fontSize: 10
									},
									interval: 0,
									angle: -35,
									textAnchor: "end"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
									fill: "var(--color-muted)",
									fontSize: 11
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--color-surface)",
									border: "1px solid var(--color-border)",
									borderRadius: 12
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "pct",
									radius: [
										6,
										6,
										0,
										0
									],
									children: bars.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: b.bull ? "var(--color-bull)" : "var(--color-bear)" }, b.name))
								})
							]
						})
					})
				})]
			}),
			breadth.best && breadth.worst ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Strongest print ",
					breadth.best.name,
					" (",
					pct(breadth.best.changePct),
					"). Weakest ",
					breadth.worst.name,
					" (",
					pct(breadth.worst.changePct),
					"). Still not a recommendation."
				]
			}) : null
		]
	});
}
//#endregion
export { AnalyticsPage as component };
