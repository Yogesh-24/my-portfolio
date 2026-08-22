"use client";

import { useEffect, useState } from "react";

import type { Testimonial } from "@/app/api/testimonials/route";
import { MarqueeText } from "@/components/common/marquee-text";

export interface TestimonialCardProps {
  testimonial: Testimonial;
  onModalChange?: (isOpen: boolean) => void;
}

export const TestimonialCard = ({
  testimonial,
  onModalChange,
}: TestimonialCardProps) => {
  const { name, role, message, rating } = testimonial;

  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  const displayedRating = rating ?? 0;
  const showReadMore = message.length > 280;

  /*
   * ---------------------------------------------------------------
   * MODAL CONTROL
   * ---------------------------------------------------------------
   */

  const openModal = () => {
    setIsReadMoreOpen(true);
    onModalChange?.(true);
  };

  const closeModal = () => {
    setIsReadMoreOpen(false);
    onModalChange?.(false);
  };

  /*
   * ---------------------------------------------------------------
   * ESCAPE KEY + BODY LOCK
   * ---------------------------------------------------------------
   */

  useEffect(() => {
    if (!isReadMoreOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsReadMoreOpen(false);
        onModalChange?.(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReadMoreOpen, onModalChange]);

  /*
   * ---------------------------------------------------------------
   * CARD
   * ---------------------------------------------------------------
   */

  return (
    <>
      <figure
        className="
          flex
          h-[250px]
          min-h-0
          w-full
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-foreground/10
          bg-foreground/[0.03]
          p-6
          shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]
          sm:h-[260px]
          sm:p-7
        "
      >
        {/* ==========================================================
            MESSAGE
            ========================================================== */}

        <div className="min-h-0 flex-1">
          <div
            className="
              testimonial-message-active
              h-[135px]
              overflow-y-auto
              overscroll-contain
              pr-3
            "
            data-lenis-prevent
            onWheel={(event) => {
              /*
               * The message owns the wheel while the cursor
               * is inside this area.
               *
               * data-lenis-prevent prevents Lenis from moving
               * the home page.
               */
              event.stopPropagation();
            }}
          >
            <span
              aria-hidden="true"
              className="
                block
                font-serif
                text-4xl
                leading-none
                text-foreground/20
              "
            >
              &ldquo;
            </span>

            <p className="mt-2 text-[16px] leading-7 text-foreground/90">
              {message}
            </p>

            {showReadMore && (
              <button
                type="button"
                onClick={openModal}
                className="
                  mt-3
                  rounded-full
                  border
                  border-foreground/15
                  px-3
                  py-1.5
                  text-sm
                  font-medium
                  text-foreground/70
                  transition-colors
                  hover:border-foreground/25
                  hover:text-foreground
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-foreground/40
                "
              >
                View more
              </button>
            )}
          </div>
        </div>

        {/* ==========================================================
            FOOTER
            ========================================================== */}

        <figcaption
          className="
            mt-4
            flex
            shrink-0
            items-center
            justify-between
            gap-4
            border-t
            border-foreground/10
            pt-4
          "
        >
          <div className="min-w-0">
            <MarqueeText
              text={name}
              className="font-semibold text-foreground"
            />

            {role && (
              <MarqueeText
                text={role}
                className="text-sm text-foreground/60"
              />
            )}
          </div>

          <div
            className="flex shrink-0 gap-0.5"
            aria-label={`${displayedRating} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, index) => {
              const star = index + 1;

              return (
                <span
                  key={star}
                  aria-hidden="true"
                  className="
                    text-base
                    leading-none
                    text-foreground
                  "
                >
                  {star <= displayedRating ? "★" : "☆"}
                </span>
              );
            })}
          </div>
        </figcaption>
      </figure>

      {/* ==============================================================
          VIEW MORE MODAL
          ============================================================== */}

      {isReadMoreOpen && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/75
            p-4
            backdrop-blur-sm
            sm:p-6
          "
          role="dialog"
          aria-modal="true"
          aria-label={`Testimonial from ${name}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          {/* ==========================================================
              SMALLER MODAL

              Desktop:
              max-width 620px
              max-height 460px

              Mobile:
              always stays inside viewport
              ========================================================== */}

          <div
            className="
              flex
              h-[min(460px,calc(100vh-80px))]
              w-full
              max-w-[620px]
              flex-col
              overflow-hidden
              rounded-[22px]
              border
              border-foreground/15
              bg-background
              shadow-[0_30px_100px_-25px_rgba(0,0,0,0.9)]
            "
          >
            {/* ========================================================
                MODAL HEADER
                ======================================================== */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                border-b
                border-foreground/10
                px-5
                py-4
                sm:px-6
              "
            >
              <div className="min-w-0">
                <MarqueeText
                  text={name}
                  className="font-semibold text-foreground"
                />

                {role && (
                  <MarqueeText
                    text={role}
                    className="mt-0.5 text-sm text-foreground/60"
                  />
                )}
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="
                  ml-4
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-foreground/10
                  text-xl
                  leading-none
                  text-foreground/60
                  transition-colors
                  hover:border-foreground/20
                  hover:text-foreground
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-foreground/30
                "
                aria-label="Close testimonial"
              >
                ×
              </button>
            </div>

            {/* ========================================================
                MODAL MESSAGE

                ONLY THIS AREA SCROLLS.
                ======================================================== */}

            <div
              className="
                testimonial-modal-message
                min-h-0
                flex-1
                overflow-y-auto
                overscroll-contain
                px-5
                py-5
                pr-4
                sm:px-6
              "
              data-lenis-prevent
              onWheel={(event) => {
                /*
                 * Prevent the wheel from reaching the page/Lenis.
                 */
                event.stopPropagation();
              }}
            >
              <span
                aria-hidden="true"
                className="
                  block
                  font-serif
                  text-5xl
                  leading-none
                  text-foreground/15
                "
              >
                &ldquo;
              </span>

              <p className="mt-3 text-[16px] leading-8 text-foreground/90">
                {message}
              </p>
            </div>

            {/* ========================================================
                MODAL FOOTER
                ======================================================== */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                border-t
                border-foreground/10
                px-5
                py-3
                sm:px-6
              "
            >
              <div
                className="flex gap-0.5"
                aria-label={`${displayedRating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className="text-base text-foreground"
                  >
                    {index < displayedRating ? "★" : "☆"}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="
                  rounded-full
                  border
                  border-foreground/10
                  px-4
                  py-1.5
                  text-sm
                  text-foreground/70
                  transition-colors
                  hover:border-foreground/20
                  hover:text-foreground
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-foreground/30
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};