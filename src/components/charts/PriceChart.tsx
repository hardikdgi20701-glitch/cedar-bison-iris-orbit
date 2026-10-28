import { useEffect, useMemo, useState } from "react";
import {
  Area,
  Bar,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartSeries, QuoteRange } from "@/lib/market/types";
import { cn, formatMoney } from "@/lib/utils";

const RANGES: { id: QuoteRange; label: string }[] = [
  { id: "1d", label: "1D" },
  { id: "5d", label: "5D" },
  { id: "1mo", label: "1M" },
  { id: "6mo", label: "6M" },
  { id: "ytd", label: "YTD" },
  { id: "1y", label: "1Y" },
  { id: "5y", label: "5Y" },
  { id: "max", label: "MAX" },
];

export function RangeTabs({
  value,
  onChange,
}: {
  value: QuoteRange;
  onChange: (r: QuoteRange) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {RANGES.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => onChange(r.id)}
          className={cn(
            "h-8 min-w-10 rounded-full px-3 text-xs font-medium",
            value === r.id ? "bg-chip text-fg" : "text-muted hover:bg-surface hover:text-fg",
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

export function PriceChart({ series, up }: { series: ChartSeries; up: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const data = useMemo(
    () => series.points.map((p) => ({ t: p.t, close: p.close, volume: p.volume ?? 0 })),
    [series.points],
  );
  const stroke = up ? "var(--color-up)" : "var(--color-down)";
  const fillId = up ? "pvUp" : "pvDown";
  if (!ready) return <div className="h-72 w-full rounded-md bg-surface" />;
  if (!data.length) {
    return <div className="grid h-72 place-items-center text-sm text-muted">No chart data for this range.</div>;
  }
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="pvUp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-up)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--color-up)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="pvDown" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-down)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--color-down)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="t"
            tick={{ fontSize: 11, fill: "var(--color-subtle)" }}
            tickFormatter={(v: number) => formatTick(v, series.range)}
            axisLine={false}
            tickLine={false}
            minTickGap={32}
          />
          <YAxis
            yAxisId="p"
            orientation="right"
            domain={["auto", "auto"]}
            tick={{ fontSize: 11, fill: "var(--color-subtle)" }}
            tickFormatter={(v: number) =>
              v >= 1000 ? v.toLocaleString("en-IN", { maximumFractionDigits: 0 }) : v.toFixed(2)
            }
            axisLine={false}
            tickLine={false}
            width={64}
          />
          <YAxis yAxisId="v" hide domain={[0, "auto"]} />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const row = payload[0].payload as { t: number; close: number; volume: number };
              return (
                <div className="rounded-md border border-border bg-bg px-3 py-2 text-xs shadow-md">
                  <p className="text-muted">{new Date(row.t).toLocaleString("en-IN")}</p>
                  <p className="mt-0.5 font-medium tabular-nums">
                    {formatMoney(row.close, series.currency)}
                  </p>
                </div>
              );
            }}
          />
          <ReferenceLine
            yAxisId="p"
            y={series.previousClose}
            stroke="var(--color-subtle)"
            strokeDasharray="3 4"
          />
          <Bar yAxisId="v" dataKey="volume" fill="var(--color-border)" opacity={0.55} />
          <Area
            yAxisId="p"
            type="monotone"
            dataKey="close"
            stroke={stroke}
            strokeWidth={1.8}
            fill={`url(#${fillId})`}
            dot={false}
            activeDot={{ r: 4, fill: stroke, strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function formatTick(t: number, range: QuoteRange): string {
  const d = new Date(t);
  if (range === "1d") return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  if (range === "5d") return d.toLocaleDateString("en-IN", { weekday: "short" });
  if (range === "5y" || range === "max") return d.toLocaleDateString("en-IN", { year: "2-digit" });
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
