export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-foreground/10">
      <div
        className="
          mx-auto
          flex
          min-h-[100px]
          w-full
          max-w-[1200px]
          flex-col
          items-center
          justify-between
          gap-5
          px-6
          py-7
          sm:flex-row
        "
      >
        <a
          href="#home"
          className="
            text-sm
            font-medium
            text-foreground/80
            transition-colors
            hover:text-foreground
          "
        >
          MY PORTFOLIO
        </a>

        <nav
          aria-label="Footer navigation"
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-5
            gap-y-2
            text-sm
            text-foreground/50
          "
        >
          <a
            href="#home"
            className="transition-colors hover:text-foreground"
          >
            Home
          </a>

          <a
            href="#about"
            className="transition-colors hover:text-foreground"
          >
            About
          </a>

          <a
            href="#skills"
            className="transition-colors hover:text-foreground"
          >
            Skills
          </a>

          <a
            href="#testimonials"
            className="transition-colors hover:text-foreground"
          >
            Testimonials
          </a>

          <a
            href="#contact"
            className="transition-colors hover:text-foreground"
          >
            Contact
          </a>
        </nav>

        <p className="text-sm text-foreground/45">
          © {currentYear} Yogesh N
        </p>
      </div>
    </footer>
  );
};