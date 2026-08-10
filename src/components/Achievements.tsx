import { achievements } from "@/data/achievements";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { ArrowUpRightIcon, TrophyIcon } from "./ui/Icons";

export function Achievements() {
  if (achievements.length === 0) return null;

  return (
    <section id="achievements" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeading eyebrow="07 — Achievements" title="Recognition" />

        <ul className="space-y-4">
          {achievements.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 60}
              className="flex gap-4 rounded-xl border border-border-base bg-surface p-5"
            >
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-base bg-background text-accent">
                <TrophyIcon />
              </span>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  {item.date && (
                    <span className="font-mono text-xs text-subtle">{item.date}</span>
                  )}
                </div>

                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {item.description}
                </p>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    View
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
