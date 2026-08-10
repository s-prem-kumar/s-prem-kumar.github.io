import type { DemoView } from "./AppShell";

/**
 * Developer notes shown per screen inside the demo.
 *
 * The demo shows *what* CashPilot does; these notes explain *why it's built
 * that way*, which is the part a screenshot can never carry and the part an
 * interviewer actually asks about. Each note describes the real application,
 * not the replica — where the two differ, the note says so.
 *
 * All of this is editable in one place. Adding a screen means adding an entry
 * here; the panel picks it up automatically.
 */

export interface PageNote {
  /** What this screen is for, from the user's point of view. */
  purpose: string;
  /** How it works under the hood in the real application. */
  how: string;
  /** The design decision worth defending, and what it cost to get wrong. */
  why: string;
  /** Where the demo departs from the real product. Omit when it doesn't. */
  inDemo?: string;
}

export const PAGE_NOTES: Record<DemoView, PageNote> = {
  dashboard: {
    purpose:
      "One answer to “where do I stand” — closing balance, total income and expenses, and how much of the bank's record has been reconciled against your own.",
    how: "Every figure is computed from transactions extracted from statement PDFs, not from records typed by hand, so the dashboard reflects what the bank actually reported. The charts are hand-drawn SVG — a donut built from stroke-dasharray offsets and a grouped bar chart — with no charting library involved.",
    why: "Current Balance is read from the closing row of the newest statement rather than summed from transactions. Summing looks equivalent and isn't: it drifts the moment a row is missed or double-counted, and it hides the very bug it should expose. That distinction is what made an early double-import invisible — income and expenses doubled while the balance still read correctly.",
  },

  transactions: {
    purpose:
      "Reconcile the bank's version of events against yours. Each row here was extracted from a statement; mapping links it to the income or expense record you keep by hand.",
    how: "A mapping is one-to-one and direction-aware — a credit may only map to an income record, a debit only to an expense — and a record already claimed by another transaction is excluded from the candidate list. Exact amount matches are surfaced first because that's almost always the row you want.",
    why: "The bank's row and your record stay as separate rows joined by a mapping table, rather than being merged into one. Merging is simpler until you need to correct one side: with separate records you can fix your description or category without touching what the bank reported, and unmapping is non-destructive.",
    inDemo:
      "Map and unmap are fully functional here and enforce the same rules. State lives in browser memory, so a refresh restores the original mappings.",
  },

  records: {
    purpose:
      "What you say happened — income and expenses you record yourself, independent of any statement.",
    how: "Each record points at a Category by id, and at a Vendor or Employee as the counterparty. Categories are master data, so the same category is reused across every record that references it.",
    why: "Records reference a category by id, never by name. Storing the name on the record meant that renaming “Food” to “Food & Dining” silently orphaned or re-bucketed every expense filed under it. With an id, the display name is free to change at any time and history stays intact.",
    inDemo:
      "Read-only. Creating or deleting a record would change what the dashboard and reports add up to, and a shared demo has nowhere to isolate that per visitor.",
  },

  statements: {
    purpose:
      "The source of every extracted transaction — the PDFs your bank already sends you, turned into structured rows.",
    how: "pdfjs-dist pulls out embedded text; if the statement is a scan with no text layer, an isolated child process rasterises the page and tesseract.js runs OCR over it. A registry of rule-based parsers identifies which of ten Indian banks issued the statement from its header, then extracts rows and classifies each as debit or credit from the change in running balance.",
    why: "Three decisions carry this screen. The parser is rule-based rather than an LLM, so it's deterministic, free to run and every row can be explained. Each upload is identified by the SHA-256 of its bytes, so the same file can't be ingested twice. And OCR runs in a child process because pdfjs's canvas renderer can segfault on scanned images — isolating it means a bad PDF marks one statement for review instead of taking the whole API down.",
    inDemo:
      "Upload is disabled — the extraction pipeline is server-side and needs a running backend. The steps listed on this screen describe what would happen to a real PDF.",
  },

  reports: {
    purpose:
      "Answer specific questions the dashboard doesn't: where the money went by category, which transactions are still unreconciled, who was paid the most.",
    how: "Reports read the same mapped data the dashboard does, with filtering, sorting and pagination applied server-side. Excel and PDF export are generated in the browser with SheetJS and jsPDF, so no file ever round-trips through the server.",
    why: "The mapped-transactions report nests your record beneath the bank's row rather than showing them side by side. It's the one view where you can see the link itself — which row the bank reported, and which of your records you decided it corresponds to.",
    inDemo:
      "Three of the real application's seven reports are reproduced. Export is disabled: bundling two document libraries into a portfolio for a demo isn't a trade worth making.",
  },

  masters: {
    purpose:
      "The reusable reference data everything else points at — parent categories, categories, vendors and employees.",
    how: "All master data is per-user and soft-deleted: a deleted row disappears from lists while its name becomes reusable, and anything historically referencing it keeps resolving.",
    why: "A category is only ever soft-deleted, and the foreign key from Category to ParentCategory is Restrict rather than Cascade. If a hard delete ever reaches that constraint, something has gone wrong upstream and the database should refuse loudly — rather than quietly taking a parent's children, and every record linked to them, along with it.",
    inDemo:
      "Read-only. The real application adds search, sorting, pagination and multi-select delete here.",
  },
};

/** Shown on the login screen, which sits outside the app shell. */
export const LOGIN_NOTE: PageNote = {
  purpose:
    "The demo starts where the product starts. Landing straight in the dashboard would skip the screen most people recognise, and hide the fact that CashPilot is an authenticated application at all.",
  how: "The real application issues a JWT carried in an HttpOnly cookie, hashes passwords with bcrypt, and verifies new accounts by email OTP. Because the token lives in a cookie the browser manages, client-side JavaScript never touches it.",
  why: "An HttpOnly cookie over localStorage means a cross-site scripting bug can't read the session token. The token also embeds a version number that's bumped on password change and sign-out-everywhere, so old tokens stop validating immediately instead of staying valid until they expire.",
  inDemo:
    "There is no authentication here at all — the form compares two strings in your browser. Nothing is protected because there is nothing real behind it.",
};
