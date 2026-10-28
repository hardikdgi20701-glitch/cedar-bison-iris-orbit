import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  ChartCandlestick,
  LineChart,
  Menu,
  Moon,
  Newspaper,
  PieChart,
  Search,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useSiply } from "@/lib/store";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { SearchBox } from "@/components/markets/SearchBox";
import { ResearchPanel } from "@/components/markets/ResearchPanel";
import { WatchlistRail } from "@/components/markets/WatchlistRail";
import { CloudSync } from "./CloudSync";
import { SiteFooter } from "./SiteFooter";
import { Ticker } from "./Ticker";
import { LiveNewsEmbed } from "./LiveNewsEmbed";
import { SplashScreen } from "./SplashScreen";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/ask", label: "Ask" },
  { to: "/research", label: "Research" },
  { to: "/markets", label: "Markets" },
  { to: "/trade", label: "Trade" },
  { to: "/nse", label: "NSE desk" },
  { to: "/learn", label: "Academy" },
  { to: "/chart-gpt", label: "Chart GPT" },
  { to: "/plans", label: "Plans" },
  { to: "/search", label: "Deep Search" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/planner", label: "Goals" },
  { to: "/sip", label: "SIP" },
  { to: "/quiz", label: "Risk quiz" },
  { to: "/analytics", label: "Analytics" },
  { to: "/progress", label: "Progress" },
] as const;

