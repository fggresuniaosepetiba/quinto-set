import type { Metadata, Viewport } from "next";
import { Oswald, Inter, Caveat } from "next/font/google";
import "./globals.css";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { siteConfig } from "@/data/site";

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "quinto set",
    "escolinha de vôlei",
    "escolinha social de volei",
    "volei no Cesarão",
    "volei Rio de Janeiro",
    "inclusão esportiva",
    "voleibol para jovens",
    "esporte social",
    "escolinha gratuita de volei",
    "Quinto Set Escolinha de Vôlei",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo-quinto-set.png", sizes: "any" },
    ],
    apple: "/logo-quinto-set.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
    images: [
      {
        url: "/logo-quinto-set.png",
        width: 1024,
        height: 1536,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/logo-quinto-set.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#00143c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${oswald.variable} ${inter.variable} ${caveat.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
