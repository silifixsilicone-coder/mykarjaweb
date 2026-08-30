import React, { useState } from 'react';
import { Plus, Trash2, Edit3, GripVertical, CheckCircle2, FileText, Layers } from 'lucide-react';

export default function WhatsIncludedEditor({ bundles, onUpdateBundleItems }) {
  const [selectedBundleId, setSelectedBundleId] = useState(bundles[0]?.id || '');
  const activeBundle = bundles.find(b => b.id === selectedBundleId) || bundles[0];

  const [items, setItems] = useState(activeBundle?.includedItems || []);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');

  const handleSelectBundle = (id) => {
    setSelectedBundleId(id);
    const found = bundles.find(b => b.id === id);
    if (found) setItems(found.includedItems || []);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      title: newItemTitle,
      description: newItemDesc || 'Full editable digital access item included.',
      icon: 'CheckCircle2'
    };
    const updated = [...items, newItem];
    setItems(updated);
    onUpdateBundleItems(selectedBundleId, updated);
    setNewItemTitle('');
    setNewItemDesc('');
  };

  const handleDeleteItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    onUpdateBundleItems(selectedBundleId, updated);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brandBorder pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brandBlack tracking-tight">
            What's Included Editor
          </h1>
          <p className="text-secondaryText text-sm mt-1">
            Visually construct and organize feature items included in each bundle.
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

      {/* Add New Item Card */}
      <form onSubmit={handleAddItem} className="bg-white p-6 rounded-xl border border-brandBorder shadow-sm space-y-4">
        <h2 className="font-serif font-bold text-lg text-brandBlack flex items-center gap-2">
          <Plus className="w-5 h-5 text-deepGreen" /> Add New Included Item
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Item Title (e.g., Financial & Cash Flow Dashboard)"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            className="bg-cream border border-brandBorder rounded px-4 py-2.5 text-sm font-bold text-brandBlack focus:outline-none focus:border-deepGreen"
            required
          />
          <input
            type="text"
            placeholder="Item Description (e.g., Automated 12-month revenue model)"
            value={newItemDesc}
            onChange={(e) => setNewItemDesc(e.target.value)}
            className="bg-cream border border-brandBorder rounded px-4 py-2.5 text-sm text-brandBlack focus:outline-none focus:border-deepGreen"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-deepGreen text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow hover:bg-deepGreen-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
            + Add Item
          </button>
        </div>
      </form>

      {/* Existing Included Items List */}
      <div className="bg-white rounded-xl border border-brandBorder shadow-sm overflow-hidden p-6 space-y-4">
        <h3 className="font-serif font-bold text-lg text-brandBlack flex items-center justify-between">
          <span>Items in "{activeBundle?.title}" ({items.length})</span>
          <span className="text-xs text-secondaryText font-mono">Drag handles to reorder</span>
        </h3>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-4 bg-cream/60 rounded-lg border border-brandBorder flex items-center justify-between gap-4 hover:border-deepGreen/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <GripVertical className="w-5 h-5 text-secondaryText cursor-grab" />
                <div className="w-8 h-8 rounded bg-deepGreen text-white flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brandBlack text-sm">{item.title}</h4>
                  <p className="text-secondaryText text-xs">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-2 text-secondaryText hover:text-red-600 rounded hover:bg-white transition-colors"
                  title="Delete Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
