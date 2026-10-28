import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AllocationBar } from "@/components/charts/AllocationBar";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { GoalForm } from "@/components/goals/GoalForm";
import { planGoal } from "@/lib/finance";
import { useSiply } from "@/lib/store";
import { inr, pct } from "@/lib/utils";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/goal/$id")({ component: GoalPage });

function GoalPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const goal = useSiply((s) => s.goals.find((g) => g.id === id));
  const profile = useSiply((s) => s.profile);
  const updateGoal = useSiply((s) => s.updateGoal);
  const removeGoal = useSiply((s) => s.removeGoal);
  const [tab, setTab] = useState<"overview" | "allocation" | "whatif" | "edit">("overview");
  const [bump, setBump] = useState(0);

  const plan = useMemo(() => (goal ? planGoal(goal, profile.risk, profile.monthlySurplus, true) : null), [goal, profile]);
  const whatIf = useMemo(() => {
    if (!goal || !plan) return null;
    const g = { ...goal, monthlySipOverride: plan.requiredSip + bump };
    return planGoal(g, profile.risk, profile.monthlySurplus, true);
  }, [goal, plan, bump, profile]);

  if (!goal || !plan) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted">This goal is not on the watchlist.</p>
        <Link to="/planner" className="mt-3 inline-block text-primary hover:underline">
          Back to watchlist
        </Link>
      </div>
    );
  }

  const up = plan.sipVsSavingPct >= 0;

  return (
    <div className="space-y-5">
      <p className="text-xs text-subtle">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="capitalize">{goal.category}</span>
      </p>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">{goal.name}</h1>
          <p className="mt-1 text-sm text-muted">
            {goal.years} years · inflation {(goal.inflation * 100).toFixed(0)}% · {plan.horizon} horizon
          </p>
        </div>
        <button
          type="button"
          className="text-sm text-muted hover:text-down"
          onClick={() => {
            removeGoal(goal.id);
            void navigate({ to: "/planner" });
          }}
        >
          Remove
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-subtle">Required SIP</p>
          <p className="text-4xl font-medium tabular-nums tracking-tight">{inr(plan.requiredSip)}</p>
        </div>
        <div>
          <p className={`text-sm font-medium tabular-nums ${up ? "text-up" : "text-down"}`}>
            {up ? "Lower" : "Higher"} SIP than cash-saving by {Math.abs(plan.sipVsSavingPct).toFixed(0)}%
          </p>
          <p className="text-xs text-muted">
            Target {inr(plan.futureCost, true)} · success{" "}
            {plan.successRate == null ? "—" : pct(plan.successRate, 0).replace("+", "")}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border p-3 sm:p-4">
        <GrowthChart yearly={plan.yearly} target={plan.futureCost} />
      </div>

      <div className="flex gap-1 border-b border-border">
        {(
          [
            ["overview", "Overview"],
            ["allocation", "Allocation"],
            ["whatif", "What-if"],
            ["edit", "Edit"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`border-b-2 px-3 py-2.5 text-sm ${
              tab === k ? "border-primary font-medium text-primary" : "border-transparent text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card k="Inflated target" v={inr(plan.futureCost)} />
          <Card k="You invest" v={inr(plan.totalInvested)} />
          <Card k="Projected corpus" v={inr(plan.projectedCorpus)} />
          <Card k="Expected return" v={`${(plan.expectedReturn * 100).toFixed(1)}%`} />
          <Card k="P10 / P90" v={`${inr(plan.p10 ?? 0, true)} · ${inr(plan.p90 ?? 0, true)}`} />
          <Card k="Affordability" v={plan.affordability} />
          <p className="sm:col-span-3 text-sm leading-relaxed text-muted">{plan.explanation}</p>
        </div>
      ) : null}

      {tab === "allocation" ? (
        <div className="space-y-4">
          <AllocationBar allocation={plan.allocation} />
          <ul className="divide-y divide-border rounded-lg border border-border">
            {plan.funds.map((f) => (
              <li key={f.name} className="px-4 py-3">
                <p className="text-sm font-medium">{f.name}</p>
                <p className="text-xs capitalize text-subtle">
                  {f.sleeve} sleeve · {Math.round(f.weight * 100)}%
                </p>
                <p className="mt-1 text-sm text-muted">{f.why}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {tab === "whatif" && whatIf ? (
        <div>
          <label className="text-sm text-muted">
            Extra SIP each month: <span className="font-medium tabular-nums text-fg">{inr(bump)}</span>
          </label>
          <input
            type="range"
            min={0}
            max={3000}
            step={100}
            value={bump}
            onChange={(e) => setBump(Number(e.target.value))}
            className="mt-2 w-full accent-primary"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Card k="New SIP" v={inr(whatIf.usedSip)} />
            <Card k="Projected" v={inr(whatIf.projectedCorpus)} />
            <Card k="Hit rate" v={whatIf.successRate == null ? "—" : pct(whatIf.successRate, 0).replace("+", "")} />
          </div>
          <div className="mt-4 rounded-lg border border-border p-3">
            <GrowthChart yearly={whatIf.yearly} target={plan.futureCost} />
          </div>
        </div>
      ) : null}

      {tab === "edit" ? (
        <div className="max-w-lg rounded-lg border border-border p-4">
          <GoalForm
            initial={goal}
            submitLabel="Save goal"
            onSubmit={(d) => updateGoal(goal.id, d)}
          />
        </div>
      ) : null}
    </div>
  );
}

function Card({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="text-[11px] uppercase tracking-wide text-subtle">{k}</p>
      <p className="mt-1 text-lg font-medium capitalize tabular-nums">{v}</p>
    </div>
  );
}
