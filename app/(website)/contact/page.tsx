import React from "react";
import { ContactFormSection } from "@/components/sections/contact-form-section";
import { MaskReveal } from "@/components/animations/mask-reveal";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Our Design Atelier | Turk Interiors",
  description:
    "Get in touch with our design team. Address: Pune, Maharashtra, India. Phone: +91 93694 17131. Set up an on-site consult.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#F0F4F8] pt-32 pb-0 md:pt-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="font-sans text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block">
            Location & Contact
          </span>
          <MaskReveal className="font-serif text-4xl sm:text-6xl text-[#0B1B3D] leading-tight tracking-wide mb-8 max-w-3xl">
            Let's Shape Your Vision.
          </MaskReveal>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-white p-8 rounded-lg border border-[#E2E8F0] shadow-sm">
            <Phone className="w-6 h-6 text-[#D4AF37] mb-4" />
            <h3 className="font-serif text-md text-[#0B1B3D] mb-2">Direct Phone</h3>
            <p className="font-sans text-xs text-[#475569] font-semibold mb-1">+91 9699232714</p>
            <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-wider">Call or WhatsApp</p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#E2E8F0] shadow-sm">
            <Mail className="w-6 h-6 text-[#D4AF37] mb-4" />
            <h3 className="font-serif text-md text-[#0B1B3D] mb-2">Electronic Mail</h3>
            <p className="font-sans text-xs text-[#475569] mb-1">info@mainteriors.in</p>
            <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-wider">Inquiries Response in 24h</p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#E2E8F0] shadow-sm">
            <MapPin className="w-6 h-6 text-[#D4AF37] mb-4" />
            <h3 className="font-serif text-md text-[#0B1B3D] mb-2">Studio Atelier</h3>
            <p className="font-sans text-xs text-[#475569] mb-1">Mira Road East</p>
            <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-wider">Maharashtra, India</p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#E2E8F0] shadow-sm">
            <Clock className="w-6 h-6 text-[#D4AF37] mb-4" />
            <h3 className="font-serif text-md text-[#0B1B3D] mb-2">Atelier Hours</h3>
            <p className="font-sans text-xs text-[#475569] mb-1">Mon - Sat: 10:00 - 19:30</p>
            <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-wider">Sunday: Closed</p>
          </div>
        </div>

        {/* Embedded styled Google Map iframe */}
        <div className="w-full h-[400px] rounded-lg overflow-hidden border border-[#E2E8F0] shadow-sm mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.1925345759714!2d72.87192837562095!3d19.263155781977755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0680bf70d0d%3A0xe5a3c1bd4de768bc!2sMira%20Road%20East%2C%20Mira%20Bhayandar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(0.9) contrast(1.1) invert(0.05)" }}
            allowFullScreen={false}
            loading="lazy"
            title="Turk Interiors Studio Location"
          ></iframe>
        </div>
      </div>

      {/* Form Section */}
      <ContactFormSection />
    </div>
  );
}
