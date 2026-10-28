import type {
  Allocation,
  FundTip,
  Goal,
  GoalPlan,
  PlanResult,
  Profile,
  RiskProfile,
  YearPoint,
} from "./types";

const EQUITY_RET = 0.12;
const HYBRID_RET = 0.1;
const DEBT_RET = 0.07;
const GOLD_RET = 0.08;
const EQUITY_VOL = 0.18;
const HYBRID_VOL = 0.1;
const DEBT_VOL = 0.03;
const GOLD_VOL = 0.12;

const ALLOC: Record<RiskProfile, Record<string, Allocation>> = {
  conservative: {
    short: { equity: 0.2, hybrid: 0.2, debt: 0.55, gold: 0.05 },
    medium: { equity: 0.35, hybrid: 0.25, debt: 0.35, gold: 0.05 },
    long: { equity: 0.5, hybrid: 0.2, debt: 0.25, gold: 0.05 },
  },
  moderate: {
    short: { equity: 0.3, hybrid: 0.25, debt: 0.4, gold: 0.05 },
    medium: { equity: 0.5, hybrid: 0.2, debt: 0.25, gold: 0.05 },
    long: { equity: 0.7, hybrid: 0.1, debt: 0.15, gold: 0.05 },
  },
  aggressive: {
    short: { equity: 0.45, hybrid: 0.2, debt: 0.3, gold: 0.05 },
    medium: { equity: 0.65, hybrid: 0.15, debt: 0.15, gold: 0.05 },
    long: { equity: 0.8, hybrid: 0.1, debt: 0.05, gold: 0.05 },
  },
};

const FUNDS: Record<keyof Allocation, { name: string; why: string }[]> = {
  equity: [
    {
      name: "Nifty 50 Index Fund (Direct)",
      why: "Broad large-cap market at low cost — a simple core holding.",
    },
    {
      name: "Flexi Cap Fund (Direct)",
      why: "Manager can shift across large/mid/small as markets change.",
    },
  ],
  hybrid: [
    {
      name: "Balanced Advantage / Dynamic Asset Allocation",
      why: "Automatically trims equity when expensive — useful for medium goals.",
    },
    {
      name: "Aggressive Hybrid Fund",
      why: "Equity-tilted mix with a debt cushion for 3–7 year goals.",
    },
  ],
  debt: [
    {
      name: "Liquid / Overnight Fund",
      why: "Park near-term money (fees, emergency) with high liquidity.",
    },
    {
      name: "Short Duration Debt Fund",
      why: "Slightly higher yield than liquid for 1–3 year goals.",
    },
  ],
  gold: [
    {
      name: "Gold ETF / Gold FoF",
      why: "Small diversifier; not a growth engine for student goals.",
    },
  ],
};

export function horizonBucket(years: number): "short" | "medium" | "long" {
  if (years < 3) return "short";
  if (years < 7) return "medium";
  return "long";
}

export function allocationFor(
  risk: RiskProfile,
  years: number,
  category: string,
): Allocation {
  let r = risk;
  let y = years;
  if (category === "emergency") {
    r = "conservative";
    y = Math.min(years, 2);
  }
  return { ...ALLOC[r][horizonBucket(y)] };
}

export function blendedReturn(a: Allocation): number {
  return a.equity * EQUITY_RET + a.hybrid * HYBRID_RET + a.debt * DEBT_RET + a.gold * GOLD_RET;
}

export function blendedVol(a: Allocation): number {
  return a.equity * EQUITY_VOL + a.hybrid * HYBRID_VOL + a.debt * DEBT_VOL + a.gold * GOLD_VOL;
}

function projectCorpus(
  startSip: number,
  n: number,
  r: number,
  stepUp: number,
  existing: number,
): number {
  let corpus = existing;
  let sip = startSip;
  for (let m = 0; m < n; m++) {
    corpus = corpus * (1 + r) + sip;
    if ((m + 1) % 12 === 0) sip *= 1 + stepUp;
  }
  return corpus;
}

export function requiredSip(
  target: number,
  n: number,
  r: number,
  stepUp: number,
  existing: number,
): number {
  const grown = existing * (1 + r) ** n;
  const remaining = target - grown;
  if (remaining <= 0 || n <= 0) return 0;
  if (Math.abs(r) < 1e-12 && stepUp <= 0) return remaining / n;
  let lo = 0;
  let hi = Math.max(remaining, 1);
  for (let i = 0; i < 40; i++) {
    if (projectCorpus(hi, n, r, stepUp, existing) >= target) break;
    hi *= 2;
  }
  for (let i = 0; i < 48; i++) {
    const mid = (lo + hi) / 2;
    if (projectCorpus(mid, n, r, stepUp, existing) < target) lo = mid;
    else hi = mid;
  }
  return hi;
}

