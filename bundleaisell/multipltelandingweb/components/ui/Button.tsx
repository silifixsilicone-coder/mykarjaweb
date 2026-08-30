import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      isLoading = false,
      loadingText,
      variant = "primary",
      fullWidth = false,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20 active:scale-[0.99] rounded-xl text-sm min-h-[44px] px-5 py-2.5 shadow-sm";

    const variants = {
      primary:
        "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 border border-slate-900 shadow-slate-900/10 hover:shadow-md",
      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 border border-slate-200/80",
      outline:
        "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300",
      ghost:
        "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-none border-transparent",
    };

    const isButtonDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isButtonDisabled}
        className={cn(
          baseStyles,
          variants[variant],
          fullWidth && "w-full",
          isButtonDisabled && "opacity-60 cursor-not-allowed active:scale-100 shadow-none hover:bg-slate-900",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>{loadingText || children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
