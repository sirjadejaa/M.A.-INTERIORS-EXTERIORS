"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { subscribeToNewsletter } from "@/actions/newsletter";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setStatus("success");
        setEmail("");
        setMessage(result.message);
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A192F] text-[#F0F4F8] pt-20 pb-10 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Company Intro & Newsletter */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="mb-8">
            <Link href="/" className="flex flex-col group mb-6">
              <span className="font-serif text-3xl font-light tracking-[0.2em] text-[#F0F4F8] group-hover:text-[#D4AF37] transition-colors">
                Turk
              </span>
              <span className="font-sans text-[8px] tracking-[0.4em] text-[#E2E8F0]/60 uppercase group-hover:text-[#D4AF37] transition-colors">
                Interiors
              </span>
            </Link>
            <p className="text-[#E2E8F0]/70 text-sm font-light max-w-sm leading-relaxed mb-6 font-sans">
              Bespoke, turnkey architectural planning and luxury interior execution. Crafted for sophisticated clients across residential and commercial spaces.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-[10px] text-[#D4AF37] tracking-[0.3em] uppercase mb-4">
              Join Our Atelier Newsletter
            </h4>
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 pb-2 text-xs tracking-wider uppercase text-[#F0F4F8] placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors font-sans"
                required
              />
              <button
                type="submit"
                className="absolute right-0 bottom-2 text-[#E2E8F0] hover:text-[#D4AF37] transition-colors"
                aria-label="Subscribe"
                disabled={status === "loading"}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {message && (
              <p
                className={`text-[10px] tracking-wider uppercase mt-3 font-sans ${
                  status === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="lg:col-span-3 lg:col-start-7">
          <h4 className="font-serif text-[#D4AF37] text-md tracking-wider mb-6">
            The Studio
          </h4>
          <ul className="flex flex-col gap-3 font-sans text-xs tracking-wide">
            <li>
              <Link href="/about" className="text-[#E2E8F0]/80 hover:text-[#D4AF37] transition-colors">
                Founder Story
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-[#E2E8F0]/80 hover:text-[#D4AF37] transition-colors">
                Portfolio Work
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-[#E2E8F0]/80 hover:text-[#D4AF37] transition-colors">
                Design Services
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-[#E2E8F0]/80 hover:text-[#D4AF37] transition-colors">
                Visual Gallery
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="text-[#E2E8F0]/80 hover:text-[#D4AF37] transition-colors">
                Studio FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="lg:col-span-3">
          <h4 className="font-serif text-[#D4AF37] text-md tracking-wider mb-6">
            Contact
          </h4>
          <ul className="flex flex-col gap-4 font-sans text-xs text-[#E2E8F0]/80">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Pune, Maharashtra, India
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>+91 93694 17131</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>info@turkinteriors.in</span>
            </li>
            <li className="flex gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-white/10 rounded-full hover:border-[#D4AF37] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-[#E2E8F0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-white/10 rounded-full hover:border-[#D4AF37] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 text-[#E2E8F0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-[#E2E8F0]/40 font-sans uppercase gap-4">
        <span>
          © {currentYear} Turk Interiors. All rights reserved.
        </span>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-[#D4AF37]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#D4AF37]">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
