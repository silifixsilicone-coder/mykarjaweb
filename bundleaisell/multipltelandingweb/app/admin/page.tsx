"use client";

import React, { useState } from "react";
import { SummaryCard } from "@/components/admin/SummaryCard";
import { QuickActionCard } from "@/components/admin/QuickActionCard";
import { RecentLandingPages } from "@/components/admin/RecentLandingPages";
import { EmptyState } from "@/components/admin/EmptyState";
import {
  mockDashboardStats,
  mockQuickActions,
  mockLandingPages,
} from "@/lib/mockData";
import { Sparkles } from "lucide-react";

export default function AdminDashboardPage() {
  const [showEmptyState, setShowEmptyState] = useState(false);

  return (
    <div className="space-y-8">
      {/* Interactive UI Demo Banner */}
      <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Sparkles className="w-4 h-4 text-slate-500" />
          <span>Dashboard UI Mode</span>
        </div>
        <button
          type="button"
          onClick={() => setShowEmptyState(!showEmptyState)}
          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          {showEmptyState ? "Show Mock Data Table" : "Demo Empty State"}
        </button>
      </div>

      {/* Summary Cards Grid */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Performance Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockDashboardStats.map((stat) => (
            <SummaryCard key={stat.id} stat={stat} />
          ))}
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mockQuickActions.map((action) => (
            <QuickActionCard key={action.id} action={action} />
          ))}
        </div>
      </section>

      {/* Recent Landing Pages Table OR Empty State */}
      <section className="space-y-3">
        {showEmptyState ? (
          <EmptyState />
        ) : (
          <RecentLandingPages items={mockLandingPages} />
        )}
      </section>
    </div>
  );
}
