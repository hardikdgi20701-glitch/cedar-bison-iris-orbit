import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { YearPoint } from "@/lib/types";
import { inr } from "@/lib/utils";

type Props = {
  yearly: YearPoint[];
  target?: number;
};

export function GrowthChart({ yearly, target }: Props) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) {
    return <div className="h-64 w-full rounded-md bg-surface-2" />;
  }
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={yearly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="sipFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "var(--color-muted)" }}
            tickFormatter={(v: number) => (v === 0 ? "Now" : `Y${v}`)}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-muted)" }}
            tickFormatter={(v: number) => inr(v, true)}
            axisLine={false}
            tickLine={false}
            width={56}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              fontSize: 12,
              background: "var(--color-bg)",
              color: "var(--color-fg)",
            }}
            formatter={(value, name) => [
              inr(Number(value)),
              name === "corpus" ? "Corpus" : name === "invested" ? "Invested" : String(name),
            ]}
            labelFormatter={(l) => (l === 0 ? "Start" : `Year ${l}`)}
          />
          {target ? (
            <ReferenceLine
              y={target}
              stroke="var(--color-down)"
              strokeDasharray="4 4"
              label={{ value: "Goal", fill: "var(--color-down)", fontSize: 11, position: "insideTopRight" }}
            />
          ) : null}
          <Area type="monotone" dataKey="invested" stroke="var(--color-subtle)" strokeWidth={1} fill="transparent" dot={false} />
          <Area
            type="monotone"
            dataKey="corpus"
            stroke="var(--color-primary)"
            strokeWidth={2.4}
            fill="url(#sipFill)"
            dot={false}
            activeDot={{ r: 4, fill: "var(--color-primary)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
