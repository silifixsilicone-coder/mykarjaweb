"use client";

import React from "react";
import { LandingPageItem } from "@/types/dashboard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { LandingPageActionMenu } from "./LandingPageActionMenu";
import { Copy, ExternalLink } from "lucide-react";

interface LandingPageTableProps {
  items: LandingPageItem[];
  onPreview: (slug: string) => void;
  onEdit: (id: string) => void;
  onCopyLink: (url: string) => void;
  onDuplicate: (item: LandingPageItem) => void;
  onTogglePublish: (item: LandingPageItem) => void;
  onDelete: (item: LandingPageItem) => void;
}

export const LandingPageTable: React.FC<LandingPageTableProps> = ({
  items,
  onPreview,
  onEdit,
  onCopyLink,
  onDuplicate,
  onTogglePublish,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px] sm:min-w-full">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-5 sm:px-6">Product</th>
              <th className="py-3.5 px-4">Landing Page</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Updated</th>
              <th className="py-3.5 px-5 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                <td className="py-4 px-5 sm:px-6 font-bold text-slate-900 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.product}
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200/60 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-[#005C52] transition-colors">
                        {item.product}
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal line-clamp-1 max-w-[200px]">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 font-mono text-slate-500 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200/60 inline-flex">
                    <span>{item.url}</span>
                    <button
                      type="button"
                      onClick={() => onCopyLink(item.url)}
                      className="text-slate-400 hover:text-slate-700 transition-colors p-0.5"
                      title="Copy URL"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </td>

                <td className="py-4 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                  {item.price}
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  <StatusBadge status={item.status} />
                </td>

                <td className="py-4 px-4 text-slate-400 whitespace-nowrap">
                  {item.updatedAt}
                </td>

                <td className="py-4 px-5 sm:px-6 text-right whitespace-nowrap">
                  <LandingPageActionMenu
                    status={item.status}
                    onPreview={() => onPreview(item.slug)}
                    onEdit={() => onEdit(item.id)}
                    onCopyLink={() => onCopyLink(item.url)}
                    onDuplicate={() => onDuplicate(item)}
                    onTogglePublish={() => onTogglePublish(item)}
                    onDelete={() => onDelete(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
