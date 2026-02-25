import { useMemo, useState } from "react";
import { z } from "zod";
import { updatePassword, updateProfile } from "firebase/auth";
import { useAuth } from "../state/AuthContext";
import AlertMessage from "../components/AlertMessage";

const profileSchema = z.object({
  displayName: z.string().trim().min(2, "Display name must be at least 2 characters."),
  photoURL: z.string().trim().url("Avatar must be a valid URL.")
});

const passwordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm password is required.")
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });

export default function ProfilePage() {
  const { user, refreshUser, linkEmailPassword, linkGoogleProvider } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const providerList = useMemo(
    () => (user?.providerData || []).map((item) => item.providerId),
    [user?.providerData]
  );
  const supportsPasswordUpdate = providerList.includes("password");
  const supportsGoogle = providerList.includes("google.com");

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");

    const parsed = profileSchema.safeParse({ displayName, photoURL });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid profile data.");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: parsed.data.displayName,
        photoURL: parsed.data.photoURL
      });
      await refreshUser();
      setStatus("Profile updated successfully.");
    } catch (err) {
      setError("Could not update profile.");
      console.error(err);
    }
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");

    const parsed = passwordSchema.safeParse({ newPassword, confirmPassword });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid password.");
      return;
    }

    try {
      if (supportsPasswordUpdate) {
        await updatePassword(user, parsed.data.newPassword);
        setStatus("Password changed successfully.");
      } else {
        if (!user.email) {
          setError("No email found for this account.");
          return;
        }
        await linkEmailPassword(user.email, parsed.data.newPassword);
        await refreshUser();
        setStatus("Email/Password linked successfully. You can now sign in using password.");
      }
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const code = err?.code || "";
      if (code === "auth/requires-recent-login") {
        setError("For security, please log out and log in again before changing password.");
        return;
      }
      if (code === "auth/provider-already-linked") {
        setError("Password provider is already linked.");
        return;
      }
      setError("Could not change password.");
      console.error(err);
    }
  };

  const handleLinkGoogle = async () => {
    setError("");
    setStatus("");
    try {
      await linkGoogleProvider();
      await refreshUser();
      setStatus("Google provider linked successfully.");
    } catch (err) {
      const code = err?.code || "";
      if (code === "auth/provider-already-linked") {
        setError("Google provider is already linked.");
        return;
      }
      if (code === "auth/popup-closed-by-user") {
        setError("Google linking popup was closed.");
        return;
      }
      setError("Could not link Google provider.");
      console.error(err);
    }
  };

  return (
    <section>
      <h1>Profile Settings</h1>
      <p className="muted">Update your display name, avatar URL, and password.</p>

      <div className="form-grid">
        <form className="form-card" onSubmit={handleProfileUpdate}>
          <h2>Profile Info</h2>
          <div className="field">
            <label htmlFor="displayName">Display Name</label>
            <input
              id="displayName"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Your display name"
            />
          </div>
          <div className="field">
            <label htmlFor="photoURL">Avatar URL</label>
            <input
              id="photoURL"
              value={photoURL}
              onChange={(event) => setPhotoURL(event.target.value)}
              placeholder="https://example.com/avatar.png"
            />
          </div>
          <button className="btn" type="submit">
            Save Profile
          </button>
        </form>

        <form className="form-card" onSubmit={handlePasswordUpdate}>
          <h2>{supportsPasswordUpdate ? "Change Password" : "Set Password"}</h2>
          <p className="muted">
            {supportsPasswordUpdate
              ? "Set a new password for your account."
              : "Google-only account detected. Set password to enable Email/Password sign-in."}
          </p>
          <div className="field">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <button className="btn" type="submit">
            {supportsPasswordUpdate ? "Change Password" : "Set Password"}
          </button>
        </form>

        <div className="form-card">
          <h2>Provider Linking</h2>
          <p className="muted">
            Linked providers: {providerList.length ? providerList.join(", ") : "None"}
          </p>
          {supportsGoogle ? (
            <p className="muted">Google provider already linked.</p>
          ) : (
            <button className="btn" type="button" onClick={handleLinkGoogle}>
              Link Google Provider
            </button>
          )}
        </div>
      </div>

      <AlertMessage type="success" message={status} />
      <AlertMessage type="error" message={error} />
    </section>
  );
}
