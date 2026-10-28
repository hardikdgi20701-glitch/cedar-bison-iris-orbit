import { AlertTriangle, Lock } from "lucide-react";
import { useState } from "react";
import { useSiply } from "@/lib/store";

type Props = {
  title: string;
  subtitle: string;
  cta: string;
  onSignedIn: () => void;
};

/** Classroom sign-in shown every time a risk quiz is opened. Not a Grok account. */
export function QuizLogin({ title, subtitle, cta, onSignedIn }: Props) {
  const profile = useSiply((s) => s.profile);
  const setProfile = useSiply((s) => s.setProfile);
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);
  const [ageConfirm, setAgeConfirm] = useState(false);
  const [riskConfirm, setRiskConfirm] = useState(false);

  function submit() {
    if (!name.trim() || age < 18 || !ageConfirm || !riskConfirm) return;
    setProfile({
      displayName: name.trim(),
      age,
      ageVerified: true,
    });
    onSignedIn();
  }

  const ready = name.trim().length >= 2 && age >= 18 && ageConfirm && riskConfirm;

  return (
    <section className="space-y-5">
      <div className="flex items-start gap-3 rounded-xl border border-warn/30 bg-warn-soft p-3 text-sm text-fg">
        <Lock className="mt-0.5 size-5 shrink-0 text-warn" />
        <p>
          Sign in each time you open a risk quiz. This is a classroom desk, not a broker login. No
          password is stored. Markets can go down. Capital is at risk.
        </p>
      </div>
      <div>
        <h2 className="text-lg font-medium tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      {profile.displayName ? (
        <p className="text-xs text-subtle">
          Last session: {profile.displayName}. Enter your name again to continue.
        </p>
      ) : null}
      <label className="block text-sm font-medium" htmlFor="quiz-login-name">
        Full name
      </label>
      <input
        id="quiz-login-name"
        className="h-11 w-full rounded-xl border border-border bg-bg px-3 text-sm outline-none focus:border-primary"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        autoComplete="name"
      />
      <label className="block text-sm font-medium" htmlFor="quiz-login-age">
        Age
      </label>
      <input
        id="quiz-login-age"
        type="number"
        min={18}
        max={100}
        className="h-11 w-full rounded-xl border border-border bg-bg px-3 text-sm outline-none focus:border-primary"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          className="mt-1 size-4"
          checked={ageConfirm}
          onChange={(e) => setAgeConfirm(e.target.checked)}
        />
        I confirm I am 18 years or older.
      </label>
      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          className="mt-1 size-4"
          checked={riskConfirm}
          onChange={(e) => setRiskConfirm(e.target.checked)}
        />
        I understand this quiz is education only — not SEBI-registered advice, and I can lose money in
        markets.
      </label>
      <div className="flex items-start gap-2 text-xs text-muted">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warn" />
        Past performance is not indicative of future results. Do not invest rent, fees, or emergency cash.
      </div>
      <button
        type="button"
        disabled={!ready}
        onClick={submit}
        className="h-11 w-full rounded-full bg-primary text-sm font-medium text-primary-fg disabled:opacity-40"
      >
        {cta}
      </button>
    </section>
  );
}
