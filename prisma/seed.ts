import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default site settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
    },
  });
  console.log("✅ Site settings created");

  // Delete existing records to keep DB clean
  await prisma.edition.deleteMany({});
  await prisma.learningPoint.deleteMany({});
  await prisma.benefit.deleteMany({});
  await prisma.previewPage.deleteMany({});
  await prisma.problemPoint.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.faqItem.deleteMany({});

  // Create editions with clean empty coverImage (or admin uploaded image path)
  const editions = [
    {
      language: "MARATHI",
      name: "मराठी आवृत्ती",
      description: "Digital eBook — मराठी भाषेत",
      coverImage: "",
      price: "₹199",
      buttonText: "मराठी eBook घ्या",
      paymentUrl: "https://example.com/pay/marathi",
      enabled: true,
      sortOrder: 1,
    },
    {
      language: "HINDI",
      name: "हिंदी आवृत्ती",
      description: "Digital eBook — हिंदी भाषा में",
      coverImage: "",
      price: "₹199",
      buttonText: "हिंदी eBook खरीदें",
      paymentUrl: "https://example.com/pay/hindi",
      enabled: true,
      sortOrder: 2,
    },
    {
      language: "ENGLISH",
      name: "English Edition",
      description: "Digital eBook — English Language",
      coverImage: "",
      price: "₹199",
      buttonText: "Get eBook",
      paymentUrl: "https://example.com/pay/english",
      enabled: true,
      sortOrder: 3,
    },
  ];

  for (const edition of editions) {
    await prisma.edition.create({ data: edition });
  }
  console.log("✅ Editions created");

  // Create learning points
  const learningPoints = [
    {
      number: "01",
      title: "कर्ज व्यवस्थापन",
      description:
        "कर्जाचं नियोजन कसं करायचं, EMI कशा व्यवस्थापित करायच्या आणि कर्जमुक्तीचा मार्ग कसा शोधायचा.",
      sortOrder: 1,
    },
    {
      number: "02",
      title: "पैसा आणि बचत",
      description:
        "पैशांचं योग्य व्यवस्थापन, बचतीच्या सवयी आणि पैसा वाढवण्याचे व्यावहारिक मार्ग.",
      sortOrder: 2,
    },
    {
      number: "03",
      title: "मानसिक शांतता",
      description:
        "कर्जाच्या ताणातून मनाची शांती कशी मिळवायची, चिंतेवर मात कशी करायची.",
      sortOrder: 3,
    },
    {
      number: "04",
      title: "अतिरिक्त उत्पन्नाचा विचार",
      description:
        "अतिरिक्त उत्पन्नाचे स्रोत शोधणं, side income चे मार्ग आणि उत्पन्न वाढवण्याचे उपाय.",
      sortOrder: 4,
    },
    {
      number: "05",
      title: "Positive Thinking",
      description:
        "सकारात्मक विचारांची शक्ती, नकारात्मक विचारांना कसं बदलायचं आणि जीवनात आनंद कसा शोधायचा.",
      sortOrder: 5,
    },
    {
      number: "06",
      title: "Manifestation",
      description:
        "स्वप्नांना सत्यात उतरवण्याची कला, Manifestation तंत्रं आणि ध्येय साध्य करण्याचे मार्ग.",
      sortOrder: 6,
    },
    {
      number: "07",
      title: "आर्थिक शिस्त",
      description:
        "आर्थिक शिस्त लावणं, खर्चावर नियंत्रण ठेवणं आणि भविष्यासाठी तयारी करणं.",
      sortOrder: 7,
    },
    {
      number: "08",
      title: "आनंदी जीवन",
      description:
        "कर्ज असतानाही आनंदी कसं राहायचं, जीवनाचा आनंद कसा घ्यायचा आणि खऱ्या सुखाचा शोध.",
      sortOrder: 8,
    },
  ];

  for (const point of learningPoints) {
    await prisma.learningPoint.create({ data: point });
  }
  console.log("✅ Learning points created");

  // Create benefits
  const benefits = [
    { text: "व्यावहारिक मार्गदर्शन", sortOrder: 1 },
    { text: "सोपी भाषा", sortOrder: 2 },
    { text: "वास्तविक उदाहरणे", sortOrder: 3 },
    { text: "अमलात आणता येणारे विचार", sortOrder: 4 },
    { text: "आर्थिक शिस्त", sortOrder: 5 },
    { text: "मानसिक शांततेकडे वाटचाल", sortOrder: 6 },
  ];

  for (const benefit of benefits) {
    await prisma.benefit.create({ data: benefit });
  }
  console.log("✅ Benefits created");

  // Create EXACTLY 3 Preview Pages
  const previewPages = [
    {
      image: "",
      caption: "पृष्ठ १ — कर्ज व्यवस्थापन",
      sortOrder: 1,
    },
    {
      image: "",
      caption: "पृष्ठ २ — मानसिक शांतता",
      sortOrder: 2,
    },
    {
      image: "",
      caption: "पृष्ठ ३ — बचत आणि Positive Thinking",
      sortOrder: 3,
    },
  ];

  for (const page of previewPages) {
    await prisma.previewPage.create({ data: page });
  }
  console.log("✅ Exactly 3 preview pages created");

  // Create problem points
  const problemPoints = [
    { text: "कर्जाचा ताण", icon: "stress", sortOrder: 1 },
    { text: "EMI ची चिंता", icon: "emi", sortOrder: 2 },
    { text: "पैशांची कमतरता", icon: "money", sortOrder: 3 },
    { text: "बचत न होणे", icon: "savings", sortOrder: 4 },
    { text: "भविष्यासाठी भीती", icon: "fear", sortOrder: 5 },
    { text: "स्वप्नं पुढे ढकलणे", icon: "dreams", sortOrder: 6 },
  ];

  for (const point of problemPoints) {
    await prisma.problemPoint.create({ data: point });
  }
  console.log("✅ Problem points created");

  // Create placeholder testimonials
  const testimonials = [
    {
      name: "राहुल पाटील",
      photo: "",
      text: "या पुस्तकाने माझ्या पैशांबद्दलचा दृष्टिकोनच बदलला. कर्ज असतानाही आनंदी राहता येतं हे शिकायला मिळालं.",
      language: "मराठी",
      sortOrder: 1,
    },
    {
      name: "प्रिया देशमुख",
      photo: "",
      text: "सोपी भाषा, व्यावहारिक सल्ले आणि प्रेरणादायी विचार. प्रत्येकाने वाचायलाच हवं!",
      language: "मराठी",
      sortOrder: 2,
    },
    {
      name: "अमित शर्मा",
      photo: "",
      text: "कर्ज़ से जूझते हुए ज़िंदगी जीना सीखा इस किताब ने। बहुत ही प्रेरणादायक!",
      language: "हिंदी",
      sortOrder: 3,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log("✅ Testimonials created (placeholder)");

  // Create FAQ items
  const faqItems = [
    {
      question: "हे eBook कोणासाठी आहे?",
      answer:
        "हे eBook प्रत्येकासाठी आहे जो कर्जाच्या ओझ्याखाली दबून गेला आहे आणि आयुष्यात पुन्हा आनंद शोधू इच्छितो. यात कर्ज व्यवस्थापन, बचत, मानसिक शांती आणि Positive Thinking यावर मार्गदर्शन आहे.",
      sortOrder: 1,
    },
    {
      question: "eBook कोणत्या भाषांमध्ये आहे?",
      answer:
        "हे eBook तीन भाषांमध्ये उपलब्ध आहे: मराठी, हिंदी आणि English.",
      sortOrder: 2,
    },
    {
      question: "eBook कसे खरेदी करायचे?",
      answer:
        "\"eBook घ्या\" बटण दाबा. तुम्ही आमच्या payment page वर redirect व्हाल. तिथे payment करा आणि eBook तुमच्या email वर मिळेल.",
      sortOrder: 3,
    },
    {
      question: "Payment कुठे होईल?",
      answer:
        "Payment आमच्या secure external payment page वर होईल. तुमची payment information पूर्णपणे सुरक्षित आहे.",
      sortOrder: 4,
    },
    {
      question: "Payment झाल्यानंतर eBook कसे मिळेल?",
      answer:
        "Payment यशस्वी झाल्यानंतर तुम्हाला eBook तुमच्या registered email address वर पाठवण्यात येईल.",
      sortOrder: 5,
    },
    {
      question: "Digital eBook म्हणजे काय?",
      answer:
        "Digital eBook म्हणजे PDF स्वरूपातील पुस्तक जे तुम्ही तुमच्या फोन, टॅबलेट किंवा कॉम्प्युटरवर वाचू शकता. हे physical book नाही — ते तुम्हाला digitally मिळतं.",
      sortOrder: 6,
    },
  ];

  for (const faq of faqItems) {
    await prisma.faqItem.create({ data: faq });
  }
  console.log("✅ FAQ items created");

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
