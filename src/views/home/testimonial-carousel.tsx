"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Testimonial } from "@/app/api/testimonials/route";

import { TestimonialCard } from "@/views/home/testimonial-card";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

type CardPosition =
  | "active"
  | "left-1"
  | "left-2"
  | "right-1"
  | "right-2"
  | "hidden";

const AUTO_PLAY_MS = 6500;

/*
 * Minimum horizontal drag distance (px) before a swipe counts as a
 * navigation gesture rather than a tap/click.
 */
const SWIPE_THRESHOLD_PX = 50;

/*
 * If a pointer gesture moves further than this, we know it was a
 * drag — so the resulting click on release (e.g. on "View more")
 * gets suppressed instead of firing accidentally.
 */
const CLICK_SUPPRESS_THRESHOLD_PX = 8;

export const TestimonialCarousel = ({
  testimonials,
}: TestimonialCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * ---------------------------------------------------------------
   * MODAL STATE
   *
   * false → autoplay works
   * true  → autoplay completely stops
   * ---------------------------------------------------------------
   */

  const [isModalOpen, setIsModalOpen] = useState(false);

  /*
   * ---------------------------------------------------------------
   * SWIPE / DRAG STATE
   * ---------------------------------------------------------------
   */

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetX, setDragOffsetX] = useState(0);

  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragAxisRef = useRef<"horizontal" | "vertical" | null>(null);
  const suppressClickRef = useRef(false);
  const stackRef = useRef<HTMLDivElement>(null);

  const count = testimonials.length;

  /*
   * ---------------------------------------------------------------
   * AUTOPLAY
   *
   * IMPORTANT:
   *
   * When View More opens, or while the user is actively dragging,
   * the active testimonial CANNOT change on its own.
   * ---------------------------------------------------------------
   */

  useEffect(() => {
    if (count <= 1 || isModalOpen || isDragging) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        return (current + 1) % count;
      });
    }, AUTO_PLAY_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [count, isModalOpen, isDragging]);

  /*
   * ---------------------------------------------------------------
   * STACK POSITIONS
   * ---------------------------------------------------------------
   */

  const positions = useMemo(() => {
    return testimonials.map((_, index): CardPosition => {
      if (count <= 1) {
        return "active";
      }

      const distance =
        (index - activeIndex + count) % count;

      if (distance === 0) {
        return "active";
      }

      if (distance === 1) {
        return "right-1";
      }

      if (distance === 2) {
        return "right-2";
      }

      if (distance === count - 1) {
        return "left-1";
      }

      if (distance === count - 2) {
        return "left-2";
      }

      return "hidden";
    });
  }, [activeIndex, count, testimonials]);

  /*
   * ---------------------------------------------------------------
   * SWIPE HANDLERS
   *
   * Works for touch, mouse, and pen via Pointer Events. Horizontal
   * drags navigate between testimonials (wrapping infinitely both
   * ways); vertical drags are left alone so the page can still
   * scroll normally over the carousel.
   * ---------------------------------------------------------------
   */

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % count);
  };

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + count) % count);
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    if (count <= 1 || isModalOpen) {
      return;
    }

    // Ignore multi-touch gestures (pinch, etc).
    if (event.pointerType === "touch" && event.isPrimary === false) {
      return;
    }

    dragStartRef.current = { x: event.clientX, y: event.clientY };
    dragAxisRef.current = null;
    suppressClickRef.current = false;
    setIsDragging(true);

    stackRef.current?.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    const start = dragStartRef.current;

    if (!start || count <= 1) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (!dragAxisRef.current) {
      if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) {
        return;
      }

      dragAxisRef.current =
        Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
    }

    if (dragAxisRef.current !== "horizontal") {
      return;
    }

    // Prevent the page/Lenis from scrolling while swiping horizontally.
    event.preventDefault();

    if (Math.abs(deltaX) > CLICK_SUPPRESS_THRESHOLD_PX) {
      suppressClickRef.current = true;
    }

    // Resistance near the edges keeps the gesture feeling grounded.
    const resisted = deltaX * 0.55;

    setDragOffsetX(resisted);
  };

  const endDrag = (event: React.PointerEvent) => {
    const start = dragStartRef.current;

    if (start && dragAxisRef.current === "horizontal") {
      const deltaX = event.clientX - start.x;

      if (deltaX <= -SWIPE_THRESHOLD_PX) {
        goNext();
      } else if (deltaX >= SWIPE_THRESHOLD_PX) {
        goPrev();
      }
    }

    dragStartRef.current = null;
    dragAxisRef.current = null;
    setIsDragging(false);
    setDragOffsetX(0);

    if (stackRef.current?.hasPointerCapture(event.pointerId)) {
      stackRef.current.releasePointerCapture(event.pointerId);
    }

    // Clear the click-suppression flag on the next tick, after any
    // resulting click event has already been intercepted.
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const handleClickCapture = (event: React.MouseEvent) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  if (count === 0) {
    return null;
  }

  /*
   * ---------------------------------------------------------------
   * STACK CARD STYLES
   *
   * Active card:
   *   sharp
   *   large
   *   front
   *   follows the finger while dragging
   *
   * Adjacent cards:
   *   smaller
   *   blurred
   *   behind
   * ---------------------------------------------------------------
   */

  const getCardStyle = (position: CardPosition) => {
    switch (position) {
      case "active":
        return {
          transform: `translate3d(calc(-50% + ${dragOffsetX}px), -50%, 0) scale(1) rotateY(0deg)`,
          opacity: 1,
          filter: "blur(0px)",
          zIndex: 50,
        };

      case "right-1":
        return {
          transform:
            "translate3d(-35%, -47%, -20px) scale(0.94) rotateY(-5deg)",
          opacity: 0.52,
          filter: "blur(3px)",
          zIndex: 40,
        };

      case "right-2":
        return {
          transform:
            "translate3d(-19%, -44%, -40px) scale(0.88) rotateY(-9deg)",
          opacity: 0.22,
          filter: "blur(7px)",
          zIndex: 30,
        };

      case "left-1":
        return {
          transform:
            "translate3d(-65%, -47%, -20px) scale(0.94) rotateY(5deg)",
          opacity: 0.52,
          filter: "blur(3px)",
          zIndex: 40,
        };

      case "left-2":
        return {
          transform:
            "translate3d(-81%, -44%, -40px) scale(0.88) rotateY(9deg)",
          opacity: 0.22,
          filter: "blur(7px)",
          zIndex: 30,
        };

      default:
        return {
          transform:
            "translate3d(-50%, -50%, -80px) scale(0.78)",
          opacity: 0,
          filter: "blur(12px)",
          zIndex: 0,
        };
    }
  };

  /*
   * ---------------------------------------------------------------
   * DOT NAVIGATION
   * ---------------------------------------------------------------
   */

  const handleSelect = (index: number) => {
    /*
     * If the modal is open, the modal overlay covers the page,
     * so this normally cannot be triggered.
     *
     * Keeping this simple means clicking a dot immediately selects
     * that testimonial.
     */
    setActiveIndex(index);
  };

  return (
    <section
      className="mt-12 w-full"
      aria-label="Testimonials"
    >
      {/* ==========================================================
          STACK CAROUSEL
          ========================================================== */}

      <div
        ref={stackRef}
        className="
          relative
          mx-auto
          h-[330px]
          w-full
          max-w-[1050px]
          touch-pan-y
          overflow-visible
          [perspective:1400px]
        "
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={handleClickCapture}
        style={{ cursor: count > 1 ? (isDragging ? "grabbing" : "grab") : undefined }}
      >
        {testimonials.map((testimonial, index) => {
          const position = positions[index];
          const isActive = position === "active";
          const style = getCardStyle(position);

          return (
            <article
              key={testimonial.id}
              aria-hidden={!isActive}
              className={`
                absolute
                left-1/2
                top-1/2
                w-[calc(100%-32px)]
                max-w-[780px]
                will-change-transform
                motion-reduce:transition-none
                sm:w-[calc(100%-80px)]
                ${
                  isDragging && isActive
                    ? ""
                    : "transition-[transform,opacity,filter] duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                }
              `}
              style={style}
            >
              <TestimonialCard
                testimonial={testimonial}
                onModalChange={setIsModalOpen}
              />
            </article>
          );
        })}
      </div>

      {/* ==========================================================
          BOTTOM DOT NAVIGATION
          ========================================================== */}

      {count > 1 && (
        <div
          className="
            mt-2
            flex
            items-center
            justify-center
            gap-2.5
          "
          role="tablist"
          aria-label="Select testimonial"
        >
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={testimonial.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => handleSelect(index)}
                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-500
                  ease-out
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-foreground/30
                  ${
                    isActive
                      ? "w-8 bg-foreground"
                      : "w-2 bg-foreground/25 hover:bg-foreground/45"
                  }
                `}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};