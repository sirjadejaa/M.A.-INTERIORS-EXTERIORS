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
  title: "Turk Interiors | Premium Interior Designers in Pune",
  description:
    "Turk Interiors provides premium gypsum false ceilings, LED profile lighting, turnkey renovations, residential interiors, and commercial interior design services across Pune.",
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Turk Interiors | Premium Interior Designers in Pune",
    description:
      "Turk Interiors provides premium gypsum false ceilings, LED profile lighting, turnkey renovations, residential interiors, and commercial interior design services across Pune.",
    url: "/",
    siteName: "Turk Interiors",
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
      <body className="min-h-full flex flex-col bg-[#F0F4F8] selection:bg-[#D4AF37] selection:text-white">
        <Providers>
          <CustomLoader />
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
