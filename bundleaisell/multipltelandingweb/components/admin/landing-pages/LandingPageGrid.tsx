import React from "react";
import { LandingPageItem } from "@/types/dashboard";
import { LandingPageCard } from "./LandingPageCard";

interface LandingPageGridProps {
  items: LandingPageItem[];
  onPreview: (slug: string) => void;
  onEdit: (id: string) => void;
  onCopyLink: (url: string) => void;
  onDuplicate: (item: LandingPageItem) => void;
  onTogglePublish: (item: LandingPageItem) => void;
  onDelete: (item: LandingPageItem) => void;
}

export const LandingPageGrid: React.FC<LandingPageGridProps> = ({
  items,
  onPreview,
  onEdit,
  onCopyLink,
  onDuplicate,
  onTogglePublish,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <LandingPageCard
          key={item.id}
          item={item}
          onPreview={onPreview}
          onEdit={onEdit}
          onCopyLink={onCopyLink}
          onDuplicate={onDuplicate}
          onTogglePublish={onTogglePublish}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
