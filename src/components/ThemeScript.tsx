/**
 * Applies the saved (or system) colour scheme *before* the browser paints, so
 * there's no flash of the wrong theme on first load.
 *
 * This has to be a blocking inline script in <head>: a React effect runs after
 * hydration, which is far too late. `suppressHydrationWarning` on <html> in the
 * root layout keeps React from complaining that the class it rendered on the
 * server doesn't match the one this script added.
 */
const script = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {
    /* localStorage can throw in private mode — fall back to the light theme. */
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
