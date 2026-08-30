"use client";

import React, { useState } from "react";
import { Edit2, Image as ImageIcon } from "lucide-react";
import { ImagePickerModal } from "./ImagePickerModal";
import { cn } from "@/lib/utils";

interface EditableImageProps {
  image: string | null;
  altText: string;
  onImageChange: (newImage: string | null) => void;
  mode?: "edit" | "view";
  title?: string;
  containerClassName?: string;
  imageClassName?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  image,
  altText,
  onImageChange,
  mode = "view",
  title = "Image",
  containerClassName,
  imageClassName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (mode === "view") {
    if (!image) return null;
    return (
      <div className={containerClassName}>
        <img src={image} alt={altText} className={imageClassName} />
      </div>
    );
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "relative group cursor-pointer overflow-hidden border-2 border-transparent hover:border-dashed hover:border-[#005C52] transition-all rounded-2xl",
          containerClassName
        )}
        title={`Click to edit ${title}`}
      >
        {image ? (
          <img src={image} alt={altText} className={imageClassName} />
        ) : (
          <div className="w-full h-full min-h-[160px] bg-slate-200/80 flex flex-col items-center justify-center p-4 text-center text-slate-500 gap-1.5">
            <ImageIcon className="w-8 h-8 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Add {title}
            </span>
          </div>
        )}

        {/* Hover Overlay Badge */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-[#005C52] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit {title}</span>
          </span>
        </div>
      </div>

      <ImagePickerModal
        isOpen={isModalOpen}
        title={title}
        onSelectImage={(url) => onImageChange(url)}
        onRemoveImage={() => onImageChange(null)}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
