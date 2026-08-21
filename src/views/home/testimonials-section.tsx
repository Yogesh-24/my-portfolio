import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/app/api/testimonials/route";

import { TestimonialCard } from "@/views/home/testimonial-card";
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
      console.error("[TestimonialsSection] fetch failed:", error);
      return [];
    }
    return data ?? [];
  } catch {
    // Supabase not configured yet — render the section with just the form
    // rather than crashing the page (see lib/supabase/server.ts).
    return [];
  }
}

export const TestimonialsSection = async () => {
  const testimonials = await getApprovedTestimonials();

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="mx-auto w-full max-w-6xl px-6 py-24">
      <h2 id="testimonials-heading" className="text-3xl font-bold text-foreground sm:text-4xl">
        Testimonials
      </h2>

      {testimonials.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-foreground/60">
          No testimonials yet — be the first to leave one below.
        </p>
      )}

      <div className="mt-10 max-w-xl">
        <TestimonialForm />
      </div>
    </section>
  );
};
