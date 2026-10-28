import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as ResearchPanel } from "./router-Dvl9OxAQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ask-DvxnWyIS.js
var import_jsx_runtime = require_jsx_runtime();
function AskPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
				children: "PlanVista"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-medium tracking-tight",
				children: "Ask anything"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm leading-relaxed text-muted",
				children: "Markets, SIPs, charts, tax words, or how a beginner starts. Answers stay short enough to read. This is a classroom, not a buy or sell call."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-hidden rounded-xl border border-border bg-rail",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResearchPanel, { variant: "page" })
			})
		]
	});
}
//#endregion
export { AskPage as component };
