"use client";

import { demoBankTransactions, demoStatements, formatDate } from "../data";
import { Card, DisabledAction, Pill, Table } from "./ui";

/**
 * Bank statements — the uploads the transactions were extracted from.
 *
 * Upload is disabled: the demo has no backend, and the real pipeline (pdfjs
 * text extraction with a tesseract.js OCR fallback in a child process) needs a
 * server. The panel below explains what would happen instead of pretending.
 */
export function Statements() {
  return (
    <div className="space-y-5">
      <Card
        title="Uploaded statements"
        action={<DisabledAction label="Upload statement">Upload PDF</DisabledAction>}
      >
        <Table
          headers={["Bank", "File", "Period", "Uploaded", "Rows", "Status"]}
        >
          {demoStatements.map((statement) => (
            <tr
              key={statement.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
            >
              <td className="whitespace-nowrap px-3 py-3 font-medium text-slate-900 dark:text-white">
                {statement.bank}
              </td>
              <td className="px-3 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                {statement.fileName}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-slate-600 dark:text-slate-300">
                {statement.period}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-slate-600 dark:text-slate-300">
                {formatDate(statement.uploadedAt)}
              </td>
              <td className="px-3 py-3 tabular-nums text-slate-600 dark:text-slate-300">
                {
                  demoBankTransactions.filter(
                    (t) => t.statementId === statement.id,
                  ).length
                }
              </td>
              <td className="px-3 py-3">
                <Pill tone="green">Processed</Pill>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <Card title="How extraction works in the real application">
        <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          {[
            "The PDF is stored privately — never served statically — and capped at 20 MB.",
            "pdfjs-dist pulls out embedded text. If the statement is a scan with no text layer, an isolated child process rasterises the page and tesseract.js runs OCR on it.",
            "A registry of rule-based parsers detects which of ten Indian banks issued the statement from its header, then extracts rows, dates, amounts and the running balance.",
            "Debit or credit is decided from the change in running balance rather than from the column heading, which differs between banks.",
            "Each row is deduplicated — by reference number where one exists, by a content fingerprint where it doesn't — so a re-issued or overlapping statement can't double-count.",
            "If the parser isn't confident, nothing is saved and the statement is flagged for review rather than importing rows that might be wrong.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400">
                {i + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
