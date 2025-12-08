/
├─ app/ # Route tree (RSC by default)
│ ├─ layout.tsx # Root layout
│ ├─ page.tsx # Home
│ ├─ (marketing)/ # Route group (no URL segment)
│ │ ├─ about/page.tsx
│ ├─ hotel/
│ │ ├─ page.tsx
│ │ ├─ [id]/page.tsx
│ │ ├─ (hotel feature)
│ │ ├─ components/ # Route‑specific UI
│ ├─ api/ # Route handlers (server endpoints)
│ │ └─ hotels/route.ts
│ ├─ error.tsx # Global error boundary
│ ├─ loading.tsx # Global loading
│ ├─ not-found.tsx
├─ components/ # Pure, reusable presentational components
├─ features/ # Domain (booking, auth, folio, pricing)
│ ├─ booking/
│ │ ├─ components/
│ │ ├─ hooks/
│ │ ├─ store/
│ │ ├─ services/
│ │ └─ index.ts
├─ store/ # Global Zustand stores (ui, session)
├─ services/ # External API / data access (fetch, Prisma wrappers)
├─ lib/ # Utilities (formatters, validators, server helpers)
│ ├─ server/ # Server-only helpers (db, auth)
│ └─ client/ # Client-only helpers
├─ types/ # Shared TypeScript interfaces
│ └─ index.ts
├─ hooks/ # Generic reusable hooks (non-domain)
├─ config/ # App configuration (constants, feature flags)
├─ public/ # Static assets
├─ styles/ # Global CSS / Tailwind / theme
├─ tests/ # Unit/integration tests
├─ scripts/ # Build/seed scripts
├─ prisma/ # Prisma schema (if used)
├─ middleware.ts # Edge middleware (auth, i18n)
├─ env.d.ts # Typed env vars
├─ next.config.js
└─ tsconfig.json

Key guidelines:

Keep domain logic inside features/\*, not in app/.
Use server actions for mutations close to routes; call service layer for business rules.
Co-locate small components with their feature; promote only truly shared ones to /components.
Separate server-only helpers (lib/server) to avoid accidental client bundling.
Use types/ for interfaces consumed across features and API routes.
Keep Zustand stores lean; persist only necessary UI/session state.
Route groups (e.g. (marketing), (app), (secure)) for layout segmentation without affecting URL paths.
Prefer fetching in Server Components; pass data to Client Components only for interactivity.
Use services/ as thin wrappers over fetch/Prisma to keep actions and route handlers clean.
