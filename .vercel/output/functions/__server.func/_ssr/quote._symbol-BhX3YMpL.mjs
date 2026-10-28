import { i as __toESM } from "../_runtime.mjs";
import { l as googleNewsUrl, o as findCompany, s as googleFinanceQuoteUrl, u as googleSearchUrl } from "./universe-C6G9ps6z.mjs";
import { a as inr, i as formatVol, o as pct, r as formatMoney, s as timeAgo, t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { c as Sparkline, f as useLiveRefresh, n as Route, v as getQuoteBundle, y as getQuotes } from "./router-Dvl9OxAQ.mjs";
import { t as ChartGpt } from "./ChartGpt-CQRzRKGB.mjs";
import { t as MascotClip } from "./MascotClip-Vj8S27Ut.mjs";
import { t as TapeStamp } from "./TapeStamp-BH7Q32bE.mjs";
import { t as CandleChart } from "./CandleChart-C8zh-yRf.mjs";
import { t as RangeTabs } from "./PriceChart-BFTxq_GA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote._symbol-BhX3YMpL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuotePage() {
	const { symbol: raw } = Route.useParams();
	const symbol = decodeURIComponent(raw);
	const [range, setRange] = (0, import_react.useState)("1d");
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [bundle, setBundle] = (0, import_react.useState)(null);
	const [related, setRelated] = (0, import_react.useState)([]);
	const [err, setErr] = (0, import_react.useState)(null);
	const watchlist = useSiply((s) => s.watchlist);
	const toggleWatch = useSiply((s) => s.toggleWatch);
	const added = watchlist.includes(symbol) || watchlist.includes(bundle?.quote.symbol ?? "");
	const [tick, setTick] = (0, import_react.useState)(0);
	useLiveRefresh(() => {
		setErr(null);
		return getQuoteBundle({ data: {
			symbol,
			range,
			fresh: tick > 0
		} }).then((b) => {
			setBundle(b);
			const rel = b.profile?.related ?? [];
			if (rel.length) {
				const yahoos = rel.map((s) => findCompany(s)?.yahoo).filter((x) => Boolean(x));
				return getQuotes({ data: { symbols: yahoos } }).then(setRelated);
			}
			setRelated([]);
		}).catch((e) => {
			setErr(e instanceof Error ? e.message : "Could not load this quote");
		});
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
		});
	}, 1e3, [symbol]);
	if (err) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: err
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-subtle",
				children: "Try another NSE/BSE ticker from search."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-4 inline-block text-primary hover:underline",
				children: "Back to markets"
			})
		]
	});
	if (!bundle) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-96 animate-pulse rounded-xl bg-surface" });
	const q = bundle.quote;
	const up = q.change >= 0;
	const profile = bundle.profile;
	const display = q.shortName.replace(/\.NS$|\.BO$/, "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:underline",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-1",
						children: "|"
					}),
					q.exchange,
					":",
					display
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-medium tracking-tight",
						children: q.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-end gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MascotClip, {
								up,
								size: "lg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-4xl font-medium tabular-nums tracking-tight",
								children: formatMoney(q.price, q.currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("text-lg font-medium tabular-nums", up ? "text-up" : "text-down"),
								children: [
									up ? "Bull" : "Bear",
									" ",
									pct(q.changePct),
									" (",
									formatMoney(q.change, q.currency),
									")",
									" ",
									q.marketState === "open" ? "now" : "last close"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-subtle",
						children: [
							q.exchange,
							" · ",
							q.currency,
							" · ",
							q.marketState === "open" ? "Market open" : "Market closed",
							" · delayed"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TapeStamp, {
							asOf: q.asOf,
							source: q.source,
							onRefresh: () => setTick((n) => n + 1)
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-stretch gap-2 sm:items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggleWatch(q.symbol),
							className: cn("inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium", added ? "border border-border bg-surface" : "bg-primary text-primary-fg hover:bg-primary-hover"),
							children: added ? "Added" : "Add to list"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/trade",
								search: {
									symbol: q.symbol,
									side: "buy"
								},
								className: "inline-flex h-10 items-center justify-center rounded-full bg-up px-4 text-sm font-medium text-white",
								children: "Buy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/trade",
								search: {
									symbol: q.symbol,
									side: "sell"
								},
								className: "inline-flex h-10 items-center justify-center rounded-full bg-down px-4 text-sm font-medium text-white",
								children: "Sell"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap justify-end gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: googleFinanceQuoteUrl(q.symbol),
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex h-9 items-center rounded-full border border-border px-3 text-xs hover:bg-surface",
									children: "Google Finance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: googleSearchUrl(`${q.name} stock`),
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex h-9 items-center rounded-full border border-border px-3 text-xs hover:bg-surface",
									children: "Google"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: googleNewsUrl(`${q.name} stock`),
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex h-9 items-center rounded-full border border-border px-3 text-xs hover:bg-surface",
									children: "News"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `/search?q=${encodeURIComponent(display)}`,
									className: "inline-flex h-9 items-center rounded-full bg-primary-soft px-3 text-xs font-medium text-primary",
									children: "Deep Search"
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border p-3 sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeTabs, {
						value: range,
						onChange: setRange
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: ["Prev. close ", formatMoney(q.previousClose, q.currency)]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandleChart, {
					series: bundle.chart,
					mark: q.price
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartGpt, { bundle }, q.symbol),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 overflow-x-auto border-b border-border",
				children: [
					["overview", "Overview"],
					["earnings", "Earnings"],
					["financials", "Financials"],
					["news", "News"],
					["analysis", "Analysis"]
				].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(k),
					className: cn("shrink-0 border-b-2 px-3 py-2.5 text-sm", tab === k ? "border-primary font-medium text-primary" : "border-transparent text-muted"),
					children: label
				}, k))
			}),
			tab === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					bundle.analysis[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: bundle.analysis[0]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-2 overflow-hidden rounded-xl border border-border sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Open",
								v: formatMoney(bundle.stats.open ?? q.previousClose, q.currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "High",
								v: formatMoney(q.dayHigh ?? 0, q.currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Low",
								v: formatMoney(q.dayLow ?? 0, q.currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Mkt. cap",
								v: bundle.stats.marketCap ? inr(bundle.stats.marketCap, true) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Volume",
								v: formatVol(q.volume)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Avg. vol.",
								v: formatVol(bundle.stats.avgVolume)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "P/E ratio",
								v: bundle.stats.pe != null ? bundle.stats.pe.toFixed(2) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "EPS",
								v: bundle.stats.eps != null ? formatMoney(bundle.stats.eps, q.currency) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "52-wk high",
								v: formatMoney(q.fiftyTwoWeekHigh ?? 0, q.currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "52-wk low",
								v: formatMoney(q.fiftyTwoWeekLow ?? 0, q.currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "1Y return",
								v: bundle.stats.return1y != null ? pct(bundle.stats.return1y) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								k: "Employees",
								v: bundle.stats.employees ?? "—"
							})
						]
					}),
					related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-base font-medium",
						children: "Related stocks"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/quote/$symbol",
							params: { symbol: r.symbol },
							className: "rounded-xl border border-border p-3 hover:bg-surface",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-subtle",
									children: r.shortName.replace(/\.NS$|\.BO$/, "")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: r.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm tabular-nums",
									children: formatMoney(r.price, r.currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("text-xs tabular-nums", r.change >= 0 ? "text-up" : "text-down"),
									children: pct(r.changePct)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
									data: r.spark,
									up: r.change >= 0,
									className: "mt-2 h-8 w-full"
								})
							]
						}, r.symbol))
					})] }) : null,
					profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 text-base font-medium",
							children: "Profile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: profile.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid gap-3 text-sm sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-subtle",
									children: "CEO"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.ceo ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-subtle",
									children: "Headquarters"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.headquarters ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-subtle",
									children: "Sector"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
									profile.sector,
									" · ",
									profile.industry
								] })] })
							]
						})
					] }) : null
				]
			}) : null,
			tab === "earnings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earnings, {
				profile,
				name: q.name
			}) : null,
			tab === "financials" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Snapshot ratios compiled for learning. Always verify against the latest exchange filing."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							k: "Trailing P/E",
							v: bundle.stats.pe != null ? bundle.stats.pe.toFixed(2) : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							k: "EPS",
							v: bundle.stats.eps != null ? formatMoney(bundle.stats.eps, q.currency) : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							k: "Market cap",
							v: bundle.stats.marketCap ? inr(bundle.stats.marketCap, true) : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							k: "Book value / sh",
							v: profile?.bookValue != null ? String(profile.bookValue) : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							k: "Shares",
							v: profile?.sharesCr != null ? `${profile.sharesCr} Cr` : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							k: "Vs 52w high",
							v: bundle.stats.vs52wHigh != null ? pct(bundle.stats.vs52wHigh) : "—"
						})
					]
				})]
			}) : null,
			tab === "news" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border overflow-hidden rounded-xl border border-border",
				children: bundle.news.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-4 py-8 text-center text-sm text-muted",
					children: "No recent headlines for this name."
				}) : bundle.news.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: n.url,
					target: "_blank",
					rel: "noreferrer",
					className: "block px-4 py-3 hover:bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: n.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							n.source,
							" · ",
							timeAgo(n.published)
						]
					})]
				}) }, n.url + n.title))
			}) : null,
			tab === "analysis" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: bundle.analysis.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: line
				}, line.slice(0, 40)))
			}) : null
		]
	});
}
function Earnings({ profile, name }) {
	const rows = profile?.quarters ?? [];
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-muted",
		children: [
			"Quarterly history for ",
			name,
			" is not in the compiled set yet. Use the Research panel to ask about the latest exchange filing, and treat any figure as educational."
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Compiled quarterly results (₹ crore). Figures are for classroom use — confirm with BSE/NSE filings before acting."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface text-xs text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-left font-medium",
							children: "Quarter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Revenue (₹ Cr)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "PAT (₹ Cr)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "EPS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "Rev YoY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "PAT YoY"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [...rows].reverse().map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 font-medium",
							children: r.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-right tabular-nums",
							children: r.revenueCr?.toLocaleString("en-IN") ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-right tabular-nums",
							children: r.patCr?.toLocaleString("en-IN") ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-right tabular-nums",
							children: r.eps ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("px-3 py-3 text-right tabular-nums", (r.yoyRevenue ?? 0) >= 0 ? "text-up" : "text-down"),
							children: r.yoyRevenue != null ? pct(r.yoyRevenue) : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("px-3 py-3 text-right tabular-nums", (r.yoyPat ?? 0) >= 0 ? "text-up" : "text-down"),
							children: r.yoyPat != null ? pct(r.yoyPat) : "—"
						})
					]
				}, r.period)) })]
			})
		})]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-border px-3 py-3 even:bg-surface/40 sm:odd:border-r sm:[&:nth-child(3n)]:border-r-0 max-sm:odd:border-r",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] uppercase tracking-wide text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 text-sm font-medium tabular-nums",
			children: v
		})]
	});
}
function Card({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-wide text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-lg font-medium tabular-nums",
			children: v
		})]
	});
}
//#endregion
export { QuotePage as component };
