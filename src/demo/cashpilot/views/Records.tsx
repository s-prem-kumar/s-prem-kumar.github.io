"use client";

import { useState } from "react";
import {
  categoryById,
  demoRecords,
  formatDate,
  inr,
  partyById,
} from "../data";
import { useDemo } from "../store";
import { Card, DisabledAction, Pill, Table } from "./ui";

/**
 * Income & expenses — the records a bank transaction gets mapped onto.
 *
 * Read-only in the demo: creating or deleting a record would change what the
 * dashboard and reports add up to, and there's no per-visitor storage to
 * isolate that. Filtering and sorting still work.
 */
export function Records() {
  const { mappings } = useDemo();
  const [type, setType] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");

  const claimed = new Set(Object.values(mappings));
  const rows = demoRecords
    .filter((r) => type === "ALL" || r.type === type)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Card
      title="Income & expense records"
      action={
        <div className="flex items-center gap-2">
          <DisabledAction label="Add record">Add</DisabledAction>
          <DisabledAction label="Delete">Delete</DisabledAction>
        </div>
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700">
          {(["ALL", "INCOME", "EXPENSE"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setType(option)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors ${
                type === option
                  ? "bg-emerald-700 text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {option.toLowerCase()}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {rows.length} records
        </span>
      </div>

      <Table
        headers={["Date", "Description", "Category", "Party", "Amount", "Status"]}
      >
        {rows.map((record) => (
          <tr
            key={record.id}
            className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
          >
            <td className="whitespace-nowrap px-3 py-3 text-slate-600 dark:text-slate-300">
              {formatDate(record.date)}
            </td>
            <td className="px-3 py-3 font-medium text-slate-900 dark:text-white">
              {record.description}
            </td>
            <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
              {categoryById(record.categoryId)?.name}
              <span className="block text-xs text-slate-400">
                {categoryById(record.categoryId)?.parent}
              </span>
            </td>
            <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
              {partyById(record.partyId)?.name ?? "—"}
            </td>
            <td className="whitespace-nowrap px-3 py-3">
              <span
                className={`font-semibold tabular-nums ${
                  record.type === "INCOME"
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {record.type === "INCOME" ? "+" : "−"}
                {inr(record.amount)}
              </span>
            </td>
            <td className="px-3 py-3">
              {claimed.has(record.id) ? (
                <Pill tone="green">Mapped</Pill>
              ) : (
                <Pill tone="slate">Unmapped</Pill>
              )}
            </td>
          </tr>
        ))}
      </Table>
    </Card>
  );
}
