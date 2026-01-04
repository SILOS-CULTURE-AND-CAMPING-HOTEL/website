import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Silos Culture & Camping Hotel - Luxury Wilderness Experience",
  description: "Experience luxury in nature at Silos Culture & Camping Hotel. Premium cabins, gourmet dining, adventure activities, ziplining, wildlife tours, and more. Book your unforgettable escape today.",
  keywords: [
    "luxury hotel",
    "camping hotel",
    "wilderness resort",
    "nature retreat",
    "adventure activities",
    "ziplining",
    "canopy bridge",
    "wildlife sanctuary",
    "luxury cabins",
    "gourmet restaurant",
    "family vacation",
    "Kenya tourism",
    "nature escape",
    "premium accommodation",
    "adventure tourism"
  ],
  authors: [{ name: "Silos Hotel Team" }],
  creator: "Silos Culture & Camping Hotel",
  publisher: "Silos Culture & Camping Hotel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://siloshotel.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://siloshotel.com",
    title: "Silos Culture & Camping Hotel - Luxury Wilderness Experience",
    description: "Experience luxury in nature with our premium cabins, thrilling adventures, and unforgettable cultural immersion in the heart of wilderness",
    siteName: "Silos Culture & Camping Hotel",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Silos Culture & Camping Hotel - Luxury Wilderness Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Silos Culture & Camping Hotel - Luxury Wilderness Experience",
    description: "Experience luxury in nature with our premium cabins, thrilling adventures, and unforgettable cultural immersion",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
