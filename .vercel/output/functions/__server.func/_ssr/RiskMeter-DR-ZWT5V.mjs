import { t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RiskMeter-DR-ZWT5V.js
var import_jsx_runtime = require_jsx_runtime();
function RiskMeter({ percent, size = 168, label = "Risk score", passAt = 70, className }) {
	const p = Math.max(0, Math.min(100, Math.round(percent)));
	const passed = p >= passAt;
	const r = 52;
	const circ = 2 * Math.PI * r;
	const dash = p / 100 * circ;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			style: {
				width: size,
				height: size
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size,
				viewBox: "0 0 120 120",
				className: "-rotate-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "60",
					cy: "60",
					r,
					fill: "none",
					className: "stroke-chip",
					strokeWidth: "10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "60",
					cy: "60",
					r,
					fill: "none",
					className: passed ? "stroke-emerald-500" : "stroke-rose-500",
					strokeWidth: "10",
					strokeLinecap: "round",
					strokeDasharray: `${dash} ${circ}`
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("text-4xl font-semibold tabular-nums", passed ? "text-emerald-400" : "text-rose-400"),
					children: [p, "%"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] uppercase tracking-wide text-muted",
					children: label
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-xs text-muted",
			children: [
				"Pass mark ",
				passAt,
				"% · ",
				passed ? "cleared" : `${Math.max(0, passAt - p)}% short`
			]
		})]
	});
}
//#endregion
export { RiskMeter as t };
