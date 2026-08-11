"use client";

import { useState } from "react";
import { CheckIcon } from "../ui/Icons";

/**
 * Interactive walkthrough of the retrieval pipeline in the Link & PDF Reader.
 *
 * The real app can't be hosted for free — it serves a model through Ollama and
 * downloads a 90 MB embedding model on first run. So instead of a screenshot,
 * this reproduces the pipeline's decisions on a fixed document: the same chunk
 * size and overlap as `app.py`, the same all-MiniLM-L6-v2 embedding dimension,
 * and the same "stuff" chain behaviour.
 *
 * The similarity scores below are precomputed, not calculated in the browser —
 * running a real embedding model here would mean shipping one. They're
 * illustrative of the ranking, which is the part worth showing: pick a
 * different question and a different set of chunks is retrieved.
 */

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;
const EMBED_DIM = 384;
const TOP_K = 3;

/** A fixed source document, standing in for a loaded URL or PDF. */
const CHUNKS = [
  {
    id: 0,
    text: "The library was founded in 1897 and moved to its present building in 1932. The reading room seats four hundred and is open to the public without charge.",
  },
  {
    id: 1,
    text: "Opening hours are 09:00 to 20:00 on weekdays and 10:00 to 17:00 on Saturdays. The building is closed on Sundays and on public holidays.",
  },
  {
    id: 2,
    text: "Members may borrow up to twelve items at a time. Loans run for three weeks and may be renewed twice, provided no other member has placed a hold.",
  },
  {
    id: 3,
    text: "A late return incurs a fee of two rupees per item per day, capped at the replacement cost of the item. Fees are waived for members under eighteen.",
  },
  {
    id: 4,
    text: "The rare books collection is held in a climate-controlled room on the third floor. Access requires an appointment and items may not be removed.",
  },
];

/**
 * Precomputed retrieval results. Each question lists similarity per chunk —
 * the ranking a real embedding model produces on this document.
 */
const QUESTIONS = [
  {
    q: "How long can I keep a borrowed book?",
    scores: [0.11, 0.19, 0.86, 0.41, 0.14],
    answer:
      "Loans run for three weeks and can be renewed twice, as long as no other member has placed a hold on the item. Members may have up to twelve items on loan at once.",
  },
  {
    q: "What happens if I return something late?",
    scores: [0.08, 0.16, 0.44, 0.91, 0.10],
    answer:
      "A late return costs two rupees per item per day, capped at the item's replacement cost. Members under eighteen are not charged.",
  },
  {
    q: "When is the library open?",
    scores: [0.31, 0.93, 0.17, 0.09, 0.22],
    answer:
      "09:00 to 20:00 on weekdays and 10:00 to 17:00 on Saturdays. It is closed on Sundays and public holidays.",
  },
];

const STEPS = [
  {
    label: "Load",
    title: "Load the document",
    body: "A URL goes through LangChain's WebBaseLoader with a custom User-Agent; a PDF goes through PyPDF2 page by page. Either way the result is one long string — everything downstream is identical regardless of where the text came from.",
  },
  {
    label: "Split",
    title: "Split into overlapping chunks",
    body: `RecursiveCharacterTextSplitter cuts the text into ${CHUNK_SIZE}-character chunks with a ${CHUNK_OVERLAP}-character overlap. The overlap is the part worth understanding: a fixed window will sometimes cut a sentence — or the link between a claim and its qualifier — in half. Overlapping means anything near a boundary still appears whole in one of the two neighbours.`,
  },
  {
    label: "Embed",
    title: "Embed and index",
    body: `Each chunk becomes a ${EMBED_DIM}-dimension vector via all-MiniLM-L6-v2, running locally rather than through an API, and the vectors go into a FAISS index held in memory. This is why the app needs no API key — and why restarting it loses the document.`,
  },
  {
    label: "Retrieve",
    title: "Retrieve by similarity",
    body: `The question is embedded with the same model, then FAISS returns the nearest chunks by vector similarity. Only the top ${TOP_K} are kept. Try each question below and watch the ranking change — this is semantic matching, not keyword search, so "how long can I keep a book" finds the chunk about loan periods without sharing a single distinctive word with it.`,
  },
  {
    label: "Generate",
    title: "Answer from retrieved context only",
    body: 'RetrievalQA\'s "stuff" chain concatenates the retrieved chunks into one prompt and hands it to llama3.2:3b through Ollama. The model writes the answer from that context rather than from training data, and the chain returns the source documents alongside it so the answer can be checked.',
  },
] as const;

