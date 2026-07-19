import React from "react";
import { MaskReveal } from "@/components/animations/mask-reveal";
import { GSAPReveal } from "@/components/animations/gsap-reveal";
import { ArrowRight, Briefcase, MapPin, DollarSign } from "lucide-react";

export const metadata = {
  title: "Join Our Atelier | M.A. Interiors & Exteriors",
  description:
    "We are seeking talented, detail-oriented design minds and site engineering leaders to join our premium studio in Mumbai.",
};

const jobPositions = [
  {
    title: "Senior Interior Architect",
    department: "Design",
    location: "Mira Road East Studio",
    compensation: "Competitive (Based on Curation)",
    description: "Lead spatial layout creation, prepare photorealistic render briefs, coordinate custom lighting schemes, and select marble/veneer palettes for luxury residential projects.",
    requirements: [
      "5+ Years experience in luxury interior planning",
      "Proficient in AutoCAD, SketchUp, and V-Ray or Lumion",
      "Degree in Architecture or Interior Design",
    ],
  },
  {
    title: "Site Supervisor & MEP Coordinator",
    department: "Project Execution",
    location: "Mumbai On-site",
    compensation: "Industry Standard",
    description: "Manage onsite contractors, verify drawings against masonry, coordinate electrical and plumbing routing, and maintain strict material execution tolerances.",
    requirements: [
      "4+ Years managing turnkey residential sites",
      "Deep understanding of false ceiling framing and lighting loads",
      "Excellent communication and contractor management skills",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="bg-[#F8F7F4] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="font-sans text-[10px] text-[#A67C52] tracking-[0.4em] uppercase mb-4 block">
            We Are Hiring
          </span>
          <MaskReveal className="font-serif text-4xl sm:text-6xl text-[#111111] leading-tight tracking-wide mb-8 justify-center">
            Join the Atelier.
          </MaskReveal>
          <p className="font-sans text-xs text-[#555555] leading-relaxed max-w-lg mx-auto">
            We are always seeking detail-obsessed design consultants, millwork craftsheads, and structural field leaders who believe in material truth and structural excellence.
          </p>
        </div>

        {/* Job Listings */}
        <div className="flex flex-col gap-12 mb-20">
          {jobPositions.map((job, idx) => (
            <GSAPReveal key={idx} direction="up" delay={idx * 0.1} duration={0.8}>
              <div className="bg-white p-8 rounded-lg border border-[#ECE8E2] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-sans text-[8px] text-[#A67C52] tracking-widest uppercase bg-[#ECE8E2] px-2 py-0.5 rounded-sm">
                      {job.department}
                    </span>
                    <span className="font-sans text-[8px] text-[#555555] tracking-widest uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="font-sans text-[8px] text-[#555555] tracking-widest uppercase flex items-center gap-1">
                      <DollarSign className="w-3 h-3" /> {job.compensation}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#111111] mb-4">
                    {job.title}
                  </h3>
                  <p className="font-sans text-xs text-[#555555] leading-relaxed mb-6">
                    {job.description}
                  </p>

                  <h4 className="font-serif text-sm text-[#111111] mb-3">Atelier Requirements:</h4>
                  <ul className="flex flex-col gap-2 font-sans text-xs text-[#555555] mb-8 list-disc pl-5">
                    {job.requirements.map((req, rIdx) => (
                      <li key={rIdx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#ECE8E2] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span className="font-sans text-[10px] text-[#555555] tracking-wide">
                    Email CV & Portfolio to: <strong className="text-[#111111]">careers@mainteriors.in</strong>
                  </span>
                  <a
                    href="mailto:careers@mainteriors.in?subject=Application for Senior Interior Architect"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#161616] text-[#F8F7F4] hover:bg-[#A67C52] text-[9px] uppercase tracking-widest font-sans rounded transition-colors w-max"
                  >
                    Apply Now
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </GSAPReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
