import React from "react";
import { AlertCircle } from "lucide-react";

interface ValidationMessageProps {
  error?: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-1.5 animate-in fade-in duration-150">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{error}</span>
    </p>
  );
};
