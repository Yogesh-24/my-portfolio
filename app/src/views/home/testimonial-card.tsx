import type { Testimonial } from "@/app/api/testimonials/route";

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { name, role, message, rating } = testimonial;

  return (
    <figure className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8">
      <blockquote>
        <p className="text-lg leading-relaxed text-foreground/90">
          &ldquo;{message}&rdquo;
        </p>
      </blockquote>

      <figcaption className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          {role && <p className="text-sm text-foreground/60">{role}</p>}
        </div>

        {rating && (
          <div aria-label={`${rating} out of 5 stars`} className="text-foreground/80">
            {"★".repeat(rating)}
            <span className="text-foreground/25">{"★".repeat(5 - rating)}</span>
          </div>
        )}
      </figcaption>
    </figure>
  );
};
