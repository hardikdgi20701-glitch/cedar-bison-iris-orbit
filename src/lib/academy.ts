export type LevelId = "beginner" | "intermediate" | "advanced" | "expert";

export type AcademyLevel = {
  id: LevelId;
  title: string;
  blurb: string;
  slugs: string[];
};

export const ACADEMY: AcademyLevel[] = [
  {
    id: "beginner",
    title: "Beginner",
    blurb: "What a share is, how a SIP works, and how an order actually sits on the exchange.",
    slugs: ["what-is-a-share", "what-is-a-sip", "demat-and-orders", "nifty-sensex", "sebi-guidelines-basics"],
  },
  {
    id: "intermediate",
    title: "Intermediate",
    blurb: "Read a candle, a trend, a stop, and why green is not a buy.",
    slugs: ["how-to-read-candles", "how-to-read-graphs", "bull-vs-bear", "stop-loss-and-target", "risk-for-students", "index-funds-first"],
  },
  {
    id: "advanced",
    title: "Advanced",
    blurb: "Timeframes, indicators, market stats, and the mistakes that wipe a first account.",
    slugs: ["which-timeframe", "indicators-later", "using-chart-gpt", "reading-market-stats", "first-mistakes", "goal-based-vs-random"],
  },
  {
    id: "expert",
    title: "Expert",
    blurb: "Size the order, write the plan, and practise the fill on the paper desk — still not a tip.",
    slugs: ["step-up-sip", "inflation-is-the-silent-fee", "position-size", "trade-journal"],
  },
];

export function levelProgress(read: string[], slugs: string[]) {
  const done = slugs.filter((s) => read.includes(s)).length;
  return { done, total: slugs.length, pct: slugs.length ? done / slugs.length : 0 };
}

/** Every lesson stays open. Progress is a record of what you have read, not a lock. */
export function unlockedLevel(_read: string[], _index: number) {
  return true;
}
