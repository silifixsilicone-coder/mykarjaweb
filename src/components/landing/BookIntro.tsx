"use client";

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SiteSettings } from "@/lib/types";

interface BookIntroProps {
  settings: SiteSettings;
}

export function BookIntro({ settings }: BookIntroProps) {
  const topics = [
    { name: "कर्ज", desc: "कर्जातून मुक्तीचा सोपा आणि सुलभ मार्ग" },
    { name: "पैसा", desc: "पैशांचं सकारात्मक व्यवस्थापन" },
    { name: "बचत", desc: "बचतीची नवी सवय आणि नियोजन" },
    { name: "मानसिक शांतता", desc: "चिंतामुक्ती आणि मनाची शांतता" },
    { name: "Positive Thinking", desc: "सकारात्मक दृष्टिकोन निर्माण करणे" },
    { name: "Manifestation", desc: "स्वप्नं सत्यात उतरवण्याची कला" },
    { name: "सुख", desc: "आजच्या दिवसात खरा आनंद शोधणे" },
  ];

  return (
    <SectionWrapper id="about" bg="cream">
      <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
        <span className="text-gold uppercase tracking-widest text-[11px] sm:text-xs font-bold block">
          MORE THAN FINANCIAL ADVICE
        </span>
        <h2 className="text-deva text-xl sm:text-3xl md:text-4xl font-extrabold text-navy leading-snug">
          {settings.bookIntroHeading}
        </h2>
        <GoldDivider />

        <p className="text-deva text-sm sm:text-base md:text-lg text-main/80 font-medium leading-relaxed pt-1 sm:pt-2 max-w-3xl mx-auto">
          {settings.bookIntroText}
        </p>
      </div>

      {/* Editorial Topic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-8 sm:mt-12">
        {topics.map((topic, idx) => (
          <div
            key={idx}
            className="bg-cream-dark/60 border border-gold/30 rounded-xl p-4 sm:p-5 hover:border-gold hover:bg-cream transition-all duration-300 shadow-sm box-border"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center font-bold text-xs mb-2 sm:mb-3 border border-gold/30">
              0{idx + 1}
            </div>
            <h3 className="text-deva font-bold text-base sm:text-lg text-navy mb-1">
              {topic.name}
            </h3>
            <p className="text-xs text-main/70 font-medium leading-relaxed">
              {topic.desc}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
