import { skills } from "@/data/skills";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/**
 * Skills grid. Deliberately no proficiency bars or percentages — they're not
 * verifiable and recruiters discount them.
 */
export function Skills() {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="scroll-mt-24 border-t border-border-base bg-surface py-20">
      <Container>
        <SectionHeading
          eyebrow="02 — Skills"
          title="Technical toolkit"
          description="Languages, frameworks and tools I've worked with across research, internship and personal projects."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <Reveal
              as="li"
              key={group.category}
              delay={index * 60}
              className="rounded-xl border border-border-base bg-background p-5"
            >
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border-base bg-surface px-2.5 py-1 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
