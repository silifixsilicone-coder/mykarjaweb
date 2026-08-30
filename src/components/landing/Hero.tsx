"use client";

import React from "react";
import { BuyButton } from "@/components/ui/BuyButton";
import { BookMockup3D } from "@/components/ui/BookMockup3D";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SiteSettings, Edition } from "@/lib/types";

interface HeroProps {
  settings: SiteSettings;
  editions: Edition[];
}

export function Hero({ settings, editions }: HeroProps) {
  const primaryEdition = editions.find((e) => e.enabled) || editions[0];
  const ctaUrl =
    settings.heroPaymentUrl && settings.heroPaymentUrl.trim() !== ""
      ? settings.heroPaymentUrl
      : (primaryEdition?.paymentUrl || "#editions");

  const ctaText = settings.heroCta || "आता eBook घ्या";

  return (
    <section id="hero" className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-24 overflow-hidden bg-cream w-full box-border">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 sm:w-96 sm:h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 sm:w-96 sm:h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-[calc(100%-32px)] max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Main Copy (Desktop left, Mobile stacked) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
            
            {/* 1. Small Quote Badge */}
            <div className="inline-block bg-gold-faint border border-gold/30 rounded-full px-3.5 py-1 sm:px-4 sm:py-1.5 max-w-full">
              <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-gold text-deva italic truncate sm:whitespace-normal">
                “{settings.heroQuote}”
              </p>
            </div>

            {/* 2. Main Heading - Complete visibility with generous line height */}
            <h1 className="text-deva text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy leading-normal tracking-tight py-1">
              कर्ज संपण्याआधीच{" "}
              <span className="text-gold-gradient block mt-3 sm:mt-4 md:mt-5 py-1">जगायला शिका</span>
            </h1>

            {/* 3. Subtitle Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-1 text-xs sm:text-sm font-semibold text-navy/80">
              {settings.heroSubtitle.split("•").map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-navy/5 border border-gold/20 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-navy font-medium text-[11px] sm:text-xs"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            {/* 4. Description */}
            <p className="text-deva text-base sm:text-lg md:text-xl text-main/80 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              “{settings.heroDescription}”
            </p>

            <GoldDivider centered={false} className="hidden lg:flex" />

            {/* 5. BUY EBOOK Button Only */}
            <div className="flex justify-center lg:justify-start pt-2 w-full max-w-[90%] sm:max-w-none mx-auto lg:mx-0">
              <BuyButton
                href={ctaUrl}
                size="lg"
                variant="primary"
                className="w-full sm:w-auto min-h-[48px] px-8 flex items-center justify-center shadow-lg"
              >
                {ctaText}
              </BuyButton>
            </div>

            {/* 6. Book Image Placement on Mobile */}
            <div className="lg:hidden py-4 flex justify-center w-full">
              <BookMockup3D imageSrc={settings.heroImage} />
            </div>

            {/* 7. Trust Highlights / Benefits */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] sm:text-xs text-main/70 font-medium">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Instant PDF Access
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Read on Mobile & Laptop
              </span>
            </div>
          </div>

          {/* Desktop Book Mockup Column */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <BookMockup3D imageSrc={settings.heroImage} />
          </div>

        </div>
      </div>
    </section>
  );
}
