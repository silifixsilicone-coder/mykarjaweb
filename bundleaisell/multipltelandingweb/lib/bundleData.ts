export interface BundleItem {
  id: string;
  badgeTitle: string;
  badgeSub: string;
  title: string;
  description: string;
  tags: string[];
  originalPrice: number;
  includedPrice: number;
  iconType: "ebook" | "guide" | "prompts" | "ad" | "reels" | "bonus" | "template";
}

export const bundleItemsData: BundleItem[] = [
  {
    id: "item-1",
    badgeTitle: "AI VIDEO",
    badgeSub: "MAKING EBOOK",
    title: "AI Video Making eBook",
    description: "Step-by-step guide to create stunning videos using AI tools.",
    tags: ["PDF eBook", "Beginner Friendly", "Instant Download"],
    originalPrice: 499,
    includedPrice: 0,
    iconType: "ebook",
  },
  {
    id: "item-2",
    badgeTitle: "AI TOOLS",
    badgeSub: "MASTERY GUIDE",
    title: "AI Tools Mastery Guide",
    description: "Complete guide to the best AI tools for video creation.",
    tags: ["PDF eBook", "Tools List", "Use Case"],
    originalPrice: 499,
    includedPrice: 0,
    iconType: "guide",
  },
  {
    id: "item-3",
    badgeTitle: "100+ AI",
    badgeSub: "VIDEO PROMPTS",
    title: "100+ AI Video Prompts",
    description: "Ready to use prompts for all types of AI videos.",
    tags: ["100+ Prompts", "Copy & Use", "Save Time"],
    originalPrice: 499,
    includedPrice: 0,
    iconType: "prompts",
  },
  {
    id: "item-4",
    badgeTitle: "VIDEO AD",
    badgeSub: "PROMPTS PACK",
    title: "Video Ad Prompts Pack",
    description: "High converting ad video prompts for any niche.",
    tags: ["Ad Prompts", "High Converting", "Proven Results"],
    originalPrice: 399,
    includedPrice: 0,
    iconType: "ad",
  },
  {
    id: "item-5",
    badgeTitle: "REELS/SHORTS",
    badgeSub: "PROMPT PACK",
    title: "Reels/Shorts Prompt Pack",
    description: "Create viral shorts & reels in minutes with AI.",
    tags: ["Shorts Ideas", "Engaging Hooks", "Viral Content"],
    originalPrice: 399,
    includedPrice: 0,
    iconType: "reels",
  },
  {
    id: "item-6",
    badgeTitle: "BONUS",
    badgeSub: "EBOOKS / PDFS",
    title: "Bonus eBooks & PDFs",
    description: "Extra resources to boost your skills and productivity.",
    tags: ["Extra Files", "Premium Content", "Lifetime Access"],
    originalPrice: 499,
    includedPrice: 0,
    iconType: "bonus",
  },
  {
    id: "item-7",
    badgeTitle: "BONUS",
    badgeSub: "TEMPLATES",
    title: "Bonus Templates",
    description: "Ready-made templates for faster and professional video creation.",
    tags: ["Editable", "Easy To Use", "Time Saver"],
    originalPrice: 399,
    includedPrice: 0,
    iconType: "template",
  },
];
