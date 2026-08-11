/**
 * Shared types for every piece of content in the portfolio.
 *
 * Everything under `src/data` is typed against this file, so if you add a
 * project/skill/certification with a missing or misspelled field, TypeScript
 * will tell you at build time instead of the page rendering something broken.
 *
 * Fields marked with `?` are optional — leave them out entirely when you don't
 * have the information yet. The UI is written to skip anything that's missing,
 * so an omitted field never leaves an empty button or a blank heading.
 */

/* -------------------------------------------------------------------------- */
/* Profile                                                                     */
/* -------------------------------------------------------------------------- */

export interface Profile {
  /** Full name, used in the hero, metadata and JSON-LD. */
  name: string;
  /** Shorter name for the navbar / footer. */
  shortName: string;
  /** One-line role headline shown under your name. */
  headline: string;
  /** Short punchy sentence for the hero. Keep it to ~1–2 lines. */
  tagline: string;
  /** Longer "About me" copy. Each string renders as its own paragraph. */
  bio: string[];
  location: string;
  email: string;
  /** Optional — omit if you'd rather not publish your phone number. */
  phone?: string;
  /** Path to the resume inside /public. */
  resumeUrl: string;
  /** Canonical site URL, used for SEO metadata, sitemap and robots.txt. */
  siteUrl: string;
  /** Set to false to hide the "Open to opportunities" badge. */
  openToWork: boolean;
  /** Optional profile photo in /public/images/profile. Falls back to initials. */
  avatar?: string;
}

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

export interface SkillCategory {
  /** Category heading, e.g. "Programming Languages". */
  category: string;
  /** Plain list of technologies. No proficiency bars, no fake percentages. */
  items: string[];
}

/* -------------------------------------------------------------------------- */
/* Experience                                                                  */
/* -------------------------------------------------------------------------- */

export interface Experience {
  company: string;
  /**
   * Parent or holding company, when the employer sits under a larger group.
   * Rendered as "part of <parentCompany>" next to the company name.
   */
  parentCompany?: string;
  role: string;
  /** Omit if unknown — the UI just won't render a location. */
  location?: string;
  /** Human readable, e.g. "Jan 2025". Omit if unknown. */
  startDate?: string;
  /** Human readable, e.g. "Jun 2025" or "Present". Omit if unknown. */
  endDate?: string;
  /** What you were responsible for / what you shipped. */
  responsibilities: string[];
  /** Technologies you actually used in this role. */
  technologies?: string[];
  /** Optional company website. */
  url?: string;
}

/* -------------------------------------------------------------------------- */
/* Education                                                                   */
/* -------------------------------------------------------------------------- */

export interface Education {
  institution: string;
  degree: string;
  /** e.g. "Computer Science Engineering (Data Science)". */
  field?: string;
  location?: string;
  startYear: string;
  endYear: string;
  /** Anything worth calling out — coursework, focus areas, honours. */
  details?: string[];
}

/* -------------------------------------------------------------------------- */
/* Certifications                                                              */
/* -------------------------------------------------------------------------- */

export interface Certification {
  name: string;
  organization: string;
  /** e.g. "Mar 2024". Omit if you don't have it to hand. */
  date?: string;
  /** Public verification link, if the issuer provides one. */
  credentialUrl?: string;
  /** Certificate scan in /public/images/certificates. */
  image?: string;
}

/* -------------------------------------------------------------------------- */
/* Achievements                                                                */
/* -------------------------------------------------------------------------- */

export interface Achievement {
  title: string;
  description: string;
  /** e.g. "2025". */
  date?: string;
  /** Link to the paper, event page, certificate, etc. */
  url?: string;
}

/* -------------------------------------------------------------------------- */
/* Social                                                                      */
/* -------------------------------------------------------------------------- */

/** Determines which icon is rendered. Add a case in `SocialIcon` for new ones. */
export type SocialPlatform =
  | "github"
  | "linkedin"
  | "email"
  | "twitter"
  | "website"
  | "scholar";

