import React from "react";
import { VisualLandingEditor } from "@/components/landing/VisualLandingEditor";
import { LandingPageData } from "@/types/visualEditor";

export const metadata = {
  title: "Visual Create Landing Page | DIGITAL BUNDLE",
};

export default function CreateVisualLandingPage() {
  const templateData: LandingPageData = {
    id: `lp-${Date.now()}`,
    name: "AI Video Reels Bundle",
    slug: "ai-video-reels",
    productName: "AI Video Reels Bundle",
    description: "Get access to a premium collection of AI video and reels resources.",
    price: "499",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
    productImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    buyButtonText: "Buy Now",
    paymentLink: "/pay/ai-video-reels",
    status: "Draft",
  };

  return <VisualLandingEditor initialData={templateData} />;
}