function yearlyPath(
  startSip: number,
  years: number,
  annualR: number,
  stepUp: number,
  existing: number,
): YearPoint[] {
  const n = Math.max(1, Math.round(years * 12));
  const r = annualR / 12;
  let corpus = existing;
  let sip = startSip;
  let invested = existing;
  const rows: YearPoint[] = [{ year: 0, sip, corpus, invested }];
  for (let m = 0; m < n; m++) {
    corpus = corpus * (1 + r) + sip;
    invested += sip;
    if ((m + 1) % 12 === 0) {
      sip *= 1 + stepUp;
      rows.push({ year: (m + 1) / 12, sip, corpus, invested });
    }
  }
  if (n % 12 !== 0) rows.push({ year: n / 12, sip, corpus, invested });
  return rows;
}

function sparkline(
  startSip: number,
  years: number,
  annualR: number,
  stepUp: number,
  existing: number,
  points = 24,
): number[] {
  const n = Math.max(1, Math.round(years * 12));
  const r = annualR / 12;
  let corpus = existing;
  let sip = startSip;
  const series = [corpus];
  const step = Math.max(1, Math.floor(n / points));
  for (let m = 0; m < n; m++) {
    corpus = corpus * (1 + r) + sip;
    if ((m + 1) % 12 === 0) sip *= 1 + stepUp;
    if ((m + 1) % step === 0 || m === n - 1) series.push(corpus);
  }
  return series;
}

