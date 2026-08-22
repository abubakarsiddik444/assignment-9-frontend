# 🐾 PetAdopt — Pet Adoption Platform

A full-stack **Pet Adoption Platform** (Next.js + Express + MongoDB + Better Auth) where adopters browse pets and submit adoption requests, while pet owners manage listings and approve/reject requests.

## Project Name
**PetAdopt**

## Purpose
Connect adoptable pets (dogs, cats, birds, rabbits & more) with caring families — browse, adopt, and manage everything in one place.

## Live URL
> 🔗 Add your deployed client URL here (e.g. `https://petadopt.vercel.app`)

## Features
- 🔐 **Auth** — Email/password registration with full validation + **Google login**; HTTPOnly cookies keep users logged in on private-route reload
- 🔍 **Browse** — Pet cards with search by name, filter by species, sort & pagination
- 📄 **Pet Details** — Full profile (health, vaccination, fee, owner) with an adoption form
- 📨 **Adoption Requests** — Submit with pickup date & message; track/cancel in My Requests
- 🛠️ **Owner Dashboard** — Add/update/delete pets, live stats, Requests modal (approve/reject)
- ✅ **Adoption Control** — Owners can't request their own pets; approved pets become adopted & block further requests
- 🌗 **Extras** — Dark/light theme, Framer Motion animations, wishlist, toast notifications (no alert), custom 404, fully responsive

## NPM Packages
`next` · `react` · `better-auth` · `axios` · `react-hot-toast` · `framer-motion` · `react-icons` · `tailwindcss`

## Run Locally
```bash
npm install
# create .env → NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev   # http://localhost:3000
```
> Backend API must run on `http://localhost:5000`.

## Folder Structure
```text
src/
├── app/          # Pages (home, all-pets, pets/[id], login, register, dashboard/*)
├── components/   # Shared, Home, Pets, Dashboard
├── api/          # petApi, requestApi
├── hooks/        # useAuth, axios hooks
├── lib/          # Better Auth client
├── providers/    # AuthProvider
├── routes/       # PrivateRoute
└── utils/        # toastConfig
```

---
Copyright © 2026 PetAdopt.

