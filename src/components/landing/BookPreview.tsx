"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { BuyButton } from "@/components/ui/BuyButton";
import { SiteSettings, PreviewPage, Edition } from "@/lib/types";

interface BookPreviewProps {
  settings: SiteSettings;
  previewPages: PreviewPage[];
  editions?: Edition[];
}

export function BookPreview({ settings, previewPages, editions = [] }: BookPreviewProps) {
  // Enforce strictly 3 preview pages
  const defaultThreePages: PreviewPage[] = [
    {
      id: "1",
      image: previewPages[0]?.image || "/uploads/preview-page-1.png",
      caption: previewPages[0]?.caption || "पृष्ठ १ — कर्ज व्यवस्थापन",
      sortOrder: 1,
    },
    {
      id: "2",
      image: previewPages[1]?.image || "/uploads/preview-page-2.png",
      caption: previewPages[1]?.caption || "पृष्ठ २ — मानसिक शांतता",
      sortOrder: 2,
    },
    {
      id: "3",
      image: previewPages[2]?.image || "/uploads/preview-page-3.png",
      caption: previewPages[2]?.caption || "पृष्ठ ३ — बचत आणि Positive Thinking",
      sortOrder: 3,
    },
  ];

  const threePages = (previewPages && previewPages.length >= 3)
    ? previewPages.slice(0, 3)
    : defaultThreePages;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const primaryEdition = editions.find((e) => e.enabled) || editions[0];
  const primaryUrl = primaryEdition?.paymentUrl || settings.comboPaymentUrl || "#editions";

  const renderCard = (page: PreviewPage, idx: number) => {
    const hasCustomImage =
      page.image &&
      page.image.startsWith("/uploads/") &&
      !page.image.includes("preview-page-");

    return (
      <div className="bg-cream rounded-xl p-4 sm:p-5 shadow-2xl border border-gold/30 flex flex-col items-center w-full max-w-[340px] mx-auto box-border">
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-cream-dark/50 border border-gold/20 flex flex-col justify-between p-4 sm:p-5 text-main">
          {hasCustomImage ? (
            <Image
              src={page.image}
              alt={page.caption || `Preview Page ${idx + 1}`}
              fill
              className="object-contain p-1"
              sizes="(max-width: 768px) 280px, 320px"
              priority
            />
          ) : (
            /* Styled Sample Page Content when custom screenshot is not uploaded */
            <div className="w-full h-full flex flex-col justify-between text-left space-y-3">
              <div className="flex justify-between items-center text-[10px] text-main/50 font-semibold uppercase tracking-wider border-b border-gold/20 pb-2">
                <span className="truncate">कर्ज संपण्याआधीच जगायला शिका</span>
                <span className="shrink-0 ml-1">{page.caption || `पृष्ठ 0${idx + 1}`}</span>
              </div>

              <div className="space-y-2 my-auto">
                <h4 className="text-deva text-xs sm:text-sm font-bold text-navy">
                  {idx === 0 && "प्रकरण १: कर्जाचा दृष्टिकोन बदला"}
                  {idx === 1 && "प्रकरण २: मानसिक शांततेचे उपाय"}
                  {idx >= 2 && "प्रकरण ३: बचतीची नवी दिशा"}
                </h4>
                <p className="text-deva text-[11px] sm:text-xs text-main/70 leading-relaxed font-normal">
                  {idx === 0 && "कर्ज फेडणे ही एक प्रक्रिया आहे, पण आयुष्य ही एक कला आहे. कर्ज फेडत असताना तुमचे आजचे आनंदाचे क्षण पुढे ढकलू नका..."}
                  {idx === 1 && "चिंतेने कर्ज कमी होत नाही. मानसिक शांतता मिळवण्यासाठी विचारांचे योग्य व्यवस्थापन कसे करायचे ते समजून घ्या..."}
                  {idx >= 2 && "बचत म्हणजे फक्त पैसे साठवणे नाही, तर भविष्यासाठी योग्य आर्थिक शिस्त लावणे आणि सकारात्मक विचार करणे..."}
                </p>
              </div>

              <div className="text-[9px] text-center text-gold font-bold tracking-widest uppercase border-t border-gold/20 pt-2">
                Digital Sample Page {idx + 1}
              </div>
            </div>
          )}
        </div>
        <p className="text-deva text-xs sm:text-sm text-cream/90 font-bold mt-3 text-center">
          {page.caption || `Preview Page ${idx + 1}`}
        </p>
      </div>
    );
  };

  return (
    <SectionWrapper id="preview" bg="navy">
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <span className="text-gold uppercase tracking-widest text-[11px] sm:text-xs font-bold block">
          BOOK INSIDE LOOK
        </span>
        <h2 className="text-deva text-xl sm:text-3xl md:text-4xl font-extrabold text-cream">
          {settings.previewHeading}
        </h2>
        <GoldDivider />
        <p className="text-deva text-xs sm:text-sm text-cream/70">
          पुस्तकातील ३ महत्त्वाच्या पानांची नमुना पाने खालीलप्रमाणे पहा
        </p>
      </div>

      {/* DESKTOP LAYOUT: Exactly 3 cards in 1 row */}
      <div className="hidden md:grid grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
        {threePages.map((page, idx) => (
          <div key={page.id || idx} className="w-full">
            {renderCard(page, idx)}
          </div>
        ))}
      </div>

      {/* MOBILE CAROUSEL: Exactly 1 card per slide (no 4th card overflow) */}
      <div className="block md:hidden relative mt-8 max-w-full">
        <div className="overflow-hidden max-w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {threePages.map((page, idx) => (
              <div key={page.id || idx} className="flex-[0_0_100%] min-w-0 px-2 box-border">
                {renderCard(page, idx)}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons for Mobile Carousel */}
        <div className="flex justify-center items-center gap-4 mt-5">
          <button
            onClick={scrollPrev}
            className="w-9 h-9 rounded-full bg-navy-light text-gold border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors focus:outline-none text-sm"
            aria-label="Previous slide"
          >
            ←
          </button>
          <span className="text-xs text-gold font-bold tracking-widest font-mono">
            3 PAGES ONLY
          </span>
          <button
            onClick={scrollNext}
            className="w-9 h-9 rounded-full bg-navy-light text-gold border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors focus:outline-none text-sm"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-8 sm:mt-12 text-center">
        <BuyButton href={primaryUrl} size="lg" variant="primary" className="w-full sm:w-auto">
          पूर्ण eBook घ्या
        </BuyButton>
      </div>
    </SectionWrapper>
  );
}
