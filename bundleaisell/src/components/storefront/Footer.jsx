import React from 'react';
import { UI_TRANSLATIONS } from '../../data/mockData';

export default function Footer({ onNavigateHome, language = 'hi' }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.hi;

  const scrollToSection = (id) => {
    if (onNavigateHome) onNavigateHome();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <footer className="bg-brandBlack text-cream border-t border-[#222222] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#222222]">
          
          {/* Brand Info */}
          <div className="space-y-2">
            <button onClick={onNavigateHome} className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 bg-deepGreen text-white flex items-center justify-center font-serif text-lg font-bold rounded-sm">
                D
              </div>
              <span className="font-serif text-xl font-bold tracking-wider uppercase text-cream">
                DIGITAL<span className="text-deepGreen">.</span>STORE
              </span>
            </button>
            <p className="text-secondaryText text-xs max-w-sm">
              {language === 'hi' 
                ? 'व्यावसायिक और रचनात्मक विकास के लिए प्रीमियम डिजिटल टूलकिट, टेम्पलेट्स और संसाधन।' 
                : 'Premium digital toolkits, templates, and resources for modern business and creative growth.'}
            </p>
          </div>

          {/* Links Nav */}
          <nav className="flex flex-wrap gap-8 text-xs uppercase tracking-widest font-semibold text-[#AAAAAA]">
            <button onClick={onNavigateHome} className="hover:text-cream transition-colors">
              {language === 'hi' ? 'होम' : 'Home'}
            </button>
            <button onClick={() => scrollToSection('bundles')} className="hover:text-cream transition-colors">
              {t.navBundles}
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-cream transition-colors">
              {t.navFaq}
            </button>
            <a href="#contact" className="hover:text-cream transition-colors">
              {language === 'hi' ? 'संपर्क' : 'Contact'}
            </a>
            <a href="#privacy" className="hover:text-cream transition-colors">
              {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
            </a>
            <a href="#terms" className="hover:text-cream transition-colors">
              {language === 'hi' ? 'नियम व शर्तें' : 'Terms'}
            </a>
          </nav>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] font-mono gap-4">
          <p>© {new Date().getFullYear()} Digital Bundle Store. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>हिंदी (Hindi Default)</span> • <span>English Supported</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
