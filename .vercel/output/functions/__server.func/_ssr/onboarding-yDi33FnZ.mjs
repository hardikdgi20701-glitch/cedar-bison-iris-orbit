import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, X as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-yDi33FnZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PURPOSES = [
	{
		id: "learn",
		title: "Learn the markets",
		blurb: "Explainers, charts and how SIPs actually work."
	},
	{
		id: "plan",
		title: "Plan goals",
		blurb: "Map SIPs to education, home, emergency or retirement."
	},
	{
		id: "research",
		title: "Research stocks",
		blurb: "NSE/BSE quotes, news, quarterly results and analysis."
	},
	{
		id: "track",
		title: "Track progress",
		blurb: "Watchlists, badges and a living surplus check."
	}
];
function Onboarding() {
	const profile = useSiply((s) => s.profile);
	const setProfile = useSiply((s) => s.setProfile);
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [draft, setDraft] = (0, import_react.useState)({
		purpose: profile.purpose || "plan",
		displayName: profile.displayName || "Hardik",
		age: profile.age || 25,
		monthlyIncome: profile.monthlyIncome || 5e4,
		monthlySurplus: profile.monthlySurplus || 8e3,
		risk: profile.risk,
		timeHorizon: profile.timeHorizon
	});
	function save(partial) {
		const next = {
			...draft,
			...partial
		};
		setDraft(next);
		setProfile({
			purpose: next.purpose,
			displayName: next.displayName,
			age: next.age,
			monthlyIncome: next.monthlyIncome,
			monthlySurplus: next.monthlySurplus,
			risk: next.risk,
			timeHorizon: next.timeHorizon,
			onboardingComplete: partial?.onboardingComplete ?? false
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-medium uppercase tracking-wide text-subtle",
				children: [
					"Step ",
					step + 1,
					" of 3 · Why you are here"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-1 overflow-hidden rounded-full bg-chip",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-primary transition-[width] duration-200",
					style: { width: `${(step + 1) / 3 * 100}%` }
				})
			}),
			step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-medium tracking-tight",
						children: "What brings you to PlanVista?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "You can change this later. It only shapes the home layout."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 grid gap-2",
						children: PURPOSES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => save({ purpose: p.id }),
							className: `w-full rounded-lg border px-4 py-3 text-left ${draft.purpose === p.id ? "border-primary bg-primary-soft" : "border-border hover:bg-surface"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: p.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: p.blurb
							})]
						}) }, p.id))
					})
				]
			}) : null,
			step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-medium tracking-tight",
						children: "Age, income, surplus"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Used only to size SIPs against what you can actually invest."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-xs text-muted",
								children: ["Display name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.displayName,
									onChange: (e) => save({ displayName: e.target.value }),
									className: "h-11 rounded-md border border-border px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1 text-xs text-muted",
									children: ["Age", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 16,
										max: 80,
										value: draft.age,
										onChange: (e) => save({ age: Number(e.target.value) }),
										className: "h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1 text-xs text-muted",
									children: ["Monthly income (₹)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 0,
										value: draft.monthlyIncome,
										onChange: (e) => save({ monthlyIncome: Number(e.target.value) }),
										className: "h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-xs text-muted",
								children: ["Amount you can invest / month (₹)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 0,
									value: draft.monthlySurplus,
									onChange: (e) => save({ monthlySurplus: Number(e.target.value) }),
									className: "h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
								})]
							})
						]
					})
				]
			}) : null,
			step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-medium tracking-tight",
						children: "Risk and time horizon"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "A teaching profile — not a SEBI-registered assessment. You can refine it with the 7-question quiz."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs font-medium uppercase tracking-wide text-subtle",
						children: "Risk tolerance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid gap-2",
						children: [
							["conservative", "Prefer stability. Shorter goals stay in debt/hybrid."],
							["moderate", "Balanced mix. Default for most multi-year goals."],
							["aggressive", "Higher equity for long horizons. Expect drawdowns."]
						].map(([id, blurb]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => save({ risk: id }),
							className: `rounded-lg border px-4 py-3 text-left capitalize ${draft.risk === id ? "border-primary bg-primary-soft" : "border-border hover:bg-surface"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-normal normal-case text-muted",
								children: blurb
							})]
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs font-medium uppercase tracking-wide text-subtle",
						children: "Typical time horizon"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-3 gap-2",
						children: [
							["short", "< 3 years"],
							["medium", "3–7 years"],
							["long", "7+ years"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => save({ timeHorizon: id }),
							className: `rounded-lg border px-3 py-3 text-sm capitalize ${draft.timeHorizon === id ? "border-primary bg-primary-soft" : "border-border hover:bg-surface"}`,
							children: [id, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-[11px] font-normal normal-case text-muted",
								children: label
							})]
						}, id))
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [
					step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStep((s) => s - 1),
						className: "inline-flex h-11 items-center rounded-full border border-border px-4 text-sm hover:bg-surface",
						children: "Back"
					}) : null,
					step < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStep((s) => s + 1),
						className: "inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg hover:bg-primary-hover",
						children: "Continue"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							save({ onboardingComplete: true });
							navigate({ to: draft.purpose === "plan" ? "/planner" : "/" });
						},
						className: "inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg hover:bg-primary-hover",
						children: "Save profile and enter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							save({ onboardingComplete: true });
							navigate({ to: "/" });
						},
						className: "inline-flex h-11 items-center px-3 text-sm text-muted hover:text-fg",
						children: "Skip for now"
					})
				]
			})
		]
	});
}
//#endregion
export { Onboarding as component };
