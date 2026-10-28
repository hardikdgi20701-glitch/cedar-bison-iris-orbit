import { i as __toESM } from "../_runtime.mjs";
import { a as scoreToRisk, t as QUIZ } from "./finance-CeyoWi2H.mjs";
import { C as require_jsx_runtime, X as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { t as RiskMeter } from "./RiskMeter-DR-ZWT5V.mjs";
import { t as QuizLogin } from "./QuizLogin--ZBi8-sW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-CrA9TVpr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Quiz() {
	const completeQuiz = useSiply((s) => s.completeQuiz);
	const knowledge = useSiply((s) => s.profile.riskScore);
	const navigate = useNavigate();
	const [signedIn, setSignedIn] = (0, import_react.useState)(false);
	const [i, setI] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)([]);
	const q = QUIZ[i];
	const done = answers.length === QUIZ.length;
	const raw = answers.reduce((a, b) => a + b, 0);
	const max = QUIZ.length * 2;
	const appetitePct = Math.round(raw / max * 100);
	if (!signedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "relative mx-auto flex min-h-[80vh] max-w-lg flex-col justify-center px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border bg-surface p-6 shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/planvista-icon.png",
					alt: "",
					className: "size-10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight",
					children: "Risk quiz login"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Required every time · 18+ · Education only"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizLogin, {
				title: "Sign in to take the risk-factor quiz",
				subtitle: "Maps a teaching risk mix for your goals. Not a SEBI-registered assessment.",
				cta: "Sign in and start quiz",
				onSignedIn: () => setSignedIn(true)
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wide text-subtle",
				children: "Risk questionnaire"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-2xl font-medium tracking-tight",
				children: "Seven questions. One mix."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"This is a teaching profile for student goals — not a SEBI-registered assessment. Knowledge gate score:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold tabular-nums",
						children: [knowledge || 0, "%"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 h-1 overflow-hidden rounded-full bg-chip",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-primary transition-[width] duration-200",
					style: { width: `${Math.min(answers.length, QUIZ.length) / QUIZ.length * 100}%` }
				})
			}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-lg border border-border p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskMeter, {
						percent: appetitePct,
						label: "Risk appetite",
						passAt: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Your mapped profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-3xl font-medium capitalize",
						children: scoreToRisk(answers)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							"Appetite ",
							appetitePct,
							"% (",
							raw,
							" / ",
							max,
							"). Conservative ≤36%, moderate ≤71%, else aggressive. Emergency goals still use a debt-heavy sleeve."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-5 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg hover:bg-primary-hover",
						onClick: () => {
							completeQuiz(answers);
							navigate({ to: "/portfolio" });
						},
						children: "Save and open portfolio"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							i + 1,
							" of ",
							QUIZ.length,
							answers.length ? ` · running appetite ${appetitePct}%` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-lg font-medium",
						children: q.q
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2",
						children: q.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex min-h-12 w-full items-center rounded-md border border-border px-3 py-3 text-left text-sm hover:border-primary hover:bg-primary-soft",
							onClick: () => {
								const next = [...answers, o.score];
								setAnswers(next);
								setI((v) => v + 1);
							},
							children: o.label
						}) }, o.label))
					})
				]
			})
		]
	});
}
//#endregion
export { Quiz as component };
