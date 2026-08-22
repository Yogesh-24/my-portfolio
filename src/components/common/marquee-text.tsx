"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeTextProps {
  text: string;
  className?: string;
}

/**
 * Renders text on a single line. If the text overflows its container
 * (e.g. a long name/role on a narrow mobile card), it automatically
 * scrolls left once to reveal the rest, pauses, then jumps straight
 * back to the start (no reverse scroll) and repeats — the standard
 * "ticker" pattern (e.g. Spotify's now-playing title).
 *
 * Short text that already fits stays perfectly still — no animation,
 * no truncation, no ellipsis.
 */
export const MarqueeText = ({ text, className = "" }: MarqueeTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [overflowPx, setOverflowPx] = useState(0);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const textEl = textRef.current;

      if (!container || !textEl) {
        return;
      }

      const diff = textEl.scrollWidth - container.clientWidth;

      setOverflowPx(diff > 4 ? diff : 0);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [text]);

  const hasOverflow = overflowPx > 0;

  /*
   * Roughly constant, unhurried reading speed regardless of how far
   * the text has to travel — longer names scroll for longer, not
   * faster. ~26px/sec of actual motion, which is ~60% of the total
   * loop (the rest is the pause at each end).
   */
  const PIXELS_PER_SECOND = 26;
  const MOTION_FRACTION = 0.6;

  const durationSeconds = hasOverflow
    ? Math.max(5, Math.min(16, overflowPx / PIXELS_PER_SECOND / MOTION_FRACTION))
    : 0;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <span
        ref={textRef}
        className="inline-block"
        style={
          hasOverflow
            ? ({
                "--marquee-distance": `${overflowPx}px`,
                animation: `marquee-scroll ${durationSeconds}s ease-in-out infinite`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {text}
      </span>
    </div>
  );
};