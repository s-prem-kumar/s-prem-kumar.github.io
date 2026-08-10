"use client";

import {
  demoCategories,
  demoParentCategories,
  demoParties,
  demoRecords,
} from "../data";
import { Card, DisabledAction, Pill, Table } from "./ui";

/**
 * Masters — the reusable reference data (parent categories, categories,
 * vendors, employees) that income and expense records point at.
 *
 * Read-only here. In the real application these support search, sort,
 * pagination, soft delete and multi-select delete.
 */
export function Masters() {
  const usage = new Map<string, number>();
  for (const record of demoRecords) {
    usage.set(record.categoryId, (usage.get(record.categoryId) ?? 0) + 1);
  }

  return (
    <div className="space-y-5">
      <Card
        title="Categories"
        action={
          <div className="flex gap-2">
            <DisabledAction label="Add category">Add</DisabledAction>
            <DisabledAction label="Delete">Delete</DisabledAction>
          </div>
        }
      >
        <Table headers={["Category", "Parent category", "Records using it"]}>
          {demoCategories.map((category) => (
            <tr
              key={category.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
            >
              <td className="px-3 py-3 font-medium text-slate-900 dark:text-white">
                {category.name}
              </td>
              <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                {category.parent}
              </td>
              <td className="px-3 py-3 tabular-nums text-slate-500 dark:text-slate-400">
                {usage.get(category.id) ?? 0}
              </td>
            </tr>
          ))}
        </Table>
        <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Records reference a category by id, never by name — renaming
          &ldquo;Food&rdquo; to &ldquo;Food &amp; Dining&rdquo; must not
          re-bucket the expenses filed under it.
        </p>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card
          title="Parent categories"
          action={<DisabledAction label="Add parent category">Add</DisabledAction>}
        >
          <ul className="space-y-1.5">
            {demoParentCategories.map((parent) => (
              <li
                key={parent.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-800"
              >
                <span className="font-medium text-slate-900 dark:text-white">
                  {parent.name}
                </span>
                <span className="text-xs text-slate-400">
                  {
                    demoCategories.filter((c) => c.parent === parent.name)
                      .length
                  }{" "}
                  categories
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Vendors & employees"
          action={<DisabledAction label="Add party">Add</DisabledAction>}
        >
          <ul className="space-y-1.5">
            {demoParties.map((party) => (
              <li
                key={party.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-800"
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium text-slate-900 dark:text-white">
                    {party.name}
                  </span>
                  {party.phone && (
                    <span className="block text-xs text-slate-400">
                      {party.phone}
                    </span>
                  )}
                </span>
                <Pill tone={party.type === "VENDOR" ? "slate" : "amber"}>
                  {party.type === "VENDOR" ? "Vendor" : "Employee"}
                </Pill>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
