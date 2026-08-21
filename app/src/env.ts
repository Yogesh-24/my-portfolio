/**
 * Validated environment variables.
 *
 * `publicEnv` holds `NEXT_PUBLIC_*` values — inlined into the client bundle,
 * safe in the browser. `getServerEnv()` holds server-only values (secrets) —
 * never read it from client code; on the client those values are `undefined`.
 *
 * A missing/invalid variable fails fast with a clear zod error rather than
 * surfacing as a confusing runtime bug later.
 */

import { z } from "zod";

/**
 * Treat an empty env var as unset.
 *
 * `cp .env.example .env` leaves declared-but-blank keys (`CONTACT_ENDPOINT=`),
 * which reach us as `""` — and `""` is not `undefined`, so an `.optional()`
 * schema would reject it as "Invalid URL". Without this, the documented setup
 * flow would break every optional variable the moment someone copied the
 * example file.
 */
const optionalUrl = () =>
  z.preprocess((v) => (v === "" ? undefined : v), z.url().optional());

/** Treat an empty string as unset for any (non-URL) optional var. */
const optionalString = () =>
  z.preprocess((v) => (v === "" ? undefined : v), z.string().optional());

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: optionalUrl(),
});

const serverSchema = z.object({
  /** Optional upstream the contact endpoint forwards leads to (CRM / webhook). */
  CONTACT_ENDPOINT: optionalUrl(),

  /** Supabase project URL — e.g. https://xxxx.supabase.co */
  SUPABASE_URL: optionalUrl(),
  /**
   * Supabase **secret** key (`sb_secret_…`). Bypasses RLS — server-only,
   * never `NEXT_PUBLIC_`. Used to read/write the `testimonials` table.
   */
  SUPABASE_SECRET_KEY: optionalString(),
  /** Legacy Supabase service-role key; supported as a fallback. */
  SUPABASE_SERVICE_ROLE_KEY: optionalString(),

  /** Resend API key (`re_…`). When unset, emails are logged, not sent. */
  RESEND_API_KEY: optionalString(),
  /** Verified "from" address in Resend, e.g. "Portfolio <noreply@yourdomain.com>". */
  RESEND_FROM_EMAIL: optionalString(),
  /** Inbox that receives contact + new-testimonial notifications. */
  NOTIFY_TO_EMAIL: optionalString(),
});

/** Public env — safe to read anywhere (server or client). */
export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

let cachedServerEnv: z.infer<typeof serverSchema> | undefined;

/**
 * Server-only env. Call from route handlers / server code only — parsed
 * lazily so the client bundle never evaluates it.
 */
export function getServerEnv() {
  cachedServerEnv ??= serverSchema.parse({
    CONTACT_ENDPOINT: process.env.CONTACT_ENDPOINT,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    NOTIFY_TO_EMAIL: process.env.NOTIFY_TO_EMAIL,
  });
  return cachedServerEnv;
}
