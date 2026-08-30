"use client";

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SiteSettings, ProblemPoint } from "@/lib/types";

interface ProblemProps {
  settings: SiteSettings;
  problemPoints: ProblemPoint[];
}

export function Problem({ settings, problemPoints }: ProblemProps) {
  const getIcon = (idx: number) => {
    const icons = [
      <svg key="1" className="w-6 h-6 sm:w-8 sm:h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>,
      <svg key="2" className="w-6 h-6 sm:w-8 sm:h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      <svg key="3" className="w-6 h-6 sm:w-8 sm:h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      <svg key="4" className="w-6 h-6 sm:w-8 sm:h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>,
      <svg key="5" className="w-6 h-6 sm:w-8 sm:h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      <svg key="6" className="w-6 h-6 sm:w-8 sm:h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>,
    ];
    return icons[idx % icons.length];
  };

  return (
    <SectionWrapper id="problem" bg="navy">
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <span className="text-gold uppercase tracking-widest text-[11px] sm:text-xs font-bold block">
          THE REALITY
        </span>
        <h2 className="text-deva text-xl sm:text-3xl md:text-4xl font-extrabold text-cream leading-snug">
          {settings.problemHeadline}
        </h2>
        <GoldDivider />
      </div>

      {/* Grid of 6 problem points */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
        {problemPoints.map((point, idx) => (
          <div
            key={point.id || idx}
            className="bg-navy-light/60 border border-gold/20 rounded-xl p-4 sm:p-6 flex items-start gap-3.5 sm:gap-4 hover:border-gold/50 transition-all duration-300 shadow-md group"
          >
            <div className="p-2.5 sm:p-3 bg-navy rounded-lg border border-gold/30 shrink-0">
              {getIcon(idx)}
            </div>
            <div>
              <h3 className="text-deva font-bold text-base sm:text-lg text-cream group-hover:text-gold transition-colors">
                {point.text}
              </h3>
              <p className="text-[11px] sm:text-xs text-cream/60 mt-0.5 sm:mt-1 font-sans">
                दैनंदिन आयुष्यातील सर्वात मोठा ताण
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Highlight Box Statement */}
      <div className="mt-10 sm:mt-14 max-w-2xl mx-auto text-center bg-gradient-to-r from-navy-light via-navy to-navy-light border border-gold/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        <p className="text-deva text-lg sm:text-xl md:text-2xl font-bold text-cream leading-relaxed">
          “{settings.problemStatement.split("…")[0]}…
          <span className="block text-gold text-xl sm:text-2xl md:text-3xl mt-2 font-extrabold">
            {settings.problemStatement.split("…")[1] || "पण आयुष्य जगणं थांबवू नका."}
          </span>
          ”
        </p>
      </div>
    </SectionWrapper>
  );
}
