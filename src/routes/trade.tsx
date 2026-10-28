import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CandleChart } from "@/components/charts/CandleChart";
import { RangeTabs } from "@/components/charts/PriceChart";
import { TapeStamp } from "@/components/markets/TapeStamp";
import { useLiveRefresh } from "@/hooks/useLiveRefresh";
import { getQuoteBundle, getQuotes } from "@/lib/market/server";
import type { QuoteBundle, QuoteRange } from "@/lib/market/types";
import { PAPER_CASH, paperEquity, usePaper, type PaperSide } from "@/lib/paper";
import { useSiply } from "@/lib/store";
import { cn, formatMoney, inr, pct } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/trade")({
  validateSearch: (search: Record<string, unknown>): { symbol?: string; side?: "buy" | "sell" } => ({
    symbol: typeof search.symbol === "string" && search.symbol.trim() ? search.symbol : undefined,
    side: search.side === "sell" ? "sell" : search.side === "buy" ? "buy" : undefined,
  }),
  component: TradeDesk,
});

function TradeDesk() {
  const search = Route.useSearch();
  const symbol = search.symbol || "^NSEI";
  const side = search.side === "sell" ? "sell" : "buy";
  const navigate = useNavigate();
  const [range, setRange] = useState<QuoteRange>("6mo");
  const [bundle, setBundle] = useState<QuoteBundle | null>(null);
  const [qty, setQty] = useState(1);
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [limit, setLimit] = useState("");
  const [stop, setStop] = useState("");
  const [target, setTarget] = useState("");
  const [riskInr, setRiskInr] = useState(5000);
  const [arm, setArm] = useState<"stop" | "target" | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);
  const [tick, setTick] = useState(0);
  const watchlist = useSiply((s) => s.watchlist);
  const cash = usePaper((s) => s.cash);
  const positions = usePaper((s) => s.positions);
  const fills = usePaper((s) => s.fills);
  const orders = usePaper((s) => s.orders);
  const place = usePaper((s) => s.place);
  const mark = usePaper((s) => s.mark);
  const cancel = usePaper((s) => s.cancel);
  const reset = usePaper((s) => s.reset);

  useLiveRefresh(() => {
    return getQuoteBundle({ data: { symbol, range, fresh: tick > 0 } })
      .then((b) => {
        setBundle(b);
        mark(b.quote.symbol, b.quote.price, b.quote.name);
      })
      .finally(() => setBusy(false));
  }, 15_000, [symbol, range, tick]);

  useLiveRefresh(() => {
    return getQuotes({ data: { symbols: [symbol] } }).then((rows) => {
      const row = rows[0];
      if (!row) return;
      setBundle((b) =>
        b
          ? {
              ...b,
              quote: {
                ...b.quote,
                price: row.price,
                change: row.change,
                changePct: row.changePct,
                previousClose: row.previousClose,
                asOf: row.asOf,
                source: row.source,
              },
            }
          : b,
      );
      mark(row.symbol, row.price, row.name);
    });
  }, 1000, [symbol]);

  const q = bundle?.quote;
  const price = q?.price ?? 0;
  const held = positions.find((p) => p.symbol === (q?.symbol ?? symbol));
  const limitPx = orderType === "limit" ? Number(limit) : null;
  const stopPx = Number(stop);
  const targetPx = Number(target);
  const fillPx = orderType === "limit" && limitPx && limitPx > 0 ? limitPx : price;
  const cost = Math.max(1, Math.floor(qty)) * (price || 0);
  const equity = paperEquity(cash, positions);
  const up = (q?.change ?? 0) >= 0;
  const ticker = (q?.shortName || q?.symbol || symbol).replace(/\.NS$|\.BO$/, "");
  const chips = Array.from(new Set(["^NSEI", "RELIANCE.NS", ...watchlist])).slice(0, 10);

  function sizeFromRisk() {
    if (!price || !(stopPx > 0) || stopPx === price) {
      setNote("Set a stop first, then size the order.");
      return;
    }
    const per = Math.abs(price - stopPx);
    const room = Math.max(1, Math.floor(cash / price));
    const sized = Math.max(1, Math.min(room, Math.floor(riskInr / per)));
    setQty(sized);
    setNote(`Size ${sized} so a stop costs about ${inr(sized * per)} of practice cash.`);
  }

  function chipStop() {
    if (!price) return;
    const next = side === "buy" ? price * 0.97 : price * 1.03;
    setStop(next.toFixed(2));
  }

  function chipTarget() {
    if (!price || !(stopPx > 0)) {
      setNote("Set a stop, then the 1:2 target.");
      return;
    }
    const risk = price - stopPx;
    const next = side === "buy" ? price + Math.abs(risk) * 2 : price - Math.abs(risk) * 2;
    setTarget(Math.max(0.01, next).toFixed(2));
  }

  function submit(nextSide: PaperSide) {
    if (!q) return;
    const result = place({
      symbol: q.symbol,
      name: q.shortName || q.name,
      side: nextSide,
      qty,
      price: q.price,
      limit: orderType === "limit" ? Number(limit) : null,
      stop: stopPx > 0 ? stopPx : null,
      target: targetPx > 0 ? targetPx : null,
    });
    if (!result.ok) {
      setNote(result.error);
      return;
    }
    setNote(
      result.status === "working"
        ? `Limit ${nextSide} parked at ${formatMoney(Number(limit), q.currency)}. It fills only if the last print reaches it. Practice only.`
        : `${nextSide === "buy" ? "Bought" : "Sold"} ${Math.floor(qty)} @ ${formatMoney(q.price, q.currency)}. Practice fill — nothing went to a broker.`,
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Paper desk</p>
          <h1 className="text-2xl font-medium tracking-tight">Trade like the chart, with practice money</h1>
        </div>
        <div className="text-right">
          <p className="text-xs text-subtle">Practice equity</p>
          <p className="text-xl font-medium tabular-nums">{inr(equity)}</p>
          <p className="text-xs tabular-nums text-muted">Cash {inr(cash)}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {chips.map((sym) => (
          <button
            key={sym}
            type="button"
            onClick={() => void navigate({ to: "/trade", search: { symbol: sym, side } })}
            className={cn(
              "h-9 shrink-0 rounded-full px-3 text-xs font-medium",
              sym === symbol || sym === q?.symbol ? "bg-primary text-primary-fg" : "bg-surface text-muted hover:text-fg",
            )}
          >
            {sym.replace(/\.NS$|\.BO$|^\^/, "")}
          </button>
        ))}
        <Link to="/search" className="inline-flex h-9 shrink-0 items-center rounded-full border border-border px-3 text-xs">
          Find a name
        </Link>
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="overflow-hidden rounded-xl border border-border bg-white">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e0e3eb] px-3 py-3 sm:px-4">
            <div>
              <h2 className="text-lg font-medium text-[#131722]">{q?.name ?? (busy ? "Loading chart…" : ticker)}</h2>
              {q ? (
                <p className="mt-0.5 flex flex-wrap items-baseline gap-2">
                  <span className="text-2xl font-medium tabular-nums text-[#131722]">{formatMoney(q.price, q.currency)}</span>
                  <span className={cn("text-sm font-medium tabular-nums", up ? "text-[#089981]" : "text-[#f23645]")}>
                    {up ? "+" : ""}
                    {formatMoney(q.change, q.currency)} ({pct(q.changePct)})
                  </span>
                </p>
              ) : null}
            </div>
            <RangeTabs value={range} onChange={setRange} />
          </div>
          {bundle ? (
            <CandleChart
              series={bundle.chart}
              mark={q?.price}
              tall
              stop={stopPx > 0 ? stopPx : null}
              target={targetPx > 0 ? targetPx : null}
              onPick={(picked) => {
                const text = picked.toFixed(2);
                if (arm === "target") setTarget(text);
                else setStop(text);
                setArm(null);
              }}
            />
          ) : (
            <div className="h-[min(52vh,520px)] min-h-[320px] animate-pulse bg-[#f8f9fa]" />
          )}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e0e3eb] px-3 py-2 text-[11px] text-[#5f6368]">
            <p>Blue is a 20-bar average. Orange is slower. They describe the tape. They are not signals.</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setArm(arm === "stop" ? null : "stop")}
                className={cn("h-7 rounded-full px-2.5", arm === "stop" ? "bg-[#f23645] text-white" : "bg-[#f8f9fa]")}
              >
                {arm === "stop" ? "Click chart for stop" : "Set stop on chart"}
              </button>
              <button
                type="button"
                onClick={() => setArm(arm === "target" ? null : "target")}
                className={cn("h-7 rounded-full px-2.5", arm === "target" ? "bg-[#089981] text-white" : "bg-[#f8f9fa]")}
              >
                {arm === "target" ? "Click chart for target" : "Set target on chart"}
              </button>
            </div>
          </div>
          {q ? (
            <div className="px-3 pb-3">
              <TapeStamp asOf={q.asOf} source={q.source} onRefresh={() => { setBusy(true); setTick((n) => n + 1); }} />
            </div>
          ) : null}
        </section>

        <form
          className="flex flex-col gap-2.5 self-start rounded-xl border border-border bg-surface p-4 xl:sticky xl:top-24"
          onSubmit={(e) => {
            e.preventDefault();
            submit(side);
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            {(["buy", "sell"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void navigate({ to: "/trade", search: { symbol: q?.symbol ?? symbol, side: s } })}
                className={cn(
                  "h-11 rounded-full text-sm font-medium",
                  side === s ? (s === "buy" ? "bg-[#089981] text-white" : "bg-[#f23645] text-white") : "border border-border bg-bg text-muted",
                )}
              >
                {s === "buy" ? "Buy" : "Sell"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(["market", "limit"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setOrderType(k)}
                className={cn(
                  "h-9 rounded-full text-xs font-medium",
                  orderType === k ? "bg-chip text-fg" : "text-muted",
                )}
              >
                {k === "market" ? "Market" : "Limit"}
              </button>
            ))}
          </div>
          {orderType === "limit" ? (
            <label className="text-xs text-muted">
              Limit price
              <input
                inputMode="decimal"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder={price ? price.toFixed(2) : "0.00"}
                className="mt-1 h-11 w-full rounded-md border border-border bg-bg px-3 text-base tabular-nums"
              />
            </label>
          ) : null}
          <label className="text-xs text-muted">
            Quantity
            <div className="mt-1 flex gap-2">
              <button type="button" className="h-11 w-11 rounded-md border border-border bg-bg text-lg" onClick={() => setQty((n) => Math.max(1, n - 1))}>
                −
              </button>
              <input
                type="number"
                min={1}
                step={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="h-11 min-w-0 flex-1 rounded-md border border-border bg-bg px-3 text-center text-base tabular-nums"
              />
              <button type="button" className="h-11 w-11 rounded-md border border-border bg-bg text-lg" onClick={() => setQty((n) => n + 1)}>
                +
              </button>
            </div>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-xs text-muted">
              Stop
              <input value={stop} onChange={(e) => setStop(e.target.value)} inputMode="decimal" className="mt-1 h-10 w-full rounded-md border border-border bg-bg px-2 text-sm tabular-nums" />
            </label>
            <label className="text-xs text-muted">
              Target
              <input value={target} onChange={(e) => setTarget(e.target.value)} inputMode="decimal" className="mt-1 h-10 w-full rounded-md border border-border bg-bg px-2 text-sm tabular-nums" />
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={chipStop} className="h-8 rounded-full bg-bg px-3 text-xs">3% stop</button>
            <button type="button" onClick={chipTarget} className="h-8 rounded-full bg-bg px-3 text-xs">1:2 target</button>
          </div>
          <label className="text-xs text-muted">
            Risk this much if the stop hits
            <div className="mt-1 flex gap-2">
              <input
                type="number"
                min={100}
                step={100}
                value={riskInr}
                onChange={(e) => setRiskInr(Number(e.target.value))}
                className="h-10 min-w-0 flex-1 rounded-md border border-border bg-bg px-2 text-sm tabular-nums"
              />
              <button type="button" onClick={sizeFromRisk} className="h-10 shrink-0 rounded-full bg-bg px-3 text-xs font-medium">
                Size qty
              </button>
            </div>
          </label>
          <div className="text-sm">
            <p className="flex justify-between text-muted">
              <span>Last print</span>
              <span className="tabular-nums text-fg">{price ? formatMoney(price, q?.currency ?? "INR") : "—"}</span>
            </p>
            <p className="mt-1 flex justify-between text-muted">
              <span>{orderType === "limit" ? "Limit value" : "Order value"}</span>
              <span className="tabular-nums text-fg">{fillPx ? inr(Math.floor(qty) * fillPx) : "—"}</span>
            </p>
            <p className="mt-1 flex justify-between text-muted">
              <span>You hold</span>
              <span className="tabular-nums text-fg">{held?.qty ?? 0}</span>
            </p>
          </div>
          <button
            type="submit"
            disabled={!q || (orderType === "limit" && !(Number(limit) > 0))}
            className={cn(
              "h-12 rounded-full text-sm font-medium text-white disabled:opacity-50",
              side === "buy" ? "bg-[#089981]" : "bg-[#f23645]",
            )}
          >
            {side === "buy" ? `Buy ${ticker}` : `Sell ${ticker}`}
          </button>
          {note ? <p className="text-xs leading-relaxed text-fg">{note}</p> : null}
          <p className="text-[11px] leading-relaxed text-subtle">
            Market fills at the delayed last print. A limit waits until that print reaches your price. Starting book {inr(PAPER_CASH)}. Not an order to NSE or a broker. Order value shown is {price ? inr(cost) : "—"} at the last print.
          </p>
          <Link to="/learn" className="text-xs text-primary hover:underline">
            Read the path before you size a real account
          </Link>
        </form>
      </div>

      {(orders ?? []).length ? (
        <section className="rounded-xl border border-border p-4">
          <h2 className="mb-2 text-sm font-medium">Working limits</h2>
          <ul className="divide-y divide-border text-sm">
            {orders.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-2 py-2">
                <span>
                  <span className={cn("mr-2 text-xs font-medium uppercase", o.side === "buy" ? "text-up" : "text-down")}>{o.side}</span>
                  {o.qty} {o.name} @ {formatMoney(o.limit, "INR")}
                </span>
                <button type="button" className="text-xs text-muted hover:text-fg" onClick={() => cancel(o.id)}>
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-border p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-medium">Positions</h2>
            <button type="button" className="text-xs text-muted hover:text-fg" onClick={() => { reset(); setNote("Practice book reset."); }}>
              Reset book
            </button>
          </div>
          {positions.length ? (
            <ul className="divide-y divide-border text-sm">
              {positions.map((p) => {
                const pnl = (p.last - p.avg) * p.qty;
                return (
                  <li key={p.symbol} className="flex items-center justify-between gap-2 py-2.5">
                    <button type="button" className="text-left" onClick={() => void navigate({ to: "/trade", search: { symbol: p.symbol, side: "sell" } })}>
                      <span className="block font-medium">{p.name}</span>
                      <span className="text-xs text-subtle">{p.qty} @ {formatMoney(p.avg, "INR")}</span>
                    </button>
                    <span className={cn("tabular-nums text-sm", pnl >= 0 ? "text-up" : "text-down")}>
                      {pnl >= 0 ? "+" : ""}
                      {inr(pnl)}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-muted">No open practice position. Place a buy to start the journal.</p>
          )}
        </section>
        <section className="rounded-xl border border-border p-4">
          <h2 className="mb-2 text-sm font-medium">Journal</h2>
          {fills.length ? (
            <ul className="divide-y divide-border text-sm">
              {fills.slice(0, 8).map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-2 py-2">
                  <span>
                    <span className={cn("mr-2 text-xs font-medium uppercase", f.side === "buy" ? "text-up" : "text-down")}>{f.side}</span>
                    {f.qty} {f.name}
                    {f.stop ? <span className="ml-2 text-[11px] text-subtle">stop {formatMoney(f.stop, "INR")}</span> : null}
                  </span>
                  <span className="tabular-nums text-muted">{formatMoney(f.price, "INR")}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Your practice fills will show here, with the stop you wrote.</p>
          )}
          <Link to="/learn/$slug" params={{ slug: "trade-journal" }} className="mt-3 inline-block text-sm text-primary hover:underline">
            How to keep this journal
          </Link>
        </section>
      </div>
    </div>
  );
}
