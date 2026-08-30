import { NextResponse } from "next/server";
import { getSiteSettings, getEditions, getLearningPoints, getPreviewPages, getFaqItems } from "@/lib/firestoreDb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [settings, editions, learningPoints, previewPages, faqItems] = await Promise.all([
      getSiteSettings(),
      getEditions(),
      getLearningPoints(),
      getPreviewPages(),
      getFaqItems(),
    ]);

    return NextResponse.json({
      settings,
      editions,
      learningPoints,
      benefits: [],
      previewPages,
      testimonials: [],
      faqItems,
      problemPoints: [],
    });
  } catch (error) {
    console.error("Error fetching content via Firestore:", error);
    return NextResponse.json(
      {
        settings: {
          id: "default",
          heroQuote: "कर्जातून मुक्ती, मनातून शांती आणि सुखाच्या खऱ्या प्रवासाची सुरुवात…",
          heroTitle: "कर्ज संपण्याआधीच जगायला शिका",
          heroSubtitle: "कर्ज • पैसा • बचत • मानसिक शांती • Positive Thinking • Manifestation • सुख",
          heroDescription: "कर्ज फेडताना आयुष्य जगणं थांबवू नका.",
          heroCta: "आता eBook घ्या",
          heroSecondaryCta: "पुस्तकातील पाने पहा",
          heroImage: "/uploads/book-cover.png",
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
          comboPaymentUrl: "",
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
        },
        editions: [
          {
            id: "marathi",
            language: "MARATHI",
            name: "मराठी आवृत्ती",
            description: "Digital eBook — मराठी भाषेत",
            coverImage: "/uploads/book-cover-marathi.png",
            price: "₹199",
            buttonText: "मराठी eBook घ्या",
            paymentUrl: "",
            enabled: true,
            sortOrder: 1,
          },
          {
            id: "hindi",
            language: "HINDI",
            name: "हिंदी आवृत्ती",
            description: "Digital eBook — हिंदी भाषा में",
            coverImage: "/uploads/book-cover-hindi.png",
            price: "₹199",
            buttonText: "हिंदी eBook खरीदें",
            paymentUrl: "",
            enabled: true,
            sortOrder: 2,
          },
          {
            id: "english",
            language: "ENGLISH",
            name: "English Edition",
            description: "Digital eBook — English Language",
            coverImage: "/uploads/book-cover-english.png",
            price: "₹199",
            buttonText: "Get eBook",
            paymentUrl: "",
            enabled: true,
            sortOrder: 3,
          },
        ],
        learningPoints: [],
        benefits: [],
        previewPages: [],
        testimonials: [],
        faqItems: [],
        problemPoints: [],
      },
      { status: 200 }
    );
  }
}
