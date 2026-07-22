"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm } from "@/actions/contact";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormInputs = z.infer<typeof contactSchema>;

export function ContactFormSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: FormInputs) => {
    setStatus("loading");
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        setStatus("success");
        setResponseMsg(result.message);
        reset();
        // Trigger success confetti for premium feel
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#D4AF37", "#F0F4F8", "#0A192F"],
        });
      } else {
        setStatus("error");
        setResponseMsg(result.message);
      }
    } catch (error) {
      setStatus("error");
      setResponseMsg("An unexpected server error occurred. Please try again.");
    }
  };

  return (
    <section className="py-24 bg-[#F0F4F8] relative overflow-hidden border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Contact Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="font-sans text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block">
              Connect With Us
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0B1B3D] tracking-wide mb-8">
              Initiate Your Project Brief
            </h2>
            <p className="font-sans text-sm text-[#475569] leading-relaxed mb-8">
              We look forward to translating your ideas into premium residential or commercial realities. Complete the brief and we will reach out shortly.
            </p>
          </div>

          <div className="flex flex-col gap-6 font-sans text-xs text-[#475569]">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#E2E8F0] text-[#D4AF37] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-[#0B1B3D] text-sm mb-1">Atelier Address</h4>
                <p className="text-[11px] leading-relaxed">Pune, Maharashtra, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#E2E8F0] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-[#0B1B3D] text-sm mb-1">Direct Call</h4>
                <p className="text-[11px] font-semibold text-[#0B1B3D]">+91 93694 17131</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#E2E8F0] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-[#0B1B3D] text-sm mb-1">Electronic Mail</h4>
                <p className="text-[11px]">info@turkinteriors.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-lg border border-[#E2E8F0] shadow-sm">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
                <h3 className="font-serif text-2xl text-[#0B1B3D] mb-4">Submission Confirmed</h3>
                <p className="font-sans text-sm text-[#475569] max-w-sm mb-8">
                  {responseMsg}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 bg-[#0A192F] text-[#F0F4F8] hover:bg-[#D4AF37] text-[10px] uppercase tracking-widest font-sans rounded transition-colors"
                >
                  New Submission
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] tracking-widest uppercase text-[#475569] font-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#F0F4F8] border border-[#E2E8F0] px-4 py-3 rounded text-xs font-sans text-[#0B1B3D] placeholder-[#475569]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-500 font-sans mt-0.5">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] tracking-widest uppercase text-[#475569] font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-[#F0F4F8] border border-[#E2E8F0] px-4 py-3 rounded text-xs font-sans text-[#0B1B3D] placeholder-[#475569]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-500 font-sans mt-0.5">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] tracking-widest uppercase text-[#475569] font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#F0F4F8] border border-[#E2E8F0] px-4 py-3 rounded text-xs font-sans text-[#0B1B3D] placeholder-[#475569]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-red-500 font-sans mt-0.5">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  {/* Subject field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] tracking-widest uppercase text-[#475569] font-semibold">
                      Inquiry Subject
                    </label>
                    <input
                      type="text"
                      {...register("subject")}
                      placeholder="e.g. Residential Villa Renovation"
                      className="w-full bg-[#F0F4F8] border border-[#E2E8F0] px-4 py-3 rounded text-xs font-sans text-[#0B1B3D] placeholder-[#475569]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    {errors.subject && (
                      <span className="text-[10px] text-red-500 font-sans mt-0.5">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] tracking-widest uppercase text-[#475569] font-semibold">
                    Project Brief & Scope
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Describe your design specifications, space dimensions, location, and ideal budget outline..."
                    className="w-full bg-[#F0F4F8] border border-[#E2E8F0] px-4 py-3 rounded text-xs font-sans text-[#0B1B3D] placeholder-[#475569]/30 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                  {errors.message && (
                    <span className="text-[10px] text-red-500 font-sans mt-0.5">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 mt-2 bg-[#0A192F] text-[#F0F4F8] hover:bg-[#D4AF37] transition-colors duration-300 font-sans text-[10px] font-bold uppercase tracking-widest rounded flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Submitting Inquiry..." : "Submit Project Brief"}
                  <Send className="w-3.5 h-3.5" />
                </button>

                {status === "error" && (
                  <p className="text-[10px] font-sans text-red-500 text-center uppercase tracking-wider">
                    {responseMsg}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
