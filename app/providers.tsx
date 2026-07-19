"use client";

import { SessionProvider } from "next-auth/react";
import { useLenis } from "@/hooks/use-lenis";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useLenis();

  return <SessionProvider>{children}</SessionProvider>;
}
