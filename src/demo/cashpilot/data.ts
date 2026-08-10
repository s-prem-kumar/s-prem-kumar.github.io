/**
 * ============================================================================
 * CashPilot demo — synthetic dataset
 * ============================================================================
 *
 * EVERY VALUE IN THIS FILE IS INVENTED. There is no real person, no real
 * account, no real balance and no real transaction here, and there must never
 * be. This file is committed to a public repository and served to anyone who
 * opens the demo.
 *
 * The demo is a static, client-side replica of CashPilot: no API, no database,
 * no secrets. It exists so a visitor can see how the real application works
 * without anyone having to host a finance app on public infrastructure.
 *
 * The numbers below were chosen to look like a plausible three months of an
 * Indian salaried account — enough rows that the dashboard and reports have
 * something to say, and a spread of categories so the charts aren't flat.
 */

export interface DemoCategory {
  id: string;
  name: string;
  parent: string;
}

export interface DemoParty {
  id: string;
  name: string;
  type: "VENDOR" | "EMPLOYEE";
  phone?: string;
}

/** A row extracted from a bank statement PDF. */
export interface DemoBankTransaction {
  id: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  description: string;
  referenceNumber: string;
  /** Exactly one of these is non-zero, as printed on a statement. */
  withdrawal: number;
  deposit: number;
  /** Running balance after this row. */
  balance: number;
  statementId: string;
}

/** A record the user keeps by hand, which a bank row can be mapped onto. */
export interface DemoRecord {
  id: string;
  type: "INCOME" | "EXPENSE";
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  partyId: string;
}

export interface DemoStatement {
  id: string;
  bank: string;
  fileName: string;
  period: string;
  uploadedAt: string;
  status: "PROCESSED";
  rowCount: number;
}

/* -------------------------------------------------------------------------- */
/* Account                                                                     */
/* -------------------------------------------------------------------------- */

export const demoUser = {
  fullName: "Demo User",
  email: "cashpilot@gmail.com",
  mobileNumber: "+91 90000 00000",
  bank: "HDFC Demo Account",
  accountNumber: "XXXXXXXX4821",
};

/* -------------------------------------------------------------------------- */
/* Masters                                                                     */
/* -------------------------------------------------------------------------- */

export const demoParentCategories = [
  { id: "pc-1", name: "Income" },
  { id: "pc-2", name: "Housing" },
  { id: "pc-3", name: "Living" },
  { id: "pc-4", name: "Utilities" },
  { id: "pc-5", name: "Lifestyle" },
  { id: "pc-6", name: "Transport" },
];

export const demoCategories: DemoCategory[] = [
  { id: "c-1", name: "Salary", parent: "Income" },
  { id: "c-2", name: "Freelance", parent: "Income" },
  { id: "c-3", name: "Rent", parent: "Housing" },
  { id: "c-4", name: "Maintenance", parent: "Housing" },
  { id: "c-5", name: "Groceries", parent: "Living" },
  { id: "c-6", name: "Food & Dining", parent: "Living" },
  { id: "c-7", name: "Electricity", parent: "Utilities" },
  { id: "c-8", name: "Internet", parent: "Utilities" },
  { id: "c-9", name: "Mobile", parent: "Utilities" },
  { id: "c-10", name: "Shopping", parent: "Lifestyle" },
  { id: "c-11", name: "Subscriptions", parent: "Lifestyle" },
  { id: "c-12", name: "Fuel", parent: "Transport" },
  { id: "c-13", name: "Cab & Travel", parent: "Transport" },
];

export const demoParties: DemoParty[] = [
  { id: "p-1", name: "Northwind Analytics", type: "EMPLOYEE", phone: "+91 90000 11111" },
  { id: "p-2", name: "Sunrise Apartments", type: "VENDOR", phone: "+91 90000 22222" },
  { id: "p-3", name: "GreenCart Supermarket", type: "VENDOR" },
  { id: "p-4", name: "State Power Board", type: "VENDOR" },
  { id: "p-5", name: "FibreNet Broadband", type: "VENDOR" },
  { id: "p-6", name: "Meridian Retail", type: "VENDOR" },
  { id: "p-7", name: "CityCabs", type: "VENDOR" },
  { id: "p-8", name: "Orbit Fuels", type: "VENDOR" },
];

/* -------------------------------------------------------------------------- */
/* Statements                                                                  */
/* -------------------------------------------------------------------------- */

