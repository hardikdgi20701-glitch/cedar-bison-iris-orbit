import { i as __toESM } from "../_runtime.mjs";
import { a as inr, o as pct, r as formatMoney, t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { a as Route$3, f as useLiveRefresh, v as getQuoteBundle, y as getQuotes } from "./router-Dvl9OxAQ.mjs";
import { n as paperEquity, r as usePaper, t as PAPER_CASH } from "./paper-BX3uudxs.mjs";
import { t as TapeStamp } from "./TapeStamp-BH7Q32bE.mjs";
import { t as CandleChart } from "./CandleChart-C8zh-yRf.mjs";
import { t as RangeTabs } from "./PriceChart-BFTxq_GA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trade-D247d1No.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TradeDesk() {
	const search = Route$3.useSearch();
	const symbol = search.symbol || "^NSEI";
	const side = search.side === "sell" ? "sell" : "buy";
	const navigate = useNavigate();
	const [range, setRange] = (0, import_react.useState)("6mo");
	const [bundle, setBundle] = (0, import_react.useState)(null);
	const [qty, setQty] = (0, import_react.useState)(1);
	const [orderType, setOrderType] = (0, import_react.useState)("market");
	const [limit, setLimit] = (0, import_react.useState)("");
	const [stop, setStop] = (0, import_react.useState)("");
	const [target, setTarget] = (0, import_react.useState)("");
	const [riskInr, setRiskInr] = (0, import_react.useState)(5e3);
	const [arm, setArm] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [tick, setTick] = (0, import_react.useState)(0);
	const watchlist = useSiply((s) => s.watchlist);
	const cash = usePaper((s) => s.cash);
	const positions = usePaper((s) => s.positions);
	const fills = usePaper((s) => s.fills);
	const orders = usePaper((s) => s.orders);
	const place = usePaper((s) => s.place);
	const mark = usePaper((s) => s.mark);
	const cancel = usePaper((s) => s.cancel);
	const reset = usePaper((s) => s.reset);
	useLiveRefresh(() => {
		return getQuoteBundle({ data: {
			symbol,
			range,
			fresh: tick > 0
		} }).then((b) => {
			setBundle(b);
			mark(b.quote.symbol, b.quote.price, b.quote.name);
		}).finally(() => setBusy(false));
	}, 15e3, [
		symbol,
		range,
		tick
	]);
	useLiveRefresh(() => {
		return getQuotes({ data: { symbols: [symbol] } }).then((rows) => {
			const row = rows[0];
			if (!row) return;
			setBundle((b) => b ? {
				...b,
				quote: {
					...b.quote,
					price: row.price,
					change: row.change,
					changePct: row.changePct,
					previousClose: row.previousClose,
					asOf: row.asOf,
					source: row.source
				}
			} : b);
			mark(row.symbol, row.price, row.name);
		});
	}, 1e3, [symbol]);
	const q = bundle?.quote;
	const price = q?.price ?? 0;
	const held = positions.find((p) => p.symbol === (q?.symbol ?? symbol));
	const limitPx = orderType === "limit" ? Number(limit) : null;
	const stopPx = Number(stop);
	const targetPx = Number(target);
	const fillPx = orderType === "limit" && limitPx && limitPx > 0 ? limitPx : price;
	const cost = Math.max(1, Math.floor(qty)) * (price || 0);
	const equity = paperEquity(cash, positions);
	const up = (q?.change ?? 0) >= 0;
	const ticker = (q?.shortName || q?.symbol || symbol).replace(/\.NS$|\.BO$/, "");
	const chips = Array.from(/* @__PURE__ */ new Set([
		"^NSEI",
		"RELIANCE.NS",
		...watchlist
	])).slice(0, 10);
	function sizeFromRisk() {
		if (!price || !(stopPx > 0) || stopPx === price) {
			setNote("Set a stop first, then size the order.");
			return;
		}
		const per = Math.abs(price - stopPx);
		const room = Math.max(1, Math.floor(cash / price));
		const sized = Math.max(1, Math.min(room, Math.floor(riskInr / per)));
		setQty(sized);
		setNote(`Size ${sized} so a stop costs about ${inr(sized * per)} of practice cash.`);
	}
	function chipStop() {
		if (!price) return;
		const next = side === "buy" ? price * .97 : price * 1.03;
		setStop(next.toFixed(2));
	}
	function chipTarget() {
		if (!price || !(stopPx > 0)) {
			setNote("Set a stop, then the 1:2 target.");
			return;
		}
		const risk = price - stopPx;
		const next = side === "buy" ? price + Math.abs(risk) * 2 : price - Math.abs(risk) * 2;
		setTarget(Math.max(.01, next).toFixed(2));
	}
	function submit(nextSide) {
		if (!q) return;
		const result = place({
			symbol: q.symbol,
			name: q.shortName || q.name,
			side: nextSide,
			qty,
			price: q.price,
			limit: orderType === "limit" ? Number(limit) : null,
			stop: stopPx > 0 ? stopPx : null,
			target: targetPx > 0 ? targetPx : null
		});
		if (!result.ok) {
			setNote(result.error);
			return;
		}
		setNote(result.status === "working" ? `Limit ${nextSide} parked at ${formatMoney(Number(limit), q.currency)}. It fills only if the last print reaches it. Practice only.` : `${nextSide === "buy" ? "Bought" : "Sold"} ${Math.floor(qty)} @ ${formatMoney(q.price, q.currency)}. Practice fill — nothing went to a broker.`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
					children: "Paper desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium tracking-tight",
					children: "Trade like the chart, with practice money"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: "Practice equity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-medium tabular-nums",
							children: inr(equity)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs tabular-nums text-muted",
							children: ["Cash ", inr(cash)]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: [chips.map((sym) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void navigate({
						to: "/trade",
						search: {
							symbol: sym,
							side
						}
					}),
					className: cn("h-9 shrink-0 rounded-full px-3 text-xs font-medium", sym === symbol || sym === q?.symbol ? "bg-primary text-primary-fg" : "bg-surface text-muted hover:text-fg"),
					children: sym.replace(/\.NS$|\.BO$|^\^/, "")
				}, sym)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/search",
					className: "inline-flex h-9 shrink-0 items-center rounded-full border border-border px-3 text-xs",
					children: "Find a name"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "overflow-hidden rounded-xl border border-border bg-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-end justify-between gap-3 border-b border-[#e0e3eb] px-3 py-3 sm:px-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-medium text-[#131722]",
								children: q?.name ?? (busy ? "Loading chart…" : ticker)
							}), q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 flex flex-wrap items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-medium tabular-nums text-[#131722]",
									children: formatMoney(q.price, q.currency)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("text-sm font-medium tabular-nums", up ? "text-[#089981]" : "text-[#f23645]"),
									children: [
										up ? "+" : "",
										formatMoney(q.change, q.currency),
										" (",
										pct(q.changePct),
										")"
									]
								})]
							}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeTabs, {
								value: range,
								onChange: setRange
							})]
						}),
						bundle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandleChart, {
							series: bundle.chart,
							mark: q?.price,
							tall: true,
							stop: stopPx > 0 ? stopPx : null,
							target: targetPx > 0 ? targetPx : null,
							onPick: (picked) => {
								const text = picked.toFixed(2);
								if (arm === "target") setTarget(text);
								else setStop(text);
								setArm(null);
							}
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[min(52vh,520px)] min-h-[320px] animate-pulse bg-[#f8f9fa]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 border-t border-[#e0e3eb] px-3 py-2 text-[11px] text-[#5f6368]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Blue is a 20-bar average. Orange is slower. They describe the tape. They are not signals." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setArm(arm === "stop" ? null : "stop"),
									className: cn("h-7 rounded-full px-2.5", arm === "stop" ? "bg-[#f23645] text-white" : "bg-[#f8f9fa]"),
									children: arm === "stop" ? "Click chart for stop" : "Set stop on chart"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setArm(arm === "target" ? null : "target"),
									className: cn("h-7 rounded-full px-2.5", arm === "target" ? "bg-[#089981] text-white" : "bg-[#f8f9fa]"),
									children: arm === "target" ? "Click chart for target" : "Set target on chart"
								})]
							})]
						}),
						q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-3 pb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TapeStamp, {
								asOf: q.asOf,
								source: q.source,
								onRefresh: () => {
									setBusy(true);
									setTick((n) => n + 1);
								}
							})
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-2.5 self-start rounded-xl border border-border bg-surface p-4 xl:sticky xl:top-24",
					onSubmit: (e) => {
						e.preventDefault();
						submit(side);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: ["buy", "sell"].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void navigate({
									to: "/trade",
									search: {
										symbol: q?.symbol ?? symbol,
										side: s
									}
								}),
								className: cn("h-11 rounded-full text-sm font-medium", side === s ? s === "buy" ? "bg-[#089981] text-white" : "bg-[#f23645] text-white" : "border border-border bg-bg text-muted"),
								children: s === "buy" ? "Buy" : "Sell"
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: ["market", "limit"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOrderType(k),
								className: cn("h-9 rounded-full text-xs font-medium", orderType === k ? "bg-chip text-fg" : "text-muted"),
								children: k === "market" ? "Market" : "Limit"
							}, k))
						}),
						orderType === "limit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs text-muted",
							children: ["Limit price", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "decimal",
								value: limit,
								onChange: (e) => setLimit(e.target.value),
								placeholder: price ? price.toFixed(2) : "0.00",
								className: "mt-1 h-11 w-full rounded-md border border-border bg-bg px-3 text-base tabular-nums"
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs text-muted",
							children: ["Quantity", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-11 w-11 rounded-md border border-border bg-bg text-lg",
										onClick: () => setQty((n) => Math.max(1, n - 1)),
										children: "−"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 1,
										step: 1,
										value: qty,
										onChange: (e) => setQty(Number(e.target.value)),
										className: "h-11 min-w-0 flex-1 rounded-md border border-border bg-bg px-3 text-center text-base tabular-nums"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-11 w-11 rounded-md border border-border bg-bg text-lg",
										onClick: () => setQty((n) => n + 1),
										children: "+"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs text-muted",
								children: ["Stop", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: stop,
									onChange: (e) => setStop(e.target.value),
									inputMode: "decimal",
									className: "mt-1 h-10 w-full rounded-md border border-border bg-bg px-2 text-sm tabular-nums"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs text-muted",
								children: ["Target", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: target,
									onChange: (e) => setTarget(e.target.value),
									inputMode: "decimal",
									className: "mt-1 h-10 w-full rounded-md border border-border bg-bg px-2 text-sm tabular-nums"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: chipStop,
								className: "h-8 rounded-full bg-bg px-3 text-xs",
								children: "3% stop"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: chipTarget,
								className: "h-8 rounded-full bg-bg px-3 text-xs",
								children: "1:2 target"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs text-muted",
							children: ["Risk this much if the stop hits", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 100,
									step: 100,
									value: riskInr,
									onChange: (e) => setRiskInr(Number(e.target.value)),
									className: "h-10 min-w-0 flex-1 rounded-md border border-border bg-bg px-2 text-sm tabular-nums"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: sizeFromRisk,
									className: "h-10 shrink-0 rounded-full bg-bg px-3 text-xs font-medium",
									children: "Size qty"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex justify-between text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Last print" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums text-fg",
										children: price ? formatMoney(price, q?.currency ?? "INR") : "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 flex justify-between text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: orderType === "limit" ? "Limit value" : "Order value" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums text-fg",
										children: fillPx ? inr(Math.floor(qty) * fillPx) : "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 flex justify-between text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "You hold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums text-fg",
										children: held?.qty ?? 0
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !q || orderType === "limit" && !(Number(limit) > 0),
							className: cn("h-12 rounded-full text-sm font-medium text-white disabled:opacity-50", side === "buy" ? "bg-[#089981]" : "bg-[#f23645]"),
							children: side === "buy" ? `Buy ${ticker}` : `Sell ${ticker}`
						}),
						note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-fg",
							children: note
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] leading-relaxed text-subtle",
							children: [
								"Market fills at the delayed last print. A limit waits until that print reaches your price. Starting book ",
								inr(PAPER_CASH),
								". Not an order to NSE or a broker. Order value shown is ",
								price ? inr(cost) : "—",
								" at the last print."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/learn",
							className: "text-xs text-primary hover:underline",
							children: "Read the path before you size a real account"
						})
					]
				})]
			}),
			(orders ?? []).length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-sm font-medium",
					children: "Working limits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border text-sm",
					children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-2 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mr-2 text-xs font-medium uppercase", o.side === "buy" ? "text-up" : "text-down"),
								children: o.side
							}),
							o.qty,
							" ",
							o.name,
							" @ ",
							formatMoney(o.limit, "INR")
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-muted hover:text-fg",
							onClick: () => cancel(o.id),
							children: "Cancel"
						})]
					}, o.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: "Positions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-muted hover:text-fg",
							onClick: () => {
								reset();
								setNote("Practice book reset.");
							},
							children: "Reset book"
						})]
					}), positions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border text-sm",
						children: positions.map((p) => {
							const pnl = (p.last - p.avg) * p.qty;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-2 py-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "text-left",
									onClick: () => void navigate({
										to: "/trade",
										search: {
											symbol: p.symbol,
											side: "sell"
										}
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-medium",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-subtle",
										children: [
											p.qty,
											" @ ",
											formatMoney(p.avg, "INR")
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("tabular-nums text-sm", pnl >= 0 ? "text-up" : "text-down"),
									children: [pnl >= 0 ? "+" : "", inr(pnl)]
								})]
							}, p.symbol);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No open practice position. Place a buy to start the journal."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 text-sm font-medium",
							children: "Journal"
						}),
						fills.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-border text-sm",
							children: fills.slice(0, 8).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-2 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("mr-2 text-xs font-medium uppercase", f.side === "buy" ? "text-up" : "text-down"),
										children: f.side
									}),
									f.qty,
									" ",
									f.name,
									f.stop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-2 text-[11px] text-subtle",
										children: ["stop ", formatMoney(f.stop, "INR")]
									}) : null
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-muted",
									children: formatMoney(f.price, "INR")
								})]
							}, f.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Your practice fills will show here, with the stop you wrote."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/learn/$slug",
							params: { slug: "trade-journal" },
							className: "mt-3 inline-block text-sm text-primary hover:underline",
							children: "How to keep this journal"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { TradeDesk as component };
