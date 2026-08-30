"use client";

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SiteSettings, LearningPoint } from "@/lib/types";

interface WhatYouWillLearnProps {
  settings: SiteSettings;
  learningPoints: LearningPoint[];
}

export function WhatYouWillLearn({ settings, learningPoints }: WhatYouWillLearnProps) {
  return (
    <SectionWrapper id="learn" bg="cream-dark">
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <span className="text-gold uppercase tracking-widest text-[11px] sm:text-xs font-bold block">
          KEY TAKEAWAYS
        </span>
        <h2 className="text-deva text-xl sm:text-3xl md:text-4xl font-extrabold text-navy">
          {settings.learningHeading}
        </h2>
        <GoldDivider />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12">
        {learningPoints.map((item, idx) => (
          <div
            key={item.id || idx}
            className="bg-cream border border-gold/20 rounded-xl p-4 sm:p-6 flex items-start gap-3.5 sm:gap-4 hover:border-gold/60 transition-all duration-300 shadow-sm box-border"
          >
            <span className="text-serif-en text-2xl sm:text-3xl font-extrabold text-gold tracking-tight shrink-0 w-8 sm:w-10">
              {item.number}
            </span>
            <div>
              <h3 className="text-deva font-bold text-base sm:text-lg text-navy mb-1">
                {item.title}
              </h3>
              <p className="text-deva text-xs sm:text-sm text-main/80 font-normal leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
