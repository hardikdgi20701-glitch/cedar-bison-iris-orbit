import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useSiply } from "./store-CATAbsfv.mjs";
import { i as TriangleAlert, x as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/QuizLogin--ZBi8-sW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Classroom sign-in shown every time a risk quiz is opened. Not a Grok account. */
function QuizLogin({ title, subtitle, cta, onSignedIn }) {
	const profile = useSiply((s) => s.profile);
	const setProfile = useSiply((s) => s.setProfile);
	const [name, setName] = (0, import_react.useState)("");
	const [age, setAge] = (0, import_react.useState)(18);
	const [ageConfirm, setAgeConfirm] = (0, import_react.useState)(false);
	const [riskConfirm, setRiskConfirm] = (0, import_react.useState)(false);
	function submit() {
		if (!name.trim() || age < 18 || !ageConfirm || !riskConfirm) return;
		setProfile({
			displayName: name.trim(),
			age,
			ageVerified: true
		});
		onSignedIn();
	}
	const ready = name.trim().length >= 2 && age >= 18 && ageConfirm && riskConfirm;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-xl border border-warn/30 bg-warn-soft p-3 text-sm text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mt-0.5 size-5 shrink-0 text-warn" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sign in each time you open a risk quiz. This is a classroom desk, not a broker login. No password is stored. Markets can go down. Capital is at risk." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium tracking-tight",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: subtitle
			})] }),
			profile.displayName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-subtle",
				children: [
					"Last session: ",
					profile.displayName,
					". Enter your name again to continue."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-sm font-medium",
				htmlFor: "quiz-login-name",
				children: "Full name"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "quiz-login-name",
				className: "h-11 w-full rounded-xl border border-border bg-bg px-3 text-sm outline-none focus:border-primary",
				value: name,
				onChange: (e) => setName(e.target.value),
				placeholder: "Your name",
				autoComplete: "name"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-sm font-medium",
				htmlFor: "quiz-login-age",
				children: "Age"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "quiz-login-age",
				type: "number",
				min: 18,
				max: 100,
				className: "h-11 w-full rounded-xl border border-border bg-bg px-3 text-sm outline-none focus:border-primary",
				value: age,
				onChange: (e) => setAge(Number(e.target.value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					className: "mt-1 size-4",
					checked: ageConfirm,
					onChange: (e) => setAgeConfirm(e.target.checked)
				}), "I confirm I am 18 years or older."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					className: "mt-1 size-4",
					checked: riskConfirm,
					onChange: (e) => setRiskConfirm(e.target.checked)
				}), "I understand this quiz is education only — not SEBI-registered advice, and I can lose money in markets."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0 text-warn" }), "Past performance is not indicative of future results. Do not invest rent, fees, or emergency cash."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: !ready,
				onClick: submit,
				className: "h-11 w-full rounded-full bg-primary text-sm font-medium text-primary-fg disabled:opacity-40",
				children: cta
			})
		]
	});
}
//#endregion
export { QuizLogin as t };
