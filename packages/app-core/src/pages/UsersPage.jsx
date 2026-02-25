import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { isAdminEmail } from "../constants/admin";
import { ROLE_PRESETS, TIER_OPTIONS, normalizePermissions } from "../constants/access";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";

export default function UsersPage() {
  const PAGE_SIZE = 8;
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [customRoles, setCustomRoles] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const userSnap = await getDoc(doc(db, "users", user.uid));
        const data = userSnap.exists() ? userSnap.data() : {};
        setIsAdmin(Boolean(data.isAdmin) || isAdminEmail(user.email));
      } catch (err) {
        setIsAdmin(isAdminEmail(user.email));
      } finally {
        setCheckingAccess(false);
      }
    };
    checkAccess();
  }, [user.email, user.uid]);

  useEffect(() => {
    if (!isAdmin) return undefined;
    const usersQuery = query(collection(db, "users"), orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(
      usersQuery,
      (snapshot) => {
        setUsers(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
        setError("");
      },
      (err) => {
        setError(err?.message || "Could not load users list.");
      }
    );
    return unsubscribe;
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return undefined;
    const adminRef = doc(db, "users", user.uid);
    const unsub = onSnapshot(adminRef, (snap) => {
      const data = snap.exists() ? snap.data() : {};
      setCustomRoles(Array.isArray(data.customRoles) ? data.customRoles : []);
    });
    return unsub;
  }, [isAdmin, user.uid]);

  const getRolePermissions = (roleName) => {
    if (ROLE_PRESETS[roleName]) return normalizePermissions(roleName, []);
    const custom = customRoles.find((r) => r.name === roleName);
    return normalizePermissions("user", custom?.permissions || []);
  };

  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
  const pageStart = (page - 1) * PAGE_SIZE;
  const pagedUsers = users.slice(pageStart, pageStart + PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  if (checkingAccess) {
    return (
      <section>
        <h1>Users</h1>
        <p className="muted">Checking access...</p>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section>
        <h1>Users</h1>
        <AlertMessage
          type="error"
          message="Access denied. This screen is only available for admin users."
        />
      </section>
    );
  }

  return (
    <section>
      <h1>Users</h1>
      <p className="muted">All registered user profiles available in Firestore.</p>

      <AlertMessage type="error" message={error} />
      <AlertMessage type="success" message={status} />

      <div className="table-card">
        <div className="role-grid-toolbar">
          <span className="muted">User list and role assignment.</span>
          <Link className="btn btn-inline" to="/users/new">
            Add User
          </Link>
        </div>
        {users.length === 0 ? (
          <p className="muted">No user records found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>UID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Tier</th>
                <th>Action</th>
                <th>Currency</th>
                <th>Account Balance</th>
              </tr>
            </thead>
            <tbody>
              {pagedUsers.map((user) => {
                const isLockedAdmin =
                  (user.role || (user.isAdmin ? "admin" : "user")) === "admin" ||
                  Boolean(user.isAdmin) ||
                  isAdminEmail(user.email);
                return (
                  <tr key={user.id}>
                    <td>{user.uid || user.id}</td>
                    <td>{user.displayName || "-"}</td>
                    <td>{user.email || "-"}</td>
                    <td>
                      <select
                        value={user.role || (user.isAdmin ? "admin" : "user")}
                        disabled={isLockedAdmin}
                        onChange={async (event) => {
                          const nextRole = event.target.value;
                          const nextTier = user.tier || "basic";
                          const nextPermissions = normalizePermissions(
                            nextRole,
                            getRolePermissions(nextRole),
                            nextTier
                          );
                          try {
                            await setDoc(
                              doc(db, "users", user.id),
                              {
                                role: nextRole,
                                isAdmin: nextRole === "admin",
                                permissions: nextPermissions,
                                updatedAt: serverTimestamp()
                              },
                              { merge: true }
                            );
                            setStatus(`Updated role for ${user.email || user.id}.`);
                          } catch (err) {
                            setError("Could not update role.");
                          }
                        }}
                      >
                        {Object.keys(ROLE_PRESETS)
                          .filter((role) => role !== "admin")
                          .map((role) => (
                          <option
                            key={role}
                            value={role}
                            disabled={isLockedAdmin && role !== "admin"}
                          >
                            {role}
                          </option>
                          ))}
                        {isLockedAdmin ? (
                          <option value="admin">admin</option>
                        ) : null}
                        {customRoles.map((role) => (
                          <option key={role.name} value={role.name}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={user.tier || "basic"}
                        disabled={isLockedAdmin}
                        onChange={async (event) => {
                          const nextTier = event.target.value;
                          const nextRole = user.role || (user.isAdmin ? "admin" : "user");
                          const targetEmail = user.email || user.id;
                          const nextPermissions = normalizePermissions(
                            nextRole,
                            getRolePermissions(nextRole),
                            nextTier
                          );
                          try {
                            await setDoc(
                              doc(db, "users", user.id),
                              {
                                tier: nextTier,
                                permissions: nextPermissions,
                                updatedAt: serverTimestamp()
                              },
                              { merge: true }
                            );
                            setStatus(`Updated tier for ${targetEmail}.`);
                          } catch (err) {
                            setError("Could not update tier.");
                          }
                        }}
                      >
                        {TIER_OPTIONS.map((tier) => (
                          <option key={tier} value={tier}>
                            {tier}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <Link className="btn btn-inline" to={`/users/${user.id}`}>
                        View
                      </Link>
                    </td>
                    <td>{isLockedAdmin ? "-" : user.currency || "USD"}</td>
                    <td>{isLockedAdmin ? "-" : user.accountBalance ?? user.initialBalance ?? 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {users.length > 0 ? (
          <div className="grid-pagination">
            <button
              className="btn btn-inline btn-outline"
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-inline btn-outline"
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
