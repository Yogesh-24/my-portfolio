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

      {/* ============================================================
          TESTIMONIAL + CONTACT
          ============================================================ */}

      <section
        className="
          mx-auto
          w-full
          max-w-6xl
          px-6
          py-24
        "
        aria-label="Contact and testimonial"
      >
        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-8
            lg:grid-cols-2
          "
        >
          {/* Leave a Testimonial */}
          <div id="leave-testimonial" className="w-full">
            <TestimonialForm />
          </div>

          {/* Get in Touch */}
          <ContactSection />
        </div>
      </section>

      <Footer />
    </main>
  );
};