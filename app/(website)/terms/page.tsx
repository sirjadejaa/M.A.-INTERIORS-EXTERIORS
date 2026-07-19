import React from "react";

export const metadata = {
  title: "Terms & Conditions | M.A. Interiors & Exteriors",
  description: "Read our studio terms regarding project execution and warranty roadmaps.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#F8F7F4] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-8 border-b border-[#ECE8E2] pb-4">
          Terms & Conditions
        </h1>
        
        <div className="font-sans text-xs text-[#555555] space-y-6 leading-relaxed">
          <p>
            Effective Date: July 19, 2026
          </p>
          <p>
            By accessing this website, you agree to our terms. Our design studio operates under fixed turnkey contracts specified in client-approved agreements.
          </p>
          <h3 className="font-serif text-lg text-[#111111] mt-8">1. Project Brief & Consultations</h3>
          <p>
            Submitting a project brief via this website does not constitute a binding contract. All execution agreements are signed physically after site audits, drawing sign-offs, and down payments.
          </p>
          <h3 className="font-serif text-lg text-[#111111] mt-8">2. Warranties</h3>
          <p>
            The 5-year comprehensive material warranty applies specifically to modular carpentry and closets manufactured at our workshop. It does not cover natural wear and tear or modifications made by third-party contractors on site.
          </p>
          <h3 className="font-serif text-lg text-[#111111] mt-8">3. Copyrights</h3>
          <p>
            All architectural drawings, renders, and site photographs showcased on this website are the intellectual property of M.A. Interiors & Exteriors. Reproduction or use without permission is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
