"use client";

import { useEffect, useState, useRef } from "react";
import { SiteSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "intro" | "author" | "seo">("hero");
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<keyof SiteSettings | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
        setMessage({ type: "error", text: "सेटिंग्ज लोड करताना त्रुटी आली." });
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  function handleChange(field: keyof SiteSettings, value: string | boolean) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  function triggerUpload(field: keyof SiteSettings) {
    setUploadTarget(field);
    fileInputRef.current?.click();
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !uploadTarget) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploadingFor(uploadTarget);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.url) {
        handleChange(uploadTarget, data.url);
        setMessage({ type: "success", text: "फोटो यशस्वीरित्या अपलोड झाला!" });
      } else {
        setMessage({ type: "error", text: data.error || "फोटो अपलोड अयशस्वी." });
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage({ type: "error", text: "फोटो अपलोड करताना त्रुटी आली." });
    } finally {
      setUploadingFor(null);
      setUploadTarget(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "सर्व सेटिंग्ज यशस्वीरित्या सेव्ह झाल्या!" });
      } else {
        const data = await res.json().catch(() => ({}));
        setMessage({ type: "error", text: data.error || "सेटिंग्ज सेव्ह करताना त्रुटी आली." });
      }
    } catch (err) {
      console.error("Save error:", err);
      setMessage({ type: "error", text: "सर्व्हर त्रुटी आली. कृपया पुन्हा प्रयत्न करा." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C58A24]/10 border border-[#C58A24]/30 text-[#C58A24] text-xs font-bold uppercase tracking-wider mb-2">
          <span>⚙️ Content Management</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#071827] font-serif-deva">
          मुख्य मजकूर व सेटिंग्ज (Site Content & Settings)
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Hero Section, Problem Statement, पुस्तकाची ओळख, लेखकाची माहिती, Final CTA आणि SEO Metadata बदला.
        </p>
      </div>

      {/* Notification */}
      {message && (
        <div
          className={`p-4 rounded-xl border text-sm flex items-center gap-3 transition-all ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {message.type === "success" ? (
            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-[#C58A24] border-t-transparent rounded-full mb-3" />
          <p>सेटिंग्ज लोड होत आहेत...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("hero")}
              className={`px-5 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === "hero"
                  ? "border-[#C58A24] text-[#C58A24]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              1. Hero Section (मुख्य भाग)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("intro")}
              className={`px-5 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === "intro"
                  ? "border-[#C58A24] text-[#C58A24]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              2. Problem & Book Intro
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("author")}
              className={`px-5 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === "author"
                  ? "border-[#C58A24] text-[#C58A24]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              3. Author & Final CTA
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("seo")}
              className={`px-5 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === "seo"
                  ? "border-[#C58A24] text-[#C58A24]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              4. SEO & Headings
            </button>
          </div>

          {/* TAB 1: HERO SECTION */}
          {activeTab === "hero" && (
            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-[#071827] border-b border-gray-100 pb-3">
                Hero Section (पृष्ठाचा मुख्य वरचा भाग)
              </h2>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Hero Quote (सर्वात वरचे सुविचार / कोट):
                </label>
                <input
                  type="text"
                  value={settings.heroQuote || ""}
                  onChange={(e) => handleChange("heroQuote", e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-serif-deva text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Hero Title (पुस्तकाचे मुख्य शीर्षक):
                </label>
                <input
                  type="text"
                  value={settings.heroTitle || ""}
                  onChange={(e) => handleChange("heroTitle", e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-base font-bold font-serif-deva text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Hero Subtitle (उपशीर्षक / विषय टॅग्स):
                </label>
                <input
                  type="text"
                  value={settings.heroSubtitle || ""}
                  onChange={(e) => handleChange("heroSubtitle", e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Hero Description (थोडक्यात वर्णन):
                </label>
                <textarea
                  rows={3}
                  value={settings.heroDescription || ""}
                  onChange={(e) => handleChange("heroDescription", e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Primary CTA Button Text:
                  </label>
                  <input
                    type="text"
                    value={settings.heroCta || ""}
                    onChange={(e) => handleChange("heroCta", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Secondary CTA Button Text:
                  </label>
                  <input
                    type="text"
                    value={settings.heroSecondaryCta || ""}
                    onChange={(e) => handleChange("heroSecondaryCta", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>
              </div>

              {/* Hero Book Cover Image */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Hero 3D Mockup Cover Image:
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-28 bg-gray-100 rounded-xl overflow-hidden border border-gray-300 shrink-0 flex items-center justify-center">
                    {settings.heroImage ? (
                      <img
                        src={settings.heroImage}
                        alt="Hero Cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-gray-400">No Image</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={settings.heroImage || ""}
                      onChange={(e) => handleChange("heroImage", e.target.value)}
                      placeholder="/uploads/book-cover.png"
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-lg font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => triggerUpload("heroImage")}
                      disabled={uploadingFor === "heroImage"}
                      className="px-4 py-2 rounded-xl bg-[#071827] text-[#E2B24A] hover:bg-[#0E2A3F] text-xs font-bold flex items-center gap-2 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      {uploadingFor === "heroImage" ? "अपलोड होत आहे..." : "Hero फोटो बदला"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROBLEM & BOOK INTRO */}
          {activeTab === "intro" && (
            <div className="space-y-6">
              {/* Problem Section */}
              <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-6 sm:p-8 space-y-4">
                <h2 className="text-lg font-bold text-[#071827] border-b border-gray-100 pb-3">
                  Problem Section (समस्या विभाग)
                </h2>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Problem Headline (समस्येचे मुख्य शीर्षक):
                  </label>
                  <input
                    type="text"
                    value={settings.problemHeadline || ""}
                    onChange={(e) => handleChange("problemHeadline", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-serif-deva text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Problem Statement (समस्येचा मुख्य संदेश):
                  </label>
                  <input
                    type="text"
                    value={settings.problemStatement || ""}
                    onChange={(e) => handleChange("problemStatement", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>
              </div>

              {/* Book Intro Section */}
              <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-6 sm:p-8 space-y-4">
                <h2 className="text-lg font-bold text-[#071827] border-b border-gray-100 pb-3">
                  Book Introduction Section (पुस्तकाची सविस्तर ओळख)
                </h2>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Book Intro Heading (ओळख शीर्षक):
                  </label>
                  <input
                    type="text"
                    value={settings.bookIntroHeading || ""}
                    onChange={(e) => handleChange("bookIntroHeading", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-serif-deva text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Book Intro Text (पुस्तकाची सविस्तर माहिती / पॅराग्राफ):
                  </label>
                  <textarea
                    rows={5}
                    value={settings.bookIntroText || ""}
                    onChange={(e) => handleChange("bookIntroText", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUTHOR & FINAL CTA */}
          {activeTab === "author" && (
            <div className="space-y-6">
              {/* Author Section */}
              <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-6 sm:p-8 space-y-4">
                <h2 className="text-lg font-bold text-[#071827] border-b border-gray-100 pb-3">
                  Author Section (लेखकाची माहिती)
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      लेखकाचे नाव (Author Name):
                    </label>
                    <input
                      type="text"
                      value={settings.authorName || ""}
                      onChange={(e) => handleChange("authorName", e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      लेखकाचा फोटो (Author Photo):
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border border-gray-300 shrink-0 flex items-center justify-center">
                        {settings.authorImage ? (
                          <img
                            src={settings.authorImage}
                            alt="Author"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[9px] text-gray-400">Photo</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerUpload("authorImage")}
                        disabled={uploadingFor === "authorImage"}
                        className="px-3 py-1.5 rounded-lg bg-[#071827] text-[#E2B24A] text-xs font-semibold"
                      >
                        फोटो अपलोड करा
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    लेखकाचा परिचय (Author Bio):
                  </label>
                  <textarea
                    rows={3}
                    value={settings.authorBio || ""}
                    onChange={(e) => handleChange("authorBio", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    लेखकाचा संदेश (Author Special Message):
                  </label>
                  <textarea
                    rows={3}
                    value={settings.authorMessage || ""}
                    onChange={(e) => handleChange("authorMessage", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>
              </div>

              {/* Final CTA Section */}
              <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-6 sm:p-8 space-y-4">
                <h2 className="text-lg font-bold text-[#071827] border-b border-gray-100 pb-3">
                  Final CTA Section (पृष्ठाच्या शेवटी असणारा CTA विभाग)
                </h2>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Final CTA Heading:
                  </label>
                  <input
                    type="text"
                    value={settings.finalCtaHeading || ""}
                    onChange={(e) => handleChange("finalCtaHeading", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-serif-deva text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Final CTA Button Text:
                  </label>
                  <input
                    type="text"
                    value={settings.finalCtaButtonText || ""}
                    onChange={(e) => handleChange("finalCtaButtonText", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SEO & HEADINGS */}
          {activeTab === "seo" && (
            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-6 sm:p-8 space-y-5">
              <h2 className="text-lg font-bold text-[#071827] border-b border-gray-100 pb-3">
                SEO & Section Headings
              </h2>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  SEO Meta Title:
                </label>
                <input
                  type="text"
                  value={settings.seoTitle || ""}
                  onChange={(e) => handleChange("seoTitle", e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  SEO Meta Description:
                </label>
                <textarea
                  rows={3}
                  value={settings.seoDescription || ""}
                  onChange={(e) => handleChange("seoDescription", e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Benefits Section Heading:
                  </label>
                  <input
                    type="text"
                    value={settings.benefitsHeading || ""}
                    onChange={(e) => handleChange("benefitsHeading", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Preview Pages Section Heading:
                  </label>
                  <input
                    type="text"
                    value={settings.previewHeading || ""}
                    onChange={(e) => handleChange("previewHeading", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Learning Points Section Heading:
                </label>
                <input
                  type="text"
                  value={settings.learningHeading || ""}
                  onChange={(e) => handleChange("learningHeading", e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Social Share OG Image:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={settings.ogImage || ""}
                    onChange={(e) => handleChange("ogImage", e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => triggerUpload("ogImage")}
                    disabled={uploadingFor === "ogImage"}
                    className="px-4 py-2 rounded-xl bg-[#071827] text-[#E2B24A] text-xs font-bold"
                  >
                    अपलोड करा
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Save Bar */}
          <div className="sticky bottom-4 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-gray-200 shadow-xl flex items-center justify-between">
            <div className="text-xs text-gray-500 hidden sm:block">
              बदल सेव्ह करण्यासाठी उजवीकडील बटण दाबा.
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C58A24] to-[#E2B24A] text-[#071827] font-bold text-sm shadow-md hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#071827] border-t-transparent rounded-full animate-spin" />
                  <span>सेव्ह होत आहे...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>सर्व बदल सेव्ह करा (Save All Settings)</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
