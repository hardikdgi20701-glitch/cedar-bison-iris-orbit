import type { ChartPoint, QuoteBundle } from "@/lib/market/types";

export type DeskLang = "en" | "hi";

export type XrayBrief = {
  support: number;
  resistance: number;
  invalidation: number;
  breakout: string;
  volumeNote: string;
  rsi: number | null;
  sma20: number | null;
  sma50: number | null;
  macd: string;
  stoch: number | null;
  pivot: number | null;
  midpoint: number | null;
  rr: number | null;
  score: number;
  planReason: string;
  why: string;
  weekSupport: number;
  weekResistance: number;
  weekEvent: string;
};

function avg(xs: number[]) {
  if (!xs.length) return null;
  return xs.reduce((s, n) => s + n, 0) / xs.length;
}

function rsi(closes: number[], period = 14) {
  if (closes.length <= period) return null;
  let gains = 0;
  let losses = 0;
  for (let i = closes.length - period; i < closes.length; i++) {
    const d = closes[i]! - closes[i - 1]!;
    if (d >= 0) gains += d;
    else losses -= d;
  }
  if (losses === 0) return 100;
  const rs = gains / losses;
  return 100 - 100 / (1 + rs);
}

function ema(closes: number[], period: number) {
  if (closes.length < period) return null;
  const k = 2 / (period + 1);
  let prev = avg(closes.slice(0, period))!;
  for (let i = period; i < closes.length; i++) prev = closes[i]! * k + prev * (1 - k);
  return prev;
}

export function buildXray(bundle: QuoteBundle, lang: DeskLang): XrayBrief {
  const pts = bundle.chart.points.filter((p) => Number.isFinite(p.close));
  const q = bundle.quote;
  const closes = pts.map((p) => p.close);
  const last = q.price || closes[closes.length - 1] || 0;
  const window = pts.slice(-20);
  const hi = window.length ? Math.max(...window.map((p) => p.high ?? p.close)) : last;
  const lo = window.length ? Math.min(...window.map((p) => p.low ?? p.close)) : last;
  const week = pts.slice(-5);
  const weekHi = week.length ? Math.max(...week.map((p) => p.high ?? p.close)) : hi;
  const weekLo = week.length ? Math.min(...week.map((p) => p.low ?? p.close)) : lo;
  const support = lo;
  const resistance = hi;
  const invalidation = support > 0 ? support * 0.997 : support;
  const nearBreak = resistance > 0 && last >= resistance * 0.985 && last <= resistance * 1.01;
  const rsiV = rsi(closes);
  const sma20 = closes.length >= 20 ? avg(closes.slice(-20)) : null;
  const sma50 = closes.length >= 50 ? avg(closes.slice(-50)) : null;
  const ema12 = ema(closes, 12);
  const ema26 = ema(closes, 26);
  const macd = ema12 != null && ema26 != null ? ema12 - ema26 : null;
  const recent = pts.slice(-14);
  const rh = recent.length ? Math.max(...recent.map((p) => p.high ?? p.close)) : last;
  const rl = recent.length ? Math.min(...recent.map((p) => p.low ?? p.close)) : last;
  const stoch = rh > rl ? ((last - rl) / (rh - rl)) * 100 : null;
  const bar = pts[pts.length - 1] as ChartPoint | undefined;
  const pivot = bar ? ((bar.high ?? last) + (bar.low ?? last) + last) / 3 : null;
  const span = Math.max(...pts.map((p) => p.high ?? p.close)) - Math.min(...pts.map((p) => p.low ?? p.close));
  const mid =
    pts.length > 2
      ? (Math.max(...pts.map((p) => p.high ?? p.close)) + Math.min(...pts.map((p) => p.low ?? p.close))) / 2
      : null;
  const vol = q.volume;
  const avgVol = bundle.stats.avgVolume;
  const volRatio = vol && avgVol ? vol / avgVol : null;
  const reward = Math.max(0, resistance - last);
  const risk = Math.max(0.01, last - invalidation);
  const rr = last > invalidation ? reward / risk : null;

  let score = 40;
  if (sma20 && last > sma20) score += 15;
  if (sma50 && last > sma50) score += 10;
  if (rsiV != null && rsiV >= 40 && rsiV <= 65) score += 15;
  if (rsiV != null && (rsiV > 75 || rsiV < 25)) score -= 10;
  if (volRatio != null && volRatio > 1.2) score += 10;
  if (resistance > support && (last - support) / (resistance - support) < 0.45) score += 10;
  score = Math.max(5, Math.min(95, Math.round(score)));

  const hiLang = lang === "hi";
  const breakout = nearBreak
    ? hiLang
      ? "Aakhri print resistance ke paas hai. Breakout tab maana jaaye jab close us level ke upar rahe — usse pehle nahi."
      : "The last print is near resistance. A breakout is only a close above that level, not a touch."
    : hiLang
      ? "Abhi breakout zone nahi. Price support aur resistance ke beech hai."
      : "No breakout zone right now. Price is between support and resistance.";

  const volumeNote =
    volRatio == null
      ? hiLang
        ? "Volume ki tulna ke liye average nahi mila."
        : "No average volume on this snapshot, so the bar is unread."
      : volRatio > 1.3
        ? hiLang
          ? `Volume average se ${(volRatio).toFixed(1)}× hai. Move mein log hain — direction alag sawaal hai.`
          : `Volume is ${volRatio.toFixed(1)}× its average. People showed up. Direction is a separate question.`
        : hiLang
          ? "Volume ordinary hai. Badi candle bhi shor ho sakti hai."
          : "Volume is ordinary. A loud candle can still be noise.";

  const planReason = hiLang
    ? `Idea tab galat hai jab last print ${invalidation.toFixed(2)} ke neeche band ho. Reward/risk is window par ${rr == null ? "—" : rr.toFixed(1)} hai. Score ${score}/100 ek padhai hai, munafa ka vaada nahi.`
    : `The idea is wrong if the last print closes under ${invalidation.toFixed(2)}. Reward versus that risk is ${rr == null ? "—" : rr.toFixed(1)} on this window. The ${score}/100 score is a reading, not odds of profit.`;

  const headline = bundle.news[0]?.title;
  const move = Math.abs(q.changePct);
  const why = hiLang
    ? move < 0.004
      ? "Move chhota hai. Zyadatar yeh shor hota hai, koi badi khabar nahi."
      : headline
        ? `Feed ki pehli headline: “${headline}”. Yeh wajah ho sakti hai, ya sirf saath-saath chhapi khabar. Band karne se pehle dekho ke volume bhi saath hai ya nahi.`
        : "Is snapshot par koi taaza headline nahi mili. Candle akeli wajah nahi hoti."
    : move < 0.004
      ? "The move is small. That is usually noise, not a story."
      : headline
        ? `First headline in the feed: “${headline}”. It might be the driver, or just a story printed next to the move. Check whether volume agrees before you exit.`
        : "No fresh headline on this snapshot. A candle by itself is not a reason.";

  const weekEvent = headline
    ? hiLang
      ? `Is hafte ki feed mein sabse upar: “${headline}”. Gap isi se badal sakta hai — ya nahi bhi.`
      : `Top of this week’s feed: “${headline}”. That is the event that could change the gap — or not.`
    : hiLang
      ? "Koi ek event headline par nahi hai. Gap ko khabar maan kar trade mat likho."
      : "No single event is sitting on the headline. Do not invent a gap story.";

  return {
    support,
    resistance,
    invalidation,
    breakout,
    volumeNote,
    rsi: rsiV,
    sma20,
    sma50,
    macd: macd == null ? "—" : macd >= 0 ? (hiLang ? "MACD upar" : "MACD above zero") : hiLang ? "MACD neeche" : "MACD below zero",
    stoch,
    pivot,
    midpoint: mid && span > 0 ? mid : null,
    rr,
    score,
    planReason,
    why,
    weekSupport: weekLo,
    weekResistance: weekHi,
    weekEvent,
  };
}

