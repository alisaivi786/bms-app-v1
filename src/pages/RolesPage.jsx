import { useEffect, useMemo, useState } from "react";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { ROLE_PRESETS } from "../constants/access";
import AlertMessage from "../components/AlertMessage";

export default function RolesPage() {
  const PAGE_SIZE = 8;
  const { user } = useAuth();
  const [customRoles, setCustomRoles] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.exists() ? snap.data() : {};
      const roles = Array.isArray(data.customRoles) ? data.customRoles : [];
      setCustomRoles(roles);
    });
    return unsub;
  }, [user.uid]);

  const presetNames = useMemo(() => Object.keys(ROLE_PRESETS), []);
  const allRoles = useMemo(() => {
    const presetRows = presetNames.map((name) => ({
      name,
      permissions: ROLE_PRESETS[name],
      preset: true
    }));
    const customRows = customRoles.map((role) => ({
      name: role.name,
      permissions: role.permissions || [],
      preset: false
    }));
    const merged = [...presetRows];
    customRows.forEach((row) => {
      const index = merged.findIndex((item) => item.name === row.name);
      if (index >= 0) merged[index] = { ...merged[index], ...row };
      else merged.push(row);
    });
    return merged.sort((a, b) => a.name.localeCompare(b.name));
  }, [customRoles, presetNames]);

  const filteredRoles = allRoles.filter((role) =>
    role.name.toLowerCase().includes(filter.trim().toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filteredRoles.length / PAGE_SIZE));
  const pageStart = (page - 1) * PAGE_SIZE;
  const pagedRoles = filteredRoles.slice(pageStart, pageStart + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const saveRoles = async (roles) => {
    await setDoc(
      doc(db, "users", user.uid),
      { customRoles: roles, updatedAt: serverTimestamp() },
      { merge: true }
    );
  };

  const deleteRole = async (roleName) => {
    setError("");
    setStatus("");
    try {
      const next = customRoles.filter((r) => r.name !== roleName);
      await saveRoles(next);
      setStatus("Role deleted.");
    } catch (err) {
      setError("Failed to delete role.");
    }
  };

  return (
    <section className="role-page">
      <div className="section-head">
        <h1>Role Management</h1>
        <p className="muted">Filter roles and open role form for create/edit.</p>
      </div>
      <AlertMessage type="error" message={error} />
      <AlertMessage type="success" message={status} />

      <div className="table-card role-table-card">
        <div className="role-grid-toolbar">
          <input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Filter by role name"
          />
          <Link className="btn btn-inline" to="/roles/new">
            Add Role
          </Link>
        </div>

        {filteredRoles.length === 0 ? (
          <p className="muted">No roles found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Permissions</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pagedRoles.map((role) => (
                <tr key={role.name}>
                  <td>
                    <strong>{role.name}</strong>
                  </td>
                  <td className="role-perm-cell">{(role.permissions || []).join(", ")}</td>
                  <td>{role.preset ? "Preset" : "Custom"}</td>
                  <td>
                    <Link className="btn btn-inline" to={`/roles/${role.name}`}>
                      View
                    </Link>
                    {!role.preset ? (
                      <button
                        className="btn btn-inline btn-outline"
                        onClick={() => deleteRole(role.name)}
                      >
                        Delete
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {filteredRoles.length > 0 ? (
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
