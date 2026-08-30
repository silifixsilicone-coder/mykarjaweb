"use client";

import React, { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SiteSettings, FaqItem } from "@/lib/types";

interface FaqProps {
  settings?: SiteSettings;
  faqItems: FaqItem[];
}

export function Faq({ settings, faqItems }: FaqProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <SectionWrapper id="faq" bg="cream-dark">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-gold uppercase tracking-widest text-xs font-bold block">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="text-deva text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
          वारंवार विचारले जाणारे प्रश्न (FAQ)
        </h2>
        <GoldDivider />
      </div>

      <div className="max-w-3xl mx-auto mt-12 space-y-4">
        {faqItems.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={item.id || idx}
              className="bg-cream border border-gold/30 rounded-xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-navy text-base sm:text-lg text-deva focus:outline-none hover:text-gold transition-colors"
              >
                <span>{item.question}</span>
                <span
                  className={`w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center text-lg font-bold shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-navy text-gold" : ""
                  }`}
                >
                  ↓
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-deva text-sm sm:text-base text-main/80 leading-relaxed border-t border-gold/10 font-normal">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
