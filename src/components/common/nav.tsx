"use client";

import { useEffect, useState } from "react";

import { navLinks } from "@/data/mocks/home";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const preferred =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(preferred);
    document.documentElement.classList.toggle("dark", preferred === "dark");
    document.documentElement.classList.toggle("light", preferred === "light");
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.classList.toggle("light", next === "light");
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5"
      >
        <a
            href="#home"
            className="text-[1.05rem] font-medium tracking-[0.02em] text-foreground"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Yogesh
          </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-foreground/80 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}

          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-4 py-1.5 text-foreground/80 transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-accent hover:text-foreground"
            >
              Resume
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="grid size-9 place-items-center rounded-full border border-border text-foreground/80 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid size-9 place-items-center rounded-full border border-border text-foreground/80 md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-foreground/80 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}

          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-foreground/80 hover:text-foreground"
            >
              Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  );
};