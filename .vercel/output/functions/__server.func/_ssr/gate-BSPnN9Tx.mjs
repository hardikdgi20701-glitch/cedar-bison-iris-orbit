import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, X as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { M as BookOpen, i as TriangleAlert, r as Upload, s as Shield, w as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as RiskMeter } from "./RiskMeter-DR-ZWT5V.mjs";
import { t as QuizLogin } from "./QuizLogin--ZBi8-sW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gate-BSPnN9Tx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RISK_QUESTIONS = [
	{
		q: "If you buy a share and the price falls, what can happen?",
		options: [
			"The government will refund your money",
			"You can lose money — there is no guarantee",
			"The broker must pay you the difference",
			"Share prices never fall"
		],
		correct: 1,
		news: "Beginner rule #1: stocks are not a savings account. Capital can go down."
	},
	{
		q: "What is a SIP in simple words?",
		options: [
			"A bank loan for buying shares",
			"A guaranteed monthly profit scheme",
			"Investing a fixed amount on a regular date, usually in a mutual fund",
			"A one-time lottery ticket"
		],
		correct: 2,
		news: "SIP = a habit. It does not promise a return; it just invests on a schedule."
	},
	{
		q: "On this site, a green number with a Bull label means:",
		options: [
			"You must buy this stock right now",
			"The last price move was up (not a forecast)",
			"The company will never fall again",
			"SEBI has approved a profit"
		],
		correct: 1,
		news: "Bull / Bear here only describe the last change. They are not buy or sell calls."
	},
	{
		q: "Money you need for next month’s rent or college fees should be:",
		options: [
			"Used for intraday trading",
			"Put into a friend’s stock tip",
			"Kept in savings / liquid money — not in stocks",
			"Borrowed against, then invested"
		],
		correct: 2,
		news: "Near-term money does not belong in the share market. Emergency first, then invest."
	},
	{
		q: "A fund that returned 20% last year will:",
		options: [
			"Definitely return 20% again",
			"Be guaranteed by SEBI",
			"Not be allowed to fall",
			"Not guarantee anything next year — past performance is not future results"
		],
		correct: 3,
		news: "This sentence is on every official document for a reason. Please believe it."
	},
	{
		q: "Who regulates the stock market in India?",
		options: [
			"WhatsApp admin groups",
			"Your college",
			"SEBI",
			"Foreign banks only"
		],
		correct: 2,
		news: "SEBI is the regulator. Unregistered tips and “guaranteed returns” are red flags."
	},
	{
		q: "A stop-loss, in beginner language, is:",
		options: [
			"A plan for the maximum loss you will accept, then you exit",
			"A way to lock only profits",
			"A tax-saving trick",
			"A promise that you cannot lose money"
		],
		correct: 0,
		news: "You do not need to trade stocks on day one. If you ever do, write a stop before you buy."
	}
];
function LoginGate() {
	const setProfile = useSiply((s) => s.setProfile);
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [docOk, setDocOk] = (0, import_react.useState)(false);
	const [answers, setAnswers] = (0, import_react.useState)([]);
	const [currentQ, setCurrentQ] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [showResult, setShowResult] = (0, import_react.useState)(false);
	function handleDoc() {
		setDocOk(true);
		setProfile({ documentsUploaded: true });
		setStep(2);
	}
	function answer(idx) {
		const next = [...answers, idx];
		setAnswers(next);
		if (currentQ < RISK_QUESTIONS.length - 1) setCurrentQ(currentQ + 1);
		else {
			const correct = next.reduce((acc, a, i) => acc + (a === RISK_QUESTIONS[i].correct ? 1 : 0), 0);
			const pctScore = Math.round(correct / RISK_QUESTIONS.length * 100);
			setScore(pctScore);
			setShowResult(true);
			const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			setProfile({
				riskScore: pctScore,
				riskGatePassed: pctScore >= 70,
				lastQuizDate: today,
				quizComplete: true,
				quizAnswers: next
			});
		}
	}
	function enterSite() {
		if (score >= 70) navigate({ to: "/onboarding" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-20 top-10 size-64 animate-pulse rounded-full bg-emerald-500/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-20 bottom-20 size-72 animate-pulse rounded-full bg-rose-500/10 blur-3xl delay-700" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 rounded-2xl border border-border bg-surface/80 p-6 shadow-xl backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/planvista-icon.png",
							alt: "",
							className: "size-10"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-semibold tracking-tight",
							children: "PlanVista Finance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Beginner gate · 18+ · Not investment advice"
						})] })]
					}),
					step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizLogin, {
						title: "Sign in to take the knowledge quiz",
						subtitle: "You will sign in every time you open this gate. 70% to pass. Not a broker login.",
						cta: "Sign in and continue",
						onSignedIn: () => setStep(1)
					}),
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5" }), " Required documents (prototype)"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "For a real platform SEBI / KYC would require PAN + Aadhaar / video KYC. Here we only simulate the step for the prototype."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-dashed border-border p-6 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Drop or select a mock document (ID / student ID / age proof)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/*,.pdf",
									className: "mt-3 w-full text-sm",
									onChange: () => setDocOk(true)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: !docOk,
								onClick: handleDoc,
								className: "h-11 w-full rounded-full bg-primary text-sm font-medium text-primary-fg disabled:opacity-40",
								children: "Upload & continue to risk quiz"
							})
						]
					}),
					step === 2 && !showResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" }), " Beginner knowledge check"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Q",
									currentQ + 1,
									"/",
									RISK_QUESTIONS.length
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 overflow-hidden rounded-full bg-chip",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-primary transition-all",
									style: { width: `${(currentQ + 1) / RISK_QUESTIONS.length * 100}%` }
								})
							}),
							answers.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-center text-sm",
								children: [
									"Running score",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold tabular-nums",
										children: [Math.round(answers.reduce((acc, a, i) => acc + (a === RISK_QUESTIONS[i].correct ? 1 : 0), 0) / answers.length * 100), "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: [
											" ",
											"(",
											answers.reduce((acc, a, i) => acc + (a === RISK_QUESTIONS[i].correct ? 1 : 0), 0),
											"/",
											answers.length,
											" so far) · need 70% overall"
										]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs text-muted",
								children: "Need 70% (5 of 7) to enter. Beginner questions."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-medium leading-snug",
								children: RISK_QUESTIONS[currentQ].q
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "rounded-lg bg-chip/60 px-3 py-2 text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "mr-1 inline size-3.5" }), RISK_QUESTIONS[currentQ].news]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: RISK_QUESTIONS[currentQ].options.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => answer(i),
									className: "w-full rounded-xl border border-border bg-bg px-4 py-3 text-left text-sm hover:border-primary hover:bg-primary/5",
									children: opt
								}, i))
							})
						]
					}),
					showResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-5 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskMeter, {
							percent: score,
							label: "Risk quiz",
							passAt: 70
						}), score >= 70 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto size-10 text-emerald-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-xl font-semibold",
								children: [
									"You scored ",
									score,
									"%"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "You cleared the 70% knowledge gate. Past performance ≠ future results. Markets can go down as well as up."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: enterSite,
								className: "h-11 w-full rounded-full bg-emerald-600 text-sm font-medium text-white",
								children: "Enter PlanVista learning platform"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mx-auto size-10 text-rose-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-xl font-semibold",
								children: [score, "% — below 70%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "You need 70% to enter. These are first-day questions: you can lose money, SIPs are not guaranteed, and rent money does not belong in stocks. Retry when ready."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setShowResult(false);
									setAnswers([]);
									setCurrentQ(0);
									setStep(2);
								},
								className: "h-11 w-full rounded-full border border-border text-sm font-medium",
								children: "Retry quiz"
							})
						] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-[11px] leading-relaxed text-muted",
				children: "PlanVista Finance is an educational prototype. It does not provide investment advice, does not execute trades, and is not registered with SEBI as an investment adviser or research analyst. Always consult a SEBI-registered intermediary before investing."
			})
		]
	});
}
//#endregion
export { LoginGate as component };
