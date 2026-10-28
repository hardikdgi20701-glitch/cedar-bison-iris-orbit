import { i as __toESM } from "../_runtime.mjs";
import { n as planAll } from "./finance-CeyoWi2H.mjs";
import { a as inr, o as pct } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { t as AllocationBar } from "./AllocationBar-qWQF2TLW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-DDnTrJhx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Report() {
	const profile = useSiply((s) => s.profile);
	const goals = useSiply((s) => s.goals);
	const plan = (0, import_react.useMemo)(() => planAll(profile, goals, true), [profile, goals]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print mb-6 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/progress",
					className: "inline-flex h-10 items-center rounded-full border border-border px-4 text-sm hover:bg-surface",
					children: "Back"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => window.print(),
					className: "inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-hover",
					children: "Print / save PDF"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-wide text-subtle",
				children: "PlanVista Finance · educational plan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-medium tracking-tight",
				children: profile.displayName ? `${profile.displayName}'s SIP plan` : "SIP plan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Age ",
					profile.age,
					" · ",
					profile.risk,
					" risk · ",
					profile.timeHorizon,
					" horizon · surplus ",
					inr(profile.monthlySurplus),
					"/mo"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 rounded-md bg-warn-soft px-3 py-2 text-xs",
				children: "For learning purposes only. Not investment advice. Not a SEBI-registered advisor. Figures are illustrative."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid grid-cols-3 overflow-hidden rounded-lg border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
						k: "Required SIP",
						v: inr(plan.totals.monthlySip)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
						k: "Gap vs surplus",
						v: inr(plan.totals.gap)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
						k: "Utilisation",
						v: plan.totals.utilization == null ? "—" : pct(plan.totals.utilization, 0).replace("+", "")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Goals"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "mt-3 w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-left text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2",
								children: "Goal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right",
								children: "Years"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right",
								children: "Target"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right",
								children: "SIP / mo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right",
								children: "Hit rate"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: plan.goals.map((g) => {
						const src = goals.find((x) => x.id === g.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2",
									children: src?.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-right tabular-nums",
									children: src?.years
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-right tabular-nums",
									children: inr(g.futureCost, true)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-right tabular-nums",
									children: inr(g.requiredSip)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-right tabular-nums",
									children: g.successRate == null ? "—" : pct(g.successRate, 0).replace("+", "")
								})
							]
						}, g.id);
					}) })]
				})]
			}),
			plan.goals[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Sample mix (first goal)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AllocationBar, { allocation: plan.goals[0].allocation })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: plan.goals[0].explanation
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-10 border-t border-border pt-4 text-xs text-subtle",
				children: [
					"Prepared in PlanVista Finance ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://mail.google.com/mail/?view=cm&fs=1&to=hardikk.vimal@gmail.com&su=PlanVista",
						target: "_blank",
						rel: "noreferrer",
						className: "text-primary hover:underline",
						children: "hardikk.vimal@gmail.com"
					}),
					" ",
					"· ",
					(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN")
				]
			})
		]
	});
}
function Cell({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-border p-3 even:border-l",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-wide text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-lg font-medium tabular-nums",
			children: v
		})]
	});
}
//#endregion
export { Report as component };
