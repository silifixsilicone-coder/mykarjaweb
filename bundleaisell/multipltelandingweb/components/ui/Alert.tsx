import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, X } from "lucide-react";

export interface AlertProps {
  message: string;
  variant?: "error" | "warning" | "info" | "success";
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  message,
  variant = "error",
  onClose,
  className,
}) => {
  if (!message) return null;

  const variants = {
    error: "bg-rose-50 border-rose-200 text-rose-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    info: "bg-sky-50 border-sky-200 text-sky-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  };

  const icons = {
    error: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />,
    info: <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />,
    success: <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />,
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start justify-between p-3.5 rounded-xl border text-xs leading-relaxed transition-all duration-200",
        variants[variant],
        className
      )}
    >
      <div className="flex items-start space-x-2.5">
        {icons[variant]}
        <div className="font-medium">{message}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 -mr-1"
          aria-label="Dismiss alert"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
