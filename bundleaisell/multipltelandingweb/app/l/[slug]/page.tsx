import React from "react";
import Link from "next/link";
import { PublicLandingPage } from "@/components/landing/PublicLandingPage";
import { mockLandingPages } from "@/lib/mockData";
import { LandingPageData } from "@/types/visualEditor";
import { FileCode, ArrowLeft, ShieldAlert } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: "AI Video Creator Bundle | YourBrand",
  };
}

export default function PublicLandingPageRoute({
  params,
}: {
  params: { slug: string };
}) {
  const targetPage = mockLandingPages.find((p) => p.slug === params.slug) || {
    id: "bundle-1",
    product: "AI Video Creator Bundle",
    description: "Everything you need to create, edit and scale AI videos like a pro!",
    price: "699",
    image: null,
    slug: params.slug,
    status: "Published" as const,
  };

  if (targetPage.status === "Draft") {
    return (
      <div className="min-h-screen bg-[#F8F7E8] text-[#111111] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-xl max-w-md w-full space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#111111]">
              Draft Landing Page
            </h1>
            <p className="text-xs sm:text-sm text-[#555B57] leading-relaxed">
              This landing page is not published yet.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/landing-pages"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#005C52] text-white font-bold text-xs shadow-md hover:bg-[#004840] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pageData: LandingPageData = {
    id: targetPage.id,
    name: targetPage.product,
    slug: targetPage.slug,
    productName: targetPage.product,
    description: targetPage.description,
    price: targetPage.price.replace(/[^0-9]/g, ""),
    heroImage: targetPage.image,
    productImage: targetPage.image,
    buyButtonText: "BUY NOW",
    paymentLink: `/pay/${targetPage.slug}`,
    status: targetPage.status as "Published" | "Draft",
  };

  return (
    <div>
      {/* Top Banner Bar for Admin Navigation Access */}
      <div className="bg-[#111111] text-white text-xs py-2 px-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <span className="flex items-center gap-1.5 font-semibold text-slate-300">
          <FileCode className="w-3.5 h-3.5 text-amber-400" />
          Public Landing Page Preview — /l/{params.slug}
        </span>
        <Link
          href="/admin/landing-pages"
          className="hover:underline flex items-center gap-1 text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Admin
        </Link>
      </div>

      {/* Render Master Public Landing Page matching Reference Screenshot */}
      <PublicLandingPage data={pageData} mode="view" />
    </div>
  );
}
