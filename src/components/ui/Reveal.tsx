"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Fades content in as it scrolls into view.
 *
 * The `.reveal` class (which sets opacity: 0) is added by the effect rather
 * than rendered on the server, so if JavaScript never runs the content stays
 * fully visible instead of being permanently hidden. `prefers-reduced-motion`
 * disables the animation in CSS.
 *
 * The classes are toggled directly on the node instead of through React state:
 * this is a purely visual effect, and re-rendering the subtree twice per
 * element just to flip a class is wasted work.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Element to render. Use "li" / "section" etc. to keep markup semantic. */
  as?: ElementType;
  /** Stagger in milliseconds, for revealing a list item by item. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.classList.add("reveal");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          // One-shot: content shouldn't fade back out when scrolled past.
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
