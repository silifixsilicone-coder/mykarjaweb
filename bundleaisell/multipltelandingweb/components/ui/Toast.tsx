"use client";

import React, { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id: string;
  message: string;
  variant?: "success" | "info" | "error";
  onDismiss: (id: string) => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  variant = "success",
  onDismiss,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  const variants = {
    success: "bg-slate-900 text-white border-slate-800 shadow-xl",
    info: "bg-sky-900 text-white border-sky-800 shadow-xl",
    error: "bg-rose-900 text-white border-rose-800 shadow-xl",
  };

  return (
    <div
      role="status"
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-xs font-medium transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in min-w-[240px] max-w-sm pointer-events-auto",
        variants[variant]
      )}
    >
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{message}</span>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
