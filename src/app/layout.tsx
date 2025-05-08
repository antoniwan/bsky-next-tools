import { Header } from "@/components/common/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Bluesky Tools Suite",
    default: "Bluesky Tools Suite",
  },
  description:
    "A modern collection of utilities to enhance your Bluesky experience",
  authors: [
    { name: "Antonio Rodriguez Martinez", url: "https://antoniwan.online" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
