import { i as __toESM } from "../_runtime.mjs";
import { n as planAll } from "./finance-CeyoWi2H.mjs";
import { a as inr, o as pct } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply, t as BADGE_META } from "./store-CATAbsfv.mjs";
import { t as RiskMeter } from "./RiskMeter-DR-ZWT5V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-D4_1bbjr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Progress() {
	const profile = useSiply((s) => s.profile);
	const goals = useSiply((s) => s.goals);
	const badges = useSiply((s) => s.badges);
	const watchlist = useSiply((s) => s.watchlist);
	const read = useSiply((s) => s.readSlugs);
	const plan = (0, import_react.useMemo)(() => planAll(profile, goals, false), [profile, goals]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium tracking-tight",
					children: "Track progress"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						profile.displayName ? `${profile.displayName} · ` : "",
						profile.risk,
						" risk · knowledge quiz ",
						profile.riskScore || 0,
						"% · ",
						profile.timeHorizon,
						" horizon · age",
						" ",
						profile.age
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/report",
					className: "inline-flex h-10 items-center rounded-full border border-border px-4 text-sm hover:bg-surface",
					children: "PDF / print plan"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						k: "Monthly surplus",
						v: inr(profile.monthlySurplus)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						k: "Required SIP",
						v: inr(plan.totals.monthlySip)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						k: "Goals",
						v: String(goals.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						k: "Stock list",
						v: String(watchlist.length)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Risk knowledge quiz"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [
							"Daily beginner gate. 70% required to use the learning platform. Last taken",
							" ",
							profile.lastQuizDate || "—"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskMeter, {
							percent: profile.riskScore || 0,
							size: 140,
							label: "Your score",
							passAt: 70
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Status:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: profile.riskGatePassed ? "text-emerald-400" : "text-rose-400",
										children: profile.riskGatePassed ? "Passed" : "Locked"
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/gate",
									className: "mt-2 inline-block text-primary hover:underline",
									children: "Sign in and retake knowledge quiz"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/quiz",
									className: "mt-2 block text-primary hover:underline",
									children: "Sign in and take risk-factor quiz"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Surplus used"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-2 overflow-hidden rounded-full bg-chip",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: plan.totals.gap > 0 ? "h-full bg-down" : "h-full bg-up",
							style: { width: `${Math.min(100, (plan.totals.utilization ?? 0) * 100)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: plan.totals.utilization == null ? "Add a surplus in onboarding to see utilisation." : `${pct(plan.totals.utilization, 0).replace("+", "")} of surplus assigned to SIPs.`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-base font-medium",
				children: "Goals"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "divide-y divide-border overflow-hidden rounded-xl border border-border",
				children: [goals.map((g) => {
					const p = plan.goals.find((x) => x.id === g.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/goal/$id",
							params: { id: g.id },
							className: "font-medium text-primary hover:underline",
							children: g.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								g.years,
								"y · ",
								g.category
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm tabular-nums",
							children: [p ? inr(p.requiredSip) : "—", " / mo"]
						})]
					}, g.id);
				}), goals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "px-4 py-8 text-center text-sm text-muted",
					children: [
						"No goals yet.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/planner",
							className: "text-primary hover:underline",
							children: "Add one"
						})
					]
				}) : null]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-base font-medium",
					children: "Badges"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 sm:grid-cols-2",
					children: Object.keys(BADGE_META).map((id) => {
						const on = badges.includes(id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: `rounded-lg border px-4 py-3 ${on ? "border-primary bg-primary-soft" : "border-border opacity-60"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: BADGE_META[id].label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: BADGE_META[id].hint
							})]
						}, id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-subtle",
					children: [
						read.length,
						" explainer",
						read.length === 1 ? "" : "s",
						" read."
					]
				})
			] })
		]
	});
}
function Tile({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-wide text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xl font-medium tabular-nums",
			children: v
		})]
	});
}
//#endregion
export { Progress as component };
