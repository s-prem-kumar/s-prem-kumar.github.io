"use client";

import { useState } from "react";
import { AppShell, type DemoView } from "./AppShell";
import { LoginScreen } from "./LoginScreen";
import { DemoProvider, useDemo } from "./store";
import { Dashboard } from "./views/Dashboard";
import { Masters } from "./views/Masters";
import { Records } from "./views/Records";
import { Reports } from "./views/Reports";
import { Statements } from "./views/Statements";
import { Transactions } from "./views/Transactions";

/**
 * Root of the CashPilot demo.
 *
 * Everything below this point runs in the browser with no network calls. See
 * `data.ts` for the synthetic dataset and `store.tsx` for what a visitor is
 * allowed to change.
 */
export function CashPilotDemo() {
  return (
    <DemoProvider>
      <DemoRoot />
    </DemoProvider>
  );
}

function DemoRoot() {
  const { signedIn } = useDemo();
  const [view, setView] = useState<DemoView>("dashboard");

  if (!signedIn) return <LoginScreen />;

  return (
    <AppShell view={view} onChangeView={setView}>
      {view === "dashboard" && <Dashboard />}
      {view === "transactions" && <Transactions />}
      {view === "records" && <Records />}
      {view === "statements" && <Statements />}
      {view === "reports" && <Reports />}
      {view === "masters" && <Masters />}
    </AppShell>
  );
}
