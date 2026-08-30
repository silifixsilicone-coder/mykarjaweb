// Types for all landing page data

export interface SiteSettings {
  id: string;
  navbarCtaText?: string;
  navbarPaymentUrl?: string;
  heroQuote: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroCta: string;
  heroPaymentUrl?: string;
  heroSecondaryCta: string;
  heroImage: string;
  problemHeadline: string;
  problemStatement: string;
  bookIntroHeading: string;
  bookIntroText: string;
  benefitsHeading: string;
  previewHeading: string;
  editionsHeading: string;
  comboEnabled: boolean;
  comboHeading: string;
  comboDescription: string;
  comboPrice: string;
  comboButtonText: string;
  comboPaymentUrl: string;
  comboImage: string;
  authorName: string;
  authorBio: string;
  authorMessage: string;
  authorImage: string;
  finalCtaHeading: string;
  finalCtaButtonText: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  learningHeading: string;
}

export interface Edition {
  id: string;
  language: string;
  name: string;
  description: string;
  coverImage: string;
  price: string;
  buttonText: string;
  paymentUrl: string;
  enabled: boolean;
  sortOrder: number;
}

export interface LearningPoint {
  id: string;
  number: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface Benefit {
  id: string;
  text: string;
  sortOrder: number;
}

export interface PreviewPage {
  id: string;
  image: string;
  caption: string;
  sortOrder: number;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  text: string;
  language: string;
  sortOrder: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface ProblemPoint {
  id: string;
  text: string;
  icon: string;
  sortOrder: number;
}

export interface LandingPageData {
  settings: SiteSettings;
  editions: Edition[];
  learningPoints: LearningPoint[];
  benefits: Benefit[];
  previewPages: PreviewPage[];
  testimonials: Testimonial[];
  faqItems: FaqItem[];
  problemPoints: ProblemPoint[];
}
