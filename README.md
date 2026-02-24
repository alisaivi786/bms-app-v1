# BMS (React + Firebase)

This app includes:
- Google login with Firebase Auth
- User-specific data in Firestore (`users/{uid}` + `users/{uid}/incomes`)
- Admin-style sidebar layout
- Dashboard: Account Balance + Current Month Income
- Add Income screen: month, year, source, amount
- Mandatory initial balance setup

## 1) Install

```bash
pnpm install
```

## 2) Environments

This project uses 3 Vite env files:
- `.env.development` (DEV)
- `.env.uat` (UAT)
- `.env.production` (PROD)

Development is configured to always use DEV env values through:

```bash
pnpm dev
```

Your provided DEV Firebase credentials are already added to `.env.development`.
Fill UAT/PROD credentials in `.env.uat` and `.env.production` when ready.

## 3) Firebase Console setup

1. Authentication -> Sign-in method -> enable `Google`.
2. Firestore Database -> create database (Production or Test mode as needed).
3. Add authorized domain for local dev if needed (`localhost` usually present by default).

## 4) Firestore security rules (starter)

Use strict user-scoped rules:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /incomes/{incomeId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## 5) Run

```bash
pnpm dev
```

Optional:

```bash
pnpm dev:uat
pnpm dev:prod
pnpm build:uat
pnpm build
```
