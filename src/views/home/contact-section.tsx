import { ContactForm } from "@/views/home/contact-form";

export const ContactSection = () => {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto w-full max-w-2xl px-6 py-24">
      <h2 id="contact-heading" className="text-3xl font-bold text-foreground sm:text-4xl">
        Get in touch
      </h2>
      <p className="mt-3 text-foreground/60">
        Have a question or want to work together? Send a message and I&apos;ll
        reply by email.
      </p>

      <div className="mt-10">
        <ContactForm />
      </div>
    </section>
  );
};
