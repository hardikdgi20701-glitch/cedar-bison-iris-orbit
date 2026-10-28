import { create } from "zustand";
import { persist } from "zustand/middleware";
import { uid } from "./utils";

export const PAPER_CASH = 1_000_000;

export type PaperSide = "buy" | "sell";

export type PaperFill = {
  id: string;
  symbol: string;
  name: string;
  side: PaperSide;
  qty: number;
  price: number;
  stop: number | null;
  target: number | null;
  at: number;
};

export type PaperOrder = {
  id: string;
  symbol: string;
  name: string;
  side: PaperSide;
  qty: number;
  limit: number;
  stop: number | null;
  target: number | null;
  at: number;
};

export type PaperPosition = {
  symbol: string;
  name: string;
  qty: number;
  avg: number;
  last: number;
};

type PlaceInput = {
  symbol: string;
  name: string;
  side: PaperSide;
  qty: number;
  price: number;
  limit?: number | null;
  stop?: number | null;
  target?: number | null;
};

type PlaceResult = { ok: true; status: "filled" | "working" } | { ok: false; error: string };

type PaperStore = {
  cash: number;
  positions: PaperPosition[];
  fills: PaperFill[];
  orders: PaperOrder[];
  place: (input: PlaceInput) => PlaceResult;
  mark: (symbol: string, price: number, name?: string) => void;
  cancel: (id: string) => void;
  reset: () => void;
};

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

function marketable(side: PaperSide, price: number, limit: number | null | undefined) {
  if (limit == null || !Number.isFinite(limit) || limit <= 0) return true;
  return side === "buy" ? price <= limit : price >= limit;
}

function applyFill(
  state: { cash: number; positions: PaperPosition[]; fills: PaperFill[] },
  input: PlaceInput,
): { ok: true; cash: number; positions: PaperPosition[]; fills: PaperFill[] } | { ok: false; error: string } {
  const qty = Math.floor(input.qty);
  const price = input.price;
  if (!input.symbol || qty < 1) return { ok: false, error: "Enter at least 1 share." };
  if (!Number.isFinite(price) || price <= 0) return { ok: false, error: "No last price yet. Refresh the chart." };
  const cost = round2(qty * price);
  const stop = input.stop && input.stop > 0 ? input.stop : null;
  const target = input.target && input.target > 0 ? input.target : null;
  if (input.side === "buy") {
    if (cost > state.cash + 0.01) return { ok: false, error: "Not enough practice cash for that size." };
    const existing = state.positions.find((p) => p.symbol === input.symbol);
    const positions = existing
      ? state.positions.map((p) =>
          p.symbol === input.symbol
            ? {
                ...p,
                name: input.name || p.name,
                qty: p.qty + qty,
                avg: round2((p.avg * p.qty + cost) / (p.qty + qty)),
                last: price,
              }
            : p,
        )
      : [...state.positions, { symbol: input.symbol, name: input.name, qty, avg: price, last: price }];
    const fill: PaperFill = {
      id: uid(),
      symbol: input.symbol,
      name: input.name,
      side: "buy",
      qty,
      price,
      stop,
      target,
      at: Date.now(),
    };
    return { ok: true, cash: round2(state.cash - cost), positions, fills: [fill, ...state.fills].slice(0, 40) };
  }
  const held = state.positions.find((p) => p.symbol === input.symbol);
  if (!held || held.qty < qty) return { ok: false, error: "You do not hold enough shares to sell." };
  const left = held.qty - qty;
  const positions =
    left === 0
      ? state.positions.filter((p) => p.symbol !== input.symbol)
      : state.positions.map((p) => (p.symbol === input.symbol ? { ...p, qty: left, last: price } : p));
  const fill: PaperFill = {
    id: uid(),
    symbol: input.symbol,
    name: input.name,
    side: "sell",
    qty,
    price,
    stop,
    target,
    at: Date.now(),
  };
  return { ok: true, cash: round2(state.cash + cost), positions, fills: [fill, ...state.fills].slice(0, 40) };
}

export const usePaper = create<PaperStore>()(
  persist(
    (set, get) => ({
      cash: PAPER_CASH,
      positions: [],
      fills: [],
      orders: [],
      place: (input) => {
        const limit = input.limit && input.limit > 0 ? input.limit : null;
        if (!marketable(input.side, input.price, limit)) {
          const qty = Math.floor(input.qty);
          if (qty < 1) return { ok: false, error: "Enter at least 1 share." };
          const order: PaperOrder = {
            id: uid(),
            symbol: input.symbol,
            name: input.name,
            side: input.side,
            qty,
            limit: limit!,
            stop: input.stop && input.stop > 0 ? input.stop : null,
            target: input.target && input.target > 0 ? input.target : null,
            at: Date.now(),
          };
          set((s) => ({ orders: [order, ...(s.orders ?? [])].slice(0, 20) }));
          return { ok: true, status: "working" };
        }
        const next = applyFill(get(), input);
        if (!next.ok) return next;
        set({ cash: next.cash, positions: next.positions, fills: next.fills });
        return { ok: true, status: "filled" };
      },
      mark: (symbol, price, name) => {
        if (!Number.isFinite(price) || price <= 0) return;
        const state = get();
        let cash = state.cash;
        let positions = state.positions.map((p) =>
          p.symbol === symbol ? { ...p, last: price, name: name || p.name } : p,
        );
        let fills = state.fills;
        const orders = [...(state.orders ?? [])];
        const stay: PaperOrder[] = [];
        let changed = positions.some((p) => p.symbol === symbol);
        for (const order of orders) {
          if (order.symbol !== symbol || !marketable(order.side, price, order.limit)) {
            stay.push(order);
            continue;
          }
          const filled = applyFill(
            { cash, positions, fills },
            {
              symbol: order.symbol,
              name: name || order.name,
              side: order.side,
              qty: order.qty,
              price,
              stop: order.stop,
              target: order.target,
            },
          );
          if (!filled.ok) {
            stay.push(order);
            continue;
          }
          cash = filled.cash;
          positions = filled.positions;
          fills = filled.fills;
          changed = true;
        }
        if (changed || stay.length !== orders.length) {
          set({ cash, positions, fills, orders: stay });
        }
      },
      cancel: (id) => set((s) => ({ orders: (s.orders ?? []).filter((o) => o.id !== id) })),
      reset: () => set({ cash: PAPER_CASH, positions: [], fills: [], orders: [] }),
    }),
    { name: "pv-paper-v1" },
  ),
);

export function paperEquity(cash: number, positions: PaperPosition[]) {
  return cash + positions.reduce((sum, p) => sum + p.qty * (p.last || p.avg), 0);
}
