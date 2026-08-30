import React from "react";
import { Package } from "lucide-react";

interface ProductDisplayProps {
  productImage?: string | null;
  altText?: string;
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({
  productImage,
  altText = "Product Image",
}) => {
  return (
    <div className="flex justify-center w-full">
      <div className="relative max-w-sm sm:max-w-md w-full rounded-3xl overflow-hidden bg-white border border-black/5 shadow-md p-3 sm:p-4 flex items-center justify-center">
        {productImage ? (
          <div className="w-full aspect-square max-h-[360px] rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
            <img
              src={productImage}
              alt={altText}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ) : (
          <div className="w-full aspect-square max-h-[360px] rounded-2xl bg-[#F3F2E0] flex flex-col items-center justify-center p-6 text-center space-y-2 text-[#555B57]">
            <div className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center text-[#005C52]">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider">
              Product Image Placeholder
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
