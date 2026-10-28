import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { r as Route$1, u as ARTICLES } from "./router-Dvl9OxAQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn._slug-BsFHdhvo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LESSON_VISUALS = {
	"what-is-a-share": {
		flowTitle: "How a share actually moves",
		flow: [
			{
				label: "Company",
				detail: "A business that needs owners, not a bank deposit."
			},
			{
				label: "Shares",
				detail: "The company is cut into many equal pieces."
			},
			{
				label: "You buy 1",
				detail: "Your order meets a seller on NSE or BSE."
			},
			{
				label: "You own a slice",
				detail: "Tiny, real ownership. Price can fall."
			}
		],
		graphTitle: "Same 2 shares, three different days",
		graphNote: "You spent ₹200. The screen can say ₹220 or ₹180 before you sell. That gap is not locked in until you sell.",
		kind: "bars",
		bars: [
			{
				label: "You paid",
				value: 200,
				note: "₹100 × 2"
			},
			{
				label: "Up day",
				value: 220,
				note: "₹110 × 2"
			},
			{
				label: "Down day",
				value: 180,
				note: "₹90 × 2"
			}
		]
	},
	"what-is-a-sip": {
		flowTitle: "Where your ₹500 goes",
		flow: [
			{
				label: "Fixed date",
				detail: "Same day each month. No hunting for the bottom."
			},
			{
				label: "Rupees leave",
				detail: "Like a UPI standing instruction."
			},
			{
				label: "Units arrive",
				detail: "More units when NAV is low, fewer when it is high."
			},
			{
				label: "Pot changes",
				detail: "Value can be below what you put in."
			}
		],
		graphTitle: "Money you put in, versus a sketch of the pot",
		graphNote: "The blue line is only your deposits. The pale line is an illustration if markets rose. A weak market can sit under the blue line.",
		kind: "line",
		lineName: "You put in",
		lineBName: "Sketch if markets rose",
		line: [
			{
				label: "M1",
				value: 2
			},
			{
				label: "M2",
				value: 4
			},
			{
				label: "M3",
				value: 6
			},
			{
				label: "M4",
				value: 8
			},
			{
				label: "M5",
				value: 10
			},
			{
				label: "M6",
				value: 12
			}
		],
		lineB: [
			{
				label: "M1",
				value: 2
			},
			{
				label: "M2",
				value: 4.1
			},
			{
				label: "M3",
				value: 6.3
			},
			{
				label: "M4",
				value: 8.2
			},
			{
				label: "M5",
				value: 10.6
			},
			{
				label: "M6",
				value: 12.8
			}
		]
	},
	"demat-and-orders": {
		flowTitle: "The path of a first order",
		flow: [
			{
				label: "Bank",
				detail: "Cash sits here until the trade settles."
			},
			{
				label: "Trading account",
				detail: "The window that sends the order."
			},
			{
				label: "Exchange",
				detail: "NSE or BSE matches you with another person."
			},
			{
				label: "Demat",
				detail: "The locker that holds the shares in your name."
			}
		],
		graphTitle: "An order is not filled just because you tapped",
		graphNote: "Most beginners only see the button. The exchange still has to match price and quantity.",
		kind: "bars",
		bars: [
			{
				label: "Typed",
				value: 1,
				note: "You entered it"
			},
			{
				label: "Waiting",
				value: 2,
				note: "In the queue"
			},
			{
				label: "Matched",
				value: 3,
				note: "A seller agreed"
			},
			{
				label: "In demat",
				value: 4,
				note: "Shares are yours"
			}
		]
	},
	"nifty-sensex": {
		flowTitle: "Why the TV number is not your report card",
		flow: [
			{
				label: "Many companies",
				detail: "Nifty is 50 names. Sensex is 30."
			},
			{
				label: "A scoreboard",
				detail: "One calculated number, not a stock you hold."
			},
			{
				label: "TV shouts it",
				detail: "Up or down is the market’s mood today."
			},
			{
				label: "Your list",
				detail: "Your shares can move the other way."
			}
		],
		graphTitle: "Same day, three different scoreboards",
		graphNote: "Illustration of one noisy day. A green Nifty does not mean your two shares were green.",
		kind: "bars",
		bars: [
			{
				label: "Nifty",
				value: 1.1,
				note: "+1.1%"
			},
			{
				label: "Sensex",
				value: .8,
				note: "+0.8%"
			},
			{
				label: "Your 2 shares",
				value: -1.2,
				note: "−1.2%"
			}
		]
	},
	"sebi-guidelines-basics": {
		flowTitle: "Who is allowed to tell you what",
		flow: [
			{
				label: "SEBI",
				detail: "Writes the rules for the securities market."
			},
			{
				label: "Registered advisor",
				detail: "May give advice. Must say they are registered."
			},
			{
				label: "A forwarded tip",
				detail: "Not a licence. Guaranteed-return claims are a warning."
			},
			{
				label: "PlanVista",
				detail: "A classroom. It does not tell you what to buy."
			}
		],
		graphTitle: "Three kinds of message",
		graphNote: "Height is only “how much trust the rulebook allows”, not a rating of people.",
		kind: "bars",
		bars: [
			{
				label: "SEBI-registered",
				value: 3,
				note: "Can advise"
			},
			{
				label: "Paid tip group",
				value: 1,
				note: "Often not allowed"
			},
			{
				label: "This classroom",
				value: 2,
				note: "Teaches only"
			}
		]
	},
	"how-to-read-candles": {
		flowTitle: "Four prices, one candle",
		flow: [
			{
				label: "Open",
				detail: "The first traded price of that period."
			},
			{
				label: "High",
				detail: "The top wick. Buyers got this far."
			},
			{
				label: "Low",
				detail: "The bottom wick. Sellers pushed here."
			},
			{
				label: "Close",
				detail: "The last price. Green if close is above open."
			}
		],
		graphTitle: "A week of candles, not a signal",
		graphNote: "Green means the period closed above where it opened. It does not mean “buy”.",
		kind: "candles",
		candles: [
			{
				label: "Mon",
				o: 100,
				h: 106,
				l: 98,
				c: 104
			},
			{
				label: "Tue",
				o: 104,
				h: 105,
				l: 97,
				c: 98
			},
			{
				label: "Wed",
				o: 98,
				h: 103,
				l: 96,
				c: 102
			},
			{
				label: "Thu",
				o: 102,
				h: 108,
				l: 101,
				c: 107
			},
			{
				label: "Fri",
				o: 107,
				h: 109,
				l: 100,
				c: 101
			}
		]
	},
	"how-to-read-graphs": {
		flowTitle: "What the two axes are saying",
		flow: [
			{
				label: "Time →",
				detail: "The bottom axis. Left is older."
			},
			{
				label: "Price ↑",
				detail: "The side axis. Higher is a higher rupee price."
			},
			{
				label: "One mark",
				detail: "A close, or a whole candle."
			},
			{
				label: "The line",
				detail: "Many marks joined. A story, not an order."
			}
		],
		graphTitle: "A line is only closing prices joined up",
		graphNote: "Read left to right. A rising line is the past. It is not a promise about next week.",
		kind: "line",
		lineName: "Close",
		line: [
			{
				label: "Jan",
				value: 100
			},
			{
				label: "Feb",
				value: 104
			},
			{
				label: "Mar",
				value: 99
			},
			{
				label: "Apr",
				value: 108
			},
			{
				label: "May",
				value: 112
			},
			{
				label: "Jun",
				value: 107
			}
		]
	},
	"bull-vs-bear": {
		flowTitle: "The animals are moods, not tips",
		flow: [
			{
				label: "Bull",
				detail: "A stretch of rising prices and optimism."
			},
			{
				label: "Bear",
				detail: "A stretch of falling prices and pessimism."
			},
			{
				label: "One day",
				detail: "A red day inside a bull year is normal."
			},
			{
				label: "Your plan",
				detail: "The animal does not pick the share for you."
			}
		],
		graphTitle: "Two stretches, drawn on purpose",
		graphNote: "Left-to-right is time. These lines are cartoons of the words, not a forecast of Nifty.",
		kind: "split",
		lineName: "Bull stretch",
		lineBName: "Bear stretch",
		line: [
			{
				label: "1",
				value: 100
			},
			{
				label: "2",
				value: 106
			},
			{
				label: "3",
				value: 104
			},
			{
				label: "4",
				value: 112
			},
			{
				label: "5",
				value: 118
			}
		],
		lineB: [
			{
				label: "1",
				value: 118
			},
			{
				label: "2",
				value: 110
			},
			{
				label: "3",
				value: 112
			},
			{
				label: "4",
				value: 104
			},
			{
				label: "5",
				value: 98
			}
		]
	},
	"stop-loss-and-target": {
		flowTitle: "Write three numbers before Buy",
		flow: [
			{
				label: "Entry",
				detail: "The price you would actually pay."
			},
			{
				label: "Stop",
				detail: "The price that means the idea was wrong."
			},
			{
				label: "Target",
				detail: "Where you will re-read, not a promise."
			},
			{
				label: "Then size",
				detail: "Quantity comes from the stop, not from hope."
			}
		],
		graphTitle: "A price ladder (illustration)",
		graphNote: "Target sits above entry. The stop sits below. Nothing here is a stock to buy.",
		kind: "bars",
		bars: [
			{
				label: "Stop",
				value: 95,
				note: "Idea is wrong"
			},
			{
				label: "Entry",
				value: 100,
				note: "You paid"
			},
			{
				label: "Target",
				value: 110,
				note: "Re-read here"
			}
		]
	},
	"risk-for-students": {
		flowTitle: "Time changes how hard a fall hits",
		flow: [
			{
				label: "Need date",
				detail: "Fees next year are not the same as fees in year 8."
			},
			{
				label: "Short horizon",
				detail: "A fall may not have time to heal."
			},
			{
				label: "Long horizon",
				detail: "You can hold through a bad year."
			},
			{
				label: "Only surplus",
				detail: "Rent and food never go into equity."
			}
		],
		graphTitle: "How wide a fall can feel",
		graphNote: "Taller bar means a harder possible drop before you need the money. Illustration, not a prediction.",
		kind: "bars",
		bars: [
			{
				label: "Need it in 1 year",
				value: 28,
				note: "Little time"
			},
			{
				label: "Need it in 3 years",
				value: 18,
				note: "Some time"
			},
			{
				label: "Need it in 8 years",
				value: 10,
				note: "More time"
			}
		]
	},
	"index-funds-first": {
		flowTitle: "One SIP, many companies",
		flow: [
			{
				label: "Nifty 50",
				detail: "A list of 50 large companies."
			},
			{
				label: "Index fund",
				detail: "The fund copies that list."
			},
			{
				label: "Your SIP",
				detail: "You buy units, not each share by hand."
			},
			{
				label: "Direct plan",
				detail: "Fewer fees than a regular plan. Still can fall."
			}
		],
		graphTitle: "One company versus the whole list",
		graphNote: "A single share can drop much harder than the index it sits inside. Sketch only.",
		kind: "bars",
		bars: [{
			label: "One share",
			value: -18,
			note: "−18%"
		}, {
			label: "Nifty 50",
			value: -6,
			note: "−6%"
		}]
	},
	"which-timeframe": {
		flowTitle: "Match the chart to the question",
		flow: [
			{
				label: "When do I need it?",
				detail: "The date picks the chart, not YouTube."
			},
			{
				label: "This week",
				detail: "A 1-day chart is noise if the goal is years away."
			},
			{
				label: "This year",
				detail: "A 1-year chart shows the bigger swing."
			},
			{
				label: "Ignore the rest",
				detail: "Mixing timeframes creates fake urgency."
			}
		],
		graphTitle: "Same prices, zoomed out",
		graphNote: "The jumpy line is a few days. The smooth line is the same story over months.",
		kind: "split",
		lineName: "A few days",
		lineBName: "Many months",
		line: [
			{
				label: "1",
				value: 100
			},
			{
				label: "2",
				value: 103
			},
			{
				label: "3",
				value: 99
			},
			{
				label: "4",
				value: 104
			},
			{
				label: "5",
				value: 101
			}
		],
		lineB: [
			{
				label: "1",
				value: 80
			},
			{
				label: "2",
				value: 88
			},
			{
				label: "3",
				value: 92
			},
			{
				label: "4",
				value: 101
			},
			{
				label: "5",
				value: 108
			}
		]
	},
	"indicators-later": {
		flowTitle: "Look in this order",
		flow: [
			{
				label: "Price",
				detail: "Where it is, and the last candle."
			},
			{
				label: "Volume",
				detail: "Did many shares actually trade?"
			},
			{
				label: "Level",
				detail: "A recent high or low the price keeps testing."
			},
			{
				label: "RSI / MACD",
				detail: "Optional colour. Not the first sentence."
			}
		],
		graphTitle: "What deserves your eyes first",
		graphNote: "Taller means “read this before the indicator soup”. RSI is last on purpose.",
		kind: "bars",
		bars: [
			{
				label: "Price",
				value: 4,
				note: "First"
			},
			{
				label: "Volume",
				value: 3,
				note: "Second"
			},
			{
				label: "Level",
				value: 2,
				note: "Third"
			},
			{
				label: "RSI",
				value: 1,
				note: "Later"
			}
		]
	},
	"using-chart-gpt": {
		flowTitle: "A question Chart GPT can teach",
		flow: [
			{
				label: "Pick a name",
				detail: "Nifty, Reliance, or a stock on your list."
			},
			{
				label: "Ask how to read",
				detail: "Candle, trend, volume. Not “should I buy?”."
			},
			{
				label: "It uses the last print",
				detail: "The chart on the screen, not a rumour."
			},
			{
				label: "No tip",
				detail: "It refuses a buy or sell call."
			}
		],
		graphTitle: "The last few closes it is allowed to describe",
		graphNote: "Chart GPT narrates this shape. It does not extend the line into tomorrow.",
		kind: "line",
		lineName: "Last print",
		line: [
			{
				label: "1",
				value: 102
			},
			{
				label: "2",
				value: 104
			},
			{
				label: "3",
				value: 101
			},
			{
				label: "4",
				value: 106
			},
			{
				label: "5",
				value: 108
			},
			{
				label: "6",
				value: 105
			}
		]
	},
	"reading-market-stats": {
		flowTitle: "Read the number beside the price",
		flow: [
			{
				label: "Price",
				detail: "What buyers and sellers last agreed."
			},
			{
				label: "Volume",
				detail: "How many shares changed hands."
			},
			{
				label: "Delivery %",
				detail: "How much of that volume was taken home, not squared off."
			},
			{
				label: "PE",
				detail: "Price compared with earnings. Context, not a trigger."
			}
		],
		graphTitle: "A rising price needs company",
		graphNote: "Two up-days. The second bar is volume. A quiet rise is a weaker story than a busy one. Sketch only.",
		kind: "bars",
		bars: [{
			label: "Price up, quiet",
			value: 1,
			note: "Low volume"
		}, {
			label: "Price up, busy",
			value: 3,
			note: "High volume"
		}]
	},
	"first-mistakes": {
		flowTitle: "How a bad week usually starts",
		flow: [
			{
				label: "A tip",
				detail: "Someone else’s share, no plan."
			},
			{
				label: "Chase",
				detail: "You buy after it already jumped."
			},
			{
				label: "No stop",
				detail: "You do not know where the idea is wrong."
			},
			{
				label: "Too many shares",
				detail: "One red day hurts rent money."
			}
		],
		graphTitle: "The boring fix is smaller than the mistake",
		graphNote: "The tall bar is the damage from “all in”. The short bar is the same idea sized to a rupee you can lose.",
		kind: "bars",
		bars: [{
			label: "All-in tip",
			value: 20,
			note: "Hurts"
		}, {
			label: "Sized, with a stop",
			value: 4,
			note: "Survivable"
		}]
	},
	"goal-based-vs-random": {
		flowTitle: "Give the SIP a job",
		flow: [
			{
				label: "Name it",
				detail: "Fees, laptop, emergency. Not “investing”."
			},
			{
				label: "Date and rupees",
				detail: "When, and how much that thing costs then."
			},
			{
				label: "Its own SIP",
				detail: "Short jobs stay safer. Long jobs can hold equity."
			},
			{
				label: "Harder to raid",
				detail: "A named pot is harder to spend on a weekend."
			}
		],
		graphTitle: "Two jobs, two mixes",
		graphNote: "Share of the pot that can sit in equity. The emergency fund stays mostly out. Illustration.",
		kind: "bars",
		bars: [{
			label: "Emergency, 18 months",
			value: 15,
			note: "Little equity"
		}, {
			label: "Study abroad, 8 years",
			value: 70,
			note: "More equity"
		}]
	},
	"step-up-sip": {
		flowTitle: "Let the stipend do the lifting",
		flow: [
			{
				label: "Start small",
				detail: "₹2,000 you will not miss."
			},
			{
				label: "Income rises",
				detail: "Internship or a placement hike."
			},
			{
				label: "SIP steps up",
				detail: "About 10% more next year: ₹2,200."
			},
			{
				label: "Habit stays",
				detail: "You raise the habit, not the risk story."
			}
		],
		graphTitle: "Rupees you commit, not a return",
		graphNote: "Blue stays flat. Pale line steps up once a year. This is money in, not money the market owes you.",
		kind: "line",
		lineName: "Flat ₹2,000",
		lineBName: "10% step-up",
		line: [
			{
				label: "Y1",
				value: 24
			},
			{
				label: "Y2",
				value: 48
			},
			{
				label: "Y3",
				value: 72
			},
			{
				label: "Y4",
				value: 96
			}
		],
		lineB: [
			{
				label: "Y1",
				value: 24
			},
			{
				label: "Y2",
				value: 50
			},
			{
				label: "Y3",
				value: 79
			},
			{
				label: "Y4",
				value: 111
			}
		]
	},
	"inflation-is-the-silent-fee": {
		flowTitle: "Price the goal in future rupees",
		flow: [
			{
				label: "Today’s price",
				detail: "The laptop tag you can see now."
			},
			{
				label: "Inflation",
				detail: "The same thing costs more later."
			},
			{
				label: "Future bill",
				detail: "This is the number the SIP must aim at."
			},
			{
				label: "Then the SIP",
				detail: "If it shocks you, extend the date or step up."
			}
		],
		graphTitle: "An ₹80,000 laptop, if prices rise 6% a year",
		graphNote: "Each bar is the same laptop one year later. This is a fee sketch, not a quote from a shop.",
		kind: "bars",
		bars: [
			{
				label: "Today",
				value: 80,
				note: "₹80k"
			},
			{
				label: "In 1 year",
				value: 85,
				note: "₹85k"
			},
			{
				label: "In 2 years",
				value: 90,
				note: "₹90k"
			},
			{
				label: "In 3 years",
				value: 95,
				note: "₹95k"
			}
		]
	},
	"position-size": {
		flowTitle: "Quantity is a division sum",
		flow: [
			{
				label: "Rupees at risk",
				detail: "What you can lose without touching rent."
			},
			{
				label: "Stop distance",
				detail: "Entry minus the price that ends the idea."
			},
			{
				label: "Divide",
				detail: "Shares = risk rupees ÷ rupees of stop."
			},
			{
				label: "That many",
				detail: "Not “as many as the app allows”."
			}
		],
		graphTitle: "₹5,000 risk, stop ₹10 away",
		graphNote: "5,000 ÷ 10 = 500 shares. A tighter stop is not “safer” if you then buy far more shares. Illustration.",
		kind: "bars",
		bars: [
			{
				label: "Risk you chose",
				value: 5,
				note: "₹5,000"
			},
			{
				label: "Stop distance",
				value: 10,
				note: "₹10 / share"
			},
			{
				label: "Shares",
				value: 50,
				note: "500 shares"
			}
		]
	},
	"trade-journal": {
		flowTitle: "Write it before the click",
		flow: [
			{
				label: "Plan",
				detail: "Why, entry, stop, target, size."
			},
			{
				label: "Fill",
				detail: "What you actually got, on the paper desk first."
			},
			{
				label: "What happened",
				detail: "The market’s print, not your mood."
			},
			{
				label: "One lesson",
				detail: "A sentence you can use next time."
			}
		],
		graphTitle: "Planned loss versus what a journal keeps",
		graphNote: "Without a line written first, every red day feels new. The short bar is the loss you already accepted.",
		kind: "bars",
		bars: [{
			label: "Surprise loss",
			value: 12,
			note: "No plan"
		}, {
			label: "Planned risk",
			value: 5,
			note: "Written first"
		}]
	}
};
var MISTAKES = [
	"Putting rent, fees, or food money into a share.",
	"Buying a name because a chat group said so.",
	"Chasing a price that already jumped this week.",
	"Stopping a long SIP because one week was red.",
	"Opening intraday or futures on day one.",
	"Ignoring brokerage, tax, and the cost of tapping too often.",
	"Having no emergency cash sitting in a boring place.",
	"Mixing next month’s bill and a 10-year goal in one fund.",
	"Believing anyone who promises a fixed percent every week.",
	"Opening the app forty times a day and calling that a plan."
];
function Flow({ steps, active, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "grid gap-3 sm:grid-cols-4",
		children: steps.map((step, i) => {
			const on = i === active;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "lesson-anim relative",
				style: { animationDelay: `${i * .12}s` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(i),
					"aria-pressed": on,
					className: `h-full w-full rounded-xl border p-3 text-left ${on ? "lesson-live border-primary bg-primary-soft" : "border-border bg-surface hover:bg-surface-2"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] font-medium tabular-nums text-primary",
							children: ["0", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-medium",
							children: step.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-3 text-xs leading-relaxed text-muted",
							children: step.detail
						})
					]
				}), i < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "absolute -right-3 top-8 z-10 hidden h-4 w-6 sm:block",
					viewBox: "0 0 24 16",
					"aria-hidden": true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						className: "lesson-arrow",
						d: "M1 8 H16",
						stroke: "var(--color-primary)",
						strokeWidth: "1.6",
						fill: "none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M14 3.5 L20 8 L14 12.5",
						stroke: "var(--color-primary)",
						strokeWidth: "1.6",
						fill: "none"
					})]
				}) : null]
			}, step.label);
		})
	});
}
function Bars({ rows }) {
	const max = Math.max(...rows.map((r) => Math.abs(r.value)), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 space-y-3",
		children: rows.map((row, i) => {
			const neg = row.value < 0;
			const width = Math.max(8, Math.abs(row.value) / max * 100);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-baseline justify-between gap-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: row.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-subtle",
					children: row.note
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-3 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lesson-bar h-full rounded-full",
					style: {
						width: `${width}%`,
						animationDelay: `${.12 * i}s`,
						background: neg ? "var(--color-down)" : "var(--color-primary)"
					}
				})
			})] }, row.label);
		})
	});
}
function coords(points, min, max, w, h, pad) {
	const span = max - min || 1;
	return points.map((p, i) => {
		return {
			x: pad + i / Math.max(points.length - 1, 1) * (w - pad * 2),
			y: pad + (1 - (p.value - min) / span) * (h - pad * 2),
			label: p.label,
			value: p.value
		};
	});
}
function LineGraph({ a, b, name, nameB, shared }) {
	const w = 360;
	const h = 168;
	const pad = 22;
	const pool = shared && b ? [...a, ...b] : a;
	const min = Math.min(...pool.map((p) => p.value));
	const max = Math.max(...pool.map((p) => p.value));
	const left = coords(a, shared && b ? min : Math.min(...a.map((p) => p.value)), shared && b ? max : Math.max(...a.map((p) => p.value)), w, h, pad);
	const right = b ? coords(b, shared ? min : Math.min(...b.map((p) => p.value)), shared ? max : Math.max(...b.map((p) => p.value)), w, h, pad) : [];
	const toPts = (rows) => rows.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
	const area = left.length ? `M ${left[0].x.toFixed(1)} ${146 .toFixed(1)} L ${toPts(left).replaceAll(" ", " L ").replaceAll(",", " ")} L ${left[left.length - 1].x.toFixed(1)} ${146 .toFixed(1)} Z` : "";
	const yTop = shared && b ? max : Math.max(...a.map((p) => p.value));
	const yBot = shared && b ? min : Math.min(...a.map((p) => p.value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: `0 0 ${w} ${h}`,
				className: "h-48 w-full",
				role: "img",
				"aria-label": name ?? "Line chart",
				children: [
					[
						.25,
						.5,
						.75
					].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: pad,
						x2: 338,
						y1: pad + g * 124,
						y2: pad + g * 124,
						stroke: "var(--color-border)",
						strokeDasharray: "3 4"
					}, g)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: pad,
						y1: 146,
						x2: 338,
						y2: 146,
						stroke: "var(--color-border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: pad,
						y1: pad,
						x2: pad,
						y2: 146,
						stroke: "var(--color-border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 26,
						y: 32,
						fontSize: "10",
						fill: "var(--color-subtle)",
						children: yTop
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 26,
						y: 142,
						fontSize: "10",
						fill: "var(--color-subtle)",
						children: yBot
					}),
					area ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: area,
						fill: "var(--color-primary)",
						opacity: "0.12"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
						className: "lesson-draw",
						fill: "none",
						stroke: "var(--color-primary)",
						strokeWidth: "2.5",
						points: toPts(left)
					}),
					right.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
						className: "lesson-draw",
						fill: "none",
						stroke: "var(--color-warn)",
						strokeWidth: "2.5",
						points: toPts(right),
						style: { animationDelay: "0.2s" }
					}) : null,
					left.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						className: "lesson-candle",
						cx: left[left.length - 1].x,
						cy: left[left.length - 1].y,
						r: "4",
						fill: "var(--color-primary)"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex justify-between px-2 text-[10px] text-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Time →" }), a.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.label }, p.label))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap gap-3 text-[11px] text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-4 bg-primary" }),
							" ",
							name ?? "Series"
						]
					}),
					b ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-4 bg-warn" }),
							" ",
							nameB ?? "Compare"
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Up the side is a bigger number. Left is earlier." })
				]
			})
		]
	});
}
function Candles({ rows }) {
	const highs = rows.map((c) => c.h);
	const lows = rows.map((c) => c.l);
	const max = Math.max(...highs);
	const min = Math.min(...lows);
	const span = max - min || 1;
	const y = (v) => 16 + (1 - (v - min) / span) * 96;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 360 150",
		className: "h-48 w-full",
		role: "img",
		"aria-label": "Candlestick sketch",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "8",
			y: "14",
			fontSize: "10",
			fill: "var(--color-subtle)",
			children: "Price ↑"
		}), rows.map((c, i) => {
			const x = 48 + i * 62;
			const up = c.c >= c.o;
			const top = y(Math.max(c.o, c.c));
			const bot = y(Math.min(c.o, c.c));
			const color = up ? "var(--color-up)" : "var(--color-down)";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "lesson-candle",
				style: { animationDelay: `${i * .1}s` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: x,
						x2: x,
						y1: y(c.h),
						y2: y(c.l),
						stroke: color,
						strokeWidth: "2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: x - 11,
						y: top,
						width: "22",
						height: Math.max(6, bot - top),
						rx: "2",
						fill: color
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x,
						y: "142",
						textAnchor: "middle",
						fontSize: "10",
						fill: "var(--color-subtle)",
						children: c.label
					})
				]
			}, c.label);
		})]
	});
}
function CandleAnatomy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-center gap-3 sm:grid-cols-[120px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 120 160",
			className: "mx-auto h-40 w-28",
			role: "img",
			"aria-label": "Parts of one candle",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "46",
					y1: "16",
					x2: "46",
					y2: "144",
					stroke: "var(--color-up)",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "30",
					y: "48",
					width: "32",
					height: "52",
					rx: "3",
					fill: "var(--color-up)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "78",
					y1: "16",
					x2: "62",
					y2: "16",
					stroke: "var(--color-subtle)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "78",
					y1: "48",
					x2: "62",
					y2: "48",
					stroke: "var(--color-subtle)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "78",
					y1: "100",
					x2: "62",
					y2: "100",
					stroke: "var(--color-subtle)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "78",
					y1: "144",
					x2: "62",
					y2: "144",
					stroke: "var(--color-subtle)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "82",
					y: "19",
					fontSize: "9",
					fill: "var(--color-muted)",
					children: "High"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "82",
					y: "51",
					fontSize: "9",
					fill: "var(--color-muted)",
					children: "Close"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "82",
					y: "103",
					fontSize: "9",
					fill: "var(--color-muted)",
					children: "Open"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "82",
					y: "147",
					fontSize: "9",
					fill: "var(--color-muted)",
					children: "Low"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "space-y-2 text-sm leading-relaxed text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-fg",
					children: "Body."
				}), " Open to close. Green here means the period finished above where it started."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-fg",
					children: "Wicks."
				}), " The thin lines are the highest and lowest prices anyone paid in that period."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-fg",
					children: "Not a signal."
				}), " The picture says what already happened. It does not say what to buy."] })
			]
		})]
	});
}
function PriceLadder() {
	const rows = [
		{
			label: "Target",
			price: "₹110",
			note: "You planned to re-read here. It is not a promise the price will arrive.",
			color: "var(--color-up)"
		},
		{
			label: "Entry",
			price: "₹100",
			note: "The price you would actually pay. Write it before you tap.",
			color: "var(--color-primary)"
		},
		{
			label: "Stop",
			price: "₹95",
			note: "If price gets here, the idea was wrong. You exit. A gap can still skip past it.",
			color: "var(--color-down)"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-4 sm:grid-cols-[72px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 72 180",
			className: "h-48 w-full",
			role: "img",
			"aria-label": "Price ladder",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "36",
				y1: "12",
				x2: "36",
				y2: "168",
				stroke: "var(--color-border-strong)",
				strokeWidth: "2"
			}), rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: "lesson-candle",
				style: { animationDelay: `${i * .15}s` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "36",
					cy: 28 + i * 60,
					r: "8",
					fill: row.color
				})
			}, row.label))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-3",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-border p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wide text-subtle",
						children: row.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-medium tabular-nums",
						children: row.price
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted",
						children: row.note
					})
				]
			}, row.label))
		})]
	});
}
function SizeMath() {
	const cells = [
		{
			k: "You can lose",
			v: "₹5,000"
		},
		{
			k: "Stop is this far",
			v: "₹10"
		},
		{
			k: "So you buy",
			v: "500 shares"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]",
			children: cells.map((cell, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "contents",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lesson-anim rounded-xl border border-border bg-surface p-4 text-center",
					style: { animationDelay: `${i * .15}s` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-wide text-subtle",
						children: cell.k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xl font-medium tabular-nums",
						children: cell.v
					})]
				}), i < cells.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden text-center text-xl text-muted sm:block",
					"aria-hidden": true,
					children: i === 0 ? "÷" : "="
				}) : null]
			}, cell.k))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-relaxed text-muted",
			children: "5,000 divided by 10 is 500. If the stop is hit, the planned loss is about ₹5,000. If the cash cannot cover 500 shares, you buy fewer. You do not move the stop to fit a bigger order."
		})]
	});
}
function MistakeList() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-2",
			children: MISTAKES.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "lesson-anim flex gap-3 text-sm leading-relaxed",
				style: { animationDelay: `${i * .05}s` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-5 shrink-0 tabular-nums text-down",
					children: i + 1
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: line })]
			}, line))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "h-fit rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wide text-emerald-300",
				children: "The boring fix"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed",
				children: "Name the goal. Keep two or three months of expenses in cash. Automate a small SIP into a plain index or debt mix. Review once a month. Then close the app."
			})]
		})]
	});
}
function SebiLanes() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 grid gap-3 sm:grid-cols-3",
		children: [
			{
				title: "Allowed to advise",
				body: "A SEBI-registered adviser can tell you what to do with your money, and must say they are registered."
			},
			{
				title: "A paid tip",
				body: "A sure-shot stock in your messages, especially with a fee or a guaranteed return, is a warning. Walk away."
			},
			{
				title: "This classroom",
				body: "PlanVista explains the picture. It does not send an order, and it will not name a share for you to buy."
			}
		].map((lane, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lesson-anim rounded-xl border border-border p-3",
			style: { animationDelay: `${i * .12}s` },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: lane.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: lane.body
			})]
		}, lane.title))
	});
}
function readHints(kind) {
	if (kind === "candles") return [
		"Each block is one period: a day in this sketch.",
		"Green finished above the open. Red finished below it.",
		"The thin lines are the high and the low, not a forecast."
	];
	if (kind === "line" || kind === "split") return [
		"Read left to right. That is time passing.",
		"Higher on the page is a higher number, not “better” by itself.",
		"A rising line is the past. It is not next week."
	];
	return [
		"A longer bar is a bigger number in this sketch.",
		"Compare the bars with each other, not with a reel.",
		"The labels are the lesson. The height is only a picture of them."
	];
}
function LessonStudio({ slug, image }) {
	const visual = LESSON_VISUALS[slug];
	const [active, setActive] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setActive(0);
		setPaused(false);
	}, [slug]);
	(0, import_react.useEffect)(() => {
		if (!visual || paused) return;
		if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const id = window.setInterval(() => {
			setActive((n) => (n + 1) % visual.flow.length);
		}, 3400);
		return () => window.clearInterval(id);
	}, [
		visual,
		paused,
		slug
	]);
	if (!visual) return null;
	const step = visual.flow[active] ?? visual.flow[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8 space-y-6 rounded-2xl border border-border p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]",
				children: [image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-xl border border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: image,
						alt: "",
						className: "h-48 w-full object-cover sm:h-56"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "px-3 py-2 text-xs leading-relaxed text-muted",
						children: visual.flowTitle
					})]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "Block diagram"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs leading-relaxed text-subtle",
					children: "Tap a block, or let it walk. On a phone the blocks stack. Follow 01, then 02."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flow, {
				steps: visual.flow,
				active,
				onPick: (i) => {
					setPaused(true);
					setActive(i);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] font-medium uppercase tracking-[0.14em] text-primary",
							children: [
								"Step ",
								active + 1,
								" of ",
								visual.flow.length
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-full border border-border px-3 py-1 text-xs",
									onClick: () => {
										setPaused(true);
										setActive((n) => (n - 1 + visual.flow.length) % visual.flow.length);
									},
									children: "Back"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-full border border-border px-3 py-1 text-xs",
									onClick: () => {
										setPaused(true);
										setActive((n) => (n + 1) % visual.flow.length);
									},
									children: "Next"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-full border border-border px-3 py-1 text-xs",
									onClick: () => setPaused((p) => !p),
									children: paused ? "Play" : "Pause"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 text-xl font-medium tracking-tight",
						children: step.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[17px] leading-[1.7] text-fg",
						children: step.detail
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: visual.graphTitle
				}),
				slug === "stop-loss-and-target" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceLadder, {}) : null,
				slug === "position-size" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeMath, {}) : null,
				slug === "first-mistakes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MistakeList, {}) : null,
				slug === "sebi-guidelines-basics" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SebiLanes, {}) : null,
				visual.kind === "bars" && visual.bars && slug !== "stop-loss-and-target" && slug !== "position-size" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, { rows: visual.bars }) : null,
				visual.kind === "line" && visual.line ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineGraph, {
					a: visual.line,
					b: visual.lineB,
					name: visual.lineName,
					nameB: visual.lineBName,
					shared: Boolean(visual.lineB)
				}) : null,
				visual.kind === "split" && visual.line && visual.lineB ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium",
							children: visual.lineName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineGraph, {
							a: visual.line,
							name: visual.lineName
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium",
							children: visual.lineBName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineGraph, {
							a: visual.lineB,
							name: visual.lineBName
						})]
					})]
				}) : null,
				visual.kind === "candles" && visual.candles ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid items-center gap-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Candles, { rows: visual.candles }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandleAnatomy, {})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-2 sm:grid-cols-3",
					children: readHints(visual.kind).map((hint) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-lg bg-surface px-3 py-2 text-xs leading-relaxed text-muted",
						children: hint
					}, hint))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: visual.graphNote
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] text-subtle",
					children: "A teaching sketch. Not a forecast, and not a buy or a sell."
				})
			] })
		]
	});
}
function Article() {
	const { slug } = Route$1.useParams();
	const article = ARTICLES.find((a) => a.slug === slug);
	const markRead = useSiply((s) => s.markRead);
	(0, import_react.useEffect)(() => {
		if (article) markRead(article.slug);
	}, [article, markRead]);
	if (!article) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "py-16 text-center text-muted",
		children: [
			"Article missing.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/learn",
				className: "text-primary hover:underline",
				children: "All explainers"
			})
		]
	});
	const idx = ARTICLES.findIndex((a) => a.slug === article.slug);
	const prev = idx > 0 ? ARTICLES[idx - 1] : null;
	const next = idx >= 0 && idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/learn",
				className: "text-xs text-primary hover:underline",
				children: "All explainers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-[11px] font-medium uppercase tracking-wide text-primary",
				children: article.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-medium tracking-tight",
				children: article.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-subtle",
				children: [article.minutes, " min read · Diagram, chart, then the full answer"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-xl border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.14em] text-primary",
					children: "Short answer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-lg leading-relaxed text-fg",
					children: article.body[0]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonStudio, {
				slug: article.slug,
				image: article.image
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-4 text-[17px] leading-[1.75] text-fg",
				children: article.body.slice(1).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p.slice(0, 32)))
			}),
			article.example ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-wide text-primary",
					children: article.example.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm leading-relaxed text-fg",
					children: article.example.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: line })]
					}, line.slice(0, 28)))
				})]
			}) : null,
			article.terms?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium uppercase tracking-wide text-subtle",
					children: "Words to know"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border",
					children: article.terms.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 px-4 py-3 sm:grid-cols-[140px_1fr] sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm font-medium",
							children: t.term
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-sm text-muted",
							children: t.meaning
						})]
					}, t.term))
				})]
			}) : null,
			article.takeaways?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-emerald-300",
					children: "Takeaways"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2 text-sm leading-relaxed",
					children: article.takeaways.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t }, t))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-muted",
				children: "SEBI reminder: This article is for learning only. It is not investment advice. Numbers are illustrations, not forecasts. Do not treat any chart pattern, bull/bear label or statistic as a buy or sell recommendation. Capital is at risk in markets. Past performance is not indicative of future results."
			}),
			[
				"how-to-read-candles",
				"how-to-read-graphs",
				"bull-vs-bear",
				"stop-loss-and-target",
				"using-chart-gpt",
				"which-timeframe",
				"indicators-later",
				"reading-market-stats"
			].includes(article.slug) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 rounded-xl border border-primary/20 bg-primary-soft p-4 text-sm leading-relaxed",
				children: [
					"Want this explained on a live (or last-close) chart?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/chart-gpt",
						className: "font-medium text-primary hover:underline",
						children: "Open Chart GPT"
					}),
					" ",
					"and ask in your own words. It will teach. It will not pick a stock."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex justify-between gap-4 text-sm",
				children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/learn/$slug",
					params: { slug: prev.slug },
					className: "text-primary hover:underline",
					children: ["← ", prev.title]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/learn/$slug",
					params: { slug: next.slug },
					className: "ml-auto text-right text-primary hover:underline",
					children: [next.title, " →"]
				}) : null]
			})
		]
	});
}
//#endregion
export { Article as component };
