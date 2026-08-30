export type LandingPageStatus = "Published" | "Draft";

export interface LandingPageItem {
  id: string;
  product: string;
  slug: string;
  url: string;
  price: string;
  priceValue: number;
  description: string;
  image: string;
  status: LandingPageStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SummaryStat {
  id: string;
  title: string;
  number: string | number;
  info: string;
  trend?: "up" | "down" | "neutral";
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export type ViewMode = "grid" | "list";
export type StatusFilterOption = "All" | "Published" | "Draft";
export type SortOption =
  | "updated"
  | "newest"
  | "oldest"
  | "price_asc"
  | "price_desc";