export const demoStatements: DemoStatement[] = [
  {
    id: "st-1",
    bank: "HDFC Bank",
    fileName: "hdfc-statement-jun-2026.pdf",
    period: "1 Jun 2026 – 30 Jun 2026",
    uploadedAt: "2026-07-02",
    status: "PROCESSED",
    rowCount: 11,
  },
  {
    id: "st-2",
    bank: "HDFC Bank",
    fileName: "hdfc-statement-jul-2026.pdf",
    period: "1 Jul 2026 – 31 Jul 2026",
    uploadedAt: "2026-08-01",
    status: "PROCESSED",
    rowCount: 12,
  },
];

/* -------------------------------------------------------------------------- */
/* Extracted bank transactions                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Written in printed statement order, oldest first, with a running balance
 * that reconciles — the real parser relies on that reconciliation to classify
 * debits and credits, so the demo data respects it too.
 */
export const demoBankTransactions: DemoBankTransaction[] = [
  // ---- June ----
  { id: "bt-1", date: "2026-06-01", description: "NEFT CR NORTHWIND ANALYTICS SALARY JUN", referenceNumber: "N226153048811", withdrawal: 0, deposit: 62000, balance: 74210, statementId: "st-1" },
  { id: "bt-2", date: "2026-06-02", description: "ACH DR SUNRISE APARTMENTS RENT", referenceNumber: "ACH2261530221", withdrawal: 18500, deposit: 0, balance: 55710, statementId: "st-1" },
  { id: "bt-3", date: "2026-06-04", description: "UPI/GREENCART SUPERMARKET/4471", referenceNumber: "UPI615304471", withdrawal: 3420, deposit: 0, balance: 52290, statementId: "st-1" },
  { id: "bt-4", date: "2026-06-07", description: "POS/153618/MERIDIAN RETAIL 537706698493", referenceNumber: "537706698493", withdrawal: 4150, deposit: 0, balance: 48140, statementId: "st-1" },
  { id: "bt-5", date: "2026-06-10", description: "BILLPAY STATE POWER BOARD", referenceNumber: "BP2261531007", withdrawal: 1840, deposit: 0, balance: 46300, statementId: "st-1" },
  { id: "bt-6", date: "2026-06-12", description: "UPI/FIBRENET BROADBAND/9921", referenceNumber: "UPI615309921", withdrawal: 999, deposit: 0, balance: 45301, statementId: "st-1" },
  { id: "bt-7", date: "2026-06-15", description: "UPI/ORBIT FUELS/3310", referenceNumber: "UPI615303310", withdrawal: 2600, deposit: 0, balance: 42701, statementId: "st-1" },
  { id: "bt-8", date: "2026-06-18", description: "NEFT CR ATLAS STUDIO CONSULTING", referenceNumber: "N226153077412", withdrawal: 0, deposit: 15000, balance: 57701, statementId: "st-1" },
  { id: "bt-9", date: "2026-06-21", description: "UPI/CITYCABS/7745", referenceNumber: "UPI615307745", withdrawal: 1260, deposit: 0, balance: 56441, statementId: "st-1" },
  { id: "bt-10", date: "2026-06-24", description: "UPI/GREENCART SUPERMARKET/5108", referenceNumber: "UPI615305108", withdrawal: 2870, deposit: 0, balance: 53571, statementId: "st-1" },
  { id: "bt-11", date: "2026-06-28", description: "CASH DEPOSIT BRANCH COUNTER", referenceNumber: "", withdrawal: 0, deposit: 5000, balance: 58571, statementId: "st-1" },

  // ---- July ----
  { id: "bt-12", date: "2026-07-01", description: "NEFT CR NORTHWIND ANALYTICS SALARY JUL", referenceNumber: "N226183048902", withdrawal: 0, deposit: 62000, balance: 120571, statementId: "st-2" },
  { id: "bt-13", date: "2026-07-02", description: "ACH DR SUNRISE APARTMENTS RENT", referenceNumber: "ACH2261830224", withdrawal: 18500, deposit: 0, balance: 102071, statementId: "st-2" },
  { id: "bt-14", date: "2026-07-03", description: "ACH DR SUNRISE APARTMENTS MAINTENANCE", referenceNumber: "ACH2261830225", withdrawal: 2400, deposit: 0, balance: 99671, statementId: "st-2" },
  { id: "bt-15", date: "2026-07-05", description: "UPI/GREENCART SUPERMARKET/6612", referenceNumber: "UPI618306612", withdrawal: 3980, deposit: 0, balance: 95691, statementId: "st-2" },
  { id: "bt-16", date: "2026-07-08", description: "POS/153618/MERIDIAN RETAIL 537706701244", referenceNumber: "537706701244", withdrawal: 6250, deposit: 0, balance: 89441, statementId: "st-2" },
  { id: "bt-17", date: "2026-07-11", description: "BILLPAY STATE POWER BOARD", referenceNumber: "BP2261831103", withdrawal: 2120, deposit: 0, balance: 87321, statementId: "st-2" },
  { id: "bt-18", date: "2026-07-12", description: "UPI/FIBRENET BROADBAND/1180", referenceNumber: "UPI618301180", withdrawal: 999, deposit: 0, balance: 86322, statementId: "st-2" },
  { id: "bt-19", date: "2026-07-14", description: "UPI/STREAMBOX SUBSCRIPTION/2204", referenceNumber: "UPI618302204", withdrawal: 649, deposit: 0, balance: 85673, statementId: "st-2" },
  { id: "bt-20", date: "2026-07-17", description: "UPI/ORBIT FUELS/4402", referenceNumber: "UPI618304402", withdrawal: 3100, deposit: 0, balance: 82573, statementId: "st-2" },
  { id: "bt-21", date: "2026-07-20", description: "UPI/CITYCABS/8890", referenceNumber: "UPI618308890", withdrawal: 1540, deposit: 0, balance: 81033, statementId: "st-2" },
  { id: "bt-22", date: "2026-07-25", description: "UPI/GREENCART SUPERMARKET/7331", referenceNumber: "UPI618307331", withdrawal: 3260, deposit: 0, balance: 77773, statementId: "st-2" },
  { id: "bt-23", date: "2026-07-29", description: "NEFT CR ATLAS STUDIO CONSULTING", referenceNumber: "N226183077901", withdrawal: 0, deposit: 18000, balance: 95773, statementId: "st-2" },
];

