import React from "react";
import { Settings, Sparkles } from "lucide-react";

export const metadata = {
  title: "Settings | DIGITAL BUNDLE",
};

export default function SettingsPlaceholder() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="text-xs text-slate-500">
          Configure admin credentials and workspace settings.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
          <Settings className="w-6 h-6" />
        </div>
        <div className="space-y-1 max-w-sm mx-auto">
          <h3 className="text-base font-bold text-slate-900">
            Settings Placeholder
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Admin settings and system configurations will be implemented in future chapters.
          </p>
        </div>
      </div>
    </div>
  );
}
