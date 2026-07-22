import React from "react";
import { prisma } from "@/lib/prisma";
import { ProjectsMasonry } from "@/components/sections/projects-masonry";
import { MaskReveal } from "@/components/animations/mask-reveal";

export const metadata = {
  title: "Our Collections & Portfolios | Turk Interiors",
  description:
    "Explore our dynamic portfolio showcasing luxury Bandra West villas, high-end commercial spaces, and minimalist penthouses in Mumbai.",
};

export default async function ProjectsPage() {
  // Query featured projects from Prisma to keep it fully dynamic
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to query projects in server, rendering fallback Masonry.");
  }

  return (
    <div className="bg-[#F0F4F8] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-12">
          <span className="font-sans text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block">
            Atelier Showcase
          </span>
          <MaskReveal className="font-serif text-4xl sm:text-6xl text-[#0B1B3D] leading-tight tracking-wide mb-8 max-w-3xl">
            Selected Creations.
          </MaskReveal>
        </div>

        {/* Dynamic Project Grid Section */}
        <ProjectsMasonry />

      </div>
    </div>
  );
}
