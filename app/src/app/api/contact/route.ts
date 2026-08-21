import { z } from "zod";

import { getServerEnv } from "@/env";
import { ApiError, handle } from "@/lib/api";
import { escapeHtml, sendNotificationEmail } from "@/lib/email";

/**
 * Contact / lead submission — reaches you by email via Resend
 * (`sendNotificationEmail`, shared with `app/api/testimonials`). Still
 * optionally forwards to `CONTACT_ENDPOINT` (CRM / webhook) if set.
 */

// Request schema — kept in the route since it isn't shared. Lift to a shared
// module only once another route needs it.
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  message: z.string().min(1).max(2000),
});

export const POST = handle(async (req) => {
  const input = contactSchema.parse(await req.json());

  const { CONTACT_ENDPOINT } = getServerEnv();

  if (CONTACT_ENDPOINT) {
    // Forward the lead to the configured upstream (CRM, webhook, …).
    const upstream = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!upstream.ok) {
      throw new ApiError(502, "upstream_error", "Failed to deliver the message.");
    }
  }

  const emailSent = await sendNotificationEmail({
    subject: `Portfolio contact — ${input.name}`,
    html: `
      <p><strong>${escapeHtml(input.name)}</strong> (${escapeHtml(input.email)})</p>
      <p>${escapeHtml(input.message)}</p>
    `,
    replyTo: input.email,
  });

  if (!emailSent) {
    throw new ApiError(502, "email_delivery_failed", "Your message could not be delivered right now. Please try again later.");
  }

  return { received: true, emailSent: true };
});
