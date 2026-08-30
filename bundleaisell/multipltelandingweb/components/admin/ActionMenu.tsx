"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Eye,
  Edit,
  Copy,
  CopyPlus,
  Trash2,
} from "lucide-react";

interface ActionMenuProps {
  pageTitle?: string;
  onAction?: (action: string) => void;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ onAction }) => {
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

  const handleItemClick = (actionName: string) => {
    setIsOpen(false);
    if (onAction) {
      onAction(actionName);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900/10"
        aria-label="Actions menu"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white shadow-lg border border-slate-200/80 py-1.5 z-30 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
          <button
            type="button"
            onClick={() => handleItemClick("Preview")}
            className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            Preview
          </button>
          
          <button
            type="button"
            onClick={() => handleItemClick("Edit")}
            className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-slate-400" />
            Edit
          </button>

          <button
            type="button"
            onClick={() => handleItemClick("Copy Link")}
            className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            Copy Link
          </button>

          <button
            type="button"
            onClick={() => handleItemClick("Duplicate")}
            className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 transition-colors"
          >
            <CopyPlus className="w-3.5 h-3.5 text-slate-400" />
            Duplicate
          </button>

          <div className="my-1 border-t border-slate-100" />

          <button
            type="button"
            onClick={() => handleItemClick("Delete")}
            className="w-full text-left px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
