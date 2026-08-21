"use client";

import { useEffect, useMemo, useState } from "react";
import type { Testimonial } from "@/app/api/testimonials/route";
import { TestimonialCard } from "@/views/home/testimonial-card";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel = ({
  testimonials,
}: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    if (
      count <= 1 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [count]);

  const positions = useMemo(() => {
    return testimonials.map((_, index) => {
      if (count <= 1) return "active" as const;

      const distance = (index - activeIndex + count) % count;

      if (distance === 0) return "active" as const;
      if (distance === 1) return "next" as const;
      if (distance === count - 1) return "previous" as const;

      return "hidden" as const;
    });
  }, [activeIndex, count, testimonials]);

  if (count === 0) return null;

  return (
    <div className="mt-10">
      <div
        className="relative h-[300px] w-full overflow-hidden sm:h-[310px]"
        aria-roledescription="carousel"
        aria-label="Testimonials"
      >
        {testimonials.map((testimonial, index) => {
          const position = positions[index];
          const isActive = position === "active";

          const offset =
            position === "active"
              ? "0%"
              : position === "next"
                ? "68%"
                : position === "previous"
                  ? "-68%"
                  : "0%";

          const scale =
            position === "active"
              ? 1
              : position === "hidden"
                ? 0.82
                : 0.86;

          // Side cards need to read as background texture, not text you'd
          // try to parse — low opacity + a heavy blur so only the active
          // card is legible. The old 2px/0.38 combo left them readable
          // enough to compete visually with the active card.
          const opacity =
            position === "active"
              ? 1
              : position === "hidden"
                ? 0
                : 0.22;

          const blur =
            position === "active" ? "0px" : position === "hidden" ? "10px" : "8px";

          return (
            <article
              key={testimonial.id}
              aria-hidden={!isActive}
              className="absolute left-1/2 top-1/2 w-[min(82%,620px)] -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:w-[min(72%,620px)]"
              style={{
                transform: `translate(calc(-50% + ${offset}), -50%) scale(${scale})`,
                opacity,
                filter: `blur(${blur})`,
                zIndex: isActive ? 30 : 10,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <TestimonialCard testimonial={testimonial} />
            </article>
          );
        })}
      </div>

      {count > 1 && (
        <div
          className="mt-5 flex items-center justify-center gap-2"
          aria-label="Testimonial navigation"
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              aria-label={`Show testimonial ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={[
                "h-2 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-7 bg-foreground"
                  : "w-2 bg-foreground/25 hover:bg-foreground/45",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
};