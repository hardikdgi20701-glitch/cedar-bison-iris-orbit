import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSiply } from "@/lib/store";
import { useState } from "react";
import { Shield, Upload, AlertTriangle, CheckCircle2, BookOpen } from "lucide-react";
import { RiskMeter } from "@/components/quiz/RiskMeter";
import { QuizLogin } from "@/components/quiz/QuizLogin";

export const Route = createFileRoute("/gate")({ component: LoginGate });

const RISK_QUESTIONS = [
  {
    q: "If you buy a share and the price falls, what can happen?",
    options: [
      "The government will refund your money",
      "You can lose money — there is no guarantee",
      "The broker must pay you the difference",
      "Share prices never fall",
    ],
    correct: 1,
    news: "Beginner rule #1: stocks are not a savings account. Capital can go down.",
  },
  {
    q: "What is a SIP in simple words?",
    options: [
      "A bank loan for buying shares",
      "A guaranteed monthly profit scheme",
      "Investing a fixed amount on a regular date, usually in a mutual fund",
      "A one-time lottery ticket",
    ],
    correct: 2,
    news: "SIP = a habit. It does not promise a return; it just invests on a schedule.",
  },
  {
    q: "On this site, a green number with a Bull label means:",
    options: [
      "You must buy this stock right now",
      "The last price move was up (not a forecast)",
      "The company will never fall again",
      "SEBI has approved a profit",
    ],
    correct: 1,
    news: "Bull / Bear here only describe the last change. They are not buy or sell calls.",
  },
  {
    q: "Money you need for next month’s rent or college fees should be:",
    options: [
      "Used for intraday trading",
      "Put into a friend’s stock tip",
      "Kept in savings / liquid money — not in stocks",
      "Borrowed against, then invested",
    ],
    correct: 2,
    news: "Near-term money does not belong in the share market. Emergency first, then invest.",
  },
  {
    q: "A fund that returned 20% last year will:",
    options: [
      "Definitely return 20% again",
      "Be guaranteed by SEBI",
      "Not be allowed to fall",
      "Not guarantee anything next year — past performance is not future results",
    ],
    correct: 3,
    news: "This sentence is on every official document for a reason. Please believe it.",
  },
  {
    q: "Who regulates the stock market in India?",
    options: ["WhatsApp admin groups", "Your college", "SEBI", "Foreign banks only"],
    correct: 2,
    news: "SEBI is the regulator. Unregistered tips and “guaranteed returns” are red flags.",
  },
  {
    q: "A stop-loss, in beginner language, is:",
    options: [
      "A plan for the maximum loss you will accept, then you exit",
      "A way to lock only profits",
      "A tax-saving trick",
      "A promise that you cannot lose money",
    ],
    correct: 0,
    news: "You do not need to trade stocks on day one. If you ever do, write a stop before you buy.",
  },
];


