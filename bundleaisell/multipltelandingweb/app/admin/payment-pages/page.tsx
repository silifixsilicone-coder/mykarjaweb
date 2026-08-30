import React from "react";
import { CreditCard, Sparkles } from "lucide-react";

export const metadata = {
  title: "Payment Pages | DIGITAL BUNDLE",
};

export default function PaymentPagesPlaceholder() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Payment Pages</h1>
        <p className="text-xs text-slate-500">
          Manage your digital product payment page links.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
          <CreditCard className="w-6 h-6" />
        </div>
        <div className="space-y-1 max-w-sm mx-auto">
          <h3 className="text-base font-bold text-slate-900">
            Payment Pages Placeholder
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Payment link management UI will be built in upcoming chapters.
          </p>
        </div>
      </div>
    </div>
  );
}
