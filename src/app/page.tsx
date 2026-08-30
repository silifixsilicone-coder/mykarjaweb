import React from "react";
import {
  getSiteSettings,
  getEditions,
  getLearningPoints,
  getBenefits,
  getTestimonials,
  getFaqItems,
  getProblemPoints,
} from "@/lib/firestoreDb";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { LanguageEditions } from "@/components/landing/LanguageEditions";
import { Problem } from "@/components/landing/Problem";
import { BookIntro } from "@/components/landing/BookIntro";
import { WhatYouWillLearn } from "@/components/landing/WhatYouWillLearn";
import { Benefits } from "@/components/landing/Benefits";
import { Testimonials } from "@/components/landing/Testimonials";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { StickyMobileCta } from "@/components/landing/StickyMobileCta";

export const revalidate = 0; // Fresh content on demand

async function getLandingData() {
  try {
    const [
      settings,
      editions,
      learningPoints,
      benefits,
      testimonials,
      faqItems,
      problemPoints,
    ] = await Promise.all([
      getSiteSettings(),
      getEditions(),
      getLearningPoints(),
      getBenefits(),
      getTestimonials(),
      getFaqItems(),
      getProblemPoints(),
    ]);

    return {
      settings,
      editions,
      learningPoints,
      benefits,
      testimonials,
      faqItems,
      problemPoints,
    };
  } catch (error) {
    console.error("Error loading data for landing page:", error);
    return null;
  }
}

export default async function LandingPage() {
  const data = await getLandingData();

  if (!data) {
    return (
      <div className="min-h-screen bg-cream text-main flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-navy mb-2">कर्ज संपण्याआधीच जगायला शिका</h1>
        <p className="text-sm text-main/70">Loading eBook landing page...</p>
      </div>
    );
  }

  const {
    settings,
    editions,
    learningPoints,
    benefits,
    testimonials,
    faqItems,
    problemPoints,
  } = data;

  // JSON-LD Structured Data
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: settings.heroTitle,
    alternateName: "LEARN TO LIVE BEFORE THE DEBT IS GONE",
    description: settings.heroSubtitle,
    inLanguage: ["mr", "hi", "en"],
    bookFormat: "https://schema.org/EBook",
    offers: editions.map((ed) => ({
      "@type": "Offer",
      name: ed.name,
      price: ed.price.replace(/[^0-9]/g, "") || "199",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: ed.paymentUrl,
    })),
  };

  return (
    <div className="flex flex-col min-h-screen relative pb-16 md:pb-0 overflow-x-hidden w-full">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />

      {/* 1. NAVBAR */}
      <Navbar settings={settings} editions={editions} />

      {/* 2. HERO SECTION */}
      <Hero settings={settings} editions={editions} />

      {/* 3. eBOOK PRODUCTS (SECOND SECTION — IMMEDIATELY AFTER HERO) */}
      <LanguageEditions settings={settings} editions={editions} />

      {/* 4. PROBLEM SECTION */}
      <Problem settings={settings} problemPoints={problemPoints} />

      {/* 5. BOOK INTRO SECTION */}
      <BookIntro settings={settings} />

      {/* 6. WHAT YOU'LL LEARN */}
      <WhatYouWillLearn settings={settings} learningPoints={learningPoints} />

      {/* 7. BENEFITS SECTION */}
      <Benefits settings={settings} benefits={benefits} />

      {/* 8. TESTIMONIALS SECTION */}
      <Testimonials settings={settings} testimonials={testimonials} />

      {/* 9. FAQ SECTION */}
      <Faq settings={settings} faqItems={faqItems} />

      {/* 10. FINAL CTA SECTION */}
      <FinalCta settings={settings} editions={editions} />

      {/* 11. FOOTER */}
      <Footer />

      {/* Mobile Sticky CTA */}
      <StickyMobileCta settings={settings} editions={editions} />
    </div>
  );
}
