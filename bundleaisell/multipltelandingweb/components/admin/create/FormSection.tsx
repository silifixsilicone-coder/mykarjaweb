import React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4",
        className
      )}
    >
      <div className="space-y-0.5 border-b border-slate-100 pb-3">
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};
