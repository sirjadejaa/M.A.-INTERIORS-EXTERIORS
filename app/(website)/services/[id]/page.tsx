import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";

// Mock data as fallback
const mockServices = [
  {
    slug: "residential-interior",
    title: "Residential Interior",
    description: "Bespoke, luxury home interiors crafted for sophisticated living.",
    longDesc: "We design and execute custom residential interiors that combine visual grandeur with supreme functionality. From high-end villas to luxury apartments, our turnkey process handles layout planning, architectural lighting, material curation, custom furniture fabrication, and precise onsite installation.",
    coverImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
    features: [
      "Turnkey project management (Design to Handover)",
      "Proprietary carpentry workshop for custom furnishings",
      "5-Year comprehensive warranty on carpentry",
      "Integrated architectural lighting plans",
      "Curated luxury material palettes",
    ],
    process: [
      { step: "01", title: "Brief & Space Planning", desc: "Detailed discussion on spacing requirements, lifestyle constraints, and architectural layout options." },
      { step: "02", title: "Materialisation & 3D Render", desc: "Selecting wood veneer textures, marbles, fittings, and preparing photo-realistic 3D designs." },
      { step: "03", title: "Site Execution", desc: "Managing electrical, plumbing, masonry, ceiling works, and modular installation with rigorous quality checks." },
      { step: "04", title: "Handover", desc: "Complete deep cleaning, furniture styling, architectural detailing, and keys handover." },
    ],
  },
  {
    slug: "commercial-interior",
    title: "Commercial Interior",
    description: "Sophisticated brand environments and premium retail spaces.",
    longDesc: "We build commercial environments that represent the identity of luxury brands and enterprises. Our team specializes in designing high-traffic showrooms, executive lounges, boutique hotels, and upscale dining environments that maximize spatial flow, acoustic performance, and functional elegance.",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    features: [
      "Brand-aligned corporate architecture",
      "Double-glazed acoustic partitions",
      "High-traffic commercial surface specifications",
      "Safety and regulatory code compliance",
      "Turnkey fit-out execution",
    ],
    process: [
      { step: "01", title: "Brand Identity Consultation", desc: "Understanding the brand values, customer flows, and technical requirements." },
      { step: "02", title: "Layout Optimization", desc: "Zoning layouts for workstations, lounges, and meeting zones with safety compliance." },
      { step: "03", title: "Fast-Track Construction", desc: "Execution of flooring, partitioning, MEP framework on scheduled night shifts to ensure speed." },
      { step: "04", title: "Turnkey Launch", desc: "Final inspections, system integration, HVAC check, and operational handover." },
    ],
  },
  {
    slug: "office-design",
    title: "Office Design",
    description: "Modern, ergonomic workspace architecture to foster productivity.",
    longDesc: "Transform your workspace into an inspiring hub of efficiency and creative focus. We combine ergonomic furnishings, acoustic optimization, and premium corporate branding to construct state-of-the-art office ecosystems that your team and clients will love.",
    coverImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200",
    features: [
      "Ergonomic furniture layouts",
      "Acoustic felt wall paneling",
      "Structured data cabling plans",
      "Custom brand lounge designs",
    ],
    process: [
      { step: "01", title: "Zoning Plan", desc: "Laying out circulation grids, cabins, and collaborative open desks." },
      { step: "02", title: "Acoustic Design", desc: "Specifying double-pane doors and sound attenuation ceilings." },
      { step: "03", title: "Integrated MEP", desc: "Integrating fire-fighting, AC ducting, and power grids." },
      { step: "04", title: "Delivery", desc: "Acoustic checks, functional system validation, and handover." },
    ],
  },
  {
    slug: "exterior-design",
    title: "Exterior Design",
    description: "Magnificent facade engineering and luxury outdoor spaces.",
    longDesc: "A building's facade is its visual signature. We design and construct bespoke exterior surfaces using premium cladding, composite panelling, stone textures, and architectural lighting to elevate residential and commercial structures to international design standards.",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
    features: [
      "Weatherproof facade cladding systems",
      "Architectural exterior lighting layouts",
      "Terrace and landscape engineering",
      "Structural facade upgrades",
    ],
    process: [
      { step: "01", title: "Cladding Selection", desc: "Choosing composite panels, HPL, terracotta tiles, or natural stone." },
      { step: "02", title: "Lighting Integration", desc: "Setting up waterproof spot lighting and facade linear strips." },
      { step: "03", title: "Structural Build", desc: "Setting up metal framings, insulation blocks, and cladding layers." },
      { step: "04", title: "Handover", desc: "Structural integrity assessment, lighting alignment, and cleanup." },
    ],
  },
  {
    slug: "renovation",
    title: "Renovation",
    description: "Complete structural retrofitting and modern interior remodelling.",
    longDesc: "Breathing new life into vintage and outdated structures requires deep engineering knowledge. We offer complete turnkey renovation, stripping interiors down to the brickwork to reconstruct plumbing, electrical layout, and luxury spaces with zero compromises on safety.",
    coverImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200",
    features: [
      "Complete civil demolition management",
      "Re-wiring and pipe network design",
      "Dampness treatment",
      "Fixed pricing contracts",
    ],
    process: [
      { step: "01", title: "Engineering Audit", desc: "Inspecting pillars, beams, plumbing moisture, and leakage areas." },
      { step: "02", title: "Redesign Blueprint", desc: "Drafting layout plans to break non-structural walls and widen layouts." },
      { step: "03", title: "System Overhaul", desc: "Replacing old wiring, setting up concealed plumbing lines, and tiling." },
      { step: "04", title: "Turnkey Finish", desc: "Drywall plastering, modular installation, premium painting, and keys release." },
    ],
  },
];

