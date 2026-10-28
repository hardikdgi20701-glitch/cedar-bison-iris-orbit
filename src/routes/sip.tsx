import { createFileRoute } from "@tanstack/react-router";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { projectSip } from "@/lib/finance";
import { inr } from "@/lib/utils";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/sip")({ component: SipCalculator });

function SipCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [stepUp, setStepUp] = useState(10);
  const [existing, setExisting] = useState(0);

  const yearly = useMemo(
    () => projectSip({ monthly, years, annualReturn: rate / 100, stepUp: stepUp / 100, existing }),
    [monthly, years, rate, stepUp, existing],
  );
  const last = yearly[yearly.length - 1];
  const invested = last?.invested ?? 0;
  const corpus = last?.corpus ?? 0;
  const gain = corpus - invested;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">SIP calculator</h1>
        <p className="mt-1 text-sm text-muted">
          Illustrative compounding with an optional annual step-up. Not a return guarantee.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <form className="grid gap-3 rounded-xl border border-border p-4" onSubmit={(e) => e.preventDefault()}>
          <Num label="Monthly SIP (₹)" value={monthly} min={500} step={500} onChange={setMonthly} />
          <Num label="Years" value={years} min={1} max={40} step={1} onChange={setYears} />
          <Num label="Expected return % / yr" value={rate} min={1} max={20} step={0.5} onChange={setRate} />
          <Num label="Annual step-up %" value={stepUp} min={0} max={25} step={1} onChange={setStepUp} />
          <Num label="Already invested (₹)" value={existing} min={0} step={1000} onChange={setExisting} />
        </form>
        <div className="space-y-4">
          <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-border">
            <Tile k="Invested" v={inr(invested, true)} />
            <Tile k="Est. corpus" v={inr(corpus, true)} />
            <Tile k="Est. gain" v={inr(gain, true)} />
          </div>
          <div className="rounded-xl border border-border p-3 sm:p-4">
            <GrowthChart yearly={yearly} />
          </div>
          <p className="text-xs text-subtle">
            For learning purposes only. Markets do not compound in a straight line; use the goal planner for a
            risk-aware mix.
          </p>
        </div>
      </div>
    </div>
  );
}

function Num({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="grid gap-1 text-xs text-muted">
      {label}
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-11 rounded-md border border-border px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}

function Tile({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-border p-3 even:border-l">
      <p className="text-[11px] uppercase tracking-wide text-subtle">{k}</p>
      <p className="mt-1 text-lg font-medium tabular-nums">{v}</p>
    </div>
  );
}
