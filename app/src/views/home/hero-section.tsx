"use client";

import { useEffect, useState } from "react";

import { heroContent, socialLinks } from "@/data/mocks/home";

const ROLE_INTERVAL_MS = 2600;

export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % heroContent.roles.length);
    }, ROLE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="mx-auto flex min-h-[calc(100dvh-73px)] w-full max-w-6xl flex-col items-center justify-center px-6 py-24 text-center"
    >
      <h1 className="text-4xl font-extrabold text-foreground sm:text-6xl">
        {heroContent.greeting} <span className="text-accent">{heroContent.name}</span>
      </h1>

      <p
        aria-live="polite"
        className="mt-6 text-2xl font-bold text-foreground/90 sm:text-3xl"
      >
        {heroContent.roles[roleIndex]}
        <span className="ml-0.5 text-accent">|</span>
      </p>

      <p className="mt-8 max-w-2xl text-lg text-foreground/70">
        {heroContent.summary}
      </p>

      <ul className="mt-10 flex items-center gap-6">
        <li>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-foreground/70 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
          >
            <GitHubIcon />
          </a>
        </li>
        <li>
          <a
            href={`mailto:${socialLinks.email}`}
            aria-label="Email"
            className="text-foreground/70 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
          >
            <MailIcon />
          </a>
        </li>
        <li>
          <a
            href={`tel:${socialLinks.phone}`}
            aria-label="Phone"
            className="text-foreground/70 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
          >
            <PhoneIcon />
          </a>
        </li>
        <li>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-foreground/70 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
          >
            <LinkedInIcon />
          </a>
        </li>
      </ul>
    </section>
  );
};

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-6" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 6 10 7 10-7" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-6" aria-hidden="true">
    <path d="M3 5c0 9.4 7.6 17 17 17l3-4-6-3-2 2c-2.5-1-5-3.5-6-6l2-2-3-6L3 5Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM.5 8.75h9v14.75h-9V8.75ZM14.5 8.75h8.62v2.02h.12c1.2-2.1 4.14-2.32 5.16-.94.06.08-13.9-.08-13.9 6.13v7.54h-9V17.4c0-1.83-.03-4.19-2.55-4.19-2.56 0-2.95 1.99-2.95 4.06v6.23h-9V8.75Z" />
  </svg>
);
