"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  bg?: "cream" | "navy" | "cream-dark";
  className?: string;
  containerClassName?: string;
}

export function SectionWrapper({
  children,
  id,
  bg = "cream",
  className = "",
  containerClassName = "",
}: SectionWrapperProps) {
  const backgrounds = {
    cream: "bg-cream text-main",
    navy: "bg-navy text-cream border-t border-b border-gold/10",
    "cream-dark": "bg-cream-dark/60 text-main",
  };

  return (
    <section
      id={id}
      className={cn("py-12 sm:py-16 md:py-24 relative overflow-hidden w-full box-border", backgrounds[bg], className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn("w-[calc(100%-32px)] max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border", containerClassName)}
      >
        {children}
      </motion.div>
    </section>
  );
}
