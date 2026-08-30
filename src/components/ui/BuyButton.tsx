"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BuyButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "navy" | "sticky";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
}

export function BuyButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: BuyButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    if (!href) return;
    
    let targetUrl = href.trim();
    if (
      !targetUrl.startsWith("http://") &&
      !targetUrl.startsWith("https://") &&
      !targetUrl.startsWith("#")
    ) {
      targetUrl = `https://${targetUrl}`;
    }

    if (targetUrl.startsWith("#")) {
      const element = document.querySelector(targetUrl);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = targetUrl;
    }
  };

  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-wide rounded-full transition-all duration-300 transform active:scale-95 shadow-md cursor-pointer select-none min-h-[44px] box-border text-center max-w-[340px] md:max-w-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-gold via-gold-light to-gold text-navy hover:shadow-xl hover:-translate-y-0.5 hover:brightness-110 border border-gold-light/40",
    secondary:
      "bg-navy text-gold border border-gold/40 hover:bg-navy-light hover:border-gold hover:shadow-lg hover:-translate-y-0.5",
    navy:
      "bg-navy text-cream hover:bg-navy-light border border-navy-light hover:shadow-lg hover:-translate-y-0.5",
    sticky:
      "bg-gradient-to-r from-gold via-gold-light to-gold text-navy font-extrabold w-full max-w-full shadow-2xl py-3 text-base sm:text-lg border border-gold-light/50",
  };

  const sizes = {
    sm: "px-4 py-2.5 text-xs sm:text-sm",
    md: "px-5 py-3 text-sm sm:text-base",
    lg: "px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg",
    xl: "px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-xl",
  };

  return (
    <button
      onClick={handleClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      <span className="truncate">{children}</span>
    </button>
  );
}
