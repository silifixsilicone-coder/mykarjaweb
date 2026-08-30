"use client";

import React, { useState, useEffect } from "react";
import { X, ShoppingCart, Link2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface ButtonSettingsModalProps {
  isOpen: boolean;
  buttonText: string;
  paymentLink: string;
  onSave: (newText: string, newLink: string) => void;
  onClose: () => void;
}

export const ButtonSettingsModal: React.FC<ButtonSettingsModalProps> = ({
  isOpen,
  buttonText,
  paymentLink,
  onSave,
  onClose,
}) => {
  const [text, setText] = useState(buttonText);
  const [link, setLink] = useState(paymentLink);

  useEffect(() => {
    setText(buttonText);
    setLink(paymentLink);
  }, [buttonText, paymentLink]);

  if (!isOpen) return null;

  const handleDone = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(text.trim() || "Buy Now", link.trim() || "/pay/item");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 space-y-5 z-50 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#005C52] flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Buy Button Settings
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleDone} className="space-y-4">
          <div className="space-y-1">
            <Input
              label="Button Text"
              maxLength={25}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Buy Now"
            />
            <div className="text-[10px] text-slate-400 text-right pr-0.5 font-semibold">
              {text.length} / 25
            </div>
          </div>

          <div className="space-y-1">
            <Input
              label="Payment Page Link"
              leftIcon={<Link2 className="w-4 h-4" />}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="/pay/ai-video-reels"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              fullWidth
              className="bg-[#005C52] hover:bg-[#004840] text-white text-xs py-2.5"
            >
              Done
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
