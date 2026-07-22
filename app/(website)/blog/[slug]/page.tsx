import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

const mockBlogs = [
  {
    slug: "principles-of-warm-minimalism",
    title: "The Principles of Warm Minimalism in Modern Homes",
    excerpt: "Discover how to blend clean lines with rich textures and warm tones to create a space that feels both modern and deeply welcoming.",
    content: `Warm minimalism represents the natural evolution of contemporary interior architecture. For years, minimalist layouts were criticized for being sterile, cold, and unlived-in. Warm minimalism changes this paradigm completely by emphasizing tactile richness, neutral warmth, and organic honesty.
    
    ### 1. Tactile Curation
    To prevent a clean room from feeling cold, you must rely on texture. Instead of flat plaster walls, we utilize textured clay plasters, microcement, and linen wallcoverings. These materials catch the light differently throughout the day, bringing soft shadows and biological depth to the walls.
    
    ### 2. The Power of Warm Tones
    Move away from stark bluish-whites. We recommend off-whites that have subtle red, yellow, or grey undertones (like HSL 48, 14%, 96%). These colors respond beautifully to warm 2700K lighting, creating a relaxing sanctuary when night falls.
    
    ### 3. Integrated Millwork
    A key rule of warm minimalism is clutter elimination. Generic freestanding storage units disrupt spatial flow. We construct custom floor-to-ceiling cabinetry that aligns flush with wall planes, wrapping spaces in clean wood panels that conceal operational utility.`,
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
    date: "July 12, 2026",
    category: "Design Philosophy",
    authorName: "Turk Team",
  },
  {
    slug: "architectural-lighting-indices",
    title: "Understanding Architectural Lighting Warmth Indices",
    excerpt: "Lighting defines how materials feel. We break down the differences between kelvin temperatures and how to design smart lighting.",
    content: `Lighting is the silent orchestrator of luxury. You can procure the finest Calacatta marble and hand-rubbed veneers, but if they are illuminated by generic, high-glare downlights, they will lose their luxury feel.
    
    ### 1. The Kelvin Warmth Scale
    For high-end residential interiors, we advocate for a strict 2700K (Kelvin) color temperature for all primary and secondary architectural lighting. 2700K matches the warm, incandescent glow of sunset, triggering psychological relaxation. For dining areas or accent niches, we sometimes drop to 2400K or use dim-to-warm automation.
    
    ### 2. Indirect Illumination (Cove & Detail Lighting)
    Avoid throwing light directly downwards. Instead, bounce light off vertical wall surfaces or ceilings. Concealed LED linear strips inside false ceiling coves, drapery pockets, and wall-joinery details highlight material textures without exposing the source bulb.
    
    ### 3. Visual Glare Control
    We specify deep-regressed downlights with dark reflectors. These fixtures keep the light source hidden from normal sightlines, ensuring the space feels evenly illuminated without visible glare rings.`,
    coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
    date: "June 28, 2026",
    category: "Lighting Guide",
    authorName: "Turk Team",
  },
];

export async function generateStaticParams() {
  return mockBlogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let blog: any = null;
  try {
    blog = await prisma.blog.findUnique({
      where: { slug },
      include: { author: true },
    });
  } catch (error) {
    console.error("Failed to query blog detail from database. Using mock fallback.");
  }

  if (!blog) {
    // Attempt fallback to mock list
    const mock = mockBlogs.find((m) => m.slug === slug);
    if (mock) {
      blog = {
        ...mock,
        author: { name: mock.authorName },
      };
    }
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-[#F0F4F8] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/blog"
          className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] hover:underline mb-8 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal
        </Link>

        {/* Category & Date */}
        <div className="flex items-center gap-4 text-[#475569]/60 text-[9px] uppercase tracking-widest font-sans mb-4">
          <span className="text-[#D4AF37] font-semibold">{blog.category}</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {blog.date || new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            By {blog.author?.name || "Turk Interiors"}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-5xl text-[#0B1B3D] leading-tight tracking-wide mb-8">
          {blog.title}
        </h1>

        {/* Large Cover Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-[#E2E8F0] mb-12 shadow-sm">
          <Image
            src={blog.coverImage || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200"}
            alt={blog.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-stone max-w-none text-[#475569] font-sans text-sm leading-relaxed space-y-6">
          {blog.content.split("\n\n").map((para: string, idx: number) => {
            if (para.startsWith("###")) {
              return (
                <h3 key={idx} className="font-serif text-xl sm:text-2xl text-[#0B1B3D] pt-6 pb-2">
                  {para.replace("###", "").trim()}
                </h3>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            );
          })}
        </div>

      </div>
    </div>
  );
}
