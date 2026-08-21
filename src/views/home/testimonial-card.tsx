import type { Testimonial } from "@/app/api/testimonials/route";

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { name, role, message, rating } = testimonial;

  return (
    <figure className="flex h-full min-h-0 flex-col gap-5 rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8">
      <blockquote className="min-h-0 flex-1 overflow-y-auto pr-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground/20 hover:scrollbar-thumb-foreground/40">
        <p className="text-lg leading-relaxed text-foreground/90">
          &ldquo;{message}&rdquo;
        </p>
      </blockquote>

      <figcaption className="flex shrink-0 items-center justify-between gap-4 border-t border-foreground/10 pt-4">
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          {role && <p className="text-sm text-foreground/60">{role}</p>}
        </div>

        {rating && (
          <div
            aria-label={`${rating} out of 5 stars`}
            className="shrink-0 text-foreground/80"
          >
            {"★".repeat(rating)}
            <span className="text-foreground/25">
              {"★".repeat(5 - rating)}
            </span>
          </div>
        )}
      </figcaption>
    </figure>
  );
};