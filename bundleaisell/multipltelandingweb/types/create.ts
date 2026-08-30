export interface CreateLandingPageFormState {
  name: string;
  productName: string;
  slug: string;
  isSlugCustomized: boolean;
  heroImage: string | null;
  productImage: string | null;
  description: string;
  price: string;
  buyButtonText: string;
  paymentLink: string;
  status: "Draft" | "Published";
}

export type ValidationErrors = Partial<Record<keyof CreateLandingPageFormState, string>>;

export type DeviceMode = "desktop" | "mobile";
