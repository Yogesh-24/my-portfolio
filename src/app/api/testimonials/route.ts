import { z } from "zod";

import { ApiError, handle } from "@/lib/api";
import { escapeHtml, sendNotificationEmail } from "@/lib/email";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  message: string;
  rating: number | null;
  created_at: string;
}

const testimonialSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().max(150).optional(),
  message: z.string().min(1).max(1000),
  rating: z.number().int().min(1).max(5).optional(),
});

/** Public: only ever returns approved testimonials. */
export const GET = handle(async (): Promise<Testimonial[]> => {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("testimonials")
    .select("id, name, role, message, rating, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[api/testimonials] fetch failed:", error);
    throw new ApiError(502, "upstream_error", "Failed to load testimonials.");
  }

  return data ?? [];
});

/**
 * New submissions are inserted with `approved = false` — they don't appear
 * on the site until you approve them in the Supabase table editor. A
 * notification email lets you know one is waiting.
 */
export const POST = handle(async (req) => {
  const input = testimonialSchema.parse(await req.json());
  const supabase = getSupabaseServerClient();

  const { error } = await supabase.from("testimonials").insert({
    name: input.name,
    role: input.role ?? null,
    message: input.message,
    rating: input.rating ?? null,
    approved: false,
  });

  if (error) {
    console.error("[api/testimonials] insert failed:", error);
    throw new ApiError(502, "upstream_error", "Failed to submit testimonial.");
  }

  await sendNotificationEmail({
    subject: `New testimonial from ${input.name}`,
    html: `
      <p><strong>${escapeHtml(input.name)}</strong>${input.role ? ` — ${escapeHtml(input.role)}` : ""}</p>
      ${input.rating ? `<p>Rating: ${"★".repeat(input.rating)}${"☆".repeat(5 - input.rating)}</p>` : ""}
      <p>${escapeHtml(input.message)}</p>
      <p style="color:#888;font-size:12px">Awaiting approval in the Supabase table editor before it goes live.</p>
    `,
  });

  return { submitted: true };
});
