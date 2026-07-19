import React from "react";
import { MaskReveal } from "@/components/animations/mask-reveal";

export const metadata = {
  title: "Privacy Policy | M.A. Interiors & Exteriors",
  description: "Read our privacy guidelines regarding user inquiry details and newsletter data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F8F7F4] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-8 border-b border-[#ECE8E2] pb-4">
          Privacy Policy
        </h1>
        
        <div className="font-sans text-xs text-[#555555] space-y-6 leading-relaxed">
          <p>
            Effective Date: July 19, 2026
          </p>
          <p>
            At M.A. Interiors & Exteriors, we respect your privacy. This policy outlines how we handle the information you submit via our online project brief forms, WhatsApp connections, and newsletter subscriptions.
          </p>
          <h3 className="font-serif text-lg text-[#111111] mt-8">1. Information Collection</h3>
          <p>
            We collect the personal details you explicitly submit: (1) Name, email, phone number, and brief descriptions provided via inquiry forms, and (2) Email addresses submitted for newsletter notifications. We do not use background trackers to collect sensitive information.
          </p>
          <h3 className="font-serif text-lg text-[#111111] mt-8">2. Use of Information</h3>
          <p>
            We use your details solely to: (1) Call or email you regarding on-site audits and space assessments, (2) Send newsletter logs (you can unsubscribe instantly), and (3) Optimize sitemap loading speeds. We do not sell or trade your details to marketing databases.
          </p>
          <h3 className="font-serif text-lg text-[#111111] mt-8">3. Security</h3>
          <p>
            All submitted forms are stored inside a secure PostgreSQL database. Standard TLS encryption secures connection tunnels. If you wish to purge your email from our database, contact us at info@mainteriors.in.
          </p>
        </div>
      </div>
    </div>
  );
}
