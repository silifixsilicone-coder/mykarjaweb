import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "कर्ज संपण्याआधीच जगायला शिका | Digital eBook",
  description:
    "कर्ज • पैसा • बचत • मानसिक शांती • Positive Thinking • Manifestation • सुख — कर्ज फेडताना आयुष्य जगणं थांबवू नका. Digital eBook मराठी, हिंदी आणि English मध्ये उपलब्ध.",
  keywords: [
    "कर्ज संपण्याआधीच जगायला शिका",
    "Debt Management eBook",
    "Financial Freedom Marathi",
    "Positive Thinking Marathi Book",
    "Digital eBook",
    "Learn to live before debt is gone",
  ],
  openGraph: {
    title: "कर्ज संपण्याआधीच जगायला शिका — Digital eBook",
    description: "कर्ज फेडताना आयुष्य जगणं थांबवू नका. Practical guidance for financial & mental peace.",
    type: "website",
    locale: "mr_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className="h-full scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-main selection:bg-gold selection:text-navy">
        {children}
      </body>
    </html>
  );
}
