import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MaskReveal } from "@/components/animations/mask-reveal";
import { GSAPReveal } from "@/components/animations/gsap-reveal";
import { ArrowRight, Home, Briefcase, Monitor, Layers, Hammer } from "lucide-react";

export const metadata = {
  title: "Specialized Services | Turk Interiors",
  description:
    "Explore our complete range of premium design services from Turnkey Residential build, Corporate Workspace, Facade Engineering to Custom Woodwork.",
};

const serviceItems = [
  {
    title: "Residential Interior",
    slug: "residential-interior",
    description: "Bespoke, luxury home interiors crafted for sophisticated living.",
    longDesc: "We design and execute custom residential interiors that combine visual grandeur with supreme functionality. From high-end villas to luxury apartments, our turnkey process handles layout planning, architectural lighting, material curation, custom furniture fabrication, and precise onsite installation.",
    coverImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800",
    icon: Home,
  },
  {
    title: "Commercial Interior",
    slug: "commercial-interior",
    description: "Sophisticated brand environments and premium retail spaces.",
    longDesc: "We build commercial environments that represent the identity of luxury brands and enterprises. Our team specializes in designing high-traffic showrooms, executive lounges, boutique hotels, and upscale dining environments that maximize spatial flow, acoustic performance, and functional elegance.",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
    icon: Briefcase,
  },
  {
    title: "Office Design",
    slug: "office-design",
    description: "Modern, ergonomic workspace architecture to foster productivity.",
    longDesc: "Transform your workspace into an inspiring hub of efficiency and creative focus. We combine ergonomic furnishings, acoustic optimization, and premium corporate branding to construct state-of-the-art office ecosystems that your team and clients will love.",
    coverImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800",
    icon: Monitor,
  },
  {
    title: "Exterior Design",
    slug: "exterior-design",
    description: "Magnificent facade engineering and luxury outdoor spaces.",
    longDesc: "A building's facade is its visual signature. We design and construct bespoke exterior surfaces using premium cladding, composite panelling, stone textures, and architectural lighting to elevate residential and commercial structures to international design standards.",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
    icon: Layers,
  },
  {
    title: "Renovation",
    slug: "renovation",
    description: "Complete structural retrofitting and modern interior remodelling.",
    longDesc: "Breathing new life into vintage and outdated structures requires deep engineering knowledge. We offer complete turnkey renovation, stripping interiors down to the brickwork to reconstruct plumbing, electrical layout, and luxury spaces with zero compromises on safety.",
    coverImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800",
    icon: Hammer,
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#F0F4F8] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-20">
          <span className="font-sans text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block">
            Atelier Portfolio
          </span>
          <MaskReveal className="font-serif text-4xl sm:text-6xl text-[#0B1B3D] leading-tight tracking-wide mb-8 max-w-3xl">
            Specialized Design Capabilities.
          </MaskReveal>
        </div>

        {/* Services List Layout (Editorial Magazine Row structure) */}
        <div className="flex flex-col gap-20">
          {serviceItems.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <GSAPReveal
                key={service.slug}
                direction="up"
                delay={index * 0.1}
                duration={0.8}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#E2E8F0] pb-16 last:border-b-0`}>
                  {/* Image container */}
                  <div
                    className={`lg:col-span-6 overflow-hidden rounded-lg border border-[#E2E8F0] relative aspect-[16/10] ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={service.coverImage}
                      alt={service.title}
                      fill
                      sizes="(max-width: 600px) 100vw, 600px"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Copy Area */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-center ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E2E8F0] text-[#D4AF37] flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#0B1B3D] mb-4">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs text-[#E2E8F0]/90 bg-[#D4AF37] inline-block self-start px-3 py-1 uppercase tracking-widest mb-6 rounded-sm">
                      Turnkey Solution
                    </p>
                    <p className="font-sans text-sm text-[#475569] leading-relaxed mb-8">
                      {service.longDesc}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-widest text-[#0B1B3D] hover:text-[#D4AF37] transition-colors group font-semibold"
                    >
                      Examine Service Blueprint
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </GSAPReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
