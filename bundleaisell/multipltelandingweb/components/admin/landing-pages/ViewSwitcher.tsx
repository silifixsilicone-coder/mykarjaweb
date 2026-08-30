import React from "react";
import { ViewMode } from "@/types/dashboard";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewSwitcherProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  viewMode,
  onViewChange,
}) => {
  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60 shrink-0">
      <button
        type="button"
        onClick={() => onViewChange("grid")}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all",
          viewMode === "grid"
            ? "bg-white text-slate-900 shadow-xs"
            : "text-slate-500 hover:text-slate-800"
        )}
        aria-label="Grid View"
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Grid</span>
      </button>

      <button
        type="button"
        onClick={() => onViewChange("list")}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all",
          viewMode === "list"
            ? "bg-white text-slate-900 shadow-xs"
            : "text-slate-500 hover:text-slate-800"
        )}
        aria-label="List View"
      >
        <List className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  );
};
