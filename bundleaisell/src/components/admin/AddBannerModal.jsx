import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

export default function AddBannerModal({ isOpen, onClose, onSaveBanner, initialBanner }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    buttonText: 'EXPLORE ALL BUNDLES',
    link: '#bundles',
    position: 'After Hero',
    enabled: true,
    bgType: 'deepGreen',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  });

  useEffect(() => {
    if (initialBanner) {
      setFormData(initialBanner);
    } else {
      setFormData({
        title: '',
        description: '',
        buttonText: 'EXPLORE ALL BUNDLES',
        link: '#bundles',
        position: 'After Hero',
        enabled: true,
        bgType: 'deepGreen',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
      });
    }
  }, [initialBanner, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveBanner({
      ...formData,
      id: formData.id || 'banner-' + Date.now()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-brandBlack/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-brandBorder shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-cream border-b border-brandBorder flex items-center justify-between">
          <h2 className="font-serif font-bold text-xl text-brandBlack">
            {initialBanner ? 'Edit Banner' : '+ Add New Banner'}
          </h2>
          <button onClick={onClose} className="p-1 text-secondaryText hover:text-brandBlack">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
              Banner Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-cream border border-brandBorder rounded px-4 py-2.5 text-sm font-serif font-bold text-brandBlack focus:outline-none focus:border-deepGreen"
              placeholder="ONE STORE. ENDLESS DIGITAL RESOURCES."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
              Banner Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-cream border border-brandBorder rounded p-3 text-sm text-brandBlack focus:outline-none focus:border-deepGreen"
              placeholder="Get practical digital tools, templates and creative resources."
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
                Button Text
              </label>
              <input
                type="text"
                value={formData.buttonText}
                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                className="w-full bg-cream border border-brandBorder rounded px-4 py-2.5 text-sm font-bold text-brandBlack focus:outline-none focus:border-deepGreen"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
                External / Anchor Link
              </label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full bg-cream border border-brandBorder rounded px-4 py-2.5 text-sm font-mono text-brandBlack focus:outline-none focus:border-deepGreen"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
                Banner Position
              </label>
              <select
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full bg-cream border border-brandBorder rounded px-4 py-2.5 text-sm font-bold text-brandBlack focus:outline-none focus:border-deepGreen"
              >
                <option value="After Hero">After Hero</option>
                <option value="After Bundles">After Bundles</option>
                <option value="After Preview">After Preview</option>
                <option value="After Benefits">After Benefits</option>
                <option value="Before Pricing">Before Pricing</option>
                <option value="Before Final CTA">Before Final CTA</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
                Banner Background Style
              </label>
              <select
                value={formData.bgType}
                onChange={(e) => setFormData({ ...formData, bgType: e.target.value })}
                className="w-full bg-cream border border-brandBorder rounded px-4 py-2.5 text-sm font-bold text-brandBlack focus:outline-none focus:border-deepGreen"
              >
                <option value="deepGreen">Deep Green (#005C52)</option>
                <option value="cream">Cream (#F8F7E8)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
              Banner Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-cream border border-brandBorder rounded px-4 py-2.5 text-sm font-mono text-brandBlack focus:outline-none focus:border-deepGreen"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
              Status
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                <input
                  type="radio"
                  name="enabled"
                  checked={formData.enabled === true}
                  onChange={() => setFormData({ ...formData, enabled: true })}
                  className="text-deepGreen"
                />
                <span className="text-deepGreen">Enabled (Active)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                <input
                  type="radio"
                  name="enabled"
                  checked={formData.enabled === false}
                  onChange={() => setFormData({ ...formData, enabled: false })}
                  className="text-deepGreen"
                />
                <span className="text-secondaryText">Disabled (Hidden)</span>
              </label>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-brandBorder flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded bg-cream border border-brandBorder text-xs font-bold uppercase text-brandBlack hover:bg-brandBlack hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-deepGreen text-white text-xs font-bold uppercase tracking-wider shadow hover:bg-deepGreen-hover transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Banner
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
