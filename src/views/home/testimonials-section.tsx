import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/app/api/testimonials/route";

import { TestimonialCarousel } from "@/views/home/testimonial-carousel";
import { TestimonialForm } from "@/views/home/testimonial-form";

async function getApprovedTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, role, message, rating, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "[TestimonialsSection] fetch failed:",
        JSON.stringify(error, null, 2)
      );

      return [];
    }

    console.log(
      `[TestimonialsSection] loaded ${data?.length ?? 0} approved testimonials`
    );

    return data ?? [];
  } catch (error) {
    console.error(
      "[TestimonialsSection] Supabase initialization failed:",
      error
    );

    return [];
  }
}

export const TestimonialsSection = async () => {
  const testimonials = await getApprovedTestimonials();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="mx-auto w-full max-w-6xl px-6 py-24"
    >
      <h2
        id="testimonials-heading"
        className="text-3xl font-bold text-foreground sm:text-4xl"
      >
        Testimonials
      </h2>

      {testimonials.length > 0 ? (
        <TestimonialCarousel testimonials={testimonials} />
      ) : (
        <p className="mt-10 text-foreground/60">
          {/* No testimonials yet — be the first to leave one below. */}
        </p>
      )}

      <div className="mt-10 max-w-xl">
        <TestimonialForm />
      </div>
    </section>
  );
};