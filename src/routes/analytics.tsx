import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getMarketHome, getQuotes } from "@/lib/market/server";
import { DEFAULT_WATCHLIST } from "@/lib/market/universe";
import type { MarketQuote } from "@/lib/market/types";
import { useSiply } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { cn, pct } from "@/lib/utils";

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

function AnalyticsPage() {
  const profile = useSiply((s) => s.profile);
  const watchlist = useSiply((s) => s.watchlist);
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);

  useEffect(() => {
    let live = true;
    void Promise.all([
      getMarketHome({ data: { region: "india" } }),
      getQuotes({ data: { symbols: (watchlist.length ? watchlist : DEFAULT_WATCHLIST).slice(0, 12) } }),
    ]).then(([home, list]) => {
      if (!live) return;
      const map = new Map<string, MarketQuote>();
      for (const q of [...home.quotes, ...list]) map.set(q.symbol, q);
      setQuotes([...map.values()]);
    });
    return () => {
      live = false;
    };
  }, [watchlist]);

  const breadth = useMemo(() => {
    const bull = quotes.filter((q) => q.change >= 0).length;
    const bear = quotes.length - bull;
    const avg = quotes.length ? quotes.reduce((s, q) => s + q.changePct, 0) / quotes.length : 0;
    const best = [...quotes].sort((a, b) => b.changePct - a.changePct)[0];
    const worst = [...quotes].sort((a, b) => a.changePct - b.changePct)[0];
    return { bull, bear, avg, best, worst };
  }, [quotes]);

  const bars = quotes.slice(0, 12).map((q) => ({
    name: (q.shortName || q.name).slice(0, 10),
    pct: Number((q.changePct * 100).toFixed(2)),
    bull: q.change >= 0,
  }));

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-medium tracking-tight">Analytics</h1>
        <p className="text-sm text-muted">
          Breadth of this delayed board plus your stored risk-fitness percentage. Teaching stats, not a model
          portfolio.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Your risk score</p>
          <p
            className={cn(
              "text-4xl font-medium tabular-nums",
              (profile.riskScore ?? 0) >= 70 ? "text-bull" : "text-bear",
            )}
          >
            {profile.riskScore || "—"}%
          </p>
          <p className="text-xs text-subtle">
            {profile.riskGatePassed ? "Gate cleared" : "Take the knowledge gate"} ·{" "}
            <Link to="/gate" className="text-primary hover:underline">
              Retake
            </Link>
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Bull vs bear</p>
          <p className="text-4xl font-medium tabular-nums">
            <span className="text-bull">{breadth.bull}</span>
            <span className="text-muted"> / </span>
            <span className="text-bear">{breadth.bear}</span>
          </p>
          <p className="text-xs text-subtle">Names up vs down on this board</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Average move</p>
          <p className={cn("text-4xl font-medium tabular-nums", breadth.avg >= 0 ? "text-bull" : "text-bear")}>
            {pct(breadth.avg)}
          </p>
          <p className="text-xs text-subtle">Equal-weight across listed names</p>
        </Card>
      </div>
      <Card className="p-4">
        <p className="mb-3 text-sm text-muted">Session change %</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bars} margin={{ top: 8, right: 8, left: 0, bottom: 24 }}>
              <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 10 }} interval={0} angle={-35} textAnchor="end" />
              <YAxis tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                {bars.map((b) => (
                  <Cell key={b.name} fill={b.bull ? "var(--color-bull)" : "var(--color-bear)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      {breadth.best && breadth.worst ? (
        <p className="text-sm text-muted">
          Strongest print {breadth.best.name} ({pct(breadth.best.changePct)}). Weakest {breadth.worst.name} (
          {pct(breadth.worst.changePct)}). Still not a recommendation.
        </p>
      ) : null}
    </div>
  );
}
