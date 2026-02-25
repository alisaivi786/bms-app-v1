# BMS - Phase 6 Development

## 1. Phase Goal

Deliver a visual analytics-focused Dashboard with month/year filtering and true chart rendering for Income, Budget, and EMI-related views.

Status: Completed (Current Scope)  
Phase Date: 2026-02-25  
Last Updated: 2026-02-25

---

## 2. Scope Delivered

### 2.1 Dashboard Filters
- Added dashboard-level filters:
  - Month (`Jan..Dec`)
  - Year
- All dashboard cards and charts update based on selected month/year.

### 2.2 KPI Cards (Top Section)
- Final KPI cards shown on dashboard:
  - Account Balance
  - This Month Income
  - Budget Estimated

### 2.3 Visual Charts (True Chart UI)
- Replaced non-chart bar-list style with chart components rendered via SVG:
  - Income Trend (12 months for selected year)
  - Income vs Budget Estimated vs EMI Paid (selected month)
  - Budget by Category (Estimated, selected month)
  - Monthly Debit Trend (12 months for selected year, EMI schedule-based)
  - Monthly Budget Estimated (12 months for selected year)
- Income Trend supports hover tooltip on points (month + amount).
- Removed long inline summary text below charts for cleaner UI.

### 2.4 Data Wiring
- Dashboard now reads and aggregates:
  - `users/{uid}` (account balance context)
  - `users/{uid}/incomes`
  - `users/{uid}/budgets`
  - `users/{uid}/emis`
- Budget data is resolved for selected month/year.
- EMI debt totals are used to derive paid/remaining positions.

### 2.5 UX Improvements
- Replaced static dashboard messaging with dynamic analytics context.
- Preserved existing theme support and responsive layout.
- Kept recent income table for transactional visibility.
- Simplified top KPI area per latest scope (removed extra debt/net cards).

---

## 3. Key Files Updated In Phase 6

- `src/pages/DashboardPage.jsx`

---

## 4. Data Notes

- Budget chart and KPI calculations are currently based on selected month/year budget document:
  - `users/{uid}/budgets/{YYYY-MM}`
- Income trend uses all income records for selected year.
- Monthly Budget Estimated chart aggregates `estimatedAmount` month-wise from yearly budget docs.
- Monthly Debit Trend chart aggregates EMI planned monthly debit from EMI docs using:
  - `startMonth`
  - `startYear`
  - `tenorMonths`
  - `monthlyEmi`
- Debt calculations use EMI docs:
  - `totalPlanned` (fallback: `monthlyEmi * tenorMonths`)
  - `paidAmount`

---

## 5. Hotfixes / Enhancements (Phase 6)

### 2026-02-25
- Enhancement: Added month/year-driven dashboard analytics.
- Enhancement: Implemented SVG-based chart UI (Line, Bar, Donut style cards).
- Enhancement: Added hover tooltip on Income Trend points.
- Enhancement: Removed verbose chart summary strings and moved value visibility into chart visuals.
- Enhancement: Finalized KPI set to `Account Balance`, `This Month Income`, `Budget Estimated`.
- Enhancement: Added `Monthly Debit Trend (Yearly)` chart using EMI month schedule.
- Enhancement: Added `Monthly Budget Estimated (Yearly)` chart across Jan-Dec for selected year.
- Hotfix: Updated debit chart data source from budget actuals to EMI month-wise totals for correct yearly visibility.
