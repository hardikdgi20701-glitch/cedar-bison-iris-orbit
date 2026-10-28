import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RiskMeter } from "@/components/quiz/RiskMeter";
import { QuizLogin } from "@/components/quiz/QuizLogin";
import { QUIZ, scoreToRisk } from "@/lib/finance";
import { useSiply } from "@/lib/store";
import { useState } from "react";

export const Route = createFileRoute("/quiz")({ component: Quiz });

function Quiz() {
  const completeQuiz = useSiply((s) => s.completeQuiz);
  const knowledge = useSiply((s) => s.profile.riskScore);
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const q = QUIZ[i]!;
  const done = answers.length === QUIZ.length;
  const raw = answers.reduce((a, b) => a + b, 0);
  const max = QUIZ.length * 2;
  const appetitePct = Math.round((raw / max) * 100);

  if (!signedIn) {
    return (
      <main className="relative mx-auto flex min-h-[80vh] max-w-lg flex-col justify-center px-4 py-10">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <img src="/planvista-icon.png" alt="" className="size-10" />
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Risk quiz login</h1>
              <p className="text-xs text-muted">Required every time · 18+ · Education only</p>
            </div>
          </div>
          <QuizLogin
            title="Sign in to take the risk-factor quiz"
            subtitle="Maps a teaching risk mix for your goals. Not a SEBI-registered assessment."
            cta="Sign in and start quiz"
            onSignedIn={() => setSignedIn(true)}
          />
        </div>
      </main>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <p className="text-xs font-medium uppercase tracking-wide text-subtle">Risk questionnaire</p>
      <h1 className="mt-1 text-2xl font-medium tracking-tight">Seven questions. One mix.</h1>
      <p className="mt-2 text-sm text-muted">
        This is a teaching profile for student goals — not a SEBI-registered assessment. Knowledge gate score:{" "}
        <span className="font-semibold tabular-nums">{knowledge || 0}%</span>
      </p>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-chip">
        <div
          className="h-full bg-primary transition-[width] duration-200"
          style={{ width: `${(Math.min(answers.length, QUIZ.length) / QUIZ.length) * 100}%` }}
        />
      </div>

      {done ? (
        <div className="mt-8 rounded-lg border border-border p-5">
          <RiskMeter percent={appetitePct} label="Risk appetite" passAt={0} />
          <p className="mt-4 text-sm text-muted">Your mapped profile</p>
          <p className="mt-1 text-3xl font-medium capitalize">{scoreToRisk(answers)}</p>
          <p className="mt-2 text-sm text-muted">
            Appetite {appetitePct}% ({raw} / {max}). Conservative ≤36%, moderate ≤71%, else aggressive. Emergency
            goals still use a debt-heavy sleeve.
          </p>
          <button
            type="button"
            className="mt-5 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-fg hover:bg-primary-hover"
            onClick={() => {
              completeQuiz(answers);
              void navigate({ to: "/portfolio" });
            }}
          >
            Save and open portfolio
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-xs text-subtle">
            {i + 1} of {QUIZ.length}
            {answers.length ? ` · running appetite ${appetitePct}%` : ""}
          </p>
          <h2 className="mt-2 text-lg font-medium">{q.q}</h2>
          <ul className="mt-4 space-y-2">
            {q.options.map((o) => (
              <li key={o.label}>
                <button
                  type="button"
                  className="flex min-h-12 w-full items-center rounded-md border border-border px-3 py-3 text-left text-sm hover:border-primary hover:bg-primary-soft"
                  onClick={() => {
                    const next = [...answers, o.score];
                    setAnswers(next);
                    setI((v) => v + 1);
                  }}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