const MOBILE_NAV = [
  { to: "/", label: "Home", icon: Newspaper },
  { to: "/ask", label: "Ask", icon: Sparkles },
  { to: "/trade", label: "Trade", icon: ChartCandlestick },
  { to: "/markets", label: "Markets", icon: LineChart },
  { to: "/learn", label: "Academy", icon: BookOpen },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const focusChat = pathname.startsWith("/chart-gpt") || pathname.startsWith("/ask");
  const board = pathname.startsWith("/nse");
  const desk = pathname.startsWith("/trade");
  const hideRails = focusChat || board || desk;
  const [menu, setMenu] = useState(false);
  const [lists, setLists] = useState(false);
  const [research, setResearch] = useState(false);
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("pv-splash") !== "1";
  });
  const { theme, toggle } = useTheme();
  const profile = useSiply((s) => s.profile);
  const displayName = profile.displayName || "Learner";
  const first = displayName.split(" ")[0] || "Learner";

  function finishSplash() {
    try {
      sessionStorage.setItem("pv-splash", "1");
    } catch {
      /* ignore */
    }
    setShowSplash(false);
  }

  if (showSplash) {
    return <SplashScreen onDone={finishSplash} />;
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[80] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-fg"
      >
        Skip to content
      </a>
      <CloudSync />
      {board ? null : <LiveNewsEmbed />}
      {board ? null : (
        <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
          <div className="flex items-center gap-2 px-2 py-2 sm:px-4">
            <button
              type="button"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface",
                hideRails ? "" : "lg:hidden",
              )}
              aria-label="Open lists"
              onClick={() => setLists((v) => !v)}
            >
              {lists ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <Link to="/" className="flex shrink-0 items-center gap-2 pr-1">
              <img
                src="/planvista-icon.png"
                alt="PlanVista"
                className="size-8 object-contain"
                width={32}
                height={32}
              />
              <span className="hidden text-[20px] tracking-tight sm:inline">
                PlanVista
                <span className="ml-1.5 text-sm text-muted">Finance</span>
              </span>
              <span className="hidden rounded-sm bg-primary-soft px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary md:inline">
                Beta
              </span>
            </Link>
            <SearchBox className="hidden max-w-xl md:block" />
            <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
              <Link
                to="/ask"
                className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm text-muted hover:bg-surface hover:text-fg"
              >
                <Sparkles className="size-4" />
                <span className="hidden sm:inline">Ask</span>
              </Link>
              <Link
                to="/search"
                className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm text-muted hover:bg-surface hover:text-fg"
              >
                <Search className="size-4" />
                <span className="hidden lg:inline">Deep Search</span>
              </Link>
              <Link
                to="/analytics"
                className="hidden h-11 items-center gap-1.5 rounded-full px-3 text-sm text-muted hover:bg-surface hover:text-fg xl:inline-flex"
              >
                <PieChart className="size-4" />
                Analytics
              </Link>
              <button
                type="button"
                onClick={toggle}
                className="inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface"
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              >
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
              <button
                type="button"
                className={cn(
                  "inline-flex h-11 items-center rounded-full px-3 text-sm text-muted hover:bg-surface",
                  hideRails ? "" : "xl:hidden",
                )}
                onClick={() => setResearch((v) => !v)}
                aria-expanded={research}
                aria-controls="research-panel"
              >
                Research
              </button>
              <div className="flex items-center gap-2 pl-1">
                {profile.riskScore > 0 ? (
                  <Link
                    to="/gate"
                    className={cn(
                      "hidden h-8 items-center rounded-full px-2.5 text-xs font-semibold tabular-nums sm:inline-flex",
                      profile.riskScore >= 70 ? "bg-up-soft text-up" : "bg-down-soft text-down",
                    )}
                    title="Risk knowledge quiz score"
                  >
                    Risk {profile.riskScore}%
                  </Link>
                ) : (
                  <Link
                    to="/gate"
                    className="hidden h-8 items-center rounded-full bg-warn-soft px-2.5 text-xs font-semibold text-warn sm:inline-flex"
                  >
                    Take gate
                  </Link>
                )}
                <span className="grid size-8 place-items-center rounded-full bg-primary text-sm font-medium text-primary-fg">
                  {first.charAt(0).toUpperCase()}
                </span>
                <span className="hidden text-sm font-medium sm:inline">{first}</span>
              </div>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface md:hidden"
                aria-label="Open menu"
                onClick={() => setMenu((v) => !v)}
              >
                {menu ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
          <div className="px-3 pb-2 md:hidden">
            <SearchBox />
          </div>
          <nav className="hidden gap-1 overflow-x-auto px-4 md:flex" aria-label="Main">
            {NAV.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "shrink-0 border-b-2 px-3 py-2.5 text-sm",
                    active
                      ? "border-primary font-medium text-primary"
                      : "border-transparent text-muted hover:border-border-strong hover:text-fg",
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          {menu ? (
            <nav className="border-t border-border px-3 py-2 md:hidden" aria-label="Main">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMenu(false)}
                  className="block rounded-md px-3 py-3 text-sm hover:bg-surface"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </header>
      )}
      {board ? null : <Ticker />}
      {board ? null : (
        <div className="border-b border-border bg-warn-soft px-3 py-1.5 text-center text-[11px] text-fg">
          For learning purposes only — not investment advice, not a SEBI-registered advisor. Market data may be
          delayed.
        </div>
      )}
      {!profile.riskGatePassed && !board ? (
        <div className="border-b border-border bg-primary-soft px-3 py-2 text-center text-xs text-fg">
          Take the 18+ knowledge gate (70% to pass) before treating this as more than a classroom.{" "}
          <Link to="/gate" className="font-medium text-primary underline">
            Start the quiz
          </Link>
        </div>
      ) : null}
      <div className="flex min-h-[70vh]">
        <aside
          className={cn(
            "w-[300px] shrink-0 border-r border-border bg-rail",
            lists
              ? "fixed inset-y-0 left-0 z-30 mt-[52px] bg-bg lg:static lg:mt-0 lg:block"
              : hideRails
                ? "hidden"
                : "hidden lg:block",
          )}
        >
          <WatchlistRail />
        </aside>
        <div className="min-w-0 flex-1">
          <main
            id="main"
            className={
              board
                ? "pb-0"
                : desk
                  ? "mx-auto w-full max-w-[1440px] px-3 py-4 pb-24 sm:px-4 md:pb-8"
                  : "mx-auto max-w-5xl px-3 py-5 pb-24 sm:px-5 sm:py-6 md:pb-6"
            }
          >
            {children}
          </main>
          {board ? null : <SiteFooter />}
        </div>
        <aside
          id="research-panel"
          className={cn(
            "flex w-[min(100vw,380px)] shrink-0 flex-col border-l border-border bg-rail",
            research
              ? "fixed inset-y-0 right-0 z-40 bg-bg pb-16 pt-14 shadow-2xl xl:static xl:z-auto xl:pb-0 xl:pt-0 xl:shadow-none"
              : hideRails
                ? "hidden"
                : "hidden xl:flex",
          )}
        >
          <div className="flex h-full min-h-0 flex-col xl:sticky xl:top-0 xl:h-[calc(100dvh-8.5rem)]">
            <ResearchPanel onClose={() => setResearch(false)} />
          </div>
        </aside>
      </div>
      {board ? null : (
        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-bg/95 md:hidden" aria-label="Mobile">
          {MOBILE_NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px]",
                  active ? "text-primary" : "text-muted",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export function BareShell({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("pv-splash") !== "1";
  });

  function finishSplash() {
    try {
      sessionStorage.setItem("pv-splash", "1");
    } catch {
      /* ignore */
    }
    setShowSplash(false);
  }

  if (showSplash) {
    return <SplashScreen onDone={finishSplash} />;
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/planvista-icon.png"
            alt="PlanVista"
            className="size-8 object-contain"
            width={32}
            height={32}
          />
          <span className="text-[20px] tracking-tight">
            PlanVista
            <span className="ml-1.5 text-sm text-muted">Finance</span>
          </span>
          <span className="rounded-sm bg-primary-soft px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
            Beta
          </span>
        </Link>
        <button
          type="button"
          onClick={toggle}
          className="inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </header>
      {children}
    </div>
  );
}

export function NseShell({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("pv-splash") !== "1";
  });

  function finishSplash() {
    try {
      sessionStorage.setItem("pv-splash", "1");
    } catch {
      /* ignore */
    }
    setShowSplash(false);
  }

  if (showSplash) {
    return <SplashScreen onDone={finishSplash} />;
  }

  return <div className="min-h-screen bg-nse-wash text-nse-fg">{children}</div>;
}
