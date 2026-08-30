import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import Header from '../components/storefront/Header';
import Footer from '../components/storefront/Footer';
import { UI_TRANSLATIONS } from '../data/mockData';

export default function BundleDetailPage({ bundle, faqs, onBackToHome, language = 'hi', setLanguage }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.hi;
  const [faqOpenId, setFaqOpenId] = useState(faqs[0]?.id || null);

  if (!bundle) return null;

  return (
    <div className="min-h-screen bg-cream text-brandBlack flex flex-col font-sans">
      <Header onNavigateHome={onBackToHome} language={language} setLanguage={setLanguage} />

      {/* Top Breadcrumb & Back Bar */}
      <div className="bg-white border-b border-brandBorder py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondaryText hover:text-deepGreen transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToBundles}
          </button>
          <span className="text-xs font-mono text-secondaryText hidden sm:inline">
            Storefront / {bundle.category}
          </span>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="bg-cream py-16 lg:py-20 border-b border-brandBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-lightGreen border border-deepGreen/20 px-3.5 py-1.5 rounded-full">
                <span className="text-[11px] font-bold tracking-widest text-deepGreen uppercase">
                  {bundle.category}
                </span>
                <span className="text-[11px] bg-deepGreen text-white px-2 py-0.5 rounded font-bold">
                  {bundle.discountBadge}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brandBlack tracking-tight leading-tight">
                {bundle.title}
              </h1>

              <p className="text-secondaryText text-base sm:text-lg leading-relaxed">
                {bundle.fullDescription}
              </p>

              <div className="flex flex-wrap items-baseline gap-4 pt-2">
                <span className="font-serif text-4xl font-bold text-brandBlack">
                  ₹{bundle.offerPrice.toLocaleString()}
                </span>
                <span className="text-lg text-secondaryText line-through font-normal">
                  ₹{bundle.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-deepGreen bg-white px-3 py-1 rounded border border-brandBorder">
                  {t.pillOneTime}
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={bundle.paymentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-deepGreen hover:bg-deepGreen-hover text-white text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-sm shadow-md transition-all hover:shadow-lg"
                >
                  {bundle.buyButtonText || t.buyNowBtn}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <span className="text-xs text-secondaryText flex items-center gap-1.5 justify-center sm:justify-start font-mono">
                  <ShieldCheck className="w-4 h-4 text-deepGreen" /> {t.pillInstant}
                </span>
              </div>
            </div>

            {/* Right Cover Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white p-3 rounded-2xl border border-brandBorder shadow-lg overflow-hidden group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-cream">
                  <img
                    src={bundle.coverImage}
                    alt={bundle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 bg-brandBlack/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded font-mono">
                    {t.officialCover}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHAT'S INCLUDED */}
      <section className="bg-white py-20 border-b border-brandBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold tracking-widest text-deepGreen uppercase">
              {language === 'hi' ? 'सम्पूर्ण पैकेज' : 'COMPLETE PACKAGE'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brandBlack tracking-tight">
              {t.whatsInsideTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundle.includedItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-cream/50 p-6 rounded-lg border border-brandBorder space-y-3 hover:border-deepGreen/50 transition-colors"
              >
                <div className="w-10 h-10 rounded bg-deepGreen text-white flex items-center justify-center font-bold font-mono text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-serif font-bold text-lg text-brandBlack">
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

      {/* 3. PREVIEW GALLERY */}
      <section className="bg-cream py-20 border-b border-brandBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold tracking-widest text-deepGreen uppercase">
              {t.previewSecTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brandBlack tracking-tight">
              {t.previewSecTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bundle.previewImages.map((img) => (
              <div
                key={img.id}
                className="bg-white rounded-lg border border-brandBorder overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-brandBlack/5 overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-white border-t border-brandBorder">
                  <h4 className="font-serif font-bold text-brandBlack text-sm truncate">
                    {img.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BENEFITS */}
      <section className="bg-white py-20 border-b border-brandBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold tracking-widest text-deepGreen uppercase">
              {t.keyAdvantageTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brandBlack tracking-tight">
              {t.benefitsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-8 bg-cream rounded-xl border border-brandBorder space-y-4">
              <div className="w-12 h-12 bg-deepGreen text-white rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brandBlack">
                {language === 'hi' ? 'सैंकड़ों घंटे बचाएं' : 'Save Hundreds of Hours'}
              </h3>
              <p className="text-secondaryText text-sm leading-relaxed">
                {language === 'hi' 
                  ? 'शुरुआत से बनाने की परेशानी खत्म करें। विशेषज्ञों द्वारा बनाए गए टेम्पलेट्स का उपयोग करें।'
                  : 'Eliminate blank canvas syndrome. Use battle-tested templates and scripts built by specialists.'}
              </p>
            </div>

            <div className="p-8 bg-cream rounded-xl border border-brandBorder space-y-4">
              <div className="w-12 h-12 bg-brandBlack text-cream rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brandBlack">
                {language === 'hi' ? '100% संपादन योग्य' : '100% Fully Editable'}
              </h3>
              <p className="text-secondaryText text-sm leading-relaxed">
                {language === 'hi'
                  ? 'रंग, टेक्स्ट, फॉर्मूले और लेआउट को अपनी इच्छानुसार आसानी से बदलें।'
                  : 'Customize colors, text, formulas, prompts, and layout assets with total freedom.'}
              </p>
            </div>

            <div className="p-8 bg-cream rounded-xl border border-brandBorder space-y-4">
              <div className="w-12 h-12 bg-deepGreen text-white rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brandBlack">
                {language === 'hi' ? 'कमर्शियल उपयोग के अधिकार' : 'Commercial Usage Rights'}
              </h3>
              <p className="text-secondaryText text-sm leading-relaxed">
                {language === 'hi'
                  ? 'अपने पर्सनल प्रोजेक्ट्स और क्लाइंट्स के काम के लिए स्वतंत्रतापूर्वक उपयोग करें।'
                  : 'Use all included tools for personal projects, client contracts, and agency deliverables.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROMOTIONAL BANNER */}
      <section className="bg-deepGreen text-cream py-16">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            {t.instantDownloadBanner}
          </h2>
          <p className="text-lightGreen max-w-xl mx-auto text-base">
            {t.instantDownloadSub}
          </p>
          <a
            href={bundle.paymentUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-cream text-brandBlack font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-sm shadow-md hover:bg-white"
          >
            {t.getBundleNow}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 6. PRICING CARD */}
      <section className="bg-cream py-20 border-b border-brandBorder">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl border-2 border-deepGreen p-8 sm:p-10 shadow-xl space-y-6 text-center">
            <span className="bg-deepGreen text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider inline-block">
              {bundle.discountBadge}
            </span>

            <h3 className="font-serif text-3xl font-bold text-brandBlack">
              {bundle.title}
            </h3>

            <div className="space-y-1">
              <span className="text-xs font-bold text-secondaryText uppercase tracking-wider block">{t.todayPrice}</span>
              <div className="flex items-baseline justify-center gap-3">
                <span className="font-serif text-5xl font-bold text-brandBlack">
                  ₹{bundle.offerPrice.toLocaleString()}
                </span>
                <span className="text-lg text-secondaryText line-through">
                  ₹{bundle.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <a
              href={bundle.paymentUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-deepGreen hover:bg-deepGreen-hover text-white text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-sm shadow-md"
            >
              {bundle.buyButtonText || t.buyNowBtn}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="bg-white py-20 border-b border-brandBorder">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-serif text-3xl font-bold text-brandBlack">
              {t.faqTitle}
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = faqOpenId === faq.id;
              return (
                <div key={faq.id} className="bg-cream/40 rounded-lg border border-brandBorder overflow-hidden">
                  <button
                    onClick={() => setFaqOpenId(prev => prev === faq.id ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between font-serif font-bold text-base text-brandBlack"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-deepGreen' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-secondaryText text-sm border-t border-brandBorder/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="bg-deepGreen text-cream py-20 text-center space-y-6">
        <h2 className="font-serif text-4xl font-bold text-white">
          {t.readyToStart}
        </h2>
        <p className="text-lightGreen max-w-md mx-auto text-sm">
          {t.transformProductivity}
        </p>
        <a
          href={bundle.paymentUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-cream text-brandBlack font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-white"
        >
          {bundle.buyButtonText || t.buyNowBtn}
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

      <Footer onNavigateHome={onBackToHome} language={language} />
    </div>
  );
}
