import React from "react";
import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export const LandingPageNotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F7E8] text-[#111111] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-xl max-w-md w-full space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-[#111111]">
            Landing Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#555B57] leading-relaxed">
            The landing page you are looking for does not exist or is no longer available.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#005C52] text-white font-bold text-xs shadow-md hover:bg-[#004840] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
