"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { MaskReveal } from "@/components/animations/mask-reveal";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const mockFAQs: FAQItem[] = [
  {
    question: "What is your typical project workflow?",
    answer: "Our workflow is structured into 4 stages: (1) Initial briefing and layout drafting, (2) Detailed 3D rendering and material specification, (3) On-site masonry, MEP, and carpentry execution, and (4) Furniture styling and final turnkey handover.",
    category: "Process",
  },
  {
    question: "Do you offer turnkey execution services?",
    answer: "Yes, we are a complete turnkey design studio. This means we handle everything from civil demolition, electrical planning, plumbing, false ceiling work, to custom carpentry, loose furniture fabrication, and site cleaning. You deal with a single agency.",
    category: "General",
  },
  {
    question: "Do you offer a material warranty?",
    answer: "Absolutely. We stand behind our craftsmanship. We offer a 5-year comprehensive warranty on all customized modular cabinetry, wardrobes, kitchen fittings, and engineered structural partitions.",
    category: "Residential",
  },
  {
    question: "Where is your furniture manufactured?",
    answer: "All customized woodwork, paneling, modular shutters, and wardrobes are fabricated at our proprietary wood workshop. This enables us to use German machinery, premium glues, and select natural veneers under controlled structural settings.",
    category: "General",
  },
  {
    question: "Do you charge for the initial consultation?",
    answer: "No. Our initial spatial brief and site audit is complimentary. This helps us inspect structural variables, measure dimensions, and outline a realistic cost roadmap before committing.",
    category: "Billing",
  },
];

export default function FAQsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-[#F0F4F8] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="font-sans text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block">
            Common Inquiries
          </span>
          <MaskReveal className="font-serif text-4xl sm:text-6xl text-[#0B1B3D] leading-tight tracking-wide mb-8 justify-center">
            Studio FAQs.
          </MaskReveal>
        </div>

        {/* FAQs Accordion */}
        <div className="flex flex-col border-t border-[#E2E8F0]">
          {mockFAQs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={idx} className="border-b border-[#E2E8F0]">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-6 flex justify-between items-center text-left text-[#0B1B3D] hover:text-[#D4AF37] transition-colors focus:outline-none"
                >
                  <div className="flex flex-col gap-1.5 pr-6">
                    <span className="font-sans text-[8px] text-[#D4AF37] tracking-wider uppercase font-semibold">
                      {faq.category}
                    </span>
                    <span className="font-serif text-md sm:text-lg tracking-wide leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className="shrink-0 text-[#D4AF37] p-1 border border-[#E2E8F0] rounded-full">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 font-sans text-xs text-[#475569] leading-relaxed max-w-2xl pr-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
