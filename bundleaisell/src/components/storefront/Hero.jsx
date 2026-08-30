import React from 'react';
import { ArrowRight, Check, Sparkles, FileSpreadsheet, Video, Palette } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../data/mockData';

export default function Hero({ onExploreClick, language = 'hi' }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.hi;

  const scrollToBundles = () => {
    const el = document.getElementById('bundles');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-cream py-16 lg:py-24 border-b border-brandBorder overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Small Green Label in Hindi */}
            <div className="inline-flex items-center gap-2 bg-lightGreen border border-deepGreen/20 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-deepGreen"></span>
              <span className="text-[11px] font-bold tracking-widest text-deepGreen uppercase">
                {t.heroTag}
              </span>
            </div>

            {/* Large Hindi Editorial Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brandBlack leading-[1.2]">
              <span className="text-deepGreen block italic">{t.heroTitlePrefix}</span>
              {t.heroTitleSuffix}
            </h1>

            {/* Supporting Hindi Text */}
            <p className="text-secondaryText text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              "{t.heroDesc}"
            </p>

            {/* CTA & Features list */}
            <div className="pt-2 space-y-6">
              <button
                onClick={scrollToBundles}
                className="inline-flex items-center justify-center gap-3 bg-deepGreen hover:bg-deepGreen-hover text-white text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 group"
              >
                {t.allBundlesBtn}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Minimal Trust Pills */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-secondaryText pt-2">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-deepGreen" /> {t.pillEditable}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-deepGreen" /> {t.pillOneTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-deepGreen" /> {t.pillInstant}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="absolute -inset-4 bg-lightGreen/50 rounded-2xl -rotate-1 border border-brandBorder -z-10"></div>
              
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-brandBorder space-y-5">
                
                <div className="flex items-center justify-between border-b border-brandBorder pb-4">
                  <span className="text-xs font-bold tracking-widest text-deepGreen uppercase">
                    {t.featuredTag}
                  </span>
                  <span className="text-[11px] bg-cream px-2.5 py-1 rounded text-secondaryText border border-brandBorder font-mono">
                    {t.curatedCount}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {/* Category 1 */}
                  <div className="p-4 bg-cream/60 rounded-lg border border-brandBorder hover:border-deepGreen/40 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded bg-deepGreen text-white flex items-center justify-center shadow-sm">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-deepGreen block">
                          {t.cat1}
                        </span>
                        <h4 className="font-serif font-bold text-brandBlack text-base group-hover:text-deepGreen transition-colors">
                          {language === 'hi' ? 'अल्टीमेट एक्सेल फाइल बंडल' : 'Excel File Bundle'}
                        </h4>
                      </div>
                    </div>
                    <span className="bg-white px-3 py-1 text-xs font-bold text-brandBlack border border-brandBorder rounded">
                      150+ Templates
                    </span>
                  </div>

                  {/* Category 2 */}
                  <div className="p-4 bg-cream/60 rounded-lg border border-brandBorder hover:border-deepGreen/40 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded bg-brandBlack text-cream flex items-center justify-center shadow-sm">
                        <Video className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-deepGreen block">
                          {t.cat2}
                        </span>
                        <h4 className="font-serif font-bold text-brandBlack text-base group-hover:text-deepGreen transition-colors">
                          {language === 'hi' ? 'AI वीडियो और रील्स बंडल' : 'AI Video & Reels Bundle'}
                        </h4>
                      </div>
                    </div>
                    <span className="bg-white px-3 py-1 text-xs font-bold text-brandBlack border border-brandBorder rounded">
                      500+ Assets
                    </span>
                  </div>

                  {/* Category 3 */}
                  <div className="p-4 bg-cream/60 rounded-lg border border-brandBorder hover:border-deepGreen/40 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded bg-deepGreen text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-deepGreen block">
                          {t.cat3}
                        </span>
                        <h4 className="font-serif font-bold text-brandBlack text-base group-hover:text-deepGreen transition-colors">
                          {language === 'hi' ? 'अल्टीमेट ग्राफिक डिज़ाइन बंडल' : 'Graphic Design Bundle'}
                        </h4>
                      </div>
                    </div>
                    <span className="bg-white px-3 py-1 text-xs font-bold text-brandBlack border border-brandBorder rounded">
                      1000+ Vectors
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-secondaryText border-t border-brandBorder/60">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-deepGreen" /> {t.brandSubtitle}
                  </span>
                  <span className="font-bold text-brandBlack">{t.saveUpTo}</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
