import type { SocialLink } from "@/types/portfolio";
import { profile } from "./profile";

/**
 * Social / contact links.
 *
 * These render in the navbar, contact section and footer. Delete an entry to
 * remove it everywhere; there's no other place to update.
 *
 * TODO: add your LinkedIn once you have the profile URL — just uncomment the
 * block below and paste in your real vanity URL. It's left out rather than
 * guessed, because a broken LinkedIn link on a portfolio is worse than none.
 */
export const social: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    url: "https://github.com/s-prem-kumar",
    handle: "@s-prem-kumar",
  },
  // {
  //   platform: "linkedin",
  //   label: "LinkedIn",
  //   url: "https://www.linkedin.com/in/your-handle",
  //   handle: "/in/your-handle",
  // },
  {
    platform: "email",
    label: "Email",
    url: `mailto:${profile.email}`,
    handle: profile.email,
  },
];

/** Convenience lookup used by a few components. */
export function getSocial(platform: SocialLink["platform"]) {
  return social.find((link) => link.platform === platform);
}
