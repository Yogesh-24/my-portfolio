import { AboutSection } from "@/views/home/about-section";
import { ContactSection } from "@/views/home/contact-section";
import { HeroSection } from "@/views/home/hero-section";
import { SkillsSection } from "@/views/home/skills-section";
import { TestimonialsSection } from "@/views/home/testimonials-section";

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
