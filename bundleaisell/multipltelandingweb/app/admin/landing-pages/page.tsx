"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { LandingPageItem, ViewMode, StatusFilterOption, SortOption } from "@/types/dashboard";
import { mockLandingPages } from "@/lib/mockData";
import { LandingPagesHeader } from "@/components/admin/landing-pages/LandingPagesHeader";
import { LandingPageSearch } from "@/components/admin/landing-pages/LandingPageSearch";
import { LandingPageFilters } from "@/components/admin/landing-pages/LandingPageFilters";
import { ViewSwitcher } from "@/components/admin/landing-pages/ViewSwitcher";
import { LandingPageGrid } from "@/components/admin/landing-pages/LandingPageGrid";
import { LandingPageTable } from "@/components/admin/landing-pages/LandingPageTable";
import { DeleteConfirmationModal } from "@/components/admin/landing-pages/DeleteConfirmationModal";
import { Pagination } from "@/components/admin/landing-pages/Pagination";
import { Toast, ToastProps } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { SearchX, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function LandingPagesManagementPage() {
  const router = useRouter();

  // Local state initialized with mock dataset
  const [items, setItems] = useState<LandingPageItem[]>(mockLandingPages);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All");
  const [sortBy, setSortBy] = useState<SortOption>("updated");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal & Toast states
  const [deletingItem, setDeletingItem] = useState<LandingPageItem | null>(null);
  const [toasts, setToasts] = useState<Omit<ToastProps, "onDismiss">[]>([]);

  // Toast Helper
  const addToast = (message: string, variant: "success" | "info" | "error" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, variant }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Status filter
        if (statusFilter !== "All" && item.status !== statusFilter) {
          return false;
        }

        // Search term filter (Product name, slug, description, or URL)
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase().trim();
          const matchProduct = item.product.toLowerCase().includes(query);
          const matchSlug = item.slug.toLowerCase().includes(query);
          const matchUrl = item.url.toLowerCase().includes(query);
          const matchDesc = item.description.toLowerCase().includes(query);
          return matchProduct || matchSlug || matchUrl || matchDesc;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price_asc":
            return a.priceValue - b.priceValue;
          case "price_desc":
            return b.priceValue - a.priceValue;
          case "newest":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case "oldest":
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case "updated":
          default:
            return 0; // Maintain recent mock order
        }
      });
  }, [items, searchTerm, statusFilter, sortBy]);

  // Actions Handlers
  const handlePreview = (slug: string) => {
    router.push(`/l/${slug}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/landing-pages/${id}/edit`);
  };

  const handleCopyLink = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
    }
    addToast("Link copied");
  };

  const handleDuplicate = (itemToDuplicate: LandingPageItem) => {
    const newId = `lp-${Date.now()}`;
    const newSlug = `${itemToDuplicate.slug}-copy`;
    const newItem: LandingPageItem = {
      ...itemToDuplicate,
      id: newId,
      product: `${itemToDuplicate.product} Copy`,
      slug: newSlug,
      url: `/l/${newSlug}`,
      status: "Draft",
      updatedAt: "Just now",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setItems((prev) => [newItem, ...prev]);
    addToast("Landing page duplicated");
  };

  const handleTogglePublish = (targetItem: LandingPageItem) => {
    const newStatus = targetItem.status === "Published" ? "Draft" : "Published";
    setItems((prev) =>
      prev.map((item) =>
        item.id === targetItem.id
          ? { ...item, status: newStatus, updatedAt: "Just now" }
          : item
      )
    );

    if (newStatus === "Published") {
      addToast("Landing page published");
    } else {
      addToast("Landing page moved to draft");
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingItem) return;
    setItems((prev) => prev.filter((item) => item.id !== deletingItem.id));
    addToast("Landing page deleted", "error");
    setDeletingItem(null);
  };

  const handleResetData = () => {
    setItems(mockLandingPages);
    setSearchTerm("");
    setStatusFilter("All");
    setSortBy("updated");
    addToast("Reset to mock data");
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onDismiss={removeToast} />
        ))}
      </div>

      {/* Page Header */}
      <LandingPagesHeader />

      {/* Controls Row: Search Bar, Status Filters, Sort, View Switcher */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <LandingPageSearch value={searchTerm} onChange={setSearchTerm} />
          </div>
          <ViewSwitcher viewMode={viewMode} onViewChange={setViewMode} />
        </div>

        <div className="pt-3 border-t border-slate-100">
          <LandingPageFilters
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </div>

      {/* Main Content View (Grid vs List vs Empty States) */}
      {items.length === 0 ? (
        /* Entire List Empty State */
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto border border-slate-200/60">
            <Plus className="w-7 h-7 text-slate-600" />
          </div>
          <div className="space-y-1.5 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-slate-900">No landing pages yet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Create your first digital product landing page to start selling.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleResetData}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Mock Data</span>
            </button>
            <Link href="/admin/landing-pages/create">
              <Button className="bg-[#005C52] hover:bg-[#004840] text-xs py-2">
                + Create Landing Page
              </Button>
            </Link>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        /* Search / Filter Empty State */
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto border border-slate-200/60">
            <SearchX className="w-7 h-7 text-slate-400" />
          </div>
          <div className="space-y-1.5 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-slate-900">No landing pages found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Try changing your search terms or filter selection.
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <LandingPageGrid
          items={filteredItems}
          onPreview={handlePreview}
          onEdit={handleEdit}
          onCopyLink={handleCopyLink}
          onDuplicate={handleDuplicate}
          onTogglePublish={handleTogglePublish}
          onDelete={(item) => setDeletingItem(item)}
        />
      ) : (
        <LandingPageTable
          items={filteredItems}
          onPreview={handlePreview}
          onEdit={handleEdit}
          onCopyLink={handleCopyLink}
          onDuplicate={handleDuplicate}
          onTogglePublish={handleTogglePublish}
          onDelete={(item) => setDeletingItem(item)}
        />
      )}

      {/* Pagination UI */}
      {filteredItems.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(deletingItem)}
        pageTitle={deletingItem?.product}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingItem(null)}
      />
    </div>
  );
}
