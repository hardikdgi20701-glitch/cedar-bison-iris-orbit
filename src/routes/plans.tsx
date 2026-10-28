import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PLANS, useDeskPlan, type DeskTier } from "@/lib/desk-plan";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/plans")({ component: PlansPage });

function PlansPage() {
  const tier = useDeskPlan((s) => s.tier);
  const setTier = useDeskPlan((s) => s.setTier);
  const navigate = useNavigate();

  function choose(id: DeskTier) {
    setTier(id);
    void navigate({ to: "/research" });
  }

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">PlanVista</p>
        <h1 className="mt-1 text-3xl font-medium tracking-tight">Start free. No card.</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          A plan is a classroom licence for the research desk. This preview does not charge you, does not take a
          card, and does not keep a balance. The fee on a real launch would buy software access only — not a trade,
          not advice, not a deposit.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const on = tier === plan.id;
          return (
            <section key={plan.id} className={cn("flex flex-col rounded-xl border p-5", on ? "border-primary bg-primary-soft" : "border-border")}>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">{plan.name}</p>
              <p className="mt-2 text-2xl font-medium tracking-tight">{plan.price}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{plan.note}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => choose(plan.id)}
                className={cn(
                  "mt-5 h-11 rounded-full text-sm font-medium",
                  plan.id === "free" ? "bg-primary text-primary-fg" : "border border-border bg-bg",
                )}
              >
                {plan.id === "free" ? "Start free" : on ? "Using this plan" : `Choose ${plan.name}`}
              </button>
            </section>
          );
        })}
      </div>

      <section className="grid gap-6 rounded-xl border border-border p-5 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-medium">What the fee is</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Access to software and educational research for the month or year you pick. It is not invested for you,
            not repayable as a trading balance, and not a seat on the exchange.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-medium">What PlanVista is not</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Not registered with SEBI or RBI. Not a broker, research analyst, investment adviser, or portfolio
            manager. It does not send orders, connect to a trading venue, or hold your money. You read the note.
            The practice desk uses imaginary cash.
          </p>
        </div>
      </section>

      <p className="text-sm text-muted">
        Questions stay on this device.{" "}
        <Link to="/research" className="text-primary hover:underline">
          Open the research desk
        </Link>
        .
      </p>
    </div>
  );
}
