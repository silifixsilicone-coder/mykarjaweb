import React from "react";
import { LandingPageStatus } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: LandingPageStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const isPublished = status === "Published";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border transition-colors",
        isPublished
          ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
          : "bg-slate-100 text-slate-600 border-slate-200/80",
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full shrink-0",
          isPublished ? "bg-emerald-500" : "bg-slate-400"
        )}
      />
      {status}
    </span>
  );
};
