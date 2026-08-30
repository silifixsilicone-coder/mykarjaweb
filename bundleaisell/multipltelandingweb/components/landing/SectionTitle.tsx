import React from "react";

interface SectionTitleProps {
  title?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title = "WHAT'S INSIDE THE BUNDLE?",
}) => {
  return (
    <div className="py-6 sm:py-8 text-center">
      <div className="inline-flex items-center justify-center gap-3">
        <span className="text-[#005C52] font-black text-lg sm:text-xl">⁝</span>
        <h2 className="text-xl sm:text-3xl font-black tracking-tight text-[#005C52] uppercase">
          {title}
        </h2>
        <span className="text-[#005C52] font-black text-lg sm:text-xl">⁝</span>
      </div>
    </div>
  );
};
