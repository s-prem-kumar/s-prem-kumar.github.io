"use client";

import { useState } from "react";
import { LOGIN_NOTE } from "./notes";
import { InlineNotes } from "./PageNotes";
import { DEMO_EMAIL, DEMO_PASSWORD, useDemo } from "./store";

/**
 * The demo's front door — a replica of CashPilot's login page.
 *
 * The visitor genuinely signs in, because starting inside the dashboard skips
 * the part of the product a recruiter recognises. The credentials are printed
 * on the form itself and fill in with one click, so nobody has to type them.
 */
export function LoginScreen() {
  const { signIn } = useDemo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const result = signIn(email, password);
    if (!result.ok) setError(result.error ?? "Sign in failed.");
  }

  function fillCredentials() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError(null);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-100 p-6 dark:bg-slate-950">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-lg font-bold text-white shadow-lg shadow-emerald-700/25">
            ₹
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            CashPilot
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Sign in to your account
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              autoComplete="off"
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </span>
            <div className="relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                autoComplete="off"
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-16 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-400"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800"
          >
            Sign in
          </button>

          {/* Disabled on purpose — nothing behind these in a static demo. */}
          <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
            Forgot password and Sign up are disabled in the demo.
          </p>
        </form>

        {/* Credentials, printed where they're needed. */}
        <div className="mt-5 rounded-2xl border border-amber-300/60 bg-amber-50 p-4 dark:border-amber-500/25 dark:bg-amber-950/20">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">
            Demo account
          </p>
          <dl className="mt-2.5 space-y-1 font-mono text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500 dark:text-slate-400">email</dt>
              <dd className="text-slate-900 dark:text-slate-100">{DEMO_EMAIL}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500 dark:text-slate-400">password</dt>
              <dd className="text-slate-900 dark:text-slate-100">
                {DEMO_PASSWORD}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={fillCredentials}
            className="mt-3 w-full rounded-lg border border-amber-400/70 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 transition-colors hover:bg-amber-100 dark:border-amber-500/30 dark:bg-transparent dark:text-amber-400 dark:hover:bg-amber-500/10"
          >
            Fill in demo credentials
          </button>
          <p className="mt-3 text-xs leading-relaxed text-amber-800/80 dark:text-amber-500/70">
            This account holds invented data only. Nothing here is a real
            person, balance or transaction.
          </p>
        </div>

        {/* Set expectations before anyone signs in, not after. */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Please read
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            This demo exists <strong>purely to show how CashPilot works</strong>
            . It is a simplified, read-only replica built for this portfolio —
            it does not reproduce the real application&rsquo;s user experience.
            The actual CashPilot is a full-stack Next.js and NestJS application
            with a PostgreSQL database, real authentication and a server-side
            bank-statement parser; none of that runs here. Screens, data and
            behaviour have all been reduced to what a browser can serve on its
            own.
          </p>
        </div>

        <div className="mt-4">
          <InlineNotes title="Sign in" note={LOGIN_NOTE} />
        </div>

        <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
          Every screen inside carries notes like these — look for{" "}
          <span className="font-medium text-slate-500 dark:text-slate-400">
            &ldquo;Why this page exists&rdquo;
          </span>{" "}
          in the bottom-right corner.
        </p>
      </div>
    </div>
  );
}
