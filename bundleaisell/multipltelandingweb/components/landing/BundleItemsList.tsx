import React from "react";
import { bundleItemsData } from "@/lib/bundleData";
import { BundleItemCard } from "./BundleItemCard";

export const BundleItemsList: React.FC = () => {
  return (
    <section className="py-4 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-4">
        {bundleItemsData.map((item) => (
          <BundleItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
