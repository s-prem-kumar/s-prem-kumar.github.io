import Image from "next/image";
import Link from "next/link";
import { hasLiveDemo } from "@/data/projects";
import type { Project } from "@/types/portfolio";
import { Chip, StatusBadge } from "./ui/Badge";
import { ArrowUpRightIcon, BookIcon, GitHubIcon, RocketIcon } from "./ui/Icons";

/**
 * The project card, generated entirely from a `Project` object.
 *
 * Adding a project to `src/data/projects.ts` is all it takes for a card to
 * appear — this component never needs editing.
 *
 * The three actions follow the rules in the data file:
 *   🚀 Try Demo    only when `demoAvailable === true` AND `liveDemo` is set
 *   💻 GitHub      only when `github` is set
 *   📖 Case Study  always, because it's an internal page that always exists
 */
export function ProjectCard({ project }: { project: Project }) {
  const showDemo = hasLiveDemo(project);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-base bg-surface transition-colors hover:border-border-strong">
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-video overflow-hidden border-b border-border-base bg-background"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderThumbnail project={project} />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </Link>
          </h3>
          <StatusBadge status={project.status} />
        </div>

        {(project.category || project.date) && (
          <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
            {[project.category, project.date].filter(Boolean).join(" · ")}
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>

        {/* Actions pinned to the bottom so cards in a row line up. */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {showDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              <RocketIcon className="h-3.5 w-3.5" />
              Try Demo
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-base bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-border-strong"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border-base bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-border-strong"
          >
            <BookIcon className="h-3.5 w-3.5" />
            Case Study
            <ArrowUpRightIcon className="h-3 w-3 text-subtle" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * Stand-in thumbnail for projects that don't have a screenshot yet.
 *
 * Drop a real image in `public/images/projects/` and set `image` on the
 * project to replace it — nothing else needs to change.
 */
function PlaceholderThumbnail({ project }: { project: Project }) {
  return (
    <div className="bg-dot-grid flex h-full w-full items-center justify-center">
      <span className="rounded-lg border border-border-base bg-surface px-3 py-1.5 font-mono text-xs text-subtle">
        {project.category ?? "Project"}
      </span>
    </div>
  );
}
