import { profile } from "@/data/profile";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { MailIcon, MapPinIcon, PhoneIcon } from "./ui/Icons";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeading eyebrow="01 — About" title="Background" />

        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
          <Reveal className="space-y-5">
            {profile.bio.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <dl className="divide-y divide-border-base rounded-xl border border-border-base bg-surface">
              <DetailRow
                icon={<MapPinIcon className="h-4 w-4" />}
                label="Location"
                value={profile.location}
              />
              <DetailRow
                icon={<MailIcon className="h-4 w-4" />}
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              {/* Only rendered when a phone number is present in profile.ts. */}
              {profile.phone && (
                <DetailRow
                  icon={<PhoneIcon className="h-4 w-4" />}
                  label="Phone"
                  value={profile.phone}
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                />
              )}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function DetailRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col gap-1 p-4">
      <dt className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
        {icon}
        {label}
      </dt>
      <dd className="break-words text-sm text-foreground">
        {href ? (
          <a href={href} className="transition-colors hover:text-accent">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
