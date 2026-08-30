import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#040E18] text-cream/70 py-8 sm:py-10 border-t border-gold/20 text-xs w-full box-border">
      <div className="w-[calc(100%-32px)] max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center">
          <span className="text-deva font-extrabold text-cream text-sm sm:text-base">
            कर्ज संपण्याआधीच जगायला शिका
          </span>
        </div>

        <p className="text-deva text-[11px] sm:text-xs text-cream/60 max-w-lg mx-auto">
          LEARN TO LIVE BEFORE THE DEBT IS GONE • Digital eBook Edition
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[11px] text-gold/80 font-medium py-1">
          <a href="#hero" className="hover:text-gold transition-colors">पुस्तकाबद्दल</a>
          <a href="#editions" className="hover:text-gold transition-colors">आवृत्ती</a>
          <a href="#learn" className="hover:text-gold transition-colors">काय शिकाल?</a>
          <a href="#faq" className="hover:text-gold transition-colors">FAQ</a>
        </div>

        <div className="pt-3 border-t border-cream/10 text-cream/40 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-5xl mx-auto text-[10px] sm:text-[11px]">
          <p>© {new Date().getFullYear()} All Rights Reserved. Digital eBook Edition.</p>
          <p>Direct External Payment Redirect • Safe & Secure</p>
        </div>
      </div>
    </footer>
  );
}
