/**
 * Server-only Supabase client.
 *
 * Uses the **secret** key, which bypasses RLS by design — see
 * obsidian/backend/database-supabase.md. Only ever imported from
 * `route.ts` handlers or Server Components, never from client code.
 *
 * This project has no user auth, so a plain `@supabase/supabase-js` client
 * is enough — `@supabase/ssr` is for cookie-based session auth, which
 * doesn't apply here.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { ApiError } from "@/lib/api";
import { getServerEnv } from "@/env";

let cachedClient: SupabaseClient | undefined;

/**
 * Returns a cached server-side Supabase client, or throws a clear `ApiError`
 * if Supabase hasn't been configured yet (so routes fail with a readable
 * 503 instead of a confusing `undefined` crash).
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const { SUPABASE_URL, SUPABASE_SECRET_KEY } = getServerEnv();

  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    throw new ApiError(
      503,
      "supabase_not_configured",
      "Testimonials storage isn't configured yet.",
    );
  }

  cachedClient = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false },
  });
  return cachedClient;
}
