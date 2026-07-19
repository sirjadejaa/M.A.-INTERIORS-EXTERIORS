import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CustomCursor } from "@/components/common/custom-cursor";
import { CustomLoader } from "@/components/common/custom-loader";
import React from "react";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "M.A. Interiors & Exteriors | Luxury Design Studio in Mumbai",
  description:
    "Bespoke, luxury interior and exterior design services in Mira Road East, Maharashtra, India. Turnkey residential and commercial design built to international standards.",
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "M.A. Interiors & Exteriors | Luxury Design Studio",
    description:
      "Bespoke residential and commercial interior and exterior turnkey projects in Mumbai and Maharashtra.",
    url: "/",
    siteName: "M.A. Interiors & Exteriors",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F7F4] selection:bg-[#A67C52] selection:text-white">
        <Providers>
          <CustomLoader />
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
