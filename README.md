# Discordless

A web application for discovering, comparing, and rating alternatives to Discord.

Originally built as a front‑end using **Next.js 16 (App Router)** and **TypeScript**, the project also includes a simple backend model powered by **MongoDB** with **Mongoose**. It provides a modern, responsive UI with Tailwind CSS and a set of sectional components such as a hero banner, leaderboard, features list, and FAQ.

---
## TODO list
  - [ ] DB schemas
    - [x] Alternative
    - [ ] Request
  - [ ] Pages
    - [x] / (Home page)
    - [ ] /alternatives
    - [ ] /request
    - [ ] /why
  - [ ] Add schema and twitter meta tags
  - [ ] Security audit before deploy

---

## Highlights & Tech Stack

- **Next.js 16** with the new App Router
- **React 19** and **TypeScript** for typed components
- **Tailwind CSS** (v4) with `@tailwindcss/postcss`, `tw-animate-css` and utility helpers (`clsx`, `tailwind-merge`)
- **Mongoose** for MongoDB integration
- Shadcn UI primitives located in `components/ui`
- Static assets served from `public/`
- ESLint configuration using `eslint-config-next`

---

## Project Structure

```
/ (workspace root)
│  package.json
│  tsconfig.json
│  next.config.ts
│  postcss.config.mjs
│  eslint.config.mjs
│
├─ app/                      # Next.js application router
│   ├─ layout.tsx            # root layout (includes Header/Footer)
│   ├─ page.tsx              # homepage with sections
│   └─ globals.css           # global Tailwind styles
│
├─ components/               # UI sections and shared components
│   ├─ Hero.tsx
│   ├─ LeaderboardSection.tsx
│   ├─ FeaturesSection.tsx
│   ├─ FAQSection.tsx
│   ├─ Header.tsx
│   ├─ Footer.tsx
│   ├─ RecomendationSection.tsx
│   └─ ui/                   # design system primitives (button, card, etc.)
│
├─ lib/                      # utility helpers
│   ├─ mongodb.ts            # mongoose connection helper
│   └─ utils.ts              # `cn` className helper
│
├─ models/                   # database models
│   └─ Alternative.ts        # Mongoose schema + TS interfaces
│
├─ public/                   # static files (favicon, images, etc.)
├─ components.json           # shadcn configuration
└─ README.md                 # this document
```


---

## Database & Schema

The application stores information about each "alternative" in a MongoDB collection. The schema (defined in `models/Alternative.ts`) includes:

- **name**, **description**, **image**, **website**
- **recommend** value that let's me change recommendations via database
- Nested `data` object containing:
  - `pros`, `cons`, `warnings` (arrays of text + notes entries)
  - `discord` feature statuses (text channels, roles, etc.)
  - `security` details (e2ee, data collection)
  - `openSource` status and repository URL
  - `users` stats (amount of users, rating)
  - `decentralization`, `nsfw`, `apps` availability
  - `ai` for overall information about platform use of AI
  - `country` for now origin, maybe include more in future

All types are exported as TypeScript interfaces for frontend use. A lean version `AlternativeLean` omits mongoose document methods for serializability.

Ensure the `MONGODB_URI` environment variable is set before running the app.

---

## Running the App

### 1. Install dependencies

```bash
npm install
# or yarn / pnpm / bun
```

### 2. Environment variables

Create a `.env.local` file at the project root with at least:

```env
MONGODB_URI="mongodb://user:password@host:port/database"
```

### 3. Development server

```bash
npm run dev
``` 

Visit `http://localhost:3000`.

### 4. Production

```bash
npm run build
npm run start
```

---

## Frontend Components

All UI utilities (e.g. button, card, dropdown) live under `components/ui` and were generated via the shadcn CLI.

For some I either used free components from https://shadcnstudio.com or got inspiration from them

---

## Contributing

1. Fork this repo
2. Create a branch (`git checkout -b feat/your-change`)
3. Make your changes and run `npm run lint`
4. Commit and push, then open a pull request

---

Thanks for checking out **Discordless**! Feel free to open issues or discuss improvements.