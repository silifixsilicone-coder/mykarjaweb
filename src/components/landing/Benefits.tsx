"use client";

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SiteSettings, Benefit } from "@/lib/types";

interface BenefitsProps {
  settings: SiteSettings;
  benefits: Benefit[];
}

export function Benefits({ settings, benefits }: BenefitsProps) {
  return (
    <SectionWrapper id="benefits" bg="cream">
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <span className="text-gold uppercase tracking-widest text-[11px] sm:text-xs font-bold block">
          WHY READ THIS EBOOK?
        </span>
        <h2 className="text-deva text-xl sm:text-3xl md:text-4xl font-extrabold text-navy">
          {settings.benefitsHeading}
        </h2>
        <GoldDivider />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-5xl mx-auto">
        {benefits.map((b, idx) => (
          <div
            key={b.id || idx}
            className="bg-cream-dark/50 border border-gold/30 rounded-xl p-4 sm:p-6 flex items-center gap-3.5 sm:gap-4 hover:border-gold hover:bg-cream transition-all duration-300 shadow-sm box-border"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold shrink-0 border border-gold/40">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-deva font-bold text-sm sm:text-base text-navy">
              {b.text}
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
