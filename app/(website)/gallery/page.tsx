"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MaskReveal } from "@/components/animations/mask-reveal";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

const mockGallery: GalleryItem[] = [
  {
    id: 1,
    title: "Minimalist Kitchen Detailing",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600",
  },
  {
    id: 2,
    title: "Executive Boardroom Acoustics",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
  },
  {
    id: 3,
    title: "Warm Timber Walk-In Closet",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600",
  },
  {
    id: 4,
    title: "Composite Facade Panelling",
    category: "Exterior",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600",
  },
  {
    id: 5,
    title: "Aesthetic Fluted Wall Panels",
    category: "Details",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600",
  },
  {
    id: 6,
    title: "Bespoke Brass Lighting Frame",
    category: "Details",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600",
  },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Residential", "Commercial", "Exterior", "Details"];

  const filteredItems =
    filter === "All"
      ? mockGallery
      : mockGallery.filter((item) => item.category === filter);

  return (
    <div className="bg-[#F8F7F4] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="font-sans text-[10px] text-[#A67C52] tracking-[0.4em] uppercase mb-4 block">
            Visual Atelier
          </span>
          <MaskReveal className="font-serif text-4xl sm:text-6xl text-[#111111] leading-tight tracking-wide mb-8 max-w-3xl">
            Material & Design Details.
          </MaskReveal>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-6 border-b border-[#ECE8E2] pb-4 mb-12 font-sans text-xs">
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
                  layoutId="galleryFilterUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#A67C52]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative group overflow-hidden rounded-lg border border-[#ECE8E2] bg-[#F8F7F4] shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative w-full aspect-auto min-h-[250px] overflow-hidden cursor-zoom-in" data-cursor-text="Zoom">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover group-hover:scale-102 transition-transform duration-500 rounded-t-lg"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <span className="text-[8px] text-[#A67C52] tracking-widest uppercase font-sans block mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-white font-serif text-sm tracking-wide">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
