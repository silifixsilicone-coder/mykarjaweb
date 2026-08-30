import React from "react";
import { mockLandingPages } from "@/lib/mockData";
import { VisualLandingEditor } from "@/components/landing/VisualLandingEditor";
import { LandingPageData } from "@/types/visualEditor";

export const metadata = {
  title: "Visual Edit Landing Page | DIGITAL BUNDLE",
};

export default function EditVisualLandingPage({
  params,
}: {
  params: { id: string };
}) {
  const loaded =
    mockLandingPages.find((item) => item.id === params.id) || mockLandingPages[0];

  const loadedData: LandingPageData = {
    id: loaded.id,
    name: loaded.product,
    slug: loaded.slug,
    productName: loaded.product,
    description: loaded.description,
    price: loaded.price.replace(/[^0-9]/g, ""),
    heroImage: loaded.image,
    productImage: loaded.image,
    buyButtonText: "Buy Now",
    paymentLink: `/pay/${loaded.slug}`,
    status: loaded.status,
  };

  return <VisualLandingEditor initialData={loadedData} />;
}
