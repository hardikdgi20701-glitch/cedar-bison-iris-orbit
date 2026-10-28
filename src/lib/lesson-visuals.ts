/** Illustrated classroom beats for every Academy lesson. Numbers are teaching sketches, not forecasts. */

export type FlowStep = { label: string; detail: string };

export type BarPoint = { label: string; value: number; note?: string };

export type LinePoint = { label: string; value: number };

export type CandlePoint = { label: string; o: number; h: number; l: number; c: number };

export type LessonVisual = {
  flowTitle: string;
  flow: FlowStep[];
  graphTitle: string;
  graphNote: string;
  kind: "bars" | "line" | "candles" | "split";
  bars?: BarPoint[];
  line?: LinePoint[];
  /** Second line for a comparison (flat SIP vs step-up, bull vs bear). */
  lineB?: LinePoint[];
  lineName?: string;
  lineBName?: string;
  candles?: CandlePoint[];
};

export const LESSON_VISUALS: Record<string, LessonVisual> = {
  "what-is-a-share": {
    flowTitle: "How a share actually moves",
    flow: [
      { label: "Company", detail: "A business that needs owners, not a bank deposit." },
      { label: "Shares", detail: "The company is cut into many equal pieces." },
      { label: "You buy 1", detail: "Your order meets a seller on NSE or BSE." },
      { label: "You own a slice", detail: "Tiny, real ownership. Price can fall." },
    ],
    graphTitle: "Same 2 shares, three different days",
    graphNote: "You spent ₹200. The screen can say ₹220 or ₹180 before you sell. That gap is not locked in until you sell.",
    kind: "bars",
    bars: [
      { label: "You paid", value: 200, note: "₹100 × 2" },
      { label: "Up day", value: 220, note: "₹110 × 2" },
      { label: "Down day", value: 180, note: "₹90 × 2" },
    ],
  },
  "what-is-a-sip": {
    flowTitle: "Where your ₹500 goes",
    flow: [
      { label: "Fixed date", detail: "Same day each month. No hunting for the bottom." },
      { label: "Rupees leave", detail: "Like a UPI standing instruction." },
      { label: "Units arrive", detail: "More units when NAV is low, fewer when it is high." },
      { label: "Pot changes", detail: "Value can be below what you put in." },
    ],
    graphTitle: "Money you put in, versus a sketch of the pot",
    graphNote: "The blue line is only your deposits. The pale line is an illustration if markets rose. A weak market can sit under the blue line.",
    kind: "line",
    lineName: "You put in",
    lineBName: "Sketch if markets rose",
    line: [
      { label: "M1", value: 2 },
      { label: "M2", value: 4 },
      { label: "M3", value: 6 },
      { label: "M4", value: 8 },
      { label: "M5", value: 10 },
      { label: "M6", value: 12 },
    ],
    lineB: [
      { label: "M1", value: 2 },
      { label: "M2", value: 4.1 },
      { label: "M3", value: 6.3 },
      { label: "M4", value: 8.2 },
      { label: "M5", value: 10.6 },
      { label: "M6", value: 12.8 },
    ],
  },
  "demat-and-orders": {
    flowTitle: "The path of a first order",
    flow: [
      { label: "Bank", detail: "Cash sits here until the trade settles." },
      { label: "Trading account", detail: "The window that sends the order." },
      { label: "Exchange", detail: "NSE or BSE matches you with another person." },
      { label: "Demat", detail: "The locker that holds the shares in your name." },
    ],
    graphTitle: "An order is not filled just because you tapped",
    graphNote: "Most beginners only see the button. The exchange still has to match price and quantity.",
    kind: "bars",
    bars: [
      { label: "Typed", value: 1, note: "You entered it" },
      { label: "Waiting", value: 2, note: "In the queue" },
      { label: "Matched", value: 3, note: "A seller agreed" },
      { label: "In demat", value: 4, note: "Shares are yours" },
    ],
  },
  "nifty-sensex": {
    flowTitle: "Why the TV number is not your report card",
    flow: [
      { label: "Many companies", detail: "Nifty is 50 names. Sensex is 30." },
      { label: "A scoreboard", detail: "One calculated number, not a stock you hold." },
      { label: "TV shouts it", detail: "Up or down is the market’s mood today." },
      { label: "Your list", detail: "Your shares can move the other way." },
    ],
    graphTitle: "Same day, three different scoreboards",
    graphNote: "Illustration of one noisy day. A green Nifty does not mean your two shares were green.",
    kind: "bars",
    bars: [
      { label: "Nifty", value: 1.1, note: "+1.1%" },
      { label: "Sensex", value: 0.8, note: "+0.8%" },
      { label: "Your 2 shares", value: -1.2, note: "−1.2%" },
    ],
  },
  "sebi-guidelines-basics": {
    flowTitle: "Who is allowed to tell you what",
    flow: [
      { label: "SEBI", detail: "Writes the rules for the securities market." },
      { label: "Registered advisor", detail: "May give advice. Must say they are registered." },
      { label: "A forwarded tip", detail: "Not a licence. Guaranteed-return claims are a warning." },
      { label: "PlanVista", detail: "A classroom. It does not tell you what to buy." },
    ],
    graphTitle: "Three kinds of message",
    graphNote: "Height is only “how much trust the rulebook allows”, not a rating of people.",
    kind: "bars",
    bars: [
      { label: "SEBI-registered", value: 3, note: "Can advise" },
      { label: "Paid tip group", value: 1, note: "Often not allowed" },
      { label: "This classroom", value: 2, note: "Teaches only" },
    ],
  },
  "how-to-read-candles": {
    flowTitle: "Four prices, one candle",
    flow: [
      { label: "Open", detail: "The first traded price of that period." },
      { label: "High", detail: "The top wick. Buyers got this far." },
      { label: "Low", detail: "The bottom wick. Sellers pushed here." },
      { label: "Close", detail: "The last price. Green if close is above open." },
    ],
    graphTitle: "A week of candles, not a signal",
    graphNote: "Green means the period closed above where it opened. It does not mean “buy”.",
    kind: "candles",
    candles: [
      { label: "Mon", o: 100, h: 106, l: 98, c: 104 },
      { label: "Tue", o: 104, h: 105, l: 97, c: 98 },
      { label: "Wed", o: 98, h: 103, l: 96, c: 102 },
      { label: "Thu", o: 102, h: 108, l: 101, c: 107 },
      { label: "Fri", o: 107, h: 109, l: 100, c: 101 },
    ],
  },
  "how-to-read-graphs": {
    flowTitle: "What the two axes are saying",
    flow: [
      { label: "Time →", detail: "The bottom axis. Left is older." },
      { label: "Price ↑", detail: "The side axis. Higher is a higher rupee price." },
      { label: "One mark", detail: "A close, or a whole candle." },
      { label: "The line", detail: "Many marks joined. A story, not an order." },
    ],
    graphTitle: "A line is only closing prices joined up",
    graphNote: "Read left to right. A rising line is the past. It is not a promise about next week.",
    kind: "line",
    lineName: "Close",
    line: [
      { label: "Jan", value: 100 },
      { label: "Feb", value: 104 },
      { label: "Mar", value: 99 },
      { label: "Apr", value: 108 },
      { label: "May", value: 112 },
      { label: "Jun", value: 107 },
    ],
  },
  "bull-vs-bear": {
    flowTitle: "The animals are moods, not tips",
    flow: [
      { label: "Bull", detail: "A stretch of rising prices and optimism." },
      { label: "Bear", detail: "A stretch of falling prices and pessimism." },
      { label: "One day", detail: "A red day inside a bull year is normal." },
      { label: "Your plan", detail: "The animal does not pick the share for you." },
    ],
    graphTitle: "Two stretches, drawn on purpose",
    graphNote: "Left-to-right is time. These lines are cartoons of the words, not a forecast of Nifty.",
    kind: "split",
    lineName: "Bull stretch",
    lineBName: "Bear stretch",
    line: [
      { label: "1", value: 100 },
      { label: "2", value: 106 },
      { label: "3", value: 104 },
      { label: "4", value: 112 },
      { label: "5", value: 118 },
    ],
    lineB: [
      { label: "1", value: 118 },
      { label: "2", value: 110 },
      { label: "3", value: 112 },
      { label: "4", value: 104 },
      { label: "5", value: 98 },
    ],
  },
  "stop-loss-and-target": {
    flowTitle: "Write three numbers before Buy",
    flow: [
      { label: "Entry", detail: "The price you would actually pay." },
      { label: "Stop", detail: "The price that means the idea was wrong." },
      { label: "Target", detail: "Where you will re-read, not a promise." },
      { label: "Then size", detail: "Quantity comes from the stop, not from hope." },
    ],
    graphTitle: "A price ladder (illustration)",
    graphNote: "Target sits above entry. The stop sits below. Nothing here is a stock to buy.",
    kind: "bars",
    bars: [
      { label: "Stop", value: 95, note: "Idea is wrong" },
      { label: "Entry", value: 100, note: "You paid" },
      { label: "Target", value: 110, note: "Re-read here" },
    ],
  },
  "risk-for-students": {
    flowTitle: "Time changes how hard a fall hits",
    flow: [
      { label: "Need date", detail: "Fees next year are not the same as fees in year 8." },
      { label: "Short horizon", detail: "A fall may not have time to heal." },
      { label: "Long horizon", detail: "You can hold through a bad year." },
      { label: "Only surplus", detail: "Rent and food never go into equity." },
    ],
    graphTitle: "How wide a fall can feel",
    graphNote: "Taller bar means a harder possible drop before you need the money. Illustration, not a prediction.",
    kind: "bars",
    bars: [
      { label: "Need it in 1 year", value: 28, note: "Little time" },
      { label: "Need it in 3 years", value: 18, note: "Some time" },
      { label: "Need it in 8 years", value: 10, note: "More time" },
    ],
  },
  "index-funds-first": {
    flowTitle: "One SIP, many companies",
    flow: [
      { label: "Nifty 50", detail: "A list of 50 large companies." },
      { label: "Index fund", detail: "The fund copies that list." },
      { label: "Your SIP", detail: "You buy units, not each share by hand." },
      { label: "Direct plan", detail: "Fewer fees than a regular plan. Still can fall." },
    ],
    graphTitle: "One company versus the whole list",
    graphNote: "A single share can drop much harder than the index it sits inside. Sketch only.",
    kind: "bars",
    bars: [
      { label: "One share", value: -18, note: "−18%" },
      { label: "Nifty 50", value: -6, note: "−6%" },
    ],
  },
  "which-timeframe": {
    flowTitle: "Match the chart to the question",
    flow: [
      { label: "When do I need it?", detail: "The date picks the chart, not YouTube." },
      { label: "This week", detail: "A 1-day chart is noise if the goal is years away." },
      { label: "This year", detail: "A 1-year chart shows the bigger swing." },
      { label: "Ignore the rest", detail: "Mixing timeframes creates fake urgency." },
    ],
    graphTitle: "Same prices, zoomed out",
    graphNote: "The jumpy line is a few days. The smooth line is the same story over months.",
    kind: "split",
    lineName: "A few days",
    lineBName: "Many months",
    line: [
      { label: "1", value: 100 },
      { label: "2", value: 103 },
      { label: "3", value: 99 },
      { label: "4", value: 104 },
      { label: "5", value: 101 },
    ],
    lineB: [
      { label: "1", value: 80 },
      { label: "2", value: 88 },
      { label: "3", value: 92 },
      { label: "4", value: 101 },
      { label: "5", value: 108 },
    ],
  },
  "indicators-later": {
    flowTitle: "Look in this order",
    flow: [
      { label: "Price", detail: "Where it is, and the last candle." },
      { label: "Volume", detail: "Did many shares actually trade?" },
      { label: "Level", detail: "A recent high or low the price keeps testing." },
      { label: "RSI / MACD", detail: "Optional colour. Not the first sentence." },
    ],
    graphTitle: "What deserves your eyes first",
    graphNote: "Taller means “read this before the indicator soup”. RSI is last on purpose.",
    kind: "bars",
    bars: [
      { label: "Price", value: 4, note: "First" },
      { label: "Volume", value: 3, note: "Second" },
      { label: "Level", value: 2, note: "Third" },
      { label: "RSI", value: 1, note: "Later" },
    ],
  },
  "using-chart-gpt": {
    flowTitle: "A question Chart GPT can teach",
    flow: [
      { label: "Pick a name", detail: "Nifty, Reliance, or a stock on your list." },
      { label: "Ask how to read", detail: "Candle, trend, volume. Not “should I buy?”." },
      { label: "It uses the last print", detail: "The chart on the screen, not a rumour." },
      { label: "No tip", detail: "It refuses a buy or sell call." },
    ],
    graphTitle: "The last few closes it is allowed to describe",
    graphNote: "Chart GPT narrates this shape. It does not extend the line into tomorrow.",
    kind: "line",
    lineName: "Last print",
    line: [
      { label: "1", value: 102 },
      { label: "2", value: 104 },
      { label: "3", value: 101 },
      { label: "4", value: 106 },
      { label: "5", value: 108 },
      { label: "6", value: 105 },
    ],
  },
  "reading-market-stats": {
    flowTitle: "Read the number beside the price",
    flow: [
      { label: "Price", detail: "What buyers and sellers last agreed." },
      { label: "Volume", detail: "How many shares changed hands." },
      { label: "Delivery %", detail: "How much of that volume was taken home, not squared off." },
      { label: "PE", detail: "Price compared with earnings. Context, not a trigger." },
    ],
    graphTitle: "A rising price needs company",
    graphNote: "Two up-days. The second bar is volume. A quiet rise is a weaker story than a busy one. Sketch only.",
    kind: "bars",
    bars: [
      { label: "Price up, quiet", value: 1, note: "Low volume" },
      { label: "Price up, busy", value: 3, note: "High volume" },
    ],
  },
  "first-mistakes": {
    flowTitle: "How a bad week usually starts",
    flow: [
      { label: "A tip", detail: "Someone else’s share, no plan." },
      { label: "Chase", detail: "You buy after it already jumped." },
      { label: "No stop", detail: "You do not know where the idea is wrong." },
      { label: "Too many shares", detail: "One red day hurts rent money." },
    ],
    graphTitle: "The boring fix is smaller than the mistake",
    graphNote: "The tall bar is the damage from “all in”. The short bar is the same idea sized to a rupee you can lose.",
    kind: "bars",
    bars: [
      { label: "All-in tip", value: 20, note: "Hurts" },
      { label: "Sized, with a stop", value: 4, note: "Survivable" },
    ],
  },
  "goal-based-vs-random": {
    flowTitle: "Give the SIP a job",
    flow: [
      { label: "Name it", detail: "Fees, laptop, emergency. Not “investing”." },
      { label: "Date and rupees", detail: "When, and how much that thing costs then." },
      { label: "Its own SIP", detail: "Short jobs stay safer. Long jobs can hold equity." },
      { label: "Harder to raid", detail: "A named pot is harder to spend on a weekend." },
    ],
    graphTitle: "Two jobs, two mixes",
    graphNote: "Share of the pot that can sit in equity. The emergency fund stays mostly out. Illustration.",
    kind: "bars",
    bars: [
      { label: "Emergency, 18 months", value: 15, note: "Little equity" },
      { label: "Study abroad, 8 years", value: 70, note: "More equity" },
    ],
  },
  "step-up-sip": {
    flowTitle: "Let the stipend do the lifting",
    flow: [
      { label: "Start small", detail: "₹2,000 you will not miss." },
      { label: "Income rises", detail: "Internship or a placement hike." },
      { label: "SIP steps up", detail: "About 10% more next year: ₹2,200." },
      { label: "Habit stays", detail: "You raise the habit, not the risk story." },
    ],
    graphTitle: "Rupees you commit, not a return",
    graphNote: "Blue stays flat. Pale line steps up once a year. This is money in, not money the market owes you.",
    kind: "line",
    lineName: "Flat ₹2,000",
    lineBName: "10% step-up",
    line: [
      { label: "Y1", value: 24 },
      { label: "Y2", value: 48 },
      { label: "Y3", value: 72 },
      { label: "Y4", value: 96 },
    ],
    lineB: [
      { label: "Y1", value: 24 },
      { label: "Y2", value: 50 },
      { label: "Y3", value: 79 },
      { label: "Y4", value: 111 },
    ],
  },
  "inflation-is-the-silent-fee": {
    flowTitle: "Price the goal in future rupees",
    flow: [
      { label: "Today’s price", detail: "The laptop tag you can see now." },
      { label: "Inflation", detail: "The same thing costs more later." },
      { label: "Future bill", detail: "This is the number the SIP must aim at." },
      { label: "Then the SIP", detail: "If it shocks you, extend the date or step up." },
    ],
    graphTitle: "An ₹80,000 laptop, if prices rise 6% a year",
    graphNote: "Each bar is the same laptop one year later. This is a fee sketch, not a quote from a shop.",
    kind: "bars",
    bars: [
      { label: "Today", value: 80, note: "₹80k" },
      { label: "In 1 year", value: 85, note: "₹85k" },
      { label: "In 2 years", value: 90, note: "₹90k" },
      { label: "In 3 years", value: 95, note: "₹95k" },
    ],
  },
  "position-size": {
    flowTitle: "Quantity is a division sum",
    flow: [
      { label: "Rupees at risk", detail: "What you can lose without touching rent." },
      { label: "Stop distance", detail: "Entry minus the price that ends the idea." },
      { label: "Divide", detail: "Shares = risk rupees ÷ rupees of stop." },
      { label: "That many", detail: "Not “as many as the app allows”." },
    ],
    graphTitle: "₹5,000 risk, stop ₹10 away",
    graphNote: "5,000 ÷ 10 = 500 shares. A tighter stop is not “safer” if you then buy far more shares. Illustration.",
    kind: "bars",
    bars: [
      { label: "Risk you chose", value: 5, note: "₹5,000" },
      { label: "Stop distance", value: 10, note: "₹10 / share" },
      { label: "Shares", value: 50, note: "500 shares" },
    ],
  },
  "trade-journal": {
    flowTitle: "Write it before the click",
    flow: [
      { label: "Plan", detail: "Why, entry, stop, target, size." },
      { label: "Fill", detail: "What you actually got, on the paper desk first." },
      { label: "What happened", detail: "The market’s print, not your mood." },
      { label: "One lesson", detail: "A sentence you can use next time." },
    ],
    graphTitle: "Planned loss versus what a journal keeps",
    graphNote: "Without a line written first, every red day feels new. The short bar is the loss you already accepted.",
    kind: "bars",
    bars: [
      { label: "Surprise loss", value: 12, note: "No plan" },
      { label: "Planned risk", value: 5, note: "Written first" },
    ],
  },
};
