"use client";

import { useEffect, useState, useRef } from "react";
import { Testimonial } from "@/lib/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formName, setFormName] = useState("");
  const [formPhoto, setFormPhoto] = useState("");
  const [formText, setFormText] = useState("");
  const [formLanguage, setFormLanguage] = useState("मराठी");
  const [formSortOrder, setFormSortOrder] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data || []);
      }
    } catch (err) {
      console.error("Error loading testimonials:", err);
      setMessage({ type: "error", text: "रिव्ह्यूज लोड करताना त्रुटी आली." });
    } finally {
      setLoading(false);
    }
  }

  function handleOpenAdd() {
    setEditingItem(null);
    setFormName("");
    setFormPhoto("");
    setFormText("");
    setFormLanguage("मराठी");
    setFormSortOrder(testimonials.length + 1);
    setIsModalOpen(true);
  }

  function handleOpenEdit(item: Testimonial) {
    setEditingItem(item);
    setFormName(item.name);
    setFormPhoto(item.photo);
    setFormText(item.text);
    setFormLanguage(item.language);
    setFormSortOrder(item.sortOrder);
    setIsModalOpen(true);
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.url) {
        setFormPhoto(data.url);
      } else {
        alert(data.error || "फोटो अपलोड अयशस्वी.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("फोटो अपलोड करताना त्रुटी आली.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) {
      setMessage({ type: "error", text: "कृपया नाव आणि रिव्ह्यू मजकूर दोन्ही भरा." });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      if (editingItem) {
        // Update
        const res = await fetch("/api/admin/testimonials", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingItem.id,
            name: formName,
            photo: formPhoto,
            text: formText,
            language: formLanguage,
            sortOrder: Number(formSortOrder),
          }),
        });

        if (res.ok) {
          setMessage({ type: "success", text: "रिव्ह्यू यशस्वीरित्या अपडेट झाला!" });
          setIsModalOpen(false);
          loadTestimonials();
        } else {
          setMessage({ type: "error", text: "अपडेट करताना त्रुटी आली." });
        }
      } else {
        // Create
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName,
            photo: formPhoto,
            text: formText,
            language: formLanguage,
            sortOrder: Number(formSortOrder),
          }),
        });

        if (res.ok) {
          setMessage({ type: "success", text: "नवीन रिव्ह्यू जोडला गेला!" });
          setIsModalOpen(false);
          loadTestimonials();
        } else {
          setMessage({ type: "error", text: "नवीन रिव्ह्यू जोडताना त्रुटी आली." });
        }
      }
    } catch (err) {
      console.error("Save testimonial error:", err);
      setMessage({ type: "error", text: "सर्व्हर त्रुटी आली." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("हा रिव्ह्यू कायमचा हटवायचा आहे का?")) return;

    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        setMessage({ type: "success", text: "रिव्ह्यू यशस्वीरित्या हटवला गेला." });
      } else {
        setMessage({ type: "error", text: "रिव्ह्यू हटवताना त्रुटी आली." });
      }
    } catch (err) {
      console.error("Delete error:", err);
      setMessage({ type: "error", text: "सर्व्हर त्रुटी आली." });
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C58A24]/10 border border-[#C58A24]/30 text-[#C58A24] text-xs font-bold uppercase tracking-wider mb-2">
            <span>⭐ Testimonials & Social Proof</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#071827] font-serif-deva">
            वाचकांच्या प्रतिक्रिया व रिव्ह्यूज (Testimonials)
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            वाचकांनी दिलेल्या प्रतिक्रिया, त्यांचे नाव, फोटो आणि भाषा निवडून जोडा.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C58A24] to-[#E2B24A] text-[#071827] font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>नवीन रिव्ह्यू जोडा (Add Testimonial)</span>
        </button>
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

      {/* Grid of Testimonials */}
      {loading ? (
        <div className="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-[#C58A24] border-t-transparent rounded-full mb-3" />
          <p>रिव्ह्यूज लोड होत आहेत...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
          <p className="text-base font-medium">कोणतेही रिव्ह्यूज उपलब्ध नाहीत.</p>
          <button
            onClick={handleOpenAdd}
            className="mt-4 px-4 py-2 rounded-xl bg-[#071827] text-[#E2B24A] text-xs font-bold"
          >
            पहिला रिव्ह्यू जोडा
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 border border-[#C58A24]/30 overflow-hidden flex items-center justify-center font-bold text-[#C58A24] text-xs shrink-0">
                      {item.photo ? (
                        <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        item.name.slice(0, 2).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#071827]">{item.name}</h3>
                      <span className="text-[11px] text-gray-500 font-medium">{item.language}</span>
                    </div>
                  </div>

                  <span className="text-xs text-amber-500">★★★★★</span>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed italic bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-mono text-[11px]">
                  Order: {item.sortOrder}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-[#071827]">
                {editingItem ? "रिव्ह्यू संपादित करा (Edit Testimonial)" : "नवीन रिव्ह्यू जोडा (Add Testimonial)"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  वाचकाचे नाव (Reader Name):
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="उदा. राहुल पाटील"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    भाषा (Language):
                  </label>
                  <select
                    value={formLanguage}
                    onChange={(e) => setFormLanguage(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900"
                  >
                    <option value="मराठी">मराठी</option>
                    <option value="हिंदी">हिंदी</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    क्रम (Sort Order):
                  </label>
                  <input
                    type="number"
                    value={formSortOrder}
                    onChange={(e) => setFormSortOrder(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              {/* Photo */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  फोटो (Reader Photo - Optional):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formPhoto}
                    onChange={(e) => setFormPhoto(e.target.value)}
                    placeholder="/uploads/reader.png"
                    className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-3 py-2 bg-[#071827] text-[#E2B24A] text-xs font-semibold rounded-xl"
                  >
                    {uploading ? "..." : "फोटो निवडा"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  प्रतिक्रिया / रिव्ह्यू मजकूर (Review Text):
                </label>
                <textarea
                  rows={4}
                  required
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="पुस्तकाबद्दलचे मत..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C58A24] to-[#E2B24A] text-[#071827] text-xs font-bold shadow-md hover:opacity-95 disabled:opacity-50"
                >
                  {saving ? "सेव्ह होत आहे..." : "सेव्ह करा"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
