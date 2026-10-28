import { i as __toESM } from "../_runtime.mjs";
import { i as projectSip } from "./finance-CeyoWi2H.mjs";
import { a as inr } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GrowthChart } from "./GrowthChart-oD5dO5SG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sip-5b3Gf3Vb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SipCalculator() {
	const [monthly, setMonthly] = (0, import_react.useState)(5e3);
	const [years, setYears] = (0, import_react.useState)(10);
	const [rate, setRate] = (0, import_react.useState)(12);
	const [stepUp, setStepUp] = (0, import_react.useState)(10);
	const [existing, setExisting] = (0, import_react.useState)(0);
	const yearly = (0, import_react.useMemo)(() => projectSip({
		monthly,
		years,
		annualReturn: rate / 100,
		stepUp: stepUp / 100,
		existing
	}), [
		monthly,
		years,
		rate,
		stepUp,
		existing
	]);
	const last = yearly[yearly.length - 1];
	const invested = last?.invested ?? 0;
	const corpus = last?.corpus ?? 0;
	const gain = corpus - invested;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-medium tracking-tight",
			children: "SIP calculator"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Illustrative compounding with an optional annual step-up. Not a return guarantee."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3 rounded-xl border border-border p-4",
				onSubmit: (e) => e.preventDefault(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Monthly SIP (₹)",
						value: monthly,
						min: 500,
						step: 500,
						onChange: setMonthly
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Years",
						value: years,
						min: 1,
						max: 40,
						step: 1,
						onChange: setYears
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Expected return % / yr",
						value: rate,
						min: 1,
						max: 20,
						step: .5,
						onChange: setRate
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Annual step-up %",
						value: stepUp,
						min: 0,
						max: 25,
						step: 1,
						onChange: setStepUp
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: "Already invested (₹)",
						value: existing,
						min: 0,
						step: 1e3,
						onChange: setExisting
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 overflow-hidden rounded-xl border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
								k: "Invested",
								v: inr(invested, true)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
								k: "Est. corpus",
								v: inr(corpus, true)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
								k: "Est. gain",
								v: inr(gain, true)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-border p-3 sm:p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowthChart, { yearly })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: "For learning purposes only. Markets do not compound in a straight line; use the goal planner for a risk-aware mix."
					})
				]
			})]
		})]
	});
}
function Num({ label, value, onChange, min, max, step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1 text-xs text-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "number",
			min,
			max,
			step,
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
		})]
	});
}
function Tile({ k, v }) {
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
export { SipCalculator as component };
