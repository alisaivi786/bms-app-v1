# BMS - Phase 7 Development

## 1. Phase Goal

Deliver a first-login onboarding journey that introduces BMS features with a polished visual experience and guided user flow.

Status: Completed (Current Scope)  
Phase Date: 2026-02-25  
Last Updated: 2026-02-25

---

## 2. Scope Delivered

### 2.1 First-Login Onboarding Flow
- Added dedicated onboarding route: `/onboarding`.
- Added route guard behavior in app layout:
  - if `onboardingCompleted === false` -> redirect user to onboarding
  - if completed -> normal app routing continues.
- Onboarding route is rendered in full-screen mode (without standard sidebar/header/footer layout).

### 2.2 Firestore Profile Flags
- Added profile flag support:
  - `users/{uid}.onboardingCompleted`
  - `users/{uid}.onboardingCompletedAt`
- User bootstrap now defaults `onboardingCompleted` to `false` when missing.
- Completing or skipping onboarding updates user profile with merge write.

### 2.3 Existing User Behavior
- Existing users with flag explicitly set to `false` are forced to onboarding after login.
- Users with missing/undefined onboarding flag are now treated as `false` (forced onboarding), then updated to `true` after completion.

### 2.4 Onboarding Content and UX
- Implemented multi-step journey with:
  - `Next`
  - `Back`
  - `Skip`
  - `Get Started`
- Personalized greeting:
  - `Welcome, {displayName}`
  - fallback: `Welcome, Dear Customer`
- Added progress dots and step transition animation.

### 2.5 Feature Tour Screens Included
- Dashboard overview
- Income tracking
- Budget planning
- EMI management
- Lookup configuration (Income Source + Budget Category guidance)
- Dashboard insights
- Profile/theme/currency personalization

### 2.6 Visual Design Enhancements
- Added aesthetic onboarding design with:
  - soft gradient card treatment
  - animated floating background bubbles
  - varied bubble colors/sizes/speeds
  - UI-style preview mocks per step (cards, rows, bars, actions)

---

## 3. Firebase / Rules Notes

- No new Firestore rule type required if user self-update is already allowed:
  - user must be able to update own `users/{uid}` document.
- Onboarding completion writes:
  - `onboardingCompleted: true`
  - `onboardingCompletedAt: serverTimestamp()`
  - `updatedAt: serverTimestamp()`

---

## 4. Key Files Updated In Phase 7

- `src/pages/OnboardingPage.jsx` (new)
- `src/components/AppLayout.jsx`
- `src/App.jsx`
- `src/styles.css`

---

## 5. Hotfixes / Enhancements (Phase 7)

### 2026-02-25
- Enhancement: Added full onboarding journey route and first-login redirect behavior.
- Enhancement: Added personalized welcome with fallback name handling.
- Enhancement: Added Lookup-focused onboarding step for `Income Source` and `Budget Category`.
- Enhancement: Upgraded onboarding visual background with larger, faster, multi-color animated bubbles.
- Enhancement: Improved onboarding with richer UI mock previews to demonstrate real BMS workflow.
- Hotfix: Corrected onboarding bootstrap logic so missing flag defaults to `false`, ensuring onboarding is shown and completion updates the flag to `true`.
