import { experience } from "@/data/experience";
import { Container } from "./ui/Container";
import { Chip } from "./ui/Badge";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { ArrowUpRightIcon, BriefcaseIcon, MapPinIcon } from "./ui/Icons";

/**
 * Work history as a vertical timeline. Dates and location are optional in the
 * data, so the meta line collapses cleanly when a role only has a company and
 * a title.
 */
export function Experience() {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeading eyebrow="03 — Experience" title="Where I've worked" />

        <ol className="relative space-y-10 border-l border-border-base pl-6 sm:pl-8">
          {experience.map((role, index) => {
            const period = [role.startDate, role.endDate]
              .filter(Boolean)
              .join(" — ");

            return (
              <Reveal as="li" key={`${role.company}-${role.role}`} delay={index * 80}>
                {/* Timeline node */}
                <span
                  aria-hidden
                  className="absolute -left-[9px] flex h-[18px] w-[18px] items-center justify-center rounded-full border border-border-strong bg-background"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {role.role}
                  </h3>
                  {period && (
                    <span className="font-mono text-xs text-subtle">{period}</span>
                  )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <BriefcaseIcon className="h-4 w-4" />
                    {role.url ? (
                      <a
                        href={role.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                      >
                        {role.company}
                        <ArrowUpRightIcon className="h-3 w-3" />
                      </a>
                    ) : (
                      role.company
                    )}
                    {role.parentCompany && (
                      <span className="text-subtle">
                        (part of {role.parentCompany})
                      </span>
                    )}
                  </span>
                  {role.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPinIcon className="h-4 w-4" />
                      {role.location}
                    </span>
                  )}
                </div>

                {/* Skipped entirely when empty — a role you've just started
                    shouldn't leave a gap where its bullets will go. */}
                {role.responsibilities.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {role.responsibilities.map((item, i) => (
                      <li
                        key={i}
                        className="relative pl-5 text-[0.95rem] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-border-strong"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {role.technologies && role.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {role.technologies.map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </div>
                )}
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
