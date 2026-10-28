import { createFileRoute, Link } from "@tanstack/react-router";
import { GoalForm } from "@/components/goals/GoalForm";
import { planAll } from "@/lib/finance";
import { useSiply } from "@/lib/store";
import { inr } from "@/lib/utils";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/planner")({ component: Planner });

function Planner() {
  const profile = useSiply((s) => s.profile);
  const setProfile = useSiply((s) => s.setProfile);
  const goals = useSiply((s) => s.goals);
  const addGoal = useSiply((s) => s.addGoal);
  const removeGoal = useSiply((s) => s.removeGoal);
  const loadDemo = useSiply((s) => s.loadDemo);
  const reset = useSiply((s) => s.reset);
  const plan = useMemo(() => planAll(profile, goals, false), [profile, goals]);
  const [open, setOpen] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">Goals</h1>
        <p className="mt-1 text-sm text-muted">
          Each goal is a named SIP. Totals update against your monthly surplus.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-hover"
          >
            New goal
          </button>
          <button
            type="button"
            onClick={loadDemo}
            className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm hover:bg-surface"
          >
            Load sample student
          </button>
          <button type="button" onClick={reset} className="inline-flex h-10 items-center px-3 text-sm text-muted hover:text-down">
            Clear
          </button>
        </div>

        {open ? (
          <div className="mt-4 rounded-lg border border-border p-4">
            <h2 className="mb-3 text-sm font-medium">Add goal</h2>
            <GoalForm
              onSubmit={(d) => {
                addGoal({ ...d, monthlySipOverride: null });
                setOpen(false);
              }}
              onCancel={() => setOpen(false)}
            />
          </div>
        ) : null}

        <ul className="mt-5 divide-y divide-border overflow-hidden rounded-lg border border-border">
          {goals.map((g) => {
            const p = plan.goals.find((x) => x.id === g.id);
            return (
              <li key={g.id} className="flex flex-wrap items-center gap-3 px-3 py-3 sm:px-4">
                <div className="min-w-0 flex-1">
                  <Link to="/goal/$id" params={{ id: g.id }} className="font-medium text-primary hover:underline">
                    {g.name}
                  </Link>
                  <p className="text-xs text-muted">
                    {g.years}y · {g.category} · today {inr(g.todayCost, true)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium tabular-nums">{p ? inr(p.requiredSip) : "—"}</p>
                  <p className="text-[11px] text-subtle">SIP / mo</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeGoal(g.id)}
                  className="h-10 px-2 text-xs text-muted hover:text-down"
                >
                  Remove
                </button>
              </li>
            );
          })}
          {goals.length === 0 ? (
            <li className="px-4 py-10 text-center text-sm text-muted">Watchlist empty.</li>
          ) : null}
        </ul>
      </div>

      <aside className="space-y-4">
        <section className="rounded-lg border border-border p-4">
          <h2 className="text-sm font-medium">Investor profile</h2>
          <label className="mt-3 grid gap-1 text-xs text-muted">
            Name
            <input
              value={profile.displayName}
              onChange={(e) => setProfile({ displayName: e.target.value })}
              className="h-11 rounded-md border border-border px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <label className="mt-3 grid gap-1 text-xs text-muted">
            Age
            <input
              type="number"
              min={16}
              max={30}
              value={profile.age}
              onChange={(e) => setProfile({ age: Number(e.target.value) })}
              className="h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <label className="mt-3 grid gap-1 text-xs text-muted">
            Monthly surplus (₹)
            <input
              type="number"
              min={0}
              value={profile.monthlySurplus}
              onChange={(e) => setProfile({ monthlySurplus: Number(e.target.value) })}
              className="h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <p className="mt-3 text-xs text-muted">
            Risk: <span className="font-medium capitalize text-fg">{profile.risk}</span>
            {" · "}
            <Link to="/quiz" className="text-primary hover:underline">
              Retake quiz
            </Link>
          </p>
        </section>
        <section className="rounded-lg border border-border p-4">
          <h2 className="text-sm font-medium">Surplus check</h2>
          <p className="mt-2 text-2xl font-medium tabular-nums">{inr(plan.totals.monthlySip)}</p>
          <p className="text-xs text-muted">required vs {inr(plan.totals.surplus)} surplus</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-chip">
            <div
              className={`h-full ${plan.totals.gap > 0 ? "bg-down" : "bg-up"}`}
              style={{
                width: `${Math.min(100, ((plan.totals.utilization ?? 0) * 100) || 0)}%`,
              }}
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            {plan.totals.gap > 0
              ? "Plan is a stretch — extend timelines or add a step-up."
              : "Required SIPs fit inside the surplus."}
          </p>
        </section>
      </aside>
    </div>
  );
}
