import React from "react";

interface ProductDetailsProps {
  productName?: string;
  description?: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  productName = "Product Name",
  description = "Get access to a premium collection of digital product resources.",
}) => {
  return (
    <div className="text-center space-y-3 max-w-xl mx-auto px-4">
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] leading-tight">
        {productName}
      </h1>
      {description && (
        <p className="text-sm sm:text-base text-[#555B57] font-medium leading-relaxed max-w-md mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
