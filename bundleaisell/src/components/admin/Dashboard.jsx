import React from 'react';
import { Layers, CheckCircle2, FileEdit, Image, Eye, Edit3, Plus, ExternalLink } from 'lucide-react';

export default function Dashboard({ bundles, banners, onEditBundle, onPreviewBundle }) {
  const totalBundles = bundles.length;
  const publishedBundles = bundles.filter(b => b.status === 'Published').length;
  const draftBundles = bundles.filter(b => b.status === 'Draft').length;
  const totalBanners = banners.length;

  return (
    <div className="space-y-8">
      {/* Top Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brandBorder pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brandBlack tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-secondaryText text-sm mt-1">
            Overview of your store products, active banners, and recent activity.
          </p>
        </div>

        <button
          onClick={() => onEditBundle(bundles[0]?.id)}
          className="inline-flex items-center gap-2 bg-deepGreen text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded shadow hover:bg-deepGreen-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          Edit Primary Bundle
        </button>
      </div>

      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-brandBorder shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-secondaryText uppercase block">
              TOTAL BUNDLES
            </span>
            <span className="font-serif text-3xl font-bold text-brandBlack mt-1 block">
              {totalBundles}
            </span>
          </div>
          <div className="w-12 h-12 rounded bg-cream border border-brandBorder flex items-center justify-center text-deepGreen">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-brandBorder shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-secondaryText uppercase block">
              PUBLISHED
            </span>
            <span className="font-serif text-3xl font-bold text-deepGreen mt-1 block">
              {publishedBundles}
            </span>
          </div>
          <div className="w-12 h-12 rounded bg-lightGreen border border-deepGreen/20 flex items-center justify-center text-deepGreen">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-brandBorder shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-secondaryText uppercase block">
              DRAFTS
            </span>
            <span className="font-serif text-3xl font-bold text-brandBlack mt-1 block">
              {draftBundles}
            </span>
          </div>
          <div className="w-12 h-12 rounded bg-cream border border-brandBorder flex items-center justify-center text-secondaryText">
            <FileEdit className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-brandBorder shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-secondaryText uppercase block">
              BANNERS
            </span>
            <span className="font-serif text-3xl font-bold text-brandBlack mt-1 block">
              {totalBanners}
            </span>
          </div>
          <div className="w-12 h-12 rounded bg-cream border border-brandBorder flex items-center justify-center text-deepGreen">
            <Image className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Bundles Table */}
      <div className="bg-white rounded-xl border border-brandBorder shadow-sm overflow-hidden">
        <div className="p-6 border-b border-brandBorder flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-brandBlack">Recent Bundles</h2>
            <p className="text-secondaryText text-xs">Manage pricing, status, and content details.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-brandBlack">
            <thead className="bg-cream border-b border-brandBorder uppercase text-[10px] font-bold tracking-wider text-secondaryText">
              <tr>
                <th className="px-6 py-4">Bundle Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brandBorder">
              {bundles.map((bundle) => (
                <tr key={bundle.id} className="hover:bg-cream/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-brandBlack flex items-center gap-3">
                    <img src={bundle.coverImage} alt="" className="w-8 h-8 rounded object-cover border border-brandBorder" />
                    <span>{bundle.title}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-secondaryText">{bundle.category}</td>
                  <td className="px-6 py-4 font-bold">₹{bundle.offerPrice.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      bundle.status === 'Published'
                        ? 'bg-lightGreen text-deepGreen border border-deepGreen/20'
                        : 'bg-cream text-secondaryText border border-brandBorder'
                    }`}>
                      {bundle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => onEditBundle(bundle.id)}
                      className="inline-flex items-center gap-1 bg-cream hover:bg-deepGreen hover:text-white text-brandBlack border border-brandBorder px-3 py-1.5 rounded font-bold uppercase text-[10px] transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => onPreviewBundle(bundle.id)}
                      className="inline-flex items-center gap-1 bg-white hover:bg-brandBlack hover:text-white text-brandBlack border border-brandBorder px-3 py-1.5 rounded font-bold uppercase text-[10px] transition-colors"
                    >
                      <Eye className="w-3 h-3 text-deepGreen" />
                      Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
