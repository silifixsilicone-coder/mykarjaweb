import React, { useState } from 'react';
import ViewSwitcher from './components/ViewSwitcher';
import HomePage from './pages/HomePage';
import BundleDetailPage from './pages/BundleDetailPage';
import AdminPage from './pages/AdminPage';
import { INITIAL_BUNDLES_HI, INITIAL_FAQS_HI, INITIAL_BANNERS, INITIAL_SECTIONS } from './data/mockData';

export default function App() {
  const [currentMode, setCurrentMode] = useState('storefront'); // 'storefront' | 'admin'
  const [selectedBundleId, setSelectedBundleId] = useState(null); // null = Homepage, string = detail
  const [adminTab, setAdminTab] = useState('dashboard');
  
  // Default Customer Language: Hindi (हिंदी)
  const [language, setLanguage] = useState('hi');

  // Application Data State
  const [bundles, setBundles] = useState(INITIAL_BUNDLES_HI);
  const [faqs, setFaqs] = useState(INITIAL_FAQS_HI);
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [sections, setSections] = useState(INITIAL_SECTIONS);

  // Bundle operations
  const handleSaveBundle = (updatedBundle) => {
    setBundles(prev => prev.map(b => b.id === updatedBundle.id ? updatedBundle : b));
  };

  const handleUpdateBundleItems = (bundleId, newItems) => {
    setBundles(prev => prev.map(b => b.id === bundleId ? { ...b, includedItems: newItems } : b));
  };

  const handleUpdateBundlePreviews = (bundleId, newImages) => {
    setBundles(prev => prev.map(b => b.id === bundleId ? { ...b, previewImages: newImages } : b));
  };

  // Banner operations
  const handleSaveBanner = (newBanner) => {
    setBanners(prev => {
      const exists = prev.some(b => b.id === newBanner.id);
      if (exists) return prev.map(b => b.id === newBanner.id ? newBanner : b);
      return [...prev, newBanner];
    });
  };

  const handleDeleteBanner = (bannerId) => {
    setBanners(prev => prev.filter(b => b.id !== bannerId));
  };

  const handleToggleBannerStatus = (bannerId) => {
    setBanners(prev => prev.map(b => b.id === bannerId ? { ...b, enabled: !b.enabled } : b));
  };

  // FAQ operations
  const handleSaveFaq = (newFaq) => {
    setFaqs(prev => {
      const exists = prev.some(f => f.id === newFaq.id);
      if (exists) return prev.map(f => f.id === newFaq.id ? f.id === newFaq.id ? newFaq : f : f);
      return [...prev, newFaq];
    });
  };

  const handleDeleteFaq = (faqId) => {
    setFaqs(prev => prev.filter(f => f.id !== faqId));
  };

  // Section operations
  const handleToggleSection = (sectionId) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, enabled: !s.enabled } : s));
  };

  // Preview helper
  const handlePreviewBundleFromAdmin = (bundleId, mode = 'storefront') => {
    setSelectedBundleId(bundleId);
    if (mode === 'storefront') {
      setCurrentMode('storefront');
    }
  };

  const currentSelectedBundle = bundles.find(b => b.id === selectedBundleId);

  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-deepGreen selection:text-white">
      {/* Interactive Top View Switcher */}
      <ViewSwitcher
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        selectedBundleId={selectedBundleId}
        setSelectedBundleId={setSelectedBundleId}
        adminTab={adminTab}
        setAdminTab={setAdminTab}
      />

      {/* Main View Router */}
      {currentMode === 'storefront' ? (
        selectedBundleId && currentSelectedBundle ? (
          <BundleDetailPage
            bundle={currentSelectedBundle}
            faqs={faqs}
            onBackToHome={() => setSelectedBundleId(null)}
            onSelectOtherBundle={(id) => setSelectedBundleId(id)}
            language={language}
            setLanguage={setLanguage}
          />
        ) : (
          <HomePage
            bundles={bundles}
            faqs={faqs}
            sections={sections}
            banners={banners}
            onSelectBundle={(id) => setSelectedBundleId(id)}
            language={language}
            setLanguage={setLanguage}
          />
        )
      ) : (
        <AdminPage
          adminTab={adminTab}
          setAdminTab={setAdminTab}
          bundles={bundles}
          banners={banners}
          faqs={faqs}
          sections={sections}
          activeBundleId={selectedBundleId}
          onSaveBundle={handleSaveBundle}
          onUpdateBundleItems={handleUpdateBundleItems}
          onUpdateBundlePreviews={handleUpdateBundlePreviews}
          onSaveBanner={handleSaveBanner}
          onDeleteBanner={handleDeleteBanner}
          onToggleBannerStatus={handleToggleBannerStatus}
          onSaveFaq={handleSaveFaq}
          onDeleteFaq={handleDeleteFaq}
          onToggleSection={handleToggleSection}
          onPreviewBundle={handlePreviewBundleFromAdmin}
        />
      )}
    </div>
  );
}
