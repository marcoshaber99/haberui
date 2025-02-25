import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "haber-ui | React components for modern AI applications",
    template: "%s | haber-ui",
  },
  description:
    "A collection of beautifully designed React components built with Tailwind CSS and shadcn/ui. Modern, accessible, and customizable.",
  keywords: [
    "react",
    "components",
    "ui",
    "tailwind",
    "shadcn",
    "typescript",
    "nextjs",
  ],
  authors: [{ name: "Marco Haber" }],
  creator: "Marco Haber",
  metadataBase: new URL("https://haberui.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://haberui.com",
    title: "haber-ui - React components for modern AI applications",
    description:
      "A collection of beautifully designed React components built with Tailwind CSS and shadcn/ui.",
    siteName: "haber-ui",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "haber-ui - React components for modern AI applications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "haber-ui - React components for modern AI applications",
    description:
      "A collection of beautifully designed React components built with Tailwind CSS and shadcn/ui.",
    creator: "@marcohaber99",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootProvider>{children}</RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