export async function generateStaticParams() {
  return mockServices.map((s) => ({ id: s.slug }));
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Attempt database query, fallback to mock data
  let service: any = null;
  try {
    const dbService = await prisma.service.findUnique({
      where: { slug: id },
    });
    if (dbService) {
      service = {
        ...dbService,
        process: mockServices.find((m) => m.slug === id)?.process || [],
      };
    }
  } catch (error) {
    console.error("DB Service fetch failed, using mock data fallback.");
  }

  if (!service) {
    service = mockServices.find((m) => m.slug === id);
  }

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-[#F8F7F4] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb link */}
        <Link
          href="/services"
          className="font-sans text-[10px] uppercase tracking-widest text-[#A67C52] hover:underline mb-8 inline-block"
        >
          ← Back to services
        </Link>

        {/* Title Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-4xl sm:text-6xl text-[#111111] leading-tight tracking-wide mb-6">
              {service.title}
            </h1>
            <p className="font-sans text-md text-[#555555] leading-relaxed max-w-2xl">
              {service.longDesc || service.description}
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end mt-4 lg:mt-0">
            <Link
              href="/contact"
              className="flex items-center gap-3 px-8 py-4 bg-[#A67C52] text-white text-[11px] uppercase tracking-widest font-sans rounded transition-all duration-300 hover:bg-[#A67C52]/90 shadow-lg"
            >
              Book Design Brief
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Large Cover Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border border-[#ECE8E2] mb-20 shadow-sm">
          <Image
            src={service.coverImage}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-28">
          {/* Features Column */}
          <div className="lg:col-span-5">
            <h3 className="font-serif text-2xl text-[#111111] mb-8 border-b border-[#ECE8E2] pb-4">
              Atelier Standards
            </h3>
            <ul className="flex flex-col gap-4">
              {(service.features || []).map((feat: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#555555] leading-relaxed">
                  <CheckCircle className="w-5 h-5 text-[#A67C52] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process Timeline Column */}
          <div className="lg:col-span-7">
            <h3 className="font-serif text-2xl text-[#111111] mb-8 border-b border-[#ECE8E2] pb-4">
              Our Turnkey Process
            </h3>
            <div className="flex flex-col gap-8">
              {(service.process || []).map((step: any, idx: number) => (
                <div key={idx} className="flex gap-6 items-start">
                  <span className="font-serif text-xl text-[#A67C52] bg-[#ECE8E2] w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="font-serif text-lg text-[#111111] mb-2">{step.title}</h4>
                    <p className="font-sans text-xs text-[#555555] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
