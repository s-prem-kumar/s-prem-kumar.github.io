import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { Chip, StatusBadge } from "@/components/ui/Badge";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookIcon,
  GitHubIcon,
  RocketIcon,
} from "@/components/ui/Icons";
import { QueryCheckerDemo } from "@/components/demos/QueryCheckerDemo";
import { RagPipelineDemo } from "@/components/demos/RagPipelineDemo";
import {
  getProjectBySlug,
  hasLiveDemo,
  projects,
  sortedProjects,
} from "@/data/projects";
import { projectJsonLd } from "@/lib/jsonld";
import type { InteractiveDemo, Project } from "@/types/portfolio";

/**
 * Case study page for a single project: /projects/<slug>.
 *
 * Every section below is optional in the data model and simply doesn't render
 * when the field is missing — so a half-filled project still produces a clean
 * page rather than empty headings.
 */

/** Prerenders one static page per project at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.shortDescription,
      url: `/projects/${project.slug}`,
      ...(project.image ? { images: [{ url: project.image }] } : {}),
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const showDemo = hasLiveDemo(project);
  const index = sortedProjects.findIndex((p) => p.slug === project.slug);
  const previous = sortedProjects[index - 1];
  const next = sortedProjects[index + 1];

  return (
    <Container>
      <article className="py-12 sm:py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon />
          All projects
        </Link>

        {/* ---------------------------------------------------------------- */}
        {/* Header                                                            */}
        {/* ---------------------------------------------------------------- */}
        <header className="mt-8 border-b border-border-base pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            {(project.category || project.date) && (
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
                {[project.category, project.date].filter(Boolean).join(" · ")}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-3xl text-[1.05rem] leading-relaxed text-muted">
            {project.description}
          </p>

          {/* Actions. Only links that actually exist are rendered. */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {showDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <RocketIcon />
                Try Demo
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border-base bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
              >
                <GitHubIcon className="h-4 w-4" />
                View source
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-subtle" />
              </a>
            )}

            {/* Papers, DOIs, datasets — anything else worth reading. */}
            {project.links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border-base bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
              >
                <BookIcon className="h-4 w-4" />
                {link.label}
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-subtle" />
              </a>
            ))}
          </div>

          {/* Why there's no demo — shown instead of a button that would 404. */}
          {!showDemo && project.demoNote && (
            <p className="mt-6 max-w-3xl rounded-lg border border-dashed border-border-strong bg-surface px-4 py-3 text-sm leading-relaxed text-muted">
              <span className="font-medium text-foreground">
                No live demo yet.{" "}
              </span>
              {project.demoNote}
            </p>
          )}

          {/* Demo credentials. Synthetic accounts only — see projects.ts. */}
          {showDemo && project.demoCredentials && (
            <div className="mt-6 max-w-md rounded-xl border border-accent-border bg-accent-soft p-5">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
                Demo account
              </p>
              <dl className="mt-3 space-y-1.5 font-mono text-sm">
                <div className="flex gap-2">
                  <dt className="text-muted">email</dt>
                  <dd className="text-foreground">
                    {project.demoCredentials.email}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-muted">password</dt>
                  <dd className="text-foreground">
                    {project.demoCredentials.password}
                  </dd>
                </div>
              </dl>
              {project.demoCredentials.note && (
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {project.demoCredentials.note}
                </p>
              )}
            </div>
          )}
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* Body                                                              */}
        {/* ---------------------------------------------------------------- */}
        <div className="grid gap-12 pt-10 lg:grid-cols-[1fr_15rem] lg:gap-14">
          <div className="min-w-0 space-y-12">
            {project.image && (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-border-base bg-surface">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  sizes="(min-width: 1024px) 46rem, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            )}

            {project.problem && (
              <Prose heading="Problem">
                <p>{project.problem}</p>
              </Prose>
            )}

            {project.solution && (
              <Prose heading="Solution">
                <p>{project.solution}</p>
              </Prose>
            )}

            {project.architecture && project.architecture.length > 0 && (
              <Prose heading="Architecture">
                {project.architecture.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </Prose>
            )}

            {/* Stands in for a live demo on projects that can't be hosted. */}
            {project.interactiveDemo && (
              <Section heading="Try it">
                <InteractiveDemoBlock demo={project.interactiveDemo} />
              </Section>
            )}

            {project.features.length > 0 && (
              <Section heading="Features">
                <ul className="space-y-2.5">
                  {project.features.map((feature, i) => (
                    <Bullet key={i}>{feature}</Bullet>
                  ))}
                </ul>
              </Section>
            )}

            {project.results && project.results.length > 0 && (
              <Section heading="Results">
                <dl className="grid gap-4 sm:grid-cols-2">
                  {project.results.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-border-base bg-surface p-5"
                    >
                      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
                        {metric.label}
                      </dt>
                      <dd className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                        {metric.value}
                      </dd>
                      {metric.note && (
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {metric.note}
                        </p>
                      )}
                    </div>
                  ))}
                </dl>
              </Section>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <Section heading="Challenges">
                <ul className="space-y-2.5">
                  {project.challenges.map((item, i) => (
                    <Bullet key={i}>{item}</Bullet>
                  ))}
                </ul>
              </Section>
            )}

            {project.security && project.security.length > 0 && (
              <Section heading="Security">
                <ul className="space-y-2.5">
                  {project.security.map((item, i) => (
                    <Bullet key={i}>{item}</Bullet>
                  ))}
                </ul>
              </Section>
            )}

            {project.testing && project.testing.length > 0 && (
              <Section heading="Testing">
                <ul className="space-y-2.5">
                  {project.testing.map((item, i) => (
                    <Bullet key={i}>{item}</Bullet>
                  ))}
                </ul>
              </Section>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <Section heading="What I learned">
                <ul className="space-y-2.5">
                  {project.learnings.map((item, i) => (
                    <Bullet key={i}>{item}</Bullet>
                  ))}
                </ul>
              </Section>
            )}

            {/* Additional screenshots beyond the hero image. */}
            {project.screenshots && project.screenshots.length > 0 && (
              <Section heading="Screenshots">
                <div className="grid gap-5 sm:grid-cols-2">
                  {project.screenshots.map((shot) => (
                    <figure key={shot.src}>
                      <div className="relative aspect-video overflow-hidden rounded-lg border border-border-base bg-surface">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(min-width: 640px) 22rem, 100vw"
                          className="object-cover"
                        />
                      </div>
                      {shot.caption && (
                        <figcaption className="mt-2 text-xs text-subtle">
                          {shot.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </Section>
            )}

            {/* Deployment. Free-tier caveats are stated openly rather than
                hidden — a sleeping backend is a real part of the experience. */}
            {project.deployment && <DeploymentTable project={project} />}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
                Technologies
              </h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <Chip>{tech}</Chip>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
                Status
              </h2>
              <div className="mt-3">
                <StatusBadge status={project.status} />
              </div>
            </div>

            {/* Say plainly when the work was collaborative. */}
            {project.team && (
              <div>
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
                  Team
                </h2>
                <p className="mt-3 text-sm text-muted">{project.team}</p>
                {project.role && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    <span className="text-foreground">My part: </span>
                    {project.role}
                  </p>
                )}
              </div>
            )}
          </aside>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Prev / next                                                       */}
        {/* ---------------------------------------------------------------- */}
        {(previous || next) && (
          <nav className="mt-16 grid gap-4 border-t border-border-base pt-8 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/projects/${previous.slug}`}
                className="group rounded-xl border border-border-base bg-surface p-4 transition-colors hover:border-border-strong"
              >
                <span className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
                  <ArrowLeftIcon className="h-3.5 w-3.5" />
                  Newer
                </span>
                <span className="mt-1.5 block text-sm font-medium text-foreground">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="group rounded-xl border border-border-base bg-surface p-4 text-right transition-colors hover:border-border-strong sm:col-start-2"
              >
                <span className="flex items-center justify-end gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
                  Older
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
                <span className="mt-1.5 block text-sm font-medium text-foreground">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd(project)),
        }}
      />
    </Container>
  );
}

/* -------------------------------------------------------------------------- */
/* Small building blocks, local to this page.                                  */
/* -------------------------------------------------------------------------- */

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
        {heading}
      </h2>
      {children}
    </section>
  );
}

