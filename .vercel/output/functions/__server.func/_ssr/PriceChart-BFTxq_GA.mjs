import "../_runtime.mjs";
import { t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var RANGES = [
	{
		id: "1d",
		label: "1D"
	},
	{
		id: "5d",
		label: "5D"
	},
	{
		id: "1mo",
		label: "1M"
	},
	{
		id: "6mo",
		label: "6M"
	},
	{
		id: "ytd",
		label: "YTD"
	},
	{
		id: "1y",
		label: "1Y"
	},
	{
		id: "5y",
		label: "5Y"
	},
	{
		id: "max",
		label: "MAX"
	}
];
function RangeTabs({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1",
		children: RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(r.id),
			className: cn("h-8 min-w-10 rounded-full px-3 text-xs font-medium", value === r.id ? "bg-chip text-fg" : "text-muted hover:bg-surface hover:text-fg"),
			children: r.label
		}, r.id))
	});
}
//#endregion
export { RangeTabs as t };
