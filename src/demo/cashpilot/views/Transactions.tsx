"use client";

import { useMemo, useState } from "react";
import {
  categoryById,
  demoBankTransactions,
  demoRecords,
  formatDate,
  inr,
  recordById,
  type DemoBankTransaction,
} from "../data";
import { useDemo } from "../store";
import { Card, DisabledAction, Pill, Table } from "./ui";

/**
 * Transactions — the one view where a visitor can genuinely change something.
 *
 * Mapping links a row extracted from a bank statement to a manual income or
 * expense record. The real app enforces the same rules this demo does: a bank
 * transaction maps to exactly one record, a credit may only map to income and
 * a debit only to an expense, and a record already claimed by another
 * transaction can't be mapped twice.
 */
export function Transactions() {
  const { mappings, unmap } = useDemo();
  const [filter, setFilter] = useState<"ALL" | "CREDIT" | "DEBIT">("ALL");
  const [query, setQuery] = useState("");
  const [mapping, setMapping] = useState<DemoBankTransaction | null>(null);

  const rows = useMemo(() => {
    return demoBankTransactions
      .filter((t) => {
        if (filter === "CREDIT" && t.deposit === 0) return false;
        if (filter === "DEBIT" && t.withdrawal === 0) return false;
        if (!query.trim()) return true;
        return t.description.toLowerCase().includes(query.trim().toLowerCase());
      })
      .slice()
      .reverse();
  }, [filter, query]);

  return (
    <div className="space-y-5">
      <Card
        title="Extracted bank transactions"
        action={
          <div className="flex items-center gap-2">
            <DisabledAction label="Upload statement">Upload</DisabledAction>
            <DisabledAction label="Export">Export</DisabledAction>
          </div>
        }
      >
        {/* Filters — these genuinely work. */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700">
            {(["ALL", "CREDIT", "DEBIT"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  filter === option
                    ? "bg-emerald-700 text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {option === "ALL"
                  ? "All"
                  : option === "CREDIT"
                    ? "Income"
                    : "Expense"}
              </button>
            ))}
          </div>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search description…"
            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-600 sm:max-w-xs dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />

          <span className="text-xs text-slate-500 dark:text-slate-400">
            {rows.length} row{rows.length === 1 ? "" : "s"}
          </span>
        </div>

        <Table
          headers={["Date", "Description", "Reference", "Amount", "Mapped to", ""]}
        >
          {rows.map((t) => {
            const mappedId = mappings[t.id];
            const record = mappedId ? recordById(mappedId) : undefined;
            const isCredit = t.deposit > 0;

            return (
              <tr
                key={t.id}
                className="align-middle hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <td className="whitespace-nowrap px-3 py-3 text-slate-600 dark:text-slate-300">
                  {formatDate(t.date)}
                </td>
                <td className="max-w-[18rem] px-3 py-3">
                  <p className="truncate font-medium text-slate-900 dark:text-white">
                    {t.description}
                  </p>
                </td>
                <td className="px-3 py-3 font-mono text-xs text-slate-400 dark:text-slate-500">
                  {t.referenceNumber || "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <span
                    className={`font-semibold tabular-nums ${
                      isCredit
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {isCredit ? "+" : "−"}
                    {inr(isCredit ? t.deposit : t.withdrawal)}
                  </span>
                </td>
                <td className="px-3 py-3">
                  {record ? (
                    <span className="flex flex-col">
                      <Pill tone="green">{record.description}</Pill>
                      <span className="mt-1 text-xs text-slate-400">
                        {categoryById(record.categoryId)?.name}
                      </span>
                    </span>
                  ) : (
                    <Pill tone="slate">Not mapped</Pill>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-right">
                  {record ? (
                    <button
                      type="button"
                      onClick={() => unmap(t.id)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-500/40 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
                    >
                      Unmap
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setMapping(t)}
                      className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-800"
                    >
                      Map
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </Table>

        {rows.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-500">
            No transactions match that search.
          </p>
        )}
      </Card>

      {mapping && (
        <MapDialog
          transaction={mapping}
          onClose={() => setMapping(null)}
        />
      )}
    </div>
  );
}

/**
 * Map dialog. Candidate records are filtered the way the real app filters
 * them: matching direction, and not already mapped to another transaction.
 */
function MapDialog({
  transaction,
  onClose,
}: {
  transaction: DemoBankTransaction;
  onClose: () => void;
}) {
  const { mappings, map } = useDemo();
  const isCredit = transaction.deposit > 0;
  const amount = isCredit ? transaction.deposit : transaction.withdrawal;

  const claimed = new Set(Object.values(mappings));

  const candidates = demoRecords.filter((record) => {
    if (claimed.has(record.id)) return false;
    return record.type === (isCredit ? "INCOME" : "EXPENSE");
  });

  // Exact amount matches float to the top — that's the match a user wants.
  const sorted = [...candidates].sort((a, b) => {
    const aExact = a.amount === amount ? 0 : 1;
    const bExact = b.amount === amount ? 0 : 1;
    return aExact - bExact || a.date.localeCompare(b.date);
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Map transaction"
      onClick={onClose}
    >
      <div
        className="max-h-[80vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-200 p-5 dark:border-slate-800">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Map transaction
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {transaction.description}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Pill tone={isCredit ? "green" : "red"}>
              {isCredit ? "Credit → Income" : "Debit → Expense"}
            </Pill>
            <Pill tone="slate">{formatDate(transaction.date)}</Pill>
            <Pill tone="slate">{inr(amount)}</Pill>
          </div>
        </div>

        <div className="max-h-[45vh] overflow-y-auto p-3">
          {sorted.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">
              Every matching record is already mapped to another transaction.
              Unmap one first — the demo enforces the same one-to-one rule the
              real app does.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {sorted.map((record) => {
                const exact = record.amount === amount;
                return (
                  <li key={record.id}>
                    <button
                      type="button"
                      onClick={() => {
                        map(transaction.id, record.id);
                        onClose();
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 text-left transition-colors hover:border-emerald-600 hover:bg-emerald-50 dark:border-slate-800 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/30"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-900 dark:text-white">
                          {record.description}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                          {categoryById(record.categoryId)?.name} ·{" "}
                          {formatDate(record.date)}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        {exact && <Pill tone="amber">Exact amount</Pill>}
                        <span className="text-sm font-semibold tabular-nums text-slate-900 dark:text-white">
                          {inr(record.amount)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
