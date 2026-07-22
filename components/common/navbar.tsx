"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ArrowRight } from "lucide-react";
import { MegaMenu } from "./mega-menu";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? "bg-[#F0F4F8]/90 backdrop-blur-md border-b border-[#E2E8F0] py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex flex-col group z-50">
            <span className="font-serif text-2xl md:text-3xl font-light tracking-[0.2em] text-[#0A192F] transition-colors group-hover:text-[#D4AF37]">
              Turk
            </span>
            <span className="font-sans text-[7px] md:text-[8px] tracking-[0.4em] text-[#475569] uppercase transition-colors group-hover:text-[#D4AF37]">
              Interiors
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-sans text-[11px] tracking-[0.25em] text-[#475569] hover:text-[#D4AF37] uppercase transition-colors relative py-1"
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4AF37]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {session?.user && (
              <div className="flex items-center gap-4 border-l border-[#E2E8F0] pl-6">
                <Link
                  href="/admin/dashboard"
                  className="font-sans text-[11px] tracking-[0.25em] text-[#D4AF37] uppercase hover:underline"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="font-sans text-[11px] tracking-[0.25em] text-red-600 uppercase hover:underline"
                >
                  Sign Out
                </button>
              </div>
            )}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-[#0A192F] hover:text-[#D4AF37] transition-colors rounded-full border border-[#E2E8F0] hover:border-[#D4AF37]/40"
              aria-label="Toggle Mega Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              href="/contact"
              className="hidden sm:flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0A192F] text-[#F0F4F8] hover:bg-[#D4AF37] text-[10px] uppercase tracking-widest font-sans rounded transition-all group shadow-sm hover:shadow"
            >
              Inquire Now
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {isOpen && <MegaMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
