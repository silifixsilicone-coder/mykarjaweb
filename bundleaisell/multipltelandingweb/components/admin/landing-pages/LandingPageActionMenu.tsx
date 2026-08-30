"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Eye,
  Edit,
  Copy,
  CopyPlus,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import { LandingPageStatus } from "@/types/dashboard";

interface LandingPageActionMenuProps {
  status: LandingPageStatus;
  onPreview: () => void;
  onEdit: () => void;
  onCopyLink: () => void;
  onDuplicate: () => void;
  onTogglePublish: () => void;
  onDelete: () => void;
}

export const LandingPageActionMenu: React.FC<LandingPageActionMenuProps> = ({
  status,
  onPreview,
  onEdit,
  onCopyLink,
  onDuplicate,
  onTogglePublish,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };

  const isPublished = status === "Published";

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900/10"
        aria-label="Action options"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-xl bg-white shadow-xl border border-slate-200/80 py-1.5 z-40 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
          <button
            type="button"
            onClick={() => handleAction(onPreview)}
            className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            Preview
          </button>

          <button
            type="button"
            onClick={() => handleAction(onEdit)}
            className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5 transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-slate-400" />
            Edit
          </button>

          <button
            type="button"
            onClick={() => handleAction(onCopyLink)}
            className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            Copy Link
          </button>

          <button
            type="button"
            onClick={() => handleAction(onDuplicate)}
            className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5 transition-colors"
          >
            <CopyPlus className="w-3.5 h-3.5 text-slate-400" />
            Duplicate
          </button>

          <button
            type="button"
            onClick={() => handleAction(onTogglePublish)}
            className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5 transition-colors"
          >
            {isPublished ? (
              <>
                <XCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Unpublish</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Publish</span>
              </>
            )}
          </button>

          <div className="my-1 border-t border-slate-100" />

          <button
            type="button"
            onClick={() => handleAction(onDelete)}
            className="w-full text-left px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
