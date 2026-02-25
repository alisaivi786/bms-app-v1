import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PermissionRoute from "./components/PermissionRoute";
import HomeRedirect from "./components/HomeRedirect";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import IncomePage from "./pages/IncomePage";
import BudgetPage from "./pages/BudgetPage";
import ThemePage from "./pages/ThemePage";
import ProfilePage from "./pages/ProfilePage";
import CurrencyPage from "./pages/CurrencyPage";
import UsersPage from "./pages/UsersPage";
import UserCreatePage from "./pages/UserCreatePage";
import SystemConfigPage from "./pages/SystemConfigPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { PERMISSIONS } from "./constants/access";
import RolesPage from "./pages/RolesPage";
import RoleDetailPage from "./pages/RoleDetailPage";
import UserDetailPage from "./pages/UserDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<HomeRedirect />}
        />
        <Route
          path="dashboard-home"
          element={
            <PermissionRoute permission={PERMISSIONS.VIEW_DASHBOARD}>
              <DashboardPage />
            </PermissionRoute>
          }
        />
        <Route
          path="income"
          element={
            <PermissionRoute permission={PERMISSIONS.MANAGE_INCOME}>
              <IncomePage />
            </PermissionRoute>
          }
        />
        <Route
          path="budget"
          element={
            <PermissionRoute permission={PERMISSIONS.MANAGE_BUDGET}>
              <BudgetPage />
            </PermissionRoute>
          }
        />
        <Route
          path="system-config"
          element={
            <PermissionRoute permission={PERMISSIONS.VIEW_SYSTEM_CONFIG}>
              <SystemConfigPage />
            </PermissionRoute>
          }
        />
        <Route
          path="users"
          element={
            <PermissionRoute permission={PERMISSIONS.VIEW_USERS}>
              <UsersPage />
            </PermissionRoute>
          }
        />
        <Route
          path="users/new"
          element={
            <PermissionRoute permission={PERMISSIONS.MANAGE_USERS}>
              <UserCreatePage />
            </PermissionRoute>
          }
        />
        <Route
          path="users/:userId"
          element={
            <PermissionRoute permission={PERMISSIONS.VIEW_USERS}>
              <UserDetailPage />
            </PermissionRoute>
          }
        />
        <Route
          path="roles"
          element={
            <PermissionRoute permission={PERMISSIONS.MANAGE_ROLES}>
              <RolesPage />
            </PermissionRoute>
          }
        />
        <Route
          path="roles/new"
          element={
            <PermissionRoute permission={PERMISSIONS.MANAGE_ROLES}>
              <RoleDetailPage />
            </PermissionRoute>
          }
        />
        <Route
          path="roles/:roleName"
          element={
            <PermissionRoute permission={PERMISSIONS.MANAGE_ROLES}>
              <RoleDetailPage />
            </PermissionRoute>
          }
        />
        <Route
          path="admin"
          element={
            <PermissionRoute permission={PERMISSIONS.VIEW_ADMIN_DASHBOARD}>
              <AdminDashboardPage />
            </PermissionRoute>
          }
        />
        <Route
          path="theme"
          element={
            <PermissionRoute permission={PERMISSIONS.VIEW_THEME}>
              <ThemePage />
            </PermissionRoute>
          }
        />
        <Route
          path="currency"
          element={
            <PermissionRoute permission={PERMISSIONS.VIEW_THEME}>
              <CurrencyPage />
            </PermissionRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PermissionRoute permission={PERMISSIONS.VIEW_PROFILE}>
              <ProfilePage />
            </PermissionRoute>
          }
        />
      </Route>
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
