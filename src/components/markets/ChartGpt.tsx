import { ChatMarkdown } from "@/components/markets/ChatMarkdown";
import { askChartGpt } from "@/lib/chat";
import {
  followUps,
  snapshotContext,
  snapshotFromBundle,
  teachChart,
  welcomeChart,
  type ChatTurn,
} from "@/lib/chart-teacher";
import type { QuoteBundle } from "@/lib/market/types";
import { cn } from "@/lib/utils";
import { Radio, RotateCcw, Send, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const PRESETS = [
  "Aaj ka candle beginner ko kaise padhna hai?",
  "Bull hai ya bear — last close ke hisaab se?",
  "Support / resistance simple words mein samjhao",
  "Volume kya keh raha hai? Koi buy/sell mat dena.",
  "Stop-loss aur target kaise likhein?",
];

function storageKey(symbol: string) {
  return `pv-chart-gpt:${symbol}`;
}

function loadTurns(symbol: string, welcome: string): ChatTurn[] {
  try {
    const raw = sessionStorage.getItem(storageKey(symbol));
    if (!raw) return [{ role: "assistant", text: welcome }];
    const parsed = JSON.parse(raw) as ChatTurn[];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed.slice(-24);
  } catch {
    /* ignore */
  }
  return [{ role: "assistant", text: welcome }];
}

export function ChartGpt({
  bundle,
  variant = "embed",
}: {
  bundle: QuoteBundle;
  variant?: "embed" | "page";
}) {
  const snap = useMemo(() => snapshotFromBundle(bundle), [bundle]);
  const context = useMemo(() => snapshotContext(snap), [snap]);
  const welcome = useMemo(() => welcomeChart(snap), [snap]);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatTurn[]>([{ role: "assistant", text: welcome }]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [chips, setChips] = useState<string[]>(PRESETS);
  const scroller = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLTextAreaElement>(null);
  const skipPersist = useRef(true);

  useEffect(() => {
    skipPersist.current = true;
    setMsgs(loadTurns(snap.symbol, welcomeChart(snap)));
    setChips(PRESETS);
  }, [snap.symbol]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      const root = scroller.current;
      const last = root?.querySelector("[data-turn]:last-of-type") as HTMLElement | null;
      if (!root || !last) return;
      root.scrollTo({ top: Math.max(0, last.offsetTop - 8), behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [msgs, busy]);

  useEffect(() => {
    if (skipPersist.current) {
      skipPersist.current = false;
      return;
    }
    try {
      sessionStorage.setItem(storageKey(snap.symbol), JSON.stringify(msgs.slice(-24)));
    } catch {
      /* ignore */
    }
  }, [msgs, snap.symbol]);

  function resetChat() {
    setMsgs([{ role: "assistant", text: welcome }]);
    setChips(PRESETS);
    setErr(null);
    setInput("");
    box.current?.focus();
  }

  async function send(text: string) {
    const prompt = text.trim();
    if (!prompt || busy) return;
    setBusy(true);
    setErr(null);
    setInput("");
    const history = msgs.filter((m, i) => !(i === 0 && m.role === "assistant")).slice(-8);
    const local = teachChart(prompt, snap, history);
    setMsgs((m) => [...m, { role: "user", text: prompt }]);
    setChips(followUps(prompt, history));

    const fallback = () => {
      setMsgs((m) => [...m, { role: "assistant", text: local }]);
    };

    try {
      const raced = Promise.race([
        askChartGpt({ data: { prompt, context, history, snapshot: snap } }),
        new Promise<{ ok: true; text: string }>((resolve) => {
          window.setTimeout(() => resolve({ ok: true, text: local }), 8000);
        }),
      ]);
      const res = await raced;
      const out = res.text?.trim() ? res.text : local;
      setMsgs((m) => [...m, { role: "assistant", text: out }]);
    } catch (e) {
      fallback();
      const msg = e instanceof Error ? e.message : null;
      if (msg && !/timeout|failed to fetch|network/i.test(msg)) setErr(null);
    } finally {
      setBusy(false);
      box.current?.focus();
    }
  }

  const asked = msgs.some((m) => m.role === "user");

  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-surface",
        variant === "page" ? "h-[min(62vh,560px)]" : "h-[min(58vh,480px)]",
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border bg-bg px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
            <Radio className="size-4" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-semibold leading-none">Chart GPT</h2>
            <p className="mt-1 truncate text-[11px] text-muted">
              {snap.name} · last print classroom
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="hidden rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-warn sm:inline">
            Not a buy/sell call
          </span>
          <button
            type="button"
            onClick={resetChat}
            className="inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-chip hover:text-fg"
            aria-label="New chat"
            title="New chat"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </header>

      <div ref={scroller} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-4">
        {msgs.map((m, i) => (
          <div
            key={`${m.role}-${i}`}
            data-turn={m.role}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[92%] rounded-2xl px-3.5 py-2.5 sm:max-w-[85%]",
                m.role === "user"
                  ? "rounded-br-md bg-primary text-primary-fg"
                  : "rounded-bl-md border border-border border-l-2 border-l-primary bg-surface-2 text-fg",
              )}
            >
              {m.role === "user" ? (
                <p className="text-sm leading-relaxed">{m.text}</p>
              ) : (
                <ChatMarkdown text={m.text} />
              )}
            </div>
          </div>
        ))}
        {busy ? (
          <div className="flex items-center gap-2 text-xs text-muted">
            <Sparkles className="size-3.5 animate-pulse text-primary" />
            Chart GPT soch raha hai…
          </div>
        ) : null}
        {err ? <p className="text-xs text-down">{err}</p> : null}
      </div>

      <div className="border-t border-border bg-bg px-3 py-3 sm:px-4">
        <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
          {chips.map((p) => (
            <button
              key={p}
              type="button"
              disabled={busy}
              onClick={() => void send(p)}
              className="h-9 shrink-0 rounded-full border border-border bg-surface px-3 text-[11px] hover:border-primary hover:text-primary disabled:opacity-40"
            >
              {p}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <div className="flex items-end gap-2 rounded-xl border border-border bg-surface px-3 py-2 focus-within:border-primary">
            <textarea
              ref={box}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              rows={2}
              placeholder={asked ? "Ask a follow-up — wick, trend, volume, stop…" : "Ask how to read this chart — candles, trend, volume…"}
              className="min-h-11 flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-subtle"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-fg disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="size-4" />
            </button>
          </div>
        </form>
        <p className="mt-1.5 text-[10px] text-subtle">
          Enter to send · Shift+Enter for a new line. Always answers from this snapshot — even if the language desk is busy. Not a SEBI-registered advisor.
        </p>
      </div>
    </section>
  );
}
