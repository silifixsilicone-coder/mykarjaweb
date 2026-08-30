"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PreviewPage } from "@/lib/types";

export default function AdminPreviewPagesPage() {
  const [pages, setPages] = useState<PreviewPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/admin/preview-pages")
      .then((r) => r.json())
      .then((data) => {
        const list: PreviewPage[] = Array.isArray(data) ? data : [];
        
        const fixed3: PreviewPage[] = [
          {
            id: list[0]?.id || "1",
            image: list[0]?.image || "",
            caption: list[0]?.caption || "पृष्ठ १ — कर्ज व्यवस्थापन",
            sortOrder: 1,
          },
          {
            id: list[1]?.id || "2",
            image: list[1]?.image || "",
            caption: list[1]?.caption || "पृष्ठ २ — मानसिक शांतता",
            sortOrder: 2,
          },
          {
            id: list[2]?.id || "3",
            image: list[2]?.image || "",
            caption: list[2]?.caption || "पृष्ठ ३ — बचत आणि Positive Thinking",
            sortOrder: 3,
          },
        ];

        setPages(fixed3);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handlePageChange = (index: number, field: string, value: string) => {
    setPages((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleFileUpload = async (index: number, file: File) => {
    setUploadingIdx(index);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload preview image");

      handlePageChange(index, "image", data.url);
      setMessage({ text: `Preview Page ${index + 1} uploaded successfully! Click 'Save Preview Pages' to publish.`, error: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error uploading image";
      setMessage({ text: errorMessage, error: true });
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleRemoveImage = (index: number) => {
    handlePageChange(index, "image", "");
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/preview-pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pages),
      });

      if (!res.ok) throw new Error("Failed to update preview pages");

      setMessage({ text: "All 3 Preview Pages updated successfully!", error: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error saving preview pages";
      setMessage({ text: errorMessage, error: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-main/70">Loading preview pages...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <span className="text-gold font-bold text-xs uppercase tracking-widest block">
          EXACTLY 3 PREVIEW SLOTS
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy text-deva">
          Book Preview Pages (Exactly 3 Pages)
        </h1>
        <p className="text-xs sm:text-sm text-main/70 font-medium mt-1">
          Upload and manage screenshots for Preview Page 1, Preview Page 2, and Preview Page 3.
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

      {/* 3 Fixed Preview Slots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pages.map((p, idx) => {
          const hasImage = p.image && p.image.startsWith("/uploads/") && !p.image.includes("preview-page-");

          return (
            <div
              key={idx}
              className="bg-cream-dark/50 border border-gold/30 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between"
            >
              <div className="flex justify-between items-center pb-2 border-b border-gold/20">
                <span className="font-bold text-navy text-sm uppercase tracking-wider">
                  PREVIEW PAGE {idx + 1}
                </span>
                <span className="text-xs font-mono font-semibold text-gold bg-navy px-2 py-0.5 rounded">
                  Slot #{idx + 1}
                </span>
              </div>

              {/* Upload Box & Preview */}
              <div className="space-y-2">
                <label className="font-bold text-navy text-xs block">
                  Page Image
                </label>

                <div className="relative w-full h-[220px] bg-navy/10 rounded-xl border-2 border-dashed border-gold/40 flex flex-col items-center justify-center p-3 text-center overflow-hidden group">
                  {hasImage ? (
                    <>
                      <Image
                        src={p.image}
                        alt={`Preview Page ${idx + 1}`}
                        fill
                        className="object-contain p-2"
                      />
                      <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                        <label className="px-3 py-1.5 bg-gold text-navy text-xs font-bold rounded-lg cursor-pointer hover:bg-gold-light transition-colors">
                          Replace Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(idx, e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                        <button
                          onClick={() => handleRemoveImage(idx)}
                          className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Remove Image
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <svg className="w-10 h-10 text-gold/80 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-main/70 font-medium">
                        No image uploaded
                      </p>
                      <label className="inline-block px-4 py-2 bg-navy text-gold text-xs font-bold rounded-lg cursor-pointer hover:bg-navy-light border border-gold/40 transition-colors">
                        {uploadingIdx === idx ? "Uploading..." : "Upload Page Image"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(idx, e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Caption */}
              <div className="space-y-1 text-xs">
                <label className="font-bold text-navy block mb-1">Caption</label>
                <input
                  type="text"
                  value={p.caption}
                  onChange={(e) => handlePageChange(idx, "caption", e.target.value)}
                  className="w-full px-3 py-2 bg-cream border border-gold/30 rounded-lg text-navy font-medium"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-8 py-3 bg-gold hover:bg-gold-light text-navy font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? "Saving Changes..." : "Save 3 Preview Pages"}
        </button>
      </div>
    </div>
  );
}
