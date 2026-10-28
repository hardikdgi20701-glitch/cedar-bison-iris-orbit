import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ACADEMY, levelProgress } from "@/lib/academy";
import { ARTICLES } from "@/lib/learn";
import { usePaper } from "@/lib/paper";
import { useSiply } from "@/lib/store";

export const Route = createFileRoute("/learn")({ component: Learn });

function Learn() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const read = useSiply((s) => s.readSlugs);
  const fills = usePaper((s) => s.fills.length);
  const onIndex = path === "/learn" || path === "/learn/";
  if (!onIndex) return <Outlet />;
  const bySlug = new Map(ARTICLES.map((a) => [a.slug, a]));
  const doneLessons = ACADEMY.reduce((n, level) => n + levelProgress(read, level.slugs).done, 0);
  const allLessons = ACADEMY.reduce((n, level) => n + level.slugs.length, 0);

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Academy</p>
        <h1 className="mt-1 text-2xl font-medium tracking-tight">Beginner to expert</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          Every lesson is open. These are the questions people type into Grok, Gemini and ChatGPT. The short answer is on
          the card. Open it and read the full answer in plain English. Then practise on the paper desk.
          {fills > 0 ? ` You have ${fills} practice fill${fills === 1 ? "" : "s"}.` : " You have not placed a practice order yet."}
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
          <div className="h-full bg-primary" style={{ width: `${allLessons ? (doneLessons / allLessons) * 100 : 0}%` }} />
        </div>
        <p className="mt-1 text-xs text-subtle">{doneLessons} of {allLessons} lessons read</p>
        <Link
          to="/trade"
          search={{ symbol: "RELIANCE.NS", side: "buy" }}
          className="mt-4 inline-flex h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg"
        >
          Open paper desk
        </Link>
      </div>

      {ACADEMY.map((level) => {
        const progress = levelProgress(read, level.slugs);
        return (
          <section key={level.id} className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-lg font-medium">{level.title}</h2>
                <p className="text-sm text-muted">{level.blurb}</p>
              </div>
              <p className="text-xs tabular-nums text-subtle">{progress.done}/{progress.total}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {level.slugs.map((slug) => {
                const a = bySlug.get(slug);
                if (!a) return null;
                const readIt = read.includes(slug);
                const answer = a.body[0] ?? "";
                return (
                  <li key={slug}>
                    <Link
                      to="/learn/$slug"
                      params={{ slug }}
                      className="block h-full overflow-hidden rounded-xl border border-border hover:bg-surface"
                    >
                      {a.image ? <img src={a.image} alt="" className="h-32 w-full object-cover" /> : null}
                      <div className="space-y-1 p-4">
                        <p className="text-xs uppercase tracking-[0.14em] text-muted">{a.kicker}</p>
                        <p className="font-medium text-fg">{a.title}</p>
                        <p className="text-sm leading-relaxed text-muted">
                          {answer.length > 160 ? `${answer.slice(0, 157).trim()}…` : answer}
                        </p>
                        <p className="text-sm text-subtle">
                          {a.minutes} min · diagram and chart{readIt ? " · Read" : ""}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}