import React from 'react';
import { GripVertical, Eye, EyeOff, Edit3, Settings } from 'lucide-react';

export default function SectionManager({ sections, onToggleSection, onReorderSections }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brandBorder pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brandBlack tracking-tight">
            Section Manager
          </h1>
          <p className="text-secondaryText text-sm mt-1">
            Reorder page sections and toggle visual visibility across the homepage layout.
          </p>
        </div>
      </div>

      {/* Section List */}
      <div className="bg-white rounded-xl border border-brandBorder shadow-sm p-6 space-y-4">
        <h2 className="font-serif font-bold text-lg text-brandBlack flex items-center justify-between">
          <span>Homepage Layout Structure</span>
          <span className="text-xs font-mono text-secondaryText">☰ Drag handles to arrange order</span>
        </h2>

        <div className="space-y-3">
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`p-4 rounded-lg border flex items-center justify-between gap-4 transition-all ${
                sec.enabled
                  ? 'bg-cream/60 border-brandBorder hover:border-deepGreen/50'
                  : 'bg-cream/20 border-brandBorder/50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-secondaryText cursor-grab" />
                <span className="w-6 h-6 rounded bg-brandBlack text-cream font-mono font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-serif font-bold text-brandBlack text-base">
                  ☰ {sec.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onToggleSection(sec.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors border ${
                    sec.enabled
                      ? 'bg-lightGreen text-deepGreen border-deepGreen/30 hover:bg-cream'
                      : 'bg-cream text-secondaryText border-brandBorder hover:bg-lightGreen hover:text-deepGreen'
                  }`}
                >
                  {sec.enabled ? (
                    <>
                      <Eye className="w-3.5 h-3.5" /> Visible
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" /> Hidden
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
