import { useEffect, useState } from "react";
import {
  collection,
  deleteField,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { z } from "zod";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import {
  LOOKUP_TYPE_ENUM,
  LOOKUP_TYPES,
  getLookupTypeById,
  getLookupTypeByKey
} from "../constants/lookupTypes";
import AlertMessage from "../components/AlertMessage";
import CustomSelect from "../components/CustomSelect";
import { isAdminEmail } from "../constants/admin";
import GridToolbar from "../components/GridToolbar";
import GridPageSizeSelect from "../components/GridPageSizeSelect";

const lookupSchema = z.object({
  name: z.string().trim().min(2, "Lookup name must be at least 2 characters.")
});

export default function SystemConfigPage() {
  const PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100];
  const { user } = useAuth();
  const [lookupItems, setLookupItems] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState(LOOKUP_TYPE_ENUM.INCOME_SOURCE);
  const [newLookup, setNewLookup] = useState("");
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  useEffect(() => {
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : {};
      setIsAdmin(Boolean(data.isAdmin) || isAdminEmail(user.email));
      const fromNew = Array.isArray(data.lookupItems) ? data.lookupItems : [];
      const normalizedNew = fromNew
        .map((item) => {
          const mappedTypeId = Number(item.typeId ?? 0);
          const fallbackTypeId = getLookupTypeByKey(String(item.type || ""))?.id || 0;
          return {
            id: Number(item.id),
            typeId: Number.isInteger(mappedTypeId) && mappedTypeId > 0 ? mappedTypeId : fallbackTypeId,
            name: String(item.name || "")
          };
        })
        .filter(
          (item) => Number.isInteger(item.id) && Number.isInteger(item.typeId) && item.name.trim() !== ""
        );

      const legacy = Array.isArray(data.incomeSourceLookups) ? data.incomeSourceLookups : [];
      const normalizedLegacy = legacy
        .map((name, index) => ({
          id: index + 1,
          typeId: LOOKUP_TYPE_ENUM.INCOME_SOURCE,
          name: String(name || "")
        }))
        .filter((item) => item.name.trim() !== "");

      const merged = [...normalizedNew];
      normalizedLegacy.forEach((item) => {
        const exists = merged.some(
          (m) =>
            m.typeId === item.typeId &&
            m.name.toLowerCase().trim() === item.name.toLowerCase().trim()
        );
        if (!exists) merged.push(item);
      });
      merged.sort((a, b) => a.name.localeCompare(b.name));
      setLookupItems(merged);
    });

    return unsubscribe;
  }, [user.email, user.uid]);

  const persistLookupItems = async (nextItems) => {
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        lookupItems: nextItems,
        incomeSourceLookups: deleteField(),
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  };

  const handleAddLookup = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");

    const parsed = lookupSchema.safeParse({ name: newLookup });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid lookup value.");
      return;
    }

    const exists = lookupItems.some(
      (item) =>
        item.typeId === selectedTypeId &&
        String(item.name || "").toLowerCase() === parsed.data.name.toLowerCase()
    );
    if (exists) {
      setError("This lookup value already exists.");
      return;
    }

    try {
      const maxId = lookupItems.reduce(
        (max, item) => (Number.isInteger(item.id) ? Math.max(max, item.id) : max),
        0
      );
      const next = [
        ...lookupItems,
        {
          id: maxId + 1,
          typeId: selectedTypeId,
          name: parsed.data.name
        }
      ];
      await persistLookupItems(next);
      setNewLookup("");
      setStatus("Lookup saved.");
    } catch (err) {
      setError("Failed to save lookup.");
      console.error(err);
    }
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setStatus("");
    setError("");
  };

  const cancelEdit = () => {
    setEditId("");
    setEditName("");
  };

  const saveEdit = async () => {
    const parsed = lookupSchema.safeParse({ name: editName });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid lookup value.");
      return;
    }
    const exists = lookupItems.some(
      (item) =>
        item.id !== editId &&
        item.typeId === selectedTypeId &&
        item.name.toLowerCase() === parsed.data.name.toLowerCase()
    );
    if (exists) {
      setError("This lookup value already exists.");
      return;
    }
    try {
      const next = lookupItems.map((item) =>
        item.id === editId ? { ...item, name: parsed.data.name } : item
      );
      await persistLookupItems(next);
      setStatus("Lookup updated.");
      cancelEdit();
    } catch (err) {
      setError("Failed to update lookup.");
      console.error(err);
    }
  };

  const deleteLookup = async (id) => {
    try {
      const target = lookupItems.find((item) => item.id === id);
      if (target?.typeId === LOOKUP_TYPE_ENUM.BUDGET_CATEGORY) {
        const budgetDocs = await getDocs(collection(db, "users", user.uid, "budgets"));
        const isInUse = budgetDocs.docs.some((row) => {
          const data = row.data() || {};
          const items = Array.isArray(data.items) ? data.items : [];
          return items.some(
            (budgetItem) =>
              Number(budgetItem?.categoryId) === Number(target.id) ||
              String(budgetItem?.category || "").trim().toLowerCase() ===
                String(target.name || "").trim().toLowerCase()
          );
        });
        if (isInUse) {
          setError(
            "You cannot delete this category. It is associated with other records."
          );
          return;
        }
      }

      const next = lookupItems.filter((item) => item.id !== id);
      await persistLookupItems(next);
      setStatus("Lookup deleted.");
      if (editId === id) cancelEdit();
    } catch (err) {
      setError("Failed to delete lookup.");
      console.error(err);
    }
  };

  const filteredLookups = lookupItems.filter((item) => item.typeId === selectedTypeId);
  const totalPages = Math.max(1, Math.ceil(filteredLookups.length / pageSize));
  const pageStart = (page - 1) * pageSize;
  const pagedLookups = filteredLookups.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage(1);
  }, [selectedTypeId, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <section>
      <h1>System Configuration</h1>
      <p className="muted">
        Manage reusable system settings. Start with Income Source lookups and extend this screen
        over time for broader configuration.
      </p>

      <div className="form-grid">
        {!isAdmin ? (
          <form className="form-card" onSubmit={handleAddLookup}>
            <h2>Add Lookup</h2>
            <div className="field">
              <label htmlFor="lookupType">Lookup Type</label>
              <CustomSelect
                value={selectedTypeId}
                onChange={(value) => setSelectedTypeId(Number(value))}
                options={LOOKUP_TYPES.map((type) => ({
                  value: type.id,
                  label: type.label
                }))}
              />
            </div>
            <div className="field">
              <label htmlFor="lookupName">Lookup Name</label>
              <input
                id="lookupName"
                value={newLookup}
                onChange={(event) => setNewLookup(event.target.value)}
                placeholder="e.g. Salary, Freelance, Bonus"
              />
            </div>
            <button className="btn" type="submit">
              Save Lookup
            </button>
          </form>
        ) : (
          <div className="form-card">
            <h2>Lookup Management</h2>
            <p className="muted">
              Lookup configuration is hidden for admin users. This section is for portal user
              data setup.
            </p>
          </div>
        )}

        <div className="form-card">
          <h2>Future Configuration Modules</h2>
          <p className="muted">Planned extension placeholders:</p>
          <ul>
            <li>Currency behavior rules</li>
            <li>Income categories and tagging policy</li>
            <li>Export/report settings</li>
            <li>Notification preferences</li>
          </ul>
        </div>
      </div>

      {!isAdmin ? (
        <div className="table-card">
          <GridToolbar
            left={
              <GridPageSizeSelect
                id="lookup-page-size"
                value={pageSize}
                onChange={setPageSize}
                options={PAGE_SIZE_OPTIONS}
              />
            }
          />
          {filteredLookups.length === 0 ? (
            <p className="muted">No lookups added yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedLookups.map((item) => (
                  <tr key={item.id}>
                    <td>{getLookupTypeById(item.typeId)?.label || String(item.typeId)}</td>
                    <td>
                      {editId === item.id ? (
                        <input
                          value={editName}
                          onChange={(event) => setEditName(event.target.value)}
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td>
                      {editId === item.id ? (
                        <>
                          <button className="btn btn-inline" type="button" onClick={saveEdit}>
                            Save
                          </button>
                          <button className="btn btn-inline btn-outline" type="button" onClick={cancelEdit}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-inline" type="button" onClick={() => startEdit(item)}>
                            Edit
                          </button>
                          <button
                            className="btn btn-inline btn-outline"
                            type="button"
                            onClick={() => deleteLookup(item.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {filteredLookups.length > 0 ? (
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
      ) : null}

      <AlertMessage type="success" message={status} />
      <AlertMessage type="error" message={error} />
    </section>
  );
}
