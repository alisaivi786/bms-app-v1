import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export default function LoginPage() {
  const { user, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  
  const handleLogin = async () => {
    setError("");
    try {
      await signInWithGoogle();
    } catch (err) {
      const code = err?.code || "";
      const message = err?.message || "Google sign-in failed. Please try again.";

      if (code === "auth/popup-closed-by-user") {
        setError("Sign-in popup was closed before completing login.");
        return;
      }
      if (code === "auth/popup-blocked") {
        setError("Popup was blocked by browser. Allow popups and try again.");
        return;
      }
      if (code === "auth/unauthorized-domain") {
        setError("This domain is not authorized in Firebase Auth settings.");
        return;
      }
      if (code === "auth/operation-not-allowed") {
        setError("Google provider is not enabled in Firebase Authentication.");
        return;
      }
      if (code === "auth/configuration-not-found") {
        setError("Firebase Auth config missing. Enable Authentication and Google provider in Firebase Console.");
        return;
      }

      setError(`${code ? `${code}: ` : ""}${message}`);
      console.error(err);
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <h1>BMS</h1>
        <p>Sign in with Google to manage your personal income records.</p>
        <button className="btn btn-google" onClick={handleLogin}>
          Continue with Google
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
