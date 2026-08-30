import React from "react";
import { Users, Star, PlayCircle, ShieldCheck } from "lucide-react";

export const TrustStatsBar: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Happy",
      subLabel: "Customers",
    },
    {
      icon: Star,
      value: "4.8",
      label: "Average",
      subLabel: "Rating",
    },
    {
      icon: PlayCircle,
      value: "50+",
      label: "Hours of",
      subLabel: "Content",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "Satisfaction",
      subLabel: "Guarantee",
    },
  ];

  return (
    <section className="py-4 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-5 sm:p-6 border border-black/5 shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 ${
                  idx > 0 ? "pt-4 md:pt-0 md:pl-6" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#F8F7E8] text-[#005C52] flex items-center justify-center shrink-0">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#111111] leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-[#555B57] leading-tight pt-0.5">
                    <div>{stat.label}</div>
                    <div>{stat.subLabel}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
