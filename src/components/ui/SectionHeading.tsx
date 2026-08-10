import type { ReactNode } from "react";

/**
 * Consistent heading for every homepage section: a small monospace eyebrow, the
 * title, and an optional one-line description.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  /** Anchor id, so the navbar can link to `#skills`, `#experience`, etc. */
  id?: string;
}) {
  return (
    <div className="mb-10">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
