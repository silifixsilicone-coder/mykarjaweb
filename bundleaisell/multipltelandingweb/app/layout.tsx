import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Login | Digital Bundle",
  description: "Sign in to manage your landing pages and digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50 text-slate-900 antialiased font-sans flex flex-col justify-between overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