export type ParsedPosition = {
  qty: number | null;
  name: string;
  entry: number | null;
  raw: string;
};

export function parsePosition(raw: string): ParsedPosition | null {
  const text = raw.trim();
  if (text.length < 2) return null;
  const m = text.match(/(\d[\d,]*)\s+([A-Za-z][A-Za-z0-9&.\- ]{1,32}?)\s+(?:at|@)\s+₹?\s*([\d,.]+)/i);
  if (m) {
    return {
      qty: Number(m[1]!.replace(/,/g, "")),
      name: m[2]!.trim(),
      entry: Number(m[3]!.replace(/,/g, "")),
      raw: text,
    };
  }
  const loose = text.match(/([A-Za-z][A-Za-z0-9&.\- ]{1,32})/);
  if (!loose) return null;
  return { qty: null, name: loose[1]!.trim(), entry: null, raw: text };
}

export function positionNote(pos: ParsedPosition, last: number, support: number, lang: DeskLang) {
  const hi = lang === "hi";
  if (pos.entry == null || !last) {
    return hi
      ? "Naam mil gaya. Entry price likho, jaise: 1200 RELIANCE at 1258"
      : "Name noted. Add an entry, like: 1200 RELIANCE at 1258";
  }
  const pnl = pos.qty ? (last - pos.entry) * pos.qty : last - pos.entry;
  const side = pnl >= 0 ? (hi ? "aage" : "ahead") : hi ? "peeche" : "behind";
  const wrong = hi
    ? `Idea tab galat hai jab last print support ${support.toFixed(2)} ke neeche band ho.`
    : `The idea is wrong if the last print closes under support at ${support.toFixed(2)}.`;
  const money = hi
    ? `${pos.qty ?? 1} ka farq ab ${side} hai.`
    : `${pos.qty ?? "The"} position is ${side} of the entry.`;
  return `${money} ${wrong}`;
}