export function RagPipelineDemo() {
  const [step, setStep] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const question = QUESTIONS[questionIndex];

  // Highest similarity first — the order FAISS returns them in.
  const ranked = CHUNKS.map((chunk) => ({
    ...chunk,
    score: question.scores[chunk.id],
  })).sort((a, b) => b.score - a.score);

  const retrieved = ranked.slice(0, TOP_K);
  const retrievedIds = new Set(retrieved.map((c) => c.id));

  return (
    <div className="overflow-hidden rounded-xl border border-border-base bg-surface">
      <div className="border-b border-border-base p-5">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
          Interactive — no hosting required
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Step through the retrieval pipeline on a fixed document, using the
          same chunk size, overlap and chain type as the source.
        </p>
      </div>

      {/* Pipeline stepper */}
      <div className="flex flex-wrap gap-2 border-b border-border-base p-5">
        {STEPS.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setStep(i)}
            aria-current={i === step ? "step" : undefined}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              i === step
                ? "border-accent bg-accent text-background"
                : i < step
                  ? "border-accent-border bg-accent-soft text-accent"
                  : "border-border-base bg-background text-muted hover:border-border-strong"
            }`}
          >
            {i < step && <CheckIcon className="h-3.5 w-3.5" />}
            {i + 1}. {s.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        <h3 className="font-semibold tracking-tight text-foreground">
          {STEPS[step].title}
        </h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
          {STEPS[step].body}
        </p>

        <div className="mt-5">
          {step === 0 && <LoadStage />}
          {step === 1 && <SplitStage />}
          {step === 2 && <EmbedStage />}
          {step >= 3 && (
            <RetrieveStage
              questionIndex={questionIndex}
              onPickQuestion={setQuestionIndex}
              ranked={ranked}
              retrievedIds={retrievedIds}
              showAnswer={step === 4}
              answer={question.answer}
              retrieved={retrieved}
            />
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border-base pt-5">
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
            disabled={step === STEPS.length - 1}
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === STEPS.length - 1 ? "Pipeline complete" : "Next step"}
          </button>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(0)}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Start over
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadStage() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[
        {
          kind: "URL",
          loader: "WebBaseLoader",
          note: "Fetches static HTML. A page that renders its content with JavaScript comes back nearly empty.",
        },
        {
          kind: "PDF",
          loader: "PyPDF2",
          note: "Reads the embedded text layer. A scanned page has none, so it returns nothing — handling scans would need OCR.",
        },
      ].map((source) => (
        <div
          key={source.kind}
          className="rounded-lg border border-border-base bg-background p-4"
        >
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
            {source.kind}
          </p>
          <p className="mt-1.5 font-mono text-sm text-accent">{source.loader}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">{source.note}</p>
        </div>
      ))}
    </div>
  );
}

function SplitStage() {
  return (
    <div>
      {/* A schematic of two adjacent chunks sharing their overlap region. */}
      <div className="overflow-x-auto">
        <div className="min-w-[26rem]">
          <div className="flex items-stretch gap-1 text-[0.65rem] font-medium">
            <div className="flex h-9 flex-[4] items-center justify-center rounded-l-md bg-accent-soft text-accent ring-1 ring-accent-border">
              chunk 1
            </div>
            <div className="flex h-9 flex-1 items-center justify-center bg-amber-500/20 text-amber-700 ring-1 ring-amber-500/40 dark:text-amber-400">
              overlap
            </div>
            <div className="flex h-9 flex-[4] items-center justify-center rounded-r-md bg-accent-soft text-accent ring-1 ring-accent-border">
              chunk 2
            </div>
          </div>
          <div className="mt-1.5 flex gap-1 font-mono text-[0.65rem] text-subtle">
            <span className="flex-[4] text-center">{CHUNK_SIZE} chars</span>
            <span className="flex-1 text-center">{CHUNK_OVERLAP}</span>
            <span className="flex-[4] text-center">{CHUNK_SIZE} chars</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-subtle">
        This document splits into {CHUNKS.length} chunks.
      </p>
    </div>
  );
}

function EmbedStage() {
  return (
    <div className="space-y-2">
      {CHUNKS.map((chunk) => (
        <div
          key={chunk.id}
          className="flex items-center gap-3 rounded-lg border border-border-base bg-background p-3"
        >
          <span className="shrink-0 rounded bg-surface px-2 py-1 font-mono text-[0.7rem] text-subtle">
            #{chunk.id}
          </span>
          <span className="min-w-0 flex-1 truncate text-xs text-muted">
            {chunk.text}
          </span>
          <span className="shrink-0 font-mono text-[0.7rem] text-accent">
            [{EMBED_DIM}d]
          </span>
        </div>
      ))}
      <p className="pt-1 text-xs text-subtle">
        {CHUNKS.length} vectors indexed in FAISS, in memory.
      </p>
    </div>
  );
}

function RetrieveStage({
  questionIndex,
  onPickQuestion,
  ranked,
  retrievedIds,
  showAnswer,
  answer,
  retrieved,
}: {
  questionIndex: number;
  onPickQuestion: (index: number) => void;
  ranked: { id: number; text: string; score: number }[];
  retrievedIds: Set<number>;
  showAnswer: boolean;
  answer: string;
  retrieved: { id: number }[];
}) {
  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
        Ask a question
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {QUESTIONS.map((question, i) => (
          <button
            key={question.q}
            type="button"
            onClick={() => onPickQuestion(i)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              i === questionIndex
                ? "border-accent bg-accent-soft text-accent"
                : "border-border-base bg-background text-muted hover:border-border-strong"
            }`}
          >
            {question.q}
          </button>
        ))}
      </div>

      <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
        Similarity ranking — top {TOP_K} retrieved
      </p>
      <ul className="mt-2 space-y-1.5">
        {ranked.map((chunk) => {
          const hit = retrievedIds.has(chunk.id);
          return (
            <li
              key={chunk.id}
              className={`rounded-lg border p-3 transition-colors ${
                hit
                  ? "border-accent-border bg-accent-soft"
                  : "border-border-base bg-background opacity-55"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 font-mono text-[0.7rem] text-subtle">
                  #{chunk.id}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border-base">
                  <div
                    className={`h-full rounded-full ${hit ? "bg-accent" : "bg-border-strong"}`}
                    style={{ width: `${chunk.score * 100}%` }}
                  />
                </div>
                <span
                  className={`shrink-0 font-mono text-[0.7rem] ${hit ? "text-accent" : "text-subtle"}`}
                >
                  {chunk.score.toFixed(2)}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {chunk.text}
              </p>
            </li>
          );
        })}
      </ul>

      {showAnswer && (
        <div className="mt-5 rounded-lg border border-border-base bg-background p-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
            Answer
          </p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground">
            {answer}
          </p>
          <p className="mt-3 border-t border-border-base pt-3 font-mono text-[0.7rem] text-subtle">
            sources: {retrieved.map((c) => `chunk #${c.id}`).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