/* -------------------------------------------------------------------------- */
/* Manual income / expense records                                             */
/* -------------------------------------------------------------------------- */

/**
 * These are the records a bank row gets mapped *onto*. A few are deliberately
 * left unmapped in `initialMappings` so the demo has something to do — the map
 * and unmap actions are the one part of CashPilot a visitor can actually drive.
 */
export const demoRecords: DemoRecord[] = [
  { id: "r-1", type: "INCOME", description: "June salary", amount: 62000, date: "2026-06-01", categoryId: "c-1", partyId: "p-1" },
  { id: "r-2", type: "EXPENSE", description: "June rent", amount: 18500, date: "2026-06-02", categoryId: "c-3", partyId: "p-2" },
  { id: "r-3", type: "EXPENSE", description: "Weekly groceries", amount: 3420, date: "2026-06-04", categoryId: "c-5", partyId: "p-3" },
  { id: "r-4", type: "EXPENSE", description: "Monsoon clothing", amount: 4150, date: "2026-06-07", categoryId: "c-10", partyId: "p-6" },
  { id: "r-5", type: "EXPENSE", description: "June electricity bill", amount: 1840, date: "2026-06-10", categoryId: "c-7", partyId: "p-4" },
  { id: "r-6", type: "EXPENSE", description: "June broadband", amount: 999, date: "2026-06-12", categoryId: "c-8", partyId: "p-5" },
  { id: "r-7", type: "EXPENSE", description: "Fuel top-up", amount: 2600, date: "2026-06-15", categoryId: "c-12", partyId: "p-8" },
  { id: "r-8", type: "INCOME", description: "Consulting — Atlas Studio", amount: 15000, date: "2026-06-18", categoryId: "c-2", partyId: "p-1" },
  { id: "r-9", type: "EXPENSE", description: "Airport cab", amount: 1260, date: "2026-06-21", categoryId: "c-13", partyId: "p-7" },
  { id: "r-10", type: "EXPENSE", description: "Month-end groceries", amount: 2870, date: "2026-06-24", categoryId: "c-5", partyId: "p-3" },
  { id: "r-11", type: "INCOME", description: "July salary", amount: 62000, date: "2026-07-01", categoryId: "c-1", partyId: "p-1" },
  { id: "r-12", type: "EXPENSE", description: "July rent", amount: 18500, date: "2026-07-02", categoryId: "c-3", partyId: "p-2" },
  { id: "r-13", type: "EXPENSE", description: "Society maintenance", amount: 2400, date: "2026-07-03", categoryId: "c-4", partyId: "p-2" },
  { id: "r-14", type: "EXPENSE", description: "Weekly groceries", amount: 3980, date: "2026-07-05", categoryId: "c-5", partyId: "p-3" },
  { id: "r-15", type: "EXPENSE", description: "Home appliance", amount: 6250, date: "2026-07-08", categoryId: "c-10", partyId: "p-6" },
  { id: "r-16", type: "EXPENSE", description: "July electricity bill", amount: 2120, date: "2026-07-11", categoryId: "c-7", partyId: "p-4" },
  { id: "r-17", type: "EXPENSE", description: "July broadband", amount: 999, date: "2026-07-12", categoryId: "c-8", partyId: "p-5" },
  { id: "r-18", type: "EXPENSE", description: "Streaming subscription", amount: 649, date: "2026-07-14", categoryId: "c-11", partyId: "p-6" },
  { id: "r-19", type: "EXPENSE", description: "Fuel top-up", amount: 3100, date: "2026-07-17", categoryId: "c-12", partyId: "p-8" },
  { id: "r-20", type: "EXPENSE", description: "Office commute", amount: 1540, date: "2026-07-20", categoryId: "c-13", partyId: "p-7" },
  { id: "r-21", type: "EXPENSE", description: "Month-end groceries", amount: 3260, date: "2026-07-25", categoryId: "c-5", partyId: "p-3" },
  { id: "r-22", type: "INCOME", description: "Consulting — Atlas Studio", amount: 18000, date: "2026-07-29", categoryId: "c-2", partyId: "p-1" },
];

