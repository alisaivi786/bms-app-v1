import { useEffect, useMemo, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { ROLE_PRESETS, TIER_OPTIONS } from "../constants/access";
import { isAdminEmail } from "../constants/admin";
import AlertMessage from "../components/AlertMessage";

function StatCard({ label, value, hint }) {
  return (
    <article className="card">
      <h2>{label}</h2>
      <p>{value}</p>
      <small className="muted">{hint}</small>
    </article>
  );
}

function DistributionChart({ title, rows, emptyText }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <div className="table-card admin-chart-card">
      <h3>{title}</h3>
      {rows.length === 0 ? (
        <p className="muted">{emptyText}</p>
      ) : (
        <div className="admin-bars">
          {rows.map((row) => (
            <div className="admin-bar-row" key={row.label}>
              <div className="admin-bar-meta">
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
              <div className="admin-bar-track">
                <div
                  className="admin-bar-fill"
                  style={{ width: `${Math.max(6, (row.value / max) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [customRoles, setCustomRoles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        setUsers(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
        setError("");
      },
      (err) => {
        setError(err?.message || "Could not load admin analytics.");
      }
    );

    const unsubAdminDoc = onSnapshot(doc(db, "users", user.uid), (snap) => {
      const data = snap.exists() ? snap.data() : {};
      setCustomRoles(Array.isArray(data.customRoles) ? data.customRoles : []);
    });

    return () => {
      unsubUsers();
      unsubAdminDoc();
    };
  }, [user.uid]);

  const roleCatalog = useMemo(() => {
    const preset = Object.entries(ROLE_PRESETS).map(([name, permissions]) => ({
      name,
      permissions
    }));
    const combined = [...preset];
    customRoles.forEach((role) => {
      const index = combined.findIndex((item) => item.name === role.name);
      if (index >= 0) {
        combined[index] = { ...combined[index], permissions: role.permissions || [] };
      } else {
        combined.push({ name: role.name, permissions: role.permissions || [] });
      }
    });
    return combined.sort((a, b) => a.name.localeCompare(b.name));
  }, [customRoles]);

  const analytics = useMemo(() => {
    const roleCounts = {};
    const tierCounts = {};
    const providerCounts = { google: 0, password: 0 };
    let adminCount = 0;

    TIER_OPTIONS.forEach((tier) => {
      tierCounts[tier] = 0;
    });

    users.forEach((item) => {
      const role = item.role || (item.isAdmin || isAdminEmail(item.email) ? "admin" : "user");
      const tier = item.tier || (role === "admin" ? "pro" : "basic");
      const providers = Array.isArray(item.authProviders) ? item.authProviders : [];

      roleCounts[role] = (roleCounts[role] || 0) + 1;
      tierCounts[tier] = (tierCounts[tier] || 0) + 1;
      if (role === "admin") adminCount += 1;
      if (providers.includes("google.com")) providerCounts.google += 1;
      if (providers.includes("password")) providerCounts.password += 1;
    });

    const roleRows = Object.entries(roleCounts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
    const tierRows = Object.entries(tierCounts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
    const providerRows = [
      { label: "Google", value: providerCounts.google },
      { label: "Email/Password", value: providerCounts.password }
    ];

    const roleHealth = roleCatalog.map((role) => ({
      ...role,
      userCount: roleCounts[role.name] || 0
    }));

    return {
      totalUsers: users.length,
      adminCount,
      roleRows,
      tierRows,
      providerRows,
      roleHealth
    };
  }, [roleCatalog, users]);

  return (
    <section>
      <h1>Admin Dashboard</h1>
      <p className="muted">Live user/role/tier visibility from Firestore configuration.</p>
      <AlertMessage type="error" message={error} />

      <div className="cards">
        <StatCard label="Total Users" value={analytics.totalUsers} hint="Registered profiles in users collection" />
        <StatCard label="Admin Users" value={analytics.adminCount} hint="Users with admin role" />
        <StatCard label="Configured Roles" value={roleCatalog.length} hint="Preset + custom roles available" />
      </div>

      <div className="admin-grid">
        <DistributionChart
          title="Users by Role"
          rows={analytics.roleRows}
          emptyText="No role distribution data yet."
        />
        <DistributionChart
          title="Users by Tier"
          rows={analytics.tierRows}
          emptyText="No tier distribution data yet."
        />
      </div>

      <div className="table-card">
        <h3>Role Configuration vs Assigned Users</h3>
        <p className="muted">This ties role configuration to actual user assignments.</p>
        {analytics.roleHealth.length === 0 ? (
          <p className="muted">No role configuration found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Permissions</th>
                <th>Assigned Users</th>
              </tr>
            </thead>
            <tbody>
              {analytics.roleHealth.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{Array.isArray(row.permissions) ? row.permissions.length : 0}</td>
                  <td>{row.userCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <DistributionChart
        title="Authentication Provider Coverage"
        rows={analytics.providerRows}
        emptyText="No provider data available."
      />
    </section>
  );
}
