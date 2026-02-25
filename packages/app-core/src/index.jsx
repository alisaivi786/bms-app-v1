import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./state/AuthContext";
import ThemeApplier from "./components/ThemeApplier";
import AppPortal from "./AppPortal";
import AppAdmin from "./AppAdmin";
import "./styles.css";

function AppRuntime({ AppComponent }) {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ThemeApplier />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500
            }}
          />
          <AppComponent />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export function PortalMain() {
  return <AppRuntime AppComponent={AppPortal} />;
}

export function AdminMain() {
  return <AppRuntime AppComponent={AppAdmin} />;
}
