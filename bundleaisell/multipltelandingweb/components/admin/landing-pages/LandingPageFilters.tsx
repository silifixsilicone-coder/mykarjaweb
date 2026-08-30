import React from "react";
import { StatusFilterOption, SortOption } from "@/types/dashboard";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LandingPageFiltersProps {
  statusFilter: StatusFilterOption;
  onStatusChange: (status: StatusFilterOption) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const STATUS_OPTIONS: StatusFilterOption[] = ["All", "Published", "Draft"];

export const LandingPageFilters: React.FC<LandingPageFiltersProps> = ({
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
      {/* Status Pills */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60 self-start sm:self-auto overflow-x-auto max-w-full">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusChange(status)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
              statusFilter === status
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <label htmlFor="sort-dropdown" className="text-xs font-medium text-slate-500 flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span>Sort:</span>
        </label>
        <select
          id="sort-dropdown"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-white text-xs font-medium text-slate-800 border border-slate-200/80 rounded-xl px-3 py-1.5 focus:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 shadow-xs cursor-pointer"
        >
          <option value="updated">Recently Updated</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};
