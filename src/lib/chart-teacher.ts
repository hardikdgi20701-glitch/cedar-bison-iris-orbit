import type { QuoteBundle } from "./market/types";

export type ChartSnapshot = {
  symbol: string;
  name: string;
  last: number;
  prevClose: number;
  change: number;
  changePct: number;
  currency: string;
  high: number | null;
  low: number | null;
  volume: number | null;
  marketState: string;
  recentCloses: number[];
  pe: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  analysis: string | null;
};

export type ChatTurn = { role: "user" | "assistant"; text: string };

const DISCLAIMER = "Yeh sirf padhai ke liye hai — Chart GPT is not a buy/sell call.";

function money(n: number | null | undefined, currency: string): string {
  if (n == null || !Number.isFinite(n)) return "n/a";
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (currency === "INR") {
    const digits = abs >= 100 ? 2 : 2;
    return `${sign}₹${abs.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
  }
  const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : "";
  return `${sign}${sym || currency + " "}${abs.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function pct(n: number): string {
  if (!Number.isFinite(n)) return "n/a";
  const v = n * 100;
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(2)}%`;
}

function vol(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "n/a";
  const abs = Math.abs(n);
  if (abs >= 1e7) return `${(abs / 1e7).toFixed(2)}Cr`;
  if (abs >= 1e5) return `${(abs / 1e5).toFixed(2)}L`;
  if (abs >= 1e3) return `${(abs / 1e3).toFixed(2)}k`;
  return Math.round(abs).toLocaleString("en-IN");
}

export function snapshotFromBundle(bundle: QuoteBundle): ChartSnapshot {
  const q = bundle.quote;
  return {
    symbol: q.symbol,
    name: q.name,
    last: q.price,
    prevClose: q.previousClose,
    change: q.change,
    changePct: q.changePct,
    currency: q.currency,
    high: q.dayHigh,
    low: q.dayLow,
    volume: q.volume,
    marketState: q.marketState,
    recentCloses: bundle.chart.points.slice(-16).map((p) => p.close),
    pe: bundle.stats.pe,
    fiftyTwoWeekHigh: q.fiftyTwoWeekHigh,
    fiftyTwoWeekLow: q.fiftyTwoWeekLow,
    analysis: bundle.analysis[0] ?? null,
  };
}

export function snapshotContext(snap: ChartSnapshot): string {
  return [
    `Symbol: ${snap.symbol} (${snap.name})`,
    `Last: ${money(snap.last, snap.currency)}  Change: ${pct(snap.changePct)} (${snap.change >= 0 ? "BULL / green" : "BEAR / red"})`,
    `Prev close: ${money(snap.prevClose, snap.currency)}  High: ${snap.high ?? "n/a"}  Low: ${snap.low ?? "n/a"}`,
    `Volume: ${snap.volume ?? "n/a"}  State: ${snap.marketState}`,
    `52w high: ${snap.fiftyTwoWeekHigh ?? "n/a"}  52w low: ${snap.fiftyTwoWeekLow ?? "n/a"}  PE: ${snap.pe ?? "n/a"}`,
    `Recent closes: ${snap.recentCloses.map((n) => n.toFixed(2)).join(", ") || "n/a"}`,
    snap.analysis ? `Desk note: ${snap.analysis}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function welcomeChart(snap: ChartSnapshot): string {
  const side = snap.change >= 0 ? "Bull / green" : "Bear / red";
  const session = snap.marketState === "open" ? "session is live (quotes may be delayed)" : "this is the last close — the floor is shut";
  return [
    `Namaste. Main **Chart GPT** hoon — a chart teacher, not a broker.`,
    `**${snap.name}** last print **${money(snap.last, snap.currency)}** (${side} ${pct(snap.changePct)}). ${session}.`,
    `Ask how to read this picture: candle, trend, support, volume, or how to write a stop. I will not say “ye stock lo”. Green is not a buy. Red is not a sell.`,
    DISCLAIMER,
  ].join("\n\n");
}

type Intent =
  | "buy"
  | "candle"
  | "bull"
  | "support"
  | "volume"
  | "trend"
  | "stop"
  | "pe"
  | "ma"
  | "indicator"
  | "timeframe"
  | "overview"
  | "sip"
  | "hours"
  | "index"
  | "help"
  | "hello"
  | "general";

function intentOf(prompt: string): Intent {
  const p = prompt.toLowerCase();
  if (/(buy|sell|long|short|call option|put option|intrade|intraday tip|sure.?shot|target price|kitna target|ye (le|lo)|entry (do|lo)|exit (do|lo)|recommend)/i.test(p))
    return "buy";
  if (/(hello|hi\b|namaste|hey\b|good (morning|evening)|kaise ho)/i.test(p)) return "hello";
  if (/(kya pooch|help|kya kar sakte|what can you|topics)/i.test(p)) return "help";
  if (/(market hours|kitne baje|holiday|ganesh|open (kab|when)|session|trading hours)/i.test(p)) return "hours";
  if (/(what is nifty|nifty kya|sensex kya|index kya|kya hai (nifty|sensex))/i.test(p)) return "index";
  if (/(sip|mutual fund|lumpsum|goal)/i.test(p)) return "sip";
  if (/(rsi|macd|bollinger|stochastic|supertrend|ichimoku)/i.test(p)) return "indicator";
  if (/(moving average|simple average|\bsma\b|\bema\b|50.?day|200.?day)/i.test(p)) return "ma";
  if (/(timeframe|1d|1 day|1 year|kaunsa chart|which chart|hourly|weekly)/i.test(p)) return "timeframe";
  if (/(pe\b|p\/e|valuation|expensive|sasta|mehnga|eps|book value)/i.test(p)) return "pe";
  if (/(stop[\s-]?loss|stoploss|risk.?reward|position size|kitna risk)/i.test(p)) return "stop";
  if (/(volume|delivery|turnover|kitna trade)/i.test(p)) return "volume";
  if (/(support|resistance|zone|floor|ceiling|breakout)/i.test(p)) return "support";
  if (/(candle|ohlc|wick|shadow|doji|hammer|engulf|body|open.*close)/i.test(p)) return "candle";
  if (/(bull|bear|green|red|up day|down day|colour|color)/i.test(p)) return "bull";
  if (/(trend|higher high|lower low|uptrend|downtrend|sideways)/i.test(p)) return "trend";
  if (/(overview|samjhao|explain this|kya ho raha|what is this|ye chart)/i.test(p)) return "overview";
  return "general";
}

function isFollowUp(prompt: string): boolean {
  const p = prompt.trim().toLowerCase();
  const words = p.split(/\s+/).filter(Boolean);
  if (words.length === 0) return false;
  if (
    /^(haan|han|ha|ok|okay|accha|acha|more|aur|continue|go on|explain|samjhao|detail|example|udaharan|kyun|why|matlab|mtlb|uska|uske|usko|isko|iske|that|this|phir|then|aur batao|zyada|thoda aur)/i.test(
      p,
    )
  )
    return true;
  if (words.length <= 6 && /^(aur|phir|zyada|more|why|kaise|matlab|uska|that|this)\b/.test(p)) return true;
  return false;
}

function lastUserIntent(history: ChatTurn[]): Intent | null {
  for (let i = history.length - 1; i >= 0; i--) {
    const m = history[i];
    if (m?.role === "user") {
      const intent = intentOf(m.text);
      if (intent !== "hello" && intent !== "general") return intent;
    }
  }
  return null;
}

function topicDepth(history: ChatTurn[], intent: Intent): number {
  return history.filter((m) => m.role === "user" && intentOf(m.text) === intent).length;
}

function trendLabel(closes: number[]): { label: string; detail: string } {
  if (closes.length < 4) return { label: "unclear", detail: "Not enough closes on this snapshot to call a trend." };
  const first = closes.slice(0, Math.min(4, Math.floor(closes.length / 2)));
  const last = closes.slice(-Math.min(4, Math.floor(closes.length / 2)));
  const a = first.reduce((s, n) => s + n, 0) / first.length;
  const b = last.reduce((s, n) => s + n, 0) / last.length;
  const move = (b - a) / a;
  if (move > 0.008) return { label: "up", detail: `Recent closes sit about ${pct(move)} above the earlier cluster — a short up-leg on this window, not a lifetime verdict.` };
  if (move < -0.008) return { label: "down", detail: `Recent closes sit about ${pct(move)} below the earlier cluster — a short down-leg on this window, not a lifetime verdict.` };
  return { label: "sideways", detail: "Recent closes are chopping in a tight band. Sideways is a trend too — it means wait, not ‘guess the next tick’." };
}

function rangeNote(snap: ChartSnapshot): string | null {
  if (snap.high == null || snap.low == null || snap.high <= snap.low) return null;
  const span = snap.high - snap.low;
  const pos = (snap.last - snap.low) / span;
  if (pos >= 0.75) return `Last print is near the **top of this bar’s range** (${money(snap.high, snap.currency)} high). Buyers finished in control of the bar — that is history, not a forecast.`;
  if (pos <= 0.25) return `Last print is near the **bottom of this bar’s range** (${money(snap.low, snap.currency)} low). Sellers finished in control of the bar — that is history, not a forecast.`;
  return `Last print sits in the **middle of the range** (${money(snap.low, snap.currency)}–${money(snap.high, snap.currency)}). Neither side ran away with the bar.`;
}

function close(parts: string[]): string {
  return [...parts.filter(Boolean), DISCLAIMER].join("\n\n");
}

function extraDepth(intent: Intent, snap: ChartSnapshot, depth: number): string {
  if (depth < 1) return "";
  const m = (n: number | null | undefined) => money(n, snap.currency);
  const extras: Partial<Record<Intent, string[]>> = {
    candle: [
      `**Next layer.** A hammer (long lower wick, small body near the high) says sellers pushed price down and buyers dragged it back — on this bar that would need a dip toward ${m(snap.low)} then a close near ${m(snap.last)}. An engulfing bar is simply “this body ate the previous body.” Name the four prices before you name the pattern.`,
      "Candles were invented to summarise a period. They are terrible at summarising a 5-year fee goal. If the question is ‘will I have the money’, close this chart and open Goals.",
    ],
    support: [
      "Treat a zone as a **band**, not a rupee. If the low is a number, the zone is a little below and a little above it. A wick through the zone that closes back inside is a test. A close through it is a break — which still fails often enough that a stop exists.",
      "People draw lines because lines feel certain. Markets do not owe your line anything. If you use a zone, write the invalidation (the stop) in the same notebook line.",
    ],
    volume: [
      "A quiet holiday session can print a large percent move on tiny volume. That move is noisier than a 0.4% drift on a busy expiry day. Always ask: ‘was anyone actually here?’",
      "You will not get delivery % on this tape. On a broker app it sits next to volume. High delivery + a trend is a stronger *story*. Still not a buy alarm.",
    ],
    trend: [
      "Three-point check: (1) Are highs rising? (2) Are lows rising? (3) Is the last close still above a rising average of recent closes? If you cannot tick two of three, you do not have an uptrend — you have hope.",
      "A 1-day down bar inside a 1-year uptrend is weather, not climate. Zoom out before you change a SIP.",
    ],
    bull: [
      "TV will call a two-day bounce a ‘bull market’ because it sounds like news. A bull market is measured in months. Your SIP does not need the mascot.",
      "If Nifty is green and this name is red, believe this name. The index is a crowd. Your holding is one seat.",
    ],
    stop: [
      "Stops fail on gaps: the open can jump through your number. That is why size exists. If a 3% gap would ruin the month, the position is too big — or the money did not belong in a stock.",
      "Funds do not have an intraday stop. If this conversation is really about a SIP, the ‘stop’ is: do not raid the folio for a weekend trip.",
    ],
    sip: [
      "A SIP on a red month buys more units. That is the whole trick. It only works if you do not pause because a mascot is frowning.",
      "Write the goal date first. Under 3 years: mostly debt/liquid. 7+ years: an index-fund SIP is the usual classroom start — on a real app. PlanVista does not invest for you.",
    ],
    pe: [
      "Earnings can be one-off (a land sale, a tax credit). A PE built on a one-off profit looks cheap until the one-off disappears. Always ask ‘is this earning repeatable?’",
      "For an index, PE is an average of 50 arguments. It is a temperature, not a buy button.",
    ],
    timeframe: [
      "A useful habit: 1Y first, 1D last. If the year already answers your question, you do not owe the 15-minute chart your evening.",
    ],
    indicator: [
      "If a YouTuber needs RSI, MACD and Supertrend on at once, they are decorating. One overlay is a lens. Five overlays are a costume.",
    ],
    hours: [
      "After 3:30 pm IST you can still *look*. You cannot get a live NSE print. Chart GPT will keep teaching from the last close until the next session.",
    ],
    index: [
      "You do not own Nifty by watching it. You own it only if you buy a Nifty index fund or ETF on a real platform. Watching is free and changes nothing in your folio.",
    ],
    overview: [
      "Read in this order, every time: (1) axes — time and price (2) colour vs previous close (3) where close sits in the day’s range (4) volume (5) only then a pattern name. Skip a step and you are guessing.",
    ],
    buy: [
      "If you still want a ‘call’, here is the only honest one: I will not give it. The skill you actually need is writing a plan you can survive being wrong on — or skipping the stock and funding a named goal.",
    ],
    help: [
      "Try one topic per message. Chart GPT remembers this chat, so ‘volume kya keh raha hai?’ after a candle question is a follow-up, not a new class.",
    ],
  };
  const list = extras[intent];
  if (!list?.length) return "";
  return list[Math.min(depth - 1, list.length - 1)] ?? "";
}

export function teachChart(prompt: string, snap: ChartSnapshot, history: ChatTurn[] = []): string {
  let intent = intentOf(prompt);
  if ((intent === "general" && isFollowUp(prompt)) || (intent === "hello" && history.length > 0 && isFollowUp(prompt))) {
    intent = lastUserIntent(history) ?? "overview";
  }
  const depth = topicDepth(history, intent);
  const more = extraDepth(intent, snap, depth);
  const m = (n: number | null | undefined) => money(n, snap.currency);
  const side = snap.change >= 0 ? "Bull / green" : "Bear / red";
  const trend = trendLabel(snap.recentCloses);
  const range = rangeNote(snap);
  const head = `**${snap.name}** · last **${m(snap.last)}** · ${side} **${pct(snap.changePct)}** vs prev close ${m(snap.prevClose)}.`;

  if (isFollowUp(prompt) && more) {
    return close([head, more]);
  }

  if (intent === "hello") {
    return welcomeChart(snap);
  }

  if (intent === "help") {
    return close([
      head,
      "Chart GPT padhata hai — recommend nahi karta. Useful questions:",
      `- “Aaj ka candle beginner ko kaise padhna hai?”\n- “Trend up hai ya down?”\n- “Support / resistance simple words mein.”\n- “Volume kya keh raha hai?”\n- “Stop-loss kaise likhein if I ever buy a stock?”`,
      "Agar aap SIP / goal ki baat karna chahte ho, PlanVista ke **Goals** aur **SIP** pages use karo. Chart class alag hai.",
      more,
    ]);
  }

  if (intent === "hours") {
    return close([
      head,
      "**NSE and BSE cash market:** about **9:15 am – 3:30 pm IST**, Monday to Friday, except exchange holidays.",
      "Pre-open, post-close and after-hours windows exist for orders, but the last *print* you study in class is still the session close. This snapshot’s state: **" +
        snap.marketState +
        "**.",
      "If the floor is shut (weekend, or a holiday such as Ganesh Chaturthi), Chart GPT teaches from the **last close**. That number does not update until the next session. Refresh still re-fetches — it will not invent a Sunday tick.",
      more,
    ]);
  }

  if (intent === "index") {
    return close([
      head,
      "**Nifty 50** is NSE’s 50-stock large-cap scoreboard. **Sensex** is BSE’s 30-stock scoreboard. They usually rhyme; they are not the same list.",
      "An index is not a company. You cannot ‘buy Nifty’ as a share. You buy a **Nifty index fund or ETF** that holds the same names in similar weights — on a real app. PlanVista does not place that order.",
      `This snapshot is **${snap.name}**. A 1% day on Nifty is loud. A 2% day is very loud. One loud day is still not your personal report card.`,
      more,
    ]);
  }

  if (intent === "buy") {
    return close([
      head,
      "**No.** Chart GPT will not tell you to buy or sell this name — not as a tip, not as a ‘study call’, not as a target price.",
      "If you ever write a trade plan (many beginners never need to), you write it *before* the order:",
      `- Entry: the price you are willing to pay, not ‘whatever the screen shows’.\n- Stop-loss: the price where the idea is wrong. Example shape: if last is ${m(snap.last)}, a 3% stop is near ${m(snap.last * 0.97)} — that is arithmetic, not a recommendation.\n- Target: where you planned to take profit. Risk ₹1 to aim for ₹2 is a common teaching ratio.\n- Size: lose-able money only. Rent, fees and emergency cash stay out.`,
      "A market order fills at the available price (can slip). A limit order waits. Delivery is slower and calmer than intraday.",
      more,
    ]);
  }

  if (intent === "candle") {
    return close([
      head,
      "**A candle is four prices for one period: Open, High, Low, Close (OHLC).** The thick body is open→close. The thin wicks are the extreme high and low. Green usually means buyers won that bar. Red means sellers won.",
      range ?? "Day high / low is missing on this snapshot, so the wick length is unknown.",
      "A long lower wick: price dipped, then buyers pushed it back. A long upper wick: price spiked, then sellers pushed it down. A tiny body (doji) is indecision. Patterns describe what already happened — they do not promise Monday.",
      more,
    ]);
  }

  if (intent === "bull") {
    return close([
      head,
      `On PlanVista, **Bull / green** only means the last print is above the previous close. **Bear / red** means it is below. Today that label is **${side}**.`,
      "A bull *market* is a long stretch of rising prices. One green day is not a bull market. One red day is not a crash. TV will shout either way.",
      "Both animals can be in the room: Nifty up, your stock down. Always read the name in front of you, not only the index mascot.",
      "Green today ≠ buy. Red today ≠ sell everything. Your goal date matters more than this colour.",
      more,
    ]);
  }

  if (intent === "support") {
    const lo = snap.low ?? Math.min(...snap.recentCloses, snap.last);
    const hi = snap.high ?? Math.max(...snap.recentCloses, snap.last);
    return close([
      head,
      "**Support** is a zone where price paused or bounced before — a floor people *remember*, not a wall. **Resistance** is a ceiling people remember. Prices break both all the time.",
      `On this snapshot, a first teaching map is:\n- Near-term floor to watch: around **${m(lo)}** (today’s / window low).\n- Near-term ceiling to watch: around **${m(hi)}** (today’s / window high).\n- Prev close **${m(snap.prevClose)}** is another magnet — traders mark it because it is the last settled number.`,
      range ?? "",
      "A ‘breakout’ that fails is a false breakout — common, and why stops exist. Zones are not buy/sell buttons.",
      more,
    ]);
  }

  if (intent === "volume") {
    return close([
      head,
      `Volume on this print: **${vol(snap.volume)}**. Volume is how many shares (or index units) changed hands — the crowd’s footprint.`,
      "A rising price on rising volume is a stronger *story* than a rising price on sleepy volume. The opposite is also true: a fall on heavy volume is louder than a fall on a holiday whisper.",
      "Delivery % (not on this tape) tells you how much of that volume actually went into demat instead of being squared off the same day. High delivery can mean longer-term hands. It is still not a crystal ball.",
      "SIP investors: glance at volume when you study a stock. Do not refresh it every minute.",
      more,
    ]);
  }

  if (intent === "trend") {
    return close([
      head,
      `**Trend on this window: ${trend.label}.** ${trend.detail}`,
      "A real uptrend makes higher highs and higher lows. A downtrend makes lower highs and lower lows. If you cannot say that in one sentence, you do not have a trend — you have noise.",
      range ?? "",
      "Zoom out before you trust a 1-day squiggle. A 1-year line answers ‘where did we come from?’ A 1-day line answers ‘what did the last session do?’ They are different questions.",
      more,
    ]);
  }

  if (intent === "stop") {
    const stop3 = snap.last * 0.97;
    const tgt6 = snap.last * 1.06;
    return close([
      head,
      "A stop-loss is a **written plan for the maximum loss you will accept**. It is not a promise of that exact fill — prices can gap through a stop.",
      `Teaching arithmetic only (not a trade):\n- Last print ${m(snap.last)}.\n- A 3% invalidation sits near **${m(stop3)}**.\n- A 1:2 sketch would place a 6% target near **${m(tgt6)}**.\n- If you can only afford to lose ₹1,500, shares ≈ 1500 ÷ (last − stop). Do the sum before you tap Buy.`,
      "Beginners: prefer delivery and funds over intraday. Many students never need a stock stop at all — a SIP in an index fund has no ‘intraday stop’.",
      more,
    ]);
  }

  if (intent === "pe") {
    return close([
      head,
      snap.pe != null
        ? `This snapshot’s P/E is **${snap.pe.toFixed(1)}**. P/E = price ÷ earnings per share. It is a valuation snapshot, not a grade.`
        : "P/E is not on this snapshot. Without earnings, do not invent a number.",
      "A high PE can mean ‘people expect growth’ or ‘the stock is expensive’. A low PE can mean ‘cheap’ or ‘the business is in trouble’. Always compare with the **same sector** and with the stock’s own history.",
      snap.fiftyTwoWeekHigh != null && snap.fiftyTwoWeekLow != null
        ? `52-week range: **${m(snap.fiftyTwoWeekLow)} – ${m(snap.fiftyTwoWeekHigh)}**. Last print vs that range tells you where the year sat — not whether you should buy.`
        : "",
      "For a student SIP, asset mix and the goal date beat a single PE from a reel.",
      more,
    ]);
  }

  if (intent === "ma") {
    const closes = snap.recentCloses;
    const sma = closes.length ? closes.reduce((s, n) => s + n, 0) / closes.length : null;
    return close([
      head,
      "A moving average is just the average of past closes. It **lags**, which is the point: it smooths noise so you can see the drift.",
      sma != null
        ? `On this short window the average of recent closes is about **${m(sma)}**. Last print is ${snap.last >= sma ? "above" : "below"} that mini-average. That is a tiny sample — a real 50-day or 200-day average needs 50 or 200 daily closes, not this strip.`
        : "Not enough closes here to sketch an average.",
      "Price above a rising 200-day line is a common ‘long-term up’ cartoon. It still fails. Do not treat a crossover as a buy alarm.",
      more,
    ]);
  }

  if (intent === "indicator") {
    return close([
      head,
      "**RSI, MACD, Supertrend and friends are extra layers.** If you cannot yet read Open-High-Low-Close, they will only decorate a guess.",
      "RSI (relative strength) asks ‘how stretched is this move?’ — a high RSI is not automatically ‘sell’, a low RSI is not automatically ‘buy’. MACD is two moving averages arguing with each other.",
      "Learn OHLC, volume, and a written stop first. Indicators can wait. Chart GPT will not give you a secret RSI setting that prints money.",
      more,
    ]);
  }

  if (intent === "timeframe") {
    return close([
      head,
      "**Pick the chart that matches the question.**",
      `- 1D / 5D: ‘What did the last session do?’ Useful for reading a candle. Useless for a 5-year fee goal.\n- 1M / 6M: the recent mood.\n- 1Y / 5Y: where the name actually came from. This is the student default if you insist on looking at a stock.\n- Intraday minutes: a sport, not a beginner classroom.`,
      `This snapshot is a short window on **${snap.name}**. If you came here because of a SIP, zoom out — or close the chart and open the Goals page.`,
      more,
    ]);
  }

  if (intent === "sip") {
    return close([
      head,
      "Chart class and SIP class are neighbours, not the same room.",
      "A SIP buys fund units on a schedule. You do not need to read this candle to start ₹500 a month in a Nifty index fund (on a real app — PlanVista does not invest for you).",
      "If this chart is red, a running SIP simply buys more units that month. That is rupee-cost averaging — a habit, not a guarantee.",
      "Use **Goals** to name the job (fees, laptop, emergency) and **SIP** to size the debit. Come back to Chart GPT when you want to *read* a picture, not when you want a tip.",
      more,
    ]);
  }

  return close([
    head,
    snap.analysis ? snap.analysis : "Read the last move as history. The colour is the last print versus the previous close — nothing more.",
    `**How a beginner reads this picture**\n- Colour: ${side}. That is the last bar’s result.\n- Trend on this window: ${trend.label}. ${trend.detail}\n- ${range ?? "High/low of the bar is missing — so we do not invent wicks."}\n- Volume: ${vol(snap.volume)}.`,
    more || "If you only remember one line: a chart is a history lesson, not a fortune cookie. Ask a follow-up — candle, support, volume, or how to write a stop.",
  ]);
}

export function followUps(prompt: string, history: ChatTurn[] = []): string[] {
  let intent = intentOf(prompt);
  if (intent === "general" && isFollowUp(prompt)) intent = lastUserIntent(history) ?? "overview";
  const all: Record<Intent, string[]> = {
    buy: ["Stop-loss kaise likhein?", "Delivery aur intraday mein farak?", "SIP se shuru karna better hai kya?"],
    candle: ["Wick lamba ho to kya?", "Trend up hai ya down?", "Volume kya keh raha hai?"],
    bull: ["Ek red day crash hota hai kya?", "1-year chart kab dekhein?", "Support / resistance simple words mein."],
    support: ["False breakout kya hota hai?", "Stop-loss kaise likhein?", "Is candle ko kaise padhein?"],
    volume: ["Delivery % kya hota hai?", "Trend ke saath volume kaise padhein?", "Bull hai ya bear — last close se?"],
    trend: ["Kaunsa timeframe dekhein?", "Moving average kya hota hai?", "Support / resistance kahan?"],
    stop: ["Position size kaise nikaalein?", "Market vs limit order?", "Chart GPT buy/sell kyun nahi deta?"],
    pe: ["52-week range kaise padhein?", "Index fund pehle kyun?", "Trend is window pe kya hai?"],
    ma: ["50-day vs 200-day?", "Indicators abhi skip karein?", "Trend simple words mein."],
    indicator: ["Pehle OHLC kaise padhein?", "Volume kya keh raha hai?", "RSI ko buy alarm kyun nahi maanenge?"],
    timeframe: ["1D candle kaise padhein?", "SIP ke liye chart chahiye kya?", "Trend 1Y pe alag ho sakta hai?"],
    overview: ["Candle beginner ko kaise padhna hai?", "Support / resistance samjhao", "Volume kya keh raha hai?"],
    sip: ["Goal ke bina SIP kyun kamzor hai?", "Red market mein SIP chalu rakhein?", "Index fund pehle kyun?"],
    hours: ["Last close kyon use karte ho?", "1D vs 1Y kab dekhein?", "Holiday pe SIP rukta hai kya?"],
    index: ["Nifty ko kaise buy karte hain?", "Sensex alag kyun hai?", "Index fund pehle kyun?"],
    help: ["Aaj ka candle kaise padhein?", "Bull hai ya bear?", "Stop-loss kaise likhein?"],
    hello: ["Aaj ka candle kaise padhein?", "Bull hai ya bear?", "Support / resistance samjhao"],
    general: ["Candle kaise padhein?", "Trend kya hai?", "Stop-loss kaise likhein?"],
  };
  return all[intent];
}

