import Image from "next/image";

import { aboutContent } from "@/data/mocks/home";

export const AboutSection = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto w-full max-w-6xl px-6 py-24">
      <h2 id="about-heading" className="text-3xl font-bold text-foreground sm:text-4xl">
        About
      </h2>

      <div className="mt-10 grid gap-12 lg:grid-cols-[280px_1fr]">
        <div className="mx-auto w-56 shrink-0 overflow-hidden rounded-3xl border border-border lg:mx-0 lg:w-full">
          <Image
            src={aboutContent.photo}
            alt="Portrait of Yogesh N"
            width={560}
            height={560}
            className="h-auto w-full object-cover grayscale"
          />
        </div>

        <div>
          {aboutContent.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-4 text-foreground/80 last:mb-0">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
            <p className="font-semibold text-foreground">{aboutContent.education.degree}</p>
            <p className="mt-1 text-sm text-foreground/60">
              {aboutContent.education.school} · {aboutContent.education.period}
            </p>
            <p className="text-sm text-foreground/60">{aboutContent.education.detail}</p>
          </div>

          <ol className="mt-8 flex flex-col gap-6 border-l border-border pl-6">
            {aboutContent.experience.map((role) => (
              <li key={role.role + role.period} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-accent"
                />
                <p className="font-semibold text-foreground">{role.role}</p>
                <p className="text-sm text-foreground/60">
                  {role.company} · {role.period}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/75">
                  {role.points.map((point) => (
                    <li key={point.slice(0, 24)}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
