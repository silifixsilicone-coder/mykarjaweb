import React from "react";
import { Image as ImageIcon } from "lucide-react";

interface HeroBannerProps {
  heroImage?: string | null;
  altText?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  heroImage,
  altText = "Hero Banner",
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-sm border border-black/5 bg-white">
      {heroImage ? (
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-slate-100 flex items-center justify-center overflow-hidden">
          <img
            src={heroImage}
            alt={altText}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      ) : (
        <div className="w-full aspect-[16/9] sm:aspect-[21/9] bg-[#F3F2E0] flex flex-col items-center justify-center p-6 text-center space-y-2 text-[#555B57]">
          <div className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center text-[#005C52]">
            <ImageIcon className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider">
            Hero Banner Placeholder
          </span>
        </div>
      )}
    </div>
  );
};
