import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Route$5 } from "./router-Dvl9OxAQ.mjs";
import { t as DeepSearch } from "./DeepSearch-Dp73gysN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-DOCRQseb.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q } = Route$5.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-medium tracking-tight",
			children: "Deep Search"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Live NSE & BSE quotes plus Google Finance, Google Search and Google News for further research."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeepSearch, { initial: q ?? "" })]
	});
}
//#endregion
export { SearchPage as component };
