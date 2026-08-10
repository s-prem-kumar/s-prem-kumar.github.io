import type { SVGProps } from "react";
import type { SocialPlatform } from "@/types/portfolio";

/**
 * Inline SVG icons.
 *
 * These are hand-written rather than pulled from an icon package: the site
 * needs about a dozen glyphs, and inlining them keeps the dependency list at
 * zero and ships no icon-font or runtime.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...props}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" aria-hidden {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" aria-hidden {...props}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4h1.5Z" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" aria-hidden {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" aria-hidden {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18" />
    </svg>
  );
}

export function GraduationCapIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" aria-hidden {...props}>
      <path d="m12 4 9 4.5-9 4.5-9-4.5L12 4Z" />
      <path d="M6.5 10.5V16c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-5.5M21 8.5V14" />
    </svg>
  );
}

export function CertificateIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" aria-hidden {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.5 13.5-1 6.5 4.5-2.5 4.5 2.5-1-6.5" />
    </svg>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" aria-hidden {...props}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.5H4.5V7a3.5 3.5 0 0 0 3 3.4M17 5.5h2.5V7a3.5 3.5 0 0 1-3 3.4M10 14h4l.5 3.5h-5L10 14ZM8 20h8" />
    </svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" aria-hidden {...props}>
      <path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4" />
    </svg>
  );
}

export function RocketIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...props}>
      <path d="M13.5 4.5C16 2 20 2.5 20 2.5s.5 4-2 6.5l-3 3-5-5 3.5-2.5Z" />
      <path d="m10 9.5-3.5.5-2 2 3 1M14.5 14l-.5 3.5-2 2-1-3M5 16c-1 1-1.5 3.5-1.5 3.5S6 19 7 18" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...props}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H19v14H5.5A1.5 1.5 0 0 0 4 19.5V5.5Z" />
      <path d="M4 17.5A1.5 1.5 0 0 1 5.5 16H19" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" aria-hidden {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" aria-hidden {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" aria-hidden {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.5 1.5m11.2 11.2 1.5 1.5M19.1 4.9l-1.5 1.5M6.4 17.6l-1.5 1.5" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" aria-hidden {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" aria-hidden {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Social icons — these use filled paths from each brand's own mark.           */
/* -------------------------------------------------------------------------- */

const brand = { viewBox: "0 0 24 24", fill: "currentColor" };

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...brand} width="18" height="18" aria-hidden {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2.2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.15v3.19c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...brand} width="18" height="18" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg {...brand} width="18" height="18" aria-hidden {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
    </svg>
  );
}

export function ScholarIcon(props: IconProps) {
  return (
    <svg {...brand} width="18" height="18" aria-hidden {...props}>
      <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Z" />
      <path d="M5 13.18v3.94L12 21l7-3.88v-3.94L12 17l-7-3.82Z" />
    </svg>
  );
}

/** Maps a `SocialPlatform` from the data files to its icon. */
export function SocialIcon({
  platform,
  ...props
}: IconProps & { platform: SocialPlatform }) {
  switch (platform) {
    case "github":
      return <GitHubIcon {...props} />;
    case "linkedin":
      return <LinkedInIcon {...props} />;
    case "twitter":
      return <TwitterIcon {...props} />;
    case "email":
      return <MailIcon {...props} />;
    case "scholar":
      return <ScholarIcon {...props} />;
    case "website":
      return <GlobeIcon {...props} />;
  }
}
