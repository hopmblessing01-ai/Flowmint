import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { NavigationLoader } from "@/components/navigation-loader";
import { SmoothScroll } from "@/components/smooth-scroll";
import {
  brandKeywords,
  bookingUrl,
  contactEmail,
  contactPhoneTel,
  crmPlatforms,
  defaultDescription,
  serviceTypes,
  workPlatforms,
  siteName,
  siteTagline,
  siteUrl,
} from "@/lib/site-seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  icons: {
    icon: "./favicon.ico",
    shortcut: "./favicon.ico",
    apple: "./favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  title: {
    default: `${siteName} | ${siteTagline}`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: brandKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Business automation",
  openGraph: {
    title: `${siteName} | ${siteTagline}`,
    description: defaultDescription,
    siteName,
    type: "website",
    locale: "en_GB",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | ${siteTagline}`,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    email: contactEmail,
    telephone: contactPhoneTel,
    description: defaultDescription,
    sameAs: ["https://blessingigwegbe.com"],
    contactPoint: {
      "@type": "ContactPoint",
      email: contactEmail,
      telephone: contactPhoneTel,
      contactType: "customer support",
      url: bookingUrl,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    publisher: { "@type": "Organization", name: siteName },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    url: siteUrl,
    email: contactEmail,
    telephone: contactPhoneTel,
    description: defaultDescription,
    areaServed: "Worldwide",
    serviceType: serviceTypes,
    knowsAbout: [
      ...crmPlatforms,
      ...workPlatforms,
      "n8n",
      "Zapier",
      "Make",
      "AI chatbots",
      "voice agents",
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full scroll-smooth scroll-pt-[7.25rem] sm:scroll-pt-[7.5rem]`}
    >
      <body className="min-h-full antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <SmoothScroll>
          <NavigationLoader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
