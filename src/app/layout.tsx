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
  title: {
    default: "Bluesky Tools Suite",
    template: "%s | Bluesky Tools Suite",
  },
  description:
    "A modern web suite of Bluesky utilities built using Next.js 15, Tailwind CSS, Prisma, and the official @atproto/api SDK.",
  keywords: [
    "Bluesky",
    "AT Protocol",
    "Social Media",
    "Tools",
    "Next.js",
    "Web Development",
  ],
  authors: [
    { name: "Antonio Rodriguez Martinez", url: "https://antoniwan.online" },
  ],
  creator: "Antonio Rodriguez Martinez",
  publisher: "Strong Hands Soft Heart",
  metadataBase: new URL("https://bsky-tools.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bsky-tools.vercel.app",
    title: "Bluesky Tools Suite",
    description:
      "A modern web suite of Bluesky utilities built using Next.js 15, Tailwind CSS, Prisma, and the official @atproto/api SDK.",
    siteName: "Bluesky Tools Suite",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluesky Tools Suite",
    description:
      "A modern web suite of Bluesky utilities built using Next.js 15, Tailwind CSS, Prisma, and the official @atproto/api SDK.",
    creator: "@antoniwan",
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
    // Add your verification tokens here when you have them
    // google: "your-google-site-verification",
    // yandex: "your-yandex-verification",
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
