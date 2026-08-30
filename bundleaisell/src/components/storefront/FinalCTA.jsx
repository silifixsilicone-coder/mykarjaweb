import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../data/mockData';

export default function FinalCTA({ language = 'hi' }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.hi;

  const scrollToBundles = () => {
    const el = document.getElementById('bundles');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-deepGreen text-cream py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        <div className="inline-flex items-center gap-2 bg-cream/10 border border-lightGreen/20 px-4 py-2 rounded-full text-lightGreen text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-lightGreen" />
          {t.ctaTag}
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          {t.ctaTitleLine1} <br />
          {t.ctaTitleLine2} <br />
          <span className="text-lightGreen italic">{t.ctaTitleLine3}</span>
        </h2>

        <p className="text-lightGreen text-base sm:text-lg max-w-xl mx-auto font-normal">
          {t.ctaSub}
        </p>

        <div className="pt-4">
          <button
            onClick={scrollToBundles}
            className="inline-flex items-center gap-3 bg-cream hover:bg-white text-brandBlack font-semibold text-xs uppercase tracking-wider px-10 py-4 shadow-xl rounded-sm transition-all hover:scale-105"
          >
            {t.exploreBundlesBtn}
            <ArrowRight className="w-4 h-4 text-brandBlack" />
          </button>
        </div>

      </div>
    </section>
  );
}
