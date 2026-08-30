import React from "react";
import { DeviceMode } from "@/types/create";
import { Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewDeviceSwitcherProps {
  device: DeviceMode;
  onDeviceChange: (device: DeviceMode) => void;
}

export const PreviewDeviceSwitcher: React.FC<PreviewDeviceSwitcherProps> = ({
  device,
  onDeviceChange,
}) => {
  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60 shrink-0">
      <button
        type="button"
        onClick={() => onDeviceChange("desktop")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
          device === "desktop"
            ? "bg-white text-slate-900 shadow-xs"
            : "text-slate-500 hover:text-slate-800"
        )}
      >
        <Monitor className="w-3.5 h-3.5" />
        <span>Desktop</span>
      </button>

      <button
        type="button"
        onClick={() => onDeviceChange("mobile")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
          device === "mobile"
            ? "bg-white text-slate-900 shadow-xs"
            : "text-slate-500 hover:text-slate-800"
        )}
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>Mobile</span>
      </button>
    </div>
  );
};
