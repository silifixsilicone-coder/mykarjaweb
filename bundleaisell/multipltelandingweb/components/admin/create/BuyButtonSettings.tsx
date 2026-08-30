import React from "react";
import { FormSection } from "./FormSection";
import { Input } from "@/components/ui/Input";
import { Link2 } from "lucide-react";
import { ValidationMessage } from "./ValidationMessage";

interface BuyButtonSettingsProps {
  buttonText: string;
  paymentLink: string;
  onButtonTextChange: (value: string) => void;
  onPaymentLinkChange: (value: string) => void;
  errors?: {
    buyButtonText?: string;
    paymentLink?: string;
  };
}

export const BuyButtonSettings: React.FC<BuyButtonSettingsProps> = ({
  buttonText,
  paymentLink,
  onButtonTextChange,
  onPaymentLinkChange,
  errors,
}) => {
  return (
    <FormSection
      title="Buy Button"
      subtitle="Configure call-to-action text and checkout target URL."
    >
      {/* Button Text */}
      <div className="space-y-1">
        <Input
          label="Button Text"
          placeholder="Buy Now"
          value={buttonText}
          onChange={(e) => onButtonTextChange(e.target.value)}
          error={errors?.buyButtonText}
        />
      </div>

      {/* Payment Page Link */}
      <div className="space-y-1">
        <Input
          label="Payment Page Link"
          placeholder="/pay/ai-video-reels"
          value={paymentLink}
          onChange={(e) => onPaymentLinkChange(e.target.value)}
          leftIcon={<Link2 className="w-4 h-4" />}
          error={errors?.paymentLink}
        />
        <p className="text-[11px] text-slate-400 pl-0.5">
          Customer will be redirected to this page after clicking the Buy button.
        </p>
      </div>
    </FormSection>
  );
};
