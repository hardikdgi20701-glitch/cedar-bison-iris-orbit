import { useState } from "react";
import { CATEGORIES } from "@/lib/store";
import type { Goal, GoalCategory } from "@/lib/types";

export type GoalDraft = {
  name: string;
  category: GoalCategory;
  todayCost: number;
  years: number;
  inflation: number;
  existing: number;
  stepUp: number;
};

const empty: GoalDraft = {
  name: "",
  category: "education",
  todayCost: 50000,
  years: 3,
  inflation: 0.06,
  existing: 0,
  stepUp: 0.1,
};

export function GoalForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Add to watchlist",
}: {
  initial?: Partial<Goal>;
  onSubmit: (d: GoalDraft) => void;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const [d, setD] = useState<GoalDraft>({
    ...empty,
    ...initial,
    inflation: initial?.inflation ?? empty.inflation,
    stepUp: initial?.stepUp ?? empty.stepUp,
  });

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!d.name.trim()) return;
        onSubmit({ ...d, name: d.name.trim() });
      }}
    >
      <label className="grid gap-1 text-xs font-medium text-muted">
        Goal name
        <input
          required
          value={d.name}
          onChange={(e) => setD({ ...d, name: e.target.value })}
          placeholder="Semester fees, coding laptop…"
          className="h-11 rounded-md border border-border bg-bg px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-primary/30"
        />
      </label>
      <label className="grid gap-1 text-xs font-medium text-muted">
        Category
        <select
          value={d.category}
          onChange={(e) => setD({ ...d, category: e.target.value as GoalCategory })}
          className="h-11 rounded-md border border-border bg-bg px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1 text-xs font-medium text-muted">
          Cost today (₹)
          <input
            type="number"
            min={0}
            value={d.todayCost}
            onChange={(e) => setD({ ...d, todayCost: Number(e.target.value) })}
            className="h-11 rounded-md border border-border bg-bg px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="grid gap-1 text-xs font-medium text-muted">
          Years to goal
          <input
            type="number"
            min={0.25}
            step={0.25}
            value={d.years}
            onChange={(e) => setD({ ...d, years: Number(e.target.value) })}
            className="h-11 rounded-md border border-border bg-bg px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="grid gap-1 text-xs font-medium text-muted">
          Inflation % / yr
          <input
            type="number"
            min={0}
            step={0.5}
            value={+(d.inflation * 100).toFixed(2)}
            onChange={(e) => setD({ ...d, inflation: Number(e.target.value) / 100 })}
            className="h-11 rounded-md border border-border bg-bg px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="grid gap-1 text-xs font-medium text-muted">
          Already saved (₹)
          <input
            type="number"
            min={0}
            value={d.existing}
            onChange={(e) => setD({ ...d, existing: Number(e.target.value) })}
            className="h-11 rounded-md border border-border bg-bg px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
      </div>
      <label className="grid gap-1 text-xs font-medium text-muted">
        Annual step-up %
        <input
          type="number"
          min={0}
          max={30}
          step={1}
          value={+(d.stepUp * 100).toFixed(1)}
          onChange={(e) => setD({ ...d, stepUp: Number(e.target.value) / 100 })}
          className="h-11 rounded-md border border-border bg-bg px-3 text-sm tabular-nums outline-none focus:ring-2 focus:ring-primary/30"
        />
      </label>
      <div className="mt-1 flex flex-wrap gap-2">
        <button
          type="submit"
          className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg hover:bg-primary-hover"
        >
          {submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 items-center rounded-full px-4 text-sm text-muted hover:bg-surface"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
