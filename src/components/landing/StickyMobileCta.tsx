"use client";

import React, { useState, useEffect } from "react";
import { BuyButton } from "@/components/ui/BuyButton";
import type { Edition, SiteSettings } from "@/lib/types";

interface StickyMobileCtaProps {
  editions?: Edition[];
  settings?: Partial<SiteSettings>;
}

export function StickyMobileCta({ editions = [] }: StickyMobileCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA only after scrolling past 300px (past hero top area)
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultPaymentUrl =
    editions.find((e) => e.language === "MARATHI")?.paymentUrl ||
    editions[0]?.paymentUrl ||
    "#editions";

  const marathiPrice =
    editions.find((e) => e.language === "MARATHI")?.price ||
    editions[0]?.price ||
    "₹49";

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Mobile purchase bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#061524]/95 backdrop-blur-md border-t border-gold/40 px-4 py-2.5 shadow-2xl animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Left: Price & Title Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-gold font-serif-en font-extrabold text-2xl xs:text-3xl tracking-tight leading-none drop-shadow-sm">
              {marathiPrice.startsWith("₹") ? marathiPrice : `₹${marathiPrice}`}
            </span>
            <span className="text-[10px] sm:text-xs bg-gold/25 text-gold-light font-extrabold px-2 py-0.5 rounded-md border border-gold/40">
              60% OFF
            </span>
          </div>
          <span className="text-[10px] text-cream/80 font-sans tracking-wide mt-0.5">
            Digital eBook (Instant PDF)
          </span>
        </div>

        {/* Right: CTA Button */}
        <div className="shrink-0">
          <BuyButton
            href={defaultPaymentUrl}
            variant="primary"
            size="sm"
            className="px-5 py-2.5 text-sm font-bold shadow-lg"
          >
            <span>eBook घ्या</span>
            <span className="ml-1">→</span>
          </BuyButton>
        </div>
      </div>
    </aside>
  );
}
