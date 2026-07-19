import React from "react";
import Image from "next/image";
import { GSAPReveal } from "@/components/animations/gsap-reveal";
import { MaskReveal } from "@/components/animations/mask-reveal";
import { Award, ShieldCheck, Heart, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Our Studio | M.A. Interiors & Exteriors",
  description:
    "Discover the story of M.A. Qureshi and our team of elite design thinkers shaping luxury spaces in Mira Road East, Maharashtra.",
};

const timelineSteps = [
  {
    year: "2008",
    title: "Atelier Founded",
    description: "Established by M.A. Qureshi with a commitment to handcrafted woodwork and architectural honesty.",
  },
  {
    year: "2013",
    title: "Proprietary Workshop",
    description: "Opened our specialized wood joinery workshop to control quality across all furniture and custom millwork.",
  },
  {
    year: "2018",
    title: "Turnkey Expansion",
    description: "Transitioned to a full-service turnkey builder, managing architectural planning, electrical engineering, plumbing, and structural facades.",
  },
  {
    year: "2024",
    title: "Digital Design Integration",
    description: "Adopted parametric modelling and state-of-the-art virtual reality walk-throughs for high-end residential briefs.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F8F7F4] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left">
          <span className="font-sans text-[10px] text-[#A67C52] tracking-[0.4em] uppercase mb-4 block">
            Our History & Mindset
          </span>
          <MaskReveal className="font-serif text-4xl sm:text-6xl text-[#111111] leading-tight tracking-wide mb-8 max-w-3xl">
            Defining Contemporary Luxury Since 2008.
          </MaskReveal>
        </div>

        {/* Founder Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-28">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full max-w-[450px] overflow-hidden rounded-lg shadow-xl border border-[#ECE8E2] mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600"
                alt="M.A. Qureshi Founder"
                fill
                sizes="(max-width: 450px) 100vw, 450px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 right-10 bg-[#A67C52] text-white px-6 py-3 rounded shadow-lg font-serif italic text-sm">
              M.A. Qureshi, Founder
            </div>
          </div>

          <div className="lg:col-span-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-6">
              A Vision Born of Pure Craftsmanship
            </h3>
            <p className="font-sans text-sm text-[#555555] leading-relaxed mb-6">
              When I established this studio, my goal was simple: to eradicate the compromises commonly made in design execution. Too often, spectacular concepts are diluted by substandard fabrication.
            </p>
            <p className="font-sans text-sm text-[#555555] leading-relaxed mb-6">
              To solve this, we built our own fabrication workshop. We don't just specify veneers; we select the logs. We don't buy generic tables; we carve them. This hands-on control has allowed us to deliver over 350 turnkey spaces that stand as hallmarks of luxury.
            </p>
            <blockquote className="border-l-2 border-[#A67C52] pl-6 font-serif italic text-lg text-[#111111] my-8">
              "Luxury is not about excess. It is the absolute harmony of material truth, proportions, and silent utility."
            </blockquote>
          </div>
        </div>

        {/* Core Values grid */}
        <div className="py-20 border-y border-[#ECE8E2] mb-28">
          <h3 className="font-serif text-center text-3xl text-[#111111] mb-16">
            Atelier Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#ECE8E2] text-[#A67C52] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg text-[#111111] mb-3">Honesty in Materials</h4>
              <p className="font-sans text-xs text-[#555555] leading-relaxed max-w-xs">
                We believe in authentic materials. We use real stones, genuine brass, solid woods, and natural linens that age beautifully over generations.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#ECE8E2] text-[#A67C52] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg text-[#111111] mb-3">Turnkey Rigor</h4>
              <p className="font-sans text-xs text-[#555555] leading-relaxed max-w-xs">
                We assume complete accountability. From site excavation and structural shell modifications to plumbing rerouting and lighting design, we manage the entire project pipeline.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#ECE8E2] text-[#A67C52] flex items-center justify-center mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg text-[#111111] mb-3">Ergonomic Precision</h4>
              <p className="font-sans text-xs text-[#555555] leading-relaxed max-w-xs">
                Spaces must be lived in, not just photographed. We optimize acoustic insulation, lighting warmth indices, and spatial circulations to ensure physical comfort.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div>
          <h3 className="font-serif text-center text-3xl text-[#111111] mb-16">
            Our Journey
          </h3>
          <div className="relative border-l border-[#ECE8E2] ml-4 md:ml-32 pl-8 md:pl-16 py-8 flex flex-col gap-16">
            {timelineSteps.map((step, idx) => (
              <GSAPReveal key={idx} direction="left" delay={idx * 0.1}>
                <div className="relative">
                  {/* Timeline bullet */}
                  <div className="absolute -left-[41px] md:-left-[81px] top-1.5 w-6 h-6 rounded-full bg-[#F8F7F4] border-2 border-[#A67C52] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#A67C52]" />
                  </div>
                  <span className="font-serif text-2xl font-light text-[#A67C52] block mb-2">
                    {step.year}
                  </span>
                  <h4 className="font-serif text-xl text-[#111111] mb-3">{step.title}</h4>
                  <p className="font-sans text-xs text-[#555555] max-w-xl leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
