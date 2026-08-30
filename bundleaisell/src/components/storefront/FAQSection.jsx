import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../data/mockData';

export default function FAQSection({ faqs, language = 'hi' }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.hi;
  const [openId, setOpenId] = useState(faqs[0]?.id || null);

  const toggleAccordion = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="bg-cream py-20 border-b border-brandBorder">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading in Hindi */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold tracking-widest text-deepGreen uppercase">
            {t.faqTag}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brandBlack tracking-tight">
            {t.faqTitle}
          </h2>
          <p className="text-secondaryText text-sm sm:text-base">
            {t.faqSub}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-lg border border-brandBorder shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-lg text-brandBlack hover:text-deepGreen transition-colors focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0 border border-brandBorder transition-transform duration-300 ${isOpen ? 'rotate-180 bg-deepGreen text-white' : 'text-brandBlack'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-secondaryText text-sm leading-relaxed border-t border-brandBorder/40 pt-4 bg-cream/30">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
