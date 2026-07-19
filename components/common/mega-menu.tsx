"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ArrowRight, Phone, MapPin, Mail } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const, staggerChildren: 0.05, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  const serviceCategories = [
    {
      title: "Residential",
      links: [
        { name: "Luxury Villas", href: "/services/residential-interior" },
        { name: "Penthouses", href: "/services/residential-interior" },
        { name: "Modular Kitchens", href: "/services/residential-interior" },
        { name: "Wardrobes & Closets", href: "/services/residential-interior" },
      ],
    },
    {
      title: "Commercial",
      links: [
        { name: "Corporate Offices", href: "/services/office-design" },
        { name: "Retail Showrooms", href: "/services/commercial-interior" },
        { name: "Hospitality Lounges", href: "/services/commercial-interior" },
      ],
    },
    {
      title: "Exteriors & Build",
      links: [
        { name: "Facade Cladding", href: "/services/exterior-design" },
        { name: "Landscape Architecture", href: "/services/exterior-design" },
        { name: "Complete Renovations", href: "/services/renovation" },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-40 bg-[#161616] text-[#F8F7F4] flex flex-col pt-24 pb-8 px-6 md:px-12 lg:px-24 overflow-y-auto"
    >
      <div className="flex justify-between items-center pb-8 border-b border-white/10">
        <span className="font-sans text-[10px] tracking-[0.4em] text-[#A67C52] uppercase">
          M.A. Interiors & Exteriors / Studio Lotus Inspiration
        </span>
        <button
          onClick={onClose}
          className="p-2 text-[#ECE8E2] hover:text-[#A67C52] transition-colors rounded-full border border-white/10 hover:border-[#A67C52]/40"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 flex-grow">
        {/* Categories Section */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCategories.map((category, idx) => (
            <motion.div variants={itemVariants} key={idx} className="flex flex-col">
              <h3 className="font-serif text-[#A67C52] text-lg tracking-wider mb-6 border-b border-white/5 pb-2">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {category.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="font-sans text-[#ECE8E2] hover:text-[#A67C52] transition-all text-sm tracking-wide flex items-center group"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A67C52] transition-all group-hover:w-full" />
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#A67C52]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Featured Showcase Project & Contact */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 flex flex-col justify-between bg-[#222222] p-8 rounded-lg border border-white/5"
        >
          <div className="mb-8">
            <h4 className="font-sans text-[10px] text-[#A67C52] tracking-widest uppercase mb-4">
              Featured Project
            </h4>
            <div className="relative aspect-[16/10] overflow-hidden rounded mb-4">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400"
                alt="Royal Horizon Villa"
                fill
                sizes="(max-width: 400px) 100vw, 400px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h5 className="font-serif text-[#F8F7F4] text-md mb-2">
              The Royal Horizon Villa
            </h5>
            <Link
              href="/projects"
              onClick={onClose}
              className="text-xs text-[#A67C52] flex items-center gap-1 hover:underline"
            >
              View Project <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/5 text-[#ECE8E2] text-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>+91 9699232714</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>info@mainteriors.in</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>Mira Road East, Maharashtra, IN</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between text-[#ECE8E2]/40 text-[10px] tracking-widest font-sans uppercase gap-4">
        <span>© 2026 M.A. Interiors & Exteriors. All rights reserved.</span>
        <div className="flex gap-6">
          <Link href="/privacy" onClick={onClose} className="hover:text-[#A67C52]">
            Privacy Policy
          </Link>
          <Link href="/terms" onClick={onClose} className="hover:text-[#A67C52]">
            Terms of Service
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
