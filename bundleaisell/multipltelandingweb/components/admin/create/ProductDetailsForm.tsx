import React from "react";
import { FormSection } from "./FormSection";
import { ValidationMessage } from "./ValidationMessage";
import { cn } from "@/lib/utils";

interface ProductDetailsFormProps {
  description: string;
  price: string;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  errors?: {
    description?: string;
    price?: string;
  };
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  description,
  price,
  onDescriptionChange,
  onPriceChange,
  errors,
}) => {
  const maxChars = 160;

  return (
    <FormSection
      title="Product Details"
      subtitle="Define pricing and short public description."
    >
      {/* Short Description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Short Description
          </label>
          <span
            className={cn(
              "text-[11px] font-semibold",
              description.length > maxChars ? "text-rose-600" : "text-slate-400"
            )}
          >
            {description.length} / {maxChars}
          </span>
        </div>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Enter a short description of your digital product..."
          className={cn(
            "w-full rounded-xl border border-slate-300/80 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition duration-150 focus:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none",
            errors?.description && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
          )}
        />
        <ValidationMessage error={errors?.description} />
      </div>

      {/* Price Input */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          Price
        </label>
        <div className="relative rounded-xl shadow-xs">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500 font-bold text-sm">
            ₹
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={price}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              onPriceChange(val);
            }}
            placeholder="499"
            className={cn(
              "w-full min-h-[44px] rounded-xl border border-slate-300/80 bg-white pl-8 pr-3.5 py-2.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-colors",
              errors?.price && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
            )}
          />
        </div>
        <ValidationMessage error={errors?.price} />
      </div>
    </FormSection>
  );
};
