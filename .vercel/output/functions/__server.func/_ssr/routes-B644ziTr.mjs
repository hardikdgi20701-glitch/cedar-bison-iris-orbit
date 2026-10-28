import { i as __toESM } from "../_runtime.mjs";
import { o as pct, r as formatMoney, s as timeAgo, t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply, t as BADGE_META } from "./store-CATAbsfv.mjs";
import { c as Sparkline, d as HEADLINES, f as useLiveRefresh, g as getMarketHome, u as ARTICLES, y as getQuotes } from "./router-Dvl9OxAQ.mjs";
import { t as MascotClip } from "./MascotClip-Vj8S27Ut.mjs";
import { t as TapeStamp } from "./TapeStamp-BH7Q32bE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B644ziTr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REGIONS = [
	{
		id: "india",
		label: "India"
	},
	{
		id: "us",
		label: "US"
	},
	{
		id: "europe",
		label: "Europe"
	},
	{
		id: "fx",
		label: "Currencies"
	},
	{
		id: "crypto",
		label: "Crypto"
	}
];
function Home() {
	const [region, setRegion] = (0, import_react.useState)("india");
	const [quotes, setQuotes] = (0, import_react.useState)([]);
	const [news, setNews] = (0, import_react.useState)([]);
	const [session, setSession] = (0, import_react.useState)({
		open: false,
		label: "NSE closed"
	});
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [asOf, setAsOf] = (0, import_react.useState)(0);
	const [source, setSource] = (0, import_react.useState)("simulated");
	const [tick, setTick] = (0, import_react.useState)(0);
	const hasData = (0, import_react.useRef)(false);
	const profile = useSiply((s) => s.profile);
	const badges = useSiply((s) => s.badges);
	const quoteSymbols = (0, import_react.useRef)([]);
	useLiveRefresh(() => {
		if (!hasData.current) setBusy(true);
		return getMarketHome({ data: {
			region,
			fresh: tick > 0
		} }).then((res) => {
			hasData.current = true;
			quoteSymbols.current = res.quotes.map((q) => q.symbol);
			setQuotes(res.quotes);
			setNews(res.news);
			setSession(res.session);
			setAsOf(res.asOf);
			setSource(res.source);
		}).catch(() => {
			if (!hasData.current) {
				setQuotes([]);
				setNews([]);
			}
		}).finally(() => setBusy(false));
	}, 2e4, [region, tick]);
	useLiveRefresh(() => {
		const symbols = quoteSymbols.current;
		if (!symbols.length) return;
		return getQuotes({ data: { symbols } }).then((rows) => {
			if (!rows.length) return;
			const by = new Map(rows.map((q) => [q.symbol, q]));
			setQuotes((prev) => prev.map((q) => {
				const n = by.get(q.symbol);
				if (!n) return q;
				return {
					...q,
					price: n.price,
					change: n.change,
					changePct: n.changePct,
					previousClose: n.previousClose,
					asOf: n.asOf,
					source: n.source,
					spark: n.spark.length ? n.spark : q.spark
				};
			}));
			setAsOf(Date.now());
			setSource("live");
		});
	}, 1e3, [region]);
	const lead = news[0];
	const rest = news.slice(1, 10);
	const nifty = quotes.find((q) => /nifty 50/i.test(q.name) || /nifty/i.test(q.shortName)) ?? quotes[0];
	const isBull = (nifty?.change ?? 0) >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-primary",
						children: "Built for people who read before they tap"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl",
						children: "X-ray any NSE name. See the level, the reason, and where the idea is wrong."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm leading-relaxed text-muted",
						children: "Hindi or English. Nifty, Reliance, HDFC Bank, and the rest of the tape PlanVista can read. About fifteen seconds. Not a tip, not a broker."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/research",
							className: "inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg",
							children: "Start free — no card"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/plans",
							className: "inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium",
							children: "See the plan"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-sm leading-relaxed text-muted",
						children: "SEBI studies found that about 9 in 10 individual traders in equity futures and options lost money. The usual gap was no stop, no reason, and no price that proves the idea wrong. PlanVista puts those three on the page before a practice order."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							["Levels", "Support, resistance, breakout zone, volume — for today and for the week."],
							["Plan", "Invalidation, reason, reward versus risk, and a reading score. Not a promise."],
							["Why it moved", "Headline, volume, or just noise — before you exit on a red candle."],
							["Your position", "Paste “1200 RELIANCE at 1258”. See where it stands, and where it is wrong."]
						].map(([title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/research",
							className: "rounded-xl border border-border p-3 hover:bg-surface",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed text-muted",
								children: body
							})]
						}, title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-wide text-subtle",
									children: "Forwarded tip"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm",
									children: "“Buy the call, target on the screenshot.”"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-2 space-y-1 text-xs text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No stop" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No reason" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No source" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Whenever the group wakes up" })
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-primary/30 bg-primary-soft p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-wide text-primary",
									children: "PlanVista"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm",
									children: "The chart, the headline, and the price that ends the idea."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-2 space-y-1 text-xs text-fg",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Support zone" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "RSI and volume, named" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Invalidation written down" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Hindi or English · free to start" })
									]
								})
							]
						})]
					})
				]
			}),
			nifty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "overflow-hidden rounded-xl border border-border bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-0 md:grid-cols-[1.1fr_0.9fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
								children: "Today’s session"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-medium tracking-tight sm:text-4xl",
								children: isBull ? "Bull tape" : "Bear tape"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "max-w-md text-sm leading-relaxed text-muted",
								children: [
									"Hello ",
									profile.displayName.split(" ")[0] || "learner",
									". The animal follows Nifty’s last print. Green is not a buy. Red is not a sell.",
									profile.riskScore > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										" ",
										"Your risk-fitness score is",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("tabular-nums font-medium", profile.riskScore >= 70 ? "text-up" : "text-down"),
											children: [profile.riskScore, "%"]
										}),
										"."
									] }) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("text-sm tabular-nums", isBull ? "text-up" : "text-down"),
								children: [
									nifty.name,
									" ",
									pct(nifty.changePct),
									" · ",
									session.label
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/trade",
										search: {
											symbol: "RELIANCE.NS",
											side: "buy"
										},
										className: "inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-hover",
										children: "Practice a trade"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/learn",
										className: "inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium hover:bg-bg",
										children: "Academy"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/nse",
										className: "inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium hover:bg-bg",
										children: "NSE desk"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/search",
										className: "inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium hover:bg-bg",
										children: "Deep Search"
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative min-h-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							className: "absolute inset-0 h-full w-full object-cover",
							autoPlay: true,
							muted: true,
							loop: true,
							playsInline: true,
							poster: isBull ? "/media/bull.jpg" : "/media/bear.jpg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
								src: isBull ? "/media/bull.mp4" : "/media/bear.mp4",
								type: "video/mp4"
							})
						}, isBull ? "bull" : "bear")
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium tracking-tight",
					children: "Markets"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Live NSE & BSE quotes · ",
						session.label,
						profile.displayName ? ` · Welcome back, ${profile.displayName.split(" ")[0]}` : ""
					]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1",
				children: REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						hasData.current = false;
						setRegion(r.id);
					},
					className: cn("h-11 rounded-full px-4 text-sm", region === r.id ? "bg-chip font-medium text-fg" : "text-muted hover:bg-surface hover:text-fg"),
					children: r.label
				}, r.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TapeStamp, {
				asOf,
				source,
				session: session.label,
				busy,
				onRefresh: () => {
					hasData.current = true;
					setTick((n) => n + 1);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: (busy && quotes.length === 0 ? [
					0,
					1,
					2,
					3
				] : quotes).map((q, i) => typeof q === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-xl border border-border bg-surface" }, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/quote/$symbol",
					params: { symbol: q.symbol },
					className: "rounded-xl border border-border p-4 hover:bg-surface",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: q.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MascotClip, {
								up: q.change >= 0,
								size: "sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-2xl font-medium tabular-nums tracking-tight",
							children: formatMoney(q.price, q.currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("flex items-center gap-1.5 text-sm tabular-nums", q.change >= 0 ? "text-up" : "text-down"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wide",
								children: q.change >= 0 ? "Bull" : "Bear"
							}), pct(q.changePct)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
							data: q.spark,
							up: q.change >= 0,
							className: "mt-2 h-10 w-full"
						})
					]
				}, q.symbol))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: region === "india" ? "India market summary" : "Market summary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/markets",
					className: "text-sm text-primary hover:underline",
					children: "All markets"
				})]
			}), lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							lead.source,
							" · ",
							timeAgo(lead.published)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: lead.url,
						target: "_blank",
						rel: "noreferrer",
						className: "mt-1 block text-lg font-medium hover:text-primary",
						children: lead.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 divide-y divide-border",
						children: rest.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: n.url,
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-start justify-between gap-3 py-3 text-sm hover:text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 text-xs text-subtle",
								children: [
									n.source,
									" · ",
									timeAgo(n.published)
								]
							})]
						}, n.url + n.title))
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Classroom tape"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3",
					children: HEADLINES.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/learn",
						className: "text-sm hover:text-primary",
						children: h.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-subtle",
						children: [
							h.source,
							" · ",
							h.time
						]
					})] }, h.title))
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "Start learning"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/learn",
						className: "text-sm text-primary hover:underline",
						children: "Full course"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: ARTICLES.slice(0, 4).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/learn/$slug",
						params: { slug: a.slug },
						className: "overflow-hidden rounded-xl border border-border hover:bg-surface",
						children: [a.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: a.image,
							alt: "",
							className: "h-32 w-full object-cover"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-[0.14em] text-muted",
									children: a.kicker
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-fg",
									children: a.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-muted",
									children: a.body[0].length > 120 ? `${a.body[0].slice(0, 117).trim()}…` : a.body[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-subtle",
									children: [a.minutes, " min read"]
								})
							]
						})]
					}, a.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/planner",
						className: "rounded-xl border border-border p-4 hover:bg-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wide text-subtle",
								children: "Goals"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-lg font-medium",
								children: "Build a SIP watchlist"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: "Name a goal, inflate the cost, see the monthly SIP."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/chart-gpt",
						className: "rounded-xl border border-border p-4 hover:bg-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wide text-subtle",
								children: "Chart GPT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-lg font-medium",
								children: "Ask the chart, not a tip"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: "A working chat that reads the last print — candles, trend, volume. It will not tell you what to buy."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/quiz",
						className: "rounded-xl border border-border p-4 hover:bg-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wide text-subtle",
								children: "Risk quiz"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-lg font-medium",
								children: "Sign in every time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: "18+ classroom login, then seven questions that map a teaching mix."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-subtle",
							children: "Badges"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: [badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium text-primary",
								children: BADGE_META[b].label
							}, b)), badges.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-xs text-muted",
								children: "Complete onboarding and the knowledge gate to start."
							}) : null]
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };
