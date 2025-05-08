import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bluesky Tools Suite",
  description:
    "A modern collection of utilities to enhance your Bluesky experience",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Bluesky Tools Suite</h1>
        <p className="text-lg mb-4">
          A modern collection of utilities to enhance your Bluesky experience
        </p>
      </div>
    </main>
  );
}
