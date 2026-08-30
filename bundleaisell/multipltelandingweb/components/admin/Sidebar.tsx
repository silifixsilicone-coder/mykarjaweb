"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import {
  LayoutDashboard,
  Layers,
  PlusCircle,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Landing Pages",
    href: "/admin/landing-pages",
    icon: Layers,
  },
  {
    title: "Create Landing Page",
    href: "/admin/landing-pages/create",
    icon: PlusCircle,
  },
  {
    title: "Payment Pages",
    href: "/admin/payment-pages",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between h-screen sticky top-0 shrink-0">
      {/* Top Section */}
      <div className="p-6 space-y-8">
        {/* Logo */}
        <div className="px-1">
          <Link href="/admin">
            <Logo />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5" aria-label="Main Navigation">
          <div className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Menu
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            // Check if exact match or active sub-route
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-slate-900 text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors shrink-0",
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-slate-700"
                  )}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section - Admin Profile */}
      <div className="p-4 m-3 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
            P
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-slate-900 truncate">
              Admin
            </span>
            <span className="text-[11px] text-slate-400 truncate">
              admin@example.com
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            // UI only logout interaction
            window.location.href = "/admin/login";
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/60 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
