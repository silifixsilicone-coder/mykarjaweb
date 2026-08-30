"use client";

import React, { useState, useRef, useEffect } from "react";
import { Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditablePriceProps {
  value: string;
  onChange: (newPrice: string) => void;
  mode?: "edit" | "view";
  className?: string;
}

export const EditablePrice: React.FC<EditablePriceProps> = ({
  value,
  onChange,
  mode = "view",
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempPrice, setTempPrice] = useState(value.replace(/[^0-9]/g, ""));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempPrice(value.replace(/[^0-9]/g, ""));
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    const cleaned = tempPrice.replace(/[^0-9]/g, "");
    if (cleaned && cleaned !== value) {
      onChange(cleaned);
    } else {
      setTempPrice(value.replace(/[^0-9]/g, ""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setTempPrice(value.replace(/[^0-9]/g, ""));
      setIsEditing(false);
    }
  };

  const formattedValue = value.startsWith("₹") ? value : `₹${value}`;

  if (mode === "view") {
    return <div className={className}>{formattedValue}</div>;
  }

  if (isEditing) {
    return (
      <div className="inline-flex items-center justify-center gap-1 bg-white p-1.5 rounded-2xl border-2 border-[#005C52] shadow-lg">
        <span className="text-2xl font-extrabold text-[#005C52]">₹</span>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={tempPrice}
          onChange={(e) => setTempPrice(e.target.value.replace(/[^0-9]/g, ""))}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-24 text-2xl font-black text-[#005C52] outline-none text-center bg-transparent"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="relative group cursor-pointer inline-block select-none"
      title="Click to edit price"
    >
      <div
        className={cn(
          "transition-all border-2 border-transparent group-hover:border-dashed group-hover:border-[#005C52] group-hover:bg-[#005C52]/5 rounded-2xl px-3 py-1",
          className
        )}
      >
        {formattedValue}
      </div>
      <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#005C52] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs z-10 pointer-events-none">
        <Edit2 className="w-2.5 h-2.5" /> Edit Price
      </span>
    </div>
  );
};