export interface SocialLink {
  platform: SocialPlatform;
  /** Visible label, e.g. "GitHub". */
  label: string;
  /** Full URL. Use a `mailto:` URL for email. */
  url: string;
  /** Shown next to the link in the contact section, e.g. your @handle. */
  handle?: string;
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Describes where a project currently stands.
 *
 * - `Live`            — deployed and publicly reachable right now.
 * - `Completed`       — finished and working, but not deployed anywhere.
 * - `In Development`  — actively being built.
 * - `Coming Soon`     — announced, not started or not yet public.
 * - `Archived`        — no longer maintained.
 */
export type ProjectStatus =
  | "Live"
  | "Completed"
  | "In Development"
  | "Coming Soon"
  | "Archived";

export interface Screenshot {
  /** Path under /public/images/projects. */
  src: string;
  /** Required — describe what the screenshot actually shows. */
  alt: string;
  /** Optional caption rendered under the image. */
  caption?: string;
}

/**
 * Credentials for a public demo environment.
 *
 * NEVER put real credentials here. This file is committed to a public repo.
 * These must always point at a throwaway account inside a demo environment
 * that only contains synthetic data.
 */
export interface DemoCredentials {
  email: string;
  password: string;
  /** e.g. "Read-only demo account. Data resets every 24 hours." */
  note?: string;
}

/**
 * How a project is deployed. Rendered on the case study page so visitors can
 * see it's a real deployment, and so you remember how you shipped it.
 */
export interface Deployment {
  frontend?: string;
  backend?: string;
  database?: string;
  storage?: string;
  /** Free-tier caveats — cold starts, row limits, request caps, etc. */
  limitations?: string[];
}

/**
 * A headline number from the project's evaluation.
 *
 * Only put measured results here. If you can't point at the table or run that
 * produced the figure, it doesn't belong on the page.
 */
export interface Metric {
  /** e.g. "F1 — MedQA". Keep it short; it's a caption. */
  label: string;
  /** e.g. "91.1%". */
  value: string;
  /** One line of context: dataset, model, baseline it beat. */
  note?: string;
}

/** An external reference — a paper, DOI, dataset, conference page. */
export interface ExternalLink {
  label: string;
  url: string;
}

/**
 * Names an interactive walkthrough component to embed in the case study.
 *
 * This is the fallback for projects that can't be deployed: rather than a
 * screenshot, the visitor gets something they can actually click through. Each
 * value maps to a component in `src/components/demos/`.
 */
export type InteractiveDemo = "query-checker" | "rag-pipeline";

export interface Project {
  /** URL segment: /projects/<slug>. Lowercase, hyphenated, must be unique. */
  slug: string;
  title: string;
  /** One line for the project card. Keep it under ~90 characters. */
  shortDescription: string;
  /** A paragraph or two for the top of the case study. */
  description: string;
  /** Rendered as the tech chips on the card, in order. */
  technologies: string[];
  /** Shown as a bulleted list on the case study page. */
  features: string[];

  /** When you worked on it, e.g. "Sep 2024". Used for sorting and display. */
  date?: string;
  /** Machine-sortable date, `YYYY-MM`. Falls back to `date` ordering. */
  sortKey?: string;
  /** Short grouping label, e.g. "Research", "Computer Vision". */
  category?: string;

  status: ProjectStatus;

  /** Source repository. Omit until the repo actually exists and is public. */
  github?: string;
  /** Live URL. Only set this alongside `demoAvailable: true`. */
  liveDemo?: string;
  /**
   * Controls the 🚀 Live Demo button. The button only renders when this is
   * `true` AND `liveDemo` is set, so a half-filled entry can never produce a
   * dead button.
   */
  demoAvailable?: boolean;
  /** Explains *why* there's no demo. Shown in place of the button. */
  demoNote?: string;
  /** Login details for the demo. Synthetic data only. */
  demoCredentials?: DemoCredentials;

  /** Card thumbnail, e.g. "/images/projects/my-project.png". */
  image?: string;
  /** Extra images for the case study gallery. */
  screenshots?: Screenshot[];

  /* --- Case study sections. Every one of these is optional. --- */
  problem?: string;
  solution?: string;
  /** Each string is a paragraph. Describe how the pieces fit together. */
  architecture?: string[];
  challenges?: string[];
  learnings?: string[];
  /**
   * Security measures actually implemented. Only list what's in the code —
   * an aspirational security section is worse than none.
   */
  security?: string[];
  /** Testing actually performed: suites, tools, scans. */
  testing?: string[];
  deployment?: Deployment;
  /** Measured results. Rendered as a metric grid on the case study. */
  results?: Metric[];
  /** Papers, DOIs, datasets. Rendered as buttons next to GitHub / Live Demo. */
  links?: ExternalLink[];

  /**
   * Credit line for collaborative work, e.g. "Prem Kumar S and team".
   *
   * Say so when a project wasn't solo — an interviewer will find out either
   * way, and volunteering it reads better than being asked. Naming individual
   * collaborators is optional; this file is public, so only put a person's
   * name here if you'd be comfortable publishing it.
   */
  team?: string;
  /** Your specific contribution on a team project. */
  role?: string;

  /** Embeds a clickable walkthrough — see `InteractiveDemo`. */
  interactiveDemo?: InteractiveDemo;

  /** Pins the project to the top of the homepage grid. */
  featured?: boolean;
}
