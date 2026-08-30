"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BuyButton } from "@/components/ui/BuyButton";
import { cn } from "@/lib/utils";
import type { SiteSettings, Edition } from "@/lib/types";

interface NavbarProps {
  settings?: SiteSettings;
  editions?: Edition[];
}

export function Navbar({ settings, editions = [] }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "पुस्तकाबद्दल", href: "#hero" },
    { name: "आवृत्ती", href: "#editions" },
    { name: "काय शिकाल?", href: "#learn" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const primaryEdition = editions.find((e) => e.enabled) || editions[0];
  const ctaUrl = settings?.navbarPaymentUrl && settings.navbarPaymentUrl.trim() !== ""
    ? settings.navbarPaymentUrl
    : (primaryEdition?.paymentUrl || "#editions");

  const ctaText = settings?.navbarCtaText || "eBook घ्या";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full box-border",
        isScrolled
          ? "bg-cream/95 backdrop-blur-md shadow-md py-3 border-b border-gold/20"
          : "bg-transparent py-4 md:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full box-border">
        <div className="flex items-center justify-between gap-3">
          {/* Brand / Logo */}
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
          >
            {/* Book Icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-navy to-navy-light flex items-center justify-center border border-gold/40 shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            {/* Title - Fully visible, never clipped */}
            <div className="flex flex-col py-0.5">
              <span className="text-deva font-bold text-xs xs:text-sm sm:text-base md:text-lg text-navy tracking-tight group-hover:text-gold transition-colors leading-normal whitespace-nowrap">
                कर्ज संपण्याआधीच जगायला शिका
              </span>
              <span className="text-[9px] sm:text-[10px] text-navy/60 font-sans tracking-wider uppercase font-semibold hidden sm:inline-block leading-tight">
                Digital eBook
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-deva text-sm font-semibold text-main/80 hover:text-gold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <BuyButton href={ctaUrl} size="sm" variant="primary">
              {ctaText}
            </BuyButton>
          </div>

          {/* Mobile Hamburger Button Only */}
          <div className="flex items-center md:hidden shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-navy hover:bg-gold/10 border border-gold/20 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream border-b border-gold/30 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200 w-full box-border">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-deva text-base font-semibold text-main hover:text-gold px-3 py-2 rounded-lg hover:bg-gold/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-5 pt-4 border-t border-gold/20 flex flex-col gap-2">
            <BuyButton href={ctaUrl} size="md" variant="primary" className="w-full">
              {ctaText}
            </BuyButton>
          </div>
        </div>
      )}
    </header>
  );
}
