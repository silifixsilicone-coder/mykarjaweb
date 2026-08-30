import React from "react";
import { FormSection } from "./FormSection";
import { Input } from "@/components/ui/Input";
import { Globe, Edit2 } from "lucide-react";
import { ValidationMessage } from "./ValidationMessage";

interface SlugInputProps {
  slug: string;
  onChange: (value: string) => void;
  error?: string;
}

export const SlugInput: React.FC<SlugInputProps> = ({
  slug,
  onChange,
  error,
}) => {
  return (
    <FormSection
      title="URL Slug"
      subtitle="Define the public link address for this landing page."
    >
      <div className="space-y-2">
        <Input
          label="Custom Slug"
          placeholder="ai-video-reels-bundle"
          value={slug}
          onChange={(e) => onChange(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
          leftIcon={<Globe className="w-4 h-4" />}
          error={error}
        />

        {/* Live URL Preview */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-mono truncate">
            <span className="text-slate-400">Your landing page URL:</span>
            <span className="font-bold text-slate-800 truncate">
              yourdomain.com/l/{slug || "your-slug"}
            </span>
          </div>
        </div>
      </div>
    </FormSection>
  );
};
