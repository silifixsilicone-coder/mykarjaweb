import React from 'react';
import { ArrowRight } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../data/mockData';

export default function PromoBanner({ language = 'hi' }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.hi;

  const scrollToBundles = () => {
    const el = document.getElementById('bundles');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-deepGreen text-cream py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold tracking-widest text-lightGreen uppercase">
          {t.promo1Tag}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          {t.promo1TitleLine1} <br className="hidden sm:inline" />
          {t.promo1TitleLine2}
        </h2>
        <p className="text-lightGreen text-base sm:text-lg max-w-xl mx-auto font-normal">
          {t.promo1Desc}
        </p>
        <div className="pt-4">
          <button
            onClick={scrollToBundles}
            className="inline-flex items-center gap-3 bg-cream hover:bg-white text-brandBlack font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            {t.allBundlesBtn}
            <ArrowRight className="w-4 h-4 text-brandBlack" />
          </button>
        </div>
      </div>
    </section>
  );
}
