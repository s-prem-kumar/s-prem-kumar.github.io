import type { NextConfig } from "next";

/**
 * Configured for GitHub Pages, which serves plain files and runs no server.
 *
 * `output: "export"` writes the whole site to `out/` at build time — an HTML
 * file per route plus its assets. Everything here is already static, so
 * nothing had to be given up to make the switch.
 */
const nextConfig: NextConfig = {
  output: "export",

  /**
   * Emits `/projects/cashpilot/index.html` instead of `/projects/cashpilot.html`.
   * GitHub Pages resolves a directory to its `index.html`, so this is what
   * makes clean URLs work without a server rewriting anything.
   */
  trailingSlash: true,

  /**
   * Next.js optimises images on demand, which needs a server. Serve them as
   * they are instead.
   *
   * The practical consequence: `public/images/profile/avatar.png` is delivered
   * at its full size, so compress source images before committing them.
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
