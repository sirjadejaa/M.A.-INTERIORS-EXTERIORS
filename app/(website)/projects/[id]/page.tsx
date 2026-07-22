import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Calendar, Compass, Clipboard } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";

const mockProjects = [
  {
    id: "royal-horizon-villa",
    title: "The Royal Horizon Villa",
    description: "A breathtaking residential villa overlooking the Arabian Sea, featuring handcrafted furniture and dynamic lighting systems.",
    longDesc: "The Royal Horizon Villa is a testament to pure bespoke luxury. Built over an expansive 7,500 square feet in Mumbai's coastal stretch, this multi-generation home is designed to blur the boundaries between indoor comfort and outdoor vistas. Every piece of furniture was custom engineered at our proprietary workshop, using ethically sourced Italian oak, brushed gold brass details, and hand-woven silk fabrics. Architectural lighting runs on a smart DALI automation framework, shifting tone from cool morning daylight to warm twilight gold.",
    category: "Residential",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600",
    ],
    location: "Bandra West, Mumbai",
    client: "Dr. Aditya Singhania",
    area: "7,500 sq ft",
    materials: ["Calacatta Gold Marble", "Brushed Brass Details", "Custom Walnut Millwork"],
    duration: "8 Months",
    testimonial: "Turk Interiors transformed our dream of a sanctuary into a living reality. The attention to detail is spectacular, matching anything I've seen globally.",
    clientName: "Dr. Aditya Singhania",
    clientRole: "Senior Cardiologist",
    beforeImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200",
    afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
  },
  {
    id: "prestige-commercial",
    title: "Prestige Commercial Hub",
    description: "An upscale corporate headquarters designed for collaborative workflow and premium brand presentation.",
    longDesc: "Commissioned by a leading real estate conglomerate, the Prestige Commercial Hub is a 12,000 square foot modern office setup. The core design principles centered around transparency, sound attenuation, and micro-climate control. Using double-glazed acoustic glass partitions and custom acoustic felt ceiling panels, we achieved noise reduction index ratings suitable for private boardrooms. Elements of nature are woven throughout via automated green living walls and indoor water features.",
    category: "Commercial",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600",
    ],
    location: "Bandra Kurla Complex, Mumbai",
    client: "Prestige Group India",
    area: "12,000 sq ft",
    materials: ["Acoustic Felt Cladding", "Terrazzo Flooring", "Anodized Aluminum"],
    duration: "10 Months",
    testimonial: "Turk Interiors designed a state-of-the-art office that reflects our brand's forward-looking philosophy. Outstanding spatial management.",
    clientName: "Rajesh Malhotra",
    clientRole: "Managing Director",
    beforeImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200",
    afterImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
  },
  {
    id: "minimalist-loft",
    title: "Minimalist Loft Penthouse",
    description: "A calm, neutral-toned penthouse featuring floating stairs and seamless cementitious finishes.",
    longDesc: "Located in the heart of Mumbai, this penthouse layout embraces warm minimalism. Spacial volumes are optimized by utilizing floating concrete slabs for the central staircase and micro-cement coatings for floors and bathrooms. Storage is entirely integrated into flush wall panels to maintain clean, uninterrupted architectural lines.",
    category: "Residential",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600",
    ],
    location: "Mira Road East, Maharashtra",
    client: "Meera & Rohan Joshi",
    area: "3,200 sq ft",
    materials: ["Micro-cement Finish", "Smoked Oak Wood", "Linen Wallcoverings"],
    duration: "5 Months",
    testimonial: "We wanted a home that feels like a resort. Turk Interiors delivered exactly that—a peaceful, clutter-free sanctuary.",
    clientName: "Meera Joshi",
    clientRole: "Fashion Designer",
    beforeImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200",
    afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
  },
];

