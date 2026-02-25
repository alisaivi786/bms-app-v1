# BMS - Phase 5 Development

## 1. Phase Goal

Deliver complete EMI management with strong Budget integration, better async UX, safer delete workflows, and reusable confirmation UI patterns.

Status: Completed (Current Scope)  
Phase Date: 2026-02-25  
Last Updated: 2026-02-25

---

## 2. Scope Delivered

### 2.1 EMI and Budget Bidirectional Sync
- Linked EMI-generated budget rows with `emiId`.
- EMI `Record Payment` now updates Budget actual using `emiId` first (legacy fallback by name/category).
- Budget actual updates now sync back to EMI:
  - calculates per-`emiId` delta
  - updates EMI `paidAmount`
  - updates EMI `completed` flag.

### 2.2 EMI Delete/Remove Workflow
- Added `Remvoe` action on EMI card.
- Added custom confirmation modal before remove.
- Remove behavior:
  - deletes unpaid planned budget rows (`actualAmount = 0`)
  - keeps paid rows (`actualAmount > 0`) as history
  - deletes EMI doc after cleanup.
- Added legacy-row cleanup support for older rows without `emiId` by matching:
  - EMI title
  - EMI category
  - estimated amount
  - tenor month range.

### 2.3 Async UX and Blocking Loader
- On `Save EMI`, modal closes immediately and save continues in background.
- Added full-screen blocking loader during long-running EMI operations.
- Added same blocking behavior for EMI remove flow.
- Loader messages are context-aware:
  - saving/generating rows
  - removing/cleaning rows.

### 2.4 Resilience and Timeout Protection
- Added timeout wrapper for key Firestore operations in EMI flows:
  - create EMI
  - budget read/write during plan generation
  - budget scan/cleanup during remove
  - delete EMI doc.
- Prevents indefinite stuck state in UI.
- Added validation guard: `tenorMonths <= 360`.

### 2.5 Reusable Common Component
- Added reusable `ConfirmModal` component.
- Props-driven usage:
  - `open`
  - `title`
  - `message`
  - `confirmText`
  - `cancelText`
  - `onConfirm`
  - `onCancel`.
- EMI remove flow migrated to this common component.

### 2.6 EMI UI Standardization
- Redesigned EMI card content:
  - clear type badge
  - structured metadata rows (Tenor, Start, Paid, Remaining)
  - improved spacing and typography.
- Removed dense inline text presentation.

### 2.7 Debt Summary and Profile Persistence
- Added top metrics on EMI page:
  - `Total Debt`
  - `Monthly EMI`.
- `Total Debt` is persisted to user profile:
  - `users/{uid}.totalDebt`
- Calculation source:
  - sum of EMI estimated totals (`totalPlanned`, fallback `monthlyEmi * tenorMonths`).

### 2.8 Income Naming Cleanup
- Income page heading updated:
  - `Income Grid` -> `Income Details`.

---

## 3. Firebase / Data Model Notes

### 3.1 EMI Collection
- Path: `users/{uid}/emis/{emiId}`
- Key fields used:
  - `title`
  - `type`
  - `monthlyEmi`
  - `tenorMonths`
  - `startMonth`
  - `startYear`
  - `totalPlanned`
  - `paidAmount`
  - `completed`.

### 3.2 Budget Item Linking
- Budget rows now support EMI linkage with:
  - `emiId` (string or null)
- Enables consistent cross-screen updates and safe delete behavior.

### 3.3 User Profile Extension
- New profile-level aggregate field:
  - `users/{uid}.totalDebt` (number)

---

## 4. Firestore Rules Update (Phase 5)

### 4.1 EMI Rule Added
- Added EMI subcollection access under each user document:

```txt
match /users/{userId} {
  ...
  match /emis/{emiId} {
    allow read, write: if signedIn() && (request.auth.uid == userId || isAdmin());
  }
}
```

### 4.2 Why This Was Required
- EMI module now performs:
  - create EMI records
  - update EMI paid/completed values
  - delete EMI records
  - sync with budget rows
- Without `/emis` rule, app shows permission errors like:
  - `Missing or insufficient permissions`
  - `Could not create EMI`
  - `Could not remove EMI`

### 4.3 Recommended Full Rules (Phase 5 Baseline)

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return signedIn() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }

    match /users/{userId} {
      allow read: if signedIn() && (request.auth.uid == userId || isAdmin());
      allow create: if signedIn() && (request.auth.uid == userId || isAdmin());
      allow update: if signedIn() && (request.auth.uid == userId || isAdmin());
      allow delete: if isAdmin();

      match /incomes/{incomeId} {
        allow read, write: if signedIn() && (request.auth.uid == userId || isAdmin());
      }

      match /budgets/{budgetId} {
        allow read, write: if signedIn() && (request.auth.uid == userId || isAdmin());
      }

      match /emis/{emiId} {
        allow read, write: if signedIn() && (request.auth.uid == userId || isAdmin());
      }
    }
  }
}
```

---

## 5. Key Files Updated In Phase 5

- `src/pages/EmiPage.jsx`
- `src/pages/BudgetPage.jsx`
- `src/pages/IncomePage.jsx`
- `src/components/ConfirmModal.jsx` (new)
- `src/styles.css`

---

## 6. Hotfixes and Enhancements (Phase 5)

### 2026-02-25
- Fixed EMI/Budget sync gap where Budget actual edits were not reflected in EMI.
- Fixed remove flow for legacy budget rows without `emiId`.
- Added async timeout protection for long EMI operations.
- Added blocking loaders for EMI save/remove processes.
- Replaced browser confirm with reusable custom confirm modal.
- Improved EMI card UI readability and structure.
- Added `totalDebt` persistence to user profile.
- Updated Income page heading to `Income Details`.
