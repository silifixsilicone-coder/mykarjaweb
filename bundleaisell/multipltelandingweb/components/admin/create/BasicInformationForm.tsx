import React from "react";
import { FormSection } from "./FormSection";
import { Input } from "@/components/ui/Input";
import { ValidationMessage } from "./ValidationMessage";

interface BasicInformationFormProps {
  name: string;
  productName: string;
  onNameChange: (value: string) => void;
  onProductNameChange: (value: string) => void;
  errors?: {
    name?: string;
    productName?: string;
  };
}

export const BasicInformationForm: React.FC<BasicInformationFormProps> = ({
  name,
  productName,
  onNameChange,
  onProductNameChange,
  errors,
}) => {
  return (
    <FormSection
      title="Basic Information"
      subtitle="Configure internal and public title information."
    >
      {/* Landing Page Name (Internal) */}
      <div className="space-y-1">
        <Input
          label="Landing Page Name"
          placeholder="Example: AI Video Reels Bundle"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          error={errors?.name}
        />
        <p className="text-[11px] text-slate-400 pl-0.5">
          Internal name used to manage this landing page.
        </p>
      </div>

      {/* Product / Course Name (Public) */}
      <div className="space-y-1">
        <Input
          label="Product Name"
          placeholder="Enter product or course name"
          value={productName}
          onChange={(e) => onProductNameChange(e.target.value)}
          error={errors?.productName}
        />
        <p className="text-[11px] text-slate-400 pl-0.5">
          This is the main title shown on the public landing page.
        </p>
      </div>
    </FormSection>
  );
};
