"use client";

import { useEffect, useState } from "react";
import { FaqItem } from "@/lib/types";

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state for creating / editing
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formQuestion, setFormQuestion] = useState("");
  const [formAnswer, setFormAnswer] = useState("");
  const [formSortOrder, setFormSortOrder] = useState(0);

  useEffect(() => {
    loadFaqs();
  }, []);

  async function loadFaqs() {
    try {
      const res = await fetch("/api/admin/faq");
      if (res.ok) {
        const data = await res.json();
        setFaqs(data || []);
      }
    } catch (err) {
      console.error("Error loading FAQs:", err);
      setMessage({ type: "error", text: "FAQs लोड करताना त्रुटी आली." });
    } finally {
      setLoading(false);
    }
  }

  function handleOpenAdd() {
    setEditingFaq(null);
    setFormQuestion("");
    setFormAnswer("");
    setFormSortOrder(faqs.length + 1);
    setIsModalOpen(true);
  }

  function handleOpenEdit(faq: FaqItem) {
    setEditingFaq(faq);
    setFormQuestion(faq.question);
    setFormAnswer(faq.answer);
    setFormSortOrder(faq.sortOrder);
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formQuestion.trim() || !formAnswer.trim()) {
      setMessage({ type: "error", text: "कृपया प्रश्न आणि उत्तर दोन्ही भरा." });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      if (editingFaq) {
        // Update
        const res = await fetch("/api/admin/faq", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingFaq.id,
            question: formQuestion,
            answer: formAnswer,
            sortOrder: Number(formSortOrder),
          }),
        });

        if (res.ok) {
          setMessage({ type: "success", text: "प्रश्न यशस्वीरित्या अपडेट झाला!" });
          setIsModalOpen(false);
          loadFaqs();
        } else {
          setMessage({ type: "error", text: "अपडेट करताना त्रुटी आली." });
        }
      } else {
        // Create
        const res = await fetch("/api/admin/faq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: formQuestion,
            answer: formAnswer,
            sortOrder: Number(formSortOrder),
          }),
        });

        if (res.ok) {
          setMessage({ type: "success", text: "नवीन प्रश्न यशस्वीरित्या जोडला गेला!" });
          setIsModalOpen(false);
          loadFaqs();
        } else {
          setMessage({ type: "error", text: "नवीन प्रश्न जोडताना त्रुटी आली." });
        }
      }
    } catch (err) {
      console.error("Save FAQ error:", err);
      setMessage({ type: "error", text: "सर्व्हर त्रुटी आली." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("तुम्हाला खात्री आहे का हा प्रश्न काढून टाकायचा आहे?")) return;

    try {
      const res = await fetch(`/api/admin/faq?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
        setMessage({ type: "success", text: "प्रश्न यशस्वीरित्या हटवला गेला." });
      } else {
        setMessage({ type: "error", text: "प्रश्न हटवताना त्रुटी आली." });
      }
    } catch (err) {
      console.error("Delete error:", err);
      setMessage({ type: "error", text: "सर्व्हर त्रुटी आली." });
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C58A24]/10 border border-[#C58A24]/30 text-[#C58A24] text-xs font-bold uppercase tracking-wider mb-2">
            <span>❓ Frequently Asked Questions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#071827] font-serif-deva">
            वारंवार विचारले जाणारे प्रश्न (FAQ Items)
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            ग्राहकांच्या शंकांचे निरसन करण्यासाठी प्रश्न व उत्तरे जोडा, संपादित करा किंवा काढून टाका.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C58A24] to-[#E2B24A] text-[#071827] font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>नवीन प्रश्न जोडा (Add FAQ)</span>
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

      {/* FAQ List */}
      {loading ? (
        <div className="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-[#C58A24] border-t-transparent rounded-full mb-3" />
          <p>प्रश्न लोड होत आहेत...</p>
        </div>
      ) : faqs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
          <p className="text-base font-medium">कोणतेही प्रश्न उपलब्ध नाहीत.</p>
          <button
            onClick={handleOpenAdd}
            className="mt-4 px-4 py-2 rounded-xl bg-[#071827] text-[#E2B24A] text-xs font-bold"
          >
            पहिला प्रश्न जोडा
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 flex-1">
                <span className="w-8 h-8 rounded-lg bg-[#071827] text-[#E2B24A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  Q{index + 1}
                </span>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-bold text-base text-[#071827] font-serif-deva">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                  <div className="text-[11px] text-gray-400 font-mono pt-1">
                    Sort Order: {faq.sortOrder}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                <button
                  onClick={() => handleOpenEdit(faq)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#C58A24]/20 hover:text-[#071827] text-gray-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-[#071827]">
                {editingFaq ? "प्रश्न संपादित करा (Edit FAQ)" : "नवीन प्रश्न जोडा (Add New FAQ)"}
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
                  प्रश्न (Question):
                </label>
                <input
                  type="text"
                  required
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="उदा. हे eBook कोणासाठी आहे?"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  उत्तर (Answer):
                </label>
                <textarea
                  rows={4}
                  required
                  value={formAnswer}
                  onChange={(e) => setFormAnswer(e.target.value)}
                  placeholder="सविस्तर उत्तर इथे लिहा..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C58A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  क्रमांक / क्रम (Sort Order):
                </label>
                <input
                  type="number"
                  value={formSortOrder}
                  onChange={(e) => setFormSortOrder(Number(e.target.value))}
                  className="w-24 px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold"
                >
                  रद्द करा (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C58A24] to-[#E2B24A] text-[#071827] text-xs font-bold shadow-md hover:opacity-95 disabled:opacity-50"
                >
                  {saving ? "सेव्ह होत आहे..." : "सेव्ह करा (Save)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
