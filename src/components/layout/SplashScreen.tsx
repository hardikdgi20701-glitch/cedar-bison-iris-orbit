import { getMarketHome } from "@/lib/market/server";
import { pct } from "@/lib/utils";
import { useEffect, useState } from "react";

type Mood = "bull" | "bear" | "flat";

export function SplashScreen({ onDone }: { onDone?: () => void }) {
  const [mood, setMood] = useState<Mood>("flat");
  const [label, setLabel] = useState("Checking last close…");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let live = true;
    void getMarketHome({ data: { region: "india" } })
      .then((res) => {
        if (!live) return;
        const nifty =
          res.quotes.find((q) => /nifty/i.test(q.name) || /nifty/i.test(q.symbol)) ?? res.quotes[0];
        if (!nifty) {
          setMood("flat");
          setLabel("Markets · Learning · Goals");
          return;
        }
        const up = nifty.change > 0;
        const down = nifty.change < 0;
        setMood(up ? "bull" : down ? "bear" : "flat");
        const closed = nifty.marketState !== "open";
        setLabel(
          `${nifty.shortName || nifty.name} ${closed ? "last close" : "now"} ${up ? "green" : down ? "red" : "flat"} ${pct(nifty.changePct)}`,
        );
      })
      .catch(() => {
        if (live) setLabel("Markets · Learning · Goals");
      })
      .finally(() => {
        if (live) setReady(true);
      });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => onDone?.(), 5600);
    return () => clearTimeout(t);
  }, [onDone]);

  const src = mood === "bear" ? "/mascots/bear.mp4" : "/mascots/bull.mp4";
  const poster = mood === "bear" ? "/mascots/bear.jpg" : "/mascots/bull.jpg";
  const ring = mood === "bear" ? "bg-rose-500/25" : "bg-emerald-500/25";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg">
      <div className={`absolute inset-0 ${mood === "bear" ? "bg-rose-950/40" : "bg-emerald-950/30"}`} />
      <div className="relative z-10 flex flex-col items-center px-4">
        <div className="relative">
          <div className={`absolute -inset-6 animate-pulse rounded-full blur-2xl ${ring}`} />
          <div className="relative size-56 overflow-hidden rounded-3xl border border-border shadow-2xl sm:size-72">
            {ready ? (
              <video
                key={src}
                className="size-full object-cover"
                src={src}
                poster={poster}
                autoPlay
                muted
                playsInline
                loop
              />
            ) : (
              <img src="/mascots/bull.jpg" alt="" className="size-full object-cover opacity-60" />
            )}
          </div>
        </div>
        <h1 className="mt-8 text-2xl font-semibold tracking-tight">
          PlanVista <span className="text-muted">Finance</span>
        </h1>
        <p
          className={`mt-2 text-sm font-medium ${
            mood === "bear" ? "text-rose-300" : mood === "bull" ? "text-emerald-300" : "text-muted"
          }`}
        >
          {mood === "bear" ? "Bear market move" : mood === "bull" ? "Bull market move" : "Loading tape…"}
        </p>
        <p className="mt-1 max-w-sm text-center text-xs text-subtle">{label}</p>
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-chip">
          <div
            className={`h-full w-full origin-left animate-[grow_5.4s_linear_forwards] ${
              mood === "bear" ? "bg-rose-500" : "bg-emerald-500"
            }`}
          />
        </div>
      </div>
      <style>{`
        @keyframes grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
