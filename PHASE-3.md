# BMS - Phase 3 Development

## 1. Phase Goal

Expand authentication from Google-only to multi-provider auth and complete the related admin/user management workflows, permission governance UX, and login experience refinements.

Status: In Progress (Expanded Scope)  
Initial Phase Date: 2026-02-25  
Last Updated: 2026-02-25

---

## 2. Scope Delivered

### 2.1 Authentication Expansion
- Added Email/Password Sign Up.
- Added Email/Password Sign In.
- Kept Google Sign-In in same login flow.
- Added Forgot Password flow (`sendPasswordResetEmail`).

### 2.2 Provider Compatibility and Linking Support
- Added provider-aware login/signup error handling for same-email conflicts.
- Added profile-level provider linking support:
  - Link Google provider to existing account.
  - Link Email/Password provider to existing account.
- Preserved single `users/{uid}` profile bootstrap behavior.

### 2.3 Admin User Provisioning Flow
- Added admin-only user creation screen (`/users/new`).
- Admin can create auth user without logging out current admin session (secondary Firebase Auth app).
- New user profile is created in Firestore with role/tier/permissions.
- Password reset email is triggered for first-time password setup.
- `mustChangePassword` flag stored in user profile for policy tracking.

### 2.4 Access and Role/Tier Management
- Added/used guarded route for user creation with `MANAGE_USERS`.
- Users screen supports role updates and tier updates (except locked admin accounts).
- Admin role remains protected from modification in role/user screens.
- Role permission screen now groups permissions by menu structure:
  - Dashboard
  - Data
  - User Management
  - Setting
  - Profile

### 2.5 Navigation and Menu Alignment
- Added `Data` main menu group in sidebar.
- Moved Income page under Data submenu (`Income`).
- Menu open/active behavior synced with route for grouped sections.

### 2.6 Admin Dashboard Delivery
- Replaced placeholder admin screen with live Firestore analytics:
  - Total users
  - Admin users
  - Configured roles
  - Users by role (chart bars)
  - Users by tier (chart bars)
  - Provider coverage (Google vs Email/Password)
  - Role configuration vs assigned users table

### 2.7 Login UX and Visual Improvements
- Improved login/signup layout alignment and spacing.
- Added professional Google icon button style.
- Added fixed login footer.
- Applied consistent focus states and full-width action buttons.

### 2.8 Notification UX Standardization
- Added reusable `AlertMessage` component.
- Replaced inline success/error messages across key pages with alert boxes.
- Theme-aware alert styles for light and dark modes.

### 2.9 Layout Behavior Refinement
- Main app layout updated so:
  - Header stays fixed
  - Sidebar stays fixed
  - Footer stays fixed
  - Only content body scrolls

---

## 3. Key Files Updated In Phase 3

- `src/state/AuthContext.jsx`
- `src/pages/LoginPage.jsx`
- `src/pages/ProfilePage.jsx`
- `src/utils/CreateUser.js`
- `src/pages/UserCreatePage.jsx`
- `src/pages/UsersPage.jsx`
- `src/pages/RoleDetailPage.jsx`
- `src/pages/AdminDashboardPage.jsx`
- `src/components/AppLayout.jsx`
- `src/components/AlertMessage.jsx`
- `src/styles.css`
- `src/App.jsx`

---

## 4. Firebase Configuration Required

### Authentication
Enable providers in Firebase Console:
1. `Authentication` -> `Sign-in method`
2. Enable:
   - Google
   - Email/Password

### Firestore Rules
Admin features in this phase (users list, role/tier update for other users, admin analytics) require rules that allow admin read/write across user documents.  
If rules stay user-only (`request.auth.uid == userId`), admin updates will fail with permission errors.

Recommended Phase 3 Firestore rules:

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
    }
  }
}
```

---

## 5. Known Notes

- `mustChangePassword` is currently stored as policy metadata; enforcement can be expanded later at app login gate level.
- Admin tier/role lock behavior is intentional to protect core admin access.
- User provisioning is client-admin driven today; long term, Cloud Functions can be used for stronger server-side control.

---

## 6. Hotfixes and Enhancements (Phase 3)

### 2026-02-25
- Added Forgot Password on login screen.
- Added admin-only create-user flow with password reset email.
- Renamed user creation utility to `CreateUser.js`.
- Added standardized alert-box notifications across screens.
- Polished login UI with Google icon button and alignment updates.
- Added fixed login footer.
- Implemented fixed header/sidebar/footer with scrollable content body.
- Grouped role permissions by sidebar menu grouping.
- Added `Data` menu group and moved Income under Data.
- Replaced empty Admin dashboard with live charts and metrics.
