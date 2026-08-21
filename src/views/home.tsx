import { AboutSection } from "@/views/home/about-section";
import { ContactSection } from "@/views/home/contact-section";
import { Footer } from "@/views/home/footer";
import { HeroSection } from "@/views/home/hero-section";
import { SkillsSection } from "@/views/home/skills-section";
import { TestimonialForm } from "@/views/home/testimonial-form";
import { TestimonialsSection } from "@/views/home/testimonials-section";

export const HomeView = () => {
  return (
    <main className="min-h-lvh">
      <HeroSection />

      <AboutSection />

      <SkillsSection />

      <TestimonialsSection />

      <section
        className="mx-auto w-full max-w-6xl px-6 py-24"
        aria-label="Contact and testimonial"
      >
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <div id="leave-testimonial">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Leave a testimonial
              </h2>

              <p className="mt-2 text-sm leading-6 text-foreground/60">
                Share your experience working with me.
              </p>
            </div>

            <div className="mt-6">
              <TestimonialForm />
            </div>
          </div>

          <div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Get in touch
              </h2>

              <p className="mt-2 text-sm leading-6 text-foreground/60">
                Have a question or want to work together? Send a message and
                I&apos;ll reply by email.
              </p>
            </div>

            <div className="mt-6">
              <ContactSection />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};