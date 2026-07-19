"use client";

import { useCustomCursor } from "@/hooks/use-custom-cursor";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export function CustomCursor() {
  const { position, hovered, text } = useCustomCursor();

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      <motion.div
        className="flex items-center justify-center rounded-full bg-[#A67C52]/20 border border-[#A67C52] text-white text-[10px] font-sans font-medium tracking-widest uppercase mix-blend-difference"
        animate={{
          x: position.x - (hovered ? 24 : 8),
          y: position.y - (hovered ? 24 : 8),
          width: hovered ? 48 : 16,
          height: hovered ? 48 : 16,
          backgroundColor: hovered ? "rgba(166, 124, 82, 0.9)" : "rgba(166, 124, 82, 0.1)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.5 }}
      >
        <AnimatePresence>
          {hovered && text && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[8px] text-white text-center tracking-normal font-sans"
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
