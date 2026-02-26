import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { z } from "zod";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { CreateUser } from "../utils/CreateUser";
import { isAdminEmail } from "../constants/admin";
import { ROLE_PRESETS, TIER_OPTIONS, defaultPermissionsFor, normalizePermissions } from "../constants/access";
import AlertMessage from "../components/AlertMessage";
import CustomSelect from "../components/CustomSelect";

const emailSchema = z.string().email("Enter a valid email address.");

function buildTempPassword() {
  const random = Math.random().toString(36).slice(-8);
  return `Bms#${random}9`;
}

export default function UserCreatePage() {
  const navigate = useNavigate();
  const { user, sendPasswordReset } = useAuth();
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [customRoles, setCustomRoles] = useState([]);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("user");
  const [tier, setTier] = useState("basic");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadAdminContext = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = snap.exists() ? snap.data() : {};
        setIsAdmin(Boolean(data.isAdmin) || isAdminEmail(user.email));
        setCustomRoles(Array.isArray(data.customRoles) ? data.customRoles : []);
      } catch (err) {
        setIsAdmin(isAdminEmail(user.email));
      } finally {
        setCheckingAccess(false);
      }
    };
    loadAdminContext();
  }, [user.email, user.uid]);

  const roleOptions = useMemo(() => {
    const seen = new Set();
    const ordered = [...Object.keys(ROLE_PRESETS), ...customRoles.map((item) => String(item.name || "").trim())];
    return ordered
      .filter((name) => name)
      .filter((name) => {
        const key = name.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((name) => ({ value: name, label: name }));
  }, [customRoles]);

  const getRolePermissions = (roleName) => {
    if (ROLE_PRESETS[roleName]) return defaultPermissionsFor(roleName, tier);
    const custom = customRoles.find((item) => item.name === roleName);
    return normalizePermissions("user", custom?.permissions, tier);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setError("");

    const parsedEmail = emailSchema.safeParse(email.trim());
    if (!parsedEmail.success) {
      setError(parsedEmail.error.issues[0]?.message || "Invalid email.");
      return;
    }
    if (!roleOptions.some((item) => item.value === role)) {
      setError("Invalid role selected.");
      return;
    }

    setSaving(true);
    try {
      const temporaryPassword = buildTempPassword();
      const uid = await CreateUser(parsedEmail.data, temporaryPassword);
      const permissions = getRolePermissions(role);

      await setDoc(
        doc(db, "users", uid),
        {
          uid,
          email: parsedEmail.data,
          displayName: displayName.trim(),
          photoURL: "",
          role,
          tier,
          isAdmin: role === "admin",
          permissions,
          currency: role === "admin" ? null : null,
          accountBalance: role === "admin" ? null : null,
          mustChangePassword: true,
          authProviders: ["password"],
          createdBy: user.uid,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      await sendPasswordReset(parsedEmail.data);
      setStatus("User created. Password reset email sent.");
      setEmail("");
      setDisplayName("");
      setRole("user");
      setTier("basic");
      navigate("/users");
    } catch (err) {
      const code = err?.code || "";
      if (code === "auth/email-already-in-use") {
        setError("This email already has an account.");
      } else {
        setError(err?.message || "Could not create user.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (checkingAccess) {
    return (
      <section>
        <h1>Create User</h1>
        <p className="muted">Checking access...</p>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section>
        <h1>Create User</h1>
        <AlertMessage
          type="error"
          message="Access denied. This screen is only available for admin users."
        />
      </section>
    );
  }

  return (
    <section>
      <h1>Create User</h1>
      <p className="muted">Create a user account and send password reset email for first login.</p>
      <AlertMessage type="error" message={error} />
      <AlertMessage type="success" message={status} />
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="new-user-email">Email</label>
            <input
              id="new-user-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="user@bms.com"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="new-user-name">Display Name</label>
            <input
              id="new-user-name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="User Name"
            />
          </div>
          <div className="field">
            <label htmlFor="new-user-role">Role</label>
            <CustomSelect id="new-user-role" value={role} onChange={(value) => setRole(String(value))} options={roleOptions} />
          </div>
          <div className="field">
            <label htmlFor="new-user-tier">Tier</label>
            <CustomSelect
              id="new-user-tier"
              value={tier}
              onChange={(value) => setTier(String(value))}
              options={TIER_OPTIONS.map((item) => ({ value: item, label: item }))}
            />
          </div>
          <div className="row-field">
            <button className="btn" type="submit" disabled={saving}>
              {saving ? "Creating..." : "Create User"}
            </button>
            <Link className="btn btn-outline" to="/users">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
