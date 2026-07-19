"use client";

import React from "react";
import { motion } from "framer-motion";

interface MaskRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function MaskReveal({ children, className = "", delay = 0 }: MaskRevealProps) {
  // Split text by lines or words. For luxury headlines, splitting by words works beautifully.
  const words = children.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      y: "100%",
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const, // Custom cubic-bezier for luxury deceleration
      },
    },
  };

  return (
    <motion.h2
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, idx) => (
        <span key={idx} className="relative overflow-hidden inline-block mr-[0.25em] pb-[0.05em]">
          <motion.span variants={childVariants} className="inline-block origin-bottom">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
