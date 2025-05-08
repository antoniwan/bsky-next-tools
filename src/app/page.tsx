import Link from "next/link";
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
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            🛠️ bsky-next-tools
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A modern web suite of Bluesky utilities built using Next.js 15,
            Tailwind CSS, Prisma, and the official @atproto/api SDK.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/login"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Get Started
            </Link>
            <Link
              href="https://github.com/Strong-Hands-Soft-Heart/bsky-next-tools"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              View on GitHub <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white sm:py-32">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your Bluesky presence
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  title: "Profile Viewer",
                  description: "Inspect any Bluesky profile by handle",
                  icon: "🔍",
                },
                {
                  title: "Followers Tracker",
                  description:
                    "Save snapshots, compare followers, see new/unfollowers",
                  icon: "👥",
                },
                {
                  title: "Mass Follow",
                  description: "Follow all accounts someone else follows",
                  icon: "➕",
                },
                {
                  title: "Account Stats",
                  description: "See basic metrics (post count, likes, reposts)",
                  icon: "📊",
                },
                {
                  title: "Cleanup Tool",
                  description: "Unfollow non-mutuals and inactive accounts",
                  icon: "🧼",
                },
              ].map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <span className="text-2xl">{feature.icon}</span>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Roadmap
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our development journey
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  phase: "1️⃣ MVP",
                  features:
                    "Manual login, tool pages stubbed, follower snapshot diff",
                },
                {
                  phase: "2️⃣ UI Polish",
                  features: "Add Tailwind UI, icon set, session storage",
                },
                {
                  phase: "3️⃣ DB Integration",
                  features: "Use Prisma for follower snapshots, login metadata",
                },
                {
                  phase: "4️⃣ Auth Upgrade",
                  features: "Switch to OAuth or token-based session auth",
                },
                {
                  phase: "5️⃣ PWA Mode",
                  features: "Offline snapshot viewer and mobile-first design",
                },
                {
                  phase: "6️⃣ Pro Tools",
                  features: "Export lists, auto-tagger, smart unfollowing",
                },
              ].map((item) => (
                <div
                  key={item.phase}
                  className="relative p-6 bg-white rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.phase}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{item.features}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Created with love by{" "}
            <a
              href="https://antoniwan.online"
              className="text-blue-600 hover:text-blue-500"
            >
              Antonio Rodriguez Martinez
            </a>
            <br />
            Contact:{" "}
            <a
              href="mailto:antonio@builds.software"
              className="text-blue-600 hover:text-blue-500"
            >
              antonio@builds.software
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
