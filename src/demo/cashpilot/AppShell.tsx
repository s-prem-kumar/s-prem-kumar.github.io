"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { demoUser } from "./data";
import { PAGE_NOTES } from "./notes";
import { PageNotes } from "./PageNotes";
import { useDemo } from "./store";

/**
 * The demo's application chrome: a navy sidebar, a header, the read-only
 * banner, and the toast that explains a blocked action.
 *
 * The whole demo is one route with client-side view switching rather than
 * several Next.js routes. That keeps the in-memory state alive as you move
 * around — with no backend, a route change would reset every mapping you'd
 * made, which is the one thing a visitor is here to try.
 */

export type DemoView =
  | "dashboard"
  | "transactions"
  | "records"
  | "statements"
  | "reports"
  | "masters";

const NAV: { id: DemoView; label: string; icon: ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <GridIcon /> },
  { id: "transactions", label: "Transactions", icon: <SwapIcon /> },
  { id: "records", label: "Income & Expenses", icon: <ListIcon /> },
  { id: "statements", label: "Bank Statements", icon: <DocIcon /> },
  { id: "reports", label: "Reports", icon: <ChartIcon /> },
  { id: "masters", label: "Masters", icon: <TagIcon /> },
];

export function AppShell({
  view,
  onChangeView,
  children,
}: {
  view: DemoView;
  onChangeView: (view: DemoView) => void;
  children: ReactNode;
}) {
  const { signOut, blockedMessage, dismissBlocked, blockAction, isDirty, reset } =
    useDemo();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 dark:bg-slate-950">
      {/* Read-only banner — the first thing a visitor should understand. */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-amber-400 px-4 py-2 text-center text-[0.8rem] font-medium text-amber-950">
        <span>
          Illustration only — a simplified replica with invented data, not the
          real CashPilot. <strong>Map</strong> and <strong>unmap</strong> work;
          everything else is disabled.
        </span>
        {isDirty && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-amber-950/10 px-2.5 py-0.5 text-xs font-semibold underline-offset-2 hover:bg-amber-950/20"
          >
            Reset demo data
          </button>
        )}
      </div>

      <div className="mx-auto flex w-full max-w-[1400px]">
        {/* Sidebar */}
        <aside
          className={`${
            navOpen ? "block" : "hidden"
          } w-full shrink-0 bg-slate-900 md:block md:w-60`}
        >
          <div className="sticky top-16 flex h-full flex-col p-3">
            <div className="mb-4 flex items-center gap-2.5 px-2 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                ₹
              </span>
              <span className="text-base font-bold tracking-tight text-white">
                CashPilot
              </span>
            </div>

            <nav>
              <ul className="space-y-0.5">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onChangeView(item.id);
                        setNavOpen(false);
                      }}
                      aria-current={view === item.id ? "page" : undefined}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        view === item.id
                          ? "bg-emerald-600 text-white"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto border-t border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => blockAction("Profile settings")}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <UserIcon />
                Profile
              </button>
              <button
                type="button"
                onClick={signOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <ExitIcon />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setNavOpen((v) => !v)}
                aria-label="Toggle navigation"
                className="rounded-lg border border-slate-200 p-1.5 text-slate-600 md:hidden dark:border-slate-700 dark:text-slate-300"
              >
                <MenuIcon />
              </button>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {NAV.find((n) => n.id === view)?.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {demoUser.bank} · {demoUser.accountNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/projects/cashpilot"
                className="hidden rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 sm:block dark:border-slate-700 dark:text-slate-300"
              >
                ← Case study
              </Link>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                DU
              </span>
            </div>
          </header>

          {/* Bottom padding leaves room for the docked notes button so it
              never covers the last row of a table. */}
          <main className="p-4 pb-32 sm:p-6 sm:pb-32">{children}</main>
        </div>
      </div>

      <PageNotes
        title={NAV.find((n) => n.id === view)?.label ?? "This page"}
        note={PAGE_NOTES[view]}
      />

      {/* Blocked-action toast */}
      {blockedMessage && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-200 shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-amber-400">
              <LockIcon />
            </span>
            <p className="flex-1 leading-relaxed">{blockedMessage}</p>
            <button
              type="button"
              onClick={dismissBlocked}
              aria-label="Dismiss"
              className="text-slate-500 transition-colors hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons — inline so the demo adds no dependency.                              */
/* -------------------------------------------------------------------------- */

const ico = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function GridIcon() {
  return (
    <svg {...ico}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg {...ico}>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg {...ico}>
      <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg {...ico}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg {...ico}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg {...ico}>
      <path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg {...ico}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function ExitIcon() {
  return (
    <svg {...ico}>
      <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg {...ico} width={18} height={18}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg {...ico} width={18} height={18}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
