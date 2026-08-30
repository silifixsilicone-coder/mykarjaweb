"use client";

import React from "react";
import { LandingPageItem } from "@/types/dashboard";
import { StatusBadge } from "./StatusBadge";
import { ActionMenu } from "./ActionMenu";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface RecentLandingPagesProps {
  items: LandingPageItem[];
}

export const RecentLandingPages: React.FC<RecentLandingPagesProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 sm:px-6 flex items-center justify-between border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">Recent Landing Pages</h2>
          <p className="text-xs text-slate-400">Latest active and draft pages</p>
        </div>
        <Link
          href="/admin/landing-pages"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Responsive Table Container (Horizontal scroll scoped to container, never page) */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-5 sm:px-6">Product</th>
              <th className="py-3 px-4">URL</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Updated</th>
              <th className="py-3 px-5 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                <td className="py-3.5 px-5 sm:px-6 font-semibold text-slate-900 whitespace-nowrap">
                  {item.product}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors">
                    {item.url}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                  {item.price}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                  {item.updatedAt}
                </td>
                <td className="py-3.5 px-5 sm:px-6 text-right whitespace-nowrap">
                  <ActionMenu pageTitle={item.product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
