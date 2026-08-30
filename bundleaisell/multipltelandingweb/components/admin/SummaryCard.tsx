import React from "react";
import { SummaryStat } from "@/types/dashboard";
import { Layers, CheckCircle2, FileEdit, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  stat: SummaryStat;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ stat }) => {
  const getStatIcon = (id: string) => {
    switch (id) {
      case "stat-1":
        return <Layers className="w-4 h-4 text-slate-700" />;
      case "stat-2":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "stat-3":
        return <FileEdit className="w-4 h-4 text-amber-600" />;
      case "stat-4":
        return <Package className="w-4 h-4 text-slate-700" />;
      default:
        return <Layers className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {stat.title}
        </span>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          {getStatIcon(stat.id)}
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold tracking-tight text-slate-900">
          {stat.number}
        </div>
        <p
          className={cn(
            "text-xs font-medium",
            stat.id === "stat-2"
              ? "text-emerald-600"
              : stat.id === "stat-3"
              ? "text-amber-600"
              : "text-slate-400"
          )}
        >
          {stat.info}
        </p>
      </div>
    </div>
  );
};
