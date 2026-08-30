import React from "react";
import { Menu, BookOpen, ShoppingBag } from "lucide-react";

interface LandingNavbarProps {
  brandName?: string;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  brandName = "YourBrand",
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/5 px-4 sm:px-8 py-3 transition-all shadow-2xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Hamburger + Logo + Brand Name */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="p-1 text-slate-800 hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#005C52] text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4 fill-white" />
            </div>
            <span className="font-black text-lg sm:text-xl text-[#111111] tracking-tight">
              {brandName}
            </span>
          </div>
        </div>

        {/* Center/Right: Best Value Bundle Badge & Cart Icon */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Badge */}
          <div className="hidden xs:flex items-center gap-1 px-3 py-1 rounded-full bg-[#FEF08A] text-[#854D0E] text-xs font-bold border border-amber-300/80 shadow-2xs">
            <span>Best Value Bundle</span>
            <span className="text-xs">🔥</span>
          </div>

          {/* Cart Icon */}
          <div className="relative cursor-pointer group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#005C52] text-white flex items-center justify-center shadow-xs group-hover:bg-[#004840] transition-colors">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-2xs">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
