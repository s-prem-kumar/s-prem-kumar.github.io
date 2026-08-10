"use client";

import { MoonIcon, SunIcon } from "./ui/Icons";

/**
 * Light/dark switch.
 *
 * The *initial* theme is applied by `ThemeScript` before first paint; this
 * button only flips the class on <html> and remembers the choice. It holds no
 * React state — the `dark` class on the document is the single source of
 * truth, and the icons swap via CSS, so the server-rendered markup is already
 * correct for both themes.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* Private mode can throw — the theme just won't persist across reloads. */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-base bg-surface text-muted transition-colors hover:border-border-strong hover:text-foreground ${className}`}
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="block dark:hidden" />
    </button>
  );
}
