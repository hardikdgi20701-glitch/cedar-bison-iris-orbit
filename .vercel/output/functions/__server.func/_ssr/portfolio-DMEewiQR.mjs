import { i as __toESM } from "../_runtime.mjs";
import { n as planAll } from "./finance-CeyoWi2H.mjs";
import { a as inr, o as pct } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { t as AllocationBar } from "./AllocationBar-qWQF2TLW.mjs";
import { t as GrowthChart } from "./GrowthChart-oD5dO5SG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio-DMEewiQR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var computeWithPython = createServerFn({ method: "POST" }).validator((data) => {
	if (typeof data !== "object" || data === null) throw new Error("Invalid payload");
	return data;
}).handler(createSsrRpc("1f283707b4c7941aa578f7972601f7ec547824b6dcf806145ab43cc0cdbcef95"));
function blend(plans) {
	const w = {
		equity: 0,
		hybrid: 0,
		debt: 0,
		gold: 0
	};
	const t = plans.reduce((s, p) => s + p.requiredSip, 0) || 1;
	for (const p of plans) Object.keys(w).forEach((k) => {
		w[k] += p.allocation[k] * (p.requiredSip / t);
	});
	return w;
}
function Portfolio() {
	const profile = useSiply((s) => s.profile);
	const goals = useSiply((s) => s.goals);
	const local = (0, import_react.useMemo)(() => planAll(profile, goals, true), [profile, goals]);
	const [engine, setEngine] = (0, import_react.useState)("local");
	const [remote, setRemote] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const plan = remote ?? local;
	const alloc = blend(plan.goals);
	const combinedYearly = mergeYearly(plan);
	async function runPython() {
		setBusy(true);
		setErr(null);
		try {
			const res = await computeWithPython({ data: {
				profile,
				goals,
				monteCarlo: true
			} });
			setRemote(res);
			setEngine("python");
		} catch (e) {
			setErr(e instanceof Error ? e.message : "Python engine unavailable — showing local engine.");
			setRemote(null);
			setEngine("local");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium tracking-tight",
					children: "Portfolio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Goals treated as holdings. Mix is SIP-weighted, not a live folio."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted",
						children: ["Engine: ", engine === "python" ? "Python" : "Local"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void runPython(),
						className: "inline-flex h-10 items-center rounded-full border border-border px-4 text-sm hover:bg-surface disabled:opacity-50",
						children: busy ? "Computing…" : "Recompute in Python"
					})]
				})]
			}),
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-down",
				children: err
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-lg border border-border p-4 sm:p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-subtle",
							children: "Required monthly SIP"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-3xl font-medium tabular-nums",
							children: inr(plan.totals.monthlySip)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								"Surplus ",
								inr(plan.totals.surplus),
								" · gap",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: plan.totals.gap > 0 ? "text-down" : "text-up",
									children: inr(plan.totals.gap)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AllocationBar, { allocation: alloc })
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowthChart, { yearly: combinedYearly })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "overflow-x-auto rounded-lg border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left font-medium",
								children: "Holding (goal)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-right font-medium",
								children: "SIP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-right font-medium",
								children: "Target"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-right font-medium",
								children: "Projected"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-right font-medium",
								children: "Hit rate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-left font-medium",
								children: "Mix"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: goals.map((g) => {
						const p = plan.goals.find((x) => x.id === g.id);
						if (!p) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/goal/$id",
										params: { id: g.id },
										className: "font-medium text-primary hover:underline",
										children: g.name
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-right tabular-nums",
									children: inr(p.requiredSip)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-right tabular-nums",
									children: inr(p.futureCost, true)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-right tabular-nums",
									children: inr(p.projectedCorpus, true)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-right tabular-nums",
									children: p.successRate == null ? "—" : pct(p.successRate, 0).replace("+", "")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-3 py-3 text-xs text-muted",
									children: [
										"E ",
										Math.round(p.allocation.equity * 100),
										" / D ",
										Math.round(p.allocation.debt * 100)
									]
								})
							]
						}, g.id);
					}) })]
				})
			})
		]
	});
}
function mergeYearly(plan) {
	const maxY = Math.max(0, ...plan.goals.flatMap((g) => g.yearly.map((y) => y.year)));
	return Array.from({ length: Math.ceil(maxY) + 1 }, (_, i) => i).map((year) => {
		let corpus = 0;
		let invested = 0;
		for (const g of plan.goals) {
			const row = [...g.yearly].reverse().find((y) => y.year <= year) ?? g.yearly[0];
			if (row) {
				corpus += row.corpus;
				invested += row.invested;
			}
		}
		return {
			year,
			sip: 0,
			corpus,
			invested
		};
	});
}
//#endregion
export { Portfolio as component };
