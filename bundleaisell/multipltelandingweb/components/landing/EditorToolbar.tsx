"use client";

import React from "react";
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Monitor,
  Smartphone,
  Eye,
  Save,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DeviceMode, EditorMode } from "@/types/visualEditor";
import { cn } from "@/lib/utils";

interface EditorToolbarProps {
  productName: string;
  isDirty: boolean;
  canUndo: boolean;
  canRedo: boolean;
  editorMode: EditorMode;
  deviceMode: DeviceMode;
  onBack: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onDeviceChange: (device: DeviceMode) => void;
  onTogglePreview: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  isSubmitting?: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  productName,
  isDirty,
  canUndo,
  canRedo,
  editorMode,
  deviceMode,
  onBack,
  onUndo,
  onRedo,
  onDeviceChange,
  onTogglePreview,
  onSaveDraft,
  onPublish,
  isSubmitting = false,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 py-3 shadow-md">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-white truncate max-w-[200px]">
              Editing: {productName || "Untitled Page"}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold">
              {isDirty ? (
                <span className="text-amber-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  Unsaved changes
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  All changes saved
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Undo/Redo & Device Switcher */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700/60">
            <button
              type="button"
              disabled={!canUndo}
              onClick={onUndo}
              className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
              title="Undo"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={!canRedo}
              onClick={onRedo}
              className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
              title="Redo"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* Device Switcher */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700/60">
            <button
              type="button"
              onClick={() => onDeviceChange("desktop")}
              className={cn(
                "p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1",
                deviceMode === "desktop"
                  ? "bg-slate-700 text-white font-bold"
                  : "text-slate-400 hover:text-white"
              )}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDeviceChange("mobile")}
              className={cn(
                "p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1",
                deviceMode === "mobile"
                  ? "bg-slate-700 text-white font-bold"
                  : "text-slate-400 hover:text-white"
              )}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onTogglePreview}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors",
              editorMode === "preview"
                ? "bg-emerald-500 text-slate-950 font-bold"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{editorMode === "preview" ? "Exit Preview" : "Preview"}</span>
          </button>

          <Button
            type="button"
            variant="secondary"
            onClick={onSaveDraft}
            disabled={isSubmitting}
            className="text-xs py-1.5 px-3 min-h-[34px] gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save Draft</span>
          </Button>

          <Button
            type="button"
            onClick={onPublish}
            disabled={isSubmitting}
            className="text-xs py-1.5 px-3.5 min-h-[34px] gap-1 bg-[#005C52] hover:bg-[#004840] text-white border-[#005C52]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
