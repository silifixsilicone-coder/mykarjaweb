import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface BuyButtonProps {
  buttonText?: string;
  paymentLink?: string;
}

export const BuyButton: React.FC<BuyButtonProps> = ({
  buttonText = "Buy Now",
  paymentLink = "#pay",
}) => {
  const isExternal = paymentLink.startsWith("http");

  const buttonContent = (
    <span className="w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-2xl bg-[#005C52] hover:bg-[#004840] active:bg-[#00363d] text-white font-extrabold text-lg sm:text-xl shadow-lg shadow-[#005C52]/20 transition-all flex items-center justify-center gap-3 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#005C52]/30 active:scale-[0.99]">
      <ShoppingCart className="w-5 h-5 fill-white" />
      <span>{buttonText}</span>
    </span>
  );

  return (
    <div className="flex justify-center w-full px-4">
      {isExternal ? (
        <a href={paymentLink} target="_blank" rel="noopener noreferrer">
          {buttonContent}
        </a>
      ) : (
        <Link href={paymentLink}>{buttonContent}</Link>
      )}
    </div>
  );
};
