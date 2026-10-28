import type { Goal, Profile } from "./types";

export const DEMO_PROFILE: Profile = {
  displayName: "Hardik",
  age: 24,
  monthlyIncome: 45000,
  monthlySurplus: 8000,
  risk: "moderate",
  timeHorizon: "medium",
  purpose: "plan",
  quizAnswers: [1, 1, 0, 1, 1, 1, 1],
  quizComplete: true,
  onboardingComplete: true,
  ageVerified: true,
  riskScore: 86,
  riskGatePassed: true,
  documentsUploaded: true,
  lastQuizDate: "2026-09-04",
};

export function demoGoals(): Goal[] {
  return [
    {
      id: "demo-emergency",
      name: "Emergency fund",
      category: "emergency",
      todayCost: 120000,
      years: 1.5,
      inflation: 0.06,
      existing: 20000,
      stepUp: 0,
      monthlySipOverride: null,
      createdAt: 1,
    },
    {
      id: "demo-laptop",
      name: "Workstation upgrade",
      category: "gadget",
      todayCost: 95000,
      years: 1.5,
      inflation: 0.05,
      existing: 10000,
      stepUp: 0.1,
      monthlySipOverride: null,
      createdAt: 2,
    },
    {
      id: "demo-house",
      name: "Home down-payment seed",
      category: "home",
      todayCost: 1500000,
      years: 7,
      inflation: 0.07,
      existing: 50000,
      stepUp: 0.1,
      monthlySipOverride: null,
      createdAt: 3,
    },
    {
      id: "demo-retire",
      name: "Retirement corpus start",
      category: "retirement",
      todayCost: 5000000,
      years: 25,
      inflation: 0.06,
      existing: 0,
      stepUp: 0.1,
      monthlySipOverride: null,
      createdAt: 4,
    },
  ];
}

export const TICKER = [
  { symbol: "NIFTY 50", yahoo: "^NSEI" },
  { symbol: "SENSEX", yahoo: "^BSESN" },
  { symbol: "BANK NIFTY", yahoo: "^NSEBANK" },
  { symbol: "NIFTY IT", yahoo: "^CNXIT" },
  { symbol: "USD/INR", yahoo: "USDINR=X" },
  { symbol: "GOLD USD", yahoo: "GC=F" },
  { symbol: "INDIA VIX", yahoo: "^INDIAVIX" },
];
