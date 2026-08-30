import React from 'react';
import Header from '../components/storefront/Header';
import Hero from '../components/storefront/Hero';
import BundleCollection from '../components/storefront/BundleCollection';
import PromoBanner from '../components/storefront/PromoBanner';
import WhyChooseUs from '../components/storefront/WhyChooseUs';
import BundlePreview from '../components/storefront/BundlePreview';
import SecondPromoBanner from '../components/storefront/SecondPromoBanner';
import PricingSection from '../components/storefront/PricingSection';
import FAQSection from '../components/storefront/FAQSection';
import FinalCTA from '../components/storefront/FinalCTA';
import Footer from '../components/storefront/Footer';

export default function HomePage({ bundles, faqs, sections, banners, onSelectBundle, language = 'hi', setLanguage }) {
  const isSectionEnabled = (key) => {
    const sec = sections.find(s => s.key === key);
    return sec ? sec.enabled : true;
  };

  return (
    <div className="min-h-screen bg-cream text-brandBlack flex flex-col font-sans">
      <Header
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-1">
        {isSectionEnabled('hero') && (
          <Hero onExploreClick={() => {}} language={language} />
        )}
        
        {isSectionEnabled('bundles') && (
          <BundleCollection
            bundles={bundles}
            onSelectBundle={onSelectBundle}
            language={language}
          />
        )}

        {isSectionEnabled('banner1') && (
          <PromoBanner language={language} />
        )}

        {isSectionEnabled('whyUs') && (
          <WhyChooseUs language={language} />
        )}

        {isSectionEnabled('preview') && (
          <BundlePreview bundles={bundles} language={language} />
        )}

        {isSectionEnabled('banner2') && (
          <SecondPromoBanner language={language} />
        )}

        {isSectionEnabled('pricing') && (
          <PricingSection
            bundles={bundles}
            onSelectBundle={onSelectBundle}
            language={language}
          />
        )}

        {isSectionEnabled('faq') && (
          <FAQSection faqs={faqs} language={language} />
        )}

        {isSectionEnabled('finalCta') && (
          <FinalCTA language={language} />
        )}
      </main>

      <Footer
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        language={language}
      />
    </div>
  );
}
