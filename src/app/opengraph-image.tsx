import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

/**
 * Social share card, generated at build time from `profile.ts`.
 *
 * This replaces the need for a hand-made image in `public/` — change your
 * headline and the card regenerates on the next build. It uses `next/og`,
 * which ships with Next.js, so it adds no dependency.
 *
 * Note: only flexbox and a subset of CSS work here, and the styles must be
 * inline — Tailwind classes are not available inside `ImageResponse`.
 */
export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Required by `output: "export"`. Generated-image routes are dynamic by
 * default; this pins the card to build time so it ships as a plain PNG.
 */
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "72px",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: "#2dd4bf",
            }}
          />
          <div style={{ fontSize: 24, color: "#a1a1aa", letterSpacing: 2 }}>
            {profile.location.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#2dd4bf" }}>
            {profile.headline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#71717a",
            borderTop: "1px solid #27272a",
            paddingTop: 28,
          }}
        >
          <div>{profile.email}</div>
          <div>{profile.siteUrl.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    size,
  );
}
