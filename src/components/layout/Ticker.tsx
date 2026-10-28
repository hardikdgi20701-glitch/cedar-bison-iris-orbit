import { useState } from "react";
import { TICKER } from "@/lib/demo";
import { getQuotes } from "@/lib/market/server";
import { cn, formatMoney, pct } from "@/lib/utils";
import { useLiveRefresh } from "@/hooks/useLiveRefresh";

type Row = { symbol: string; value: string; change: number };

export function Ticker() {
  const [rows, setRows] = useState<Row[]>(
    TICKER.map((t) => ({ symbol: t.symbol, value: "—", change: 0 })),
  );

  useLiveRefresh(() => {
    return getQuotes({ data: { symbols: TICKER.map((t) => t.yahoo) } })
      .then((quotes) => {
        const by = new Map(quotes.map((q) => [q.symbol, q]));
        setRows(
          TICKER.map((t) => {
            const q = by.get(t.yahoo);
            return {
              symbol: t.symbol,
              value: q ? formatMoney(q.price, q.currency) : "—",
              change: q?.changePct ?? 0,
            };
          }),
        );
      })
      .catch(() => {
        /* keep last */
      });
  }, 1000);

  const items = [...rows, ...rows];
  return (
    <div className="overflow-hidden border-b border-border bg-bg">
      <div className="flex w-max animate-[ticker_36s_linear_infinite] gap-8 px-4 py-2 text-xs">
        {items.map((t, i) => {
          const up = t.change >= 0;
          return (
            <div key={t.symbol + i} className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="font-medium text-fg">{t.symbol}</span>
              <span className="tabular-nums text-fg">{t.value}</span>
              <span className={cn("tabular-nums", up ? "text-up" : "text-down")}>{pct(t.change)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
