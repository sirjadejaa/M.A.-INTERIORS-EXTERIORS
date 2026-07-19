import React from "react";
import { Star, Quote } from "lucide-react";
import { MaskReveal } from "@/components/animations/mask-reveal";
import { GSAPReveal } from "@/components/animations/gsap-reveal";

export const metadata = {
  title: "Client Testimonials & Google Reviews | M.A. Interiors & Exteriors",
  description:
    "Read verified design reviews and client feedback on our turnkey villa builds and commercial office fit-outs in Mira Road East.",
};

const testimonials = [
  {
    name: "Amit & Priya Sharma",
    role: "Homeowners",
    company: "The Crest Residences",
    review: "Working with M.A. Interiors & Exteriors was a seamless experience. From the initial 3D plans to the final delivery, their professionalism and eye for luxury finishes was unmatched. They transformed our standard apartment into an architectural magazine masterwork.",
    rating: 5,
    location: "Mira Road East",
  },
  {
    name: "Vikram Singhal",
    role: "CEO",
    company: "Singhal Logistics",
    review: "Their turnkey office design capability is exceptional. The project was delivered on time, within budget, and has significantly boosted our workforce productivity. Highly recommended for commercial design.",
    rating: 5,
    location: "Bandra Kurla Complex",
  },
  {
    name: "Meera & Rohan Joshi",
    role: "Fashion Designer",
    company: "Joshi Atelier",
    review: "We wanted a home that feels like a resort. M.A. Interiors delivered exactly that—a peaceful, warm, clutter-free sanctuary. The custom woodwork in the wardrobes and kitchen is premium.",
    rating: 5,
    location: "Mira Road East",
  },
  {
    name: "Rajesh Malhotra",
    role: "Managing Director",
    company: "Prestige Group",
    review: "M.A. Interiors designed a state-of-the-art office that reflects our brand's forward-looking philosophy. Outstanding spatial planning and lighting indices.",
    rating: 5,
    location: "Bandra West",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="bg-[#F8F7F4] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="font-sans text-[10px] text-[#A67C52] tracking-[0.4em] uppercase mb-4 block">
            Verified Reviews
          </span>
          <MaskReveal className="font-serif text-4xl sm:text-6xl text-[#111111] leading-tight tracking-wide mb-8 justify-center">
            Atelier Endorsements.
          </MaskReveal>

          {/* Google Ratings Showcase Box */}
          <div className="inline-flex flex-col items-center bg-[#ECE8E2] border border-[#ECE8E2]/60 px-8 py-6 rounded-lg mt-6">
            <span className="font-sans text-[10px] tracking-wider uppercase text-[#555555] mb-2">
              Google Customer Reviews Rating
            </span>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-serif text-3xl font-semibold text-[#111111]">4.6</span>
              <div className="flex text-[#A67C52]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? "fill-[#A67C52]" : "fill-transparent text-[#A67C52]"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="font-sans text-[9px] tracking-widest text-[#555555] uppercase">
              Based on 120+ Verified Submissions
            </span>
          </div>
        </div>

        {/* Testimonials List (Editorial Magazine Block structure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((test, index) => (
            <GSAPReveal
              key={index}
              direction="up"
              delay={index * 0.1}
              duration={0.8}
            >
              <div className="bg-white p-8 md:p-10 rounded-lg border border-[#ECE8E2] shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-6 right-6 text-[#A67C52]/5 pointer-events-none">
                  <Quote className="w-12 h-12 fill-[#A67C52]" />
                </div>
                <div>
                  <div className="flex text-[#A67C52] gap-1 mb-6">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#A67C52]" />
                    ))}
                  </div>
                  <p className="font-serif text-sm italic text-[#555555] leading-relaxed mb-8">
                    "{test.review}"
                  </p>
                </div>
                <div className="border-t border-[#ECE8E2] pt-4 mt-auto">
                  <h4 className="font-sans text-xs tracking-wider text-[#111111] font-semibold uppercase">
                    {test.name}
                  </h4>
                  <p className="font-sans text-[9px] tracking-widest text-[#555555] uppercase mt-1">
                    {test.role} • {test.company} ({test.location})
                  </p>
                </div>
              </div>
            </GSAPReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
