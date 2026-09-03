import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  writeBatch,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { SiteSettings, Edition, LearningPoint, Benefit, PreviewPage, Testimonial, FaqItem, ProblemPoint } from "./types";

export const DEFAULT_PAYMENT_CHECKOUT_URL =
  "https://superprofile.bio/vp/कर्जमुक्त-आणि-आनंदी-आयुष्याकडे-पहिले-पाऊल-";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: "default",
  navbarCtaText: "eBook घ्या",
  navbarPaymentUrl: DEFAULT_PAYMENT_CHECKOUT_URL,
  heroQuote: "कर्जातून मुक्ती, मनातून शांती आणि सुखाच्या खऱ्या प्रवासाची सुरुवात…",
  heroTitle: "कर्ज संपण्याआधीच जगायला शिका",
  heroSubtitle: "कर्ज • पैसा • बचत • मानसिक शांती • Positive Thinking • Manifestation • सुख",
  heroDescription: "कर्ज फेडताना आयुष्य जगणं थांबवू नका.",
  heroCta: "आता eBook घ्या",
  heroPaymentUrl: DEFAULT_PAYMENT_CHECKOUT_URL,
  heroSecondaryCta: "पुस्तकातील पाने पहा",
  heroImage: "/uploads/book-cover.jpg",
  problemHeadline: "कर्ज फेडताना आपण आयुष्य जगणं विसरलो आहोत का?",
  problemStatement: "कर्ज फेडा… पण आयुष्य जगणं थांबवू नका.",
  bookIntroHeading: "हे पुस्तक फक्त कर्जाबद्दल नाही.",
  bookIntroText: "या पुस्तकात कर्ज, पैसा, बचत, मानसिक शांतता, Positive Thinking, Manifestation आणि सुख या सगळ्या विषयांवर सखोल मार्गदर्शन आहे.",
  benefitsHeading: "हे eBook तुमच्यासाठी का?",
  previewHeading: "पुस्तकातील काही पाने पहा",
  editionsHeading: "तुमची eBook आवृत्ती निवडा",
  comboEnabled: false,
  comboHeading: "तीन्ही भाषा — एकच उद्देश",
  comboDescription: "मराठी, हिंदी आणि English — तीन्ही eBooks एकत्र मिळवा विशेष सवलतीत!",
  comboPrice: "₹399",
  comboButtonText: "Combo eBook घ्या",
  comboPaymentUrl: DEFAULT_PAYMENT_CHECKOUT_URL,
  comboImage: "/uploads/book-cover.jpg",
  authorName: "लेखक",
  authorBio: "लेखकाबद्दल माहिती इथे जोडा.",
  authorMessage: "लेखकाचा संदेश इथे जोडा.",
  authorImage: "/uploads/author.png",
  finalCtaHeading: "कर्ज संपण्याची वाट पाहू नका… आयुष्य आजपासून जगायला सुरुवात करा.",
  finalCtaButtonText: "आता eBook घ्या",
  seoTitle: "कर्ज संपण्याआधीच जगायला शिका",
  seoDescription: "Digital eBook",
  ogImage: "/uploads/og-image.png",
  learningHeading: "या eBook मधून तुम्ही काय शिकाल?",
};

export const DEFAULT_EDITIONS: Edition[] = [
  {
    id: "marathi",
    language: "MARATHI",
    name: "मराठी आवृत्ती",
    description: "Digital eBook — मराठी भाषेत",
    coverImage: "/uploads/book-cover-marathi.jpg",
    price: "₹20",
    buttonText: "मराठी eBook घ्या",
    paymentUrl: DEFAULT_PAYMENT_CHECKOUT_URL,
    enabled: true,
    sortOrder: 1,
  },
  {
    id: "hindi",
    language: "HINDI",
    name: "हिंदी आवृत्ती",
    description: "Digital eBook — हिंदी भाषा में",
    coverImage: "/uploads/book-cover-hindi.jpg",
    price: "₹20",
    buttonText: "हिंदी eBook खरीदें",
    paymentUrl: DEFAULT_PAYMENT_CHECKOUT_URL,
    enabled: true,
    sortOrder: 2,
  },
  {
    id: "english",
    language: "ENGLISH",
    name: "English Edition",
    description: "Digital eBook — English Language",
    coverImage: "/uploads/book-cover-english.jpg",
    price: "₹20",
    buttonText: "Get eBook",
    paymentUrl: DEFAULT_PAYMENT_CHECKOUT_URL,
    enabled: true,
    sortOrder: 3,
  },
];

export const DEFAULT_PREVIEW_PAGES: PreviewPage[] = [
  { id: "preview-1", image: "/uploads/preview-1.png", caption: "पुस्तकातील पान १", sortOrder: 1 },
  { id: "preview-2", image: "/uploads/preview-2.png", caption: "पुस्तकातील पान २", sortOrder: 2 },
  { id: "preview-3", image: "/uploads/preview-3.png", caption: "पुस्तकातील पान ३", sortOrder: 3 },
];

