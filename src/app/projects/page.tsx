import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { hasLiveDemo, sortedProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Research, LLM and computer vision projects — each with a full case study covering the problem, architecture and what I learned.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const liveCount = sortedProjects.filter(hasLiveDemo).length;

  return (
    <Container>
      <div className="py-16 sm:py-20">
        <header className="mb-12">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Projects
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything I&rsquo;ve built
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            {sortedProjects.length} project
            {sortedProjects.length === 1 ? "" : "s"}, newest first. Every one has
            a case study explaining the problem it solves and how it works.
            {liveCount === 0
              ? " Live demos are being deployed on free-tier hosting — each case study explains what's planned and why it isn't up yet."
              : ` ${liveCount} ${liveCount === 1 ? "has a" : "have"} live demo you can use right now.`}
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 70} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