/**
 * The mappings the demo starts with — bank transaction id → manual record id.
 *
 * Six rows are left unmapped on purpose (bt-15, bt-16, bt-19, bt-20, bt-21,
 * bt-22) so there is real work for a visitor to do. `bt-11`, the cash deposit,
 * has no reference number and no matching record — it's the case the real
 * parser has to fall back to fingerprinting for.
 */
export const initialMappings: Record<string, string> = {
  "bt-1": "r-1",
  "bt-2": "r-2",
  "bt-3": "r-3",
  "bt-4": "r-4",
  "bt-5": "r-5",
  "bt-6": "r-6",
  "bt-7": "r-7",
  "bt-8": "r-8",
  "bt-9": "r-9",
  "bt-10": "r-10",
  "bt-12": "r-11",
  "bt-13": "r-12",
  "bt-14": "r-13",
  "bt-17": "r-16",
  "bt-18": "r-17",
  "bt-23": "r-22",
};

/* -------------------------------------------------------------------------- */
/* Derived helpers                                                             */
/* -------------------------------------------------------------------------- */

/** Closing balance — the last row of the newest statement, never a sum. */
export const currentBalance =
  demoBankTransactions[demoBankTransactions.length - 1].balance;

export const totalIncome = demoBankTransactions.reduce(
  (sum, t) => sum + t.deposit,
  0,
);

export const totalExpenses = demoBankTransactions.reduce(
  (sum, t) => sum + t.withdrawal,
  0,
);

export function categoryById(id: string) {
  return demoCategories.find((c) => c.id === id);
}

export function recordById(id: string) {
  return demoRecords.find((r) => r.id === id);
}

export function partyById(id: string) {
  return demoParties.find((p) => p.id === id);
}

/** Formats a number as Indian rupees, e.g. 62000 → "₹62,000". */
export function inr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

/** "2026-06-01" → "1 Jun 2026". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  return `${d} ${months[m - 1]} ${y}`;
}

/** Spend per parent category, largest first — drives the dashboard donut. */
export function spendByParentCategory(): { name: string; total: number }[] {
  const totals = new Map<string, number>();

  for (const record of demoRecords) {
    if (record.type !== "EXPENSE") continue;
    const parent = categoryById(record.categoryId)?.parent ?? "Other";
    totals.set(parent, (totals.get(parent) ?? 0) + record.amount);
  }

  return [...totals.entries()]
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total);
}

/** Income and expense totals per month, oldest first — drives the bar chart. */
export function monthlyTotals(): {
  month: string;
  income: number;
  expense: number;
}[] {
  const months = new Map<string, { income: number; expense: number }>();

  for (const t of demoBankTransactions) {
    const key = t.date.slice(0, 7);
    const entry = months.get(key) ?? { income: 0, expense: 0 };
    entry.income += t.deposit;
    entry.expense += t.withdrawal;
    months.set(key, entry);
  }

  const names = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  return [...months.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => ({
      month: names[Number(key.slice(5, 7)) - 1],
      ...value,
    }));
}
