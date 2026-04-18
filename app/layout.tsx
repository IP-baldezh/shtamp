import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ШТАМП - Производство штампов и пресс-форм",
  description:
    "Проектирование и изготовление штампов холодной штамповки, пресс-форм для литья. Ремонт и модернизация оснастки. Более 18 лет опыта в металлообработке.",
  keywords: [
    "штампы",
    "пресс-формы",
    "холодная штамповка",
    "проектирование штампов",
    "ремонт штампов",
    "производство оснастки",
    "металлообработка",
  ],
  authors: [{ name: "ШТАМП" }],
  openGraph: {
    title: "ШТАМП - Производство штампов и пресс-форм",
    description: "Проектирование и изготовление штампов холодной штамповки, пресс-формы для литья",
    type: "website",
    locale: "ru_RU",
    siteName: "ШТАМП",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1d24",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="bg-background">
      <body
        className={`${inter.variable} min-h-screen overflow-x-hidden bg-background font-sans antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
