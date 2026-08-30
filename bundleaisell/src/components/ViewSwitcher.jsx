import React from 'react';
import { Store, ShieldCheck, Eye, Layers, Settings, FileText, HelpCircle, Image, ListFilter, ArrowLeft } from 'lucide-react';

export default function ViewSwitcher({ 
  currentMode, 
  setCurrentMode, 
  selectedBundleId, 
  setSelectedBundleId,
  adminTab, 
  setAdminTab 
}) {
  return (
    <div className="bg-[#111111] text-[#F8F7E8] border-b border-[#333333] sticky top-0 z-50 px-4 py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: View Mode Toggle */}
        <div className="flex items-center gap-2 bg-[#222222] p-1 rounded-lg border border-[#333333]">
          <button
            onClick={() => setCurrentMode('storefront')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
              currentMode === 'storefront'
                ? 'bg-[#005C52] text-white shadow-sm'
                : 'text-[#888888] hover:text-white hover:bg-[#2A2A2A]'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            Customer Storefront
          </button>
          
          <button
            onClick={() => setCurrentMode('admin')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
              currentMode === 'admin'
                ? 'bg-[#005C52] text-white shadow-sm'
                : 'text-[#888888] hover:text-white hover:bg-[#2A2A2A]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Panel UI
          </button>
        </div>

        {/* Center: Contextual Sub-Nav Quick Selector */}
        {currentMode === 'storefront' ? (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#888888] hidden md:inline">Page Preview:</span>
            <button
              onClick={() => setSelectedBundleId(null)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                selectedBundleId === null
                  ? 'bg-[#005C52]/30 text-[#DDEBE5] border border-[#005C52]'
                  : 'text-[#AAAAAA] hover:text-white hover:bg-[#222]'
              }`}
            >
              Homepage
            </button>
            <button
              onClick={() => setSelectedBundleId('excel-bundle')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                selectedBundleId === 'excel-bundle'
                  ? 'bg-[#005C52]/30 text-[#DDEBE5] border border-[#005C52]'
                  : 'text-[#AAAAAA] hover:text-white hover:bg-[#222]'
              }`}
            >
              Excel Detail
            </button>
            <button
              onClick={() => setSelectedBundleId('ai-video-bundle')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                selectedBundleId === 'ai-video-bundle'
                  ? 'bg-[#005C52]/30 text-[#DDEBE5] border border-[#005C52]'
                  : 'text-[#AAAAAA] hover:text-white hover:bg-[#222]'
              }`}
            >
              AI Video Detail
            </button>
            <button
              onClick={() => setSelectedBundleId('graphic-design-bundle')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                selectedBundleId === 'graphic-design-bundle'
                  ? 'bg-[#005C52]/30 text-[#DDEBE5] border border-[#005C52]'
                  : 'text-[#AAAAAA] hover:text-white hover:bg-[#222]'
              }`}
            >
              Graphic Design Detail
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs overflow-x-auto no-scrollbar py-1">
            <span className="text-[#888888] hidden md:inline mr-1">Admin Section:</span>
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'bundle-editor', label: 'Bundle Editor' },
              { id: 'whats-included', label: "What's Included" },
              { id: 'previews', label: 'Preview Images' },
              { id: 'banners', label: 'Banners' },
              { id: 'faqs', label: 'FAQs' },
              { id: 'sections', label: 'Page Sections' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`px-2.5 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                  adminTab === tab.id
                    ? 'bg-[#005C52] text-white font-medium'
                    : 'text-[#AAAAAA] hover:text-white hover:bg-[#222]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Right Badge */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#888888] font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-[#005C52] animate-pulse"></span>
          UI Prototype Mode
        </div>
      </div>
    </div>
  );
}
