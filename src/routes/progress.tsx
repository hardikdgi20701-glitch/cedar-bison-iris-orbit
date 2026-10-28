import { createFileRoute, Link } from "@tanstack/react-router";
import { RiskMeter } from "@/components/quiz/RiskMeter";
import { planAll } from "@/lib/finance";
import { BADGE_META, useSiply } from "@/lib/store";
import { inr, pct } from "@/lib/utils";
import { useMemo } from "react";

export const Route = createFileRoute("/progress")({ component: Progress });

function Progress() {
  const profile = useSiply((s) => s.profile);
  const goals = useSiply((s) => s.goals);
  const badges = useSiply((s) => s.badges);
  const watchlist = useSiply((s) => s.watchlist);
  const read = useSiply((s) => s.readSlugs);
  const plan = useMemo(() => planAll(profile, goals, false), [profile, goals]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">Track progress</h1>
          <p className="mt-1 text-sm text-muted">
            {profile.displayName ? `${profile.displayName} · ` : ""}
            {profile.risk} risk · knowledge quiz {profile.riskScore || 0}% · {profile.timeHorizon} horizon · age{" "}
            {profile.age}
          </p>
        </div>
        <Link
          to="/report"
          className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm hover:bg-surface"
        >
          PDF / print plan
        </Link>
      </div>

      <section className="grid gap-3 sm:grid-cols-4">
        <Tile k="Monthly surplus" v={inr(profile.monthlySurplus)} />
        <Tile k="Required SIP" v={inr(plan.totals.monthlySip)} />
        <Tile k="Goals" v={String(goals.length)} />
        <Tile k="Stock list" v={String(watchlist.length)} />
      </section>

      <section className="rounded-xl border border-border p-4">
        <h2 className="text-sm font-medium">Risk knowledge quiz</h2>
        <p className="mt-1 text-xs text-muted">
          Daily beginner gate. 70% required to use the learning platform. Last taken{" "}
          {profile.lastQuizDate || "—"}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-6">
          <RiskMeter percent={profile.riskScore || 0} size={140} label="Your score" passAt={70} />
          <div className="text-sm text-muted">
            <p>
              Status:{" "}
              <span className={profile.riskGatePassed ? "text-emerald-400" : "text-rose-400"}>
                {profile.riskGatePassed ? "Passed" : "Locked"}
              </span>
            </p>
            <Link to="/gate" className="mt-2 inline-block text-primary hover:underline">
              Sign in and retake knowledge quiz
            </Link>
            <Link to="/quiz" className="mt-2 block text-primary hover:underline">
              Sign in and take risk-factor quiz
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border p-4">
        <h2 className="text-sm font-medium">Surplus used</h2>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-chip">
          <div
            className={plan.totals.gap > 0 ? "h-full bg-down" : "h-full bg-up"}
            style={{ width: `${Math.min(100, (plan.totals.utilization ?? 0) * 100)}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted">
          {plan.totals.utilization == null
            ? "Add a surplus in onboarding to see utilisation."
            : `${pct(plan.totals.utilization, 0).replace("+", "")} of surplus assigned to SIPs.`}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-base font-medium">Goals</h2>
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
          {goals.map((g) => {
            const p = plan.goals.find((x) => x.id === g.id);
            return (
              <li key={g.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <Link to="/goal/$id" params={{ id: g.id }} className="font-medium text-primary hover:underline">
                    {g.name}
                  </Link>
                  <p className="text-xs text-muted">
                    {g.years}y · {g.category}
                  </p>
                </div>
                <p className="text-sm tabular-nums">{p ? inr(p.requiredSip) : "—"} / mo</p>
              </li>
            );
          })}
          {goals.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-muted">
              No goals yet.{" "}
              <Link to="/planner" className="text-primary hover:underline">
                Add one
              </Link>
            </li>
          ) : null}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-base font-medium">Badges</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(BADGE_META) as (keyof typeof BADGE_META)[]).map((id) => {
            const on = badges.includes(id);
            return (
              <li
                key={id}
                className={`rounded-lg border px-4 py-3 ${on ? "border-primary bg-primary-soft" : "border-border opacity-60"}`}
              >
                <p className="text-sm font-medium">{BADGE_META[id].label}</p>
                <p className="text-xs text-muted">{BADGE_META[id].hint}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-subtle">{read.length} explainer{read.length === 1 ? "" : "s"} read.</p>
      </section>
    </div>
  );
}

function Tile({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-[11px] uppercase tracking-wide text-subtle">{k}</p>
      <p className="mt-1 text-xl font-medium tabular-nums">{v}</p>
    </div>
  );
}
