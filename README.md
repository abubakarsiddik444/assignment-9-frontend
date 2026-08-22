<p align="center">
  <a href="https://nextjs.org" target="_blank"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" /></a>
  <a href="https://expressjs.com" target="_blank"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" /></a>
  <a href="https://www.mongodb.com" target="_blank"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" /></a>
  <a href="https://better-auth.com" target="_blank"><img src="https://img.shields.io/badge/Better%20Auth-3B82F6?style=for-the-badge&logo=keycdn&logoColor=white" /></a>
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
| 🔐 | **Authentication** | Email/password with full validation + **Google login** (Better Auth, HTTPOnly cookies) — logged-in users stay logged in on reload |
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
| `better-auth` | Authentication (email + Google OAuth) |
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

---

<p align="center">Made with ❤️ · Copyright © 2026 PetAdopt</p>

