import type { ReactNode } from "react";

/**
 * The single place the site's max content width is defined. Every section and
 * page body goes through this, so changing `max-w-*` here re-flows the whole
 * site consistently.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
