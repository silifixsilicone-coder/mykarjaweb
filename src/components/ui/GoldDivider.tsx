import React from "react";
import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  centered?: boolean;
}

export function GoldDivider({ className = "", centered = true }: GoldDividerProps) {
  return (
    <div className={cn("flex items-center gap-2 my-4", centered && "justify-center", className)}>
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
      <div className="w-2 h-2 rotate-45 bg-gold border border-gold-light" />
      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}
