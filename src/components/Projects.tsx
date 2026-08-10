import Link from "next/link";
import { featuredProjects, projects } from "@/data/projects";
import { Container } from "./ui/Container";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { ArrowRightIcon } from "./ui/Icons";

/**
 * Featured projects on the homepage. Pinned by `featured: true` in
 * `src/data/projects.ts`; with none pinned it falls back to the three most
 * recent.
 */
export function Projects() {
  if (projects.length === 0) return null;

  const remaining = projects.length - featuredProjects.length;

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-border-base bg-surface py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="04 — Projects"
          title="Selected work"
          description="Each project has a full case study covering the problem, the approach and what I'd do differently. Source and live demos are linked wherever they exist."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {remaining > 0 && (
          <div className="mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              View all {projects.length} projects
              <ArrowRightIcon />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
