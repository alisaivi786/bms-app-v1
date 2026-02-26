# BMS - Phase 9 Development (Firebase Functions: Admin Delete User)

## 1. Phase Goal

Implement secure, admin-only deletion of users from:
- Firebase Authentication
- Firestore user data

Status: Blocked (Deployment Prerequisite)  
Phase Date: 2026-02-26  
Last Updated: 2026-02-26

---

## 2. Scope Implemented

### 2.1 Cloud Function (Prepared)
- Added callable function:
  - `deleteUserByUid`
- File:
  - `functions/index.js`
- Security rules inside function:
  - requester must be authenticated
  - requester must be admin (`isAdmin` or `role=admin`)
  - self-delete blocked
  - deleting target admin user blocked

### 2.2 UI/UX Enhancements Completed
- Users and Roles search forms upgraded with reusable date-range picker.
- Date-range picker visual/interaction fixes:
  - fixed dropdown width behavior for dual-calendar visibility
  - improved dark-mode icon visibility
  - fixed transparency/background bleed issues
  - aligned picker trigger height with other filter fields
- Reset behavior fixes:
  - date-range value clears correctly on reset
  - reset button enables when date-range has value
- Grid consistency updates:
  - standardized page-size options (`10, 20, 30, 50, 100`)
  - consistent page-size placement/alignment in grids
  - shared search form behavior reused across pages
- Timestamp updates:
  - `CreateOn` column support added on key grids
  - shared GST formatter for Firestore UTC timestamps
- Toast and modal improvements:
  - toast close (`x`) support added
  - solid modal card background to avoid text bleed
- Mobile responsiveness fixes:
  - sidebar toggle fixed on mobile
  - mobile overlay click-to-close behavior added
  - auto-close sidebar after navigation on mobile

### 2.3 Delete Behavior in Function
- Deletes known user subcollections in batches:
  - `incomes`
  - `budgets`
  - `emis`
- Deletes Firestore user doc:
  - `users/{uid}`
- Deletes Firebase Auth user:
  - `admin.auth().deleteUser(uid)`
- Includes detailed error handling and logs.

### 2.4 Frontend Integration Status
- UI integration was prepared, but feature is now disabled/removed from Users grid
  until backend deployment is available.
- Reason: to avoid broken behavior for users while function cannot be deployed.

---

## 3. Deployment Blocker

Deployment failed because project is on Spark/free plan.

Error received:
- `Your project bms-app-98144 must be on the Blaze (pay-as-you-go) plan`
- Required APIs that cannot be enabled on Spark:
  - `cloudbuild.googleapis.com`
  - `artifactregistry.googleapis.com`

Without Blaze plan, Firebase Functions deployment cannot complete.

---

## 4. What Is Needed To Enable Feature

1. Upgrade Firebase project `bms-app-98144` to Blaze.
2. Deploy function:
   - `firebase deploy --only functions:deleteUserByUid`
3. Re-enable delete button in Users screen (currently removed intentionally).

---

## 5. Files Added/Updated In Phase 9

- `functions/index.js` (new callable function implementation)
- `functions/package.json` (functions runtime dependencies)
- `packages/app-core/src/firebase.js` (functions export removed again until deploy path is active)
- `packages/app-core/src/pages/UsersPage.jsx` (delete action removed from UI for now)
- `packages/app-core/src/pages/RolesPage.jsx` (date-range search enhancement)
- `packages/app-core/src/pages/IncomeReportPage.jsx` (date-range and report filter updates)
- `packages/app-core/src/pages/IncomePage.jsx` (CreateOn timestamp column)
- `packages/app-core/src/pages/DashboardPage.jsx` (CreateOn timestamp in recent entries)
- `packages/app-core/src/components/OneYearDateRangePicker.jsx` (picker behavior/UI fixes)
- `packages/app-core/src/components/CustomSearchForm.jsx` (reset/dirty-state handling)
- `packages/app-core/src/components/AlertMessage.jsx` (toast close action)
- `packages/app-core/src/components/AppLayout.jsx` (mobile sidebar behavior fixes)
- `packages/app-core/src/utils/dateTime.js` (shared GST datetime parse/format helper)
- `packages/app-core/src/styles.css` (picker/modal/toast/mobile responsive fixes)

---

## 6. Notes

- Current system state is stable.
- No partial/broken delete action is shown in UI.
- Once Blaze upgrade is completed, Phase 9 can be marked complete after function deploy and UI re-enable.
