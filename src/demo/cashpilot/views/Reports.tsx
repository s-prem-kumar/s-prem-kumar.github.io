"use client";

import { useState } from "react";
import {
  categoryById,
  demoBankTransactions,
  demoRecords,
  formatDate,
  inr,
  partyById,
  recordById,
  spendByParentCategory,
  totalExpenses,
  totalIncome,
} from "../data";
import { useDemo } from "../store";
import { Card, DisabledAction, Pill, Table } from "./ui";

/**
 * Reports. The real application ships seven; three representative ones are
 * reproduced here — the export buttons are disabled because generating an
 * Excel or PDF file needs the libraries the real client bundles, and shipping
 * them into a portfolio for a demo isn't a trade worth making.
 */

const REPORTS = [
  { id: "category", name: "Spend by category" },
  { id: "mapped", name: "Mapped transactions" },
  { id: "party", name: "Payments by party" },
] as const;

type ReportId = (typeof REPORTS)[number]["id"];

export function Reports() {
  const [active, setActive] = useState<ReportId>("category");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {REPORTS.map((report) => (
          <button
            key={report.id}
            type="button"
            onClick={() => setActive(report.id)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              active === report.id
                ? "border-emerald-700 bg-emerald-700 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            {report.name}
          </button>
        ))}
        <span className="ml-auto flex gap-2">
          <DisabledAction label="Excel export">Excel</DisabledAction>
          <DisabledAction label="PDF export">PDF</DisabledAction>
        </span>
      </div>

      {active === "category" && <CategoryReport />}
      {active === "mapped" && <MappedReport />}
      {active === "party" && <PartyReport />}

      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        The real application ships seven reports with global filters, sorting,
        pagination and Excel/PDF export.
      </p>
    </div>
  );
}

function CategoryReport() {
  const rows = spendByParentCategory();
  const total = rows.reduce((sum, r) => sum + r.total, 0);

  return (
    <Card title="Spend by category">
      <Table headers={["Category", "Amount", "Share", ""]}>
        {rows.map((row) => {
          const share = total === 0 ? 0 : (row.total / total) * 100;
          return (
            <tr key={row.name}>
              <td className="px-3 py-3 font-medium text-slate-900 dark:text-white">
                {row.name}
              </td>
              <td className="px-3 py-3 tabular-nums text-slate-700 dark:text-slate-200">
                {inr(row.total)}
              </td>
              <td className="px-3 py-3 tabular-nums text-slate-500 dark:text-slate-400">
                {share.toFixed(1)}%
              </td>
              <td className="px-3 py-3">
                <div className="h-2 w-full max-w-[10rem] overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{ width: `${share}%` }}
                  />
                </div>
              </td>
            </tr>
          );
        })}
        <tr className="border-t-2 border-slate-200 font-semibold dark:border-slate-700">
          <td className="px-3 py-3 text-slate-900 dark:text-white">Total</td>
          <td className="px-3 py-3 tabular-nums text-slate-900 dark:text-white">
            {inr(total)}
          </td>
          <td className="px-3 py-3" colSpan={2} />
        </tr>
      </Table>
    </Card>
  );
}

/**
 * Mirrors the real report's nesting: each bank transaction with its mapped
 * record indented beneath it.
 */
function MappedReport() {
  const { mappings } = useDemo();

  return (
    <Card title="Mapped transactions">
      <Table headers={["Date", "Bank transaction", "Mapped record", "Amount"]}>
        {[...demoBankTransactions].reverse().map((t) => {
          const record = mappings[t.id] ? recordById(mappings[t.id]) : undefined;
          const amount = t.deposit > 0 ? t.deposit : t.withdrawal;

          return (
            <tr key={t.id}>
              <td className="whitespace-nowrap px-3 py-3 text-slate-600 dark:text-slate-300">
                {formatDate(t.date)}
              </td>
              <td className="max-w-[16rem] px-3 py-3">
                <p className="truncate font-medium text-slate-900 dark:text-white">
                  {t.description}
                </p>
              </td>
              <td className="px-3 py-3">
                {record ? (
                  <span className="text-slate-700 dark:text-slate-200">
                    ↳ {record.description}
                    <span className="ml-2 text-xs text-slate-400">
                      {categoryById(record.categoryId)?.name}
                    </span>
                  </span>
                ) : (
                  <Pill tone="slate">Unmapped</Pill>
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-3 tabular-nums text-slate-900 dark:text-white">
                {inr(amount)}
              </td>
            </tr>
          );
        })}
      </Table>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Income {inr(totalIncome)} · Expenses {inr(totalExpenses)} · Net{" "}
        {inr(totalIncome - totalExpenses)}
      </p>
    </Card>
  );
}

function PartyReport() {
  const totals = new Map<string, number>();
  for (const record of demoRecords) {
    if (record.type !== "EXPENSE") continue;
    totals.set(
      record.partyId,
      (totals.get(record.partyId) ?? 0) + record.amount,
    );
  }

  const rows = [...totals.entries()]
    .map(([partyId, total]) => ({ party: partyById(partyId), total }))
    .sort((a, b) => b.total - a.total);

  return (
    <Card title="Payments by party">
      <Table headers={["Party", "Type", "Total paid"]}>
        {rows.map(({ party, total }) => (
          <tr key={party?.id}>
            <td className="px-3 py-3 font-medium text-slate-900 dark:text-white">
              {party?.name}
            </td>
            <td className="px-3 py-3">
              <Pill tone="slate">
                {party?.type === "VENDOR" ? "Vendor" : "Employee"}
              </Pill>
            </td>
            <td className="px-3 py-3 tabular-nums text-slate-700 dark:text-slate-200">
              {inr(total)}
            </td>
          </tr>
        ))}
      </Table>
    </Card>
  );
}
