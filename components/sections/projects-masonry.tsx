"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GSAPReveal } from "../animations/gsap-reveal";
import { ArrowRight } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  location: string;
}

// Initial mock projects in case of DB seed unavailability
const initialProjects: ProjectItem[] = [
  {
    id: "royal-horizon-villa",
    title: "The Royal Horizon Villa",
    category: "Residential",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    location: "Bandra West, Mumbai",
  },
  {
    id: "prestige-commercial",
    title: "Prestige Commercial Hub",
    category: "Commercial",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
    location: "Bandra Kurla Complex, Mumbai",
  },
  {
    id: "minimalist-loft",
    title: "Minimalist Loft Penthouse",
    category: "Residential",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
    location: "Mira Road East, Maharashtra",
  },
];

export function ProjectsMasonry() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Residential", "Commercial"];

  const filteredProjects =
    filter === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.category === filter);

  return (
    <section className="py-24 md:py-32 bg-[#F8F7F4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header and Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="font-sans text-[10px] text-[#A67C52] tracking-[0.4em] uppercase mb-4 block">
              Recent Portfolios
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#111111] tracking-wide">
              Selected Creations
            </h2>
          </div>

          {/* Luxury Tab Filters */}
          <div className="flex items-center gap-6 border-b border-[#ECE8E2] pb-2 font-sans text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative pb-2 uppercase tracking-widest transition-colors font-medium text-[10px] ${
                  filter === cat ? "text-[#A67C52]" : "text-[#555555] hover:text-[#111111]"
                }`}
              >
                {cat}
                {filter === cat && (
                  <motion.span
                    layoutId="projectFilterUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#A67C52]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-[#ECE8E2] bg-[#F8F7F4] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/projects/${project.id}`} data-cursor-text="Examine">
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 600px) 100vw, 600px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#161616]/10 group-hover:bg-[#161616]/30 transition-colors duration-500" />
                  </div>

                  {/* Metadata overlay or card body */}
                  <div className="p-8">
                    <span className="font-sans text-[8px] text-[#A67C52] tracking-widest uppercase block mb-2">
                      {project.category} • {project.location}
                    </span>
                    <h3 className="font-serif text-lg text-[#111111] group-hover:text-[#A67C52] transition-colors tracking-wide leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/projects"
            className="flex items-center gap-3 px-8 py-4 bg-[#161616] text-[#F8F7F4] hover:bg-[#A67C52] text-[10px] uppercase tracking-widest font-sans rounded transition-all group"
          >
            All Collections
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
