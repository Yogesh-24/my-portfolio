-- Testimonials table + RLS.
-- Run this once in Supabase → SQL Editor (or `supabase db push` if you use the CLI).
--
-- Writes go through the server route using the SECRET key, which bypasses
-- RLS entirely — so there is deliberately no INSERT policy for the public.
-- The only public-facing policy is SELECT on approved rows, which lets you
-- optionally read testimonials with the publishable key too, if you ever
-- want to fetch them straight from a Server Component without an API hop.

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,               -- job title / company, e.g. "Engineering Manager, Acme"
  message text not null,
  rating smallint check (rating between 1 and 5),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

comment on table public.testimonials is
  'Visitor-submitted testimonials. New rows start unapproved; approve via the Supabase table editor before they appear on the site.';

alter table public.testimonials enable row level security;

-- Public can read only approved testimonials. Indexed so the policy filter
-- (and the app's own query) stays fast as the table grows.
create index if not exists testimonials_approved_created_at_idx
  on public.testimonials (approved, created_at desc);

create policy "Public can read approved testimonials"
  on public.testimonials
  for select
  using (approved = true);

-- No insert/update/delete policy for anon/public — the app writes exclusively
-- through the server route using the secret key, which bypasses RLS.
