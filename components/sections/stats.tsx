"use client";

import React from "react";
import { GSAPReveal } from "../animations/gsap-reveal";
import { Star } from "lucide-react";

export function Stats() {
  const statItems = [
    {
      value: "18+",
      label: "Years of Design Curation",
      suffix: "Established Studio",
    },
    {
      value: "350+",
      label: "Turnkey Projects Delivered",
      suffix: "Residential & Commercial",
    },
    {
      value: "4.6",
      label: "Google Rating Score",
      suffix: "Client Satisfaction Guaranteed",
      isRating: true,
    },
    {
      value: "98%",
      label: "Client Return Rate",
      suffix: "Loyal Long-Term Partnerships",
    },
  ];

  return (
    <section className="py-24 bg-[#0A192F] text-[#F0F4F8] relative overflow-hidden border-y border-white/5">
      {/* Subtle glowing absolute mesh circles */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
          {statItems.map((stat, idx) => (
            <GSAPReveal
              key={idx}
              direction="up"
              delay={idx * 0.1}
              duration={0.8}
            >
              <div className="flex flex-col items-center md:items-start p-6 lg:p-8 first:pl-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-serif text-5xl md:text-6xl font-light text-[#D4AF37] tracking-tight">
                    {stat.value}
                  </span>
                  {stat.isRating && (
                    <div className="flex text-[#D4AF37]">
                      <Star className="w-5 h-5 fill-[#D4AF37]" />
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-[#F0F4F8] text-md tracking-wider mb-2 font-medium">
                  {stat.label}
                </h3>
                <p className="font-sans text-[10px] text-[#E2E8F0]/50 tracking-widest uppercase">
                  {stat.suffix}
                </p>
              </div>
            </GSAPReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
