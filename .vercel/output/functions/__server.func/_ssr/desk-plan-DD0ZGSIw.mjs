import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-plan-DD0ZGSIw.js
var useDeskPlan = create()(persist((set) => ({
	tier: "free",
	setTier: (tier) => set({ tier })
}), { name: "pv-desk-plan" }));
var PLANS = [
	{
		id: "free",
		name: "Classroom",
		price: "₹0",
		note: "Start here. No card.",
		items: [
			"X-ray any name on the NSE tape we already track",
			"Levels, volume, and why the candle moved",
			"Paper desk and the academy",
			"English"
		]
	},
	{
		id: "research",
		name: "Research",
		price: "₹199 / month",
		note: "GST included. Preview does not charge you.",
		items: [
			"Unlimited X-ray reads",
			"Hindi and English",
			"Paste a position and see where it is wrong",
			"Pre-market note before 9:15"
		]
	},
	{
		id: "ultra",
		name: "Ultra",
		price: "₹10,000 / year",
		note: "About ₹833 a month. ₹12,000 if you paid monthly. Preview does not charge you.",
		items: [
			"Everything in Research",
			"Monday levels for the week",
			"Indicator strip: RSI, MACD, average, pivot",
			"Saved on this device only"
		]
	}
];
//#endregion
export { useDeskPlan as n, PLANS as t };
