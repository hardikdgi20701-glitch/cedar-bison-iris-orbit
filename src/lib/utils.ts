import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function inr(n: number, compact = false): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (compact) {
    if (abs >= 1e7) return `${sign}₹${(abs / 1e7).toFixed(abs >= 1e8 ? 1 : 2)}Cr`;
    if (abs >= 1e5) return `${sign}₹${(abs / 1e5).toFixed(abs >= 1e6 ? 1 : 2)}L`;
    if (abs >= 1e3) return `${sign}₹${(abs / 1e3).toFixed(abs >= 1e4 ? 1 : 1)}K`;
  }
  return (
    sign +
    "₹" +
    Math.round(abs).toLocaleString("en-IN", { maximumFractionDigits: 0 })
  );
}

export function inrPrice(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  const digits = abs >= 1000 ? 2 : abs >= 1 ? 2 : 4;
  return (
    sign +
    "₹" +
    abs.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits })
  );
}

export function formatMoney(n: number, currency: string, compact = false): string {
  if (!Number.isFinite(n)) return "—";
  if (currency === "INR") return compact ? inr(n, true) : inrPrice(n);
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : "";
  if (compact && abs >= 1e9) return `${sign}${sym}${(abs / 1e9).toFixed(2)}B`;
  if (compact && abs >= 1e6) return `${sign}${sym}${(abs / 1e6).toFixed(2)}M`;
  return (
    sign +
    (sym || currency + " ") +
    abs.toLocaleString("en-US", { maximumFractionDigits: abs >= 100 ? 2 : 4 })
  );
}

export function pct(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  const v = n * 100;
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(digits)}%`;
}

export function uid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "g" + Math.random().toString(36).slice(2, 10);
}

export function formatVol(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1e7) return `${(abs / 1e7).toFixed(2)}Cr`;
  if (abs >= 1e5) return `${(abs / 1e5).toFixed(2)}L`;
  if (abs >= 1e3) return `${(abs / 1e3).toFixed(2)}k`;
  return Math.round(abs).toLocaleString("en-IN");
}

export function timeAgo(input: string | number): string {
  const t = typeof input === "number" ? input : Date.parse(input);
  if (!Number.isFinite(t)) return String(input);
  const s = Math.max(0, (Date.now() - t) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  const d = Math.floor(s / 86400);
  if (d < 30) return `${d}d ago`;
  return new Date(t).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function formatIst(ms: number): string {
  if (!Number.isFinite(ms)) return "—";
  return (
    new Date(ms).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }) + " IST"
  );
}
