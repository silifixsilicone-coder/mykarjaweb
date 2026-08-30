import React from "react";
import { CreateLandingPageFormState, DeviceMode } from "@/types/create";
import { PreviewDeviceSwitcher } from "./PreviewDeviceSwitcher";
import { PublicLandingPage } from "@/components/landing/PublicLandingPage";
import { LandingPageData } from "@/types/visualEditor";
import { cn } from "@/lib/utils";

interface LivePreviewProps {
  formState: CreateLandingPageFormState;
  device: DeviceMode;
  onDeviceChange: (device: DeviceMode) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  formState,
  device,
  onDeviceChange,
}) => {
  const {
    name,
    slug,
    productName,
    heroImage,
    productImage,
    description,
    price,
    buyButtonText,
    paymentLink,
    status,
  } = formState;

  const previewData: LandingPageData = {
    id: "preview-id",
    name: name || "AI Video Reels Bundle",
    slug: slug || "ai-video-reels",
    productName: productName || "AI Video Reels Bundle",
    description:
      description ||
      "Get access to a premium collection of AI video and reels resources.",
    price: price || "499",
    heroImage: heroImage,
    productImage: productImage,
    buyButtonText: buyButtonText || "Buy Now",
    paymentLink: paymentLink || "/pay/ai-video-reels",
    status: status || "Draft",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-4 sticky top-20">
      {/* Header & Device Switcher */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-base font-bold text-slate-900">Live Preview</h2>
        </div>
        <PreviewDeviceSwitcher device={device} onDeviceChange={onDeviceChange} />
      </div>

      {/* Frame Container */}
      <div className="flex justify-center bg-slate-100/80 p-3 sm:p-4 rounded-2xl border border-slate-200/60 overflow-hidden max-h-[750px] overflow-y-auto">
        <div
          className={cn(
            "transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-black/10 origin-top bg-[#F8F7E8]",
            device === "mobile" ? "w-[365px] min-h-[640px] scale-95 sm:scale-100" : "w-full min-h-[500px]"
          )}
        >
          {/* Render Streamlined Master Public Landing Page */}
          <PublicLandingPage data={previewData} mode="view" />
        </div>
      </div>
    </div>
  );
};
