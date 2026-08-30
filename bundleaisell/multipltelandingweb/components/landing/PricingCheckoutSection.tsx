import React from "react";
import { ShoppingCart, ShieldCheck, CheckCircle2, Zap } from "lucide-react";

interface PricingCheckoutSectionProps {
  price?: string;
  buyButtonText?: string;
}

export const PricingCheckoutSection: React.FC<PricingCheckoutSectionProps> = ({
  price = "699",
  buyButtonText = "BUY NOW",
}) => {
  const numericPrice = parseInt(price.replace(/[^0-9]/g, ""), 10) || 699;
  const totalValue = 3093;
  const youSave = totalValue - numericPrice;

  return (
    <section className="py-8 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl border border-black/10 shadow-xl overflow-hidden p-3 sm:p-4 space-y-3">
          
          {/* Top Discount Calculation Row */}
          <div className="flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-700">
            <div>
              <span className="text-slate-400 font-semibold block text-[10px]">
                Total Value
              </span>
              <span className="line-through text-slate-500 font-bold text-sm">
                ₹3,093
              </span>
            </div>

            <div className="px-3 py-1 rounded-full bg-[#FEF08A] text-[#854D0E] font-black text-xs border border-amber-300 shadow-2xs">
              77% OFF
            </div>

            <div className="text-right">
              <span className="text-slate-400 font-semibold block text-[10px]">
                You Save
              </span>
              <span className="text-emerald-600 font-bold text-sm">
                ₹{youSave.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Main Deep Green Price Banner */}
          <div className="bg-[#005C52] text-white rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            {/* Price Details Left */}
            <div className="space-y-1 text-center md:text-left w-full md:w-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Bundle Price
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                ₹{numericPrice}
              </div>
              <div className="text-xs text-emerald-100 font-semibold">
                One Time Payment • Lifetime Access
              </div>
            </div>

            {/* BUY NOW White Button Right */}
            <div className="space-y-2 text-center w-full md:w-auto">
              <button
                type="button"
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-white text-[#005C52] font-black text-lg sm:text-xl shadow-lg hover:bg-slate-50 active:scale-98 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
              >
                <ShoppingCart className="w-6 h-6 fill-[#005C52]" />
                <span>{buyButtonText.toUpperCase()}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-100 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Secure Payment via SuperProfile</span>
              </div>
            </div>
          </div>

          {/* Bottom Money Back Guarantee Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-semibold text-slate-600 pt-2 pb-1 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#005C52]" />
              <span>30 Days Money Back Guarantee</span>
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#005C52]" />
              <span>Instant Access After Payment</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
