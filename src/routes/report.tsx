import { createFileRoute, Link } from "@tanstack/react-router";
import { AllocationBar } from "@/components/charts/AllocationBar";
import { planAll } from "@/lib/finance";
import { useSiply } from "@/lib/store";
import { inr, pct } from "@/lib/utils";
import { useMemo } from "react";

export const Route = createFileRoute("/report")({ component: Report });

function Report() {
  const profile = useSiply((s) => s.profile);
  const goals = useSiply((s) => s.goals);
  const plan = useMemo(() => planAll(profile, goals, true), [profile, goals]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="no-print mb-6 flex flex-wrap gap-2">
        <Link to="/progress" className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm hover:bg-surface">
          Back
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-hover"
        >
          Print / save PDF
        </button>
      </div>
      <p className="text-xs uppercase tracking-wide text-subtle">PlanVista Finance · educational plan</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight">
        {profile.displayName ? `${profile.displayName}'s SIP plan` : "SIP plan"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Age {profile.age} · {profile.risk} risk · {profile.timeHorizon} horizon · surplus {inr(profile.monthlySurplus)}
        /mo
      </p>
      <p className="mt-3 rounded-md bg-warn-soft px-3 py-2 text-xs">
        For learning purposes only. Not investment advice. Not a SEBI-registered advisor. Figures are illustrative.
      </p>

      <section className="mt-6 grid grid-cols-3 overflow-hidden rounded-lg border border-border">
        <Cell k="Required SIP" v={inr(plan.totals.monthlySip)} />
        <Cell k="Gap vs surplus" v={inr(plan.totals.gap)} />
        <Cell
          k="Utilisation"
          v={plan.totals.utilization == null ? "—" : pct(plan.totals.utilization, 0).replace("+", "")}
        />
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Goals</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs text-muted">
            <tr>
              <th className="py-2">Goal</th>
              <th className="py-2 text-right">Years</th>
              <th className="py-2 text-right">Target</th>
              <th className="py-2 text-right">SIP / mo</th>
              <th className="py-2 text-right">Hit rate</th>
            </tr>
          </thead>
          <tbody>
            {plan.goals.map((g) => {
              const src = goals.find((x) => x.id === g.id);
              return (
                <tr key={g.id} className="border-t border-border">
                  <td className="py-2">{src?.name}</td>
                  <td className="py-2 text-right tabular-nums">{src?.years}</td>
                  <td className="py-2 text-right tabular-nums">{inr(g.futureCost, true)}</td>
                  <td className="py-2 text-right tabular-nums">{inr(g.requiredSip)}</td>
                  <td className="py-2 text-right tabular-nums">
                    {g.successRate == null ? "—" : pct(g.successRate, 0).replace("+", "")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {plan.goals[0] ? (
        <section className="mt-8">
          <h2 className="text-lg font-medium">Sample mix (first goal)</h2>
          <div className="mt-3">
            <AllocationBar allocation={plan.goals[0].allocation} />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{plan.goals[0].explanation}</p>
        </section>
      ) : null}

      <footer className="mt-10 border-t border-border pt-4 text-xs text-subtle">
        Prepared in PlanVista Finance ·{" "}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=hardikk.vimal@gmail.com&su=PlanVista"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          hardikk.vimal@gmail.com
        </a>{" "}
        · {new Date().toLocaleDateString("en-IN")}
      </footer>
    </main>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-border p-3 even:border-l">
      <p className="text-[11px] uppercase tracking-wide text-subtle">{k}</p>
      <p className="mt-1 text-lg font-medium tabular-nums">{v}</p>
    </div>
  );
}
