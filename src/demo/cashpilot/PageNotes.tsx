"use client";

import { useState } from "react";
import type { PageNote } from "./notes";

/**
 * Developer notes, docked in the bottom-right corner.
 *
 * Placement matters here. The notes are the most interesting thing in the
 * demo — they carry the reasoning a screenshot can't — but they're commentary,
 * not the product, so they mustn't sit in the middle of the screens they
 * describe. Bottom-right keeps them one click away on every page without
 * covering a table, and clears the bottom-centre toast that explains blocked
 * actions.
 *
 * Collapsed by default: a visitor who wants to click around shouldn't have to
 * dismiss anything first.
 */
export function PageNotes({ title, note }: { title: string; note: PageNote }) {
  const [open, setOpen] = useState(false);
  // The button is easy to miss in a corner, so until it's been opened once it
  // pulses and carries a pointer label. Both stop for good after first use —
  // an attention cue that keeps firing after you've acted on it is just noise.
  const [everOpened, setEverOpened] = useState(false);

  function toggle() {
    setOpen((v) => !v);
    setEverOpened(true);
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="pointer-events-auto max-h-[70vh] w-[min(24rem,calc(100vw-2.5rem))] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-5 text-slate-300 shadow-2xl">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-emerald-400">
                Developer notes
              </p>
              <h2 className="mt-1 text-sm font-semibold text-white">{title}</h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close notes"
              className="shrink-0 text-slate-500 transition-colors hover:text-white"
            >
              ✕
            </button>
          </div>

          <dl className="space-y-4 text-[0.82rem] leading-relaxed">
            <Entry label="Purpose" text={note.purpose} />
            <Entry label="How it works" text={note.how} />
            <Entry label="Why it's built this way" text={note.why} accent />
            {note.inDemo && (
              <Entry label="In this demo" text={note.inDemo} muted />
            )}
          </dl>
        </div>
      )}

      {/* One-time nudge, pointing at the button. */}
      {!everOpened && (
        <div className="pointer-events-none relative mr-1 max-w-[15rem] rounded-xl bg-slate-900 px-3 py-2 text-right text-[0.7rem] font-medium leading-snug text-white shadow-xl ring-1 ring-slate-700">
          Read why each screen is built the way it is
          {/* Arrow */}
          <span className="absolute -bottom-1 right-6 h-2.5 w-2.5 rotate-45 bg-slate-900 ring-1 ring-slate-700" />
        </div>
      )}

      <div className="pointer-events-auto relative">
        {/* Attention ring — stops once the panel has been opened, and never
            animates for visitors who've asked for reduced motion. */}
        {!everOpened && (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none"
          />
        )}

        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="relative inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-emerald-900/30 ring-2 ring-white transition-colors hover:bg-emerald-700 dark:ring-slate-900"
        >
          <NoteGlyph />
          {open ? "Hide notes" : "Why this page exists"}
        </button>
      </div>
    </div>
  );
}

function Entry({
  label,
  text,
  accent = false,
  muted = false,
}: {
  label: string;
  text: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={
        muted ? "rounded-lg border border-amber-500/25 bg-amber-500/5 p-3" : ""
      }
    >
      <dt
        className={`text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${
          muted
            ? "text-amber-400"
            : accent
              ? "text-emerald-400"
              : "text-slate-500"
        }`}
      >
        {label}
      </dt>
      <dd className={`mt-1 ${muted ? "text-amber-100/70" : "text-slate-300"}`}>
        {text}
      </dd>
    </div>
  );
}

/**
 * Static variant for the login screen, which sits outside the app shell and
 * has room for the notes inline.
 */
export function InlineNotes({ title, note }: { title: string; note: PageNote }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
        Developer notes · {title}
      </p>
      <dl className="mt-3 space-y-3 text-xs leading-relaxed">
        <div>
          <dt className="font-semibold text-slate-700 dark:text-slate-300">
            Purpose
          </dt>
          <dd className="mt-0.5 text-slate-600 dark:text-slate-400">
            {note.purpose}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-700 dark:text-slate-300">
            How it works
          </dt>
          <dd className="mt-0.5 text-slate-600 dark:text-slate-400">
            {note.how}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-700 dark:text-slate-300">
            Why it&rsquo;s built this way
          </dt>
          <dd className="mt-0.5 text-slate-600 dark:text-slate-400">
            {note.why}
          </dd>
        </div>
        {note.inDemo && (
          <div className="rounded-lg border border-amber-300/60 bg-amber-50 p-2.5 dark:border-amber-500/25 dark:bg-amber-950/20">
            <dt className="font-semibold text-amber-800 dark:text-amber-400">
              In this demo
            </dt>
            <dd className="mt-0.5 text-amber-800/80 dark:text-amber-500/70">
              {note.inDemo}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

function NoteGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}
