"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { social } from "@/data/social";
import { Container } from "./ui/Container";
import { ThemeToggle } from "./ThemeToggle";
import { CloseIcon, MenuIcon, SocialIcon } from "./ui/Icons";

/**
 * Navigation. Section links point at the homepage anchors, so they work from
 * any page — from /projects, `/#skills` navigates home and scrolls.
 */
const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The mobile menu closes from the links' own onClick handlers, so there's no
  // effect watching `pathname` here — that would be a render triggered by a
  // render, for something the click already knows about.

  // Lock body scroll while the mobile menu covers the screen.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isProjects = pathname.startsWith("/projects");

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-border-base bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background"
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground font-mono text-[0.7rem] text-background transition-transform group-hover:-rotate-6">
              {initials(profile.name)}
            </span>
            <span className="hidden sm:inline">{profile.shortName}</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => {
              const active = link.href === "/projects" && isProjects;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors hover:text-foreground ${
                      active ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 sm:flex">
              {social.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  <SocialIcon platform={link.platform} />
                </a>
              ))}
            </div>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-base bg-surface text-muted transition-colors hover:text-foreground md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border-base bg-background md:hidden">
          <Container>
            <ul className="flex flex-col py-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border-base py-3.5 text-[0.95rem] text-muted transition-colors last:border-0 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}

/** "Prem Kumar Selvakumar" -> "PS". Used for the monogram mark. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}
