"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface BookMockup3DProps {
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function BookMockup3D({
  imageSrc,
  title = "कर्ज संपण्याआधीच जगायला शिका",
  subtitle = "LEARN TO LIVE BEFORE THE DEBT IS GONE",
  className = "",
}: BookMockup3DProps) {
  const [imageError, setImageError] = useState(false);

  const hasCustomImage = Boolean(imageSrc && imageSrc.trim() !== "" && !imageError);

  return (
    <div className={cn("relative flex flex-col items-center justify-center p-2 sm:p-4 max-w-full w-full", className)}>
      {/* Adaptive Size-Independent Image Container */}
      <div className="flex items-center justify-center max-w-full w-full my-auto">
        {hasCustomImage ? (
          <img
            src={imageSrc}
            alt={title}
            onError={() => setImageError(true)}
            className="w-auto h-auto max-w-[min(85vw,280px)] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[400px] max-h-[380px] xs:max-h-[420px] sm:max-h-[480px] md:max-h-[520px] object-contain mx-auto rounded-lg shadow-2xl border border-gold/30 transition-all duration-300"
          />
        ) : (
          /* Default Book Template when no custom image is uploaded */
          <div className="w-[min(80vw,260px)] xs:w-[280px] sm:w-[320px] md:w-[340px] h-[360px] xs:h-[400px] sm:h-[450px] md:h-[480px] bg-gradient-to-b from-[#091E30] via-[#071827] to-[#040E18] text-cream p-5 sm:p-7 flex flex-col justify-between rounded-lg border-2 border-gold/40 shadow-2xl relative overflow-hidden mx-auto">
            {/* Gold foil decorative border */}
            <div className="absolute inset-3 border border-gold/40 rounded-sm pointer-events-none" />
            <div className="absolute inset-4 border border-gold/20 rounded-sm pointer-events-none" />

            {/* Top Accent */}
            <div className="text-center pt-3 sm:pt-4 z-10">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                BESTSELLING DIGITAL EBOOK
              </span>
              <div className="w-12 h-[1px] bg-gold mx-auto" />
            </div>

            {/* Center Title */}
            <div className="text-center my-auto z-10 px-2 sm:px-3">
              <h2 className="text-deva text-2xl sm:text-3xl font-extrabold text-cream leading-tight mb-2 sm:mb-3 drop-shadow-md">
                कर्ज संपण्याआधीच
                <span className="block text-gold mt-1.5">जगायला शिका</span>
              </h2>
              <p className="text-[10px] sm:text-xs font-serif-en uppercase tracking-wider text-gold-light/90 font-medium">
                {subtitle}
              </p>
            </div>

            {/* Bottom Details */}
            <div className="text-center pb-3 sm:pb-4 z-10">
              <div className="w-16 h-[1px] bg-gold/50 mx-auto mb-2" />
              <p className="text-[10px] sm:text-xs text-cream/70 tracking-widest uppercase font-sans">
                मराठी • हिंदी • English
              </p>
            </div>
          </div>
        )}
      </div>

      {/* eBook Badge below cover */}
      <div className="mt-4 sm:mt-5 text-center space-y-1">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-navy/90 text-gold border border-gold/30 shadow-xs">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Digital eBook (Instant Access)
        </span>
        <p className="text-[11px] sm:text-xs text-main/70 font-medium">
          मराठी | हिंदी | English
        </p>
      </div>
    </div>
  );
}
