"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export function CustomLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds loader
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A192F]"
        >
          <div className="flex flex-col items-center max-w-xs w-full px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h1 className="font-serif text-3xl md:text-4xl text-[#F0F4F8] tracking-[0.2em] uppercase font-light">
                Turk
              </h1>
              <p className="font-sans text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase mt-2">
                Interiors
              </p>
            </motion.div>

            {/* Progress bar container */}
            <div className="h-[1px] w-full bg-white/10 relative overflow-hidden mb-4">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#D4AF37]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between w-full font-sans text-[9px] text-[#E2E8F0]/60 tracking-wider">
              <span>PUNE, IN</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
