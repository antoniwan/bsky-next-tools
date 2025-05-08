# 🛠️ bsky-next-tools

A modern web suite of Bluesky utilities built using Next.js 15, Tailwind CSS, Prisma, and the official `@atproto/api` SDK.

> Created with love by [Antonio Rodriguez Martinez](https://antoniwan.online)  
> Contact: [antonio@builds.software](mailto:antonio@builds.software)

---

## 🚀 Features

- 🔐 Login with Bluesky app password
- 🔍 **Profile Viewer** — inspect any Bluesky profile by handle
- 👥 **Followers Tracker** — save snapshots, compare followers, see new/unfollowers
- ➕ **Mass Follow** — follow all accounts someone else follows
- 📊 **Account Stats** — see basic metrics (post count, likes, reposts)
- 🧼 **Cleanup Tool** — unfollow non-mutuals and inactive accounts

---

## 🛣️ Roadmap

| Phase             | Features                                                 |
| ----------------- | -------------------------------------------------------- |
| 1️⃣ MVP            | Manual login, tool pages stubbed, follower snapshot diff |
| 2️⃣ UI Polish      | Add Tailwind UI, icon set, session storage               |
| 3️⃣ DB Integration | Use Prisma for follower snapshots, login metadata        |
| 4️⃣ Auth Upgrade   | Switch to OAuth or token-based session auth              |
| 5️⃣ PWA Mode       | Offline snapshot viewer and mobile-first design          |
| 6️⃣ Pro Tools      | Export lists, auto-tagger, smart unfollowing             |

---

## 🧑‍💻 Local Development

```bash
git clone https://github.com/Strong-Hands-Soft-Heart/bsky-next-tools.git
cd bsky-next-tools
npm install
npx prisma init
npm run dev
```
