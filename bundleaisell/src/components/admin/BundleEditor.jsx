import React, { useState, useEffect } from 'react';
import { Save, Eye, CheckCircle2, Layers } from 'lucide-react';

export default function BundleEditor({ bundles, activeBundleId, onSaveBundle, onPreviewBundle }) {
  const [selectedId, setSelectedId] = useState(activeBundleId || bundles[0]?.id);
  const [formData, setFormData] = useState(bundles.find(b => b.id === selectedId) || bundles[0]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const found = bundles.find(b => b.id === selectedId);
    if (found) setFormData(found);
  }, [selectedId, bundles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'originalPrice' || name === 'offerPrice' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveBundle(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brandBorder pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brandBlack tracking-tight">
            Bundle Editor
          </h1>
          <p className="text-secondaryText text-sm mt-1">
            Modify product copy, cover images, pricing details, and checkout links.
          </p>
        </div>

        {/* Bundle Selector dropdown */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-brandBorder shadow-sm">
          <Layers className="w-4 h-4 text-deepGreen" />
          <span className="text-xs font-bold text-secondaryText uppercase">Select Bundle:</span>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="bg-cream font-serif font-bold text-sm text-brandBlack border border-brandBorder px-3 py-1.5 rounded focus:outline-none focus:border-deepGreen"
          >
            {bundles.map(b => (
              <option key={b.id} value={b.id}>{b.title}</option>
            ))}
          </select>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-lightGreen border border-deepGreen text-deepGreen rounded-lg flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-5 h-5" />
          Bundle changes saved successfully!
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-brandBorder shadow-sm space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bundle Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
              Bundle Name
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="w-full bg-cream border border-brandBorder rounded px-4 py-3 text-sm text-brandBlack font-serif font-bold focus:outline-none focus:border-deepGreen"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
              Category Label
            </label>
            <input
              type="text"
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              className="w-full bg-cream border border-brandBorder rounded px-4 py-3 text-sm text-brandBlack font-mono focus:outline-none focus:border-deepGreen"
              required
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
            Short Description (Card Summary)
          </label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription || ''}
            onChange={handleChange}
            className="w-full bg-cream border border-brandBorder rounded px-4 py-3 text-sm text-brandBlack focus:outline-none focus:border-deepGreen"
            required
          />
        </div>

        {/* Full Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
            Full Description (Detail Sales Page)
          </label>
          <textarea
            name="fullDescription"
            rows="4"
            value={formData.fullDescription || ''}
            onChange={handleChange}
            className="w-full bg-cream border border-brandBorder rounded p-4 text-sm text-brandBlack leading-relaxed focus:outline-none focus:border-deepGreen"
            required
          ></textarea>
        </div>

        {/* Cover Image URL */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
            Cover Image URL
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage || ''}
              onChange={handleChange}
              className="flex-1 bg-cream border border-brandBorder rounded px-4 py-3 text-sm text-brandBlack font-mono focus:outline-none focus:border-deepGreen"
              required
            />
            {formData.coverImage && (
              <img src={formData.coverImage} alt="Cover" className="w-12 h-12 rounded object-cover border border-brandBorder flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Pricing Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-cream/50 rounded-lg border border-brandBorder">
          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
              Original Price (₹)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice || 0}
              onChange={handleChange}
              className="w-full bg-white border border-brandBorder rounded px-4 py-2.5 text-sm font-bold text-brandBlack focus:outline-none focus:border-deepGreen"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
              Offer Price (₹)
            </label>
            <input
              type="number"
              name="offerPrice"
              value={formData.offerPrice || 0}
              onChange={handleChange}
              className="w-full bg-white border border-brandBorder rounded px-4 py-2.5 text-sm font-bold text-deepGreen focus:outline-none focus:border-deepGreen"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
              Discount Badge Text
            </label>
            <input
              type="text"
              name="discountBadge"
              value={formData.discountBadge || ''}
              onChange={handleChange}
              className="w-full bg-white border border-brandBorder rounded px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-brandBlack focus:outline-none focus:border-deepGreen"
            />
          </div>
        </div>

        {/* Buttons & Payment Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
              Buy Button Text
            </label>
            <input
              type="text"
              name="buyButtonText"
              value={formData.buyButtonText || 'BUY NOW'}
              onChange={handleChange}
              className="w-full bg-cream border border-brandBorder rounded px-4 py-3 text-sm font-bold text-brandBlack focus:outline-none focus:border-deepGreen"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
              External Payment Link
            </label>
            <input
              type="text"
              name="paymentUrl"
              value={formData.paymentUrl || ''}
              onChange={handleChange}
              className="w-full bg-cream border border-brandBorder rounded px-4 py-3 text-sm font-mono text-brandBlack focus:outline-none focus:border-deepGreen"
            />
          </div>
        </div>

        {/* Status Switch */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">
            Status
          </label>
          <div className="flex items-center gap-4">
            {['Published', 'Draft'].map(st => (
              <label key={st} className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                <input
                  type="radio"
                  name="status"
                  value={st}
                  checked={formData.status === st}
                  onChange={handleChange}
                  className="text-deepGreen focus:ring-deepGreen"
                />
                <span className={st === 'Published' ? 'text-deepGreen' : 'text-secondaryText'}>{st}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-brandBorder flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => onPreviewBundle(formData.id)}
            className="inline-flex items-center gap-2 bg-cream hover:bg-brandBlack hover:text-white text-brandBlack border border-brandBorder text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded transition-all"
          >
            <Eye className="w-4 h-4 text-deepGreen" />
            Preview Page
          </button>
          
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-deepGreen hover:bg-deepGreen-hover text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}
