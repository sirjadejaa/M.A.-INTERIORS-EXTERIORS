import React from "react";
import { Hero } from "@/components/sections/hero";
import { AboutSummary } from "@/components/sections/about-summary";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { ProjectsMasonry } from "@/components/sections/projects-masonry";
import { Stats } from "@/components/sections/stats";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { ContactFormSection } from "@/components/sections/contact-form-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSummary />
      <ServicesShowcase />
      <Stats />
      <ProjectsMasonry />
      <TestimonialsCarousel />
      <ContactFormSection />
    </>
  );
}
