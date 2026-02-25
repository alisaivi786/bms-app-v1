import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PermissionRoute from "./components/PermissionRoute";
import HomeRedirect from "./components/HomeRedirect";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import IncomePage from "./pages/IncomePage";
import BudgetPage from "./pages/BudgetPage";
import EmiPage from "./pages/EmiPage";
import ThemePage from "./pages/ThemePage";
import ProfilePage from "./pages/ProfilePage";
import CurrencyPage from "./pages/CurrencyPage";
import SystemConfigPage from "./pages/SystemConfigPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { PERMISSIONS } from "./constants/access";
import OnboardingPage from "./pages/OnboardingPage";

export default function AppPortal() {
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
        <Route index element={<HomeRedirect />} />
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
          path="emi"
          element={
            <PermissionRoute permission={PERMISSIONS.MANAGE_EMI}>
              <EmiPage />
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
        <Route path="onboarding" element={<OnboardingPage />} />
      </Route>
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
