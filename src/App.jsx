import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import IncomePage from "./pages/IncomePage";
import ThemePage from "./pages/ThemePage";
import ProfilePage from "./pages/ProfilePage";
import CurrencyPage from "./pages/CurrencyPage";
import UsersPage from "./pages/UsersPage";
import SystemConfigPage from "./pages/SystemConfigPage";

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
        <Route index element={<DashboardPage />} />
        <Route path="income" element={<IncomePage />} />
        <Route path="system-config" element={<SystemConfigPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="theme" element={<ThemePage />} />
        <Route path="currency" element={<CurrencyPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
