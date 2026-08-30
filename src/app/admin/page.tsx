import React from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const cards = [
    {
      title: "🔗 Buy Button Payment URLs",
      desc: "Central system to update external payment URLs for Marathi, Hindi, and English editions.",
      href: "/admin/payment-urls",
      badge: "MOST IMPORTANT",
      color: "border-gold bg-gold/5",
    },
    {
      title: "📚 Language Editions & Pricing",
      desc: "Manage Marathi, Hindi, English pricing, covers, and individual payment URLs.",
      href: "/admin/editions",
      badge: "PRICING",
      color: "border-navy/30 bg-cream-dark/50",
    },
    {
      title: "⚙️ Site Headings & Copy",
      desc: "Edit Hero section, problem statements, book intro text, and final CTA copy.",
      href: "/admin/settings",
      badge: "CONTENT",
      color: "border-navy/30 bg-cream-dark/50",
    },
    {
      title: "❓ FAQ Items",
      desc: "Add, edit, or remove frequently asked questions shown on the landing page.",
      href: "/admin/faq",
      badge: "ACCORDION",
      color: "border-navy/30 bg-cream-dark/50",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy text-deva">
          eBook Sales Landing Page — Admin Dashboard
        </h1>
        <p className="text-sm text-main/70 font-medium mt-1">
          Manage your landing page content, prices, images, and external payment URLs easily.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between ${card.color}`}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-navy text-gold uppercase tracking-wider">
                  {card.badge}
                </span>
                <span className="text-gold font-bold text-lg">→</span>
              </div>
              <h2 className="text-lg font-bold text-navy text-deva">
                {card.title}
              </h2>
              <p className="text-xs text-main/70 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Info Notice */}
      <div className="bg-navy text-cream p-6 rounded-2xl border border-gold/30 space-y-2">
        <h3 className="text-gold font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          <span>💡</span> Direct External Redirect:
        </h3>
        <p className="text-xs text-cream/80 leading-relaxed font-normal">
          This landing page redirects buyers to your external payment page when they click any <strong>BUY NOW / eBook घ्या</strong> button. All payment URLs configured in the admin panel will instantly update every buy button across the entire website.
        </p>
      </div>
    </div>
  );
}
