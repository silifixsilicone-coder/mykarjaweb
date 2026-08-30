"use client";

import React, { useState } from "react";
import { BuyButton } from "./BuyButton";
import { ButtonSettingsModal } from "./ButtonSettingsModal";
import { Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableButtonProps {
  buttonText: string;
  paymentLink: string;
  onChange: (newText: string, newLink: string) => void;
  mode?: "edit" | "view";
  className?: string;
}

export const EditableButton: React.FC<EditableButtonProps> = ({
  buttonText,
  paymentLink,
  onChange,
  mode = "view",
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (mode === "view") {
    return <BuyButton buttonText={buttonText} paymentLink={paymentLink} />;
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "relative group cursor-pointer inline-block select-none rounded-2xl border-2 border-transparent hover:border-dashed hover:border-[#005C52] p-1 transition-all",
          className
        )}
        title="Click to edit button settings"
      >
        <BuyButton buttonText={buttonText} paymentLink={paymentLink} />
        <span className="absolute -top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-[#005C52] text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs z-10 pointer-events-none">
          <Edit2 className="w-2.5 h-2.5" /> Edit Button
        </span>
      </div>

      <ButtonSettingsModal
        isOpen={isModalOpen}
        buttonText={buttonText}
        paymentLink={paymentLink}
        onSave={(t, l) => onChange(t, l)}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
