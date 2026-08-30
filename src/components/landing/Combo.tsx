"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BuyButton } from "@/components/ui/BuyButton";
import type { SiteSettings } from "@/lib/types";

interface ComboProps {
  settings?: Partial<SiteSettings>;
}

export function Combo({ settings }: ComboProps) {
  // If combo is disabled, don't render this section
  if (settings?.comboEnabled === false) {
    return null;
  }

  const heading = settings?.comboHeading || "तीन्ही भाषा — एकच उद्देश";
  const description =
    settings?.comboDescription ||
    "मराठी, हिंदी आणि English — तीन्ही eBooks एकत्र मिळवा विशेष सवलतीत!";
  const price = settings?.comboPrice || "₹399";
  const buttonText = settings?.comboButtonText || "Combo eBook घ्या";
  const paymentUrl =
    settings?.comboPaymentUrl || "https://example.com/pay/combo";
  const comboImage = settings?.comboImage;

  const languagesIncluded = [
    { lang: "मराठी आवृत्ती", sub: "Marathi Edition", flag: "🚩" },
    { lang: "हिंदी आवृत्ती", sub: "Hindi Edition", flag: "🇮🇳" },
    { lang: "English Edition", sub: "English Version", flag: "🌐" },
  ];

  return (
    <section id="combo" className="py-16 md:py-24 bg-cream relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-br from-[#061524] via-[#092237] to-[#040D17] border-2 border-gold p-8 sm:p-12 text-cream shadow-2xl overflow-hidden"
        >
          {/* Ambient Gold Glow inside container */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Banner Tag */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-navy font-black text-xs uppercase tracking-widest shadow-md">
              👑 विशेष कॉम्बो ऑफर (Special Combo Deal)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="text-deva text-3xl sm:text-4xl lg:text-5xl font-black text-cream leading-tight mb-4">
                {heading}
              </h2>

              <p className="text-cream/80 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                {description}
              </p>

              {/* 3 Languages Included Pills */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {languagesIncluded.map((item) => (
                  <div
                    key={item.lang}
                    className="bg-navy-light/80 border border-gold/40 rounded-xl p-3 text-center"
                  >
                    <span className="text-xl sm:text-2xl block mb-1">
                      {item.flag}
                    </span>
                    <span className="text-deva font-bold text-xs sm:text-sm text-gold-light block">
                      {item.lang}
                    </span>
                    <span className="text-[10px] text-cream/60 block">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* Benefits in combo */}
              <div className="space-y-2 mb-8 text-xs sm:text-sm text-cream/85">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-gold font-bold">✓</span>
                  <span>तीन्ही भाषांमधील पूर्ण eBooks चा त्वरित ॲक्सेस</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-gold font-bold">✓</span>
                  <span>मित्र आणि कुटुंबासाठी एकत्र सर्वोत्तम भेट</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-gold font-bold">✓</span>
                  <span>आजीवन मोफत अपडेट्स समाविष्ट</span>
                </div>
              </div>
            </div>

            {/* Right Card with Price & CTA */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full bg-navy/90 rounded-2xl border-2 border-gold/60 p-6 sm:p-8 text-center shadow-xl backdrop-blur-md">
                <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                  कॉम्बो विशेष मूल्य
                </span>

                <div className="flex items-center justify-center gap-3 my-2">
                  <span className="text-cream/50 text-lg line-through font-serif-en">
                    ₹597
                  </span>
                  <span className="bg-gradient-to-r from-gold to-gold-light text-navy text-xs font-black px-2.5 py-0.5 rounded-full">
                    बचत ₹198
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-serif-en font-black text-gold-gradient mb-2">
                  {price.startsWith("₹") ? price : `₹${price}`}
                </div>

                <span className="text-xs text-cream/60 block mb-6 font-medium">
                  तीन्ही भाषा एकत्र • एकच पेमेंट
                </span>

                <BuyButton
                  href={paymentUrl}
                  variant="primary"
                  size="xl"
                  className="w-full text-base sm:text-lg shadow-xl hover:shadow-2xl"
                >
                  <span>{buttonText}</span>
                  <span className="ml-2">→</span>
                </BuyButton>

                <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-center gap-2 text-[11px] text-cream/60">
                  <span>🔒 सुरक्षित पेमेंट</span>
                  <span>•</span>
                  <span>⚡ त्वरित ईमेल डिलिव्हरी</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
