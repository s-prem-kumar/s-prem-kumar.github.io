import { profile } from "@/data/profile";
import { social } from "@/data/social";
import { skills } from "@/data/skills";
import { education } from "@/data/education";
import type { Project } from "@/types/portfolio";

/**
 * JSON-LD structured data.
 *
 * Everything here is derived from `src/data`, so it can never drift out of
 * sync with what's on the page. Nothing is hard-coded.
 */

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    description: profile.tagline,
    email: `mailto:${profile.email}`,
    url: profile.siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    knowsAbout: skills.flatMap((group) => group.items),
    alumniOf: education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution,
    })),
    // Only real, published profiles — `social.ts` is the single source.
    sameAs: social
      .filter((link) => link.url.startsWith("http"))
      .map((link) => link.url),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: `${profile.siteUrl}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: profile.name,
      url: profile.siteUrl,
    },
    keywords: project.technologies.join(", "),
    ...(project.date ? { dateCreated: project.date } : {}),
    ...(project.github ? { codeRepository: project.github } : {}),
  };
}