export const DEFAULT_FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "हे पुस्तक मला कसे मिळेल?",
    answer: "ऑनलाइन पेमेंट पूर्ण होताच तुम्हाला त्वरित PDF स्वरूपात eBook डाउनलोड करण्याची लिंक मिळेल.",
    sortOrder: 1,
  },
  {
    id: "faq-2",
    question: "मी मोबाईलवर वाचू शकतो का?",
    answer: "होय! तुम्ही मोबाईल, टॅब्लेट किंवा लॅपटॉपवर सहजरीत्या हे eBook वाचू शकता.",
    sortOrder: 2,
  },
];

export const DEFAULT_LEARNING_POINTS: LearningPoint[] = [
  { id: "1", number: "01", title: "कर्ज व्यवस्थापन", description: "कर्जाचा भार कमी करण्यासाठी व्यावहारिक पायऱ्या.", sortOrder: 1 },
  { id: "2", number: "02", title: "पैसा आणि बचत", description: "बचत वाढवण्याचे प्रभावी तंत्र.", sortOrder: 2 },
  { id: "3", number: "03", title: "मानसिक शांतता", description: "चिंता आणि ताणतणावातून मुक्ती मिळवण्याचे विचार.", sortOrder: 3 },
  { id: "4", number: "04", title: "अतिरिक्त उत्पन्न", description: "नवीन उत्पन्नाचे मार्ग शोधण्याचा दृष्टीकोन.", sortOrder: 4 },
  { id: "5", number: "05", title: "Positive Thinking", description: "सकारात्मक विचारांची ताकद अनुभवा.", sortOrder: 5 },
  { id: "6", number: "06", title: "Manifestation", description: "तुमची स्वप्नं सत्यात उतरवण्याचे नियम.", sortOrder: 6 },
  { id: "7", number: "07", title: "आर्थिक शिस्त", description: "दीर्घकालीन समृद्धीसाठी सवयी.", sortOrder: 7 },
  { id: "8", number: "08", title: "आनंदी जीवन", description: "कर्ज असतानाही आजचा दिवस आनंदाने जगणे.", sortOrder: 8 },
];

export const DEFAULT_BENEFITS: Benefit[] = [
  { id: "1", text: "व्यावहारिक मार्गदर्शन", sortOrder: 1 },
  { id: "2", text: "सोपी भाषा", sortOrder: 2 },
  { id: "3", text: "वास्तविक उदाहरणे", sortOrder: 3 },
  { id: "4", text: "अमलात आणता येणारे विचार", sortOrder: 4 },
  { id: "5", text: "आर्थिक शिस्त", sortOrder: 5 },
  { id: "6", text: "मानसिक शांततेकडे वाटचाल", sortOrder: 6 },
];

export const DEFAULT_PROBLEM_POINTS: ProblemPoint[] = [
  { id: "1", text: "कर्जाचा ताण", icon: "alert-circle", sortOrder: 1 },
  { id: "2", text: "EMI ची चिंता", icon: "credit-card", sortOrder: 2 },
  { id: "3", text: "पैशांची कमतरता", icon: "trending-down", sortOrder: 3 },
  { id: "4", text: "बचत न होणे", icon: "piggy-bank", sortOrder: 4 },
  { id: "5", text: "भविष्याची भीती", icon: "help-circle", sortOrder: 5 },
  { id: "6", text: "स्वप्नं पुढे ढकलणे", icon: "clock", sortOrder: 6 },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "रुपेश पाटील",
    photo: "/uploads/author.png",
    text: "या पुस्तकाने माझा दृष्टिकोन बदलला. कर्ज फेडताना आयुष्य जगणे थांबवायचे नाही हे समजले.",
    language: "मराठी",
    sortOrder: 1,
  },
  {
    id: "2",
    name: "अमित शर्मा",
    photo: "/uploads/author.png",
    text: "बहुत ही प्रेरणादायी किताब! हर इंसान को पढ़नी चाहिए।",
    language: "हिंदी",
    sortOrder: 2,
  },
];

// Helper to fetch Site Settings from Firestore safely using Web SDK
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, "settings", "default");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Partial<SiteSettings>;
      return {
        ...DEFAULT_SITE_SETTINGS,
        ...data,
        navbarPaymentUrl: data.navbarPaymentUrl || DEFAULT_PAYMENT_CHECKOUT_URL,
        heroPaymentUrl: data.heroPaymentUrl || DEFAULT_PAYMENT_CHECKOUT_URL,
        comboPaymentUrl: data.comboPaymentUrl || DEFAULT_PAYMENT_CHECKOUT_URL,
      } as SiteSettings;
    }
  } catch (err) {
    console.warn("Firestore getSiteSettings fallback executed:", err);
  }
  return DEFAULT_SITE_SETTINGS;
}

// Helper to update Site Settings in Firestore safely using Web SDK
export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  try {
    const docRef = doc(db, "settings", "default");
    await setDoc(docRef, data, { merge: true });
    return getSiteSettings();
  } catch (err) {
    console.error("Firestore updateSiteSettings error:", err);
    return { ...DEFAULT_SITE_SETTINGS, ...data };
  }
}

