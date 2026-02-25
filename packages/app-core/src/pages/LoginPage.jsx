import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { z } from "zod";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../firebase";
import AlertMessage from "../components/AlertMessage";

const emailSchema = z.string().email("Enter a valid email address.");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters.");

export default function LoginPage() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, sendPasswordReset } = useAuth();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }
  const handleLogin = async () => {
    setError("");
    setStatus("");
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
      if (code === "auth/account-exists-with-different-credential") {
        setError("This email already exists with another sign-in method. Sign in first, then link providers in Profile Settings.");
        return;
      }

      setError(`${code ? `${code}: ` : ""}${message}`);
      console.error(err);
    }
  };

  const handleEmailAuth = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");

    const parsedEmail = emailSchema.safeParse(email);
    if (!parsedEmail.success) {
      setError(parsedEmail.error.issues[0]?.message || "Invalid email.");
      return;
    }

    const parsedPassword = passwordSchema.safeParse(password);
    if (!parsedPassword.success) {
      setError(parsedPassword.error.issues[0]?.message || "Invalid password.");
      return;
    }

    try {
      if (mode === "signup") {
        await signUpWithEmail(parsedEmail.data, parsedPassword.data);
      } else {
        await signInWithEmail(parsedEmail.data, parsedPassword.data);
      }
    } catch (err) {
      const code = err?.code || "";
      if (code === "auth/email-already-in-use") {
        const methods = await fetchSignInMethodsForEmail(auth, parsedEmail.data);
        if (methods.includes("google.com") && !methods.includes("password")) {
          setError("This email is registered with Google. Please use Continue with Google.");
          return;
        }
        setError("This email is already registered. Please sign in.");
        return;
      }
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        const methods = await fetchSignInMethodsForEmail(auth, parsedEmail.data);
        if (methods.includes("google.com") && !methods.includes("password")) {
          setError("This email uses Google sign-in. Use Continue with Google.");
          return;
        }
        setError("Invalid email or password.");
        return;
      }
      if (code === "auth/user-not-found") {
        setError("No account found for this email.");
        return;
      }
      setError(err?.message || "Email authentication failed.");
      console.error(err);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setStatus("");
    const parsedEmail = emailSchema.safeParse(email);
    if (!parsedEmail.success) {
      setError("Enter your email first, then click Reset Password.");
      return;
    }
    try {
      await sendPasswordReset(parsedEmail.data);
      setStatus("Password reset email sent. Check your inbox.");
    } catch (err) {
      const code = err?.code || "";
      if (code === "auth/user-not-found") {
        setError("No account found for this email.");
        return;
      }
      setError(err?.message || "Could not send password reset email.");
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <h1>BMS</h1>
        <p className="login-subtext">
          Sign in with Google or Email/Password to manage your personal records.
        </p>
        <div className="auth-mode-toggle">
          <button
            className={`btn btn-outline ${mode === "signin" ? "active-auth-mode" : ""}`}
            onClick={() => setMode("signin")}
            type="button"
          >
            Sign In
          </button>
          <button
            className={`btn btn-outline ${mode === "signup" ? "active-auth-mode" : ""}`}
            onClick={() => setMode("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>
        <form className="login-form" onSubmit={handleEmailAuth}>
          <div className="field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button className="btn login-primary-btn" type="submit">
            {mode === "signup" ? "Create Account" : "Sign In"}
          </button>
        </form>
        {mode === "signin" ? (
          <button
            className="btn btn-outline login-secondary-btn"
            type="button"
            onClick={handleForgotPassword}
          >
            Forgot Password
          </button>
        ) : null}
        <div className="auth-divider">OR</div>
        <button className="btn btn-google login-primary-btn login-google-btn" onClick={handleLogin}>
          <span className="google-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 0.8 3.7 1.5l2.5-2.4C16.7 3.6 14.6 2.7 12 2.7 6.9 2.7 2.8 6.8 2.8 12s4.1 9.3 9.2 9.3c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1.1-.2-1.5H12z"
              />
              <path
                fill="#34A853"
                d="M3.8 7.6l3.2 2.4c.9-2.7 3-4 5-4 1.8 0 3 0.8 3.7 1.5l2.5-2.4C16.7 3.6 14.6 2.7 12 2.7c-3.5 0-6.6 2-8.2 4.9z"
              />
              <path
                fill="#4A90E2"
                d="M12 21.3c2.5 0 4.6-.8 6.1-2.2l-2.8-2.3c-.8.6-1.9 1.1-3.3 1.1-3.7 0-5.2-2.6-5.5-3.9l-3.2 2.5c1.6 3 4.7 4.8 8.7 4.8z"
              />
              <path
                fill="#FBBC05"
                d="M3.3 16.5l3.2-2.5c-.2-.6-.3-1.2-.3-2s.1-1.4.3-2L3.3 7.6C2.8 8.8 2.5 10.4 2.5 12s.3 3.2.8 4.5z"
              />
            </svg>
          </span>
          <span>Continue with Google</span>
        </button>
        <AlertMessage type="error" message={error} />
        <AlertMessage type="success" message={status} />
      </div>
      <footer className="login-footer">
        © {new Date().getFullYear()} BMS. All rights reserved. Developer: ALI
      </footer>
    </div>
  );
}
