import { Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img src="/planvista-icon.png" alt="" className="size-7 object-contain" width={28} height={28} />
            <p className="text-sm font-medium">PlanVista Finance</p>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Live NSE/BSE market tracking, goal-based SIP planning and explainable research. Built as an
            educational product — not a brokerage, not a SEBI-registered advisor. Research notes are readings of
            public data, not a call to buy or sell.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-subtle">Assumptions</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Equity 12% / hybrid 10% / debt 7% / gold 8% long-run (illustrative). Inflation default 6–8%.
            Quotes are delayed public-market snapshots. Monte Carlo is a teaching simulation, not a forecast.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-subtle">Contact</p>
          <p className="mt-1 text-sm font-medium text-fg">Hardik Kumar Vimal</p>
          <p className="text-xs text-muted">Product & website design</p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=hardikk.vimal@gmail.com&su=PlanVista"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-primary hover:underline"
          >
            <Mail className="size-4" />
            hardikk.vimal@gmail.com
          </a>
          <a
            href="tel:8076636524"
            className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm text-primary hover:underline"
          >
            <Phone className="size-4" />
            8076636524
          </a>
        </div>
      </div>
      <div className="border-t border-border px-4 py-3 text-center text-[11px] leading-relaxed text-subtle">
        © {new Date().getFullYear()} PlanVista Finance · Designed by Hardik Kumar Vimal · Educational
        prototype only. Not SEBI-registered investment advice. Markets involve risk of capital loss. Past
        performance is not indicative of future results. Data refreshes on each visit; live TV embed is for
        awareness only.
      </div>
    </footer>
  );
}
