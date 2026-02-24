# BMS - Phase 1 Development

## 1. Phase Goal

Deliver a production-ready baseline for:
- Google authentication
- User-isolated income tracking
- Dashboard and admin-style UI
- Deployment pipeline to Vercel

Status: Completed
Phase Date: 2026-02-24

---

## 2. Scope Delivered

### 2.1 Authentication
- Firebase Authentication integrated
- Google Sign-In enabled in app
- Protected routes for authenticated users only
- Friendly auth error handling in login UI

### 2.2 Data Layer
- Firestore integrated
- Data model scoped by user UID
  - `users/{uid}`
  - `users/{uid}/incomes/{incomeId}`
- Initial balance stored per user
- Income entry fields:
  - month
  - year
  - source
  - amount

### 2.3 Screens
- Login screen
- Dashboard screen
  - Account Balance
  - This Month Income
  - Recent Income Entries
- Add Income screen
  - Initial Balance (mandatory section)
  - Income form
- Theme Settings screen
  - Live theme color updates
  - Persisted theme preference

### 2.4 UI/UX
- Admin panel layout with sidebar
- Menu items:
  - Dashboard
  - Add Income
  - Theme Settings
- App branding updated to `BMS`

### 2.5 Validation and State
- `zod` used for form validation
- `zustand` used for client state + caching
- Persisted local cache for theme and finance data

### 2.6 Environments
- Multi-env structure created:
  - `.env.development`
  - `.env.uat`
  - `.env.production`
- Development uses DEV env by default

### 2.7 Tooling and Deploy
- Package manager standardized to `pnpm`
- Vite chunk splitting optimization added for Vercel
- App successfully deployed on Vercel
- Google login confirmed working on deployed domain

---

## 3. Architecture Summary

Frontend:
- React + Vite
- React Router
- Zustand (finance cache + theme state)
- Zod validation

Backend services:
- Firebase Auth (Google provider)
- Firestore Database

Deployment:
- GitHub -> Vercel CI/CD

---

## 4. Security and Access

- Firestore access is intended to be user-scoped by UID.
- Firebase Authorized Domains must include:
  - `localhost`
  - Vercel production domain

Note:
- Environment secrets should be managed in Vercel Environment Variables for production usage.

---

## 5. Known Decisions in Phase 1

1. Keep UAT/PROD credentials pending until available.
2. Use DEV Firebase project for current development and deployment.
3. Persist some UI/state data in localStorage for fast UX.

---

## 6. Change Log (Phase 1)

### 2026-02-24
- Initialized React + Vite app.
- Integrated Firebase Auth + Firestore.
- Implemented Google login and protected routes.
- Built Dashboard and Add Income flows.
- Added user-specific data paths with UID.
- Added initial balance and monthly income calculations.
- Introduced `zustand` finance cache.
- Added `zod` form validation.
- Added Theme Settings page with persisted theme customization.
- Switched project workflow to `pnpm`.
- Added `dev`, `uat`, `prod` env files.
- Configured Vite manual chunk splitting for build optimization.
- Deployed to Vercel and validated Google login in production.

---

## 7. Next Phase Placeholder (Phase 2)

Planned candidates:
1. Income edit/delete flows with audit metadata.
2. Advanced reports (monthly trend, category chart, CSV export).
3. UAT/PROD Firebase projects and environment separation.
4. Role-based admin features (if required).
5. E2E and unit test coverage.

---

## 8. How to Update This Document

For every phase update:
1. Append changes under the relevant phase file.
2. Add exact date and what changed.
3. Mention files/modules affected.
4. Record decision reasons when architecture changes.

Suggested convention:
- One file per phase: `PHASE-1.md`, `PHASE-2.md`, etc.
- Optional master index file later: `PROJECT-ROADMAP.md`

