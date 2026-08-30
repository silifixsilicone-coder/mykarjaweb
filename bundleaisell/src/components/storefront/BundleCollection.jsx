import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../data/mockData';

export default function BundleCollection({ bundles, onSelectBundle, language = 'hi' }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.hi;

  return (
    <section id="bundles" className="bg-white py-20 border-b border-brandBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading in Hindi */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold tracking-widest text-deepGreen uppercase">
            {t.bundleSecTag}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brandBlack tracking-tight">
            {t.bundleSecTitle}
          </h2>
          <p className="text-secondaryText text-base font-normal">
            {t.bundleSecSub}
          </p>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white rounded-xl border border-brandBorder shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-deepGreen/50"
            >
              {/* Top Image Preview & Discount Badge */}
              <div className="relative aspect-[16/10] bg-cream overflow-hidden border-b border-brandBorder">
                <img
                  src={bundle.coverImage}
                  alt={bundle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-deepGreen text-white text-[11px] font-bold tracking-wider px-3 py-1 rounded uppercase shadow-sm">
                  {bundle.category}
                </div>
                <div className="absolute top-4 right-4 bg-cream text-brandBlack text-[11px] font-bold tracking-wider px-3 py-1 rounded border border-brandBorder shadow-sm">
                  {bundle.discountBadge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-brandBlack group-hover:text-deepGreen transition-colors leading-snug">
                    {bundle.title}
                  </h3>
                  <p className="text-secondaryText text-sm leading-relaxed">
                    "{bundle.shortDescription}"
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-brandBorder/60 text-xs text-brandBlack">
                  {bundle.includedItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-secondaryText">
                      <CheckCircle2 className="w-3.5 h-3.5 text-deepGreen flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Button */}
                <div className="pt-4 border-t border-brandBorder space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-bold text-brandBlack">
                      ₹{bundle.offerPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-secondaryText line-through font-normal">
                      ₹{bundle.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectBundle(bundle.id)}
                    className="w-full flex items-center justify-center gap-2 bg-cream hover:bg-deepGreen text-brandBlack hover:text-white border border-brandBorder hover:border-deepGreen text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-sm transition-all duration-200 shadow-sm"
                  >
                    {t.viewBundleBtn}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
