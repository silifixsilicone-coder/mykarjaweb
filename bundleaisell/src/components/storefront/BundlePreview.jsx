import React, { useState } from 'react';
import { Eye, ChevronRight } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../data/mockData';

export default function BundlePreview({ bundles, language = 'hi' }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.hi;
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Collect all preview images
  const allPreviews = bundles.flatMap(bundle => 
    bundle.previewImages.map(img => ({
      ...img,
      category: bundle.category,
      bundleTitle: bundle.title
    }))
  );

  const filteredPreviews = activeCategory === 'ALL' 
    ? allPreviews 
    : allPreviews.filter(img => img.category === activeCategory);

  const categories = language === 'hi'
    ? ['ALL', 'एक्सेल टूल्स', 'AI वीडियो', 'ग्राफिक डिज़ाइन']
    : ['ALL', 'EXCEL TOOLS', 'AI VIDEO', 'GRAPHIC DESIGN'];

  return (
    <section className="bg-white py-20 border-b border-brandBorder overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 text-left">
            <span className="text-xs font-bold tracking-widest text-deepGreen uppercase">
              {t.previewSecTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brandBlack tracking-tight">
              {t.previewSecTitle}
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-normal">
              {t.previewSecSub}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap border ${
                  activeCategory === cat
                    ? 'bg-deepGreen text-white border-deepGreen shadow-sm'
                    : 'bg-cream text-brandBlack border-brandBorder hover:border-deepGreen/50'
                }`}
              >
                {cat === 'ALL' ? t.previewAll : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Gallery */}
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
          {filteredPreviews.map((item, idx) => (
            <div
              key={idx}
              className="flex-none w-[280px] sm:w-[320px] md:w-auto bg-cream rounded-lg border border-brandBorder overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group snap-start flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-brandBlack/5 overflow-hidden flex items-center justify-center">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-deepGreen/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-brandBlack text-xs font-bold px-3 py-1.5 rounded shadow flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-deepGreen" /> {t.previewSecTitle}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-brandBorder flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-deepGreen uppercase tracking-widest block">
                    {item.category}
                  </span>
                  <h4 className="font-serif font-bold text-brandBlack text-sm mt-0.5 truncate">
                    {item.title}
                  </h4>
                </div>
                <span className="text-[11px] text-secondaryText truncate mt-2 font-mono">
                  {item.bundleTitle}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex md:hidden items-center justify-center gap-2 text-xs text-secondaryText pt-2">
          <span>{t.swipeHelper}</span>
          <ChevronRight className="w-4 h-4 text-deepGreen animate-pulse" />
        </div>

      </div>
    </section>
  );
}
