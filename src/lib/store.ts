import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoGoals, DEMO_PROFILE } from "./demo";
import { planAll, scoreToRisk } from "./finance";
import { DEFAULT_WATCHLIST } from "./market/universe";
import type { BadgeId, Goal, GoalCategory, PlanResult, Profile } from "./types";
import { uid } from "./utils";

type Store = {
  profile: Profile;
  goals: Goal[];
  badges: BadgeId[];
  readSlugs: string[];
  watchlist: string[];
  hydratedFromCloud: boolean;
  setProfile: (p: Partial<Profile>) => void;
  completeQuiz: (answers: number[]) => void;
  addGoal: (g: Omit<Goal, "id" | "createdAt">) => string;
  updateGoal: (id: string, g: Partial<Goal>) => void;
  removeGoal: (id: string) => void;
  loadDemo: () => void;
  reset: () => void;
  markRead: (slug: string) => void;
  toggleWatch: (symbol: string) => void;
  setWatchlist: (symbols: string[]) => void;
  hydrateCloud: (s: {
    profile: Profile;
    goals: Goal[];
    badges: BadgeId[];
    readSlugs: string[];
    watchlist: string[];
  }) => void;
  markHydrated: () => void;
  snapshot: () => {
    profile: Profile;
    goals: Goal[];
    badges: BadgeId[];
    readSlugs: string[];
    watchlist: string[];
  };
  plan: () => PlanResult;
};

const emptyProfile: Profile = {
  displayName: "",
  age: 25,
  monthlyIncome: 0,
  monthlySurplus: 5000,
  risk: "moderate",
  timeHorizon: "medium",
  purpose: "",
  quizAnswers: [],
  quizComplete: false,
  onboardingComplete: false,
  ageVerified: false,
  riskScore: 0,
  riskGatePassed: false,
  documentsUploaded: false,
  lastQuizDate: "",
};

function withBadges(goals: Goal[], profile: Profile, read: string[], watch: string[], prev: BadgeId[]): BadgeId[] {
  const next = new Set(prev);
  if (profile.quizComplete) next.add("quiz");
  if (profile.onboardingComplete) next.add("onboarded");
  if (goals.length >= 1) next.add("first-goal");
  if (goals.length >= 3) next.add("three-goals");
  if (read.length >= 2) next.add("reader");
  if (watch.length >= 5) next.add("watchlist");
  const p = planAll(profile, goals, false);
  if (p.totals.surplus > 0 && p.totals.monthlySip <= p.totals.surplus) next.add("affordable");
  return [...next];
}

export const useSiply = create<Store>()(
  persist(
    (set, get) => ({
      profile: { ...DEMO_PROFILE },
      goals: demoGoals(),
      badges: ["quiz", "first-goal", "three-goals"],
      readSlugs: [],
      watchlist: [...DEFAULT_WATCHLIST],
      hydratedFromCloud: false,
      setProfile: (p) =>
        set((s) => {
          const profile = { ...s.profile, ...p };
          return { profile, badges: withBadges(s.goals, profile, s.readSlugs, s.watchlist, s.badges) };
        }),
      completeQuiz: (answers) =>
        set((s) => {
          const profile = {
            ...s.profile,
            quizAnswers: answers,
            quizComplete: true,
            risk: scoreToRisk(answers),
          };
          return { profile, badges: withBadges(s.goals, profile, s.readSlugs, s.watchlist, s.badges) };
        }),
      addGoal: (g) => {
        const id = uid();
        set((s) => {
          const goals = [...s.goals, { ...g, id, createdAt: Date.now() }];
          return { goals, badges: withBadges(goals, s.profile, s.readSlugs, s.watchlist, s.badges) };
        });
        return id;
      },
      updateGoal: (id, g) =>
        set((s) => {
          const goals = s.goals.map((x) => (x.id === id ? { ...x, ...g } : x));
          return { goals, badges: withBadges(goals, s.profile, s.readSlugs, s.watchlist, s.badges) };
        }),
      removeGoal: (id) =>
        set((s) => {
          const goals = s.goals.filter((x) => x.id !== id);
          return { goals, badges: withBadges(goals, s.profile, s.readSlugs, s.watchlist, s.badges) };
        }),
      loadDemo: () =>
        set({
          profile: { ...DEMO_PROFILE },
          goals: demoGoals(),
          badges: ["quiz", "first-goal", "three-goals"],
        }),
      reset: () =>
        set({
          profile: emptyProfile,
          goals: [],
          badges: [],
          readSlugs: [],
          watchlist: [...DEFAULT_WATCHLIST],
        }),
      markRead: (slug) =>
        set((s) => {
          if (s.readSlugs.includes(slug)) return s;
          const readSlugs = [...s.readSlugs, slug];
          return { readSlugs, badges: withBadges(s.goals, s.profile, readSlugs, s.watchlist, s.badges) };
        }),
      toggleWatch: (symbol) =>
        set((s) => {
          const has = s.watchlist.includes(symbol);
          const watchlist = has ? s.watchlist.filter((x) => x !== symbol) : [...s.watchlist, symbol];
          return { watchlist, badges: withBadges(s.goals, s.profile, s.readSlugs, watchlist, s.badges) };
        }),
      setWatchlist: (watchlist) =>
        set((s) => ({ watchlist, badges: withBadges(s.goals, s.profile, s.readSlugs, watchlist, s.badges) })),
      hydrateCloud: (incoming) =>
        set({
          ...incoming,
          watchlist: incoming.watchlist.length ? incoming.watchlist : [...DEFAULT_WATCHLIST],
          hydratedFromCloud: true,
        }),
      markHydrated: () => set({ hydratedFromCloud: true }),
      snapshot: () => {
        const s = get();
        return {
          profile: s.profile,
          goals: s.goals,
          badges: s.badges,
          readSlugs: s.readSlugs,
          watchlist: s.watchlist,
        };
      },
      plan: () => planAll(get().profile, get().goals, true),
    }),
    {
      name: "planvista-v2",
      skipHydration: true,
      partialize: (s) => ({
        profile: s.profile,
        goals: s.goals,
        badges: s.badges,
        readSlugs: s.readSlugs,
        watchlist: s.watchlist,
      }),
    },
  ),
);

export const CATEGORIES: { id: GoalCategory; label: string }[] = [
  { id: "education", label: "Education" },
  { id: "gadget", label: "Gadget" },
  { id: "travel", label: "Travel" },
  { id: "emergency", label: "Emergency" },
  { id: "career", label: "Career" },
  { id: "home", label: "Home" },
  { id: "retirement", label: "Retirement" },
  { id: "custom", label: "Custom" },
];

export const BADGE_META: Record<BadgeId, { label: string; hint: string }> = {
  quiz: { label: "Risk mapped", hint: "Finished the risk questionnaire" },
  "first-goal": { label: "First goal", hint: "Created a named SIP job" },
  "three-goals": { label: "Multi-goal", hint: "Three or more goals on the book" },
  reader: { label: "Market student", hint: "Read two explainers" },
  affordable: { label: "Fits surplus", hint: "Required SIPs ≤ monthly surplus" },
  watchlist: { label: "List builder", hint: "Five or more stocks on a list" },
  onboarded: { label: "Profile set", hint: "Completed onboarding" },
};
