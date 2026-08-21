import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/app/api/testimonials/route";

import { TestimonialCard } from "@/views/home/testimonial-card";
import { TestimonialForm } from "@/views/home/testimonial-form";

interface DebugInfo {
  rowCount: number | null;
  error: string | null;
}

async function getApprovedTestimonials(): Promise<{
  testimonials: Testimonial[];
  debug: DebugInfo;
}> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, role, message, rating, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    const debug: DebugInfo = {
      rowCount: data?.length ?? null,
      error: error ? JSON.stringify(error) : null,
    };

    if (error) {
      console.error("[TestimonialsSection] fetch failed:", error);
      return { testimonials: [], debug };
    }
    return { testimonials: data ?? [], debug };
  } catch (error) {
    // Supabase not configured / client init failed — render the section
    // with just the form rather than crashing the page, but log so this
    // is diagnosable from Vercel's Runtime Logs instead of failing silently.
    console.error("[TestimonialsSection] Supabase client error:", error);
    return {
      testimonials: [],
      debug: {
        rowCount: null,
        error: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

export const TestimonialsSection = async () => {
  const { testimonials, debug } = await getApprovedTestimonials();

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="mx-auto w-full max-w-6xl px-6 py-24">
      <h2 id="testimonials-heading" className="text-3xl font-bold text-foreground sm:text-4xl">
        Testimonials
      </h2>

      {/* TEMP DEBUG — remove this block once the empty-results issue is fixed. */}
      <p className="mt-4 rounded-lg bg-yellow-500/10 px-4 py-2 font-mono text-xs text-yellow-500">
        DEBUG rowCount: {String(debug.rowCount)} | error: {debug.error ?? "none"}
      </p>

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