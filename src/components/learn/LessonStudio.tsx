import { useEffect, useState } from "react";
import { LESSON_VISUALS, type BarPoint, type CandlePoint, type LinePoint } from "@/lib/lesson-visuals";

const MISTAKES = [
  "Putting rent, fees, or food money into a share.",
  "Buying a name because a chat group said so.",
  "Chasing a price that already jumped this week.",
  "Stopping a long SIP because one week was red.",
  "Opening intraday or futures on day one.",
  "Ignoring brokerage, tax, and the cost of tapping too often.",
  "Having no emergency cash sitting in a boring place.",
  "Mixing next month’s bill and a 10-year goal in one fund.",
  "Believing anyone who promises a fixed percent every week.",
  "Opening the app forty times a day and calling that a plan.",
];

function Flow({
  steps,
  active,
  onPick,
}: {
  steps: { label: string; detail: string }[];
  active: number;
  onPick: (i: number) => void;
}) {
  return (
    <ol className="grid gap-3 sm:grid-cols-4">
      {steps.map((step, i) => {
        const on = i === active;
        return (
          <li key={step.label} className="lesson-anim relative" style={{ animationDelay: `${i * 0.12}s` }}>
            <button
              type="button"
              onClick={() => onPick(i)}
              aria-pressed={on}
              className={`h-full w-full rounded-xl border p-3 text-left ${
                on ? "lesson-live border-primary bg-primary-soft" : "border-border bg-surface hover:bg-surface-2"
              }`}
            >
              <p className="text-[11px] font-medium tabular-nums text-primary">0{i + 1}</p>
              <p className="mt-1 text-sm font-medium">{step.label}</p>
              <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted">{step.detail}</p>
            </button>
            {i < steps.length - 1 ? (
              <svg
                className="absolute -right-3 top-8 z-10 hidden h-4 w-6 sm:block"
                viewBox="0 0 24 16"
                aria-hidden
              >
                <path className="lesson-arrow" d="M1 8 H16" stroke="var(--color-primary)" strokeWidth="1.6" fill="none" />
                <path d="M14 3.5 L20 8 L14 12.5" stroke="var(--color-primary)" strokeWidth="1.6" fill="none" />
              </svg>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function Bars({ rows }: { rows: BarPoint[] }) {
  const max = Math.max(...rows.map((r) => Math.abs(r.value)), 1);
  return (
    <div className="mt-4 space-y-3">
      {rows.map((row, i) => {
        const neg = row.value < 0;
        const width = Math.max(8, (Math.abs(row.value) / max) * 100);
        return (
          <div key={row.label}>
            <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
              <span className="font-medium">{row.label}</span>
              <span className="text-subtle">{row.note}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-surface-2">
              <div
                className="lesson-bar h-full rounded-full"
                style={{
                  width: `${width}%`,
                  animationDelay: `${0.12 * i}s`,
                  background: neg ? "var(--color-down)" : "var(--color-primary)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function coords(points: LinePoint[], min: number, max: number, w: number, h: number, pad: number) {
  const span = max - min || 1;
  return points.map((p, i) => {
    const x = pad + (i / Math.max(points.length - 1, 1)) * (w - pad * 2);
    const y = pad + (1 - (p.value - min) / span) * (h - pad * 2);
    return { x, y, label: p.label, value: p.value };
  });
}

function LineGraph({
  a,
  b,
  name,
  nameB,
  shared,
}: {
  a: LinePoint[];
  b?: LinePoint[];
  name?: string;
  nameB?: string;
  shared?: boolean;
}) {
  const w = 360;
  const h = 168;
  const pad = 22;
  const pool = shared && b ? [...a, ...b] : a;
  const min = Math.min(...pool.map((p) => p.value));
  const max = Math.max(...pool.map((p) => p.value));
  const left = coords(a, shared && b ? min : Math.min(...a.map((p) => p.value)), shared && b ? max : Math.max(...a.map((p) => p.value)), w, h, pad);
  const right = b
    ? coords(
        b,
        shared ? min : Math.min(...b.map((p) => p.value)),
        shared ? max : Math.max(...b.map((p) => p.value)),
        w,
        h,
        pad,
      )
    : [];
  const toPts = (rows: { x: number; y: number }[]) => rows.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = left.length
    ? `M ${left[0].x.toFixed(1)} ${(h - pad).toFixed(1)} L ${toPts(left).replaceAll(" ", " L ").replaceAll(",", " ")} L ${left[left.length - 1].x.toFixed(1)} ${(h - pad).toFixed(1)} Z`
    : "";
  const yTop = shared && b ? max : Math.max(...a.map((p) => p.value));
  const yBot = shared && b ? min : Math.min(...a.map((p) => p.value));
  return (
    <div className="mt-3">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-48 w-full" role="img" aria-label={name ?? "Line chart"}>
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={pad}
            x2={w - pad}
            y1={pad + g * (h - pad * 2)}
            y2={pad + g * (h - pad * 2)}
            stroke="var(--color-border)"
            strokeDasharray="3 4"
          />
        ))}
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="var(--color-border)" />
        <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="var(--color-border)" />
        <text x={pad + 4} y={pad + 10} fontSize="10" fill="var(--color-subtle)">
          {yTop}
        </text>
        <text x={pad + 4} y={h - pad - 4} fontSize="10" fill="var(--color-subtle)">
          {yBot}
        </text>
        {area ? <path d={area} fill="var(--color-primary)" opacity="0.12" /> : null}
        <polyline className="lesson-draw" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" points={toPts(left)} />
        {right.length ? (
          <polyline
            className="lesson-draw"
            fill="none"
            stroke="var(--color-warn)"
            strokeWidth="2.5"
            points={toPts(right)}
            style={{ animationDelay: "0.2s" }}
          />
        ) : null}
        {left.length ? (
          <circle className="lesson-candle" cx={left[left.length - 1].x} cy={left[left.length - 1].y} r="4" fill="var(--color-primary)" />
        ) : null}
      </svg>
      <div className="mt-1 flex justify-between px-2 text-[10px] text-subtle">
        <span>Time →</span>
        {a.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-muted">
        <span className="inline-flex items-center gap-1">
          <span className="h-0.5 w-4 bg-primary" /> {name ?? "Series"}
        </span>
        {b ? (
          <span className="inline-flex items-center gap-1">
            <span className="h-0.5 w-4 bg-warn" /> {nameB ?? "Compare"}
          </span>
        ) : null}
        <span>Up the side is a bigger number. Left is earlier.</span>
      </div>
    </div>
  );
}

function Candles({ rows }: { rows: CandlePoint[] }) {
  const highs = rows.map((c) => c.h);
  const lows = rows.map((c) => c.l);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const span = max - min || 1;
  const y = (v: number) => 16 + (1 - (v - min) / span) * 96;
  return (
    <svg viewBox="0 0 360 150" className="h-48 w-full" role="img" aria-label="Candlestick sketch">
      <text x="8" y="14" fontSize="10" fill="var(--color-subtle)">
        Price ↑
      </text>
      {rows.map((c, i) => {
        const x = 48 + i * 62;
        const up = c.c >= c.o;
        const top = y(Math.max(c.o, c.c));
        const bot = y(Math.min(c.o, c.c));
        const color = up ? "var(--color-up)" : "var(--color-down)";
        return (
          <g key={c.label} className="lesson-candle" style={{ animationDelay: `${i * 0.1}s` }}>
            <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth="2" />
            <rect x={x - 11} y={top} width="22" height={Math.max(6, bot - top)} rx="2" fill={color} />
            <text x={x} y="142" textAnchor="middle" fontSize="10" fill="var(--color-subtle)">
              {c.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CandleAnatomy() {
  return (
    <div className="grid items-center gap-3 sm:grid-cols-[120px_1fr]">
      <svg viewBox="0 0 120 160" className="mx-auto h-40 w-28" role="img" aria-label="Parts of one candle">
        <line x1="46" y1="16" x2="46" y2="144" stroke="var(--color-up)" strokeWidth="2" />
        <rect x="30" y="48" width="32" height="52" rx="3" fill="var(--color-up)" />
        <line x1="78" y1="16" x2="62" y2="16" stroke="var(--color-subtle)" />
        <line x1="78" y1="48" x2="62" y2="48" stroke="var(--color-subtle)" />
        <line x1="78" y1="100" x2="62" y2="100" stroke="var(--color-subtle)" />
        <line x1="78" y1="144" x2="62" y2="144" stroke="var(--color-subtle)" />
        <text x="82" y="19" fontSize="9" fill="var(--color-muted)">
          High
        </text>
        <text x="82" y="51" fontSize="9" fill="var(--color-muted)">
          Close
        </text>
        <text x="82" y="103" fontSize="9" fill="var(--color-muted)">
          Open
        </text>
        <text x="82" y="147" fontSize="9" fill="var(--color-muted)">
          Low
        </text>
      </svg>
      <ul className="space-y-2 text-sm leading-relaxed text-muted">
        <li>
          <span className="font-medium text-fg">Body.</span> Open to close. Green here means the period finished above where it started.
        </li>
        <li>
          <span className="font-medium text-fg">Wicks.</span> The thin lines are the highest and lowest prices anyone paid in that period.
        </li>
        <li>
          <span className="font-medium text-fg">Not a signal.</span> The picture says what already happened. It does not say what to buy.
        </li>
      </ul>
    </div>
  );
}

function PriceLadder() {
  const rows = [
    { label: "Target", price: "₹110", note: "You planned to re-read here. It is not a promise the price will arrive.", color: "var(--color-up)" },
    { label: "Entry", price: "₹100", note: "The price you would actually pay. Write it before you tap.", color: "var(--color-primary)" },
    { label: "Stop", price: "₹95", note: "If price gets here, the idea was wrong. You exit. A gap can still skip past it.", color: "var(--color-down)" },
  ];
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-[72px_1fr]">
      <svg viewBox="0 0 72 180" className="h-48 w-full" role="img" aria-label="Price ladder">
        <line x1="36" y1="12" x2="36" y2="168" stroke="var(--color-border-strong)" strokeWidth="2" />
        {rows.map((row, i) => (
          <g key={row.label} className="lesson-candle" style={{ animationDelay: `${i * 0.15}s` }}>
            <circle cx="36" cy={28 + i * 60} r="8" fill={row.color} />
          </g>
        ))}
      </svg>
      <ol className="space-y-3">
        {rows.map((row) => (
          <li key={row.label} className="rounded-xl border border-border p-3">
            <p className="text-xs uppercase tracking-wide text-subtle">{row.label}</p>
            <p className="text-lg font-medium tabular-nums">{row.price}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{row.note}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SizeMath() {
  const cells = [
    { k: "You can lose", v: "₹5,000" },
    { k: "Stop is this far", v: "₹10" },
    { k: "So you buy", v: "500 shares" },
  ];
  return (
    <div className="mt-4">
      <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {cells.map((cell, i) => (
          <div key={cell.k} className="contents">
            <div className="lesson-anim rounded-xl border border-border bg-surface p-4 text-center" style={{ animationDelay: `${i * 0.15}s` }}>
              <p className="text-[11px] uppercase tracking-wide text-subtle">{cell.k}</p>
              <p className="mt-1 text-xl font-medium tabular-nums">{cell.v}</p>
            </div>
            {i < cells.length - 1 ? (
              <p className="hidden text-center text-xl text-muted sm:block" aria-hidden>
                {i === 0 ? "÷" : "="}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        5,000 divided by 10 is 500. If the stop is hit, the planned loss is about ₹5,000. If the cash cannot cover 500 shares, you buy fewer. You do not move the stop to fit a bigger order.
      </p>
    </div>
  );
}

function MistakeList() {
  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <ol className="space-y-2">
        {MISTAKES.map((line, i) => (
          <li key={line} className="lesson-anim flex gap-3 text-sm leading-relaxed" style={{ animationDelay: `${i * 0.05}s` }}>
            <span className="w-5 shrink-0 tabular-nums text-down">{i + 1}</span>
            <span>{line}</span>
          </li>
        ))}
      </ol>
      <div className="h-fit rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-300">The boring fix</p>
        <p className="mt-2 text-sm leading-relaxed">
          Name the goal. Keep two or three months of expenses in cash. Automate a small SIP into a plain index or debt mix. Review once a month. Then close the app.
        </p>
      </div>
    </div>
  );
}

function SebiLanes() {
  const lanes = [
    { title: "Allowed to advise", body: "A SEBI-registered adviser can tell you what to do with your money, and must say they are registered." },
    { title: "A paid tip", body: "A sure-shot stock in your messages, especially with a fee or a guaranteed return, is a warning. Walk away." },
    { title: "This classroom", body: "PlanVista explains the picture. It does not send an order, and it will not name a share for you to buy." },
  ];
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      {lanes.map((lane, i) => (
        <div key={lane.title} className="lesson-anim rounded-xl border border-border p-3" style={{ animationDelay: `${i * 0.12}s` }}>
          <p className="text-sm font-medium">{lane.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{lane.body}</p>
        </div>
      ))}
    </div>
  );
}

function readHints(kind: string) {
  if (kind === "candles") {
    return [
      "Each block is one period: a day in this sketch.",
      "Green finished above the open. Red finished below it.",
      "The thin lines are the high and the low, not a forecast.",
    ];
  }
  if (kind === "line" || kind === "split") {
    return [
      "Read left to right. That is time passing.",
      "Higher on the page is a higher number, not “better” by itself.",
      "A rising line is the past. It is not next week.",
    ];
  }
  return [
    "A longer bar is a bigger number in this sketch.",
    "Compare the bars with each other, not with a reel.",
    "The labels are the lesson. The height is only a picture of them.",
  ];
}

export function LessonStudio({ slug, image }: { slug: string; image?: string }) {
  const visual = LESSON_VISUALS[slug];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActive(0);
    setPaused(false);
  }, [slug]);

  useEffect(() => {
    if (!visual || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((n) => (n + 1) % visual.flow.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, [visual, paused, slug]);

  if (!visual) return null;
  const step = visual.flow[active] ?? visual.flow[0];

  return (
    <section className="mt-8 space-y-6 rounded-2xl border border-border p-4 sm:p-5">
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {image ? (
          <figure className="overflow-hidden rounded-xl border border-border">
            <img src={image} alt="" className="h-48 w-full object-cover sm:h-56" />
            <figcaption className="px-3 py-2 text-xs leading-relaxed text-muted">{visual.flowTitle}</figcaption>
          </figure>
        ) : null}
        <div>
          <h2 className="text-sm font-medium">Block diagram</h2>
          <p className="mt-1 text-xs leading-relaxed text-subtle">
            Tap a block, or let it walk. On a phone the blocks stack. Follow 01, then 02.
          </p>
        </div>
      </div>

      <Flow
        steps={visual.flow}
        active={active}
        onPick={(i) => {
          setPaused(true);
          setActive(i);
        }}
      />

      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
            Step {active + 1} of {visual.flow.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full border border-border px-3 py-1 text-xs"
              onClick={() => {
                setPaused(true);
                setActive((n) => (n - 1 + visual.flow.length) % visual.flow.length);
              }}
            >
              Back
            </button>
            <button
              type="button"
              className="rounded-full border border-border px-3 py-1 text-xs"
              onClick={() => {
                setPaused(true);
                setActive((n) => (n + 1) % visual.flow.length);
              }}
            >
              Next
            </button>
            <button type="button" className="rounded-full border border-border px-3 py-1 text-xs" onClick={() => setPaused((p) => !p)}>
              {paused ? "Play" : "Pause"}
            </button>
          </div>
        </div>
        <h3 className="mt-3 text-xl font-medium tracking-tight">{step.label}</h3>
        <p className="mt-2 text-[17px] leading-[1.7] text-fg">{step.detail}</p>
      </div>

      <div>
        <h2 className="text-sm font-medium">{visual.graphTitle}</h2>
        {slug === "stop-loss-and-target" ? <PriceLadder /> : null}
        {slug === "position-size" ? <SizeMath /> : null}
        {slug === "first-mistakes" ? <MistakeList /> : null}
        {slug === "sebi-guidelines-basics" ? <SebiLanes /> : null}
        {visual.kind === "bars" && visual.bars && slug !== "stop-loss-and-target" && slug !== "position-size" ? (
          <Bars rows={visual.bars} />
        ) : null}
        {visual.kind === "line" && visual.line ? (
          <LineGraph a={visual.line} b={visual.lineB} name={visual.lineName} nameB={visual.lineBName} shared={Boolean(visual.lineB)} />
        ) : null}
        {visual.kind === "split" && visual.line && visual.lineB ? (
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-3">
              <p className="text-xs font-medium">{visual.lineName}</p>
              <LineGraph a={visual.line} name={visual.lineName} />
            </div>
            <div className="rounded-xl border border-border p-3">
              <p className="text-xs font-medium">{visual.lineBName}</p>
              <LineGraph a={visual.lineB} name={visual.lineBName} />
            </div>
          </div>
        ) : null}
        {visual.kind === "candles" && visual.candles ? (
          <div className="mt-3 grid items-center gap-4 lg:grid-cols-2">
            <Candles rows={visual.candles} />
            <CandleAnatomy />
          </div>
        ) : null}
        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {readHints(visual.kind).map((hint) => (
            <li key={hint} className="rounded-lg bg-surface px-3 py-2 text-xs leading-relaxed text-muted">
              {hint}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-muted">{visual.graphNote}</p>
        <p className="mt-1 text-[11px] text-subtle">A teaching sketch. Not a forecast, and not a buy or a sell.</p>
      </div>
    </section>
  );
}
