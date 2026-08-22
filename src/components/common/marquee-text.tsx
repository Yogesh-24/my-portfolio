"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeTextProps {
  text: string;
  className?: string;
}

/**
 * Renders text on a single line. If the text overflows its container
 * (e.g. a long name/role on a narrow mobile card), it automatically
 * bounces left/right so the full text can be read, pausing briefly at
 * each end. Short text that fits stays perfectly still — no truncation,
 * no ellipsis.
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

  // Roughly constant scroll speed regardless of how far it has to travel.
  const durationSeconds = hasOverflow
    ? Math.max(3, Math.min(10, overflowPx / 35))
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
                animation: `marquee-bounce ${durationSeconds}s ease-in-out infinite`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {text}
      </span>
    </div>
  );
};
