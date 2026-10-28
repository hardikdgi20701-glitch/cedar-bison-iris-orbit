import { n as DEFAULT_WATCHLIST } from "./universe-C6G9ps6z.mjs";
import { a as scoreToRisk, n as planAll } from "./finance-CeyoWi2H.mjs";
import { c as uid } from "./utils-Hzo_s2-C.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CATAbsfv.js
var DEMO_PROFILE = {
	displayName: "Hardik",
	age: 24,
	monthlyIncome: 45e3,
	monthlySurplus: 8e3,
	risk: "moderate",
	timeHorizon: "medium",
	purpose: "plan",
	quizAnswers: [
		1,
		1,
		0,
		1,
		1,
		1,
		1
	],
	quizComplete: true,
	onboardingComplete: true,
	ageVerified: true,
	riskScore: 86,
	riskGatePassed: true,
	documentsUploaded: true,
	lastQuizDate: "2026-09-04"
};
function demoGoals() {
	return [
		{
			id: "demo-emergency",
			name: "Emergency fund",
			category: "emergency",
			todayCost: 12e4,
			years: 1.5,
			inflation: .06,
			existing: 2e4,
			stepUp: 0,
			monthlySipOverride: null,
			createdAt: 1
		},
		{
			id: "demo-laptop",
			name: "Workstation upgrade",
			category: "gadget",
			todayCost: 95e3,
			years: 1.5,
			inflation: .05,
			existing: 1e4,
			stepUp: .1,
			monthlySipOverride: null,
			createdAt: 2
		},
		{
			id: "demo-house",
			name: "Home down-payment seed",
			category: "home",
			todayCost: 15e5,
			years: 7,
			inflation: .07,
			existing: 5e4,
			stepUp: .1,
			monthlySipOverride: null,
			createdAt: 3
		},
		{
			id: "demo-retire",
			name: "Retirement corpus start",
			category: "retirement",
			todayCost: 5e6,
			years: 25,
			inflation: .06,
			existing: 0,
			stepUp: .1,
			monthlySipOverride: null,
			createdAt: 4
		}
	];
}
var TICKER = [
	{
		symbol: "NIFTY 50",
		yahoo: "^NSEI"
	},
	{
		symbol: "SENSEX",
		yahoo: "^BSESN"
	},
	{
		symbol: "BANK NIFTY",
		yahoo: "^NSEBANK"
	},
	{
		symbol: "NIFTY IT",
		yahoo: "^CNXIT"
	},
	{
		symbol: "USD/INR",
		yahoo: "USDINR=X"
	},
	{
		symbol: "GOLD USD",
		yahoo: "GC=F"
	},
	{
		symbol: "INDIA VIX",
		yahoo: "^INDIAVIX"
	}
];
var emptyProfile = {
	displayName: "",
	age: 25,
	monthlyIncome: 0,
	monthlySurplus: 5e3,
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
	lastQuizDate: ""
};
function withBadges(goals, profile, read, watch, prev) {
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
var useSiply = create()(persist((set, get) => ({
	profile: { ...DEMO_PROFILE },
	goals: demoGoals(),
	badges: [
		"quiz",
		"first-goal",
		"three-goals"
	],
	readSlugs: [],
	watchlist: [...DEFAULT_WATCHLIST],
	hydratedFromCloud: false,
	setProfile: (p) => set((s) => {
		const profile = {
			...s.profile,
			...p
		};
		return {
			profile,
			badges: withBadges(s.goals, profile, s.readSlugs, s.watchlist, s.badges)
		};
	}),
	completeQuiz: (answers) => set((s) => {
		const profile = {
			...s.profile,
			quizAnswers: answers,
			quizComplete: true,
			risk: scoreToRisk(answers)
		};
		return {
			profile,
			badges: withBadges(s.goals, profile, s.readSlugs, s.watchlist, s.badges)
		};
	}),
	addGoal: (g) => {
		const id = uid();
		set((s) => {
			const goals = [...s.goals, {
				...g,
				id,
				createdAt: Date.now()
			}];
			return {
				goals,
				badges: withBadges(goals, s.profile, s.readSlugs, s.watchlist, s.badges)
			};
		});
		return id;
	},
	updateGoal: (id, g) => set((s) => {
		const goals = s.goals.map((x) => x.id === id ? {
			...x,
			...g
		} : x);
		return {
			goals,
			badges: withBadges(goals, s.profile, s.readSlugs, s.watchlist, s.badges)
		};
	}),
	removeGoal: (id) => set((s) => {
		const goals = s.goals.filter((x) => x.id !== id);
		return {
			goals,
			badges: withBadges(goals, s.profile, s.readSlugs, s.watchlist, s.badges)
		};
	}),
	loadDemo: () => set({
		profile: { ...DEMO_PROFILE },
		goals: demoGoals(),
		badges: [
			"quiz",
			"first-goal",
			"three-goals"
		]
	}),
	reset: () => set({
		profile: emptyProfile,
		goals: [],
		badges: [],
		readSlugs: [],
		watchlist: [...DEFAULT_WATCHLIST]
	}),
	markRead: (slug) => set((s) => {
		if (s.readSlugs.includes(slug)) return s;
		const readSlugs = [...s.readSlugs, slug];
		return {
			readSlugs,
			badges: withBadges(s.goals, s.profile, readSlugs, s.watchlist, s.badges)
		};
	}),
	toggleWatch: (symbol) => set((s) => {
		const watchlist = s.watchlist.includes(symbol) ? s.watchlist.filter((x) => x !== symbol) : [...s.watchlist, symbol];
		return {
			watchlist,
			badges: withBadges(s.goals, s.profile, s.readSlugs, watchlist, s.badges)
		};
	}),
	setWatchlist: (watchlist) => set((s) => ({
		watchlist,
		badges: withBadges(s.goals, s.profile, s.readSlugs, watchlist, s.badges)
	})),
	hydrateCloud: (incoming) => set({
		...incoming,
		watchlist: incoming.watchlist.length ? incoming.watchlist : [...DEFAULT_WATCHLIST],
		hydratedFromCloud: true
	}),
	markHydrated: () => set({ hydratedFromCloud: true }),
	snapshot: () => {
		const s = get();
		return {
			profile: s.profile,
			goals: s.goals,
			badges: s.badges,
			readSlugs: s.readSlugs,
			watchlist: s.watchlist
		};
	},
	plan: () => planAll(get().profile, get().goals, true)
}), {
	name: "planvista-v2",
	skipHydration: true,
	partialize: (s) => ({
		profile: s.profile,
		goals: s.goals,
		badges: s.badges,
		readSlugs: s.readSlugs,
		watchlist: s.watchlist
	})
}));
var CATEGORIES = [
	{
		id: "education",
		label: "Education"
	},
	{
		id: "gadget",
		label: "Gadget"
	},
	{
		id: "travel",
		label: "Travel"
	},
	{
		id: "emergency",
		label: "Emergency"
	},
	{
		id: "career",
		label: "Career"
	},
	{
		id: "home",
		label: "Home"
	},
	{
		id: "retirement",
		label: "Retirement"
	},
	{
		id: "custom",
		label: "Custom"
	}
];
var BADGE_META = {
	quiz: {
		label: "Risk mapped",
		hint: "Finished the risk questionnaire"
	},
	"first-goal": {
		label: "First goal",
		hint: "Created a named SIP job"
	},
	"three-goals": {
		label: "Multi-goal",
		hint: "Three or more goals on the book"
	},
	reader: {
		label: "Market student",
		hint: "Read two explainers"
	},
	affordable: {
		label: "Fits surplus",
		hint: "Required SIPs ≤ monthly surplus"
	},
	watchlist: {
		label: "List builder",
		hint: "Five or more stocks on a list"
	},
	onboarded: {
		label: "Profile set",
		hint: "Completed onboarding"
	}
};
//#endregion
export { useSiply as i, CATEGORIES as n, TICKER as r, BADGE_META as t };
