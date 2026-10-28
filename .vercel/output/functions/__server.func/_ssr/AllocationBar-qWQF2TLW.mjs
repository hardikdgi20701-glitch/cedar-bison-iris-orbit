import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AllocationBar-qWQF2TLW.js
var import_jsx_runtime = require_jsx_runtime();
var SLEEVES = [
	{
		key: "equity",
		label: "Equity",
		className: "bg-primary"
	},
	{
		key: "hybrid",
		label: "Hybrid",
		className: "bg-primary/55"
	},
	{
		key: "debt",
		label: "Debt",
		className: "bg-muted"
	},
	{
		key: "gold",
		label: "Gold",
		className: "bg-warn"
	}
];
function AllocationBar({ allocation }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-2.5 overflow-hidden rounded-full bg-chip",
		children: SLEEVES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: s.className,
			style: { width: `${allocation[s.key] * 100}%` },
			title: `${s.label} ${Math.round(allocation[s.key] * 100)}%`
		}, s.key))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted sm:grid-cols-4",
		children: SLEEVES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block size-2 rounded-full ${s.className}` }),
				s.label,
				" ",
				Math.round(allocation[s.key] * 100),
				"%"
			]
		}, s.key))
	})] });
}
//#endregion
export { AllocationBar as t };
