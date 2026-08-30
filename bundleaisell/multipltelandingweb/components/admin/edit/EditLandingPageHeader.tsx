import React from "react";
import { ArrowLeft, Save, Eye, Send, RotateCcw, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { UnsavedChangesIndicator } from "./UnsavedChangesIndicator";
import { LandingPageStatus } from "@/types/dashboard";

interface EditLandingPageHeaderProps {
  status: LandingPageStatus;
  isDirty: boolean;
  onBack: () => void;
  onSaveChanges: () => void;
  onPreview: () => void;
  onTogglePublish: () => void;
  onResetChanges: () => void;
  isSubmitting?: boolean;
}

export const EditLandingPageHeader: React.FC<EditLandingPageHeaderProps> = ({
  status,
  isDirty,
  onBack,
  onSaveChanges,
  onPreview,
  onTogglePublish,
  onResetChanges,
  isSubmitting = false,
}) => {
  const isPublished = status === "Published";

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
      {/* Left: Back Link & Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Landing Pages</span>
          </button>
          {isDirty && <UnsavedChangesIndicator />}
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Edit Landing Page
        </h1>
        <p className="text-xs text-slate-500">
          Update your landing page details.
        </p>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap">
        {isDirty && (
          <Button
            type="button"
            variant="ghost"
            onClick={onResetChanges}
            className="text-xs py-2 px-3 text-amber-600 hover:bg-amber-50 gap-1.5"
            title="Discard changes"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={onSaveChanges}
          disabled={isSubmitting}
          className="text-xs py-2 px-3.5 gap-1.5 flex-1 sm:flex-none"
        >
          <Save className="w-3.5 h-3.5 text-slate-500" />
          <span>Save Changes</span>
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
          onClick={onTogglePublish}
          disabled={isSubmitting}
          className={
            isPublished
              ? "text-xs py-2 px-4 gap-1.5 bg-slate-900 hover:bg-slate-800 text-white flex-1 sm:flex-none"
              : "text-xs py-2 px-4 gap-1.5 bg-[#005C52] hover:bg-[#004840] border-[#005C52] text-white flex-1 sm:flex-none"
          }
        >
          {isPublished ? (
            <>
              <XCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Unpublish</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Publish</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
