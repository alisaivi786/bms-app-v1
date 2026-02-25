import { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { PERMISSIONS, ROLE_PRESETS, normalizePermissions } from "../constants/access";
import AlertMessage from "../components/AlertMessage";

const PERMISSION_GROUPS = [
  {
    title: "Dashboard",
    items: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_ADMIN_DASHBOARD]
  },
  {
    title: "Data",
    items: [PERMISSIONS.MANAGE_INCOME, PERMISSIONS.MANAGE_BUDGET, PERMISSIONS.MANAGE_EMI]
  },
  {
    title: "User Management",
    items: [PERMISSIONS.VIEW_USERS, PERMISSIONS.MANAGE_USERS, PERMISSIONS.MANAGE_ROLES]
  },
  {
    title: "Setting",
    items: [PERMISSIONS.VIEW_SYSTEM_CONFIG, PERMISSIONS.VIEW_THEME]
  },
  {
    title: "Profile",
    items: [PERMISSIONS.VIEW_PROFILE]
  }
];

export default function RoleDetailPage() {
  const { roleName } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isCreateMode = roleName === "new";
  const [customRoles, setCustomRoles] = useState([]);
  const [roleInput, setRoleInput] = useState(isCreateMode ? "" : roleName);
  const [selectedPerms, setSelectedPerms] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const isAdminRole = roleName === "admin" || roleInput === "admin";

  useEffect(() => {
    const adminRef = doc(db, "users", user.uid);
    const unsub = onSnapshot(adminRef, (snap) => {
      const data = snap.exists() ? snap.data() : {};
      const roles = Array.isArray(data.customRoles) ? data.customRoles : [];
      setCustomRoles(roles);
    });
    return unsub;
  }, [user.uid]);

  const mergedRole = useMemo(() => {
    if (isCreateMode) return [];
    const custom = customRoles.find((r) => r.name === roleName);
    if (custom && Array.isArray(custom.permissions)) {
      return [...new Set(custom.permissions)];
    }
    const base = ROLE_PRESETS[roleName] || [];
    return [...new Set(base)];
  }, [customRoles, isCreateMode, roleName]);

  useEffect(() => {
    if (!isCreateMode) {
      setSelectedPerms(mergedRole);
    }
  }, [isCreateMode, mergedRole]);

  const saveRole = async () => {
    setError("");
    setStatus("");
    const normalizedRoleName = roleInput.trim().toLowerCase();
    if (!normalizedRoleName) {
      setError("Role name is required.");
      return;
    }
    if (isAdminRole && isCreateMode) {
      setError("Admin role is reserved and cannot be created manually.");
      return;
    }
    if (selectedPerms.length === 0) {
      setError("Select at least one permission.");
      return;
    }
    try {
      const normalized = [...new Set(selectedPerms)];
      const existing = customRoles.filter((r) => r.name !== normalizedRoleName);
      const nextRoles = [...existing, { name: normalizedRoleName, permissions: normalized }];
      await setDoc(
        doc(db, "users", user.uid),
        { customRoles: nextRoles, updatedAt: serverTimestamp() },
        { merge: true }
      );

      const usersByRole = await getDocs(
        query(collection(db, "users"), where("role", "==", normalizedRoleName))
      );
      await Promise.all(
        usersByRole.docs.map((row) =>
          setDoc(
            doc(db, "users", row.id),
            { permissions: normalized, updatedAt: serverTimestamp() },
            { merge: true }
          )
        )
      );
      setStatus("Role permissions saved and applied to assigned users.");
      if (isCreateMode) {
        navigate(`/roles/${normalizedRoleName}`, { replace: true });
      }
    } catch (err) {
      setError("Failed to save role permissions.");
    }
  };

  return (
    <section className="role-page">
      <div className="section-head">
        <h1>{isCreateMode ? "Create Role" : "Role Detail"}</h1>
        <p className="muted">Top section for role fields, below section for permission policy.</p>
      </div>
      <AlertMessage type="success" message={status} />
      <AlertMessage type="error" message={error} />

      <div className="form-card role-detail-card">
        <h2>Role Info</h2>
        <div className="field">
          <label>Role Name</label>
          <input
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
            disabled={!isCreateMode}
          />
        </div>
      </div>

      <div className="form-card role-detail-card">
        <h2>Permissions</h2>
        <div className="perm-grid role-perm-grid">
          {PERMISSION_GROUPS.map((group) => (
            <div key={group.title} className="perm-chip">
              <strong>{group.title}</strong>
              <div className="perm-grid perm-group-items">
                {group.items.map((perm) => (
                  <label className="perm-item" key={perm}>
              <input
                type="checkbox"
                checked={selectedPerms.includes(perm)}
                onChange={(event) =>
                  setSelectedPerms((prev) =>
                    event.target.checked
                            ? [...new Set([...prev, perm])]
                            : prev.filter((item) => item !== perm)
                        )
                      }
                    />
                    <span>{perm}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="role-detail-actions">
          <button className="btn" type="button" onClick={saveRole}>
            Save Permissions
          </button>
        </div>
      </div>
    </section>
  );
}
