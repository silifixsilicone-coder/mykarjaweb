import React, { useState } from 'react';
import { Plus, Edit3, Copy, Trash2, Power, Eye, Image as ImageIcon } from 'lucide-react';
import AddBannerModal from './AddBannerModal';

export default function BannerManager({ banners, onSaveBanner, onDeleteBanner, onToggleBannerStatus }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const handleDuplicate = (banner) => {
    const duplicated = {
      ...banner,
      id: 'banner-' + Date.now(),
      title: banner.title + ' (Copy)'
    };
    onSaveBanner(duplicated);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brandBorder pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brandBlack tracking-tight">
            Banner Manager
          </h1>
          <p className="text-secondaryText text-sm mt-1">
            Control promotional banners, copy, CTA buttons, and exact positioning on storefront pages.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-deepGreen text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded shadow hover:bg-deepGreen-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          + Add Banner
        </button>
      </div>

      {/* Banner Cards List */}
      <div className="grid grid-cols-1 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`rounded-xl border border-brandBorder shadow-sm overflow-hidden flex flex-col md:flex-row items-stretch justify-between transition-all ${
              banner.bgType === 'deepGreen' ? 'bg-deepGreen text-white' : 'bg-cream text-brandBlack'
            }`}
          >
            {/* Banner Preview Side */}
            <div className="p-6 md:p-8 flex-1 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-brandBlack text-cream px-2.5 py-1 rounded">
                    Position: {banner.position}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${
                    banner.enabled ? 'bg-lightGreen text-deepGreen' : 'bg-secondaryText text-white'
                  }`}>
                    {banner.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold tracking-tight">
                  {banner.title}
                </h3>
                <p className="text-sm opacity-90 leading-relaxed max-w-2xl">
                  {banner.description}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                <span className={`px-4 py-2 rounded ${banner.bgType === 'deepGreen' ? 'bg-cream text-brandBlack' : 'bg-deepGreen text-white'}`}>
                  {banner.buttonText}
                </span>
                <span className="font-mono text-[11px] opacity-75">Link: {banner.link}</span>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="p-6 bg-white border-t md:border-t-0 md:border-l border-brandBorder flex md:flex-col items-center justify-center gap-2 text-brandBlack flex-shrink-0 min-w-[180px]">
              <button
                onClick={() => onToggleBannerStatus(banner.id)}
                className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider border transition-colors ${
                  banner.enabled
                    ? 'bg-lightGreen text-deepGreen border-deepGreen/30 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                    : 'bg-cream text-secondaryText border-brandBorder hover:bg-lightGreen hover:text-deepGreen'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                {banner.enabled ? 'Disable' : 'Enable'}
              </button>

              <button
                onClick={() => handleOpenEdit(banner)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider bg-cream hover:bg-deepGreen hover:text-white border border-brandBorder transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>

              <button
                onClick={() => handleDuplicate(banner)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider bg-cream hover:bg-brandBlack hover:text-white border border-brandBorder transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                Duplicate
              </button>

              <button
                onClick={() => onDeleteBanner(banner.id)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider bg-white hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      <AddBannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveBanner={onSaveBanner}
        initialBanner={editingBanner}
      />
    </div>
  );
}
