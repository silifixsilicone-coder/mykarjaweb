"use client";

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { BuyButton } from "@/components/ui/BuyButton";
import { SiteSettings, Edition } from "@/lib/types";

interface FinalCtaProps {
  settings: SiteSettings;
  editions: Edition[];
}

export function FinalCta({ settings, editions }: FinalCtaProps) {
  const primaryEdition = editions.find((e) => e.enabled) || editions[0];
  const primaryUrl = primaryEdition?.paymentUrl || settings.comboPaymentUrl || "#editions";

  return (
    <SectionWrapper id="final-cta" bg="navy" className="py-16 sm:py-20 md:py-28 border-t-2 border-gold/40">
      <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
        <span className="text-gold uppercase tracking-widest text-[11px] sm:text-xs font-bold block">
          START YOUR JOURNEY TODAY
        </span>

        <h2 className="text-deva text-2xl sm:text-4xl md:text-5xl font-extrabold text-cream leading-tight">
          कर्ज संपण्याची वाट पाहू नका…
          <span className="text-gold-gradient block mt-1 sm:mt-2">
            आयुष्य आजपासून जगायला सुरुवात करा.
          </span>
        </h2>

        <GoldDivider />

        <p className="text-deva text-sm sm:text-base md:text-lg text-cream/80 max-w-xl mx-auto font-medium">
          Digital eBook मराठी, हिंदी आणि English मध्ये उपलब्ध. त्वरित Download करा.
        </p>

        <div className="pt-2 sm:pt-4 flex justify-center">
          <BuyButton href={primaryUrl} size="xl" variant="primary" className="w-full sm:w-auto shadow-2xl">
            {settings.finalCtaButtonText || "आता eBook घ्या"}
          </BuyButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
