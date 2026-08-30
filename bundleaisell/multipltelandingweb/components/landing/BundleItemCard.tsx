import React from "react";
import { BundleItem } from "@/lib/bundleData";
import {
  CheckCircle2,
  BookOpen,
  Wrench,
  Sparkles,
  Video,
  Film,
  FileText,
  Layout,
} from "lucide-react";

interface BundleItemCardProps {
  item: BundleItem;
}

export const BundleItemCard: React.FC<BundleItemCardProps> = ({ item }) => {
  const renderIcon = () => {
    switch (item.iconType) {
      case "ebook":
        return <BookOpen className="w-6 h-6 text-emerald-300" />;
      case "guide":
        return <Wrench className="w-6 h-6 text-emerald-300" />;
      case "prompts":
        return <Sparkles className="w-6 h-6 text-emerald-300" />;
      case "ad":
        return <Video className="w-6 h-6 text-emerald-300" />;
      case "reels":
        return <Film className="w-6 h-6 text-emerald-300" />;
      case "bonus":
        return <FileText className="w-6 h-6 text-emerald-300" />;
      case "template":
        return <Layout className="w-6 h-6 text-emerald-300" />;
      default:
        return <BookOpen className="w-6 h-6 text-emerald-300" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-black/5 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
      
      {/* LEFT: Dark Green Thumbnail Box */}
      <div className="w-full md:w-56 h-28 bg-[#003833] rounded-xl p-3 flex items-center justify-between text-white shrink-0 border border-emerald-900/40 shadow-inner">
        <div className="space-y-0.5">
          <div className="text-xs font-black tracking-wider text-white uppercase leading-tight">
            {item.badgeTitle}
          </div>
          <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
            {item.badgeSub}
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
          {renderIcon()}
        </div>
      </div>

      {/* CENTER: Title, Description & 3 Check Tags */}
      <div className="space-y-2 text-left w-full flex-1">
        <h3 className="text-base sm:text-lg font-bold text-[#111111] tracking-tight">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#555B57] font-medium leading-relaxed">
          {item.description}
        </p>

        {/* 3 Check Metadata Tags */}
        <div className="flex items-center gap-3 pt-1 flex-wrap text-[11px] font-semibold text-slate-600">
          {item.tags.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#005C52] shrink-0" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Original Price, Included Price & INCLUDED Button */}
      <div className="flex md:flex-col items-center justify-between md:justify-center gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
        <div className="flex items-center md:flex-col md:items-end gap-2 md:gap-0">
          <span className="line-through text-slate-400 font-bold text-xs sm:text-sm">
            ₹{item.originalPrice}
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#005C52]">
            ₹{item.includedPrice}
          </span>
        </div>

        <div className="px-5 py-2 rounded-xl bg-[#003833] text-white font-extrabold text-xs uppercase tracking-wider shadow-2xs">
          INCLUDED
        </div>
      </div>

    </div>
  );
};
