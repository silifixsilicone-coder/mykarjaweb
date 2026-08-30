"use client";

import React from "react";
import { LandingPageItem } from "@/types/dashboard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { LandingPageActionMenu } from "./LandingPageActionMenu";
import { Copy, ExternalLink } from "lucide-react";
import Image from "next/image";

interface LandingPageCardProps {
  item: LandingPageItem;
  onPreview: (slug: string) => void;
  onEdit: (id: string) => void;
  onCopyLink: (url: string) => void;
  onDuplicate: (item: LandingPageItem) => void;
  onTogglePublish: (item: LandingPageItem) => void;
  onDelete: (item: LandingPageItem) => void;
}

export const LandingPageCard: React.FC<LandingPageCardProps> = ({
  item,
  onPreview,
  onEdit,
  onCopyLink,
  onDuplicate,
  onTogglePublish,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      {/* Top Image Container */}
      <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100">
        <img
          src={item.image}
          alt={item.product}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Status Badge Overlay */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={item.status} className="bg-white/90 backdrop-blur-md shadow-xs" />
        </div>

        {/* Top Right Action Menu Overlay */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-xl p-0.5 shadow-xs">
          <LandingPageActionMenu
            status={item.status}
            onPreview={() => onPreview(item.slug)}
            onEdit={() => onEdit(item.id)}
            onCopyLink={() => onCopyLink(item.url)}
            onDuplicate={() => onDuplicate(item)}
            onTogglePublish={() => onTogglePublish(item)}
            onDelete={() => onDelete(item)}
          />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-[#005C52] transition-colors">
              {item.product}
            </h3>
            <span className="text-base font-extrabold text-slate-900 shrink-0">
              {item.price}
            </span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom Metadata & Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
          {/* URL with Copy Link Button */}
          <div className="flex items-center gap-1.5 min-w-0 font-mono text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200/60 max-w-[70%]">
            <span className="truncate">{item.url}</span>
            <button
              type="button"
              onClick={() => onCopyLink(item.url)}
              className="text-slate-400 hover:text-slate-700 transition-colors shrink-0 p-0.5"
              title="Copy URL"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Updated date */}
          <span className="text-[11px] text-slate-400 shrink-0">
            Updated {item.updatedAt.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
};
