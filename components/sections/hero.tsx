"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroParticles } from "./hero-particles";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#161616]">
      {/* 4K Cinematic Background Video */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-45">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover scale-105"
        >
          {/* High-quality cinematic architecture loop */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-and-luxury-house-41312-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Soft shadow gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-[#161616]/75" />
      </div>

      {/* R3F Dust Particles Layer */}
      <HeroParticles />

      {/* Hero content */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-[10px] md:text-[11px] text-[#A67C52] tracking-[0.4em] uppercase mb-6"
        >
          Bespoke Luxury Design Atelier
        </motion.span>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl text-[#F8F7F4] font-light tracking-wide leading-[1.1] mb-8 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className="block"
          >
            Crafting Spaces That
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="block italic font-light text-[#A67C52] mt-2"
          >
            Tell Your Story.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-sans text-xs sm:text-sm text-[#ECE8E2]/70 tracking-widest max-w-xl mb-12 uppercase leading-relaxed"
        >
          Residential & Commercial Turnkey Architecture • Mira Road East, MH
        </motion.p>

        {/* Call to actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link
            href="/contact"
            className="flex items-center gap-3 px-8 py-4 bg-[#A67C52] text-white text-[11px] uppercase tracking-widest font-sans rounded transition-all duration-300 hover:bg-[#A67C52]/90 shadow-lg hover:shadow-xl w-full sm:w-auto"
            data-cursor-text="Connect"
          >
            Inquire Atelier
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-3 px-8 py-4 bg-transparent border border-[#ECE8E2]/20 hover:border-[#A67C52] text-[#F8F7F4] text-[11px] uppercase tracking-widest font-sans rounded transition-all duration-300 hover:bg-white/5 w-full sm:w-auto"
            data-cursor-text="Projects"
          >
            Explore Work
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-[#ECE8E2]/50">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#A67C52]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
