import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const LandingPagesHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Landing Pages
        </h1>
        <p className="text-xs text-slate-500">
          Create and manage all your digital product landing pages.
        </p>
      </div>

      <div>
        <Link href="/admin/landing-pages/create">
          <Button className="w-full sm:w-auto gap-2 bg-[#005C52] hover:bg-[#004840] border-[#005C52] text-white shadow-xs">
            <Plus className="w-4 h-4" />
            <span>+ Create Landing Page</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
