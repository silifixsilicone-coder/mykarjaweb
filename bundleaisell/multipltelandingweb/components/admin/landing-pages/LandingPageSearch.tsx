import React from "react";
import { Search, X } from "lucide-react";

interface LandingPageSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const LandingPageSearch: React.FC<LandingPageSearchProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative w-full">
      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search landing pages..."
        className="w-full bg-white text-xs text-slate-900 placeholder:text-slate-400 pl-10 pr-9 py-2.5 rounded-xl border border-slate-200/80 shadow-xs focus:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
