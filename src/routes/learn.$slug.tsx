import { createFileRoute, Link } from "@tanstack/react-router";
import { LessonStudio } from "@/components/learn/LessonStudio";
import { ARTICLES } from "@/lib/learn";
import { useSiply } from "@/lib/store";
import { useEffect } from "react";

export const Route = createFileRoute("/learn/$slug")({ component: Article });

function Article() {
  const { slug } = Route.useParams();
  const article = ARTICLES.find((a) => a.slug === slug);
  const markRead = useSiply((s) => s.markRead);

  useEffect(() => {
    if (article) markRead(article.slug);
  }, [article, markRead]);

  if (!article) {
    return (
      <p className="py-16 text-center text-muted">
        Article missing.{" "}
        <Link to="/learn" className="text-primary hover:underline">
          All explainers
        </Link>
      </p>
    );
  }

  const idx = ARTICLES.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? ARTICLES[idx - 1] : null;
  const next = idx >= 0 && idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : null;

  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/learn" className="text-xs text-primary hover:underline">
        All explainers
      </Link>
      <p className="mt-4 text-[11px] font-medium uppercase tracking-wide text-primary">{article.kicker}</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight">{article.title}</h1>
      <p className="mt-2 text-sm text-subtle">{article.minutes} min read · Diagram, chart, then the full answer</p>
      <div className="mt-5 rounded-xl border border-border bg-surface p-5">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Short answer</p>
        <p className="mt-2 text-lg leading-relaxed text-fg">{article.body[0]}</p>
      </div>
      <LessonStudio slug={article.slug} image={article.image} />
      <div className="mt-6 space-y-4 text-[17px] leading-[1.75] text-fg">
        {article.body.slice(1).map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>

      {article.example ? (
        <div className="mt-8 rounded-xl border border-border bg-surface p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-primary">{article.example.title}</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-fg">
            {article.example.lines.map((line) => (
              <li key={line.slice(0, 28)} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {article.terms?.length ? (
        <div className="mt-8">
          <h2 className="text-sm font-medium uppercase tracking-wide text-subtle">Words to know</h2>
          <dl className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border">
            {article.terms.map((t) => (
              <div key={t.term} className="grid gap-1 px-4 py-3 sm:grid-cols-[140px_1fr] sm:gap-4">
                <dt className="text-sm font-medium">{t.term}</dt>
                <dd className="text-sm text-muted">{t.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {article.takeaways?.length ? (
        <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <h2 className="text-sm font-medium text-emerald-300">Takeaways</h2>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed">
            {article.takeaways.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-10 rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-muted">
        SEBI reminder: This article is for learning only. It is not investment advice. Numbers are illustrations,
        not forecasts. Do not treat any chart pattern, bull/bear label or statistic as a buy or sell
        recommendation. Capital is at risk in markets. Past performance is not indicative of future results.
      </p>

      {["how-to-read-candles", "how-to-read-graphs", "bull-vs-bear", "stop-loss-and-target", "using-chart-gpt", "which-timeframe", "indicators-later", "reading-market-stats"].includes(
        article.slug,
      ) ? (
        <p className="mt-4 rounded-xl border border-primary/20 bg-primary-soft p-4 text-sm leading-relaxed">
          Want this explained on a live (or last-close) chart?{" "}
          <Link to="/chart-gpt" className="font-medium text-primary hover:underline">
            Open Chart GPT
          </Link>{" "}
          and ask in your own words. It will teach. It will not pick a stock.
        </p>
      ) : null}

      <div className="mt-8 flex justify-between gap-4 text-sm">
        {prev ? (
          <Link to="/learn/$slug" params={{ slug: prev.slug }} className="text-primary hover:underline">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to="/learn/$slug" params={{ slug: next.slug }} className="ml-auto text-right text-primary hover:underline">
            {next.title} →
          </Link>
        ) : null}
      </div>
    </article>
  );
}
