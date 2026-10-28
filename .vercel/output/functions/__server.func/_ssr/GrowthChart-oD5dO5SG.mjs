import { i as __toESM } from "../_runtime.mjs";
import { a as inr } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Area, d as Tooltip, i as XAxis, o as CartesianGrid, r as YAxis, s as ReferenceLine, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GrowthChart-oD5dO5SG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GrowthChart({ yearly, target }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 w-full rounded-md bg-surface-2" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data: yearly,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "sipFill",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-primary)",
							stopOpacity: .28
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-primary)",
							stopOpacity: .02
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-border)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "year",
						tick: {
							fontSize: 11,
							fill: "var(--color-muted)"
						},
						tickFormatter: (v) => v === 0 ? "Now" : `Y${v}`,
						axisLine: { stroke: "var(--color-border)" },
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fontSize: 11,
							fill: "var(--color-muted)"
						},
						tickFormatter: (v) => inr(v, true),
						axisLine: false,
						tickLine: false,
						width: 56
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: {
							border: "1px solid var(--color-border)",
							borderRadius: 8,
							fontSize: 12,
							background: "var(--color-bg)",
							color: "var(--color-fg)"
						},
						formatter: (value, name) => [inr(Number(value)), name === "corpus" ? "Corpus" : name === "invested" ? "Invested" : String(name)],
						labelFormatter: (l) => l === 0 ? "Start" : `Year ${l}`
					}),
					target ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
						y: target,
						stroke: "var(--color-down)",
						strokeDasharray: "4 4",
						label: {
							value: "Goal",
							fill: "var(--color-down)",
							fontSize: 11,
							position: "insideTopRight"
						}
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "invested",
						stroke: "var(--color-subtle)",
						strokeWidth: 1,
						fill: "transparent",
						dot: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "corpus",
						stroke: "var(--color-primary)",
						strokeWidth: 2.4,
						fill: "url(#sipFill)",
						dot: false,
						activeDot: {
							r: 4,
							fill: "var(--color-primary)"
						}
					})
				]
			})
		})
	});
}
//#endregion
export { GrowthChart as t };
