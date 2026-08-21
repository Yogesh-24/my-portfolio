import { ContactForm } from "@/views/home/contact-form";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full"
    >
      <div>
        <h2
          id="contact-heading"
          className="text-2xl font-bold text-foreground sm:text-3xl"
        >
          Get in touch
        </h2>

        <p className="mt-3 text-sm leading-6 text-foreground/60">
          Have a question or want to work together? Send a message and I&apos;ll
          reply by email.
        </p>

        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};