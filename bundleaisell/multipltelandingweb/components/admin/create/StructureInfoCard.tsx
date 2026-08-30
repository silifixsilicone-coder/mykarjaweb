import React from "react";
import { ArrowDown, Info } from "lucide-react";

export const StructureInfoCard: React.FC = () => {
  const steps = [
    "Hero Banner",
    "Product Image",
    "Product Name",
    "Short Details",
    "Price",
    "Buy Now",
  ];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-xs space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
        <Info className="w-4 h-4 text-emerald-400" />
        <span>Landing Page Structure</span>
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed">
        Visual layout order shown to your public customers:
      </p>

      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700/60">
              {step}
            </span>
            {index < steps.length - 1 && (
              <span className="text-slate-500 font-bold text-xs">↓</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
