import { i as __toESM } from "../_runtime.mjs";
import { r as planGoal } from "./finance-CeyoWi2H.mjs";
import { a as inr, o as pct } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { i as Route$2 } from "./router-Dvl9OxAQ.mjs";
import { t as AllocationBar } from "./AllocationBar-qWQF2TLW.mjs";
import { t as GrowthChart } from "./GrowthChart-oD5dO5SG.mjs";
import { t as GoalForm } from "./GoalForm-TrOzjLNG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/goal._id-BYJUsmEE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoalPage() {
	const { id } = Route$2.useParams();
	const navigate = useNavigate();
	const goal = useSiply((s) => s.goals.find((g) => g.id === id));
	const profile = useSiply((s) => s.profile);
	const updateGoal = useSiply((s) => s.updateGoal);
	const removeGoal = useSiply((s) => s.removeGoal);
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [bump, setBump] = (0, import_react.useState)(0);
	const plan = (0, import_react.useMemo)(() => goal ? planGoal(goal, profile.risk, profile.monthlySurplus, true) : null, [goal, profile]);
	const whatIf = (0, import_react.useMemo)(() => {
		if (!goal || !plan) return null;
		const g = {
			...goal,
			monthlySipOverride: plan.requiredSip + bump
		};
		return planGoal(g, profile.risk, profile.monthlySurplus, true);
	}, [
		goal,
		plan,
		bump,
		profile
	]);
	if (!goal || !plan) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "This goal is not on the watchlist."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/planner",
			className: "mt-3 inline-block text-primary hover:underline",
			children: "Back to watchlist"
		})]
	});
	const up = plan.sipVsSavingPct >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:underline",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-1",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize",
						children: goal.category
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-medium tracking-tight",
					children: goal.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						goal.years,
						" years · inflation ",
						(goal.inflation * 100).toFixed(0),
						"% · ",
						plan.horizon,
						" horizon"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-sm text-muted hover:text-down",
					onClick: () => {
						removeGoal(goal.id);
						navigate({ to: "/planner" });
					},
					children: "Remove"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wide text-subtle",
					children: "Required SIP"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-4xl font-medium tabular-nums tracking-tight",
					children: inr(plan.requiredSip)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: `text-sm font-medium tabular-nums ${up ? "text-up" : "text-down"}`,
					children: [
						up ? "Lower" : "Higher",
						" SIP than cash-saving by ",
						Math.abs(plan.sipVsSavingPct).toFixed(0),
						"%"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						"Target ",
						inr(plan.futureCost, true),
						" · success",
						" ",
						plan.successRate == null ? "—" : pct(plan.successRate, 0).replace("+", "")
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border border-border p-3 sm:p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowthChart, {
					yearly: plan.yearly,
					target: plan.futureCost
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 border-b border-border",
				children: [
					["overview", "Overview"],
					["allocation", "Allocation"],
					["whatif", "What-if"],
					["edit", "Edit"]
				].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(k),
					className: `border-b-2 px-3 py-2.5 text-sm ${tab === k ? "border-primary font-medium text-primary" : "border-transparent text-muted"}`,
					children: label
				}, k))
			}),
			tab === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						k: "Inflated target",
						v: inr(plan.futureCost)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						k: "You invest",
						v: inr(plan.totalInvested)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						k: "Projected corpus",
						v: inr(plan.projectedCorpus)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						k: "Expected return",
						v: `${(plan.expectedReturn * 100).toFixed(1)}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						k: "P10 / P90",
						v: `${inr(plan.p10 ?? 0, true)} · ${inr(plan.p90 ?? 0, true)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						k: "Affordability",
						v: plan.affordability
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "sm:col-span-3 text-sm leading-relaxed text-muted",
						children: plan.explanation
					})
				]
			}) : null,
			tab === "allocation" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AllocationBar, { allocation: plan.allocation }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border rounded-lg border border-border",
					children: plan.funds.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: f.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs capitalize text-subtle",
								children: [
									f.sleeve,
									" sleeve · ",
									Math.round(f.weight * 100),
									"%"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: f.why
							})
						]
					}, f.name))
				})]
			}) : null,
			tab === "whatif" && whatIf ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm text-muted",
					children: ["Extra SIP each month: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium tabular-nums text-fg",
						children: inr(bump)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: 3e3,
					step: 100,
					value: bump,
					onChange: (e) => setBump(Number(e.target.value)),
					className: "mt-2 w-full accent-primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							k: "New SIP",
							v: inr(whatIf.usedSip)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							k: "Projected",
							v: inr(whatIf.projectedCorpus)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							k: "Hit rate",
							v: whatIf.successRate == null ? "—" : pct(whatIf.successRate, 0).replace("+", "")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 rounded-lg border border-border p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowthChart, {
						yearly: whatIf.yearly,
						target: plan.futureCost
					})
				})
			] }) : null,
			tab === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-lg rounded-lg border border-border p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalForm, {
					initial: goal,
					submitLabel: "Save goal",
					onSubmit: (d) => updateGoal(goal.id, d)
				})
			}) : null
		]
	});
}
function Card({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-wide text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-lg font-medium capitalize tabular-nums",
			children: v
		})]
	});
}
//#endregion
export { GoalPage as component };
