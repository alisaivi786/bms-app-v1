import { useEffect, useMemo, useState } from "react";
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
import { ROLE_PRESETS, TIER_OPTIONS, defaultPermissionsFor, normalizePermissions } from "../constants/access";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import GridToolbar from "../components/GridToolbar";
import GridPageSizeSelect from "../components/GridPageSizeSelect";
import CustomSearchForm from "../components/CustomSearchForm";
import CustomSelect from "../components/CustomSelect";
import { OneYearDatePickerComponent } from "../components/OneYearDateRangePicker";
import { formatAsGstDateTime, parseDateValue } from "../utils/dateTime";

export default function UsersPage() {
  const PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100];
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [customRoles, setCustomRoles] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const defaultSearchValues = useMemo(
    () => ({
      uid: "",
      name: "",
      email: "",
      role: "",
      tier: "",
      operationDateRange: { fromDate: "", toDate: "" }
    }),
    []
  );
  const [searchValues, setSearchValues] = useState(defaultSearchValues);
  const [appliedSearchValues, setAppliedSearchValues] = useState(defaultSearchValues);

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

  const getRolePermissions = (roleName, tier = "basic") => {
    if (ROLE_PRESETS[roleName]) return defaultPermissionsFor(roleName, tier);
    const custom = customRoles.find((r) => r.name === roleName);
    return normalizePermissions("user", custom?.permissions, tier);
  };

  const filteredUsers = useMemo(() => {
    const uidNeedle = String(appliedSearchValues.uid || "").trim().toLowerCase();
    const nameNeedle = String(appliedSearchValues.name || "").trim().toLowerCase();
    const emailNeedle = String(appliedSearchValues.email || "").trim().toLowerCase();
    const roleNeedle = String(appliedSearchValues.role || "").trim().toLowerCase();
    const tierNeedle = String(appliedSearchValues.tier || "").trim().toLowerCase();
    const fromTime = appliedSearchValues.operationDateRange?.fromDate
      ? new Date(`${appliedSearchValues.operationDateRange.fromDate}T00:00:00`).getTime()
      : null;
    const toTime = appliedSearchValues.operationDateRange?.toDate
      ? new Date(`${appliedSearchValues.operationDateRange.toDate}T23:59:59`).getTime()
      : null;

    return users.filter((entry) => {
      const uidValue = String(entry.uid || entry.id || "").toLowerCase();
      const nameValue = String(entry.displayName || "").toLowerCase();
      const emailValue = String(entry.email || "").toLowerCase();
      const roleValue = String(entry.role || (entry.isAdmin ? "admin" : "user")).toLowerCase();
      const tierValue = String(entry.tier || "basic").toLowerCase();

      const uidOk = !uidNeedle || uidValue.includes(uidNeedle);
      const nameOk = !nameNeedle || nameValue.includes(nameNeedle);
      const emailOk = !emailNeedle || emailValue.includes(emailNeedle);
      const roleOk = !roleNeedle || roleValue === roleNeedle;
      const tierOk = !tierNeedle || tierValue === tierNeedle;
      const entryTime = parseDateValue(entry.createdAt || entry.updatedAt)?.getTime() ?? null;
      const dateOk =
        fromTime == null && toTime == null
          ? true
          : entryTime != null &&
            (fromTime == null || entryTime >= fromTime) &&
            (toTime == null || entryTime <= toTime);
      return uidOk && nameOk && emailOk && roleOk && tierOk && dateOk;
    });
  }, [appliedSearchValues, users]);

  const roleFilterOptions = useMemo(() => {
    const roleSet = new Set([""]);
    Object.keys(ROLE_PRESETS).forEach((roleName) => roleSet.add(String(roleName)));
    customRoles.forEach((role) => roleSet.add(String(role?.name || "")));
    return [...roleSet]
      .filter((value) => value.trim())
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({ value, label: value }));
  }, [customRoles]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const pageStart = (page - 1) * pageSize;
  const pagedUsers = filteredUsers.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    setPage(1);
  }, [appliedSearchValues]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const handleSearch = (event) => {
    event.preventDefault();
    setAppliedSearchValues({
      uid: String(searchValues.uid || "").trim(),
      name: String(searchValues.name || "").trim(),
      email: String(searchValues.email || "").trim(),
      role: String(searchValues.role || "").trim(),
      tier: String(searchValues.tier || "").trim(),
      operationDateRange: {
        fromDate: String(searchValues.operationDateRange?.fromDate || ""),
        toDate: String(searchValues.operationDateRange?.toDate || "")
      }
    });
  };

  const handleResetSearch = () => {
    setSearchValues(defaultSearchValues);
    setAppliedSearchValues(defaultSearchValues);
  };

  const formBox = useMemo(
    () => ({
      values: searchValues,
      setFieldValue: (field, value) => setSearchValues((prev) => ({ ...prev, [field]: value }))
    }),
    [searchValues]
  );

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

      <CustomSearchForm values={searchValues} defaultValues={defaultSearchValues} onSubmit={handleSearch} onReset={handleResetSearch}>
        <div className="form-grid">
          {OneYearDatePickerComponent({
            form: formBox,
            field: "operationDateRange",
            label: "Application Creation Date",
            hasTimePicker: true,
            isRequired: false
          })}
          <div className="field">
            <label htmlFor="user-filter-uid">UID</label>
            <input
              id="user-filter-uid"
              value={searchValues.uid}
              onChange={(event) => setSearchValues((prev) => ({ ...prev, uid: event.target.value }))}
              placeholder="Search by UID"
            />
          </div>
          <div className="field">
            <label htmlFor="user-filter-name">Name</label>
            <input
              id="user-filter-name"
              value={searchValues.name}
              onChange={(event) => setSearchValues((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Search by name"
            />
          </div>
          <div className="field">
            <label htmlFor="user-filter-email">Email</label>
            <input
              id="user-filter-email"
              value={searchValues.email}
              onChange={(event) => setSearchValues((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="Search by email"
            />
          </div>
          <div className="field">
            <label htmlFor="user-filter-role">Role</label>
            <CustomSelect
              id="user-filter-role"
              value={searchValues.role}
              onChange={(value) => setSearchValues((prev) => ({ ...prev, role: String(value) }))}
              options={[{ value: "", label: "All Roles" }, ...roleFilterOptions]}
            />
          </div>
          <div className="field">
            <label htmlFor="user-filter-tier">Tier</label>
            <CustomSelect
              id="user-filter-tier"
              value={searchValues.tier}
              onChange={(value) => setSearchValues((prev) => ({ ...prev, tier: String(value) }))}
              options={[{ value: "", label: "All Tiers" }, ...TIER_OPTIONS.map((tier) => ({ value: tier, label: tier }))]}
            />
          </div>
        </div>
      </CustomSearchForm>

      <div className="table-card">
        <GridToolbar
          left={
            <>
              <GridPageSizeSelect
                id="users-page-size"
                value={pageSize}
                onChange={setPageSize}
                options={PAGE_SIZE_OPTIONS}
              />
            </>
          }
          right={
            <Link className="btn btn-inline" to="/users/new">
              Add User
            </Link>
          }
        />
        {filteredUsers.length === 0 ? (
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
                <th>CreateOn</th>
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
                          const nextPermissions = getRolePermissions(nextRole, nextTier);
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
                          const nextPermissions = getRolePermissions(nextRole, nextTier);
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
                    <td>{formatAsGstDateTime(user.createdAt || user.updatedAt)}</td>
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
