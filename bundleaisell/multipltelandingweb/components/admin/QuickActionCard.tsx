import React from "react";
import { QuickAction } from "@/types/dashboard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Plus, ArrowRight, CreditCard } from "lucide-react";

interface QuickActionCardProps {
  action: QuickAction;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({ action }) => {
  const getActionIcon = (id: string) => {
    switch (id) {
      case "qa-1":
        return <Plus className="w-4 h-4" />;
      case "qa-2":
        return <ArrowRight className="w-4 h-4" />;
      case "qa-3":
        return <CreditCard className="w-4 h-4" />;
      default:
        return <ArrowRight className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between space-y-4">
      <div className="space-y-1.5 text-left">
        <h3 className="text-sm font-bold text-slate-900">{action.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          {action.description}
        </p>
      </div>

      <div className="pt-1">
        <Link href={action.href} className="block w-full">
          <Button
            variant={action.id === "qa-1" ? "primary" : "secondary"}
            fullWidth
            className="gap-2 text-xs py-2 min-h-[38px]"
          >
            <span>{action.buttonText}</span>
            {getActionIcon(action.id)}
          </Button>
        </Link>
      </div>
    </div>
  );
};
