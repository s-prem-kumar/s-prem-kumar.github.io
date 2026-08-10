import Image from "next/image";
import { certifications } from "@/data/certifications";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { ArrowUpRightIcon, CertificateIcon } from "./ui/Icons";

/**
 * Certifications. A card links out when `credentialUrl` is set, and shows the
 * scan when `image` points at a file in `public/images/certificates/`.
 */
export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section
      id="certifications"
      className="scroll-mt-24 border-t border-border-base bg-surface py-20"
    >
      <Container>
        <SectionHeading eyebrow="06 — Certifications" title="Credentials" />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <Reveal
              as="li"
              key={`${cert.name}-${cert.organization}`}
              delay={index * 60}
              className="overflow-hidden rounded-xl border border-border-base bg-background"
            >
              {cert.image && (
                <div className="relative aspect-[4/3] border-b border-border-base">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certificate issued by ${cert.organization}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-base bg-surface text-accent">
                  <CertificateIcon />
                </span>

                <h3 className="mt-3 text-[0.95rem] font-semibold tracking-tight text-foreground">
                  {cert.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{cert.organization}</p>

                {cert.date && (
                  <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
                    {cert.date}
                  </p>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    Verify credential
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
