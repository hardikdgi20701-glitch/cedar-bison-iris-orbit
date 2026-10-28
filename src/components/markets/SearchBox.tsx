import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { searchSymbols } from "@/lib/market/server";
import { googleFinanceSearchUrl, googleSearchUrl } from "@/lib/market/google";
import { ARTICLES } from "@/lib/learn";
import { cn } from "@/lib/utils";

type Hit = { href: string; label: string; kind: string; sub?: string };

export function SearchBox({ className }: { className?: string }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [remote, setRemote] = useState<Hit[]>([]);
  const [busy, setBusy] = useState(false);

  const local = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 1) return [];
    const pages: Hit[] = [
      { href: "/research", label: "Research", kind: "Page" },
      { href: "/plans", label: "Plans", kind: "Page" },
      { href: "/", label: "Markets", kind: "Page" },
      { href: "/nse", label: "NSE desk", kind: "Page" },
      { href: "/search", label: "Deep Search", kind: "Page" },
      { href: "/sip", label: "SIP calculator", kind: "Page" },
      { href: "/planner", label: "Goals", kind: "Page" },
      { href: "/portfolio", label: "Portfolio", kind: "Page" },
      { href: "/learn", label: "Learn", kind: "Page" },
      { href: "/progress", label: "Progress", kind: "Page" },
    ].filter((p) => p.label.toLowerCase().includes(query));
    const arts: Hit[] = ARTICLES.filter(
      (a) => a.title.toLowerCase().includes(query) || a.kicker.toLowerCase().includes(query),
    ).map((a) => ({ href: `/learn/${a.slug}`, label: a.title, kind: "Explainer" }));
    return [...pages, ...arts].slice(0, 4);
  }, [q]);

  useEffect(() => {
    const query = q.trim();
    if (query.length < 1) {
      setRemote([]);
      return;
    }
    let live = true;
    setBusy(true);
    const t = window.setTimeout(() => {
      void searchSymbols({ data: { q: query } })
        .then((res) => {
          if (!live) return;
          const hits: Hit[] = [
            ...res.local.map((c) => ({
              href: `/quote/${encodeURIComponent(c.yahoo)}`,
              label: c.symbol,
              sub: c.name,
              kind: c.exchange,
            })),
            ...res.remote.map((r) => ({
              href: `/quote/${encodeURIComponent(r.symbol)}`,
              label: r.symbol.replace(/\.NS$|\.BO$/, ""),
              sub: r.name,
              kind: r.exchange || r.type,
            })),
          ];
          setRemote(hits.slice(0, 8));
        })
        .catch(() => {
          if (live) setRemote([]);
        })
        .finally(() => {
          if (live) setBusy(false);
        });
    }, 220);
    return () => {
      live = false;
      window.clearTimeout(t);
    };
  }, [q]);

  const results = [...remote, ...local].slice(0, 10);
  const query = q.trim();

  return (
    <div className={cn("relative min-w-0 flex-1", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 180)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && query) {
            window.location.assign(`/search?q=${encodeURIComponent(query)}`);
            setOpen(false);
          }
        }}
        placeholder="Search NSE & BSE stocks, ETFs and more"
        className="h-11 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none placeholder:text-subtle focus:bg-bg focus:ring-2 focus:ring-primary/30"
      />
      {open && (results.length > 0 || busy || query.length > 0) ? (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-bg shadow-lg">
          {busy && results.length === 0 ? (
            <li className="px-3 py-3 text-sm text-muted">Searching listed companies…</li>
          ) : null}
          {results.map((r) => (
            <li key={r.href + r.label}>
              <a
                href={r.href}
                className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                <span className="min-w-0">
                  <span className="font-medium">{r.label}</span>
                  {r.sub ? <span className="ml-2 truncate text-muted">{r.sub}</span> : null}
                </span>
                <span className="shrink-0 text-xs text-subtle">{r.kind}</span>
              </a>
            </li>
          ))}
          {query ? (
            <li className="border-t border-border">
              <a
                href={`/search?q=${encodeURIComponent(query)}`}
                className="block px-3 py-2.5 text-sm font-medium text-primary hover:bg-surface"
              >
                Deep Search “{query}” — live quotes + Google
              </a>
              <a
                href={googleFinanceSearchUrl(query)}
                target="_blank"
                rel="noreferrer"
                className="block px-3 py-2 text-xs text-muted hover:bg-surface"
              >
                Open in Google Finance
              </a>
              <a
                href={googleSearchUrl(`${query} stock NSE BSE`)}
                target="_blank"
                rel="noreferrer"
                className="block px-3 py-2 text-xs text-muted hover:bg-surface"
              >
                Search Google
              </a>
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
