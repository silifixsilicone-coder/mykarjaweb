"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-navy text-cream flex items-center justify-center p-4">{children}</div>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Buy Button URLs", href: "/admin/payment-urls", icon: "🔗", highlight: true },
    { name: "Editions & Prices", href: "/admin/editions", icon: "📚" },
    { name: "Landing Settings", href: "/admin/settings", icon: "⚙️" },
    { name: "FAQ Items", href: "/admin/faq", icon: "❓" },
  ];

  return (
    <div className="min-h-screen bg-cream text-main flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-navy text-cream p-6 flex flex-col justify-between shrink-0 border-r border-gold/20">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-11 bg-navy-light rounded border border-gold/40 flex items-center justify-center text-gold font-bold text-xs">
              eBook
            </div>
            <div>
              <h2 className="text-deva font-extrabold text-sm text-cream leading-tight">
                Admin Panel
              </h2>
              <span className="text-[10px] text-gold tracking-widest uppercase">
                Sales Landing CMS
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gold text-navy shadow-md font-bold"
                      : item.highlight
                      ? "bg-gold/15 text-gold border border-gold/30 hover:bg-gold/25"
                      : "text-cream/80 hover:bg-navy-light hover:text-cream"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-cream/10 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-gold/80 hover:text-gold transition-colors"
          >
            <span>🌐 Live Landing Page ↗</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 bg-navy-light hover:bg-red-950/40 text-cream/70 hover:text-red-300 rounded-lg text-xs font-semibold border border-cream/10 transition-colors flex items-center justify-center gap-2"
          >
            <span>🚪 Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
