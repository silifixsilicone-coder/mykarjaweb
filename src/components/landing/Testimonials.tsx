"use client";

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SiteSettings, Testimonial } from "@/lib/types";

interface TestimonialsProps {
  settings?: SiteSettings;
  testimonials: Testimonial[];
}

export function Testimonials({ settings, testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <SectionWrapper id="testimonials" bg="cream-dark">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-gold uppercase tracking-widest text-xs font-bold block">
          READER REVIEWS
        </span>
        <h2 className="text-deva text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
          वाचकांचे अभिप्राय
        </h2>
        <GoldDivider />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {testimonials.map((t, idx) => (
          <div
            key={t.id || idx}
            className="bg-cream border border-gold/30 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
          >
            <div className="space-y-4">
              <div className="flex text-gold gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-gold" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-deva text-sm text-main/90 font-medium italic leading-relaxed">
                “{t.text}”
              </p>
            </div>

            <div className="pt-4 border-t border-gold/20 flex items-center justify-between mt-4">
              <span className="text-deva font-bold text-sm text-navy">
                {t.name}
              </span>
              <span className="text-[10px] font-semibold bg-navy/10 text-navy px-2 py-0.5 rounded">
                {t.language}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
