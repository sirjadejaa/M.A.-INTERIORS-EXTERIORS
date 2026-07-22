import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MaskReveal } from "@/components/animations/mask-reveal";
import { GSAPReveal } from "@/components/animations/gsap-reveal";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Calendar, User } from "lucide-react";

export const metadata = {
  title: "Design Atelier Journal | Turk Interiors",
  description:
    "Read our luxury design journal containing trends in lighting warmth indices, marble selections, and turnkey structural insights.",
};

const mockBlogs = [
  {
    slug: "principles-of-warm-minimalism",
    title: "The Principles of Warm Minimalism in Modern Homes",
    excerpt: "Discover how to blend clean lines with rich textures and warm tones to create a space that feels both modern and deeply welcoming.",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
    date: "July 12, 2026",
    category: "Design Philosophy",
    authorName: "Turk Team",
  },
  {
    slug: "architectural-lighting-indices",
    title: "Understanding Architectural Lighting Warmth Indices",
    excerpt: "Lighting defines how materials feel. We break down the differences between kelvin temperatures and how to design smart lighting.",
    coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800",
    date: "June 28, 2026",
    category: "Lighting Guide",
    authorName: "Turk Team",
  },
];

export default async function BlogPage() {
  let blogs: any[] = [];
  try {
    blogs = await prisma.blog.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to query blogs from server. Rendering fallbacks.");
  }

  // Fallback to mock data if empty
  const activeBlogs = blogs.length > 0 ? blogs : mockBlogs;

  return (
    <div className="bg-[#F0F4F8] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className="font-sans text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block">
            Atelier Chronicles
          </span>
          <MaskReveal className="font-serif text-4xl sm:text-6xl text-[#0B1B3D] leading-tight tracking-wide mb-8 max-w-3xl">
            The Design Journal.
          </MaskReveal>
        </div>

        {/* Editorial Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {activeBlogs.map((blog, idx) => (
            <GSAPReveal
              key={blog.slug}
              direction="up"
              delay={idx * 0.15}
              duration={0.8}
            >
              <article className="group flex flex-col h-full bg-white border border-[#E2E8F0] rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full">
                  {/* Image wrapper */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={blog.coverImage || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800"}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 600px) 100vw, 600px"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>

                  {/* Metadata & Copy */}
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-[#475569]/60 text-[9px] uppercase tracking-widest font-sans mb-4">
                        <span className="text-[#D4AF37] font-semibold">{blog.category}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {blog.date || "July 19, 2026"}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-[#0B1B3D] tracking-wide mb-4 leading-snug group-hover:text-[#D4AF37] transition-colors">
                        {blog.title}
                      </h3>

                      <p className="font-sans text-xs text-[#475569] leading-relaxed mb-6">
                        {blog.excerpt}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold group-hover:text-[#0B1B3D] transition-colors mt-auto">
                      Read Journal
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </article>
            </GSAPReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
