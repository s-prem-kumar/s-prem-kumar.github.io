"use client";

import type { ReactNode } from "react";
import { useDemo } from "../store";

/** Panel used by every demo view. */
export function Card({
  title,
  action,
  children,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && (
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * A button for an action the real app has but the demo doesn't allow.
 *
 * It stays visible and focusable rather than being hidden or `disabled`:
 * hiding it would misrepresent the product, and a disabled button gives no
 * feedback when clicked. Pressing it explains why nothing happened.
 */
export function DisabledAction({
  label,
  children,
  className = "",
}: {
  /** What the action is, used in the explanation toast. */
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const { blockAction } = useDemo();

  return (
    <button
      type="button"
      onClick={() => blockAction(label)}
      title={`${label} is disabled in the demo`}
      className={`inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-500 ${className}`}
    >
      {children}
      <LockGlyph />
    </button>
  );
}

function LockGlyph() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

/** Consistent table shell — the demo has five tables. */
export function Table({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function Pill({
  tone,
  children,
}: {
  tone: "green" | "red" | "slate" | "amber";
  children: ReactNode;
}) {
  const tones = {
    green:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400",
    red: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
    slate:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    amber:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
