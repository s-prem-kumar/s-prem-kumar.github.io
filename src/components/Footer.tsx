import Link from "next/link";
import { profile } from "@/data/profile";
import { social } from "@/data/social";
import { Container } from "./ui/Container";
import { SocialIcon } from "./ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border-base bg-surface">
      <Container>
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-foreground"
            >
              {profile.name}
            </Link>
            <p className="mt-1 text-sm text-muted">{profile.headline}</p>
          </div>

          <div className="flex items-center gap-1">
            {social.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
              >
                <SocialIcon platform={link.platform} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border-base py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>
            Built with Next.js, TypeScript and Tailwind CSS. Deployed on GitHub
            Pages.
          </p>
        </div>
      </Container>
    </footer>
  );
}
