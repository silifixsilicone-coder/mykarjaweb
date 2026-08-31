export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function validateUrl(url?: string | null): boolean {
  if (!url || url.trim() === "" || url.startsWith("#")) return true;
  if (url.startsWith("http://") || url.startsWith("https://")) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function formatPrice(price: string): string {
  if (!price) return "₹49";
  return price.startsWith("₹") ? price : `₹${price}`;
}
