import { profile } from "@/data/profile";
import { social } from "@/data/social";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { ArrowUpRightIcon, DownloadIcon, MailIcon, SocialIcon } from "./ui/Icons";

/**
 * Contact section.
 *
 * Intentionally a `mailto:` link and social profiles rather than a form: a
 * working contact form needs a mail-sending service, and every free tier for
 * that comes with a signup, a monthly cap and an API key to keep out of the
 * repo. This costs nothing, can't break, and can't leak anything.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border-base bg-surface py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="08 — Contact"
          title="Get in touch"
          description="Open to data science and machine learning roles. The fastest way to reach me is email — I read everything."
        />

        <Reveal className="rounded-xl border border-border-base bg-background p-6 sm:p-8">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-2xl"
          >
            <MailIcon className="h-5 w-5 shrink-0 text-accent" />
            <span className="break-all">{profile.email}</span>
            <ArrowUpRightIcon className="hidden h-4 w-4 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
          </a>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-border-base pt-6">
            {social
              .filter((link) => link.platform !== "email")
              .map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border-base bg-surface px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
                >
                  <SocialIcon platform={link.platform} className="h-4 w-4" />
                  {link.label}
                  {link.handle && (
                    <span className="font-mono text-xs text-subtle">
                      {link.handle}
                    </span>
                  )}
                </a>
              ))}

            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border-base bg-surface px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
            >
              <DownloadIcon className="h-4 w-4" />
              Résumé
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
