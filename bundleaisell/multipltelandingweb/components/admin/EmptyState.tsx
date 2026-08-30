import React from "react";
import { Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No landing pages yet",
  description = "Create your first landing page to start selling your digital products.",
  actionText = "Create Landing Page",
  actionHref = "/admin/landing-pages/create",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-4">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 border border-slate-200/60">
        <Layers className="w-7 h-7 text-slate-600" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>

      {actionHref && (
        <div className="pt-2">
          <Link href={actionHref}>
            <Button variant="primary" className="gap-2">
              <Plus className="w-4 h-4" />
              <span>{actionText}</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
