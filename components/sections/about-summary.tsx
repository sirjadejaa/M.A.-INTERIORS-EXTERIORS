"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GSAPReveal } from "../animations/gsap-reveal";
import { MaskReveal } from "../animations/mask-reveal";
import { ArrowRight } from "lucide-react";

export function AboutSummary() {
  return (
    <section className="relative py-24 md:py-32 bg-[#F8F7F4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Area */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="font-sans text-[10px] text-[#A67C52] tracking-[0.4em] uppercase mb-4 block">
            Who We Are
          </span>
          
          <MaskReveal className="font-serif text-3xl sm:text-5xl text-[#111111] leading-tight tracking-wide mb-8">
            Handcrafting Luxury Environments with Architectonic Rigor.
          </MaskReveal>

          <GSAPReveal direction="up" delay={0.2}>
            <p className="font-sans text-sm text-[#555555] leading-relaxed mb-6">
              M.A. Interiors & Exteriors is a premier design studio based in Mira Road East, Maharashtra. Under the creative leadership of founder M.A. Qureshi, we have spent nearly two decades executing sophisticated turnkey design portfolios that define luxury residential and commercial landscapes.
            </p>
            <p className="font-sans text-sm text-[#555555] leading-relaxed mb-8">
              We operate at the intersection of architecture, premium industrial design, and structural artistry. By maintaining a proprietary carpentry workshop, we ensure every joint, finish, and custom furniture piece is crafted with absolute precision.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-widest text-[#111111] hover:text-[#A67C52] transition-colors group font-semibold"
            >
              The Founder Story
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </GSAPReveal>
        </div>

        {/* Image Grid Area (Overlapping Editorial Layout) */}
        <div className="lg:col-span-6 relative mt-12 lg:mt-0 flex items-center justify-center">
          {/* Main Image */}
          <div className="relative w-full aspect-[4/5] max-w-[400px] z-10 overflow-hidden rounded-lg shadow-xl border border-[#ECE8E2]">
            <Image
              src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800"
              alt="Luxury Interior Layout"
              fill
              sizes="(max-width: 400px) 100vw, 400px"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Overlapping Small Image */}
          <div className="absolute -bottom-8 -left-4 md:-left-8 w-[180px] sm:w-[220px] aspect-square z-20 overflow-hidden rounded-lg shadow-2xl border-4 border-[#F8F7F4] hidden sm:block">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=400"
              alt="Detail Curation"
              fill
              sizes="(max-width: 220px) 100vw, 220px"
              className="object-cover"
            />
          </div>

          {/* Luxury Floating Tag */}
          <div className="absolute top-12 -right-4 bg-[#161616] text-[#F8F7F4] p-6 rounded shadow-xl border border-white/5 z-20 max-w-[160px] hidden md:block">
            <p className="font-serif text-3xl font-light text-[#A67C52]">18+</p>
            <p className="font-sans text-[8px] tracking-widest text-[#ECE8E2]/60 uppercase mt-1">
              Years of Turnkey Design Curation
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
