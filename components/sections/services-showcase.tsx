"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GSAPReveal } from "../animations/gsap-reveal";
import { ArrowRight, Home, Briefcase, Monitor, Layers, Hammer } from "lucide-react";

const services = [
  {
    title: "Residential Interior",
    slug: "residential-interior",
    description: "Bespoke, luxury home interiors crafted for sophisticated living.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600",
    icon: Home,
  },
  {
    title: "Commercial Interior",
    slug: "commercial-interior",
    description: "Sophisticated brand environments and premium retail spaces.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
    icon: Briefcase,
  },
  {
    title: "Office Design",
    slug: "office-design",
    description: "Modern, ergonomic workspace architecture to foster productivity.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600",
    icon: Monitor,
  },
  {
    title: "Exterior Design",
    slug: "exterior-design",
    description: "Magnificent facade engineering and luxury outdoor spaces.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600",
    icon: Layers,
  },
  {
    title: "Renovation",
    slug: "renovation",
    description: "Complete structural retrofitting and modern interior remodelling.",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=600",
    icon: Hammer,
  },
];

export function ServicesShowcase() {
  return (
    <section className="py-24 md:py-32 bg-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-sans text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block">
              Our Expertise
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0B1B3D] tracking-wide">
              Bespoke Design Disciplines
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-[#0B1B3D] hover:text-[#D4AF37] transition-colors group mt-6 md:mt-0 font-bold border-b border-[#0B1B3D] hover:border-[#D4AF37] pb-1"
          >
            All Services
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services Grid (Premium Magazine Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <GSAPReveal
                key={service.slug}
                direction="up"
                delay={index * 0.1}
                duration={0.8}
              >
                <div
                  className="group relative bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-500"
                  data-cursor-text="Inspect"
                >
                  {/* Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 600px) 100vw, 600px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#0A192F]/20 group-hover:bg-[#0A192F]/10 transition-colors" />
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#D4AF37] mb-6">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-xl text-[#0B1B3D] tracking-wider mb-4">
                        {service.title}
                      </h3>
                      <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-widest text-[#D4AF37] group-hover:text-[#0B1B3D] transition-colors mt-auto font-bold"
                    >
                      Explore Service
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </GSAPReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
