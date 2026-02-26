import { useEffect, useMemo, useState } from "react";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { ROLE_PRESETS } from "../constants/access";
import AlertMessage from "../components/AlertMessage";
import GridToolbar from "../components/GridToolbar";
import GridPageSizeSelect from "../components/GridPageSizeSelect";
import CustomSearchForm from "../components/CustomSearchForm";
import { OneYearDatePickerComponent } from "../components/OneYearDateRangePicker";
import { formatAsGstDateTime, parseDateValue } from "../utils/dateTime";

export default function RolesPage() {
  const PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100];
  const { user } = useAuth();
  const [customRoles, setCustomRoles] = useState([]);
  const [profileUpdatedAt, setProfileUpdatedAt] = useState(null);
  const [searchValues, setSearchValues] = useState({
    roleName: "",
    operationDateRange: { fromDate: "", toDate: "" }
  });
  const defaultSearchValues = {
    roleName: "",
    operationDateRange: { fromDate: "", toDate: "" }
  };
  const [appliedFilter, setAppliedFilter] = useState("");
  const [appliedDateRange, setAppliedDateRange] = useState(defaultSearchValues.operationDateRange);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  useEffect(() => {
    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.exists() ? snap.data() : {};
      const roles = Array.isArray(data.customRoles) ? data.customRoles : [];
      setCustomRoles(roles);
      setProfileUpdatedAt(data.updatedAt || null);
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

  const filteredRoles = allRoles.filter((role) => {
    const nameOk = role.name.toLowerCase().includes(appliedFilter.trim().toLowerCase());
    const fromTime = appliedDateRange?.fromDate
      ? new Date(`${appliedDateRange.fromDate}T00:00:00`).getTime()
      : null;
    const toTime = appliedDateRange?.toDate
      ? new Date(`${appliedDateRange.toDate}T23:59:59`).getTime()
      : null;
    if (fromTime == null && toTime == null) return nameOk;

    const rowDate = parseDateValue(role.createdAt || role.updatedAt || profileUpdatedAt);
    const rowTime = rowDate?.getTime() ?? null;
    const dateOk =
      rowTime != null &&
      (fromTime == null || rowTime >= fromTime) &&
      (toTime == null || rowTime <= toTime);
    return nameOk && dateOk;
  });
  const totalPages = Math.max(1, Math.ceil(filteredRoles.length / pageSize));
  const pageStart = (page - 1) * pageSize;
  const pagedRoles = filteredRoles.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage(1);
  }, [appliedFilter]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

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

  const handleApplyFilter = (event) => {
    event.preventDefault();
    setAppliedFilter(searchValues.roleName.trim());
    setAppliedDateRange({
      fromDate: String(searchValues.operationDateRange?.fromDate || ""),
      toDate: String(searchValues.operationDateRange?.toDate || "")
    });
  };

  const handleResetFilter = () => {
    setSearchValues(defaultSearchValues);
    setAppliedFilter("");
    setAppliedDateRange(defaultSearchValues.operationDateRange);
  };

  const formBox = {
    values: searchValues,
    setFieldValue: (field, value) => setSearchValues((prev) => ({ ...prev, [field]: value }))
  };

  return (
    <section className="role-page">
      <div className="section-head">
        <h1>Role Management</h1>
        <p className="muted">Manage role catalog, permissions, and assignment policy.</p>
      </div>
      <AlertMessage type="error" message={error} />
      <AlertMessage type="success" message={status} />

      <CustomSearchForm
        values={searchValues}
        defaultValues={defaultSearchValues}
        onSubmit={handleApplyFilter}
        onReset={handleResetFilter}
      >
        <div className="form-grid">
          {OneYearDatePickerComponent({
            form: formBox,
            field: "operationDateRange",
            label: "Application Creation Date",
            hasTimePicker: true,
            isRequired: false
          })}
          <div className="field">
            <label htmlFor="role-name-filter">Role Name</label>
            <input
              id="role-name-filter"
              value={searchValues.roleName}
              onChange={(event) =>
                setSearchValues((prev) => ({ ...prev, roleName: event.target.value }))
              }
              placeholder="Enter role name (e.g. user)"
            />
          </div>
        </div>
      </CustomSearchForm>

      <div className="table-card role-table-card">
        <GridToolbar
          left={<GridPageSizeSelect id="roles-page-size" value={pageSize} onChange={setPageSize} options={PAGE_SIZE_OPTIONS} />}
          right={
            <Link className="btn btn-inline" to="/roles/new">
              Add Role
            </Link>
          }
        />

        {filteredRoles.length === 0 ? (
          <p className="muted">No roles found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Permissions</th>
                <th>CreateOn</th>
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
                  <td>{formatAsGstDateTime(role.createdAt || role.updatedAt || profileUpdatedAt)}</td>
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
