import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dearly — Digital experiences, made personal",
    template: "%s — Dearly Studio",
  },
  description:
    "A digital experience studio making thoughtful websites for weddings, celebrations, and ambitious ideas.",
  keywords: [
    "digital experience studio",
    "wedding websites",
    "event websites",
    "custom landing pages",
    "Dearly Studio",
  ],
  openGraph: {
    title: "Dearly — Digital experiences, made personal",
    description:
      "Thoughtful websites for life's meaningful moments and everything still to come.",
    type: "website",
    siteName: "Dearly Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