// Helper to fetch Editions from Firestore safely using Web SDK
export async function getEditions(): Promise<Edition[]> {
  try {
    const colRef = collection(db, "editions");
    const q = query(colRef, orderBy("sortOrder", "asc"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => {
        const item = docSnap.data() as Edition;
        return {
          ...item,
          id: docSnap.id,
          paymentUrl: item.paymentUrl || DEFAULT_PAYMENT_CHECKOUT_URL,
        };
      });
    }
  } catch (err) {
    console.warn("Firestore getEditions fallback executed:", err);
  }
  return DEFAULT_EDITIONS;
}

// Helper to save/update an Edition in Firestore safely using Web SDK
export async function saveEdition(edition: Partial<Edition> & { id: string }): Promise<void> {
  try {
    const { id, ...data } = edition;
    const docRef = doc(db, "editions", id);
    await setDoc(docRef, data, { merge: true });
  } catch (err) {
    console.error("Firestore saveEdition error:", err);
  }
}

// Helper to fetch Preview Pages from Firestore safely using Web SDK
export async function getPreviewPages(): Promise<PreviewPage[]> {
  try {
    const colRef = collection(db, "previewPages");
    const q = query(colRef, orderBy("sortOrder", "asc"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => ({ id: docSnap.id, ...docSnap.data() } as PreviewPage));
    }
  } catch (err) {
    console.warn("Firestore getPreviewPages fallback executed:", err);
  }
  return DEFAULT_PREVIEW_PAGES;
}

// Helper to save strictly 3 Preview Pages in Firestore safely using Web SDK
export async function savePreviewPages(pages: PreviewPage[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    pages.slice(0, 3).forEach((page, idx) => {
      const docId = `preview-${idx + 1}`;
      const docRef = doc(db, "previewPages", docId);
      batch.set(docRef, { ...page, id: docId, sortOrder: idx + 1 }, { merge: true });
    });
    await batch.commit();
  } catch (err) {
    console.error("Firestore savePreviewPages error:", err);
  }
}

// Helper to fetch FAQs from Firestore safely using Web SDK
export async function getFaqItems(): Promise<FaqItem[]> {
  try {
    const colRef = collection(db, "faqItems");
    const q = query(colRef, orderBy("sortOrder", "asc"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => ({ id: docSnap.id, ...docSnap.data() } as FaqItem));
    }
  } catch (err) {
    console.warn("Firestore getFaqItems fallback executed:", err);
  }
  return DEFAULT_FAQ_ITEMS;
}

// Helper to save/update FAQ item safely using Web SDK
export async function saveFaqItem(faq: Partial<FaqItem>): Promise<FaqItem> {
  const docId = faq.id || "faq-" + Date.now();
  const data = { ...faq, id: docId, sortOrder: faq.sortOrder || 1 };

  try {
    const docRef = doc(db, "faqItems", docId);
    await setDoc(docRef, data, { merge: true });
  } catch (err) {
    console.error("Firestore saveFaqItem error:", err);
  }
  return data as FaqItem;
}

// Helper to delete FAQ item safely using Web SDK
export async function deleteFaqItem(id: string): Promise<void> {
  try {
    const docRef = doc(db, "faqItems", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error("Firestore deleteFaqItem error:", err);
  }
}

// Helper to fetch Learning Points from Firestore safely using Web SDK
export async function getLearningPoints(): Promise<LearningPoint[]> {
  try {
    const colRef = collection(db, "learningPoints");
    const q = query(colRef, orderBy("sortOrder", "asc"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => ({ id: docSnap.id, ...docSnap.data() } as LearningPoint));
    }
  } catch (err) {
    console.warn("Firestore getLearningPoints fallback executed:", err);
  }
  return DEFAULT_LEARNING_POINTS;
}

// Helper to fetch Benefits from Firestore safely using Web SDK
export async function getBenefits(): Promise<Benefit[]> {
  try {
    const colRef = collection(db, "benefits");
    const q = query(colRef, orderBy("sortOrder", "asc"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => ({ id: docSnap.id, ...docSnap.data() } as Benefit));
    }
  } catch (err) {
    console.warn("Firestore getBenefits fallback executed:", err);
  }
  return DEFAULT_BENEFITS;
}

// Helper to fetch Problem Points from Firestore safely using Web SDK
export async function getProblemPoints(): Promise<ProblemPoint[]> {
  try {
    const colRef = collection(db, "problemPoints");
    const q = query(colRef, orderBy("sortOrder", "asc"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => ({ id: docSnap.id, ...docSnap.data() } as ProblemPoint));
    }
  } catch (err) {
    console.warn("Firestore getProblemPoints fallback executed:", err);
  }
  return DEFAULT_PROBLEM_POINTS;
}

// Helper to fetch Testimonials from Firestore safely using Web SDK
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const colRef = collection(db, "testimonials");
    const q = query(colRef, orderBy("sortOrder", "asc"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => ({ id: docSnap.id, ...docSnap.data() } as Testimonial));
    }
  } catch (err) {
    console.warn("Firestore getTestimonials fallback executed:", err);
  }
  return DEFAULT_TESTIMONIALS;
}