function Prose({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Section heading={heading}>
      <div className="space-y-4 leading-relaxed text-muted">{children}</div>
    </Section>
  );
}

/**
 * Resolves a project's `interactiveDemo` to its component. Add a case here
 * when you add a new value to the `InteractiveDemo` union — TypeScript will
 * flag this switch if you forget.
 */
function InteractiveDemoBlock({ demo }: { demo: InteractiveDemo }) {
  switch (demo) {
    case "query-checker":
      return <QueryCheckerDemo />;
    case "rag-pipeline":
      return <RagPipelineDemo />;
  }
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-5 leading-relaxed text-muted before:absolute before:left-0 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
      {children}
    </li>
  );
}

function DeploymentTable({ project }: { project: Project }) {
  const deployment = project.deployment;
  if (!deployment) return null;

  const rows = [
    ["Frontend", deployment.frontend],
    ["Backend", deployment.backend],
    ["Database", deployment.database],
    ["Storage", deployment.storage],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <Section heading="Deployment">
      {rows.length > 0 && (
        <dl className="divide-y divide-border-base overflow-hidden rounded-xl border border-border-base bg-surface">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle sm:w-24 sm:shrink-0">
                {label}
              </dt>
              <dd className="text-sm text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {deployment.limitations && deployment.limitations.length > 0 && (
        <div className="mt-5">
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
            Free-tier limitations
          </h3>
          <ul className="mt-3 space-y-2.5">
            {deployment.limitations.map((item, i) => (
              <li
                key={i}
                className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-amber-500"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
