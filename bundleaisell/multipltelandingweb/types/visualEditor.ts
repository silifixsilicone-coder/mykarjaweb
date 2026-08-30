export interface LandingPageData {
  id: string;
  name: string;
  slug: string;
  productName: string;
  description: string;
  price: string;
  heroImage: string | null;
  productImage: string | null;
  buyButtonText: string;
  paymentLink: string;
  status: "Draft" | "Published";
}

export type EditorMode = "edit" | "preview";
export type DeviceMode = "desktop" | "mobile";
