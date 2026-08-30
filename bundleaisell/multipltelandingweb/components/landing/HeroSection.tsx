import React from "react";
import {
  CheckCircle2,
  Download,
  Infinity as InfinityIcon,
  ShieldCheck,
  Briefcase,
  Headphones,
  Play,
  Star,
} from "lucide-react";

interface HeroSectionProps {
  productName?: string;
  description?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  productName = "AI Video Creator Bundle",
  description = "Everything you need to create, edit and scale AI videos like a pro!",
}) => {
  const benefitsList = [
    "Lifetime Access",
    "Beginner Friendly",
    "Premium Quality Content",
    "Practical & Project Based",
    "Commercial Use Allowed",
  ];

  const benefitCards = [
    { icon: Download, title: "Instant", sub: "Download" },
    { icon: InfinityIcon, title: "Lifetime", sub: "Access" },
    { icon: ShieldCheck, title: "Premium", sub: "Quality" },
    { icon: Briefcase, title: "Commercial", sub: "Use" },
    { icon: Headphones, title: "24/7", sub: "Support" },
  ];

  return (
    <section className="pt-6 sm:pt-10 pb-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Hero Copy & Benefits */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Top Yellow Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FEF08A] text-[#854D0E] text-xs font-black border border-amber-300 shadow-2xs">
            <span>⭐ BEST SELLING BUNDLE</span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111111] leading-[1.1] tracking-tight font-serif">
            {productName.includes("Bundle") ? (
              <>
                {productName.replace("Bundle", "").trim()}
                <br />
                <span className="text-[#111111]">Bundle</span>
              </>
            ) : (
              productName
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-lg text-[#555B57] font-medium leading-relaxed max-w-xl">
            {description}
          </p>

          {/* 5 Benefits Checklist */}
          <div className="space-y-2.5 pt-1">
            {benefitsList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#005C52] fill-[#005C52]/10 shrink-0" />
                <span className="text-sm font-extrabold text-[#111111]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* 5 Small White Benefit Cards Row */}
          <div className="pt-4 grid grid-cols-5 gap-2 sm:gap-3 max-w-lg">
            {benefitCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-2 sm:p-3 border border-black/5 shadow-2xs text-center flex flex-col items-center justify-center space-y-1 hover:shadow-md transition-shadow"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#F8F7E8] text-[#005C52] flex items-center justify-center">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-[#111111] leading-tight">
                    <div>{card.title}</div>
                    <div className="text-slate-500 font-semibold">{card.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Product Mockup Graphic Container */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            
            {/* Deep Green Organic Circle Backdrop */}
            <div className="absolute inset-2 sm:inset-4 rounded-full bg-[#005C52] shadow-xl opacity-95" />

            {/* Gold Star Best Value Seal Stamp */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 text-amber-950 flex flex-col items-center justify-center p-1 text-center shadow-lg border-2 border-white rotate-12">
              <Star className="w-4 h-4 fill-amber-950 stroke-none" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter leading-none">
                BEST
                <br />
                VALUE
              </span>
              <div className="flex gap-0.5 mt-0.5">
                {[...Array(3)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 fill-amber-950 stroke-none" />
                ))}
              </div>
            </div>

            {/* Main 3D Box & Screen Mockup Display */}
            <div className="relative z-10 w-full p-4 flex flex-col items-center">
              <div className="bg-slate-900 text-white rounded-2xl border-4 border-slate-800 shadow-2xl p-4 sm:p-6 w-full space-y-4 text-center transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                
                {/* Product Title Inside Box */}
                <div className="space-y-1 border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase">
                    All In One • Lifetime Access
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                    AI VIDEO CREATOR
                    <br />
                    <span className="text-[#FEF08A]">BUNDLE</span>
                  </h3>
                </div>

                {/* Software Pills Row */}
                <div className="flex items-center justify-center gap-1.5 flex-wrap text-[9px] font-bold text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">runway</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">ChatGPT</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">CapCut</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Midjourney</span>
                </div>

                {/* Simulated Screen with Play Button */}
                <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden group cursor-pointer shadow-inner">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-[#005C52] flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-[#005C52]" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-semibold text-slate-400 bg-slate-900/80 px-2 py-1 rounded-md backdrop-blur-xs">
                    <span>100+ AI Prompts Included</span>
                    <span className="text-emerald-400">✓ Ready</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
