import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../data/mockData';

export default function SecondPromoBanner({ language = 'hi' }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.hi;

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-cream py-16 lg:py-20 border-b border-brandBorder relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-deepGreen/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border-2 border-deepGreen p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm relative">
          
          <div className="w-2 h-16 bg-deepGreen hidden lg:block rounded-full"></div>

          <div className="space-y-3 text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 text-deepGreen text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-4 h-4" />
              {t.promo2Tag}
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brandBlack tracking-tight">
              {t.promo2Title}
            </h3>
            <p className="text-secondaryText text-sm sm:text-base max-w-xl">
              {t.promo2Desc}
            </p>
          </div>

          <div>
            <button
              onClick={scrollToPricing}
              className="inline-flex items-center gap-3 bg-deepGreen hover:bg-deepGreen-hover text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            >
              {t.getBundleBtn}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
