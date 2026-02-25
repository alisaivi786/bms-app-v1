# BMS - Phase 8 Development

## 1. Phase Goal

Restructure BMS into a monorepo with separate deployable apps (`bms-portal`, `bms-admin`) and shared reusable code.

Status: Completed (Current Scope)  
Phase Date: 2026-02-25  
Last Updated: 2026-02-25

---

## 2. Scope Delivered

### 2.1 Monorepo Workspace Setup
- Migrated project to PNPM workspace structure.
- Added workspace definition:
  - `pnpm-workspace.yaml`
- Updated root scripts for app-specific run/build commands.

### 2.2 Application Split
- Created two app targets:
  - `apps/bms-portal`
  - `apps/bms-admin`
- Each app now has:
  - own `package.json`
  - own `vite.config.js`
  - own `index.html`
  - own `src/main.jsx`
  - own `.env.*` files
  - own `public/` assets

### 2.3 Shared Core Package
- Introduced shared package:
  - `packages/app-core`
- Moved shared source (pages/components/state/utils/firebase/styles) into app-core.
- Added package export entry:
  - `@bms/app-core`

### 2.4 Route-Level Separation
- Added dedicated route apps in shared core:
  - `AppPortal.jsx` (portal features)
  - `AppAdmin.jsx` (admin features)
- Added shared runtime entry exports:
  - `PortalMain`
  - `AdminMain`
- App mains now render separate app shells using shared runtime.

### 2.5 Vercel Deployment Readiness
- Added app-level Vercel SPA rewrite config:
  - `apps/bms-portal/vercel.json`
  - `apps/bms-admin/vercel.json`
- Rewrites ensure refresh/deep-link routes do not return Vercel 404.

### 2.6 Tier Bootstrap Fix
- Updated default non-admin user tier on login/bootstrap:
  - from `basic`
  - to `free`

---

## 3. Workspace Commands

From repo root:

```bash
pnpm dev:portal
pnpm dev:admin
pnpm build:portal
pnpm build:admin
```

---

## 4. Deploy Notes (Vercel)

Create two Vercel projects from the same repository:

1. Portal deployment
- Root Directory: `apps/bms-portal`
- Build Command: `pnpm build`
- Output Directory: `dist`

2. Admin deployment
- Root Directory: `apps/bms-admin`
- Build Command: `pnpm build`
- Output Directory: `dist`

Set required Firebase env vars in each Vercel project:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

---

## 5. Key Files Added/Updated In Phase 8

- `pnpm-workspace.yaml` (new)
- `package.json` (root scripts updated)
- `README.md` (monorepo instructions updated)
- `apps/bms-portal/*` (new app)
- `apps/bms-admin/*` (new app)
- `packages/app-core/*` (new shared package)
- `packages/app-core/src/AppPortal.jsx` (new)
- `packages/app-core/src/AppAdmin.jsx` (new)
- `packages/app-core/src/index.jsx` (new runtime exports)
- `apps/bms-portal/vercel.json` (new)
- `apps/bms-admin/vercel.json` (new)
- `packages/app-core/src/components/AppLayout.jsx` (default tier fix)

---

## 6. Hotfixes / Enhancements (Phase 8)

### 2026-02-25
- Enhancement: Completed monorepo split into portal/admin apps with shared app-core package.
- Enhancement: Prepared dual-app Vercel deployment configuration.
- Hotfix: Updated new-user default tier to `free` in bootstrap flow.