function gauss(rng: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function mulberry32(a: number): () => number {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function monteCarlo(
  startSip: number,
  n: number,
  annualR: number,
  vol: number,
  stepUp: number,
  existing: number,
  target: number,
  paths = 400,
  seed = 42,
): { successRate: number; p10: number; p50: number; p90: number } {
  const rng = mulberry32(seed);
  const mu = annualR / 12;
  const sig = vol / Math.sqrt(12);
  const finals: number[] = [];
  let hits = 0;
  for (let p = 0; p < paths; p++) {
    let corpus = existing;
    let sip = startSip;
    for (let m = 0; m < n; m++) {
      corpus = corpus * (1 + (mu + sig * gauss(rng))) + sip;
      if ((m + 1) % 12 === 0) sip *= 1 + stepUp;
    }
    finals.push(corpus);
    if (corpus >= target) hits++;
  }
  finals.sort((a, b) => a - b);
  return {
    successRate: hits / paths,
    p10: finals[Math.floor(0.1 * (paths - 1))] ?? 0,
    p50: finals[Math.floor(0.5 * (paths - 1))] ?? 0,
    p90: finals[Math.floor(0.9 * (paths - 1))] ?? 0,
  };
}

function explain(
  goal: Goal,
  alloc: Allocation,
  annualR: number,
  sip: number,
  surplus: number,
): string {
  const years = goal.years;
  const bucket = horizonBucket(years);
  const eq = Math.round(alloc.equity * 100);
  let why: string;
  if (goal.category === "emergency") {
    why =
      "Emergency money should stay mostly in debt so you can use it without selling in a crash.";
  } else if (bucket === "short") {
    why = `With only ${years.toFixed(1)} years, markets may not recover from a dip — so equity is capped at ${eq}%.`;
  } else if (bucket === "long") {
    why = `${years.toFixed(0)} years is long enough for equity (${eq}%) to be the growth engine; inflation is the bigger risk.`;
  } else {
    why = `A ${years.toFixed(0)}-year horizon uses a blended mix (${eq}% equity) so growth and stability share the job.`;
  }
  if (surplus > 0 && sip > surplus) {
    why +=
      " Required SIP is above your monthly surplus — trim the goal, extend the timeline, or add a step-up.";
  } else if (surplus > 0) {
    why += ` Assumed long-run blended return is ${(annualR * 100).toFixed(1)}% (illustrative, not a guarantee).`;
  }
  return why;
}

export function planGoal(goal: Goal, risk: RiskProfile, surplus: number, runMc = true): GoalPlan {
  const years = Math.max(0.25, goal.years);
  const inflation = goal.inflation ?? 0.06;
  const alloc = allocationFor(risk, years, goal.category);
  const annualR = blendedReturn(alloc);
  const vol = blendedVol(alloc);
  const fv = goal.todayCost * (1 + inflation) ** years;
  const n = Math.max(1, Math.round(years * 12));
  const rM = annualR / 12;
  const sip = requiredSip(fv, n, rM, goal.stepUp, goal.existing);
  const used = goal.monthlySipOverride ?? sip;
  const path = yearlyPath(used, years, annualR, goal.stepUp, goal.existing);
  const last = path[path.length - 1]!;
  const equalSave = n ? fv / n : fv;
  const funds: FundTip[] = [];
  (Object.keys(alloc) as (keyof Allocation)[]).forEach((k) => {
    if (alloc[k] <= 0) return;
    FUNDS[k].forEach((f) => funds.push({ ...f, sleeve: k, weight: alloc[k] }));
  });
  let afford: GoalPlan["affordability"] = "comfortable";
  if (surplus > 0) {
    if (sip > surplus * 0.9) afford = "stretch";
    else if (sip > surplus * 0.5) afford = "tight";
  }
  const mc = runMc ? monteCarlo(used, n, annualR, vol, goal.stepUp, goal.existing, fv) : null;
  return {
    id: goal.id,
    futureCost: fv,
    requiredSip: sip,
    usedSip: used,
    totalInvested: last.invested,
    projectedCorpus: last.corpus,
    expectedReturn: annualR,
    volatility: vol,
    allocation: alloc,
    funds,
    yearly: path,
    spark: sparkline(used, years, annualR, goal.stepUp, goal.existing),
    affordability: afford,
    successRate: mc?.successRate ?? null,
    p10: mc?.p10 ?? null,
    p50: mc?.p50 ?? null,
    p90: mc?.p90 ?? null,
    equalMonthlySaving: equalSave,
    sipVsSavingPct: equalSave ? ((equalSave - sip) / equalSave) * 100 : 0,
    explanation: explain(goal, alloc, annualR, sip, surplus),
    horizon: horizonBucket(years),
    months: n,
  };
}

export function planAll(profile: Profile, goals: Goal[], monteCarlo = true): PlanResult {
  const planned = goals.map((g) => planGoal(g, profile.risk, profile.monthlySurplus, monteCarlo));
  const monthlySip = planned.reduce((s, p) => s + p.requiredSip, 0);
  return {
    engine: "local",
    goals: planned,
    totals: {
      monthlySip,
      surplus: profile.monthlySurplus,
      gap: monthlySip - profile.monthlySurplus,
      utilization: profile.monthlySurplus ? monthlySip / profile.monthlySurplus : null,
    },
  };
}

export const QUIZ: {
  id: string;
  q: string;
  options: { label: string; score: number }[];
}[] = [
  {
    id: "horizon",
    q: "When do you need most of this money?",
    options: [
      { label: "Within 2 years (fees, laptop, trip)", score: 0 },
      { label: "3–5 years (degree, first job buffer)", score: 1 },
      { label: "6+ years (higher studies, seed capital)", score: 2 },
    ],
  },
  {
    id: "drop",
    q: "If your SIP corpus fell 20% in a bad year, you would…",
    options: [
      { label: "Stop SIPs and move to a savings account", score: 0 },
      { label: "Pause and wait it out", score: 1 },
      { label: "Keep going — maybe even increase the SIP", score: 2 },
    ],
  },
  {
    id: "exp",
    q: "How much investing have you done so far?",
    options: [
      { label: "None — this is my first plan", score: 0 },
      { label: "A little (PPF, RD, or one mutual fund)", score: 1 },
      { label: "I already run SIPs or hold index funds", score: 2 },
    ],
  },
  {
    id: "income",
    q: "How stable is the money you can invest each month?",
    options: [
      { label: "It changes a lot (gigs / pocket money)", score: 0 },
      { label: "Mostly steady internship or allowance", score: 1 },
      { label: "Predictable stipend or part-time salary", score: 2 },
    ],
  },
  {
    id: "emergency",
    q: "Do you already have 2–3 months of expenses set aside?",
    options: [
      { label: "Not yet", score: 0 },
      { label: "Working on it", score: 1 },
      { label: "Yes, in a liquid/savings account", score: 2 },
    ],
  },
  {
    id: "priority",
    q: "What matters more for these student goals?",
    options: [
      { label: "Not losing money", score: 0 },
      { label: "A balance of growth and sleep-at-night", score: 1 },
      { label: "Beating inflation, even if the path is bumpy", score: 2 },
    ],
  },
  {
    id: "lock",
    q: "Can this money stay invested until the goal date?",
    options: [
      { label: "I might need it earlier", score: 0 },
      { label: "Probably, with a small buffer", score: 1 },
      { label: "Yes — it is earmarked", score: 2 },
    ],
  },
];

export function scoreToRisk(answers: number[]): RiskProfile {
  const s = answers.reduce((a, b) => a + b, 0);
  if (s <= 5) return "conservative";
  if (s <= 10) return "moderate";
  return "aggressive";
}

export function projectSip(opts: {
  monthly: number;
  years: number;
  annualReturn: number;
  stepUp: number;
  existing: number;
}): YearPoint[] {
  return yearlyPath(opts.monthly, opts.years, opts.annualReturn, opts.stepUp, opts.existing);
}
