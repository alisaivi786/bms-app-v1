# BMS - Phase 2 Development

## 1. Phase Goal

Enhance product usability, configurability, and data governance by introducing:
- richer admin UX
- system configuration controls
- enum-based lookup architecture
- user preferences and profile enhancements

Status: Completed  
Phase Date: 2026-02-25

---

## 2. Scope Delivered

### 2.1 Navigation and Layout Enhancements
- Sidebar collapse/expand behavior added.
- Sticky top header introduced with:
  - burger menu toggle
  - notification icon
  - currency selector (moved from profile menu to header)
- Footer added with copyright and developer attribution.

### 2.2 Profile and Settings Experience
- Profile Settings screen added:
  - update display name
  - update avatar URL
  - change password flow with Firebase constraints handling
- Profile action menu (`⋮`) added:
  - Theme Settings
  - Profile Settings
  - Logout

### 2.3 Theme System Upgrade
- Full Light/Dark mode support integrated.
- Mode persisted in client state.
- Header quick toggle (moon/sun) added.
- Theme settings page supports:
  - mode selection
  - color customization
- Dark mode visibility and contrast issues fixed across:
  - body background
  - cards/forms
  - text readability
  - header/burger icon visibility

### 2.4 Currency Management
- Currency selection moved to top header.
- Global currency formatting applied across app values.
- Currency preference persisted in Firestore user profile (`users/{uid}.currency`).
- Currency preference auto-restored on login.

### 2.5 User Management Screen
- Users screen added in side menu.
- Reads and displays user profile data from Firestore.
- Auto-sync of signed-in user core profile fields to Firestore ensured:
  - `uid`, `email`, `displayName`, `photoURL`, `updatedAt`

### 2.6 System Configuration Screen
- New `System Config` screen introduced for broader future settings.
- Implemented lookup management v1 as foundation:
  - Add lookup
  - Filter lookup by type
  - Data grid with Edit/Delete actions

### 2.7 Income Source Lookup Integration
- Income source field changed from free-text input to DB-driven dropdown.
- Dropdown now reads lookup values from Firestore.
- If no lookup is available, helper hint shown in Income screen.

### 2.8 Lookup Data Model Standardization (Enum-Based)
- Central lookup enum/constants added in code.
- Lookup type now stored using numeric enum IDs (`typeId`) instead of raw strings.
- Lookup item IDs standardized to integer.
- Data model migrated to:
  - `users/{uid}.lookupItems[]` with:
    - `id` (number)
    - `typeId` (number)
    - `name` (string)
- Backward-compatible read mapping added for legacy entries.
- Legacy field cleanup enabled (`incomeSourceLookups` removed on save).

### 2.9 Firestore Provisioning and Persistence Activation
- Firestore Database was created and enabled in Firebase Console (Production mode).
- Firestore security rules were applied/published to allow authenticated user-scoped access.
- App behavior moved from local cache-only visibility (when DB was not provisioned) to actual persisted cloud data.
- Initial balance, income entries, currency, and lookup values are now confirmed saved in Firestore.

Applied Firestore rules in this phase:
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

---

## 3. Architecture Updates

### 3.1 New Key Modules
- `src/constants/lookupTypes.js` (enum + lookup type registry)
- `src/pages/SystemConfigPage.jsx` (lookup grid and CRUD actions)
- `src/pages/UsersPage.jsx` (user listing)
- `src/pages/ProfilePage.jsx` (profile operations)
- `src/state/preferencesStore.js` (currency preference state)
- `src/utils/currency.js` (global formatting helper)

### 3.2 Upgraded Existing Modules
- `AppLayout`: header actions, currency persistence, profile menu behavior.
- `IncomePage`: lookup-based source selection and DB-driven options.
- `ThemeApplier` + styles: robust light/dark application behavior.

---

## 4. Firestore Data Shape (Current)

### 4.1 User Document (`users/{uid}`)
- `uid`
- `email`
- `displayName`
- `photoURL`
- `initialBalance`
- `currency`
- `lookupItems` (array of maps)
- `updatedAt`

### 4.2 Lookup Item Shape
```json
{
  "id": 1,
  "typeId": 1,
  "name": "Salary"
}
```

