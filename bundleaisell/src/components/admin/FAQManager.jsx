import React, { useState } from 'react';
import { Plus, Edit3, Trash2, GripVertical, Save, HelpCircle } from 'lucide-react';

export default function FAQManager({ faqs, onSaveFaq, onDeleteFaq }) {
  const [editingId, setEditingId] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleStartAdd = () => {
    setEditingId('new');
    setQuestion('');
    setAnswer('');
  };

  const handleStartEdit = (faq) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    onSaveFaq({
      id: editingId === 'new' ? 'faq-' + Date.now() : editingId,
      question,
      answer
    });

    setEditingId(null);
    setQuestion('');
    setAnswer('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brandBorder pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brandBlack tracking-tight">
            FAQ Manager
          </h1>
          <p className="text-secondaryText text-sm mt-1">
            Create, update, and reorder Frequently Asked Questions for customer storefront accordion.
          </p>
        </div>

        <button
          onClick={handleStartAdd}
          className="inline-flex items-center gap-2 bg-deepGreen text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded shadow hover:bg-deepGreen-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          + Add FAQ
        </button>
      </div>

      {/* Form modal/inline editor */}
      {editingId && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border-2 border-deepGreen shadow-lg space-y-4">
          <h2 className="font-serif font-bold text-lg text-brandBlack flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-deepGreen" />
            {editingId === 'new' ? 'Add New FAQ Item' : 'Edit FAQ Item'}
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-cream border border-brandBorder rounded px-4 py-2.5 text-sm font-serif font-bold text-brandBlack focus:outline-none focus:border-deepGreen"
              placeholder="e.g. What do I receive after purchase?"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-brandBlack uppercase tracking-wider block">Answer</label>
            <textarea
              rows="3"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full bg-cream border border-brandBorder rounded p-3 text-sm text-brandBlack focus:outline-none focus:border-deepGreen"
              placeholder="Provide a clear, reassuring answer..."
              required
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="px-4 py-2 rounded bg-cream border border-brandBorder text-xs font-bold text-brandBlack uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-deepGreen text-white text-xs font-bold uppercase tracking-wider px-6 py-2 rounded shadow hover:bg-deepGreen-hover"
            >
              <Save className="w-4 h-4" /> Save FAQ
            </button>
          </div>
        </form>
      )}

      {/* FAQ Items List */}
      <div className="bg-white rounded-xl border border-brandBorder shadow-sm p-6 space-y-4">
        <h3 className="font-serif font-bold text-lg text-brandBlack">
          Current FAQ Accordion Items ({faqs.length})
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={faq.id}
              className="p-5 bg-cream/50 rounded-lg border border-brandBorder flex items-start justify-between gap-4 hover:border-deepGreen/50 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <GripVertical className="w-5 h-5 text-secondaryText cursor-grab mt-1" />
                <div className="w-7 h-7 rounded bg-deepGreen text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-brandBlack text-base">{faq.question}</h4>
                  <p className="text-secondaryText text-xs leading-relaxed">{faq.answer}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleStartEdit(faq)}
                  className="p-2 text-secondaryText hover:text-deepGreen rounded hover:bg-white transition-colors"
                  title="Edit FAQ"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteFaq(faq.id)}
                  className="p-2 text-secondaryText hover:text-red-600 rounded hover:bg-white transition-colors"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
