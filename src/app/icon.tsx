import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

/**
 * Favicon — a monogram generated from `profile.name` at build time, so there's
 * no binary asset to maintain. Replace this file with `icon.png` (or
 * `favicon.ico`) in this folder if you'd rather use a designed mark.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d9488",
          color: "#ffffff",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: -0.5,
          borderRadius: 7,
        }}
      >
        {initials}
      </div>
    ),
    size,
  );
}
