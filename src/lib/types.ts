export type RiskProfile = "conservative" | "moderate" | "aggressive";

export type GoalCategory =
  | "education"
  | "gadget"
  | "travel"
  | "emergency"
  | "career"
  | "home"
  | "retirement"
  | "custom";

export type TimeHorizon = "short" | "medium" | "long";

export type Purpose = "learn" | "plan" | "research" | "track" | "";

export type Goal = {
  id: string;
  name: string;
  category: GoalCategory;
  todayCost: number;
  years: number;
  inflation: number;
  existing: number;
  stepUp: number;
  monthlySipOverride: number | null;
  createdAt: number;
};

export type Profile = {
  displayName: string;
  age: number;
  monthlyIncome: number;
  monthlySurplus: number;
  risk: RiskProfile;
  timeHorizon: TimeHorizon;
  purpose: Purpose;
  quizAnswers: number[];
  quizComplete: boolean;
  onboardingComplete: boolean;
  ageVerified: boolean;
  riskScore: number;
  riskGatePassed: boolean;
  documentsUploaded: boolean;
  lastQuizDate: string;
};

export type Allocation = {
  equity: number;
  hybrid: number;
  debt: number;
  gold: number;
};

export type FundTip = {
  name: string;
  why: string;
  sleeve: keyof Allocation;
  weight: number;
};

export type YearPoint = {
  year: number;
  sip: number;
  corpus: number;
  invested: number;
};

export type GoalPlan = {
  id: string;
  futureCost: number;
  requiredSip: number;
  usedSip: number;
  totalInvested: number;
  projectedCorpus: number;
  expectedReturn: number;
  volatility: number;
  allocation: Allocation;
  funds: FundTip[];
  yearly: YearPoint[];
  spark: number[];
  affordability: "comfortable" | "tight" | "stretch";
  successRate: number | null;
  p10: number | null;
  p50: number | null;
  p90: number | null;
  equalMonthlySaving: number;
  sipVsSavingPct: number;
  explanation: string;
  horizon: "short" | "medium" | "long";
  months: number;
};

export type PlanResult = {
  engine: "python" | "local";
  goals: GoalPlan[];
  totals: {
    monthlySip: number;
    surplus: number;
    gap: number;
    utilization: number | null;
  };
};

export type BadgeId =
  | "quiz"
  | "first-goal"
  | "three-goals"
  | "reader"
  | "affordable"
  | "watchlist"
  | "onboarded";
