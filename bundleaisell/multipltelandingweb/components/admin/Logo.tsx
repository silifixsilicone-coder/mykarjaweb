import React from "react";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("inline-flex items-center space-x-2.5", className)}>
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/10">
        <Package className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-extrabold tracking-wider text-sm text-slate-900 uppercase">
          DIGITAL BUNDLE
        </span>
        <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase -mt-0.5">
          Admin Portal
        </span>
      </div>
    </div>
  );
};
