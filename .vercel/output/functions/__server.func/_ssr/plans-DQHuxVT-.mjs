import { t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useDeskPlan, t as PLANS } from "./desk-plan-DD0ZGSIw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plans-DQHuxVT-.js
var import_jsx_runtime = require_jsx_runtime();
function PlansPage() {
	const tier = useDeskPlan((s) => s.tier);
	const setTier = useDeskPlan((s) => s.setTier);
	const navigate = useNavigate();
	function choose(id) {
		setTier(id);
		navigate({ to: "/research" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
						children: "PlanVista"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-medium tracking-tight",
						children: "Start free. No card."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: "A plan is a classroom licence for the research desk. This preview does not charge you, does not take a card, and does not keep a balance. The fee on a real launch would buy software access only — not a trade, not advice, not a deposit."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: PLANS.map((plan) => {
					const on = tier === plan.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: cn("flex flex-col rounded-xl border p-5", on ? "border-primary bg-primary-soft" : "border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-wide text-muted",
								children: plan.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-medium tracking-tight",
								children: plan.price
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed text-muted",
								children: plan.note
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 flex-1 space-y-2 text-sm",
								children: plan.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "·"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
								}, item))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => choose(plan.id),
								className: cn("mt-5 h-11 rounded-full text-sm font-medium", plan.id === "free" ? "bg-primary text-primary-fg" : "border border-border bg-bg"),
								children: plan.id === "free" ? "Start free" : on ? "Using this plan" : `Choose ${plan.name}`
							})
						]
					}, plan.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 rounded-xl border border-border p-5 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "What the fee is"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "Access to software and educational research for the month or year you pick. It is not invested for you, not repayable as a trading balance, and not a seat on the exchange."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "What PlanVista is not"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "Not registered with SEBI or RBI. Not a broker, research analyst, investment adviser, or portfolio manager. It does not send orders, connect to a trading venue, or hold your money. You read the note. The practice desk uses imaginary cash."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Questions stay on this device.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/research",
						className: "text-primary hover:underline",
						children: "Open the research desk"
					}),
					"."
				]
			})
		]
	});
}
//#endregion
export { PlansPage as component };
