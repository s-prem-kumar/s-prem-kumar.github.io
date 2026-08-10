import type { Metadata } from "next";
import { CashPilotDemo } from "@/demo/cashpilot/CashPilotDemo";

/**
 * /demo/cashpilot — a static, client-side replica of CashPilot.
 *
 * There is no backend, no database and no real data. The whole thing is a
 * prerendered page plus React state, which means it deploys with the portfolio
 * on the same free Vercel project, never sleeps, has no cold start, and costs
 * nothing to keep running. It also can't leak anything, because there is
 * nothing behind it to leak.
 *
 * Search engines are told not to index it — it's a sandbox, not content, and
 * a page full of invented transactions has no business in search results.
 */
export const metadata: Metadata = {
  title: "CashPilot — Interactive Demo",
  description:
    "A read-only, in-browser demo of CashPilot: sign in with the demo account and explore the dashboard, extracted bank transactions, reports and master data.",
  robots: { index: false, follow: false },
};

export default function CashPilotDemoPage() {
  return <CashPilotDemo />;
}
