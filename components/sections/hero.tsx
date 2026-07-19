"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Zoom/Pan Background continuously (Ken Burns Effect)
      gsap.fromTo(
        imgRef.current,
        { scale: 1.1 },
        {
          scale: 1.25,
          duration: 25,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }
      );

      // 2. Parallax background movement on scroll
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 3. Headline fades upward on scroll
      gsap.to(headlineRef.current, {
        y: -80,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
        },
      });

      // 4. CTAs fade out on scroll
      gsap.to(ctasRef.current, {
        y: -40,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 45%",
          scrub: true,
        },
      });

      // 5. Horizontal featured category strip slides on scroll
      gsap.to(stripRef.current, {
        xPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 6. Floating labels slow breathing micro-animation
      gsap.to(".floating-label", {
        y: "random(-10, 10)",
        x: "random(-5, 5)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#161616] z-10"
    >
      {/* Parallax Background Container */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 select-none pointer-events-none"
      >
        <Image
          ref={imgRef}
          src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000"
          alt="Luxury Living Room Interior"
          fill
          priority
          className="object-cover"
        />

        {/* Subtle Dark Gradient Overlay (40-50% opacity) */}
        <div className="absolute inset-0 bg-black/45 bg-gradient-to-b from-[#161616]/40 via-transparent to-[#161616]/55" />

        {/* Realistic Volumetric Light Rays (Entering from large windows overlay) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F8F7F4]/5 to-[#F8F7F4]/15 pointer-events-none mix-blend-overlay blur-md" />
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-b from-[#A67C52]/8 via-[#A67C52]/2 to-transparent origin-top-right -rotate-12 blur-3xl opacity-70 pointer-events-none" />
      </div>

      {/* Floating Labels (Micro-positioned around the hero) */}
      <div className="floating-label absolute top-[22%] left-[8%] hidden md:flex items-center gap-2.5 text-[9px] text-[#ECE8E2]/80 tracking-[0.3em] uppercase bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 pointer-events-none select-none z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
        Residential Interiors
      </div>

      <div className="floating-label absolute top-[48%] left-[5%] hidden md:flex items-center gap-2.5 text-[9px] text-[#ECE8E2]/80 tracking-[0.3em] uppercase bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 pointer-events-none select-none z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
        Turnkey Projects
      </div>

      <div className="floating-label absolute top-[68%] right-[8%] hidden md:flex items-center gap-2.5 text-[9px] text-[#ECE8E2]/80 tracking-[0.3em] uppercase bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 pointer-events-none select-none z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
        Commercial Spaces
      </div>

      <div className="floating-label absolute top-[25%] right-[32%] hidden md:flex items-center gap-2.5 text-[9px] text-[#ECE8E2]/80 tracking-[0.3em] uppercase bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 pointer-events-none select-none z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
        Luxury Living
      </div>

      {/* Hero Content Grid Overlay */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Editorial Typography & Actions */}
        <div ref={headlineRef} className="lg:col-span-8 flex flex-col items-start text-left">
          <span className="font-sans text-[10px] md:text-[11px] text-[#A67C52] tracking-[0.4em] uppercase mb-4">
            Bespoke Luxury Design Atelier
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F8F7F4] font-light tracking-wide leading-[1.1] mb-6 max-w-3xl">
            Crafting Timeless Spaces, <br />
            <span className="italic text-[#A67C52] font-light">Designed Around You.</span>
          </h1>

          <p className="font-sans text-xs sm:text-sm text-[#ECE8E2]/70 tracking-widest max-w-2xl mb-10 uppercase leading-relaxed">
            Luxury Interior & Exterior Design Studio specializing in bespoke homes, offices, villas, apartments, restaurants, retail spaces, and commercial environments.
          </p>

          {/* Action CTAs */}
          <div ref={ctasRef} className="flex flex-col sm:flex-row gap-6 justify-start items-center w-full">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#A67C52] text-white text-[10px] uppercase tracking-widest font-sans rounded transition-all duration-300 hover:bg-[#A67C52]/90 shadow-lg hover:shadow-xl w-full sm:w-auto font-semibold"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:border-[#A67C52] text-[#F8F7F4] text-[10px] uppercase tracking-widest font-sans rounded transition-all duration-300 hover:bg-white/5 w-full sm:w-auto font-semibold"
            >
              Explore Our Projects
            </Link>
          </div>
        </div>

        {/* Right Side: Floating Glass Card (Desktop only) */}
        <div className="hidden lg:block lg:col-span-4 lg:col-start-9 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8 shadow-2xl space-y-6 select-none z-20">
          <div className="flex items-center gap-1.5 text-[#A67C52]">
            <span className="text-amber-400 text-sm">★★★★★</span>
            <span className="text-[9px] text-[#F8F7F4] ml-2 tracking-[0.25em] font-sans uppercase">
              4.6 Google Rating
            </span>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="font-serif text-3xl text-[#F8F7F4] font-light">120+</h3>
            <p className="font-sans text-[8px] tracking-[0.2em] text-[#ECE8E2]/60 uppercase mt-0.5">
              Completed Projects
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="font-serif text-lg text-[#F8F7F4] font-light">
              Residential & Commercial
            </h3>
            <p className="font-sans text-[8px] tracking-[0.2em] text-[#ECE8E2]/60 uppercase mt-0.5">
              Bespoke Turnkey Curation
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h3 className="font-serif text-md text-[#F8F7F4] font-light">
              Mira Road, Mumbai
            </h3>
            <p className="font-sans text-[8px] tracking-[0.2em] text-[#ECE8E2]/60 uppercase mt-0.5">
              Design HQ Location
            </p>
          </div>
        </div>
      </div>

      {/* Featured Categories Horizontal Strip (Subtle slider text at bottom) */}
      <div
        ref={stripRef}
        className="absolute bottom-16 left-0 w-full z-20 bg-white/5 backdrop-blur-sm py-4 border-y border-white/5 overflow-hidden select-none pointer-events-none"
      >
        <div className="flex items-center gap-12 whitespace-nowrap px-6 md:px-12 justify-center text-[9px] tracking-[0.35em] uppercase text-[#ECE8E2]/90 font-sans font-medium">
          <span>Luxury Homes</span>
          <span className="text-[#A67C52]">•</span>
          <span>Villas</span>
          <span className="text-[#A67C52]">•</span>
          <span>Offices</span>
          <span className="text-[#A67C52]">•</span>
          <span>Restaurants</span>
          <span className="text-[#A67C52]">•</span>
          <span>Retail</span>
          <span className="text-[#A67C52]">•</span>
          <span>Hospitality</span>
        </div>
      </div>

      {/* Next Section Premium Overlap Curve (SVG mask separator) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[32px] md:h-[50px] text-[#F8F7F4] fill-current"
        >
          <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-30"
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
        <ChevronDown className="w-3.5 h-3.5 text-[#A67C52] animate-bounce" />
      </div>
    </section>
  );
}
