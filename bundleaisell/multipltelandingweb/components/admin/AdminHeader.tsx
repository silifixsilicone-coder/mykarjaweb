"use client";

import React from "react";
import { Menu, Search, Bell } from "lucide-react";
import { Logo } from "./Logo";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Dashboard",
  subtitle = "Overview of your digital products and landing pages.",
  onOpenMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5">
      <div className="flex items-center justify-between gap-4">
        
        {/* Mobile Header View */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Logo className="scale-90 origin-left" />
        </div>

        {/* Desktop Page Title View */}
        <div className="hidden lg:block space-y-0.5">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500">{subtitle}</p>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Search Box */}
          <div className="relative hidden sm:block w-48 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search landing pages..."
              className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs text-slate-900 placeholder:text-slate-400 pl-9 pr-3 py-2 rounded-xl border border-transparent focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
            />
          </div>

          {/* Search Icon button for tiny mobile */}
          <button
            type="button"
            className="sm:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications Button */}
          <button
            type="button"
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-slate-900 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200" />

          {/* Admin Avatar & Name */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              P
            </div>
            <span className="hidden md:block text-xs font-semibold text-slate-800">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
