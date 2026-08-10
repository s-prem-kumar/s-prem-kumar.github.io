import type { Certification } from "@/types/portfolio";

/**
 * Certifications.
 *
 * `date`, `credentialUrl` and `image` are optional — they're left out here
 * because the resume doesn't list them. To add a certificate scan, drop the
 * file in `public/images/certificates/` and reference it:
 *
 *   image: "/images/certificates/prag-robotics-data-science.png",
 *
 * The card then becomes clickable and opens the full-size image.
 */
export const certifications: Certification[] = [
  {
    name: "Data Science",
    organization: "PRAG Robotics",
  },
  {
    name: "Data Analytics",
    organization: "Honeywell & ICT Academy",
  },
];
