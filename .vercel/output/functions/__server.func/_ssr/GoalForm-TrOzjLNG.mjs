import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CATEGORIES } from "./store-CATAbsfv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GoalForm-TrOzjLNG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	name: "",
	category: "education",
	todayCost: 5e4,
	years: 3,
	inflation: .06,
	existing: 0,
	stepUp: .1
};
function GoalForm({ initial, onSubmit, onCancel, submitLabel = "Add to watchlist" }) {
	const [d, setD] = (0, import_react.useState)({
		...empty,
		...initial,
		inflation: initial?.inflation ?? empty.inflation,
		stepUp: initial?.stepUp ?? empty.stepUp
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-3",
		onSubmit: (e) => {
			e.preventDefault();
			if (!d.name.trim()) return;
			onSubmit({
				...d,
				name: d.name.trim()
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-xs font-medium text-muted",
				children: ["Goal name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: d.name,
					onChange: (e) => setD({
						...d,
						name: e.target.value
					}),
					placeholder: "Semester fees, coding laptop…",
					className: "h-11 rounded-md border border-border bg-bg px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-primary/30"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-xs font-medium text-muted",
				children: ["Category", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: d.category,
					onChange: (e) => setD({
						...d,
						category: e.target.value
					}),
					className: "h-11 rounded-md border border-border bg-bg px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30",
					children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.label
					}, c.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-xs font-medium text-muted",
						children: ["Cost today (₹)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 0,
							value: d.todayCost,
							onChange: (e) => setD({
								...d,
								todayCost: Number(e.target.value)
							}),
							className: "h-11 rounded-md border border-border bg-bg px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-xs font-medium text-muted",
						children: ["Years to goal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: .25,
							step: .25,
							value: d.years,
							onChange: (e) => setD({
								...d,
								years: Number(e.target.value)
							}),
							className: "h-11 rounded-md border border-border bg-bg px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-xs font-medium text-muted",
						children: ["Inflation % / yr", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 0,
							step: .5,
							value: +(d.inflation * 100).toFixed(2),
							onChange: (e) => setD({
								...d,
								inflation: Number(e.target.value) / 100
							}),
							className: "h-11 rounded-md border border-border bg-bg px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-xs font-medium text-muted",
						children: ["Already saved (₹)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 0,
							value: d.existing,
							onChange: (e) => setD({
								...d,
								existing: Number(e.target.value)
							}),
							className: "h-11 rounded-md border border-border bg-bg px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-xs font-medium text-muted",
				children: ["Annual step-up %", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					min: 0,
					max: 30,
					step: 1,
					value: +(d.stepUp * 100).toFixed(1),
					onChange: (e) => setD({
						...d,
						stepUp: Number(e.target.value) / 100
					}),
					className: "h-11 rounded-md border border-border bg-bg px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg hover:bg-primary-hover",
					children: submitLabel
				}), onCancel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onCancel,
					className: "inline-flex h-11 items-center rounded-full px-4 text-sm text-muted hover:bg-surface",
					children: "Cancel"
				}) : null]
			})
		]
	});
}
//#endregion
export { GoalForm as t };
