import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center text-center px-6">
      <span className="font-sans text-[10px] text-[#A67C52] tracking-[0.4em] uppercase mb-4 block animate-pulse">
        Error Code 404
      </span>
      <h1 className="font-serif text-5xl sm:text-7xl text-[#111111] tracking-wide mb-6">
        Space Not Found.
      </h1>
      <p className="font-sans text-xs sm:text-sm text-[#555555] max-w-sm leading-relaxed mb-12 uppercase tracking-widest">
        The architectural layout or path you requested does not exist in our atelier directory.
      </p>
      <Link
        href="/"
        className="flex items-center gap-3 px-8 py-4 bg-[#161616] text-[#F8F7F4] hover:bg-[#A67C52] text-[10px] uppercase tracking-widest font-sans rounded transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Return to Atelier
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
