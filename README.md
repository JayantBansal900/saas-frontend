# SaaS Subscription Frontend

React client for a subscription-based SaaS app. Users sign up, browse plans and manage their subscription; admins manage plans and users. Pairs with [saas-backend](https://github.com/JayantBansal900/saas-backend).

**Live demo:** https://saas-frontend-orcin.vercel.app

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

## Features

- Login and registration with an `AuthContext`, plus protected and admin-only routes
- Browse plans and view your current subscription
- Admin dashboard: manage plans and users
- Data fetching and caching with **TanStack Query**, state with **Zustand**
- Forms with **React Hook Form** + **Zod** validation

## Project structure

```text
src/
├── components/   # Navbar, ProtectedRoute, AdminRoute
├── context/      # AuthContext
├── hooks/        # usePlans, useMySubscription, useAdmin, ...
├── lib/          # axios instance
└── pages/        # Home, Login, Admin dashboard, Plans, Users
```

## Getting started

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000
```

```bash
npm run dev
npm run build
```

## Author

**Jayant Bansal** · [GitHub](https://github.com/JayantBansal900)
