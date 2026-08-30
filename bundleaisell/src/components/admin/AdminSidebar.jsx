import React from 'react';
import { LayoutDashboard, Layers, FileText, Image, HelpCircle, Settings, PlusCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'BUNDLES',
      items: [
        { id: 'bundle-editor', label: 'All Bundles', icon: Layers },
        { id: 'whats-included', label: "What's Included", icon: FileText },
        { id: 'previews', label: 'Preview Images', icon: Image }
      ]
    },
    {
      title: 'CONTENT',
      items: [
        { id: 'banners', label: 'Banners', icon: Image },
        { id: 'faqs', label: 'FAQs Manager', icon: HelpCircle }
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { id: 'sections', label: 'Section Manager', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-cream border-r border-brandBorder min-h-[calc(100vh-45px)] p-6 flex flex-col justify-between flex-shrink-0">
      <div className="space-y-8">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 pb-4 border-b border-brandBorder">
          <div className="w-8 h-8 rounded bg-deepGreen text-white flex items-center justify-center font-bold font-serif">
            A
          </div>
          <div>
            <h2 className="font-serif font-bold text-sm tracking-wider uppercase text-brandBlack">
              ADMIN CONTROL
            </h2>
            <span className="text-[10px] text-deepGreen font-mono uppercase font-bold">
              ● Live Studio Mode
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-[10px] font-bold text-secondaryText uppercase tracking-widest px-2">
                {group.title}
              </span>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? 'bg-deepGreen text-white shadow-sm'
                          : 'text-brandBlack hover:bg-cream-dark hover:text-deepGreen'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-secondaryText'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info inside Sidebar */}
      <div className="p-3 bg-white rounded border border-brandBorder text-[11px] text-secondaryText space-y-1">
        <div className="font-bold text-brandBlack flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-deepGreen" /> System Ready
        </div>
        <p className="text-[10px]">Changes sync automatically in UI preview.</p>
      </div>
    </aside>
  );
}
