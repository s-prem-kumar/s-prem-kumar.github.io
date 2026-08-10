import { education } from "@/data/education";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { GraduationCapIcon, MapPinIcon } from "./ui/Icons";

export function Education() {
  if (education.length === 0) return null;

  return (
    <section id="education" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeading eyebrow="05 — Education" title="Academic background" />

        <ul className="space-y-4">
          {education.map((item, index) => (
            <Reveal
              as="li"
              key={`${item.institution}-${item.degree}`}
              delay={index * 80}
              className="rounded-xl border border-border-base bg-surface p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.degree}
                  {item.field && (
                    <span className="font-normal text-muted"> · {item.field}</span>
                  )}
                </h3>
                <span className="font-mono text-xs text-subtle">
                  {item.startYear} — {item.endYear}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCapIcon className="h-4 w-4" />
                  {item.institution}
                </span>
                {item.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPinIcon className="h-4 w-4" />
                    {item.location}
                  </span>
                )}
              </div>

              {item.details && item.details.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {item.details.map((detail, i) => (
                    <li
                      key={i}
                      className="relative pl-5 text-[0.95rem] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-border-strong"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
