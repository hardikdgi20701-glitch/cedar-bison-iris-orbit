import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Send, f as Radio, o as Sparkles, u as RotateCcw } from "../_libs/lucide-react.mjs";
import { m as askChartGpt, p as ChatMarkdown } from "./router-Dvl9OxAQ.mjs";
import { a as welcomeChart, i as teachChart, n as snapshotContext, r as snapshotFromBundle, t as followUps } from "./chart-teacher-yKcVTq9r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ChartGpt-CQRzRKGB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRESETS = [
	"Aaj ka candle beginner ko kaise padhna hai?",
	"Bull hai ya bear — last close ke hisaab se?",
	"Support / resistance simple words mein samjhao",
	"Volume kya keh raha hai? Koi buy/sell mat dena.",
	"Stop-loss aur target kaise likhein?"
];
function storageKey(symbol) {
	return `pv-chart-gpt:${symbol}`;
}
function loadTurns(symbol, welcome) {
	try {
		const raw = sessionStorage.getItem(storageKey(symbol));
		if (!raw) return [{
			role: "assistant",
			text: welcome
		}];
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed) && parsed.length > 0) return parsed.slice(-24);
	} catch {}
	return [{
		role: "assistant",
		text: welcome
	}];
}
function ChartGpt({ bundle, variant = "embed" }) {
	const snap = (0, import_react.useMemo)(() => snapshotFromBundle(bundle), [bundle]);
	const context = (0, import_react.useMemo)(() => snapshotContext(snap), [snap]);
	const welcome = (0, import_react.useMemo)(() => welcomeChart(snap), [snap]);
	const [input, setInput] = (0, import_react.useState)("");
	const [msgs, setMsgs] = (0, import_react.useState)([{
		role: "assistant",
		text: welcome
	}]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const [chips, setChips] = (0, import_react.useState)(PRESETS);
	const scroller = (0, import_react.useRef)(null);
	const box = (0, import_react.useRef)(null);
	const skipPersist = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		skipPersist.current = true;
		setMsgs(loadTurns(snap.symbol, welcomeChart(snap)));
		setChips(PRESETS);
	}, [snap.symbol]);
	(0, import_react.useEffect)(() => {
		const id = window.requestAnimationFrame(() => {
			const root = scroller.current;
			const last = root?.querySelector("[data-turn]:last-of-type");
			if (!root || !last) return;
			root.scrollTo({
				top: Math.max(0, last.offsetTop - 8),
				behavior: "smooth"
			});
		});
		return () => window.cancelAnimationFrame(id);
	}, [msgs, busy]);
	(0, import_react.useEffect)(() => {
		if (skipPersist.current) {
			skipPersist.current = false;
			return;
		}
		try {
			sessionStorage.setItem(storageKey(snap.symbol), JSON.stringify(msgs.slice(-24)));
		} catch {}
	}, [msgs, snap.symbol]);
	function resetChat() {
		setMsgs([{
			role: "assistant",
			text: welcome
		}]);
		setChips(PRESETS);
		setErr(null);
		setInput("");
		box.current?.focus();
	}
	async function send(text) {
		const prompt = text.trim();
		if (!prompt || busy) return;
		setBusy(true);
		setErr(null);
		setInput("");
		const history = msgs.filter((m, i) => !(i === 0 && m.role === "assistant")).slice(-8);
		const local = teachChart(prompt, snap, history);
		setMsgs((m) => [...m, {
			role: "user",
			text: prompt
		}]);
		setChips(followUps(prompt, history));
		const fallback = () => {
			setMsgs((m) => [...m, {
				role: "assistant",
				text: local
			}]);
		};
		try {
			const res = await Promise.race([askChartGpt({ data: {
				prompt,
				context,
				history,
				snapshot: snap
			} }), new Promise((resolve) => {
				window.setTimeout(() => resolve({
					ok: true,
					text: local
				}), 8e3);
			})]);
			const out = res.text?.trim() ? res.text : local;
			setMsgs((m) => [...m, {
				role: "assistant",
				text: out
			}]);
		} catch (e) {
			fallback();
			const msg = e instanceof Error ? e.message : null;
			if (msg && !/timeout|failed to fetch|network/i.test(msg)) setErr(null);
		} finally {
			setBusy(false);
			box.current?.focus();
		}
	}
	const asked = msgs.some((m) => m.role === "user");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("flex flex-col overflow-hidden rounded-xl border border-border bg-surface", variant === "page" ? "h-[min(62vh,560px)]" : "h-[min(58vh,480px)]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3 border-b border-border bg-bg px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold leading-none",
							children: "Chart GPT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 truncate text-[11px] text-muted",
							children: [snap.name, " · last print classroom"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-warn sm:inline",
						children: "Not a buy/sell call"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: resetChat,
						className: "inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-chip hover:text-fg",
						"aria-label": "New chat",
						title: "New chat",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scroller,
				className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-4",
				children: [
					msgs.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-turn": m.role,
						className: cn("flex", m.role === "user" ? "justify-end" : "justify-start"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("max-w-[92%] rounded-2xl px-3.5 py-2.5 sm:max-w-[85%]", m.role === "user" ? "rounded-br-md bg-primary text-primary-fg" : "rounded-bl-md border border-border border-l-2 border-l-primary bg-surface-2 text-fg"),
							children: m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed",
								children: m.text
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text: m.text })
						})
					}, `${m.role}-${i}`)),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 animate-pulse text-primary" }), "Chart GPT soch raha hai…"]
					}) : null,
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-down",
						children: err
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border bg-bg px-3 py-3 sm:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 flex gap-1.5 overflow-x-auto pb-1",
						children: chips.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: () => void send(p),
							className: "h-9 shrink-0 rounded-full border border-border bg-surface px-3 text-[11px] hover:border-primary hover:text-primary disabled:opacity-40",
							children: p
						}, p))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							send(input);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end gap-2 rounded-xl border border-border bg-surface px-3 py-2 focus-within:border-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								ref: box,
								value: input,
								onChange: (e) => setInput(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										send(input);
									}
								},
								rows: 2,
								placeholder: asked ? "Ask a follow-up — wick, trend, volume, stop…" : "Ask how to read this chart — candles, trend, volume…",
								className: "min-h-11 flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-subtle"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: busy || !input.trim(),
								className: "inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-fg disabled:opacity-40",
								"aria-label": "Send",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-[10px] text-subtle",
						children: "Enter to send · Shift+Enter for a new line. Always answers from this snapshot — even if the language desk is busy. Not a SEBI-registered advisor."
					})
				]
			})
		]
	});
}
//#endregion
export { ChartGpt as t };
