"use client";

import { useState } from "react";
import { CheckIcon } from "../ui/Icons";

/**
 * Interactive walkthrough of the Cypher query checker.
 *
 * This project can't have a hosted demo — it needs a 62.7M-relationship Neo4j
 * instance and a GPU serving Llama through Ollama. So instead of a screenshot,
 * this steps through the worked example from §5.4 of the project report: the
 * query the LLM actually produced, and the three repairs the checker applies
 * to it. Everything is static and client-side, so it costs nothing to host and
 * can't break.
 *
 * The three defects are fixed in the order the checker runs them, so the step
 * index doubles as "which defects have been repaired so far".
 */

const QUESTION =
  "What are the names of drugs contraindicated if the patient has multiple sclerosis?";

const STEPS = [
  {
    phase: "LLM output",
    title: "Llama 3.2 writes the query",
    body: "The question and the live graph schema go to the model, which returns Cypher. It's structurally close — and wrong in three specific ways, all of them recurring failure modes rather than one-off mistakes.",
  },
  {
    phase: "Phase 1",
    title: "Syntax Node Checker",
    body: "RETURN dr hands back the entire node — every property on it — when the question asked for names. The checker appends .name so the result is readable, and the LLM downstream is given facts rather than a serialised object.",
  },
  {
    phase: "Phase 2",
    title: "Node Checker",
    body: "The entities are re-derived from the question and checked against the graph schema. Multiple sclerosis is a Disease, not a pathway, so the mislabelled node type is corrected. A wrong label usually returns nothing at all — which at least fails loudly.",
  },
  {
    phase: "Phase 3",
    title: "Relation Checker",
    body: "Contraindication runs from drug to disease, but the model wrote it pointing the other way. This is the dangerous one: the query stays valid and still returns rows, so without the check you get a confident answer to a question nobody asked. The direction is reversed.",
  },
] as const;

export function QueryCheckerDemo() {
  const [step, setStep] = useState(0);
  const done = step === STEPS.length - 1;

  return (
    <div className="overflow-hidden rounded-xl border border-border-base bg-surface">
      <div className="border-b border-border-base p-5">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
          Interactive — no demo required
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Step through the repairs the query checker makes to a real generated
          query. This is the worked example from the project report.
        </p>
      </div>

      {/* Question */}
      <div className="border-b border-border-base p-5">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
          User question
        </p>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground">
          &ldquo;{QUESTION}&rdquo;
        </p>
      </div>

      {/* Query. Horizontally scrollable so long Cypher never widens the page. */}
      <div className="border-b border-border-base bg-background p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
            Cypher query
          </p>
          {done && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
              <CheckIcon className="h-3.5 w-3.5" />
              Valid — executed against the graph
            </span>
          )}
        </div>

        <pre className="mt-3 overflow-x-auto font-mono text-[0.8rem] leading-7 text-foreground">
          <code>
            {"MATCH (d:"}
            <Fix
              step={step}
              fixedAt={2}
              before="pathway"
              after="disease"
              label="node type"
            />
            {' {name: "multiple sclerosis"})'}
            <Fix
              step={step}
              fixedAt={3}
              before="-[:contraindication]->"
              after="<-[:contraindication]-"
              label="direction"
            />
            {"(dr:drug)\n"}
            {"RETURN "}
            <Fix
              step={step}
              fixedAt={1}
              before="dr"
              after="dr.name"
              label="return property"
            />
            {";"}
          </code>
        </pre>
      </div>

      {/* Steps */}
      <div className="p-5">
        <ol className="flex flex-wrap gap-2" aria-label="Query checker phases">
          {STEPS.map((s, i) => {
            const active = i === step;
            const complete = i < step;
            return (
              <li key={s.phase}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  aria-current={active ? "step" : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-accent bg-accent text-background"
                      : complete
                        ? "border-accent-border bg-accent-soft text-accent"
                        : "border-border-base bg-background text-muted hover:border-border-strong"
                  }`}
                >
                  {complete && <CheckIcon className="h-3.5 w-3.5" />}
                  {s.phase}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-5">
          <h3 className="font-semibold tracking-tight text-foreground">
            {STEPS[step].title}
          </h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
            {STEPS[step].body}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
            disabled={done}
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {done ? "All checks passed" : "Run next check"}
          </button>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(0)}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Reset
            </button>
          )}
        </div>

        {done && (
          <p className="mt-5 border-t border-border-base pt-5 text-sm leading-relaxed text-muted">
            A query that survives all three phases runs against the graph, and
            only the concepts it returns are passed back to the LLM to phrase an
            answer. Anything the checker can&rsquo;t repair goes back to the
            model with the specific reason it failed, so the next attempt is
            informed rather than a re-roll.
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * One defect in the query: struck through while it's still wrong, highlighted
 * on the step that repairs it, then plain once it's settled.
 */
function Fix({
  step,
  fixedAt,
  before,
  after,
  label,
}: {
  step: number;
  fixedAt: number;
  before: string;
  after: string;
  label: string;
}) {
  if (step < fixedAt) {
    return (
      <span
        className="rounded bg-red-500/15 px-1 text-red-600 line-through decoration-red-500/60 dark:text-red-400"
        title={`Incorrect ${label}`}
      >
        {before}
      </span>
    );
  }

  if (step === fixedAt) {
    return (
      <span
        className="rounded bg-accent-soft px-1 font-semibold text-accent ring-1 ring-accent-border"
        title={`Corrected ${label}`}
      >
        {after}
      </span>
    );
  }

  return <span>{after}</span>;
}
