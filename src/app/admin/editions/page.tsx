"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Edition } from "@/lib/types";

export default function AdminEditionsPage() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/admin/editions")
      .then((r) => r.json())
      .then((edData) => {
        setEditions(Array.isArray(edData) ? edData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleEditionChange = (id: string, field: string, value: string | boolean) => {
    setEditions((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleImageUpload = async (id: string, file: File) => {
    setUploadingId(id);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload image");

      const newUrl = data.url;

      // Update state
      setEditions((prev) =>
        prev.map((e) => (e.id === id ? { ...e, coverImage: newUrl } : e))
      );

      // Immediately save to API / Firestore
      const targetEd = editions.find((e) => e.id === id);
      if (targetEd) {
        await fetch("/api/admin/editions", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...targetEd, coverImage: newUrl }),
        });
      }

      setMessage({ text: "Book cover uploaded and published live on the website!", error: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error uploading image";
      setMessage({ text: errorMessage, error: true });
    } finally {
      setUploadingId(null);
    }
  };

  const handleRemoveImage = async (id: string) => {
    setEditions((prev) =>
      prev.map((e) => (e.id === id ? { ...e, coverImage: "" } : e))
    );
    const targetEd = editions.find((e) => e.id === id);
    if (targetEd) {
      await fetch("/api/admin/editions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...targetEd, coverImage: "" }),
      });
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/editions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editions),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update editions");

      setMessage({ text: "All Edition Prices, Settings & Covers saved live successfully!", error: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error saving changes";
      setMessage({ text: errorMessage, error: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-main/70">Loading editions...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <span className="text-gold font-bold text-xs uppercase tracking-widest block">
          BOOK COVER IMAGES & PRICING
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy text-deva">
          Language Editions & Cover Image Management
        </h1>
        <p className="text-xs sm:text-sm text-main/70 font-medium mt-1">
          Upload actual book cover images, set prices, and configure payment URLs for Marathi, Hindi, and English editions.
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

      {/* Editions Cards */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-navy text-deva border-b border-gold/20 pb-2">
          Language Editions (Marathi, Hindi, English)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {editions.map((ed) => {
            const hasCover = Boolean(ed.coverImage && ed.coverImage.trim() !== "");

            return (
              <div
                key={ed.id}
                className="bg-cream-dark/50 border border-gold/30 rounded-2xl p-6 space-y-5 shadow-sm flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex justify-between items-center pb-2 border-b border-gold/20">
                  <span className="font-bold text-navy text-sm uppercase tracking-wider">
                    {ed.language} EDITION
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ed.enabled}
                      onChange={(e) => handleEditionChange(ed.id, "enabled", e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-xs font-semibold text-main/80">Active</span>
                  </label>
                </div>

                {/* Cover Image Upload & Preview Box */}
                <div className="space-y-2">
                  <label className="font-bold text-navy text-xs block">
                    Book Cover Image
                  </label>
                  
                  <div className="relative w-full h-[220px] bg-navy/10 rounded-xl border-2 border-dashed border-gold/40 flex flex-col items-center justify-center p-3 text-center overflow-hidden group">
                    {hasCover ? (
                      <>
                        <img
                          src={ed.coverImage}
                          alt={ed.name}
                          className="w-full h-full object-contain p-2"
                        />
                        <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                          <label className="px-3 py-1.5 bg-gold text-navy text-xs font-bold rounded-lg cursor-pointer hover:bg-gold-light transition-colors">
                            Replace Cover
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleImageUpload(ed.id, e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                          <button
                            onClick={() => handleRemoveImage(ed.id)}
                            className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Remove Cover
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <svg className="w-10 h-10 text-gold/80 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs text-main/70 font-medium">
                          No cover uploaded
                        </p>
                        <label className="inline-block px-4 py-2 bg-navy text-gold text-xs font-bold rounded-lg cursor-pointer hover:bg-navy-light border border-gold/40 transition-colors">
                          {uploadingId === ed.id ? "Uploading..." : "Upload Book Cover"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleImageUpload(ed.id, e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Fields */}
                <div className="space-y-3 text-xs pt-2">
                  <div>
                    <label className="font-bold text-navy block mb-1">Edition Name</label>
                    <input
                      type="text"
                      value={ed.name}
                      onChange={(e) => handleEditionChange(ed.id, "name", e.target.value)}
                      className="w-full px-3 py-2 bg-cream border border-gold/30 rounded-lg text-navy font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy block mb-1">Price (e.g. ₹199)</label>
                    <input
                      type="text"
                      value={ed.price}
                      onChange={(e) => handleEditionChange(ed.id, "price", e.target.value)}
                      className="w-full px-3 py-2 bg-cream border border-gold/30 rounded-lg font-mono font-bold text-navy text-base"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy block mb-1">Button Text</label>
                    <input
                      type="text"
                      value={ed.buttonText}
                      onChange={(e) => handleEditionChange(ed.id, "buttonText", e.target.value)}
                      className="w-full px-3 py-2 bg-cream border border-gold/30 rounded-lg text-navy font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy block mb-1">Payment URL</label>
                    <input
                      type="url"
                      value={ed.paymentUrl}
                      onChange={(e) => handleEditionChange(ed.id, "paymentUrl", e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-cream border border-gold/30 rounded-lg text-navy font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={ed.description}
                      onChange={(e) => handleEditionChange(ed.id, "description", e.target.value)}
                      className="w-full px-3 py-2 bg-cream border border-gold/30 rounded-lg text-navy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-8 py-3 bg-gold hover:bg-gold-light text-navy font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? "Saving Changes..." : "Save Editions & Book Covers"}
        </button>
      </div>
    </div>
  );
}
