"use client";

import React, { useState, useEffect } from "react";
import { validateUrl } from "@/lib/utils";

export default function PaymentUrlsPage() {
  const [formData, setFormData] = useState({
    navbarCtaText: "eBook घ्या",
    navbarPaymentUrl: "",
    heroCtaText: "आता eBook घ्या",
    heroPaymentUrl: "",
    marathiPaymentUrl: "",
    hindiPaymentUrl: "",
    englishPaymentUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/admin/payment-urls")
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          navbarCtaText: data.navbarCtaText || "eBook घ्या",
          navbarPaymentUrl: data.navbarPaymentUrl || "",
          heroCtaText: data.heroCtaText || "आता eBook घ्या",
          heroPaymentUrl: data.heroPaymentUrl || "",
          marathiPaymentUrl: data.marathiPaymentUrl || "",
          hindiPaymentUrl: data.hindiPaymentUrl || "",
          englishPaymentUrl: data.englishPaymentUrl || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const fieldsToValidate = [
      { name: "Navbar", value: formData.navbarPaymentUrl },
      { name: "Hero", value: formData.heroPaymentUrl },
      { name: "Marathi", value: formData.marathiPaymentUrl },
      { name: "Hindi", value: formData.hindiPaymentUrl },
      { name: "English", value: formData.englishPaymentUrl },
    ];

    for (const f of fieldsToValidate) {
      if (f.value && f.value.trim() !== "" && !validateUrl(f.value)) {
        setMessage({
          text: `Invalid ${f.name} Payment URL! Must start with http:// or https://`,
          error: true,
        });
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/payment-urls", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save purchase links");

      setMessage({ text: "All Purchase Links & Payment URLs updated successfully!", error: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error saving purchase links";
      setMessage({ text: errorMessage, error: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-main/70">
        Loading purchase links...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <span className="text-gold font-bold text-xs uppercase tracking-widest block">
          CENTRAL BUY BUTTON LINK SYSTEM
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy text-deva">
          Purchase Links & Payment URLs
        </h1>
        <p className="text-xs sm:text-sm text-main/70 font-medium mt-1">
          Configure button copy and external payment links for Navbar, Hero, and Edition cards.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold border ${
            message.error
              ? "bg-red-50 text-red-700 border-red-200"
              : "bg-emerald-50 text-emerald-800 border-emerald-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: PURCHASE LINKS (Navbar & Hero) */}
        <div className="bg-cream-dark/50 border border-gold/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-lg font-bold text-navy text-deva border-b border-gold/20 pb-2">
            PURCHASE LINKS (Navbar & Hero)
          </h2>

          {/* Navbar Buy Button */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-navy uppercase tracking-wider">
              Navbar Buy Button
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-deva font-bold text-xs text-navy mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.navbarCtaText}
                  onChange={(e) => handleChange("navbarCtaText", e.target.value)}
                  placeholder="eBook घ्या"
                  className="w-full px-4 py-2.5 bg-cream border border-gold/40 rounded-xl text-sm text-navy font-semibold focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-deva font-bold text-xs text-navy mb-1">
                  External Payment URL
                </label>
                <input
                  type="url"
                  value={formData.navbarPaymentUrl}
                  onChange={(e) => handleChange("navbarPaymentUrl", e.target.value)}
                  placeholder="https://your-payment-gateway.com/pay/navbar"
                  className="w-full px-4 py-2.5 bg-cream border border-gold/40 rounded-xl text-sm font-mono text-navy focus:outline-none focus:border-gold"
                />
              </div>
            </div>
            {formData.navbarPaymentUrl && !validateUrl(formData.navbarPaymentUrl) && (
              <p className="text-xs text-red-600 font-semibold">
                ⚠️ Warning: URL must start with http:// or https://
              </p>
            )}
          </div>

          {/* Hero Buy Button */}
          <div className="space-y-4 pt-4 border-t border-gold/20">
            <h3 className="text-sm font-bold text-navy uppercase tracking-wider">
              Hero Buy Button
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-deva font-bold text-xs text-navy mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.heroCtaText}
                  onChange={(e) => handleChange("heroCtaText", e.target.value)}
                  placeholder="आता eBook घ्या"
                  className="w-full px-4 py-2.5 bg-cream border border-gold/40 rounded-xl text-sm text-navy font-semibold focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-deva font-bold text-xs text-navy mb-1">
                  External Payment URL
                </label>
                <input
                  type="url"
                  value={formData.heroPaymentUrl}
                  onChange={(e) => handleChange("heroPaymentUrl", e.target.value)}
                  placeholder="https://your-payment-gateway.com/pay/hero"
                  className="w-full px-4 py-2.5 bg-cream border border-gold/40 rounded-xl text-sm font-mono text-navy focus:outline-none focus:border-gold"
                />
              </div>
            </div>
            {formData.heroPaymentUrl && !validateUrl(formData.heroPaymentUrl) && (
              <p className="text-xs text-red-600 font-semibold">
                ⚠️ Warning: URL must start with http:// or https://
              </p>
            )}
          </div>
        </div>

        {/* Section 2: Edition Payment URLs */}
        <div className="bg-cream-dark/50 border border-gold/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-lg font-bold text-navy text-deva border-b border-gold/20 pb-2">
            EDITION PAYMENT URLS
          </h2>

          {/* Marathi */}
          <div className="space-y-2">
            <label className="block text-deva font-bold text-sm text-navy">
              मराठी Edition Payment URL
            </label>
            <input
              type="url"
              value={formData.marathiPaymentUrl}
              onChange={(e) => handleChange("marathiPaymentUrl", e.target.value)}
              placeholder="https://your-payment-gateway.com/pay/marathi"
              className="w-full px-4 py-2.5 bg-cream border border-gold/40 rounded-xl text-sm font-mono text-navy focus:outline-none focus:border-gold"
            />
          </div>

          {/* Hindi */}
          <div className="space-y-2 pt-4 border-t border-gold/20">
            <label className="block text-deva font-bold text-sm text-navy">
              हिंदी Edition Payment URL
            </label>
            <input
              type="url"
              value={formData.hindiPaymentUrl}
              onChange={(e) => handleChange("hindiPaymentUrl", e.target.value)}
              placeholder="https://your-payment-gateway.com/pay/hindi"
              className="w-full px-4 py-2.5 bg-cream border border-gold/40 rounded-xl text-sm font-mono text-navy focus:outline-none focus:border-gold"
            />
          </div>

          {/* English */}
          <div className="space-y-2 pt-4 border-t border-gold/20">
            <label className="block text-deva font-bold text-sm text-navy">
              English Edition Payment URL
            </label>
            <input
              type="url"
              value={formData.englishPaymentUrl}
              onChange={(e) => handleChange("englishPaymentUrl", e.target.value)}
              placeholder="https://your-payment-gateway.com/pay/english"
              className="w-full px-4 py-2.5 bg-cream border border-gold/40 rounded-xl text-sm font-mono text-navy focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 bg-gold hover:bg-gold-light text-navy font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {saving ? "Saving Links..." : "Save Purchase Links & URLs"}
          </button>
        </div>
      </form>
    </div>
  );
}