export async function generateStaticParams() {
  return mockProjects.map((p) => ({ id: p.id }));
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let project: any = null;
  try {
    project = await prisma.project.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to query project by id, using mock fallback.");
  }

  if (!project) {
    project = mockProjects.find((p) => p.id === id);
  }

  if (!project) {
    notFound();
  }

  // Set default images if DB doesn't have it
  const beforeImage = project.beforeImage || "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200";
  const afterImage = project.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200";

  // Convert SQLite string properties back to arrays if needed
  const materialsList: string[] = typeof project.materials === "string"
    ? (project.materials.startsWith("[") ? JSON.parse(project.materials) : project.materials.split(","))
    : (project.materials || ["Bespoke Veneer Cladding", "Italian Stone Finishes", "Smart Home Automation"]);

  const imagesList: string[] = typeof project.images === "string"
    ? (project.images.startsWith("[") ? JSON.parse(project.images) : project.images.split(","))
    : (project.images || []);

  return (
    <div className="bg-[#F0F4F8] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <Link
          href="/projects"
          className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] hover:underline mb-8 inline-block"
        >
          ← Back to creations
        </Link>

        {/* Title Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          <div className="lg:col-span-8">
            <span className="font-sans text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block">
              {project.category} Collection
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#0B1B3D] leading-tight tracking-wide mb-6">
              {project.title}
            </h1>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end mt-4 lg:mt-0">
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#475569] bg-[#E2E8F0] px-4 py-2 border border-[#E2E8F0]/60 rounded-full">
              {project.location}
            </span>
          </div>
        </div>

        {/* Large Cinematic Hero Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border border-[#E2E8F0] mb-16 shadow-sm">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Technical Specification Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-[#E2E8F0] mb-16">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <span className="font-sans text-[9px] text-[#E2E8F0]/90 uppercase bg-[#D4AF37] px-1.5 py-0.5 rounded-sm block mb-1 w-max">
                Area Dimensions
              </span>
              <span className="font-sans text-xs text-[#0B1B3D] font-semibold">{project.area || "4,500 sq ft"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <span className="font-sans text-[9px] text-[#E2E8F0]/90 uppercase bg-[#D4AF37] px-1.5 py-0.5 rounded-sm block mb-1 w-max">
                Duration
              </span>
              <span className="font-sans text-xs text-[#0B1B3D] font-semibold">{project.duration || "6 Months"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clipboard className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <span className="font-sans text-[9px] text-[#E2E8F0]/90 uppercase bg-[#D4AF37] px-1.5 py-0.5 rounded-sm block mb-1 w-max">
                Atelier Client
              </span>
              <span className="font-sans text-xs text-[#0B1B3D] font-semibold">{project.client || "Confidential Client"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <span className="font-sans text-[9px] text-[#E2E8F0]/90 uppercase bg-[#D4AF37] px-1.5 py-0.5 rounded-sm block mb-1 w-max">
                Location Pin
              </span>
              <span className="font-sans text-xs text-[#0B1B3D] font-semibold">{project.location}</span>
            </div>
          </div>
        </div>

        {/* Narrative Description & Materials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-8">
            <h3 className="font-serif text-2xl text-[#0B1B3D] mb-6">Project Narrative</h3>
            <p className="font-sans text-sm text-[#475569] leading-relaxed mb-6">
              {project.longDesc || project.description}
            </p>
          </div>
          <div className="lg:col-span-4 bg-white p-8 rounded-lg border border-[#E2E8F0] h-max">
            <h3 className="font-serif text-lg text-[#0B1B3D] mb-4">Material Curation</h3>
            <ul className="flex flex-col gap-3 font-sans text-xs text-[#475569]">
              {materialsList.map((mat: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Before / After Slider Section */}
        <div className="mb-24">
          <h3 className="font-serif text-3xl text-center text-[#0B1B3D] mb-12">
            Turnkey Metamorphosis
          </h3>
          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Before Construction"
              afterLabel="Turnkey Handover"
            />
          </div>
        </div>

        {/* Image Gallery */}
        {imagesList && imagesList.length > 0 && (
          <div className="mb-24">
            <h3 className="font-serif text-3xl text-[#0B1B3D] mb-12 border-b border-[#E2E8F0] pb-4">
              Visual Chronicle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {imagesList.map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#E2E8F0]">
                  <Image
                    src={img}
                    alt={`Chronicle Image ${idx + 1}`}
                    fill
                    sizes="(max-width: 600px) 100vw, 600px"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Client Testimonial Block */}
        {project.testimonial && (
          <div className="bg-[#E2E8F0] p-12 rounded-lg border border-[#E2E8F0]/60 text-center flex flex-col items-center max-w-4xl mx-auto">
            <span className="font-sans text-[9px] text-[#D4AF37] tracking-widest uppercase mb-4 block">
              Atelier Testimonial
            </span>
            <blockquote className="font-serif italic text-xl sm:text-2xl text-[#0B1B3D] leading-relaxed mb-6">
              "{project.testimonial}"
            </blockquote>
            <cite className="not-italic">
              <span className="font-sans text-xs tracking-widest text-[#0B1B3D] font-semibold uppercase block">
                {project.clientName || project.client}
              </span>
              {project.clientRole && (
                <span className="font-sans text-[9px] tracking-widest text-[#475569] uppercase">
                  {project.clientRole}
                </span>
              )}
            </cite>
          </div>
        )}

      </div>
    </div>
  );
}
