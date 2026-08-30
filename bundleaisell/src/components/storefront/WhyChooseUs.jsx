import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { UI_TRANSLATIONS, WHY_CHOOSE_US_ITEMS_HI, WHY_CHOOSE_US_ITEMS } from '../../data/mockData';

export default function WhyChooseUs({ language = 'hi' }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.hi;
  const items = language === 'hi' ? WHY_CHOOSE_US_ITEMS_HI : WHY_CHOOSE_US_ITEMS;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-brandBlack group-hover:text-deepGreen transition-colors" />;
      case 'Clock': return <Clock className="w-6 h-6 text-brandBlack group-hover:text-deepGreen transition-colors" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brandBlack group-hover:text-deepGreen transition-colors" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-brandBlack group-hover:text-deepGreen transition-colors" />;
      default: return <CheckCircle2 className="w-6 h-6 text-brandBlack" />;
    }
  };

  return (
    <section id="why-us" className="bg-cream py-20 border-b border-brandBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading in Hindi */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold tracking-widest text-deepGreen uppercase">
            {t.whyUsTag}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brandBlack tracking-tight leading-snug">
            {t.whyUsTitle}
          </h2>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg border border-brandBorder shadow-sm hover:border-deepGreen/50 transition-all duration-300 group space-y-4"
            >
              <div className="w-12 h-12 rounded bg-cream border border-brandBorder flex items-center justify-center relative">
                {getIcon(item.icon)}
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-deepGreen"></span>
              </div>

              <h3 className="font-serif font-bold text-lg text-brandBlack group-hover:text-deepGreen transition-colors">
                {item.title}
              </h3>

              <p className="text-secondaryText text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
