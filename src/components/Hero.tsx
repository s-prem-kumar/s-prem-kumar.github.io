import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { social } from "@/data/social";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import {
  ArrowRightIcon,
  DownloadIcon,
  MailIcon,
  MapPinIcon,
  SocialIcon,
} from "./ui/Icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-base">
      {/* Decorative backdrop. aria-hidden because it carries no information. */}
      <div
        aria-hidden
        className="bg-dot-grid mask-fade-b pointer-events-none absolute inset-0 opacity-60"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-20 sm:py-28 md:grid-cols-[1fr_auto] md:gap-16">
          <div>
            {profile.openToWork && (
              <Reveal>
                <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Open to opportunities
                </p>
              </Reveal>
            )}

            <Reveal delay={60}>
              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {profile.name}
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-4 font-mono text-sm text-accent sm:text-base">
                {profile.headline}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">
                {profile.tagline}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  View projects
                  <ArrowRightIcon />
                </Link>

                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-border-base bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
                >
                  <DownloadIcon />
                  Download résumé
                </a>

                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  <MailIcon />
                  Get in touch
                </a>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-subtle">
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon className="h-4 w-4" />
                  {profile.location}
                </span>
                <span className="hidden h-4 w-px bg-border-base sm:inline-block" />
                <span className="flex items-center gap-3">
                  {social.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target={link.url.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                    >
                      <SocialIcon platform={link.platform} className="h-4 w-4" />
                      <span>{link.label}</span>
                    </a>
                  ))}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Portrait, or a monogram when no photo has been added yet. */}
          <Reveal delay={200} className="hidden md:block">
            <div className="relative h-52 w-52 lg:h-60 lg:w-60">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-3xl border border-dashed border-border-base"
              />
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  sizes="240px"
                  priority
                  className="rounded-2xl border border-border-base object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-2xl border border-border-base bg-surface">
                  <span className="font-mono text-5xl font-semibold tracking-tight text-foreground">
                    {profile.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
