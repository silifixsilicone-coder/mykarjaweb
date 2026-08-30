"use client";

import { useEffect, useState } from "react";
import { LearningPoint, Benefit } from "@/lib/types";

export default function AdminLearningPointsPage() {
  const [learningPoints, setLearningPoints] = useState<LearningPoint[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [activeTab, setActiveTab] = useState<"points" | "benefits">("points");

  // Learning Point Modal State
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);
  const [editingPoint, setEditingPoint] = useState<LearningPoint | null>(null);
  const [pointNumber, setPointNumber] = useState("");
  const [pointTitle, setPointTitle] = useState("");
  const [pointDesc, setPointDesc] = useState("");
  const [pointSortOrder, setPointSortOrder] = useState(0);

  // Benefit Modal State
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);
  const [benefitText, setBenefitText] = useState("");
  const [benefitSortOrder, setBenefitSortOrder] = useState(0);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      const [pointsRes, benefitsRes] = await Promise.all([
        fetch("/api/admin/learning-points").then((r) => r.json()),
        fetch("/api/admin/benefits").then((r) => r.json()),
      ]);

      if (Array.isArray(pointsRes)) setLearningPoints(pointsRes);
      if (Array.isArray(benefitsRes)) setBenefits(benefitsRes);
    } catch (err) {
      console.error("Error loading learning points / benefits:", err);
      setMessage({ type: "error", text: "डेटा लोड करताना त्रुटी आली." });
    } finally {
      setLoading(false);
    }
  }

  // --- LEARNING POINTS HANDLERS ---
  function openAddPoint() {
    setEditingPoint(null);
    const nextNum = String(learningPoints.length + 1).padStart(2, "0");
    setPointNumber(nextNum);
    setPointTitle("");
    setPointDesc("");
    setPointSortOrder(learningPoints.length + 1);
    setIsPointModalOpen(true);
  }

  function openEditPoint(point: LearningPoint) {
    setEditingPoint(point);
    setPointNumber(point.number);
    setPointTitle(point.title);
    setPointDesc(point.description);
    setPointSortOrder(point.sortOrder);
    setIsPointModalOpen(true);
  }

  async function handlePointSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pointTitle.trim()) {
      setMessage({ type: "error", text: "कृपया शीर्षक प्रविष्ट करा." });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      if (editingPoint) {
        const res = await fetch("/api/admin/learning-points", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingPoint.id,
            number: pointNumber,
            title: pointTitle,
            description: pointDesc,
            sortOrder: Number(pointSortOrder),
          }),
        });

        if (res.ok) {
          setMessage({ type: "success", text: "मुद्दा यशस्वीरित्या अपडेट झाला!" });
          setIsPointModalOpen(false);
          loadAll();
        } else {
          setMessage({ type: "error", text: "अपडेट करताना त्रुटी आली." });
        }
      } else {
        const res = await fetch("/api/admin/learning-points", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            number: pointNumber,
            title: pointTitle,
            description: pointDesc,
            sortOrder: Number(pointSortOrder),
          }),
        });

        if (res.ok) {
          setMessage({ type: "success", text: "नवीन मुद्दा जोडला गेला!" });
          setIsPointModalOpen(false);
          loadAll();
        } else {
          setMessage({ type: "error", text: "मुद्दा जोडताना त्रुटी आली." });
        }
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "सर्व्हर त्रुटी आली." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDeletePoint(id: string) {
    if (!confirm("हा मुद्दा काढून टाकायचा आहे का?")) return;

    try {
      const res = await fetch(`/api/admin/learning-points?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLearningPoints((prev) => prev.filter((p) => p.id !== id));
        setMessage({ type: "success", text: "मुद्दा यशस्वीरित्या हटवला गेला." });
      } else {
        setMessage({ type: "error", text: "हटवताना त्रुटी आली." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "सर्व्हर त्रुटी आली." });
    }
  }

  // --- BENEFITS HANDLERS ---
  function openAddBenefit() {
    setEditingBenefit(null);
    setBenefitText("");
    setBenefitSortOrder(benefits.length + 1);
    setIsBenefitModalOpen(true);
  }

  function openEditBenefit(b: Benefit) {
    setEditingBenefit(b);
    setBenefitText(b.text);
    setBenefitSortOrder(b.sortOrder);
    setIsBenefitModalOpen(true);
  }

  async function handleBenefitSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!benefitText.trim()) {
      setMessage({ type: "error", text: "कृपया फायदा मजकूर प्रविष्ट करा." });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      if (editingBenefit) {
        const res = await fetch("/api/admin/benefits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingBenefit.id,
            text: benefitText,
            sortOrder: Number(benefitSortOrder),
          }),
        });

        if (res.ok) {
          setMessage({ type: "success", text: "फायदा यशस्वीरित्या अपडेट झाला!" });
          setIsBenefitModalOpen(false);
          loadAll();
        } else {
          setMessage({ type: "error", text: "अपडेट करताना त्रुटी आली." });
        }
      } else {
        const res = await fetch("/api/admin/benefits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: benefitText,
            sortOrder: Number(benefitSortOrder),
          }),
        });

        if (res.ok) {
          setMessage({ type: "success", text: "नवीन फायदा जोडला गेला!" });
          setIsBenefitModalOpen(false);
          loadAll();
        } else {
          setMessage({ type: "error", text: "फायदा जोडताना त्रुटी आली." });
        }
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "सर्व्हर त्रुटी आली." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteBenefit(id: string) {
    if (!confirm("हा फायदा काढून टाकायचा आहे का?")) return;

    try {
      const res = await fetch(`/api/admin/benefits?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBenefits((prev) => prev.filter((b) => b.id !== id));
        setMessage({ type: "success", text: "फायदा यशस्वीरित्या हटवला गेला." });
      } else {
        setMessage({ type: "error", text: "हटवताना त्रुटी आली." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "सर्व्हर त्रुटी आली." });
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C58A24]/10 border border-[#C58A24]/30 text-[#C58A24] text-xs font-bold uppercase tracking-wider mb-2">
            <span>💡 Highlights & Key Takeaways</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#071827] font-serif-deva">
            शिकण्याचे मुद्दे व फायदे (Learning Points & Benefits)
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            &ldquo;या पुस्तकातून तुम्ही काय शिकाल?&rdquo; चे प्रमुख 8 मुद्दे आणि पुस्तकाची ठळक वैशिष्ट्ये व्यवस्थापित करा.
          </p>
        </div>

        <button
          onClick={activeTab === "points" ? openAddPoint : openAddBenefit}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C58A24] to-[#E2B24A] text-[#071827] font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>
            {activeTab === "points" ? "नवीन मुद्दा जोडा (Add Point)" : "नवीन फायदा जोडा (Add Benefit)"}
          </span>
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

      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("points")}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === "points"
              ? "border-[#C58A24] text-[#C58A24]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          1. शिकण्याचे मुद्दे (Learning Points - {learningPoints.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("benefits")}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === "benefits"
              ? "border-[#C58A24] text-[#C58A24]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          2. पुस्तकाचे फायदे (Key Benefits - {benefits.length})
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-[#C58A24] border-t-transparent rounded-full mb-3" />
          <p>माहिती लोड होत आहे...</p>
        </div>
      ) : activeTab === "points" ? (
        /* LEARNING POINTS LIST */
        <div className="space-y-4">
          {learningPoints.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
              <p>कोणतेही मुद्दे उपलब्ध नाहीत.</p>
              <button
                onClick={openAddPoint}
                className="mt-4 px-4 py-2 rounded-xl bg-[#071827] text-[#E2B24A] text-xs font-bold"
              >
                पहिला मुद्दा जोडा
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningPoints.map((point) => (
                <div
                  key={point.id}
                  className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-5 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#071827] to-[#0E2A3F] border border-[#C58A24]/40 text-[#E2B24A] font-bold text-sm flex items-center justify-center font-mono">
                        {point.number}
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono">
                        Order: {point.sortOrder}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#071827] font-serif-deva pt-1">
                      {point.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end gap-2 text-xs font-semibold">
                    <button
                      onClick={() => openEditPoint(point)}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePoint(point.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* BENEFITS LIST */
        <div className="space-y-4">
          {benefits.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
              <p>कोणतेही फायदे उपलब्ध नाहीत.</p>
              <button
                onClick={openAddBenefit}
                className="mt-4 px-4 py-2 rounded-xl bg-[#071827] text-[#E2B24A] text-xs font-bold"
              >
                पहिला फायदा जोडा
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {benefits.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-4 hover:shadow-md transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                      ✓
                    </span>
                    <span className="font-semibold text-sm text-[#071827]">
                      {b.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEditBenefit(b)}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteBenefit(b.id)}
                      className="p-1.5 rounded hover:bg-rose-50 text-rose-600"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Point Modal */}
      {isPointModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-[#071827]">
                {editingPoint ? "मुद्दा संपादित करा (Edit Learning Point)" : "नवीन मुद्दा जोडा (Add Learning Point)"}
              </h3>
              <button
                onClick={() => setIsPointModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePointSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    नंबर (Number e.g. 01):
                  </label>
                  <input
                    type="text"
                    required
                    value={pointNumber}
                    onChange={(e) => setPointNumber(e.target.value)}
                    placeholder="01"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    क्रम (Sort Order):
                  </label>
                  <input
                    type="number"
                    value={pointSortOrder}
                    onChange={(e) => setPointSortOrder(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  शीर्षक (Title):
                </label>
                <input
                  type="text"
                  required
                  value={pointTitle}
                  onChange={(e) => setPointTitle(e.target.value)}
                  placeholder="उदा. कर्ज व्यवस्थापन"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  वर्णन (Description):
                </label>
                <textarea
                  rows={4}
                  value={pointDesc}
                  onChange={(e) => setPointDesc(e.target.value)}
                  placeholder="या मुद्द्यामध्ये वाचकाला काय शिकायला मिळेल..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsPointModalOpen(false)}
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

      {/* Benefit Modal */}
      {isBenefitModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-[#071827]">
                {editingBenefit ? "फायदा संपादित करा" : "नवीन फायदा जोडा"}
              </h3>
              <button
                onClick={() => setIsBenefitModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBenefitSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  फायद्याचा मजकूर (Benefit Text):
                </label>
                <input
                  type="text"
                  required
                  value={benefitText}
                  onChange={(e) => setBenefitText(e.target.value)}
                  placeholder="उदा. सोपी व ओघवती भाषा"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  क्रम (Sort Order):
                </label>
                <input
                  type="number"
                  value={benefitSortOrder}
                  onChange={(e) => setBenefitSortOrder(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsBenefitModalOpen(false)}
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
