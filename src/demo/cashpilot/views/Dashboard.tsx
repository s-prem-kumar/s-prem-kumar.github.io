"use client";

import {
  currentBalance,
  demoBankTransactions,
  formatDate,
  inr,
  monthlyTotals,
  spendByParentCategory,
  totalExpenses,
  totalIncome,
} from "../data";
import { useDemo } from "../store";
import { Card } from "./ui";

/**
 * Dashboard — stat cards, two hand-rolled SVG charts and recent activity.
 *
 * Charts are drawn with plain SVG rather than a charting library, mirroring
 * how the real CashPilot does it and keeping the portfolio's dependency count
 * at zero.
 */
export function Dashboard() {
  const { mappings } = useDemo();
  const byCategory = spendByParentCategory();
  const months = monthlyTotals();

  const mappedCount = Object.keys(mappings).length;
  const total = demoBankTransactions.length;
  const unmapped = total - mappedCount;

  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Current balance"
          value={inr(currentBalance)}
          hint="Closing balance from the latest statement"
          tone="emerald"
        />
        <Stat label="Total income" value={inr(totalIncome)} hint="Across 2 statements" tone="sky" />
        <Stat
          label="Total expenses"
          value={inr(totalExpenses)}
          hint="Across 2 statements"
          tone="rose"
        />
        <Stat
          label="Mapped transactions"
          value={`${mappedCount} / ${total}`}
          hint={
            unmapped > 0
              ? `${unmapped} still to map`
              : "Every transaction is mapped"
          }
          tone="amber"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Donut — spend by parent category */}
        <Card title="Spend by category">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <Donut data={byCategory} />
            <ul className="flex-1 space-y-2">
              {byCategory.map((slice, i) => (
                <li
                  key={slice.name}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: SLICE_COLORS[i % SLICE_COLORS.length] }}
                    />
                    {slice.name}
                  </span>
                  <span className="font-medium tabular-nums text-slate-900 dark:text-white">
                    {inr(slice.total)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Bars — income vs expense by month */}
        <Card title="Income vs expenses">
          <Bars data={months} />
          <div className="mt-4 flex items-center justify-center gap-5 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-600" /> Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-rose-400" /> Expenses
            </span>
          </div>
        </Card>
      </div>

      {/* Insights — rule-based, exactly as the real app computes them. */}
      <Card title="Insights">
        <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
          <li className="flex gap-2.5">
            <span className="text-emerald-600">●</span>
            Your largest expense category is{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              {byCategory[0]?.name}
            </strong>{" "}
            at {inr(byCategory[0]?.total ?? 0)}.
          </li>
          <li className="flex gap-2.5">
            <span className="text-emerald-600">●</span>
            Income exceeded expenses by{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              {inr(totalIncome - totalExpenses)}
            </strong>{" "}
            over the period shown.
          </li>
          {unmapped > 0 && (
            <li className="flex gap-2.5">
              <span className="text-amber-500">●</span>
              {unmapped} bank transaction{unmapped === 1 ? "" : "s"}{" "}
              {unmapped === 1 ? "is" : "are"} not yet mapped to a record — open{" "}
              <strong className="font-semibold text-slate-900 dark:text-white">
                Transactions
              </strong>{" "}
              to map them.
            </li>
          )}
        </ul>
      </Card>

      {/* Recent activity */}
      <Card title="Recent activity">
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {[...demoBankTransactions]
            .reverse()
            .slice(0, 6)
            .map((t) => (
              <li key={t.id} className="flex items-center gap-4 py-2.5">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    t.deposit > 0
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                  }`}
                >
                  {t.deposit > 0 ? "↓" : "↑"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                    {t.description}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(t.date)}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-sm font-semibold tabular-nums ${
                    t.deposit > 0
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {t.deposit > 0 ? "+" : "−"}
                  {inr(t.deposit > 0 ? t.deposit : t.withdrawal)}
                </span>
              </li>
            ))}
        </ul>
      </Card>
    </div>
  );
}

const TONES = {
  emerald: "text-emerald-700 dark:text-emerald-400",
  sky: "text-sky-700 dark:text-sky-400",
  rose: "text-rose-700 dark:text-rose-400",
  amber: "text-amber-600 dark:text-amber-400",
};

function Stat({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: keyof typeof TONES;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className={`mt-2 text-2xl font-bold tabular-nums ${TONES[tone]}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{hint}</p>
    </div>
  );
}

const SLICE_COLORS = [
  "#047857",
  "#0369a1",
  "#b45309",
  "#9f1239",
  "#4338ca",
  "#0f766e",
];

/** Donut chart drawn with stroke-dasharray on concentric circles. */
function Donut({ data }: { data: { name: string; total: number }[] }) {
  const total = data.reduce((sum, d) => sum + d.total, 0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  // Arc length per slice, then each slice's starting offset as the prefix sum
  // of the ones before it. Written without a running accumulator so nothing is
  // reassigned during render.
  const dashes = data.map((slice) =>
    total === 0 ? 0 : (slice.total / total) * circumference,
  );
  const starts = dashes.map((_, i) =>
    dashes.slice(0, i).reduce((sum, d) => sum + d, 0),
  );

  return (
    <svg viewBox="0 0 140 140" className="h-40 w-40 shrink-0 -rotate-90">
      {data.map((slice, i) => (
        <circle
          key={slice.name}
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={SLICE_COLORS[i % SLICE_COLORS.length]}
          strokeWidth="18"
          strokeDasharray={`${dashes[i]} ${circumference - dashes[i]}`}
          strokeDashoffset={-starts[i]}
        >
          <title>{`${slice.name}: ${inr(slice.total)}`}</title>
        </circle>
      ))}
    </svg>
  );
}

/** Grouped bar chart, two series per month. */
function Bars({
  data,
}: {
  data: { month: string; income: number; expense: number }[];
}) {
  const max = Math.max(...data.flatMap((d) => [d.income, d.expense]), 1);

  return (
    <div className="flex h-44 items-end justify-around gap-6 px-2">
      {data.map((d) => (
        <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-36 w-full items-end justify-center gap-1.5">
            <div
              className="w-6 rounded-t bg-emerald-600 transition-all"
              style={{ height: `${(d.income / max) * 100}%` }}
              title={`Income: ${inr(d.income)}`}
            />
            <div
              className="w-6 rounded-t bg-rose-400 transition-all"
              style={{ height: `${(d.expense / max) * 100}%` }}
              title={`Expenses: ${inr(d.expense)}`}
            />
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {d.month}
          </span>
        </div>
      ))}
    </div>
  );
}
