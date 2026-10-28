import { t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MascotClip-Vj8S27Ut.js
var import_jsx_runtime = require_jsx_runtime();
/** Tiny looping bull/bear clip for last-trade colour. */
function MascotClip({ up, className, size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("overflow-hidden rounded-xl border border-border shadow-inner", up ? "ring-1 ring-emerald-500/40" : "ring-1 ring-rose-500/40", size === "lg" ? "size-24" : size === "sm" ? "size-10" : "size-14", className),
		title: up ? "Last close / last trade was green — bull" : "Last close / last trade was red — bear",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			className: "size-full object-cover",
			src: up ? "/mascots/bull.mp4" : "/mascots/bear.mp4",
			poster: up ? "/mascots/bull.jpg" : "/mascots/bear.jpg",
			autoPlay: true,
			muted: true,
			playsInline: true,
			loop: true
		})
	});
}
//#endregion
export { MascotClip as t };
