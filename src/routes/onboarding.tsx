import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSiply } from "@/lib/store";
import type { Purpose, RiskProfile, TimeHorizon } from "@/lib/types";
import { useState } from "react";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const PURPOSES: { id: Purpose; title: string; blurb: string }[] = [
  { id: "learn", title: "Learn the markets", blurb: "Explainers, charts and how SIPs actually work." },
  { id: "plan", title: "Plan goals", blurb: "Map SIPs to education, home, emergency or retirement." },
  { id: "research", title: "Research stocks", blurb: "NSE/BSE quotes, news, quarterly results and analysis." },
  { id: "track", title: "Track progress", blurb: "Watchlists, badges and a living surplus check." },
];

function Onboarding() {
  const profile = useSiply((s) => s.profile);
  const setProfile = useSiply((s) => s.setProfile);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState({
    purpose: profile.purpose || ("plan" as Purpose),
    displayName: profile.displayName || "Hardik",
    age: profile.age || 25,
    monthlyIncome: profile.monthlyIncome || 50000,
    monthlySurplus: profile.monthlySurplus || 8000,
    risk: profile.risk,
    timeHorizon: profile.timeHorizon,
  });

  function save(partial?: Partial<typeof draft> & { onboardingComplete?: boolean }) {
    const next = { ...draft, ...partial };
    setDraft(next);
    setProfile({
      purpose: next.purpose,
      displayName: next.displayName,
      age: next.age,
      monthlyIncome: next.monthlyIncome,
      monthlySurplus: next.monthlySurplus,
      risk: next.risk,
      timeHorizon: next.timeHorizon,
      onboardingComplete: partial?.onboardingComplete ?? false,
    });
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <p className="text-xs font-medium uppercase tracking-wide text-subtle">
        Step {step + 1} of 3 · Why you are here
      </p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-chip">
        <div className="h-full bg-primary transition-[width] duration-200" style={{ width: `${((step + 1) / 3) * 100}%` }} />
      </div>

      {step === 0 ? (
        <section className="mt-8">
          <h1 className="text-2xl font-medium tracking-tight">What brings you to PlanVista?</h1>
          <p className="mt-2 text-sm text-muted">You can change this later. It only shapes the home layout.</p>
          <ul className="mt-5 grid gap-2">
            {PURPOSES.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => save({ purpose: p.id })}
                  className={`w-full rounded-lg border px-4 py-3 text-left ${
                    draft.purpose === p.id ? "border-primary bg-primary-soft" : "border-border hover:bg-surface"
                  }`}
                >
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-muted">{p.blurb}</p>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {step === 1 ? (
        <section className="mt-8">
          <h1 className="text-2xl font-medium tracking-tight">Age, income, surplus</h1>
          <p className="mt-2 text-sm text-muted">Used only to size SIPs against what you can actually invest.</p>
          <div className="mt-5 grid gap-3">
            <label className="grid gap-1 text-xs text-muted">
              Display name
              <input
                value={draft.displayName}
                onChange={(e) => save({ displayName: e.target.value })}
                className="h-11 rounded-md border border-border px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1 text-xs text-muted">
                Age
                <input
                  type="number"
                  min={16}
                  max={80}
                  value={draft.age}
                  onChange={(e) => save({ age: Number(e.target.value) })}
                  className="h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="grid gap-1 text-xs text-muted">
                Monthly income (₹)
                <input
                  type="number"
                  min={0}
                  value={draft.monthlyIncome}
                  onChange={(e) => save({ monthlyIncome: Number(e.target.value) })}
                  className="h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
            </div>
            <label className="grid gap-1 text-xs text-muted">
              Amount you can invest / month (₹)
              <input
                type="number"
                min={0}
                value={draft.monthlySurplus}
                onChange={(e) => save({ monthlySurplus: Number(e.target.value) })}
                className="h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="mt-8">
          <h1 className="text-2xl font-medium tracking-tight">Risk and time horizon</h1>
          <p className="mt-2 text-sm text-muted">
            A teaching profile — not a SEBI-registered assessment. You can refine it with the 7-question quiz.
          </p>
          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-subtle">Risk tolerance</p>
          <div className="mt-2 grid gap-2">
            {(
              [
                ["conservative", "Prefer stability. Shorter goals stay in debt/hybrid."],
                ["moderate", "Balanced mix. Default for most multi-year goals."],
                ["aggressive", "Higher equity for long horizons. Expect drawdowns."],
              ] as [RiskProfile, string][]
            ).map(([id, blurb]) => (
              <button
                key={id}
                type="button"
                onClick={() => save({ risk: id })}
                className={`rounded-lg border px-4 py-3 text-left capitalize ${
                  draft.risk === id ? "border-primary bg-primary-soft" : "border-border hover:bg-surface"
                }`}
              >
                <p className="text-sm font-medium">{id}</p>
                <p className="text-xs font-normal normal-case text-muted">{blurb}</p>
              </button>
            ))}
          </div>
          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-subtle">Typical time horizon</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(
              [
                ["short", "< 3 years"],
                ["medium", "3–7 years"],
                ["long", "7+ years"],
              ] as [TimeHorizon, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => save({ timeHorizon: id })}
                className={`rounded-lg border px-3 py-3 text-sm capitalize ${
                  draft.timeHorizon === id ? "border-primary bg-primary-soft" : "border-border hover:bg-surface"
                }`}
              >
                {id}
                <span className="mt-1 block text-[11px] font-normal normal-case text-muted">{label}</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm hover:bg-surface"
          >
            Back
          </button>
        ) : null}
        {step < 2 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg hover:bg-primary-hover"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              save({ onboardingComplete: true });
              void navigate({ to: draft.purpose === "plan" ? "/planner" : "/" });
            }}
            className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg hover:bg-primary-hover"
          >
            Save profile and enter
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            save({ onboardingComplete: true });
            void navigate({ to: "/" });
          }}
          className="inline-flex h-11 items-center px-3 text-sm text-muted hover:text-fg"
        >
          Skip for now
        </button>
      </div>
    </main>
  );
}
