/**
 * Shared email sender (Resend), used by `app/api/contact` and
 * `app/api/testimonials` — the only two routes that need to notify you by
 * email, so it's lifted out per the "extract only when it pays" rule.
 *
 * When `RESEND_API_KEY` is unset, sends are logged server-side instead of
 * failing — mirrors the starter's `CONTACT_ENDPOINT` fallback so the app
 * still runs before you've configured Resend.
 */

import { getServerEnv } from "@/env";

interface SendEmailInput {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendNotificationEmail({
  subject,
  html,
  replyTo,
}: SendEmailInput): Promise<void> {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, NOTIFY_TO_EMAIL } = getServerEnv();

  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !NOTIFY_TO_EMAIL) {
    console.log("[email] not configured — skipped send:", { subject, html });
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: NOTIFY_TO_EMAIL,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[email] Resend send failed:", res.status, body);
    // Deliberately not thrown: a failed notification email shouldn't fail
    // the user's submission — the data is already saved / logged.
  }
}

/** Minimal HTML-escaping for values interpolated into notification emails. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
