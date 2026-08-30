"use client";

import React, { useRef } from "react";
import { FormSection } from "./FormSection";
import { Upload, RefreshCw, Trash2, Image as ImageIcon } from "lucide-react";
import { ValidationMessage } from "./ValidationMessage";

interface ImageUploaderProps {
  title: string;
  subtitle: string;
  recommendedText?: string;
  image: string | null;
  onImageChange: (image: string | null) => void;
  error?: string;
  aspectRatio?: "banner" | "square" | "product";
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  subtitle,
  recommendedText = "PNG, JPG or WEBP",
  image,
  onImageChange,
  error,
  aspectRatio = "banner",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      onImageChange(localUrl);
    }
  };

  const handleRemove = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <FormSection title={title} subtitle={subtitle}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {image ? (
        /* Image Preview Box */
        <div className="space-y-3">
          <div className="relative w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[16/9] flex items-center justify-center">
            <img
              src={image}
              alt="Uploaded preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replace</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-3 py-1.5 rounded-xl border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        /* Upload Drag & Drop Box */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-6 sm:p-8 text-center space-y-3 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-white text-slate-500 border border-slate-200 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform shadow-2xs">
            <Upload className="w-5 h-5 text-slate-600" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-800">
              Upload {title}
            </div>
            <div className="text-[11px] text-slate-400">
              {recommendedText}
            </div>
          </div>

          <div>
            <span className="inline-block px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-2xs group-hover:bg-slate-800 transition-colors">
              Choose Image
            </span>
          </div>
        </div>
      )}

      <ValidationMessage error={error} />
    </FormSection>
  );
};
