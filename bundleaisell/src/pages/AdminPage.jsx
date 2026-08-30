import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import Dashboard from '../components/admin/Dashboard';
import BundleEditor from '../components/admin/BundleEditor';
import WhatsIncludedEditor from '../components/admin/WhatsIncludedEditor';
import PreviewImageManager from '../components/admin/PreviewImageManager';
import BannerManager from '../components/admin/BannerManager';
import FAQManager from '../components/admin/FAQManager';
import SectionManager from '../components/admin/SectionManager';

export default function AdminPage({
  adminTab,
  setAdminTab,
  bundles,
  banners,
  faqs,
  sections,
  activeBundleId,
  onSaveBundle,
  onUpdateBundleItems,
  onUpdateBundlePreviews,
  onSaveBanner,
  onDeleteBanner,
  onToggleBannerStatus,
  onSaveFaq,
  onDeleteFaq,
  onToggleSection,
  onPreviewBundle
}) {
  const handleEditBundleFromDashboard = (bundleId) => {
    onPreviewBundle(bundleId); // switch focus to that bundle in editor if needed
    setAdminTab('bundle-editor');
  };

  return (
    <div className="min-h-screen bg-[#F8F7E8] text-brandBlack flex flex-col md:flex-row font-sans">
      <AdminSidebar activeTab={adminTab} setActiveTab={setAdminTab} />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {adminTab === 'dashboard' && (
          <Dashboard
            bundles={bundles}
            banners={banners}
            onEditBundle={handleEditBundleFromDashboard}
            onPreviewBundle={(id) => onPreviewBundle(id, 'storefront')}
          />
        )}

        {adminTab === 'bundle-editor' && (
          <BundleEditor
            bundles={bundles}
            activeBundleId={activeBundleId}
            onSaveBundle={onSaveBundle}
            onPreviewBundle={(id) => onPreviewBundle(id, 'storefront')}
          />
        )}

        {adminTab === 'whats-included' && (
          <WhatsIncludedEditor
            bundles={bundles}
            onUpdateBundleItems={onUpdateBundleItems}
          />
        )}

        {adminTab === 'previews' && (
          <PreviewImageManager
            bundles={bundles}
            onUpdateBundlePreviews={onUpdateBundlePreviews}
          />
        )}

        {adminTab === 'banners' && (
          <BannerManager
            banners={banners}
            onSaveBanner={onSaveBanner}
            onDeleteBanner={onDeleteBanner}
            onToggleBannerStatus={onToggleBannerStatus}
          />
        )}

        {adminTab === 'faqs' && (
          <FAQManager
            faqs={faqs}
            onSaveFaq={onSaveFaq}
            onDeleteFaq={onDeleteFaq}
          />
        )}

        {adminTab === 'sections' && (
          <SectionManager
            sections={sections}
            onToggleSection={onToggleSection}
          />
        )}
      </main>
    </div>
  );
}
