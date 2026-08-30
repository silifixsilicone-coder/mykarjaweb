import React from "react";
import { AlertCircle } from "lucide-react";

export const UnsavedChangesIndicator: React.FC = () => {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-[11px] font-semibold animate-in fade-in duration-200">
      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      <span>Unsaved changes</span>
    </span>
  );
};
