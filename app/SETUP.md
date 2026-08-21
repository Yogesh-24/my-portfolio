# Testimonials + Contact — setup

## What this adds

- **`/api/testimonials`** — `GET` returns approved testimonials, `POST` saves
  a new one (unapproved) and emails you.
- **`/api/contact`** — now emails you via Resend on every submission (still
  optionally forwards to `CONTACT_ENDPOINT` too).
- **`TestimonialsSection`** (`src/views/home/`) — Server Component that reads
  approved testimonials straight from Supabase at render time, renders them
  as cards, and includes the submission form below.
- **`ContactSection`** (`src/views/home/`) — a contact form wired to
  `/api/contact`.
- New submissions are **not live immediately** — they land in Supabase with
  `approved = false`. You approve them by flipping that column to `true` in
  the Supabase table editor. That's the moderation step so a stranger can't
  put arbitrary text on your site instantly.

## 1. How to merge this into your local project

These are the **new/changed files only** — copy them over your existing
project, keeping the folder structure:

```
.env.example                              (merged — added Supabase/Resend vars)
package.json                              (merged — added @supabase/supabase-js)
src/env.ts                                (merged — added Supabase/Resend/notify vars)
src/lib/email.ts                          (new)
src/lib/supabase/server.ts                (new)
supabase/migrations/0001_testimonials.sql (new)
src/app/api/testimonials/route.ts         (new)
src/app/api/contact/route.ts              (replaces existing)
src/views/home/testimonial-card.tsx       (new)
src/views/home/testimonial-form.tsx       (new)
src/views/home/testimonials-section.tsx   (new)
src/views/home/contact-form.tsx           (new)
src/views/home/contact-section.tsx        (new)
src/views/home.tsx                        (⚠️ merge by hand — see below)
```

`src/views/home.tsx` here **only** renders `<TestimonialsSection />` and
`<ContactSection />` — it doesn't know about your Hero/About/Skills sections.
Add the two imports and drop the two components in below your existing
sections, e.g.:

```tsx
import { TestimonialsSection } from "@/views/home/testimonials-section";
import { ContactSection } from "@/views/home/contact-section";

export const HomeView = () => {
  return (
    <main className="min-h-lvh">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
};
```

Then:

```bash
yarn install   # picks up @supabase/supabase-js
```

## 2. Supabase — storage for testimonials

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → paste the contents of
   `supabase/migrations/0001_testimonials.sql` → run it. This creates the
   `testimonials` table with RLS enabled (public can only read approved rows;
   writes only happen server-side with the secret key, which bypasses RLS).
3. Go to **Project Settings → API**:
   - Copy the **Project URL** → `SUPABASE_URL`
   - Copy the **secret** key (`sb_secret_…` — *not* the publishable one) →
     `SUPABASE_SECRET_KEY`

**To approve a testimonial:** Table Editor → `testimonials` → tick `approved`
on the row.

## 3. Resend — email notifications

1. Create a free account at [resend.com](https://resend.com).
2. **API Keys** → create one → `RESEND_API_KEY`.
3. **Domains** → verify a domain you own for `RESEND_FROM_EMAIL` (e.g.
   `Portfolio <noreply@yourdomain.com>`). If you don't have a domain handy
   yet, Resend's test sender `onboarding@resend.dev` works for development
   but can only send to the email address on your Resend account.
4. Set `NOTIFY_TO_EMAIL` to the inbox you want contact/testimonial alerts
   sent to (your Gmail from the resume works fine).

## 4. Environment variables

Local (`.env`):

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxxxxxx
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=Portfolio <noreply@yourdomain.com>
NOTIFY_TO_EMAIL=yogeshn2427@gmail.com
```

On **Vercel**: Project Settings → Environment Variables → add the same four,
then redeploy.

## 5. Notes

- If Supabase isn't configured yet, the testimonials section still renders
  (empty state + the form) — it won't crash the page.
- If Resend isn't configured yet, both routes log the submission
  server-side instead of emailing — nothing breaks, you just won't get
  notified until you add the keys.
- `SUPABASE_SECRET_KEY` and `RESEND_API_KEY` are server-only — never
  prefixed `NEXT_PUBLIC_`, never sent to the browser.
