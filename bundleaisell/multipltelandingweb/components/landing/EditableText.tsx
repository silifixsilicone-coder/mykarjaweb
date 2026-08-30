"use client";

import React, { useState, useRef, useEffect } from "react";
import { Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  mode?: "edit" | "view";
  maxChars?: number;
  tagName?: "h1" | "p" | "span";
  className?: string;
  placeholder?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  mode = "view",
  maxChars = 160,
  tagName = "p",
  className,
  placeholder = "Click to edit text...",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    const trimmed = tempValue.trim();
    if (trimmed && trimmed !== value) {
      onChange(trimmed.slice(0, maxChars));
    } else {
      setTempValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagName !== "p") {
      e.preventDefault();
      handleBlur();
    } else if (e.key === "Escape") {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (mode === "view") {
    const Tag = tagName;
    return <Tag className={className}>{value || placeholder}</Tag>;
  }

  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        {tagName === "p" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={tempValue}
            maxLength={maxChars}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            rows={2}
            className={cn(
              "w-full bg-white text-[#111111] p-2 rounded-xl border-2 border-[#005C52] outline-none shadow-md font-sans text-center resize-none",
              className
            )}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={tempValue}
            maxLength={maxChars}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full bg-white text-[#111111] p-1.5 rounded-xl border-2 border-[#005C52] outline-none shadow-md text-center font-sans",
              className
            )}
          />
        )}
        <div className="absolute -bottom-5 right-1 text-[10px] font-bold bg-[#005C52] text-white px-1.5 py-0.5 rounded shadow-2xs z-20">
          {tempValue.length} / {maxChars}
        </div>
      </div>
    );
  }

  const Tag = tagName;

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="relative group cursor-pointer inline-block w-full select-none"
      title="Click to edit text"
    >
      <Tag
        className={cn(
          "transition-all border-2 border-transparent group-hover:border-dashed group-hover:border-[#005C52] group-hover:bg-[#005C52]/5 rounded-xl p-1",
          className
        )}
      >
        {value || placeholder}
      </Tag>
      <span className="absolute -top-3 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#005C52] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs z-10 pointer-events-none">
        <Edit2 className="w-2.5 h-2.5" /> Edit
      </span>
    </div>
  );
};
