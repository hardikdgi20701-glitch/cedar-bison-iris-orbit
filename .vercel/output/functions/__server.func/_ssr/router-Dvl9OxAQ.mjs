import { i as __toESM } from "../_runtime.mjs";
import { a as displayTicker, c as googleFinanceSearchUrl, i as MARKET_LISTS, o as findCompany, u as googleSearchUrl } from "./universe-C6G9ps6z.mjs";
import { o as pct, r as formatMoney, t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, S as useRouter, X as require_react, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply, r as TICKER } from "./store-CATAbsfv.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { t as answerQuestion } from "./research-answers-C1RaX7hM.mjs";
import { A as ChartLine, C as ExternalLink, I as ArrowDown, M as BookOpen, O as ChevronDown, P as ArrowUp, T as ChevronUp, _ as Minimize2, a as Sun, b as Mail, c as Send, d as RefreshCw, f as Radio, g as Moon, h as Newspaper, i as TriangleAlert, j as ChartCandlestick, k as ChartPie, l as Search, m as Phone, o as Sparkles, p as Plus, t as X, u as RotateCcw, v as Menu, y as Maximize2 } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-DFwGCUHS.js
var RANGE_MAP = {
	"1d": {
		range: "1d",
		interval: "2m"
	},
	"5d": {
		range: "5d",
		interval: "15m"
	},
	"1mo": {
		range: "1mo",
		interval: "1d"
	},
	"6mo": {
		range: "6mo",
		interval: "1d"
	},
	ytd: {
		range: "ytd",
		interval: "1d"
	},
	"1y": {
		range: "1y",
		interval: "1d"
	},
	"5y": {
		range: "5y",
		interval: "1wk"
	},
	max: {
		range: "max",
		interval: "1mo"
	}
};
/** One Yahoo call per small group, so a long list still refreshes every second. */
var getQuotes = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	const symbols = d?.symbols;
	if (!Array.isArray(symbols)) throw new Error("symbols required");
	return {
		symbols: symbols.slice(0, 40).map(String),
		fresh: Boolean(d.fresh)
	};
}).handler(createSsrRpc("5948da8bf4c04fa12b5a432843bb3a7036103dc6f3e924194d39a3211ad6f650"));
createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	if (!d?.symbol) throw new Error("symbol required");
	const range = d.range ?? "1d";
	if (!(range in RANGE_MAP)) throw new Error("bad range");
	return {
		symbol: String(d.symbol),
		range,
		fresh: Boolean(d.fresh)
	};
}).handler(createSsrRpc("a04b39d305727adcd6ad9cb315ab77e37f8791cd7d5e940e045bcb457dff4725"));
var getQuoteBundle = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	if (!d?.symbol) throw new Error("symbol required");
	return {
		symbol: String(d.symbol),
		range: d.range ?? "1d",
		fresh: Boolean(d.fresh)
	};
}).handler(createSsrRpc("b354a524a6cbba392d0645cea016f451d312080d2b0c965435be457138c033ac"));
var searchSymbols = createServerFn({ method: "POST" }).validator((data) => {
	return { q: String(data?.q ?? "").trim() };
}).handler(createSsrRpc("c92fff7a71d6b66371a7fb00eccfda99f9b3a5a18eec9613d8925e8f284ad937"));
var deepSearch = createServerFn({ method: "POST" }).validator((data) => {
	const q = String(data?.q ?? "").trim();
	if (q.length > 80) throw new Error("Keep searches under 80 characters");
	return { q };
}).handler(createSsrRpc("2511b9cef7a308ff5ec82e09bd3b563ad5c75799f7f4c3af8fa8d4fc1defe76d"));
var getMarketHome = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	return {
		region: String(d?.region ?? "india"),
		fresh: Boolean(d?.fresh)
	};
}).handler(createSsrRpc("1032937a8477871338630ae8ff42a84bcde9f05f7f24c728920eb9ee81fa0105"));
var getNseDesk = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	const range = d?.range ?? "1d";
	if (!(range in RANGE_MAP)) throw new Error("bad range");
	return {
		fresh: Boolean(d?.fresh),
		range
	};
}).handler(createSsrRpc("80872c179abf26db717be80bd954f3e92e693da313276734e9f1893749fad329"));
createServerFn({ method: "GET" }).handler(createSsrRpc("76936a157cae8e3a2f21f3c4632688d31273503a1515bffe40bb4eccdd043ccb"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/chat-Cw-f3_FX.js
var import_jsx_runtime = require_jsx_runtime();
function renderInline(text) {
	return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
		if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "font-medium text-fg",
			children: part.slice(2, -2)
		}, i);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i);
	});
}
function ChatMarkdown({ text }) {
	const blocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2 text-sm leading-relaxed text-pretty",
		children: blocks.map((block, i) => {
			const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
			const bullets = lines.filter((l) => /^[-•*]\s+/.test(l));
			if (bullets.length >= 2 && bullets.length === lines.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "list-disc space-y-1 pl-4 marker:text-primary",
				children: lines.map((l, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: renderInline(l.replace(/^[-•*]\s+/, "")) }, j))
			}, i);
			const numbered = lines.filter((l) => /^\d+[.)]\s+/.test(l));
			if (numbered.length >= 2 && numbered.length === lines.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "list-decimal space-y-1 pl-4 marker:text-primary",
				children: lines.map((l, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: renderInline(l.replace(/^\d+[.)]\s+/, "")) }, j))
			}, i);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap",
				children: lines.map((l, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [j > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}) : null, renderInline(l.replace(/^[-•*]\s+/, ""))] }, j))
			}, i);
		})
	});
}
function localResearch(prompt, context, history = []) {
	return answerQuestion(prompt, context, history);
}
var askResearch = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	const prompt = String(d?.prompt ?? "").trim();
	if (!prompt) throw new Error("Ask a question");
	if (prompt.length > 2e3) throw new Error("Keep questions under 2,000 characters");
	const history = Array.isArray(d?.history) ? d.history.slice(-8).map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		text: String(m.text ?? "").slice(0, 1200)
	})).filter((m) => m.text) : [];
	return {
		prompt,
		context: String(d?.context ?? "").slice(0, 4e3),
		history
	};
}).handler(createSsrRpc("e8e5687cd8191f1d4cf4ae7660bf84fa1ca4f54ad65ea071f465be82ee5235ca"));
var askChartGpt = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	const prompt = String(d?.prompt ?? "").trim();
	if (!prompt) throw new Error("Ask Chart GPT a question");
	if (prompt.length > 2e3) throw new Error("Keep questions under 2,000 characters");
	const history = Array.isArray(d?.history) ? d.history.slice(-8).map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		text: String(m.text ?? "").slice(0, 1500)
	})).filter((m) => m.text) : [];
	const snapshot = d?.snapshot && typeof d.snapshot === "object" ? d.snapshot : null;
	return {
		prompt,
		context: String(d?.context ?? "").slice(0, 5e3),
		history,
		snapshot
	};
}).handler(createSsrRpc("a4dd0c7a3bb61318de90830ed6624a7b1b185c7cee3f94bbc62a9da6e3f64fb5"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/useLiveRefresh-CRaa6zmX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Fetch on mount, on tab focus, and on an interval while the page is visible. Skips a tick if the last call is still running. */
function useLiveRefresh(fn, intervalMs, deps = []) {
	const fnRef = (0, import_react.useRef)(fn);
	fnRef.current = fn;
	(0, import_react.useEffect)(() => {
		const pending = { current: false };
		const run = () => {
			if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
			if (pending.current) return;
			pending.current = true;
			let ret;
			try {
				ret = fnRef.current();
			} catch {
				pending.current = false;
				return;
			}
			Promise.resolve(ret).finally(() => {
				pending.current = false;
			});
		};
		run();
		const id = window.setInterval(run, intervalMs);
		const kick = () => {
			if (document.visibilityState === "visible") run();
		};
		document.addEventListener("visibilitychange", kick);
		window.addEventListener("focus", kick);
		window.addEventListener("pageshow", kick);
		return () => {
			window.clearInterval(id);
			document.removeEventListener("visibilitychange", kick);
			window.removeEventListener("focus", kick);
			window.removeEventListener("pageshow", kick);
		};
	}, deps);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Dvl9OxAQ.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error.trim()) return error;
	return "An unexpected error occurred. Try reloading the page.";
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var KEY = "pv-theme";
function readTheme() {
	if (typeof window === "undefined") return "dark";
	try {
		const stored = window.localStorage.getItem(KEY);
		if (stored === "light" || stored === "dark") return stored;
	} catch {}
	return "dark";
}
function applyTheme(theme) {
	const root = document.documentElement;
	root.classList.toggle("dark", theme === "dark");
	root.style.colorScheme = theme;
	const meta = document.querySelector("meta[name=\"theme-color\"]");
	if (meta) meta.setAttribute("content", theme === "dark" ? "#131314" : "#ffffff");
}
var ThemeContext = (0, import_react.createContext)(null);
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const next = readTheme();
		setThemeState(next);
		applyTheme(next);
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		theme,
		setTheme: (t) => {
			setThemeState(t);
			try {
				window.localStorage.setItem(KEY, t);
			} catch {}
			applyTheme(t);
		},
		toggle: () => {
			setThemeState((prev) => {
				const next = prev === "dark" ? "light" : "dark";
				try {
					window.localStorage.setItem(KEY, next);
				} catch {}
				applyTheme(next);
				return next;
			});
		}
	}), [theme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value,
		children
	});
}
function useTheme() {
	const ctx = (0, import_react.useContext)(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
}
var ARTICLES = [
	{
		slug: "what-is-a-share",
		title: "What is a share? (absolute beginner)",
		kicker: "Basics",
		minutes: 6,
		image: "/media/share.jpg",
		body: [
			"A share (also called a stock or equity) is a tiny piece of a company. If a company has 100 shares and you own 1, you own 1% of that company. In real life companies have crores of shares, so your piece is usually very small.",
			"When you buy a share, you are not depositing money in a bank. You are buying something whose price can go up or down every market day. Nobody — not SEBI, not the exchange, not the app — promises you a profit.",
			"You make money in two simple ways: (1) the price rises and you sell later for more than you paid (capital gain), or (2) the company pays a dividend (a share of profits). You can also lose money if the price falls.",
			"Shares in India trade mainly on NSE and BSE during market hours (about 9:15 am to 3:30 pm IST, Monday–Friday, except holidays). After hours you can place orders, but they wait until the next session.",
			"You do not need to pick individual stocks on day one. Many beginners start with a mutual fund SIP that already holds many companies for them."
		],
		terms: [
			{
				term: "Share / stock",
				meaning: "A unit of ownership in a company."
			},
			{
				term: "Price",
				meaning: "What buyers and sellers last agreed to pay, in rupees."
			},
			{
				term: "Dividend",
				meaning: "Optional cash the company may pay to shareholders. Not guaranteed."
			},
			{
				term: "Capital gain / loss",
				meaning: "Profit or loss when you sell at a different price than you bought."
			}
		],
		takeaways: [
			"A share is ownership, not a savings deposit.",
			"Price can fall. You can lose money.",
			"You do not have to pick stocks first — funds are a gentler start."
		],
		example: {
			title: "Tiny example (illustrative only)",
			lines: [
				"You buy 2 shares of a company at ₹100 each → you spent ₹200.",
				"If the price becomes ₹110, your holding is worth ₹220 (unrealised gain ₹20).",
				"If the price becomes ₹90, your holding is worth ₹180 (unrealised loss ₹20).",
				"You only lock the gain or loss when you sell. Until then it is just a number on the screen."
			]
		}
	},
	{
		slug: "what-is-a-sip",
		title: "What a SIP actually does with your ₹500",
		kicker: "Basics",
		minutes: 6,
		image: "/media/sip.jpg",
		body: [
			"A Systematic Investment Plan (SIP) invests a fixed amount on a fixed date, usually into a mutual fund. You are not trying to guess the perfect day to buy. You buy more units when prices are low and fewer when prices are high. That habit is called rupee-cost averaging.",
			"Think of it like a recurring UPI payment — except the money buys fund units instead of paying a bill. ₹500, ₹1,000 or ₹2,000 a month is a normal student start. The amount should be money you will not miss on a bad month.",
			"A SIP is not a loan, not a lock-in (except tax-saving ELSS funds, which lock for 3 years), and not a guaranteed-return product. You can pause or stop it. The value of units can fall.",
			"Mutual funds pool money from many people and buy a basket of stocks or bonds. An index fund simply copies an index such as Nifty 50. You still need a real app (Groww, Coin, MF Central, a bank) to start a SIP — PlanVista only teaches and plans. It does not invest for you."
		],
		terms: [
			{
				term: "SIP",
				meaning: "A standing instruction to invest a fixed rupee amount on a schedule."
			},
			{
				term: "Unit",
				meaning: "A slice of the mutual fund. NAV × units = your current value."
			},
			{
				term: "NAV",
				meaning: "Net Asset Value — the per-unit price of the fund, usually updated once a day."
			},
			{
				term: "Rupee-cost averaging",
				meaning: "Buying more units when NAV is low and fewer when NAV is high."
			}
		],
		takeaways: [
			"SIP = habit + time, not a magic profit machine.",
			"Start small enough that you will not raid it for a weekend trip.",
			"You can pause. You cannot demand a guaranteed return."
		],
		example: {
			title: "₹2,000 a month for 5 years (illustrative 11% annualised — not a forecast)",
			lines: [
				"Your money in: 2,000 × 12 × 5 = ₹1,20,000.",
				"If markets grew at an illustrative 11% a year, the pot might be near ₹1.6 lakh.",
				"If markets were weak, the pot could be less than ₹1.2 lakh. That is the risk.",
				"The extra (or the shortfall) is market movement, not a bank interest credit."
			]
		}
	},
	{
		slug: "nifty-sensex",
		title: "Nifty, Sensex and why the TV shouts numbers",
		kicker: "Markets",
		minutes: 5,
		image: "/media/desk.jpg",
		body: [
			"Sensex (BSE) and Nifty 50 (NSE) are indices — scoreboards of large Indian companies. When someone says “the market is up”, they usually mean one of these scoreboards rose today.",
			"Nifty 50 is 50 large companies. Sensex is 30. They move in the same direction most days, but not always by the same percent. A 1% move on Nifty is a big day; 2% is a very loud day.",
			"The index is not a stock you hold by default. To “buy the Nifty” you typically buy a Nifty index fund or ETF. That fund holds the same companies in similar weights.",
			"Your personal portfolio can go up on a day Nifty is down, and the other way around — especially if you hold mid-caps, gold, or debt. Always look at your own goal, not only the ticker on TV."
		],
		terms: [
			{
				term: "Index",
				meaning: "A calculated average of selected stocks. A scoreboard, not a company."
			},
			{
				term: "Nifty 50",
				meaning: "NSE’s 50-stock large-cap index."
			},
			{
				term: "Sensex",
				meaning: "BSE’s 30-stock large-cap index."
			},
			{
				term: "ETF",
				meaning: "A fund that trades on the exchange like a stock, often tracking an index."
			}
		],
		takeaways: [
			"TV numbers are the market’s mood, not your personal report card.",
			"You do not own Nifty unless you buy a product that tracks it.",
			"One red day is normal. A plan is measured in years."
		]
	},
	{
		slug: "goal-based-vs-random",
		title: "Why every SIP needs a job",
		kicker: "Planning",
		minutes: 5,
		image: "/media/sip.jpg",
		body: [
			"A nameless SIP is easy to raid for a weekend trip. A SIP labelled “semester fees 2029” is harder to break. Goal-based investing assigns each rupee a date, an amount, and a risk level.",
			"Short goals (under 3 years) should not sit in pure equity. Markets can stay down for a year. Long goals (7+ years) can hold more equity because you have time to recover from a bad year.",
			"Mixing a laptop-next-year goal and a 10-year study-abroad goal in one fund is messy: you may sell the long-term units when a short bill arrives. Separate sleeves keep you honest.",
			"PlanVista maps each goal to its own SIP size and mix so you can see if the plan fits your monthly surplus before you open a real folio."
		],
		terms: [
			{
				term: "Goal",
				meaning: "A named future spend with a date and a rupee amount."
			},
			{
				term: "Horizon",
				meaning: "How many years until you need the money."
			},
			{
				term: "Surplus",
				meaning: "Income minus must-pay expenses — the only money that should SIP."
			}
		],
		takeaways: [
			"Name the job: fees, emergency, laptop, retirement seed.",
			"Short calendar → safer mix. Long calendar → more growth assets allowed.",
			"Do not mix next-semester money with 10-year money."
		],
		example: {
			title: "Two different jobs",
			lines: [
				"Emergency ₹1.2 lakh in 18 months → mostly liquid / debt. Equity is optional and small.",
				"Study-abroad seed in 8 years → can hold more equity index funds.",
				"Same person, two SIPs, two risk levels. That is the point."
			]
		}
	},
	{
		slug: "inflation-is-the-silent-fee",
		title: "Inflation is the fee nobody invoices",
		kicker: "Inflation",
		minutes: 5,
		image: "/media/desk.jpg",
		body: [
			"A ₹80,000 laptop today is not ₹80,000 in 18 months. Education costs in India have often run above general CPI (the official inflation number). If you plan in today’s rupees and ignore inflation, your SIP will be too small.",
			"Even 6% inflation halves the buying power of idle cash in about 12 years. A 3% savings account that feels “safe” can still lose to fees that rise at 7–8%.",
			"PlanVista inflates the goal first, then solves for the monthly amount. If the number shocks you, that is useful: extend the date, step up the SIP when income rises, or shrink the goal."
		],
		terms: [
			{
				term: "Inflation",
				meaning: "Prices of the same things rising over time."
			},
			{
				term: "CPI",
				meaning: "Consumer Price Index — a government measure of average inflation."
			},
			{
				term: "Real return",
				meaning: "Return after subtracting inflation. The number that actually grows buying power."
			}
		],
		takeaways: [
			"Always inflate the goal before calculating the SIP.",
			"Cash feels safe but can lose buying power.",
			"If the SIP does not fit your surplus, change the goal — do not wish the maths away."
		],
		example: {
			title: "Laptop at 6% inflation",
			lines: [
				"Today’s price: ₹80,000.",
				"In 2 years at 6%: about ₹89,900.",
				"If you saved only ₹80,000, you are ~₹10,000 short — before any market wobble."
			]
		}
	},
	{
		slug: "risk-for-students",
		title: "Risk when you have more time than money",
		kicker: "Risk",
		minutes: 6,
		image: "/media/stoploss.jpg",
		body: [
			"Risk, for a beginner, is simple: the chance that the money is worth less than you put in when you need it. Students usually have a long career ahead and a small corpus. A 20% drop on ₹10,000 feels loud (₹2,000) but is not life-ending. A 20% drop the week before you must pay fees is a real problem.",
			"Match risk to the calendar. Emergency and near-term fees → debt / liquid. Five-year-plus goals can hold more equity. “I can take risk” is not the same as “I need this money in 4 months”.",
			"The other big risk is doing nothing: sitting in a 3% savings account while education inflates at 7%. That quiet gap is also a loss of buying power.",
			"The quizzes in PlanVista are teaching tools, not a SEBI-registered risk profile. When you invest for real, complete the fund house or adviser questionnaire."
		],
		terms: [
			{
				term: "Volatility",
				meaning: "How much the value jumps around. Jumps ≠ guaranteed loss, but they feel like it."
			},
			{
				term: "Capacity",
				meaning: "Can you afford a drop without missing rent or fees?"
			},
			{
				term: "Willingness",
				meaning: "Can you sleep if the screen is red for a month?"
			}
		],
		takeaways: [
			"Near-term money: keep it boring.",
			"Long-term money: a bumpy ride is normal.",
			"Never invest the rent, the fee, or the emergency stash in stocks."
		]
	},
	{
		slug: "index-funds-first",
		title: "Why an index fund is a good first SIP",
		kicker: "Funds",
		minutes: 6,
		image: "/media/share.jpg",
		body: [
			"A Nifty 50 or Nifty 500 index fund (direct plan) copies the index at a low expense ratio. You skip “star manager” risk and the urge to switch funds every year because last year’s rank changed.",
			"Direct plans cut the distributor commission. Over 10 years that 0.5–1% gap compounds. You still need a real account — PlanVista does not transact.",
			"Index funds can still fall. In 2020 and in other corrections, Nifty dropped sharply and later recovered — but “later” can be months or years. That is why horizon matters.",
			"Categories in the planner (equity / hybrid / debt / gold) are sleeves, not a buy-list. Always read the scheme information document. Past returns are not a promise."
		],
		terms: [
			{
				term: "Index fund",
				meaning: "A fund that aims to copy an index, not beat it."
			},
			{
				term: "Direct plan",
				meaning: "You buy from the fund house / app without distributor commission in the expense ratio."
			},
			{
				term: "Expense ratio",
				meaning: "Annual fee the fund charges, already taken from NAV."
			}
		],
		takeaways: [
			"Simple, cheap, diversified is a strong first setup.",
			"Low cost still does not mean no loss.",
			"Read the document. Ignore last year’s trophy ads."
		]
	},
	{
		slug: "step-up-sip",
		title: "Step-up SIPs: let your stipend do the heavy lifting",
		kicker: "Tactics",
		minutes: 4,
		image: "/media/sip.jpg",
		body: [
			"A 10% annual step-up means this year’s ₹2,000 becomes ₹2,200 next year. That often matches an internship or placement hike and cuts the starting SIP needed for a far-off goal.",
			"Year one you put in ₹24,000. Year two, if you stepped up, you put in ₹26,400. The picture in this lesson shows those deposits adding up. It is money leaving your account, not a return the market owes you.",
			"If you cannot commit to a step-up, plan a flat SIP. A missed step-up is not a failure — recalculate. Consistency beats an aggressive schedule you abandon in exam season."
		],
		takeaways: ["Raise the SIP when income rises, not when a reel tells you to.", "A smaller SIP you keep is better than a large one you stop."],
		example: {
			title: "Flat vs 10% step-up (habit illustration, not a return forecast)",
			lines: [
				"Flat ₹2,000 for 5 years → ₹1,20,000 of your money.",
				"Start ₹2,000 and step up 10% each year → you contribute more in later years when you may earn more.",
				"The market return is a separate, uncertain layer on top of whatever you put in."
			]
		}
	},
	{
		slug: "how-to-read-candles",
		title: "How to read candlestick charts (without the hype)",
		kicker: "Charts",
		minutes: 8,
		image: "/media/candles.jpg",
		body: [
			"A candlestick is a drawing of four prices for one period (a day, an hour, a week): Open, High, Low, Close — OHLC. You do not need candles to start a SIP. You need them only if you look at stock charts.",
			"The thick part is the body (open to close). The thin lines are wicks (the extreme high and low). Green usually means close was higher than open (buyers won that period). Red means close was lower than open (sellers won).",
			"A long lower wick: price dipped, then buyers pushed it back up — possible support, not a buy button. A long upper wick: price spiked, then sellers pushed it down — possible resistance. A tiny body (doji) means indecision.",
			"Patterns (hammer, engulfing, shooting star) describe what already happened. They do not promise what happens next. Volume (how many shares traded) adds context: a move on tiny volume is weaker than the same move on heavy volume.",
			"If you remember one rule: a candle is a history lesson, not a fortune cookie. Pair any chart idea with a written stop-loss and a position size you can afford to be wrong on."
		],
		terms: [
			{
				term: "Open",
				meaning: "First traded price of the period."
			},
			{
				term: "High / Low",
				meaning: "Highest and lowest traded prices in the period."
			},
			{
				term: "Close",
				meaning: "Last traded price of the period. The number most people quote."
			},
			{
				term: "Wick / shadow",
				meaning: "The thin line showing the extreme high or low."
			}
		],
		takeaways: [
			"OHLC = the whole story of that bar. Close is only the ending.",
			"Green / red is that period’s result, not a prediction.",
			"Do not trade a pattern you cannot explain in one sentence."
		],
		example: {
			title: "One day, four numbers",
			lines: [
				"Open ₹100, High ₹108, Low ₹97, Close ₹105 → green candle, upper wick to 108, lower wick to 97.",
				"Buyers finished ahead, but sellers did test ₹97. That dip is the lower wick.",
				"This does not tell you what Monday will do."
			]
		}
	},
	{
		slug: "stop-loss-and-target",
		title: "Stop-loss, target, buy and sell — the trade plan basics",
		kicker: "Risk",
		minutes: 7,
		image: "/media/stoploss.jpg",
		body: [
			"If you ever buy an individual stock (many beginners never need to), write three numbers before you tap Buy: entry, stop-loss, target.",
			"Stop-loss: the price where you admit the idea was wrong and exit to limit the loss. It is not a guarantee — the price can gap through your stop. Target: the price where you planned to take profit. Risk-reward example: risk ₹5 to aim for ₹10.",
			"Buy and Sell on a broker app place orders. A market order fills at the available price (can slip). A limit order waits for your price (might not fill). Delivery means you take shares home to demat. Intraday means you must square off the same day — higher stress, not a beginner sport.",
			"Paper-trade first (fake money). Never risk rent, fees, or emergency cash. Past performance is not indicative of future results."
		],
		terms: [
			{
				term: "Stop-loss",
				meaning: "Pre-decided exit to cap a loss."
			},
			{
				term: "Target",
				meaning: "Pre-decided exit to take a profit."
			},
			{
				term: "Market order",
				meaning: "Buy/sell now at whatever price is available."
			},
			{
				term: "Limit order",
				meaning: "Buy/sell only at your price or better."
			},
			{
				term: "Delivery",
				meaning: "You actually own the shares in your demat."
			}
		],
		takeaways: [
			"No stop + no target = hope, not a plan.",
			"Beginners: prefer delivery and funds over intraday.",
			"Position size so that a full stop-loss still lets you sleep."
		],
		example: {
			title: "A written plan (illustration, not a recommendation)",
			lines: [
				"Buy idea: ₹100. Stop-loss: ₹95 (risk ₹5 per share). Target: ₹110 (reward ₹10).",
				"Risk-reward = 1:2. If you can only afford to lose ₹500, you buy at most 100 shares (100 × ₹5).",
				"If it hits ₹95, you exit. You do not “wait for it to come back” without a new plan."
			]
		}
	},
	{
		slug: "using-chart-gpt",
		title: "How to talk to Chart GPT (so it actually teaches)",
		kicker: "Chart GPT",
		minutes: 5,
		image: "/media/candles.jpg",
		body: [
			"Chart GPT is a chart classroom that sits on a live (or last-close) snapshot. It can see the last price, the day’s high and low, volume and a strip of recent closes. It cannot see your demat, your uncle’s WhatsApp tip, or the future.",
			"Ask it to explain a picture, not to pick a stock. ‘Aaj ka candle kaise padhun?’ is a good question. ‘Reliance buy karu kya, target kya hai?’ is a bad one — it will refuse, then show you how a stop-loss is written instead. That refusal is the product, not a bug.",
			"Stay on one name while you chat. If you jump from Nifty to a random small-cap mid-sentence, the snapshot in its head is no longer the chart on your screen. Use the chips on the Chart GPT page to switch, then start a fresh question.",
			"Useful follow-ups: wick vs body, trend vs noise, support vs a wall, volume vs a sleepy tape, 1-day vs 1-year. Useless follow-ups: sure-shot calls, option tips, ‘guaranteed 2% a week’.",
			"If the desk cannot reach the language model, Chart GPT still answers from the same teaching notes and the same numbers. You should get a readable reply either way — never a blank box."
		],
		terms: [
			{
				term: "Snapshot",
				meaning: "The delayed last print Chart GPT is allowed to cite. Not a live tick, not a forecast."
			},
			{
				term: "Teaching note",
				meaning: "An explanation of how to read a chart. Not a recommendation."
			},
			{
				term: "Refuse",
				meaning: "What Chart GPT must do when you ask it to buy or sell."
			}
		],
		takeaways: [
			"Teach, don’t pick: ask ‘how do I read this?’",
			"One symbol per chat so the numbers stay honest.",
			"A refused buy call is Chart GPT doing its job."
		],
		example: {
			title: "Prompts that work",
			lines: [
				"“Is close din ke high ke paas hai ya low ke paas? Usse kya seekhein?”",
				"“Is window pe trend up hai, down hai, ya sideways?”",
				"“Agar main kabhi stock kharidun, 3% stop-loss ka matlab kya hua?”",
				"Not: “Kal 2% mil jayega kya?”"
			]
		}
	},
	{
		slug: "which-timeframe",
		title: "1-day vs 1-year: which chart should you even look at?",
		kicker: "Charts",
		minutes: 6,
		image: "/media/candles.jpg",
		body: [
			"A chart is a question in picture form. The timeframe is the question. If you mix them up, you will take a 5-year fee goal and manage it like a 15-minute cricket over.",
			"1D / 5D: ‘What did the last session do?’ This is where candles earn their keep — body, wicks, high, low. Useful for learning to read. Useless for deciding whether next semester’s fees are funded.",
			"1M / 6M: the recent mood. Earnings, a budget, a rate decision often live here. Still a mood, not a plan.",
			"1Y / 5Y: where the name actually came from. A stock that looks ‘cheap’ after two red days may still be expensive on a five-year line — or the other way around. This is the student default if you insist on looking at an individual name.",
			"Intraday minutes and futures: a sport. They need capital, time, and a written plan you will actually follow. They are not a beginner classroom and Chart GPT will not coach you into them.",
			"If you came to the chart because of a SIP: you may not need the chart at all. A Nifty index-fund SIP does not care whether today’s 2-minute candle was a hammer."
		],
		terms: [{
			term: "Timeframe",
			meaning: "The length of time each bar represents, and how much history the window shows."
		}, {
			term: "Noise",
			meaning: "Movement that does not change the plan. Most 1-day wiggles are noise for a 7-year goal."
		}],
		takeaways: [
			"Match the chart to the question, not to the adrenaline.",
			"SIP / goal money: years. Chart class: days are optional.",
			"Intraday is a sport. Sit it out until the boring habits are real."
		],
		example: {
			title: "Same Nifty, three questions",
			lines: [
				"1D: ‘Did buyers or sellers win Friday’s bar?’ — a reading exercise.",
				"1Y: ‘Did this index grind up, chop, or drop over the last twelve months?’ — context.",
				"Goal: ‘Do I need this money in 11 months for fees?’ — if yes, the chart is the wrong room. Use debt / liquid, not a vibe."
			]
		}
	},
	{
		slug: "indicators-later",
		title: "RSI, MACD and why you can ignore them at first",
		kicker: "Charts",
		minutes: 5,
		image: "/media/desk.jpg",
		body: [
			"Beginner charts on YouTube are often covered in RSI, MACD, Supertrend, Bollinger bands and three moving averages in different colours. That is decoration on top of a guess if you cannot yet read Open, High, Low, Close.",
			"RSI (relative strength index) asks how stretched a move is. A high RSI is not automatically ‘sell’. A low RSI is not automatically ‘buy’. Markets can stay stretched. MACD is two moving averages arguing with each other — useful later, noisy now.",
			"A 50-day or 200-day moving average is simpler: it is the average of past closes. It lags on purpose so you can see drift. Price above a rising 200-day line is a common cartoon of a long-term uptrend. Cartoons fail. Do not treat a crossover as a buy alarm.",
			"Chart GPT will explain these if you ask, then send you back to OHLC, volume and a written stop. That order is the lesson: picture first, ornaments later. No secret RSI setting prints money."
		],
		terms: [{
			term: "Indicator",
			meaning: "A calculated overlay on price. A lens, not a crystal ball."
		}, {
			term: "Lag",
			meaning: "Averages react after price has already moved. That is a feature when you want less noise."
		}],
		takeaways: [
			"If you cannot read a candle, skip the oscillators.",
			"A crossover is not a buy alarm.",
			"OHLC + volume + a written stop beat a busy screenshot."
		]
	},
	{
		slug: "bull-vs-bear",
		title: "Bull and bear markets — what the animals mean",
		kicker: "Markets",
		minutes: 5,
		image: "/media/bull.jpg",
		body: [
			"A bull market is a stretch of generally rising prices and optimism. A bear market is a stretch of generally falling prices and pessimism. People often call a 20%+ fall from a peak a bear market. These are descriptions after the fact, not a siren that rings on day one.",
			"On PlanVista, a Bull label and green number mean the last trade / day’s change was positive. Bear and red mean it was negative. That is only the latest move — not a forecast, not a buy or sell call.",
			"Both animals can be in the room at once: large-caps up, small-caps down. Always check more than one index if you can.",
			"A SIP does not need you to name the animal. In a falling stretch you buy more units for the same rupees, if the money is for a date years away and you can leave it alone. If you need the cash this year, a bear label is a reason to keep that money out of equity, not a reason to “buy the dip” with fees."
		],
		terms: [
			{
				term: "Bull",
				meaning: "Prices generally rising, or (on this site) the last change was up."
			},
			{
				term: "Bear",
				meaning: "Prices generally falling, or (on this site) the last change was down."
			},
			{
				term: "Correction",
				meaning: "A noticeable drop (often ~10%) that may or may not become a bear market."
			}
		],
		takeaways: [
			"Green today ≠ “buy”. Red today ≠ “sell everything”.",
			"Labels describe the last move. Your goal date matters more.",
			"A SIP in a bear market buys more units — if you can stay the course."
		]
	},
	{
		slug: "reading-market-stats",
		title: "Reading market stats: volume, PE, delivery %",
		kicker: "Stats",
		minutes: 7,
		image: "/media/desk.jpg",
		body: [
			"Volume is how many shares traded. A rising price on rising volume is a stronger story than a rising price on sleepy volume. Delivery % is how much of that volume was actually taken into demat (not squared off the same day). High delivery can mean longer-term hands; it is still not a crystal ball.",
			"PE (price-to-earnings) = price ÷ earnings per share. A high PE can mean “people expect growth” or “the stock is expensive”. A low PE can mean “cheap” or “the business is in trouble”. Always compare with the same sector and with the stock’s own history.",
			"Market cap = price × number of shares. Large-cap (Nifty types) are usually less jumpy than small-caps. Jumpier is not “better” — it is riskier.",
			"FII/DII flows, put-call ratio and open interest are extra layers for active traders. For a student SIP, asset allocation and the goal date beat daily stats."
		],
		terms: [
			{
				term: "Volume",
				meaning: "Number of shares that changed hands."
			},
			{
				term: "Delivery %",
				meaning: "Share of trades that were not intraday square-off."
			},
			{
				term: "PE",
				meaning: "Price divided by earnings. A valuation snapshot, not a grade."
			},
			{
				term: "Market cap",
				meaning: "What the whole company is worth at today’s price."
			}
		],
		takeaways: [
			"One statistic is a clue, not a decision.",
			"Compare PE with peers, not with a magic number from a reel.",
			"SIP investors: check stats monthly, not every hour."
		]
	},
	{
		slug: "how-to-read-graphs",
		title: "Line charts, bar charts and what axes really mean",
		kicker: "Charts",
		minutes: 6,
		image: "/media/candles.jpg",
		body: [
			"A line chart connects closing prices over time — the simplest trend view. A bar or candlestick chart adds open, high and low. For multi-year views, a log scale makes percentage moves look fairer (a jump from 1,000 to 2,000 looks like 100 to 200).",
			"X-axis is time (days, months, years). Y-axis is price or index level. Volume is often a bar chart under the price. A 50-day or 200-day moving average is just an average of past closes — it lags, which is the point: it smooths noise.",
			"Support and resistance are zones where price paused before. They are not walls. Prices break them all the time. A “breakout” that fails is called a false breakout — common, and why stops exist."
		],
		terms: [
			{
				term: "X-axis",
				meaning: "Time."
			},
			{
				term: "Y-axis",
				meaning: "Price or index level."
			},
			{
				term: "Moving average",
				meaning: "Average of past prices; a smoother, slower line."
			},
			{
				term: "Support / resistance",
				meaning: "Zones where price previously paused. Not guarantees."
			}
		],
		takeaways: [
			"Read the axes first, then the pretty line.",
			"Zoom out. One hour of noise is not a 5-year plan.",
			"A graph without a stop-loss is entertainment."
		]
	},
	{
		slug: "demat-and-orders",
		title: "Demat, trading account and your first order",
		kicker: "Accounts",
		minutes: 6,
		image: "/media/demat.jpg",
		body: [
			"To hold shares in India you need a demat account (like a locker for securities) plus a trading account (the window that sends orders to the exchange). Mutual fund SIPs can also run through MF platforms with a folio — slightly different paperwork, same idea: you must be KYC-compliant.",
			"KYC typically needs PAN, Aadhaar, a bank account and in-person or video verification. You must be 18+. This is the law, not a website gimmick. PlanVista’s document step is only a prototype simulation.",
			"Settlement is T+1 for most stocks: you pay today, shares show in demat the next working day (details can change with exchange rules). Do not spend money you have not received.",
			"Brokerage, DP charges, STT, GST and stamp duty are real costs. Read the broker’s tariff. Cheap brokerage is not a reason to over-trade."
		],
		terms: [
			{
				term: "Demat",
				meaning: "Electronic locker where your shares sit."
			},
			{
				term: "Trading account",
				meaning: "The account that places buy/sell orders."
			},
			{
				term: "KYC",
				meaning: "Know Your Customer — identity checks required by regulation."
			},
			{
				term: "Folio",
				meaning: "Your mutual-fund account number with a fund house."
			}
		],
		takeaways: [
			"18+ and KYC are mandatory for real investing.",
			"Demat holds shares; the trading window sends orders.",
			"Costs eat frequent traders. Beginners: few, planned actions."
		]
	},
	{
		slug: "first-mistakes",
		title: "Ten beginner mistakes (and the boring fix)",
		kicker: "Habits",
		minutes: 6,
		image: "/media/mistakes.jpg",
		body: [
			"Most first-year damage is not “the market”. It is behaviour. Here are the usual traps, in plain language.",
			"1) Investing rent money. 2) Copying a Telegram/WhatsApp tip. 3) Buying because it is already up 30% this week. 4) Selling a long-term SIP because one red week felt personal. 5) Using intraday or futures on day one. 6) Ignoring costs. 7) No emergency fund. 8) Mixing all goals in one fund. 9) Believing “guaranteed 2% a week”. 10) Checking the app 40 times a day.",
			"Read them as a list in the picture above, one line at a time. The damage is usually the size of the bet and the missing written stop, not a secret the market hid from you.",
			"The boring fix: write the goal, pick a boring index/debt mix, automate a small SIP, keep 2–3 months of expenses in liquid money, and log off. Review once a month, not once an hour."
		],
		takeaways: [
			"If it promises guaranteed high returns, walk away.",
			"Tips are marketing. Your written plan is the product.",
			"Boredom is a feature of a good beginner setup."
		]
	},
	{
		slug: "sebi-guidelines-basics",
		title: "SEBI guidelines every learner should know",
		kicker: "Compliance",
		minutes: 6,
		image: "/media/sebi.jpg",
		body: [
			"SEBI (Securities and Exchange Board of India) regulates the securities market. Unregistered investment advice, guaranteed-return claims and paid “tips” are illegal. If someone DMs you a sure-shot stock for a fee, that is a red flag.",
			"Investment advisers and research analysts must be registered. Mutual fund distributors follow different rules. An education site (like this prototype) must not send orders to a broker or tell you “buy this, sell that” as personal advice. The paper desk fills practice orders with imaginary cash only.",
			"Mandatory spirit of every disclosure: you can lose capital; past performance is not indicative of future results; read the offer document. Free official material lives at investor.sebi.gov.in and the NSE/BSE investor pages.",
			"Complaints can go through SCORES (SEBI’s complaint system) and exchange grievance cells. Keep contract notes and statements."
		],
		terms: [
			{
				term: "SEBI",
				meaning: "The market regulator in India."
			},
			{
				term: "Registered adviser",
				meaning: "A person/firm allowed to give personal investment advice for a fee, under SEBI rules."
			},
			{
				term: "SCORES",
				meaning: "SEBI’s online complaint portal."
			}
		],
		takeaways: [
			"No one legally promises stock-market returns.",
			"Education ≠ advice. Practice fills never leave this browser.",
			"Use official SEBI / exchange channels if something smells wrong."
		]
	},
	{
		slug: "position-size",
		title: "Position size: how many shares, not which share",
		kicker: "Expert",
		minutes: 6,
		image: "/media/stoploss.jpg",
		body: [
			"Experts do not start with a stock tip. They start with a number they can afford to lose, then a stop, then the share count that makes that loss the maximum.",
			"Formula: quantity = risk rupees ÷ (entry − stop). If you will risk ₹5,000 and the stop is ₹10 away, you buy 500 shares — not “as many as the app allows”. If the cash cannot cover that size, you buy fewer, you do not move the stop.",
			"On the paper desk, type a stop (or click the chart), set the rupee risk, and tap Size qty. The button does this arithmetic for practice cash. It is not a suggestion to buy the name on the screen.",
			"A 3% stop and a 1:2 target are classroom defaults so you can see the lines. They are not a system. Change them only when you can say, in one sentence, why the idea is wrong at that price."
		],
		terms: [
			{
				term: "Risk per share",
				meaning: "The distance from your entry to your stop, in rupees."
			},
			{
				term: "Position size",
				meaning: "How many shares make that distance equal your planned loss."
			},
			{
				term: "1:2",
				meaning: "You aim to make twice what you are willing to lose. Still not a promise."
			}
		],
		takeaways: [
			"Size comes from the stop, not from excitement.",
			"If the maths says 4 shares, buy 4. Do not round up to feel serious.",
			"Practice this on the paper desk before any real account."
		],
		example: {
			title: "₹5,000 risk",
			lines: [
				"Last print ₹250. Stop ₹240. Risk per share = ₹10.",
				"₹5,000 ÷ ₹10 = 500 shares. Order value = ₹1,25,000 of practice cash.",
				"If the stop is hit, the planned loss is about ₹5,000. The target at 1:2 sits near ₹270."
			]
		}
	},
	{
		slug: "trade-journal",
		title: "The trade journal (the only edge a beginner can keep)",
		kicker: "Expert",
		minutes: 5,
		image: "/media/desk.jpg",
		body: [
			"A journal is a list of what you planned before the click, and what the market actually did after. Without it, every red day feels like a new story and every green day feels like skill.",
			"Write four things before you press Buy or Sell: the idea in one sentence, the entry, the stop, the target. After the fill, leave it alone. When it exits, write whether you followed the plan. That last line matters more than the profit.",
			"The paper desk keeps the fill, the price, and the stop you typed. That is the start of a journal, stored on this device. It is not a contract note and it is not sent to NSE.",
			"Review once a week, not after every candle. If you broke the stop “just this once”, that is the lesson. The chart did not betray you."
		],
		terms: [
			{
				term: "Plan",
				meaning: "Entry, stop, and target written before the order."
			},
			{
				term: "Fill",
				meaning: "The price the practice order actually got."
			},
			{
				term: "Review",
				meaning: "Did you follow the plan? Yes or no. Then stop."
			}
		],
		takeaways: [
			"No written stop means there is nothing to journal.",
			"Score obedience, not just profit and loss.",
			"Practice fills stay in this browser. Reset the book when you want a clean week."
		]
	}
];
var HEADLINES = [
	{
		title: "Nifty last close 23,398 — oil above $108 is the story, not a buy alarm",
		source: "Tape",
		time: "Fri close"
	},
	{
		title: "Sensex 74,782 after a 1,350-point slide: capital can go down",
		source: "Tape",
		time: "Fri close"
	},
	{
		title: "Rupee around 95.6 vs the dollar; gold near $4,409 / oz",
		source: "FX",
		time: "Weekend"
	},
	{
		title: "NSE/BSE shut for Ganesh Chaturthi — tape resumes Tuesday 16 Sep",
		source: "Calendar",
		time: "Holiday"
	},
	{
		title: "HDFC Bank ~₹708, Reliance ~₹1,258: Friday’s print, not a forecast",
		source: "Nifty",
		time: "Fri close"
	},
	{
		title: "SEBI’s investor-ed push: why campuses are the next classroom",
		source: "Campus Desk",
		time: "2h"
	},
	{
		title: "Direct plans vs regular: the 1% that compounds on student SIPs",
		source: "Explainers",
		time: "5h"
	},
	{
		title: "Bull vs bear: reading the last trade colour without FOMO",
		source: "Markets",
		time: "4h"
	}
];
function SearchBox({ className }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [remote, setRemote] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const local = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		if (query.length < 1) return [];
		const pages = [
			{
				href: "/research",
				label: "Research",
				kind: "Page"
			},
			{
				href: "/plans",
				label: "Plans",
				kind: "Page"
			},
			{
				href: "/",
				label: "Markets",
				kind: "Page"
			},
			{
				href: "/nse",
				label: "NSE desk",
				kind: "Page"
			},
			{
				href: "/search",
				label: "Deep Search",
				kind: "Page"
			},
			{
				href: "/sip",
				label: "SIP calculator",
				kind: "Page"
			},
			{
				href: "/planner",
				label: "Goals",
				kind: "Page"
			},
			{
				href: "/portfolio",
				label: "Portfolio",
				kind: "Page"
			},
			{
				href: "/learn",
				label: "Learn",
				kind: "Page"
			},
			{
				href: "/progress",
				label: "Progress",
				kind: "Page"
			}
		].filter((p) => p.label.toLowerCase().includes(query));
		const arts = ARTICLES.filter((a) => a.title.toLowerCase().includes(query) || a.kicker.toLowerCase().includes(query)).map((a) => ({
			href: `/learn/${a.slug}`,
			label: a.title,
			kind: "Explainer"
		}));
		return [...pages, ...arts].slice(0, 4);
	}, [q]);
	(0, import_react.useEffect)(() => {
		const query = q.trim();
		if (query.length < 1) {
			setRemote([]);
			return;
		}
		let live = true;
		setBusy(true);
		const t = window.setTimeout(() => {
			searchSymbols({ data: { q: query } }).then((res) => {
				if (!live) return;
				const hits = [...res.local.map((c) => ({
					href: `/quote/${encodeURIComponent(c.yahoo)}`,
					label: c.symbol,
					sub: c.name,
					kind: c.exchange
				})), ...res.remote.map((r) => ({
					href: `/quote/${encodeURIComponent(r.symbol)}`,
					label: r.symbol.replace(/\.NS$|\.BO$/, ""),
					sub: r.name,
					kind: r.exchange || r.type
				}))];
				setRemote(hits.slice(0, 8));
			}).catch(() => {
				if (live) setRemote([]);
			}).finally(() => {
				if (live) setBusy(false);
			});
		}, 220);
		return () => {
			live = false;
			window.clearTimeout(t);
		};
	}, [q]);
	const results = [...remote, ...local].slice(0, 10);
	const query = q.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative min-w-0 flex-1", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => {
					setQ(e.target.value);
					setOpen(true);
				},
				onFocus: () => setOpen(true),
				onBlur: () => setTimeout(() => setOpen(false), 180),
				onKeyDown: (e) => {
					if (e.key === "Enter" && query) {
						window.location.assign(`/search?q=${encodeURIComponent(query)}`);
						setOpen(false);
					}
				},
				placeholder: "Search NSE & BSE stocks, ETFs and more",
				className: "h-11 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none placeholder:text-subtle focus:bg-bg focus:ring-2 focus:ring-primary/30"
			}),
			open && (results.length > 0 || busy || query.length > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-bg shadow-lg",
				children: [
					busy && results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-3 py-3 text-sm text-muted",
						children: "Searching listed companies…"
					}) : null,
					results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: r.href,
						className: "flex items-center justify-between gap-3 px-3 py-2.5 text-sm hover:bg-surface",
						onClick: () => setOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: r.label
							}), r.sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 truncate text-muted",
								children: r.sub
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs text-subtle",
							children: r.kind
						})]
					}) }, r.href + r.label)),
					query ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `/search?q=${encodeURIComponent(query)}`,
								className: "block px-3 py-2.5 text-sm font-medium text-primary hover:bg-surface",
								children: [
									"Deep Search “",
									query,
									"” — live quotes + Google"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: googleFinanceSearchUrl(query),
								target: "_blank",
								rel: "noreferrer",
								className: "block px-3 py-2 text-xs text-muted hover:bg-surface",
								children: "Open in Google Finance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: googleSearchUrl(`${query} stock NSE BSE`),
								target: "_blank",
								rel: "noreferrer",
								className: "block px-3 py-2 text-xs text-muted hover:bg-surface",
								children: "Search Google"
							})
						]
					}) : null
				]
			}) : null
		]
	});
}
var STORE = "pv-ask-thread";
var STARTERS = [
	"What's going on with Indian markets today?",
	"How does a SIP compare with a lump sum for a 5-year goal?",
	"Why shouldn't I buy a stock because it is green today?",
	"How does a beginner actually start?",
	"What is support and resistance?"
];
function ResearchPanel({ variant = "rail", onClose }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const profile = useSiply((s) => s.profile);
	const [input, setInput] = (0, import_react.useState)("");
	const [msgs, setMsgs] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [tape, setTape] = (0, import_react.useState)("");
	const scroller = (0, import_react.useRef)(null);
	const box = (0, import_react.useRef)(null);
	const page = variant === "page";
	const symbol = (0, import_react.useMemo)(() => {
		const m = pathname.match(/\/quote\/([^/]+)/);
		return m ? decodeURIComponent(m[1]) : null;
	}, [pathname]);
	const company = symbol ? findCompany(symbol) : null;
	const name = profile.displayName.split(" ")[0] || "Learner";
	(0, import_react.useEffect)(() => {
		try {
			const raw = sessionStorage.getItem(STORE);
			if (!raw) return;
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed)) setMsgs(parsed.slice(-30));
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			sessionStorage.setItem(STORE, JSON.stringify(msgs.slice(-30)));
		} catch {}
	}, [msgs]);
	(0, import_react.useEffect)(() => {
		const el = scroller.current;
		if (!el) return;
		el.scrollTop = el.scrollHeight;
	}, [msgs, busy]);
	useLiveRefresh(() => {
		return getQuotes({ data: { symbols: [
			"^NSEI",
			"^BSESN",
			"^NSEBANK"
		] } }).then((rows) => {
			const line = rows.map((q) => `${q.shortName || q.name} ${formatMoney(q.price, q.currency)} (${pct(q.changePct)})`).join(". ");
			if (line) setTape(line);
		}).catch(() => {});
	}, 15e3, []);
	const bag = [
		tape ? `Last public print: ${tape}` : "",
		profile.displayName ? `Learner: ${profile.displayName}, age ${profile.age}, ${profile.risk} risk, ${profile.timeHorizon} horizon.` : "",
		company ? `Viewing ${company.name} (${company.yahoo}), sector ${company.sector}.` : ""
	].filter(Boolean).join("\n");
	const suggestions = company ? [
		`What should a learner watch on ${company.name}?`,
		`How does a SIP compare with buying ${company.symbol} outright?`,
		"Why shouldn't I buy a stock because it is green today?"
	] : STARTERS;
	async function send(text) {
		const prompt = text.trim();
		if (!prompt || busy) return;
		setBusy(true);
		setInput("");
		const history = msgs.slice(-8);
		const local = localResearch(prompt, bag, history);
		setMsgs((m) => [...m, {
			role: "user",
			text: prompt
		}]);
		try {
			const res = await Promise.race([askResearch({ data: {
				prompt,
				history,
				context: bag
			} }), new Promise((resolve) => {
				window.setTimeout(() => resolve({
					ok: true,
					text: local
				}), 7e3);
			})]);
			setMsgs((m) => [...m, {
				role: "assistant",
				text: res.text?.trim() ? res.text : local
			}]);
		} catch {
			setMsgs((m) => [...m, {
				role: "assistant",
				text: local
			}]);
		} finally {
			setBusy(false);
			box.current?.focus();
		}
	}
	function clear() {
		setMsgs([]);
		try {
			sessionStorage.removeItem(STORE);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-0 flex-col", page ? "h-[calc(100dvh-11rem)]" : "h-full"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "Research"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1",
						children: [
							msgs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: clear,
								className: "inline-flex h-9 items-center gap-1 rounded-full px-2 text-xs text-muted hover:bg-surface",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "New"]
							}) : null,
							page ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ask",
								className: "inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-surface",
								"aria-label": "Open full ask page",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" })
							}),
							onClose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onClose,
								className: "inline-flex h-9 items-center rounded-full px-2 text-xs text-muted hover:bg-surface xl:hidden",
								children: "Close"
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scroller,
				className: "min-h-0 flex-1 overflow-y-auto px-4 pb-3",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: [
							"Hi ",
							name,
							". Ask anything about markets, SIPs, charts, or how to start. Type in the box — you do not have to use an example. This desk teaches. It will not pick a stock. For candles, use",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/chart-gpt",
								className: "text-primary hover:underline",
								children: "Chart GPT"
							}),
							"."
						]
					}),
					!msgs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col gap-1.5",
						children: suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void send(s),
							className: "w-full rounded-lg border border-border px-3 py-2 text-left text-sm leading-snug hover:bg-surface",
							children: s
						}) }, s))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-3",
						children: msgs.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: cn("rounded-lg px-3 py-2 text-sm leading-relaxed", m.role === "user" ? "ml-6 bg-primary-soft text-fg" : "mr-2 border border-border bg-surface"),
							children: m.role === "user" ? m.text : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text: m.text })
						}, i))
					}),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "Thinking…"
					}) : null,
					!msgs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/planner",
								className: "rounded-full border border-border px-3 py-1.5 hover:bg-surface",
								children: "Create a goal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/sip",
								className: "rounded-full border border-border px-3 py-1.5 hover:bg-surface",
								children: "SIP calculator"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/learn",
								className: "rounded-full border border-border px-3 py-1.5 hover:bg-surface",
								children: "Academy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/trade",
								className: "rounded-full border border-border px-3 py-1.5 hover:bg-surface",
								children: "Practice trade"
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "shrink-0 border-t border-border bg-rail p-3",
				onSubmit: (e) => {
					e.preventDefault();
					send(input);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2 rounded-xl border border-border bg-bg px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "ask-box",
							children: "Ask a question"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "ask-box",
							ref: box,
							value: input,
							onChange: (e) => setInput(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									send(input);
								}
							},
							rows: page ? 3 : 2,
							placeholder: "Ask anything — SIP, inflation, a chart, how to start…",
							className: "min-h-11 flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-subtle"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy || !input.trim(),
							className: "inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg disabled:opacity-40",
							"aria-label": "Send question",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-[10px] leading-snug text-subtle",
					children: "Enter to send. Shift+Enter for a new line. For learning purposes only. Not investment advice."
				})]
			})
		]
	});
}
function Sparkline({ data, className = "h-8 w-24", up }) {
	if (!data.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className });
	const min = Math.min(...data);
	const span = Math.max(...data) - min || 1;
	const w = 96;
	const h = 32;
	const coords = data.map((v, i) => {
		return {
			x: i / Math.max(data.length - 1, 1) * w,
			y: h - (v - min) / span * 26 - 3
		};
	});
	const pts = coords.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
	const last = coords[coords.length - 1];
	const area = `0,${h} ${pts} ${w},${h}`;
	const positive = up ?? data[data.length - 1] >= data[0];
	const color = positive ? "var(--color-up)" : "var(--color-down)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className,
		preserveAspectRatio: "none",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				fill: positive ? "var(--color-up-soft)" : "var(--color-down-soft)",
				points: area
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
				fill: "none",
				stroke: color,
				strokeWidth: "1.5",
				strokeLinejoin: "round",
				points: pts
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: last.x,
				cy: last.y,
				r: "1.7",
				fill: color
			})
		]
	});
}
function WatchlistRail() {
	const watchlist = useSiply((s) => s.watchlist);
	const toggleWatch = useSiply((s) => s.toggleWatch);
	const [open, setOpen] = (0, import_react.useState)({
		watchlist: true,
		index: true
	});
	const [quotes, setQuotes] = (0, import_react.useState)({});
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)([]);
	const groups = (0, import_react.useMemo)(() => [{
		id: "watchlist",
		name: "Watchlist",
		symbols: watchlist
	}, ...MARKET_LISTS], [watchlist]);
	const needed = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		for (const g of groups) if (open[g.id]) g.symbols.forEach((s) => set.add(s));
		return [...set];
	}, [groups, open]);
	useLiveRefresh(() => {
		const batch = needed.slice(0, 40);
		if (!batch.length) return;
		return getQuotes({ data: { symbols: batch } }).then((rows) => {
			setQuotes((prev) => {
				const next = { ...prev };
				for (const r of rows) next[r.symbol] = r;
				return next;
			});
		}).catch(() => {});
	}, 1e3, [needed.join("|")]);
	(0, import_react.useEffect)(() => {
		const query = q.trim();
		if (!adding || query.length < 1) {
			setHits([]);
			return;
		}
		let live = true;
		const t = window.setTimeout(() => {
			searchSymbols({ data: { q: query } }).then((res) => {
				if (!live) return;
				setHits([...res.local.map((c) => ({
					symbol: c.yahoo,
					name: c.name,
					exchange: c.exchange
				})), ...res.remote.map((r) => ({
					symbol: r.symbol,
					name: r.name,
					exchange: r.exchange
				}))].slice(0, 8));
			}).catch(() => {
				if (live) setHits([]);
			});
		}, 180);
		return () => {
			live = false;
			window.clearTimeout(t);
		};
	}, [q, adding]);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Lists"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/markets",
					className: "text-xs text-primary hover:underline",
					children: "Markets"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: groups.map((g) => {
					const expanded = Boolean(open[g.id]);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 px-2 py-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "min-h-11 flex-1 rounded-md px-1 text-left text-sm font-medium hover:bg-surface",
									onClick: () => setOpen((s) => ({
										...s,
										[g.id]: !expanded
									})),
									children: g.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-fg",
									"aria-label": `Add symbol to ${g.name}`,
									onClick: () => {
										setAdding(true);
										setOpen((s) => ({
											...s,
											watchlist: true,
											[g.id]: true
										}));
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-fg",
									"aria-label": expanded ? `Collapse ${g.name}` : `Expand ${g.name}`,
									onClick: () => setOpen((s) => ({
										...s,
										[g.id]: !expanded
									})),
									children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
								})
							]
						}), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [g.symbols.map((sym) => {
							const quote = quotes[sym];
							const company = findCompany(sym);
							const ticker = displayTicker(sym);
							const name = quote?.name ?? company?.name ?? ticker;
							const href = `/quote/${encodeURIComponent(sym)}`;
							const active = pathname === href || pathname.endsWith("/" + encodeURIComponent(sym));
							const up = (quote?.change ?? 0) >= 0;
							const flat = quote != null && Math.abs(quote.changePct) < 5e-5;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/quote/$symbol",
								params: { symbol: sym },
								className: cn("grid grid-cols-[1fr_72px_auto] items-center gap-2 px-3 py-2 hover:bg-surface", active ? "bg-surface" : ""),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-[13px] font-medium tracking-tight",
											children: ticker
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-[11px] text-subtle",
											children: name
										})]
									}),
									quote?.spark?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
										data: quote.spark,
										up,
										className: "h-7 w-[72px]"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-center text-subtle",
										children: "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-[88px] text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[13px] tabular-nums",
											children: quote ? formatMoney(quote.price, quote.currency) : "—"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: cn("inline-flex items-center justify-end gap-0.5 text-[11px] tabular-nums", flat ? "text-muted" : up ? "text-up" : "text-down"),
											children: [
												quote && !flat ? up ? "Bull " : "Bear " : null,
												quote ? pct(quote.changePct) : "—",
												quote && !flat ? up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3" }) : null
											]
										})]
									})
								]
							}) }, g.id + sym);
						}), g.symbols.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "px-3 py-6 text-center text-xs text-muted",
							children: "Search any NSE or BSE name to build a list."
						}) : null] }) : null]
					}, g.id);
				})
			}),
			adding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium",
						children: "Add symbol"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						autoFocus: true,
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search NSE & BSE",
						className: "h-10 w-full rounded-md border border-border bg-bg px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 max-h-40 overflow-y-auto",
						children: hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-surface",
							onClick: () => {
								toggleWatch(h.symbol);
								setQ("");
								setAdding(false);
								setOpen((s) => ({
									...s,
									watchlist: true
								}));
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 truncate",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: displayTicker(h.symbol)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-muted",
									children: h.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-subtle",
								children: h.exchange
							})]
						}) }, h.symbol))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-2 text-xs text-muted hover:text-fg",
						onClick: () => {
							setAdding(false);
							setQ("");
						},
						children: "Close"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/search",
					className: "flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm hover:bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: "Deep Search"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-xs text-muted",
						children: "Google + live quotes"
					})] })]
				})
			})
		]
	});
}
/** Rehydrate local lists and profile. Cloud sync is off in this build. */
function CloudSync() {
	(0, import_react.useEffect)(() => {
		useSiply.persist.rehydrate();
	}, []);
	return null;
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/planvista-icon.png",
						alt: "",
						className: "size-7 object-contain",
						width: 28,
						height: 28
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "PlanVista Finance"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs leading-relaxed text-muted",
					children: "Live NSE/BSE market tracking, goal-based SIP planning and explainable research. Built as an educational product — not a brokerage, not a SEBI-registered advisor. Research notes are readings of public data, not a call to buy or sell."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wide text-subtle",
					children: "Assumptions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs leading-relaxed text-muted",
					children: "Equity 12% / hybrid 10% / debt 7% / gold 8% long-run (illustrative). Inflation default 6–8%. Quotes are delayed public-market snapshots. Monte Carlo is a teaching simulation, not a forecast."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-wide text-subtle",
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-medium text-fg",
						children: "Hardik Kumar Vimal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Product & website design"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://mail.google.com/mail/?view=cm&fs=1&to=hardikk.vimal@gmail.com&su=PlanVista",
						target: "_blank",
						rel: "noreferrer",
						className: "mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-primary hover:underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), "hardikk.vimal@gmail.com"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "tel:8076636524",
						className: "mt-1 inline-flex min-h-11 items-center gap-2 text-sm text-primary hover:underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), "8076636524"]
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border px-4 py-3 text-center text-[11px] leading-relaxed text-subtle",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" PlanVista Finance · Designed by Hardik Kumar Vimal · Educational prototype only. Not SEBI-registered investment advice. Markets involve risk of capital loss. Past performance is not indicative of future results. Data refreshes on each visit; live TV embed is for awareness only."
			]
		})]
	});
}
function Ticker() {
	const [rows, setRows] = (0, import_react.useState)(TICKER.map((t) => ({
		symbol: t.symbol,
		value: "—",
		change: 0
	})));
	useLiveRefresh(() => {
		return getQuotes({ data: { symbols: TICKER.map((t) => t.yahoo) } }).then((quotes) => {
			const by = new Map(quotes.map((q) => [q.symbol, q]));
			setRows(TICKER.map((t) => {
				const q = by.get(t.yahoo);
				return {
					symbol: t.symbol,
					value: q ? formatMoney(q.price, q.currency) : "—",
					change: q?.changePct ?? 0
				};
			}));
		}).catch(() => {});
	}, 1e3);
	const items = [...rows, ...rows];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden border-b border-border bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-max animate-[ticker_36s_linear_infinite] gap-8 px-4 py-2 text-xs",
			children: items.map((t, i) => {
				const up = t.change >= 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-2 whitespace-nowrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: t.symbol
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-fg",
							children: t.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("tabular-nums", up ? "text-up" : "text-down"),
							children: pct(t.change)
						})
					]
				}, t.symbol + i);
			})
		})
	});
}
var TV_CHANNELS = [
	{
		id: "awaaz",
		name: "CNBC Awaaz",
		tagline: "Hindi · share bazaar",
		channelId: "UCQIycDaLsBpMKjOCeaKUYVg",
		playlistId: "PLSbrpwmzi3x-94fRO5nlKTOTqzqMaDuPX",
		fallbackId: "i_1g_M0JSy4"
	},
	{
		id: "tv18",
		name: "CNBC-TV18",
		tagline: "English · markets",
		channelId: "UCmRbHAgG2k2vDUvb3xsEunQ"
	},
	{
		id: "etnow",
		name: "ET Now",
		tagline: "English · tape",
		channelId: "UCI_mwTKUhicNzFrhm33MzBQ"
	},
	{
		id: "zee",
		name: "Zee Business",
		tagline: "Hindi · markets",
		channelId: "UCkXopQ3ubd-rnXnStZqCl2w"
	}
];
var getLiveTv = createServerFn({ method: "POST" }).validator((data) => {
	const id = String(data?.channel ?? "awaaz");
	return {
		channel: TV_CHANNELS.some((c) => c.id === id) ? id : "awaaz",
		fresh: Boolean(data?.fresh)
	};
}).handler(createSsrRpc("26f7df86db9bb81c99e059f2d29bf23a5a2e33a49833b4b9d312123e6eb3a63c"));
function LiveNewsEmbed() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const [channel, setChannel] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "awaaz";
		const saved = window.localStorage.getItem("pv-tv-channel");
		return TV_CHANNELS.some((c) => c.id === saved) ? saved : "awaaz";
	});
	const [stream, setStream] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [tick, setTick] = (0, import_react.useState)(0);
	useLiveRefresh(() => {
		setBusy(true);
		getLiveTv({ data: {
			channel,
			fresh: true
		} }).then(setStream).catch(() => {}).finally(() => setBusy(false));
	}, 9e4, [channel, tick]);
	function pick(id) {
		setChannel(id);
		try {
			localStorage.setItem("pv-tv-channel", id);
		} catch {}
	}
	const live = Boolean(stream?.live);
	const title = stream?.title || "Market desk";
	const chMeta = TV_CHANNELS.find((c) => c.id === channel);
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpen(true),
		className: "fixed bottom-20 left-4 z-20 inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-3 text-xs font-medium text-fg shadow-lg hover:bg-chip md:bottom-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", live ? "animate-pulse bg-down" : "bg-muted") }),
			live ? "Live TV" : "Last live",
			" · ",
			chMeta?.name ?? "CNBC Awaaz"
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed z-50 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl", expanded ? "bottom-20 left-4 h-[min(72vh,640px)] w-[min(420px,92vw)] md:bottom-4" : "bottom-20 left-4 w-[min(340px,92vw)] md:bottom-4"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2 border-b border-border px-2.5 py-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3.5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-medium tracking-wide text-fg",
								children: "PlanVista TV"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase", live ? "bg-down-soft text-down" : "bg-chip text-muted"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", live ? "animate-pulse bg-down" : "bg-muted") }), live ? "Live" : "Last live"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 truncate text-[11px] text-muted",
						title,
						children: [
							chMeta?.name,
							" · ",
							title
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-chip hover:text-fg",
							onClick: () => setTick((n) => n + 1),
							"aria-label": "Refresh stream",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", busy && "animate-spin") })
						}),
						stream?.watchUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: stream.watchUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-chip hover:text-fg",
							"aria-label": "Open on YouTube",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-chip hover:text-fg",
							onClick: () => setExpanded((e) => !e),
							"aria-label": expanded ? "Minimise" : "Expand",
							children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-chip hover:text-fg",
							onClick: () => setOpen(false),
							"aria-label": "Close live TV",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("bg-bg", expanded ? "h-[calc(100%-92px)]" : "h-[186px]"),
				children: stream?.embedUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: `${stream.channelName} ${live ? "live" : "last live"}`,
					src: stream.embedUrl,
					className: "h-full w-full",
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowFullScreen: true
				}, stream.videoId) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center text-xs text-muted",
					children: "Tuning the desk…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 overflow-x-auto border-t border-border px-2 py-1.5",
				children: TV_CHANNELS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => pick(c.id),
					className: cn("h-8 shrink-0 rounded-full px-2.5 text-[11px]", channel === c.id ? "bg-chip font-medium text-fg" : "text-muted hover:bg-chip hover:text-fg"),
					children: c.name.replace("CNBC-", "").replace("CNBC ", "")
				}, c.id))
			})
		]
	});
}
function SplashScreen({ onDone }) {
	const [mood, setMood] = (0, import_react.useState)("flat");
	const [label, setLabel] = (0, import_react.useState)("Checking last close…");
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let live = true;
		getMarketHome({ data: { region: "india" } }).then((res) => {
			if (!live) return;
			const nifty = res.quotes.find((q) => /nifty/i.test(q.name) || /nifty/i.test(q.symbol)) ?? res.quotes[0];
			if (!nifty) {
				setMood("flat");
				setLabel("Markets · Learning · Goals");
				return;
			}
			const up = nifty.change > 0;
			const down = nifty.change < 0;
			setMood(up ? "bull" : down ? "bear" : "flat");
			const closed = nifty.marketState !== "open";
			setLabel(`${nifty.shortName || nifty.name} ${closed ? "last close" : "now"} ${up ? "green" : down ? "red" : "flat"} ${pct(nifty.changePct)}`);
		}).catch(() => {
			if (live) setLabel("Markets · Learning · Goals");
		}).finally(() => {
			if (live) setReady(true);
		});
		return () => {
			live = false;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => onDone?.(), 5600);
		return () => clearTimeout(t);
	}, [onDone]);
	const src = mood === "bear" ? "/mascots/bear.mp4" : "/mascots/bull.mp4";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 ${mood === "bear" ? "bg-rose-950/40" : "bg-emerald-950/30"}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col items-center px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute -inset-6 animate-pulse rounded-full blur-2xl ${mood === "bear" ? "bg-rose-500/25" : "bg-emerald-500/25"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative size-56 overflow-hidden rounded-3xl border border-border shadow-2xl sm:size-72",
							children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								className: "size-full object-cover",
								src,
								poster: mood === "bear" ? "/mascots/bear.jpg" : "/mascots/bull.jpg",
								autoPlay: true,
								muted: true,
								playsInline: true,
								loop: true
							}, src) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/mascots/bull.jpg",
								alt: "",
								className: "size-full object-cover opacity-60"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-8 text-2xl font-semibold tracking-tight",
						children: ["PlanVista ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Finance"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-2 text-sm font-medium ${mood === "bear" ? "text-rose-300" : mood === "bull" ? "text-emerald-300" : "text-muted"}`,
						children: mood === "bear" ? "Bear market move" : mood === "bull" ? "Bull market move" : "Loading tape…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-sm text-center text-xs text-subtle",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 h-1 w-48 overflow-hidden rounded-full bg-chip",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-full w-full origin-left animate-[grow_5.4s_linear_forwards] ${mood === "bear" ? "bg-rose-500" : "bg-emerald-500"}` })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      ` })
		]
	});
}
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/ask",
		label: "Ask"
	},
	{
		to: "/research",
		label: "Research"
	},
	{
		to: "/markets",
		label: "Markets"
	},
	{
		to: "/trade",
		label: "Trade"
	},
	{
		to: "/nse",
		label: "NSE desk"
	},
	{
		to: "/learn",
		label: "Academy"
	},
	{
		to: "/chart-gpt",
		label: "Chart GPT"
	},
	{
		to: "/plans",
		label: "Plans"
	},
	{
		to: "/search",
		label: "Deep Search"
	},
	{
		to: "/portfolio",
		label: "Portfolio"
	},
	{
		to: "/planner",
		label: "Goals"
	},
	{
		to: "/sip",
		label: "SIP"
	},
	{
		to: "/quiz",
		label: "Risk quiz"
	},
	{
		to: "/analytics",
		label: "Analytics"
	},
	{
		to: "/progress",
		label: "Progress"
	}
];
var MOBILE_NAV = [
	{
		to: "/",
		label: "Home",
		icon: Newspaper
	},
	{
		to: "/ask",
		label: "Ask",
		icon: Sparkles
	},
	{
		to: "/trade",
		label: "Trade",
		icon: ChartCandlestick
	},
	{
		to: "/markets",
		label: "Markets",
		icon: ChartLine
	},
	{
		to: "/learn",
		label: "Academy",
		icon: BookOpen
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const focusChat = pathname.startsWith("/chart-gpt") || pathname.startsWith("/ask");
	const board = pathname.startsWith("/nse");
	const desk = pathname.startsWith("/trade");
	const hideRails = focusChat || board || desk;
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [lists, setLists] = (0, import_react.useState)(false);
	const [research, setResearch] = (0, import_react.useState)(false);
	const [showSplash, setShowSplash] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return true;
		return sessionStorage.getItem("pv-splash") !== "1";
	});
	const { theme, toggle } = useTheme();
	const profile = useSiply((s) => s.profile);
	const first = (profile.displayName || "Learner").split(" ")[0] || "Learner";
	function finishSplash() {
		try {
			sessionStorage.setItem("pv-splash", "1");
		} catch {}
		setShowSplash(false);
	}
	if (showSplash) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplashScreen, { onDone: finishSplash });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[80] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-fg",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSync, {}),
			board ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveNewsEmbed, {}),
			board ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-2 py-2 sm:px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface", hideRails ? "" : "lg:hidden"),
								"aria-label": "Open lists",
								onClick: () => setLists((v) => !v),
								children: lists ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex shrink-0 items-center gap-2 pr-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/planvista-icon.png",
										alt: "PlanVista",
										className: "size-8 object-contain",
										width: 32,
										height: 32
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "hidden text-[20px] tracking-tight sm:inline",
										children: ["PlanVista", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1.5 text-sm text-muted",
											children: "Finance"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden rounded-sm bg-primary-soft px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary md:inline",
										children: "Beta"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, { className: "hidden max-w-xl md:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex shrink-0 items-center gap-1 sm:gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/ask",
										className: "inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm text-muted hover:bg-surface hover:text-fg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: "Ask"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/search",
										className: "inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm text-muted hover:bg-surface hover:text-fg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden lg:inline",
											children: "Deep Search"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/analytics",
										className: "hidden h-11 items-center gap-1.5 rounded-full px-3 text-sm text-muted hover:bg-surface hover:text-fg xl:inline-flex",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartPie, { className: "size-4" }), "Analytics"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: toggle,
										className: "inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface",
										"aria-label": theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
										children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: cn("inline-flex h-11 items-center rounded-full px-3 text-sm text-muted hover:bg-surface", hideRails ? "" : "xl:hidden"),
										onClick: () => setResearch((v) => !v),
										"aria-expanded": research,
										"aria-controls": "research-panel",
										children: "Research"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 pl-1",
										children: [
											profile.riskScore > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/gate",
												className: cn("hidden h-8 items-center rounded-full px-2.5 text-xs font-semibold tabular-nums sm:inline-flex", profile.riskScore >= 70 ? "bg-up-soft text-up" : "bg-down-soft text-down"),
												title: "Risk knowledge quiz score",
												children: [
													"Risk ",
													profile.riskScore,
													"%"
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/gate",
												className: "hidden h-8 items-center rounded-full bg-warn-soft px-2.5 text-xs font-semibold text-warn sm:inline-flex",
												children: "Take gate"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid size-8 place-items-center rounded-full bg-primary text-sm font-medium text-primary-fg",
												children: first.charAt(0).toUpperCase()
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden text-sm font-medium sm:inline",
												children: first
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface md:hidden",
										"aria-label": "Open menu",
										onClick: () => setMenu((v) => !v),
										children: menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 pb-2 md:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden gap-1 overflow-x-auto px-4 md:flex",
						"aria-label": "Main",
						children: NAV.map((n) => {
							const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: n.to,
								className: cn("shrink-0 border-b-2 px-3 py-2.5 text-sm", active ? "border-primary font-medium text-primary" : "border-transparent text-muted hover:border-border-strong hover:text-fg"),
								children: n.label
							}, n.to);
						})
					}),
					menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "border-t border-border px-3 py-2 md:hidden",
						"aria-label": "Main",
						children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: n.to,
							onClick: () => setMenu(false),
							className: "block rounded-md px-3 py-3 text-sm hover:bg-surface",
							children: n.label
						}, n.to))
					}) : null
				]
			}),
			board ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticker, {}),
			board ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border bg-warn-soft px-3 py-1.5 text-center text-[11px] text-fg",
				children: "For learning purposes only — not investment advice, not a SEBI-registered advisor. Market data may be delayed."
			}),
			!profile.riskGatePassed && !board ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border bg-primary-soft px-3 py-2 text-center text-xs text-fg",
				children: [
					"Take the 18+ knowledge gate (70% to pass) before treating this as more than a classroom.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/gate",
						className: "font-medium text-primary underline",
						children: "Start the quiz"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-[70vh]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: cn("w-[300px] shrink-0 border-r border-border bg-rail", lists ? "fixed inset-y-0 left-0 z-30 mt-[52px] bg-bg lg:static lg:mt-0 lg:block" : hideRails ? "hidden" : "hidden lg:block"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchlistRail, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
							id: "main",
							className: board ? "pb-0" : desk ? "mx-auto w-full max-w-[1440px] px-3 py-4 pb-24 sm:px-4 md:pb-8" : "mx-auto max-w-5xl px-3 py-5 pb-24 sm:px-5 sm:py-6 md:pb-6",
							children
						}), board ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						id: "research-panel",
						className: cn("flex w-[min(100vw,380px)] shrink-0 flex-col border-l border-border bg-rail", research ? "fixed inset-y-0 right-0 z-40 bg-bg pb-16 pt-14 shadow-2xl xl:static xl:z-auto xl:pb-0 xl:pt-0 xl:shadow-none" : hideRails ? "hidden" : "hidden xl:flex"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full min-h-0 flex-col xl:sticky xl:top-0 xl:h-[calc(100dvh-8.5rem)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResearchPanel, { onClose: () => setResearch(false) })
						})
					})
				]
			}),
			board ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-bg/95 md:hidden",
				"aria-label": "Mobile",
				children: MOBILE_NAV.map((item) => {
					const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px]", active ? "text-primary" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
					}, item.to);
				})
			})
		]
	});
}
function BareShell({ children }) {
	const { theme, toggle } = useTheme();
	const [showSplash, setShowSplash] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return true;
		return sessionStorage.getItem("pv-splash") !== "1";
	});
	function finishSplash() {
		try {
			sessionStorage.setItem("pv-splash", "1");
		} catch {}
		setShowSplash(false);
	}
	if (showSplash) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplashScreen, { onDone: finishSplash });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/planvista-icon.png",
						alt: "PlanVista",
						className: "size-8 object-contain",
						width: 32,
						height: 32
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[20px] tracking-tight",
						children: ["PlanVista", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1.5 text-sm text-muted",
							children: "Finance"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-sm bg-primary-soft px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary",
						children: "Beta"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: toggle,
				className: "inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface",
				"aria-label": "Toggle theme",
				children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
			})]
		}), children]
	});
}
function NseShell({ children }) {
	const [showSplash, setShowSplash] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return true;
		return sessionStorage.getItem("pv-splash") !== "1";
	});
	function finishSplash() {
		try {
			sessionStorage.setItem("pv-splash", "1");
		} catch {}
		setShowSplash(false);
	}
	if (showSplash) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplashScreen, { onDone: finishSplash });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-nse-wash text-nse-fg",
		children
	});
}
var styles_default = "/assets/styles-vwiOJ6O5.css";
var APP_NAME = "PlanVista Finance";
var THEME_BOOT = `(function(){try{var t=localStorage.getItem("pv-theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.style.colorScheme="light";}else{document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}}catch(e){document.documentElement.classList.add("dark");}})();`;
var Route$22 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "PlanVista Finance — live NSE/BSE market tracking, SIP calculator and goal-based planning. For learning purposes only."
			},
			{
				name: "theme-color",
				content: "#131314"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/png",
				href: "/planvista-icon.png"
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_BOOT } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellSwitch, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
function ShellSwitch() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (pathname.startsWith("/nse")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NseShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
	if (pathname === "/gate" || pathname === "/quiz" || pathname === "/onboarding" || pathname === "/report") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BareShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
var $$splitComponentImporter$21 = () => import("./routes-B644ziTr.mjs");
var Route$21 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./analytics-Ck-lIEck.mjs");
var Route$20 = createFileRoute("/analytics")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./ask-DvxnWyIS.mjs");
var Route$19 = createFileRoute("/ask")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./chart-gpt-DGjVMz8w.mjs");
var Route$18 = createFileRoute("/chart-gpt")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./gate-BSPnN9Tx.mjs");
var Route$17 = createFileRoute("/gate")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./learn-U7z1OxBu.mjs");
var Route$16 = createFileRoute("/learn")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./markets-E1ovP9Er.mjs");
var Route$15 = createFileRoute("/markets")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./nse-DPQgYdBH.mjs");
var Route$14 = createFileRoute("/nse")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./onboarding-yDi33FnZ.mjs");
var Route$13 = createFileRoute("/onboarding")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./planner-C1QHHqVd.mjs");
var Route$12 = createFileRoute("/planner")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./plans-DQHuxVT-.mjs");
var Route$11 = createFileRoute("/plans")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./portfolio-DMEewiQR.mjs");
var Route$10 = createFileRoute("/portfolio")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./progress-D4_1bbjr.mjs");
var Route$9 = createFileRoute("/progress")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./quiz-CrA9TVpr.mjs");
var Route$8 = createFileRoute("/quiz")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./report-DDnTrJhx.mjs");
var Route$7 = createFileRoute("/report")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./research-C3CNwZHT.mjs");
var Route$6 = createFileRoute("/research")({
	validateSearch: (search) => ({ symbol: typeof search.symbol === "string" && search.symbol.trim() ? search.symbol : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./search-DOCRQseb.mjs");
var Route$5 = createFileRoute("/search")({
	validateSearch: (search) => ({ q: typeof search.q === "string" ? search.q : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./sip-5b3Gf3Vb.mjs");
var Route$4 = createFileRoute("/sip")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./trade-D247d1No.mjs");
var Route$3 = createFileRoute("/trade")({
	validateSearch: (search) => ({
		symbol: typeof search.symbol === "string" && search.symbol.trim() ? search.symbol : void 0,
		side: search.side === "sell" ? "sell" : search.side === "buy" ? "buy" : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./goal._id-BYJUsmEE.mjs");
var Route$2 = createFileRoute("/goal/$id")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./learn._slug-BsFHdhvo.mjs");
var Route$1 = createFileRoute("/learn/$slug")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./quote._symbol-BhX3YMpL.mjs");
var Route = createFileRoute("/quote/$symbol")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$21.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$22
});
var AnalyticsRoute = Route$20.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => Route$22
});
var AskRoute = Route$19.update({
	id: "/ask",
	path: "/ask",
	getParentRoute: () => Route$22
});
var ChartGptRoute = Route$18.update({
	id: "/chart-gpt",
	path: "/chart-gpt",
	getParentRoute: () => Route$22
});
var GateRoute = Route$17.update({
	id: "/gate",
	path: "/gate",
	getParentRoute: () => Route$22
});
var LearnRoute = Route$16.update({
	id: "/learn",
	path: "/learn",
	getParentRoute: () => Route$22
});
var MarketsRoute = Route$15.update({
	id: "/markets",
	path: "/markets",
	getParentRoute: () => Route$22
});
var NseRoute = Route$14.update({
	id: "/nse",
	path: "/nse",
	getParentRoute: () => Route$22
});
var OnboardingRoute = Route$13.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$22
});
var PlannerRoute = Route$12.update({
	id: "/planner",
	path: "/planner",
	getParentRoute: () => Route$22
});
var PlansRoute = Route$11.update({
	id: "/plans",
	path: "/plans",
	getParentRoute: () => Route$22
});
var PortfolioRoute = Route$10.update({
	id: "/portfolio",
	path: "/portfolio",
	getParentRoute: () => Route$22
});
var ProgressRoute = Route$9.update({
	id: "/progress",
	path: "/progress",
	getParentRoute: () => Route$22
});
var QuizRoute = Route$8.update({
	id: "/quiz",
	path: "/quiz",
	getParentRoute: () => Route$22
});
var ReportRoute = Route$7.update({
	id: "/report",
	path: "/report",
	getParentRoute: () => Route$22
});
var ResearchRoute = Route$6.update({
	id: "/research",
	path: "/research",
	getParentRoute: () => Route$22
});
var SearchRoute = Route$5.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$22
});
var SipRoute = Route$4.update({
	id: "/sip",
	path: "/sip",
	getParentRoute: () => Route$22
});
var TradeRoute = Route$3.update({
	id: "/trade",
	path: "/trade",
	getParentRoute: () => Route$22
});
var GoalIdRoute = Route$2.update({
	id: "/goal/$id",
	path: "/goal/$id",
	getParentRoute: () => Route$22
});
var LearnSlugRoute = Route$1.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => LearnRoute
});
var QuoteSymbolRoute = Route.update({
	id: "/quote/$symbol",
	path: "/quote/$symbol",
	getParentRoute: () => Route$22
});
var LearnRouteChildren = { LearnSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AnalyticsRoute,
	AskRoute,
	ChartGptRoute,
	GateRoute,
	LearnRoute: LearnRoute._addFileChildren(LearnRouteChildren),
	MarketsRoute,
	NseRoute,
	OnboardingRoute,
	PlannerRoute,
	PlansRoute,
	PortfolioRoute,
	ProgressRoute,
	QuizRoute,
	ReportRoute,
	ResearchRoute,
	SearchRoute,
	SipRoute,
	TradeRoute,
	GoalIdRoute,
	QuoteSymbolRoute
};
var routeTree = Route$22._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { getNseDesk as _, Route$3 as a, searchSymbols as b, Sparkline as c, HEADLINES as d, useLiveRefresh as f, getMarketHome as g, deepSearch as h, Route$2 as i, ResearchPanel as l, askChartGpt as m, Route as n, Route$5 as o, ChatMarkdown as p, Route$1 as r, Route$6 as s, router_exports as t, ARTICLES as u, getQuoteBundle as v, getQuotes as y };
