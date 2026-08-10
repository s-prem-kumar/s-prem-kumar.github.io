"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialMappings } from "./data";

/**
 * State for the CashPilot demo.
 *
 * The demo is deliberately backend-free: there is no API, no database and no
 * session. "Signing in" sets a boolean, and mapping a transaction mutates an
 * object in memory. Nothing persists — a refresh resets everything, which is
 * exactly the reset behaviour a shared public demo needs, at zero cost and
 * with no way for one visitor to spoil it for the next.
 *
 * The credentials below are published on the portfolio and in this repository
 * on purpose. They unlock nothing: there is no account behind them, and no
 * real data anywhere in the demo.
 */

export const DEMO_EMAIL = "cashpilot@gmail.com";
export const DEMO_PASSWORD = "Demo@123";

/** What a visitor is allowed to change. Everything else is read-only. */
export type DemoAction = "map" | "unmap";

interface DemoState {
  signedIn: boolean;
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signOut: () => void;

  /** bank transaction id → manual record id. */
  mappings: Record<string, string>;
  map: (bankTransactionId: string, recordId: string) => void;
  unmap: (bankTransactionId: string) => void;
  /** Restores the mappings the demo started with. */
  reset: () => void;
  /** True once the visitor has changed anything, so we can offer a reset. */
  isDirty: boolean;

  /** Last blocked action, for the "not available in the demo" toast. */
  blockedMessage: string | null;
  blockAction: (what: string) => void;
  dismissBlocked: () => void;
}

const DemoContext = createContext<DemoState | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const [mappings, setMappings] = useState<Record<string, string>>(
    () => ({ ...initialMappings }),
  );
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);

  const signIn = useCallback((email: string, password: string) => {
    // Compared case-insensitively on the email only — this is a demo gate, not
    // authentication, and there is nothing behind it to protect.
    if (email.trim().toLowerCase() !== DEMO_EMAIL) {
      return { ok: false, error: "Use the demo email shown below." };
    }
    if (password !== DEMO_PASSWORD) {
      return { ok: false, error: "Incorrect password for the demo account." };
    }
    setSignedIn(true);
    return { ok: true };
  }, []);

  const signOut = useCallback(() => setSignedIn(false), []);

  const map = useCallback((bankTransactionId: string, recordId: string) => {
    setMappings((prev) => ({ ...prev, [bankTransactionId]: recordId }));
  }, []);

  const unmap = useCallback((bankTransactionId: string) => {
    setMappings((prev) => {
      const next = { ...prev };
      delete next[bankTransactionId];
      return next;
    });
  }, []);

  const reset = useCallback(() => setMappings({ ...initialMappings }), []);

  const blockAction = useCallback((what: string) => {
    setBlockedMessage(
      `${what} is disabled in the demo. Mapping and unmapping transactions are the actions you can try here.`,
    );
  }, []);

  const dismissBlocked = useCallback(() => setBlockedMessage(null), []);

  const isDirty = useMemo(() => {
    const keys = Object.keys(mappings);
    const initialKeys = Object.keys(initialMappings);
    if (keys.length !== initialKeys.length) return true;
    return keys.some((key) => mappings[key] !== initialMappings[key]);
  }, [mappings]);

  const value = useMemo<DemoState>(
    () => ({
      signedIn,
      signIn,
      signOut,
      mappings,
      map,
      unmap,
      reset,
      isDirty,
      blockedMessage,
      blockAction,
      dismissBlocked,
    }),
    [
      signedIn,
      signIn,
      signOut,
      mappings,
      map,
      unmap,
      reset,
      isDirty,
      blockedMessage,
      blockAction,
      dismissBlocked,
    ],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoState {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used inside <DemoProvider>");
  }
  return context;
}
