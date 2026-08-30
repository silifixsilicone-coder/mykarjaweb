import React from "react";

export const LandingPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F7E8] py-8 sm:py-12 px-4 space-y-8 max-w-4xl mx-auto animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl bg-slate-200/80" />

      {/* Product Image Skeleton */}
      <div className="flex justify-center">
        <div className="w-48 sm:w-64 aspect-square rounded-3xl bg-slate-200/80" />
      </div>

      {/* Product Details Skeleton */}
      <div className="space-y-3 max-w-md mx-auto text-center flex flex-col items-center">
        <div className="h-8 bg-slate-200/80 rounded-xl w-3/4" />
        <div className="h-4 bg-slate-200/80 rounded-lg w-full" />
        <div className="h-4 bg-slate-200/80 rounded-lg w-2/3" />
      </div>

      {/* Price Skeleton */}
      <div className="flex justify-center">
        <div className="h-10 bg-slate-200/80 rounded-xl w-28" />
      </div>

      {/* Buy Button Skeleton */}
      <div className="flex justify-center">
        <div className="h-14 bg-slate-200/80 rounded-2xl w-64" />
      </div>
    </div>
  );
};
