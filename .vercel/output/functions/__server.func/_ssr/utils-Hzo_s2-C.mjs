import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-Hzo_s2-C.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function inr(n, compact = false) {
	if (!Number.isFinite(n)) return "—";
	const abs = Math.abs(n);
	const sign = n < 0 ? "-" : "";
	if (compact) {
		if (abs >= 1e7) return `${sign}₹${(abs / 1e7).toFixed(abs >= 1e8 ? 1 : 2)}Cr`;
		if (abs >= 1e5) return `${sign}₹${(abs / 1e5).toFixed(abs >= 1e6 ? 1 : 2)}L`;
		if (abs >= 1e3) return `${sign}₹${(abs / 1e3).toFixed(abs >= 1e4 ? 1 : 1)}K`;
	}
	return sign + "₹" + Math.round(abs).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}
function inrPrice(n) {
	if (!Number.isFinite(n)) return "—";
	const abs = Math.abs(n);
	const sign = n < 0 ? "-" : "";
	const digits = abs >= 1e3 ? 2 : abs >= 1 ? 2 : 4;
	return sign + "₹" + abs.toLocaleString("en-IN", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
function formatMoney(n, currency, compact = false) {
	if (!Number.isFinite(n)) return "—";
	if (currency === "INR") return compact ? inr(n, true) : inrPrice(n);
	const sign = n < 0 ? "-" : "";
	const abs = Math.abs(n);
	const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : "";
	if (compact && abs >= 1e9) return `${sign}${sym}${(abs / 1e9).toFixed(2)}B`;
	if (compact && abs >= 1e6) return `${sign}${sym}${(abs / 1e6).toFixed(2)}M`;
	return sign + (sym || currency + " ") + abs.toLocaleString("en-US", { maximumFractionDigits: abs >= 100 ? 2 : 4 });
}
function pct(n, digits = 2) {
	if (!Number.isFinite(n)) return "—";
	const v = n * 100;
	return `${v > 0 ? "+" : ""}${v.toFixed(digits)}%`;
}
function uid() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return "g" + Math.random().toString(36).slice(2, 10);
}
function formatVol(n) {
	if (n == null || !Number.isFinite(n)) return "—";
	const abs = Math.abs(n);
	if (abs >= 1e7) return `${(abs / 1e7).toFixed(2)}Cr`;
	if (abs >= 1e5) return `${(abs / 1e5).toFixed(2)}L`;
	if (abs >= 1e3) return `${(abs / 1e3).toFixed(2)}k`;
	return Math.round(abs).toLocaleString("en-IN");
}
function timeAgo(input) {
	const t = typeof input === "number" ? input : Date.parse(input);
	if (!Number.isFinite(t)) return String(input);
	const s = Math.max(0, (Date.now() - t) / 1e3);
	if (s < 60) return "just now";
	if (s < 3600) return `${Math.floor(s / 60)}m ago`;
	if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
	const d = Math.floor(s / 86400);
	if (d < 30) return `${d}d ago`;
	return new Date(t).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short"
	});
}
function formatIst(ms) {
	if (!Number.isFinite(ms)) return "—";
	return new Date(ms).toLocaleString("en-IN", {
		timeZone: "Asia/Kolkata",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	}) + " IST";
}
//#endregion
export { inr as a, uid as c, formatVol as i, formatIst as n, pct as o, formatMoney as r, timeAgo as s, cn as t };
