import React from "react";
import { RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ResetChangesModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirmReset: () => void;
}

export const ResetChangesModal: React.FC<ResetChangesModalProps> = ({
  isOpen,
  onCancel,
  onConfirmReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 space-y-5 z-50 animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Discard all changes?
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Are you sure you want to discard all your edits? This will restore the original landing page data.
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-4 py-2 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirmReset}
            className="px-4 py-2 text-xs bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white border-amber-600 shadow-amber-600/20"
          >
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
};