function LoginGate() {
  const setProfile = useSiply((s) => s.setProfile);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [docOk, setDocOk] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  function handleDoc() {
    setDocOk(true);
    setProfile({ documentsUploaded: true });
    setStep(2);
  }

  function answer(idx: number) {
    const next = [...answers, idx];
    setAnswers(next);
    if (currentQ < RISK_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const correct = next.reduce((acc, a, i) => acc + (a === RISK_QUESTIONS[i].correct ? 1 : 0), 0);
      const pctScore = Math.round((correct / RISK_QUESTIONS.length) * 100);
      setScore(pctScore);
      setShowResult(true);
      const today = new Date().toISOString().slice(0, 10);
      setProfile({
        riskScore: pctScore,
        riskGatePassed: pctScore >= 70,
        lastQuizDate: today,
        quizComplete: true,
        quizAnswers: next,
      });
    }
  }

  function enterSite() {
    if (score >= 70) void navigate({ to: "/onboarding" });
  }

  return (
    <main className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 size-64 animate-pulse rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -right-20 bottom-20 size-72 animate-pulse rounded-full bg-rose-500/10 blur-3xl delay-700" />
      </div>

      <div className="relative z-10 rounded-2xl border border-border bg-surface/80 p-6 shadow-xl backdrop-blur">
        <div className="mb-6 flex items-center gap-3">
          <img src="/planvista-icon.png" alt="" className="size-10" />
          <div>
            <h1 className="text-xl font-semibold tracking-tight">PlanVista Finance</h1>
            <p className="text-xs text-muted">Beginner gate · 18+ · Not investment advice</p>
          </div>
        </div>

        {step === 0 && (
          <QuizLogin
            title="Sign in to take the knowledge quiz"
            subtitle="You will sign in every time you open this gate. 70% to pass. Not a broker login."
            cta="Sign in and continue"
            onSignedIn={() => setStep(1)}
          />
        )}

        {step === 1 && (
          <section className="space-y-5">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Upload className="size-5" /> Required documents (prototype)
            </div>
            <p className="text-sm text-muted">
              For a real platform SEBI / KYC would require PAN + Aadhaar / video KYC. Here we only simulate
              the step for the prototype.
            </p>
            <div className="rounded-xl border border-dashed border-border p-6 text-center">
              <p className="text-sm text-muted">Drop or select a mock document (ID / student ID / age proof)</p>
              <input
                type="file"
                accept="image/*,.pdf"
                className="mt-3 w-full text-sm"
                onChange={() => setDocOk(true)}
              />
            </div>
            <button
              type="button"
              disabled={!docOk}
              onClick={handleDoc}
              className="h-11 w-full rounded-full bg-primary text-sm font-medium text-primary-fg disabled:opacity-40"
            >
              Upload & continue to risk quiz
            </button>
          </section>
        )}

        {step === 2 && !showResult && (
          <section className="space-y-5">
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="flex items-center gap-1">
                <Shield className="size-4" /> Beginner knowledge check
              </span>
              <span>
                Q{currentQ + 1}/{RISK_QUESTIONS.length}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-chip">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${((currentQ + 1) / RISK_QUESTIONS.length) * 100}%` }}
              />
            </div>
            {answers.length > 0 ? (
              <p className="text-center text-sm">
                Running score{" "}
                <span className="font-semibold tabular-nums">
                  {Math.round(
                    (answers.reduce((acc, a, i) => acc + (a === RISK_QUESTIONS[i].correct ? 1 : 0), 0) /
                      answers.length) *
                      100,
                  )}
                  %
                </span>
                <span className="text-muted">
                  {" "}
                  ({answers.reduce((acc, a, i) => acc + (a === RISK_QUESTIONS[i].correct ? 1 : 0), 0)}/
                  {answers.length} so far) · need 70% overall
                </span>
              </p>
            ) : (
              <p className="text-center text-xs text-muted">Need 70% (5 of 7) to enter. Beginner questions.</p>
            )}
            <p className="text-base font-medium leading-snug">{RISK_QUESTIONS[currentQ].q}</p>
            <p className="rounded-lg bg-chip/60 px-3 py-2 text-xs text-muted">
              <BookOpen className="mr-1 inline size-3.5" />
              {RISK_QUESTIONS[currentQ].news}
            </p>
            <div className="space-y-2">
              {RISK_QUESTIONS[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => answer(i)}
                  className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-left text-sm hover:border-primary hover:bg-primary/5"
                >
                  {opt}
                </button>
              ))}
            </div>
          </section>
        )}

        {showResult && (
          <section className="space-y-5 text-center">
            <RiskMeter percent={score} label="Risk quiz" passAt={70} />
            {score >= 70 ? (
              <>
                <CheckCircle2 className="mx-auto size-10 text-emerald-400" />
                <h2 className="text-xl font-semibold">You scored {score}%</h2>
                <p className="text-sm text-muted">
                  You cleared the 70% knowledge gate. Past performance ≠ future results. Markets can go down
                  as well as up.
                </p>
                <button
                  type="button"
                  onClick={enterSite}
                  className="h-11 w-full rounded-full bg-emerald-600 text-sm font-medium text-white"
                >
                  Enter PlanVista learning platform
                </button>
              </>
            ) : (
              <>
                <AlertTriangle className="mx-auto size-10 text-rose-400" />
                <h2 className="text-xl font-semibold">{score}% — below 70%</h2>
                <p className="text-sm text-muted">
                  You need 70% to enter. These are first-day questions: you can lose money, SIPs are not
                  guaranteed, and rent money does not belong in stocks. Retry when ready.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowResult(false);
                    setAnswers([]);
                    setCurrentQ(0);
                    setStep(2);
                  }}
                  className="h-11 w-full rounded-full border border-border text-sm font-medium"
                >
                  Retry quiz
                </button>
              </>
            )}
          </section>
        )}
      </div>

      <p className="mt-6 text-center text-[11px] leading-relaxed text-muted">
        PlanVista Finance is an educational prototype. It does not provide investment advice, does not
        execute trades, and is not registered with SEBI as an investment adviser or research analyst. Always
        consult a SEBI-registered intermediary before investing.
      </p>
    </main>
  );
}
