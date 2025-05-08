import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "A modern web suite of Bluesky utilities built using Next.js 15, Tailwind CSS, Prisma, and the official @atproto/api SDK.",
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bluesky Tools Suite",
      },
    ],
  },
};

export default function Home() {
  return <main>hello bsky-next-tools</main>;
}
