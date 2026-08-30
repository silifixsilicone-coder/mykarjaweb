import React from "react";

interface PriceDisplayProps {
  price?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ price = "499" }) => {
  const formattedPrice = price.startsWith("₹") ? price : `₹${price}`;

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-5xl font-black text-[#005C52] tracking-tight">
        {formattedPrice}
      </div>
    </div>
  );
};
