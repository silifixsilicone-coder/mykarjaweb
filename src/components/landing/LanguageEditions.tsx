"use client";

import React, { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { BuyButton } from "@/components/ui/BuyButton";
import { SiteSettings, Edition } from "@/lib/types";

interface LanguageEditionsProps {
  settings: SiteSettings;
  editions: Edition[];
}

export function LanguageEditions({ settings, editions }: LanguageEditionsProps) {
  const activeEditions = editions.filter((e) => e.enabled);

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <SectionWrapper id="editions" bg="cream">
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <span className="text-gold uppercase tracking-widest text-[11px] sm:text-xs font-bold block">
          SELECT YOUR EBOOK EDITION
        </span>
        <h2 className="text-deva text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
          {settings.editionsHeading}
        </h2>
        <GoldDivider />
        <p className="text-deva text-xs sm:text-sm text-main/70">
          तुमच्या आवडीच्या भाषेत Digital eBook निवडा आणि त्वरित वाचनाला सुरुवात करा
        </p>
      </div>

      {/* 3 Edition Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mt-8 sm:mt-12 max-w-6xl mx-auto">
        {activeEditions.map((edition) => {
          const hasImage =
            edition.coverImage &&
            edition.coverImage.trim() !== "" &&
            !imageErrors[edition.id];

          return (
            <div
              key={edition.id}
              className="w-full max-w-[380px] mx-auto md:max-w-none bg-cream-dark/60 border border-gold/40 rounded-2xl p-5 sm:p-7 flex flex-col justify-between hover:border-gold hover:shadow-2xl transition-all duration-300 relative group box-border"
            >
              {/* 1. LANGUAGE BADGE */}
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <span className="inline-block bg-navy text-gold text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-gold/30 shadow-xs">
                  {edition.language}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-main/70 bg-gold/10 px-2.5 py-0.5 rounded-md border border-gold/20">
                  Digital PDF
                </span>
              </div>

              {/* 2. DEDICATED LARGE BOOK COVER IMAGE AREA */}
              <div className="my-3 sm:my-5 flex justify-center items-center w-full">
                {hasImage ? (
                  <div className="relative w-[min(80vw,260px)] md:w-[280px] lg:w-[300px] h-[340px] xs:h-[370px] sm:h-[400px] md:h-[420px] mx-auto flex items-center justify-center p-2 rounded-xl transition-all duration-300">
                    <img
                      src={edition.coverImage}
                      alt={`${edition.name} Cover`}
                      onError={() => handleImageError(edition.id)}
                      className="w-full h-full object-contain rounded-lg shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition-all duration-300 border border-gold/30"
                    />
                  </div>
                ) : (
                  /* Clean Light Placeholder when cover is not uploaded yet */
                  <div className="w-[min(80vw,260px)] md:w-[280px] lg:w-[300px] h-[340px] xs:h-[370px] sm:h-[400px] md:h-[420px] rounded-xl border-2 border-dashed border-gold/40 bg-cream-dark/80 flex flex-col items-center justify-center p-6 text-center mx-auto shadow-sm space-y-3 box-border">
                    <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto border border-gold/30">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-deva font-bold text-sm text-navy block">
                        Book Cover Not Uploaded
                      </span>
                      <span className="text-xs text-main/60 font-medium block mt-1">
                        Admin Panel वरून {edition.language} बुक कव्हर इमेज अपलोड करा
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. EDITION NAME & SHORT DESCRIPTION */}
              <div className="text-center space-y-1.5 my-4">
                <h3 className="text-deva font-extrabold text-xl sm:text-2xl text-navy">
                  {edition.name}
                </h3>
                <p className="text-deva text-xs sm:text-sm text-main/70 font-medium">
                  {edition.description}
                </p>
              </div>

              {/* 4. PRICE & BENEFITS */}
              <div className="space-y-4 pt-4 border-t border-gold/20 mb-6">
                <div className="text-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-navy font-sans">
                    {edition.price.startsWith("₹") ? edition.price : `₹${edition.price}`}
                  </span>
                  <span className="text-xs text-main/60 block font-normal mt-0.5">
                    एकदाच पेमेंट • Lifetime Access
                  </span>
                </div>

                <ul className="text-xs sm:text-sm space-y-2 text-main/80 font-medium text-deva">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    पूर्ण {edition.name} PDF
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    मोबाईल आणि कॉम्प्युटरवर वाचन
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Instant Download Link
                  </li>
                </ul>
              </div>

              {/* 5. BUY BUTTON */}
              <BuyButton
                href={edition.paymentUrl}
                variant="primary"
                size="lg"
                className="w-full text-center shadow-lg"
              >
                {edition.buttonText || `${edition.language} eBook घ्या`}
              </BuyButton>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
