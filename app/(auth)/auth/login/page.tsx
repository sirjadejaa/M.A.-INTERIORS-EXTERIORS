"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Mail, ArrowRight } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInputs) => {
    setError("");
    setLoading(true);

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid email address or passcode credentials.");
        setLoading(false);
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected authentication error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-[#112240] p-8 md:p-12 rounded-lg border border-white/5 shadow-2xl flex flex-col items-center">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-white tracking-[0.2em] uppercase font-light">
            Turk
          </h1>
          <p className="font-sans text-[8px] text-[#D4AF37] tracking-[0.4em] uppercase mt-2">
            Atelier Management CMS
          </p>
        </div>

        {/* Info Notification for Seeded Credentials */}
        <div className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-4 rounded mb-6 text-center text-[10px] text-[#E2E8F0] font-sans tracking-wide">
          Seeded Credentials:<br />
          Email: <span className="font-semibold text-white">admin@turkinteriors.in</span><br />
          Password: <span className="font-semibold text-white">admin123</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[9px] tracking-widest uppercase text-[#E2E8F0]/60 font-semibold">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
              <input
                type="email"
                {...register("email")}
                placeholder="e.g. admin@turkinteriors.in"
                className="w-full bg-white/5 border border-white/10 px-10 py-3 rounded text-xs font-sans text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                required
              />
            </div>
            {errors.email && (
              <span className="text-[10px] text-red-400 font-sans mt-0.5">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[9px] tracking-widest uppercase text-[#E2E8F0]/60 font-semibold">
              Passcode
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 px-10 py-3 rounded text-xs font-sans text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                required
              />
            </div>
            {errors.password && (
              <span className="text-[10px] text-red-400 font-sans mt-0.5">
                {errors.password.message}
              </span>
            )}
          </div>

          {error && (
            <p className="text-[10px] text-red-400 text-center uppercase tracking-wider font-sans mt-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90 transition-colors duration-300 font-sans text-[10px] font-bold uppercase tracking-widest rounded flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating Session..." : "Secure Login"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
