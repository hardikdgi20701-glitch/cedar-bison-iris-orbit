import { n as formatIst, s as timeAgo, t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as RefreshCw } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TapeStamp-BH7Q32bE.js
var import_jsx_runtime = require_jsx_runtime();
function TapeStamp({ asOf, source, session, onRefresh, busy, label }) {
	const live = source === "live" || source === "cached";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2 text-xs text-subtle",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-medium", live ? "bg-up-soft text-up" : "bg-chip text-muted"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", live ? "bg-up animate-pulse" : "bg-muted") }), label ?? (live ? "Public delayed tape" : "Last known print")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: asOf ? `${timeAgo(asOf)} · ${formatIst(asOf)}` : "Updating…" }),
			session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", session] }) : null,
			onRefresh ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onRefresh,
				className: "inline-flex h-8 items-center gap-1 rounded-full px-2 text-xs text-muted hover:bg-surface hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", busy && "animate-spin") }), "Refresh"]
			}) : null
		]
	});
}
//#endregion
export { TapeStamp as t };
