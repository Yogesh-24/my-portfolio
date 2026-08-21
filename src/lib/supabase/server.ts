/**
 * Server-only Supabase client.
 *
 * Uses a server-only privileged key. Prefer SUPABASE_SECRET_KEY (new Supabase
 * secret key) and fall back to SUPABASE_SERVICE_ROLE_KEY for projects that
 * still use the legacy service-role key name.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { ApiError } from "@/lib/api";
import { getServerEnv } from "@/env";

let cachedClient: SupabaseClient | undefined;

export function getSupabaseServerClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const env = getServerEnv();
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_SECRET_KEY ?? env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("[supabase] missing server configuration", {
      hasUrl: Boolean(url),
      hasSecretKey: Boolean(env.SUPABASE_SECRET_KEY),
      hasServiceRoleKey: Boolean(env.SUPABASE_SERVICE_ROLE_KEY),
    });
    throw new ApiError(
      503,
      "supabase_not_configured",
      "Testimonials storage is not configured on the server.",
    );
  }

  cachedClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cachedClient;
}
