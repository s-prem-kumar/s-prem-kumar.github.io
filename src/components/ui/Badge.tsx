import type { ReactNode } from "react";
import type { ProjectStatus } from "@/types/portfolio";

/** Small pill used for technology chips. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border-base bg-surface px-2 py-0.5 font-mono text-[0.7rem] tracking-tight text-muted">
      {children}
    </span>
  );
}

/**
 * Colour-coded project status. Each status gets its own treatment so a visitor
 * can tell at a glance which projects are actually deployed.
 */
const STATUS_STYLES: Record<ProjectStatus, string> = {
  Live: "border-accent-border bg-accent-soft text-accent",
  Completed: "border-border-base bg-surface text-muted",
  "In Development": "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Coming Soon": "border-border-base bg-surface text-subtle",
  Archived: "border-border-base bg-surface text-subtle",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status === "Live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      )}
      {status}
    </span>
  );
}
