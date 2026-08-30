"use client";

import React from "react";
import { LandingNavbar } from "./LandingNavbar";
import { HeroSection } from "./HeroSection";
import { TrustStatsBar } from "./TrustStatsBar";
import { SectionTitle } from "./SectionTitle";
import { BundleItemsList } from "./BundleItemsList";
import { PricingCheckoutSection } from "./PricingCheckoutSection";
import { LandingPageData } from "@/types/visualEditor";

interface PublicLandingPageProps {
  data?: LandingPageData;
  mode?: "view" | "edit";
  onUpdateField?: (field: keyof LandingPageData, value: any) => void;
}

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({
  data,
  mode = "view",
}) => {
  const productName = data?.productName || "AI Video Creator Bundle";
  const description =
    data?.description ||
    "Everything you need to create, edit and scale AI videos like a pro!";
  const price = data?.price || "699";
  const buyButtonText = data?.buyButtonText || "BUY NOW";

  return (
    <div className="min-h-screen bg-[#F8F7E8] text-[#111111] font-sans overflow-x-hidden pb-12">
      {/* 1. Header Navigation Bar */}
      <LandingNavbar brandName="YourBrand" />

      {/* 2. Hero Section */}
      <HeroSection productName={productName} description={description} />

      {/* 3. Trust Statistics Strip */}
      <TrustStatsBar />

      {/* 4. Section Title Header */}
      <SectionTitle title="WHAT'S INSIDE THE BUNDLE?" />

      {/* 5. Data-Driven 7 Bundle Item Cards */}
      <BundleItemsList />

      {/* 6. Pricing Summary & Checkout CTA Box */}
      <PricingCheckoutSection price={price} buyButtonText={buyButtonText} />
    </div>
  );
};
