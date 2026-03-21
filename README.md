# satactmathai.com 🎯

> Free AI-powered SAT & ACT Math revision — topic-by-topic explainers, worked examples, and instant AI practice for US high school students.

---

## 🌐 Live Site

[satactmathai.com](https://satactmathai.com) — coming soon

---

## 🧱 Tech Stack

| Layer | Tool |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router, TypeScript) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| Hosting | [Vercel](https://vercel.com/) |
| Domain | GoDaddy → `satactmathai.com` |

---

## 📁 Project Structure

```
satactmathai/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Homepage
│   │   ├── sat/              # SAT topic pages
│   │   │   └── [topic]/
│   │   │       └── page.tsx
│   │   └── act/              # ACT topic pages
│   │       └── [topic]/
│   │           └── page.tsx
│   ├── components/           # Reusable UI components
│   │   ├── TopicCard.tsx
│   │   ├── ExplainerBlock.tsx
│   │   └── PracticeQuestion.tsx
│   └── lib/
│       └── supabase.ts       # Supabase client
├── public/                   # Static assets
├── .env.local                # Local environment variables (not committed)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 🗂️ SAT Math Content Domains

| Domain | % of Test | Sub-topics |
|---|---|---|
| Algebra | ~35% | Linear equations, systems, inequalities, functions |
| Advanced Math | ~35% | Quadratics, exponentials, polynomials, rationals |
| Problem Solving & Data Analysis | ~15% | Ratios, percentages, stats, probability |
| Geometry & Trigonometry | ~15% | Area, volume, triangles, trig, circles |

**Total: 42 SAT sub-topic pages** — ACT pages to follow (80% content overlap).

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account
- A Vercel account

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/satactmathai
cd satactmathai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Get these from your Supabase project → Settings → API

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment

This project auto-deploys to Vercel on every push to `main`.

**To deploy manually:**

```bash
vercel --prod
```

**Environment variables** must also be added in Vercel:
- Vercel Dashboard → Project → Settings → Environment Variables
- Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🗄️ Database (Supabase)

Schema covers:
- `domains` — SAT/ACT content domains
- `topics` — individual sub-topic pages
- `practice_questions` — questions per topic
- `user_progress` — track which topics a user has completed (future)

> Schema migrations live in `/supabase/migrations/`

---

## 🔮 Roadmap

- [x] Domain registered (`satactmathai.com`)
- [x] Repo initialised
- [x] Next.js + Tailwind + Supabase scaffold
- [x] Vercel deployment
- [ ] Supabase schema + seed data
- [ ] 42 SAT Math topic pages
- [ ] Homepage and topic navigation
- [ ] AI-powered practice question generator
- [ ] ACT Math topic pages
- [ ] User accounts and progress tracking
- [ ] Freemium monetisation (premium AI tier)

---

## 🤝 Related Projects

- [gcsemathsai.co.uk](https://gcsemathsai.co.uk) — the UK sister site for GCSE Maths revision

---

## 📄 Licence

MIT
