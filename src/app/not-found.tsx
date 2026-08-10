import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          That URL doesn&rsquo;t match anything here. The project you&rsquo;re
          after may have been renamed.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Back home
            <ArrowRightIcon />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border-base bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
          >
            Browse projects
          </Link>
        </div>
      </div>
    </Container>
  );
}
