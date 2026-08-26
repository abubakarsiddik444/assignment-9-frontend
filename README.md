<p align="center">
  <a href="https://nextjs.org" target="_blank"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" /></a>
  <a href="https://expressjs.com" target="_blank"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" /></a>
  <a href="https://www.mongodb.com" target="_blank"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" /></a>
  <a href="https://better-auth.com" target="_blank"><img src="https://img.shields.io/badge/Better%20Auth-3B82F6?style=for-the-badge&logo=keycdn&logoColor=white" /></a>
  <a href="https://jwt.io" target="_blank"><img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" /></a>
  <a href="https://tailwindcss.com" target="_blank"><img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /></a>
</p>

<h1 align="center">🐾 PetAdopt — Pet Adoption Platform</h1>

<p align="center">
  A full-stack <b>Pet Adoption Platform</b> — browse pets, submit adoption requests, and let owners
  manage everything from a beautiful dashboard.
</p>

<p align="center">
  🌐 <b>Live URL:</b> <i>add your deployed link here</i>
</p>

---

## ✨ What is PetAdopt?

PetAdopt connects adoptable pets (dogs, cats, birds, rabbits & more) with caring families. Adopters
explore detailed pet profiles and request adoption; pet owners add listings, track stats, and approve
or reject requests — all in one place.

## 🚀 Features

| | Feature | Description |
|---|---|---|
| 🔐 | **Authentication** | Email/password with full validation + **Google login** — **JWT-based session tokens** (Better Auth) in HTTPOnly cookies; logged-in users stay logged in on reload |
| 🔍 | **Search & Filter** | Search pets by name, filter by species, sort by fee/date, and paginate |
| 📄 | **Pet Details** | Full profile — health, vaccination, fee, location & owner info |
| 📨 | **Adoption Requests** | Submit with pickup date & message; track/cancel in My Requests |
| 🛠️ | **Owner Dashboard** | Add / update / delete pets, live stats, and a Requests modal to approve or reject |
| ✅ | **Adoption Control** | Owners can't request their own pets; approved pets become adopted & block further requests |
| 🌗 | **Polish** | Dark/light theme, Framer Motion animations, wishlist, toast notifications, custom 404, fully responsive |

## 🧰 Tech Stack

| Package | Purpose |
|---|---|
| `next` | React framework (App Router) |
| `react` | UI library |
| `better-auth` | Authentication — issues **JWT session tokens** in HTTPOnly cookies (email + Google OAuth) |
| `axios` | HTTP requests to the backend API |
| `react-hot-toast` | Toast notifications |
| `framer-motion` | Animations |
| `react-icons` | Icons |
| `tailwindcss` | Styling |

## 🏃 Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Create .env in the project root
#    NEXT_PUBLIC_API_URL=http://localhost:5000

# 3. Start the dev server
npm run dev   # → http://localhost:3000
```

> ⚙️ The backend API must be running on `http://localhost:5000`.

## 📁 Folder Structure

```text
src/
├── app/          # Pages (home, all-pets, pets/[id], login, register, dashboard)
├── components/   # Shared · Home · Pets · Dashboard
├── api/          # petApi, requestApi
├── hooks/        # useAuth, axios hooks
├── lib/          # Better Auth client
├── providers/    # AuthProvider
├── routes/       # PrivateRoute
└── utils/        # toastConfig
```

## 🚀 Deploy to Vercel

The frontend is a standard Next.js app — no extra config files are required.

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Deploy frontend"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → select the frontend repo.
2. Vercel auto-detects **Next.js** (Framework Preset: Next.js) — the build command is `npm run build`.
3. Add the following **Environment Variable** (Settings → Environment Variables):

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | The deployed backend URL, e.g. `https://your-backend.vercel.app` |

> `NEXT_PUBLIC_*` variables are inlined **at build time**, so after changing it you must redeploy.

4. Click **Deploy**.

### 3. Post-deploy

- Make sure the backend's `CLIENT_URL` env var is set to this frontend URL, e.g. `https://your-frontend.vercel.app`.
- Because the frontend and backend live on different origins, Better Auth is configured (server-side) to use `SameSite=None; Secure` session cookies over HTTPS so login persists across domains.

---

<p align="center">Made with ❤️ · Copyright © 2026 PetAdopt</p>

