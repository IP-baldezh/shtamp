import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { organizationSchema } from "@/lib/seo/schema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shtamp-pied.vercel.app"),
  title: {
    default: "ШТАМП — Производство штампов и пресс-форм",
    template: "%s | ШТАМП",
  },
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
  creator: "ШТАМП",
  openGraph: {
    title: "ШТАМП — Производство штампов и пресс-форм",
    description: "Проектирование и изготовление штампов холодной штамповки, пресс-форм для литья",
    url: "https://shtamp-pied.vercel.app",
    type: "website",
    locale: "ru_RU",
    siteName: "ШТАМП",
  },
  twitter: {
    card: "summary_large_image",
    title: "ШТАМП — Производство штампов и пресс-форм",
    description: "Проектирование и изготовление штампов холодной штамповки, пресс-форм для литья",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://shtamp-pied.vercel.app",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1d24" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="bg-background" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body
        className={`${inter.variable} min-h-screen overflow-x-hidden bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
          {process.env.NODE_ENV === "production" && <Analytics />}
          {process.env.NODE_ENV === "production" && <SpeedInsights />}
        </ThemeProvider>
      </body>
    </html>
  );
}
