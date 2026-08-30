import React, { useState } from 'react';
import { Upload, Trash2, RefreshCw, GripVertical, Image as ImageIcon, Layers } from 'lucide-react';

export default function PreviewImageManager({ bundles, onUpdateBundlePreviews }) {
  const [selectedBundleId, setSelectedBundleId] = useState(bundles[0]?.id || '');
  const activeBundle = bundles.find(b => b.id === selectedBundleId) || bundles[0];

  const [images, setImages] = useState(activeBundle?.previewImages || []);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleSelectBundle = (id) => {
    setSelectedBundleId(id);
    const found = bundles.find(b => b.id === id);
    if (found) setImages(found.previewImages || []);
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    const newImg = {
      id: 'img-' + Date.now(),
      title: newTitle || 'Preview Screenshot',
      url: newUrl
    };
    const updated = [...images, newImg];
    setImages(updated);
    onUpdateBundlePreviews(selectedBundleId, updated);
    setNewTitle('');
    setNewUrl('');
  };

  const handleDeleteImage = (id) => {
    const updated = images.filter(img => img.id !== id);
    setImages(updated);
    onUpdateBundlePreviews(selectedBundleId, updated);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brandBorder pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brandBlack tracking-tight">
            Preview Image Manager
          </h1>
          <p className="text-secondaryText text-sm mt-1">
            Manage high-resolution screenshots, video thumbnails, and visual assets displayed in preview galleries.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-brandBorder shadow-sm">
          <Layers className="w-4 h-4 text-deepGreen" />
          <span className="text-xs font-bold text-secondaryText uppercase">Target Bundle:</span>
          <select
            value={selectedBundleId}
            onChange={(e) => handleSelectBundle(e.target.value)}
            className="bg-cream font-serif font-bold text-sm text-brandBlack border border-brandBorder px-3 py-1.5 rounded focus:outline-none focus:border-deepGreen"
          >
            {bundles.map(b => (
              <option key={b.id} value={b.id}>{b.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add / Upload Image Form */}
      <form onSubmit={handleAddImage} className="bg-white p-6 rounded-xl border border-brandBorder shadow-sm space-y-4">
        <h2 className="font-serif font-bold text-lg text-brandBlack flex items-center gap-2">
          <Upload className="w-5 h-5 text-deepGreen" /> Add / Upload Preview Asset
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Asset Title (e.g. Financial Dashboard Analytics)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="bg-cream border border-brandBorder rounded px-4 py-2.5 text-sm font-serif font-bold text-brandBlack focus:outline-none focus:border-deepGreen"
          />
          <input
            type="url"
            placeholder="Image URL (e.g. https://images.unsplash.com/...)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="bg-cream border border-brandBorder rounded px-4 py-2.5 text-sm font-mono text-brandBlack focus:outline-none focus:border-deepGreen"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-deepGreen text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded shadow hover:bg-deepGreen-hover transition-colors"
          >
            <Upload className="w-4 h-4" />
            + Upload Images
          </button>
        </div>
      </form>

      {/* Image Cards Grid */}
      <div className="bg-white rounded-xl border border-brandBorder shadow-sm p-6 space-y-4">
        <h3 className="font-serif font-bold text-lg text-brandBlack">
          Uploaded Images for "{activeBundle?.title}" ({images.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-cream rounded-lg border border-brandBorder overflow-hidden shadow-sm flex flex-col justify-between group"
            >
              <div className="relative aspect-[4/3] bg-brandBlack/5 overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="bg-brandBlack/70 text-white p-1 rounded">
                    <GripVertical className="w-3.5 h-3.5 cursor-grab" />
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-brandBorder space-y-3">
                <h4 className="font-serif font-bold text-sm text-brandBlack truncate">{img.title}</h4>
                
                <div className="flex items-center justify-between text-xs pt-2 border-t border-brandBorder">
                  <button
                    type="button"
                    onClick={() => {
                      const updatedUrl = prompt('Enter new Image URL:', img.url);
                      if (updatedUrl) {
                        const updated = images.map(i => i.id === img.id ? { ...i, url: updatedUrl } : i);
                        setImages(updated);
                        onUpdateBundlePreviews(selectedBundleId, updated);
                      }
                    }}
                    className="flex items-center gap-1 text-secondaryText hover:text-deepGreen font-bold text-[11px]"
                  >
                    <RefreshCw className="w-3 h-3" /> Replace
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 font-bold text-[11px]"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
