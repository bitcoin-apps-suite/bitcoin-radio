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
  title: "Bitcoin Radio - Premium Bitcoin Broadcasting Platform",
  description: "The ultimate destination for Bitcoin radio shows, podcasts, tutorials, and live broadcasts. Stay updated with the latest in cryptocurrency and blockchain technology.",
  icons: {
    icon: [
      {
        url: "/bitcoin-radio.jpg",
        sizes: "32x32",
        type: "image/jpeg",
      },
      {
        url: "/bitcoin-radio.jpg",
        sizes: "16x16",
        type: "image/jpeg",
      },
    ],
    apple: [
      {
        url: "/bitcoin-radio.jpg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
  },
  openGraph: {
    title: "Bitcoin Radio - Premium Bitcoin Broadcasting Platform",
    description: "The ultimate destination for Bitcoin radio shows, podcasts, tutorials, and live broadcasts. Stay updated with the latest in cryptocurrency and blockchain technology.",
    url: "https://bitcoin-radio.app",
    siteName: "Bitcoin Radio",
    images: [
      {
        url: "/bitcoin-radio.jpg",
        width: 1200,
        height: 630,
        alt: "Bitcoin Radio Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitcoin Radio - Premium Bitcoin Broadcasting Platform",
    description: "The ultimate destination for Bitcoin radio shows, podcasts, tutorials, and live broadcasts. Stay updated with the latest in cryptocurrency and blockchain technology.",
    images: ["/bitcoin-radio.jpg"],
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