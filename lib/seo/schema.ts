/**
 * JSON-LD schema helpers for structured data.
 * Usage: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */

const SITE_URL = "https://shtamp-pied.vercel.app";
const ORG_NAME = "ШТАМП";
const ORG_LEGAL = "ООО «ШТАМП»";

// ─── Organization / LocalBusiness ────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: ORG_NAME,
    legalName: ORG_LEGAL,
    description:
      "Проектирование и изготовление штампов холодной штамповки, пресс-форм для литья. Ремонт и модернизация оснастки. Более 18 лет опыта в металлообработке.",
    url: SITE_URL,
    telephone: "+74951234567",
    email: "info@stamp.ru",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Промышленная, 15",
      addressLocality: "Москва",
      addressRegion: "Московская область",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "55.7558",
      longitude: "37.6173",
    },
    openingHours: "Mo-Fr 09:00-18:00",
    priceRange: "₽₽₽",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Производство штамповой оснастки",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Изготовление штампов" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Пресс-формы для литья" } },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Проектирование оснастки" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Ремонт и модернизация штампов" },
        },
      ],
    },
    sameAs: [],
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

// ─── Service ─────────────────────────────────────────────────────────────────

export function serviceSchema({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}${url}`,
    ...(image ? { image } : {}),
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: ORG_NAME,
    },
    areaServed: {
      "@type": "Country",
      name: "Russia",
    },
  };
}

// ─── Article ─────────────────────────────────────────────────────────────────

export function articleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: `${SITE_URL}/articles/${slug}`,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    ...(image ? { image } : {}),
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: ORG_NAME,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: ORG_NAME,
    },
    inLanguage: "ru",
  };
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── WebPage ─────────────────────────────────────────────────────────────────

export function webPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}${url}`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: ORG_NAME,
      url: SITE_URL,
    },
  };
}
