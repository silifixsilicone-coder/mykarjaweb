"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LandingPageData, EditorMode, DeviceMode } from "@/types/visualEditor";
import { EditorToolbar } from "./EditorToolbar";
import { PublicLandingPage } from "./PublicLandingPage";
import { UnsavedChangesModal } from "@/components/admin/create/UnsavedChangesModal";
import { Toast, ToastProps } from "@/components/ui/Toast";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisualLandingEditorProps {
  initialData: LandingPageData;
  onSaveMockData?: (updated: LandingPageData) => void;
}

export const VisualLandingEditor: React.FC<VisualLandingEditorProps> = ({
  initialData,
  onSaveMockData,
}) => {
  const router = useRouter();

  // Undo/Redo History Stack State
  const [history, setHistory] = useState<LandingPageData[]>([initialData]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentData = history[historyIndex] || initialData;

  const [editorMode, setEditorMode] = useState<EditorMode>("edit");
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [toasts, setToasts] = useState<Omit<ToastProps, "onDismiss">[]>([]);

  // Toast Helper
  const addToast = (message: string, variant: "success" | "info" | "error" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, variant }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // State Update with History Pushing for Undo/Redo
  const handleUpdateField = (field: keyof LandingPageData, value: any) => {
    const updated = { ...currentData, [field]: value };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(updated);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setIsDirty(true);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setIsDirty(true);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setIsDirty(true);
    }
  };

  const handleSaveDraft = () => {
    if (!currentData.productName?.trim()) {
      addToast("Product name is required to save draft.", "error");
      return;
    }

    if (onSaveMockData) {
      onSaveMockData({ ...currentData, status: "Draft" });
    }

    setIsDirty(false);
    addToast("Landing page saved as draft.");
    setTimeout(() => {
      router.push("/admin/landing-pages");
    }, 1000);
  };

  const handlePublish = () => {
    if (!currentData.productName?.trim()) {
      addToast("Product name is required.", "error");
      return;
    }
    if (!currentData.price?.toString().trim()) {
      addToast("Price is required to publish.", "error");
      return;
    }

    const published = { ...currentData, status: "Published" as const };
    if (onSaveMockData) {
      onSaveMockData(published);
    }

    setIsDirty(false);
    addToast("Landing page published successfully.");
    setTimeout(() => {
      router.push(`/l/${published.slug || "ai-video-bundle"}`);
    }, 1000);
  };

  const handleBack = () => {
    if (isDirty) {
      setShowUnsavedModal(true);
    } else {
      router.push("/admin/landing-pages");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between">
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onDismiss={removeToast} />
        ))}
      </div>

      {/* Top Fixed Editor Toolbar */}
      <EditorToolbar
        productName={currentData.productName}
        isDirty={isDirty}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        editorMode={editorMode}
        deviceMode={deviceMode}
        onBack={handleBack}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onDeviceChange={setDeviceMode}
        onTogglePreview={() =>
          setEditorMode((prev) => (prev === "edit" ? "preview" : "edit"))
        }
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />

      {/* Preview Mode Notification Banner */}
      {editorMode === "preview" && (
        <div className="bg-emerald-600 text-white text-xs font-bold py-2.5 px-4 flex items-center justify-between shadow-md">
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>Customer Preview Mode — All edit controls hidden</span>
          </span>
          <button
            type="button"
            onClick={() => setEditorMode("edit")}
            className="bg-white text-emerald-950 px-3 py-1 rounded-lg text-xs font-extrabold hover:bg-emerald-50 transition-colors shadow-2xs cursor-pointer"
          >
            Exit Preview
          </button>
        </div>
      )}

      {/* Main Landing Page Canvas Frame */}
      <main className="flex-1 flex justify-center bg-slate-950 p-3 sm:p-6 overflow-y-auto">
        <div
          className={cn(
            "transition-all duration-300 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-[#F8F7E8] origin-top",
            deviceMode === "mobile"
              ? "w-[375px] min-h-[667px] my-4 border-4 border-slate-700"
              : "w-full max-w-5xl my-2"
          )}
        >
          <PublicLandingPage
            data={currentData}
            mode={editorMode === "preview" ? "view" : "edit"}
            onUpdateField={handleUpdateField}
          />
        </div>
      </main>

      {/* Unsaved Changes Confirmation Modal */}
      <UnsavedChangesModal
        isOpen={showUnsavedModal}
        onStay={() => setShowUnsavedModal(false)}
        onLeave={() => {
          setShowUnsavedModal(false);
          router.push("/admin/landing-pages");
        }}
      />
    </div>
  );
};
