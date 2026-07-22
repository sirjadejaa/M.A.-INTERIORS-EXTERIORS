"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { GSAPReveal } from "../animations/gsap-reveal";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
}

const mockTestimonials: Testimonial[] = [
  {
    name: "Amit & Priya Sharma",
    role: "Homeowners",
    company: "The Crest Residences",
    review: "Working with Turk Interiors was a seamless experience. From the initial 3D plans to the final delivery, their professionalism and eye for luxury finishes was unmatched. They transformed our standard apartment into an architectural magazine masterwork.",
    rating: 5,
  },
  {
    name: "Vikram Singhal",
    role: "CEO",
    company: "Singhal Logistics",
    review: "Their turnkey office design capability is exceptional. The project was delivered on time, within budget, and has significantly boosted our workforce productivity. Highly recommended for commercial design work.",
    rating: 5,
  },
  {
    name: "Rajesh Malhotra",
    role: "Managing Director",
    company: "Prestige Group",
    review: "Turk Interiors designed a state-of-the-art office that reflects our brand's forward-looking philosophy. Excellent spatial planning and premium finishes throughout.",
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % mockTestimonials.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
  };

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4, ease: "easeIn" as const } },
  };

  const activeTestimonial = mockTestimonials[current];

  return (
    <section className="py-24 md:py-32 bg-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        
        <GSAPReveal direction="up" duration={0.8}>
          <span className="font-sans text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block">
            Endorsements
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#0B1B3D] tracking-wide mb-16">
            Client Voices
          </h2>
        </GSAPReveal>

        {/* Carousel Slide Area */}
        <div className="relative min-h-[300px] w-full flex flex-col items-center justify-center mb-12">
          {/* Large decorative quotation mark */}
          <div className="absolute -top-10 opacity-5 text-[#D4AF37]">
            <Quote className="w-20 h-20 fill-[#D4AF37]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center max-w-2xl"
            >
              {/* Rating stars */}
              <div className="flex text-[#D4AF37] gap-1 mb-6">
                {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
              </div>

              <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-[#0B1B3D] italic leading-relaxed tracking-wide mb-8">
                "{activeTestimonial.review}"
              </blockquote>

              <cite className="not-italic">
                <span className="font-sans text-xs tracking-widest text-[#0B1B3D] font-semibold uppercase block mb-1">
                  {activeTestimonial.name}
                </span>
                <span className="font-sans text-[9px] tracking-widest text-[#475569] uppercase">
                  {activeTestimonial.role} • {activeTestimonial.company}
                </span>
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="p-3 text-[#0B1B3D] hover:text-[#D4AF37] transition-colors rounded-full border border-[#0A192F]/10 hover:border-[#D4AF37]/40 bg-[#F0F4F8] shadow-sm hover:shadow"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 text-[#0B1B3D] hover:text-[#D4AF37] transition-colors rounded-full border border-[#0A192F]/10 hover:border-[#D4AF37]/40 bg-[#F0F4F8] shadow-sm hover:shadow"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
