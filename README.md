# 🐾 PetAdopt — Pet Adoption Platform (Client)

A full-stack **Pet Adoption Platform** built with **Next.js (App Router)** and **Better Auth**. Users can browse pets of every kind, view detailed profiles, submit adoption requests, and manage their listings and requests from a dedicated dashboard.

## Project Name

**PetAdopt**

## Purpose

PetAdopt connects adoptable pets with caring families. Pet owners and shelters can list pets (dogs, cats, birds, rabbits, hamsters and more), while adopters can explore available pets, view full details, and submit adoption requests. Owners approve or reject requests, and once approved the pet is automatically marked as adopted.

## Live URL

> 🔗 Add your deployed client URL here (e.g. `https://petadopt.vercel.app`)

## Key Features

- 🔐 **Secure authentication** with Better Auth — email/password registration (with full password validation) and **Google login**. Session tokens are stored in HTTPOnly cookies, so logged-in users are never redirected on a private-route reload.
- 🐕 **Browse & adopt** — view all pets as cards, open a detailed profile, and submit an adoption request with a pickup date and message.
- 🔍 **Search, filter & sort** — search pets by name, filter by species (Dog, Cat, Bird, Rabbit, Hamster, Parrot, Fish, Ferret, Guinea Pig, Tortoise & more) using MongoDB `$regex` / `$in`, and sort by fee or date.
- 🛠️ **Owner dashboard** — add, update, view and delete pet listings, plus live stats (total / available / adopted).
- 📩 **Request management** — owners approve or reject adoption requests in a modal; approved pets become adopted and further requests are blocked. Adopters can track and cancel their own requests.
- 🌗 **Dark / light theme** toggle and smooth **Framer Motion** animations.
- 📱 **Fully responsive** design for mobile, tablet and desktop with a custom 404 page and toast notifications (no `alert()`).

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4
- **Auth:** Better Auth (email/password + Google OAuth)
- **Icons:** react-icons
- **Animations:** Framer Motion
- **Toasts:** react-hot-toast
- **HTTP:** axios

## NPM Packages Used

| Package | Purpose |
| --- | --- |
| `next` | React framework with App Router |
| `react` / `react-dom` | UI library |
| `better-auth` | Authentication (sessions, HTTPOnly cookies, Google login) |
| `axios` | HTTP requests to the backend API |
| `react-hot-toast` | Toast notifications |
| `framer-motion` | Animations |
| `react-icons` | Icons |
| `tailwindcss` / `@tailwindcss/postcss` | Styling |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

(Add your Firebase config vars here when you enable Google login on the backend.)

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> The backend server must be running on `http://localhost:5000` — see the `assignment-9-backend` README.

## Folder Structure

```text
src/
├── app/                    # App Router pages & layouts
│   ├── all-pets/           # /all-pets (search, filter, sort)
│   ├── pets/[id]/          # /pets/:id (details + adoption form)
│   ├── login/  register/   # authentication pages
│   ├── dashboard/          # add-pet, my-listings, my-requests, update-pet
│   ├── layout.js           # root layout (providers, navbar, footer)
│   └── not-found.js        # custom 404 page
├── components/
│   ├── Shared/  Home/  Pets/  Dashboard/
├── routes/PrivateRoute.jsx # guards private pages
├── providers/AuthProvider.jsx
├── lib/auth-client.js      # Better Auth client
├── hooks/                  # useAuth, useAxiosSecure, useAxiosPublic
├── api/                    # petApi, requestApi
└── utils/toastConfig.js
```

## Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # run production build
```

---
Copyright © 2026 PetAdopt. All rights reserved.
