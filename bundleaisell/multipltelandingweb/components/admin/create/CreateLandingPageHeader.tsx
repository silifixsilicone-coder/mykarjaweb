import React from "react";
import { ArrowLeft, Save, Eye, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CreateLandingPageHeaderProps {
  onBack: () => void;
  onSaveDraft: () => void;
  onPreview: () => void;
  onPublish: () => void;
  isSubmitting?: boolean;
}

export const CreateLandingPageHeader: React.FC<CreateLandingPageHeaderProps> = ({
  onBack,
  onSaveDraft,
  onPreview,
  onPublish,
  isSubmitting = false,
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
      {/* Left: Back & Title */}
      <div className="space-y-1">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Landing Pages</span>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Create Landing Page
        </h1>
        <p className="text-xs text-slate-500">
          Create a new digital product landing page.
        </p>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap">
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          disabled={isSubmitting}
          className="text-xs py-2 px-3.5 gap-1.5 flex-1 sm:flex-none"
        >
          <Save className="w-3.5 h-3.5 text-slate-500" />
          <span>Save Draft</span>
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={onPreview}
          className="text-xs py-2 px-3.5 gap-1.5 flex-1 sm:flex-none"
        >
          <Eye className="w-3.5 h-3.5 text-slate-600" />
          <span>Preview</span>
        </Button>

        <Button
          type="button"
          onClick={onPublish}
          disabled={isSubmitting}
          className="text-xs py-2 px-4 gap-1.5 bg-[#005C52] hover:bg-[#004840] border-[#005C52] text-white flex-1 sm:flex-none"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Publish</span>
        </Button>
      </div>
    </div>
  );
};
