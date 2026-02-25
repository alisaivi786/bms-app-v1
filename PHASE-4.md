# BMS - Phase 4 Development

## 1. Phase Goal

Deliver budget planning workflows, improve income operations UX, and stabilize lookup/category data integrity across pages.

Status: Completed (Current Scope)  
Phase Date: 2026-02-25

---

## 2. Scope Delivered

### 2.1 Budget Module (New)
- Added `Budget` screen under `Data` menu.
- Added month/year-based budget planning with Firestore persistence:
  - `users/{uid}/budgets/{YYYY-MM}`
- Added category-wise budget sections.
- Added row-level editing for:
  - Column Name
  - Estimated Amount
  - Actual Amount
- Added right-side `Category Totals` panel (actual totals + grand total).

### 2.2 Budget Modal Workflows
- Added `Add Budget` modal flow (form inside modal).
- Added `Predefined Budget` mode:
  - choose year
  - select multiple months
  - save same row to selected months
- Added `Add Category` modal (custom user category creation).

### 2.3 Budget Data Model and Integrity
- Budget rows now persist numeric IDs:
  - `id` (number)
  - `categoryId` (number)
- Amount inputs are text in UI but saved as numeric values in DB.
- Empty amount input is handled as `0` during persistence.
- Category mapping now resolves by `categoryId` (not only text).
- Fixed row action targeting:
  - delete/edit now applies only to selected row.

### 2.4 Lookup and Category Stability Fixes
- Added Budget Category lookup type in lookup constants.
- Added default budget categories in bootstrap lookup list.
- Fixed lookup write safety so budget operations do not wipe income source lookups.
- Fixed startup timing issue where budget category seeding could overwrite lookup data.
- Added validation to block deleting budget category lookup when associated budget records exist.
  - Error shown: `You cannot delete this category. It is associated with other records.`

### 2.5 Income UX Upgrade
- Income page converted to grid-first workflow.
- Added `Add Income` button + modal form.
- Added income grid pagination.
- Added delete action in income grid.
- On income delete:
  - corresponding income doc is removed
  - `accountBalance` is decremented by deleted amount

### 2.6 Balance Model Update
- Renamed and migrated app usage from `initialBalance` to `accountBalance`.
- `accountBalance` is now persisted to Firestore and shown on Dashboard.
- Dashboard `Initial Balance` card removed.
- Backward compatibility retained via fallback reads from legacy `initialBalance`.

### 2.7 Dropdown and UI Consistency
- System Configuration lookup type selector migrated to custom dropdown style.
- Login and budget modal visual improvements continued (button, panel, spacing, and modal polish).
- Sidebar menu text increased slightly for readability.

---

## 3. Firebase / Data Notes

### 3.1 Budget Data Path
- `users/{uid}/budgets/{YYYY-MM}` with row items array.

### 3.2 Lookup Data Path
- `users/{uid}.lookupItems[]`
- Includes:
  - income source lookups
  - budget category lookups

### 3.3 Account Balance Field
- `users/{uid}.accountBalance` (number)
- Legacy fallback: `initialBalance` still read when needed.

---

## 4. Key Files Updated (Phase 4)

- `src/pages/BudgetPage.jsx`
- `src/pages/IncomePage.jsx`
- `src/pages/DashboardPage.jsx`
- `src/pages/SystemConfigPage.jsx`
- `src/components/AppLayout.jsx`
- `src/constants/lookupTypes.js`
- `src/constants/access.js`
- `src/constants/months.js` (new)
- `src/state/financeStore.js`
- `src/App.jsx`
- `src/styles.css`

---

## 5. Hotfix Summary (Phase 4)

### 2026-02-25
- Fixed budget category misrouting to `Other` during edit/delete flow.
- Fixed synthetic category labels (`Category X`) leaking into category tabs.
- Fixed lookup overwrite path that could remove income source lookups.
- Added guard against deleting in-use budget categories.
- Standardized month names to `Jan..Dec` in relevant filters/displays.

