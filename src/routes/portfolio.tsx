import { createFileRoute, Link } from "@tanstack/react-router";
import { AllocationBar } from "@/components/charts/AllocationBar";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { computeWithPython } from "@/lib/compute";
import { planAll } from "@/lib/finance";
import { useSiply } from "@/lib/store";
import type { Allocation, PlanResult } from "@/lib/types";
import { inr, pct } from "@/lib/utils";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/portfolio")({ component: Portfolio });

function blend(plans: PlanResult["goals"]): Allocation {
  const w = { equity: 0, hybrid: 0, debt: 0, gold: 0 };
  const t = plans.reduce((s, p) => s + p.requiredSip, 0) || 1;
  for (const p of plans) {
    (Object.keys(w) as (keyof Allocation)[]).forEach((k) => {
      w[k] += p.allocation[k] * (p.requiredSip / t);
    });
  }
  return w;
}

function Portfolio() {
  const profile = useSiply((s) => s.profile);
  const goals = useSiply((s) => s.goals);
  const local = useMemo(() => planAll(profile, goals, true), [profile, goals]);
  const [engine, setEngine] = useState<"local" | "python">("local");
  const [remote, setRemote] = useState<PlanResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const plan = remote ?? local;
  const alloc = blend(plan.goals);
  const combinedYearly = mergeYearly(plan);

  async function runPython() {
    setBusy(true);
    setErr(null);
    try {
      const res = await computeWithPython({
        data: { profile, goals, monteCarlo: true },
      });
      setRemote(res);
      setEngine("python");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Python engine unavailable — showing local engine.");
      setRemote(null);
      setEngine("local");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">Portfolio</h1>
          <p className="mt-1 text-sm text-muted">
            Goals treated as holdings. Mix is SIP-weighted, not a live folio.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted">
            Engine: {engine === "python" ? "Python" : "Local"}
          </span>
          <button
            type="button"
            disabled={busy}
            onClick={() => void runPython()}
            className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm hover:bg-surface disabled:opacity-50"
          >
            {busy ? "Computing…" : "Recompute in Python"}
          </button>
        </div>
      </div>
      {err ? <p className="text-sm text-down">{err}</p> : null}

      <section className="rounded-lg border border-border p-4 sm:p-5">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-subtle">Required monthly SIP</p>
            <p className="mt-1 text-3xl font-medium tabular-nums">{inr(plan.totals.monthlySip)}</p>
            <p className="text-sm text-muted">
              Surplus {inr(plan.totals.surplus)} · gap{" "}
              <span className={plan.totals.gap > 0 ? "text-down" : "text-up"}>{inr(plan.totals.gap)}</span>
            </p>
            <div className="mt-5">
              <AllocationBar allocation={alloc} />
            </div>
          </div>
          <GrowthChart yearly={combinedYearly} />
        </div>
      </section>

      <section className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-surface text-xs text-muted">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Holding (goal)</th>
              <th className="px-3 py-2 text-right font-medium">SIP</th>
              <th className="px-3 py-2 text-right font-medium">Target</th>
              <th className="px-3 py-2 text-right font-medium">Projected</th>
              <th className="px-3 py-2 text-right font-medium">Hit rate</th>
              <th className="px-3 py-2 text-left font-medium">Mix</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((g) => {
              const p = plan.goals.find((x) => x.id === g.id);
              if (!p) return null;
              return (
                <tr key={g.id} className="border-t border-border">
                  <td className="px-3 py-3">
                    <Link to="/goal/$id" params={{ id: g.id }} className="font-medium text-primary hover:underline">
                      {g.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">{inr(p.requiredSip)}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{inr(p.futureCost, true)}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{inr(p.projectedCorpus, true)}</td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {p.successRate == null ? "—" : pct(p.successRate, 0).replace("+", "")}
                  </td>
                  <td className="px-3 py-3 text-xs text-muted">
                    E {Math.round(p.allocation.equity * 100)} / D {Math.round(p.allocation.debt * 100)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function mergeYearly(plan: PlanResult) {
  const maxY = Math.max(0, ...plan.goals.flatMap((g) => g.yearly.map((y) => y.year)));
  const years = Array.from({ length: Math.ceil(maxY) + 1 }, (_, i) => i);
  return years.map((year) => {
    let corpus = 0;
    let invested = 0;
    for (const g of plan.goals) {
      const row = [...g.yearly].reverse().find((y) => y.year <= year) ?? g.yearly[0];
      if (row) {
        corpus += row.corpus;
        invested += row.invested;
      }
    }
    return { year, sip: 0, corpus, invested };
  });
}
