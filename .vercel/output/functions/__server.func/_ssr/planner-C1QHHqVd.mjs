import { i as __toESM } from "../_runtime.mjs";
import { n as planAll } from "./finance-CeyoWi2H.mjs";
import { a as inr } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { t as GoalForm } from "./GoalForm-TrOzjLNG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planner-C1QHHqVd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Planner() {
	const profile = useSiply((s) => s.profile);
	const setProfile = useSiply((s) => s.setProfile);
	const goals = useSiply((s) => s.goals);
	const addGoal = useSiply((s) => s.addGoal);
	const removeGoal = useSiply((s) => s.removeGoal);
	const loadDemo = useSiply((s) => s.loadDemo);
	const reset = useSiply((s) => s.reset);
	const plan = (0, import_react.useMemo)(() => planAll(profile, goals, false), [profile, goals]);
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium tracking-tight",
				children: "Goals"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Each goal is a named SIP. Totals update against your monthly surplus."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen(true),
						className: "inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-hover",
						children: "New goal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: loadDemo,
						className: "inline-flex h-10 items-center rounded-full border border-border px-4 text-sm hover:bg-surface",
						children: "Load sample student"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: reset,
						className: "inline-flex h-10 items-center px-3 text-sm text-muted hover:text-down",
						children: "Clear"
					})
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-lg border border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-medium",
					children: "Add goal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalForm, {
					onSubmit: (d) => {
						addGoal({
							...d,
							monthlySipOverride: null
						});
						setOpen(false);
					},
					onCancel: () => setOpen(false)
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-5 divide-y divide-border overflow-hidden rounded-lg border border-border",
				children: [goals.map((g) => {
					const p = plan.goals.find((x) => x.id === g.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-3 px-3 py-3 sm:px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/goal/$id",
									params: { id: g.id },
									className: "font-medium text-primary hover:underline",
									children: g.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										g.years,
										"y · ",
										g.category,
										" · today ",
										inr(g.todayCost, true)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium tabular-nums",
									children: p ? inr(p.requiredSip) : "—"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-subtle",
									children: "SIP / mo"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => removeGoal(g.id),
								className: "h-10 px-2 text-xs text-muted hover:text-down",
								children: "Remove"
							})
						]
					}, g.id);
				}), goals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-4 py-10 text-center text-sm text-muted",
					children: "Watchlist empty."
				}) : null]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Investor profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 grid gap-1 text-xs text-muted",
						children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: profile.displayName,
							onChange: (e) => setProfile({ displayName: e.target.value }),
							className: "h-11 rounded-md border border-border px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-primary/30"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 grid gap-1 text-xs text-muted",
						children: ["Age", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 16,
							max: 30,
							value: profile.age,
							onChange: (e) => setProfile({ age: Number(e.target.value) }),
							className: "h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 grid gap-1 text-xs text-muted",
						children: ["Monthly surplus (₹)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 0,
							value: profile.monthlySurplus,
							onChange: (e) => setProfile({ monthlySurplus: Number(e.target.value) }),
							className: "h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted",
						children: [
							"Risk: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium capitalize text-fg",
								children: profile.risk
							}),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/quiz",
								className: "text-primary hover:underline",
								children: "Retake quiz"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Surplus check"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-2xl font-medium tabular-nums",
						children: inr(plan.totals.monthlySip)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"required vs ",
							inr(plan.totals.surplus),
							" surplus"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-2 overflow-hidden rounded-full bg-chip",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-full ${plan.totals.gap > 0 ? "bg-down" : "bg-up"}`,
							style: { width: `${Math.min(100, (plan.totals.utilization ?? 0) * 100 || 0)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: plan.totals.gap > 0 ? "Plan is a stretch — extend timelines or add a step-up." : "Required SIPs fit inside the surplus."
					})
				]
			})]
		})]
	});
}
//#endregion
export { Planner as component };
