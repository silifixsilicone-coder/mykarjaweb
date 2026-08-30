import React from 'react';
import { ArrowUpRight, Globe } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../data/mockData';

export default function Header({ onExploreClick, onNavigateHome, language = 'hi', setLanguage }) {
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
    <header className="bg-cream border-b border-brandBorder sticky top-[45px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-3 group text-left focus:outline-none flex-shrink-0"
        >
          <div className="w-10 h-10 bg-deepGreen text-white flex items-center justify-center font-serif text-xl font-bold tracking-tight rounded-sm transition-transform group-hover:scale-105">
            D
          </div>
          <div>
            <span className="block font-serif text-lg font-bold tracking-wider text-brandBlack group-hover:text-deepGreen transition-colors uppercase">
              DIGITAL<span className="text-deepGreen">.</span>STORE
            </span>
            <span className="block text-[10px] tracking-widest text-secondaryText font-semibold">
              {t.brandSubtitle}
            </span>
          </div>
        </button>

        {/* Center: Navigation Links in Hindi */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider font-semibold text-brandBlack">
          <button 
            onClick={onNavigateHome}
            className="hover:text-deepGreen transition-colors py-2 relative group"
          >
            होम
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-deepGreen transition-all group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('bundles')}
            className="hover:text-deepGreen transition-colors py-2 relative group"
          >
            {t.navBundles}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-deepGreen transition-all group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('why-us')}
            className="hover:text-deepGreen transition-colors py-2 relative group"
          >
            {t.navWhyUs}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-deepGreen transition-all group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="hover:text-deepGreen transition-colors py-2 relative group"
          >
            {t.navFaq}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-deepGreen transition-all group-hover:w-full"></span>
          </button>
        </nav>

        {/* Right: Language Selector & CTA Button */}
        <div className="flex items-center gap-3">
          
          {/* Header Language Selector (Default: Hindi) */}
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded border border-brandBorder shadow-sm text-xs">
            <Globe className="w-3.5 h-3.5 text-deepGreen flex-shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent font-bold text-brandBlack focus:outline-none cursor-pointer text-xs"
              aria-label="Select Language"
            >
              <option value="hi">हिंदी (Hindi)</option>
              <option value="en">English</option>
            </select>
          </div>

          <button
            onClick={() => scrollToSection('bundles')}
            className="inline-flex items-center gap-2 bg-deepGreen hover:bg-deepGreen-hover text-white text-xs font-bold tracking-wider px-5 py-3 rounded-sm shadow-sm transition-all hover:shadow hover:-translate-y-0.5 whitespace-nowrap"
          >
            {t.exploreBundlesBtn}
            <ArrowUpRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
}
