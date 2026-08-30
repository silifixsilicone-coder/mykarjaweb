"use client";

import React, { useRef } from "react";
import { Upload, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImagePickerModalProps {
  isOpen: boolean;
  title: string;
  onSelectImage: (imageUrl: string) => void;
  onRemoveImage: () => void;
  onClose: () => void;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isOpen,
  title,
  onSelectImage,
  onRemoveImage,
  onClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      onSelectImage(localUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 space-y-5 z-50 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Edit {title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="space-y-3">
          <Button
            type="button"
            fullWidth
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#005C52] hover:bg-[#004840] text-white gap-2 text-xs py-2.5"
          >
            <Upload className="w-4 h-4" />
            <span>Replace Image</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={() => {
              onRemoveImage();
              onClose();
            }}
            className="text-rose-600 border-rose-200 hover:bg-rose-50 gap-2 text-xs py-2.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove Image</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
