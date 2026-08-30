import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../data/mockData';

export default function PricingSection({ bundles, onSelectBundle, language = 'hi' }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.hi;

  return (
    <section id="pricing" className="bg-deepGreen py-20 lg:py-28 text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading in Hindi */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-lightGreen uppercase">
            {t.pricingTag}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream tracking-tight">
            {t.pricingTitle}
          </h2>
          <p className="text-lightGreen text-base font-normal">
            {t.pricingSub}
          </p>
        </div>

        {/* 3 Horizontal Pricing Cards on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-cream text-brandBlack rounded-xl p-8 border border-white/20 shadow-xl flex flex-col justify-between space-y-8 relative hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-deepGreen text-white px-2.5 py-1 rounded">
                    {bundle.category}
                  </span>
                  <span className="text-xs font-bold text-deepGreen bg-lightGreen border border-deepGreen/20 px-2.5 py-1 rounded">
                    {bundle.discountBadge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-brandBlack leading-tight">
                  {bundle.title}
                </h3>

                <p className="text-secondaryText text-xs sm:text-sm leading-relaxed">
                  {bundle.shortDescription}
                </p>

                {/* Price Display */}
                <div className="pt-2 border-t border-brandBorder space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-secondaryText block">
                    {t.todayPrice}
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-4xl font-bold text-brandBlack">
                      ₹{bundle.offerPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-secondaryText line-through">
                      ₹{bundle.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 text-xs text-brandBlack border-t border-brandBorder pt-4 flex-1">
                {bundle.includedItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-deepGreen flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                ))}
              </div>

              {/* Buy Now Button */}
              <div className="pt-4 border-t border-brandBorder">
                <button
                  onClick={() => onSelectBundle(bundle.id)}
                  className="w-full flex items-center justify-center gap-2 bg-brandBlack hover:bg-deepGreen text-cream hover:text-white text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-sm transition-all duration-200 shadow-md group"
                >
                  {t.buyNowBtn}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="block text-[11px] text-center text-secondaryText mt-2 font-mono">
                  {t.pillInstant}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
