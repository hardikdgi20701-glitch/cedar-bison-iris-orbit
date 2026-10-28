import { Link, useRouterState } from "@tanstack/react-router";
import { Maximize2, RotateCcw, Send, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChatMarkdown } from "@/components/markets/ChatMarkdown";
import { useLiveRefresh } from "@/hooks/useLiveRefresh";
import { askResearch, localResearch } from "@/lib/chat";
import { getQuotes } from "@/lib/market/server";
import { findCompany } from "@/lib/market/universe";
import { useSiply } from "@/lib/store";
import { cn, formatMoney, pct } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; text: string };

const STORE = "pv-ask-thread";

const STARTERS = [
  "What's going on with Indian markets today?",
  "How does a SIP compare with a lump sum for a 5-year goal?",
  "Why shouldn't I buy a stock because it is green today?",
  "How does a beginner actually start?",
  "What is support and resistance?",
];

export function ResearchPanel({
  variant = "rail",
  onClose,
}: {
  variant?: "rail" | "page";
  onClose?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const profile = useSiply((s) => s.profile);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [tape, setTape] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLTextAreaElement>(null);
  const page = variant === "page";

  const symbol = useMemo(() => {
    const m = pathname.match(/\/quote\/([^/]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }, [pathname]);
  const company = symbol ? findCompany(symbol) : null;
  const name = profile.displayName.split(" ")[0] || "Learner";

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Msg[];
      if (Array.isArray(parsed)) setMsgs(parsed.slice(-30));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(msgs.slice(-30)));
    } catch {
      /* ignore */
    }
  }, [msgs]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [msgs, busy]);

  useLiveRefresh(() => {
    return getQuotes({ data: { symbols: ["^NSEI", "^BSESN", "^NSEBANK"] } })
      .then((rows) => {
        const line = rows
          .map((q) => `${q.shortName || q.name} ${formatMoney(q.price, q.currency)} (${pct(q.changePct)})`)
          .join(". ");
        if (line) setTape(line);
      })
      .catch(() => {
        /* keep last tape */
      });
  }, 15000, []);

  const bag = [
    tape ? `Last public print: ${tape}` : "",
    profile.displayName
      ? `Learner: ${profile.displayName}, age ${profile.age}, ${profile.risk} risk, ${profile.timeHorizon} horizon.`
      : "",
    company ? `Viewing ${company.name} (${company.yahoo}), sector ${company.sector}.` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const suggestions = company
    ? [
        `What should a learner watch on ${company.name}?`,
        `How does a SIP compare with buying ${company.symbol} outright?`,
        "Why shouldn't I buy a stock because it is green today?",
      ]
    : STARTERS;

  async function send(text: string) {
    const prompt = text.trim();
    if (!prompt || busy) return;
    setBusy(true);
    setInput("");
    const history = msgs.slice(-8);
    const local = localResearch(prompt, bag, history);
    setMsgs((m) => [...m, { role: "user", text: prompt }]);
    try {
      const res = await Promise.race([
        askResearch({ data: { prompt, history, context: bag } }),
        new Promise<{ ok: true; text: string }>((resolve) => {
          window.setTimeout(() => resolve({ ok: true, text: local }), 7000);
        }),
      ]);
      setMsgs((m) => [...m, { role: "assistant", text: res.text?.trim() ? res.text : local }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: local }]);
    } finally {
      setBusy(false);
      box.current?.focus();
    }
  }

  function clear() {
    setMsgs([]);
    try {
      sessionStorage.removeItem(STORE);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className={cn("flex min-h-0 flex-col", page ? "h-[calc(100dvh-11rem)]" : "h-full")}>
      <div className="flex items-center gap-2 px-4 py-3">
        <h2 className="text-base font-medium">Research</h2>
        <Sparkles className="size-4 text-primary" />
        <div className="ml-auto flex items-center gap-1">
          {msgs.length ? (
            <button
              type="button"
              onClick={clear}
              className="inline-flex h-9 items-center gap-1 rounded-full px-2 text-xs text-muted hover:bg-surface"
            >
              <RotateCcw className="size-3.5" />
              New
            </button>
          ) : null}
          {page ? null : (
            <Link
              to="/ask"
              className="inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-surface"
              aria-label="Open full ask page"
            >
              <Maximize2 className="size-4" />
            </Link>
          )}
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 items-center rounded-full px-2 text-xs text-muted hover:bg-surface xl:hidden"
            >
              Close
            </button>
          ) : null}
        </div>
      </div>

      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-4 pb-3" aria-live="polite">
        <p className="text-sm leading-relaxed text-muted">
          Hi {name}. Ask anything about markets, SIPs, charts, or how to start. Type in the box — you do not have to
          use an example. This desk teaches. It will not pick a stock. For candles, use{" "}
          <Link to="/chart-gpt" className="text-primary hover:underline">
            Chart GPT
          </Link>
          .
        </p>
        {!msgs.length ? (
          <ul className="mt-3 flex flex-col gap-1.5">
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => void send(s)}
                  className="w-full rounded-lg border border-border px-3 py-2 text-left text-sm leading-snug hover:bg-surface"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-3 space-y-3">
            {msgs.map((m, i) => (
              <li
                key={i}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm leading-relaxed",
                  m.role === "user" ? "ml-6 bg-primary-soft text-fg" : "mr-2 border border-border bg-surface",
                )}
              >
                {m.role === "user" ? m.text : <ChatMarkdown text={m.text} />}
              </li>
            ))}
          </ul>
        )}
        {busy ? <p className="mt-3 text-xs text-muted">Thinking…</p> : null}
        {!msgs.length ? (
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link to="/planner" className="rounded-full border border-border px-3 py-1.5 hover:bg-surface">
              Create a goal
            </Link>
            <Link to="/sip" className="rounded-full border border-border px-3 py-1.5 hover:bg-surface">
              SIP calculator
            </Link>
            <Link to="/learn" className="rounded-full border border-border px-3 py-1.5 hover:bg-surface">
              Academy
            </Link>
            <Link to="/trade" className="rounded-full border border-border px-3 py-1.5 hover:bg-surface">
              Practice trade
            </Link>
          </div>
        ) : null}
      </div>

      <form
        className="shrink-0 border-t border-border bg-rail p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <div className="flex items-end gap-2 rounded-xl border border-border bg-bg px-3 py-2">
          <label className="sr-only" htmlFor="ask-box">
            Ask a question
          </label>
          <textarea
            id="ask-box"
            ref={box}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={page ? 3 : 2}
            placeholder="Ask anything — SIP, inflation, a chart, how to start…"
            className="min-h-11 flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-subtle"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg disabled:opacity-40"
            aria-label="Send question"
          >
            <Send className="size-4" />
          </button>
        </div>
        <p className="mt-1.5 text-[10px] leading-snug text-subtle">
          Enter to send. Shift+Enter for a new line. For learning purposes only. Not investment advice.
        </p>
      </form>
    </div>
  );
}