### 4.3 Income Subcollection (`users/{uid}/incomes/{incomeId}`)
- `uid`
- `month`
- `year`
- `source`
- `amount`
- `createdAt`

---

## 5. Decisions Made in Phase 2

1. System Configuration is introduced as a scalable configuration hub, not a single-purpose page.
2. Lookup types are controlled via code enum to avoid ad-hoc string values.
3. Currency is surfaced in header for faster user interaction.
4. Dark mode receives dedicated variable overrides for consistency and accessibility.

---

## 6. Risks / Notes

- Users page visibility depends on Firestore rules that permit listing users.
- Lookup ID generation currently uses incremental integer strategy per user document.
- Existing legacy lookup rows are read safely, then normalized when saved.
- Firestore must remain provisioned and rules must stay published for write operations to succeed.

---

## 7. Suggested Phase 3 Candidates

1. Add lookup type catalog expansion (multiple enum types beyond income source).
2. Add server-side/admin authorization model for Users and System Config screens.
3. Add activity/audit log for lookup changes.
4. Add delete/edit flow for income records.
5. Add tests for enum mapping and Firestore model migrations.

---

## 8. Change Log (Phase 2)

### 2026-02-25
- Created Firestore Database in Production mode and validated cloud persistence path.
- Applied/published Firestore user-scoped rules to resolve permission-denied save errors.
- Added sticky header and refined sidebar interactions.
- Added profile settings and profile action menu.
- Added persistent light/dark mode and fixed dark-mode rendering issues.
- Added user-level persistent currency with global formatting.
- Added Users screen and ensured user profile sync to Firestore.
- Added System Config with lookup data grid and CRUD controls.
- Changed income source to lookup-driven dropdown.
- Standardized lookup model to enum-based `typeId` with integer `id`.

---

## 9. Hot Fixes (Phase 2)

Applied iterative hot fixes during Phase 2 stabilization:

1. Firestore write failures (`Could not save initial balance`)
- Root cause: Firestore was not provisioned/rules not published initially.
- Fix: Firestore created in Production mode and user-scoped rules published.

2. Auth/permissions behavior on Users page
- Root cause: app attempted collection-wide users read while rules were user-scoped.
- Fix: documented constraint and aligned behavior expectation for per-user privacy model.

3. Dark mode rendering defects
- Root cause: background and custom theme variable overrides conflicted with dark palette.
- Fix:
  - moved full-page background handling to `body`
  - improved header icon contrast
  - prevented light custom palette from overriding dark readability

4. Lookup values not persisting after refresh
- Root cause: lookup path/rules mismatch and evolving storage model.
- Fix:
  - stabilized persistence on user document
  - normalized lookup read/write behavior across System Config and Income screens

5. Lookup model inconsistency in Firestore
- Root cause: mixed legacy and new fields (`incomeSourceLookups` + `lookupItems`).
- Fix:
  - adopted canonical `lookupItems`
  - removed legacy field on save
  - standardized integer `id`
  - switched to enum-based numeric `typeId`

6. Backward compatibility for migrated lookup data
- Root cause: existing rows contained legacy string type fields.
- Fix: added safe fallback mapping from old `type` string to enum `typeId` during reads.

7. New-user bootstrap defaults
- Root cause: some accounts started without lookup seed values.
- Fix:
  - added login-time bootstrap check per UID
  - auto-seeds default income source lookups when none exist
  - avoids overwrite for existing user data

8. UX stability fixes
- Profile dropdown opening caused layout shifts.
- Fix: dropdown anchored as overlay above profile row; row content frozen/ellipsized.

9. Vercel route reload 404 fix
- Root cause: client-side React Router paths were refreshed directly without SPA rewrite support.
- Symptom: `404: NOT_FOUND` on reload for deployed routes.
- Fix: added `vercel.json` rewrite routing all paths to `index.html`.
- Outcome: direct route access and browser refresh now work on Vercel.

10. Light mode outline button text visibility
- Root cause: `.btn` base style forced white text and `.btn-outline` did not override text color.
- Symptom: outline action buttons (for example Delete/Cancel) appeared as rounded borders without readable text in light mode.
- Fix: set `.btn-outline { color: var(--app-text); }`.
- Outcome: outline buttons are readable in both light and dark themes.
